import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight, MapPin } from "lucide-react";
import { recentAnomaliesQuery } from "@/data/queries";
import { fmtMoney, fmtRelative, fmtScore } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RecentFlaggedTable() {
  const { data: anomalies, isLoading } = useQuery(recentAnomaliesQuery);

  return (
    <div className="panel-raised overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/80 p-5 sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
              Recent Flagged Activity
            </h2>
            <span className="rounded-full bg-magenta/15 px-2 py-0.5 font-mono text-[0.68rem] font-medium text-magenta">
              High Priority
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Latest financial events exceeding risk sensitivity thresholds.
          </p>
        </div>

        <Link
          to="/app/anomalies"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue hover:text-blue/80 transition-colors focus:outline-none"
        >
          View all anomalies
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border/70 bg-surface/40 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-5 py-3 sm:px-6">Transaction</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3 hidden md:table-cell">Location</th>
              <th className="px-4 py-3 hidden sm:table-cell">Primary Signal</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Risk Level</th>
              <th className="px-5 py-3 text-right sm:px-6">Detected</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 font-mono">
            {isLoading || !anomalies ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={7} className="h-14 px-6">
                    <div className="h-4 w-full rounded bg-surface-raised" />
                  </td>
                </tr>
              ))
            ) : anomalies.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-muted-foreground font-sans">
                  No active anomalies detected in current stream window.
                </td>
              </tr>
            ) : (
              anomalies.map((item) => {
                const tx = item.transaction;
                const isCritical = item.severity === "critical";
                const isHigh = item.severity === "high";

                return (
                  <tr
                    key={item.anomalyId}
                    className="group transition-colors duration-150 hover:bg-surface/50"
                  >
                    {/* Transaction / ID */}
                    <td className="px-5 py-3.5 sm:px-6">
                      <div className="font-semibold text-foreground font-sans">{tx.merchant}</div>
                      <div className="text-[0.68rem] text-muted-foreground">
                        {tx.transactionId} · {tx.userId}
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-foreground">{fmtMoney(tx.amount)}</span>
                      <div className="text-[0.65rem] text-muted-foreground uppercase">
                        {tx.channel}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 hidden md:table-cell">
                      <span className="inline-flex items-center gap-1 text-muted-foreground font-sans">
                        <MapPin className="size-3 text-muted-foreground/60" />
                        {tx.location.city}, {tx.location.countryCode}
                      </span>
                    </td>

                    {/* Primary Signal */}
                    <td className="px-4 py-3.5 hidden sm:table-cell font-sans">
                      <span
                        className="inline-block max-w-[170px] truncate text-muted-foreground"
                        title={item.primarySignal.label}
                      >
                        {item.primarySignal.label}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            isCritical
                              ? "bg-destructive shadow-[0_0_6px_var(--color-destructive)]"
                              : isHigh
                                ? "bg-magenta shadow-[0_0_6px_var(--color-magenta)]"
                                : "bg-amber",
                          )}
                        />
                        <span className="font-bold tabular text-foreground">
                          {fmtScore(tx.anomalyScore)}
                        </span>
                      </div>
                    </td>

                    {/* Risk Level Badge */}
                    <td className="px-4 py-3.5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "rounded-md border px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider font-semibold",
                          isCritical &&
                            "border-destructive/40 bg-destructive/15 text-[oklch(0.75_0.2_25)]",
                          isHigh && "border-magenta/40 bg-magenta/15 text-magenta",
                          !isCritical && !isHigh && "border-amber/40 bg-amber/15 text-amber",
                        )}
                      >
                        {item.severity}
                      </Badge>
                    </td>

                    {/* Detected Timestamp */}
                    <td className="px-5 py-3.5 text-right sm:px-6 text-muted-foreground text-[0.72rem] font-sans">
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
  );
}
