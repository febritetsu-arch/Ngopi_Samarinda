import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CafeCard } from "@/components/cafe-card";
import { Filters } from "@/components/filters";
import { FooterNote } from "@/components/footer-note";
import { SearchForm } from "@/components/search-form";
import { CafeCardSkeleton } from "@/components/skeletons";
import { cn } from "@/lib/cn";
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

function resultSlot(index: number) {
  if (index === 0) return "sm:col-span-2 lg:col-span-12";
  if (index % 4 === 2) return "lg:col-span-5 lg:col-start-8 lg:mt-16";
  if (index % 4 === 3) return "lg:col-span-6 lg:-mt-10";
  return "lg:col-span-6";
}

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
      <div className="mx-auto max-w-6xl px-5 pt-6 pb-8 lg:px-8 lg:pt-14">
        <p className="kicker">Jelajah</p>
        <div className="mt-3 flex items-end justify-between gap-4">
          <h1 className="text-mega">Jelajah.</h1>
          <p className="mb-2 font-display text-5xl leading-none text-terracotta tabular-nums sm:text-6xl">
            {loading ? "—" : list.length}
          </p>
        </div>
        <p className="mt-6 max-w-sm text-ink-soft sm:ml-16 lg:ml-40">
          Saring menurut suasana, kecamatan, harga, fasilitas, dan jam buka. Semua angka di halaman ini adalah data contoh.
        </p>
        <div className="mt-8 max-w-xl">
          <SearchForm initial={search.q ?? ""} keep={search} />
        </div>
        <Filters search={search} />
        {loading ? (
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-12" aria-busy="true" aria-live="polite">
            <p className="sr-only">Memuat kafe…</p>
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className={resultSlot(index)}>
                <CafeCardSkeleton tall={index === 0} />
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className="relative mt-16 min-h-80">
            <p className="font-display text-8xl leading-none text-olive-soft italic sm:text-9xl" aria-hidden="true">
              Kosong.
            </p>
            <div className="relative -mt-8 max-w-md sm:ml-16 lg:-mt-16 lg:ml-48">
              <p className="kicker">{filtering ? "Saringan kosong" : "Katalog kosong"}</p>
              <h2 className="mt-3 text-title">
                {filtering ? "Tidak ada meja yang cocok." : "Belum ada kafe di katalog."}
              </h2>
              <p className="mt-4 text-ink-soft">
                {filtering
                  ? "Hapus saringan untuk melihat seluruh katalog, atau longgarkan satu syarat."
                  : "Katalog belum terisi. Kamu bisa mengusulkan kafe yang belum tercatat."}
              </p>
              <div className="mt-6">
                {filtering ? (
                  <button
                    type="button"
                    onClick={() => navigate({ to: "/jelajah", search: {} })}
                    className="press h-12 bg-ink px-5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-terracotta"
                  >
                    Hapus saringan
                  </button>
                ) : (
                  <Link
                    to="/usulkan"
                    className="press inline-flex h-12 items-center bg-ink px-5 text-sm font-medium text-paper transition-colors duration-150 hover:bg-terracotta"
                  >
                    Usulkan kafe
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div
            key={`${search.mood ?? ""}-${search.district ?? ""}-${search.price ?? ""}-${search.q ?? ""}-${search.sort ?? ""}-${search.open ?? ""}-${search.facility ?? ""}`}
            className="rise-in mt-12 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-12"
          >
            {list.map((cafe, index) => (
              <div key={cafe.slug} className={cn(resultSlot(index))}>
                <CafeCard
                  cafe={cafe}
                  status={now ? statusAt(cafe, now) : null}
                  priority={index < 2}
                  variant={index === 0 ? "feature" : "poster"}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <FooterNote />
    </div>
  );
}
