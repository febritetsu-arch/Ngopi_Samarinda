import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CigaretteOff, c as PawPrint, f as MapPin, g as Clock, i as Trees, l as Music, n as Users, p as Leaf, s as Plug, t as Wifi, u as Moon, v as Car, x as AirVent } from "../_libs/lucide-react.mjs";
import { T as prices, _ as cafes, b as facilities, d as formatHours, f as formatKm, g as CITY_CENTER, h as useNow, m as statusAt, n as Route, p as formatRp, u as distanceKm, v as cn, w as moods } from "./router-ZAoaVbde.mjs";
import { t as SaveButton } from "./save-button-D6_ZHBkl.mjs";
import { t as FooterNote } from "./footer-note-CzuRFY9I.mjs";
import { t as MapView } from "./map-view-BiItRN-d.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kafe._slug-B_8FAXkL.js
var import_jsx_runtime = require_jsx_runtime();
var facilityIcons = {
	wifi: Wifi,
	colokan: Plug,
	outdoor: Trees,
	ac: AirVent,
	parkir: Car,
	"bebas-asap": CigaretteOff,
	live: Music,
	meeting: Users,
	pet: PawPrint,
	vegan: Leaf,
	larut: Moon
};
var crowdCopy = {
	sepi: "Sepi — meja masih longgar.",
	sedang: "Sedang — ada orang, masih ada kursi.",
	ramai: "Ramai — datang lebih awal kalau butuh meja."
};
function CafeDetail() {
	const cafe = Route.useLoaderData();
	const now = useNow();
	const state = now ? statusAt(cafe, now) : null;
	const km = distanceKm(cafe.lat, cafe.lng, CITY_CENTER.lat, CITY_CENTER.lng);
	const related = cafes.filter((item) => item.slug !== cafe.slug && item.moods.some((mood) => cafe.moods.includes(mood))).slice(0, 3);
	const mapHref = `https://www.openstreetmap.org/?mlat=${cafe.lat}&mlon=${cafe.lng}#map=17/${cafe.lat}/${cafe.lng}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: cafe.image,
				alt: cafe.imageAlt,
				width: 1200,
				height: 1600,
				fetchPriority: "high",
				className: "aspect-[3/4] max-h-[82vh] w-full object-cover sm:aspect-[4/3] lg:aspect-[16/9]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 right-4 left-4 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/jelajah",
					className: "inline-flex h-11 items-center rounded-full bg-paper px-4 text-sm text-ink",
					children: "Jelajah"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, {
					slug: cafe.slug,
					name: cafe.name
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8 lg:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "kicker",
					children: ["Data contoh · ", cafe.district]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-display",
					children: cafe.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-xl text-lg text-ink-soft",
					children: cafe.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						cafe.neighborhood,
						" · ",
						prices[cafe.price].label,
						" · ",
						prices[cafe.price].range,
						" ·",
						" ",
						formatKm(km),
						" dari ",
						CITY_CENTER.label
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-4",
					children: cafe.story.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-ink-soft",
						children: paragraph
					}, paragraph))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-12 text-title",
					children: "Menu contoh"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 max-w-xl border-t border-line",
					children: cafe.menu.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-baseline justify-between gap-6 border-b border-line py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: item.note
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 tabular-nums",
							children: formatRp(item.price)
						})]
					}, item.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						"Andalan rumah: ",
						cafe.signature,
						"."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-8 lg:sticky lg:top-20 lg:self-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-line bg-paper-2 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "kicker",
								children: "Sekarang"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-3xl",
								children: state ? state.open ? "Buka" : "Tutup" : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 flex items-center gap-2 text-sm text-ink-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-olive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [
										formatHours(cafe),
										" WITA",
										state ? ` · ${state.clock}` : ""
									]
								})]
							}),
							state?.open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: crowdCopy[state.crowd]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrowdBars, {
								cafe,
								hour: state?.hour
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted",
								children: "Perkiraan keramaian adalah pola contoh, bukan hitungan pengunjung."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Fasilitas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2",
						children: cafe.facilities.map((id) => {
							const Icon = facilityIcons[id];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-3 border-b border-line py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-olive" }), facilities[id].label]
							}, id);
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: "Suasana"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: cafe.moods.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/jelajah",
							search: { mood: id },
							className: "inline-flex h-10 items-center rounded-full border border-line px-3 text-sm",
							children: moods[id].label
						}) }, id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 font-display text-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-5" }), "Lokasi contoh"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-ink-soft",
							children: cafe.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 h-52 overflow-hidden rounded-lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapView, {
								cafes: [cafe],
								selected: cafe.slug,
								onSelect: () => void 0
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: mapHref,
							target: "_blank",
							rel: "noreferrer",
							className: "mt-3 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4",
							children: "Buka di OpenStreetMap"
						})
					] })
				]
			})]
		}),
		related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-5 pb-4 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-title",
				children: "Suasana yang berdekatan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 border-t border-line",
				children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/kafe/$slug",
					params: { slug: item.slug },
					className: "flex items-center justify-between gap-4 border-b border-line py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-display text-2xl",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: item.district
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: prices[item.price].label
					})]
				}) }, item.slug))
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNote, {})
	] });
}
function CrowdBars({ cafe, hour }) {
	const heights = [
		"h-2",
		"h-4",
		"h-7",
		"h-10"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 flex h-12 items-end gap-1",
		"aria-hidden": "true",
		children: cafe.crowd.map((level, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("flex-1 rounded-sm", heights[level] ?? "h-2", hour === index ? "bg-terracotta" : "bg-ink/15") }, index))
	});
}
//#endregion
export { CafeDetail as component };
