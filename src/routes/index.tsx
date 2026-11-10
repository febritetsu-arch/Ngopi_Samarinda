import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CafeCard } from "@/components/cafe-card";
import { FooterNote } from "@/components/footer-note";
import { SearchForm } from "@/components/search-form";
import { cafes, featuredSlugs, heroImage, moodOrder, moods, prices } from "@/data/cafes";
import { formatHours, statusAt, useNow } from "@/lib/cafe-time";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "NgopiSamarinda — kafe menurut suasana" }],
  }),
  component: Home,
});

function Home() {
  const now = useNow();
  const featured = featuredSlugs
    .map((slug) => cafes.find((cafe) => cafe.slug === slug))
    .filter((cafe) => cafe !== undefined);

  return (
    <div>
      <section className="home-hero">
        <div className="relative col-start-1 row-start-1 lg:col-span-7 lg:col-start-6">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={1200}
            height={1600}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="scrim absolute inset-0 lg:hidden" />
        </div>
        <div className="relative z-10 col-start-1 row-start-1 flex flex-col justify-end px-5 pt-16 pb-8 lg:col-span-5 lg:col-start-1 lg:justify-center lg:bg-paper lg:px-10 lg:py-16">
          <p className="kicker text-paper/80 lg:text-olive">Edisi kota · data contoh</p>
          <h1 className="mt-4 max-w-xl text-display text-paper lg:text-ink">
            Pilih suasana. Kami tunjukkan mejanya.
          </h1>
          <p className="mt-4 max-w-md text-paper/85 lg:text-ink-soft">
            Sepuluh kafe contoh, satu di tiap kecamatan Samarinda. Disusun menurut mood — bukan sekadar yang terdekat.
          </p>
          <div className="mt-6 max-w-md">
            <SearchForm />
          </div>
          <p className="mt-3 text-sm text-paper/75 lg:text-muted">
            Harga, jam buka, dan keramaian sengaja ditandai sebagai contoh.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20" aria-labelledby="suasana">
        <div className="flex items-end justify-between gap-4">
          <h2 id="suasana" className="text-title">
            Suasana hari ini
          </h2>
          <Link to="/jelajah" className="mb-1 inline-flex min-h-11 items-center text-sm text-muted">
            Semua kafe
          </Link>
        </div>
        <ol className="mt-6 border-t border-line">
          {moodOrder.map((id, index) => {
            const count = cafes.filter((cafe) => cafe.moods.includes(id)).length;
            return (
              <li key={id}>
                <Link
                  to="/jelajah"
                  search={{ mood: id }}
                  className="group flex min-h-20 items-center gap-4 border-b border-line py-4"
                >
                  <span className="w-8 tabular-nums text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-3xl transition-colors duration-150 group-hover:text-terracotta">
                      {moods[id].label}
                    </span>
                    <span className="mt-1 block text-sm text-muted">{moods[id].line}</span>
                  </span>
                  <span className="hidden text-sm text-muted sm:block">{count} kafe</span>
                  <ArrowUpRight className="size-5 shrink-0 text-olive" />
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8" aria-labelledby="meja">
        <h2 id="meja" className="text-title">
          Meja yang sering dicari
        </h2>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((cafe, index) => (
            <CafeCard key={cafe.slug} cafe={cafe} status={now ? statusAt(cafe, now) : null} priority={index < 2} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-6xl px-5 lg:px-8" aria-labelledby="kecamatan">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Direktori</p>
            <h2 id="kecamatan" className="mt-2 text-title">
              Satu kafe tiap kecamatan
            </h2>
          </div>
          <Link to="/peta" className="mb-1 inline-flex min-h-11 items-center text-sm text-muted">
            Buka peta
          </Link>
        </div>
        <ol className="mt-6 border-t border-line">
          {cafes.map((cafe, index) => (
            <li key={cafe.slug}>
              <Link
                to="/kafe/$slug"
                params={{ slug: cafe.slug }}
                className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-b border-line py-4 sm:grid-cols-[2.5rem_1fr_auto_auto]"
              >
                <span className="tabular-nums text-sm text-muted">{String(index + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-2xl transition-colors duration-150 group-hover:text-terracotta">
                    {cafe.name}
                  </span>
                  <span className="text-sm text-muted">
                    {cafe.neighborhood}, {cafe.district}
                  </span>
                </span>
                <span className="col-start-2 text-sm text-muted sm:col-start-auto">
                  {cafe.moods.map((id) => moods[id].label).join(" · ")}
                </span>
                <span className="hidden text-sm sm:block">
                  {prices[cafe.price].label}
                  <span className="text-muted"> · {formatHours(cafe)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:px-8">
        <Link to="/roulette" className="flex min-h-36 flex-col justify-between rounded-lg bg-ink p-6 text-paper">
          <p className="kicker text-paper/70">Tidak ingin memilih</p>
          <span className="mt-8 font-display text-3xl">Cafe Roulette</span>
          <span className="mt-2 text-sm text-paper/75">Putar sekali. Dapat satu kafe contoh.</span>
        </Link>
        <Link to="/peta" className="flex min-h-36 flex-col justify-between rounded-lg bg-olive-soft p-6 text-ink">
          <p className="kicker">Di peta</p>
          <span className="mt-8 font-display text-3xl">Sepuluh titik di kota</span>
          <span className="mt-2 text-sm text-ink-soft">Dari Sempaja sampai Loa Janan Ilir.</span>
        </Link>
      </section>

      <FooterNote />
    </div>
  );
}
