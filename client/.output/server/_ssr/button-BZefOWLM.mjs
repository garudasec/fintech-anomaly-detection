import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { l as Slot, p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BZefOWLM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-[color,background-color,border-color,box-shadow,transform] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-border-strong bg-transparent text-foreground hover:bg-foreground/5 hover:border-foreground/20",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			ghost: "text-muted-foreground hover:bg-foreground/6 hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline",
			/** Pill CTA used on the public site: dark core with a soft violet halo. */
			pill: "rounded-full border border-foreground/12 bg-foreground/6 text-foreground backdrop-blur-md hover:border-primary-glow/50 hover:bg-foreground/10 hover:shadow-glow-primary",
			/** Primary hero CTA: solid near-black with violet ring glow. */
			hero: "rounded-full border border-primary/50 bg-[oklch(0.16_0.03_285)] text-foreground shadow-glow-primary hover:border-primary-glow hover:bg-[oklch(0.2_0.04_290)] hover:-translate-y-px",
			/** Quiet text CTA. */
			quiet: "rounded-full text-muted-foreground hover:text-foreground"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9",
			"icon-sm": "h-8 w-8",
			pill: "h-10 px-5 text-[0.82rem]",
			"pill-lg": "h-12 px-7 text-[0.92rem]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { cn as n, Button as t };
