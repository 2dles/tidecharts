import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScoreBadge from "@/components/ScoreBadge";
import SearchBar from "@/components/SearchBar";
import { getLocationData } from "@/lib/data";
import { LOCATIONS, type Location } from "@/lib/locations";
import { getSearchIndex, getStationLocations } from "@/lib/stations";
import { nextEvents } from "@/lib/noaa";
import { dayScores, scoreLabel } from "@/lib/score";
import { fmtTime, naiveDateStr, ptNow } from "@/lib/tz";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "California Tide Charts & Fishing Forecasts",
  description:
    "Live tide charts and 7-day fishing forecasts for California's best fishing spots — Crescent City to San Diego. Tides, weather, species, and bite windows.",
  alternates: { canonical: "/california" },
};

const REGIONS: { key: Location["region"]; name: string }[] = [
  { key: "norcal", name: "Northern California" },
  { key: "central", name: "Central Coast" },
  { key: "socal", name: "Southern California" },
];

async function locSummary(loc: Location) {
  try {
    const data = await getLocationData(loc);
    const now = ptNow();
    const { nextHigh, nextLow } = nextEvents(data.events, now);
    const today = dayScores(
      data.days, data.points, data.weather, data.marine, data.moon,
      naiveDateStr(now), 1,
    )[0];
    return { loc, nextHigh, nextLow, score: today?.score ?? null };
  } catch {
    return { loc, nextHigh: null, nextLow: null, score: null };
  }
}

export default async function CaliforniaPage() {
  const summaries = await Promise.all(LOCATIONS.map(locSummary));
  const stations = await getStationLocations();
  const searchIndex = await getSearchIndex();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "California Tide Charts & Fishing Forecasts",
    url: "https://ustidecharts.com/california",
    hasPart: LOCATIONS.map((l) => ({
      "@type": "Place",
      name: `${l.name}, California`,
      url: `https://ustidecharts.com/california/${l.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "California", href: "/california" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        California <span className="text-ink-faint">Tides & Fishing</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink-dim">
        Live NOAA tide predictions and fishing forecasts for {LOCATIONS.length}{" "}
        California locations, from the redwood coast to the Mexican border.
      </p>
      <div className="mt-6 max-w-xl">
        <SearchBar locations={searchIndex} />
      </div>

      {REGIONS.map((region) => {
        const locs = summaries.filter((s) => s.loc.region === region.key);
        if (locs.length === 0) return null;
        return (
          <section key={region.key} className="mt-10" aria-labelledby={`r-${region.key}`}>
            <h2 id={`r-${region.key}`} className="text-lg font-semibold tracking-tight">
              {region.name}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locs.map(({ loc, nextHigh, nextLow, score }) => (
                <Link
                  key={loc.slug}
                  href={`/california/${loc.slug}`}
                  className="card card-hover flex flex-col p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{loc.name}</p>
                    {score != null && <ScoreBadge label={scoreLabel(score)} size="sm" />}
                  </div>
                  <p className="mt-1 text-xs text-ink-faint">{loc.tagline}</p>
                  <div className="mt-4 flex gap-6 border-t border-line pt-3 text-xs">
                    <p className="text-ink-faint">
                      High{" "}
                      <span className="tabular-nums text-ink-dim">
                        {nextHigh ? fmtTime(nextHigh.t) : "—"}
                      </span>
                    </p>
                    <p className="text-ink-faint">
                      Low{" "}
                      <span className="tabular-nums text-ink-dim">
                        {nextLow ? fmtTime(nextLow.t) : "—"}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {stations.length > 0 && (
        <section className="mt-12" aria-labelledby="all-stations-h">
          <h2 id="all-stations-h" className="text-lg font-semibold tracking-tight">
            Every California Tide Station
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-dim">
            Live tide charts for all {stations.length + LOCATIONS.length} NOAA
            prediction stations on the California coast — every harbor, creek
            mouth, and pier in the official network.
          </p>
          {REGIONS.map((region) => {
            const rs = stations.filter((s) => s.region === region.key);
            if (rs.length === 0) return null;
            return (
              <div key={region.key} className="mt-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-faint">
                  {region.name}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {rs.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/california/${s.slug}`}
                        className="chip transition-colors hover:border-line-hi hover:text-ink"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
