export function CafeCardSkeleton() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="aspect-[4/5] rounded-xl bg-paper-2" />
      <div className="mt-3 h-6 w-2/3 rounded-md bg-paper-2" />
      <div className="mt-2 h-4 w-1/2 rounded-md bg-paper-2" />
    </div>
  );
}

export function MoodSkeleton() {
  return <div className="h-40 animate-pulse rounded-xl bg-paper-2" aria-hidden="true" />;
}

export function DirectoryRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-2 py-3" aria-hidden="true">
      <div className="size-16 animate-pulse rounded-lg bg-paper-2" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-3 w-8 animate-pulse rounded bg-paper-2" />
        <div className="h-6 w-40 max-w-full animate-pulse rounded bg-paper-2" />
        <div className="h-4 w-28 animate-pulse rounded bg-paper-2" />
      </div>
    </div>
  );
}
