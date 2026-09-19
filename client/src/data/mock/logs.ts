import type { LogSeverity, LogStatus, SystemLog } from "../types";
import { MOCK_NOW, between, mulberry32, pick } from "./seed";

interface Template {
  event: string;
  source: string;
  severity: LogSeverity;
  description: string;
  status: LogStatus;
  weight: number;
}

const TEMPLATES: Template[] = [
  {
    event: "Transaction received",
    source: "ingestion",
    severity: "info",
    description: "Transaction accepted via POST /api/transactions",
    status: "ok",
    weight: 8,
  },
  {
    event: "Anomaly analysis completed",
    source: "detection",
    severity: "info",
    description: "Statistical scoring finished for batch",
    status: "ok",
    weight: 5,
  },
  {
    event: "API request",
    source: "api-gateway",
    severity: "debug",
    description: "GET /api/transactions?page=1&pageSize=50 · 200 · 38 ms",
    status: "ok",
    weight: 6,
  },
  {
    event: "Authentication event",
    source: "auth",
    severity: "info",
    description: "Analyst session refreshed",
    status: "ok",
    weight: 3,
  },
  {
    event: "System warning",
    source: "ingestion",
    severity: "warning",
    description: "Queue depth above threshold (1,240 msgs), scaling consumers",
    status: "acknowledged",
    weight: 2,
  },
  {
    event: "Detection service event",
    source: "detection",
    severity: "warning",
    description: "Scoring deferred — model endpoint not configured, using rule set",
    status: "retrying",
    weight: 2,
  },
  {
    event: "Database write",
    source: "mongodb",
    severity: "debug",
    description: "Bulk upsert transactions (120 docs) · 14 ms",
    status: "ok",
    weight: 4,
  },
  {
    event: "Rate limit triggered",
    source: "api-gateway",
    severity: "error",
    description: "Client exceeded 600 req/min, requests rejected with 429",
    status: "failed",
    weight: 1,
  },
];

function generateLogs(count: number): SystemLog[] {
  const rng = mulberry32(4242);
  const pool = TEMPLATES.flatMap((t) => Array.from({ length: t.weight }, () => t));
  const logs: SystemLog[] = [];
  let ts = MOCK_NOW;
  for (let i = 0; i < count; i++) {
    ts -= between(rng, 4e3, 90e3);
    const t = pick(rng, pool);
    logs.push({
      logId: `LOG-${String(91000 - i).padStart(6, "0")}`,
      timestamp: new Date(ts).toISOString(),
      ...t,
    });
  }
  return logs;
}

export const MOCK_LOGS: SystemLog[] = generateLogs(90);
