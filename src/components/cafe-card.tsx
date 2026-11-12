import { Link } from "@tanstack/react-router";
import { moods, prices, type Cafe } from "@/data/cafes";
import { formatHours, type CafeStatus } from "@/lib/cafe-time";
import { cn } from "@/lib/cn";
import { crowdLevelLabel, formatCrowdAgo, useFreshReport } from "@/lib/crowd";
import { SaveButton } from "@/components/save-button";

export function CafeCard({
  cafe,
  status,
  priority = false,
  variant = "poster",
}: {
  cafe: Cafe;
  status: CafeStatus | null;
  priority?: boolean;
  variant?: "poster" | "feature";
}) {
  const fresh = useFreshReport(cafe.slug);
  const primary = cafe.moods[0];
  const open = status?.open;
  const feature = variant === "feature";

  return (
    <article className="group">
      <div className={cn(feature && "sm:grid sm:grid-cols-12 sm:items-end sm:gap-8")}>
        <div className={cn("relative", feature && "sm:col-span-7")}>
          <Link
            to="/kafe/$slug"
            params={{ slug: cafe.slug }}
            tabIndex={-1}
            aria-label={cafe.name}
            className="block overflow-hidden focus-visible:outline-none"
          >
            <img
              src={cafe.image}
              alt=""
              width={1200}
              height={1600}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "photo-zoom w-full object-cover",
                feature ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[3/4]",
              )}
            />
          </Link>
          <p className="pointer-events-none absolute top-3 left-3 bg-paper px-2.5 py-1 text-xs font-medium text-ink">
            <span
              className={cn("mr-1.5 inline-block size-1.5 rounded-full", open ? "bg-olive" : "bg-terracotta")}
              aria-hidden="true"
            />
            {status ? (open ? "Buka" : "Tutup") : "Jam"}
          </p>
          <SaveButton slug={cafe.slug} name={cafe.name} className="absolute top-3 right-3 z-10" />
        </div>

        <div className={cn(feature ? "mt-4 sm:col-span-5 sm:mt-0 sm:pb-2" : "mt-4")}>
          <Link
            to="/kafe/$slug"
            params={{ slug: cafe.slug }}
            className="press block focus-visible:outline-offset-4"
          >
            <p className="kicker">
              {cafe.neighborhood}
              <span className="text-muted"> · {cafe.district}</span>
            </p>
            <h3 className="name-nudge mt-2 font-display text-4xl leading-none sm:text-5xl">{cafe.name}</h3>
            <p className="mt-3 flex items-baseline justify-between gap-4 text-sm">
              <span className="min-w-0 truncate text-ink-soft">
                {primary ? moods[primary].label : "Kafe"}
                <span className="text-muted"> · {formatHours(cafe)}</span>
              </span>
              <span className="shrink-0 font-medium">{prices[cafe.price].range}</span>
            </p>
            {fresh ? (
              <p className="mt-2 text-sm font-medium text-terracotta">
                {crowdLevelLabel[fresh.level]} · {formatCrowdAgo(fresh.at)}
              </p>
            ) : null}
          </Link>
        </div>
      </div>
    </article>
  );
}
