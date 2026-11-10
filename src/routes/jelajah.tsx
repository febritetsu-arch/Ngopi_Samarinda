import { createFileRoute } from "@tanstack/react-router";
import { CafeCard } from "@/components/cafe-card";
import { Filters } from "@/components/filters";
import { FooterNote } from "@/components/footer-note";
import { SearchForm } from "@/components/search-form";
import { statusAt, useNow } from "@/lib/cafe-time";
import { filterCafes, readDiscover, type DiscoverSearch } from "@/lib/discover";

export const Route = createFileRoute("/jelajah")({
  validateSearch: (search): DiscoverSearch => readDiscover(search),
  head: () => ({
    meta: [{ title: "Jelajah kafe · NgopiSamarinda" }],
  }),
  component: Jelajah,
});

function Jelajah() {
  const search = Route.useSearch();
  const now = useNow();
  const list = filterCafes(search, now);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12">
        <p className="kicker">Jelajah</p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <h1 className="text-title">Kafe contoh di Samarinda</h1>
          <p className="mb-1 shrink-0 text-sm tabular-nums text-muted">{list.length} kafe</p>
        </div>
        <p className="mt-3 max-w-xl text-ink-soft">
          Saring menurut suasana, kecamatan, harga, fasilitas, dan jam buka. Semua angka di halaman ini adalah data contoh.
        </p>
        <div className="mt-6">
          <SearchForm initial={search.q ?? ""} keep={search} />
        </div>
        <Filters search={search} />
        {list.length === 0 ? (
          <div className="mt-16 max-w-md border-t border-line pt-8">
            <h2 className="font-display text-3xl">Tidak ada yang cocok</h2>
            <p className="mt-3 text-muted">
              Longgarkan satu saringan, atau kembali ke semua suasana. Katalog contoh ini memang sengaja kecil.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
