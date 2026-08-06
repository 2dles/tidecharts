"use client";

// Interactive tide chart — custom SVG, no chart library.
// Hover crosshair + tooltip, drag to pan, wheel/pinch to zoom, tap on mobile,
// pulsing "now" marker, night shading, direct-labeled highs & lows.
//
// The plot renders client-side only (a fixed-height placeholder is served),
// which avoids SSR hydration mismatches on time-dependent geometry and layout
// shift from width measurement.

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { DayAstro, TideEvent, TidePoint } from "@/lib/types";
import { fmtDay, fmtTime, ptNow } from "@/lib/tz";

const DAY = 86_400_000;
const HOUR = 3_600_000;

interface Props {
  points: TidePoint[];
  events: TideEvent[];
  days: DayAstro[];
  /** Server-computed naive-PT "now" (data.fetchedAt) used as the initial value. */
  initialNow: number;
}

interface Hover {
  t: number;
  rate: number;
}

function heightAt(points: TidePoint[], t: number): number | null {
  if (points.length === 0) return null;
  if (t <= points[0].t) return points[0].h;
  if (t >= points[points.length - 1].t) return points[points.length - 1].h;
  let lo = 0,
    hi = points.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (points[mid].t <= t) lo = mid;
    else hi = mid;
  }
  const a = points[lo],
    b = points[hi];
  if (b.t === a.t) return a.h;
  return a.h + ((t - a.t) / (b.t - a.t)) * (b.h - a.h);
}

export default function TideChart({ points, events, days, initialNow }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  // null until measured on the client — SSR serves the placeholder.
  const [width, setWidth] = useState<number | null>(null);
  const height = width != null && width < 600 ? 260 : 330;
  const pad = { top: 26, right: 14, bottom: 30, left: 40 };

  const dataMin = points.length ? points[0].t : 0;
  const dataMax = points.length ? points[points.length - 1].t : DAY;

  const [now, setNow] = useState(initialNow);
  const [domain, setDomain] = useState<[number, number]>(() => {
    const todayStart = Math.floor(initialNow / DAY) * DAY;
    return [todayStart, todayStart + DAY];
  });
  const [hover, setHover] = useState<Hover | null>(null);

  const clampDomain = useCallback(
    (a: number, b: number): [number, number] => {
      let span = b - a;
      span = Math.max(6 * HOUR, Math.min(span, dataMax - dataMin));
      if (a < dataMin) a = dataMin;
      if (a + span > dataMax) a = dataMax - span;
      return [a, a + span];
    },
    [dataMin, dataMax],
  );

  // On mount: measure width, sync "now" to the client clock (and re-center
  // the window if the server-rendered day is stale), then tick every minute.
  useEffect(() => {
    const el = wrapRef.current;
    if (el) setWidth(el.getBoundingClientRect().width);
    const ro = new ResizeObserver((e) => setWidth(e[0].contentRect.width));
    if (el) ro.observe(el);

    const n = ptNow();
    setNow(n);
    const todayStart = Math.floor(n / DAY) * DAY;
    setDomain((d) => {
      const sameDay = Math.floor((d[0] + d[1]) / 2 / DAY) * DAY === todayStart;
      return sameDay ? d : clampDomain(todayStart, todayStart + DAY);
    });

    const id = setInterval(() => setNow(ptNow()), 60_000);
    return () => {
      ro.disconnect();
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [t0, t1] = domain;
  const w = width ?? 720;
  const innerW = w - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const visible = useMemo(
    () => points.filter((p) => p.t >= t0 - HOUR && p.t <= t1 + HOUR),
    [points, t0, t1],
  );

  const [yMin, yMax] = useMemo(() => {
    let lo = Infinity,
      hi = -Infinity;
    for (const p of points) {
      if (p.h < lo) lo = p.h;
      if (p.h > hi) hi = p.h;
    }
    if (!isFinite(lo)) return [-1, 7];
    return [Math.floor(lo) - 0.5, Math.ceil(hi) + 0.7];
  }, [points]);

  const x = useCallback(
    (t: number) => pad.left + ((t - t0) / (t1 - t0)) * innerW,
    [t0, t1, innerW, pad.left],
  );
  const y = useCallback(
    (h: number) => pad.top + (1 - (h - yMin) / (yMax - yMin)) * innerH,
    [yMin, yMax, innerH, pad.top],
  );
  const tAtX = useCallback(
    (px: number) => t0 + ((px - pad.left) / innerW) * (t1 - t0),
    [t0, t1, innerW, pad.left],
  );

  const linePath = useMemo(() => {
    if (visible.length === 0) return "";
    return visible
      .map((p, i) => `${i === 0 ? "M" : "L"}${x(p.t).toFixed(1)},${y(p.h).toFixed(1)}`)
      .join("");
  }, [visible, x, y]);

  const areaPath = useMemo(() => {
    if (visible.length === 0) return "";
    const base = y(yMin);
    return (
      linePath +
      `L${x(visible[visible.length - 1].t).toFixed(1)},${base}L${x(visible[0].t).toFixed(1)},${base}Z`
    );
  }, [linePath, visible, x, y, yMin]);

  // --- Interaction ---

  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const gesture = useRef<{
    domain: [number, number];
    startX: number;
    pinchDist?: number;
    moved: boolean;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);

  const localX = (clientX: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    return clientX - (rect?.left ?? 0);
  };

  const showHoverAt = useCallback(
    (px: number) => {
      const t = Math.max(t0, Math.min(t1, tAtX(px)));
      const before = heightAt(points, t - HOUR / 2);
      const after = heightAt(points, t + HOUR / 2);
      const rate = before != null && after != null ? after - before : 0;
      setHover({ t, rate });
    },
    [points, t0, t1, tAtX],
  );

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    svgRef.current?.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    gesture.current = {
      domain,
      startX: localX(e.clientX),
      moved: false,
      pinchDist: pts.length === 2 ? Math.abs(pts[0].x - pts[1].x) : undefined,
    };
  };

  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = localX(e.clientX);
    if (pointers.current.has(e.pointerId)) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const g = gesture.current;
      if (!g) return;
      const pts = [...pointers.current.values()];
      if (pts.length === 2) {
        // pinch zoom
        const dist = Math.max(20, Math.abs(pts[0].x - pts[1].x));
        const startDist = g.pinchDist ?? dist;
        g.pinchDist = g.pinchDist ?? dist;
        const scale = startDist / dist;
        const [a, b] = g.domain;
        const center = (a + b) / 2;
        const half = ((b - a) / 2) * scale;
        setDomain(clampDomain(center - half, center + half));
        g.moved = true;
      } else {
        const dxPx = px - g.startX;
        if (Math.abs(dxPx) > 4) g.moved = true;
        const dt = (-dxPx / innerW) * (g.domain[1] - g.domain[0]);
        setDomain(clampDomain(g.domain[0] + dt, g.domain[1] + dt));
      }
    } else {
      showHoverAt(px);
    }
  };

  const onPointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    const g = gesture.current;
    const wasTap = g && !g.moved;
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) {
      gesture.current = null;
    } else {
      // A finger lifted out of a pinch: re-seed the gesture from the
      // remaining pointer and the CURRENT domain so the chart doesn't jump.
      const remaining = [...pointers.current.values()][0];
      gesture.current = {
        domain,
        startX: localX(remaining.x),
        moved: true,
        pinchDist: undefined,
      };
    }
    if (wasTap) showHoverAt(localX(e.clientX));
  };

  // Wheel zoom via a NATIVE non-passive listener so preventDefault works
  // (React's synthetic onWheel is passive — the page would scroll too).
  const wheelRef = useRef<(e: WheelEvent) => void>(() => {});
  useEffect(() => {
    wheelRef.current = (e: WheelEvent) => {
      e.preventDefault();
      const px = localX(e.clientX);
      const t = tAtX(px);
      const factor = e.deltaY > 0 ? 1.18 : 0.85;
      const a = t - (t - t0) * factor;
      const b = t + (t1 - t) * factor;
      setDomain(clampDomain(a, b));
      setHover(null);
    };
  }); // refresh every render so the handler never closes over stale domain
  const measured = width != null;
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const h = (e: WheelEvent) => wheelRef.current(e);
    el.addEventListener("wheel", h, { passive: false });
    return () => el.removeEventListener("wheel", h);
  }, [measured]); // re-attach once the real SVG mounts

  const setRange = (hours: number) => {
    const center = Math.max(
      dataMin + (hours * HOUR) / 2,
      Math.min(now, dataMax - (hours * HOUR) / 2),
    );
    setDomain(
      clampDomain(center - (hours * HOUR) / 2, center + (hours * HOUR) / 2),
    );
    setHover(null);
  };

  // --- Decorations ---

  const nights = useMemo(() => {
    const rects: { a: number; b: number }[] = [];
    const sorted = [...days].sort((d1, d2) => d1.sunrise - d2.sunrise);
    for (let i = 0; i < sorted.length; i++) {
      const d = sorted[i];
      const duskA = d.sunset;
      const dawnB = sorted[i + 1]?.sunrise ?? d.sunset + 10 * HOUR;
      if (duskA < t1 && dawnB > t0) {
        rects.push({ a: Math.max(duskA, t0), b: Math.min(dawnB, t1) });
      }
      if (i === 0 && d.sunrise > t0) {
        rects.push({ a: t0, b: Math.min(d.sunrise, t1) });
      }
    }
    return rects;
  }, [days, t0, t1]);

  const visEvents = useMemo(
    () => events.filter((e) => e.t >= t0 && e.t <= t1),
    [events, t0, t1],
  );

  const xTicks = useMemo(() => {
    const span = t1 - t0;
    const ticks: { t: number; label: string; major: boolean }[] = [];
    if (span <= 30 * HOUR) {
      const step = span <= 14 * HOUR ? 2 * HOUR : 4 * HOUR;
      for (let t = Math.ceil(t0 / step) * step; t <= t1; t += step) {
        const d = new Date(t);
        const isMidnight = d.getUTCHours() === 0 && d.getUTCMinutes() === 0;
        ticks.push({
          t,
          label: isMidnight
            ? fmtDay(t)
            : new Date(t).toLocaleTimeString("en-US", {
                hour: "numeric",
                timeZone: "UTC",
              }),
          major: isMidnight,
        });
      }
    } else {
      for (let t = Math.ceil(t0 / DAY) * DAY; t <= t1; t += DAY) {
        ticks.push({ t, label: fmtDay(t), major: true });
      }
    }
    return ticks;
  }, [t0, t1]);

  const yTicks = useMemo(() => {
    const out: number[] = [];
    for (let v = Math.ceil(yMin); v <= Math.floor(yMax); v++) out.push(v);
    return out;
  }, [yMin, yMax]);

  const nowVisible = now >= t0 && now <= t1;
  const nowH = heightAt(points, now);
  const spanHours = Math.round((t1 - t0) / HOUR);

  // Derived hover geometry — always consistent with the current domain.
  const hoverT = hover && hover.t >= t0 && hover.t <= t1 ? hover.t : null;
  const hoverH = hoverT != null ? heightAt(points, hoverT) : null;

  if (points.length === 0) {
    return (
      <div className="flex h-[260px] items-center justify-center rounded-xl border border-line text-sm text-ink-faint sm:h-[330px]">
        Tide data is temporarily unavailable for this station.
      </div>
    );
  }

  return (
    <div ref={wrapRef} className="select-none">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1.5" role="group" aria-label="Chart range">
          {[
            { label: "24H", hours: 24 },
            { label: "3D", hours: 72 },
            { label: "7D", hours: 168 },
          ].map((r) => {
            const active = Math.abs(spanHours - r.hours) < r.hours * 0.25;
            return (
              <button
                key={r.label}
                onClick={() => setRange(r.hours)}
                aria-pressed={active}
                className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                  active
                    ? "bg-sky-400/20 text-sky-300"
                    : "text-ink-faint hover:bg-card-hi hover:text-ink-dim"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
        <p className="hidden text-xs text-ink-faint sm:block">
          drag to pan · scroll or pinch to zoom · hover for detail
        </p>
      </div>

      <div
        className="relative"
        style={{ height }}
        aria-busy={width == null}
      >
        {width == null ? (
          <div className="h-full w-full animate-pulse rounded-xl bg-card-hi/40" />
        ) : (
          <>
            <svg
              ref={svgRef}
              width={width}
              height={height}
              className="block cursor-crosshair touch-none"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onPointerLeave={() => setHover(null)}
              role="img"
              aria-label="Tide height chart. Use the range buttons for 24 hour, 3 day, or 7 day views. Tide highs and lows are listed in the table below."
            >
              <defs>
                <linearGradient id="tideFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.42" />
                  <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.02" />
                </linearGradient>
                <clipPath id="plotClip">
                  <rect x={pad.left} y={pad.top} width={innerW} height={innerH} />
                </clipPath>
              </defs>

              {/* night shading */}
              <g clipPath="url(#plotClip)">
                {nights.map((n, i) => (
                  <rect
                    key={i}
                    x={x(n.a)}
                    y={pad.top}
                    width={Math.max(0, x(n.b) - x(n.a))}
                    height={innerH}
                    fill="rgba(2, 6, 18, 0.45)"
                  />
                ))}
              </g>

              {/* horizontal grid + y labels */}
              {yTicks.map((v) => (
                <g key={v}>
                  <line
                    x1={pad.left}
                    x2={w - pad.right}
                    y1={y(v)}
                    y2={y(v)}
                    stroke="rgba(148,197,255,0.07)"
                  />
                  <text
                    x={pad.left - 8}
                    y={y(v) + 3.5}
                    textAnchor="end"
                    fontSize="10"
                    fill="#647f9b"
                  >
                    {v}ft
                  </text>
                </g>
              ))}

              {/* x ticks */}
              {xTicks.map((tk) => (
                <g key={tk.t}>
                  {tk.major && (
                    <line
                      x1={x(tk.t)}
                      x2={x(tk.t)}
                      y1={pad.top}
                      y2={height - pad.bottom}
                      stroke="rgba(148,197,255,0.12)"
                    />
                  )}
                  <text
                    x={x(tk.t)}
                    y={height - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill={tk.major ? "#9db8d2" : "#647f9b"}
                  >
                    {tk.label}
                  </text>
                </g>
              ))}

              {/* tide area + line */}
              <g clipPath="url(#plotClip)">
                <path d={areaPath} fill="url(#tideFill)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="7"
                  strokeLinejoin="round"
                  opacity="0.16"
                />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#5eead4"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />

                {/* high/low direct labels — flipped when they'd hit an edge */}
                {visEvents.map((ev) => {
                  const py = y(ev.h);
                  let below = ev.type === "L";
                  if (below && py + 36 > height - pad.bottom - 2) below = false;
                  if (!below && py - 19 < pad.top + 8) below = true;
                  const valY = py + (below ? 24 : -18);
                  const timeY = py + (below ? 35 : -7);
                  const lx = Math.max(
                    pad.left + 22,
                    Math.min(x(ev.t), w - pad.right - 26),
                  );
                  return (
                    <g key={ev.t}>
                      <circle
                        cx={x(ev.t)}
                        cy={py}
                        r="3.5"
                        fill={ev.type === "H" ? "#7dd3fc" : "#155e88"}
                        stroke="#04101d"
                        strokeWidth="1.5"
                      />
                      <text
                        x={lx}
                        y={valY}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="600"
                        fill="#c7e3f8"
                      >
                        {ev.h.toFixed(1)} ft
                      </text>
                      <text
                        x={lx}
                        y={timeY}
                        textAnchor="middle"
                        fontSize="9"
                        fill="#647f9b"
                      >
                        {fmtTime(ev.t)}
                      </text>
                    </g>
                  );
                })}

                {/* now marker */}
                {nowVisible && nowH != null && (
                  <g>
                    <line
                      x1={x(now)}
                      x2={x(now)}
                      y1={pad.top}
                      y2={height - pad.bottom}
                      stroke="#2dd4bf"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                      opacity="0.8"
                    />
                    <circle
                      className="now-dot"
                      cx={x(now)}
                      cy={y(nowH)}
                      r="5"
                      fill="#2dd4bf"
                    />
                    <circle cx={x(now)} cy={y(nowH)} r="3" fill="#e9f2fb" />
                    <text
                      x={x(now)}
                      y={pad.top - 8}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill="#2dd4bf"
                    >
                      NOW
                    </text>
                  </g>
                )}

                {/* hover crosshair — derived from time, never stale pixels */}
                {hoverT != null && hoverH != null && (
                  <g pointerEvents="none">
                    <line
                      x1={x(hoverT)}
                      x2={x(hoverT)}
                      y1={pad.top}
                      y2={height - pad.bottom}
                      stroke="rgba(233,242,251,0.35)"
                      strokeWidth="1"
                    />
                    <circle
                      cx={x(hoverT)}
                      cy={y(hoverH)}
                      r="4.5"
                      fill="#e9f2fb"
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                  </g>
                )}
              </g>
            </svg>

            {/* tooltip */}
            {hoverT != null && hoverH != null && (
              <div
                className="pointer-events-none absolute z-10 rounded-lg border border-line-hi bg-deep/95 px-3 py-2 text-xs shadow-xl backdrop-blur"
                style={{
                  left: Math.min(Math.max(x(hoverT) - 60, 0), w - 130),
                  top: Math.max(y(hoverH) - 74, 0),
                }}
              >
                <p className="font-medium text-ink">
                  {hoverH.toFixed(2)} ft{" "}
                  <span
                    className={hover!.rate >= 0 ? "text-teal-300" : "text-sky-300"}
                  >
                    {hover!.rate >= 0.05
                      ? "▲ rising"
                      : hover!.rate <= -0.05
                        ? "▼ falling"
                        : "· slack"}
                  </span>
                </p>
                <p className="mt-0.5 text-ink-faint">
                  {fmtDay(hoverT)} · {fmtTime(hoverT)}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
