import { useEffect, useState } from "react";
import type { Cafe } from "@/data/cafes";

export type CrowdLevel = "sepi" | "sedang" | "ramai";

export type CafeStatus = {
  open: boolean;
  crowd: CrowdLevel;
  clock: string;
  hour: number;
};

function parts(date: Date) {
  const list = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Makassar",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const pick = (type: string) => list.find((part) => part.type === type)?.value ?? "00";
  return { hour: Number(pick("hour")), minute: Number(pick("minute")) };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function formatClock(hhmm: string) {
  return hhmm.replace(":", ".");
}

export function formatHours(cafe: Cafe) {
  return `${formatClock(cafe.open)}–${formatClock(cafe.close)}`;
}

export function statusAt(cafe: Cafe, date: Date): CafeStatus {
  const { hour, minute } = parts(date);
  const now = hour * 60 + minute;
  const openMins = toMinutes(cafe.open);
  const closeMins = toMinutes(cafe.close);
  const open = closeMins > openMins ? now >= openMins && now < closeMins : now >= openMins || now < closeMins;
  const level = cafe.crowd[hour] ?? 0;
  const crowd: CrowdLevel = !open || level <= 1 ? "sepi" : level === 2 ? "sedang" : "ramai";
  return {
    open,
    crowd: open ? crowd : "sepi",
    clock: `${String(hour).padStart(2, "0")}.${String(minute).padStart(2, "0")} WITA`,
    hour,
  };
}

export function formatRp(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function distanceKm(lat: number, lng: number, fromLat: number, fromLng: number) {
  const r = 6371;
  const dLat = ((lat - fromLat) * Math.PI) / 180;
  const dLng = ((lng - fromLng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((fromLat * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return r * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatKm(km: number) {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1).replace(".", ",")} km`;
}

/** Null sampai terpasang di klien, supaya jam tidak beda antara server dan layar. */
export function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 60000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}
