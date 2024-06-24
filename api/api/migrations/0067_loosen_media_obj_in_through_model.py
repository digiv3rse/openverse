# Generated by Django 4.2.11 on 2024-06-24 12:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0066_rename_contentprovider_to_contentsource'),
    ]

    operations = [
        migrations.AlterField(
            model_name='audiodecisionthrough',
            name='media_obj',
            field=models.ForeignKey(db_column='identifier', db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='api.audio', to_field='identifier'),
        ),
        migrations.AlterField(
            model_name='imagedecisionthrough',
            name='media_obj',
            field=models.ForeignKey(db_column='identifier', db_constraint=False, on_delete=django.db.models.deletion.DO_NOTHING, to='api.image', to_field='identifier'),
        ),
    ]
