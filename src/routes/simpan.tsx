import { createFileRoute, Link } from "@tanstack/react-router";
import { NearbyCard } from "@/components/nearby-card";
import { CITY_CENTER, cafes as staticCafes } from "@/data/cafes";
import { distanceKm, statusAt, useNow } from "@/lib/cafe-time";
import { useCafes } from "@/lib/use-cafes";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/simpan")({
  head: () => ({
    meta: [{ title: "Simpanan · NgopiSamarinda" }],
  }),
  component: Simpan,
});

function Simpan() {
  const ids = useWishlist((state) => state.ids);
  const ready = useWishlist((state) => state.ready);
  const clear = useWishlist((state) => state.clear);
  const now = useNow();
  const { cafes, status } = useCafes();
  const source = status === "ready" ? cafes : staticCafes;
  const saved = [...ids].reverse().flatMap((id) => {
    const cafe = source.find((item) => item.slug === id);
    return cafe ? [cafe] : [];
  });

  return (
    <div>
      <div className="mx-auto w-full max-w-lg px-4 py-2">
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-display text-3xl leading-none">Tersimpan</h1>
          {ready && saved.length > 1 ? (
            <button type="button" onClick={clear} className="min-h-11 text-sm text-muted">
              Kosongkan
            </button>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-muted">Tersimpan di peramban ini saja.</p>

        {!ready ? (
          <p className="mt-12 text-sm text-muted">Membuka simpanan…</p>
        ) : saved.length === 0 ? (
          <div className="mt-8 rounded-xl border border-line bg-card p-5">
            <h2 className="font-display text-2xl">Belum ada kafe tersimpan.</h2>
            <p className="mt-2 text-sm text-ink-soft">Tekan ikon bookmark di kartu kafe.</p>
            <Link
              to="/"
              className="mt-4 inline-flex h-12 items-center rounded-xl bg-ink px-5 text-sm font-medium text-paper"
            >
              Lihat kafe terdekat
            </Link>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {saved.map((cafe) => (
              <NearbyCard
                key={cafe.slug}
                cafe={cafe}
                km={distanceKm(cafe.lat, cafe.lng, CITY_CENTER.lat, CITY_CENTER.lng)}
                status={now ? statusAt(cafe, now) : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
