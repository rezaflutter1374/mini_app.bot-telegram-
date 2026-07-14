# NovaVPN — فاز ۱ (اسکلت بک‌اند + بات)

این فاز شامل:
- بک‌اند FastAPI با دیتابیس SQLite
- احراز هویت امن Telegram initData (تست شده ✅)
- API لیست پلن‌ها و پروفایل کاربر
- ربات تلگرام ساده که فقط دکمه‌ی باز کردن Mini App را نشان می‌دهد

فرانت‌اند (React Mini App) در فاز ۲ اضافه می‌شود.

---

## ۱) پیش‌نیازها (فقط یک‌بار نصب کن)

1. **Python 3.11 یا بالاتر** — از [python.org](https://www.python.org/downloads/) نصب کن.
   بررسی نسخه: `python3 --version`
2. **VS Code** — از [code.visualstudio.com](https://code.visualstudio.com/)
3. اکستنشن‌های VS Code (از تب Extensions نصب کن):
   - `Python` (ms-python.python)
   - `Pylance`
4. یک اکانت تلگرام و ساخت بات از **@BotFather**:
   - به BotFather پیام بده: `/newbot`
   - اسم و یوزرنیم بات را بده (یوزرنیم باید به `bot` ختم شود، مثلاً `novavpn_bot`)
   - توکنی که می‌دهد را جایی کپی کن (بعداً لازم داری)

---

## ۲) باز کردن پروژه در VS Code

پوشه‌ی `novavpn` را در VS Code باز کن (File → Open Folder).

ساختار پروژه:
```
novavpn/
├── backend/          ← سرور FastAPI (منطق اصلی برنامه)
│   ├── app/
│   │   ├── main.py          نقطه ورود سرور
│   │   ├── config.py        خواندن تنظیمات از .env
│   │   ├── database.py      اتصال به دیتابیس
│   │   ├── models.py        جدول‌های دیتابیس
│   │   ├── schemas.py       فرمت ورودی/خروجی API
│   │   ├── auth/
│   │   │   └── telegram_auth.py   اعتبارسنجی امن initData
│   │   ├── routers/
│   │   │   ├── users.py     API پروفایل کاربر
│   │   │   └── plans.py     API لیست پلن‌ها
│   │   └── services/        (فاز بعد: اتصال به پنل VPN)
│   ├── requirements.txt
│   ├── seed_plans.py        اسکریپت افزودن پلن نمونه
│   └── .env.example
└── bot/              ← ربات تلگرام (فقط باز کردن Mini App)
    ├── bot.py
    ├── requirements.txt
    └── .env.example
```

---

## ۳) راه‌اندازی بک‌اند

در ترمینال VS Code (Terminal → New Terminal):

```bash
cd backend
python3 -m venv venv
```

فعال‌سازی محیط مجازی:
- **مک/لینوکس:** `source venv/bin/activate`
- **ویندوز:** `venv\Scripts\activate`

نصب پکیج‌ها:
```bash
pip install -r requirements.txt
```

ساخت فایل تنظیمات:
```bash
cp .env.example .env
```
حالا فایل `.env` را باز کن و `BOT_TOKEN` را با توکنی که از BotFather گرفتی جایگزین کن.

اضافه کردن چند پلن نمونه به دیتابیس:
```bash
python seed_plans.py
```

اجرای سرور:
```bash
uvicorn app.main:app --reload --port 8000
```

حالا در مرورگر برو به: `http://127.0.0.1:8000/docs`
باید صفحه‌ی مستندات خودکار API (Swagger) را ببینی و بتوانی `/api/v1/plans` را تست کنی.

---

## ۴) راه‌اندازی ربات تلگرام

یک ترمینال **جدید** باز کن (ترمینال قبلی را برای سرور نگه دار):

```bash
cd bot
python3 -m venv venv
source venv/bin/activate   # ویندوز: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

فایل `bot/.env` را باز کن:
- `BOT_TOKEN` را همان توکن BotFather بگذار
- `MINIAPP_URL` را فعلاً همان `http://127.0.0.1:8000` بگذار (برای تست اولیه؛ در فاز ۲ که فرانت‌اند واقعی ساختیم درستش می‌کنیم)

اجرا:
```bash
python bot.py
```

حالا در تلگرام به بات خودت پیام `/start` بده. باید دکمه‌ی «باز کردن اپلیکیشن NovaVPN» را ببینی.

> ⚠️ نکته: تلگرام برای Mini App به آدرس **HTTPS** نیاز دارد، نه `http://127.0.0.1`.
> برای تست محلی از [ngrok](https://ngrok.com/) استفاده کن:
> ```bash
> ngrok http 8000
> ```
> آدرس https که ngrok می‌دهد را در `MINIAPP_URL` بگذار.

---

## ۵) راه‌اندازی فرانت‌اند (فاز ۲)

پیش‌نیاز: **Node.js نسخه ۱۸ یا بالاتر** — از [nodejs.org](https://nodejs.org) نصب کن.
بررسی نسخه: `node --version`

ساختار فرانت‌اند:
```
frontend/
├── src/
│   ├── main.tsx              نقطه ورود - Providerهای React Query و Telegram
│   ├── App.tsx                تعریف مسیرها (Router)
│   ├── index.css              استایل پایه + متغیرهای رنگ تم تلگرام
│   ├── pages/
│   │   ├── Home.tsx            صفحه خانه
│   │   ├── Plans.tsx           لیست پلن‌ها (متصل به بک‌اند)
│   │   ├── Purchase.tsx        قالب اولیه (کامل در فاز ۳)
│   │   ├── Subscriptions.tsx   قالب اولیه (کامل در فاز ۳)
│   │   ├── Profile.tsx         پروفایل کاربر
│   │   └── NotFound.tsx
│   ├── components/             PlanCard, BottomNav, Loader, ErrorState
│   ├── layouts/MainLayout.tsx  چارچوب مشترک صفحات (هدر + نوار پایین)
│   ├── context/TelegramContext.tsx   اتصال به Telegram WebApp SDK
│   ├── api/client.ts           کلاینت مرکزی - initData را در هدر می‌فرستد
│   ├── services/               plans.ts, users.ts
│   ├── hooks/                  usePlans.ts, useProfile.ts
│   └── types/                  تایپ‌های داده و Telegram SDK
├── index.html                  شامل اسکریپت رسمی Telegram Mini App
├── package.json
└── vite.config.ts
```

نصب و اجرا:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

مرورگر را روی `http://localhost:5173` باز کن. چون خارج از تلگرام هستی، پیام "باید داخل تلگرام باز شود" را می‌بینی — این طبیعی و عمدی است (یعنی امنیت initData درست کار می‌کند).

### تست واقعی داخل تلگرام

۱. بک‌اند را طبق بخش ۳ اجرا کن (پورت ۸۰۰۰).
۲. فرانت‌اند را طبق بالا اجرا کن (پورت ۵۱۷۳).
۳. یک تانل HTTPS برای فرانت‌اند بزن (تلگرام فقط HTTPS قبول می‌کند):
```bash
ngrok http 5173
```
۴. آدرس https که ngrok داد را در `bot/.env` به‌عنوان `MINIAPP_URL` بگذار.
۵. در `frontend/.env`، مقدار `VITE_API_URL` را هم باید از طریق یک تانل HTTPS دیگر برای بک‌اند بدهی (یا هر دو را روی یک سرور واقعی با دامنه HTTPS بالا بیاوری - در فاز دیپلوی این را حرفه‌ای‌تر می‌کنیم).
۶. ربات را اجرا کن، `/start` بزن، دکمه را بزن — باید صفحه‌ی خانه با نامت و لیست پلن‌ها را ببینی.

---

## ۶) مرحله بعد

بگو **"فاز ۳"** تا این‌ها اضافه شوند:
- صفحه‌ی خرید کامل (انتخاب پلن → نمایش اطلاعات کارت → آپلود رسید)
- روت‌های بک‌اند برای ثبت سفارش و آپلود فایل رسید (ذخیره‌سازی امن فایل)
- پنل تایید/رد پرداخت برای ادمین
