import type { KpiSummary } from "@/lib/metrics";

export function KpiCards({ summary }: { summary: KpiSummary }) {
  const cards = [
    { label: "Total Pipeline", value: `$${summary.totalPipelineUsd.toLocaleString("en-US")}` },
    { label: "Won Contract Value", value: `$${summary.wonRevenueUsd.toLocaleString("en-US")}` },
    { label: "Active Monthly Retainer (MRR)", value: `$${summary.activeMrrUsd.toLocaleString("en-US")}/mo` },
    { label: "Average SLA Uptime", value: `${summary.averageSlaUptimePct}%` }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.label}</p>
          <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
