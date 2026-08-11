import { ImageResponse } from "next/og";

// Site-wide OG image — used by the homepage and any route without its own
// (location pages override this with their per-city card).

export const alt = "USTideCharts — America's Fishing Dashboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #04101d 0%, #0a2440 55%, #0d3a54 100%)",
          color: "#e9f2fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              color: "#04101d",
            }}
          >
            ≈
          </div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>USTideCharts</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
            {"America's Fishing Dashboard"}
          </div>
          <div style={{ fontSize: 38, color: "#7dd3fc" }}>
            Live tides · Fishing forecasts · California & Florida
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#9db8d2",
          }}
        >
          <div>Know if it&apos;s worth going in five seconds</div>
          <div>ustidecharts.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
