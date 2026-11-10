import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as moodOrder, T as prices, b as facilities, c as searchActive, h as useNow, i as Route$4, l as toggleFacility, m as statusAt, o as filterCafes, s as readDiscover, v as cn, w as moods, y as districts } from "./router-ZAoaVbde.mjs";
import { t as CafeCard } from "./cafe-card-BpPrKKKT.mjs";
import { t as FooterNote } from "./footer-note-CzuRFY9I.mjs";
import { t as SearchForm } from "./search-form-Dnmr2du6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jelajah-CEpDnFAx.js
var import_jsx_runtime = require_jsx_runtime();
var sorts = [
	{
		id: "kurasi",
		label: "Urutan kurasi"
	},
	{
		id: "harga",
		label: "Harga"
	},
	{
		id: "sepi",
		label: "Paling sepi"
	}
];
function Chip({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: cn("press h-11 shrink-0 rounded-full border px-4 text-sm", pressed ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink"),
		children
	});
}
function Filters({ search }) {
	const navigate = useNavigate();
	function apply(patch) {
		const next = readDiscover({
			...search,
			...patch
		});
		navigate({
			to: "/jelajah",
			search: next
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-row",
				"aria-label": "Suasana",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: !search.mood,
					onClick: () => apply({ mood: void 0 }),
					children: "Semua suasana"
				}), moodOrder.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: search.mood === id,
					onClick: () => apply({ mood: search.mood === id ? void 0 : id }),
					children: moods[id].label
				}, id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-row",
				"aria-label": "Kecamatan",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: !search.district,
					onClick: () => apply({ district: void 0 }),
					children: "Semua kecamatan"
				}), districts.map((district) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: search.district === district,
					onClick: () => apply({ district: search.district === district ? void 0 : district }),
					children: district
				}, district))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [Object.keys(prices).map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: search.price === id,
					onClick: () => apply({ price: search.price === id ? void 0 : id }),
					children: `${prices[id].label} · ${prices[id].range}`
				}, id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: search.open === "1",
					onClick: () => apply({ open: search.open === "1" ? void 0 : "1" }),
					children: "Buka sekarang"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				"aria-label": "Fasilitas",
				children: Object.keys(facilities).map((id) => {
					const on = (search.facility ?? "").split(",").includes(id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: on,
						onClick: () => apply({ facility: toggleFacility(search.facility, id) }),
						children: facilities[id].label
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3",
				children: [sorts.map((item) => {
					const on = (search.sort ?? "kurasi") === item.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": on,
						onClick: () => apply({ sort: item.id === "kurasi" ? void 0 : item.id }),
						className: cn("min-h-11 text-sm", on ? "font-medium text-ink" : "text-muted"),
						children: item.label
					}, item.id);
				}), searchActive(search) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => navigate({
						to: "/jelajah",
						search: {}
					}),
					className: "min-h-11 text-sm text-terracotta",
					children: "Atur ulang"
				}) : null]
			})
		]
	});
}
function Jelajah() {
	const search = Route$4.useSearch();
	const now = useNow();
	const list = filterCafes(search, now);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Jelajah"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-title",
					children: "Kafe contoh di Samarinda"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-1 shrink-0 text-sm tabular-nums text-muted",
					children: [list.length, " kafe"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-ink-soft",
				children: "Saring menurut suasana, kecamatan, harga, fasilitas, dan jam buka. Semua angka di halaman ini adalah data contoh."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, {
					initial: search.q ?? "",
					keep: search
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, { search }),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 max-w-md border-t border-line pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: "Tidak ada yang cocok"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "Longgarkan satu saringan, atau kembali ke semua suasana. Katalog contoh ini memang sengaja kecil."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
				children: list.map((cafe, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CafeCard, {
					cafe,
					status: now ? statusAt(cafe, now) : null,
					priority: index < 2
				}, cafe.slug))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNote, {})] });
}
//#endregion
export { Jelajah as component };
