"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export function Header() {
  const user = useCurrentUser();

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

      <div className="text-right text-sm">
        <p className="font-semibold text-slate-800">
          {user?.name ?? "User"}
        </p>
        <p className="text-xs text-slate-500">
          {user?.locationName ?? "Location unavailable"}
        </p>
      </div>
    </header>
  );
}
