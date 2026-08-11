// Embeddable tide widget — designed to live inside an <iframe> on marina,
// harbor, bait-shop, and charter websites. Minimal chrome, links out with
// target="_top". Noindexed: the canonical content lives on the location page.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TideChart from "@/components/TideChart";
import { getLocationData } from "@/lib/data";
import { findLocation } from "@/lib/stations";
import { nextEvents } from "@/lib/noaa";
import { fmtTime, locTz } from "@/lib/tz";

export const revalidate = 1800;

export async function generateStaticParams() {
  // Curated only — station embeds render on demand (see [state]/[slug]).
  const { LOCATIONS } = await import("@/lib/locations");
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loc = await findLocation(slug);
  return {
    title: loc ? `${loc.name} Tide Widget` : "Tide Widget",
    robots: { index: false, follow: true },
  };
}

export default async function EmbedPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loc = await findLocation(slug);
  if (!loc) notFound();

  const data = await getLocationData(loc);
  const { nextHigh, nextLow } = nextEvents(data.events, data.fetchedAt);
  const pageUrl = `https://ustidecharts.com/${loc.state}/${loc.slug}?utm_source=widget&utm_medium=embed&utm_campaign=${loc.slug}`;

  return (
    <div className="flex min-h-screen flex-col p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-semibold tracking-tight">
          {loc.name} <span className="text-ink-faint">Tides</span>
        </p>
        <p className="text-xs text-ink-dim">
          {nextHigh && (
            <>
              High{" "}
              <span className="font-medium text-ink">{fmtTime(nextHigh.t)}</span>
            </>
          )}
          {nextHigh && nextLow && <span className="text-ink-faint"> · </span>}
          {nextLow && (
            <>
              Low{" "}
              <span className="font-medium text-ink">{fmtTime(nextLow.t)}</span>
            </>
          )}
        </p>
      </div>

      <div className="mt-2 flex-1">
        <TideChart
          points={data.points}
          events={data.events}
          days={data.days}
          initialNow={data.fetchedAt}
          tz={locTz(loc)}
        />
      </div>

      <p className="mt-2 text-right text-[11px] text-ink-faint">
        <a
          href={pageUrl}
          target="_top"
          rel="noopener"
          className="text-sky-300 hover:text-teal-300"
        >
          {loc.name} tide charts & fishing forecast — USTideCharts →
        </a>
      </p>
    </div>
  );
}
