import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import ScoreBadge from "@/components/ScoreBadge";
import ScoreDial from "@/components/ScoreDial";
import TideChart from "@/components/TideChart";
import TideStrip from "@/components/TideStrip";
import { getLocationData } from "@/lib/data";
import { getProducts } from "@/lib/gear";
import { LOCATIONS, getLocation, getNearby } from "@/lib/locations";
import { bestWindows, dayScores, scoreAt, scoreLabel } from "@/lib/score";
import { SPECIES, speciesActivity } from "@/lib/species";
import {
  fmtDay,
  fmtTime,
  naiveDateStr,
  ptNow,
} from "@/lib/tz";
import {
  nearestHour,
  weatherEmoji,
  weatherLabel,
  windCompass,
} from "@/lib/weather";
import { ARTICLES } from "@/lib/articles";

export const revalidate = 1800;

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) return {};

  const now = ptNow();
  const dateStr = new Date(now).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  // Meta description with today's ACTUAL tide times — unique per page per day,
  // and exactly what a "[city] tide chart today" searcher wants to see.
  let description = `Live ${loc.name}, CA tide chart with today's high and low tide times, 7-day tide table, weather, water temperature, and the best times to fish.`;
  try {
    const data = await getLocationData(loc);
    const dayStart = Math.floor(now / DAY_MS) * DAY_MS;
    const todays = data.events.filter(
      (e) => e.t >= dayStart && e.t < dayStart + DAY_MS,
    );
    if (todays.length) {
      const parts = todays.map(
        (e) =>
          `${e.type === "H" ? "high" : "low"} at ${fmtTime(e.t)} (${e.h.toFixed(1)} ft)`,
      );
      description = `Today's tides in ${loc.name}, CA: ${parts.join(", ")}. Live NOAA tide chart, 7-day tide table, weather and the best fishing times.`;
    }
  } catch {
    // keep static fallback description
  }

  return {
    title: `${loc.name}, CA Tide Chart ${dateStr} — High & Low Tide Times`,
    description,
    alternates: { canonical: `/california/${loc.slug}` },
    openGraph: {
      title: `${loc.name} Tide Chart & Fishing Forecast | USTideCharts`,
      description: loc.tagline,
    },
  };
}

const DAY_MS = 86_400_000;

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = getLocation(slug);
  if (!loc) notFound();

  const data = await getLocationData(loc);
  const now = ptNow();
  const today = naiveDateStr(now);
  const month = new Date(now).getUTCMonth() + 1;

  const score = scoreAt(now, data.points, data.weather, data.marine, data.days, data.moon);
  const label = scoreLabel(score);
  const wx = nearestHour(data.weather, now);
  const sea = nearestHour(data.marine, now);
  const todayAstro = data.days.find((d) => d.date === today);

  const dayStart = Math.floor(now / DAY_MS) * DAY_MS;
  const windows = bestWindows(
    dayStart, data.points, data.weather, data.marine, data.days, data.moon,
  );
  const bestWindow = windows.length
    ? windows.reduce((a, b) => (b.score > a.score ? b : a))
    : null;
  const week = dayScores(
    data.days, data.points, data.weather, data.marine, data.moon, today, 7,
  );

  const todayEvents = data.events.filter(
    (e) => e.t >= dayStart && e.t < dayStart + 2 * DAY_MS,
  );

  const activeSpecies = loc.speciesKeys
    .map((k) => SPECIES[k])
    .filter(Boolean)
    .map((s) => ({ s, activity: speciesActivity(s, month) }))
    .sort((a, b) => {
      const rank = { high: 0, medium: 1, low: 2 } as const;
      return rank[a.activity] - rank[b.activity];
    });

  const gearKeys = activeSpecies
    .filter(({ activity }) => activity !== "low")
    .flatMap(({ s }) => s.gearKeys);
  const gear = getProducts(gearKeys).slice(0, 4);

  const relatedArticles = ARTICLES.slice(0, 3);
  const nearby = getNearby(loc);

  // --- Crawlable prose + FAQ (unique per page, refreshed with the data) ---

  const todaysHL = data.events.filter(
    (e) => e.t >= dayStart && e.t < dayStart + DAY_MS,
  );
  const tomorrowsHL = data.events.filter(
    (e) => e.t >= dayStart + DAY_MS && e.t < dayStart + 2 * DAY_MS,
  );
  const highs = todaysHL.filter((e) => e.type === "H");
  const lows = todaysHL.filter((e) => e.type === "L");
  const monthName = new Date(now).toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const listTimes = (evs: typeof todaysHL) =>
    evs
      .map((e) => `${fmtTime(e.t)} (${e.h.toFixed(1)} ft)`)
      .join(" and again at ");

  const tideRange =
    todaysHL.length >= 2
      ? Math.max(...todaysHL.map((e) => e.h)) -
        Math.min(...todaysHL.map((e) => e.h))
      : null;

  const proseToday = todaysHL.length
    ? `Today in ${loc.name}, ${
        highs.length
          ? `high tide arrives at ${listTimes(highs)}`
          : "no high tide falls within the calendar day"
      }${
        lows.length
          ? `, and low tide bottoms out at ${listTimes(lows)}`
          : ""
      }.${
        tideRange != null
          ? ` That's a ${tideRange.toFixed(1)}-foot swing — ${
              tideRange >= 5
                ? "big, fast-moving water that concentrates feeding fish"
                : tideRange >= 3.5
                  ? "a solid mid-size swing with reliable current on each side of the extremes"
                  : "a gentle neap-cycle swing, so focus on dawn and dusk rather than mid-tide current"
            }.`
          : ""
      }`
    : `Tide predictions for ${loc.name} are refreshed throughout the day from NOAA station ${loc.stationId}.`;

  const proseSun = todayAstro
    ? `The sun rises at ${fmtTime(todayAstro.sunrise)} and sets at ${fmtTime(todayAstro.sunset)}, under a ${data.moon.phaseName.toLowerCase()} (${Math.round(data.moon.illumination * 100)}% illuminated). ${
        data.moon.solunarBoost > 0.7
          ? "With the moon near its spring-tide phase, expect stronger-than-average water movement all week."
          : data.moon.solunarBoost < 0.35
            ? "With the moon near a quarter phase, tidal movement is on the mild side this week."
            : "Tidal range is in the middle of its two-week cycle."
      }`
    : "";

  const faq = [
    {
      q: `What time is high tide in ${loc.name} today?`,
      a: highs.length
        ? `High tide in ${loc.name} today is at ${listTimes(highs)}, measured at NOAA station ${loc.stationId} (${loc.stationName}).`
        : `The next high tide at ${loc.name} is shown live in the tide chart above, from NOAA station ${loc.stationId}.`,
    },
    {
      q: `What time is low tide in ${loc.name} today?`,
      a: lows.length
        ? `Low tide in ${loc.name} today is at ${listTimes(lows)}. ${
            lows.some((l) => l.h < 0)
              ? "Today includes a minus tide — a good window for exploring structure that's normally underwater."
              : ""
          }`.trim()
        : `The next low tide at ${loc.name} is shown live in the tide chart above.`,
    },
    {
      q: `When is the best time to fish in ${loc.name} today?`,
      a: bestWindow
        ? `Today's best fishing window at ${loc.name} is ${fmtTime(bestWindow.start)}–${fmtTime(bestWindow.end)} (rated ${scoreLabel(bestWindow.score)}, ${bestWindow.score}/100)${
            bestWindow.reasons.length
              ? `, driven by ${bestWindow.reasons.join(", ")}`
              : ""
          }. The score blends tide movement, dawn/dusk light, moon phase, wind, and water temperature.`
        : `The fishing score above rates every hour of the day from tide movement, light, moon phase, wind, and water temperature.`,
    },
    {
      q: `What fish are biting in ${loc.name} in ${monthName}?`,
      a: (() => {
        const active = activeSpecies
          .filter(({ activity }) => activity === "high")
          .map(({ s }) => s.name);
        return active.length
          ? `In ${monthName}, the most active species at ${loc.name} are ${active.join(", ")}. See the species section above for baits, techniques, and seasons.`
          : `${monthName} is a slower month at ${loc.name} — check the species section above for what's closest to season.`;
      })(),
    },
    {
      q: `How accurate is this ${loc.name} tide chart?`,
      a: `Predictions come directly from NOAA CO-OPS harmonic predictions for station ${loc.stationId} (${loc.stationName}) and are the same data used in official tide tables. Actual water levels can vary with storms and barometric pressure, so treat predictions as planning guidance, not navigation data.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${loc.name}, California`,
    description: loc.tagline,
    geo: { "@type": "GeoCoordinates", latitude: loc.lat, longitude: loc.lon },
    url: `https://ustidecharts.com/california/${loc.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "California", href: "/california" },
          { name: loc.name, href: `/california/${loc.slug}` },
        ]}
      />

      {/* HEADER */}
      <header className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {loc.name} <span className="text-ink-faint">Tide Charts & Fishing</span>
          </h1>
          <p className="mt-2 text-sm text-ink-dim">
            {new Date(now).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              timeZone: "UTC",
            })}{" "}
            · NOAA station {loc.stationId} ({loc.stationName})
            {data.source === "sample" && (
              <span className="ml-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-xs text-amber-300">
                sample data — live feed unavailable
              </span>
            )}
          </p>
        </div>
        <p className="text-xs text-ink-faint">Updated {fmtTime(data.fetchedAt)} PT</p>
      </header>

      {/* TIDE CHART — the centerpiece, first thing on the page */}
      <section className="card mt-5 p-5 sm:p-6" aria-labelledby="tidechart-h">
        <h2 id="tidechart-h" className="sr-only">
          Tide chart and current conditions
        </h2>

        <TideStrip
          points={data.points}
          events={data.events}
          initialNow={data.fetchedAt}
          score={score}
          label={label}
        />

        <TideChart
          points={data.points}
          events={data.events}
          days={data.days}
          initialNow={data.fetchedAt}
        />
        <div className="mt-4 overflow-x-auto border-t border-line pt-4">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Tide highs and lows for today and tomorrow at {loc.name}
            </caption>
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-ink-faint">
                <th className="pb-2 pr-4 font-medium">Day</th>
                <th className="pb-2 pr-4 font-medium">Tide</th>
                <th className="pb-2 pr-4 font-medium">Time</th>
                <th className="pb-2 font-medium">Height</th>
              </tr>
            </thead>
            <tbody>
              {todayEvents.map((e) => (
                <tr key={e.t} className="border-t border-line">
                  <td className="py-2 pr-4 text-ink-faint">{fmtDay(e.t)}</td>
                  <td className="py-2 pr-4">
                    <span className={e.type === "H" ? "text-sky-300" : "text-ink-dim"}>
                      {e.type === "H" ? "High" : "Low"}
                    </span>
                  </td>
                  <td className="py-2 pr-4 tabular-nums">{fmtTime(e.t)}</td>
                  <td className="py-2 tabular-nums">{e.h.toFixed(1)} ft</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* TODAY IN PROSE — crawlable summary of the day's tides */}
      <section className="mt-6" aria-labelledby="today-h">
        <h2 id="today-h" className="text-lg font-semibold tracking-tight">
          Today&apos;s Tide Times in {loc.name}
        </h2>
        <div className="mt-2 max-w-3xl space-y-3 text-sm leading-relaxed text-ink-dim">
          <p>{proseToday}</p>
          {proseSun && <p>{proseSun}</p>}
          {tomorrowsHL.length > 0 && (
            <p>
              Tomorrow starts with a{" "}
              {tomorrowsHL[0].type === "H" ? "high" : "low"} tide at{" "}
              {fmtTime(tomorrowsHL[0].t)} ({tomorrowsHL[0].h.toFixed(1)} ft) —
              see the 7-day outlook below to plan the week.
            </p>
          )}
        </div>
      </section>

      {/* PLAN THE TRIP */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Fishing score */}
        <section className="card flex flex-col items-center p-6 text-center" aria-labelledby="score-h">
          <h2 id="score-h" className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Fishing Score · Now
          </h2>
          <div className="mt-2">
            <ScoreDial score={score} />
          </div>
          <ScoreBadge label={label} />
          <div className="mt-4 w-full border-t border-line pt-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
              Best windows today
            </p>
            <ul className="mt-2 space-y-2">
              {windows.map((w) => (
                <li key={w.start} className="flex items-center justify-between text-sm">
                  <span className="tabular-nums text-ink">
                    {fmtTime(w.start)} – {fmtTime(w.end)}
                  </span>
                  <ScoreBadge label={scoreLabel(w.score)} size="sm" />
                </li>
              ))}
            </ul>
            {bestWindow?.reasons.length ? (
              <p className="mt-3 text-xs leading-relaxed text-ink-dim">
                {bestWindow.reasons.join(" · ")}
              </p>
            ) : null}
          </div>
        </section>

        {/* Sun & moon */}
        <section className="card p-6" aria-labelledby="sun-h">
          <h2 id="sun-h" className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Sun & Moon
          </h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-ink-faint">Sunrise</dt>
              <dd className="font-medium tabular-nums">
                {todayAstro ? fmtTime(todayAstro.sunrise) : "—"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-faint">Sunset</dt>
              <dd className="font-medium tabular-nums">
                {todayAstro ? fmtTime(todayAstro.sunset) : "—"}
              </dd>
            </div>
          </dl>
          <div className="mt-5 border-t border-line pt-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden>{data.moon.emoji}</span>
              <div>
                <p className="text-sm font-medium">{data.moon.phaseName}</p>
                <p className="text-xs text-ink-faint">
                  {Math.round(data.moon.illumination * 100)}% illuminated
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-dim">
              {data.moon.solunarBoost > 0.7
                ? "Spring tides — strong water movement. Prime solunar days."
                : data.moon.solunarBoost > 0.4
                  ? "Moderate tidal range this week."
                  : "Neap tides — gentler water movement. Fish the dawn and dusk windows."}
            </p>
          </div>
        </section>

        {/* Conditions */}
        <section className="card p-6" aria-labelledby="wx-h">
          <h2 id="wx-h" className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
            Conditions
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-3xl" aria-hidden>{weatherEmoji(wx?.weatherCode ?? null)}</span>
            <div>
              <p className="text-2xl font-bold tabular-nums">
                {wx?.tempF != null ? `${Math.round(wx.tempF)}°F` : "—"}
              </p>
              <p className="text-xs text-ink-faint">{weatherLabel(wx?.weatherCode ?? null)}</p>
            </div>
          </div>
          <dl className="mt-4 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex items-center justify-between">
              <dt className="text-ink-faint">Wind</dt>
              <dd className="font-medium tabular-nums">
                {wx?.windMph != null
                  ? `${Math.round(wx.windMph)} mph ${windCompass(wx.windDir)}`
                  : "—"}
                {wx?.gustMph != null && (
                  <span className="block text-right text-xs text-ink-faint">
                    gusts {Math.round(wx.gustMph)}
                  </span>
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-faint">Waves</dt>
              <dd className="font-medium tabular-nums">
                {sea?.waveFt != null ? `${sea.waveFt.toFixed(1)} ft` : "—"}
                {sea?.wavePeriodS != null && (
                  <span className="text-xs text-ink-faint"> @ {Math.round(sea.wavePeriodS)}s</span>
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-faint">Water temp</dt>
              <dd className="font-medium tabular-nums">
                {sea?.waterTempF != null ? `${Math.round(sea.waterTempF)}°F` : "—"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* 7-DAY OUTLOOK */}
      <section className="mt-10" aria-labelledby="week-h">
        <h2 id="week-h" className="text-lg font-semibold tracking-tight">
          7-Day Fishing Outlook
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {week.map((d, i) => {
            const astro = data.days.find((x) => x.date === d.date);
            const t = Date.parse(`${d.date}T12:00:00Z`);
            return (
              <div key={d.date} className={`card p-4 ${i === 0 ? "border-sky-400/30" : ""}`}>
                <p className="text-xs font-medium text-ink-faint">
                  {i === 0 ? "Today" : fmtDay(t)}
                </p>
                <p className="mt-1 text-xl" aria-hidden>
                  {weatherEmoji(astro?.weatherCode ?? null)}
                </p>
                <p className="mt-1 text-xs tabular-nums text-ink-dim">
                  {astro?.tempMaxF != null ? `${Math.round(astro.tempMaxF)}°` : "—"}
                  <span className="text-ink-faint">
                    {" "}/ {astro?.tempMinF != null ? `${Math.round(astro.tempMinF)}°` : "—"}
                  </span>
                </p>
                <div className="mt-2">
                  <ScoreBadge label={d.label} size="sm" />
                </div>
                {d.bestWindows[0] && (
                  <p className="mt-2 text-[11px] leading-snug text-ink-faint">
                    Best: {fmtTime(d.bestWindows[0].start)}–{fmtTime(d.bestWindows[0].end)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SPECIES */}
      <section className="mt-10" aria-labelledby="species-h">
        <h2 id="species-h" className="text-lg font-semibold tracking-tight">
          What&apos;s Biting at {loc.name}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeSpecies.map(({ s, activity }) => (
            <div key={s.key} className="card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-xs italic text-ink-faint">{s.scientific}</p>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    activity === "high"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : activity === "medium"
                        ? "bg-amber-400/10 text-amber-300"
                        : "bg-slate-400/10 text-ink-faint"
                  }`}
                >
                  {activity === "high" ? "Active now" : activity === "medium" ? "Slowing" : "Off-season"}
                </span>
              </div>
              <p className="mt-3 text-xs text-ink-faint">
                Season: <span className="text-ink-dim">{s.seasonLabel}</span>
              </p>
              <p className="mt-1 text-xs text-ink-faint">
                Baits: <span className="text-ink-dim">{s.bait.slice(0, 3).join(", ")}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{s.techniques}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GEAR */}
      <section className="mt-10" aria-labelledby="gear-h">
        <div className="flex items-end justify-between">
          <h2 id="gear-h" className="text-lg font-semibold tracking-tight">
            Gear for These Conditions
          </h2>
          <a
            href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=location"
            className="text-sm text-sky-300 hover:text-teal-300"
          >
            TheAnglerStore →
          </a>
        </div>
        <p className="mt-1 text-sm text-ink-dim">
          Matched to the species feeding at {loc.name} right now.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gear.map((p) => (
            <ProductCard key={p.key} p={p} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-10" aria-labelledby="faq-h">
        <h2 id="faq-h" className="text-lg font-semibold tracking-tight">
          {loc.name} Tide & Fishing FAQ
        </h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {faq.map((f) => (
            <details key={f.q} className="card group p-5 open:border-line-hi">
              <summary className="cursor-pointer list-none font-medium text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="mr-2 text-sky-300 transition-transform group-open:rotate-90 inline-block">
                  ›
                </span>
                {f.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ABOUT + NEARBY + ARTICLES */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3" aria-label="More">
        <div className="card p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold tracking-tight">About {loc.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{loc.intro}</p>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold tracking-tight">Nearby Spots</h2>
          <ul className="mt-3 space-y-3">
            {nearby.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/california/${n.slug}`}
                  className="group block rounded-xl border border-line p-3 transition-colors hover:border-line-hi"
                >
                  <p className="font-medium group-hover:text-sky-300">{n.name}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{n.tagline}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold tracking-tight">Related Guides</h2>
          <ul className="mt-3 space-y-3">
            {relatedArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/guides/${a.slug}`}
                  className="group block rounded-xl border border-line p-3 transition-colors hover:border-line-hi"
                >
                  <p className="font-medium leading-snug group-hover:text-sky-300">{a.title}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{a.readMinutes} min read</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
