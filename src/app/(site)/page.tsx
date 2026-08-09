import Link from "next/link";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import ScoreBadge from "@/components/ScoreBadge";
import ProductCard from "@/components/ProductCard";
import { getLocation } from "@/lib/locations";
import { getSearchIndex } from "@/lib/stations";
import { getLocationData } from "@/lib/data";
import { nextEvents } from "@/lib/noaa";
import { dayScores, scoreLabel } from "@/lib/score";
import { fmtRelative, fmtTime, naiveDateStr, ptNow } from "@/lib/tz";
import { ARTICLES } from "@/lib/articles";
import { getProducts } from "@/lib/gear";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "USTideCharts — America's Fishing Dashboard",
  description:
    "Real-time tide charts, weather, fishing forecasts and trip planning for thousands of locations. Know if today is a good day to fish in five seconds.",
  alternates: { canonical: "/" },
};

const FEATURED = ["monterey", "half-moon-bay", "san-diego", "bodega-bay"];

async function featuredCard(slug: string) {
  const loc = getLocation(slug);
  if (!loc) return null;
  try {
    const data = await getLocationData(loc);
    const now = ptNow();
    const { nextHigh, nextLow } = nextEvents(data.events, now);
    const today = dayScores(
      data.days, data.points, data.weather, data.marine, data.moon,
      naiveDateStr(now), 1,
    )[0];
    return { loc, nextHigh, nextLow, now, score: today?.score ?? null };
  } catch {
    return { loc, nextHigh: null, nextLow: null, now: ptNow(), score: null };
  }
}

export default async function Home() {
  const searchIndex = await getSearchIndex();
  const cards = (await Promise.all(FEATURED.map(featuredCard))).filter(
    (c): c is NonNullable<Awaited<ReturnType<typeof featuredCard>>> => c != null,
  );
  const gear = getProducts(["surf-rod", "swimbait-kit", "braided-line", "cooler"]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* HERO */}
      <section className="pb-16 pt-20 text-center sm:pt-28">
        <p className="animate-rise mx-auto mb-5 w-fit rounded-full border border-line-hi bg-card/60 px-4 py-1.5 text-xs font-medium tracking-wide text-teal-300">
          Live NOAA tides · Weather · Fishing forecast
        </p>
        <h1 className="animate-rise animate-rise-1 mx-auto max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          America&apos;s <span className="text-gradient">Fishing Dashboard</span>
        </h1>
        <p className="animate-rise animate-rise-2 mx-auto mt-5 max-w-xl text-pretty text-base text-ink-dim sm:text-lg">
          Real-time tide charts, weather, fishing forecasts and trip planning —
          know if it&apos;s worth going in five seconds.
        </p>
        <div className="animate-rise animate-rise-3 mx-auto mt-9 max-w-2xl">
          <SearchBar large locations={searchIndex} />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-ink-faint">
            <span>Try:</span>
            {["monterey", "san-diego", "bodega-bay", "half-moon-bay"].map((s) => {
              const l = getLocation(s)!;
              return (
                <Link
                  key={s}
                  href={`/california/${s}`}
                  className="chip transition-colors hover:border-line-hi hover:text-ink-dim"
                >
                  {l.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIVE CONDITIONS */}
      <section aria-labelledby="conditions-h">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="conditions-h" className="text-xl font-semibold tracking-tight">
            Right now on the coast
          </h2>
          <div className="flex gap-4 text-sm">
            <Link href="/water-temps" className="text-sky-300 hover:text-teal-300">
              Water temp map →
            </Link>
            <Link href="/california" className="text-sky-300 hover:text-teal-300">
              All locations →
            </Link>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ loc, nextHigh, nextLow, now, score }) => (
            <Link
              key={loc.slug}
              href={`/california/${loc.slug}`}
              className="card card-hover flex flex-col gap-3 p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">{loc.name}</p>
                  <p className="text-xs text-ink-faint">California</p>
                </div>
                {score != null && <ScoreBadge label={scoreLabel(score)} size="sm" />}
              </div>
              <dl className="mt-1 space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Next high</dt>
                  <dd className="tabular-nums text-ink-dim">
                    {nextHigh ? `${fmtTime(nextHigh.t)} · ${nextHigh.h.toFixed(1)} ft` : "—"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-faint">Next low</dt>
                  <dd className="tabular-nums text-ink-dim">
                    {nextLow ? `${fmtTime(nextLow.t)} · ${nextLow.h.toFixed(1)} ft` : "—"}
                  </dd>
                </div>
              </dl>
              <p className="mt-auto text-xs text-teal-300/90">
                {nextHigh && nextLow
                  ? nextHigh.t < nextLow.t
                    ? `Tide rising — high ${fmtRelative(nextHigh.t, now)}`
                    : `Tide falling — low ${fmtRelative(nextLow.t, now)}`
                  : "Open dashboard"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mt-20" aria-labelledby="how-h">
        <h2 id="how-h" className="text-center text-xl font-semibold tracking-tight">
          Every answer an angler needs, in five seconds
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["🎯", "Is today worth it?", "A single 0–100 fishing score blends tide movement, moon, light, wind, and water temp."],
            ["⏰", "When should I leave?", "Best bite windows for every day, computed from the tide swing and dawn & dusk."],
            ["🐟", "What's biting?", "Species active right now at your spot, with seasons, baits, and techniques."],
            ["🎒", "What should I bring?", "Gear matched to the conditions, straight from TheAnglerStore."],
          ].map(([icon, title, body]) => (
            <div key={title} className="card p-5">
              <span className="text-2xl" aria-hidden>{icon}</span>
              <p className="mt-3 font-semibold">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GUIDES */}
      <section className="mt-20" aria-labelledby="guides-h">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="guides-h" className="text-xl font-semibold tracking-tight">
            Learn the water
          </h2>
          <Link href="/guides" className="text-sm text-sky-300 hover:text-teal-300">
            All guides →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {ARTICLES.map((a) => (
            <Link key={a.slug} href={`/guides/${a.slug}`} className="card card-hover p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-teal-300/80">
                Guide · {a.readMinutes} min
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug">{a.title}</p>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-dim">
                {a.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* GEAR */}
      <section className="mt-20" aria-labelledby="gear-h">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="gear-h" className="text-xl font-semibold tracking-tight">
            Gear worth bringing
          </h2>
          <a
            href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=home"
            className="text-sm text-sky-300 hover:text-teal-300"
          >
            Visit TheAnglerStore →
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gear.map((p) => (
            <ProductCard key={p.key} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
