import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import type { TelegramWebApp } from "@/types/telegram";

interface TelegramContextValue {
  webApp: TelegramWebApp | null;
  isInsideTelegram: boolean;
  initData: string;
  colorScheme: "light" | "dark";
}

const TelegramContext = createContext<TelegramContextValue | null>(null);

/**
 * متغیرهای رنگی CSS (تعریف‌شده در index.css) را با تم واقعی کاربر تلگرام
 * جایگزین می‌کند تا رنگ اپ دقیقاً با تم روشن/تاریک کاربر یکی باشد.
 */
function applyTelegramTheme(webApp: TelegramWebApp) {
  const root = document.documentElement;
  const t = webApp.themeParams;

  if (t.bg_color) root.style.setProperty("--tg-bg", t.bg_color);
  if (t.secondary_bg_color) root.style.setProperty("--tg-secondary-bg", t.secondary_bg_color);
  if (t.text_color) root.style.setProperty("--tg-text", t.text_color);
  if (t.hint_color) root.style.setProperty("--tg-hint", t.hint_color);
  if (t.link_color) root.style.setProperty("--tg-link", t.link_color);
  if (t.button_color) root.style.setProperty("--tg-button", t.button_color);
  if (t.button_text_color) root.style.setProperty("--tg-button-text", t.button_text_color);
  if (t.accent_text_color) root.style.setProperty("--tg-accent", t.accent_text_color);
}

export function TelegramProvider({ children }: { children: ReactNode }) {
  const webApp = window.Telegram?.WebApp ?? null;

  useEffect(() => {
    if (!webApp) return;
    webApp.ready(); // به تلگرام می‌گوید اپ آماده‌ی نمایش است (اسپلش‌اسکرین را جمع می‌کند)
    webApp.expand(); // اپ را به حالت تمام‌صفحه باز می‌کند
    applyTelegramTheme(webApp);
  }, [webApp]);

  const value = useMemo<TelegramContextValue>(
    () => ({
      webApp,
      isInsideTelegram: Boolean(webApp),
      initData: webApp?.initData ?? "",
      colorScheme: webApp?.colorScheme ?? "light",
    }),
    [webApp],
  );

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>;
}

export function useTelegram() {
  const ctx = useContext(TelegramContext);
  if (!ctx) throw new Error("useTelegram باید داخل TelegramProvider استفاده شود");
  return ctx;
}
