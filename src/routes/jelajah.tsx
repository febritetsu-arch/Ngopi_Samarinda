import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Filters } from "@/components/filters";
import { NearbyCard } from "@/components/nearby-card";
import { SearchForm } from "@/components/search-form";
import { CITY_CENTER } from "@/data/cafes";
import { distanceKm, statusAt, useNow } from "@/lib/cafe-time";
import { filterCafes, readDiscover, searchActive, type DiscoverSearch } from "@/lib/discover";
import { useCafes } from "@/lib/use-cafes";

export const Route = createFileRoute("/jelajah")({
  validateSearch: (search): DiscoverSearch => readDiscover(search),
  head: () => ({
    meta: [{ title: "Jelajah kafe · NgopiSamarinda" }],
  }),
  component: Jelajah,
});

function Jelajah() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const now = useNow();
  const { cafes, status } = useCafes();
  const loading = status === "loading";
  const list = filterCafes(search, now, cafes);
  const filtering = searchActive(search);

  return (
    <div>
      <div className="mx-auto w-full max-w-lg px-4 pt-2 pb-8">
        <h1 className="font-display text-3xl leading-none">Jelajah</h1>
        <p className="mt-2 text-sm text-muted">
          {loading ? "Memuat…" : `${list.length} kafe`} · saring suasana, kecamatan, dan jam.
        </p>
        <div className="mt-8 max-w-xl">
          <SearchForm initial={search.q ?? ""} keep={search} />
        </div>
        <Filters search={search} />
        {loading ? (
          <div className="mt-6 space-y-4" aria-busy="true" aria-live="polite">
            <p className="sr-only">Memuat kafe…</p>
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="h-48 animate-pulse rounded-xl bg-paper-2" />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="mt-8 rounded-xl border border-line bg-card p-5">
            <h2 className="font-display text-2xl">
              {filtering ? "Tidak ada kafe yang cocok." : "Belum ada kafe di katalog."}
            </h2>
            <div className="mt-4">
              {filtering ? (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/jelajah", search: {} })}
                  className="h-12 rounded-xl bg-ink px-5 text-sm font-medium text-paper"
                >
                  Hapus saringan
                </button>
              ) : (
                <Link
                  to="/usulkan"
                  className="inline-flex h-12 items-center rounded-xl bg-ink px-5 text-sm font-medium text-paper"
                >
                  Usulkan kafe
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {list.map((cafe) => (
              <NearbyCard
                key={cafe.slug}
                cafe={cafe}
                km={distanceKm(cafe.lat, cafe.lng, CITY_CENTER.lat, CITY_CENTER.lng)}
                status={now ? statusAt(cafe, now) : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
