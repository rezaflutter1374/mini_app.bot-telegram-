import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users";
import { useTelegram } from "@/context/TelegramContext";

export function useProfile() {
  const { isInsideTelegram } = useTelegram();

  return useQuery({
    queryKey: ["profile"],
    queryFn: usersService.me,
    enabled: isInsideTelegram, // بدون initData معتبر اصلاً درخواست نزن
    retry: false,
  });
}
