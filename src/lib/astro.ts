// Moon phase — computed from the mean synodic month.
// Accurate to within a few hours, plenty for a fishing forecast.

import type { MoonInfo } from "./types";

const SYNODIC_DAYS = 29.530588853;
// A known new moon: 2000-01-06 18:14 UTC
const NEW_MOON_EPOCH = Date.UTC(2000, 0, 6, 18, 14);

export function moonInfo(realUtcMs: number = Date.now()): MoonInfo {
  const days = (realUtcMs - NEW_MOON_EPOCH) / 86_400_000;
  const age = ((days % SYNODIC_DAYS) + SYNODIC_DAYS) % SYNODIC_DAYS;
  const frac = age / SYNODIC_DAYS;
  const illumination = (1 - Math.cos(2 * Math.PI * frac)) / 2;

  let phaseName: string;
  let emoji: string;
  if (age < 1.85) [phaseName, emoji] = ["New Moon", "🌑"];
  else if (age < 5.53) [phaseName, emoji] = ["Waxing Crescent", "🌒"];
  else if (age < 9.22) [phaseName, emoji] = ["First Quarter", "🌓"];
  else if (age < 12.91) [phaseName, emoji] = ["Waxing Gibbous", "🌔"];
  else if (age < 16.61) [phaseName, emoji] = ["Full Moon", "🌕"];
  else if (age < 20.3) [phaseName, emoji] = ["Waning Gibbous", "🌖"];
  else if (age < 23.99) [phaseName, emoji] = ["Last Quarter", "🌗"];
  else if (age < 27.68) [phaseName, emoji] = ["Waning Crescent", "🌘"];
  else [phaseName, emoji] = ["New Moon", "🌑"];

  // Solunar theory: new & full moons (spring tides) fish best; quarters worst.
  // Distance from the nearest quarter phase, normalized to 0..1.
  const distFromNew = Math.min(age, SYNODIC_DAYS - age); // 0..14.77
  const distFromFull = Math.abs(age - SYNODIC_DAYS / 2); // 0..14.77
  const distFromSpring = Math.min(distFromNew, distFromFull); // 0..~7.4
  const solunarBoost = 1 - distFromSpring / (SYNODIC_DAYS / 4);

  return { phaseName, ageDays: age, illumination, emoji, solunarBoost };
}
