import { useState, useDeferredValue } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowUpRight,
  MapPin,
  Radar,
  Search,
  X,
} from "lucide-react";
import { anomaliesQuery } from "@/data/queries";
import type { AnomalySeverity, AnomalyStatus, Anomaly } from "@/data/types";
import {
  fmtMoney,
  fmtRelative,
  fmtScore,
  fmtDateTime,
  ANOMALY_STATUS_LABEL,
} from "@/lib/format";
import { useProfile } from "@/contexts/ProfileContext";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/app/anomalies")({
  head: () => ({
    meta: [
      { title: "Anomalies Triage — FinTech Anomaly Detection" },
      {
        name: "description",
        content:
          "Prioritized anomaly triage queue with severity and status filters for investigation workflow.",
      },
    ],
  }),
  component: AnomaliesPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: AnomalySeverity }) {
  const styles: Record<AnomalySeverity, string> = {
    medium: "border-amber/40 bg-amber/10 text-amber",
    high: "border-magenta/40 bg-magenta/10 text-magenta",
    critical: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold",
        styles[severity],
      )}
    >
      {severity}
    </Badge>
  );
}

function AnomalyStatusBadge({ status }: { status: AnomalyStatus }) {
  const styles: Record<AnomalyStatus, string> = {
    open: "border-blue/30 bg-blue/8 text-blue",
    under_review: "border-amber/30 bg-amber/8 text-amber",
    escalated: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]",
    resolved: "border-lime/30 bg-lime/8 text-lime",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold",
        styles[status],
      )}
    >
      {ANOMALY_STATUS_LABEL[status]}
    </Badge>
  );
}

const SIGNAL_COLOR: Record<string, string> = {
  amount_spike: "bg-magenta",
  unusual_time: "bg-amber",
  location_deviation: "bg-blue",
  frequency_burst: "bg-destructive",
  new_merchant: "bg-lime",
  velocity: "bg-violet",
};

// ─── Detail Sheet ─────────────────────────────────────────────────────────────

function AnomalyDetailSheet({
  anomaly,
  open,
  onClose,
}: {
  anomaly: Anomaly | null;
  open: boolean;
  onClose: () => void;
}) {
  const { profile } = useProfile();
  if (!anomaly) return null;
  const tx = anomaly.transaction;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-xl overflow-y-auto border-l border-border bg-sidebar p-0 scrollbar-thin"
      >
        <SheetTitle className="sr-only">Anomaly Detail</SheetTitle>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-sidebar px-6 py-4">
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Anomaly Detail
            </div>
            <div className="mt-0.5 font-mono text-sm font-semibold text-foreground">
              {anomaly.anomalyId}
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        <div className="space-y-6 p-6">
          {/* Summary */}
          <div className="panel-raised flex items-center justify-between p-4">
            <div>
              <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                Amount
              </div>
              <div className="mt-1 font-mono text-2xl font-light tabular text-foreground">
                {fmtMoney(tx.amount)}
              </div>
              <div className="mt-1 text-xs text-muted-foreground font-sans">{tx.merchant}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <SeverityBadge severity={anomaly.severity} />
              <AnomalyStatusBadge status={anomaly.status} />
            </div>
          </div>

          {/* Key facts */}
          <section>
            <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Event Details
            </h4>
            <div className="space-y-2 text-xs">
              {[
                ["Anomaly ID", anomaly.anomalyId],
                ["Transaction ID", tx.transactionId],
                ["User ID", tx.userId],
                ["Detected", fmtRelative(anomaly.detectedAt)],
                ["Transaction Time", fmtDateTime(tx.transactionTime, profile.timezone)],
                ["Channel", tx.channel.toUpperCase()],
                [
                  "Location",
                  `${tx.location.city}, ${tx.location.country}`,
                ],
                [
                  "Assignee",
                  anomaly.assignee ?? "Unassigned",
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-muted-foreground">{label}</span>
                  <span className="text-right font-mono text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator className="bg-border/60" />

          {/* Risk */}
          <section>
            <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Risk Scoring
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Anomaly Score</span>
                <span className="font-mono font-semibold text-foreground">
                  {fmtScore(tx.anomalyScore)} / 1.00
                </span>
              </div>
            </div>
            {tx.anomalyScore != null && (
              <div className="mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    tx.anomalyScore >= 0.9
                      ? "bg-destructive"
                      : tx.anomalyScore >= 0.72
                        ? "bg-magenta"
                        : "bg-amber",
                  )}
                  style={{ width: `${tx.anomalyScore * 100}%` }}
                />
              </div>
            )}
          </section>

          {/* Signals */}
          {tx.signals.length > 0 && (
            <>
              <Separator className="bg-border/60" />
              <section>
                <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                  Detection Signals
                </h4>
                <div className="space-y-3">
                  {tx.signals.map((sig) => (
                    <div
                      key={sig.kind}
                      className="rounded-xl border border-border/80 bg-surface/60 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "size-2 rounded-full shrink-0",
                            SIGNAL_COLOR[sig.kind] ?? "bg-muted-foreground",
                          )}
                        />
                        <span className="text-xs font-medium text-foreground">
                          {sig.label}
                        </span>
                        <span className="ml-auto font-mono text-[0.68rem] text-muted-foreground">
                          {Math.round(sig.weight * 100)}% weight
                        </span>
                      </div>
                      <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted-foreground pl-4">
                        {sig.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Actions */}
          <Separator className="bg-border/60" />
          <div className="flex gap-3">
            <Button asChild variant="outline" size="sm" className="flex-1 gap-1.5">
              <Link to="/app/investigation">
                <ArrowUpRight className="size-3.5" />
                Investigate
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function AnomaliesPage() {
  const { profile } = useProfile();
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [severity, setSeverity] = useState<AnomalySeverity | "all">("all");
  const [status, setStatus] = useState<AnomalyStatus | "all">("all");
  const [selected, setSelected] = useState<Anomaly | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { data: anomalies, isLoading } = useQuery(
    anomaliesQuery({ severity: severity as AnomalySeverity | "all", status: status as AnomalyStatus | "all", search: deferredSearch }),
  );

  const hasFilters = search !== "" || severity !== "all" || status !== "all";

  // Compute severity summary counts from data
  const critCount = anomalies?.filter((a) => a.severity === "critical").length ?? 0;
  const highCount = anomalies?.filter((a) => a.severity === "high").length ?? 0;
  const openCount = anomalies?.filter((a) => a.status === "open" || a.status === "escalated").length ?? 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl border border-magenta/30 bg-magenta/10 text-magenta">
            <Radar className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Anomaly Triage Queue
            </h1>
            <p className="text-xs text-muted-foreground">
              {anomalies ? `${anomalies.length} anomalies` : "Loading…"}
              {critCount > 0 && (
                <span className="ml-2 text-[oklch(0.75_0.2_25)]">
                  · {critCount} critical
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Summary pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[oklch(0.75_0.2_25)]">
            <span className="size-1.5 rounded-full bg-destructive" />
            {critCount} Critical
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-magenta/30 bg-magenta/10 px-3 py-1 text-magenta">
            <span className="size-1.5 rounded-full bg-magenta" />
            {highCount} High
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue/30 bg-blue/10 px-3 py-1 text-blue">
            <span className="size-1.5 rounded-full bg-blue" />
            {openCount} Open
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="panel-raised p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="anomalies-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by anomaly ID, transaction, user…"
              className="h-9 bg-surface pl-8 text-xs"
            />
          </div>

          <Select value={severity} onValueChange={(v) => setSeverity(v as typeof severity)}>
            <SelectTrigger id="severity-filter" className="h-9 w-36 bg-surface text-xs">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
            <SelectTrigger id="anomaly-status-filter" className="h-9 w-36 bg-surface text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSearch(""); setSeverity("all"); setStatus("all"); }}
              className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="panel-raised overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/70 bg-surface/40 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 sm:px-6">Anomaly</th>
                <th className="px-4 py-3">Amount</th>
                <th className="hidden px-4 py-3 md:table-cell">Location</th>
                <th className="hidden px-4 py-3 sm:table-cell">Primary Signal</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Severity</th>
                <th className="hidden px-4 py-3 lg:table-cell">Status</th>
                <th className="hidden px-4 py-3 xl:table-cell">Assignee</th>
                <th className="px-5 py-3 text-right sm:px-6">Detected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {isLoading || !anomalies ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={9} className="h-12 px-6">
                      <div className="h-3 w-full rounded bg-surface-raised" />
                    </td>
                  </tr>
                ))
              ) : anomalies.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-14 text-center text-muted-foreground font-sans">
                    No anomalies match the current filters.
                  </td>
                </tr>
              ) : (
                anomalies.map((item) => {
                  const tx = item.transaction;
                  const isEscalated = item.status === "escalated";
                  return (
                    <tr
                      key={item.anomalyId}
                      className={cn(
                        "group cursor-pointer transition-colors duration-150 hover:bg-surface/50",
                        isEscalated && "border-l-2 border-l-destructive",
                      )}
                      onClick={() => { setSelected(item); setDetailOpen(true); }}
                    >
                      <td className="px-5 py-3 sm:px-6">
                        <div className="flex items-center gap-2">
                          {isEscalated && (
                            <AlertTriangle className="size-3.5 shrink-0 text-destructive" />
                          )}
                          <div>
                            <div className="font-semibold text-foreground font-sans">
                              {tx.merchant}
                            </div>
                            <div className="text-[0.68rem] text-muted-foreground">
                              {item.anomalyId} · {tx.userId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold tabular text-foreground">
                          {fmtMoney(tx.amount)}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 md:table-cell">
                        <span className="inline-flex items-center gap-1 text-muted-foreground font-sans">
                          <MapPin className="size-3 text-muted-foreground/60" />
                          {tx.location.city}, {tx.location.countryCode}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 sm:table-cell font-sans">
                        <span
                          className="inline-block max-w-[170px] truncate text-muted-foreground"
                          title={item.primarySignal.label}
                        >
                          {item.primarySignal.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              item.severity === "critical"
                                ? "bg-destructive shadow-[0_0_6px_var(--color-destructive)]"
                                : item.severity === "high"
                                  ? "bg-magenta shadow-[0_0_5px_var(--color-magenta)]"
                                  : "bg-amber",
                            )}
                          />
                          <span className="tabular text-foreground">
                            {fmtScore(tx.anomalyScore)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <SeverityBadge severity={item.severity} />
                      </td>
                      <td className="hidden px-4 py-3 lg:table-cell">
                        <AnomalyStatusBadge status={item.status} />
                      </td>
                      <td className="hidden px-4 py-3 xl:table-cell text-muted-foreground font-sans">
                        {item.assignee ?? (
                          <span className="italic text-muted-foreground/50">Unassigned</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right text-[0.72rem] text-muted-foreground font-sans sm:px-6">
                        {fmtRelative(item.detectedAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Sheet */}
      <AnomalyDetailSheet
        anomaly={selected}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
