import logging
from os.path import splitext
from typing import Literal
from urllib.parse import urlparse

from django.conf import settings
from django.http import HttpResponse
from rest_framework import status
from rest_framework.exceptions import APIException, UnsupportedMediaType

import django_redis
import requests
import sentry_sdk

from api.utils.tallies import get_monthly_timestamp


parent_logger = logging.getLogger(__name__)


class UpstreamThumbnailException(APIException):
    status_code = status.HTTP_424_FAILED_DEPENDENCY
    default_detail = "Could not render thumbnail due to upstream provider error."
    default_code = "upstream_photon_failure"


HEADERS = {
    "User-Agent": settings.OUTBOUND_USER_AGENT_TEMPLATE.format(
        purpose="ThumbnailGeneration"
    )
}


PHOTON_TYPES = {"gif", "jpg", "jpeg", "png", "webp"}
ORIGINAL_TYPES = {"svg"}

PHOTON = "photon"
ORIGINAL = "original"
THUMBNAIL_STRATEGY = Literal[PHOTON, ORIGINAL]


def get_thumbnail_strategy(ext: str | None) -> THUMBNAIL_STRATEGY | None:
    """
    We use photon for image types that are supported by photon (PHOTON_TYPES),
    for SVG images we use the original image.
    """
    if ext in PHOTON_TYPES:
        return PHOTON
    elif ext in ORIGINAL_TYPES:
        return ORIGINAL
    return None


def get_image_extension(image_url: str, media_identifier: str) -> str | None:
    cache = django_redis.get_redis_connection("default")
    key = f"media:{media_identifier}:thumb_type"

    ext = _get_file_extension_from_url(image_url)

    if not ext:
        # If the extension is not present in the URL, try to get it from the redis cache
        ext = cache.get(key)
        ext = ext.decode("utf-8") if ext else None

    if not ext:
        # If the extension is still not present, try getting it from the content type
        try:
            response = requests.head(image_url, timeout=10)
            response.raise_for_status()
        except Exception as exc:
            sentry_sdk.capture_exception(exc)
            raise UpstreamThumbnailException(
                "Failed to render thumbnail due to inability to check media "
                f"type. {exc}"
            )
        else:
            if response.headers and "Content-Type" in response.headers:
                content_type = response.headers["Content-Type"]
                ext = _get_file_extension_from_content_type(content_type)
            else:
                ext = None

            cache.set(key, ext if ext else "unknown")
    return ext


def _get_file_extension_from_url(image_url: str) -> str:
    """Return the image extension if present in the URL."""
    parsed = urlparse(image_url)
    _, ext = splitext(parsed.path)
    return ext[1:].lower()  # remove the leading dot


def _get_file_extension_from_content_type(content_type: str) -> str | None:
    """
    Return the image extension if present in the Response's content type
    header.
    """
    if content_type and "/" in content_type:
        return content_type.split("/")[1]
    return None


def get_photon_request_params(
    parsed_image_url,
    is_full_size: bool,
    is_compressed: bool,
    headers: dict,
):
    """
    Photon options documented here:
    https://developer.wordpress.com/docs/photon/api/
    """
    params = {}

    if not is_full_size:
        params["w"] = settings.THUMBNAIL_WIDTH_PX

    if is_compressed:
        params["quality"] = settings.THUMBNAIL_QUALITY

    if parsed_image_url.query:
        # No need to URL encode this string because requests will already
        # pass the `params` object to `urlencode` before it appends it to the
        # request URL.
        params["q"] = parsed_image_url.query

    if parsed_image_url.scheme == "https":
        # Photon defaults to HTTP without this parameter
        # which will cause some providers to fail (if they
        # do not serve over HTTP and do not have a redirect)
        params["ssl"] = "true"

    # Photon excludes the protocol, so we need to reconstruct the url + port + path
    # to send as the "path" of the Photon request
    domain = parsed_image_url.netloc
    path = parsed_image_url.path
    upstream_url = f"{settings.PHOTON_ENDPOINT}{domain}{path}"

    if settings.PHOTON_AUTH_KEY:
        headers["X-Photon-Authentication"] = settings.PHOTON_AUTH_KEY

    return upstream_url, params, headers


def get(
    image_url: str,
    media_identifier: str,
    accept_header: str = "image/*",
    is_full_size: bool = False,
    is_compressed: bool = True,
) -> HttpResponse:
    """
    Proxy an image through Photon if its filetype is supported, return the original
    image if the filetype is SVG, and raise .
    """
    logger = parent_logger.getChild("get")
    tallies = django_redis.get_redis_connection("tallies")
    month = get_monthly_timestamp()

    image_extension = get_image_extension(image_url, media_identifier)
    thumbnail_strategy = get_thumbnail_strategy(image_extension)
    if not thumbnail_strategy:
        raise UnsupportedMediaType(image_extension)

    headers = {"Accept": accept_header} | HEADERS

    parsed_image_url = urlparse(image_url)
    domain = parsed_image_url.netloc

    if thumbnail_strategy == ORIGINAL:
        upstream_url = image_url
        params = {}
    else:
        upstream_url, params, headers = get_photon_request_params(
            parsed_image_url, is_full_size, is_compressed, headers
        )
    try:
        upstream_response = requests.get(
            upstream_url,
            timeout=15,
            params=params,
            headers=headers,
        )
        tallies.incr(f"thumbnail_response_code:{month}:{upstream_response.status_code}")
        tallies.incr(
            f"thumbnail_response_code_by_domain:{domain}:"
            f"{month}:{upstream_response.status_code}"
        )
        upstream_response.raise_for_status()
    except Exception as exc:
        exception_name = f"{exc.__class__.__module__}.{exc.__class__.__name__}"
        key = f"thumbnail_error:{exception_name}:{domain}:{month}"
        count = tallies.incr(key)
        if count <= settings.THUMBNAIL_ERROR_INITIAL_ALERT_THRESHOLD or (
            count % settings.THUMBNAIL_ERROR_REPEATED_ALERT_FREQUENCY == 0
        ):
            sentry_sdk.capture_exception(exc)
        if isinstance(exc, requests.exceptions.HTTPError):
            tallies.incr(
                f"thumbnail_http_error:{domain}:{month}:{exc.response.status_code}:{exc.response.text}"
            )
        raise UpstreamThumbnailException(f"Failed to render thumbnail. {exc}")

    res_status = upstream_response.status_code
    content_type = upstream_response.headers.get("Content-Type")
    logger.debug(
        f"Image proxy response status: {res_status}, content-type: {content_type}"
    )

    return HttpResponse(
        upstream_response.content,
        status=res_status,
        content_type=content_type,
    )
