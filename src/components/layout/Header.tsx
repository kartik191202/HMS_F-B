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
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div>
        <p className="m-0 text-lg font-bold text-blue-700">
          MediNext HMS
        </p>
        <p className="m-0 text-xs text-slate-500">
          Hospital Management System
        </p>
      </div>

      <div className="flex items-center gap-4 text-sm">
        <div className="text-right">
          <p className="font-semibold text-slate-800">
            {user?.name ?? "User"}
          </p>
          <p className="text-xs text-slate-500">
            {user?.locationName ?? "Location unavailable"}
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
