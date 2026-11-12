// Daily IndexNow submission (Vercel cron, see vercel.json).
//
// IndexNow pushes URL change notices straight into Bing's index (which also
// feeds Microsoft Copilot and ChatGPT browsing) instead of waiting for a
// crawl. The key file lives at /<key>.txt in public/.
//
// Daily, this submits only the home, state, water-temp and curated flagship
// pages (~130 URLs). It used to submit every station page (~2,400), which
// asked Bing to recrawl all of them every day, and each recrawl of a stale
// page is a server render. Station pages are discovered through the sitemap;
// when a state is added, submit its pages once by hand.

import { LOCATIONS } from "@/lib/locations";
import { STATE_SLUGS } from "@/lib/states";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const KEY = "7b63d87be4d7a1f0d2de57714aa1c96f";
const HOST = "ustidecharts.com";

export async function GET(req: Request) {
  // Vercel sends Authorization: Bearer <CRON_SECRET> when the env var is set.
  // If it's set, require it, so strangers can't trigger submissions from us.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const urlList = [
    `https://${HOST}/`,
    ...STATE_SLUGS.map((s) => `https://${HOST}/${s}`),
    ...LOCATIONS.map((l) => `https://${HOST}/${l.state}/${l.slug}`),
    `https://${HOST}/water-temps`,
  ];

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });

  return Response.json({
    submitted: urlList.length,
    indexnowStatus: res.status, // 200/202 = accepted
  });
}
