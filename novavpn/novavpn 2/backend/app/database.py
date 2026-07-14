"""
لایه‌ی اتصال به دیتابیس.
از SQLAlchemy async استفاده می‌کنیم تا بعداً مهاجرت به PostgreSQL بدون تغییر
کد بیزینس‌لاجیک ممکن باشد (فقط database_url در .env عوض می‌شود).
"""
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

engine = create_async_engine(settings.database_url, echo=False)

AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False, class_=AsyncSession)


class Base(DeclarativeBase):
    pass


async def get_db():
    """Dependency برای اینجکت کردن سشن دیتابیس داخل روت‌ها."""
    async with AsyncSessionLocal() as session:
        yield session


async def init_db():
    """ساخت جدول‌ها در اولین اجرا (برای SQLite کافیست)."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
