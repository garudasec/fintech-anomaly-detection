import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { activityQuery } from "@/data/queries";
import type { TimeRange } from "@/data/types";
import { Button } from "@/components/ui/button";
import { fmtCompact, fmtNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const TIME_RANGES: { label: string; value: TimeRange }[] = [
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "30D", value: "30d" },
];

export function ActivityChart() {
  const [range, setRange] = useState<TimeRange>("24h");
  const { data: points, isLoading } = useQuery(activityQuery(range));

  return (
    <div className="panel-raised relative overflow-hidden p-5 sm:p-6">
      {/* Header with Title & Time Range Switcher */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Transaction Velocity & Anomaly Curve
            </h2>
            <span className="rounded-full border border-border-strong bg-surface-raised px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground">
              Live Flow
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Ingestion volume vs. detected anomaly frequency across selected window.
          </p>
        </div>

        {/* Time range switcher */}
        <div className="flex items-center gap-1 rounded-xl border border-border bg-surface p-1 self-start sm:self-auto">
          {TIME_RANGES.map((r) => (
            <Button
              key={r.value}
              variant="ghost"
              size="sm"
              onClick={() => setRange(r.value)}
              className={cn(
                "h-7 rounded-lg px-3 text-xs font-mono transition-all duration-200",
                range === r.value
                  ? "bg-[oklch(0.22_0.038_255)] font-semibold text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Legend and live indicator */}
      <div className="mt-4 flex flex-wrap items-center gap-6 border-t border-border/70 pt-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-blue shadow-[0_0_8px_var(--color-blue)]" />
          <span className="text-muted-foreground">Total Ingestion Volume</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-magenta shadow-[0_0_8px_var(--color-magenta)]" />
          <span className="text-muted-foreground">Flagged Anomalies</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="mt-6 h-[290px] w-full">
        {isLoading || !points ? (
          <div className="flex size-full items-center justify-center">
            <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="volGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-blue)" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="var(--color-blue)" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="anomGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-magenta)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--color-magenta)" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 6%)" vertical={false} />

              <XAxis
                dataKey="t"
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                fontFamily="var(--font-mono)"
                tickLine={false}
                axisLine={false}
                dy={6}
              />

              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={11}
                fontFamily="var(--font-mono)"
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => fmtCompact(v)}
                dx={-4}
              />

              <Tooltip content={<CustomChartTooltip />} />

              <Area
                type="monotone"
                dataKey="total"
                name="Total Volume"
                stroke="var(--color-blue)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#volGradient)"
              />

              <Area
                type="monotone"
                dataKey="anomalies"
                name="Anomalies"
                stroke="var(--color-magenta)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#anomGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

interface TooltipPayloadItem {
  dataKey?: string;
  value?: number;
  [key: string]: unknown;
}

interface CustomChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}

function CustomChartTooltip({ active, payload, label }: CustomChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const total = payload.find((p) => p.dataKey === "total")?.value ?? 0;
  const anomalies = payload.find((p) => p.dataKey === "anomalies")?.value ?? 0;
  const ratio = total > 0 ? ((anomalies / total) * 100).toFixed(2) : "0.00";

  return (
    <div className="glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl">
      <p className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
        Window · {label}
      </p>
      <div className="mt-2 space-y-1.5 font-mono">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-blue" />
            Total Volume:
          </span>
          <span className="font-semibold text-foreground">{fmtNumber(total)}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-magenta" />
            Flagged Outliers:
          </span>
          <span className="font-semibold text-magenta">{fmtNumber(anomalies)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-1">
          <span className="text-muted-foreground">Anomaly Ratio:</span>
          <span className="font-semibold text-foreground">{ratio}%</span>
        </div>
      </div>
    </div>
  );
}
