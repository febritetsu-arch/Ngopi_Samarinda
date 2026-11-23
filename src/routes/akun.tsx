import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/akun")({
  head: () => ({
    meta: [{ title: "Akun · NgopiSamarinda" }],
  }),
  component: Akun,
});

function Akun() {
  const count = useWishlist((state) => (state.ready ? state.ids.length : 0));

  return (
    <div className="mx-auto w-full max-w-lg px-4 py-6">
      <p className="text-sm text-muted">Tamu</p>
      <h1 className="mt-1 font-display text-4xl leading-none">Samarinda</h1>
      <p className="mt-3 max-w-sm text-sm text-ink-soft">
        Tidak ada akun. Simpanan dan kupon contoh tetap di peramban ini.
      </p>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        <li>
          <Link to="/simpan" className="flex h-14 items-center justify-between text-sm">
            Kafe tersimpan
            <span className="tabular-nums text-muted">{count}</span>
          </Link>
        </li>
        <li>
          <Link to="/usulkan" className="flex h-14 items-center text-sm">
            Usulkan kafe
          </Link>
        </li>
        <li>
          <Link to="/roulette" className="flex h-14 items-center text-sm">
            Roulette suasana
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="flex h-14 w-full items-center text-left text-sm"
            onClick={() => {
              sessionStorage.setItem("ngopi-replay", "1");
              window.location.assign("/");
            }}
          >
            Ulangi perkenalan
          </button>
        </li>
      </ul>
    </div>
  );
}
