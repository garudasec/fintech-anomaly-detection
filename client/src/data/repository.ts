/**
 * DATA ACCESS LAYER — the single swap point for the real backend.
 *
 * Today every function resolves against in-memory mock data.
 * When the Express/MongoDB API is wired up, replace the bodies with `fetch`
 * calls (e.g. `GET /api/transactions`) and keep the signatures unchanged so
 * no presentation component needs to change.
 *
 * Nothing in here talks to a network. There is no ML service yet; anomaly
 * scores and detection signals are illustrative mock values.
 */
import { MOCK_LOGS } from "./mock/logs";
import {
  activitySeries,
  amountDistribution,
  geographicActivity,
  hourOfDayActivity,
  riskDistribution,
  weeklyAnomalyRatio,
} from "./mock/analytics";
import { MOCK_NOW } from "./mock/seed";
import { MOCK_ANOMALIES, MOCK_TRANSACTIONS, mockUserProfile } from "./mock/transactions";
import type {
  Anomaly,
  AnomalySeverity,
  AnomalyStatus,
  OverviewMetrics,
  Paginated,
  SystemLog,
  TimePoint,
  TimeRange,
  Transaction,
  TransactionQuery,
  UserProfile,
} from "./types";

/** Small artificial latency so loading states are visible and realistic. */
const simulate = <T>(value: T, ms = 320): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const RISK_ORDER = { low: 0, medium: 1, high: 2, critical: 3 } as const;

export async function getTransactions(q: TransactionQuery = {}): Promise<Paginated<Transaction>> {
  const {
    search = "",
    status = "all",
    riskLevel = "all",
    country = "all",
    minAmount,
    maxAmount,
    from,
    to,
    sortBy = "transactionTime",
    sortDir = "desc",
    page = 1,
    pageSize = 12,
  } = q;

  const s = search.trim().toLowerCase();
  let rows = MOCK_TRANSACTIONS.filter((t) => {
    if (
      s &&
      !`${t.transactionId} ${t.userId} ${t.merchant} ${t.location.city}`.toLowerCase().includes(s)
    )
      return false;
    if (status !== "all" && t.status !== status) return false;
    if (riskLevel === "unscored" && t.riskLevel) return false;
    if (riskLevel !== "all" && riskLevel !== "unscored" && t.riskLevel !== riskLevel) return false;
    if (country !== "all" && t.location.countryCode !== country) return false;
    if (minAmount != null && t.amount < minAmount) return false;
    if (maxAmount != null && t.amount > maxAmount) return false;
    if (from && t.transactionTime < from) return false;
    if (to && t.transactionTime > to) return false;
    return true;
  });

  rows = rows.sort((a, b) => {
    let cmp = 0;
    if (sortBy === "amount") cmp = a.amount - b.amount;
    else if (sortBy === "anomalyScore") cmp = (a.anomalyScore ?? -1) - (b.anomalyScore ?? -1);
    else cmp = a.transactionTime.localeCompare(b.transactionTime);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const total = rows.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const items = rows.slice((safePage - 1) * pageSize, safePage * pageSize);
  return simulate({ items, total, page: safePage, pageSize, pageCount });
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  return simulate(MOCK_TRANSACTIONS.find((t) => t.transactionId === id) ?? null, 200);
}

export async function getRelatedTransactions(tx: Transaction, limit = 6): Promise<Transaction[]> {
  const related = MOCK_TRANSACTIONS.filter(
    (t) => t.userId === tx.userId && t.transactionId !== tx.transactionId,
  ).slice(0, limit);
  return simulate(related, 260);
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  return simulate(mockUserProfile(userId), 200);
}

export interface AnomalyQuery {
  severity?: AnomalySeverity | "all";
  status?: AnomalyStatus | "all";
  search?: string;
}

export async function getAnomalies(q: AnomalyQuery = {}): Promise<Anomaly[]> {
  const { severity = "all", status = "all", search = "" } = q;
  const s = search.trim().toLowerCase();
  const order: Record<AnomalyStatus, number> = {
    escalated: 0,
    open: 1,
    under_review: 2,
    resolved: 3,
  };
  const sev: Record<AnomalySeverity, number> = { critical: 0, high: 1, medium: 2 };
  const rows = MOCK_ANOMALIES.filter((a) => {
    if (severity !== "all" && a.severity !== severity) return false;
    if (status !== "all" && a.status !== status) return false;
    if (
      s &&
      !`${a.anomalyId} ${a.transaction.transactionId} ${a.transaction.userId}`
        .toLowerCase()
        .includes(s)
    )
      return false;
    return true;
  }).sort((a, b) => order[a.status] - order[b.status] || sev[a.severity] - sev[b.severity]);
  return simulate(rows);
}

export async function getAnomalyForTransaction(transactionId: string): Promise<Anomaly | null> {
  return simulate(
    MOCK_ANOMALIES.find((a) => a.transaction.transactionId === transactionId) ?? null,
    150,
  );
}

export async function getRecentAnomalies(limit = 6): Promise<Anomaly[]> {
  const rows = [...MOCK_ANOMALIES]
    .filter((a) => a.status !== "resolved")
    .sort((a, b) => (b.transaction.anomalyScore ?? 0) - (a.transaction.anomalyScore ?? 0))
    .slice(0, limit);
  return simulate(rows, 380);
}

export async function getOverviewMetrics(): Promise<OverviewMetrics> {
  const scored = MOCK_TRANSACTIONS.filter((t) => t.riskLevel);
  const anomalies = MOCK_ANOMALIES.length;
  const highRisk = scored.filter((t) => RISK_ORDER[t.riskLevel!] >= 2).length;
  // Scale the sample up so the headline numbers read like a live stream.
  const factor = 184;
  return simulate(
    {
      totalTransactions: MOCK_TRANSACTIONS.length * factor,
      normalTransactions: (MOCK_TRANSACTIONS.length - anomalies) * factor,
      anomaliesDetected: anomalies * factor,
      highRisk: highRisk * factor,
      deltas: {
        totalTransactions: 0.042,
        normalTransactions: 0.038,
        anomaliesDetected: -0.061,
        highRisk: 0.012,
      },
      systemStatus: {
        ingestion: "operational",
        detection: "not_connected",
        lastEventAt: new Date(MOCK_NOW - 14e3).toISOString(),
      },
    },
    280,
  );
}

export async function getActivitySeries(range: TimeRange): Promise<TimePoint[]> {
  return simulate(activitySeries(range), 340);
}

export async function getRiskDistribution() {
  return simulate(riskDistribution(), 300);
}

export async function getAnalytics() {
  return simulate(
    {
      amounts: amountDistribution(),
      hours: hourOfDayActivity(),
      geo: geographicActivity(),
      weekly: weeklyAnomalyRatio(),
      risk: riskDistribution(),
    },
    360,
  );
}

export interface LogQuery {
  severity?: SystemLog["severity"] | "all";
  source?: string | "all";
  search?: string;
}

export async function getLogs(q: LogQuery = {}): Promise<SystemLog[]> {
  const { severity = "all", source = "all", search = "" } = q;
  const s = search.trim().toLowerCase();
  return simulate(
    MOCK_LOGS.filter((l) => {
      if (severity !== "all" && l.severity !== severity) return false;
      if (source !== "all" && l.source !== source) return false;
      if (s && !`${l.event} ${l.description} ${l.source}`.toLowerCase().includes(s)) return false;
      return true;
    }),
    260,
  );
}

export const COUNTRY_OPTIONS = Array.from(
  new Map(MOCK_TRANSACTIONS.map((t) => [t.location.countryCode, t.location.country])).entries(),
)
  .map(([code, name]) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const LOG_SOURCES = Array.from(new Set(MOCK_LOGS.map((l) => l.source))).sort();
