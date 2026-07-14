import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";

interface Props {
  title: string;
  children: ReactNode;
}

export function MainLayout({ title, children }: Props) {
  return (
    <div className="min-h-screen bg-tg-bg pb-20">
      <header className="sticky top-0 z-10 bg-tg-bg px-4 pb-3 pt-4">
        <h1 className="text-xl font-bold text-tg-text">{title}</h1>
      </header>

      <main className="px-4">{children}</main>

      <BottomNav />
    </div>
  );
}
