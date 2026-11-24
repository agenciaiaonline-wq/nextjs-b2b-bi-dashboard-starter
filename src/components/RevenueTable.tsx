import type { DealRecord } from "@/lib/metrics";

export function RevenueTable({ deals }: { deals: DealRecord[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-800 bg-slate-900 text-xs uppercase text-slate-400">
          <tr>
            <th className="px-4 py-3">Deal</th>
            <th className="px-4 py-3">Client Account</th>
            <th className="px-4 py-3">Service Line</th>
            <th className="px-4 py-3">Stage</th>
            <th className="px-4 py-3">Implementation</th>
            <th className="px-4 py-3">Monthly SLA</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/70">
          {deals.map((deal) => (
            <tr key={deal.id} className="hover:bg-slate-800/30">
              <td className="px-4 py-3 font-mono text-xs text-slate-400">{deal.id}</td>
              <td className="px-4 py-3 font-medium text-white">{deal.accountName}</td>
              <td className="px-4 py-3 text-slate-300">{deal.serviceLine}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs text-indigo-300">
                  {deal.stage}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-200">${deal.contractValueUsd.toLocaleString("en-US")}</td>
              <td className="px-4 py-3 text-emerald-300">${deal.monthlyRetainerUsd.toLocaleString("en-US")}/mo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
