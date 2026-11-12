import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  AirVent,
  Car,
  CigaretteOff,
  Clock,
  Leaf,
  MapPin,
  Moon,
  Share2,
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
import {
  crowdLevelLabel,
  formatCrowdAgo,
  useCrowd,
  useFreshReport,
  useOwnReport,
  type CrowdLevel,
} from "@/lib/crowd";
import { insertCrowdReport } from "@/lib/supabase";
import { toast } from "sonner";
import { useCafes } from "@/lib/use-cafes";

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

const crowdCopy: Record<CrowdLevel, string> = {
  sepi: "Sepi — meja masih longgar.",
  sedang: "Sedang — ada orang, masih ada kursi.",
  ramai: "Ramai — datang lebih awal kalau butuh meja.",
  penuh: "Penuh — hampir tidak ada meja kosong.",
};

const crowdLevels: CrowdLevel[] = ["sepi", "sedang", "ramai", "penuh"];

export const Route = createFileRoute("/kafe/$slug")({
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
    <div className="mx-auto max-w-lg px-5 py-24">
      <p className="kicker">Tidak ada</p>
      <h1 className="mt-4 text-mega">Hilang.</h1>
      <p className="mt-4 text-ink-soft">Kafe ini tidak ada di katalog contoh.</p>
      <Link to="/jelajah" className="rule-draw mt-6 inline-flex min-h-11 items-center text-sm font-medium">
        Kembali ke jelajah
      </Link>
    </div>
  );
}

function CafeDetail() {
  const { slug } = Route.useParams();
  const catalog = useCafes();
  const cafe =
    catalog.status === "ready" ? catalog.cafes.find((item) => item.slug === slug) : getCafe(slug);
  if (!cafe && catalog.status === "loading") return <DetailSkeleton />;
  if (!cafe) throw notFound();
  return <CafeBody cafe={cafe} catalog={catalog.status === "ready" ? catalog.cafes : cafes} />;
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 lg:px-8" aria-busy="true" aria-live="polite">
      <p className="text-sm text-muted">Memuat kafe…</p>
      <div className="mt-6 aspect-[4/5] animate-pulse bg-paper-2 sm:aspect-[5/4]" />
    </div>
  );
}

async function copyCafeLink() {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    toast("Tautan disalin.");
    return;
  } catch {
    /* some browsers block the async clipboard API */
  }
  const field = document.createElement("textarea");
  field.value = url;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.left = "-999px";
  document.body.append(field);
  field.select();
  const copied = document.execCommand("copy");
  field.remove();
  toast(copied ? "Tautan disalin." : "Tidak bisa menyalin tautan.");
}

function CafeBody({ cafe, catalog }: { cafe: Cafe; catalog: Cafe[] }) {
  const now = useNow();
  const state = now ? statusAt(cafe, now) : null;
  const km = distanceKm(cafe.lat, cafe.lng, CITY_CENTER.lat, CITY_CENTER.lng);
  const related = catalog
    .filter((item) => item.slug !== cafe.slug && item.moods.some((mood) => cafe.moods.includes(mood)))
    .slice(0, 3);
  const mapHref = `https://www.openstreetmap.org/?mlat=${cafe.lat}&mlon=${cafe.lng}#map=17/${cafe.lat}/${cafe.lng}`;
  const fresh = useFreshReport(cafe.slug);
  const own = useOwnReport(cafe.slug);
  const report = useCrowd((s) => s.report);
  const nowMs = now?.getTime();

  async function submitCrowd(level: CrowdLevel, button: HTMLButtonElement) {
    const result = report(cafe.slug, level);
    if (result === "cooldown") {
      toast("Kamu baru saja lapor. Coba lagi nanti.");
      return;
    }
    button.classList.remove("crowd-pop");
    void button.offsetWidth;
    button.classList.add("crowd-pop");
    toast("Laporan terkirim. Terima kasih!");

    // Kirim juga ke Supabase (fire-and-forget)
    insertCrowdReport(cafe.slug, level).catch(() => {
      // Diam-diam gagal, localStorage tetap jadi sumber utama
    });
  }

  return (
    <article className="pb-28">
      <div className="lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-12 lg:px-8 lg:pt-8">
        <div className="relative lg:col-span-7 lg:col-start-6 lg:row-start-1">
          <img
            src={cafe.image}
            alt={cafe.imageAlt}
            width={1200}
            height={1600}
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/4]"
          />
          <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
            <Link
              to="/jelajah"
              className="press inline-flex h-11 items-center bg-paper px-4 text-sm text-ink shadow-lift transition-colors duration-150 hover:bg-paper-2"
            >
              Jelajah
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void copyCafeLink()}
                aria-label="Salin tautan kafe"
                className="press inline-flex size-11 items-center justify-center bg-paper text-ink shadow-lift transition-colors duration-150 hover:bg-paper-2"
              >
                <Share2 className="size-4" />
              </button>
              <SaveButton slug={cafe.slug} name={cafe.name} />
            </div>
          </div>
        </div>

        <div className="relative z-10 bg-paper px-5 pt-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:flex lg:flex-col lg:justify-end lg:bg-transparent lg:px-0 lg:pt-0 lg:pr-10 lg:pb-6">
          <p className="kicker">
            Data contoh · {cafe.district}
          </p>
          <h1 className="mt-3 max-w-xl text-display">{cafe.name}</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{cafe.blurb}</p>
          <dl className="mt-6 max-w-sm space-y-2 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Status</dt>
              <dd className={cn("font-medium", state?.open ? "text-olive" : "text-ink")}>
                {state ? (state.open ? "Buka" : "Tutup") : "Jam contoh"}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Harga</dt>
              <dd>
                {prices[cafe.price].label} · {prices[cafe.price].range}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Jarak</dt>
              <dd>
                {formatKm(km)} dari {CITY_CENTER.label}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Kawasan</dt>
              <dd>{cafe.neighborhood}</dd>
            </div>
          </dl>
        </div>
      </div>

      <CrowdReport fresh={fresh} own={own} nowMs={nowMs} onSubmit={submitCrowd} />

      <div className="mx-auto mt-16 grid max-w-6xl gap-16 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <div>
            {cafe.story.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  "max-w-xl",
                  index === 0 ? "font-display text-2xl leading-snug text-ink sm:text-3xl" : "mt-5 text-ink-soft",
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <h2 className="mt-20 text-title">Menu contoh</h2>
          <ul className="mt-8 max-w-xl space-y-7">
            {cafe.menu.map((item, index) => (
              <li
                key={item.name}
                className={cn("flex items-baseline justify-between gap-6", index % 2 === 1 && "sm:pl-10")}
              >
                <span>
                  <span className="block font-display text-2xl leading-none">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted">{item.note}</span>
                </span>
                <span className="shrink-0 font-display text-xl text-terracotta tabular-nums">
                  {formatRp(item.price)}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-sm text-sm text-muted">Andalan rumah: {cafe.signature}.</p>
        </div>

        <aside className="space-y-12 lg:col-span-4 lg:col-start-9 lg:sticky lg:top-24 lg:self-start">
          <section className="bg-paper-2 px-5 py-6">
            <p className="kicker">Sekarang</p>
            <p className="mt-3 font-display text-5xl leading-none">{state ? (state.open ? "Buka" : "Tutup") : "—"}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
              <Clock className="size-4 text-olive" />
              <span className="tabular-nums">
                {formatHours(cafe)} WITA
                {state ? ` · ${state.clock}` : ""}
              </span>
            </p>
            <CrowdBars cafe={cafe} hour={state?.hour} />
            <p className="mt-3 text-xs text-muted">Pola di bawah adalah contoh, bukan data real-time.</p>
          </section>

          <section>
            <h2 className="font-display text-3xl">Fasilitas</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
              {cafe.facilities.map((id) => {
                const Icon = facilityIcons[id];
                return (
                  <li key={id} className="inline-flex items-center gap-2 text-sm">
                    <Icon className="size-4 text-olive" />
                    {facilities[id].label}
                  </li>
                );
              })}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-3xl">Suasana</h2>
            <ul className="mt-4 flex flex-wrap gap-x-4">
              {cafe.moods.map((id) => (
                <li key={id}>
                  <Link
                    to="/jelajah"
                    search={{ mood: id }}
                    className="rule-draw press inline-flex h-11 items-center text-sm font-medium"
                  >
                    {moods[id].label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 font-display text-3xl">
              <MapPin className="size-5" />
              Lokasi contoh
            </h2>
            <p className="mt-3 text-sm text-ink-soft">{cafe.address}</p>
            <div className="mt-4 h-56 overflow-hidden">
              <MapView cafes={[cafe]} selected={cafe.slug} onSelect={() => undefined} />
            </div>
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="rule-draw mt-3 inline-flex min-h-11 items-center text-sm font-medium"
            >
              Buka di OpenStreetMap
            </a>
          </section>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="mx-auto mt-24 max-w-6xl px-5 lg:px-8">
          <h2 className="text-title">Suasana yang berdekatan</h2>
          <ul className="mt-8 flex gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-12 lg:overflow-visible">
            {related.map((item, index) => (
              <li
                key={item.slug}
                className={cn(
                  "w-64 shrink-0 lg:w-auto",
                  index === 0 && "lg:col-span-5",
                  index === 1 && "lg:col-span-4 lg:mt-12",
                  index === 2 && "lg:col-span-3",
                )}
              >
                <Link to="/kafe/$slug" params={{ slug: item.slug }} className="group block">
                  <img
                    src={item.image}
                    alt=""
                    width={640}
                    height={800}
                    className={cn(
                      "photo-zoom w-full object-cover",
                      index === 1 ? "aspect-square" : "aspect-[4/5]",
                    )}
                  />
                  <span className="name-nudge mt-3 block font-display text-2xl leading-none">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {item.district} · {prices[item.price].label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <FooterNote />
      <div className="dock fixed z-30 inset-x-3 lg:inset-x-auto lg:left-8 lg:w-96">
        <div className="flex items-center gap-3 bg-ink px-4 py-3 text-paper shadow-lift">
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-xl leading-none">{cafe.name}</p>
            <p className="mt-1 truncate text-xs text-paper/70">
              {state ? (state.open ? "Buka" : "Tutup") : "Jam contoh"} · {formatHours(cafe)}
              {fresh ? ` · ${crowdLevelLabel[fresh.level]}` : ""}
            </p>
          </div>
          <a
            href="#keramaian"
            className="press inline-flex h-11 shrink-0 items-center bg-terracotta px-4 text-sm font-medium text-paper transition-colors duration-150 hover:bg-paper hover:text-ink"
          >
            Lapor
          </a>
        </div>
      </div>
    </article>
  );
}

const crowdHint: Record<CrowdLevel, string> = {
  sepi: "Meja masih longgar",
  sedang: "Masih ada kursi",
  ramai: "Datang lebih awal",
  penuh: "Hampir tidak ada meja",
};

const crowdSize: Record<CrowdLevel, string> = {
  sepi: "min-h-24",
  sedang: "min-h-32 sm:min-h-36",
  ramai: "min-h-40 sm:min-h-48",
  penuh: "min-h-28 sm:mt-6",
};

function CrowdReport({
  fresh,
  own,
  nowMs,
  onSubmit,
}: {
  fresh: { level: CrowdLevel; at: number } | null;
  own: { level: CrowdLevel; at: number } | null;
  nowMs: number | undefined;
  onSubmit: (level: CrowdLevel, button: HTMLButtonElement) => void;
}) {
  return (
    <section id="keramaian" className="scroll-mt-24 mt-14 bg-ink px-5 py-12 text-paper sm:px-8 sm:py-16 lg:mt-20">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <p className="kicker text-paper/70">Dari orang yang sedang di sana</p>
          <h2 className="mt-3 font-display text-5xl leading-none sm:text-7xl">
            Keramaian
            <span className="mt-1 block italic text-terracotta">sekarang.</span>
          </h2>
          {own ? <p className="mt-4 text-sm font-medium text-paper">Kamu: {crowdLevelLabel[own.level]}</p> : null}
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          {fresh ? (
            <p className="text-lg text-paper/80">
              {crowdCopy[fresh.level]} Dilaporkan {formatCrowdAgo(fresh.at, nowMs)}.
            </p>
          ) : (
            <p className="text-lg text-paper/80">
              Belum ada laporan terbaru. Kalau kamu sedang di sana, bantu yang lain.
            </p>
          )}
          <p className="mt-3 text-xs text-paper/55">
            Satu laporan per kafe tiap 10 menit. Tersimpan di perangkat ini dan basi setelah 90 menit.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 items-end gap-3 sm:grid-cols-4">
        {crowdLevels.map((level) => {
          const selected = own?.level === level;
          return (
            <button
              key={level}
              type="button"
              onClick={(event) => onSubmit(level, event.currentTarget)}
              aria-pressed={selected}
              className={cn(
                "press flex flex-col items-start justify-end px-3 py-3 text-left transition-colors duration-150",
                crowdSize[level],
                selected ? "bg-terracotta text-paper" : "bg-paper text-ink hover:bg-olive-soft",
              )}
            >
              <span className="font-display text-2xl leading-none sm:text-3xl">{crowdLevelLabel[level]}</span>
              <span className={cn("mt-2 text-xs", selected ? "text-paper/80" : "text-muted")}>{crowdHint[level]}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function CrowdBars({ cafe, hour }: { cafe: Cafe; hour?: number }) {
  const heights = ["h-2", "h-4", "h-7", "h-10"] as const;
  return (
    <div className="mt-6 flex h-16 items-end gap-1" aria-hidden="true">
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
