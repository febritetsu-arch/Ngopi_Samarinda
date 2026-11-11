import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { moods, prices, type Cafe } from "@/data/cafes";
import { formatHours, type CafeStatus } from "@/lib/cafe-time";
import { cn } from "@/lib/cn";
import { crowdLevelLabel, formatCrowdAgo, useFreshReport } from "@/lib/crowd";
import { SaveButton } from "@/components/save-button";

const crowdLabel = {
  sepi: "Sepi",
  sedang: "Sedang",
  ramai: "Ramai",
} as const;

function Badge({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "paper" | "olive" | "ink";
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium",
        tone === "paper" && "bg-paper/95 text-ink",
        tone === "olive" && "bg-olive text-paper",
        tone === "ink" && "bg-ink/85 text-paper",
      )}
    >
      {children}
    </span>
  );
}

export function CafeCard({
  cafe,
  status,
  priority = false,
}: {
  cafe: Cafe;
  status: CafeStatus | null;
  priority?: boolean;
}) {
  const fresh = useFreshReport(cafe.slug);
  const primary = cafe.moods[0];
  const open = status?.open;

  return (
    <article className="group relative rounded-xl bg-paper ring-1 ring-line transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lift hover:ring-ink/15">
      <Link
        to="/kafe/$slug"
        params={{ slug: cafe.slug }}
        className="press block rounded-xl focus-visible:outline-offset-4"
      >
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            src={cafe.image}
            alt={cafe.imageAlt}
            width={1200}
            height={1600}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="photo-zoom aspect-[3/4] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 scrim" />
          <div className="absolute top-3 left-3 flex max-w-[70%] flex-wrap gap-1.5">
            <Badge tone={open ? "olive" : "paper"}>
              {open ? <span className="size-1.5 rounded-full bg-paper" aria-hidden="true" /> : null}
              {status ? (open ? "Buka" : "Tutup") : "Jam"}
            </Badge>
            {primary ? <Badge tone="paper">{moods[primary].label}</Badge> : null}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
            {fresh ? (
              <p className="mb-2">
                <Badge tone="ink">
                  {crowdLevelLabel[fresh.level]} · {formatCrowdAgo(fresh.at)}
                </Badge>
              </p>
            ) : null}
            <p className="text-xs font-medium tracking-wide text-paper/80">
              {cafe.neighborhood}, {cafe.district}
            </p>
            <h3 className="mt-1 text-3xl text-paper">{cafe.name}</h3>
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <p className="min-w-0 truncate text-sm text-muted">
            {cafe.moods.map((id) => moods[id].label).join(" · ")}
          </p>
          <p className="shrink-0 text-sm font-medium">{prices[cafe.price].range}</p>
        </div>
        <p className="flex items-center justify-between gap-3 px-4 pb-4 text-sm">
          <span className="text-ink-soft">{formatHours(cafe)} WITA</span>
          {status?.open ? (
            <span className="rounded-full bg-olive-soft px-2.5 py-1 text-xs font-medium text-olive">
              Pola {crowdLabel[status.crowd]}
            </span>
          ) : (
            <span className="text-xs text-muted">{status ? "Di luar jam" : "Contoh"}</span>
          )}
        </p>
      </Link>
      <SaveButton slug={cafe.slug} name={cafe.name} className="absolute top-3 right-3 z-10" />
    </article>
  );
}
