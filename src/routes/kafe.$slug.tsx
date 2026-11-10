import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  AirVent,
  Car,
  CigaretteOff,
  Clock,
  Leaf,
  MapPin,
  Moon,
  Music,
  PawPrint,
  Plug,
  Trees,
  Users,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { FooterNote } from "@/components/footer-note";
import { SaveButton } from "@/components/save-button";
import { MapView } from "@/components/map-view";
import {
  CITY_CENTER,
  cafes,
  facilities,
  getCafe,
  moods,
  prices,
  type Cafe,
  type FacilityId,
} from "@/data/cafes";
import { distanceKm, formatHours, formatKm, formatRp, statusAt, useNow } from "@/lib/cafe-time";
import { cn } from "@/lib/cn";

const facilityIcons: Record<FacilityId, LucideIcon> = {
  wifi: Wifi,
  colokan: Plug,
  outdoor: Trees,
  ac: AirVent,
  parkir: Car,
  "bebas-asap": CigaretteOff,
  live: Music,
  meeting: Users,
  pet: PawPrint,
  vegan: Leaf,
  larut: Moon,
};

const crowdCopy = {
  sepi: "Sepi — meja masih longgar.",
  sedang: "Sedang — ada orang, masih ada kursi.",
  ramai: "Ramai — datang lebih awal kalau butuh meja.",
} as const;

export const Route = createFileRoute("/kafe/$slug")({
  loader: ({ params }) => {
    const cafe = getCafe(params.slug);
    if (!cafe) throw notFound();
    return cafe;
  },
  head: ({ params }) => {
    const cafe = getCafe(params.slug);
    return {
      meta: [
        {
          title: cafe ? `${cafe.name} · NgopiSamarinda` : "Kafe tidak ditemukan · NgopiSamarinda",
        },
      ],
    };
  },
  notFoundComponent: MissingCafe,
  component: CafeDetail,
});

function MissingCafe() {
  return (
    <div className="mx-auto max-w-lg px-5 py-20">
      <p className="kicker">Tidak ada</p>
      <h1 className="mt-3 text-title">Kafe ini tidak ada di katalog contoh.</h1>
      <Link to="/jelajah" className="mt-6 inline-flex min-h-11 items-center text-sm underline">
        Kembali ke jelajah
      </Link>
    </div>
  );
}

function CafeDetail() {
  const cafe = Route.useLoaderData();
  const now = useNow();
  const state = now ? statusAt(cafe, now) : null;
  const km = distanceKm(cafe.lat, cafe.lng, CITY_CENTER.lat, CITY_CENTER.lng);
  const related = cafes
    .filter((item) => item.slug !== cafe.slug && item.moods.some((mood) => cafe.moods.includes(mood)))
    .slice(0, 3);
  const mapHref = `https://www.openstreetmap.org/?mlat=${cafe.lat}&mlon=${cafe.lng}#map=17/${cafe.lat}/${cafe.lng}`;

  return (
    <article>
      <div className="relative">
        <img
          src={cafe.image}
          alt={cafe.imageAlt}
          width={1200}
          height={1600}
          fetchPriority="high"
          className="aspect-[3/4] max-h-[82vh] w-full object-cover sm:aspect-[4/3] lg:aspect-[16/9]"
        />
        <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
          <Link
            to="/jelajah"
            className="inline-flex h-11 items-center rounded-full bg-paper px-4 text-sm text-ink"
          >
            Jelajah
          </Link>
          <SaveButton slug={cafe.slug} name={cafe.name} />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8 lg:py-12">
        <div>
          <p className="kicker">Data contoh · {cafe.district}</p>
          <h1 className="mt-3 text-display">{cafe.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">{cafe.blurb}</p>
          <p className="mt-3 text-sm text-muted">
            {cafe.neighborhood} · {prices[cafe.price].label} · {prices[cafe.price].range} ·{" "}
            {formatKm(km)} dari {CITY_CENTER.label}
          </p>
          <div className="mt-8 space-y-4">
            {cafe.story.map((paragraph) => (
              <p key={paragraph} className="max-w-xl text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-12 text-title">Menu contoh</h2>
          <ul className="mt-4 max-w-xl border-t border-line">
            {cafe.menu.map((item) => (
              <li key={item.name} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <span>
                  <span className="block font-medium">{item.name}</span>
                  <span className="text-sm text-muted">{item.note}</span>
                </span>
                <span className="shrink-0 tabular-nums">{formatRp(item.price)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">Andalan rumah: {cafe.signature}.</p>
        </div>

        <aside className="space-y-8 lg:sticky lg:top-20 lg:self-start">
          <section className="rounded-lg border border-line bg-paper-2 p-5">
            <p className="kicker">Sekarang</p>
            <p className="mt-3 font-display text-3xl">{state ? (state.open ? "Buka" : "Tutup") : "—"}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
              <Clock className="size-4 text-olive" />
              <span className="tabular-nums">
                {formatHours(cafe)} WITA
                {state ? ` · ${state.clock}` : ""}
              </span>
            </p>
            {state?.open ? <p className="mt-3 text-sm">{crowdCopy[state.crowd]}</p> : null}
            <CrowdBars cafe={cafe} hour={state?.hour} />
            <p className="mt-3 text-xs text-muted">Perkiraan keramaian adalah pola contoh, bukan hitungan pengunjung.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Fasilitas</h2>
            <ul className="mt-2">
              {cafe.facilities.map((id) => {
                const Icon = facilityIcons[id];
                return (
                  <li key={id} className="flex items-center gap-3 border-b border-line py-3 text-sm">
                    <Icon className="size-4 text-olive" />
                    {facilities[id].label}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Suasana</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {cafe.moods.map((id) => (
                <li key={id}>
                  <Link
                    to="/jelajah"
                    search={{ mood: id }}
                    className="inline-flex h-10 items-center rounded-full border border-line px-3 text-sm"
                  >
                    {moods[id].label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 font-display text-2xl">
              <MapPin className="size-5" />
              Lokasi contoh
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{cafe.address}</p>
            <div className="mt-3 h-52 overflow-hidden rounded-lg">
              <MapView cafes={[cafe]} selected={cafe.slug} onSelect={() => undefined} />
            </div>
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm underline decoration-line underline-offset-4"
            >
              Buka di OpenStreetMap
            </a>
          </section>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto max-w-6xl px-5 pb-4 lg:px-8">
          <h2 className="text-title">Suasana yang berdekatan</h2>
          <ul className="mt-4 border-t border-line">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/kafe/$slug"
                  params={{ slug: item.slug }}
                  className="flex items-center justify-between gap-4 border-b border-line py-4"
                >
                  <span>
                    <span className="block font-display text-2xl">{item.name}</span>
                    <span className="text-sm text-muted">{item.district}</span>
                  </span>
                  <span className="text-sm text-muted">{prices[item.price].label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <FooterNote />
    </article>
  );
}

function CrowdBars({ cafe, hour }: { cafe: Cafe; hour?: number }) {
  const heights = ["h-2", "h-4", "h-7", "h-10"] as const;
  return (
    <div className="mt-5 flex h-12 items-end gap-1" aria-hidden="true">
      {cafe.crowd.map((level, index) => (
        <span
          key={index}
          className={cn(
            "flex-1 rounded-sm",
            heights[level] ?? "h-2",
            hour === index ? "bg-terracotta" : "bg-ink/15",
          )}
        />
      ))}
    </div>
  );
}
