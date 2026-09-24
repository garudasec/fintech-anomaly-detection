import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { S as riskDistributionQuery, m as fmtNumber, s as activityQuery, u as fmtCompact } from "./format-DX37O3UD.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, o as Area, t as AreaChart, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RiskDistributionCard-scC7qQXl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TIME_RANGES = [
	{
		label: "24H",
		value: "24h"
	},
	{
		label: "7D",
		value: "7d"
	},
	{
		label: "30D",
		value: "30d"
	}
];
function ActivityChart() {
	const [range, setRange] = (0, import_react.useState)("24h");
	const { data: points, isLoading } = useQuery(activityQuery(range));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-raised relative overflow-hidden p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-semibold tracking-tight text-foreground sm:text-lg",
						children: "Transaction Velocity & Anomaly Curve"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border-strong bg-surface-raised px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground",
						children: "Live Flow"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Ingestion volume vs. detected anomaly frequency across selected window."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1 rounded-xl border border-border bg-surface p-1 self-start sm:self-auto",
					children: TIME_RANGES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setRange(r.value),
						className: cn("h-7 rounded-lg px-3 text-xs font-mono transition-all duration-200", range === r.value ? "bg-[oklch(0.22_0.038_255)] font-semibold text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"),
						children: r.label
					}, r.value))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-6 border-t border-border/70 pt-4 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-blue shadow-[0_0_8px_var(--color-blue)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Total Ingestion Volume"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-magenta shadow-[0_0_8px_var(--color-magenta)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Flagged Anomalies"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-[290px] w-full",
				children: isLoading || !points ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-full items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: points,
						margin: {
							top: 10,
							right: 10,
							left: -18,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "volGradient",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--color-blue)",
									stopOpacity: .28
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "var(--color-blue)",
									stopOpacity: 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "anomGradient",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--color-magenta)",
									stopOpacity: .4
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "95%",
									stopColor: "var(--color-magenta)",
									stopOpacity: 0
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "oklch(1 0 0 / 6%)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "t",
								stroke: "var(--color-muted-foreground)",
								fontSize: 11,
								fontFamily: "var(--font-mono)",
								tickLine: false,
								axisLine: false,
								dy: 6
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "var(--color-muted-foreground)",
								fontSize: 11,
								fontFamily: "var(--font-mono)",
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => fmtCompact(v),
								dx: -4
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomChartTooltip, {}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "total",
								name: "Total Volume",
								stroke: "var(--color-blue)",
								strokeWidth: 2,
								fillOpacity: 1,
								fill: "url(#volGradient)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "anomalies",
								name: "Anomalies",
								stroke: "var(--color-magenta)",
								strokeWidth: 2,
								fillOpacity: 1,
								fill: "url(#anomGradient)"
							})
						]
					})
				})
			})
		]
	});
}
function CustomChartTooltip({ active, payload, label }) {
	if (!active || !payload || !payload.length) return null;
	const total = payload.find((p) => p.dataKey === "total")?.value ?? 0;
	const anomalies = payload.find((p) => p.dataKey === "anomalies")?.value ?? 0;
	const ratio = total > 0 ? (anomalies / total * 100).toFixed(2) : "0.00";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground",
			children: ["Window · ", label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 space-y-1.5 font-mono",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-blue" }), "Total Volume:"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: fmtNumber(total)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-magenta" }), "Flagged Outliers:"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-magenta",
						children: fmtNumber(anomalies)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-4 border-t border-border pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Anomaly Ratio:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-foreground",
						children: [ratio, "%"]
					})]
				})
			]
		})]
	});
}
function RiskDistributionCard() {
	const { data: distribution, isLoading } = useQuery(riskDistributionQuery);
	const total = distribution?.reduce((acc, item) => acc + item.value, 0) ?? 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-raised p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-semibold tracking-tight text-foreground sm:text-base",
					children: "Risk Classification Ratio"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: "Distribution across analyzed transactions"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs text-muted-foreground",
					children: [fmtNumber(total), " Scored"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex h-3 w-full overflow-hidden rounded-full bg-surface-raised",
				children: isLoading || !distribution ? null : distribution.map((item) => {
					const pct = item.value / total * 100;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							width: `${pct}%`,
							backgroundColor: item.color
						},
						className: "h-full transition-all duration-500 first:rounded-l-full last:rounded-r-full",
						title: `${item.name}: ${item.value} (${pct.toFixed(1)}%)`
					}, item.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-3 gap-2 border-t border-border/70 pt-4",
				children: isLoading || !distribution ? null : distribution.map((item) => {
					const pct = (item.value / total * 100).toFixed(1);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { backgroundColor: item.color }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: item.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-sm font-semibold text-foreground",
								children: [pct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-[0.68rem] text-muted-foreground",
								children: [fmtNumber(item.value), " txns"]
							})
						]
					}, item.key);
				})
			})
		]
	});
}
//#endregion
export { RiskDistributionCard as n, ActivityChart as t };
