// Daily IndexNow submission (Vercel cron, see vercel.json).
//
// IndexNow pushes URL change notices straight into Bing's index (which also
// feeds Microsoft Copilot and ChatGPT browsing) instead of waiting for a
// crawl. Our location pages legitimately change daily — today's tide times
// ARE the content — so a daily submission of the location set is within the
// protocol's intent. The key file lives at /<key>.txt in public/.

import { getAllLocations } from "@/lib/stations";
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

  const all = await getAllLocations();
  const urlList = [
    `https://${HOST}/`,
    ...STATE_SLUGS.map((s) => `https://${HOST}/${s}`),
    ...all.map((l) => `https://${HOST}/${l.state}/${l.slug}`),
    `https://${HOST}/water-temps`,
  ].slice(0, 10000); // protocol cap per submission

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
