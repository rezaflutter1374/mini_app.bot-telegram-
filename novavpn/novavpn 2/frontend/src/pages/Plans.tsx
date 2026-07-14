import { MainLayout } from "@/layouts/MainLayout";
import { usePlans } from "@/hooks/usePlans";
import { PlanCard } from "@/components/PlanCard";
import { Loader } from "@/components/Loader";
import { ErrorState } from "@/components/ErrorState";
import type { Plan } from "@/types";
import { useNavigate } from "react-router-dom";

export function Plans() {
  const { data: plans, isLoading, isError } = usePlans();
  const navigate = useNavigate();

  function handleSelect(plan: Plan) {
    // فاز ۳: هدایت به صفحه‌ی خرید و آپلود رسید با شناسه‌ی پلن انتخاب‌شده
    navigate(`/purchase/${plan.id}`);
  }

  return (
    <MainLayout title="پلن‌ها">
      {isLoading && <Loader />}
      {isError && <ErrorState message="دریافت پلن‌ها با خطا مواجه شد." />}

      {plans && plans.length === 0 && <ErrorState message="فعلاً پلنی برای فروش وجود ندارد." />}

      {plans && plans.length > 0 && (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onSelect={handleSelect} />
          ))}
        </div>
      )}
    </MainLayout>
  );
}
