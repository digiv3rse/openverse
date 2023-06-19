import logging
from typing import Literal
from urllib.parse import urlparse

from django.conf import settings
from django.http import HttpResponse
from rest_framework.exceptions import UnsupportedMediaType

import django_redis
import requests
import sentry_sdk

from api.utils.image_proxy.exception import UpstreamThumbnailException
from api.utils.image_proxy.extension import get_image_extension
from api.utils.image_proxy.photon import get_photon_request_params
from api.utils.tallies import get_monthly_timestamp


parent_logger = logging.getLogger(__name__)

HEADERS = {
    "User-Agent": settings.OUTBOUND_USER_AGENT_TEMPLATE.format(
        purpose="ThumbnailGeneration"
    )
}

PHOTON_TYPES = {"gif", "jpg", "jpeg", "png", "webp"}
ORIGINAL_TYPES = {"svg"}

PHOTON = "photon"
ORIGINAL = "original"
THUMBNAIL_STRATEGY = Literal["photon_proxy", "original"]


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


def get(
    image_url: str,
    media_identifier: str,
    accept_header: str = "image/*",
    is_full_size: bool = False,
    is_compressed: bool = True,
) -> HttpResponse:
    """
    Proxy an image through Photon if its file type is supported, else return the 
    original image if the file type is SVG. Otherwise, raise an exception.
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

