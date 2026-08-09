// Statewide water temperatures — current SST for every location, for the map.

import { getAllLocations } from "./stations";
import type { Region } from "./locations";

export const T_MIN = 48;
export const T_MAX = 75;

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
  const base = region === "socal" ? 67 : region === "central" ? 59 : 55;
  return Math.round((base + seed * 4 - 2) * 10) / 10;
}

async function fetchSst(lat: number, lon: number): Promise<number | null> {
  try {
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      hourly: "sea_surface_temperature",
      forecast_days: "1",
      timezone: "America/Los_Angeles",
    });
    const res = await fetch(
      `https://marine-api.open-meteo.com/v1/marine?${params}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      hourly?: { time: string[]; sea_surface_temperature: (number | null)[] };
    };
    const temps = data.hourly?.sea_surface_temperature ?? [];
    // most recent non-null hour
    for (let i = temps.length - 1; i >= 0; i--) {
      const c = temps[i];
      if (c != null) return Math.round((c * 1.8 + 32) * 10) / 10;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getWaterTemps(): Promise<{
  points: TempPoint[];
  live: boolean;
}> {
  const locations = await getAllLocations();
  const results = await Promise.all(
    locations.map(async (l) => ({ l, sst: await fetchSst(l.lat, l.lon) })),
  );

  const anyLive = results.some((r) => r.sst != null);
  const points: TempPoint[] = [];
  for (const { l, sst } of results) {
    if (anyLive && sst == null) continue; // no marine-model coverage (delta etc.)
    points.push({
      slug: l.slug,
      name: l.name,
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
