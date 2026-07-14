"""
ربات تلگرام NovaVPN.

طبق اصول پروژه: این بات هیچ منطق تجاری‌ای ندارد.
فقط:
  - دستور /start را جواب می‌دهد
  - دکمه‌ی باز کردن Mini App را نشان می‌دهد
منطق خرید، پرداخت، ساخت اشتراک و... همه در بک‌اند (FastAPI) انجام می‌شود.

اجرا:
  python bot.py
"""
import asyncio
import os

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.environ["BOT_TOKEN"]
MINIAPP_URL = os.environ["MINIAPP_URL"]

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message(CommandStart())
async def handle_start(message: Message):
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[[
            InlineKeyboardButton(
                text="🚀 باز کردن اپلیکیشن NovaVPN",
                web_app=WebAppInfo(url=MINIAPP_URL),
            )
        ]]
    )
    await message.answer(
        "به NovaVPN خوش اومدی! 👋\n\nبرای دیدن پلن‌ها و مدیریت اشتراکت روی دکمه‌ی زیر بزن:",
        reply_markup=keyboard,
    )


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
