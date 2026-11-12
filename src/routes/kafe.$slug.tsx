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
      <div className="mt-4 aspect-[4/5] animate-pulse rounded-xl bg-paper-2 sm:aspect-[5/4]" />
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
    <article className="pb-24 lg:pb-0">
      <div className="mx-auto lg:grid lg:max-w-6xl lg:grid-cols-12 lg:items-end lg:gap-8 lg:px-8 lg:pt-8">
        <div className="relative lg:col-span-7">
          <img
            src={cafe.image}
            alt={cafe.imageAlt}
            width={1200}
            height={1600}
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:rounded-xl"
          />
          <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
            <Link
              to="/jelajah"
              className="press inline-flex h-11 items-center rounded-full bg-paper px-4 text-sm text-ink shadow-lift transition-colors duration-150 hover:bg-paper-2"
            >
              Jelajah
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => void copyCafeLink()}
                aria-label="Salin tautan kafe"
                className="press inline-flex size-11 items-center justify-center rounded-full bg-paper text-ink shadow-lift transition-colors duration-150 hover:bg-paper-2"
              >
                <Share2 className="size-4" />
              </button>
              <SaveButton slug={cafe.slug} name={cafe.name} />
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-10 rounded-t-3xl bg-paper px-5 pt-6 lg:col-span-5 lg:mt-0 lg:rounded-none lg:px-0 lg:pt-4">
          <p className="kicker">Data contoh · {cafe.district}</p>
          <h1 className="mt-3 text-display">{cafe.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">{cafe.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={cn(
                "inline-flex h-8 items-center rounded-full px-3 text-sm font-medium",
                state?.open ? "bg-olive text-paper" : "bg-paper-2 text-ink",
              )}
            >
              {state ? (state.open ? "Buka" : "Tutup") : "Jam"}
            </span>
            <span className="inline-flex h-8 items-center rounded-full bg-paper-2 px-3 text-sm text-ink-soft">
              {prices[cafe.price].label} · {prices[cafe.price].range}
            </span>
            <span className="inline-flex h-8 items-center rounded-full bg-paper-2 px-3 text-sm text-ink-soft">
              {formatKm(km)} dari {CITY_CENTER.label}
            </span>
          </div>
          <p className="mt-3 text-sm text-muted">{cafe.neighborhood}</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl px-5 lg:px-8">
        <CrowdReport
          fresh={fresh}
          own={own}
          nowMs={nowMs}
          onSubmit={submitCrowd}
        />
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-8">
        <div>
          <div className="space-y-4">
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
          <section className="rounded-xl bg-paper-2 p-5 ring-1 ring-line">
            <p className="kicker">Sekarang</p>
            <p className="mt-3 font-display text-3xl">{state ? (state.open ? "Buka" : "Tutup") : "—"}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-ink-soft">
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
                    className="press inline-flex h-11 items-center rounded-full border border-line px-3 text-sm transition-colors duration-150 hover:border-ink hover:bg-paper-2"
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
        <section className="mx-auto mt-16 max-w-6xl px-5 lg:px-8">
          <h2 className="text-title">Suasana yang berdekatan</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  to="/kafe/$slug"
                  params={{ slug: item.slug }}
                  className="group flex items-center gap-3 rounded-xl bg-paper-2 p-3 ring-1 ring-transparent transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lift hover:ring-line"
                >
                  <img src={item.image} alt="" width={96} height={96} className="size-16 shrink-0 rounded-lg object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate font-display text-xl transition-colors duration-150 group-hover:text-terracotta">
                      {item.name}
                    </span>
                    <span className="block truncate text-sm text-muted">
                      {item.district} · {prices[item.price].label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <FooterNote />
      <div className="above-tab fixed inset-x-0 z-30 border-t border-line bg-paper/95 px-4 py-2 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {state ? (state.open ? "Buka sekarang" : "Sedang tutup") : "Jam contoh"}
              <span className="font-normal text-muted"> · {formatHours(cafe)}</span>
            </p>
            <p className="truncate text-xs text-muted">
              {fresh
                ? `${crowdLevelLabel[fresh.level]} · ${formatCrowdAgo(fresh.at, nowMs)}`
                : "Belum ada laporan keramaian"}
            </p>
          </div>
          <a
            href="#keramaian"
            className="press inline-flex h-11 shrink-0 items-center rounded-full bg-terracotta px-4 text-sm font-medium text-paper transition-colors duration-150 hover:bg-ink"
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
    <section id="keramaian" className="scroll-mt-24 rounded-xl bg-olive-soft p-5 sm:p-6">
      <p className="kicker">Dari orang yang sedang di sana</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-3xl">Keramaian sekarang</h2>
        {own ? (
          <p className="text-sm font-medium">Kamu: {crowdLevelLabel[own.level]}</p>
        ) : null}
      </div>
      {fresh ? (
        <p className="mt-2 max-w-lg text-ink-soft">
          {crowdCopy[fresh.level]} Dilaporkan {formatCrowdAgo(fresh.at, nowMs)}.
        </p>
      ) : (
        <p className="mt-2 max-w-lg text-ink-soft">Belum ada laporan terbaru. Kalau kamu sedang di sana, bantu yang lain.</p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {crowdLevels.map((level) => {
          const selected = own?.level === level;
          return (
            <button
              key={level}
              type="button"
              onClick={(event) => onSubmit(level, event.currentTarget)}
              aria-pressed={selected}
              className={cn(
                "press flex min-h-16 flex-col items-start justify-center rounded-lg px-3 text-left transition-colors duration-150",
                selected ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-2",
              )}
            >
              <span className="font-medium">{crowdLevelLabel[level]}</span>
              <span className={cn("text-xs", selected ? "text-paper/70" : "text-muted")}>{crowdHint[level]}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        Satu laporan per kafe tiap 10 menit. Tersimpan di perangkat ini dan basi setelah 90 menit.
      </p>
    </section>
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
