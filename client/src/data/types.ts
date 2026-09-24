/**
 * Domain types shared by the data layer and the UI.
 * These mirror the shape the REST API (GET /api/transactions) returns.
 */

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type TransactionStatus = "completed" | "pending" | "flagged" | "under_review" | "blocked";

/** Whether the anomaly analysis for a transaction has produced a score yet. */
export type AnalysisState = "analyzed" | "pending" | "unavailable";

export type Channel = "card" | "wire" | "transfer" | "mobile" | "atm";

export type DetectionSignalKind =
  | "amount_spike"
  | "unusual_time"
  | "location_deviation"
  | "frequency_burst"
  | "new_merchant"
  | "velocity"
  | "amount_dev"
  | "large_amount"
  | "location_new"
  | "channel_unusual"
  | "time_pattern"
  | (string & {});

export interface DetectionSignal {
  kind: DetectionSignalKind;
  label: string;
  /** 0–1 contribution weight. */
  weight: number;
  detail: string;
}

export interface GeoLocation {
  city: string;
  country: string | null;
  countryCode: string | null;
}

export interface Transaction {
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  transactionTime: string; // ISO 8601
  location: GeoLocation;
  status: TransactionStatus;
  /** 0–1. `null` when analysis is pending or unavailable. */
  anomalyScore: number | null;
  riskLevel: RiskLevel | null;
  analysisState: AnalysisState;
  channel: Channel;
  merchant: string;
  signals: DetectionSignal[];
  investigationNote?: string | null;
}

export type AnomalySeverity = "medium" | "high" | "critical";
export type AnomalyStatus = "open" | "under_review" | "escalated" | "resolved";

export interface Anomaly {
  anomalyId: string;
  transaction: Transaction;
  severity: AnomalySeverity;
  status: AnomalyStatus;
  primarySignal: DetectionSignal;
  detectedAt: string;
  assignee: string | null;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  accountAge: string | null;
  homeLocation: GeoLocation | null;
  averageAmount: number;
  typicalWindow: string | null;
  transactionsLast30d: number;
  priorFlags: number;
}

export type LogSeverity = "info" | "warning" | "error" | "debug";
export type LogStatus = "ok" | "retrying" | "failed" | "acknowledged";

export interface SystemLog {
  logId: string;
  timestamp: string;
  event: string;
  source: string;
  severity: LogSeverity;
  description: string;
  status: LogStatus;
}

export interface TimePoint {
  t: string; // label
  ts: number; // epoch ms
  total: number;
  anomalies: number;
}

export type TimeRange = "24h" | "7d" | "30d";

export interface OverviewMetrics {
  totalTransactions: number;
  normalTransactions: number;
  anomaliesDetected: number;
  highRisk: number;
  /** Delta vs previous period, as a fraction (e.g. 0.042 = +4.2%). */
  deltas: {
    totalTransactions: number;
    normalTransactions: number;
    anomaliesDetected: number;
    highRisk: number;
  };
  systemStatus: {
    ingestion: "operational" | "degraded";
    detection: "operational" | "degraded" | "not_connected";
    lastEventAt: string | null;
  };
}

export interface TransactionQuery {
  search?: string;
  status?: TransactionStatus | "all";
  riskLevel?: RiskLevel | "all" | "unscored";
  country?: string | "all";
  channel?: Channel | "all";
  minAmount?: number;
  maxAmount?: number;
  from?: string;
  to?: string;
  sortBy?: "transactionTime" | "amount" | "anomalyScore";
  sortDir?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
}


export interface RiskDistributionItem {
  key: string;
  name: string;
  value: number;
  color: string;
}
