import type { ReactNode } from "react";

export function FieldWrapper({ label, required, children, className = "" }: { label: string; required?: boolean; children: ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-1 block text-xs font-medium text-slate-600">{label} {required && <span className="text-rose-500">*</span>}</span>{children}</label>;
}

export const inputClasses = "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30";
