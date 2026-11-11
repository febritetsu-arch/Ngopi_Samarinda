import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Camera, CloudRain, Coffee, Heart, Laptop, Map, Users, type LucideIcon } from "lucide-react";
import { CafeCard } from "@/components/cafe-card";
import { FooterNote } from "@/components/footer-note";
import { SearchForm } from "@/components/search-form";
import { cafes, featuredSlugs, heroImage, moodOrder, moods, prices, type MoodId } from "@/data/cafes";
import { formatHours, statusAt, useNow } from "@/lib/cafe-time";

const moodIcon: Record<MoodId, LucideIcon> = {
  fokus: Laptop,
  santai: Coffee,
  nongkrong: Users,
  foto: Camera,
  kencan: Heart,
  hujan: CloudRain,
};

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
  const openCount = now ? cafes.filter((cafe) => statusAt(cafe, now).open).length : null;

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pt-5 pb-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pt-14 lg:pb-10">
        <div className="order-2 lg:order-1 lg:col-span-5 lg:py-4">
          <p className="kicker">Edisi kota · data contoh</p>
          <h1 className="mt-3 max-w-xl text-display">
            Pilih suasana.
            <span className="block italic text-terracotta">Kami tunjukkan mejanya.</span>
          </h1>
          <p className="mt-4 max-w-md text-ink-soft">
            Sepuluh kafe contoh, satu di tiap kecamatan Samarinda. Disusun menurut mood — bukan sekadar yang terdekat.
          </p>
          <div className="mt-6 max-w-md">
            <SearchForm />
          </div>
          <p className="mt-3 text-sm text-muted">Harga, jam buka, dan keramaian sengaja ditandai sebagai contoh.</p>
        </div>

        <div className="relative order-1 lg:order-2 lg:col-span-7">
          <div className="pointer-events-none absolute -top-3 right-4 bottom-10 left-8 rounded-xl bg-olive-soft sm:right-8" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              width={1200}
              height={1600}
              fetchPriority="high"
              className="hero-frame aspect-[16/10] w-full object-cover sm:aspect-[16/11] lg:aspect-[4/5]"
            />
          </div>
          <aside className="relative z-10 -mt-12 ml-4 max-w-xs rounded-xl bg-paper p-4 shadow-lift ring-1 ring-line sm:ml-8 lg:absolute lg:bottom-6 lg:-left-8 lg:mt-0">
            <p className="kicker">Di katalog ini</p>
            <p className="mt-2 font-display text-2xl leading-tight">Sepuluh meja. Sepuluh kecamatan.</p>
            <p className="mt-2 text-sm text-muted">
              {openCount === null ? "Jam mengikuti WITA." : `${openCount} sedang buka menurut jam contoh.`}
            </p>
            <Link
              to="/jelajah"
              className="mt-3 inline-flex h-11 items-center gap-1 text-sm font-medium text-terracotta"
            >
              Mulai jelajah
              <ArrowUpRight className="size-4" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 lg:px-8 lg:py-20" aria-labelledby="suasana">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Mulai dari mood</p>
            <h2 id="suasana" className="mt-2 text-title">
              Suasana hari ini
            </h2>
          </div>
          <Link
            to="/jelajah"
            className="mb-1 inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors duration-150 hover:text-ink"
          >
            Semua kafe
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="rise-grid mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {moodOrder.map((id) => {
            const count = cafes.filter((cafe) => cafe.moods.includes(id)).length;
            const Icon = moodIcon[id];
            return (
              <Link
                key={id}
                to="/jelajah"
                search={{ mood: id }}
                className="rise-in group flex min-h-40 flex-col justify-between rounded-xl bg-paper-2 p-4 ring-1 ring-transparent transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-ink hover:text-paper hover:shadow-lift focus-visible:outline-offset-4"
              >
                <span className="flex items-center justify-between gap-3">
                  <Icon className="size-5 text-olive transition-colors duration-150 group-hover:text-paper" />
                  <span className="text-sm tabular-nums text-muted group-hover:text-paper/70">{count} kafe</span>
                </span>
                <span>
                  <span className="block font-display text-3xl leading-none">{moods[id].label}</span>
                  <span className="mt-2 block text-sm text-ink-soft group-hover:text-paper/75">{moods[id].line}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8" aria-labelledby="meja">
        <p className="kicker">Pilihan cepat</p>
        <h2 id="meja" className="mt-2 text-title">
          Meja yang sering dicari
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          <Link
            to="/peta"
            className="mb-1 inline-flex min-h-11 items-center gap-1 text-sm text-muted transition-colors duration-150 hover:text-ink"
          >
            Buka peta
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <ol className="mt-6">
          {cafes.map((cafe, index) => (
            <li key={cafe.slug}>
              <Link
                to="/kafe/$slug"
                params={{ slug: cafe.slug }}
                className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl px-2 py-3 transition-colors duration-150 hover:bg-paper-2 sm:grid-cols-[auto_minmax(0,1.2fr)_minmax(0,1fr)_auto]"
              >
                <img
                  src={cafe.image}
                  alt=""
                  width={120}
                  height={120}
                  loading="lazy"
                  className="size-16 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block text-xs tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <span className="block truncate font-display text-2xl transition-colors duration-150 group-hover:text-terracotta">
                    {cafe.name}
                  </span>
                  <span className="block truncate text-sm text-muted">
                    {cafe.neighborhood}, {cafe.district}
                  </span>
                </span>
                <span className="hidden truncate text-sm text-muted sm:block">
                  {cafe.moods.map((id) => moods[id].label).join(" · ")}
                </span>
                <span className="hidden text-right text-sm sm:block">
                  {prices[cafe.price].label}
                  <span className="mt-0.5 block text-muted">{formatHours(cafe)}</span>
                </span>
                <ArrowUpRight className="size-4 text-olive sm:hidden" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-16 grid max-w-6xl gap-4 px-5 sm:grid-cols-2 lg:px-8">
        <Link
          to="/roulette"
          className="group flex min-h-40 flex-col justify-between rounded-xl bg-ink p-6 text-paper transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift"
        >
          <p className="kicker text-paper/70">Tidak ingin memilih</p>
          <span>
            <span className="block font-display text-3xl">Cafe Roulette</span>
            <span className="mt-2 block text-sm text-paper/75">Putar sekali. Dapat satu kafe contoh.</span>
          </span>
        </Link>
        <Link
          to="/peta"
          className="group flex min-h-40 flex-col justify-between rounded-xl bg-olive-soft p-6 text-ink transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift"
        >
          <p className="kicker inline-flex items-center gap-2">
            <Map className="size-4" />
            Di peta
          </p>
          <span>
            <span className="block font-display text-3xl">Sepuluh titik di kota</span>
            <span className="mt-2 block text-sm text-ink-soft">Dari Sempaja sampai Loa Janan Ilir.</span>
          </span>
        </Link>
      </section>

      <FooterNote />
    </div>
  );
}
