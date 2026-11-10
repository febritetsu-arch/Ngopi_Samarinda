import { useEffect } from "react";
import { create } from "zustand";

const KEY = "ngopisamarinda-crowd";
const MINE_KEY = "ngopisamarinda-crowd-self";
const EXPIRE_MS = 90 * 60 * 1000;
const COOLDOWN_MS = 10 * 60 * 1000;

export type CrowdLevel = "sepi" | "sedang" | "ramai" | "penuh";

export const crowdLevelLabel: Record<CrowdLevel, string> = {
  sepi: "Sepi",
  sedang: "Sedang",
  ramai: "Ramai",
  penuh: "Penuh",
};

export type CrowdReport = {
  level: CrowdLevel;
  at: number;
};

type CrowdMap = Record<string, CrowdReport>;

type CrowdState = {
  reports: CrowdMap;
  mine: CrowdMap;
  ready: boolean;
  report: (slug: string, level: CrowdLevel) => "ok" | "cooldown";
};

const levels = new Set<CrowdLevel>(["sepi", "sedang", "ramai", "penuh"]);

function isReport(value: unknown): value is CrowdReport {
  if (!value || typeof value !== "object") return false;
  const report = value as { level?: unknown; at?: unknown };
  return levels.has(report.level as CrowdLevel) && typeof report.at === "number";
}

function readMap(key: string): CrowdMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const map: CrowdMap = {};
    for (const [slug, value] of Object.entries(parsed)) {
      if (isReport(value)) map[slug] = value;
    }
    return map;
  } catch {
    return {};
  }
}

function writeMap(key: string, map: CrowdMap) {
  try {
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    /* private mode */
  }
}

function isFresh(report: CrowdReport | undefined, now = Date.now()): boolean {
  if (!report) return false;
  return now - report.at < EXPIRE_MS;
}

export function formatCrowdAgo(at: number, now = Date.now()) {
  const mins = Math.max(0, Math.round((now - at) / 60000));
  if (mins < 1) return "baru saja";
  if (mins < 60) return `${mins} mnt lalu`;
  const hours = Math.round(mins / 60);
  return hours === 1 ? "1 jam lalu" : `${hours} jam lalu`;
}

export const useCrowd = create<CrowdState>((set, get) => ({
  reports: {},
  mine: {},
  ready: false,
  report: (slug, level) => {
    const now = Date.now();
    const ready = get().ready;
    const mine = ready ? get().mine : readMap(MINE_KEY);
    const last = mine[slug];
    if (last && now - last.at < COOLDOWN_MS) return "cooldown";

    const entry: CrowdReport = { level, at: now };
    const reports = { ...(ready ? get().reports : readMap(KEY)), [slug]: entry };
    const nextMine = { ...mine, [slug]: entry };
    set({ reports, mine: nextMine, ready: true });
    writeMap(KEY, reports);
    writeMap(MINE_KEY, nextMine);
    return "ok";
  },
}));

export function useCrowdReady() {
  const ready = useCrowd((state) => state.ready);
  useEffect(() => {
    if (useCrowd.getState().ready) return;
    useCrowd.setState({ reports: readMap(KEY), mine: readMap(MINE_KEY), ready: true });
  }, []);
  return ready;
}

export function useFreshReport(slug: string): CrowdReport | null {
  useCrowdReady();
  const report = useCrowd((state) => state.reports[slug]);
  return isFresh(report) ? report : null;
}

export function useOwnReport(slug: string): CrowdReport | null {
  useCrowdReady();
  const report = useCrowd((state) => state.mine[slug]);
  return isFresh(report) ? report : null;
}
