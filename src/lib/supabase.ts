import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  cafes as staticCafes,
  districts,
  facilities,
  moods,
  prices,
  type Cafe,
  type District,
  type FacilityId,
  type MenuItem,
  type MoodId,
  type PriceId,
} from "@/data/cafes";

const crowdLevels = ["sepi", "sedang", "ramai", "penuh"] as const;
export type CrowdReportLevel = (typeof crowdLevels)[number];

function envValue(name: "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY") {
  const value = import.meta.env[name] as string | undefined;
  return typeof value === "string" ? value.trim() : "";
}

const supabaseUrl = envValue("VITE_SUPABASE_URL");
const supabaseAnonKey = envValue("VITE_SUPABASE_ANON_KEY");

/** True only when both public env vars are set. Missing config never throws. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function isOneOf<T extends string>(value: string, allowed: readonly T[]): value is T {
  return (allowed as readonly string[]).includes(value);
}

function readStringList<T extends string>(value: unknown, allowed: readonly T[]): T[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) return null;
  const items = value.filter((item): item is T => isOneOf(item, allowed));
  return items.length === value.length ? items : null;
}

function readStory(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) return null;
  return value;
}

function readMenu(value: unknown): MenuItem[] | null {
  if (!Array.isArray(value)) return null;
  const menu: MenuItem[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const row = item as { name?: unknown; price?: unknown; note?: unknown };
    if (typeof row.name !== "string" || typeof row.note !== "string") return null;
    if (typeof row.price !== "number" || !Number.isFinite(row.price)) return null;
    menu.push({ name: row.name, price: row.price, note: row.note });
  }
  return menu;
}

function readCrowd(value: unknown): number[] | null {
  if (!Array.isArray(value) || value.length !== 24) return null;
  const crowd = value.map((hour) => (typeof hour === "number" ? hour : Number(hour)));
  if (crowd.some((hour) => !Number.isInteger(hour) || hour < 0 || hour > 3)) return null;
  return crowd;
}

function toCafe(row: unknown): Cafe | null {
  if (!row || typeof row !== "object") return null;
  const cafe = row as Record<string, unknown>;
  if (typeof cafe.slug !== "string" || typeof cafe.name !== "string") return null;
  if (typeof cafe.district !== "string" || !isOneOf(cafe.district, districts)) return null;
  if (typeof cafe.neighborhood !== "string" || typeof cafe.address !== "string") return null;
  if (typeof cafe.lat !== "number" || typeof cafe.lng !== "number") return null;
  if (typeof cafe.price !== "string" || !isOneOf(cafe.price, Object.keys(prices) as PriceId[])) {
    return null;
  }
  if (typeof cafe.open !== "string" || typeof cafe.close !== "string") return null;
  if (typeof cafe.blurb !== "string" || typeof cafe.image !== "string") return null;
  if (typeof cafe.image_alt !== "string" || typeof cafe.signature !== "string") return null;

  const cafeMoods = readStringList(cafe.moods, Object.keys(moods) as MoodId[]);
  const cafeFacilities = readStringList(cafe.facilities, Object.keys(facilities) as FacilityId[]);
  const story = readStory(cafe.story);
  const menu = readMenu(cafe.menu);
  const crowd = readCrowd(cafe.crowd);
  if (!cafeMoods || !cafeFacilities || !story || !menu || !crowd) return null;

  return {
    slug: cafe.slug,
    name: cafe.name,
    district: cafe.district as District,
    neighborhood: cafe.neighborhood,
    address: cafe.address,
    lat: cafe.lat,
    lng: cafe.lng,
    price: cafe.price as PriceId,
    moods: cafeMoods,
    facilities: cafeFacilities,
    open: cafe.open,
    close: cafe.close,
    blurb: cafe.blurb,
    story,
    image: cafe.image,
    imageAlt: cafe.image_alt,
    menu,
    crowd,
    signature: cafe.signature,
  };
}

/** Katalog dari Supabase, atau data static bila env kosong, query gagal, atau baris tidak valid. */
export async function fetchCafes(): Promise<Cafe[]> {
  if (!supabase) return staticCafes;
  try {
    const { data, error } = await supabase.from("cafes").select("*").order("name");
    if (error || !Array.isArray(data) || data.length === 0) return staticCafes;
    const mapped = data.map(toCafe).filter((cafe): cafe is Cafe => cafe !== null);
    return mapped.length > 0 ? mapped : staticCafes;
  } catch {
    return staticCafes;
  }
}

/**
 * Simpan laporan keramaian. Tanpa Supabase, fungsi ini tidak melakukan apa-apa
 * supaya alur lokal (localStorage) tetap jalan.
 */
export async function insertCrowdReport(
  cafeSlug: string,
  level: CrowdReportLevel,
): Promise<"inserted" | "skipped" | "failed"> {
  if (!supabase) return "skipped";
  if (!cafeSlug || !isOneOf(level, crowdLevels)) return "failed";
  try {
    const { error } = await supabase.from("crowd_reports").insert({
      cafe_slug: cafeSlug,
      level,
    });
    return error ? "failed" : "inserted";
  } catch {
    return "failed";
  }
}
