import { createFileRoute } from "@tanstack/react-router";
import { ActivityChart } from "@/components/app/ActivityChart";
import { MetricCards } from "@/components/app/MetricCards";
import { RecentFlaggedTable } from "@/components/app/RecentFlaggedTable";
import { RiskDistributionCard } from "@/components/app/RiskDistributionCard";
import { RiskIntelligencePanel } from "@/components/app/RiskIntelligencePanel";
import { SystemStatusCard } from "@/components/app/SystemStatusCard";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Overview — FinTech Anomaly Detection" },
      {
        name: "description",
        content:
          "High-level transaction monitoring overview, risk scoring distributions, and recent detected anomalies.",
      },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <div className="space-y-8">
      {/* 4 Metric Cards */}
      <MetricCards />

      {/* Primary Workspace Grid: 2 columns (Left: Charts & Table, Right: Intelligence & Status) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols on lg) */}
        <div className="space-y-8 lg:col-span-8">
          <ActivityChart />
          <RecentFlaggedTable />
        </div>

        {/* Right Column (4 cols on lg) */}
        <div className="space-y-8 lg:col-span-4">
          <RiskIntelligencePanel />
          <RiskDistributionCard />
          <SystemStatusCard />
        </div>
      </div>
    </div>
  );
}
