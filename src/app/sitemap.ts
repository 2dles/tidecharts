import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { getStationLocations } from "@/lib/stations";
import { STATE_SLUGS } from "@/lib/states";
import { ARTICLES } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://ustidecharts.com";
  const now = new Date();
  const stations = await getStationLocations();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    ...STATE_SLUGS.map((s) => ({
      url: `${base}/${s}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.9,
    })),
    ...LOCATIONS.map((l) => ({
      url: `${base}/${l.state}/${l.slug}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
    ...stations.map((l) => ({
      url: `${base}/${l.state}/${l.slug}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.6,
    })),
    { url: `${base}/locations`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${base}/widget`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/water-temps`, lastModified: now, changeFrequency: "hourly", priority: 0.7 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    ...ARTICLES.map((a) => ({
      url: `${base}/guides/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
