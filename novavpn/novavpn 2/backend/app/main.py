"""
نقطه‌ی ورود بک‌اند.
اجرا: uvicorn app.main:app --reload --port 8000
"""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import init_db
from app.routers import users, plans


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()  # ساخت جدول‌ها در اولین اجرا
    yield


app = FastAPI(title="NovaVPN API", version="0.1.0", lifespan=lifespan)

# در پروداکشن به‌جای "*" فقط دامنه‌ی فرانت‌اند خودت را بگذار
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(plans.router)


@app.get("/health")
async def health_check():
    return {"status": "ok"}
