import { useEffect } from "react";
import { create } from "zustand";

const KEY = "ngopisamarinda-simpan";

type WishlistState = {
  ids: string[];
  ready: boolean;
  toggle: (id: string) => void;
  clear: () => void;
};

function readIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) return parsed.filter((id): id is string => typeof id === "string");
    if (
      parsed &&
      typeof parsed === "object" &&
      "state" in parsed &&
      Array.isArray((parsed as { state?: { ids?: unknown } }).state?.ids)
    ) {
      return (parsed as { state: { ids: unknown[] } }).state.ids.filter(
        (id): id is string => typeof id === "string",
      );
    }
  } catch {
    return [];
  }
  return [];
}

function writeIds(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode */
  }
}

export const useWishlist = create<WishlistState>((set, get) => ({
  ids: [],
  ready: false,
  toggle: (id) => {
    const base = get().ready ? get().ids : readIds();
    const ids = base.includes(id) ? base.filter((item) => item !== id) : [...base, id];
    set({ ids, ready: true });
    writeIds(ids);
  },
  clear: () => {
    set({ ids: [], ready: true });
    writeIds([]);
  },
}));

export function useWishlistReady() {
  const ready = useWishlist((state) => state.ready);
  useEffect(() => {
    if (useWishlist.getState().ready) return;
    useWishlist.setState({ ids: readIds(), ready: true });
  }, []);
  return ready;
}
