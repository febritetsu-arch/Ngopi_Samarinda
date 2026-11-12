import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { cafes as staticCafes, moodOrder, moods, prices, type Cafe, type MoodId } from "@/data/cafes";
import { SaveButton } from "@/components/save-button";
import { cn } from "@/lib/cn";
import { useCafes } from "@/lib/use-cafes";

export const Route = createFileRoute("/roulette")({
  head: () => ({
    meta: [{ title: "Cafe Roulette · NgopiSamarinda" }],
  }),
  component: Roulette,
});

function Roulette() {
  const [mood, setMood] = useState<MoodId | "semua">("semua");
  const [shown, setShown] = useState<Cafe | null>(null);
  const [locked, setLocked] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const timer = useRef<number | null>(null);

  const { cafes, status } = useCafes();
  const source = status === "ready" ? cafes : staticCafes;
  const pool = source.filter((cafe) => mood === "semua" || cafe.moods.includes(mood));

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function spin() {
    if (spinning || pool.length === 0) return;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(pick);
      setLocked(true);
      return;
    }
    setSpinning(true);
    setLocked(false);
    let step = 0;
    const steps = 12;
    const tick = () => {
      const flash = pool[step % pool.length];
      setShown(step < steps - 1 ? flash : pick);
      step += 1;
      if (step < steps) {
        timer.current = window.setTimeout(tick, 36 + step * 14);
      } else {
        setSpinning(false);
        setLocked(true);
      }
    };
    tick();
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 py-8">
      <p className="kicker text-paper/60">Cafe Roulette</p>
      <h1 className="mt-3 text-title text-paper">Satu putaran. Satu meja.</h1>
      <p className="mt-3 text-paper/75">
        Dipilih acak dari katalog contoh. Tidak ada algoritma rahasia — hanya suasana yang kamu tentukan.
      </p>

      <div className="scroll-row mt-6" aria-label="Saring suasana sebelum putar">
        <MoodChip on={mood === "semua"} onClick={() => setMood("semua")} label="Semua" />
        {moodOrder.map((id) => (
          <MoodChip key={id} on={mood === id} onClick={() => setMood(id)} label={moods[id].label} />
        ))}
      </div>

      <div className="relative mt-8 overflow-hidden rounded-xl bg-ink-soft" aria-live="polite" aria-busy={spinning}>
        {shown ? (
          <img
            src={shown.image}
            alt={locked ? shown.imageAlt : ""}
            width={1200}
            height={1600}
            className={cn("aspect-[3/4] w-full object-cover", spinning && "opacity-80")}
          />
        ) : (
          <div className="grid aspect-[3/4] place-items-center px-8 text-center">
            <p className="font-display text-4xl text-paper">Siap, kalau kamu siap.</p>
          </div>
        )}
        {shown ? (
          <div className="absolute inset-x-0 bottom-0 scrim p-5">
            <p className="text-sm text-paper/80">{shown.district}</p>
            <p className="font-display text-4xl text-paper">{shown.name}</p>
            {locked ? <p className="mt-2 max-w-sm text-sm text-paper/80">{shown.blurb}</p> : null}
          </div>
        ) : null}
        {locked && shown ? (
          <div className="absolute top-4 right-4">
            <SaveButton slug={shown.slug} name={shown.name} />
          </div>
        ) : null}
      </div>

      {locked && shown ? (
        <p className="mt-4 text-sm text-paper/70">
          {prices[shown.price].label} · {prices[shown.price].range} · {shown.neighborhood}
        </p>
      ) : (
        <p className="mt-4 text-sm text-paper/60">{pool.length} kafe dalam putaran ini</p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={spin}
          disabled={spinning}
          className="press inline-flex h-12 flex-1 items-center justify-center rounded-full bg-paper px-5 font-medium text-ink disabled:opacity-60"
        >
          {spinning ? "Memutar…" : locked ? "Putar lagi" : "Putar"}
        </button>
        {locked && shown ? (
          <Link
            to="/kafe/$slug"
            params={{ slug: shown.slug }}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-paper/30 px-5 text-paper"
          >
            Lihat kafe
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function MoodChip({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "h-11 shrink-0 rounded-full px-4 text-sm",
        on ? "bg-paper text-ink" : "border border-paper/25 text-paper",
      )}
    >
      {label}
    </button>
  );
}
