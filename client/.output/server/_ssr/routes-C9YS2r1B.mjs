import "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { $ as Activity, A as Eye, K as Brain, X as ArrowRight, c as TrendingDown, m as ShieldCheck, s as TrendingUp, t as Zap, x as Radar } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as PublicLayout, r as SectionHeading } from "./PublicLayout-XP1LBKf8.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/**
* Cinematic Hero Visual — FinTech Anomaly Detection
* Recreates the exact reference composition:
* - Upper purple/magenta atmospheric glowing arc
* - Lower blue/violet atmospheric glowing arc
* - Subtle background financial UI panels
* - Central floating financial card with 4-phase collapse & reveal expansion loop
*/
function HeroVisual({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative mx-auto w-full max-w-5xl py-8 overflow-hidden select-none", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[110%] -translate-x-1/2 rounded-[100%] blur-xl opacity-90 [animation:arc-glow-pulse_8s_ease-in-out_infinite]",
				style: {
					background: "radial-gradient(ellipse 65% 50% at 50% 10%, rgba(217, 70, 239, 0.45) 0%, rgba(168, 85, 247, 0.25) 45%, rgba(147, 51, 234, 0.08) 70%, transparent 100%)",
					boxShadow: "inset 0 -2px 40px rgba(236, 72, 153, 0.4), 0 30px 100px rgba(217, 70, 239, 0.35)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[95%] -translate-x-1/2 rounded-[100%] border-b border-magenta/40 opacity-75 blur-[1px]",
				style: { boxShadow: "0 4px 30px rgba(236, 72, 153, 0.6)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[110%] -translate-x-1/2 rounded-[100%] blur-xl opacity-90 [animation:arc-glow-pulse_8s_ease-in-out_infinite_4s]",
				style: {
					background: "radial-gradient(ellipse 65% 50% at 50% 90%, rgba(59, 130, 246, 0.45) 0%, rgba(99, 102, 241, 0.28) 45%, rgba(139, 92, 246, 0.1) 70%, transparent 100%)",
					boxShadow: "inset 0 2px 40px rgba(99, 102, 241, 0.4), 0 -30px 100px rgba(59, 130, 246, 0.35)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "pointer-events-none absolute -bottom-24 left-1/2 h-[320px] w-[95%] -translate-x-1/2 rounded-[100%] border-t border-blue/40 opacity-75 blur-[1px]",
				style: { boxShadow: "0 -4px 30px rgba(59, 130, 246, 0.6)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative min-h-[460px] sm:min-h-[500px] w-full flex items-center justify-center px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute left-0 sm:left-4 top-4 hidden md:flex flex-col gap-4 opacity-30 blur-[0.6px] pointer-events-none max-w-[220px] [animation:float-subtle-left_10s_ease-in-out_infinite]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl p-4 border border-white/10 space-y-2 bg-slate-950/60 shadow-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.68rem] uppercase font-mono tracking-wider text-muted-foreground",
								children: "Expenses Report"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative size-12 rounded-full border-2 border-magenta/40 border-t-purple-400 grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.6rem] font-mono text-foreground font-bold",
										children: "$2.2k"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-sm font-bold text-foreground",
									children: "$2,252.22"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.65rem] text-muted-foreground",
									children: "Total expenses"
								})] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-xl p-3 border border-white/10 space-y-1 bg-slate-950/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[0.65rem] font-mono text-muted-foreground flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Emergency Fund" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-lime font-bold",
									children: "100%"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 w-full bg-surface-raised rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-lime w-full" })
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute right-0 sm:right-4 top-4 hidden md:flex flex-col gap-4 opacity-30 blur-[0.6px] pointer-events-none max-w-[220px] [animation:float-subtle-right_12s_ease-in-out_infinite]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl p-4 border border-white/10 space-y-2 bg-slate-950/60 shadow-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.68rem] uppercase font-mono tracking-wider text-muted-foreground",
								children: "Monitored Assets"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 font-mono text-[0.7rem]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save for a Car" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: "$3,200"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save for Education" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$2,500" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Vacation Fund" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "$1,900" })]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-xl p-3 border border-white/10 space-y-1 bg-slate-950/50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[0.65rem] font-mono text-muted-foreground flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Target Reserve" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-purple-400 font-bold",
									children: "$5,352.22"
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative z-20 w-full max-w-md mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("glass rounded-3xl p-6 sm:p-8 border border-purple-400/40", "bg-gradient-to-br from-indigo-950/90 via-purple-950/80 to-slate-950/95", "shadow-[0_0_60px_rgba(168,85,247,0.35)] backdrop-blur-2xl", "transition-all duration-300", "[animation:cinematic-card-cycle_8s_cubic-bezier(0.4,0,0.2,1)_infinite]"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-px rounded-3xl bg-gradient-to-r from-purple-500/20 via-magenta/30 to-blue-500/20 pointer-events-none opacity-50 blur-sm" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-sans text-xs sm:text-sm font-medium text-slate-300",
										children: "Total Balance"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "relative flex size-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-lime" })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-slate-400 hover:text-white transition-colors cursor-pointer" })]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative mt-3 flex items-baseline gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md",
										children: "$5,237.34"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[0.68rem] font-sans text-slate-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-3 text-lime" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Income" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-sans text-base sm:text-lg font-semibold text-white",
										children: "$2,252.22"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-[0.68rem] font-sans text-slate-400",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "size-3 text-magenta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Expence" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-sans text-base sm:text-lg font-semibold text-white",
										children: "$2,252.22"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2 text-xs font-mono",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-magenta animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[0.68rem] text-slate-300",
											children: "Risk Score: 0.19"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-magenta/20 px-1.5 py-0.5 text-[0.62rem] uppercase font-bold tracking-wider text-magenta border border-magenta/30",
										children: "1 Outlier Flagged"
									})]
								})
							]
						})
					})
				]
			})
		]
	});
}
var FLOW = [
	{
		step: "01",
		label: "Transactions",
		body: "Card, wire, transfer and mobile events arrive as a continuous stream."
	},
	{
		step: "02",
		label: "Analysis",
		body: "Each event is compared with the account's behavioural baseline."
	},
	{
		step: "03",
		label: "Scoring",
		body: "Deviations become an anomaly score and a clear risk level."
	},
	{
		step: "04",
		label: "Decision",
		body: "Analysts investigate context and decide — with the evidence in one place."
	}
];
var PILLARS = [
	{
		icon: Radar,
		title: "See the outliers, not the noise",
		body: "Amount spikes, off-hours activity, location deviation and frequency bursts surface as ranked signals rather than raw rows."
	},
	{
		icon: Brain,
		title: "Built for a learning system",
		body: "The platform is designed around behavioural baselines and scoring, ready for a detection service to plug in when it is available."
	},
	{
		icon: ShieldCheck,
		title: "Investigation, not just alerts",
		body: "Every anomaly opens into a workspace linking the transaction, the account's pattern and related activity."
	}
];
function HomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicLayout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative isolate overflow-hidden pt-32 pb-24 sm:pt-40 lg:pt-44",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Horizon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "animate-rise text-xs font-medium uppercase tracking-[0.24em] text-primary-glow",
							children: "Transaction intelligence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-6 text-[2.75rem] font-light leading-[1.02] tracking-[-0.02em] text-balance sm:text-6xl lg:text-7xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block animate-rise-blur",
								style: { animationDelay: "60ms" },
								children: "Financial anomalies,"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-gradient animate-rise-blur",
								style: { animationDelay: "180ms" },
								children: "detected early."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-7 max-w-xl text-base leading-relaxed text-muted-foreground animate-rise sm:text-lg",
							style: { animationDelay: "300ms" },
							children: "Intelligent monitoring for unusual transaction behaviour — helping financial teams identify risk before it becomes a larger problem."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-col items-center justify-center gap-3 animate-rise sm:flex-row",
							style: { animationDelay: "400ms" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "hero",
								size: "pill-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/app",
									children: ["Explore Platform", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "quiet",
								size: "pill-lg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/how-it-works",
									children: "How it works"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVisual, { className: "mt-16 sm:mt-20" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "relative py-24 sm:py-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "The pipeline",
					title: "From raw transaction to analyst decision.",
					body: "One continuous path. Every stage is visible in the product, so a risk score is never a black box."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4",
					children: FLOW.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "group relative bg-background p-7 transition-colors duration-500 hover:bg-surface",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: f.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-lg font-medium",
								children: f.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: f.body
							}),
							i < FLOW.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
								"aria-hidden": true,
								className: "absolute top-7 right-6 size-4 text-muted-foreground/40 transition-transform duration-500 group-hover:translate-x-1 group-hover:text-primary-glow"
							})
						]
					}, f.step))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative py-24 sm:py-32",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-px hairline-x" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Why it matters",
					title: "Risk rarely announces itself.",
					body: "It shows up as a slightly wrong amount, at a slightly wrong time, from a slightly wrong place. The platform is designed to notice the slight."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4",
					children: PILLARS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel flex gap-5 p-6 sm:p-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface-raised text-primary-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "size-4.5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-medium",
							children: p.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: p.body
						})] })]
					}, p.title))
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden py-28 sm:py-36",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 horizon opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-5 text-center sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
						className: "mx-auto size-5 text-primary-glow",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 text-3xl font-light tracking-tight text-balance sm:text-5xl",
						children: "Step inside the monitoring platform."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-muted-foreground",
						children: "A working preview populated with representative data. No sign-up needed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "hero",
						size: "pill-lg",
						className: "mt-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/app",
							children: ["Enter Platform", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})
				]
			})]
		})
	] });
}
/** Cinematic horizon: a huge dark disc rising from below with a violet rim. */
function Horizon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"aria-hidden": true,
		className: "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-1/4 left-1/2 h-[90vh] w-[140vw] -translate-x-1/2 rounded-full blur-3xl animate-ambient",
				style: { background: "radial-gradient(closest-side, oklch(0.45 0.15 300 / 30%), transparent 70%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute left-1/2 top-[62%] h-[160vw] w-[160vw] -translate-x-1/2 rounded-full sm:top-[58%] sm:h-[130vw] sm:w-[130vw] lg:top-[56%]",
				style: {
					background: "oklch(0.115 0.02 282)",
					boxShadow: "0 -2px 0 0 oklch(0.85 0.12 320 / 55%), 0 -30px 90px -10px oklch(0.7 0.2 320 / 55%), 0 -120px 260px -40px oklch(0.6 0.2 300 / 45%), 0 -260px 500px -80px oklch(0.55 0.15 260 / 30%)"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 grid-fade opacity-50" })
		]
	});
}
//#endregion
export { HomePage as component };
