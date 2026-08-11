import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchBar from "@/components/SearchBar";
import { LOCATIONS } from "@/lib/locations";
import { getAllLocations, getSearchIndex } from "@/lib/stations";
import { STATES } from "@/lib/states";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Tide Chart Locations — California & Florida",
  description:
    "Browse live NOAA tide charts and fishing forecasts by state. Every tide prediction station in California and Florida, with weather, water temps, and bite windows.",
  alternates: { canonical: "/locations" },
};

export default async function LocationsPage() {
  const all = await getAllLocations();
  const searchIndex = await getSearchIndex();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Tide Chart <span className="text-ink-faint">Locations</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink-dim">
        Live NOAA tide predictions and fishing forecasts for {all.length}{" "}
        locations across {Object.keys(STATES).length} states — every station in
        NOAA&apos;s official prediction network.
      </p>
      <div className="mt-6 max-w-xl">
        <SearchBar locations={searchIndex} />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {Object.values(STATES).map((st) => {
          const count = all.filter((l) => l.state === st.slug).length;
          const featured = LOCATIONS.filter((l) => l.state === st.slug)
            .slice(0, 6)
            .map((l) => l.name);
          return (
            <Link
              key={st.slug}
              href={`/${st.slug}`}
              className="card card-hover flex flex-col p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-xl font-semibold">{st.name}</p>
                <p className="text-sm tabular-nums text-ink-faint">
                  {count} locations
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {st.description}
              </p>
              <p className="mt-4 border-t border-line pt-3 text-xs text-ink-faint">
                {featured.join(" · ")}
              </p>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-ink-faint">
        More states are on the way — the goal is every NOAA tide station in the
        country.
      </p>
    </div>
  );
}
