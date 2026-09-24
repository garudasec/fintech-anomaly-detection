import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Flame,
  Info,
  ShieldCheck,
} from "lucide-react";
import { overviewMetricsQuery } from "@/data/queries";
import { useCountUp } from "@/hooks/use-count-up";
import { fmtNumber, fmtPct } from "@/lib/format";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: number;
  delta: number;
  deltaLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  glowColor: "cyan" | "lime" | "magenta" | "amber";
  tooltipText: string;
}

function MetricCardItem({
  label,
  value,
  delta,
  deltaLabel = "vs prior 30d",
  icon: Icon,
  glowColor,
  tooltipText,
}: MetricCardProps) {
  const animatedValue = useCountUp(value);
  const isPositive = delta >= 0;

  const glowStyles = {
    cyan: {
      aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.7 0.14 240 / 22%), transparent 60%)",
      iconBg: "bg-blue/10 text-blue border-blue/20",
      accent: "text-blue",
    },
    lime: {
      aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.86 0.18 135 / 20%), transparent 60%)",
      iconBg: "bg-lime/10 text-lime border-lime/20",
      accent: "text-lime",
    },
    magenta: {
      aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.72 0.22 335 / 24%), transparent 60%)",
      iconBg: "bg-magenta/10 text-magenta border-magenta/25",
      accent: "text-magenta",
    },
    amber: {
      aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.7 0.2 35 / 24%), transparent 60%)",
      iconBg: "bg-destructive/15 text-[oklch(0.75_0.19_35)] border-destructive/30",
      accent: "text-[oklch(0.75_0.19_35)]",
    },
  }[glowColor];

  return (
    <article
      className="panel-raised relative overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5"
      style={{ backgroundImage: glowStyles.aurora }}
    >
      {/* Header: Icon & Tooltip */}
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "grid size-10 place-items-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-105",
            glowStyles.iconBg,
          )}
        >
          <Icon className="size-5" />
        </span>

        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="text-muted-foreground/60 transition-colors hover:text-muted-foreground focus:outline-none"
                aria-label={label}
              >
                <Info className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs text-xs">
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Metric Value & Label */}
      <div className="mt-4">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        <p className="mt-1.5 font-mono text-2xl font-light tracking-tight text-foreground sm:text-3xl tabular">
          {fmtNumber(animatedValue)}
        </p>
      </div>

      {/* Trend delta footer */}
      <div className="mt-3.5 flex items-center gap-1.5 text-xs">
        <span
          className={cn(
            "inline-flex items-center font-mono font-medium",
            glowColor === "magenta" || glowColor === "amber"
              ? isPositive
                ? "text-magenta"
                : "text-lime"
              : isPositive
                ? "text-lime"
                : "text-muted-foreground",
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="size-3.5 mr-0.5" />
          ) : (
            <ArrowDownRight className="size-3.5 mr-0.5" />
          )}
          {fmtPct(delta)}
        </span>
        <span className="text-muted-foreground/70">{deltaLabel}</span>
      </div>
    </article>
  );
}

export function MetricCards() {
  const { data: metrics, isLoading } = useQuery(overviewMetricsQuery);

  if (isLoading || !metrics) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="panel h-36 animate-pulse p-6 rounded-2xl bg-surface/50">
            <div className="size-9 rounded-lg bg-surface-raised" />
            <div className="mt-4 h-4 w-24 rounded bg-surface-raised" />
            <div className="mt-2 h-7 w-32 rounded bg-surface-raised" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section
      aria-label="System Overview Metrics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <MetricCardItem
        label="Total Transactions"
        value={metrics.totalTransactions}
        delta={metrics.deltas.totalTransactions}
        icon={Activity}
        glowColor="cyan"
        tooltipText="Total financial event stream volume ingested across all configured channels."
      />
      <MetricCardItem
        label="Normal Activity"
        value={metrics.normalTransactions}
        delta={metrics.deltas.normalTransactions}
        icon={ShieldCheck}
        glowColor="lime"
        tooltipText="Transactions behaving strictly within statistical and behavioral historical baselines."
      />
      <MetricCardItem
        label="Anomalies Detected"
        value={metrics.anomaliesDetected}
        delta={metrics.deltas.anomaliesDetected}
        icon={AlertTriangle}
        glowColor="magenta"
        tooltipText="Transactions flagged by heuristics or rules with anomaly scores exceeding 0.60."
      />
      <MetricCardItem
        label="High Risk Outliers"
        value={metrics.highRisk}
        delta={metrics.deltas.highRisk}
        icon={Flame}
        glowColor="amber"
        tooltipText="Critical transactions flagged for immediate investigation (anomaly score >= 0.72)."
      />
    </section>
  );
}
