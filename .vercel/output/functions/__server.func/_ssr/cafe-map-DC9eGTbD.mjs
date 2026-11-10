import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
import { a as useMap, i as MapContainer, n as Popup, r as Marker, t as TileLayer } from "../_libs/react-leaflet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cafe-map-DC9eGTbD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
function makePin(active) {
	return import_leaflet_src.default.divIcon({
		className: "cafe-pin",
		html: `<span class="${active ? "pin pin-on" : "pin"}"></span>`,
		iconSize: [28, 28],
		iconAnchor: [14, 14],
		popupAnchor: [0, -16]
	});
}
function Camera({ cafes, selected }) {
	const map = useMap();
	const signature = `${selected?.slug ?? "_"}|${cafes.map((cafe) => cafe.slug).join(",")}`;
	(0, import_react.useEffect)(() => {
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const id = window.setTimeout(() => map.invalidateSize(), 80);
		if (selected) map.flyTo([selected.lat, selected.lng], 15, { duration: reduce ? 0 : .7 });
		else if (cafes.length) {
			const bounds = import_leaflet_src.default.latLngBounds(cafes.map((cafe) => [cafe.lat, cafe.lng]));
			map.fitBounds(bounds, {
				padding: [36, 36],
				animate: !reduce
			});
		}
		return () => window.clearTimeout(id);
	}, [map, signature]);
	return null;
}
function CafeMap({ cafes, selected, onSelect }) {
	const active = cafes.find((cafe) => cafe.slug === selected);
	const idle = (0, import_react.useMemo)(() => makePin(false), []);
	const hot = (0, import_react.useMemo)(() => makePin(true), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
		center: [-.5, 117.15],
		zoom: 12,
		className: "h-full w-full",
		scrollWheelZoom: true,
		zoomControl: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, {
				attribution: "© OpenStreetMap © CARTO",
				url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {
				cafes,
				selected: active
			}),
			cafes.map((cafe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
				position: [cafe.lat, cafe.lng],
				icon: cafe.slug === selected ? hot : idle,
				eventHandlers: { click: () => onSelect(cafe.slug) },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popup, {
					className: "cafe-popup",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-olive",
							children: cafe.district
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-ink",
							children: cafe.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/kafe/$slug",
							params: { slug: cafe.slug },
							className: "mt-2 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4",
							children: "Lihat kafe"
						})
					]
				})
			}, cafe.slug))
		]
	});
}
//#endregion
export { CafeMap };
