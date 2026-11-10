import { Link } from "@tanstack/react-router";
import { moods, prices, type Cafe } from "@/data/cafes";
import { formatHours, statusAt, type CafeStatus } from "@/lib/cafe-time";
import { SaveButton } from "@/components/save-button";

const crowdLabel = {
  sepi: "Sepi",
  sedang: "Sedang",
  ramai: "Ramai",
} as const;

export function CafeCard({
  cafe,
  status,
  priority = false,
}: {
  cafe: Cafe;
  status: CafeStatus | null;
  priority?: boolean;
}) {
  return (
    <article className="group">
      <div className="relative">
        <Link
          to="/kafe/$slug"
          params={{ slug: cafe.slug }}
          className="block overflow-hidden rounded-lg"
        >
          <img
            src={cafe.image}
            alt={cafe.imageAlt}
            width={1200}
            height={1600}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="photo-zoom aspect-[3/4] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 scrim" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-paper">
            <p className="text-xs font-medium tracking-wide text-paper/80">{cafe.district}</p>
            <h3 className="mt-1 text-3xl text-paper">{cafe.name}</h3>
          </div>
        </Link>
        <SaveButton slug={cafe.slug} name={cafe.name} className="absolute top-3 right-3" />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <p className="text-sm text-muted">{cafe.moods.map((id) => moods[id].label).join(" · ")}</p>
        <p className="shrink-0 text-sm font-medium">{prices[cafe.price].range}</p>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {status ? (status.open ? "Buka" : "Tutup") : "Jam"}
        <span className="text-muted"> · {formatHours(cafe)} WITA</span>
        {status?.open ? (
          <span className="text-muted"> · {crowdLabel[status.crowd]}</span>
        ) : null}
      </p>
    </article>
  );
}
