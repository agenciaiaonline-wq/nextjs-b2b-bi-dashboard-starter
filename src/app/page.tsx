import { KpiCards } from "@/components/KpiCards";
import { RevenueTable } from "@/components/RevenueTable";
import { SAMPLE_DEALS, computeKpiSummary } from "@/lib/metrics";

export default function DashboardHomePage() {
  const summary = computeKpiSummary(SAMPLE_DEALS);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Golden Nodalix Operations Portal
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Executive Revenue & SLA Telemetry
          </h1>
        </div>
        <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
          {summary.totalDeals} Active Client Accounts
        </span>
      </header>

      <KpiCards summary={summary} />
      <RevenueTable deals={SAMPLE_DEALS} />
    </main>
  );
}
