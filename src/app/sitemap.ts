import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { getStationLocations } from "@/lib/stations";
import { STATE_SLUGS } from "@/lib/states";
import { ARTICLES } from "@/lib/articles";

// Rebuild the sitemap at most once a day (it previously had no revalidate and
// was a 146 KB MISS on every request).
export const revalidate = 86400;

// Stable lastModified for content pages: the date of the last content-shaping
// deploy, NOT new Date(). Emitting "now" told Google all ~900 URLs changed on
// every crawl and invited constant recrawling of pages whose tide predictions
// are harmonic and fixed years in advance. Bump when location content
// meaningfully changes (new state, page template overhaul).
const CONTENT_DATE = new Date("2026-10-10");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://ustidecharts.com";
  const stations = await getStationLocations();
  return [
    { url: `${base}/`, lastModified: CONTENT_DATE, changeFrequency: "hourly", priority: 1 },
    ...STATE_SLUGS.map((s) => ({
      url: `${base}/${s}`,
      lastModified: CONTENT_DATE,
      changeFrequency: "hourly" as const,
      priority: 0.9,
    })),
    ...LOCATIONS.map((l) => ({
      url: `${base}/${l.state}/${l.slug}`,
      lastModified: CONTENT_DATE,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...stations.map((l) => ({
      url: `${base}/${l.state}/${l.slug}`,
      lastModified: CONTENT_DATE,
      changeFrequency: "daily" as const,
      priority: 0.6,
    })),
    { url: `${base}/locations`, lastModified: CONTENT_DATE, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/widget`, lastModified: CONTENT_DATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/water-temps`, lastModified: CONTENT_DATE, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/about`, lastModified: CONTENT_DATE, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: CONTENT_DATE, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: CONTENT_DATE, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/guides`, lastModified: CONTENT_DATE, changeFrequency: "weekly", priority: 0.6 },
    ...ARTICLES.map((a) => ({
      url: `${base}/guides/${a.slug}`,
      lastModified: CONTENT_DATE,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
