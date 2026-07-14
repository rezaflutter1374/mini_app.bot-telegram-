"""
مسیر پلن‌ها: دیدن پلن‌ها برای همه (نیاز به لاگین ندارد چون داده حساس نیست)
و ساخت پلن جدید فقط برای ادمین (فاز بعد کنترل ادمین کامل می‌شود).
"""
from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models import Plan
from app.schemas import PlanOut

router = APIRouter(prefix="/api/v1/plans", tags=["plans"])


@router.get("", response_model=list[PlanOut])
async def list_plans(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Plan).where(Plan.is_active == True))  # noqa: E712
    return result.scalars().all()
