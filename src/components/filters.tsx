import { useNavigate } from "@tanstack/react-router";
import { districts, facilities, moodOrder, moods, prices, type FacilityId } from "@/data/cafes";
import { cn } from "@/lib/cn";
import {
  readDiscover,
  searchActive,
  toggleFacility,
  type DiscoverSearch,
  type SortId,
} from "@/lib/discover";

const sorts: { id: SortId; label: string }[] = [
  { id: "kurasi", label: "Urutan kurasi" },
  { id: "harga", label: "Harga" },
  { id: "sepi", label: "Paling sepi" },
];

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "press h-11 shrink-0 rounded-full border px-4 text-sm",
        pressed ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function Filters({ search }: { search: DiscoverSearch }) {
  const navigate = useNavigate();

  function apply(patch: Partial<DiscoverSearch>) {
    const next = readDiscover({ ...search, ...patch });
    navigate({ to: "/jelajah", search: next });
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="scroll-row" aria-label="Suasana">
        <Chip pressed={!search.mood} onClick={() => apply({ mood: undefined })}>
          Semua suasana
        </Chip>
        {moodOrder.map((id) => (
          <Chip
            key={id}
            pressed={search.mood === id}
            onClick={() => apply({ mood: search.mood === id ? undefined : id })}
          >
            {moods[id].label}
          </Chip>
        ))}
      </div>

      <div className="scroll-row" aria-label="Kecamatan">
        <Chip pressed={!search.district} onClick={() => apply({ district: undefined })}>
          Semua kecamatan
        </Chip>
        {districts.map((district) => (
          <Chip
            key={district}
            pressed={search.district === district}
            onClick={() => apply({ district: search.district === district ? undefined : district })}
          >
            {district}
          </Chip>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(prices) as (keyof typeof prices)[]).map((id) => (
          <Chip
            key={id}
            pressed={search.price === id}
            onClick={() => apply({ price: search.price === id ? undefined : id })}
          >
            {`${prices[id].label} · ${prices[id].range}`}
          </Chip>
        ))}
        <Chip pressed={search.open === "1"} onClick={() => apply({ open: search.open === "1" ? undefined : "1" })}>
          Buka sekarang
        </Chip>
      </div>

      <div className="flex flex-wrap gap-2" aria-label="Fasilitas">
        {(Object.keys(facilities) as FacilityId[]).map((id) => {
          const on = (search.facility ?? "").split(",").includes(id);
          return (
            <Chip key={id} pressed={on} onClick={() => apply({ facility: toggleFacility(search.facility, id) })}>
              {facilities[id].label}
            </Chip>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-3">
        {sorts.map((item) => {
          const on = (search.sort ?? "kurasi") === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={on}
              onClick={() => apply({ sort: item.id === "kurasi" ? undefined : item.id })}
              className={cn("min-h-11 text-sm", on ? "font-medium text-ink" : "text-muted")}
            >
              {item.label}
            </button>
          );
        })}
        {searchActive(search) ? (
          <button
            type="button"
            onClick={() => navigate({ to: "/jelajah", search: {} })}
            className="min-h-11 text-sm text-terracotta"
          >
            Atur ulang
          </button>
        ) : null}
      </div>
    </div>
  );
}
