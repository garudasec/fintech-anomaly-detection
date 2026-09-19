import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as AvatarFallback$1, p as require_jsx_runtime, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { n as LogoMark, t as Logo } from "./Logo-DfsoyrxL.mjs";
import { C as Menu, G as ChartColumn, H as ChevronLeft, I as Command, M as Database, T as LayoutDashboard, V as ChevronRight, Z as ArrowLeftRight, g as Settings, h as ShieldAlert, j as Download, l as Terminal, q as Bell, v as Search, x as Radar } from "../_libs/lucide-react.mjs";
import { a as SheetTitle, n as SheetContent, t as Sheet } from "./sheet-DVngD8LG.mjs";
import { f as Outlet, g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TooltipTrigger, n as TooltipContent, r as TooltipProvider, t as Tooltip } from "./tooltip-BKptnkhZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-Bo6nu_99.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
var APP_NAV_ITEMS = [
	{
		to: "/app",
		label: "Overview",
		icon: LayoutDashboard,
		exact: true
	},
	{
		to: "/app/transactions",
		label: "Transactions",
		icon: ArrowLeftRight
	},
	{
		to: "/app/anomalies",
		label: "Anomalies",
		icon: Radar,
		badge: "12"
	},
	{
		to: "/app/analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		to: "/app/investigation",
		label: "Investigation",
		icon: ShieldAlert
	},
	{
		to: "/app/logs",
		label: "System Logs",
		icon: Terminal
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings
	}
];
function AppSidebar({ collapsed, onToggleCollapse, onNavigate, className }) {
	const location = useLocation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("relative flex h-full flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 ease-out select-none", collapsed ? "w-18" : "w-64", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed ? "justify-center" : "justify-between"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center gap-2.5 overflow-hidden focus:outline-none",
					title: "Return to Marketing Landing",
					children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
				delayDuration: 150,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					"aria-label": "Application",
					className: "flex-1 space-y-1.5 overflow-y-auto px-3 py-4 scrollbar-thin",
					children: APP_NAV_ITEMS.map((item) => {
						const isActive = item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);
						const linkContent = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							onClick: onNavigate,
							className: cn("group relative flex h-10 items-center rounded-xl font-medium text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", collapsed ? "justify-center px-0 w-11 mx-auto" : "gap-3.5 px-3.5", isActive ? "bg-[oklch(0.22_0.038_255)] text-foreground border border-[oklch(0.7_0.14_250/35%)] shadow-[0_0_24px_-6px_oklch(0.7_0.14_250/45%)] font-semibold" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"),
							children: [
								isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute rounded-full bg-blue transition-all", collapsed ? "left-0.5 top-2 bottom-2 w-1 shadow-[0_0_8px_var(--color-blue)]" : "left-1 top-2 bottom-2 w-1 shadow-[0_0_8px_var(--color-blue)]") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: cn("size-4.5 shrink-0 transition-colors", isActive ? "text-blue" : "text-muted-foreground group-hover:text-foreground") }),
								!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate flex-1 tracking-tight",
									children: item.label
								}),
								!collapsed && item.badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("ml-auto rounded-full px-2 py-0.5 font-mono text-[0.65rem] font-semibold tabular", isActive ? "bg-magenta/20 text-magenta border border-magenta/30" : "bg-surface-raised text-muted-foreground border border-border"),
									children: item.badge
								})
							]
						}, item.to);
						if (collapsed) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
							asChild: true,
							children: linkContent
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
							side: "right",
							sideOffset: 12,
							className: "font-medium text-xs",
							children: [item.label, item.badge && ` (${item.badge})`]
						})] }, item.to);
						return linkContent;
					})
				})
			}),
			!collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-3 mb-3 rounded-xl border border-border/80 bg-surface/60 p-3 text-xs backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-3 text-amber" }), "Mock Engine"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex size-1.5 rounded-full bg-amber animate-pulse" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 text-[0.72rem] leading-snug text-muted-foreground/90",
					children: "Frontend is running in simulated data mode. Real backend disconnected."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
					delayDuration: 150,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-8 place-items-center rounded-lg border border-border/80 bg-surface text-amber",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
						side: "right",
						sideOffset: 12,
						children: "Mock Engine (Simulated Data Mode)"
					})] })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-sidebar-border p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("flex items-center gap-3", collapsed ? "flex-col justify-center" : "justify-between"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex items-center gap-2.5", collapsed && "justify-center"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "size-8 border border-border-strong bg-surface-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-[oklch(0.24_0.03_282)] font-mono text-xs font-semibold text-primary-glow",
								children: "MO"
							})
						}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col text-left leading-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-medium text-foreground",
								children: "M. Okafor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 text-[0.65rem] text-muted-foreground font-mono",
								children: "Lead Analyst"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon-sm",
						onClick: onToggleCollapse,
						className: "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
						title: collapsed ? "Expand sidebar" : "Collapse sidebar",
						"aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
						children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
					})]
				})
			})
		]
	});
}
function AppTopBar({ onOpenMobileNav, title = "Overview", subtitle = "Financial Anomaly Monitoring" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 backdrop-blur-xl sm:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon-sm",
					onClick: onOpenMobileNav,
					className: "md:hidden text-muted-foreground hover:text-foreground",
					"aria-label": "Open mobile navigation",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-semibold text-sm tracking-tight text-foreground sm:text-base",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-muted-foreground/40 sm:inline",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-mono text-xs text-muted-foreground sm:inline",
							children: "Saturday, 19 Sep 2026"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "hidden text-[0.72rem] text-muted-foreground lg:block",
					children: subtitle
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden max-w-md flex-1 px-6 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {},
					className: "flex h-9 w-full items-center justify-between rounded-xl border border-input bg-surface/40 px-3.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:bg-surface hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Search transactions, accounts, merchants..." })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("kbd", {
						className: "pointer-events-none hidden items-center gap-0.5 rounded border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground lg:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-2.5" }), " K"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted-foreground sm:flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-lime" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground",
							children: "Ingestion Active"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "icon-sm",
						className: "relative text-muted-foreground hover:bg-surface hover:text-foreground",
						"aria-label": "3 Unresolved critical alerts",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute top-1.5 right-1.5 flex size-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-magenta opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-magenta" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "hidden items-center gap-2 rounded-lg text-xs font-medium sm:inline-flex",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" }), "Export"]
					})
				]
			})
		]
	});
}
function AppShell({ children, title, subtitle }) {
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:flex md:h-screen md:sticky md:top-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {
					collapsed,
					onToggleCollapse: () => setCollapsed((prev) => !prev)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileOpen,
				onOpenChange: setMobileOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-72 p-0 border-r border-sidebar-border bg-sidebar",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: "Application Navigation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {
						collapsed: false,
						onToggleCollapse: () => setMobileOpen(false),
						onNavigate: () => setMobileOpen(false),
						className: "w-full border-none"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppTopBar, {
					onOpenMobileNav: () => setMobileOpen(true),
					title,
					subtitle
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto max-w-7xl space-y-8 animate-enter-app",
						children
					})
				})]
			})
		]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
