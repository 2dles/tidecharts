// Per-station facts computed from 30 days of NOAA high/low predictions.
//
// Every station page shares one template, so on their own the pages differ
// mostly by name and today's numbers. These facts are what actually differs
// between stations (range, daily pattern, extremes, minus tides) and are
// computed only from the predictions themselves: no labels or claims beyond
// what the numbers show.

import type { TideEvent } from "./types";

const DAY = 86_400_000;

export interface DayRange {
  start: number; // naive ms at local midnight
  range: number; // highest high minus lowest low that day, ft
}

export interface TideFacts {
  days: number;
  avgRange: number;
  biggest: DayRange;
  smallest: DayRange;
  lowest: TideEvent;
  highest: TideEvent;
  minusDays: number;
  /** Share of days with two (or more) high tides. */
  twoHighShare: number;
  /** Median gap between a day's two highs, on days that have two. */
  medianHighGap: number | null;
}

function median(xs: number[]): number | null {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function computeTideFacts(events: TideEvent[]): TideFacts | null {
  if (events.length < 20) return null;
  const byDay = new Map<number, TideEvent[]>();
  for (const e of events) {
    const d = Math.floor(e.t / DAY) * DAY;
    const list = byDay.get(d);
    if (list) list.push(e);
    else byDay.set(d, [e]);
  }

  const ranges: DayRange[] = [];
  const highGaps: number[] = [];
  let twoHighDays = 0;
  let minusDays = 0;
  for (const [start, list] of [...byDay.entries()].sort((a, b) => a[0] - b[0])) {
    const highs = list.filter((e) => e.type === "H").map((e) => e.h);
    const lows = list.filter((e) => e.type === "L").map((e) => e.h);
    if (highs.length >= 2) {
      twoHighDays++;
      const sorted = [...highs].sort((a, b) => b - a);
      highGaps.push(sorted[0] - sorted[1]);
    }
    if (lows.some((h) => h < 0)) minusDays++;
    if (highs.length && lows.length) {
      ranges.push({ start, range: Math.max(...highs) - Math.min(...lows) });
    }
  }
  if (ranges.length < 10) return null;

  const highsAll = events.filter((e) => e.type === "H");
  const lowsAll = events.filter((e) => e.type === "L");
  if (!highsAll.length || !lowsAll.length) return null;

  return {
    days: byDay.size,
    avgRange: ranges.reduce((s, r) => s + r.range, 0) / ranges.length,
    biggest: ranges.reduce((a, b) => (b.range > a.range ? b : a)),
    smallest: ranges.reduce((a, b) => (b.range < a.range ? b : a)),
    lowest: lowsAll.reduce((a, b) => (b.h < a.h ? b : a)),
    highest: highsAll.reduce((a, b) => (b.h > a.h ? b : a)),
    minusDays,
    twoHighShare: twoHighDays / byDay.size,
    medianHighGap: median(highGaps),
  };
}

/** One sentence on the daily pattern, stated from the counts only. */
export function patternSentence(f: TideFacts): string {
  if (f.twoHighShare >= 0.8) {
    const gap = f.medianHighGap ?? 0;
    if (gap >= 0.3 && gap >= 0.25 * f.avgRange) {
      return `Most days have two high tides and two low tides, and the two highs are noticeably different: on a typical day they differ by about ${gap.toFixed(1)} ft.`;
    }
    return `Most days have two high tides and two low tides of similar size (the two highs usually differ by ${gap < 0.1 ? "less than 0.1" : `about ${gap.toFixed(1)}`} ft).`;
  }
  if (f.twoHighShare <= 0.3) {
    return "Most days have a single high tide and a single low tide.";
  }
  return `The pattern changes through the month: ${Math.round(
    f.twoHighShare * f.days,
  )} of the ${f.days} days have two high tides, the rest only one.`;
}
