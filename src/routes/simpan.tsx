import { createFileRoute, Link } from "@tanstack/react-router";
import { CafeCard } from "@/components/cafe-card";
import { FooterNote } from "@/components/footer-note";
import { cafes as staticCafes, heroImage } from "@/data/cafes";
import { statusAt, useNow } from "@/lib/cafe-time";
import { cn } from "@/lib/cn";
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
        <div className="mt-3 flex items-end justify-between gap-4">
          <h1 className="text-mega">Tandai.</h1>
          {ready && saved.length > 1 ? (
            <button type="button" onClick={clear} className="mb-1 min-h-11 text-sm text-muted">
              Kosongkan
            </button>
          ) : null}
        </div>
        <p className="mt-6 max-w-sm text-ink-soft sm:ml-16">
          Tersimpan di peramban ini saja. Tidak ada akun, dan daftarnya tidak ikut pindah ke perangkat lain.
        </p>

        {!ready ? (
          <p className="mt-12 text-sm text-muted">Membuka simpanan…</p>
        ) : saved.length === 0 ? (
          <div className="relative mt-16">
            <img
              src={heroImage.src}
              alt=""
              width={1200}
              height={1600}
              className="aspect-[4/5] w-full max-w-sm object-cover sm:ml-auto sm:w-2/3 lg:w-1/2"
            />
            <div className="relative z-10 -mt-16 max-w-md bg-paper px-1 py-4 sm:-mt-28">
              <h2 className="font-display text-4xl leading-none sm:text-6xl">Belum ada meja yang disimpan.</h2>
              <p className="mt-4 max-w-sm text-ink-soft">
                Mulai dari suasana, atau biarkan Roulette memilihkan satu. Tekan ikon bookmark di kartu kafe.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                <Link
                  to="/jelajah"
                  className="inline-flex h-12 items-center bg-ink px-5 text-sm font-medium text-paper"
                >
                  Jelajah kafe
                </Link>
                <Link to="/roulette" className="rule-draw inline-flex h-12 items-center text-sm font-medium">
                  Putar roulette
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12">
            {saved.map((cafe, index) => (
              <div
                key={cafe.slug}
                className={cn(
                  index === 0 ? "sm:col-span-2 lg:col-span-7" : "lg:col-span-5",
                  index === 2 && "lg:mt-16",
                )}
              >
                <CafeCard
                  cafe={cafe}
                  status={now ? statusAt(cafe, now) : null}
                  variant={index === 0 ? "feature" : "poster"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <FooterNote />
    </div>
  );
}
