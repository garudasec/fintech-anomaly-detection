import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as cn } from "./button-BZefOWLM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-DfsoyrxL.js
var import_jsx_runtime = require_jsx_runtime();
/** Brand mark: a signal line breaking out of a steady band — "the anomaly". */
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": true,
		className: cn("relative grid size-8 shrink-0 place-items-center rounded-lg border border-border-strong bg-surface-raised shadow-glow-primary", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 24 24",
			className: "size-5",
			fill: "none",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M3 14h4l2-6 3 10 2.5-8 1.5 4h5",
					stroke: "url(#logo-g)",
					strokeWidth: "1.8",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "18",
					r: "1.4",
					fill: "var(--magenta)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: "logo-g",
					x1: "3",
					y1: "12",
					x2: "21",
					y2: "12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "var(--primary-glow)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "var(--blue)"
					})]
				}) })
			]
		})
	});
}
function Logo({ className, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex flex-col leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[0.62rem] font-medium uppercase tracking-[0.22em] text-muted-foreground",
				children: "Fintech"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 text-sm font-semibold tracking-tight text-foreground",
				children: "Anomaly Detection"
			})]
		})]
	});
}
//#endregion
export { LogoMark as n, Logo as t };
