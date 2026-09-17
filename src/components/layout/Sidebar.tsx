import Link from "next/link";

const links = [
  ["Dashboard", "/dashboard"],
  ["OPD", "/opd"],
  ["IPD", "/ipd"],
  ["Billing", "/billing"],
];
export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 border-r bg-slate-900 p-4 text-white">
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
