// NOAA CO-OPS tide predictions.
// Docs: https://api.tidesandcurrents.noaa.gov/api/prod/

import type { TideEvent, TidePoint } from "./types";
import { fetchRetry } from "./fetch-retry";
import { noaaDate, nowInTz, parseNaive } from "./tz";

const BASE = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";

function url(stationId: string, interval: "10" | "hilo", now: number): string {
  const params = new URLSearchParams({
    product: "predictions",
    application: "ustidecharts.com",
    begin_date: noaaDate(now, -1),
    end_date: noaaDate(now, 7),
    datum: "MLLW",
    station: stationId,
    time_zone: "lst_ldt",
    units: "english",
    interval,
    format: "json",
  });
  return `${BASE}?${params}`;
}

async function getJson(u: string): Promise<unknown> {
  const res = await fetchRetry(u, { next: { revalidate: 1800 } });
  return res.json();
}

interface RawPrediction {
  t: string;
  v: string;
  type?: "H" | "L";
}

/** Sort ascending and drop duplicate timestamps (DST fall-back repeats an hour). */
function normalize<T extends { t: number }>(rows: T[]): T[] {
  const sorted = [...rows].sort((a, b) => a.t - b.t);
  return sorted.filter((r, i) => i === 0 || r.t > sorted[i - 1].t);
}

export async function fetchTideSeries(
  stationId: string,
  tz = "America/Los_Angeles",
): Promise<TidePoint[]> {
  const now = nowInTz(tz);
  const data = (await getJson(url(stationId, "10", now))) as {
    predictions?: RawPrediction[];
    error?: { message: string };
  };
  if (!data.predictions?.length) {
    throw new Error(data.error?.message ?? "No predictions returned");
  }
  return normalize(
    data.predictions.map((p) => ({ t: parseNaive(p.t), h: Number(p.v) })),
  );
}

export async function fetchTideEvents(
  stationId: string,
  tz = "America/Los_Angeles",
): Promise<TideEvent[]> {
  const now = nowInTz(tz);
  const data = (await getJson(url(stationId, "hilo", now))) as {
    predictions?: RawPrediction[];
    error?: { message: string };
  };
  if (!data.predictions?.length) {
    throw new Error(data.error?.message ?? "No hilo predictions returned");
  }
  return normalize(
    data.predictions.map((p) => ({
      t: parseNaive(p.t),
      h: Number(p.v),
      type: (p.type ?? "H") as "H" | "L",
    })),
  );
}

/** Interpolated tide height at time t (naive PT), from the dense series. */
export function tideHeightAt(points: TidePoint[], t: number): number | null {
  if (points.length === 0) return null;
  if (t <= points[0].t) return points[0].h;
  if (t >= points[points.length - 1].t) return points[points.length - 1].h;
  // binary search
  let lo = 0;
  let hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid].t <= t) lo = mid;
    else hi = mid;
  }
  const a = points[lo];
  const b = points[hi];
  if (b.t === a.t) return a.h; // duplicate-timestamp guard
  const f = (t - a.t) / (b.t - a.t);
  return a.h + f * (b.h - a.h);
}

/** Tide rate of change (ft/hr) at time t. */
export function tideRateAt(points: TidePoint[], t: number): number | null {
  const before = tideHeightAt(points, t - 1_800_000);
  const after = tideHeightAt(points, t + 1_800_000);
  if (before == null || after == null) return null;
  return after - before; // over 1 hour
}

export function nextEvents(
  events: TideEvent[],
  now: number,
): { nextHigh: TideEvent | null; nextLow: TideEvent | null } {
  const future = events.filter((e) => e.t > now);
  return {
    nextHigh: future.find((e) => e.type === "H") ?? null,
    nextLow: future.find((e) => e.type === "L") ?? null,
  };
}
