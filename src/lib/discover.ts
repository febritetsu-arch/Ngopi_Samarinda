import {
  cafes,
  facilities,
  moods,
  prices,
  type Cafe,
  type District,
  type FacilityId,
  type MoodId,
  type PriceId,
  districts,
} from "@/data/cafes";
import { statusAt } from "@/lib/cafe-time";

export type SortId = "kurasi" | "harga" | "sepi";

export type DiscoverSearch = {
  q?: string;
  mood?: MoodId;
  district?: District;
  price?: PriceId;
  facility?: string;
  open?: "1";
  sort?: SortId;
};

const moodSet = new Set<string>(Object.keys(moods));
const priceSet = new Set<string>(Object.keys(prices));
const districtSet = new Set<string>(districts);
const sortSet = new Set<string>(["kurasi", "harga", "sepi"]);

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function readDiscover(search: Record<string, unknown>): DiscoverSearch {
  const mood = text(search.mood);
  const district = text(search.district);
  const price = text(search.price);
  const sort = text(search.sort);
  const facility = text(search.facility);
  return {
    q: text(search.q),
    mood: mood && moodSet.has(mood) ? (mood as MoodId) : undefined,
    district: district && districtSet.has(district) ? (district as District) : undefined,
    price: price && priceSet.has(price) ? (price as PriceId) : undefined,
    facility: facility
      ?.split(",")
      .map((id) => id.trim())
      .filter((id): id is FacilityId => id in facilities)
      .sort()
      .join(",") || undefined,
    open: search.open === "1" || search.open === 1 || search.open === true ? "1" : undefined,
    sort: sort && sortSet.has(sort) ? (sort as SortId) : undefined,
  };
}

export function facilityList(value: string | undefined): FacilityId[] {
  if (!value) return [];
  return value.split(",").filter((id): id is FacilityId => id in facilities);
}

export function toggleFacility(current: string | undefined, id: FacilityId) {
  const next = new Set(facilityList(current));
  if (next.has(id)) next.delete(id);
  else next.add(id);
  const joined = [...next].sort().join(",");
  return joined || undefined;
}

export function filterCafes(
  search: DiscoverSearch,
  now: Date | null,
  source: readonly Cafe[] = cafes,
) {
  const q = search.q?.toLocaleLowerCase("id");
  const wanted = facilityList(search.facility);
  let list = source.filter((cafe) => {
    if (search.mood && !cafe.moods.includes(search.mood)) return false;
    if (search.district && cafe.district !== search.district) return false;
    if (search.price && cafe.price !== search.price) return false;
    if (wanted.length && !wanted.every((id) => cafe.facilities.includes(id))) return false;
    if (search.open === "1") {
      if (!now) return true;
      if (!statusAt(cafe, now).open) return false;
    }
    if (!q) return true;
    const hay = [
      cafe.name,
      cafe.district,
      cafe.neighborhood,
      cafe.blurb,
      cafe.signature,
      ...cafe.moods.map((id) => moods[id].label),
      ...cafe.menu.map((item) => item.name),
    ]
      .join(" ")
      .toLocaleLowerCase("id");
    return hay.includes(q);
  });

  if (search.sort === "harga") {
    const rank: Record<PriceId, number> = { hemat: 0, sedang: 1, premium: 2 };
    list = [...list].sort((a, b) => rank[a.price] - rank[b.price]);
  } else if (search.sort === "sepi" && now) {
    const score = (cafe: Cafe) => {
      const state = statusAt(cafe, now);
      if (!state.open) return 9;
      if (state.crowd === "sepi") return 0;
      if (state.crowd === "sedang") return 1;
      return 2;
    };
    list = [...list].sort((a, b) => score(a) - score(b));
  }
  return list;
}

export function searchActive(search: DiscoverSearch) {
  return Boolean(
    search.q || search.mood || search.district || search.price || search.facility || search.open || search.sort,
  );
}
