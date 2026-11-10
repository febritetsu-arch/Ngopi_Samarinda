import { C as require_jsx_runtime, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as moodOrder, d as formatHours, h as useNow, m as statusAt, o as filterCafes, r as Route$3, v as cn, w as moods } from "./router-ZAoaVbde.mjs";
import { t as MapView } from "./map-view-BiItRN-d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/peta-CXUZ5Mr0.js
var import_jsx_runtime = require_jsx_runtime();
function Peta() {
	const search = Route$3.useSearch();
	const navigate = useNavigate();
	const now = useNow();
	const discover = { mood: search.mood };
	const list = filterCafes(discover, now);
	const selected = list.some((cafe) => cafe.slug === search.kafe) ? search.kafe : void 0;
	const active = list.find((cafe) => cafe.slug === selected);
	function setMood(mood) {
		navigate({
			to: "/peta",
			search: {
				mood,
				kafe: void 0
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 top-16 bottom-16 z-0 flex flex-col lg:bottom-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2 overflow-x-auto border-b border-line bg-paper px-4 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": !search.mood,
				onClick: () => setMood(void 0),
				className: cn("h-11 shrink-0 rounded-full px-4 text-sm", !search.mood ? "bg-ink text-paper" : "text-muted"),
				children: "Semua"
			}), moodOrder.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-pressed": search.mood === id,
				onClick: () => setMood(search.mood === id ? void 0 : id),
				className: cn("h-11 shrink-0 rounded-full px-4 text-sm", search.mood === id ? "bg-ink text-paper" : "text-ink"),
				children: moods[id].label
			}, id))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 lg:grid-cols-[22rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden overflow-y-auto border-r border-line lg:block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "px-5 pt-5 text-sm text-muted",
					children: [list.length, " titik contoh"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: list.map((cafe) => {
					const on = cafe.slug === selected;
					const state = now ? statusAt(cafe, now) : null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => navigate({
							to: "/peta",
							search: {
								...search,
								kafe: cafe.slug
							}
						}),
						className: cn("w-full border-b border-line px-5 py-4 text-left", on ? "bg-paper-2" : "bg-paper"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-2xl",
							children: cafe.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-sm text-muted",
							children: [cafe.neighborhood, state ? ` · ${state.open ? "Buka" : "Tutup"}` : ` · ${formatHours(cafe)}`]
						})]
					}) }, cafe.slug);
				}) })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
						cafes: list,
						selected,
						onSelect: (slug) => navigate({
							to: "/peta",
							search: {
								...search,
								kafe: slug
							}
						})
					}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/kafe/$slug",
						params: { slug: active.slug },
						className: "absolute right-4 bottom-4 z-10 hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm text-paper lg:inline-flex",
						children: ["Lihat ", active.name]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-line bg-paper lg:hidden",
					children: [active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/kafe/$slug",
						params: { slug: active.slug },
						className: "flex items-center gap-3 px-4 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: active.image,
								alt: "",
								width: 1200,
								height: 1600,
								className: "size-14 rounded-sm object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-display text-xl",
									children: active.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm text-muted",
									children: active.district
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Lihat"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-4 pt-3 text-sm text-muted",
						children: "Ketuk nama atau titik untuk memilih kafe."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-row px-4 py-3",
						children: list.map((cafe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": cafe.slug === selected,
							onClick: () => navigate({
								to: "/peta",
								search: {
									...search,
									kafe: cafe.slug
								}
							}),
							className: cn("h-11 shrink-0 rounded-full border px-4 text-sm", cafe.slug === selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"),
							children: cafe.name
						}, cafe.slug))
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { Peta as component };
