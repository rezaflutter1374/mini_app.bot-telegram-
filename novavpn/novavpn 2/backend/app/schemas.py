"""
اسکیمای Pydantic: شکل داده‌هایی که وارد یا خارج از API می‌شوند.
جدا از مدل دیتابیس نگه داشته می‌شود تا لایه‌ها قاطی نشوند.
"""
from datetime import datetime
from pydantic import BaseModel


class UserOut(BaseModel):
    id: int
    telegram_id: int
    first_name: str
    username: str
    is_admin: bool

    model_config = {"from_attributes": True}


class PlanOut(BaseModel):
    id: int
    name: str
    description: str
    price_toman: float
    duration_days: int
    traffic_gb: int

    model_config = {"from_attributes": True}


class PlanCreate(BaseModel):
    name: str
    description: str = ""
    price_toman: float
    duration_days: int
    traffic_gb: int


class OrderCreate(BaseModel):
    plan_id: int


class OrderOut(BaseModel):
    id: int
    plan_id: int
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}


class SubscriptionOut(BaseModel):
    id: int
    uuid: str
    subscription_url: str
    traffic_gb: int
    status: str
    expire_at: datetime

    model_config = {"from_attributes": True}
