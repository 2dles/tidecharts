// Full-state station coverage.
//
// Fetches NOAA's complete tide-prediction station list at build/revalidate
// time and turns every California station into a location page. Curated
// locations (locations.ts) always win on conflicts. If the list fetch fails
// (offline build, NOAA outage) the site gracefully ships curated-only.

import { LOCATIONS, type Location, type Region } from "./locations";

const LIST_URL =
  "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions";

interface RawStation {
  id: string;
  name: string;
  state?: string;
  lat?: number;
  lng?: number;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[().']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function regionForLat(lat: number): Region {
  if (lat >= 37.4) return "norcal";
  if (lat >= 35.0) return "central";
  return "socal";
}

const REGION_SPECIES: Record<Region, string[]> = {
  norcal: ["striped-bass", "halibut", "rockfish", "surfperch", "leopard-shark"],
  central: ["rockfish", "halibut", "surfperch", "lingcod", "white-seabass"],
  socal: ["calico-bass", "halibut", "spotted-bay-bass", "corbina", "yellowtail"],
};

const REGION_LABEL: Record<Region, string> = {
  norcal: "Northern California",
  central: "Central Coast",
  socal: "Southern California",
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function makeIntro(display: string, fullName: string, region: Region, id: string): string {
  const variants = [
    `${display} is one of the ${REGION_LABEL[region]} tide stations in NOAA's official prediction network. The chart above shows the live prediction for station ${id} (${fullName}) — the same harmonic data printed in official tide tables — paired with local weather, water conditions, and our fishing score so you can time a session here without cross-referencing three sites.`,
    `NOAA maintains tide predictions for ${display} as part of its ${REGION_LABEL[region]} station network. This page tracks station ${id} (${fullName}) live: today's highs and lows, the week ahead, sun and moon, and the conditions that decide whether it's worth wetting a line — all in one view.`,
    `This is the live tide dashboard for ${display}, built on NOAA station ${id} (${fullName}) on the ${REGION_LABEL[region]} coast. Tide predictions update continuously, and the fishing score blends the tide swing with weather, light, and moon phase to point you at the best windows of the day.`,
  ];
  return variants[hash(id) % variants.length];
}

// Module-level cache so a single build/render pass fetches the list once.
let cached: Location[] | null = null;

export async function getStationLocations(): Promise<Location[]> {
  if (cached) return cached;
  try {
    const res = await fetch(LIST_URL, { next: { revalidate: 86_400 } });
    if (!res.ok) throw new Error(`mdapi ${res.status}`);
    const data = (await res.json()) as { stations?: RawStation[] };
    if (!data.stations?.length) throw new Error("empty station list");

    const curatedIds = new Set(LOCATIONS.map((l) => l.stationId));
    const usedSlugs = new Set(LOCATIONS.map((l) => l.slug));
    const out: Location[] = [];

    for (const s of data.stations) {
      if (s.state !== "CA") continue;
      if (!s.id || !s.name || s.lat == null || s.lng == null) continue;
      if (curatedIds.has(s.id)) continue; // curated page already covers it

      const fullName = s.name.trim();
      const display = fullName.split(",")[0].trim();
      const slug = slugify(fullName);
      if (!slug || usedSlugs.has(slug)) continue;
      usedSlugs.add(slug);

      const region = regionForLat(s.lat);
      out.push({
        slug,
        name: display,
        state: "california",
        stateName: "California",
        stationId: s.id,
        stationName: fullName,
        lat: s.lat,
        lon: s.lng,
        region,
        tier: "station",
        tagline: `Live NOAA tide predictions for ${display}, California`,
        intro: makeIntro(display, fullName, region, s.id),
        speciesKeys: REGION_SPECIES[region],
        nearby: [],
      });
      if (out.length >= 250) break; // sanity cap
    }
    cached = out;
    return out;
  } catch {
    return []; // graceful: curated-only
  }
}

export async function getAllLocations(): Promise<Location[]> {
  return [...LOCATIONS, ...(await getStationLocations())];
}

export async function findLocation(slug: string): Promise<Location | undefined> {
  const curated = LOCATIONS.find((l) => l.slug === slug);
  if (curated) return curated;
  return (await getStationLocations()).find((l) => l.slug === slug);
}

function distKm(a: Location, b: Location): number {
  const dLat = (a.lat - b.lat) * 111;
  const dLon = (a.lon - b.lon) * 111 * Math.cos((a.lat * Math.PI) / 180);
  return Math.sqrt(dLat * dLat + dLon * dLon);
}

/** Lightweight list for the client-side search box (curated + all stations). */
export async function getSearchIndex() {
  const all = await getAllLocations();
  return all.map((l) => ({
    slug: l.slug,
    name: l.name,
    state: l.state,
    stateName: l.stateName,
    tagline: l.tagline,
    aliases: l.aliases,
  }));
}

/** Nearest other locations — used for auto-generated station pages. */
export async function nearestLocations(loc: Location, n = 3): Promise<Location[]> {
  const all = await getAllLocations();
  return all
    .filter((l) => l.slug !== loc.slug)
    .sort((x, y) => distKm(loc, x) - distKm(loc, y))
    .slice(0, n);
}
