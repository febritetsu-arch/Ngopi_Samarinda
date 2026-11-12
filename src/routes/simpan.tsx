import { createFileRoute, Link } from "@tanstack/react-router";
import { CafeCard } from "@/components/cafe-card";
import { FooterNote } from "@/components/footer-note";
import { cafes as staticCafes, heroImage } from "@/data/cafes";
import { statusAt, useNow } from "@/lib/cafe-time";
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
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12">
        <p className="kicker">Simpanan</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h1 className="text-title">Yang kamu tandai</h1>
          {ready && saved.length > 1 ? (
            <button type="button" onClick={clear} className="mb-1 min-h-11 text-sm text-muted">
              Kosongkan
            </button>
          ) : null}
        </div>
        <p className="mt-3 max-w-xl text-ink-soft">
          Tersimpan di peramban ini saja. Tidak ada akun, dan daftarnya tidak ikut pindah ke perangkat lain.
        </p>

        {!ready ? (
          <p className="mt-12 text-sm text-muted">Membuka simpanan…</p>
        ) : saved.length === 0 ? (
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-2">
            <img
              src={heroImage.src}
              alt=""
              width={1200}
              height={1600}
              className="aspect-[3/4] w-full rounded-lg object-cover"
            />
            <div>
              <h2 className="font-display text-4xl">Belum ada meja yang disimpan.</h2>
              <p className="mt-4 max-w-md text-ink-soft">
                Mulai dari suasana, atau biarkan Roulette memilihkan satu. Tekan ikon bookmark di kartu kafe.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/jelajah"
                  className="inline-flex h-12 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper"
                >
                  Jelajah kafe
                </Link>
                <Link
                  to="/roulette"
                  className="inline-flex h-12 items-center rounded-full border border-line px-5 text-sm"
                >
                  Putar roulette
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((cafe) => (
              <CafeCard key={cafe.slug} cafe={cafe} status={now ? statusAt(cafe, now) : null} />
            ))}
          </div>
        )}
      </div>
      <FooterNote />
    </div>
  );
}
