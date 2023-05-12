"""
# Update the staging database

This DAG is responsible for updating the staging database using the most recent
snapshot of the production database.

For a full explanation of the DAG, see the implementation plan description:
https://docs.openverse.org/projects/proposals/search_relevancy_sandbox/20230406-implementation_plan_update_staging_database.html#dag
"""

import logging
from airflow.providers.amazon.aws.operators.rds import RdsDeleteDbInstanceOperator
from airflow.utils.trigger_rule import TriggerRule
from datetime import datetime, timedelta

from airflow.decorators import dag
from airflow.operators.python import PythonOperator
from airflow.providers.amazon.aws.sensors.rds import RdsSnapshotExistenceSensor

from common import slack
from common.constants import DAG_DEFAULT_ARGS
from database.staging_database_restore import constants
from database.staging_database_restore.staging_database_restore import (
    get_latest_prod_snapshot,
    get_staging_db_details,
    make_rds_sensor,
    make_rename_task_group,
    restore_staging_from_snapshot,
    skip_restore,
)


log = logging.getLogger(__name__)


@dag(
    dag_id=constants.DAG_ID,
    schedule="@monthly",
    start_date=datetime(2023, 5, 1),
    tags=["database"],
    max_active_runs=1,
    dagrun_timeout=timedelta(days=1),
    catchup=False,
    # Use the docstring at the top of the file as md docs in the UI
    doc_md=__doc__,
    default_args={
        **DAG_DEFAULT_ARGS,
        # Don't add any retries by defalut
        "retries": 0,
    },
    render_template_as_native_obj=True,
)
def restore_staging_database():
    should_skip = skip_restore()
    latest_snapshot = get_latest_prod_snapshot()
    should_skip >> latest_snapshot

    ensure_snapshot_ready = RdsSnapshotExistenceSensor(
        task_id="ensure_snapshot_ready",
        db_type="instance",
        db_snapshot_identifier=latest_snapshot,
        aws_conn_id=constants.AWS_RDS_CONN_ID,
        mode="reschedule",
        timeout=60 * 60 * 4,  # 4 hours
    )

    staging_details = get_staging_db_details()
    should_skip >> staging_details

    restore_snapshot = restore_staging_from_snapshot(latest_snapshot, staging_details)
    ensure_snapshot_ready >> restore_snapshot

    await_staging_creation = make_rds_sensor(
        task_id="await_staging_creation",
        db_identifier=constants.TEMP_IDENTIFIER,
    )
    restore_snapshot >> await_staging_creation

    notify_outage = PythonOperator(
        task_id="notify_outage",
        python_callable=slack.send_message,
        op_kwargs={
            "message": ":warning: Staging database is being restored, staging "
            "will be down for the duration.",
            "username": constants.SLACK_USERNAME,
            "dag_id": constants.DAG_ID,
        },
    )

    rename_staging_to_old = make_rename_task_group(
        constants.STAGING_IDENTIFIER, constants.OLD_IDENTIFIER
    )
    await_staging_creation >> [notify_outage, rename_staging_to_old]

    rename_temp_to_staging = make_rename_task_group(
        constants.TEMP_IDENTIFIER, constants.STAGING_IDENTIFIER
    )
    rename_staging_to_old >> rename_temp_to_staging

    # Only run this if the secondary rename failed
    rename_old_to_staging = make_rename_task_group(
        constants.OLD_IDENTIFIER,
        constants.STAGING_IDENTIFIER,
        trigger_rule=TriggerRule.ALL_FAILED,
    )
    notify_failed_but_back = PythonOperator(
        task_id="notify_failed_but_back",
        python_callable=slack.send_message,
        op_kwargs={
            "message": ":warning: Staging database rename failed, but staging should "
            "now be available. Please investigate the cause of the failure.",
            "username": constants.SLACK_USERNAME,
            "dag_id": constants.DAG_ID,
        },
    )
    rename_temp_to_staging >> rename_old_to_staging >> notify_failed_but_back

    notify_complete = PythonOperator(
        task_id="notify_complete",
        python_callable=slack.send_message,
        op_kwargs={
            "message": ":info: Staging database restore complete, staging "
            "should now be available.",
            "username": constants.SLACK_USERNAME,
            "dag_id": constants.DAG_ID,
        },
    )

    delete_old = RdsDeleteDbInstanceOperator(
        task_id="delete_old",
        db_instance_identifier=constants.OLD_IDENTIFIER,
        rds_kwargs={"SkipFinalSnapshot": True, "DeleteAutomatedBackups": False},
        aws_conn_id=constants.AWS_RDS_CONN_ID,
        wait_for_completion=True,
    )

    rename_temp_to_staging >> [notify_complete, delete_old]


restore_staging_database()
