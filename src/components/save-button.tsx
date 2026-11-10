import { Bookmark } from "lucide-react";
import { cn } from "@/lib/cn";
import { useWishlist } from "@/lib/wishlist";

export function SaveButton({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
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
        "press grid size-11 place-items-center rounded-full bg-paper text-ink shadow-lift",
        className,
      )}
    >
      <Bookmark className={cn("size-5", saved && "fill-terracotta text-terracotta")} />
    </button>
  );
}
