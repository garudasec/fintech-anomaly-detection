/**
 * DATA ACCESS LAYER — connected to real REST API backend.
 * Base URL: http://localhost:5000
 */
import type {
  Anomaly,
  RiskDistributionItem,
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

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const url = BASE_URL + (path.startsWith("/") ? path : "/" + path);
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  let body: any;
  try {
    body = await res.json();
  } catch (e) {
    if (!res.ok) {
      throw new Error("HTTP " + res.status + ": " + res.statusText);
    }
    throw new Error("Failed to parse JSON response from server");
  }

  if (!res.ok) {
    const msg = body?.message || ("HTTP " + res.status + ": " + res.statusText);
    throw new Error(msg);
  }

  if (body && typeof body === "object" && "data" in body) {
    return body.data as T;
  }

  return body as T;
}

function mapTransaction(raw: any): Transaction {
  if (!raw) return raw;

  let location: { city: string; country: string | null; countryCode: string | null } = {
    city: "Unknown",
    country: null,
    countryCode: null,
  };

  if (raw.location && typeof raw.location === "object") {
    location = {
      city: raw.location.city ?? "Unknown",
      country: raw.location.country ?? null,
      countryCode: raw.location.countryCode ?? null,
    };
  } else if (typeof raw.location === "string") {
    const parts = raw.location.split(",").map((s: string) => s.trim());
    location = {
      city: parts[0] || "Unknown",
      country: parts[1] || null,
      countryCode: null,
    };
  }

  const signals = (raw.signals || []).map((s: any) => ({
    kind: s.kind || "amount_dev",
    label: s.label || s.kind || "Signal",
    weight: typeof s.weight === "number" ? s.weight : 0.5,
    detail: s.detail || "",
  }));

  return {
    transactionId: raw.transactionId || raw._id || "",
    userId: raw.userId || "",
    amount: typeof raw.amount === "number" ? raw.amount : 0,
    currency: raw.currency || "USD",
    transactionTime: raw.transactionTime
      ? new Date(raw.transactionTime).toISOString()
      : new Date().toISOString(),
    location,
    status: raw.status || "completed",
    anomalyScore: typeof raw.anomalyScore === "number" ? raw.anomalyScore : null,
    riskLevel: raw.riskLevel || null,
    analysisState: raw.analysisState || "unavailable",
    channel: raw.channel || "card",
    merchant: raw.merchant || "Unknown Merchant",
    signals,
    investigationNote: raw.investigationNote ?? null,
  };
}

function mapAnomaly(raw: any): Anomaly {
  const tx = mapTransaction(raw.transaction);
  const primarySignal = raw.primarySignal
    ? {
        kind: raw.primarySignal.kind || "amount_dev",
        label: raw.primarySignal.label || "Anomaly Signal",
        weight: typeof raw.primarySignal.weight === "number" ? raw.primarySignal.weight : 0.5,
        detail: raw.primarySignal.detail || "",
      }
    : (tx.signals[0] ?? {
        kind: "amount_dev",
        label: "Flagged Transaction",
        weight: tx.anomalyScore ?? 0.5,
        detail: "Transaction flagged for risk review",
      });

  return {
    anomalyId: raw.anomalyId || ("ANM-" + tx.transactionId),
    transaction: tx,
    severity: raw.severity || "medium",
    status: raw.status || "open",
    primarySignal,
    detectedAt: raw.detectedAt
      ? new Date(raw.detectedAt).toISOString()
      : tx.transactionTime,
    assignee: raw.assignee ?? null,
  };
}

export async function getTransactions(q: TransactionQuery = {}): Promise<Paginated<Transaction>> {
  const params = new URLSearchParams();
  if (q.search) params.append("search", q.search);
  if (q.status && q.status !== "all") params.append("status", q.status);
  if (q.riskLevel && q.riskLevel !== "all") params.append("riskLevel", q.riskLevel);
  if (q.country && q.country !== "all") params.append("country", q.country);
  if (q.channel && q.channel !== "all") params.append("channel", q.channel);
  if (q.minAmount != null) params.append("minAmount", String(q.minAmount));
  if (q.maxAmount != null) params.append("maxAmount", String(q.maxAmount));
  if (q.from) params.append("from", q.from);
  if (q.to) params.append("to", q.to);
  if (q.sortBy) params.append("sortBy", q.sortBy);
  if (q.sortDir) params.append("sortDir", q.sortDir);
  if (q.page != null) params.append("page", String(q.page));
  if (q.pageSize != null) params.append("pageSize", String(q.pageSize));

  const queryStr = params.toString();
  const rawData = await apiFetch<any>("/api/transactions" + (queryStr ? "?" + queryStr : ""));

  return {
    items: (rawData.items || []).map(mapTransaction),
    total: rawData.total ?? 0,
    page: rawData.page ?? 1,
    pageSize: rawData.pageSize ?? 12,
    pageCount: rawData.pageCount ?? 1,
  };
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  try {
    const data = await apiFetch<any>("/api/transactions/" + encodeURIComponent(id));
    return mapTransaction(data);
  } catch (err: any) {
    if (err.message && (err.message.includes("404") || err.message.includes("not found"))) {
      return null;
    }
    throw err;
  }
}

export async function createTransaction(payload: any): Promise<Transaction> {
  const data = await apiFetch<any>("/api/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return mapTransaction(data);
}

export async function bulkCreateTransactions(payload: any[]): Promise<any> {
  return await apiFetch<any>("/api/transactions/bulk", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function analyzeTransaction(id: string): Promise<any> {
  return await apiFetch<any>(`/api/transactions/${encodeURIComponent(id)}/analyze`, {
    method: "POST",
  });
}

export async function deleteTransactions(ids: string[]): Promise<any> {
  return await apiFetch<any>("/api/transactions/bulk", {
    method: "DELETE",
    body: JSON.stringify({ ids }),
  });
}

export async function getRelatedTransactions(tx: Transaction, limit = 6): Promise<Transaction[]> {
  const id = tx.transactionId;
  const rawList = await apiFetch<any[]>("/api/transactions/" + encodeURIComponent(id) + "/related");
  return (rawList || []).slice(0, limit).map(mapTransaction);
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const data = await apiFetch<any>("/api/users/" + encodeURIComponent(userId) + "/profile");
  return {
    userId: data.userId,
    displayName: data.displayName || data.userId,
    accountAge: data.accountAge ?? "New user",
    homeLocation: data.homeLocation
      ? {
          city: data.homeLocation.city ?? "Unknown",
          country: data.homeLocation.country ?? null,
          countryCode: data.homeLocation.countryCode ?? null,
        }
      : null,
    averageAmount: typeof data.averageAmount === "number" ? data.averageAmount : 0,
    typicalWindow: data.typicalWindow ?? "Variable",
    transactionsLast30d: typeof data.transactionsLast30d === "number" ? data.transactionsLast30d : 0,
    priorFlags: typeof data.priorFlags === "number" ? data.priorFlags : 0,
  };
}

export interface AnalystProfile {
  name: string;
  email: string;
  role: string;
  timezone: string;
}

export async function getAnalystProfile(): Promise<AnalystProfile> {
  const data = await apiFetch<any>("/api/analyst/profile");
  return {
    name: data.name || "M. Okafor",
    email: data.email || "analyst@fintech-sentinel.local",
    role: data.role || "Lead Risk Analyst",
    timezone: data.timezone || "UTC",
  };
}

export async function updateAnalystProfile(profile: Partial<AnalystProfile>): Promise<AnalystProfile> {
  const data = await apiFetch<any>("/api/analyst/profile", {
    method: "PATCH",
    body: JSON.stringify(profile),
  });
  return {
    name: data.name || "M. Okafor",
    email: data.email || "analyst@fintech-sentinel.local",
    role: data.role || "Lead Risk Analyst",
    timezone: data.timezone || "UTC",
  };
}

export interface AnomalyQuery {
  severity?: AnomalySeverity | "all";
  status?: AnomalyStatus | "all";
  search?: string;
}

export async function getAnomalies(q: AnomalyQuery = {}): Promise<Anomaly[]> {
  const params = new URLSearchParams();
  if (q.severity && q.severity !== "all") params.append("severity", q.severity);
  if (q.status && q.status !== "all") params.append("status", q.status);
  if (q.search) params.append("search", q.search);

  const queryStr = params.toString();
  const data = await apiFetch<any[]>("/api/anomalies" + (queryStr ? "?" + queryStr : ""));
  return (data || []).map(mapAnomaly);
}

export async function getAnomalyForTransaction(transactionId: string): Promise<Anomaly | null> {
  const anomalies = await getAnomalies({ search: transactionId });
  return anomalies.find((a) => a.transaction.transactionId === transactionId) ?? null;
}

export async function getRecentAnomalies(limit = 6): Promise<Anomaly[]> {
  const data = await apiFetch<any[]>("/api/anomalies/recent?limit=" + limit);
  return (data || []).map(mapAnomaly);
}

export async function updateAnomalyStatus(anomalyId: string, status: AnomalyStatus, investigationNote?: string): Promise<Anomaly> {
  const data = await apiFetch<any>("/api/anomalies/" + encodeURIComponent(anomalyId) + "/status", {
    method: "PATCH",
    body: JSON.stringify({ status, investigationNote }),
  });
  return mapAnomaly(data);
}

export async function getOverviewMetrics(): Promise<OverviewMetrics> {
  const data = await apiFetch<OverviewMetrics>("/api/analytics/overview");
  return data;
}

export async function getActivitySeries(range: TimeRange): Promise<TimePoint[]> {
  const data = await apiFetch<TimePoint[]>("/api/analytics/activity?range=" + encodeURIComponent(range));
  return data || [];
}

export async function getRiskDistribution(): Promise<RiskDistributionItem[]> {
  const data = await apiFetch<{
    low?: number;
    medium?: number;
    high?: number;
    critical?: number;
    unscored?: number;
  }>("/api/analytics/risk-distribution");

  return [
    { key: "low", name: "Low", value: data?.low ?? 0, color: "var(--risk-low)" },
    { key: "medium", name: "Medium", value: data?.medium ?? 0, color: "var(--risk-medium)" },
    { key: "high", name: "High", value: data?.high ?? 0, color: "var(--risk-high)" },
    { key: "critical", name: "Critical", value: data?.critical ?? 0, color: "var(--risk-critical)" },
    { key: "unscored", name: "Unscored", value: data?.unscored ?? 0, color: "var(--muted-foreground)" },
  ];
}

export async function getAnalytics() {
  const data = await apiFetch<any>("/api/analytics/summary");

  const amounts = (data.amounts || []).map((a: any) => ({
    band: a.range,
    count: a.total,
    anomalous: a.anomalies,
  }));

  const hours = (data.hours || []).map((h: any) => ({
    hour: h.hour,
    volume: h.total,
    anomalies: h.anomalies,
  }));

  const geo = (data.geo || []).map((g: any) => ({
    country: g.country,
    code: g.code ?? "XX",
    total: g.total,
    anomalies: g.anomalies,
  }));

  const risk = data.risk || { low: 0, medium: 0, high: 0, critical: 0, unscored: 0 };

  const weekly = Array.isArray(data.weekly) ? data.weekly : [];

  return { amounts, hours, geo, risk, weekly };
}



export const COUNTRY_OPTIONS = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "IN", name: "India" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
];

export const LOG_SOURCES = [
  "Ingestion Pipeline",
  "ML Engine",
  "Risk Service",
  "Database",
  "API Gateway",
];