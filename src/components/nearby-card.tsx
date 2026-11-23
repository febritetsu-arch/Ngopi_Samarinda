import { Link } from "@tanstack/react-router";
import { BookOpen, Camera, CloudRain, Coffee, Heart, Star, Users, type LucideIcon } from "lucide-react";
import { SaveButton } from "@/components/save-button";
import { moods, type Cafe, type MoodId } from "@/data/cafes";
import { cafeRating, formatHours, formatKm, type CafeStatus } from "@/lib/cafe-time";
import { cafePhoto } from "@/lib/cafe-photo";

const themeIcon: Record<MoodId, LucideIcon> = {
  fokus: BookOpen,
  santai: Coffee,
  nongkrong: Users,
  foto: Camera,
  kencan: Heart,
  hujan: CloudRain,
};

const crops = ["object-left", "object-center", "object-right"] as const;

export function NearbyCard({
  cafe,
  status,
  km,
}: {
  cafe: Cafe;
  status: CafeStatus | null;
  km: number;
}) {
  const mood = cafe.moods[0];
  const Icon = mood ? themeIcon[mood] : Coffee;
  const rating = cafeRating(cafe.slug).toFixed(1);
  const photo = cafePhoto(cafe.image, cafe.slug);
  const open = status?.open;

  return (
    <article className="rounded-xl border border-line bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <Link to="/kafe/$slug" params={{ slug: cafe.slug }} className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight">
            {cafe.name}{" "}
            <span className="inline-flex items-center gap-1 align-middle text-base font-medium">
              <Star className="size-4 fill-star text-star" aria-hidden="true" />
              <span className="tabular-nums">{rating}</span>
            </span>
          </h3>
        </Link>
        <SaveButton slug={cafe.slug} name={cafe.name} ghost className="size-10 shrink-0" />
      </div>
      <p className="mt-1 text-sm">
        <span className={open ? "font-medium text-open" : "font-medium text-closed"}>
          {status ? (open ? "Buka" : "Tutup") : "Jam"}
        </span>
        <span className="text-muted"> · {formatHours(cafe)}</span>
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        {cafe.address}
        <span className="text-muted"> · {formatKm(km)}</span>
      </p>
      {mood ? (
        <p className="mt-3 inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-sm">
          <Icon className="size-4" aria-hidden="true" />
          {moods[mood].label}
        </p>
      ) : null}
      <Link
        to="/kafe/$slug"
        params={{ slug: cafe.slug }}
        aria-label={`Foto ${cafe.name}`}
        className="mt-3 flex gap-2"
      >
        {crops.map((crop) => (
          <img
            key={crop}
            src={photo}
            alt=""
            width={240}
            height={160}
            className={`h-20 w-28 rounded-lg object-cover ${crop}`}
          />
        ))}
      </Link>
    </article>
  );
}
