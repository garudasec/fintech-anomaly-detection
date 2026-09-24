import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  CreditCard,
  Globe,
  MapPin,
  Search,
  ShieldCheck,
  UserCheck,
  UserX,
  Zap,
} from "lucide-react";
import {
  anomaliesQuery,
  userProfileQuery,
  relatedTransactionsQuery,
} from "@/data/queries";
import { updateAnomalyStatus } from "@/data/repository";
import type { Anomaly, AnomalyStatus } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  fmtDateTime,
  fmtMoney,
  fmtScore,
  ANOMALY_STATUS_LABEL,
} from "@/lib/format";
import { useProfile } from "@/contexts/ProfileContext";
import { cn } from "@/lib/utils";

interface InvestigationSearch {
  id?: string | undefined;
}

export const Route = createFileRoute("/app/investigation")({
  validateSearch: (search: Record<string, unknown>): InvestigationSearch => ({
    id: typeof search["id"] === "string" ? search["id"] : undefined,
  }),
  head: () => ({
    meta: [{ title: "Investigation Workspace — FinTech Anomaly Detection" }],
  }),
  component: InvestigationPage,
});

function InvestigationPage() {
  const searchParams = Route.useSearch();
  const paramId = searchParams.id;
  const { profile } = useProfile();
  const { data: anomalies, isLoading } = useQuery(anomaliesQuery({}));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(paramId ?? null);

  // Local disposition state overrides
  const [dispositions, setDispositions] = useState<Record<string, { status: AnomalyStatus; note?: string }>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter anomalies list
  const filteredAnomalies = (anomalies ?? []).filter((a: Anomaly) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      a.anomalyId.toLowerCase().includes(q) ||
      a.transaction.userId.toLowerCase().includes(q) ||
      a.primarySignal.label.toLowerCase().includes(q) ||
      a.transaction.merchant.toLowerCase().includes(q)
    );
  });

  // Effective selected anomaly
  const selectedAnomaly =
    filteredAnomalies.find((a: Anomaly) => a.anomalyId === selectedId) ??
    filteredAnomalies[0] ??
    (anomalies && anomalies[0] ? anomalies[0] : null);

  const effectiveStatus = selectedAnomaly
    ? dispositions[selectedAnomaly.anomalyId]?.status ?? selectedAnomaly.status
    : "open";

  // Queries for details of selected anomaly
  const { data: userProfile, isLoading: isUserLoading } = useQuery(
    userProfileQuery(selectedAnomaly?.transaction.userId)
  );

  const { data: relatedTxns, isLoading: isRelatedLoading } = useQuery(
    relatedTransactionsQuery(selectedAnomaly?.transaction)
  );

  const queryClient = useQueryClient();
  const [analystNote, setAnalystNote] = useState("");

  useEffect(() => {
    if (selectedAnomaly) {
      setAnalystNote(selectedAnomaly.transaction.investigationNote ?? "");
    }
  }, [selectedAnomaly?.anomalyId]);

  const handleSetDisposition = async (status: AnomalyStatus, label: string) => {
    if (!selectedAnomaly) return;
    try {
      await updateAnomalyStatus(selectedAnomaly.anomalyId, status, analystNote);
      setToastMessage(`Case ${selectedAnomaly.anomalyId} updated to ${label}`);
      setTimeout(() => setToastMessage(null), 3500);
      queryClient.invalidateQueries({ queryKey: ["anomalies"] });
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Analyst Investigation Workspace
            </h1>
            <span className="rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-destructive">
              Deep Triage
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Correlate anomaly triggers with user behavioral baselines, device metadata, and execution controls.
          </p>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/10 px-3.5 py-2 font-mono text-xs text-lime shadow-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="size-4" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Main Workspace 2-Column Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column (4 cols): Anomaly Queue List */}
        <div className="space-y-4 lg:col-span-4">
          <div className="panel-raised p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search anomaly queue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-xs"
              />
            </div>
          </div>

          <div className="panel-raised divide-y divide-border/40 overflow-hidden">
            <div className="border-b border-border/70 bg-surface/40 px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground flex items-center justify-between">
              <span>Cases ({filteredAnomalies.length})</span>
              <span>Severity</span>
            </div>

            <div className="max-h-[700px] overflow-y-auto divide-y divide-border/40">
              {isLoading ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  Loading anomaly queue...
                </div>
              ) : filteredAnomalies.length === 0 ? (
                <div className="p-8 text-center text-xs text-muted-foreground">
                  No matching anomalies found.
                </div>
              ) : (
                filteredAnomalies.map((item: Anomaly) => {
                  const isSelected = selectedAnomaly?.anomalyId === item.anomalyId;
                  const isCritical = item.severity === "critical";

                  return (
                    <button
                      key={item.anomalyId}
                      onClick={() => {
                        setSelectedId(item.anomalyId);
                        setAnalystNote(item.transaction.investigationNote ?? "");
                      }}
                      className={cn(
                        "w-full p-3.5 text-left transition-colors duration-150 flex flex-col gap-2",
                        isSelected
                          ? "bg-[oklch(0.22_0.038_255)] border-l-2 border-l-primary"
                          : "hover:bg-surface-raised/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-foreground">
                          {item.anomalyId}
                        </span>
                        <span
                          className={cn(
                            "rounded border px-1.5 py-0.2 font-mono text-[0.62rem] uppercase tracking-wider font-semibold",
                            isCritical
                              ? "border-destructive/40 bg-destructive/10 text-destructive"
                              : "border-amber/40 bg-amber/10 text-amber"
                          )}
                        >
                          {item.severity}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="truncate text-muted-foreground max-w-[180px]">
                          {item.primarySignal.label}
                        </span>
                        <span className="font-mono font-semibold text-foreground">
                          {fmtMoney(item.transaction.amount)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between font-mono text-[0.68rem] text-muted-foreground">
                        <span className="truncate">User: {item.transaction.userId}</span>
                        <span className="font-semibold text-magenta">
                          Score: {fmtScore(item.transaction.anomalyScore)}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Selected Anomaly Investigation Workspace */}
        <div className="space-y-6 lg:col-span-8">
          {selectedAnomaly ? (
            <>
              {/* Top Banner & Disposition Control */}
              <div className="panel-raised p-5 sm:p-6 space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-mono text-lg font-bold text-foreground">
                        {selectedAnomaly.anomalyId}
                      </h2>
                      <span
                        className={cn(
                          "rounded-md border px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider font-semibold",
                          effectiveStatus === "open"
                            ? "border-destructive/40 bg-destructive/10 text-destructive"
                            : effectiveStatus === "under_review"
                            ? "border-amber/40 bg-amber/10 text-amber"
                            : effectiveStatus === "resolved"
                            ? "border-lime/40 bg-lime/10 text-lime"
                            : "border-border bg-surface text-muted-foreground"
                        )}
                      >
                        {ANOMALY_STATUS_LABEL[effectiveStatus]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Detected at <span className="font-mono text-foreground">{fmtDateTime(selectedAnomaly.detectedAt, profile.timezone)}</span> by rule{" "}
                      <span className="font-semibold text-foreground">{selectedAnomaly.primarySignal.label}</span>
                    </p>
                  </div>

                  {/* Disposition Quick Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSetDisposition("resolved", "Resolved (Approved)")}
                      className={cn(
                        "h-8 text-xs font-mono gap-1.5",
                        effectiveStatus === "resolved" && "border-lime bg-lime/10 text-lime"
                      )}
                    >
                      <ShieldCheck className="size-3.5 text-lime" />
                      <span>Approve</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSetDisposition("under_review", "Escalated to Review")}
                      className={cn(
                        "h-8 text-xs font-mono gap-1.5",
                        effectiveStatus === "under_review" && "border-amber bg-amber/10 text-amber"
                      )}
                    >
                      <AlertTriangle className="size-3.5 text-amber" />
                      <span>Escalate</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleSetDisposition("resolved", "Blocked & Frozen")}
                      className="h-8 text-xs font-mono gap-1.5"
                    >
                      <UserX className="size-3.5" />
                      <span>Block Account</span>
                    </Button>
                  </div>
                </div>

                {/* Score & Risk bar */}
                <div className="border-t border-border/70 pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                      Anomaly Score
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-bold text-magenta">
                        {fmtScore(selectedAnomaly.transaction.anomalyScore)}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-raised">
                        <div
                          className="h-full bg-magenta transition-all duration-300"
                          style={{ width: `${(selectedAnomaly.transaction.anomalyScore ?? 0) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                      Detection Severity
                    </span>
                    <div className="font-mono text-sm font-semibold capitalize text-foreground">
                      {selectedAnomaly.severity}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                      Target User
                    </span>
                    <div className="font-mono text-sm font-semibold text-blue truncate">
                      {selectedAnomaly.transaction.userId}
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction Details & Signals Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Transaction Snapshot */}
                <div className="panel-raised p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/70 pb-3">
                    <CreditCard className="size-4 text-blue" />
                    <h3 className="text-sm font-semibold text-foreground">Transaction Details</h3>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <span className="text-foreground font-semibold">
                        {selectedAnomaly.transaction.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="text-foreground font-bold text-sm">
                        {fmtMoney(selectedAnomaly.transaction.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Merchant:</span>
                      <span className="text-foreground font-sans">
                        {selectedAnomaly.transaction.merchant}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Channel:</span>
                      <span className="text-foreground capitalize font-semibold">
                        {selectedAnomaly.transaction.channel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="text-foreground flex items-center gap-1">
                        <MapPin className="size-3 text-muted-foreground" />
                        {selectedAnomaly.transaction.location.city},{" "}
                        {selectedAnomaly.transaction.location.country}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="text-foreground font-semibold capitalize">
                        {selectedAnomaly.transaction.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Triggered Signals */}
                <div className="panel-raised p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-border/70 pb-3">
                    <Zap className="size-4 text-magenta" />
                    <h3 className="text-sm font-semibold text-foreground">Triggered Signal Stack</h3>
                  </div>

                  <div className="space-y-3">
                    {selectedAnomaly.transaction.signals.map((sig, idx) => (
                      <div key={idx} className="space-y-1 rounded-lg border border-border/50 bg-surface/50 p-2.5 text-xs">
                        <div className="flex items-center justify-between font-mono">
                          <span className="font-semibold text-foreground">{sig.label}</span>
                          <span className="text-magenta font-semibold">
                            Weight: +{(sig.weight * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-[0.72rem] text-muted-foreground leading-snug">
                          {sig.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Investigation Notes */}
              <div className="panel-raised p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-border/70 pb-3">
                  <ShieldCheck className="size-4 text-lime" />
                  <h3 className="text-sm font-semibold text-foreground">Investigation Notes</h3>
                </div>
                <Textarea
                  value={analystNote}
                  onChange={(e) => setAnalystNote(e.target.value)}
                  placeholder="Enter analyst observations and evidence here..."
                  className="min-h-[100px] text-xs font-mono"
                />
              </div>

              {/* User Profile & Behavioral Baseline */}
              <div className="panel-raised p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-border/70 pb-3">
                  <div className="flex items-center gap-2">
                    <UserCheck className="size-4 text-lime" />
                    <h3 className="text-sm font-semibold text-foreground">
                      User Profile & Behavioral Baseline
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    ID: {selectedAnomaly.transaction.userId}
                  </span>
                </div>

                {isUserLoading || !userProfile ? (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    Loading behavioral baseline...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 font-mono text-xs">
                    <div className="space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3">
                      <span className="text-muted-foreground text-[0.68rem] uppercase tracking-wider">
                        Customer Name
                      </span>
                      <div className="font-sans font-semibold text-foreground">{userProfile.displayName}</div>
                      <div className="text-[0.68rem] text-muted-foreground">Account age: {userProfile.accountAge}</div>
                    </div>

                    <div className="space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3">
                      <span className="text-muted-foreground text-[0.68rem] uppercase tracking-wider">
                        Avg Transaction Size
                      </span>
                      <div className="font-bold text-foreground">
                        {fmtMoney(userProfile.averageAmount)}
                      </div>
                      <div className="text-[0.68rem] text-muted-foreground">
                        Window: {userProfile.typicalWindow}
                      </div>
                    </div>

                    <div className="space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3">
                      <span className="text-muted-foreground text-[0.68rem] uppercase tracking-wider">
                        Home Jurisdiction
                      </span>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <Globe className="size-3 text-muted-foreground" />
                        {userProfile.homeLocation?.country}
                      </div>
                      <div className="text-[0.68rem] text-muted-foreground">
                        {userProfile.homeLocation?.city}
                      </div>
                    </div>

                    <div className="space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3">
                      <span className="text-muted-foreground text-[0.68rem] uppercase tracking-wider">
                        Risk History (30d)
                      </span>
                      <div className="font-semibold text-amber">
                        {userProfile.priorFlags} prior flag{userProfile.priorFlags === 1 ? "" : "s"}
                      </div>
                      <div className="text-[0.68rem] text-muted-foreground">
                        {userProfile.transactionsLast30d} txns in 30d
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Related Recent Transactions Table */}
              <div className="panel-raised overflow-hidden">
                <div className="border-b border-border/70 bg-surface/40 px-5 py-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Related Recent Transactions ({userProfile?.displayName ?? selectedAnomaly.transaction.userId})
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground">
                    Context Window
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="border-b border-border/70 bg-surface/60 text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2.5">Time</th>
                        <th className="px-4 py-2.5">Txn ID</th>
                        <th className="px-4 py-2.5">Merchant</th>
                        <th className="px-4 py-2.5 text-right">Amount</th>
                        <th className="px-4 py-2.5 text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {isRelatedLoading ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">
                            Loading transaction history...
                          </td>
                        </tr>
                      ) : !relatedTxns || relatedTxns.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-4 text-center text-muted-foreground">
                            No other recent transactions.
                          </td>
                        </tr>
                      ) : (
                        relatedTxns.map((tx) => (
                          <tr key={tx.transactionId} className="hover:bg-surface-raised/40">
                            <td className="px-4 py-2.5 text-muted-foreground">
                              {fmtDateTime(tx.transactionTime, profile.timezone)}
                            </td>
                            <td className="px-4 py-2.5 text-foreground font-semibold">
                              {tx.transactionId}
                            </td>
                            <td className="px-4 py-2.5 text-foreground font-sans">
                              {tx.merchant}
                            </td>
                            <td className="px-4 py-2.5 text-right font-bold text-foreground">
                              {fmtMoney(tx.amount)}
                            </td>
                            <td className="px-4 py-2.5 text-right font-bold text-magenta">
                              {fmtScore(tx.anomalyScore)}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="panel-raised p-12 text-center text-muted-foreground">
              Select an anomaly case from the queue to start investigation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
