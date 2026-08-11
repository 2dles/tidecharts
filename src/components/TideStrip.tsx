"use client";

// At-a-glance strip: tide now / next high / next low / fishing score.
// Client component so relative times ("in 1h 44m") and the current tide stay
// correct even when the ISR-cached page shell is up to 30 minutes old.
// Renders from the server-computed `initialNow` first (identical markup to the
// SSR pass), then re-syncs to the client clock after mount.

import { useEffect, useState } from "react";
import type { ScoreLabel, TideEvent, TidePoint } from "@/lib/types";
import { nextEvents, tideHeightAt, tideRateAt } from "@/lib/noaa";
import { SCORE_COLORS } from "@/lib/score";
import { fmtRelative, fmtTime, nowInTz } from "@/lib/tz";

interface Props {
  points: TidePoint[];
  events: TideEvent[];
  initialNow: number;
  score: number;
  label: ScoreLabel;
  /** IANA timezone of the station (client clock ticks in this zone). */
  tz?: string;
}

export default function TideStrip({
  points,
  events,
  initialNow,
  score,
  label,
  tz = "America/Los_Angeles",
}: Props) {
  const [now, setNow] = useState(initialNow);
  useEffect(() => {
    // Intentional one-time sync from the server-seeded clock to the client
    // clock right after hydration; the extra render is the point.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(nowInTz(tz));
    const id = setInterval(() => setNow(nowInTz(tz)), 30_000);
    return () => clearInterval(id);
  }, [tz]);

  const currentHeight = tideHeightAt(points, now);
  const currentRate = tideRateAt(points, now);
  const { nextHigh, nextLow } = nextEvents(events, now);
  const trend =
    currentRate == null
      ? ""
      : currentRate >= 0.05
        ? "rising"
        : currentRate <= -0.05
          ? "falling"
          : "slack";

  return (
    <div className="mb-4 grid grid-cols-2 gap-x-4 gap-y-3 border-b border-line pb-4 sm:grid-cols-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Tide now
        </p>
        <p className="mt-1 text-xl font-bold leading-none tabular-nums">
          {currentHeight != null ? `${currentHeight.toFixed(1)} ft` : "—"}
        </p>
        <p className="mt-1 text-xs text-teal-300">
          {trend === "rising" && "▲ Rising"}
          {trend === "falling" && "▼ Falling"}
          {trend === "slack" && "· Slack water"}
          {currentRate != null && trend !== "slack" && (
            <span className="text-ink-faint">
              {" "}
              · {Math.abs(currentRate).toFixed(1)} ft/hr
            </span>
          )}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Next high
        </p>
        <p className="mt-1 text-xl font-bold leading-none tabular-nums">
          {nextHigh ? fmtTime(nextHigh.t) : "—"}
        </p>
        <p className="mt-1 text-xs text-ink-dim">
          {nextHigh
            ? `${nextHigh.h.toFixed(1)} ft · ${fmtRelative(nextHigh.t, now)}`
            : ""}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Next low
        </p>
        <p className="mt-1 text-xl font-bold leading-none tabular-nums">
          {nextLow ? fmtTime(nextLow.t) : "—"}
        </p>
        <p className="mt-1 text-xs text-ink-dim">
          {nextLow
            ? `${nextLow.h.toFixed(1)} ft · ${fmtRelative(nextLow.t, now)}`
            : ""}
        </p>
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-faint">
          Fishing score
        </p>
        <p
          className="mt-1 text-xl font-bold leading-none tabular-nums"
          style={{ color: SCORE_COLORS[label] }}
        >
          {score}
          <span className="text-xs font-medium text-ink-faint"> /100</span>
        </p>
        <p
          className="mt-1 text-xs font-medium"
          style={{ color: SCORE_COLORS[label] }}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
