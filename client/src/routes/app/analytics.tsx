import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { BarChart3, Clock, Globe, Layers, TrendingUp } from "lucide-react";
import { analyticsQuery } from "@/data/queries";
import { ActivityChart } from "@/components/app/ActivityChart";
import { RiskDistributionCard } from "@/components/app/RiskDistributionCard";
import { fmtCompact, fmtNumber } from "@/lib/format";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [{ title: "Analytics — FinTech Anomaly Detection" }],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { data: analytics, isLoading } = useQuery(analyticsQuery);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Statistical & Behavioral Analytics
          </h1>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.68rem] text-primary-glow font-medium">
            Aggregated Insights
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Diurnal velocity analysis, amount distributions, geographic concentrations, and historical anomaly moving averages.
        </p>
      </div>

      {/* Row 1: Main Velocity Chart (8 cols) + Risk Distribution (4 cols) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <ActivityChart />
        </div>
        <div className="lg:col-span-4">
          <RiskDistributionCard />
        </div>
      </div>

      {/* Row 2: Hour of Day Diurnal Profile & Amount Distribution */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hour of Day Diurnal Volume Chart */}
        <div className="panel-raised p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg border border-border bg-surface-raised text-primary">
                <Clock className="size-4 text-blue" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  24-Hour Diurnal Volume & Night Spike Profile
                </h3>
                <p className="text-xs text-muted-foreground">
                  Hourly transaction volume vs. nocturnal anomaly clustering
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">UTC Hours</span>
          </div>

          <div className="mt-4 flex items-center gap-6 border-t border-border/70 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded bg-blue" />
              <span className="text-muted-foreground">Total Ingestion Volume</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded bg-magenta" />
              <span className="text-muted-foreground">Anomalies Detected</span>
            </div>
          </div>

          <div className="mt-4 h-[250px] w-full">
            {isLoading || !analytics ? (
              <div className="flex size-full items-center justify-center">
                <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.hours} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(h) => `${h}:00`}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => fmtCompact(v)}
                  />
                  <Tooltip content={<HourTooltip />} />
                  <Bar dataKey="volume" name="Total Volume" fill="var(--color-blue)" opacity={0.65} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="anomalies" name="Anomalies" fill="var(--color-magenta)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Amount Distribution Histogram */}
        <div className="panel-raised p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg border border-border bg-surface-raised text-amber">
                <BarChart3 className="size-4 text-amber" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Transaction Amount Distribution
                </h3>
                <p className="text-xs text-muted-foreground">
                  Volume breakdown across financial band sizes
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">USD Bands</span>
          </div>

          <div className="mt-4 flex items-center gap-6 border-t border-border/70 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded bg-blue" />
              <span className="text-muted-foreground">Normal Transactions</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded bg-amber" />
              <span className="text-muted-foreground">High Risk / Anomalous</span>
            </div>
          </div>

          <div className="mt-4 h-[250px] w-full">
            {isLoading || !analytics ? (
              <div className="flex size-full items-center justify-center">
                <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.amounts} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
                  <XAxis
                    dataKey="band"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => fmtCompact(v)}
                  />
                  <Tooltip content={<AmountTooltip />} />
                  <Bar dataKey="count" name="Total Count" fill="var(--color-blue)" opacity={0.6} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="anomalous" name="Anomalous" fill="var(--color-amber)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Row 3: Geographic Distribution & 12-Week Moving Anomaly Trend */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Geographic Origin Ranking */}
        <div className="panel-raised p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg border border-border bg-surface-raised">
                <Globe className="size-4 text-lime" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  Geographic Origin Breakdown
                </h3>
                <p className="text-xs text-muted-foreground">
                  Country-level volume and anomaly density ranking
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {analytics?.geo.length ?? 0} Jurisdictions
            </span>
          </div>

          <div className="mt-4 divide-y divide-border/40 font-mono text-xs">
            {isLoading || !analytics ? (
              <div className="p-8 text-center text-muted-foreground">Loading geographic data...</div>
            ) : (
              analytics.geo.map((g: any) => {
                const anomalyPct = g.total > 0 ? ((g.anomalies / g.total) * 100).toFixed(1) : "0.0";
                return (
                  <div key={g.code} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="grid size-6 place-items-center rounded bg-surface-raised font-mono text-[0.68rem] font-bold text-foreground border border-border">
                        {g.code}
                      </span>
                      <div>
                        <span className="font-sans text-sm font-medium text-foreground">{g.country}</span>
                        <div className="text-[0.68rem] text-muted-foreground">
                          {fmtNumber(g.total)} transactions total
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="font-bold text-foreground">{g.anomalies}</span>
                        <span className="text-[0.68rem] text-muted-foreground">anomalies</span>
                      </div>
                      <div className="mt-1 flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-surface-raised">
                          <div
                            className="h-full bg-magenta rounded-full"
                            style={{ width: `${Math.min(100, Number(anomalyPct) * 5)}%` }}
                          />
                        </div>
                        <span className="text-[0.68rem] text-magenta font-semibold">{anomalyPct}%</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* 12-Week Moving Anomaly Ratio */}
        <div className="panel-raised p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-lg border border-border bg-surface-raised">
                <TrendingUp className="size-4 text-magenta" />
              </div>
              <div>
                <h3 className="text-base font-semibold tracking-tight text-foreground">
                  12-Week Anomaly Trend Line
                </h3>
                <p className="text-xs text-muted-foreground">
                  Moving average percentage of anomalous activity over 12 weeks
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-magenta">Moving Average</span>
          </div>

          <div className="mt-4 h-[280px] w-full">
            {isLoading || !analytics ? (
              <div className="flex size-full items-center justify-center">
                <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.weekly} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />
                  <XAxis
                    dataKey="week"
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--color-muted-foreground)"
                    fontSize={11}
                    fontFamily="var(--font-mono)"
                    tickLine={false}
                    axisLine={false}
                    unit="%"
                  />
                  <Tooltip content={<WeeklyTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="ratio"
                    name="Anomaly Rate (%)"
                    stroke="var(--color-magenta)"
                    strokeWidth={2.5}
                    dot={{ fill: "var(--color-magenta)", r: 4 }}
                    activeDot={{ r: 6, stroke: "var(--color-foreground)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TooltipPayload {
  dataKey?: string;
  value?: number;
  [key: string]: unknown;
}

function HourTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const volume = payload.find((p) => p.dataKey === "volume")?.value ?? 0;
  const anomalies = payload.find((p) => p.dataKey === "anomalies")?.value ?? 0;
  const rate = volume > 0 ? ((anomalies / volume) * 100).toFixed(1) : "0.0";

  return (
    <div className="glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl font-mono">
      <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">Hour UTC · {label}:00</p>
      <div className="mt-2 space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Volume:</span>
          <span className="font-semibold text-foreground">{fmtNumber(volume)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Anomalies:</span>
          <span className="font-semibold text-magenta">{fmtNumber(anomalies)}</span>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-1">
          <span className="text-muted-foreground">Rate:</span>
          <span className="font-semibold text-foreground">{rate}%</span>
        </div>
      </div>
    </div>
  );
}

function AmountTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const count = payload.find((p) => p.dataKey === "count")?.value ?? 0;
  const anomalous = payload.find((p) => p.dataKey === "anomalous")?.value ?? 0;

  return (
    <div className="glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl font-mono">
      <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">Band · {label}</p>
      <div className="mt-2 space-y-1">
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">Total Txns:</span>
          <span className="font-semibold text-foreground">{fmtNumber(count)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted-foreground">High Risk:</span>
          <span className="font-semibold text-amber">{fmtNumber(anomalous)}</span>
        </div>
      </div>
    </div>
  );
}

function WeeklyTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const ratio = payload.find((p) => p.dataKey === "ratio")?.value ?? 0;

  return (
    <div className="glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl font-mono">
      <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground">Week of {label}</p>
      <div className="mt-2 flex justify-between gap-4">
        <span className="text-muted-foreground">Anomaly Ratio:</span>
        <span className="font-semibold text-magenta">{ratio}%</span>
      </div>
    </div>
  );
}
