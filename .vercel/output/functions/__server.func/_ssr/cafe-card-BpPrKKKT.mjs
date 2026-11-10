import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as prices, d as formatHours, w as moods } from "./router-ZAoaVbde.mjs";
import { t as SaveButton } from "./save-button-D6_ZHBkl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cafe-card-BpPrKKKT.js
var import_jsx_runtime = require_jsx_runtime();
var crowdLabel = {
	sepi: "Sepi",
	sedang: "Sedang",
	ramai: "Ramai"
};
function CafeCard({ cafe, status, priority = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/kafe/$slug",
					params: { slug: cafe.slug },
					className: "block overflow-hidden rounded-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cafe.image,
							alt: cafe.imageAlt,
							width: 1200,
							height: 1600,
							loading: priority ? "eager" : "lazy",
							decoding: "async",
							className: "photo-zoom aspect-[3/4] w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-2/5 scrim" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-4 text-paper",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-paper/80",
								children: cafe.district
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 text-3xl text-paper",
								children: cafe.name
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					slug: cafe.slug,
					name: cafe.name,
					className: "absolute top-3 right-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: cafe.moods.map((id) => moods[id].label).join(" · ")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "shrink-0 text-sm font-medium",
					children: prices[cafe.price].range
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-ink-soft",
				children: [
					status ? status.open ? "Buka" : "Tutup" : "Jam",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [
							" · ",
							formatHours(cafe),
							" WITA"
						]
					}),
					status?.open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted",
						children: [" · ", crowdLabel[status.crowd]]
					}) : null
				]
			})
		]
	});
}
//#endregion
export { CafeCard as t };
