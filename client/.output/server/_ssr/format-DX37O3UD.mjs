import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/format-DX37O3UD.js
/** Deterministic PRNG so server and client render identical mock data. */
function mulberry32(seed) {
	let a = seed >>> 0;
	return function next() {
		a = a + 1831565813 >>> 0;
		let t = a;
		t = Math.imul(t ^ t >>> 15, t | 1);
		t ^= t + Math.imul(t ^ t >>> 7, t | 61);
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
var between = (rng, min, max) => min + rng() * (max - min);
/** Fixed "now" so mock timestamps are stable across renders. */
var MOCK_NOW = (/* @__PURE__ */ new Date("2026-09-19T07:30:00Z")).getTime();
var TEMPLATES = [
	{
		event: "Transaction received",
		source: "ingestion",
		severity: "info",
		description: "Transaction accepted via POST /api/transactions",
		status: "ok",
		weight: 8
	},
	{
		event: "Anomaly analysis completed",
		source: "detection",
		severity: "info",
		description: "Statistical scoring finished for batch",
		status: "ok",
		weight: 5
	},
	{
		event: "API request",
		source: "api-gateway",
		severity: "debug",
		description: "GET /api/transactions?page=1&pageSize=50 · 200 · 38 ms",
		status: "ok",
		weight: 6
	},
	{
		event: "Authentication event",
		source: "auth",
		severity: "info",
		description: "Analyst session refreshed",
		status: "ok",
		weight: 3
	},
	{
		event: "System warning",
		source: "ingestion",
		severity: "warning",
		description: "Queue depth above threshold (1,240 msgs), scaling consumers",
		status: "acknowledged",
		weight: 2
	},
	{
		event: "Detection service event",
		source: "detection",
		severity: "warning",
		description: "Scoring deferred — model endpoint not configured, using rule set",
		status: "retrying",
		weight: 2
	},
	{
		event: "Database write",
		source: "mongodb",
		severity: "debug",
		description: "Bulk upsert transactions (120 docs) · 14 ms",
		status: "ok",
		weight: 4
	},
	{
		event: "Rate limit triggered",
		source: "api-gateway",
		severity: "error",
		description: "Client exceeded 600 req/min, requests rejected with 429",
		status: "failed",
		weight: 1
	}
];
function generateLogs(count) {
	const rng = mulberry32(4242);
	const pool = TEMPLATES.flatMap((t) => Array.from({ length: t.weight }, () => t));
	const logs = [];
	let ts = MOCK_NOW;
	for (let i = 0; i < count; i++) {
		ts -= between(rng, 4e3, 9e4);
		const t = pick(rng, pool);
		logs.push({
			logId: `LOG-${String(91e3 - i).padStart(6, "0")}`,
			timestamp: new Date(ts).toISOString(),
			...t
		});
	}
	return logs;
}
var MOCK_LOGS = generateLogs(90);
var LOCATIONS = [
	{
		city: "London",
		country: "United Kingdom",
		countryCode: "GB"
	},
	{
		city: "New York",
		country: "United States",
		countryCode: "US"
	},
	{
		city: "Singapore",
		country: "Singapore",
		countryCode: "SG"
	},
	{
		city: "Frankfurt",
		country: "Germany",
		countryCode: "DE"
	},
	{
		city: "Mumbai",
		country: "India",
		countryCode: "IN"
	},
	{
		city: "Dubai",
		country: "United Arab Emirates",
		countryCode: "AE"
	},
	{
		city: "Toronto",
		country: "Canada",
		countryCode: "CA"
	},
	{
		city: "Sydney",
		country: "Australia",
		countryCode: "AU"
	},
	{
		city: "São Paulo",
		country: "Brazil",
		countryCode: "BR"
	},
	{
		city: "Lagos",
		country: "Nigeria",
		countryCode: "NG"
	},
	{
		city: "Tokyo",
		country: "Japan",
		countryCode: "JP"
	},
	{
		city: "Amsterdam",
		country: "Netherlands",
		countryCode: "NL"
	}
];
var MERCHANTS = [
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
	"Ridgeway Pharmacy"
];
var CHANNELS = [
	"card",
	"card",
	"card",
	"transfer",
	"wire",
	"mobile",
	"atm"
];
var SIGNAL_LIBRARY = {
	amount_spike: {
		label: "Unusually high transaction amount",
		detail: "Amount exceeds the account's 30-day mean by a large multiple."
	},
	unusual_time: {
		label: "Unusual transaction time",
		detail: "Activity falls outside the account's typical hours."
	},
	location_deviation: {
		label: "Location deviation",
		detail: "Transaction origin differs from the account's usual geography."
	},
	frequency_burst: {
		label: "Abnormal transaction frequency",
		detail: "Multiple transactions within a short window."
	},
	new_merchant: {
		label: "First-seen merchant",
		detail: "No prior history between this account and merchant."
	},
	velocity: {
		label: "Cross-border velocity",
		detail: "Consecutive transactions in geographically distant regions."
	}
};
function riskFromScore(score) {
	if (score >= .9) return "critical";
	if (score >= .72) return "high";
	if (score >= .45) return "medium";
	return "low";
}
function makeSignals(rng, score) {
	if (score < .45) return [];
	const kinds = Object.keys(SIGNAL_LIBRARY);
	const count = score >= .85 ? 3 : score >= .65 ? 2 : 1;
	const chosen = /* @__PURE__ */ new Set();
	while (chosen.size < count) chosen.add(pick(rng, kinds));
	let remaining = 1;
	return Array.from(chosen).map((kind, i, arr) => {
		const weight = i === arr.length - 1 ? remaining : Number((remaining * between(rng, .4, .7)).toFixed(2));
		remaining = Number((remaining - weight).toFixed(2));
		return {
			kind,
			...SIGNAL_LIBRARY[kind],
			weight
		};
	});
}
function pad(n, len) {
	return String(n).padStart(len, "0");
}
function generateTransactions(count) {
	const rng = mulberry32(20260919);
	const list = [];
	const users = Array.from({ length: 48 }, (_, i) => `USR-${pad(1040 + i * 7, 5)}`);
	for (let i = 0; i < count; i++) {
		const ts = MOCK_NOW - (rng() < .35 ? between(rng, 0, 864e5) : between(rng, 864e5, 2592e6));
		const base = Math.exp(between(rng, 2.5, 7.4));
		const amount = Math.round(base * 100) / 100;
		const r = rng();
		let score;
		if (r < .74) score = between(rng, .03, .42);
		else if (r < .9) score = between(rng, .45, .72);
		else if (r < .97) score = between(rng, .72, .9);
		else score = between(rng, .9, .99);
		score = Number(score.toFixed(2));
		const a = rng();
		const analysisState = a < .06 ? "pending" : a < .085 ? "unavailable" : "analyzed";
		const scored = analysisState === "analyzed";
		const riskLevel = scored ? riskFromScore(score) : null;
		let status = "completed";
		if (!scored) status = "pending";
		else if (riskLevel === "critical") status = rng() < .5 ? "blocked" : "under_review";
		else if (riskLevel === "high") status = rng() < .6 ? "flagged" : "under_review";
		else if (riskLevel === "medium" && rng() < .25) status = "flagged";
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
			signals: scored ? makeSignals(rng, score) : []
		});
	}
	return list.sort((x, y) => y.transactionTime.localeCompare(x.transactionTime));
}
var MOCK_TRANSACTIONS = generateTransactions(260);
function severityFromScore(score) {
	if (score >= .9) return "critical";
	if (score >= .72) return "high";
	return "medium";
}
function generateAnomalies() {
	const rng = mulberry32(777);
	const analysts = [
		"M. Okafor",
		"L. Fernández",
		"R. Iyer",
		null,
		null
	];
	const statuses = [
		"open",
		"open",
		"under_review",
		"escalated",
		"resolved"
	];
	return MOCK_TRANSACTIONS.filter((t) => (t.anomalyScore ?? 0) >= .6).map((t, i) => {
		const status = t.status === "blocked" ? "escalated" : pick(rng, statuses);
		return {
			anomalyId: `ANM-${pad(5100 + i, 5)}`,
			transaction: t,
			severity: severityFromScore(t.anomalyScore ?? 0),
			status,
			primarySignal: t.signals[0] ?? {
				kind: "amount_spike",
				...SIGNAL_LIBRARY.amount_spike,
				weight: 1
			},
			detectedAt: new Date(new Date(t.transactionTime).getTime() + 2200).toISOString(),
			assignee: status === "open" ? null : pick(rng, analysts)
		};
	});
}
var MOCK_ANOMALIES = generateAnomalies();
function mockUserProfile(userId) {
	const rng = mulberry32(Number(userId.replace(/\D/g, "")) || 1);
	return {
		userId,
		displayName: pick(rng, [
			"A. Rahman",
			"J. Whitfield",
			"S. Nakamura",
			"P. Oduya",
			"C. Moreau",
			"D. Kowalski"
		]),
		accountAge: `${Math.floor(between(rng, 1, 7))} yrs ${Math.floor(between(rng, 0, 11))} mo`,
		homeLocation: pick(rng, LOCATIONS),
		averageAmount: Math.round(between(rng, 80, 1400)),
		typicalWindow: pick(rng, [
			"08:00–20:00 local",
			"09:00–18:00 local",
			"07:00–22:00 local"
		]),
		transactionsLast30d: Math.floor(between(rng, 14, 96)),
		priorFlags: Math.floor(between(rng, 0, 3))
	};
}
/** Activity series: smooth synthetic curve so charts read well at every range. */
function activitySeries(range) {
	const rng = mulberry32(range === "24h" ? 11 : range === "7d" ? 12 : 13);
	const buckets = range === "24h" ? 24 : range === "7d" ? 28 : 30;
	const step = range === "24h" ? 36e5 : range === "7d" ? 216e5 : 864e5;
	const base = range === "24h" ? 420 : range === "7d" ? 2400 : 9800;
	const points = [];
	for (let i = 0; i < buckets; i++) {
		const ts = MOCK_NOW - (buckets - 1 - i) * step;
		const d = new Date(ts);
		const hour = d.getUTCHours();
		const diurnal = range === "24h" ? .55 + .45 * Math.sin((hour - 6) / 24 * Math.PI * 2) : 1;
		const wave = 1 + .18 * Math.sin(i / 3.1) + .08 * Math.cos(i / 1.7);
		const noise = .92 + rng() * .16;
		const total = Math.round(base * diurnal * wave * noise);
		const anomalyRate = .018 + .012 * Math.max(0, Math.sin(i / 2.3 + 1)) + rng() * .006;
		const anomalies = Math.round(total * anomalyRate);
		const label = range === "24h" ? `${String(hour).padStart(2, "0")}:00` : range === "7d" ? d.toLocaleDateString("en-US", {
			weekday: "short",
			timeZone: "UTC"
		}) + ` ${String(hour).padStart(2, "0")}h` : d.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			timeZone: "UTC"
		});
		points.push({
			t: label,
			ts,
			total,
			anomalies
		});
	}
	return points;
}
function riskDistribution() {
	const scored = MOCK_TRANSACTIONS.filter((t) => t.riskLevel);
	const count = (lvl) => scored.filter((t) => t.riskLevel === lvl).length;
	return [
		{
			name: "Normal",
			key: "normal",
			value: count("low"),
			color: "var(--blue)"
		},
		{
			name: "Suspicious",
			key: "suspicious",
			value: count("medium"),
			color: "var(--amber)"
		},
		{
			name: "High risk",
			key: "high",
			value: count("high") + count("critical"),
			color: "var(--risk-high)"
		}
	];
}
function amountDistribution() {
	return [
		{
			label: "< $50",
			min: 0,
			max: 50
		},
		{
			label: "$50–200",
			min: 50,
			max: 200
		},
		{
			label: "$200–1k",
			min: 200,
			max: 1e3
		},
		{
			label: "$1k–5k",
			min: 1e3,
			max: 5e3
		},
		{
			label: "$5k–20k",
			min: 5e3,
			max: 2e4
		},
		{
			label: "> $20k",
			min: 2e4,
			max: Infinity
		}
	].map((b) => {
		const inBand = MOCK_TRANSACTIONS.filter((t) => t.amount >= b.min && t.amount < b.max);
		return {
			band: b.label,
			count: inBand.length,
			anomalous: inBand.filter((t) => (t.anomalyScore ?? 0) >= .6).length
		};
	});
}
function hourOfDayActivity() {
	const rng = mulberry32(99);
	return Array.from({ length: 24 }, (_, h) => {
		const diurnal = .35 + .65 * Math.max(0, Math.sin((h - 5) / 24 * Math.PI * 2));
		const volume = Math.round(180 * diurnal + rng() * 30);
		const anomalies = Math.round(volume * (.02 * (h < 6 || h > 22 ? 2.4 : 1) + rng() * .008));
		return {
			hour: `${String(h).padStart(2, "0")}`,
			volume,
			anomalies
		};
	});
}
function geographicActivity() {
	const map = /* @__PURE__ */ new Map();
	for (const t of MOCK_TRANSACTIONS) {
		const k = t.location.countryCode;
		const e = map.get(k) ?? {
			country: t.location.country,
			code: k,
			total: 0,
			anomalies: 0
		};
		e.total++;
		if ((t.anomalyScore ?? 0) >= .6) e.anomalies++;
		map.set(k, e);
	}
	return Array.from(map.values()).sort((a, b) => b.total - a.total);
}
function weeklyAnomalyRatio() {
	const rng = mulberry32(5);
	return Array.from({ length: 12 }, (_, i) => {
		const d = /* @__PURE__ */ new Date(MOCK_NOW - (11 - i) * 7 * 24 * 36e5);
		const total = 58e3 + Math.round(rng() * 9e3) + i * 600;
		const ratio = .021 + .007 * Math.sin(i / 1.8) + rng() * .003;
		return {
			week: d.toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				timeZone: "UTC"
			}),
			total,
			ratio: Number((ratio * 100).toFixed(2))
		};
	});
}
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
/** Small artificial latency so loading states are visible and realistic. */
var simulate = (value, ms = 320) => new Promise((resolve) => setTimeout(() => resolve(value), ms));
var RISK_ORDER = {
	low: 0,
	medium: 1,
	high: 2,
	critical: 3
};
async function getTransactions(q = {}) {
	const { search = "", status = "all", riskLevel = "all", country = "all", minAmount, maxAmount, from, to, sortBy = "transactionTime", sortDir = "desc", page = 1, pageSize = 12 } = q;
	const s = search.trim().toLowerCase();
	let rows = MOCK_TRANSACTIONS.filter((t) => {
		if (s && !`${t.transactionId} ${t.userId} ${t.merchant} ${t.location.city}`.toLowerCase().includes(s)) return false;
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
	return simulate({
		items: rows.slice((safePage - 1) * pageSize, safePage * pageSize),
		total,
		page: safePage,
		pageSize,
		pageCount
	});
}
async function getTransaction(id) {
	return simulate(MOCK_TRANSACTIONS.find((t) => t.transactionId === id) ?? null, 200);
}
async function getRelatedTransactions(tx, limit = 6) {
	return simulate(MOCK_TRANSACTIONS.filter((t) => t.userId === tx.userId && t.transactionId !== tx.transactionId).slice(0, limit), 260);
}
async function getUserProfile(userId) {
	return simulate(mockUserProfile(userId), 200);
}
async function getAnomalies(q = {}) {
	const { severity = "all", status = "all", search = "" } = q;
	const s = search.trim().toLowerCase();
	const order = {
		escalated: 0,
		open: 1,
		under_review: 2,
		resolved: 3
	};
	const sev = {
		critical: 0,
		high: 1,
		medium: 2
	};
	return simulate(MOCK_ANOMALIES.filter((a) => {
		if (severity !== "all" && a.severity !== severity) return false;
		if (status !== "all" && a.status !== status) return false;
		if (s && !`${a.anomalyId} ${a.transaction.transactionId} ${a.transaction.userId}`.toLowerCase().includes(s)) return false;
		return true;
	}).sort((a, b) => order[a.status] - order[b.status] || sev[a.severity] - sev[b.severity]));
}
async function getRecentAnomalies(limit = 6) {
	return simulate([...MOCK_ANOMALIES].filter((a) => a.status !== "resolved").sort((a, b) => (b.transaction.anomalyScore ?? 0) - (a.transaction.anomalyScore ?? 0)).slice(0, limit), 380);
}
async function getOverviewMetrics() {
	const scored = MOCK_TRANSACTIONS.filter((t) => t.riskLevel);
	const anomalies = MOCK_ANOMALIES.length;
	const highRisk = scored.filter((t) => RISK_ORDER[t.riskLevel] >= 2).length;
	const factor = 184;
	return simulate({
		totalTransactions: MOCK_TRANSACTIONS.length * factor,
		normalTransactions: (MOCK_TRANSACTIONS.length - anomalies) * factor,
		anomaliesDetected: anomalies * factor,
		highRisk: highRisk * factor,
		deltas: {
			totalTransactions: .042,
			normalTransactions: .038,
			anomaliesDetected: -.061,
			highRisk: .012
		},
		systemStatus: {
			ingestion: "operational",
			detection: "not_connected",
			lastEventAt: (/* @__PURE__ */ new Date(MOCK_NOW - 14e3)).toISOString()
		}
	}, 280);
}
async function getActivitySeries(range) {
	return simulate(activitySeries(range), 340);
}
async function getRiskDistribution() {
	return simulate(riskDistribution(), 300);
}
async function getAnalytics() {
	return simulate({
		amounts: amountDistribution(),
		hours: hourOfDayActivity(),
		geo: geographicActivity(),
		weekly: weeklyAnomalyRatio(),
		risk: riskDistribution()
	}, 360);
}
async function getLogs(q = {}) {
	const { severity = "all", source = "all", search = "" } = q;
	const s = search.trim().toLowerCase();
	return simulate(MOCK_LOGS.filter((l) => {
		if (severity !== "all" && l.severity !== severity) return false;
		if (source !== "all" && l.source !== source) return false;
		if (s && !`${l.event} ${l.description} ${l.source}`.toLowerCase().includes(s)) return false;
		return true;
	}), 260);
}
var COUNTRY_OPTIONS = Array.from(new Map(MOCK_TRANSACTIONS.map((t) => [t.location.countryCode, t.location.country])).entries()).map(([code, name]) => ({
	code,
	name
})).sort((a, b) => a.name.localeCompare(b.name));
var LOG_SOURCES = Array.from(new Set(MOCK_LOGS.map((l) => l.source))).sort();
/**
* TanStack Query hooks. Components consume these; they never import mock data
* or the repository directly, so swapping the repository for REST calls is
* invisible to the UI.
*/
var transactionsQuery = (q) => queryOptions({
	queryKey: ["transactions", q],
	queryFn: () => getTransactions(q)
});
var transactionQuery = (id) => queryOptions({
	queryKey: ["transaction", id],
	queryFn: () => getTransaction(id),
	enabled: !!id
});
var relatedTransactionsQuery = (tx) => queryOptions({
	queryKey: ["related", tx?.transactionId],
	queryFn: () => getRelatedTransactions(tx),
	enabled: !!tx
});
var userProfileQuery = (userId) => queryOptions({
	queryKey: ["user", userId],
	queryFn: () => getUserProfile(userId),
	enabled: !!userId
});
var anomaliesQuery = (q) => queryOptions({
	queryKey: ["anomalies", q],
	queryFn: () => getAnomalies(q)
});
var recentAnomaliesQuery = queryOptions({
	queryKey: ["anomalies", "recent"],
	queryFn: () => getRecentAnomalies(6)
});
var overviewMetricsQuery = queryOptions({
	queryKey: ["overview", "metrics"],
	queryFn: getOverviewMetrics
});
var activityQuery = (range) => queryOptions({
	queryKey: ["activity", range],
	queryFn: () => getActivitySeries(range)
});
var riskDistributionQuery = queryOptions({
	queryKey: ["risk-distribution"],
	queryFn: getRiskDistribution
});
var analyticsQuery = queryOptions({
	queryKey: ["analytics"],
	queryFn: getAnalytics
});
var logsQuery = (q) => queryOptions({
	queryKey: ["logs", q],
	queryFn: () => getLogs(q)
});
var usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2
});
new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	notation: "compact",
	maximumFractionDigits: 1
});
var num = new Intl.NumberFormat("en-US");
var compact = new Intl.NumberFormat("en-US", {
	notation: "compact",
	maximumFractionDigits: 1
});
var fmtMoney = (n) => usd.format(n);
var fmtNumber = (n) => num.format(n);
var fmtCompact = (n) => compact.format(n);
var fmtPct = (frac, digits = 1) => `${frac > 0 ? "+" : ""}${(frac * 100).toFixed(digits)}%`;
var fmtScore = (score) => score == null ? "—" : score.toFixed(2);
function fmtDateTime(iso) {
	return new Date(iso).toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "UTC"
	});
}
function fmtDate(iso) {
	return new Date(iso).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		timeZone: "UTC"
	});
}
function fmtRelative(iso, now = Date.now()) {
	const diff = Math.max(0, now - new Date(iso).getTime());
	const m = Math.floor(diff / 6e4);
	if (m < 1) return "just now";
	if (m < 60) return `${m}m ago`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h}h ago`;
	return `${Math.floor(h / 24)}d ago`;
}
var RISK_LABEL = {
	low: "Low",
	medium: "Medium",
	high: "High",
	critical: "Critical"
};
var STATUS_LABEL = {
	completed: "Completed",
	pending: "Pending",
	flagged: "Flagged",
	under_review: "Under review",
	blocked: "Blocked"
};
var ANOMALY_STATUS_LABEL = {
	open: "Open",
	under_review: "Under review",
	escalated: "Escalated",
	resolved: "Resolved"
};
var LOG_SEVERITY_LABEL = {
	info: "Info",
	warning: "Warning",
	error: "Error",
	debug: "Debug"
};
//#endregion
export { transactionQuery as C, riskDistributionQuery as S, userProfileQuery as T, fmtScore as _, RISK_LABEL as a, recentAnomaliesQuery as b, analyticsQuery as c, fmtDate as d, fmtDateTime as f, fmtRelative as g, fmtPct as h, LOG_SOURCES as i, anomaliesQuery as l, fmtNumber as m, COUNTRY_OPTIONS as n, STATUS_LABEL as o, fmtMoney as p, LOG_SEVERITY_LABEL as r, activityQuery as s, ANOMALY_STATUS_LABEL as t, fmtCompact as u, logsQuery as v, transactionsQuery as w, relatedTransactionsQuery as x, overviewMetricsQuery as y };
