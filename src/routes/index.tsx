import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, MapPin, Star } from "lucide-react";
import { MapView } from "@/components/map-view";
import { NearbyCard } from "@/components/nearby-card";
import { Onboarding } from "@/components/onboarding";
import { CITY_CENTER } from "@/data/cafes";
import { cafeRating, distanceKm, statusAt, useNow } from "@/lib/cafe-time";
import { cn } from "@/lib/cn";
import { useCafes } from "@/lib/use-cafes";

const INTRO_KEY = "ngopi-intro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Kafe di dekatmu · NgopiSamarinda" }],
  }),
  component: Home,
});

function Home() {
  const now = useNow();
  const { cafes, status } = useCafes();
  const loading = status === "loading";
  const [sort, setSort] = useState<"dekat" | "nilai">("dekat");
  const [selected, setSelected] = useState<string | undefined>();
  const [intro, setIntro] = useState(false);

  useEffect(() => {
    const replay = sessionStorage.getItem("ngopi-replay") === "1";
    if (replay) sessionStorage.removeItem("ngopi-replay");
    if (replay || localStorage.getItem(INTRO_KEY) !== "1") setIntro(true);
  }, []);

  const rows = useMemo(() => {
    const next = cafes.map((cafe) => ({
      cafe,
      km: distanceKm(cafe.lat, cafe.lng, CITY_CENTER.lat, CITY_CENTER.lng),
      rating: cafeRating(cafe.slug),
    }));
    next.sort((a, b) => (sort === "dekat" ? a.km - b.km : b.rating - a.rating));
    return next;
  }, [cafes, sort]);

  function finishIntro() {
    localStorage.setItem(INTRO_KEY, "1");
    setIntro(false);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="home-map relative shrink-0">
        <div className="map-overlay pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3">
          <p className="pointer-events-auto inline-flex h-11 items-center gap-2 rounded-full bg-paper/95 px-3 text-sm shadow-lift">
            <MapPin className="size-4" aria-hidden="true" />
            Samarinda
            <ChevronDown className="size-4 text-muted" aria-hidden="true" />
          </p>
        </div>
        <div className="h-full w-full">
          <MapView cafes={cafes} selected={selected} onSelect={(slug) => setSelected(slug)} />
        </div>
      </div>
      <section className="min-h-0 flex-1 overflow-y-auto bg-paper px-4 pt-5 pb-6">
        <h1 className="font-display text-3xl leading-none">Kafe di dekatmu</h1>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            aria-pressed={sort === "dekat"}
            onClick={() => setSort("dekat")}
            className={cn(
              "h-10 rounded-full px-4 text-sm",
              sort === "dekat" ? "bg-ink text-paper" : "border border-line text-ink",
            )}
          >
            Terdekat
          </button>
          <button
            type="button"
            aria-pressed={sort === "nilai"}
            onClick={() => setSort("nilai")}
            className={cn(
              "inline-flex h-10 items-center gap-1 rounded-full px-4 text-sm",
              sort === "nilai" ? "bg-ink text-paper" : "border border-line text-ink",
            )}
          >
            Nilai tertinggi
            <Star className="size-3.5 fill-star text-star" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          {loading
            ? Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="h-48 animate-pulse rounded-xl bg-paper-2" />
              ))
            : rows.map(({ cafe, km }) => (
                <div key={cafe.slug} className={selected === cafe.slug ? "ring-2 ring-ink rounded-xl" : undefined}>
                  <NearbyCard cafe={cafe} km={km} status={now ? statusAt(cafe, now) : null} />
                </div>
              ))}
        </div>
      </section>
      {intro ? <Onboarding onDone={finishIntro} /> : null}
    </div>
  );
}
