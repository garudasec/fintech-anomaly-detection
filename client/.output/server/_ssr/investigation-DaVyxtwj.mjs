import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { N as CreditCard, O as Globe, R as CircleCheck, a as UserCheck, i as UserX, m as ShieldCheck, o as TriangleAlert, t as Zap, v as Search, w as MapPin } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { T as userProfileQuery, _ as fmtScore, f as fmtDateTime, l as anomaliesQuery, p as fmtMoney, t as ANOMALY_STATUS_LABEL, x as relatedTransactionsQuery } from "./format-DX37O3UD.mjs";
import { t as Input } from "./input-Bw3v75gd.mjs";
import { t as Route } from "./investigation-DFcCOGvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/investigation-DaVyxtwj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InvestigationPage() {
	const paramId = Route.useSearch().id;
	const { data: anomalies, isLoading } = useQuery(anomaliesQuery({}));
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedId, setSelectedId] = (0, import_react.useState)(paramId ?? null);
	const [dispositions, setDispositions] = (0, import_react.useState)({});
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const filteredAnomalies = (anomalies ?? []).filter((a) => {
		if (!searchQuery.trim()) return true;
		const q = searchQuery.toLowerCase();
		return a.anomalyId.toLowerCase().includes(q) || a.transaction.userId.toLowerCase().includes(q) || a.primarySignal.label.toLowerCase().includes(q) || a.transaction.merchant.toLowerCase().includes(q);
	});
	const selectedAnomaly = filteredAnomalies.find((a) => a.anomalyId === selectedId) ?? filteredAnomalies[0] ?? (anomalies && anomalies[0] ? anomalies[0] : null);
	const effectiveStatus = selectedAnomaly ? dispositions[selectedAnomaly.anomalyId]?.status ?? selectedAnomaly.status : "open";
	const { data: userProfile, isLoading: isUserLoading } = useQuery(userProfileQuery(selectedAnomaly?.transaction.userId));
	const { data: relatedTxns, isLoading: isRelatedLoading } = useQuery(relatedTransactionsQuery(selectedAnomaly?.transaction));
	const handleSetDisposition = (status, label) => {
		if (!selectedAnomaly) return;
		setDispositions((prev) => ({
			...prev,
			[selectedAnomaly.anomalyId]: { status }
		}));
		setToastMessage(`Case ${selectedAnomaly.anomalyId} updated to ${label}`);
		setTimeout(() => setToastMessage(null), 3500);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
					children: "Analyst Investigation Workspace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-destructive/30 bg-destructive/10 px-2.5 py-0.5 font-mono text-[0.68rem] font-medium text-destructive",
					children: "Deep Triage"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground sm:text-sm",
				children: "Correlate anomaly triggers with user behavioral baselines, device metadata, and execution controls."
			})] }), toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/10 px-3.5 py-2 font-mono text-xs text-lime shadow-lg animate-in fade-in slide-in-from-top-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 lg:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-raised p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Search anomaly queue...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "pl-9 text-xs"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel-raised divide-y divide-border/40 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border/70 bg-surface/40 px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Cases (",
							filteredAnomalies.length,
							")"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Severity" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[700px] overflow-y-auto divide-y divide-border/40",
						children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-xs text-muted-foreground",
							children: "Loading anomaly queue..."
						}) : filteredAnomalies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-8 text-center text-xs text-muted-foreground",
							children: "No matching anomalies found."
						}) : filteredAnomalies.map((item) => {
							const isSelected = selectedAnomaly?.anomalyId === item.anomalyId;
							const isCritical = item.severity === "critical";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelectedId(item.anomalyId),
								className: cn("w-full p-3.5 text-left transition-colors duration-150 flex flex-col gap-2", isSelected ? "bg-[oklch(0.22_0.038_255)] border-l-2 border-l-primary" : "hover:bg-surface-raised/50"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs font-semibold text-foreground",
											children: item.anomalyId
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("rounded border px-1.5 py-0.2 font-mono text-[0.62rem] uppercase tracking-wider font-semibold", isCritical ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-amber/40 bg-amber/10 text-amber"),
											children: item.severity
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "truncate text-muted-foreground max-w-[180px]",
											children: item.primarySignal.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-semibold text-foreground",
											children: fmtMoney(item.transaction.amount)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between font-mono text-[0.68rem] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "truncate",
											children: ["User: ", item.transaction.userId]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold text-magenta",
											children: ["Score: ", fmtScore(item.transaction.anomalyScore)]
										})]
									})
								]
							}, item.anomalyId);
						})
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-6 lg:col-span-8",
				children: selectedAnomaly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-5 sm:p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-mono text-lg font-bold text-foreground",
									children: selectedAnomaly.anomalyId
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("rounded-md border px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider font-semibold", effectiveStatus === "open" ? "border-destructive/40 bg-destructive/10 text-destructive" : effectiveStatus === "under_review" ? "border-amber/40 bg-amber/10 text-amber" : effectiveStatus === "resolved" ? "border-lime/40 bg-lime/10 text-lime" : "border-border bg-surface text-muted-foreground"),
									children: ANOMALY_STATUS_LABEL[effectiveStatus]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: [
									"Detected at ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-foreground",
										children: fmtDateTime(selectedAnomaly.detectedAt)
									}),
									" by rule",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: selectedAnomaly.primarySignal.label
									})
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => handleSetDisposition("resolved", "Resolved (Approved)"),
										className: cn("h-8 text-xs font-mono gap-1.5", effectiveStatus === "resolved" && "border-lime bg-lime/10 text-lime"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-lime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Approve" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => handleSetDisposition("under_review", "Escalated to Review"),
										className: cn("h-8 text-xs font-mono gap-1.5", effectiveStatus === "under_review" && "border-amber bg-amber/10 text-amber"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-amber" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Escalate" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "destructive",
										onClick: () => handleSetDisposition("resolved", "Blocked & Frozen"),
										className: "h-8 text-xs font-mono gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Block Account" })]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/70 pt-4 grid grid-cols-1 gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
										children: "Anomaly Score"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xl font-bold text-magenta",
											children: fmtScore(selectedAnomaly.transaction.anomalyScore)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-2 flex-1 overflow-hidden rounded-full bg-surface-raised",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full bg-magenta transition-all duration-300",
												style: { width: `${(selectedAnomaly.transaction.anomalyScore ?? 0) * 100}%` }
											})
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
										children: "Detection Severity"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-sm font-semibold capitalize text-foreground",
										children: selectedAnomaly.severity
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground",
										children: "Target User"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-mono text-sm font-semibold text-blue truncate",
										children: selectedAnomaly.transaction.userId
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-raised p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-border/70 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-4 text-blue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground",
									children: "Transaction Details"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2.5 font-mono text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Transaction ID:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-semibold",
											children: selectedAnomaly.transaction.transactionId
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Amount:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-bold text-sm",
											children: fmtMoney(selectedAnomaly.transaction.amount)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Merchant:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-sans",
											children: selectedAnomaly.transaction.merchant
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Channel:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground capitalize font-semibold",
											children: selectedAnomaly.transaction.channel
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Location:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-muted-foreground" }),
												selectedAnomaly.transaction.location.city,
												",",
												" ",
												selectedAnomaly.transaction.location.country
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Status:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-foreground font-semibold capitalize",
											children: selectedAnomaly.transaction.status
										})]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel-raised p-5 space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 border-b border-border/70 pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4 text-magenta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground",
									children: "Triggered Signal Stack"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: selectedAnomaly.transaction.signals.map((sig, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 rounded-lg border border-border/50 bg-surface/50 p-2.5 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between font-mono",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground",
											children: sig.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-magenta font-semibold",
											children: [
												"Weight: +",
												(sig.weight * 100).toFixed(0),
												"%"
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[0.72rem] text-muted-foreground leading-snug",
										children: sig.detail
									})]
								}, idx))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-5 sm:p-6 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/70 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "size-4 text-lime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold text-foreground",
									children: "User Profile & Behavioral Baseline"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: ["ID: ", selectedAnomaly.transaction.userId]
							})]
						}), isUserLoading || !userProfile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 text-center text-xs text-muted-foreground",
							children: "Loading behavioral baseline..."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-4 sm:grid-cols-4 font-mono text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[0.68rem] uppercase tracking-wider",
											children: "Customer Name"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-sans font-semibold text-foreground",
											children: userProfile.displayName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.68rem] text-muted-foreground",
											children: ["Account age: ", userProfile.accountAge]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[0.68rem] uppercase tracking-wider",
											children: "Avg Transaction Size"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-foreground",
											children: fmtMoney(userProfile.averageAmount)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.68rem] text-muted-foreground",
											children: ["Window: ", userProfile.typicalWindow]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[0.68rem] uppercase tracking-wider",
											children: "Home Jurisdiction"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-foreground flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3 text-muted-foreground" }), userProfile.homeLocation.country]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.68rem] text-muted-foreground",
											children: userProfile.homeLocation.city
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 rounded-lg border border-border/40 bg-surface/40 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground text-[0.68rem] uppercase tracking-wider",
											children: "Risk History (30d)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-amber",
											children: [
												userProfile.priorFlags,
												" prior flag",
												userProfile.priorFlags === 1 ? "" : "s"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[0.68rem] text-muted-foreground",
											children: [userProfile.transactionsLast30d, " txns in 30d"]
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/70 bg-surface/40 px-5 py-3 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "text-sm font-semibold text-foreground",
								children: [
									"Related Recent Transactions (",
									userProfile?.displayName ?? selectedAnomaly.transaction.userId,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: "Context Window"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "border-b border-border/70 bg-surface/60 text-[0.68rem] uppercase tracking-wider text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5",
											children: "Time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5",
											children: "Txn ID"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5",
											children: "Merchant"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5 text-right",
											children: "Amount"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-4 py-2.5 text-right",
											children: "Score"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border/40",
									children: isRelatedLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "p-4 text-center text-muted-foreground",
										children: "Loading transaction history..."
									}) }) : !relatedTxns || relatedTxns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "p-4 text-center text-muted-foreground",
										children: "No other recent transactions."
									}) }) : relatedTxns.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-surface-raised/40",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-muted-foreground",
												children: fmtDateTime(tx.transactionTime)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-foreground font-semibold",
												children: tx.transactionId
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-foreground font-sans",
												children: tx.merchant
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-right font-bold text-foreground",
												children: fmtMoney(tx.amount)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "px-4 py-2.5 text-right font-bold text-magenta",
												children: fmtScore(tx.anomalyScore)
											})
										]
									}, tx.transactionId))
								})]
							})
						})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel-raised p-12 text-center text-muted-foreground",
					children: "Select an anomaly case from the queue to start investigation."
				})
			})]
		})]
	});
}
//#endregion
export { InvestigationPage as component };
