import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaterTempMap from "@/components/WaterTempMap";
import { getWaterTemps, tempColor } from "@/lib/watertemps";
import { STATES } from "@/lib/states";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Water Temperature Map — California & Florida Ocean Temps Today",
  description:
    "Live water temperatures along the California and Florida coasts. Current sea surface temps at every NOAA tide station, updated hourly, on a zoomable map.",
  alternates: { canonical: "/water-temps" },
};

export default async function WaterTempsPage() {
  const { points, live } = await getWaterTemps();
  const sorted = [...points].sort((a, b) => b.tempF - a.tempF);
  const states = Object.values(STATES);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Water Temps", href: "/water-temps" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Coastal <span className="text-ink-faint">Water Temperatures</span>
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
        Current sea surface temperature at every tide station on the{" "}
        {states.map((s) => s.name).join(" and ")} coasts
        {live ? "" : " (sample data — live feed unavailable)"}. The map opens
        on your coast automatically. Water temperature drives where fish feed:
        click any station to open its full tide and fishing dashboard.
      </p>

      <div className="card mt-6 p-4 sm:p-8">
        <WaterTempMap points={points} />
      </div>

      {states.map((st) => {
        const stPoints = sorted.filter((p) => p.state === st.slug);
        if (stPoints.length === 0) return null;
        const avg =
          stPoints.reduce((s, p) => s + p.tempF, 0) / stPoints.length;
        return (
          <section
            key={st.slug}
            className="mt-10"
            aria-labelledby={`temps-${st.slug}-h`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2
                id={`temps-${st.slug}-h`}
                className="text-lg font-semibold tracking-tight"
              >
                {st.name} — Warmest to Coldest
              </h2>
              <p className="text-sm text-ink-faint">
                statewide average{" "}
                <span
                  className="font-semibold tabular-nums"
                  style={{ color: tempColor(avg) }}
                >
                  {avg.toFixed(1)}°F
                </span>
              </p>
            </div>
            <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
              {stPoints.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.state}/${p.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-card-hi"
                >
                  <span className="min-w-0 truncate text-ink-dim">
                    {p.name}
                    {p.nearCity && (
                      <span className="text-ink-faint"> · {p.nearCity}</span>
                    )}
                  </span>
                  <span
                    className="shrink-0 font-semibold tabular-nums"
                    style={{ color: tempColor(p.tempF) }}
                  >
                    {p.tempF.toFixed(1)}°F
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
      <p className="mt-6 text-xs text-ink-faint">
        Sea surface temperatures from the Open-Meteo marine model, refreshed
        hourly. Stations inside rivers and deltas without marine-model coverage
        are omitted.
      </p>
    </div>
  );
}
