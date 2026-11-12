import { cn } from "@/lib/cn";

export function CafeCardSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className={cn("bg-paper-2", tall ? "aspect-[5/4]" : "aspect-[3/4]")} />
      <div className="mt-4 h-3 w-24 bg-paper-2" />
      <div className="mt-3 h-8 w-2/3 bg-paper-2" />
    </div>
  );
}

export function MoodSkeleton({ className }: { className?: string }) {
  return <div className={cn("min-h-40 animate-pulse bg-paper-2/80", className)} aria-hidden="true" />;
}

export function DirectoryRowSkeleton() {
  return (
    <div className="grid grid-cols-[4.75rem_minmax(0,1fr)] items-end gap-4 py-5" aria-hidden="true">
      <div className="aspect-[3/4] animate-pulse bg-paper-2" />
      <div className="space-y-2">
        <div className="h-3 w-16 animate-pulse bg-paper-2" />
        <div className="h-8 w-40 max-w-full animate-pulse bg-paper-2" />
      </div>
    </div>
  );
}
