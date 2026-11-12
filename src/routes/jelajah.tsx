import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CafeCard } from "@/components/cafe-card";
import { Filters } from "@/components/filters";
import { FooterNote } from "@/components/footer-note";
import { SearchForm } from "@/components/search-form";
import { CafeCardSkeleton } from "@/components/skeletons";
import { statusAt, useNow } from "@/lib/cafe-time";
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
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12">
        <p className="kicker">Jelajah</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h1 className="text-title">Kafe contoh di Samarinda</h1>
          <p className="mb-1 shrink-0 rounded-full bg-paper-2 px-3 py-1 text-sm tabular-nums text-ink-soft">
            {loading ? "Memuat…" : `${list.length} kafe`}
          </p>
        </div>
        <p className="mt-3 max-w-xl text-ink-soft">
          Saring menurut suasana, kecamatan, harga, fasilitas, dan jam buka. Semua angka di halaman ini adalah data contoh.
        </p>
        <div className="mt-6">
          <SearchForm initial={search.q ?? ""} keep={search} />
        </div>
        <Filters search={search} />
        {loading ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-live="polite">
            <p className="sr-only">Memuat kafe…</p>
            {Array.from({ length: 6 }, (_, index) => (
              <CafeCardSkeleton key={index} />
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="mt-10 rounded-xl bg-olive-soft px-5 py-8 sm:px-8">
            <p className="kicker">{filtering ? "Saringan kosong" : "Katalog kosong"}</p>
            <h2 className="mt-2 max-w-md font-display text-3xl">
              {filtering ? "Tidak ada kafe yang cocok dengan saringan ini." : "Belum ada kafe di katalog."}
            </h2>
            <p className="mt-3 max-w-md text-ink-soft">
              {filtering
                ? "Hapus saringan untuk melihat seluruh katalog, atau longgarkan satu syarat."
                : "Katalog belum terisi. Kamu bisa mengusulkan kafe yang belum tercatat."}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {filtering ? (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/jelajah", search: {} })}
                  className="press h-11 rounded-full bg-ink px-4 text-sm font-medium text-paper"
                >
                  Hapus saringan
                </button>
              ) : (
                <Link
                  to="/usulkan"
                  className="press inline-flex h-11 items-center rounded-full bg-ink px-4 text-sm font-medium text-paper"
                >
                  Usulkan kafe
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div
            key={`${search.mood ?? ""}-${search.district ?? ""}-${search.price ?? ""}-${search.q ?? ""}-${search.sort ?? ""}-${search.open ?? ""}-${search.facility ?? ""}`}
            className="rise-in mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {list.map((cafe, index) => (
              <CafeCard
                key={cafe.slug}
                cafe={cafe}
                status={now ? statusAt(cafe, now) : null}
                priority={index < 2}
              />
            ))}
          </div>
        )}
      </div>
      <FooterNote />
    </div>
  );
}
