import { AlertCircle, CheckCircle2, Cpu, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const NOTABLE_SIGNALS = [
  { label: "Unusual Transaction Amount", weight: 42, color: "bg-magenta" },
  { label: "Location / Geodistance Deviation", weight: 28, color: "bg-blue" },
  { label: "Off-hours Velocity Burst", weight: 18, color: "bg-amber" },
  { label: "First-Seen Merchant Origin", weight: 12, color: "bg-lime" },
];

const OBSERVATIONS = [
  {
    title: "Cross-border amount deviation",
    detail:
      "Spike of wire transfers (> $15,000) originating in non-domestic regions within short windows.",
  },
  {
    title: "Off-hours velocity concentration",
    detail: "4 accounts triggered frequency thresholds between 02:00 and 04:30 local account time.",
  },
  {
    title: "Account baseline stability",
    detail:
      "89.4% of accounts evaluated remained strictly within their 30-day moving average volume.",
  },
];

export function RiskIntelligencePanel() {
  return (
    <div className="panel-raised relative overflow-hidden p-5 sm:p-6">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full blur-3xl opacity-20"
        style={{ background: "radial-gradient(circle, var(--color-primary-glow), transparent)" }}
      />

      {/* Header with emblem */}
      <div className="flex items-center gap-3">
        <div className="relative grid size-10 place-items-center rounded-xl border border-primary/40 bg-primary/10 shadow-[0_0_20px_var(--color-primary-glow)/30]">
          <Cpu className="size-5 text-primary-glow" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-lime animate-pulse" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            Risk Intelligence
          </h3>
          <p className="text-[0.72rem] text-muted-foreground font-mono">
            Detection Engine · Heuristic Ruleset v1.2
          </p>
        </div>
      </div>

      {/* Detection summary callout */}
      <div className="mt-4 rounded-xl border border-border/80 bg-surface/80 p-3.5 text-xs backdrop-blur-sm">
        <div className="flex items-start gap-2.5">
          <Sparkles className="size-4 shrink-0 text-primary-glow mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-foreground leading-relaxed">
              Anomaly concentration identified in international transfers and nocturnal velocities.
            </p>
            <p className="text-[0.72rem] text-muted-foreground leading-normal">
              Rules detected 12 elevated scoring outliers in the last 24h cycle, predominantly
              driven by amount multiples exceeding typical baselines.
            </p>
          </div>
        </div>
      </div>

      {/* Signal Contribution Breakdown */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
            Dominant Risk Signals
          </span>
          <span className="font-mono text-[0.68rem] text-muted-foreground">Relative Weight</span>
        </div>

        <div className="mt-3 space-y-3">
          {NOTABLE_SIGNALS.map((signal) => (
            <div key={signal.label} className="space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-[0.75rem]">{signal.label}</span>
                <span className="font-mono font-medium text-foreground">{signal.weight}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-surface-raised overflow-hidden">
                <div
                  className={`h-full rounded-full ${signal.color}`}
                  style={{ width: `${signal.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Risk Observations */}
      <div className="mt-6 border-t border-border/80 pt-4">
        <h4 className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
          Key Observations
        </h4>
        <ul className="mt-3 space-y-2.5 text-xs">
          {OBSERVATIONS.map((obs, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-blue" />
              <div>
                <p className="font-medium text-foreground text-[0.78rem]">{obs.title}</p>
                <p className="mt-0.5 text-[0.72rem] text-muted-foreground leading-relaxed">
                  {obs.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Triage Alert Footnote */}
      <div className="mt-5 rounded-xl border border-magenta/25 bg-magenta/10 p-3 text-xs flex items-center gap-2.5">
        <ShieldAlert className="size-4 shrink-0 text-magenta" />
        <span className="text-[0.75rem] text-magenta font-medium">
          3 critical items awaiting triage disposition in queue.
        </span>
      </div>
    </div>
  );
}
