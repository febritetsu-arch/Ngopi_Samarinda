import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Camera, CloudRain, Coffee, Heart, Laptop, Users, type LucideIcon } from "lucide-react";
import { CafeCard } from "@/components/cafe-card";
import { FooterNote } from "@/components/footer-note";
import { SearchForm } from "@/components/search-form";
import { CafeCardSkeleton, DirectoryRowSkeleton, MoodSkeleton } from "@/components/skeletons";
import { featuredSlugs, heroImage, moodOrder, moods, prices, type MoodId } from "@/data/cafes";
import { formatHours, statusAt, useNow } from "@/lib/cafe-time";
import { cn } from "@/lib/cn";
import { useCafes } from "@/lib/use-cafes";

const moodIcon: Record<MoodId, LucideIcon> = {
  fokus: Laptop,
  santai: Coffee,
  nongkrong: Users,
  foto: Camera,
  kencan: Heart,
  hujan: CloudRain,
};

const moodFace: Record<MoodId, { box: string; quiet: string }> = {
  fokus: {
    box: "col-span-2 min-h-60 bg-ink text-paper lg:col-span-7 lg:row-span-2 lg:min-h-96",
    quiet: "text-paper/65",
  },
  santai: {
    box: "col-span-2 min-h-40 bg-paper-2 lg:col-span-5",
    quiet: "text-muted",
  },
  nongkrong: {
    box: "col-span-1 min-h-48 bg-terracotta text-paper lg:col-span-5",
    quiet: "text-paper/75",
  },
  foto: {
    box: "col-span-1 min-h-48 bg-olive text-paper lg:col-span-4 lg:mt-14",
    quiet: "text-paper/75",
  },
  kencan: {
    box: "col-span-2 min-h-44 bg-olive-soft lg:col-span-3 lg:min-h-52",
    quiet: "text-ink-soft",
  },
  hujan: {
    box: "col-span-2 min-h-36 bg-paper-2 lg:col-span-7 lg:col-start-5",
    quiet: "text-muted",
  },
};

const featureSlot = [
  "lg:col-span-7",
  "lg:col-span-4 lg:col-start-9 lg:mt-28",
  "lg:col-span-5",
  "lg:col-span-6 lg:col-start-7 lg:-mt-20",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "NgopiSamarinda — kafe menurut suasana" }],
  }),
  component: Home,
});

function Home() {
  const now = useNow();
  const { cafes, status } = useCafes();
  const loading = status === "loading";
  const featured = featuredSlugs
    .map((slug) => cafes.find((cafe) => cafe.slug === slug))
    .filter((cafe) => cafe !== undefined);
  const picks = featured.length > 0 ? featured : cafes.slice(0, 4);
  const openCount = now ? cafes.filter((cafe) => statusAt(cafe, now).open).length : null;

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pt-4 pb-8 lg:px-8 lg:pt-12 lg:pb-6">
        <div className="lg:grid lg:grid-cols-12 lg:items-start">
          <div className="relative z-10 lg:col-span-6">
            <p className="kicker">Edisi kota · data contoh</p>
            <h1 className="mt-4 text-mega">
              Pilih
              <span className="mt-1 block pl-8 italic text-terracotta sm:pl-20">suasana.</span>
            </h1>
            <div className="mt-8 max-w-md lg:mt-10">
              <p className="text-lg leading-relaxed text-ink-soft">
                Kafe contoh di Samarinda, disusun menurut mood — bukan sekadar yang terdekat.
              </p>
              <div className="mt-6">
                <SearchForm />
              </div>
              <p className="mt-4 text-sm text-muted">Harga, jam buka, dan keramaian sengaja ditandai sebagai contoh.</p>
            </div>
          </div>

          <div className="relative mt-10 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-24">
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              width={1200}
              height={1600}
              fetchPriority="high"
              className="hero-frame aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
            />
            <p className="absolute -bottom-4 left-3 max-w-44 bg-paper px-3 py-3 font-display text-2xl leading-none sm:-left-8">
              {loading ? "…" : cafes.length}
              <span className="mt-2 block font-sans text-xs font-medium tracking-wide text-muted">
                {loading || openCount === null
                  ? "jam mengikuti WITA"
                  : `${openCount} sedang buka`}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-28" aria-labelledby="suasana">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker">Mulai dari mood</p>
            <h2 id="suasana" className="mt-3 max-w-md text-title">
              Suasana hari ini
            </h2>
          </div>
          <Link
            to="/jelajah"
            className="rule-draw mb-1 inline-flex min-h-11 items-center gap-1 text-sm font-medium"
          >
            Semua kafe
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-12" aria-busy="true" aria-live="polite">
            <p className="sr-only">Memuat kafe…</p>
            {moodOrder.map((id) => (
              <MoodSkeleton key={id} className={moodFace[id].box} />
            ))}
          </div>
        ) : (
          <div className="rise-grid mt-10 grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
            {moodOrder.map((id) => {
              const count = cafes.filter((cafe) => cafe.moods.includes(id)).length;
              const Icon = moodIcon[id];
              const face = moodFace[id];
              return (
                <Link
                  key={id}
                  to="/jelajah"
                  search={{ mood: id }}
                  className={cn(
                    "rise-in group press flex flex-col justify-between p-4 transition duration-200 ease-out hover:-translate-y-1 focus-visible:outline-offset-4 sm:p-5",
                    face.box,
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <Icon className="size-5" />
                    <span className={cn("text-sm tabular-nums", face.quiet)}>{count}</span>
                  </span>
                  <span>
                    <span className="name-nudge block font-display text-4xl leading-none sm:text-5xl">
                      {moods[id].label}
                    </span>
                    <span className={cn("mt-3 block max-w-xs text-sm", face.quiet)}>{moods[id].line}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-5 lg:px-8" aria-labelledby="meja">
        <p className="kicker">Pilihan cepat</p>
        <h2 id="meja" className="mt-3 max-w-lg text-title">
          Meja yang sering dicari
        </h2>
        {loading ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-12" aria-busy="true">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className={featureSlot[index] ?? "lg:col-span-6"}>
                <CafeCardSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12">
            {picks.map((cafe, index) => (
              <div key={cafe.slug} className={cn(index === 0 && "sm:col-span-2", featureSlot[index] ?? "lg:col-span-6")}>
                <CafeCard
                  cafe={cafe}
                  status={now ? statusAt(cafe, now) : null}
                  priority={index < 2}
                  variant={index === 0 ? "feature" : "poster"}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-5 lg:px-8" aria-labelledby="kecamatan">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker">Direktori</p>
            <h2 id="kecamatan" className="mt-3 text-title">
              Satu kafe tiap kecamatan
            </h2>
          </div>
          <Link to="/peta" className="rule-draw mb-1 inline-flex min-h-11 items-center gap-1 text-sm font-medium">
            Buka peta
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
        {loading ? (
          <div className="mt-8" aria-busy="true">
            {Array.from({ length: 6 }, (_, index) => (
              <DirectoryRowSkeleton key={index} />
            ))}
          </div>
        ) : (
          <ol className="mt-8">
            {cafes.map((cafe, index) => (
              <li key={cafe.slug} className={cn(index % 2 === 1 && "sm:pl-12 lg:pl-36")}>
                <Link
                  to="/kafe/$slug"
                  params={{ slug: cafe.slug }}
                  className="group grid grid-cols-[4.75rem_minmax(0,1fr)] items-end gap-4 py-5 sm:grid-cols-[6.5rem_minmax(0,1fr)]"
                >
                  <img
                    src={cafe.image}
                    alt=""
                    width={160}
                    height={200}
                    loading="lazy"
                    className={cn(
                      "photo-zoom w-full object-cover",
                      index % 3 === 0 ? "aspect-[3/4]" : "aspect-square",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="kicker">
                      {String(index + 1).padStart(2, "0")}
                      <span className="text-muted"> {cafe.district}</span>
                    </span>
                    <span className="name-nudge mt-1 block font-display text-3xl leading-none sm:text-5xl">
                      {cafe.name}
                    </span>
                    <span className="mt-2 block text-sm text-muted">
                      {cafe.neighborhood} · {prices[cafe.price].label} · {formatHours(cafe)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="mt-24 lg:mt-32">
        <Link
          to="/roulette"
          className="group block bg-ink px-5 py-16 text-paper transition-colors duration-200 hover:bg-ink-soft lg:ml-16 lg:px-16 lg:py-24"
        >
          <p className="kicker text-paper/70">Tidak ingin memilih</p>
          <span className="name-nudge mt-4 block max-w-3xl font-display text-5xl leading-none sm:text-7xl">
            Putar sekali.
            <span className="mt-2 block italic text-paper/75">Dapat satu meja.</span>
          </span>
        </Link>
        <Link
          to="/peta"
          className="group mt-8 block max-w-md px-5 lg:ml-48"
        >
          <p className="kicker">Di peta</p>
          <span className="name-nudge mt-2 block font-display text-4xl leading-none">
            {loading ? "Memuat titik" : `${cafes.length} titik di kota`}
          </span>
          <span className="mt-3 block text-sm text-ink-soft">Dari Sempaja sampai Loa Janan Ilir.</span>
        </Link>
      </section>

      <FooterNote />
    </div>
  );
}
