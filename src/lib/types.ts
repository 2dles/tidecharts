// Shared types for USTideCharts

/** All timestamps are "naive Pacific Time" encoded as UTC ms — see lib/tz.ts */
export type NaiveMs = number;

export interface TidePoint {
  t: NaiveMs;
  h: number; // feet above MLLW
}

export interface TideEvent {
  t: NaiveMs;
  h: number;
  type: "H" | "L";
}

export interface HourlyWeather {
  t: NaiveMs;
  tempF: number | null;
  windMph: number | null;
  windDir: number | null; // degrees
  gustMph: number | null;
  cloudPct: number | null;
  weatherCode: number | null;
}

export interface HourlyMarine {
  t: NaiveMs;
  waveFt: number | null;
  wavePeriodS: number | null;
  waterTempF: number | null;
}

export interface DayAstro {
  date: string; // YYYY-MM-DD
  sunrise: NaiveMs;
  sunset: NaiveMs;
  weatherCode: number | null;
  tempMaxF: number | null;
  tempMinF: number | null;
}

export interface MoonInfo {
  phaseName: string;
  ageDays: number;
  illumination: number; // 0..1
  emoji: string;
  solunarBoost: number; // 0..1 — how favorable for fishing
}

export type ScoreLabel = "Excellent" | "Very Good" | "Good" | "Fair" | "Poor";

export interface ScorePoint {
  t: NaiveMs;
  score: number; // 0..100
}

export interface FishingWindow {
  start: NaiveMs;
  end: NaiveMs;
  score: number;
  reasons: string[];
}

export interface DayScore {
  date: string;
  label: ScoreLabel;
  score: number;
  bestWindows: FishingWindow[];
}

export interface LocationData {
  points: TidePoint[]; // dense series, ~8 days
  events: TideEvent[]; // highs & lows
  weather: HourlyWeather[];
  marine: HourlyMarine[];
  days: DayAstro[];
  moon: MoonInfo;
  fetchedAt: NaiveMs;
}
