# USTideCharts — America's Fishing Dashboard

The California pilot of USTideCharts.com: live NOAA tide charts, weather, a
fishing score, species intel, and gear recommendations from TheAnglerStore.

## Quick start

```bash
npm install
npm run dev       # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Deploy (do this first — nothing ranks until it's live)

1. Push this folder to a GitHub repo (a git repo is already initialized with a
   clean first commit).
2. On [vercel.com](https://vercel.com): **Add New Project → Import** the repo →
   Deploy. Zero config needed — Next.js is auto-detected.
3. Add your domain (ustidecharts.com) under Project → Settings → Domains.
4. Verify the domain in [Google Search Console](https://search.google.com/search-console)
   and submit `https://ustidecharts.com/sitemap.xml`.
5. Add analytics (Plausible or GA4) so you can see what's working.

Once deployed, live NOAA/Open-Meteo data flows automatically — the sample-data
badge disappears on its own.

## What's inside

| Route | Purpose |
|---|---|
| `/` | Hero + instant search + live condition cards |
| `/california` | State index, grouped by region |
| `/california/[slug]` | The location dashboard (12 CA spots) |
| `/guides` + `/guides/[slug]` | Long-form SEO articles with gear recs |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

## Data sources (free, no API keys)

- **Tides** — NOAA CO-OPS predictions (`api.tidesandcurrents.noaa.gov`), 10-minute
  interval + high/low events, station-local time, MLLW datum. All 12 station IDs
  verified against NOAA's metadata API.
- **Weather** — Open-Meteo forecast API (temp, wind, clouds, sunrise/sunset).
- **Marine** — Open-Meteo marine API (wave height/period, water temp).
- **Moon** — computed locally (synodic month), no API needed.

Pages are statically generated and revalidate every 30 minutes (ISR), so NOAA
sees a handful of requests per location per day no matter how much traffic you get.

**Sample-data fallback:** if the APIs are unreachable, pages render realistic
harmonic tide data and show an amber "sample data" badge instead of erroring.
(This is why a build done offline still works.) With network access, data is live
automatically — nothing to configure. `node scripts/verify-stations.mjs` checks
every station end-to-end.

## The fishing score

`src/lib/score.ts` — weighted blend, per half-hour:
tide movement 35% · time of day (dawn/dusk) 25% · moon phase (solunar) 15% ·
wind 15% · weather 5% · water temp 5% → 0–100 → Excellent…Poor.
It also computes the best 2-hour windows per day ("when should I leave?").
Tune the weights and curves in one file.

## Adding locations

Add an entry to `src/lib/locations.ts` (find station IDs at
tidesandcurrents.noaa.gov), pick species keys from `src/lib/species.ts`, done —
the page, sitemap, search index, and internal links all generate from the registry.

## TheAnglerStore integration

`src/lib/gear.ts` is the product catalog; every card links to
`theanglerstore.com/products/<key>?utm_source=ustidecharts` so you can attribute
traffic. Swap in real product URLs/images when the store is live.

## Tech

Next.js 16 (App Router, TypeScript, Tailwind 4), self-hosted Geist font, custom
SVG interactive tide chart (hover/pan/zoom/pinch, animated now-marker, night
shading) — no chart library. JSON-LD (Place, BreadcrumbList, Article, Collection),
per-page metadata, canonical URLs, OpenGraph.
