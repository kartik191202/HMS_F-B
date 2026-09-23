import type { ReactNode } from "react";

export function SectionCard({ number, title, children, className = "" }: { number?: number; title: string; children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-line-neutral bg-surface p-5 shadow-sm ${className}`}>
    <div className="mb-4 flex items-center gap-2">{number !== undefined && <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">{number}</span>}<h2 className="text-sm font-semibold tracking-wide text-ink-strong">{title}</h2></div>
    {children}
  </section>;
}
