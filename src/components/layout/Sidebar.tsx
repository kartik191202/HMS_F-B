import Link from "next/link";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const links = [
  ["Dashboard", "/dashboard"],
  ["OPD", "/opd"],
  ["IPD", "/ipd"],
  ["Billing", "/billing"],
];
export function Sidebar() {
  const user = useCurrentUser();

  return (
    <aside className="w-60 shrink-0 border-r bg-slate-900 p-4 text-white">
      <div className="mb-6 border-b border-slate-700 pb-4">
        <p className="truncate text-sm font-semibold">
          {user?.name ?? "User"}
        </p>
        <p className="truncate text-xs text-slate-400">
          {user?.locationName ?? "Location unavailable"}
        </p>
      </div>

      <nav className="space-y-2">
        {links.map(([label, href]) => (
          <Link
            className="block rounded px-3 py-2 text-sm hover:bg-slate-700"
            href={href}
            key={href}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
