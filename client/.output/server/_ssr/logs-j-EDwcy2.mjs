import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { D as Info, b as RefreshCw, l as Terminal, n as X, o as TriangleAlert, v as Search, z as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as SheetTitle, i as SheetHeader, n as SheetContent, r as SheetDescription, t as Sheet } from "./sheet-DVngD8LG.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as fmtDateTime, i as LOG_SOURCES, r as LOG_SEVERITY_LABEL, v as logsQuery } from "./format-DX37O3UD.mjs";
import { t as Input } from "./input-Bw3v75gd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logs-j-EDwcy2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LogsPage() {
	const [severityFilter, setSeverityFilter] = (0, import_react.useState)("all");
	const [sourceFilter, setSourceFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const deferredSearch = (0, import_react.useDeferredValue)(search);
	const [selectedLog, setSelectedLog] = (0, import_react.useState)(null);
	const { data: logs, isLoading, refetch } = useQuery(logsQuery({
		severity: severityFilter,
		source: sourceFilter,
		search: deferredSearch
	}));
	const totalLogs = logs?.length ?? 0;
	const errorCount = logs?.filter((l) => l.severity === "error").length ?? 0;
	const warningCount = logs?.filter((l) => l.severity === "warning").length ?? 0;
	const infoCount = logs?.filter((l) => l.severity === "info").length ?? 0;
	const hasFilters = severityFilter !== "all" || sourceFilter !== "all" || search !== "";
	const resetFilters = () => {
		setSeverityFilter("all");
		setSourceFilter("all");
		setSearch("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
						children: "Infrastructure & System Audit Logs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground font-medium",
						children: "Pipeline Stream"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground sm:text-sm",
					children: "Ingestion telemetry, model scoring audit trails, rate limit monitors, and infrastructure status events."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => refetch(),
					className: "h-8 text-xs font-mono gap-1.5 self-start sm:self-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Refresh Feed" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-lg border border-border bg-surface-raised text-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Total Logged Events"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-lg font-bold text-foreground",
							children: totalLogs
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Errors / Exceptions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-lg font-bold text-destructive",
							children: errorCount
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-lg border border-amber/30 bg-amber/10 text-amber",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Warnings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-lg font-bold text-amber",
							children: warningCount
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-4 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-lg border border-blue/30 bg-blue/10 text-blue",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: "Info & Debug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-lg font-bold text-blue",
							children: infoCount
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-raised p-4 space-y-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search by log ID, event name, or description...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "pl-9 text-xs"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: severityFilter,
								onChange: (e) => setSeverityFilter(e.target.value),
								className: "h-9 rounded-md border border-input bg-surface px-3 py-1 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "all",
										children: "Severity: All"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "info",
										children: "Info"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "warning",
										children: "Warning"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "error",
										children: "Error"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "debug",
										children: "Debug"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: sourceFilter,
								onChange: (e) => setSourceFilter(e.target.value),
								className: "h-9 rounded-md border border-input bg-surface px-3 py-1 font-mono text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "all",
									children: "Subsystem: All"
								}), LOG_SOURCES.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: src,
									children: src
								}, src))]
							}),
							hasFilters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: resetFilters,
								className: "h-9 text-xs font-mono text-muted-foreground hover:text-foreground gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset" })]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel-raised overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left font-mono text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border/70 bg-surface/60 text-[0.68rem] uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Timestamp (UTC)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Log ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Event Name"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Subsystem Source"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Severity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3",
									children: "Description"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/40",
							children: isLoading ? Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "animate-pulse",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 7,
									className: "h-10 px-4 py-2 bg-surface/20"
								})
							}, i)) : !logs || logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "p-8 text-center text-muted-foreground font-sans",
								children: "No system logs match the current filter criteria."
							}) }) : logs.map((log) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									onClick: () => setSelectedLog(log),
									className: "hover:bg-surface-raised/50 cursor-pointer transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
											children: fmtDateTime(log.timestamp)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 font-semibold text-foreground whitespace-nowrap",
											children: log.logId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-foreground font-semibold font-sans whitespace-nowrap",
											children: log.event
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded border border-border bg-surface px-1.5 py-0.5 text-[0.68rem]",
												children: log.source
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: log.severity })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 whitespace-nowrap",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: log.status })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-4 py-3 text-muted-foreground truncate max-w-xs font-sans",
											children: log.description
										})
									]
								}, log.logId);
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: !!selectedLog,
				onOpenChange: (open) => !open && setSelectedLog(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
					className: "w-full max-w-lg border-l border-border bg-background p-6 space-y-6",
					children: selectedLog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
						className: "space-y-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityBadge, { severity: selectedLog.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: selectedLog.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
								className: "font-mono text-lg font-bold text-foreground",
								children: selectedLog.logId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, {
								className: "font-sans text-xs text-muted-foreground",
								children: ["Event: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: selectedLog.event
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 font-mono text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/50 bg-surface/50 p-4 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Timestamp:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: fmtDateTime(selectedLog.timestamp)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Subsystem Source:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground",
											children: selectedLog.source
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Log Severity:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground capitalize",
											children: selectedLog.severity
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Execution Status:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground capitalize",
											children: selectedLog.status
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "Event Description:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-lg border border-border bg-surface p-3 font-sans text-xs text-foreground leading-relaxed",
									children: selectedLog.description
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: "JSON Diagnostic Payload:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
									className: "rounded-lg border border-border/70 bg-black/50 p-3 font-mono text-[0.72rem] text-lime/90 overflow-x-auto",
									children: JSON.stringify({
										logId: selectedLog.logId,
										timestamp: selectedLog.timestamp,
										event: selectedLog.event,
										source: selectedLog.source,
										severity: selectedLog.severity,
										status: selectedLog.status,
										meta: {
											cluster: "us-east-prod-02",
											nodeId: "worker-ingest-89f",
											traceId: `tr-${Math.random().toString(36).substring(2, 10)}`
										}
									}, null, 2)
								})]
							})
						]
					})] })
				})
			})
		]
	});
}
function SeverityBadge({ severity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider font-semibold", {
			info: "border-blue/40 bg-blue/10 text-blue",
			warning: "border-amber/40 bg-amber/10 text-amber",
			error: "border-destructive/40 bg-destructive/10 text-destructive",
			debug: "border-border bg-surface text-muted-foreground"
		}[severity]),
		children: LOG_SEVERITY_LABEL[severity]
	});
}
function StatusBadge({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded border px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider font-semibold", {
			ok: "border-lime/40 bg-lime/10 text-lime",
			retrying: "border-amber/40 bg-amber/10 text-amber",
			failed: "border-destructive/40 bg-destructive/10 text-destructive",
			acknowledged: "border-border bg-surface text-muted-foreground"
		}[status]),
		children: status
	});
}
//#endregion
export { LogsPage as component };
