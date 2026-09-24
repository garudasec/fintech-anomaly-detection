import { useState, useDeferredValue } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Info,
  Layers,
  RefreshCw,
  Search,
  Terminal,
  X,
} from "lucide-react";
import { logsQuery } from "@/data/queries";
import { LOG_SOURCES } from "@/data/repository";
import type { LogSeverity, LogStatus, SystemLog } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { fmtDateTime, LOG_SEVERITY_LABEL } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/logs")({
  head: () => ({
    meta: [{ title: "System Logs — FinTech Anomaly Detection" }],
  }),
  component: LogsPage,
});

function LogsPage() {
  const [severityFilter, setSeverityFilter] = useState<LogSeverity | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<string | "all">("all");
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);

  const { data: logs, isLoading, refetch } = useQuery(
    logsQuery({
      severity: severityFilter,
      source: sourceFilter,
      search: deferredSearch,
    })
  );

  const totalLogs = logs?.length ?? 0;
  const errorCount = logs?.filter((l) => l.severity === "error").length ?? 0;
  const warningCount = logs?.filter((l) => l.severity === "warning").length ?? 0;
  const infoCount = logs?.filter((l) => l.severity === "info").length ?? 0;

  const hasFilters = severityFilter !== "all" || sourceFilter !== "all" || search !== "";

  const resetFilters = () => {
    setSeverityFilter("all");
    setSourceFilter("all");
    setSearch("");
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Infrastructure & System Audit Logs
            </h1>
            <span className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground font-medium">
              Pipeline Stream
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Ingestion telemetry, model scoring audit trails, rate limit monitors, and infrastructure status events.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => refetch()}
          className="h-8 text-xs font-mono gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className="size-3.5" />
          <span>Refresh Feed</span>
        </Button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="panel-raised p-4 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg border border-border bg-surface-raised text-foreground">
            <Terminal className="size-4" />
          </div>
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Total Logged Events
            </div>
            <div className="font-mono text-lg font-bold text-foreground">{totalLogs}</div>
          </div>
        </div>

        <div className="panel-raised p-4 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive">
            <AlertCircle className="size-4" />
          </div>
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Errors / Exceptions
            </div>
            <div className="font-mono text-lg font-bold text-destructive">{errorCount}</div>
          </div>
        </div>

        <div className="panel-raised p-4 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg border border-amber/30 bg-amber/10 text-amber">
            <AlertTriangle className="size-4" />
          </div>
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Warnings
            </div>
            <div className="font-mono text-lg font-bold text-amber">{warningCount}</div>
          </div>
        </div>

        <div className="panel-raised p-4 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg border border-blue/30 bg-blue/10 text-blue">
            <Info className="size-4" />
          </div>
          <div>
            <div className="font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              Info & Debug
            </div>
            <div className="font-mono text-lg font-bold text-blue">{infoCount}</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="panel-raised p-4 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by log ID, event name, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Severity Select */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as LogSeverity | "all")}
              className="h-9 rounded-md border border-input bg-surface px-3 py-1 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">Severity: All</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="debug">Debug</option>
            </select>

            {/* Source Select */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-surface px-3 py-1 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="all">Subsystem: All</option>
              {LOG_SOURCES.map((src) => (
                <option key={src} value={src}>
                  {src}
                </option>
              ))}
            </select>

            {hasFilters && (
              <Button
                size="sm"
                variant="ghost"
                onClick={resetFilters}
                className="h-9 text-xs font-mono text-muted-foreground hover:text-foreground gap-1"
              >
                <X className="size-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="panel-raised overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-border/70 bg-surface/60 text-[0.68rem] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Timestamp (UTC)</th>
                <th className="px-4 py-3">Log ID</th>
                <th className="px-4 py-3">Event Name</th>
                <th className="px-4 py-3">Subsystem Source</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={7} className="h-10 px-4 py-2 bg-surface/20" />
                  </tr>
                ))
              ) : !logs || logs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground font-sans">
                    No system logs match the current filter criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  return (
                    <tr
                      key={log.logId}
                      onClick={() => setSelectedLog(log)}
                      className="hover:bg-surface-raised/50 cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        {fmtDateTime(log.timestamp)}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                        {log.logId}
                      </td>
                      <td className="px-4 py-3 text-foreground font-semibold font-sans whitespace-nowrap">
                        {log.event}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                        <span className="rounded border border-border bg-surface px-1.5 py-0.5 text-[0.68rem]">
                          {log.source}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <SeverityBadge severity={log.severity} />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <StatusBadge status={log.status} />
                      </td>
                      <td className="px-4 py-3 text-muted-foreground truncate max-w-xs font-sans">
                        {log.description}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Detail Drawer Sheet */}
      <Sheet open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <SheetContent className="w-full max-w-lg border-l border-border bg-background p-6 space-y-6">
          {selectedLog && (
            <>
              <SheetHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <SeverityBadge severity={selectedLog.severity} />
                  <StatusBadge status={selectedLog.status} />
                </div>
                <SheetTitle className="font-mono text-lg font-bold text-foreground">
                  {selectedLog.logId}
                </SheetTitle>
                <SheetDescription className="font-sans text-xs text-muted-foreground">
                  Event: <span className="font-semibold text-foreground">{selectedLog.event}</span>
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-4 font-mono text-xs">
                <div className="rounded-lg border border-border/50 bg-surface/50 p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="text-foreground">{fmtDateTime(selectedLog.timestamp)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subsystem Source:</span>
                    <span className="text-foreground">{selectedLog.source}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Log Severity:</span>
                    <span className="text-foreground capitalize">{selectedLog.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Execution Status:</span>
                    <span className="text-foreground capitalize">{selectedLog.status}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-semibold text-foreground">Event Description:</span>
                  <div className="rounded-lg border border-border bg-surface p-3 font-sans text-xs text-foreground leading-relaxed">
                    {selectedLog.description}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-semibold text-foreground">JSON Diagnostic Payload:</span>
                  <pre className="rounded-lg border border-border/70 bg-black/50 p-3 font-mono text-[0.72rem] text-lime/90 overflow-x-auto">
                    {JSON.stringify(
                      {
                        logId: selectedLog.logId,
                        timestamp: selectedLog.timestamp,
                        event: selectedLog.event,
                        source: selectedLog.source,
                        severity: selectedLog.severity,
                        status: selectedLog.status,
                        meta: {
                          cluster: "us-east-prod-02",
                          nodeId: "worker-ingest-89f",
                          traceId: `tr-${Math.random().toString(36).substring(2, 10)}`,
                        },
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: LogSeverity }) {
  const styles: Record<LogSeverity, string> = {
    info: "border-blue/40 bg-blue/10 text-blue",
    warning: "border-amber/40 bg-amber/10 text-amber",
    error: "border-destructive/40 bg-destructive/10 text-destructive",
    debug: "border-border bg-surface text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "rounded border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider font-semibold",
        styles[severity]
      )}
    >
      {LOG_SEVERITY_LABEL[severity]}
    </span>
  );
}

function StatusBadge({ status }: { status: LogStatus }) {
  const styles: Record<LogStatus, string> = {
    ok: "border-lime/40 bg-lime/10 text-lime",
    retrying: "border-amber/40 bg-amber/10 text-amber",
    failed: "border-destructive/40 bg-destructive/10 text-destructive",
    acknowledged: "border-border bg-surface text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "rounded border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider font-semibold",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
