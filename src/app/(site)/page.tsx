import Link from "next/link";
import type { Metadata } from "next";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import FeaturedTabs, { type FeaturedCard } from "@/components/FeaturedTabs";
import { getLocation } from "@/lib/locations";
import { getSearchIndex } from "@/lib/stations";
import { STATES } from "@/lib/states";
import { getLocationData } from "@/lib/data";
import { nextEvents } from "@/lib/noaa";
import { dayScores } from "@/lib/score";
import { locTz, naiveDateStr, nowInTz } from "@/lib/tz";
import { ARTICLES } from "@/lib/articles";
import { getProducts } from "@/lib/gear";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "USTideCharts — America's Fishing Dashboard",
  description:
    "Real-time tide charts, weather, fishing forecasts and trip planning for thousands of locations. Know if today is a good day to fish in five seconds.",
  alternates: { canonical: "/" },
};

async function featuredCard(slug: string): Promise<FeaturedCard | null> {
  const loc = getLocation(slug);
  if (!loc) return null;
  const base = {
    slug: loc.slug,
    name: loc.name,
    state: loc.state,
    stateName: loc.stateName,
  };
  try {
    const data = await getLocationData(loc);
    const now = nowInTz(locTz(loc));
    const { nextHigh, nextLow } = nextEvents(data.events, now);
    const today = dayScores(
      data.days, data.points, data.weather, data.marine, data.moon,
      naiveDateStr(now), 1,
    )[0];
    return {
      ...base,
      nextHigh: nextHigh ? { t: nextHigh.t, h: nextHigh.h } : null,
      nextLow: nextLow ? { t: nextLow.t, h: nextLow.h } : null,
      now,
      score: today?.score ?? null,
    };
  } catch {
    return {
      ...base,
      nextHigh: null,
      nextLow: null,
      now: nowInTz(locTz(loc)),
      score: null,
    };
  }
}

export default async function Home() {
  const searchIndex = await getSearchIndex();
  const groups = await Promise.all(
    Object.values(STATES).map(async (st) => ({
      state: st.slug,
      stateName: st.name,
      cards: (await Promise.all(st.featured.map(featuredCard))).filter(
        (c): c is FeaturedCard => c != null,
      ),
    })),
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
            {["monterey", "san-diego", "key-west", "tampa-bay"].map((s) => {
              const l = getLocation(s);
              if (!l) return null;
              return (
                <Link
                  key={s}
                  href={`/${l.state}/${s}`}
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
            <Link href="/locations" className="text-sky-300 hover:text-teal-300">
              All locations →
            </Link>
          </div>
        </div>
        <FeaturedTabs groups={groups} />
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
