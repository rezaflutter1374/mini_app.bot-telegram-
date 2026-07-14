import { apiClient } from "@/api/client";
import type { Plan } from "@/types";

export const plansService = {
  list: () => apiClient.get<Plan[]>("/api/v1/plans"),
};
