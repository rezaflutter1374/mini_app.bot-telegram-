/**
 * کلاینت مرکزی برای صحبت با بک‌اند.
 * نکته‌ی امنیتی مهم: initData در همه‌ی درخواست‌ها به‌صورت خودکار در هدر
 * X-Telegram-Init-Data فرستاده می‌شود. بک‌اند هرگز به هیچ فیلد دیگری
 * (مثل telegram_id ارسالی در body) برای شناسایی کاربر اعتماد نمی‌کند.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL as string;

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const initData = window.Telegram?.WebApp?.initData ?? "";

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Telegram-Init-Data": initData,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ detail: "خطای ناشناخته" }));
    throw new ApiError(response.status, body.detail ?? "خطا در ارتباط با سرور");
  }

  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, data?: unknown) =>
    request<T>(path, { method: "POST", body: data ? JSON.stringify(data) : undefined }),
};
