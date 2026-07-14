import { MainLayout } from "@/layouts/MainLayout";
import { ErrorState } from "@/components/ErrorState";

export function Subscriptions() {
  return (
    <MainLayout title="اشتراک‌های من">
      <ErrorState message="این بخش در فاز بعدی تکمیل می‌شود (نمایش وضعیت، ترافیک و لینک اتصال)." />
    </MainLayout>
  );
}
