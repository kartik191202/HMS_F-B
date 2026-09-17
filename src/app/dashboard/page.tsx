import { AppShell } from "@/components/layout/AppShell";
export default function DashboardPage() 
{
     return <AppShell>
        <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Today&apos;s OPD visits</p>
                <p className="text-3xl font-bold">128</p>    
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Occupied beds</p>
                <p className="text-3xl font-bold">64</p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Pending bills</p>
                <p className="text-3xl font-bold">18</p>
            </div>
        </div>
    </AppShell>;
}
