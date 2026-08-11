// Full-coverage station generation for every configured state.
//
// Fetches NOAA's complete tide-prediction station list at build/revalidate
// time and turns every station in a configured state into a location page.
// Curated locations (locations.ts) always win on conflicts. If the list fetch
// fails (offline build, NOAA outage) the site gracefully ships curated-only.

import { LOCATIONS, type Location } from "./locations";
import { STATES } from "./states";

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

const REGION_LABEL: Record<string, string> = {
  norcal: "Northern California",
  central: "Central Coast",
  socal: "Southern California",
  panhandle: "Florida Panhandle",
  gulf: "Gulf Coast",
  atlantic: "Atlantic Coast",
  keys: "Florida Keys",
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function makeIntro(
  display: string,
  fullName: string,
  region: string,
  id: string,
): string {
  const label = REGION_LABEL[region] ?? region;
  const variants = [
    `${display} is one of the ${label} tide stations in NOAA's official prediction network. The chart above shows the live prediction for station ${id} (${fullName}) — the same harmonic data printed in official tide tables — paired with local weather, water conditions, and our fishing score so you can time a session here without cross-referencing three sites.`,
    `NOAA maintains tide predictions for ${display} as part of its ${label} station network. This page tracks station ${id} (${fullName}) live: today's highs and lows, the week ahead, sun and moon, and the conditions that decide whether it's worth wetting a line — all in one view.`,
    `This is the live tide dashboard for ${display}, built on NOAA station ${id} (${fullName}) on the ${label}. Tide predictions update continuously, and the fishing score blends the tide swing with weather, light, and moon phase to point you at the best windows of the day.`,
  ];
  return variants[hash(id) % variants.length];
}

function nearbyCities(
  cities: [string, number, number][],
  curatedNames: Set<string>,
  lat: number,
  lon: number,
): string[] {
  const hits: { name: string; km: number }[] = [];
  for (const [name, cLat, cLon] of cities) {
    if (curatedNames.has(name.toLowerCase())) continue;
    const dLat = (lat - cLat) * 111;
    const dLon = (lon - cLon) * 111 * Math.cos((lat * Math.PI) / 180);
    const km = Math.sqrt(dLat * dLat + dLon * dLon);
    if (km <= 18) hits.push({ name, km });
  }
  return hits
    .sort((a, b) => a.km - b.km)
    .slice(0, 3)
    .map((h) => h.name);
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

    const byCode = new Map(
      Object.values(STATES).map((st) => [st.code, st] as const),
    );
    const curatedIds = new Set(LOCATIONS.map((l) => l.stationId));
    const usedSlugs = new Set(LOCATIONS.map((l) => l.slug));
    const curatedNamesByState = new Map<string, Set<string>>();
    for (const st of Object.values(STATES)) {
      curatedNamesByState.set(
        st.slug,
        new Set(
          LOCATIONS.filter((l) => l.state === st.slug).map((l) =>
            l.name.toLowerCase(),
          ),
        ),
      );
    }

    const out: Location[] = [];
    // Cap is PER STATE. The mdapi list is ordered by station id, and Florida's
    // ids sort before California's — a global cap would let one big state
    // starve the others (FL alone has ~580 stations).
    const perState = new Map<string, number>();
    const CAP = 700;
    for (const s of data.stations) {
      const st = s.state ? byCode.get(s.state) : undefined;
      if (!st) continue;
      if ((perState.get(st.slug) ?? 0) >= CAP) continue;
      if (!s.id || !s.name || s.lat == null || s.lng == null) continue;
      if (curatedIds.has(s.id)) continue;

      let fullName = s.name.trim();
      if (fullName === fullName.toUpperCase()) {
        fullName = fullName
          .toLowerCase()
          .replace(/\b[a-z]/g, (c) => c.toUpperCase());
      }
      const display = fullName.split(",")[0].trim();
      const slug = slugify(fullName);
      if (!slug || usedSlugs.has(slug)) continue;
      usedSlugs.add(slug);

      const region = st.regionFor(s.lat, s.lng);
      const curatedNames = curatedNamesByState.get(st.slug) ?? new Set();
      const cities = nearbyCities(st.cities, curatedNames, s.lat, s.lng).filter(
        (c) => !fullName.toLowerCase().includes(c.toLowerCase()),
      );
      const city = cities[0] ?? null;
      const cityIsNew = city != null;
      let intro = makeIntro(display, fullName, region, s.id);
      if (cityIsNew) {
        intro += ` ${display} is the closest NOAA tide station to ${city}, ${st.name} — if you fish, paddle, or boat out of ${city}, these are the tide predictions to plan around.`;
      }
      out.push({
        slug,
        name: display,
        state: st.slug,
        stateName: st.name,
        stationId: s.id,
        stationName: fullName,
        lat: s.lat,
        lon: s.lng,
        region,
        tier: "station",
        nearCity: cityIsNew ? city : undefined,
        tagline: cityIsNew
          ? `Tide charts near ${city}, ${st.name} — NOAA station ${display}`
          : `Live NOAA tide predictions for ${display}, ${st.name}`,
        intro,
        speciesKeys: st.regionSpecies[region] ?? [],
        nearby: [],
        aliases: cities.length ? cities.map((c) => c.toLowerCase()) : undefined,
      });
      perState.set(st.slug, (perState.get(st.slug) ?? 0) + 1);
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
    context: l.nearCity
      ? `Near ${l.nearCity}`
      : l.tier === "station"
        ? "NOAA tide station"
        : l.tagline,
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
