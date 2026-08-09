import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import WaterTempMap from "@/components/WaterTempMap";
import { getWaterTemps, tempColor } from "@/lib/watertemps";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "California Water Temperature Map — Ocean Temps Today",
  description:
    "Live water temperatures along the entire California coast, from Crescent City to San Diego. Current sea surface temps at every NOAA tide station, updated hourly.",
  alternates: { canonical: "/water-temps" },
};

const REGION_LABEL: Record<string, string> = {
  norcal: "Northern California",
  central: "Central Coast",
  socal: "Southern California",
};

export default async function WaterTempsPage() {
  const { points, live } = await getWaterTemps();
  const sorted = [...points].sort((a, b) => b.tempF - a.tempF);
  const avg =
    points.length > 0
      ? points.reduce((s, p) => s + p.tempF, 0) / points.length
      : 0;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Water Temps", href: "/water-temps" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        California <span className="text-ink-faint">Water Temperatures</span>
      </h1>
      <p className="mt-3 max-w-2xl leading-relaxed text-ink-dim">
        Current sea surface temperature at every tide station on the California
        coast{live ? "" : " (sample data — live feed unavailable)"} — statewide
        average {avg.toFixed(1)}°F right now. Water temperature drives where
        fish feed: click any station to open its full tide and fishing
        dashboard.
      </p>

      <div className="card mt-6 p-4 sm:p-8">
        <WaterTempMap points={points} />
      </div>

      <section className="mt-10" aria-labelledby="temps-table-h">
        <h2 id="temps-table-h" className="text-lg font-semibold tracking-tight">
          All Stations, Warmest to Coldest
        </h2>
        <div className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((p) => (
            <Link
              key={p.slug}
              href={`/california/${p.slug}`}
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
        <p className="mt-4 text-xs text-ink-faint">
          {REGION_LABEL.norcal}, {REGION_LABEL.central}, and{" "}
          {REGION_LABEL.socal} sea surface temperatures from the Open-Meteo
          marine model, refreshed hourly. Stations inside rivers and the Delta
          without marine-model coverage are omitted.
        </p>
      </section>
    </div>
  );
}
