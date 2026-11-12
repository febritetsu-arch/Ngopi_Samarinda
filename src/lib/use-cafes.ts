import { useEffect, useState } from "react";
import { cafes as staticCafes, type Cafe } from "@/data/cafes";
import { fetchCafes } from "@/lib/supabase";

export type CafeCatalog = {
  cafes: Cafe[];
  status: "loading" | "ready";
};

const listeners = new Set<() => void>();

let snapshot: CafeCatalog = { cafes: [], status: "loading" };
let started = false;

function publish(next: CafeCatalog) {
  snapshot = next;
  for (const listener of listeners) listener();
}

function ensureCatalog() {
  if (started) return;
  started = true;
  void fetchCafes()
    .then((cafes) => {
      publish({ cafes, status: "ready" });
    })
    .catch(() => {
      publish({ cafes: staticCafes, status: "ready" });
    });
}

/** Katalog bersama. `fetchCafes()` sudah jatuh ke data static bila Supabase kosong atau gagal. */
export function useCafes(): CafeCatalog {
  const [catalog, setCatalog] = useState(snapshot);

  useEffect(() => {
    ensureCatalog();
    const pull = () => setCatalog(snapshot);
    listeners.add(pull);
    pull();
    return () => {
      listeners.delete(pull);
    };
  }, []);

  return catalog;
}
