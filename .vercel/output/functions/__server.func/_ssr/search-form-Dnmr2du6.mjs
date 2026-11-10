import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { C as require_jsx_runtime, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-form-Dnmr2du6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchForm({ initial = "", keep }) {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)(initial);
	(0, import_react.useEffect)(() => {
		setQ(initial);
	}, [initial]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		role: "search",
		className: "flex items-center gap-2 rounded-full border border-line bg-paper px-4",
		onSubmit: (event) => {
			event.preventDefault();
			const query = q.trim();
			navigate({
				to: "/jelajah",
				search: {
					...keep,
					q: query || void 0
				}
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				className: "size-5 shrink-0 text-olive",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "sr-only",
				htmlFor: "cari-kafe",
				children: "Cari kafe"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id: "cari-kafe",
				value: q,
				onChange: (event) => setQ(event.target.value),
				placeholder: "Cari nama, kecamatan, atau menu",
				className: "h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted",
				suppressHydrationWarning: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "press my-1.5 h-11 rounded-full bg-ink px-4 text-sm font-medium text-paper",
				children: "Cari"
			})
		]
	});
}
//#endregion
export { SearchForm as t };
