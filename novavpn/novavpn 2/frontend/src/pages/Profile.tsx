import { MainLayout } from "@/layouts/MainLayout";
import { useProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/Loader";

export function Profile() {
  const { data: profile, isLoading } = useProfile();

  return (
    <MainLayout title="پروفایل">
      {isLoading && <Loader />}
      {profile && (
        <div className="flex flex-col gap-3 rounded-card bg-tg-secondary-bg p-4">
          <div className="flex justify-between text-sm">
            <span className="text-tg-hint">نام</span>
            <span className="text-tg-text">{profile.first_name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-tg-hint">یوزرنیم</span>
            <span className="text-tg-text">@{profile.username || "—"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-tg-hint">شناسه تلگرام</span>
            <span className="text-tg-text">{profile.telegram_id}</span>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
