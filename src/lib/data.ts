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

  const points = pointsLive ? pointsR.value : sampleTideSeries(loc);
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
    source: pointsLive && wxLive && marineLive ? "live" : "sample",
  };
}
