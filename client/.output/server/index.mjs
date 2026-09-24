globalThis.__nitro_main__ = import.meta.url;
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx+unenv.mjs";
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/about-BPzyA8Q6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"195-v8hciyBUvXqnJhimqSlBT7fM1BE\"",
		"mtime": "2026-09-19T10:38:58.250Z",
		"size": 405,
		"path": "../public/assets/about-BPzyA8Q6.js"
	},
	"/assets/analytics-DXEoQZoV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e5e-AGcLOQIjyiKf5m96bwRHZN4e6no\"",
		"mtime": "2026-09-19T10:38:58.252Z",
		"size": 24158,
		"path": "../public/assets/analytics-DXEoQZoV.js"
	},
	"/assets/anomalies-BDdhGscj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3473-j3x/Fj9tG9U1OGtQwiMAL/5I1Iw\"",
		"mtime": "2026-09-19T10:38:58.252Z",
		"size": 13427,
		"path": "../public/assets/anomalies-BDdhGscj.js"
	},
	"/assets/activity-Ba6pAPun.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e0-58hJlfp72mswHJqB1AaMZhz7h7w\"",
		"mtime": "2026-09-19T10:38:58.251Z",
		"size": 224,
		"path": "../public/assets/activity-Ba6pAPun.js"
	},
	"/assets/arrow-up-right-C88_a2Rf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-WNadnwUauYS07W/QRgJtYxfZFkY\"",
		"mtime": "2026-09-19T10:38:58.254Z",
		"size": 157,
		"path": "../public/assets/arrow-up-right-C88_a2Rf.js"
	},
	"/assets/app-8coGhffe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"484a-t4d4naua9fHXK0Jxx0SyRk+SPBw\"",
		"mtime": "2026-09-19T10:38:58.254Z",
		"size": 18506,
		"path": "../public/assets/app-8coGhffe.js"
	},
	"/assets/app-5IgeKoOH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3363-SCFVLgXnjIXYQFHRNa6x3H3gVsQ\"",
		"mtime": "2026-09-19T10:38:58.253Z",
		"size": 13155,
		"path": "../public/assets/app-5IgeKoOH.js"
	},
	"/assets/bell-4izrpeEn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-QryGDxKT08YeSKSvlUfB0cq+cJc\"",
		"mtime": "2026-09-19T10:38:58.255Z",
		"size": 280,
		"path": "../public/assets/bell-4izrpeEn.js"
	},
	"/assets/badge-BZ8jSLof.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"300-pC+mPCmkR0JbLWBPL6/FHWxHwJE\"",
		"mtime": "2026-09-19T10:38:58.255Z",
		"size": 768,
		"path": "../public/assets/badge-BZ8jSLof.js"
	},
	"/assets/chevron-right-BqFwDmVk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17e-nO0dJWFK7YweK6iYPtTS3U9I5No\"",
		"mtime": "2026-09-19T10:38:58.257Z",
		"size": 382,
		"path": "../public/assets/chevron-right-BqFwDmVk.js"
	},
	"/assets/circle-check-kfynDcT2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-IXGAbyraDnGYFJU530og5WT+hgo\"",
		"mtime": "2026-09-19T10:38:58.258Z",
		"size": 168,
		"path": "../public/assets/circle-check-kfynDcT2.js"
	},
	"/assets/chart-column-3JZWUrL7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f1-wlSlvaapc1gi1tEDPNPTg7fWfb8\"",
		"mtime": "2026-09-19T10:38:58.257Z",
		"size": 241,
		"path": "../public/assets/chart-column-3JZWUrL7.js"
	},
	"/assets/button-BsCIRjkq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8581-kSsVKTmfxpv+spe5YehZ89zDhDw\"",
		"mtime": "2026-09-19T10:38:58.256Z",
		"size": 34177,
		"path": "../public/assets/button-BsCIRjkq.js"
	},
	"/assets/dist-CNKxv-Ys.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166d-FOasPZXQXh3n152fhQJcugD/cLM\"",
		"mtime": "2026-09-19T10:38:58.260Z",
		"size": 5741,
		"path": "../public/assets/dist-CNKxv-Ys.js"
	},
	"/assets/contact-MiSOWvUx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179-io1ozV+wLDT4NcusbYOc5DFl4xM\"",
		"mtime": "2026-09-19T10:38:58.258Z",
		"size": 377,
		"path": "../public/assets/contact-MiSOWvUx.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-19T07:57:50.650Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/dist-c3LZrRPj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"27f-+BA6JNKlVCp/lrAvNjHIZPFGDnk\"",
		"mtime": "2026-09-19T10:38:58.261Z",
		"size": 639,
		"path": "../public/assets/dist-c3LZrRPj.js"
	},
	"/assets/dist-CgxBORzP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f78-ZuVesTRfWQafAUBAiJIlLz6So94\"",
		"mtime": "2026-09-19T10:38:58.261Z",
		"size": 8056,
		"path": "../public/assets/dist-CgxBORzP.js"
	},
	"/assets/globe-bRNkshL_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e8-ATsht0ZqTkUlFXn0uY/ucpqcHHA\"",
		"mtime": "2026-09-19T10:38:58.262Z",
		"size": 232,
		"path": "../public/assets/globe-bRNkshL_.js"
	},
	"/assets/dist-5rH6VEwE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6571-0EODRCJRGAfr7NJvxPUbbQG+kWE\"",
		"mtime": "2026-09-19T10:38:58.260Z",
		"size": 25969,
		"path": "../public/assets/dist-5rH6VEwE.js"
	},
	"/assets/how-it-works-BEtzZkUk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"177-eV/sgXFVhGJpolg/UCDTs45pNzI\"",
		"mtime": "2026-09-19T10:38:58.263Z",
		"size": 375,
		"path": "../public/assets/how-it-works-BEtzZkUk.js"
	},
	"/assets/info-CLZc6Bwt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c2-TMAg2eZgJ9dMRvTM4E89EHF2P+0\"",
		"mtime": "2026-09-19T10:38:58.264Z",
		"size": 194,
		"path": "../public/assets/info-CLZc6Bwt.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-19T07:57:50.643Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/format-B1ibgpcL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"519c-3irlWSvNbay0fsMtA5bMqZOzWbw\"",
		"mtime": "2026-09-19T10:38:58.262Z",
		"size": 20892,
		"path": "../public/assets/format-B1ibgpcL.js"
	},
	"/assets/index-DUV5Cddc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55307-tG8AmCd+JERxHw/8NXYu6+yZFU4\"",
		"mtime": "2026-09-19T10:38:58.249Z",
		"size": 348935,
		"path": "../public/assets/index-DUV5Cddc.js"
	},
	"/assets/input-6Ycqshvf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26e-u/iaq6dl/sEnXZcruv84IOwBwsM\"",
		"mtime": "2026-09-19T10:38:58.265Z",
		"size": 622,
		"path": "../public/assets/input-6Ycqshvf.js"
	},
	"/assets/investigation-93LUIw7a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4087-Ao2xdQTp3JAzV5Gs6f3KWxGe+qg\"",
		"mtime": "2026-09-19T10:38:58.266Z",
		"size": 16519,
		"path": "../public/assets/investigation-93LUIw7a.js"
	},
	"/assets/jsx-runtime-D3jfb0Ew.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-Qh7NbnnF5pPMnr2eoPNshytf37o\"",
		"mtime": "2026-09-19T10:38:58.267Z",
		"size": 8901,
		"path": "../public/assets/jsx-runtime-D3jfb0Ew.js"
	},
	"/assets/logs-x59sOuQK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d26-SteBtbV00Z0dsdZu0kQnk7JlEWU\"",
		"mtime": "2026-09-19T10:38:58.269Z",
		"size": 11558,
		"path": "../public/assets/logs-x59sOuQK.js"
	},
	"/assets/link-BLZQXdTA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b49-zi+bJf7HU2KScvzCjth6xBhiWcs\"",
		"mtime": "2026-09-19T10:38:58.268Z",
		"size": 23369,
		"path": "../public/assets/link-BLZQXdTA.js"
	},
	"/assets/map-pin-CODM5czP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-orATLtcNToGI5UQCGSBsN7XMfPI\"",
		"mtime": "2026-09-19T10:38:58.269Z",
		"size": 249,
		"path": "../public/assets/map-pin-CODM5czP.js"
	},
	"/assets/platform-Bzv9-nMc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"195-A7dvYjPqfJ4bAoNdMhYnNT3/6tc\"",
		"mtime": "2026-09-19T10:38:58.271Z",
		"size": 405,
		"path": "../public/assets/platform-Bzv9-nMc.js"
	},
	"/assets/menu-DunFafVf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5b1-Up6X6+FYC24lF3j0BK70IaI8NwY\"",
		"mtime": "2026-09-19T10:38:58.270Z",
		"size": 1457,
		"path": "../public/assets/menu-DunFafVf.js"
	},
	"/assets/PublicLayout-X4NW3uhI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b6-tVLI9yLZE2W+rTamwIEdVYgSOOw\"",
		"mtime": "2026-09-19T10:38:58.249Z",
		"size": 6070,
		"path": "../public/assets/PublicLayout-X4NW3uhI.js"
	},
	"/assets/radar-CEKHU5eb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec-jP56L88ABV28wP2GvgELaTDyLL8\"",
		"mtime": "2026-09-19T10:38:58.274Z",
		"size": 492,
		"path": "../public/assets/radar-CEKHU5eb.js"
	},
	"/assets/react-dom-CwdmouWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f17-QemzpnA5Tqxk5YG3QZZamATuNCY\"",
		"mtime": "2026-09-19T10:38:58.277Z",
		"size": 3863,
		"path": "../public/assets/react-dom-CwdmouWZ.js"
	},
	"/assets/routes-CXLsEgPl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b36-MUCtEot8rfjsJ9NzHMOxtxKIT08\"",
		"mtime": "2026-09-19T10:38:58.278Z",
		"size": 15158,
		"path": "../public/assets/routes-CXLsEgPl.js"
	},
	"/assets/search-Dcz30F0l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-7iXAPoKdoBw5AOIiOQiDqLSgbTg\"",
		"mtime": "2026-09-19T10:38:58.281Z",
		"size": 164,
		"path": "../public/assets/search-Dcz30F0l.js"
	},
	"/assets/separator-BDT2EDXS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f5a-wf+hJg8Q/Jtso0oZBw4U4yqQ7KY\"",
		"mtime": "2026-09-19T10:38:58.284Z",
		"size": 8026,
		"path": "../public/assets/separator-BDT2EDXS.js"
	},
	"/assets/select-BbkgytlL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5773-RBC8MTLgcdLE/UCpVQUfROCnykU\"",
		"mtime": "2026-09-19T10:38:58.283Z",
		"size": 22387,
		"path": "../public/assets/select-BbkgytlL.js"
	},
	"/assets/shield-check-D4AU3u3M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"136-hfsppR1leZVgdPhi1U2TcdMe/ug\"",
		"mtime": "2026-09-19T10:38:58.286Z",
		"size": 310,
		"path": "../public/assets/shield-check-D4AU3u3M.js"
	},
	"/assets/sheet-Bus6fzgh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5cea-wMmLn2Oqrj9wMZMyEGnZxjIKycA\"",
		"mtime": "2026-09-19T10:38:58.285Z",
		"size": 23786,
		"path": "../public/assets/sheet-Bus6fzgh.js"
	},
	"/assets/shield-fzH4g-K6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-+RnVSJ6zQklElcsWOURo+RZJWXU\"",
		"mtime": "2026-09-19T10:38:58.287Z",
		"size": 262,
		"path": "../public/assets/shield-fzH4g-K6.js"
	},
	"/assets/terminal-CwA0ztqg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98-aRg5ioME9JqIdGOGM+Xm5b5NIoI\"",
		"mtime": "2026-09-19T10:38:58.294Z",
		"size": 152,
		"path": "../public/assets/terminal-CwA0ztqg.js"
	},
	"/assets/settings-CkNoAadM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6754-vILGXkW2F6xcPRM2e7ytD8+BVxE\"",
		"mtime": "2026-09-19T10:38:58.284Z",
		"size": 26452,
		"path": "../public/assets/settings-CkNoAadM.js"
	},
	"/assets/tooltip-BXV2gQSN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2380-tlt+qkG0GjOVlX/y2+r2gY12OUI\"",
		"mtime": "2026-09-19T10:38:58.296Z",
		"size": 9088,
		"path": "../public/assets/tooltip-BXV2gQSN.js"
	},
	"/assets/styles-PTUnMjOE.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1cc9f-mgeQf+7vhmsc/HvzbbXLX4FgXj8\"",
		"mtime": "2026-09-19T10:38:58.308Z",
		"size": 117919,
		"path": "../public/assets/styles-PTUnMjOE.css"
	},
	"/assets/RiskDistributionCard-DhTbIjhK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e1b5-wDmIVhafJ2bzXiw2ZlMSjXDVo9U\"",
		"mtime": "2026-09-19T10:38:58.250Z",
		"size": 385461,
		"path": "../public/assets/RiskDistributionCard-DhTbIjhK.js"
	},
	"/assets/transactions-BIPZ86Zx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bde-Qb37vBCrRSnnSofrZ2RL0WSgQhk\"",
		"mtime": "2026-09-19T10:38:58.302Z",
		"size": 15326,
		"path": "../public/assets/transactions-BIPZ86Zx.js"
	},
	"/assets/trending-up-CB9KyQU3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-rUnBCQKMH0bqkW969/FdQx1tbrA\"",
		"mtime": "2026-09-19T10:38:58.302Z",
		"size": 165,
		"path": "../public/assets/trending-up-CB9KyQU3.js"
	},
	"/assets/triangle-alert-rSbHCOlU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff-1sHR36Ey74Lzbkz9jzjzwtRZpyk\"",
		"mtime": "2026-09-19T10:38:58.306Z",
		"size": 255,
		"path": "../public/assets/triangle-alert-rSbHCOlU.js"
	},
	"/assets/zap-CJ6gNdwp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fc-dFez206DwUQBJNRDy4LejHDWgbA\"",
		"mtime": "2026-09-19T10:38:58.307Z",
		"size": 252,
		"path": "../public/assets/zap-CJ6gNdwp.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_P49flL = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_P49flL
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
