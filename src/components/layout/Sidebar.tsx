"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const sections = [
  {
    title: "Workspace",
    items: [
      ["Dashboard", "/dashboard"],
      ["OPD", "/opd/registration"],
      ["IPD", "/ipd"],
    ],
  },
  {
    title: "Operations",
    items: [
      ["Billing", "/billing"],
      ["Patient Search", "/opd/patient-search"],
      ["Doctor Master", "/opd/masters/doctor"],
    ],
  },
];
export function Sidebar() {
  const user = useCurrentUser();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const filteredSections = useMemo(
    () =>
      sections
        .map((section) => ({
          ...section,
          items: section.items.filter(([label]) =>
            label.toLowerCase().includes(query.toLowerCase()),
          ),
        }))
        .filter((section) => section.items.length),
    [query],
  );

  return (
    <aside
      className={`${collapsed ? "w-[72px]" : "w-64"} shrink-0 border-r border-slate-800 bg-slate-950 text-slate-300 transition-[width] duration-200`}
    >
      <div className="flex min-h-screen flex-col">
        <div className="border-b border-slate-800 px-3 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-sm font-bold text-white">
              M
            </span>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  MediNext HMS
                </p>
                <p className="truncate text-[10px] uppercase tracking-wide text-slate-500">
                  Enterprise workspace
                </p>
              </div>
            )}
          </div>
        </div>
        {!collapsed && (
          <div className="px-3 pt-4">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search modules…"
              className="w-full rounded-md border border-slate-800 bg-slate-900 px-2.5 py-2 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-emerald-600"
            />
          </div>
        )}
        <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-5">
          {filteredSections.map((section) => (
            <div key={section.title}>
              {!collapsed && (
                <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {section.title}
                </p>
              )}
              <ul className="space-y-1">
                {section.items.map(([label, href]) => {
                  const active =
                    pathname === href || pathname.startsWith(`${href}/`);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        title={collapsed ? label : undefined}
                        className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors ${active ? "bg-emerald-500 font-medium text-white" : "hover:bg-slate-800 hover:text-white"} ${collapsed ? "justify-center" : ""}`}
                      >
                        <span className="text-xs">●</span>
                        {!collapsed && (
                          <span className="truncate">{label}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
        {!collapsed && (
          <div className="border-t border-slate-800 px-3 py-3">
            <p className="truncate text-xs font-medium text-slate-200">
              {user?.name ?? "User"}
            </p>
            <p className="truncate text-[11px] text-slate-500">
              {user?.locationName ?? "Location unavailable"}
            </p>
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setCollapsed((value) => !value);
            setQuery("");
          }}
          className="border-t border-slate-800 px-3 py-3 text-xs text-slate-400 hover:bg-slate-900 hover:text-white"
        >
          {collapsed ? "→" : "← Collapse"}
        </button>
      </div>
    </aside>
  );
}
