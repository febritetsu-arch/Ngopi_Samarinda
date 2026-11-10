import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kafe._slug-HUcY8hCg.js
var import_jsx_runtime = require_jsx_runtime();
function MissingCafe() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg px-5 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Tidak ada"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-title",
				children: "Kafe ini tidak ada di katalog contoh."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/jelajah",
				className: "mt-6 inline-flex min-h-11 items-center text-sm underline",
				children: "Kembali ke jelajah"
			})
		]
	});
}
//#endregion
export { MissingCafe as notFoundComponent };
