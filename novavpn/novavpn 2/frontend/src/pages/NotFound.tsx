import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-tg-bg text-tg-text">
      <p className="text-lg font-bold">صفحه پیدا نشد</p>
      <Link to="/" className="text-tg-link">
        بازگشت به خانه
      </Link>
    </div>
  );
}
