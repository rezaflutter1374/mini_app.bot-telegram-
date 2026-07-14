"""
اعتبارسنجی initData ارسالی از Telegram Mini App.

قانون طلایی: هرگز به داده‌ای که از فرانت‌اند می‌آید اعتماد نکن.
تلگرام initData را با یک هش امضا می‌کند؛ ما اینجا آن امضا را دوباره
با استفاده از bot_token محاسبه و مقایسه می‌کنیم. اگر مطابقت نداشت یا قدیمی بود، رد می‌کنیم.

مرجع رسمی الگوریتم:
https://core.telegram.org/bots/webapps#validating-data-received-via-the-mini-app
"""
import hashlib
import hmac
import time
from urllib.parse import parse_qsl

from fastapi import Header, HTTPException

from app.config import settings

MAX_AUTH_AGE_SECONDS = 24 * 60 * 60  # اعتبار initData را حداکثر ۲۴ ساعت می‌پذیریم


def _compute_secret_key(bot_token: str) -> bytes:
    return hmac.new(b"WebAppData", bot_token.encode(), hashlib.sha256).digest()


def validate_init_data(init_data: str) -> dict:
    """
    ورودی: رشته‌ی خام initData که فرانت‌اند در هدر می‌فرستد.
    خروجی: دیکشنری پارس‌شده شامل فیلد user (در صورت معتبر بودن).
    در صورت نامعتبر بودن، Exception می‌اندازد.
    """
    if not init_data:
        raise ValueError("initData خالی است")

    parsed = dict(parse_qsl(init_data, strict_parsing=True))
    received_hash = parsed.pop("hash", None)
    if not received_hash:
        raise ValueError("hash در initData وجود ندارد")

    # ساخت data-check-string طبق مستندات تلگرام: کلیدها sort شده و با \n جدا می‌شوند
    data_check_string = "\n".join(f"{k}={v}" for k, v in sorted(parsed.items()))

    secret_key = _compute_secret_key(settings.bot_token)
    computed_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

    if not hmac.compare_digest(computed_hash, received_hash):
        raise ValueError("امضای initData نامعتبر است - احتمال جعل درخواست")

    auth_date = int(parsed.get("auth_date", 0))
    if time.time() - auth_date > MAX_AUTH_AGE_SECONDS:
        raise ValueError("initData منقضی شده است")

    return parsed


async def get_current_telegram_user(x_telegram_init_data: str = Header(...)) -> dict:
    """
    Dependency فست‌ای‌پی‌آی: initData را از هدر می‌گیرد، اعتبارسنجی می‌کند
    و اطلاعات کاربر تلگرام را برمی‌گرداند.
    فرانت‌اند باید initData را در هدر X-Telegram-Init-Data بفرستد.
    """
    try:
        parsed = validate_init_data(x_telegram_init_data)
    except ValueError as exc:
        raise HTTPException(status_code=401, detail=str(exc))

    import json

    user_json = parsed.get("user")
    if not user_json:
        raise HTTPException(status_code=401, detail="اطلاعات کاربر در initData نیست")

    return json.loads(user_json)
