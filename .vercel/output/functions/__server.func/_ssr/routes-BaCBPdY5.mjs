import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { C as moodOrder, S as heroImage, T as prices, _ as cafes, d as formatHours, h as useNow, m as statusAt, w as moods, x as featuredSlugs } from "./router-ZAoaVbde.mjs";
import { t as CafeCard } from "./cafe-card-BpPrKKKT.mjs";
import { t as FooterNote } from "./footer-note-CzuRFY9I.mjs";
import { t as SearchForm } from "./search-form-Dnmr2du6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BaCBPdY5.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const now = useNow();
	const featured = featuredSlugs.map((slug) => cafes.find((cafe) => cafe.slug === slug)).filter((cafe) => cafe !== void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "home-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative col-start-1 row-start-1 lg:col-span-7 lg:col-start-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: heroImage.src,
					alt: heroImage.alt,
					width: 1200,
					height: 1600,
					fetchPriority: "high",
					className: "absolute inset-0 h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scrim absolute inset-0 lg:hidden" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 col-start-1 row-start-1 flex flex-col justify-end px-5 pt-16 pb-8 lg:col-span-5 lg:col-start-1 lg:justify-center lg:bg-paper lg:px-10 lg:py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-paper/80 lg:text-olive",
						children: "Edisi kota · data contoh"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 max-w-xl text-display text-paper lg:text-ink",
						children: "Pilih suasana. Kami tunjukkan mejanya."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-md text-paper/85 lg:text-ink-soft",
						children: "Sepuluh kafe contoh, satu di tiap kecamatan Samarinda. Disusun menurut mood — bukan sekadar yang terdekat."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchForm, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-paper/75 lg:text-muted",
						children: "Harga, jam buka, dan keramaian sengaja ditandai sebagai contoh."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20",
			"aria-labelledby": "suasana",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "suasana",
					className: "text-title",
					children: "Suasana hari ini"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jelajah",
					className: "mb-1 inline-flex min-h-11 items-center text-sm text-muted",
					children: "Semua kafe"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 border-t border-line",
				children: moodOrder.map((id, index) => {
					const count = cafes.filter((cafe) => cafe.moods.includes(id)).length;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jelajah",
						search: { mood: id },
						className: "group flex min-h-20 items-center gap-4 border-b border-line py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 tabular-nums text-sm text-muted",
								children: String(index + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-3xl transition-colors duration-150 group-hover:text-terracotta",
									children: moods[id].label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-sm text-muted",
									children: moods[id].line
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden text-sm text-muted sm:block",
								children: [count, " kafe"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-5 shrink-0 text-olive" })
						]
					}) }, id);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 lg:px-8",
			"aria-labelledby": "meja",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "meja",
				className: "text-title",
				children: "Meja yang sering dicari"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4",
				children: featured.map((cafe, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CafeCard, {
					cafe,
					status: now ? statusAt(cafe, now) : null,
					priority: index < 2
				}, cafe.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto mt-20 max-w-6xl px-5 lg:px-8",
			"aria-labelledby": "kecamatan",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: "Direktori"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "kecamatan",
					className: "mt-2 text-title",
					children: "Satu kafe tiap kecamatan"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/peta",
					className: "mb-1 inline-flex min-h-11 items-center text-sm text-muted",
					children: "Buka peta"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 border-t border-line",
				children: cafes.map((cafe, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/kafe/$slug",
					params: { slug: cafe.slug },
					className: "group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-line py-4 sm:grid-cols-[2.5rem_1fr_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-sm text-muted",
							children: String(index + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-2xl transition-colors duration-150 group-hover:text-terracotta",
							children: cafe.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [
								cafe.neighborhood,
								", ",
								cafe.district
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "col-start-2 text-sm text-muted sm:col-start-auto",
							children: cafe.moods.map((id) => moods[id].label).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden text-sm sm:block",
							children: [prices[cafe.price].label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", formatHours(cafe)]
							})]
						})
					]
				}) }, cafe.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto mt-16 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/roulette",
				className: "flex min-h-36 flex-col justify-between rounded-lg bg-ink p-6 text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker text-paper/70",
						children: "Tidak ingin memilih"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-8 font-display text-3xl",
						children: "Cafe Roulette"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 text-sm text-paper/75",
						children: "Putar sekali. Dapat satu kafe contoh."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/peta",
				className: "flex min-h-36 flex-col justify-between rounded-lg bg-olive-soft p-6 text-ink",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "kicker",
						children: "Di peta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-8 font-display text-3xl",
						children: "Sepuluh titik di kota"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 text-sm text-ink-soft",
						children: "Dari Sempaja sampai Loa Janan Ilir."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNote, {})
	] });
}
//#endregion
export { Home as component };
