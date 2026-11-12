import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { DiscoverSearch } from "@/lib/discover";

export function SearchForm({
  initial = "",
  keep,
}: {
  initial?: string;
  keep?: DiscoverSearch;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState(initial);

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  return (
    <form
      role="search"
      className="flex items-end gap-3 border-b-2 border-ink pb-1 transition-colors duration-200 focus-within:border-terracotta"
      onSubmit={(event) => {
        event.preventDefault();
        const query = q.trim();
        navigate({
          to: "/jelajah",
          search: {
            ...keep,
            q: query || undefined,
          },
        });
      }}
    >
      <label className="sr-only" htmlFor="cari-kafe">
        Cari kafe
      </label>
      <input
        id="cari-kafe"
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Nama, kecamatan, atau menu"
        className="h-12 min-w-0 flex-1 bg-transparent text-lg text-ink outline-none placeholder:text-muted"
        suppressHydrationWarning
      />
      <button
        type="submit"
        className="press mb-1 inline-flex h-11 items-center gap-1 text-sm font-medium text-ink transition-colors duration-150 hover:text-terracotta"
      >
        Cari
        <ArrowRight className="size-4" />
      </button>
    </form>
  );
}
