// Snapshot NOAA's tide-prediction station list into src/data/noaa-stations.json.
//
// The live list is ~2.7 MB, over Next's 2 MB data-cache limit, so fetching it
// at render time re-downloaded and re-parsed it on every cold render (and a
// transient NOAA failure once produced a curated-only sitemap). Station lists
// change rarely; re-run this when adding a state or every few months:
//
//   node scripts/snapshot-stations.mjs
//
// Keeps only stations with a state code and only the fields the site uses,
// in NOAA's original order (stations.ts relies on that order for slugs).

import { writeFileSync } from "node:fs";

const LIST_URL =
  "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?type=tidepredictions";

const res = await fetch(LIST_URL);
if (!res.ok) throw new Error(`mdapi ${res.status}`);
const data = await res.json();
if (!data.stations?.length) throw new Error("empty station list");

const rows = data.stations
  .filter((s) => s.state && s.id && s.name && s.lat != null && s.lng != null)
  .map((s) => [s.id, s.name, s.state, s.lat, s.lng]);

const out = new URL("../src/data/noaa-stations.json", import.meta.url);
writeFileSync(
  out,
  JSON.stringify({ fetched: new Date().toISOString().slice(0, 10), rows }) + "\n",
);
console.log(`${rows.length} stations written to src/data/noaa-stations.json`);
