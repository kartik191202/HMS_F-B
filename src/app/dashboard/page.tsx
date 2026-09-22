import { ModulePage } from "@/components/layout/ModulePage";
export default function DashboardPage() {
  return (
    <ModulePage
      title="Hospital Dashboard"
      subtitle="Operational overview across your hospital workspace"
      stats={[
        { label: "Today's OPD visits", value: "128" },
        { label: "Occupied beds", value: "64", tone: "warning" },
        { label: "Pending bills", value: "18", tone: "danger" },
        { label: "Doctors on duty", value: "24", tone: "positive" },
      ]}
      action="View Reports"
    >
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700">Quick actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <a
            href="/opd/registration"
            className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Register patient
          </a>
          <a
            href="/opd/patient-search"
            className="rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Search patient
          </a>
          <a
            href="/billing/opd-billing"
            className="rounded-md border border-slate-200 p-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Open billing
          </a>
        </div>
      </section>
    </ModulePage>
  );
}
