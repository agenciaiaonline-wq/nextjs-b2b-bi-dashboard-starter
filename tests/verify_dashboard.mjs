import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

import { SAMPLE_DEALS, computeKpiSummary, filterDealsByStage } from "../src/lib/metrics.ts";

const ROOT = path.resolve(import.meta.dirname, "..");

test("computeKpiSummary aggregates won revenue, active MRR, and SLA average accurately", () => {
  const summary = computeKpiSummary(SAMPLE_DEALS);
  assert.equal(summary.totalDeals, 4);
  assert.equal(summary.totalPipelineUsd, 34800);
  assert.equal(summary.wonRevenueUsd, 17300);
  assert.equal(summary.activeMrrUsd, 4000);
  assert.equal(summary.averageSlaUptimePct, 99.88);
});

test("filterDealsByStage isolates stage slices and handles empty input", () => {
  const retainers = filterDealsByStage(SAMPLE_DEALS, "retainer");
  assert.equal(retainers.length, 1);
  assert.equal(retainers[0].id, "DL-101");

  const emptySummary = computeKpiSummary([]);
  assert.equal(emptySummary.totalDeals, 0);
  assert.equal(emptySummary.averageSlaUptimePct, 0);
});

test("required starter files and strict tsconfig exist", () => {
  const tsconfig = JSON.parse(fs.readFileSync(path.join(ROOT, "tsconfig.json"), "utf8"));
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  assert.equal(tsconfig.compilerOptions.strict, true);
  assert.equal(pkg.name, "nextjs-b2b-bi-dashboard-starter");

  for (const rel of [
    ".env.example",
    "SECURITY.md",
    "next.config.ts",
    "src/app/page.tsx",
    "src/app/api/metrics/route.ts",
    "src/components/KpiCards.tsx",
    "src/components/RevenueTable.tsx"
  ]) {
    assert.ok(fs.existsSync(path.join(ROOT, rel)), `Missing file: ${rel}`);
  }
});
