// Visitor geolocation from Vercel's edge headers (no permission popup, no
// external API). Pages stay fully static/ISR — clients fetch this tiny route
// to personalize defaults (map framing, featured state, search ranking).

import { NextRequest, NextResponse } from "next/server";
import { STATES } from "@/lib/states";

export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country");
  const region = req.headers.get("x-vercel-ip-country-region"); // "CA", "FL", …
  const lat = req.headers.get("x-vercel-ip-latitude");
  const lon = req.headers.get("x-vercel-ip-longitude");

  // Map the region code to a state we actually cover.
  const covered =
    country === "US"
      ? Object.values(STATES).find((s) => s.code === region)
      : undefined;

  return NextResponse.json(
    {
      state: covered?.slug ?? null,
      region: region ?? null,
      lat: lat ? Number(lat) : null,
      lon: lon ? Number(lon) : null,
    },
    { headers: { "cache-control": "private, max-age=3600" } },
  );
}
