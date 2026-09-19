import type {
  Anomaly,
  AnomalySeverity,
  AnomalyStatus,
  Channel,
  DetectionSignal,
  DetectionSignalKind,
  GeoLocation,
  RiskLevel,
  Transaction,
  TransactionStatus,
  UserProfile,
} from "../types";
import { MOCK_NOW, between, mulberry32, pick } from "./seed";

const LOCATIONS: GeoLocation[] = [
  { city: "London", country: "United Kingdom", countryCode: "GB" },
  { city: "New York", country: "United States", countryCode: "US" },
  { city: "Singapore", country: "Singapore", countryCode: "SG" },
  { city: "Frankfurt", country: "Germany", countryCode: "DE" },
  { city: "Mumbai", country: "India", countryCode: "IN" },
  { city: "Dubai", country: "United Arab Emirates", countryCode: "AE" },
  { city: "Toronto", country: "Canada", countryCode: "CA" },
  { city: "Sydney", country: "Australia", countryCode: "AU" },
  { city: "São Paulo", country: "Brazil", countryCode: "BR" },
  { city: "Lagos", country: "Nigeria", countryCode: "NG" },
  { city: "Tokyo", country: "Japan", countryCode: "JP" },
  { city: "Amsterdam", country: "Netherlands", countryCode: "NL" },
];

const MERCHANTS = [
  "Northwind Retail",
  "Aster Travel",
  "Meridian Energy",
  "Kestrel Electronics",
  "Halcyon Foods",
  "Orbit Mobility",
  "Lumen Software",
  "Vantage Holdings",
  "Cobalt Logistics",
  "Peregrine Hotels",
  "Saffron Market",
  "Ridgeway Pharmacy",
];

const CHANNELS: Channel[] = ["card", "card", "card", "transfer", "wire", "mobile", "atm"];

const SIGNAL_LIBRARY: Record<DetectionSignalKind, { label: string; detail: string }> = {
  amount_spike: {
    label: "Unusually high transaction amount",
    detail: "Amount exceeds the account's 30-day mean by a large multiple.",
  },
  unusual_time: {
    label: "Unusual transaction time",
    detail: "Activity falls outside the account's typical hours.",
  },
  location_deviation: {
    label: "Location deviation",
    detail: "Transaction origin differs from the account's usual geography.",
  },
  frequency_burst: {
    label: "Abnormal transaction frequency",
    detail: "Multiple transactions within a short window.",
  },
  new_merchant: {
    label: "First-seen merchant",
    detail: "No prior history between this account and merchant.",
  },
  velocity: {
    label: "Cross-border velocity",
    detail: "Consecutive transactions in geographically distant regions.",
  },
};

export function riskFromScore(score: number): RiskLevel {
  if (score >= 0.9) return "critical";
  if (score >= 0.72) return "high";
  if (score >= 0.45) return "medium";
  return "low";
}

function makeSignals(rng: () => number, score: number): DetectionSignal[] {
  if (score < 0.45) return [];
  const kinds = Object.keys(SIGNAL_LIBRARY) as DetectionSignalKind[];
  const count = score >= 0.85 ? 3 : score >= 0.65 ? 2 : 1;
  const chosen = new Set<DetectionSignalKind>();
  while (chosen.size < count) chosen.add(pick(rng, kinds));
  let remaining = 1;
  return Array.from(chosen).map((kind, i, arr) => {
    const weight =
      i === arr.length - 1 ? remaining : Number((remaining * between(rng, 0.4, 0.7)).toFixed(2));
    remaining = Number((remaining - weight).toFixed(2));
    return { kind, ...SIGNAL_LIBRARY[kind], weight };
  });
}

function pad(n: number, len: number) {
  return String(n).padStart(len, "0");
}

function generateTransactions(count: number): Transaction[] {
  const rng = mulberry32(20260919);
  const list: Transaction[] = [];
  const users = Array.from({ length: 48 }, (_, i) => `USR-${pad(1040 + i * 7, 5)}`);

  for (let i = 0; i < count; i++) {
    // Spread across the last 30 days, denser in the last 24h.
    const recent = rng() < 0.35;
    const ageMs = recent
      ? between(rng, 0, 24 * 3600e3)
      : between(rng, 24 * 3600e3, 30 * 24 * 3600e3);
    const ts = MOCK_NOW - ageMs;

    // Heavy-tailed amount distribution.
    const base = Math.exp(between(rng, 2.5, 7.4));
    const amount = Math.round(base * 100) / 100;

    const r = rng();
    let score: number;
    if (r < 0.74) score = between(rng, 0.03, 0.42);
    else if (r < 0.9) score = between(rng, 0.45, 0.72);
    else if (r < 0.97) score = between(rng, 0.72, 0.9);
    else score = between(rng, 0.9, 0.99);
    score = Number(score.toFixed(2));

    // Analysis state: a slice is pending / unavailable to exercise those UI states.
    const a = rng();
    const analysisState = a < 0.06 ? "pending" : a < 0.085 ? "unavailable" : "analyzed";
    const scored = analysisState === "analyzed";
    const riskLevel = scored ? riskFromScore(score) : null;

    let status: TransactionStatus = "completed";
    if (!scored) status = "pending";
    else if (riskLevel === "critical") status = rng() < 0.5 ? "blocked" : "under_review";
    else if (riskLevel === "high") status = rng() < 0.6 ? "flagged" : "under_review";
    else if (riskLevel === "medium" && rng() < 0.25) status = "flagged";

    list.push({
      transactionId: `TXN-${pad(88210 + i * 3, 6)}`,
      userId: pick(rng, users),
      amount,
      currency: "USD",
      transactionTime: new Date(ts).toISOString(),
      location: pick(rng, LOCATIONS),
      status,
      anomalyScore: scored ? score : null,
      riskLevel,
      analysisState,
      channel: pick(rng, CHANNELS),
      merchant: pick(rng, MERCHANTS),
      signals: scored ? makeSignals(rng, score) : [],
    });
  }

  return list.sort((x, y) => y.transactionTime.localeCompare(x.transactionTime));
}

export const MOCK_TRANSACTIONS: Transaction[] = generateTransactions(260);

function severityFromScore(score: number): AnomalySeverity {
  if (score >= 0.9) return "critical";
  if (score >= 0.72) return "high";
  return "medium";
}

function generateAnomalies(): Anomaly[] {
  const rng = mulberry32(777);
  const analysts = ["M. Okafor", "L. Fernández", "R. Iyer", null, null];
  const statuses: AnomalyStatus[] = ["open", "open", "under_review", "escalated", "resolved"];
  return MOCK_TRANSACTIONS.filter((t) => (t.anomalyScore ?? 0) >= 0.6).map((t, i) => {
    const status = t.status === "blocked" ? "escalated" : pick(rng, statuses);
    return {
      anomalyId: `ANM-${pad(5100 + i, 5)}`,
      transaction: t,
      severity: severityFromScore(t.anomalyScore ?? 0),
      status,
      primarySignal: t.signals[0] ?? {
        kind: "amount_spike",
        ...SIGNAL_LIBRARY.amount_spike,
        weight: 1,
      },
      detectedAt: new Date(new Date(t.transactionTime).getTime() + 2200).toISOString(),
      assignee: status === "open" ? null : pick(rng, analysts),
    };
  });
}

export const MOCK_ANOMALIES: Anomaly[] = generateAnomalies();

export function mockUserProfile(userId: string): UserProfile {
  const seed = Number(userId.replace(/\D/g, "")) || 1;
  const rng = mulberry32(seed);
  const names = [
    "A. Rahman",
    "J. Whitfield",
    "S. Nakamura",
    "P. Oduya",
    "C. Moreau",
    "D. Kowalski",
  ];
  return {
    userId,
    displayName: pick(rng, names),
    accountAge: `${Math.floor(between(rng, 1, 7))} yrs ${Math.floor(between(rng, 0, 11))} mo`,
    homeLocation: pick(rng, LOCATIONS),
    averageAmount: Math.round(between(rng, 80, 1400)),
    typicalWindow: pick(rng, ["08:00–20:00 local", "09:00–18:00 local", "07:00–22:00 local"]),
    transactionsLast30d: Math.floor(between(rng, 14, 96)),
    priorFlags: Math.floor(between(rng, 0, 3)),
  };
}

export { LOCATIONS, SIGNAL_LIBRARY };
