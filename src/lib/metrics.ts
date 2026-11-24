export type DealStage = "discovery" | "proposal" | "won" | "retainer";

export interface DealRecord {
  id: string;
  accountName: string;
  serviceLine: string;
  stage: DealStage;
  contractValueUsd: number;
  monthlyRetainerUsd: number;
  slaUptimePct: number;
}

export interface KpiSummary {
  totalDeals: number;
  totalPipelineUsd: number;
  activeMrrUsd: number;
  wonRevenueUsd: number;
  averageSlaUptimePct: number;
}

export const SAMPLE_DEALS: DealRecord[] = [
  {
    id: "DL-101",
    accountName: "Northwind Logistics Group",
    serviceLine: "WhatsApp AI Closer + n8n",
    stage: "retainer",
    contractValueUsd: 7500,
    monthlyRetainerUsd: 1800,
    slaUptimePct: 99.95
  },
  {
    id: "DL-102",
    accountName: "Vanguard MedTech Ops",
    serviceLine: "Enterprise RAG API",
    stage: "won",
    contractValueUsd: 9800,
    monthlyRetainerUsd: 2200,
    slaUptimePct: 99.9
  },
  {
    id: "DL-103",
    accountName: "Beacon Fintech Studio",
    serviceLine: "14-Day SaaS MVP Sprint",
    stage: "proposal",
    contractValueUsd: 12000,
    monthlyRetainerUsd: 1500,
    slaUptimePct: 99.85
  },
  {
    id: "DL-104",
    accountName: "Summit Retail Partners",
    serviceLine: "Vibe-to-Production Rescue",
    stage: "discovery",
    contractValueUsd: 5500,
    monthlyRetainerUsd: 800,
    slaUptimePct: 99.8
  }
];

export function computeKpiSummary(deals: DealRecord[]): KpiSummary {
  if (deals.length === 0) {
    return {
      totalDeals: 0,
      totalPipelineUsd: 0,
      activeMrrUsd: 0,
      wonRevenueUsd: 0,
      averageSlaUptimePct: 0
    };
  }

  let totalPipelineUsd = 0;
  let activeMrrUsd = 0;
  let wonRevenueUsd = 0;
  let slaSum = 0;

  for (const deal of deals) {
    totalPipelineUsd += deal.contractValueUsd;
    slaSum += deal.slaUptimePct;
    if (deal.stage === "won" || deal.stage === "retainer") {
      wonRevenueUsd += deal.contractValueUsd;
      activeMrrUsd += deal.monthlyRetainerUsd;
    }
  }

  return {
    totalDeals: deals.length,
    totalPipelineUsd,
    activeMrrUsd,
    wonRevenueUsd,
    averageSlaUptimePct: Number((slaSum / deals.length).toFixed(2))
  };
}

export function filterDealsByStage(deals: DealRecord[], stage?: DealStage | "all"): DealRecord[] {
  if (!stage || stage === "all") {
    return deals;
  }
  return deals.filter((deal) => deal.stage === stage);
}
