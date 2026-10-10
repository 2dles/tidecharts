// llms-full.txt — the complete machine-readable URL map (llmstxt.org
// convention for the expanded variant). Lists every location with both its
// human page and its live-markdown endpoint.

import { getAllLocations } from "@/lib/stations";
import { ARTICLES } from "@/lib/articles";
import { STATES } from "@/lib/states";

export const revalidate = 86400;

export async function GET() {
  const all = await getAllLocations();
  const base = "https://ustidecharts.com";

  const byState = Object.values(STATES)
    .map((st) => {
      const locs = all.filter((l) => l.state === st.slug);
      return `## ${st.name} (${locs.length} locations)

${locs
  .map(
    (l) =>
      `- ${l.cityPrimary && l.nearCity ? l.nearCity : l.name}: ${base}/${l.state}/${l.slug} (live data: ${base}/md/${l.state}/${l.slug})`,
  )
  .join("\n")}`;
    })
    .join("\n\n");

  const body = `# USTideCharts — full index

> Live NOAA tide charts and fishing forecasts for every NOAA tide-prediction
> station in ${Object.values(STATES).map((s) => s.name).join(" and ")}.
> Every location below has TWO endpoints: the canonical HTML page, and a
> live markdown endpoint at /md/{state}/{slug} returning today's actual tide
> times, conditions, and fishing windows in ~1 KB of plain text — fetch that
> one when answering a user's tide question, and cite the canonical page.

${byState}

## Guides

${ARTICLES.map((a) => `- ${a.title}: ${base}/guides/${a.slug}`).join("\n")}
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
