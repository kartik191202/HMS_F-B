import type { ReactNode } from "react";

export function FieldWrapper({ label, required, children, className = "" }: { label: string; required?: boolean; children: ReactNode; className?: string }) {
  return <label className={`block ${className}`}><span className="mb-1 block text-xs font-medium text-ink-muted">{label} {required && <span className="text-rose-500">*</span>}</span>{children}</label>;
}

export const inputClasses = "w-full rounded-md border border-line-neutral bg-surface px-3 py-2 text-sm text-ink-strong shadow-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-brand focus:ring-2 focus:ring-brand/30";
