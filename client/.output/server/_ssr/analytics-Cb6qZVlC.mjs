import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { G as ChartColumn, L as Clock, O as Globe, s as TrendingUp } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as analyticsQuery, m as fmtNumber, u as fmtCompact } from "./format-DX37O3UD.mjs";
import { a as XAxis, c as CartesianGrid, d as Tooltip, i as YAxis, l as Bar, n as BarChart, r as LineChart, s as Line, u as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
import { n as RiskDistributionCard, t as ActivityChart } from "./RiskDistributionCard-scC7qQXl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-Cb6qZVlC.js
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const { data: analytics, isLoading } = useQuery(analyticsQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
					children: "Statistical & Behavioral Analytics"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[0.68rem] text-primary-glow font-medium",
					children: "Aggregated Insights"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground sm:text-sm",
				children: "Diurnal velocity analysis, amount distributions, geographic concentrations, and historical anomaly moving averages."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityChart, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskDistributionCard, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-raised p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-8 place-items-center rounded-lg border border-border bg-surface-raised text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-blue" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold tracking-tight text-foreground",
									children: "24-Hour Diurnal Volume & Night Spike Profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Hourly transaction volume vs. nocturnal anomaly clustering"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: "UTC Hours"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-6 border-t border-border/70 pt-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded bg-blue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Total Ingestion Volume"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded bg-magenta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Anomalies Detected"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-[250px] w-full",
							children: isLoading || !analytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-full items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: analytics.hours,
									margin: {
										top: 10,
										right: 10,
										left: -18,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "oklch(1 0 0 / 6%)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "hour",
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											fontFamily: "var(--font-mono)",
											tickLine: false,
											axisLine: false,
											tickFormatter: (h) => `${h}:00`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											fontFamily: "var(--font-mono)",
											tickLine: false,
											axisLine: false,
											tickFormatter: (v) => fmtCompact(v)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HourTooltip, {}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "volume",
											name: "Total Volume",
											fill: "var(--color-blue)",
											opacity: .65,
											radius: [
												3,
												3,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "anomalies",
											name: "Anomalies",
											fill: "var(--color-magenta)",
											radius: [
												3,
												3,
												0,
												0
											]
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-raised p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid size-8 place-items-center rounded-lg border border-border bg-surface-raised text-amber",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4 text-amber" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold tracking-tight text-foreground",
									children: "Transaction Amount Distribution"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Volume breakdown across financial band sizes"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: "USD Bands"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-6 border-t border-border/70 pt-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded bg-blue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Normal Transactions"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded bg-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "High Risk / Anomalous"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-[250px] w-full",
							children: isLoading || !analytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-full items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: analytics.amounts,
									margin: {
										top: 10,
										right: 10,
										left: -18,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											stroke: "oklch(1 0 0 / 6%)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "band",
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											fontFamily: "var(--font-mono)",
											tickLine: false,
											axisLine: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											stroke: "var(--color-muted-foreground)",
											fontSize: 11,
											fontFamily: "var(--font-mono)",
											tickLine: false,
											axisLine: false,
											tickFormatter: (v) => fmtCompact(v)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountTooltip, {}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "count",
											name: "Total Count",
											fill: "var(--color-blue)",
											opacity: .6,
											radius: [
												3,
												3,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "anomalous",
											name: "Anomalous",
											fill: "var(--color-amber)",
											radius: [
												3,
												3,
												0,
												0
											]
										})
									]
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-raised p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 place-items-center rounded-lg border border-border bg-surface-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4 text-lime" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold tracking-tight text-foreground",
								children: "Geographic Origin Breakdown"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Country-level volume and anomaly density ranking"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: [analytics?.geo.length ?? 0, " Jurisdictions"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 divide-y divide-border/40 font-mono text-xs",
						children: isLoading || !analytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-muted-foreground",
							children: "Loading geographic data..."
						}) : analytics.geo.map((g) => {
							const anomalyPct = g.total > 0 ? (g.anomalies / g.total * 100).toFixed(1) : "0.0";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between py-2.5 first:pt-0 last:pb-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-6 place-items-center rounded bg-surface-raised font-mono text-[0.68rem] font-bold text-foreground border border-border",
										children: g.code
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-sans text-sm font-medium text-foreground",
										children: g.country
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[0.68rem] text-muted-foreground",
										children: [fmtNumber(g.total), " transactions total"]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-end gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground",
											children: g.anomalies
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.68rem] text-muted-foreground",
											children: "anomalies"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-1.5 w-16 overflow-hidden rounded-full bg-surface-raised",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-magenta rounded-full",
												style: { width: `${Math.min(100, Number(anomalyPct) * 5)}%` }
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[0.68rem] text-magenta font-semibold",
											children: [anomalyPct, "%"]
										})]
									})]
								})]
							}, g.code);
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-raised p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid size-8 place-items-center rounded-lg border border-border bg-surface-raised",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-4 text-magenta" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-semibold tracking-tight text-foreground",
								children: "12-Week Anomaly Trend Line"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Moving average percentage of anomalous activity over 12 weeks"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-magenta",
							children: "Moving Average"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-[280px] w-full",
						children: isLoading || !analytics ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-full items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: analytics.weekly,
								margin: {
									top: 10,
									right: 10,
									left: -18,
									bottom: 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "oklch(1 0 0 / 6%)",
										vertical: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "week",
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										fontFamily: "var(--font-mono)",
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "var(--color-muted-foreground)",
										fontSize: 11,
										fontFamily: "var(--font-mono)",
										tickLine: false,
										axisLine: false,
										unit: "%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeeklyTooltip, {}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "ratio",
										name: "Anomaly Rate (%)",
										stroke: "var(--color-magenta)",
										strokeWidth: 2.5,
										dot: {
											fill: "var(--color-magenta)",
											r: 4
										},
										activeDot: {
											r: 6,
											stroke: "var(--color-foreground)",
											strokeWidth: 2
										}
									})
								]
							})
						})
					})]
				})]
			})
		]
	});
}
function HourTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const volume = payload.find((p) => p.dataKey === "volume")?.value ?? 0;
	const anomalies = payload.find((p) => p.dataKey === "anomalies")?.value ?? 0;
	const rate = volume > 0 ? (anomalies / volume * 100).toFixed(1) : "0.0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl font-mono",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[0.7rem] uppercase tracking-wider text-muted-foreground",
			children: [
				"Hour UTC · ",
				label,
				":00"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 space-y-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Volume:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: fmtNumber(volume)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Anomalies:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-magenta",
						children: fmtNumber(anomalies)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between gap-4 border-t border-border pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Rate:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-semibold text-foreground",
						children: [rate, "%"]
					})]
				})
			]
		})]
	});
}
function AmountTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const count = payload.find((p) => p.dataKey === "count")?.value ?? 0;
	const anomalous = payload.find((p) => p.dataKey === "anomalous")?.value ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl font-mono",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[0.7rem] uppercase tracking-wider text-muted-foreground",
			children: ["Band · ", label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 space-y-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "Total Txns:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-foreground",
					children: fmtNumber(count)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "High Risk:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold text-amber",
					children: fmtNumber(anomalous)
				})]
			})]
		})]
	});
}
function WeeklyTooltip({ active, payload, label }) {
	if (!active || !payload?.length) return null;
	const ratio = payload.find((p) => p.dataKey === "ratio")?.value ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl border border-border-strong p-3 text-xs shadow-2xl backdrop-blur-xl font-mono",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[0.7rem] uppercase tracking-wider text-muted-foreground",
			children: ["Week of ", label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "Anomaly Ratio:"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-semibold text-magenta",
				children: [ratio, "%"]
			})]
		})]
	});
}
//#endregion
export { AnalyticsPage as component };
