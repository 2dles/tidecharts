// Embeddable tide widget — designed to live inside an <iframe> on marina,
// harbor, bait-shop, and charter websites. Minimal chrome, links out with
// target="_top". Noindexed: the canonical content lives on the location page.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TideChart from "@/components/TideChart";
import { getLocationData } from "@/lib/data";
import { LOCATIONS, getLocation } from "@/lib/locations";
import { nextEvents } from "@/lib/noaa";
import { fmtTime } from "@/lib/tz";

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
  const loc = getLocation(slug);
  if (!loc) notFound();

  const data = await getLocationData(loc);
  const { nextHigh, nextLow } = nextEvents(data.events, data.fetchedAt);
  const pageUrl = `https://ustidecharts.com/california/${loc.slug}?utm_source=widget&utm_medium=embed&utm_campaign=${loc.slug}`;

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
