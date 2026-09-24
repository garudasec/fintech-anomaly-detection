import type { AnomalyStatus, LogSeverity, RiskLevel, TransactionStatus } from "@/data/types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});
const num = new Intl.NumberFormat("en-US");
const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });

export const fmtMoney = (n: number) => usd.format(n);
export const fmtMoneyCompact = (n: number) => usdCompact.format(n);
export const fmtNumber = (n: number) => num.format(n);
export const fmtCompact = (n: number) => compact.format(n);
export const fmtPct = (frac: number, digits = 1) =>
  `${frac > 0 ? "+" : ""}${(frac * 100).toFixed(digits)}%`;

export const fmtScore = (score: number | null | undefined) =>
  score == null ? "—" : score.toFixed(2);

export function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "UTC",
  });
}

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function fmtRelative(iso: string, now = Date.now()) {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const m = Math.floor(diff / 60e3);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export const RISK_LABEL: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  critical: "Critical",
};

export const STATUS_LABEL: Record<TransactionStatus, string> = {
  completed: "Completed",
  pending: "Pending",
  flagged: "Flagged",
  under_review: "Under review",
  blocked: "Blocked",
};

export const ANOMALY_STATUS_LABEL: Record<AnomalyStatus, string> = {
  open: "Open",
  under_review: "Under review",
  escalated: "Escalated",
  resolved: "Resolved",
};

export const LOG_SEVERITY_LABEL: Record<LogSeverity, string> = {
  info: "Info",
  warning: "Warning",
  error: "Error",
  debug: "Debug",
};
