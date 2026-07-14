"""
تنظیمات مرکزی برنامه.
همه مقادیر حساس از فایل .env خوانده می‌شوند، هیچ‌وقت مستقیم در کد نمی‌نویسیم.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    bot_token: str
    database_url: str = "sqlite+aiosqlite:///./novavpn.db"

    sanaei_panel_url: str = ""
    sanaei_username: str = ""
    sanaei_password: str = ""

    admin_telegram_ids: str = ""  # مثل: "111,222"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def admin_ids_list(self) -> list[int]:
        return [int(x) for x in self.admin_telegram_ids.split(",") if x.strip()]


settings = Settings()
