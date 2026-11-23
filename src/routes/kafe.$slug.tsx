import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  AirVent,
  Car,
  ChevronDown,
  CigaretteOff,
  Coffee,
  Leaf,
  MapPin,
  Moon,
  Music,
  PawPrint,
  Plug,
  Share2,
  Star,
  Trees,
  Users,
  Utensils,
  Wifi,
  type LucideIcon,
} from "lucide-react";
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
import { cafePhoto } from "@/lib/cafe-photo";
import { cafeRating, distanceKm, formatHours, formatKm, formatRp, statusAt, useNow } from "@/lib/cafe-time";
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

const weekdays = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

function CafeBody({ cafe, catalog }: { cafe: Cafe; catalog: Cafe[] }) {
  const now = useNow();
  const state = now ? statusAt(cafe, now) : null;
  const [more, setMore] = useState(false);
  const [been, setBeen] = useState(false);
  useEffect(() => {
    setBeen(localStorage.getItem(`ngopi-been:${cafe.slug}`) === "1");
  }, [cafe.slug]);
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

  const mood = cafe.moods[0];
  const rating = cafeRating(cafe.slug).toFixed(1);
  const facts = [
    { icon: Coffee, label: "Jenis", value: mood ? moods[mood].label : "Kafe" },
    { icon: Users, label: "Suasana", value: cafe.moods.map((id) => moods[id].label).slice(0, 2).join(", ") },
    { icon: Utensils, label: "Makanan", value: cafe.menu.length > 2 ? "Ada" : "Minuman" },
    { icon: Plug, label: "Colokan", value: cafe.facilities.includes("colokan") ? "Ada" : "Tidak" },
  ];

  function markBeen() {
    const next = !been;
    setBeen(next);
    localStorage.setItem(`ngopi-been:${cafe.slug}`, next ? "1" : "0");
  }

  return (
    <article className="mx-auto w-full max-w-lg pb-8">
      <div className="relative">
        <img
          src={cafePhoto(cafe.image, cafe.slug)}
          alt={cafe.imageAlt}
          width={1200}
          height={800}
          fetchPriority="high"
          className="aspect-video w-full object-cover"
        />
        <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
          <Link
            to="/"
            aria-label="Kembali"
            className="grid size-10 place-items-center rounded-full bg-paper text-ink shadow-lift"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <button
            type="button"
            aria-pressed={been}
            onClick={markBeen}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-paper px-3 text-sm shadow-lift"
          >
            <span className={cn("size-4 rounded-full border", been ? "border-open bg-open" : "border-ink")} />
            Sudah mampir?
          </button>
        </div>
      </div>

      <div className="px-4 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-3xl leading-none">{cafe.name}</h1>
          <p className="inline-flex items-center gap-1 text-base font-medium">
            <Star className="size-4 fill-star text-star" aria-hidden="true" />
            <span className="tabular-nums">{rating}</span>
          </p>
        </div>
        <p className="mt-2 text-sm">
          <span className={state?.open ? "font-medium text-open" : "font-medium text-closed"}>
            {state ? (state.open ? "Buka" : "Tutup") : "Jam"}
          </span>
          <span className="text-muted"> · tutup {formatHours(cafe).split("–")[1]}</span>
        </p>

        <h2 className="mt-6 text-lg font-semibold">Detail kafe</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3">
          {facts.map((fact) => (
            <li key={fact.label} className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl border border-line">
                <fact.icon className="size-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm text-muted">{fact.label}</span>
                <span className="block text-sm font-medium">{fact.value}</span>
              </span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={more}
          onClick={() => setMore((value) => !value)}
          className="mx-auto mt-4 flex h-11 items-center gap-1 text-sm text-muted"
        >
          {more ? "Sembunyikan" : "Lihat lebih"}
          <ChevronDown className={cn("size-4", more && "rotate-180")} />
        </button>

        {more ? (
          <div className="mt-2 space-y-6">
            {cafe.story.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
            <ul className="space-y-3">
              {cafe.menu.map((item) => (
                <li key={item.name} className="flex items-baseline justify-between gap-4 text-sm">
                  <span>
                    <span className="block font-medium">{item.name}</span>
                    <span className="text-muted">{item.note}</span>
                  </span>
                  <span className="shrink-0 tabular-nums">{formatRp(item.price)}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">Andalan: {cafe.signature}.</p>
            <ul className="flex flex-wrap gap-2">
              {cafe.facilities.map((id) => {
                const Icon = facilityIcons[id];
                return (
                  <li key={id} className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm">
                    <Icon className="size-4" />
                    {facilities[id].label}
                  </li>
                );
              })}
            </ul>
            <CrowdBars cafe={cafe} hour={state?.hour} />
            <CrowdReport fresh={fresh} own={own} nowMs={nowMs} onSubmit={submitCrowd} />
          </div>
        ) : null}

        <h2 className="mt-6 text-lg font-semibold">Alamat</h2>
        <p className="mt-2 text-sm text-ink-soft">
          {cafe.address}
          <span className="text-muted">
            {" "}
            · {formatKm(km)} dari {CITY_CENTER.label}
          </span>
        </p>
        <div className="mt-3 h-40 overflow-hidden rounded-xl">
          <MapView cafes={[cafe]} selected={cafe.slug} onSelect={() => undefined} />
        </div>

        <h2 className="mt-6 text-lg font-semibold">Jam operasional</h2>
        <ul className="mt-2 space-y-2 text-sm">
          {weekdays.map((day) => (
            <li key={day} className="flex justify-between gap-4">
              <span>{day}</span>
              <span className="tabular-nums text-ink-soft">{formatHours(cafe)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <a
            href={mapHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-medium text-paper"
          >
            <MapPin className="size-4" />
            Rute
          </a>
          <button
            type="button"
            onClick={() => void copyCafeLink()}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ink text-sm font-medium text-paper"
          >
            <Share2 className="size-4" />
            Bagikan
          </button>
        </div>

        {related.length > 0 ? (
          <ul className="mt-8 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link to="/kafe/$slug" params={{ slug: item.slug }} className="text-sm font-medium underline">
                  {item.name}
                </Link>
                <span className="text-sm text-muted"> · {prices[item.price].label}</span>
              </li>
            ))}
          </ul>
        ) : null}
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
