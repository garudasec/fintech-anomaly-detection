import type { TimePoint, TimeRange } from "../types";
import { MOCK_NOW, mulberry32 } from "./seed";
import { MOCK_TRANSACTIONS } from "./transactions";

/** Activity series: smooth synthetic curve so charts read well at every range. */
export function activitySeries(range: TimeRange): TimePoint[] {
  const rng = mulberry32(range === "24h" ? 11 : range === "7d" ? 12 : 13);
  const buckets = range === "24h" ? 24 : range === "7d" ? 28 : 30;
  const step = range === "24h" ? 3600e3 : range === "7d" ? 6 * 3600e3 : 24 * 3600e3;
  const base = range === "24h" ? 420 : range === "7d" ? 2400 : 9800;

  const points: TimePoint[] = [];
  for (let i = 0; i < buckets; i++) {
    const ts = MOCK_NOW - (buckets - 1 - i) * step;
    const d = new Date(ts);
    const hour = d.getUTCHours();
    const diurnal = range === "24h" ? 0.55 + 0.45 * Math.sin(((hour - 6) / 24) * Math.PI * 2) : 1;
    const wave = 1 + 0.18 * Math.sin(i / 3.1) + 0.08 * Math.cos(i / 1.7);
    const noise = 0.92 + rng() * 0.16;
    const total = Math.round(base * diurnal * wave * noise);
    const anomalyRate = 0.018 + 0.012 * Math.max(0, Math.sin(i / 2.3 + 1)) + rng() * 0.006;
    const anomalies = Math.round(total * anomalyRate);
    const label =
      range === "24h"
        ? `${String(hour).padStart(2, "0")}:00`
        : range === "7d"
          ? d.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }) +
            ` ${String(hour).padStart(2, "0")}h`
          : d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
    points.push({ t: label, ts, total, anomalies });
  }
  return points;
}

export function riskDistribution() {
  const scored = MOCK_TRANSACTIONS.filter((t) => t.riskLevel);
  const count = (lvl: string) => scored.filter((t) => t.riskLevel === lvl).length;
  return [
    { name: "Normal", key: "normal", value: count("low"), color: "var(--blue)" },
    { name: "Suspicious", key: "suspicious", value: count("medium"), color: "var(--amber)" },
    {
      name: "High risk",
      key: "high",
      value: count("high") + count("critical"),
      color: "var(--risk-high)",
    },
  ];
}

export function amountDistribution() {
  const bands = [
    { label: "< $50", min: 0, max: 50 },
    { label: "$50–200", min: 50, max: 200 },
    { label: "$200–1k", min: 200, max: 1000 },
    { label: "$1k–5k", min: 1000, max: 5000 },
    { label: "$5k–20k", min: 5000, max: 20000 },
    { label: "> $20k", min: 20000, max: Infinity },
  ];
  return bands.map((b) => {
    const inBand = MOCK_TRANSACTIONS.filter((t) => t.amount >= b.min && t.amount < b.max);
    return {
      band: b.label,
      count: inBand.length,
      anomalous: inBand.filter((t) => (t.anomalyScore ?? 0) >= 0.6).length,
    };
  });
}

export function hourOfDayActivity() {
  const rng = mulberry32(99);
  return Array.from({ length: 24 }, (_, h) => {
    const diurnal = 0.35 + 0.65 * Math.max(0, Math.sin(((h - 5) / 24) * Math.PI * 2));
    const volume = Math.round(180 * diurnal + rng() * 30);
    // Anomaly ratio is higher at night — the storytelling point for this chart.
    const night = h < 6 || h > 22 ? 2.4 : 1;
    const anomalies = Math.round(volume * (0.02 * night + rng() * 0.008));
    return { hour: `${String(h).padStart(2, "0")}`, volume, anomalies };
  });
}

export function geographicActivity() {
  const map = new Map<
    string,
    { country: string; code: string; total: number; anomalies: number }
  >();
  for (const t of MOCK_TRANSACTIONS) {
    const k = t.location.countryCode;
    const e = map.get(k) ?? { country: t.location.country, code: k, total: 0, anomalies: 0 };
    e.total++;
    if ((t.anomalyScore ?? 0) >= 0.6) e.anomalies++;
    map.set(k, e);
  }
  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}

export function weeklyAnomalyRatio() {
  const rng = mulberry32(5);
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date(MOCK_NOW - (11 - i) * 7 * 24 * 3600e3);
    const total = 58000 + Math.round(rng() * 9000) + i * 600;
    const ratio = 0.021 + 0.007 * Math.sin(i / 1.8) + rng() * 0.003;
    return {
      week: d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
      total,
      ratio: Number((ratio * 100).toFixed(2)),
    };
  });
}
