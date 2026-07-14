"""
اجرا فقط یک‌بار برای پر کردن دیتابیس با چند پلن نمونه:
python seed_plans.py
"""
import asyncio

from app.database import AsyncSessionLocal, init_db
from app.models import Plan


async def main():
    await init_db()
    async with AsyncSessionLocal() as db:
        db.add_all([
            Plan(name="پلن یک ماهه ۳۰ گیگ", description="مناسب استفاده روزمره", price_toman=150000, duration_days=30, traffic_gb=30),
            Plan(name="پلن سه ماهه ۱۰۰ گیگ", description="اقتصادی‌ترین گزینه", price_toman=380000, duration_days=90, traffic_gb=100),
            Plan(name="پلن نامحدود یک ماهه", description="بدون محدودیت ترافیک", price_toman=250000, duration_days=30, traffic_gb=100000),
        ])
        await db.commit()
    print("پلن‌های نمونه با موفقیت اضافه شدند.")


if __name__ == "__main__":
    asyncio.run(main())
