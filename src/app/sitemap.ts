import type { MetadataRoute } from "next";
import { LOCATIONS } from "@/lib/locations";
import { ARTICLES } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ustidecharts.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "hourly", priority: 1 },
    {
      url: `${base}/california`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    ...LOCATIONS.map((l) => ({
      url: `${base}/california/${l.slug}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.8,
    })),
    { url: `${base}/widget`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
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
