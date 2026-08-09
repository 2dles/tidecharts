// Aggregated per-location data fetch, with graceful sample-data fallback.
// If NOAA / Open-Meteo are unreachable the page still renders — clearly
// badged as sample data — instead of erroring.

import type { Location } from "./locations";
import type { LocationData } from "./types";
import { fetchTideEvents, fetchTideSeries } from "./noaa";
import { fetchMarine, fetchWeather } from "./weather";
import { moonInfo } from "./astro";
import { ptNow } from "./tz";
import {
  sampleMarine,
  sampleTideEvents,
  sampleTideSeries,
  sampleWeatherDays,
} from "./sample";

export interface LocationDataWithSource extends LocationData {
  source: "live" | "sample";
}

export async function getLocationData(
  loc: Location,
): Promise<LocationDataWithSource> {
  const [pointsR, eventsR, wxR, marineR] = await Promise.allSettled([
    fetchTideSeries(loc.stationId),
    fetchTideEvents(loc.stationId),
    fetchWeather(loc.lat, loc.lon),
    fetchMarine(loc.lat, loc.lon),
  ]);

  // Per-stream fallback: a failed sub-request never discards good live data
  // from another stream. Live tide points + failed hilo → derive events from
  // the live series rather than falling back to synthetic tides.
  const pointsLive =
    pointsR.status === "fulfilled" && pointsR.value.length > 0;
  const eventsLive =
    eventsR.status === "fulfilled" && eventsR.value.length > 0;
  const wxLive =
    wxR.status === "fulfilled" && wxR.value.hourly.length > 0;
  const marineLive =
    marineR.status === "fulfilled" && marineR.value.length > 0;

  // Subordinate NOAA stations publish only high/low events (no dense series).
  // For those, synthesize the curve between real extremes with a cosine —
  // exact at every high/low, standard tide-clock interpolation between.
  const points = pointsLive
    ? pointsR.value
    : eventsLive
      ? synthesizeSeries(eventsR.value)
      : sampleTideSeries(loc);
  const events = eventsLive
    ? eventsR.value
    : sampleTideEvents(points); // works on live or sample points
  const wx = wxLive ? wxR.value : sampleWeatherDays(loc);
  const marine = marineLive ? marineR.value : sampleMarine(loc);

  return {
    points,
    events,
    weather: wx.hourly,
    marine,
    days: wx.days,
    moon: moonInfo(),
    fetchedAt: ptNow(),
    source:
      (pointsLive || eventsLive) && wxLive && marineLive ? "live" : "sample",
  };
}

/** Cosine interpolation between real high/low events, every 10 minutes. */
export function synthesizeSeries(events: { t: number; h: number }[]): {
  t: number;
  h: number;
}[] {
  if (events.length < 2) return [];
  const out: { t: number; h: number }[] = [];
  const STEP = 10 * 60_000;
  for (let i = 0; i < events.length - 1; i++) {
    const a = events[i];
    const b = events[i + 1];
    if (b.t <= a.t) continue;
    for (let t = a.t; t < b.t; t += STEP) {
      const f = (1 - Math.cos(Math.PI * ((t - a.t) / (b.t - a.t)))) / 2;
      out.push({ t, h: Number((a.h + (b.h - a.h) * f).toFixed(3)) });
    }
  }
  out.push({ ...events[events.length - 1] });
  return out;
}
