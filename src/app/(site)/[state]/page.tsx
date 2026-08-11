import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScoreBadge from "@/components/ScoreBadge";
import SearchBar from "@/components/SearchBar";
import { getLocationData } from "@/lib/data";
import { LOCATIONS, type Location } from "@/lib/locations";
import { getSearchIndex, getStationLocations } from "@/lib/stations";
import { STATE_SLUGS, getState } from "@/lib/states";
import { nextEvents } from "@/lib/noaa";
import { SCORE_COLORS, dayScores, scoreLabel } from "@/lib/score";
import { fmtTime, locTz, naiveDateStr, nowInTz } from "@/lib/tz";

export const revalidate = 1800;

export function generateStaticParams() {
  return STATE_SLUGS.map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const st = getState(state);
  if (!st) notFound(); // real 404 status before streaming starts
  return {
    title: `${st.name} Tide Charts & Fishing Forecasts`,
    description: st.description,
    alternates: { canonical: `/${st.slug}` },
  };
}

async function locSummary(loc: Location) {
  try {
    const data = await getLocationData(loc);
    const now = nowInTz(locTz(loc));
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

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const st = getState(state);
  if (!st) notFound();

  const curated = LOCATIONS.filter((l) => l.state === st.slug);
  const summaries = await Promise.all(curated.map(locSummary));
  const stations = (await getStationLocations()).filter(
    (s) => s.state === st.slug,
  );
  const searchIndex = await getSearchIndex();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${st.name} Tide Charts & Fishing Forecasts`,
    url: `https://ustidecharts.com/${st.slug}`,
    hasPart: curated.map((l) => ({
      "@type": "Place",
      name: `${l.name}, ${st.name}`,
      url: `https://ustidecharts.com/${st.slug}/${l.slug}`,
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
          { name: st.name, href: `/${st.slug}` },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {st.name} <span className="text-ink-faint">Tides & Fishing</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink-dim">{st.description}</p>
      <div className="mt-6 max-w-xl">
        <SearchBar locations={searchIndex} defaultState={st.slug} />
      </div>

      {st.regions.map((region) => {
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
                  href={`/${loc.state}/${loc.slug}`}
                  className="card card-hover flex flex-col p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-semibold">{loc.name}</p>
                    {score != null && (
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <p
                          className="text-lg font-bold leading-none tabular-nums"
                          style={{ color: SCORE_COLORS[scoreLabel(score)] }}
                        >
                          {score}
                          <span className="text-[10px] font-medium text-ink-faint"> /100 today</span>
                        </p>
                        <ScoreBadge label={scoreLabel(score)} size="sm" />
                      </div>
                    )}
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
            Every {st.name} Tide Station
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-dim">
            Live tide charts for all {stations.length + curated.length} NOAA
            prediction stations on the {st.name} coast — every harbor, creek
            mouth, and pier in the official network.
          </p>
          {st.regions.map((region) => {
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
                        href={`/${s.state}/${s.slug}`}
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
