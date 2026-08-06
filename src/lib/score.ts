// The USTideCharts Fishing Score.
//
// Blends the factors experienced anglers actually plan around:
//   • Tide movement  (35%) — moving water triggers feeding; slack tide is dead
//   • Time of day    (25%) — dawn & dusk windows, the classic bite times
//   • Moon phase     (15%) — solunar: new/full moons concentrate activity
//   • Wind           (15%) — light chop is fine; hard wind ruins presentation
//   • Weather        ( 5%) — stable/overcast good; storms poor
//   • Water temp     ( 5%) — CA inshore species feed best ~55–70 °F

import type {
  DayAstro,
  DayScore,
  FishingWindow,
  HourlyMarine,
  HourlyWeather,
  MoonInfo,
  ScoreLabel,
  ScorePoint,
  TidePoint,
} from "./types";
import { tideRateAt } from "./noaa";
import { nearestHour } from "./weather";
import { naiveDateStr } from "./tz";

export function scoreLabel(score: number): ScoreLabel {
  if (score >= 80) return "Excellent";
  if (score >= 65) return "Very Good";
  if (score >= 50) return "Good";
  if (score >= 35) return "Fair";
  return "Poor";
}

export const SCORE_COLORS: Record<ScoreLabel, string> = {
  Excellent: "#4ade80",
  "Very Good": "#2dd4bf",
  Good: "#facc15",
  Fair: "#fb923c",
  Poor: "#f87171",
};

function tideFactor(rate: number | null): number {
  if (rate == null) return 0.5;
  const r = Math.abs(rate); // ft per hour
  // 0 ft/hr → 0.05 (slack), ~1.2+ ft/hr → 1.0 (ripping)
  return Math.min(1, 0.05 + (r / 1.2) * 0.95);
}

function daylightFactor(t: number, days: DayAstro[]): number {
  const date = naiveDateStr(t);
  const day = days.find((d) => d.date === date);
  if (!day) return 0.5;
  const HOUR = 3_600_000;
  const dawnDist = Math.abs(t - day.sunrise);
  const duskDist = Math.abs(t - day.sunset);
  const nearest = Math.min(dawnDist, duskDist);
  if (nearest <= 1.5 * HOUR) return 1; // prime window
  if (nearest <= 3 * HOUR) return 0.75;
  const isDay = t > day.sunrise && t < day.sunset;
  return isDay ? 0.55 : 0.35; // midday lull; night fishable but slower
}

function windFactor(mph: number | null): number {
  if (mph == null) return 0.7;
  if (mph <= 4) return 0.9; // glassy — great, slight ding vs light chop
  if (mph <= 10) return 1; // light chop — ideal
  if (mph <= 15) return 0.75;
  if (mph <= 20) return 0.5;
  if (mph <= 25) return 0.3;
  return 0.12;
}

function weatherFactor(code: number | null, cloudPct: number | null): number {
  if (code != null && code >= 95) return 0.1; // thunderstorm
  if (code != null && code >= 80) return 0.5; // showers
  if (code != null && code >= 61) return 0.55; // rain
  if (code != null && (code === 45 || code === 48)) return 0.8; // fog is fine
  const cloud = cloudPct ?? 30;
  // Broken cloud slightly beats blazing sun
  return cloud >= 30 && cloud <= 90 ? 1 : 0.85;
}

function waterTempFactor(f: number | null): number {
  if (f == null) return 0.7;
  if (f >= 55 && f <= 70) return 1;
  if (f >= 50 && f < 55) return 0.75;
  if (f > 70 && f <= 75) return 0.75;
  return 0.5;
}

export function scoreAt(
  t: number,
  points: TidePoint[],
  weather: HourlyWeather[],
  marine: HourlyMarine[],
  days: DayAstro[],
  moon: MoonInfo,
): number {
  const w = nearestHour(weather, t);
  const m = nearestHour(marine, t);
  const s =
    0.35 * tideFactor(tideRateAt(points, t)) +
    0.25 * daylightFactor(t, days) +
    0.15 * (0.45 + 0.55 * moon.solunarBoost) +
    0.15 * windFactor(w?.windMph ?? null) +
    0.05 * weatherFactor(w?.weatherCode ?? null, w?.cloudPct ?? null) +
    0.05 * waterTempFactor(m?.waterTempF ?? null);
  return Math.round(s * 100);
}

/** Score every 30 min across the series range. */
export function scoreSeries(
  points: TidePoint[],
  weather: HourlyWeather[],
  marine: HourlyMarine[],
  days: DayAstro[],
  moon: MoonInfo,
  from: number,
  to: number,
): ScorePoint[] {
  const out: ScorePoint[] = [];
  for (let t = from; t <= to; t += 1_800_000) {
    out.push({ t, score: scoreAt(t, points, weather, marine, days, moon) });
  }
  return out;
}

function reasonsAt(
  t: number,
  points: TidePoint[],
  weather: HourlyWeather[],
  days: DayAstro[],
  moon: MoonInfo,
): string[] {
  const reasons: string[] = [];
  const rate = tideRateAt(points, t);
  if (rate != null) {
    if (Math.abs(rate) >= 0.8)
      reasons.push(rate > 0 ? "strong incoming tide" : "strong outgoing tide");
    else if (Math.abs(rate) >= 0.35)
      reasons.push(rate > 0 ? "incoming tide" : "outgoing tide");
  }
  if (daylightFactor(t, days) === 1) {
    const date = naiveDateStr(t);
    const day = days.find((d) => d.date === date);
    if (day)
      reasons.push(
        Math.abs(t - day.sunrise) < Math.abs(t - day.sunset)
          ? "dawn bite window"
          : "dusk bite window",
      );
  }
  if (moon.solunarBoost > 0.75)
    reasons.push(`${moon.phaseName.toLowerCase()} solunar period`);
  const w = nearestHour(weather, t);
  if (w?.windMph != null && w.windMph <= 10) reasons.push("light wind");
  return reasons;
}

/** Best 2-hour windows for a given day. */
export function bestWindows(
  dayStart: number,
  points: TidePoint[],
  weather: HourlyWeather[],
  marine: HourlyMarine[],
  days: DayAstro[],
  moon: MoonInfo,
  count = 2,
): FishingWindow[] {
  const HOUR = 3_600_000;
  const candidates: FishingWindow[] = [];
  // Slide a 2-h window in 30-min steps from 4am to 10pm
  for (let start = dayStart + 4 * HOUR; start <= dayStart + 20 * HOUR; start += HOUR / 2) {
    const mid = start + HOUR;
    const s =
      (scoreAt(start, points, weather, marine, days, moon) +
        scoreAt(mid, points, weather, marine, days, moon) +
        scoreAt(start + 2 * HOUR, points, weather, marine, days, moon)) /
      3;
    candidates.push({
      start,
      end: start + 2 * HOUR,
      score: Math.round(s),
      reasons: reasonsAt(mid, points, weather, days, moon),
    });
  }
  candidates.sort((a, b) => b.score - a.score);
  const picked: FishingWindow[] = [];
  for (const c of candidates) {
    if (picked.every((p) => c.end <= p.start - HOUR || c.start >= p.end + HOUR)) {
      picked.push(c);
      if (picked.length >= count) break;
    }
  }
  return picked.sort((a, b) => a.start - b.start);
}

/** Daily summary for the 7-day outlook. */
export function dayScores(
  days: DayAstro[],
  points: TidePoint[],
  weather: HourlyWeather[],
  marine: HourlyMarine[],
  moon: MoonInfo,
  fromDate: string,
  n = 7,
): DayScore[] {
  const out: DayScore[] = [];
  let startIdx = days.findIndex((d) => d.date === fromDate);
  if (startIdx < 0) startIdx = 0; // date drift at midnight — degrade gracefully
  for (let i = startIdx; i < Math.min(days.length, startIdx + n); i++) {
    const day = days[i];
    const dayStart = Date.parse(`${day.date}T00:00:00Z`); // naive PT midnight
    const windows = bestWindows(dayStart, points, weather, marine, days, moon);
    // Day score = the BEST window (windows are sorted chronologically)
    const top = windows.length
      ? Math.max(...windows.map((w) => w.score))
      : 40;
    out.push({
      date: day.date,
      score: top,
      label: scoreLabel(top),
      bestWindows: windows,
    });
  }
  return out;
}
