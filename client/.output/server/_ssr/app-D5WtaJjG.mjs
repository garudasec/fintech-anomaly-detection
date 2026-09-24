import { i as __toESM } from "../_runtime.mjs";
import { i as performance_default } from "../_libs/h3-v2+rou3+srvx+unenv.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn } from "./button-BZefOWLM.mjs";
import { $ as Activity, D as Info, J as ArrowUpRight, M as Database, P as Cpu, Q as ArrowDownRight, S as Network, _ as Server, h as ShieldAlert, k as Flame, m as ShieldCheck, o as TriangleAlert, p as Shield, u as Sparkles, w as MapPin } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as fmtScore, b as recentAnomaliesQuery, g as fmtRelative, h as fmtPct, m as fmtNumber, p as fmtMoney, y as overviewMetricsQuery } from "./format-DX37O3UD.mjs";
import { n as RiskDistributionCard, t as ActivityChart } from "./RiskDistributionCard-scC7qQXl.mjs";
import { t as Badge } from "./badge-C4HZJ2f5.mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-BKptnkhZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-D5WtaJjG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useReducedMotion() {
	const [reduced, setReduced] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(mql.matches);
		update();
		mql.addEventListener("change", update);
		return () => mql.removeEventListener("change", update);
	}, []);
	return reduced;
}
/** Eases a number from 0 (or the previous value) to `target`. Respects reduced motion. */
function useCountUp(target, duration = 1100) {
	const reduced = useReducedMotion();
	const [value, setValue] = (0, import_react.useState)(0);
	const fromRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		if (reduced) {
			setValue(target);
			return;
		}
		const from = fromRef.current;
		const start = performance_default.now();
		let raf = 0;
		const tick = (now) => {
			const p = Math.min(1, (now - start) / duration);
			const eased = 1 - Math.pow(1 - p, 4);
			setValue(Math.round(from + (target - from) * eased));
			if (p < 1) raf = requestAnimationFrame(tick);
			else fromRef.current = target;
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [
		target,
		duration,
		reduced
	]);
	return value;
}
function MetricCardItem({ label, value, delta, deltaLabel = "vs prior 30d", icon: Icon, glowColor, tooltipText }) {
	const animatedValue = useCountUp(value);
	const isPositive = delta >= 0;
	const glowStyles = {
		cyan: {
			aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.7 0.14 240 / 22%), transparent 60%)",
			iconBg: "bg-blue/10 text-blue border-blue/20",
			accent: "text-blue"
		},
		lime: {
			aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.86 0.18 135 / 20%), transparent 60%)",
			iconBg: "bg-lime/10 text-lime border-lime/20",
			accent: "text-lime"
		},
		magenta: {
			aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.72 0.22 335 / 24%), transparent 60%)",
			iconBg: "bg-magenta/10 text-magenta border-magenta/25",
			accent: "text-magenta"
		},
		amber: {
			aurora: "radial-gradient(ellipse at 95% 10%, oklch(0.7 0.2 35 / 24%), transparent 60%)",
			iconBg: "bg-destructive/15 text-[oklch(0.75_0.19_35)] border-destructive/30",
			accent: "text-[oklch(0.75_0.19_35)]"
		}
	}[glowColor];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel-raised relative overflow-hidden p-5 sm:p-6 transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5",
		style: { backgroundImage: glowStyles.aurora },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid size-10 place-items-center rounded-xl border backdrop-blur-md transition-transform duration-300 group-hover:scale-105", glowStyles.iconBg),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
					delayDuration: 200,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-muted-foreground/60 transition-colors hover:text-muted-foreground focus:outline-none",
							"aria-label": label,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
						side: "top",
						className: "max-w-xs text-xs",
						children: tooltipText
					})] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 font-mono text-2xl font-light tracking-tight text-foreground sm:text-3xl tabular",
					children: fmtNumber(animatedValue)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3.5 flex items-center gap-1.5 text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("inline-flex items-center font-mono font-medium", glowColor === "magenta" || glowColor === "amber" ? isPositive ? "text-magenta" : "text-lime" : isPositive ? "text-lime" : "text-muted-foreground"),
					children: [isPositive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5 mr-0.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-3.5 mr-0.5" }), fmtPct(delta)]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground/70",
					children: deltaLabel
				})]
			})
		]
	});
}
function MetricCards() {
	const { data: metrics, isLoading } = useQuery(overviewMetricsQuery);
	if (isLoading || !metrics) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
		children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel h-36 animate-pulse p-6 rounded-2xl bg-surface/50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-9 rounded-lg bg-surface-raised" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-4 w-24 rounded bg-surface-raised" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-7 w-32 rounded bg-surface-raised" })
			]
		}, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "System Overview Metrics",
		className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCardItem, {
				label: "Total Transactions",
				value: metrics.totalTransactions,
				delta: metrics.deltas.totalTransactions,
				icon: Activity,
				glowColor: "cyan",
				tooltipText: "Total financial event stream volume ingested across all configured channels."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCardItem, {
				label: "Normal Activity",
				value: metrics.normalTransactions,
				delta: metrics.deltas.normalTransactions,
				icon: ShieldCheck,
				glowColor: "lime",
				tooltipText: "Transactions behaving strictly within statistical and behavioral historical baselines."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCardItem, {
				label: "Anomalies Detected",
				value: metrics.anomaliesDetected,
				delta: metrics.deltas.anomaliesDetected,
				icon: TriangleAlert,
				glowColor: "magenta",
				tooltipText: "Transactions flagged by heuristics or rules with anomaly scores exceeding 0.60."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCardItem, {
				label: "High Risk Outliers",
				value: metrics.highRisk,
				delta: metrics.deltas.highRisk,
				icon: Flame,
				glowColor: "amber",
				tooltipText: "Critical transactions flagged for immediate investigation (anomaly score >= 0.72)."
			})
		]
	});
}
function RecentFlaggedTable() {
	const { data: anomalies, isLoading } = useQuery(recentAnomaliesQuery);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-raised overflow-hidden rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border/80 p-5 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold tracking-tight text-foreground sm:text-lg",
					children: "Recent Flagged Activity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-magenta/15 px-2 py-0.5 font-mono text-[0.68rem] font-medium text-magenta",
					children: "High Priority"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Latest financial events exceeding risk sensitivity thresholds."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/app/anomalies",
				className: "inline-flex items-center gap-1 text-xs font-medium text-blue hover:text-blue/80 transition-colors focus:outline-none",
				children: ["View all anomalies", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto scrollbar-thin",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border/70 bg-surface/40 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 sm:px-6",
							children: "Transaction"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 hidden md:table-cell",
							children: "Location"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 hidden sm:table-cell",
							children: "Primary Signal"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Score"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Risk Level"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 text-right sm:px-6",
							children: "Detected"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-border/40 font-mono",
					children: isLoading || !anomalies ? Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "animate-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							className: "h-14 px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-full rounded bg-surface-raised" })
						})
					}, i)) : anomalies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 7,
						className: "py-12 text-center text-muted-foreground font-sans",
						children: "No active anomalies detected in current stream window."
					}) }) : anomalies.map((item) => {
						const tx = item.transaction;
						const isCritical = item.severity === "critical";
						const isHigh = item.severity === "high";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "group transition-colors duration-150 hover:bg-surface/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3.5 sm:px-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-foreground font-sans",
										children: tx.merchant
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[0.68rem] text-muted-foreground",
										children: [
											tx.transactionId,
											" · ",
											tx.userId
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: fmtMoney(tx.amount)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[0.65rem] text-muted-foreground uppercase",
										children: tx.channel
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 hidden md:table-cell",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-muted-foreground font-sans",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-muted-foreground/60" }),
											tx.location.city,
											", ",
											tx.location.countryCode
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 hidden sm:table-cell font-sans",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block max-w-[170px] truncate text-muted-foreground",
										title: item.primarySignal.label,
										children: item.primarySignal.label
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", isCritical ? "bg-destructive shadow-[0_0_6px_var(--color-destructive)]" : isHigh ? "bg-magenta shadow-[0_0_6px_var(--color-magenta)]" : "bg-amber") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold tabular text-foreground",
											children: fmtScore(tx.anomalyScore)
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: cn("rounded-md border px-2 py-0.5 text-[0.65rem] font-mono uppercase tracking-wider font-semibold", isCritical && "border-destructive/40 bg-destructive/15 text-[oklch(0.75_0.2_25)]", isHigh && "border-magenta/40 bg-magenta/15 text-magenta", !isCritical && !isHigh && "border-amber/40 bg-amber/15 text-amber"),
										children: item.severity
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3.5 text-right sm:px-6 text-muted-foreground text-[0.72rem] font-sans",
									children: fmtRelative(item.detectedAt)
								})
							]
						}, item.anomalyId);
					})
				})]
			})
		})]
	});
}
var NOTABLE_SIGNALS = [
	{
		label: "Unusual Transaction Amount",
		weight: 42,
		color: "bg-magenta"
	},
	{
		label: "Location / Geodistance Deviation",
		weight: 28,
		color: "bg-blue"
	},
	{
		label: "Off-hours Velocity Burst",
		weight: 18,
		color: "bg-amber"
	},
	{
		label: "First-Seen Merchant Origin",
		weight: 12,
		color: "bg-lime"
	}
];
var OBSERVATIONS = [
	{
		title: "Cross-border amount deviation",
		detail: "Spike of wire transfers (> $15,000) originating in non-domestic regions within short windows."
	},
	{
		title: "Off-hours velocity concentration",
		detail: "4 accounts triggered frequency thresholds between 02:00 and 04:30 local account time."
	},
	{
		title: "Account baseline stability",
		detail: "89.4% of accounts evaluated remained strictly within their 30-day moving average volume."
	}
];
function RiskIntelligencePanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-raised relative overflow-hidden p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -top-10 -right-10 size-40 rounded-full blur-3xl opacity-20",
				style: { background: "radial-gradient(circle, var(--color-primary-glow), transparent)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid size-10 place-items-center rounded-xl border border-primary/40 bg-primary/10 shadow-[0_0_20px_var(--color-primary-glow)/30]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-5 text-primary-glow" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -top-0.5 -right-0.5 size-2 rounded-full bg-lime animate-pulse" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-semibold tracking-tight text-foreground",
					children: "Risk Intelligence"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[0.72rem] text-muted-foreground font-mono",
					children: "Detection Engine · Heuristic Ruleset v1.2"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 rounded-xl border border-border/80 bg-surface/80 p-3.5 text-xs backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0 text-primary-glow mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground leading-relaxed",
							children: "Anomaly concentration identified in international transfers and nocturnal velocities."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.72rem] text-muted-foreground leading-normal",
							children: "Rules detected 12 elevated scoring outliers in the last 24h cycle, predominantly driven by amount multiples exceeding typical baselines."
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
						children: "Dominant Risk Signals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[0.68rem] text-muted-foreground",
						children: "Relative Weight"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-3",
					children: NOTABLE_SIGNALS.map((signal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground text-[0.75rem]",
								children: signal.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono font-medium text-foreground",
								children: [signal.weight, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-1.5 w-full rounded-full bg-surface-raised overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `h-full rounded-full ${signal.color}`,
								style: { width: `${signal.weight}%` }
							})
						})]
					}, signal.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 border-t border-border/80 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
					children: "Key Observations"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2.5 text-xs",
					children: OBSERVATIONS.map((obs, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-1.5 shrink-0 rounded-full bg-blue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground text-[0.78rem]",
							children: obs.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[0.72rem] text-muted-foreground leading-relaxed",
							children: obs.detail
						})] })]
					}, idx))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-xl border border-magenta/25 bg-magenta/10 p-3 text-xs flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 shrink-0 text-magenta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[0.75rem] text-magenta font-medium",
					children: "3 critical items awaiting triage disposition in queue."
				})]
			})
		]
	});
}
var SERVICES = [
	{
		name: "Transaction API (REST)",
		status: "disconnected",
		detail: "POST/GET /api/transactions disconnected",
		icon: Network
	},
	{
		name: "MongoDB Database",
		status: "disconnected",
		detail: "Not connected from frontend",
		icon: Database
	},
	{
		name: "Python ML Service",
		status: "disconnected",
		detail: "Heuristic rule scoring active",
		icon: Shield
	},
	{
		name: "Data Source",
		status: "simulated",
		detail: "Deterministic mock generator (260 txns)",
		icon: Server
	}
];
function SystemStatusCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel-raised p-5 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border/70 pb-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "size-4 text-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold tracking-tight text-foreground sm:text-base",
						children: "Infrastructure & Integration Status"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-amber/10 border border-amber/25 px-2.5 py-0.5 font-mono text-[0.68rem] text-amber font-medium",
					children: "Frontend Mock Mode"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2.5 text-xs text-muted-foreground leading-relaxed",
				children: "The user interface is fully interactive using procedural mock data. Backend services are not yet connected."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2",
				children: SERVICES.map((srv) => {
					const Icon = srv.icon;
					const isDisconnected = srv.status === "disconnected";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-2.5 rounded-xl border border-border/80 bg-surface/50 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg border", isDisconnected ? "border-amber/30 bg-amber/10 text-amber" : "border-blue/30 bg-blue/10 text-blue"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium text-foreground text-xs truncate",
									children: srv.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("font-mono text-[0.62rem] uppercase font-semibold shrink-0", isDisconnected ? "text-amber" : "text-blue"),
									children: srv.status === "disconnected" ? "Not connected" : "Mock seed"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-[0.68rem] text-muted-foreground truncate",
								children: srv.detail
							})]
						})]
					}, srv.name);
				})
			})
		]
	});
}
function OverviewPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCards, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-8 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8 lg:col-span-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityChart, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentFlaggedTable, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-8 lg:col-span-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskIntelligencePanel, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskDistributionCard, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemStatusCard, {})
				]
			})]
		})]
	});
}
//#endregion
export { OverviewPage as component };
