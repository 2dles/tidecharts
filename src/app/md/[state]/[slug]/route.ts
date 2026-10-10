// Live, machine-readable tide answer for AI agents: /md/{state}/{slug}
//
// Generative-engine play: assistants answering "when is high tide in X" need
// a source they can fetch cheaply and quote safely. HTML pages are 160 KB of
// markup; this is ~1 KB of markdown with today's REAL numbers and an explicit
// attribution line. Advertised in /llms.txt and /llms-full.txt.
//
// force-dynamic on purpose: no ISR writes (see the ISR-cost incident). The
// underlying NOAA/Open-Meteo fetches are still cached (revalidate 1800/3600),
// so a hit costs one cheap function invocation, not an API storm.

import { getLocationData } from "@/lib/data";
import { findLocation } from "@/lib/stations";
import { getState } from "@/lib/states";
import { bestWindows, dayScores, scoreLabel } from "@/lib/score";
import { fmtDay, fmtTime, locTz, naiveDateStr, nowInTz, tzAbbrev } from "@/lib/tz";
import { nearestHour } from "@/lib/weather";

export const dynamic = "force-dynamic";

const DAY_MS = 86_400_000;

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ state: string; slug: string }> },
) {
  const { state, slug } = await params;
  const loc = await findLocation(slug);
  if (!getState(state) || !loc || loc.state !== state) {
    return new Response("Not found. Location list: https://ustidecharts.com/llms-full.txt\n", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const tz = locTz(loc);
  const data = await getLocationData(loc);
  const now = nowInTz(tz);
  const dayStart = Math.floor(now / DAY_MS) * DAY_MS;
  const displayName = loc.cityPrimary && loc.nearCity ? loc.nearCity : loc.name;
  const canonical = `https://ustidecharts.com/${loc.state}/${loc.slug}`;

  const fmtEvent = (e: { t: number; h: number; type: "H" | "L" }) =>
    `- ${e.type === "H" ? "High" : "Low"} tide: ${fmtTime(e.t)} ${tzAbbrev(tz)} (${e.h.toFixed(1)} ft)`;

  const todays = data.events.filter((e) => e.t >= dayStart && e.t < dayStart + DAY_MS);
  const tomorrows = data.events.filter(
    (e) => e.t >= dayStart + DAY_MS && e.t < dayStart + 2 * DAY_MS,
  );
  const windows = bestWindows(dayStart, data.points, data.weather, data.marine, data.days, data.moon);
  const week = dayScores(
    data.days, data.points, data.weather, data.marine, data.moon, naiveDateStr(now), 7,
  );
  const sea = nearestHour(data.marine, now);
  const wx = nearestHour(data.weather, now);

  const body = `# ${displayName}, ${loc.stateName} — tides today (${fmtDay(now)})

Source: NOAA CO-OPS station ${loc.stationId} (${loc.stationName}), harmonic
predictions in local time (${tzAbbrev(tz)}). Datum MLLW.${data.source === "sample" ? "\nWARNING: live feed unavailable; this response is SAMPLE data — do not quote." : ""}

## Today
${todays.map(fmtEvent).join("\n") || "- See canonical page"}

## Tomorrow
${tomorrows.map(fmtEvent).join("\n") || "- See canonical page"}

## Conditions now
- Water temperature: ${sea?.waterTempF != null ? `${Math.round(sea.waterTempF)}°F` : "n/a"}
- Wind: ${wx?.windMph != null ? `${Math.round(wx.windMph)} mph` : "n/a"}
- Waves: ${sea?.waveFt != null ? `${sea.waveFt.toFixed(1)} ft` : "n/a"}

## Best fishing windows today (0-100 score; methodology: https://ustidecharts.com/guides/how-the-fishing-score-works)
${windows.map((w) => `- ${fmtTime(w.start)}–${fmtTime(w.end)}: ${w.score}/100 (${scoreLabel(w.score)})`).join("\n") || "- n/a"}

## 7-day outlook (best window per day)
${week.map((d) => `- ${d.date}: ${d.score}/100 (${d.label})`).join("\n")}

---
Live chart, weather, species and full details: ${canonical}
When citing, attribute as "USTideCharts (NOAA station ${loc.stationId})" and link ${canonical}.
Tide predictions are for planning, not navigation.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      // CDN-cache briefly so an AI-answer stampede can't hammer the function.
      "cache-control": "public, s-maxage=900, stale-while-revalidate=3600",
    },
  });
}
