import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, ShieldCheck, User } from "lucide-react";

const items = [
  { to: "/", label: "خانه", icon: Home },
  { to: "/plans", label: "پلن‌ها", icon: ShoppingBag },
  { to: "/subscriptions", label: "اشتراک‌ها", icon: ShieldCheck },
  { to: "/profile", label: "پروفایل", icon: User },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 flex border-t border-tg-secondary-bg bg-tg-bg pb-[env(safe-area-inset-bottom)]">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-1 py-2 text-[11px] ${
              isActive ? "text-tg-accent" : "text-tg-hint"
            }`
          }
        >
          <Icon size={22} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
