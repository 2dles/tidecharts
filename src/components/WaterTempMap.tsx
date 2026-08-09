"use client";

// California water-temperature map — the station network plotted by lat/lon,
// colored by current sea-surface temperature. No map tiles needed: the
// stations themselves trace the coastline. Sequential single-hue ramp
// (darker = colder, lighter/brighter = warmer); exact values in the tooltip
// and the table below, so color is never the only encoding.

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { T_MAX, T_MIN, tempColor, type TempPoint } from "@/lib/watertemps";

export default function WaterTempMap({ points }: { points: TempPoint[] }) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<TempPoint | null>(null);

  const { minLat, maxLat, minLon, maxLon } = useMemo(() => {
    let minLat = 90, maxLat = -90, minLon = 0, maxLon = -180;
    for (const p of points) {
      minLat = Math.min(minLat, p.lat);
      maxLat = Math.max(maxLat, p.lat);
      minLon = Math.min(minLon, p.lon);
      maxLon = Math.max(maxLon, p.lon);
    }
    return { minLat: minLat - 0.3, maxLat: maxLat + 0.3, minLon: minLon - 0.3, maxLon: maxLon + 0.3 };
  }, [points]);

  const W = 560;
  const midLat = (minLat + maxLat) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180);
  const H = Math.round(
    (W * (maxLat - minLat)) / ((maxLon - minLon) * kx),
  );

  const x = (lon: number) => ((lon - minLon) / (maxLon - minLon)) * W;
  const y = (lat: number) => ((maxLat - lat) / (maxLat - minLat)) * H;

  const hottest = useMemo(
    () => [...points].sort((a, b) => b.tempF - a.tempF)[0],
    [points],
  );
  const coldest = useMemo(
    () => [...points].sort((a, b) => a.tempF - b.tempF)[0],
    [points],
  );

  return (
    <div ref={wrapRef} className="relative mx-auto max-w-xl">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label="Map of current water temperatures at California tide stations. Exact values are listed in the table below."
      >
        {points.map((p) => {
          const isExtreme = p.slug === hottest?.slug || p.slug === coldest?.slug;
          return (
            <g key={p.slug}>
              {/* generous invisible hit target */}
              <circle
                cx={x(p.lon)}
                cy={y(p.lat)}
                r="11"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHover(p)}
                onMouseLeave={() => setHover(null)}
                onClick={() => router.push(`/california/${p.slug}`)}
              />
              <circle
                cx={x(p.lon)}
                cy={y(p.lat)}
                r={hover?.slug === p.slug ? 7 : 4.5}
                fill={tempColor(p.tempF)}
                stroke="#04101d"
                strokeWidth="1"
                pointerEvents="none"
              />
              {isExtreme && (
                <text
                  x={x(p.lon) + 10}
                  y={y(p.lat) + 4}
                  fontSize="11"
                  fontWeight="600"
                  fill="#e9f2fb"
                  pointerEvents="none"
                >
                  {`${p.name} ${p.tempF.toFixed(0)}°`}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* legend */}
      <div className="mt-3 flex items-center justify-center gap-3 text-xs text-ink-faint">
        <span>{T_MIN}°F</span>
        <div
          className="h-2 w-40 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${tempColor(T_MIN)}, ${tempColor((T_MIN + T_MAX) / 2)}, ${tempColor(T_MAX)})`,
          }}
        />
        <span>{T_MAX}°F</span>
      </div>

      {hover && (
        <div
          className="pointer-events-none absolute z-10 rounded-lg border border-line-hi bg-deep/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
          style={{
            left: `${(x(hover.lon) / W) * 100}%`,
            top: `${(y(hover.lat) / H) * 100}%`,
            transform: "translate(-50%, -130%)",
          }}
        >
          <p className="font-medium text-ink">
            {hover.name}
            {hover.nearCity ? ` · ${hover.nearCity}` : ""}
          </p>
          <p className="mt-0.5 tabular-nums" style={{ color: tempColor(hover.tempF) }}>
            {hover.tempF.toFixed(1)}°F water
          </p>
        </div>
      )}
    </div>
  );
}
