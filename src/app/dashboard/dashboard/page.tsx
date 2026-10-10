import { AppShell } from "@/components/layout/AppShell";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard</h2>
        <p className="mt-2 text-sm text-slate-600">
          The foundation for the OHMIND Admin experience is now in place.
        </p>
      </div>
    </AppShell>
  );
}
