import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Bookmark } from "../_libs/lucide-react.mjs";
import { a as useWishlist, v as cn } from "./router-ZAoaVbde.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/save-button-D6_ZHBkl.js
var import_jsx_runtime = require_jsx_runtime();
function SaveButton({ slug, name, className }) {
	const saved = useWishlist((state) => state.ready && state.ids.includes(slug));
	const toggle = useWishlist((state) => state.toggle);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": saved,
		"aria-label": saved ? `Hapus ${name} dari simpanan` : `Simpan ${name}`,
		onClick: () => toggle(slug),
		className: cn("press grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lift", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: cn("size-5", saved && "fill-terracotta text-terracotta") })
	});
}
//#endregion
export { SaveButton as t };
