import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { moods, moodOrder, type MoodId } from "@/data/cafes";
import { MapView } from "@/components/map-view";
import { cn } from "@/lib/cn";
import { formatHours, statusAt, useNow } from "@/lib/cafe-time";
import { filterCafes, type DiscoverSearch } from "@/lib/discover";

type MapSearch = {
  kafe?: string;
  mood?: MoodId;
};

function readMap(search: Record<string, unknown>): MapSearch {
  const mood = typeof search.mood === "string" ? search.mood : undefined;
  const kafe = typeof search.kafe === "string" ? search.kafe : undefined;
  return {
    kafe,
    mood: mood && mood in moods ? (mood as MoodId) : undefined,
  };
}

export const Route = createFileRoute("/peta")({
  validateSearch: (search): MapSearch => readMap(search),
  head: () => ({
    meta: [{ title: "Peta kafe · NgopiSamarinda" }],
  }),
  component: Peta,
});

function Peta() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const now = useNow();
  const discover: DiscoverSearch = { mood: search.mood };
  const list = filterCafes(discover, now);
  const selected = list.some((cafe) => cafe.slug === search.kafe) ? search.kafe : undefined;
  const active = list.find((cafe) => cafe.slug === selected);

  function setMood(mood?: MoodId) {
    navigate({
      to: "/peta",
      search: { mood, kafe: undefined },
    });
  }

  return (
    <div className="fixed inset-x-0 top-16 bottom-16 z-0 flex flex-col lg:bottom-0">
      <div className="flex gap-2 overflow-x-auto border-b border-line bg-paper px-4 py-2">
        <button
          type="button"
          aria-pressed={!search.mood}
          onClick={() => setMood(undefined)}
          className={cn(
            "h-11 shrink-0 rounded-full px-4 text-sm",
            !search.mood ? "bg-ink text-paper" : "text-muted",
          )}
        >
          Semua
        </button>
        {moodOrder.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={search.mood === id}
            onClick={() => setMood(search.mood === id ? undefined : id)}
            className={cn(
              "h-11 shrink-0 rounded-full px-4 text-sm",
              search.mood === id ? "bg-ink text-paper" : "text-ink",
            )}
          >
            {moods[id].label}
          </button>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 lg:grid-cols-[22rem_1fr]">
        <aside className="hidden overflow-y-auto border-r border-line lg:block">
          <p className="px-5 pt-5 text-sm text-muted">{list.length} titik contoh</p>
          <ul>
            {list.map((cafe) => {
              const on = cafe.slug === selected;
              const state = now ? statusAt(cafe, now) : null;
              return (
                <li key={cafe.slug}>
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/peta", search: { ...search, kafe: cafe.slug } })}
                    className={cn(
                      "w-full border-b border-line px-5 py-4 text-left",
                      on ? "bg-paper-2" : "bg-paper",
                    )}
                  >
                    <span className="block font-display text-2xl">{cafe.name}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {cafe.neighborhood}
                      {state ? ` · ${state.open ? "Buka" : "Tutup"}` : ` · ${formatHours(cafe)}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
        <div className="flex min-h-0 flex-col">
          <div className="relative min-h-0 flex-1">
            <MapView
              cafes={list}
              selected={selected}
              onSelect={(slug) => navigate({ to: "/peta", search: { ...search, kafe: slug } })}
            />
            {active ? (
              <Link
                to="/kafe/$slug"
                params={{ slug: active.slug }}
                className="absolute right-4 bottom-4 z-10 hidden min-h-11 items-center rounded-full bg-ink px-5 text-sm text-paper lg:inline-flex"
              >
                Lihat {active.name}
              </Link>
            ) : null}
          </div>
          <div className="border-t border-line bg-paper lg:hidden">
            {active ? (
              <Link
                to="/kafe/$slug"
                params={{ slug: active.slug }}
                className="flex items-center gap-3 px-4 py-3"
              >
                <img src={active.image} alt="" width={1200} height={1600} className="size-14 rounded-sm object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-display text-xl">{active.name}</span>
                  <span className="block text-sm text-muted">{active.district}</span>
                </span>
                <span className="text-sm">Lihat</span>
              </Link>
            ) : (
              <p className="px-4 pt-3 text-sm text-muted">Ketuk nama atau titik untuk memilih kafe.</p>
            )}
            <div className="scroll-row px-4 py-3">
              {list.map((cafe) => (
                <button
                  key={cafe.slug}
                  type="button"
                  aria-pressed={cafe.slug === selected}
                  onClick={() => navigate({ to: "/peta", search: { ...search, kafe: cafe.slug } })}
                  className={cn(
                    "h-11 shrink-0 rounded-full border px-4 text-sm",
                    cafe.slug === selected ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink",
                  )}
                >
                  {cafe.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
