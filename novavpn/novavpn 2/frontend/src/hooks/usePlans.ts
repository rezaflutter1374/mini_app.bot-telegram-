import { useQuery } from "@tanstack/react-query";
import { plansService } from "@/services/plans";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: plansService.list,
    staleTime: 60_000, // پلن‌ها زیاد عوض نمی‌شوند، کش یک‌دقیقه‌ای کافیست
  });
}
