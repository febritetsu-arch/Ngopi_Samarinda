import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as heroImage, _ as cafes, a as useWishlist, h as useNow, m as statusAt } from "./router-ZAoaVbde.mjs";
import { t as CafeCard } from "./cafe-card-BpPrKKKT.mjs";
import { t as FooterNote } from "./footer-note-CzuRFY9I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/simpan-CT0322I7.js
var import_jsx_runtime = require_jsx_runtime();
function Simpan() {
	const ids = useWishlist((state) => state.ids);
	const ready = useWishlist((state) => state.ready);
	const clear = useWishlist((state) => state.clear);
	const now = useNow();
	const saved = [...ids].reverse().flatMap((id) => {
		const cafe = cafes.find((item) => item.slug === id);
		return cafe ? [cafe] : [];
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Simpanan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-title",
					children: "Yang kamu tandai"
				}), ready && saved.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: clear,
					className: "mb-1 min-h-11 text-sm text-muted",
					children: "Kosongkan"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-ink-soft",
				children: "Tersimpan di peramban ini saja. Tidak ada akun, dan daftarnya tidak ikut pindah ke perangkat lain."
			}),
			!ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 text-sm text-muted",
				children: "Membuka simpanan…"
			}) : saved.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid items-center gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: heroImage.src,
					alt: "",
					width: 1200,
					height: 1600,
					className: "aspect-[3/4] w-full rounded-lg object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-4xl",
						children: "Belum ada meja yang disimpan."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-ink-soft",
						children: "Mulai dari suasana, atau biarkan Roulette memilihkan satu. Tekan ikon bookmark di kartu kafe."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jelajah",
							className: "inline-flex h-12 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper",
							children: "Jelajah kafe"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/roulette",
							className: "inline-flex h-12 items-center rounded-full border border-line px-5 text-sm",
							children: "Putar roulette"
						})]
					})
				] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3",
				children: saved.map((cafe) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CafeCard, {
					cafe,
					status: now ? statusAt(cafe, now) : null
				}, cafe.slug))
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNote, {})] });
}
//#endregion
export { Simpan as component };
