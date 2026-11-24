import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_DEALS, computeKpiSummary, filterDealsByStage, type DealStage } from "@/lib/metrics";

const ALLOWED_STAGES = new Set<string>(["all", "discovery", "proposal", "won", "retainer"]);

export async function GET(request: NextRequest) {
  const stageParam = request.nextUrl.searchParams.get("stage") ?? "all";
  if (!ALLOWED_STAGES.has(stageParam)) {
    return NextResponse.json({ error: "Unsupported deal stage filter" }, { status: 400 });
  }

  const filtered = filterDealsByStage(
    SAMPLE_DEALS,
    stageParam === "all" ? "all" : (stageParam as DealStage)
  );

  return NextResponse.json(
    {
      status: "ok",
      summary: computeKpiSummary(filtered),
      deals: filtered
    },
    { status: 200 }
  );
}
