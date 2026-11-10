import { useEffect } from "react";
import { create } from "zustand";

const KEY = "ngopisamarinda-crowd";
const EXPIRE_MS = 90 * 60 * 1000; // 90 minutes

export type CrowdLevel = "sepi" | "sedang" | "ramai" | "penuh";

export type CrowdReport = {
  level: CrowdLevel;
  at: number;
};

type CrowdState = {
  reports: Record<string, CrowdReport>;
  ready: boolean;
  report: (slug: string, level: CrowdLevel) => void;
};

function readReports(): Record<string, CrowdReport> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as Record<string, CrowdReport>;
  } catch {
    return {};
  }
  return {};
}

function writeReports(reports: Record<string, CrowdReport>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(reports));
  } catch {
    /* private mode */
  }
}

function isFresh(report: CrowdReport | undefined): boolean {
  if (!report) return false;
  return Date.now() - report.at < EXPIRE_MS;
}

export const useCrowd = create<CrowdState>((set, get) => ({
  reports: {},
  ready: false,
  report: (slug, level) => {
    const reports = { ...get().reports, [slug]: { level, at: Date.now() } };
    set({ reports, ready: true });
    writeReports(reports);
  },
}));

export function useCrowdReady() {
  const ready = useCrowd((state) => state.ready);
  useEffect(() => {
    if (useCrowd.getState().ready) return;
    useCrowd.setState({ reports: readReports(), ready: true });
  }, []);
  return ready;
}

export function useFreshReport(slug: string): CrowdReport | null {
  useCrowdReady();
  const report = useCrowd((state) => state.reports[slug]);
  return isFresh(report) ? report : null;
}
