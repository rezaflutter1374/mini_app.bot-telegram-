import { MainLayout } from "@/layouts/MainLayout";
import { useProfile } from "@/hooks/useProfile";
import { useTelegram } from "@/context/TelegramContext";
import { Loader } from "@/components/Loader";
import { ErrorState } from "@/components/ErrorState";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  const { isInsideTelegram } = useTelegram();
  const { data: profile, isLoading, isError } = useProfile();

  return (
    <MainLayout title="خانه">
      {!isInsideTelegram && (
        <ErrorState message="این صفحه باید داخل اپلیکیشن تلگرام باز شود تا احراز هویت انجام شود." />
      )}

      {isInsideTelegram && isLoading && <Loader />}
      {isInsideTelegram && isError && <ErrorState message="اتصال به سرور برقرار نشد." />}

      {profile && (
        <div className="flex flex-col gap-4">
          <div className="rounded-card bg-tg-secondary-bg p-4">
            <p className="text-sm text-tg-hint">خوش اومدی،</p>
            <p className="text-lg font-bold text-tg-text">{profile.first_name || "کاربر"} 👋</p>
          </div>

          <Link
            to="/plans"
            className="flex items-center justify-center gap-2 rounded-card bg-tg-button py-3 font-semibold text-tg-button-text"
          >
            <ShieldCheck size={18} />
            دیدن پلن‌های VPN
          </Link>

          <div className="rounded-card bg-tg-secondary-bg p-4 text-sm text-tg-hint">
            هنوز اشتراک فعالی نداری. با انتخاب یک پلن، اولین اشتراکت رو بساز.
          </div>
        </div>
      )}
    </MainLayout>
  );
}
