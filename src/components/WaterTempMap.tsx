"use client";

// Interactive California water-temperature map — real geography via Leaflet +
// OpenStreetMap tiles (restyled dark to match the brand), full zoom/pan.
// Station markers are colored by current SST; popups link to each dashboard.
// Exact values also live in the table below the map, so color is never the
// only encoding.

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import { T_MAX, T_MIN, tempColor, type TempPoint } from "@/lib/watertemps";
import "leaflet/dist/leaflet.css";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function WaterTempMap({ points }: { points: TempPoint[] }) {
  const divRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !divRef.current || mapRef.current) return;

      const map = L.map(divRef.current, {
        scrollWheelZoom: true,
        zoomControl: true,
      });
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        className: "map-dark-tiles",
        maxZoom: 13,
        minZoom: 5,
      }).addTo(map);

      if (points.length) {
        const bounds = L.latLngBounds(
          points.map((p) => [p.lat, p.lon] as [number, number]),
        );
        map.fitBounds(bounds.pad(0.06));
      } else {
        map.setView([36.8, -121.9], 6);
      }

      for (const p of points) {
        L.circleMarker([p.lat, p.lon], {
          radius: 6,
          color: "#04101d",
          weight: 1.5,
          fillColor: tempColor(p.tempF),
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup(
            `<strong>${esc(p.name)}</strong>${p.nearCity ? ` · ${esc(p.nearCity)}` : ""}<br/>` +
              `<span style="color:${tempColor(p.tempF)};font-weight:600">${p.tempF.toFixed(1)}°F water</span><br/>` +
              `<a href="/california/${esc(p.slug)}">Open tide &amp; fishing chart →</a>`,
          );
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [points]);

  return (
    <div>
      <div
        ref={divRef}
        className="h-[70vh] min-h-[420px] w-full overflow-hidden rounded-xl border border-line"
        role="application"
        aria-label="Interactive map of current water temperatures at California tide stations. Zoom and pan to explore; exact values are listed in the table below."
      />
      <div className="mt-3 flex items-center justify-center gap-3 text-xs text-ink-faint">
        <span>{T_MIN}°F</span>
        <div
          className="h-2 w-40 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${tempColor(T_MIN)}, ${tempColor((T_MIN + T_MAX) / 2)}, ${tempColor(T_MAX)})`,
          }}
        />
        <span>{T_MAX}°F</span>
        <span className="ml-2">· click a station for details</span>
      </div>
    </div>
  );
}
