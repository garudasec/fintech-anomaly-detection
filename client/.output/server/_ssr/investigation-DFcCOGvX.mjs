import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/investigation-DFcCOGvX.js
var $$splitComponentImporter = () => import("./investigation-DaVyxtwj.mjs");
var Route = createFileRoute("/app/investigation")({
	validateSearch: (search) => ({ id: typeof search["id"] === "string" ? search["id"] : void 0 }),
	head: () => ({ meta: [{ title: "Investigation Workspace — FinTech Anomaly Detection" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
