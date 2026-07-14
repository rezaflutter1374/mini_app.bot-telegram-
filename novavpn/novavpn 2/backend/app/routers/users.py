"""
مسیر کاربران: وقتی کاربر Mini App را باز می‌کند، اگر در دیتابیس نبود
به‌صورت خودکار ساخته می‌شود (get-or-create) - این کار همیشه بعد از
اعتبارسنجی initData انجام می‌شود، هرگز به telegram_id ارسالی از فرانت اعتماد نمی‌کنیم.
"""
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.auth.telegram_auth import get_current_telegram_user
from app.models import User
from app.schemas import UserOut
from app.config import settings

router = APIRouter(prefix="/api/v1/users", tags=["users"])


async def get_or_create_user(db: AsyncSession, tg_user: dict) -> User:
    result = await db.execute(select(User).where(User.telegram_id == tg_user["id"]))
    user = result.scalar_one_or_none()
    if user:
        return user

    user = User(
        telegram_id=tg_user["id"],
        first_name=tg_user.get("first_name", ""),
        username=tg_user.get("username", ""),
        is_admin=tg_user["id"] in settings.admin_ids_list,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.get("/me", response_model=UserOut)
async def read_profile(
    tg_user: dict = Depends(get_current_telegram_user),
    db: AsyncSession = Depends(get_db),
):
    user = await get_or_create_user(db, tg_user)
    return user
