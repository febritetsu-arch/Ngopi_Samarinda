import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
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
      className="flex items-center gap-2 rounded-full border border-line bg-paper px-4"
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
      <Search className="size-5 shrink-0 text-olive" aria-hidden="true" />
      <label className="sr-only" htmlFor="cari-kafe">
        Cari kafe
      </label>
      <input
        id="cari-kafe"
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Cari nama, kecamatan, atau menu"
        className="h-12 min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
        suppressHydrationWarning
      />
      <button type="submit" className="press my-1.5 h-11 rounded-full bg-ink px-4 text-sm font-medium text-paper">
        Cari
      </button>
    </form>
  );
}
