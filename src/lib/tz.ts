// Naive Pacific Time utilities.
//
// Every timestamp in the app is "naive PT": the Pacific wall-clock time encoded
// as if it were UTC (Date.UTC(y, m, d, h, min)). This makes server (UTC
// container) and client (any browser TZ) agree exactly, because NOAA
// (time_zone=lst_ldt) and Open-Meteo (timezone=America/Los_Angeles) both
// return Pacific wall-clock strings. Format naive values with the UTC getters
// or toLocaleString(..., { timeZone: "UTC" }).
//
// DST caveat: wall-clock time repeats an hour on fall-back night and skips an
// hour on spring-forward night, so naive timestamps are not perfectly unique/
// continuous twice a year. Data-layer consumers sort + de-duplicate (see
// noaa.ts normalize()) and interpolators guard equal timestamps.

import type { NaiveMs } from "./types";

const PT = "America/Los_Angeles";

/** Timezone for a location: NOAA lst_ldt returns STATION-LOCAL time, so all
 * naive math must run in the station's own zone. */
export function locTz(loc: { state: string; lon: number }): string {
  if (loc.state === "florida") {
    return loc.lon < -85.05 ? "America/Chicago" : "America/New_York";
  }
  return PT;
}

/** Current moment expressed as naive local ms for the given IANA timezone. */
export function nowInTz(tz: string): NaiveMs {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const hour = get("hour") % 24; // Intl can emit "24" for midnight
  return Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    hour,
    get("minute"),
    get("second"),
  );
}

/** Current moment expressed as naive PT ms (California default). */
export function ptNow(): NaiveMs {
  return nowInTz(PT);
}

/** Short display label for a location's timezone: "PT" | "ET" | "CT". */
export function tzAbbrev(tz: string): string {
  if (tz === "America/New_York") return "ET";
  if (tz === "America/Chicago") return "CT";
  return "PT";
}

/** Parse "YYYY-MM-DD HH:mm" or "YYYY-MM-DDTHH:mm[:ss]" as naive PT. */
export function parseNaive(s: string): NaiveMs {
  const m = s.match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?/,
  );
  if (!m) return NaN;
  return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], m[6] ? +m[6] : 0);
}

/** YYYY-MM-DD for a naive PT timestamp. */
export function naiveDateStr(t: NaiveMs): string {
  const d = new Date(t);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`;
}

/** e.g. "3:42 PM" */
export function fmtTime(t: NaiveMs): string {
  return new Date(t).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

/** e.g. "Thu, Aug 6" */
export function fmtDay(t: NaiveMs): string {
  return new Date(t).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** e.g. "Thursday" */
export function fmtWeekday(t: NaiveMs): string {
  return new Date(t).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
}

/** "in 2h 14m" / "38m ago" style relative label vs a reference now. */
export function fmtRelative(t: NaiveMs, now: NaiveMs): string {
  const diff = t - now;
  const abs = Math.abs(diff);
  const h = Math.floor(abs / 3_600_000);
  const m = Math.round((abs % 3_600_000) / 60_000);
  const core = h > 0 ? `${h}h ${m}m` : `${m}m`;
  return diff >= 0 ? `in ${core}` : `${core} ago`;
}

/** YYYYMMDD for NOAA query params, offset by `days` from naive PT now. */
export function noaaDate(now: NaiveMs, days: number): string {
  const d = new Date(now + days * 86_400_000);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}`;
}
