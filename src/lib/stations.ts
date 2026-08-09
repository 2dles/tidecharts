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

// California coastal & bayside cities for nearest-city tagging. A station gets
// tagged when a city is within ~20 km and the city name isn't already in the
// station name — this is what makes "San Rafael" find the Point San Quentin /
// Gallinas Creek stations, on our search box and for Google's geo matching.
const CA_CITIES: [string, number, number][] = [
  ["Trinidad", 41.06, -124.14], ["Arcata", 40.87, -124.08],
  ["Ferndale", 40.58, -124.26], ["Shelter Cove", 40.03, -124.06],
  ["Fort Bragg", 39.45, -123.8], ["Mendocino", 39.31, -123.8],
  ["Gualala", 38.77, -123.53], ["Jenner", 38.45, -123.12],
  ["Tomales", 38.25, -122.9], ["Dillon Beach", 38.25, -122.96],
  ["Inverness", 38.1, -122.86], ["Stinson Beach", 37.9, -122.64],
  ["Bolinas", 37.91, -122.69], ["Sausalito", 37.86, -122.49],
  ["Mill Valley", 37.91, -122.55], ["Tiburon", 37.87, -122.46],
  ["San Rafael", 37.97, -122.53], ["Novato", 38.11, -122.57],
  ["Petaluma", 38.23, -122.64], ["Vallejo", 38.1, -122.26],
  ["Benicia", 38.05, -122.16], ["Martinez", 38.02, -122.13],
  ["Pittsburg", 38.03, -121.88], ["Antioch", 38.0, -121.81],
  ["Berkeley", 37.87, -122.3], ["Emeryville", 37.84, -122.29],
  ["Oakland", 37.8, -122.27], ["San Leandro", 37.72, -122.16],
  ["Hayward", 37.64, -122.12], ["Fremont", 37.55, -122.05],
  ["San Mateo", 37.56, -122.31], ["Palo Alto", 37.45, -122.11],
  ["Alviso", 37.42, -121.97], ["Pacifica", 37.61, -122.49],
  ["Pescadero", 37.26, -122.38], ["Capitola", 36.97, -121.95],
  ["Watsonville", 36.91, -121.79], ["Moss Landing", 36.8, -121.79],
  ["Marina", 36.68, -121.8], ["Pacific Grove", 36.62, -121.92],
  ["Carmel", 36.55, -121.92], ["Big Sur", 36.27, -121.81],
  ["Cambria", 35.56, -121.08], ["Cayucos", 35.44, -120.89],
  ["Morro Bay", 35.37, -120.85], ["Los Osos", 35.31, -120.83],
  ["Pismo Beach", 35.14, -120.64], ["Guadalupe", 34.97, -120.57],
  ["Lompoc", 34.64, -120.46], ["Goleta", 34.42, -119.83],
  ["Carpinteria", 34.4, -119.52], ["Ventura", 34.28, -119.29],
  ["Oxnard", 34.2, -119.18], ["Port Hueneme", 34.15, -119.2],
  ["Malibu", 34.03, -118.78], ["Venice", 33.99, -118.47],
  ["Marina del Rey", 33.98, -118.45], ["Manhattan Beach", 33.88, -118.41],
  ["Hermosa Beach", 33.86, -118.4], ["Redondo Beach", 33.84, -118.39],
  ["San Pedro", 33.74, -118.29], ["Long Beach", 33.77, -118.19],
  ["Seal Beach", 33.74, -118.1], ["Huntington Beach", 33.66, -118.0],
  ["Laguna Beach", 33.54, -117.78], ["Dana Point", 33.47, -117.7],
  ["San Clemente", 33.43, -117.62], ["Oceanside", 33.2, -117.38],
  ["Carlsbad", 33.16, -117.35], ["Encinitas", 33.04, -117.29],
  ["Del Mar", 32.96, -117.27], ["Coronado", 32.69, -117.18],
  ["Imperial Beach", 32.58, -117.11], ["Chula Vista", 32.64, -117.08],
];

const CURATED_NAMES = new Set(LOCATIONS.map((l) => l.name.toLowerCase()));

function nearestCity(lat: number, lon: number): string | null {
  let best: string | null = null;
  let bestKm = 20; // max tag distance
  for (const [name, cLat, cLon] of CA_CITIES) {
    if (CURATED_NAMES.has(name.toLowerCase())) continue;
    const dLat = (lat - cLat) * 111;
    const dLon = (lon - cLon) * 111 * Math.cos((lat * Math.PI) / 180);
    const km = Math.sqrt(dLat * dLat + dLon * dLon);
    if (km < bestKm) {
      bestKm = km;
      best = name;
    }
  }
  return best;
}

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

      let fullName = s.name.trim();
      // NOAA shouts some station names in ALL CAPS — normalize to Title Case
      if (fullName === fullName.toUpperCase()) {
        fullName = fullName
          .toLowerCase()
          .replace(/\b[a-z]/g, (c) => c.toUpperCase());
      }
      const display = fullName.split(",")[0].trim();
      const slug = slugify(fullName);
      if (!slug || usedSlugs.has(slug)) continue;
      usedSlugs.add(slug);

      const region = regionForLat(s.lat);
      const city = nearestCity(s.lat, s.lng);
      const cityIsNew =
        city != null && !fullName.toLowerCase().includes(city.toLowerCase());
      let intro = makeIntro(display, fullName, region, s.id);
      if (cityIsNew) {
        intro += ` ${display} is the closest NOAA tide station to ${city}, California — if you fish, paddle, or boat out of ${city}, these are the tide predictions to plan around.`;
      }
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
        nearCity: cityIsNew ? city : undefined,
        tagline: cityIsNew
          ? `Tide charts near ${city}, California — NOAA station ${display}`
          : `Live NOAA tide predictions for ${display}, California`,
        intro,
        speciesKeys: REGION_SPECIES[region],
        nearby: [],
        aliases: cityIsNew ? [city.toLowerCase()] : undefined,
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
