import { useParams } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { ErrorState } from "@/components/ErrorState";

export function Purchase() {
  const { planId } = useParams();

  return (
    <MainLayout title="خرید پلن">
      <ErrorState
        message={`صفحه‌ی پرداخت و آپلود رسید برای پلن #${planId} در فاز ۳ ساخته می‌شود.`}
      />
    </MainLayout>
  );
}
