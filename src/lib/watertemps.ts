// Statewide water temperatures — current SST for every location, for the map.

import { getAllLocations } from "./stations";
import type { Region } from "./locations";

// Ramp spans cold NorCal upwelling (~50°F) to peak-summer Gulf/Keys (~90°F).
export const T_MIN = 48;
export const T_MAX = 90;

/** Sequential sky/cyan ramp: dark (cold) -> bright (warm) on the dark surface. */
export function tempColor(f: number): string {
  const t = Math.max(0, Math.min(1, (f - T_MIN) / (T_MAX - T_MIN)));
  const stops: [number, number, number][] = [
    [12, 74, 110],
    [56, 189, 248],
    [165, 243, 252],
  ];
  const seg = t < 0.5 ? 0 : 1;
  const f2 = (t - seg * 0.5) * 2;
  const [r1, g1, b1] = stops[seg];
  const [r2, g2, b2] = stops[seg + 1];
  const mix = (a: number, b: number) => Math.round(a + (b - a) * f2);
  return `rgb(${mix(r1, r2)}, ${mix(g1, g2)}, ${mix(b1, b2)})`;
}

export interface TempPoint {
  slug: string;
  name: string;
  state: string;
  lat: number;
  lon: number;
  region: Region;
  tempF: number;
  nearCity?: string;
  live: boolean;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

function sampleTemp(region: Region, seed: number): number {
  const WATER: Record<string, number> = {
    norcal: 55, central: 59, socal: 67,
    panhandle: 82, gulf: 86, atlantic: 84, keys: 86,
  };
  const base = WATER[region] ?? 65;
  return Math.round((base + seed * 4 - 2) * 10) / 10;
}

type MarineResult = {
  hourly?: { time: string[]; sea_surface_temperature: (number | null)[] };
};

function lastTempF(r: MarineResult | undefined): number | null {
  const temps = r?.hourly?.sea_surface_temperature ?? [];
  // most recent non-null hour
  for (let i = temps.length - 1; i >= 0; i--) {
    const c = temps[i];
    if (c != null) return Math.round((c * 1.8 + 32) * 10) / 10;
  }
  return null;
}

// Open-Meteo takes comma-separated coordinate lists and returns one result per
// pair, in order. One request per station (~2,400 per render) burned server
// CPU and Open-Meteo's fair-use quota; batching makes it ~25 requests.
const BATCH = 100;

async function fetchSstBatch(
  coords: [number, number][],
): Promise<(number | null)[]> {
  try {
    const params = new URLSearchParams({
      latitude: coords.map((c) => c[0]).join(","),
      longitude: coords.map((c) => c[1]).join(","),
      hourly: "sea_surface_temperature",
      forecast_days: "1",
      timezone: "America/Los_Angeles",
    });
    const res = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?${params}`,
      { next: { revalidate: 10800 } },
    );
    if (!res.ok) return coords.map(() => null);
    const data = (await res.json()) as MarineResult | MarineResult[];
    const list = Array.isArray(data) ? data : [data];
    return coords.map((_, i) => lastTempF(list[i]));
  } catch {
    return coords.map(() => null);
  }
}

async function fetchSstAll(
  points: { lat: number; lon: number }[],
): Promise<(number | null)[]> {
  // Stations a few hundred metres apart share a marine-model cell; round to
  // 0.01 deg and ask once per distinct point.
  const key = (p: { lat: number; lon: number }) =>
    `${p.lat.toFixed(2)},${p.lon.toFixed(2)}`;
  const unique = [...new Set(points.map(key))];
  const coords = unique.map(
    (k) => k.split(",").map(Number) as [number, number],
  );
  const batches: [number, number][][] = [];
  for (let i = 0; i < coords.length; i += BATCH) {
    batches.push(coords.slice(i, i + BATCH));
  }
  const results = (await Promise.all(batches.map(fetchSstBatch))).flat();
  const byKey = new Map(unique.map((k, i) => [k, results[i]]));
  return points.map((p) => byKey.get(key(p)) ?? null);
}

export async function getWaterTemps(): Promise<{
  points: TempPoint[];
  live: boolean;
}> {
  const locations = await getAllLocations();
  const temps = await fetchSstAll(locations);
  const results = locations.map((l, i) => ({ l, sst: temps[i] }));

  const anyLive = results.some((r) => r.sst != null);
  const points: TempPoint[] = [];
  for (const { l, sst } of results) {
    if (anyLive && sst == null) continue; // no marine-model coverage (delta etc.)
    points.push({
      slug: l.slug,
      name: l.name,
      state: l.state,
      lat: l.lat,
      lon: l.lon,
      region: l.region,
      nearCity: l.nearCity,
      tempF: sst ?? sampleTemp(l.region, hash(l.slug)),
      live: sst != null,
    });
  }
  return { points, live: anyLive };
}
