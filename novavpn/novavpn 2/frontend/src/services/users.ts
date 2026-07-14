import { apiClient } from "@/api/client";
import type { UserProfile } from "@/types";

export const usersService = {
  me: () => apiClient.get<UserProfile>("/api/v1/users/me"),
};
