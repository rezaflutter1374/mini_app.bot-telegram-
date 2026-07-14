/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // این رنگ‌ها مستقیم از تم فعلی کاربر در تلگرام (روشن/تاریک) خوانده می‌شوند
        // بنابراین اپ همیشه با ظاهر تلگرام خود کاربر هماهنگ است، نه یک تم ثابت
        tg: {
          bg: "var(--tg-bg)",
          "secondary-bg": "var(--tg-secondary-bg)",
          text: "var(--tg-text)",
          hint: "var(--tg-hint)",
          link: "var(--tg-link)",
          button: "var(--tg-button)",
          "button-text": "var(--tg-button-text)",
          accent: "var(--tg-accent)",
        },
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
