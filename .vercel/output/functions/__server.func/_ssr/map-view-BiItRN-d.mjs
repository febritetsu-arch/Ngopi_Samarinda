import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-view-BiItRN-d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CafeMap = (0, import_react.lazy)(() => import("./cafe-map-DC9eGTbD.mjs").then((mod) => ({ default: mod.CafeMap })));
function Fallback() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center bg-paper-2 px-6 text-center text-sm text-muted",
		children: "Peta Samarinda sedang dimuat"
	});
}
function MapView({ cafes, selected, onSelect }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
		fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fallback, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CafeMap, {
			cafes,
			selected,
			onSelect
		})
	});
}
//#endregion
export { MapView as t };
