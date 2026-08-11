// Deterministic sample data generator.
//
// Used only when the live NOAA / Open-Meteo APIs are unreachable (offline dev,
// API outage). Produces a realistic California mixed semidiurnal tide from two
// harmonic constituents, plausible coastal weather, and astronomically-correct
// sunrise/sunset — so the site degrades gracefully instead of blanking.

import type { Location } from "./locations";
import type {
  DayAstro,
  HourlyMarine,
  HourlyWeather,
  TideEvent,
  TidePoint,
} from "./types";
import { locTz, naiveDateStr, nowInTz } from "./tz";

const HOUR = 3_600_000;
const DAY = 86_400_000;

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

// --- Tides: M2 + K1 + O1 harmonics (mixed semidiurnal, like the CA coast) ---

const T_M2 = 12.4206 * HOUR;
const T_K1 = 23.9345 * HOUR;
const T_O1 = 25.8193 * HOUR;

export function sampleTideHeight(t: number, seed: number): number {
  const p1 = seed * Math.PI * 2;
  const p2 = seed * Math.PI * 4.7;
  const p3 = seed * Math.PI * 1.3;
  return (
    2.75 +
    1.85 * Math.cos((2 * Math.PI * t) / T_M2 + p1) +
    1.15 * Math.cos((2 * Math.PI * t) / T_K1 + p2) +
    0.7 * Math.cos((2 * Math.PI * t) / T_O1 + p3)
  );
}

export function sampleTideSeries(loc: Location): TidePoint[] {
  const seed = hashSeed(loc.stationId);
  const now = nowInTz(locTz(loc));
  const start = Math.floor((now - DAY) / DAY) * DAY;
  const end = start + 9 * DAY;
  const pts: TidePoint[] = [];
  for (let t = start; t <= end; t += 10 * 60_000) {
    pts.push({ t, h: Number(sampleTideHeight(t, seed).toFixed(3)) });
  }
  return pts;
}

export function sampleTideEvents(points: TidePoint[]): TideEvent[] {
  const events: TideEvent[] = [];
  for (let i = 1; i < points.length - 1; i++) {
    const a = points[i - 1].h;
    const b = points[i].h;
    const c = points[i + 1].h;
    if (b > a && b >= c) events.push({ t: points[i].t, h: b, type: "H" });
    else if (b < a && b <= c) events.push({ t: points[i].t, h: b, type: "L" });
  }
  return events;
}

// --- Sun: NOAA solar position approximation (accurate to ~1 min) ---

/** Standard/daylight UTC offsets for a US IANA zone (hours, negative = west). */
function tzOffsets(tz: string): { std: number; dst: number } {
  if (tz === "America/New_York") return { std: -5, dst: -4 };
  if (tz === "America/Chicago") return { std: -6, dst: -5 };
  return { std: -8, dst: -7 }; // Pacific
}

function sunTimes(dateStr: string, lat: number, lon: number, tz: string) {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const n =
    Math.floor((Date.UTC(y, mo - 1, d) - Date.UTC(y, 0, 1)) / DAY) + 1;
  const lngHour = lon / 15;
  const calc = (rising: boolean) => {
    const tApprox = n + ((rising ? 6 : 18) - lngHour) / 24;
    const M = 0.9856 * tApprox - 3.289;
    let L =
      M +
      1.916 * Math.sin((M * Math.PI) / 180) +
      0.02 * Math.sin((2 * M * Math.PI) / 180) +
      282.634;
    L = ((L % 360) + 360) % 360;
    let RA = (180 / Math.PI) * Math.atan(0.91764 * Math.tan((L * Math.PI) / 180));
    RA = ((RA % 360) + 360) % 360;
    RA += Math.floor(L / 90) * 90 - Math.floor(RA / 90) * 90;
    RA /= 15;
    const sinDec = 0.39782 * Math.sin((L * Math.PI) / 180);
    const cosDec = Math.cos(Math.asin(sinDec));
    const cosH =
      (Math.cos((90.833 * Math.PI) / 180) -
        sinDec * Math.sin((lat * Math.PI) / 180)) /
      (cosDec * Math.cos((lat * Math.PI) / 180));
    if (cosH > 1 || cosH < -1) return rising ? 6 : 18;
    let H = rising
      ? 360 - (180 / Math.PI) * Math.acos(cosH)
      : (180 / Math.PI) * Math.acos(cosH);
    H /= 15;
    const T = H + RA - 0.06571 * tApprox - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    // US DST: daylight offset from 2nd Sunday of March to 1st Sunday of November
    const nthSunday = (month: number, nth: number) => {
      const first = new Date(Date.UTC(y, month - 1, 1)).getUTCDay();
      return 1 + ((7 - first) % 7) + (nth - 1) * 7;
    };
    const dstStart = nthSunday(3, 2); // 2nd Sunday of March
    const dstEnd = nthSunday(11, 1); // 1st Sunday of November
    const isDst =
      (mo > 3 || (mo === 3 && d >= dstStart)) &&
      (mo < 11 || (mo === 11 && d < dstEnd));
    const off = tzOffsets(tz);
    let local = UT + (isDst ? off.dst : off.std);
    local = ((local % 24) + 24) % 24;
    return local;
  };
  const rise = calc(true);
  const set = calc(false);
  const base = Date.UTC(y, mo - 1, d);
  return {
    sunrise: base + Math.round(rise * HOUR),
    sunset: base + Math.round(set * HOUR),
  };
}

// --- Weather & marine ---

export function sampleWeatherDays(loc: Location): {
  hourly: HourlyWeather[];
  days: DayAstro[];
} {
  const seed = hashSeed(loc.slug);
  const tz = locTz(loc);
  const now = nowInTz(tz);
  const start = Math.floor(now / DAY) * DAY - DAY;
  const hourly: HourlyWeather[] = [];
  const days: DayAstro[] = [];
  const AIR: Record<string, number> = {
    norcal: 60, central: 64, socal: 70,
    panhandle: 82, gulf: 86, atlantic: 84, keys: 86,
  };
  const baseTemp = AIR[loc.region] ?? 68;
  for (let d = 0; d < 9; d++) {
    const dayStart = start + d * DAY;
    const dateStr = naiveDateStr(dayStart);
    const sun = sunTimes(dateStr, loc.lat, loc.lon, tz);
    const dayCloud = 20 + 60 * Math.abs(Math.sin(seed * 9 + d * 1.7));
    days.push({
      date: dateStr,
      sunrise: sun.sunrise,
      sunset: sun.sunset,
      weatherCode: dayCloud > 60 ? 3 : dayCloud > 35 ? 2 : 1,
      tempMaxF: Math.round(baseTemp + 6 + 3 * Math.sin(seed * 5 + d)),
      tempMinF: Math.round(baseTemp - 8 + 2 * Math.sin(seed * 3 + d)),
    });
    for (let h = 0; h < 24; h++) {
      const t = dayStart + h * HOUR;
      const diurnal = Math.sin(((h - 6) / 24) * 2 * Math.PI);
      // Afternoon sea breeze pattern
      const wind =
        4 + 8 * Math.max(0, Math.sin(((h - 9) / 14) * Math.PI)) +
        3 * Math.abs(Math.sin(seed * 7 + d * 2.3));
      hourly.push({
        t,
        tempF: Math.round(baseTemp + 6 * diurnal),
        windMph: Math.round(wind * 10) / 10,
        windDir: 280 + Math.round(30 * Math.sin(seed + h / 4)),
        gustMph: Math.round(wind * 1.4 * 10) / 10,
        cloudPct: Math.round(
          Math.min(100, Math.max(0, dayCloud + (h < 10 ? 25 : -10))),
        ),
        weatherCode: dayCloud > 60 ? 3 : dayCloud > 35 ? 2 : 1,
      });
    }
  }
  return { hourly, days };
}

export function sampleMarine(loc: Location): HourlyMarine[] {
  const seed = hashSeed(loc.name);
  const now = nowInTz(locTz(loc));
  const start = Math.floor(now / DAY) * DAY - DAY;
  const WATER: Record<string, number> = {
    norcal: 55, central: 59, socal: 67,
    panhandle: 82, gulf: 86, atlantic: 84, keys: 86,
  };
  const waterBase = WATER[loc.region] ?? 65;
  const out: HourlyMarine[] = [];
  for (let h = 0; h < 9 * 24; h++) {
    const t = start + h * HOUR;
    out.push({
      t,
      waveFt:
        Math.round(
          (2.4 + 1.3 * Math.sin(seed * 6 + h / 18) + 0.4 * Math.sin(h / 5)) * 10,
        ) / 10,
      wavePeriodS: Math.round((11 + 3 * Math.sin(seed + h / 30)) * 10) / 10,
      waterTempF: Math.round((waterBase + 1.5 * Math.sin(h / 24)) * 10) / 10,
    });
  }
  return out;
}
