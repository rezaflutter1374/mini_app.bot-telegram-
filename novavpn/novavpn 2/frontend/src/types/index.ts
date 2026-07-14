// این تایپ‌ها دقیقاً باید با app/schemas.py در بک‌اند هماهنگ بمانند

export interface UserProfile {
  id: number;
  telegram_id: number;
  first_name: string;
  username: string;
  is_admin: boolean;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  price_toman: number;
  duration_days: number;
  traffic_gb: number;
}

export interface Order {
  id: number;
  plan_id: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Subscription {
  id: number;
  uuid: string;
  subscription_url: string;
  traffic_gb: number;
  status: "active" | "expired" | "disabled";
  expire_at: string;
}
