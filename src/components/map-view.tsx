import { lazy, Suspense, useEffect, useState } from "react";
import type { Cafe } from "@/data/cafes";

const CafeMap = lazy(() => import("./cafe-map").then((mod) => ({ default: mod.CafeMap })));

function Fallback() {
  return (
    <div className="grid h-full place-items-center bg-paper-2 px-6 text-center text-sm text-muted">
      Peta Samarinda sedang dimuat
    </div>
  );
}

export function MapView({
  cafes,
  selected,
  onSelect,
}: {
  cafes: Cafe[];
  selected?: string;
  onSelect: (slug: string) => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return <Fallback />;
  return (
    <Suspense fallback={<Fallback />}>
      <CafeMap cafes={cafes} selected={selected} onSelect={onSelect} />
    </Suspense>
  );
}
