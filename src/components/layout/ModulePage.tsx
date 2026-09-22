import { AppShell } from "./AppShell";

type Stat = { label: string; value: string; tone?: "default" | "positive" | "warning" | "danger" };
const tones = { default: "text-slate-800", positive: "text-emerald-600", warning: "text-amber-600", danger: "text-rose-600" };

export function ModulePage({ title, subtitle, action, stats, children }: { title: string; subtitle: string; action?: string; stats: Stat[]; children: React.ReactNode }) {
  return <AppShell><div className="mx-auto max-w-6xl">
    <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"><div><h1 className="text-lg font-semibold text-slate-800">{title}</h1><p className="text-xs text-slate-400">{subtitle}</p></div>{action && <button type="button" className="rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700">{action}</button>}</header>
    <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">{stats.map((stat) => <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs text-slate-400">{stat.label}</p><p className={`mt-1 text-xl font-semibold ${tones[stat.tone ?? "default"]}`}>{stat.value}</p></div>)}</div>
    {children}
  </div></AppShell>;
}
