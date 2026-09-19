import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { H as ChevronLeft, V as ChevronRight, Y as ArrowUpDown, Z as ArrowLeftRight, f as SlidersHorizontal, n as X, v as Search, w as MapPin } from "../_libs/lucide-react.mjs";
import { a as SheetTitle, n as SheetContent, t as Sheet } from "./sheet-DVngD8LG.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { C as transactionQuery, _ as fmtScore, a as RISK_LABEL, d as fmtDate, f as fmtDateTime, n as COUNTRY_OPTIONS, o as STATUS_LABEL, p as fmtMoney, w as transactionsQuery } from "./format-DX37O3UD.mjs";
import { t as Badge } from "./badge-C4HZJ2f5.mjs";
import { t as Input } from "./input-Bw3v75gd.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-nakx-kjm.mjs";
import { t as Separator } from "./separator-B-d4p3zf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-Bl9GbhbX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RiskBadge({ risk }) {
	if (!risk) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-muted-foreground font-mono text-[0.68rem]",
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold", {
			low: "border-lime/40 bg-lime/10 text-lime",
			medium: "border-amber/40 bg-amber/10 text-amber",
			high: "border-magenta/40 bg-magenta/10 text-magenta",
			critical: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]"
		}[risk]),
		children: RISK_LABEL[risk]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("rounded-md border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider font-semibold", {
			completed: "border-lime/30 bg-lime/8 text-lime",
			pending: "border-amber/30 bg-amber/8 text-amber",
			flagged: "border-magenta/30 bg-magenta/8 text-magenta",
			under_review: "border-blue/30 bg-blue/8 text-blue",
			blocked: "border-destructive/40 bg-destructive/10 text-[oklch(0.75_0.2_25)]"
		}[status]),
		children: STATUS_LABEL[status]
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
function TransactionDetailSheet({ txId, open, onClose }) {
	const { data: tx, isLoading } = useQuery(transactionQuery(txId));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			side: "right",
			className: "w-full max-w-xl overflow-y-auto border-l border-border bg-sidebar p-0 scrollbar-thin",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
					className: "sr-only",
					children: "Transaction Detail"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 z-10 flex items-center justify-between border-b border-border/80 bg-sidebar px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
						children: "Transaction Detail"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-0.5 font-mono text-sm font-semibold text-foreground",
						children: isLoading ? "Loading…" : tx?.transactionId ?? "—"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					})]
				}),
				isLoading && !tx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 p-6 animate-pulse",
					children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 rounded-xl bg-surface-raised" }, i))
				}) : !tx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 text-center text-sm text-muted-foreground",
					children: "Transaction not found."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-raised flex items-center justify-between p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
								children: "Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 font-mono text-2xl font-light tabular text-foreground",
								children: fmtMoney(tx.amount)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: tx.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: tx.riskLevel })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Transaction Info"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Transaction ID",
									value: tx.transactionId,
									mono: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "User ID",
									value: tx.userId,
									mono: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Time",
									value: fmtDateTime(tx.transactionTime),
									mono: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Channel",
									value: tx.channel.toUpperCase(),
									mono: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Merchant",
									value: tx.merchant
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
									label: "Location",
									value: `${tx.location.city}, ${tx.location.country} (${tx.location.countryCode})`
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
								children: "Risk Analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										label: "Anomaly Score",
										value: tx.anomalyScore != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono font-semibold text-foreground",
											children: [tx.anomalyScore.toFixed(2), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 text-muted-foreground",
												children: "/ 1.00"
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Pending analysis"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										label: "Risk Level",
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: tx.riskLevel })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
										label: "Analysis State",
										value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("font-mono text-[0.68rem] uppercase", tx.analysisState === "analyzed" ? "text-lime" : tx.analysisState === "pending" ? "text-amber" : "text-muted-foreground"),
											children: tx.analysisState
										})
									})
								]
							}),
							tx.anomalyScore != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-full rounded-full bg-surface-raised overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("h-full rounded-full transition-all duration-700", tx.anomalyScore >= .9 ? "bg-destructive" : tx.anomalyScore >= .72 ? "bg-magenta" : tx.anomalyScore >= .45 ? "bg-amber" : "bg-lime"),
										style: { width: `${tx.anomalyScore * 100}%` }
									})
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
						})] })] })
					]
				})
			]
		})
	});
}
function DetailRow({ label, value, mono }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "shrink-0 text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("text-right text-foreground", mono && "font-mono"),
			children: value
		})]
	});
}
function SortButton({ active, dir, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("inline-flex items-center gap-1 transition-colors", active ? "text-foreground" : "text-muted-foreground hover:text-foreground"),
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: cn("size-3", active && (dir === "asc" ? "rotate-0" : "rotate-180")) })]
	});
}
var PAGE_SIZE = 15;
function TransactionsPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const deferredSearch = (0, import_react.useDeferredValue)(search);
	const [status, setStatus] = (0, import_react.useState)("all");
	const [riskLevel, setRiskLevel] = (0, import_react.useState)("all");
	const [country, setCountry] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)("transactionTime");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	const [page, setPage] = (0, import_react.useState)(1);
	const [selectedTxId, setSelectedTxId] = (0, import_react.useState)(null);
	const [detailOpen, setDetailOpen] = (0, import_react.useState)(false);
	const { data, isLoading } = useQuery(transactionsQuery({
		search: deferredSearch,
		status,
		riskLevel,
		country,
		sortBy,
		sortDir,
		page,
		pageSize: PAGE_SIZE
	}));
	function toggleSort(col) {
		if (sortBy === col) setSortDir((d) => d === "desc" ? "asc" : "desc");
		else {
			setSortBy(col);
			setSortDir("desc");
		}
		setPage(1);
	}
	function openDetail(tx) {
		setSelectedTxId(tx.transactionId);
		setDetailOpen(true);
	}
	function clearFilters() {
		setSearch("");
		setStatus("all");
		setRiskLevel("all");
		setCountry("all");
		setPage(1);
	}
	const hasFilters = search !== "" || status !== "all" || riskLevel !== "all" || country !== "all";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-10 place-items-center rounded-xl border border-blue/30 bg-blue/10 text-blue",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-semibold tracking-tight text-foreground sm:text-xl",
						children: "Transactions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: data ? `${data.total.toLocaleString()} transactions` : "Loading…"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-raised p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-[200px] flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "transactions-search",
								value: search,
								onChange: (e) => {
									setSearch(e.target.value);
									setPage(1);
								},
								placeholder: "Search by ID, user, merchant, city…",
								className: "h-9 bg-surface pl-8 text-xs"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: (v) => {
								setStatus(v);
								setPage(1);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "status-filter",
								className: "h-9 w-36 bg-surface text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Statuses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "completed",
									children: "Completed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "pending",
									children: "Pending"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "flagged",
									children: "Flagged"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "under_review",
									children: "Under Review"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "blocked",
									children: "Blocked"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: riskLevel,
							onValueChange: (v) => {
								setRiskLevel(v);
								setPage(1);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "risk-filter",
								className: "h-9 w-36 bg-surface text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Risk Level" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Risk Levels"
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
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "low",
									children: "Low"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "unscored",
									children: "Unscored"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: country,
							onValueChange: (v) => {
								setCountry(v);
								setPage(1);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								id: "country-filter",
								className: "h-9 w-40 bg-surface text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Country" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All Countries"
							}), COUNTRY_OPTIONS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c.code,
								children: c.name
							}, c.code))] })]
						}),
						hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: clearFilters,
							className: "h-9 gap-1.5 text-xs text-muted-foreground hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), "Clear"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Filters"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel-raised overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
										active: sortBy === "amount",
										dir: sortDir,
										onClick: () => toggleSort("amount"),
										children: "Amount"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 md:table-cell",
									children: "Location"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 lg:table-cell",
									children: "Channel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
										active: sortBy === "anomalyScore",
										dir: sortDir,
										onClick: () => toggleSort("anomalyScore"),
										children: "Score"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "hidden px-4 py-3 sm:table-cell",
									children: "Risk"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-right sm:px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortButton, {
										active: sortBy === "transactionTime",
										dir: sortDir,
										onClick: () => toggleSort("transactionTime"),
										children: "Time"
									})
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/40 font-mono",
							children: isLoading || !data ? Array.from({ length: PAGE_SIZE }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 8,
									className: "h-12 px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-full rounded bg-surface-raised" })
								})
							}, i)) : data.items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 8,
								className: "py-14 text-center text-muted-foreground font-sans",
								children: "No transactions match the current filters."
							}) }) : data.items.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "group cursor-pointer transition-colors duration-150 hover:bg-surface/50",
								onClick: () => openDetail(tx),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-3 sm:px-6",
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground tabular",
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
										className: "hidden px-4 py-3 lg:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground uppercase text-[0.68rem]",
											children: tx.channel
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: tx.status })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [tx.anomalyScore != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", tx.anomalyScore >= .9 ? "bg-destructive shadow-[0_0_6px_var(--color-destructive)]" : tx.anomalyScore >= .72 ? "bg-magenta shadow-[0_0_5px_var(--color-magenta)]" : tx.anomalyScore >= .45 ? "bg-amber" : "bg-lime") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "tabular text-foreground",
												children: fmtScore(tx.anomalyScore)
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "hidden px-4 py-3 sm:table-cell",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { risk: tx.riskLevel })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-right text-muted-foreground text-[0.72rem] font-sans sm:px-6",
										children: fmtDate(tx.transactionTime)
									})
								]
							}, tx.transactionId))
						})]
					})
				}), data && data.pageCount > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border/70 px-5 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[0.72rem] text-muted-foreground",
						children: [
							"Page ",
							data.page,
							" of ",
							data.pageCount,
							" · ",
							data.total,
							" results"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							disabled: data.page <= 1,
							onClick: () => setPage((p) => p - 1),
							"aria-label": "Previous page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon-sm",
							disabled: data.page >= data.pageCount,
							onClick: () => setPage((p) => p + 1),
							"aria-label": "Next page",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionDetailSheet, {
				txId: selectedTxId,
				open: detailOpen,
				onClose: () => setDetailOpen(false)
			})
		]
	});
}
//#endregion
export { TransactionsPage as component };
