import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";
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
  { id: "kurasi", label: "Kurasi" },
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
        "press h-11 shrink-0 rounded-full border px-4 text-sm transition-colors duration-150",
        pressed
          ? "border-ink bg-ink text-paper"
          : "border-line bg-paper text-ink hover:border-ink/40 hover:bg-paper-2",
      )}
    >
      {children}
    </button>
  );
}

function extraCount(search: DiscoverSearch) {
  let count = 0;
  if (search.district) count += 1;
  if (search.price) count += 1;
  if (search.open) count += 1;
  if (search.sort && search.sort !== "kurasi") count += 1;
  if (search.facility) count += search.facility.split(",").filter(Boolean).length;
  return count;
}

export function Filters({ search }: { search: DiscoverSearch }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const activeExtra = extraCount(search);

  function apply(patch: Partial<DiscoverSearch>) {
    const next = readDiscover({ ...search, ...patch });
    navigate({ to: "/jelajah", search: next });
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mt-6">
      <div className="sticky top-16 z-20 -mx-5 border-b border-line bg-paper/90 px-5 py-3 backdrop-blur-md lg:mx-0 lg:rounded-none lg:border-line lg:px-0">
        <div className="flex items-center gap-2">
          <div className="scroll-row min-w-0 flex-1" aria-label="Suasana">
            <Chip pressed={!search.mood} onClick={() => apply({ mood: undefined })}>
              Semua
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
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            className="press inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-paper lg:hidden"
          >
            <SlidersHorizontal className="size-4" />
            Saring
            {activeExtra > 0 ? <span className="tabular-nums text-paper/80">{activeExtra}</span> : null}
          </button>
        </div>
      </div>

      <div className="mt-4 hidden lg:block">
        <Secondary search={search} apply={apply} onReset={() => navigate({ to: "/jelajah", search: {} })} />
      </div>

      <button
        type="button"
        aria-label="Tutup saringan"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-200 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-hidden={!open}
        inert={!open}
        aria-labelledby="saringan-judul"
        className={cn(
          "above-tab filter-sheet fixed inset-x-0 z-50 flex flex-col rounded-t-xl bg-paper shadow-lift transition-transform duration-200 ease-out lg:hidden",
          open ? "translate-y-0" : "pointer-events-none translate-y-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-3">
          <h2 id="saringan-judul" className="font-display text-2xl">
            Saringan
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="press grid size-11 place-items-center rounded-full bg-paper-2 text-ink"
            aria-label="Tutup"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4">
          <Secondary search={search} apply={apply} onReset={() => navigate({ to: "/jelajah", search: {} })} />
        </div>
        <div className="border-t border-line px-5 py-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="press h-12 w-full rounded-full bg-terracotta text-sm font-medium text-paper"
          >
            Lihat hasil
          </button>
        </div>
      </div>
    </div>
  );
}

function Secondary({
  search,
  apply,
  onReset,
}: {
  search: DiscoverSearch;
  apply: (patch: Partial<DiscoverSearch>) => void;
  onReset: () => void;
}) {
  return (
    <div className="space-y-4">
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

      <div className="flex flex-wrap items-center gap-3">
        <div className="grid grid-cols-3 gap-1 rounded-full bg-paper-2 p-1" aria-label="Urutan">
          {sorts.map((item) => {
            const on = (search.sort ?? "kurasi") === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => apply({ sort: item.id === "kurasi" ? undefined : item.id })}
                className={cn(
                  "press h-10 rounded-full px-3 text-sm transition-colors duration-150",
                  on ? "bg-ink font-medium text-paper" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        {searchActive(search) ? (
          <button type="button" onClick={onReset} className="min-h-11 text-sm text-terracotta">
            Atur ulang
          </button>
        ) : null}
      </div>
    </div>
  );
}
