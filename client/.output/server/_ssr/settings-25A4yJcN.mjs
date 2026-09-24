import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, t as Button } from "./button-BZefOWLM.mjs";
import { E as KeyRound, F as Copy, R as CircleCheck, d as SlidersVertical, p as Shield, q as Bell, r as User, y as Save } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-Bw3v75gd.mjs";
import { t as Separator } from "./separator-B-d4p3zf.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-25A4yJcN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function SettingsPage() {
	const [activeTab, setActiveTab] = (0, import_react.useState)("profile");
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)({
		name: "Alex Morgan",
		email: "a.morgan@fintech-sentinel.io",
		role: "Lead Risk Analyst",
		timezone: "UTC (Coordinated Universal Time)"
	});
	const [detection, setDetection] = (0, import_react.useState)({
		criticalScore: "0.85",
		highRiskScore: "0.65",
		mediumRiskScore: "0.40",
		autoFlagCritical: true,
		velocityCheckEnabled: true,
		modelSensitivity: "standard"
	});
	const [notifications, setNotifications] = (0, import_react.useState)({
		emailAlerts: true,
		slackEnabled: true,
		slackWebhook: "https://hooks.slack.com/services/T00000/B00000/XXXXXX",
		smsAlerts: false,
		smsPhone: "+1 (555) 019-2834",
		dailyDigest: true
	});
	const [security, setSecurity] = (0, import_react.useState)({
		sessionTimeout: "30m",
		enforce2FA: true,
		apiKey: "sk_live_9948271a_fintech_anom_7741",
		copiedKey: false
	});
	const showSaveSuccess = (sectionName) => {
		setToastMessage(`${sectionName} saved successfully ✓`);
		setTimeout(() => setToastMessage(null), 3e3);
	};
	const copyApiKey = () => {
		navigator.clipboard?.writeText(security.apiKey);
		setSecurity((prev) => ({
			...prev,
			copiedKey: true
		}));
		setTimeout(() => setSecurity((prev) => ({
			...prev,
			copiedKey: false
		})), 2e3);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-bold tracking-tight text-foreground sm:text-2xl",
					children: "Platform & Detection Settings"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border bg-surface-raised px-2.5 py-0.5 font-mono text-[0.68rem] text-muted-foreground font-medium",
					children: "System Config"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground sm:text-sm",
				children: "Configure risk thresholds, scoring parameters, alert webhooks, and security authentication parameters."
			})] }), toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 rounded-lg border border-lime/40 bg-lime/10 px-3.5 py-2 font-mono text-xs text-lime shadow-lg animate-in fade-in slide-in-from-top-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-surface p-1 border border-border rounded-xl font-mono text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "profile",
							className: "gap-2 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Profile & Account" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "detection",
							className: "gap-2 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Risk Thresholds" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "notifications",
							className: "gap-2 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Alert Channels" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "security",
							className: "gap-2 font-mono text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security & API Keys" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "profile",
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-6 space-y-6 max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-foreground",
									children: "Analyst Profile"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Your operator identity used across investigation audit trails and disposition logs."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "name",
											className: "text-xs",
											children: "Full Display Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "name",
											value: profile.name,
											onChange: (e) => setProfile({
												...profile,
												name: e.target.value
											}),
											className: "text-xs"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "email",
											className: "text-xs",
											children: "Email Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											value: profile.email,
											onChange: (e) => setProfile({
												...profile,
												email: e.target.value
											}),
											className: "text-xs"
										})]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "role",
											className: "text-xs",
											children: "Assigned Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "role",
											value: profile.role,
											disabled: true,
											className: "text-xs bg-surface/40"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "tz",
											className: "text-xs",
											children: "Default Timezone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "tz",
											value: profile.timezone,
											onChange: (e) => setProfile({
												...profile,
												timezone: e.target.value
											}),
											className: "text-xs"
										})]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => showSaveSuccess("Profile settings"),
									className: "gap-2 font-mono text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Profile Changes" })]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "detection",
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-6 space-y-6 max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-foreground",
									children: "Scoring & Threshold Parameters"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Set sensitivity cutoffs for automated risk tagging and alerting triggers."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-6 font-mono text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 gap-4 sm:grid-cols-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "crit",
													className: "text-xs text-destructive",
													children: "Critical Severity Cutoff (0–1)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "crit",
													type: "number",
													step: "0.05",
													min: "0",
													max: "1",
													value: detection.criticalScore,
													onChange: (e) => setDetection({
														...detection,
														criticalScore: e.target.value
													}),
													className: "text-xs border-destructive/30"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "high",
													className: "text-xs text-amber",
													children: "High Risk Cutoff (0–1)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "high",
													type: "number",
													step: "0.05",
													min: "0",
													max: "1",
													value: detection.highRiskScore,
													onChange: (e) => setDetection({
														...detection,
														highRiskScore: e.target.value
													}),
													className: "text-xs border-amber/30"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "med",
													className: "text-xs text-blue",
													children: "Medium Risk Cutoff (0–1)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "med",
													type: "number",
													step: "0.05",
													min: "0",
													max: "1",
													value: detection.mediumRiskScore,
													onChange: (e) => setDetection({
														...detection,
														mediumRiskScore: e.target.value
													}),
													className: "text-xs border-blue/30"
												})]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Auto-Flag Critical Anomalies"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[0.72rem] text-muted-foreground",
												children: [
													"Automatically mark transactions with score ≥ ",
													detection.criticalScore,
													" as Flagged."
												]
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: detection.autoFlagCritical,
												onCheckedChange: (checked) => setDetection({
													...detection,
													autoFlagCritical: checked
												})
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Velocity Limit Rate Checks"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.72rem] text-muted-foreground",
												children: "Evaluate 5-minute transaction frequency windows per card/user."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: detection.velocityCheckEnabled,
												onCheckedChange: (checked) => setDetection({
													...detection,
													velocityCheckEnabled: checked
												})
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => showSaveSuccess("Threshold settings"),
									className: "gap-2 font-mono text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Risk Parameters" })]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "notifications",
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-6 space-y-6 max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-foreground",
									children: "Notification Channels & Webhooks"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Manage automated incident alerts delivered to security operations channels."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-6 font-mono text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Email Notifications"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.72rem] text-muted-foreground",
												children: "Receive immediate emails for critical severity anomaly triggers."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: notifications.emailAlerts,
												onCheckedChange: (checked) => setNotifications({
													...notifications,
													emailAlerts: checked
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground",
													children: "Slack Security Webhook"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[0.72rem] text-muted-foreground",
													children: "Post real-time triage cards to your team's Slack incident channel."
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: notifications.slackEnabled,
													onCheckedChange: (checked) => setNotifications({
														...notifications,
														slackEnabled: checked
													})
												})]
											}), notifications.slackEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1 pl-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "slackUrl",
													className: "text-[0.72rem] text-muted-foreground",
													children: "Slack Webhook Endpoint URL"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "slackUrl",
													value: notifications.slackWebhook,
													onChange: (e) => setNotifications({
														...notifications,
														slackWebhook: e.target.value
													}),
													className: "text-xs"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Daily Digest Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.72rem] text-muted-foreground",
												children: "Summary report of total processed volume and anomaly counts sent every 24h."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: notifications.dailyDigest,
												onCheckedChange: (checked) => setNotifications({
													...notifications,
													dailyDigest: checked
												})
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => showSaveSuccess("Alert notification settings"),
									className: "gap-2 font-mono text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Alert Preferences" })]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "security",
					className: "space-y-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel-raised p-6 space-y-6 max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-base font-semibold text-foreground",
									children: "Security & API Access Keys"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Session controls, multi-factor authentication, and API credentials for backend ingestion."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/60" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-6 font-mono text-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground",
												children: "Enforce Multi-Factor Auth (2FA)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[0.72rem] text-muted-foreground",
												children: "Require hardware key or TOTP authenticator code for analyst access."
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: security.enforce2FA,
												onCheckedChange: (checked) => setSecurity({
													...security,
													enforce2FA: checked
												})
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground",
													children: "Active Ingestion API Key"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[0.72rem] text-muted-foreground",
													children: "Used by event stream producers to send raw transactions to the detection pipeline."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 pt-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														readOnly: true,
														value: security.apiKey,
														type: "password",
														className: "font-mono text-xs bg-surface/50"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
														size: "sm",
														variant: "outline",
														onClick: copyApiKey,
														className: "h-9 gap-1.5 font-mono text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: security.copiedKey ? "Copied!" : "Copy" })]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/70 bg-surface/30 p-4 space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-foreground",
													children: "Backend Service Connection"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[0.72rem] text-muted-foreground leading-relaxed",
												children: [
													"Production ingestion pipeline connects to MongoDB cluster ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "text-foreground",
														children: "mongodb+srv://prod-anomaly-db"
													}),
													". ML scoring server listening on port 8000."
												]
											})]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "pt-4 flex justify-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									onClick: () => showSaveSuccess("Security settings"),
									className: "gap-2 font-mono text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Security Configuration" })]
								})
							})
						]
					})
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
