import { Wifi, Clock, ChevronLeft } from "lucide-react";
import type { Plan } from "@/types";

interface Props {
  plan: Plan;
  onSelect: (plan: Plan) => void;
}

function formatToman(value: number): string {
  return new Intl.NumberFormat("fa-IR").format(value) + " تومان";
}

export function PlanCard({ plan, onSelect }: Props) {
  const isUnlimited = plan.traffic_gb >= 100000;

  return (
    <button
      onClick={() => onSelect(plan)}
      className="flex w-full items-center justify-between rounded-card bg-tg-secondary-bg p-4 text-right transition active:scale-[0.98]"
    >
      <div className="flex flex-col gap-2">
        <span className="font-semibold text-tg-text">{plan.name}</span>
        <div className="flex items-center gap-3 text-xs text-tg-hint">
          <span className="flex items-center gap-1">
            <Wifi size={14} />
            {isUnlimited ? "نامحدود" : `${plan.traffic_gb} گیگابایت`}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {plan.duration_days} روز
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-tg-accent">{formatToman(plan.price_toman)}</span>
        <ChevronLeft size={18} className="text-tg-hint" />
      </div>
    </button>
  );
}
