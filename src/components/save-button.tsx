import { Bookmark } from "lucide-react";
import { cn } from "@/lib/cn";
import { useWishlist } from "@/lib/wishlist";

export function SaveButton({
  slug,
  name,
  className,
  ghost = false,
}: {
  slug: string;
  name: string;
  className?: string;
  ghost?: boolean;
}) {
  const saved = useWishlist((state) => state.ready && state.ids.includes(slug));
  const toggle = useWishlist((state) => state.toggle);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Hapus ${name} dari simpanan` : `Simpan ${name}`}
      onClick={() => toggle(slug)}
      className={cn(
        "press grid size-11 place-items-center text-ink transition-transform duration-200 hover:scale-105",
        ghost ? "bg-transparent" : "bg-paper shadow-lift",
        className,
      )}
    >
      <Bookmark className={cn("size-5", saved && "fill-ink text-ink")} />
    </button>
  );
}
