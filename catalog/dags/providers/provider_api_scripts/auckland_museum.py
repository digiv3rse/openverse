"""
Content Provider:       AucklandMuseum

ETL Process:            Use the API to identify all CC licensed media.

Output:                 TSV file containing the media and the
                        respective meta-data.

Notes:                  https://api.aucklandmuseum.com/

Resource:               https://api.aucklandmuseum.com/
                        https://github.com/AucklandMuseum/API/wiki/Tutorial
"""
import logging

from common.constants import IMAGE
from common.licenses import get_license_info
from common.loader import provider_details as prov
from providers.provider_api_scripts.provider_data_ingester import ProviderDataIngester


logger = logging.getLogger(__name__)


class AucklandMuseumDataIngester(ProviderDataIngester):
    providers = {
        "image": prov.AUCKLAND_MUSEUM_IMAGE_PROVIDER,
    }
    endpoint = "https://api.aucklandmuseum.com/search/collectionsonline/_search"
    license_url = "https://creativecommons.org/licenses/by/4.0/"
    delay = 4
    from_start = 0
    total_amount_of_data = 10000
    DEFAULT_LICENSE_INFO = get_license_info(license_url=license_url)

    def get_next_query_params(self, prev_query_params: dict | None, **kwargs) -> dict:
        # On the first request, `prev_query_params` will be `None`. We can detect this
        # and return our default params.
        if not prev_query_params:
            # Return default query params on the first request
            # primaryRepresentation contain a image url for each data
            # "+" is a query string syntax for must be present
            # copyright:CC state Creative Commons Attribution 4.0
            return {
                "q": "_exists_:primaryRepresentation+copyright:CC",
                "size": "100",
                "from": self.from_start,
            }
        else:
            # Increment `from` by 100.
            return {
                **prev_query_params,
                "from": prev_query_params["from"] + 100,
            }

    def get_batch_data(self, response_json):
        # Takes the raw API response from calling `get` on the endpoint, and returns
        # the list of records to process.
        if response_json:
            return response_json.get("hits").get("hits")
        return None

    def get_should_continue(self, response_json):
        # Do not continue if we have exceeded the total amount of data
        if self.from_start >= self.total_amount_of_data:
            logger.info(
                "The final amount of data has been processed. Halting ingestion."
            )
            return False

        return True

    def get_media_type(self, record: dict):
        return IMAGE

    def get_record_data(self, data: dict) -> dict | list[dict] | None:
        information = data.get("_source")

        url = information.get("primaryRepresentation")
        thumbnail_url = f"{url}?rendering=thumbnail.jpg"
        license_info = self.DEFAULT_LICENSE_INFO
        filesize = self._get_file_info(url)

        creator = (
            information.get("dc_contributor")[0]
            if information.get("dc_contributor")
            else ""
        )

        title = information.get("appellation").get("Primary Title")[0]
        meta_data = self._get_meta_data(information)
        data.get("tags")

        return {
            "url": url,
            "license_info": license_info,
            "thumbnail_url": thumbnail_url,
            "filesize": filesize,
            "creator": creator,
            "title": title,
            "meta_data": meta_data,
        }

    def _get_meta_data(self, object_json: dict) -> dict | None:
        geopos = object_json.get("geopos")[0] if object_json.get("geopos") else ""
        metadata = {
            "type": object_json.get("type"),
            "geopos": geopos,
            "department": object_json.get("department")[0],
        }

        metadata = {k: v for k, v in metadata.items() if v is not None}
        return metadata

    def _get_file_info(self, url) -> int | None:
        """Get the image size in bytes."""
        resp = self.delayed_requester.head(url)
        if resp:
            filesize = int(resp.headers.get("Content-Length", 0))
            return filesize if filesize != 0 else None


def main():
    # Allows running ingestion from the CLI without Airflow running for debugging
    # purposes.
    ingester = AucklandMuseumDataIngester()
    ingester.ingest_records()


if __name__ == "__main__":
    main()
