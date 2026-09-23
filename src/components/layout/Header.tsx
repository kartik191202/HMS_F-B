"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-line-neutral bg-surface px-4 shadow-sm sm:px-6">
      <div>
          <p className="m-0 text-lg font-bold text-brand">
          MediNext HMS
        </p>
        <p className="m-0 text-xs text-ink-muted">
          Hospital Management System
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="text-right">
          <p className="font-semibold text-ink-strong">
            {user?.name ?? "User"}
          </p>
          <p className="text-xs text-ink-muted">
            {user?.locationName ?? "Location unavailable"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-line-neutral px-3 py-1.5 text-xs font-semibold text-ink-muted transition-colors hover:bg-surface-muted"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
