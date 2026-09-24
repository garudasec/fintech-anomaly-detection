import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { _ as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$13 } from "./investigation-DFcCOGvX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C6PULHNN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-PTUnMjOE.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "Fintech Anomaly Detection"
			},
			{
				name: "theme-color",
				content: "#0d0c17"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Geist:wght@300..700&family=Geist+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-screen bg-background text-foreground antialiased",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})]
		})]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$11 = () => import("./routes-C9YS2r1B.mjs");
var TITLE = "Fintech Anomaly Detection — Financial anomalies, detected early";
var DESCRIPTION = "Intelligent monitoring for unusual transaction behaviour. Score risk, surface anomalies and investigate before small signals become large problems.";
var Route$11 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: TITLE },
		{
			name: "description",
			content: DESCRIPTION
		},
		{
			property: "og:title",
			content: TITLE
		},
		{
			property: "og:description",
			content: DESCRIPTION
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
/** Cinematic horizon: a huge dark disc rising from below with a violet rim. */
var $$splitComponentImporter$10 = () => import("./about-CkeHsUc7.mjs");
var Route$10 = createFileRoute("/about")({
	head: () => ({ meta: [{ title: "About — FinTech Anomaly Detection" }, {
		name: "description",
		content: "Building next-generation behavioral monitoring tools for fintech security."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./app-Bo6nu_99.mjs");
var Route$9 = createFileRoute("/app")({
	head: () => ({ meta: [{ title: "FinTech Anomaly Detection — Application Workspace" }, {
		name: "description",
		content: "Real-time financial intelligence, transaction baseline monitoring, and anomaly detection platform."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./contact-DcdKF5q7.mjs");
var Route$8 = createFileRoute("/contact")({
	head: () => ({ meta: [{ title: "Contact — FinTech Anomaly Detection" }, {
		name: "description",
		content: "Get in touch with the FinTech Anomaly Detection team."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./how-it-works-OqujRBFY.mjs");
var Route$7 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [{ title: "How It Works — FinTech Anomaly Detection" }, {
		name: "description",
		content: "From stream ingestion to analyst investigation and decision."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./platform-C2jXGri2.mjs");
var Route$6 = createFileRoute("/platform")({
	head: () => ({ meta: [{ title: "Platform — FinTech Anomaly Detection" }, {
		name: "description",
		content: "Architecture and capabilities of the financial intelligence platform."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./app-D5WtaJjG.mjs");
var Route$5 = createFileRoute("/app/")({
	head: () => ({ meta: [{ title: "Overview — FinTech Anomaly Detection" }, {
		name: "description",
		content: "High-level transaction monitoring overview, risk scoring distributions, and recent detected anomalies."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./analytics-Cb6qZVlC.mjs");
var Route$4 = createFileRoute("/app/analytics")({
	head: () => ({ meta: [{ title: "Analytics — FinTech Anomaly Detection" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./anomalies-D0V5_ful.mjs");
var Route$3 = createFileRoute("/app/anomalies")({
	head: () => ({ meta: [{ title: "Anomalies Triage — FinTech Anomaly Detection" }, {
		name: "description",
		content: "Prioritized anomaly triage queue with severity and status filters for investigation workflow."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./logs-j-EDwcy2.mjs");
var Route$2 = createFileRoute("/app/logs")({
	head: () => ({ meta: [{ title: "System Logs — FinTech Anomaly Detection" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./settings-25A4yJcN.mjs");
var Route$1 = createFileRoute("/app/settings")({
	head: () => ({ meta: [{ title: "Settings — FinTech Anomaly Detection" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./transactions-Bl9GbhbX.mjs");
var Route = createFileRoute("/app/transactions")({
	head: () => ({ meta: [{ title: "Transactions — FinTech Anomaly Detection" }, {
		name: "description",
		content: "Monitor and filter all financial transactions with risk scoring and anomaly detection signals."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var AboutRoute = Route$10.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$12
});
var AppRoute = Route$9.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$12
});
var ContactRoute = Route$8.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$12
});
var HowItWorksRoute = Route$7.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$12
});
var PlatformRoute = Route$6.update({
	id: "/platform",
	path: "/platform",
	getParentRoute: () => Route$12
});
var AppIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppRouteChildren = {
	AppAnalyticsRoute: Route$4.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => AppRoute
	}),
	AppAnomaliesRoute: Route$3.update({
		id: "/anomalies",
		path: "/anomalies",
		getParentRoute: () => AppRoute
	}),
	AppInvestigationRoute: Route$13.update({
		id: "/investigation",
		path: "/investigation",
		getParentRoute: () => AppRoute
	}),
	AppLogsRoute: Route$2.update({
		id: "/logs",
		path: "/logs",
		getParentRoute: () => AppRoute
	}),
	AppSettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AppRoute
	}),
	AppTransactionsRoute: Route.update({
		id: "/transactions",
		path: "/transactions",
		getParentRoute: () => AppRoute
	}),
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	ContactRoute,
	HowItWorksRoute,
	PlatformRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
