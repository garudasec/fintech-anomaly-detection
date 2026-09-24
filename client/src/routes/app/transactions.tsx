import { useState, useDeferredValue, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeftRight,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  Trash2,
} from "lucide-react";
import { transactionsQuery, transactionQuery } from "@/data/queries";
import { COUNTRY_OPTIONS, deleteTransactions } from "@/data/repository";
import type {
  RiskLevel,
  TransactionStatus,
  Transaction,
} from "@/data/types";
import {
  fmtDate,
  fmtDateTime,
  fmtMoney,
  fmtScore,
  RISK_LABEL,
  STATUS_LABEL,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// ─── Route ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/app/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — FinTech Anomaly Detection" },
      {
        name: "description",
        content: "Monitor and filter all financial transactions with risk scoring and anomaly detection signals.",
      },
    ],
  }),
  component: TransactionsPage,
});

// ─── Risk / Status badge helpers ─────────────────────────────────────────────

function RiskBadge({ risk }: { risk: RiskLevel | null }) {
  if (!risk) return <span className="text-muted-foreground font-mono text-[0.68rem]">—</span>;
  const styles: Record<RiskLevel, string> = {
    low: "border-lime/40 bg-lime/10 text-lime",
    medium: "border-amber/40 bg-amber/10 text-amber",
    high: "border-magenta/40 bg-magenta/10 text-magenta",
    critical: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold",
        styles[risk],
      )}
    >
      {RISK_LABEL[risk]}
    </Badge>
  );
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const styles: Record<TransactionStatus, string> = {
    completed: "border-lime/30 bg-lime/8 text-lime",
    pending: "border-amber/30 bg-amber/8 text-amber",
    flagged: "border-magenta/30 bg-magenta/8 text-magenta",
    under_review: "border-blue/30 bg-blue/8 text-blue",
    blocked: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold",
        styles[status],
      )}
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}

// ─── Signal Kind label ────────────────────────────────────────────────────────

const SIGNAL_COLOR: Record<string, string> = {
  amount_spike: "bg-magenta",
  unusual_time: "bg-amber",
  location_deviation: "bg-blue",
  frequency_burst: "bg-destructive",
  new_merchant: "bg-lime",
  velocity: "bg-violet",
};

// ─── Detail Sheet ─────────────────────────────────────────────────────────────

function TransactionDetailSheet({
  txId,
  open,
  onClose,
}: {
  txId: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const { profile } = useProfile();
  const { data: tx, isLoading } = useQuery(transactionQuery(txId));

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full max-w-xl overflow-y-auto border-l border-border bg-sidebar p-0 scrollbar-thin"
      >
        <SheetTitle className="sr-only">Transaction Detail</SheetTitle>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-sidebar px-6 py-4">
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Transaction Detail
            </div>
            <div className="mt-0.5 font-mono text-sm font-semibold text-foreground">
              {isLoading ? "Loading…" : tx?.transactionId ?? "—"}
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        {isLoading && !tx ? (
          <div className="space-y-4 p-6 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-surface-raised" />
            ))}
          </div>
        ) : !tx ? (
          <div className="p-6 text-center text-sm text-muted-foreground">
            Transaction not found.
          </div>
        ) : (
          <div className="space-y-6 p-6">
            {/* Amount + Status */}
            <div className="panel-raised flex items-center justify-between p-4">
              <div>
                <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                  Amount
                </div>
                <div className="mt-1 font-mono text-2xl font-light tabular text-foreground">
                  {fmtMoney(tx.amount)}
                </div>
              </div>
              <div className="text-right">
                <StatusBadge status={tx.status} />
                <div className="mt-2">
                  <RiskBadge risk={tx.riskLevel} />
                </div>
              </div>
            </div>

            {/* Core Fields */}
            <section>
              <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                Transaction Info
              </h4>
              <div className="space-y-2 text-xs">
                <DetailRow label="Transaction ID" value={tx.transactionId} mono />
                <DetailRow label="User ID" value={tx.userId} mono />
                <DetailRow label="Time" value={fmtDateTime(tx.transactionTime, profile.timezone)} mono />
                <DetailRow label="Channel" value={tx.channel.toUpperCase()} mono />
                <DetailRow label="Merchant" value={tx.merchant} />
                <DetailRow
                  label="Location"
                  value={`${tx.location.city}, ${tx.location.country} (${tx.location.countryCode})`}
                />
              </div>
            </section>

            <Separator className="bg-border/60" />

            {/* Risk Section */}
            <section>
              <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                Risk Analysis
              </h4>
              <div className="space-y-2 text-xs">
                <DetailRow
                  label="Anomaly Score"
                  value={
                    tx.anomalyScore != null ? (
                      <span className="font-mono font-semibold text-foreground">
                        {tx.anomalyScore.toFixed(2)}
                        <span className="ml-1 text-muted-foreground">/ 1.00</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Pending analysis</span>
                    )
                  }
                />
                <DetailRow label="Risk Level" value={<RiskBadge risk={tx.riskLevel} />} />
                <DetailRow
                  label="Analysis State"
                  value={
                    <span className={cn(
                      "font-mono text-[0.68rem] uppercase",
                      tx.analysisState === "analyzed" ? "text-lime" :
                      tx.analysisState === "pending" ? "text-amber" : "text-muted-foreground",
                    )}>
                      {tx.analysisState}
                    </span>
                  }
                />
              </div>

              {/* Score bar */}
              {tx.anomalyScore != null && (
                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-surface-raised overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-700",
                        tx.anomalyScore >= 0.9 ? "bg-destructive" :
                        tx.anomalyScore >= 0.72 ? "bg-magenta" :
                        tx.anomalyScore >= 0.45 ? "bg-amber" : "bg-lime",
                      )}
                      style={{ width: `${tx.anomalyScore * 100}%` }}
                    />
                  </div>
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
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DetailRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className={cn("text-right text-foreground", mono && "font-mono")}>{value}</span>
    </div>
  );
}

// ─── Sort Button ─────────────────────────────────────────────────────────────

function SortButton({
  active,
  dir,
  onClick,
  children,
}: {
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 transition-colors",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
      <ArrowUpDown
        className={cn("size-3", active && (dir === "asc" ? "rotate-0" : "rotate-180"))}
      />
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 15;

function TransactionsPage() {
  const { profile } = useProfile();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const [status, setStatus] = useState<TransactionStatus | "all">("all");
  const [riskLevel, setRiskLevel] = useState<RiskLevel | "all" | "unscored">("all");
  const [country, setCountry] = useState<string>("all");
  const [channel, setChannel] = useState<string>("all");
  const [minAmount, setMinAmount] = useState<string>("");
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const [sortBy, setSortBy] = useState<"transactionTime" | "amount" | "anomalyScore">(
    "transactionTime",
  );
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();

  // Clear selections when filters or page changes
  useEffect(() => {
    setSelectedIds(new Set());
  }, [search, debouncedSearch, status, riskLevel, country, channel, minAmount, maxAmount, from, to, page, sortBy, sortDir]);

  const query: Parameters<typeof transactionsQuery>[0] = {
    search: debouncedSearch,
    status,
    riskLevel,
    country,
    sortBy,
    sortDir,
    page,
    pageSize: PAGE_SIZE,
    ...(channel !== "all" ? { channel: channel as any } : {}),
    ...(minAmount ? { minAmount: Number(minAmount) } : {}),
    ...(maxAmount ? { maxAmount: Number(maxAmount) } : {}),
    ...(from ? { from: new Date(from).toISOString() } : {}),
    ...(to ? { to: new Date(to).toISOString() } : {}),
  };

  const { data, isLoading } = useQuery(transactionsQuery(query));

  function toggleSort(col: typeof sortBy) {
    if (sortBy === col) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortBy(col);
      setSortDir("desc");
    }
    setPage(1);
  }

  function openDetail(tx: Transaction) {
    setSelectedTxId(tx.transactionId);
    setDetailOpen(true);
  }

  function clearFilters() {
    setSearch("");
    setStatus("all");
    setRiskLevel("all");
    setCountry("all");
    setChannel("all");
    setMinAmount("");
    setMaxAmount("");
    setFrom("");
    setTo("");
    setPage(1);
  }

  function handleSelectAll(checked: boolean) {
    if (!data || !data.items) return;
    if (checked) {
      setSelectedIds(new Set(data.items.map((tx) => tx.transactionId)));
    } else {
      setSelectedIds(new Set());
    }
  }

  function handleSelectOne(txId: string, checked: boolean) {
    const next = new Set(selectedIds);
    if (checked) {
      next.add(txId);
    } else {
      next.delete(txId);
    }
    setSelectedIds(next);
  }

  async function handleDeleteSelected() {
    if (selectedIds.size === 0) return;
    setIsDeleting(true);
    try {
      const result = await deleteTransactions(Array.from(selectedIds));
      if (result && result.deleted) {
        // Optional: show toast or success message here if available
      }
      setSelectedIds(new Set());
      setDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["anomalies"] });
      queryClient.invalidateQueries({ queryKey: ["overview"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    } catch (err: any) {
      alert("Error deleting transactions: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  const activeFiltersCount = [
    search !== "",
    status !== "all",
    riskLevel !== "all",
    country !== "all",
    channel !== "all",
    minAmount !== "",
    maxAmount !== "",
    from !== "",
    to !== ""
  ].filter(Boolean).length;

  const hasFilters = activeFiltersCount > 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl border border-blue/30 bg-blue/10 text-blue">
            <ArrowLeftRight className="size-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              Transactions
            </h1>
            <p className="text-xs text-muted-foreground">
              {data ? `${data.total.toLocaleString()} transactions` : "Loading…"}
            </p>
          </div>
        </div>

        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2 bg-surface border border-border px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-medium text-foreground">{selectedIds.size} selected</span>
            <Separator orientation="vertical" className="h-4" />
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5 text-xs">
                  <Trash2 className="size-3.5" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete transactions?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground py-4">
                  Are you sure you want to delete {selectedIds.size} transaction{selectedIds.size !== 1 ? 's' : ''}? This action cannot be undone.
                </p>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setDeleteDialogOpen(false)} disabled={isDeleting}>Cancel</Button>
                  <Button variant="destructive" onClick={handleDeleteSelected} disabled={isDeleting}>
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="panel-raised p-4">
        <div className="flex flex-wrap gap-3">
          {/* Search */}
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="transactions-search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by ID, user, merchant, city…"
              className="h-9 bg-surface pl-8 pr-8 text-xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(""); setPage(1); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                title="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <Select value={status} onValueChange={(v) => { setStatus(v as typeof status); setPage(1); }}>
            <SelectTrigger id="status-filter" className="h-9 w-36 bg-surface text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>

          {/* Risk filter */}
          <Select value={riskLevel} onValueChange={(v) => { setRiskLevel(v as typeof riskLevel); setPage(1); }}>
            <SelectTrigger id="risk-filter" className="h-9 w-36 bg-surface text-xs">
              <SelectValue placeholder="Risk Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="unscored">Unscored</SelectItem>
            </SelectContent>
          </Select>

          {/* Country filter */}
          <Select value={country} onValueChange={(v) => { setCountry(v); setPage(1); }}>
            <SelectTrigger id="country-filter" className="h-9 w-40 bg-surface text-xs">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {COUNTRY_OPTIONS.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
              Clear
            </Button>
          )}

          <div className="ml-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1.5 text-xs text-muted-foreground bg-surface border-border">
                  <SlidersHorizontal className="size-3.5" />
                  <span className="hidden sm:inline">Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-4 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-medium leading-none text-sm">Advanced Filters</h4>
                  <p className="text-xs text-muted-foreground">Filter by amount, date, and channel.</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Amount Range</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="h-8 text-xs"
                        value={minAmount}
                        onChange={(e) => { setMinAmount(e.target.value); setPage(1); }}
                      />
                      <span className="text-muted-foreground text-xs">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        className="h-8 text-xs"
                        value={maxAmount}
                        onChange={(e) => { setMaxAmount(e.target.value); setPage(1); }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Date Range</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="date"
                        className="h-8 text-xs flex-1"
                        value={from}
                        onChange={(e) => { setFrom(e.target.value); setPage(1); }}
                      />
                      <span className="text-muted-foreground text-xs">-</span>
                      <Input
                        type="date"
                        className="h-8 text-xs flex-1"
                        value={to}
                        onChange={(e) => { setTo(e.target.value); setPage(1); }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Channel</Label>
                    <Select value={channel} onValueChange={(v) => { setChannel(v); setPage(1); }}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="All Channels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Channels</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="wire">Wire</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                        <SelectItem value="atm">ATM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {hasFilters && (
                  <Button variant="ghost" size="sm" className="w-full text-xs h-8 mt-2" onClick={clearFilters}>
                    Clear all filters
                  </Button>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="panel-raised overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/70 bg-surface/40 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 w-10">
                  <Checkbox
                    checked={!!(data && data.items.length > 0 && selectedIds.size === data.items.length)}
                    onCheckedChange={(checked) => handleSelectAll(checked === true)}
                    aria-label="Select all"
                  />
                </th>
                <th className="py-3 sm:px-6">Transaction</th>
                <th className="px-4 py-3">
                  <SortButton
                    active={sortBy === "amount"}
                    dir={sortDir}
                    onClick={() => toggleSort("amount")}
                  >
                    Amount
                  </SortButton>
                </th>
                <th className="hidden px-4 py-3 md:table-cell">Location</th>
                <th className="hidden px-4 py-3 lg:table-cell">Channel</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">
                  <SortButton
                    active={sortBy === "anomalyScore"}
                    dir={sortDir}
                    onClick={() => toggleSort("anomalyScore")}
                  >
                    Score
                  </SortButton>
                </th>
                <th className="hidden px-4 py-3 sm:table-cell">Risk</th>
                <th className="px-5 py-3 text-right sm:px-6">
                  <SortButton
                    active={sortBy === "transactionTime"}
                    dir={sortDir}
                    onClick={() => toggleSort("transactionTime")}
                  >
                    Time
                  </SortButton>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-mono">
              {isLoading || !data ? (
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={9} className="h-12 px-6">
                      <div className="h-3 w-full rounded bg-surface-raised" />
                    </td>
                  </tr>
                ))
              ) : data.items.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-14 text-center text-muted-foreground font-sans">
                    No transactions match the current filters.
                  </td>
                </tr>
              ) : (
                data.items.map((tx) => (
                  <tr
                    key={tx.transactionId}
                    className="group cursor-pointer transition-colors duration-150 hover:bg-surface/50"
                  >
                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.has(tx.transactionId)}
                        onCheckedChange={(checked) => handleSelectOne(tx.transactionId, checked === true)}
                        aria-label={`Select ${tx.transactionId}`}
                      />
                    </td>
                    <td className="py-3 sm:px-6" onClick={() => openDetail(tx)}>
                      <div className="font-semibold text-foreground font-sans">{tx.merchant}</div>
                      <div className="text-[0.68rem] text-muted-foreground">
                        {tx.transactionId} · {tx.userId}
                      </div>
                    </td>
                    <td className="px-4 py-3" onClick={() => openDetail(tx)}>
                      <span className="font-semibold text-foreground tabular">
                        {fmtMoney(tx.amount)}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 md:table-cell" onClick={() => openDetail(tx)}>
                      <span className="inline-flex items-center gap-1 text-muted-foreground font-sans">
                        <MapPin className="size-3 text-muted-foreground/60" />
                        {tx.location.city}, {tx.location.countryCode}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell" onClick={() => openDetail(tx)}>
                      <span className="text-muted-foreground uppercase text-[0.68rem]">
                        {tx.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={() => openDetail(tx)}>
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-4 py-3" onClick={() => openDetail(tx)}>
                      <div className="flex items-center gap-1.5">
                        {tx.anomalyScore != null && (
                          <span
                            className={cn(
                              "size-1.5 rounded-full",
                              tx.anomalyScore >= 0.9
                                ? "bg-destructive shadow-[0_0_6px_var(--color-destructive)]"
                                : tx.anomalyScore >= 0.72
                                  ? "bg-magenta shadow-[0_0_5px_var(--color-magenta)]"
                                  : tx.anomalyScore >= 0.45
                                    ? "bg-amber"
                                    : "bg-lime",
                            )}
                          />
                        )}
                        <span className="tabular text-foreground">{fmtScore(tx.anomalyScore)}</span>
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell" onClick={() => openDetail(tx)}>
                      <RiskBadge risk={tx.riskLevel} />
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground text-[0.72rem] font-sans sm:px-6" onClick={() => openDetail(tx)}>
                      {fmtDateTime(tx.transactionTime, profile.timezone)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pageCount > 1 && (
          <div className="flex items-center justify-between border-t border-border/70 px-5 py-3 sm:px-6">
            <span className="font-mono text-[0.72rem] text-muted-foreground">
              Page {data.page} of {data.pageCount} · {data.total} results
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={data.page <= 1}
                onClick={() => setPage((p) => p - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                disabled={data.page >= data.pageCount}
                onClick={() => setPage((p) => p + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <TransactionDetailSheet
        txId={selectedTxId}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}
