import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { J as ArrowUpRight, n as X, o as TriangleAlert, v as Search, w as MapPin, x as Radar } from "../_libs/lucide-react.mjs";
import { a as SheetTitle, n as SheetContent, t as Sheet } from "./sheet-DVngD8LG.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as fmtScore, g as fmtRelative, l as anomaliesQuery, p as fmtMoney, t as ANOMALY_STATUS_LABEL } from "./format-DX37O3UD.mjs";
import { t as Badge } from "./badge-C4HZJ2f5.mjs";
import { t as Input } from "./input-Bw3v75gd.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-nakx-kjm.mjs";
import { t as Separator } from "./separator-B-d4p3zf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/anomalies-D0V5_ful.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SeverityBadge({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold", {
			medium: "border-amber/40 bg-amber/10 text-amber",
			high: "border-magenta/40 bg-magenta/10 text-magenta",
			critical: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]"
		}[severity]),
		children: severity
	});
}
function AnomalyStatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold", {
			open: "border-blue/30 bg-blue/8 text-blue",
			under_review: "border-amber/30 bg-amber/8 text-amber",
			escalated: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]",
			resolved: "border-lime/30 bg-lime/8 text-lime"
		}[status]),
		children: ANOMALY_STATUS_LABEL[status]
	});
}
var SIGNAL_COLOR = {
	amount_spike: "bg-magenta",
	unusual_time: "bg-amber",
	location_deviation: "bg-blue",
	frequency_burst: "bg-destructive",
	new_merchant: "bg-lime",
	velocity: "bg-violet"
};
function AnomalyDetailSheet({ anomaly, open, onClose }) {
	if (!anomaly) return null;
	const tx = anomaly.transaction;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full max-w-xl overflow-y-auto border-l border-border bg-sidebar p-0 scrollbar-thin",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "sr-only",
					children: "Anomaly Detail"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-sidebar px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
						children: "Anomaly Detail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-mono text-sm font-semibold text-foreground",
						children: anomaly.anomalyId
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-raised flex items-center justify-between p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-mono text-2xl font-light tabular text-foreground",
									children: fmtMoney(tx.amount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-xs text-muted-foreground font-sans",
									children: tx.merchant
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: anomaly.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnomalyStatusBadge, { status: anomaly.status })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Event Details"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2 text-xs",
							children: [
								["Anomaly ID", anomaly.anomalyId],
								["Transaction ID", tx.transactionId],
								["User ID", tx.userId],
								["Detected", fmtRelative(anomaly.detectedAt)],
								["Transaction Time", new Date(tx.transactionTime).toUTCString()],
								["Channel", tx.channel.toUpperCase()],
								["Location", `${tx.location.city}, ${tx.location.country}`],
								["Assignee", anomaly.assignee ?? "Unassigned"]
							].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-muted-foreground",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-right font-mono text-foreground",
									children: value
								})]
							}, label))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
								children: "Risk Scoring"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2 text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Anomaly Score"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono font-semibold text-foreground",
										children: [fmtScore(tx.anomalyScore), " / 1.00"]
									})]
								})
							}),
							tx.anomalyScore != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 w-full rounded-full bg-surface-raised overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cn("h-full rounded-full transition-all duration-700", tx.anomalyScore >= .9 ? "bg-destructive" : tx.anomalyScore >= .72 ? "bg-magenta" : "bg-amber"),
									style: { width: `${tx.anomalyScore * 100}%` }
								})
							})
						] }),
						tx.signals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Detection Signals"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: tx.signals.map((sig) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border/80 bg-surface/60 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full shrink-0", SIGNAL_COLOR[sig.kind] ?? "bg-muted-foreground") }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-medium text-foreground",
											children: sig.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-auto font-mono text-[0.68rem] text-muted-foreground",
											children: [Math.round(sig.weight * 100), "% weight"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-[0.72rem] leading-relaxed text-muted-foreground pl-4",
									children: sig.detail
								})]
							}, sig.kind))
						})] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "sm",
								className: "flex-1 gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app/investigation",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" }), "Investigate"]
								})
							})
						})
					]
				})
			]
		})
	});
}
function AnomaliesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const deferredSearch = (0, import_react.useDeferredValue)(search);
	const [severity, setSeverity] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [detailOpen, setDetailOpen] = (0, import_react.useState)(false);
	const { data: anomalies, isLoading } = useQuery(anomaliesQuery({
		severity,
		status,
		search: deferredSearch
	}));
	const hasFilters = search !== "" || severity !== "all" || status !== "all";
	const critCount = anomalies?.filter((a) => a.severity === "critical").length ?? 0;
	const highCount = anomalies?.filter((a) => a.severity === "high").length ?? 0;
	const openCount = anomalies?.filter((a) => a.status === "open" || a.status === "escalated").length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-xl border border-magenta/30 bg-magenta/10 text-magenta",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold tracking-tight text-foreground sm:text-xl",
						children: "Anomaly Triage Queue"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [anomalies ? `${anomalies.length} anomalies` : "Loading…", critCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 text-[oklch(0.75_0.2_25)]",
							children: [
								"· ",
								critCount,
								" critical"
							]
						})]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 text-xs font-mono",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3 py-1 text-[oklch(0.75_0.2_25)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-destructive" }),
								critCount,
								" Critical"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-magenta/30 bg-magenta/10 px-3 py-1 text-magenta",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-magenta" }),
								highCount,
								" High"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-blue/30 bg-blue/10 px-3 py-1 text-blue",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-blue" }),
								openCount,
								" Open"
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-raised p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[200px] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "anomalies-search",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								placeholder: "Search by anomaly ID, transaction, user…",
								className: "h-9 bg-surface pl-8 text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: severity,
							onValueChange: (v) => setSeverity(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "severity-filter",
								className: "h-9 w-36 bg-surface text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Severity" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Severities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "critical",
									children: "Critical"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "high",
									children: "High"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "medium",
									children: "Medium"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: (v) => setStatus(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "anomaly-status-filter",
								className: "h-9 w-36 bg-surface text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "open",
									children: "Open"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "under_review",
									children: "Under Review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "escalated",
									children: "Escalated"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "resolved",
									children: "Resolved"
								})
							] })]
						}),
						hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => {
								setSearch("");
								setSeverity("all");
								setStatus("all");
							},
							className: "h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Clear"]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-raised overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto scrollbar-thin",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/70 bg-surface/40 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 sm:px-6",
									children: "Anomaly"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 md:table-cell",
									children: "Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 sm:table-cell",
									children: "Primary Signal"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Score"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Severity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 lg:table-cell",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 xl:table-cell",
									children: "Assignee"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-right sm:px-6",
									children: "Detected"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/40 font-mono",
							children: isLoading || !anomalies ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 9,
									className: "h-12 px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded bg-surface-raised" })
								})
							}, i)) : anomalies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 9,
								className: "py-14 text-center text-muted-foreground font-sans",
								children: "No anomalies match the current filters."
							}) }) : anomalies.map((item) => {
								const tx = item.transaction;
								const isEscalated = item.status === "escalated";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: cn("group cursor-pointer transition-colors duration-150 hover:bg-surface/50", isEscalated && "border-l-2 border-l-destructive"),
									onClick: () => {
										setSelected(item);
										setDetailOpen(true);
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 sm:px-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [isEscalated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 shrink-0 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground font-sans",
													children: tx.merchant
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[0.68rem] text-muted-foreground",
													children: [
														item.anomalyId,
														" · ",
														tx.userId
													]
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold tabular text-foreground",
												children: fmtMoney(tx.amount)
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "hidden px-4 py-3 md:table-cell",
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
											className: "hidden px-4 py-3 sm:table-cell font-sans",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-block max-w-[170px] truncate text-muted-foreground",
												title: item.primarySignal.label,
												children: item.primarySignal.label
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", item.severity === "critical" ? "bg-destructive shadow-[0_0_6px_var(--color-destructive)]" : item.severity === "high" ? "bg-magenta shadow-[0_0_5px_var(--color-magenta)]" : "bg-amber") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular text-foreground",
													children: fmtScore(tx.anomalyScore)
												})]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: item.severity })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "hidden px-4 py-3 lg:table-cell",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnomalyStatusBadge, { status: item.status })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "hidden px-4 py-3 xl:table-cell text-muted-foreground font-sans",
											children: item.assignee ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "italic text-muted-foreground/50",
												children: "Unassigned"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-5 py-3 text-right text-[0.72rem] text-muted-foreground font-sans sm:px-6",
											children: fmtRelative(item.detectedAt)
										})
									]
								}, item.anomalyId);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnomalyDetailSheet, {
				anomaly: selected,
				open: detailOpen,
				onClose: () => setDetailOpen(false)
			})
		]
	});
}
//#endregion
export { AnomaliesPage as component };
