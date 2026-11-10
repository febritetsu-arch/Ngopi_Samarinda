import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as moodOrder, T as prices, _ as cafes, v as cn, w as moods } from "./router-ZAoaVbde.mjs";
import { t as SaveButton } from "./save-button-D6_ZHBkl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roulette-H0p-i7io.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Roulette() {
	const [mood, setMood] = (0, import_react.useState)("semua");
	const [shown, setShown] = (0, import_react.useState)(null);
	const [locked, setLocked] = (0, import_react.useState)(false);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(null);
	const pool = cafes.filter((cafe) => mood === "semua" || cafe.moods.includes(mood));
	(0, import_react.useEffect)(() => {
		return () => {
			if (timer.current) window.clearTimeout(timer.current);
		};
	}, []);
	function spin() {
		if (spinning || pool.length === 0) return;
		const pick = pool[Math.floor(Math.random() * pool.length)];
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setShown(pick);
			setLocked(true);
			return;
		}
		setSpinning(true);
		setLocked(false);
		let step = 0;
		const steps = 12;
		const tick = () => {
			const flash = pool[step % pool.length];
			setShown(step < 11 ? flash : pick);
			step += 1;
			if (step < steps) timer.current = window.setTimeout(tick, 36 + step * 14);
			else {
				setSpinning(false);
				setLocked(true);
			}
		};
		tick();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-lg flex-1 flex-col px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker text-paper/60",
				children: "Cafe Roulette"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-title text-paper",
				children: "Satu putaran. Satu meja."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-paper/75",
				children: "Dipilih acak dari katalog contoh. Tidak ada algoritma rahasia — hanya suasana yang kamu tentukan."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-row mt-6",
				"aria-label": "Saring suasana sebelum putar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodChip, {
					on: mood === "semua",
					onClick: () => setMood("semua"),
					label: "Semua"
				}), moodOrder.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoodChip, {
					on: mood === id,
					onClick: () => setMood(id),
					label: moods[id].label
				}, id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 overflow-hidden rounded-xl bg-ink-soft",
				"aria-live": "polite",
				"aria-busy": spinning,
				children: [
					shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: shown.image,
						alt: locked ? shown.imageAlt : "",
						width: 1200,
						height: 1600,
						className: cn("aspect-[3/4] w-full object-cover", spinning && "opacity-80")
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid aspect-[3/4] place-items-center px-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-4xl text-paper",
							children: "Siap, kalau kamu siap."
						})
					}),
					shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 scrim p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-paper/80",
								children: shown.district
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl text-paper",
								children: shown.name
							}),
							locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-sm text-sm text-paper/80",
								children: shown.blurb
							}) : null
						]
					}) : null,
					locked && shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 right-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
							slug: shown.slug,
							name: shown.name
						})
					}) : null
				]
			}),
			locked && shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-paper/70",
				children: [
					prices[shown.price].label,
					" · ",
					prices[shown.price].range,
					" · ",
					shown.neighborhood
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-paper/60",
				children: [pool.length, " kafe dalam putaran ini"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: spin,
					disabled: spinning,
					className: "press inline-flex h-12 flex-1 items-center justify-center rounded-full bg-paper px-5 font-medium text-ink disabled:opacity-60",
					children: spinning ? "Memutar…" : locked ? "Putar lagi" : "Putar"
				}), locked && shown ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/kafe/$slug",
					params: { slug: shown.slug },
					className: "inline-flex h-12 flex-1 items-center justify-center rounded-full border border-paper/30 px-5 text-paper",
					children: "Lihat kafe"
				}) : null]
			})
		]
	});
}
function MoodChip({ on, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": on,
		onClick,
		className: cn("h-11 shrink-0 rounded-full px-4 text-sm", on ? "bg-paper text-ink" : "border border-paper/25 text-paper"),
		children: label
	});
}
//#endregion
export { Roulette as component };
