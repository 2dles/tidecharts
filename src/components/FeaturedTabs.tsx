"use client";

// Homepage "Right now on the coast" cards, grouped by state with tabs.
// The default tab is the visitor's own state, detected from IP via /api/geo
// (no permission popup) — a Floridian sees Florida water first, a Californian
// sees California. Server renders the first state's cards; hydration swaps
// tabs only if geo says otherwise.

import { useEffect, useState } from "react";
import Link from "next/link";
import ScoreBadge from "@/components/ScoreBadge";
import { SCORE_COLORS, scoreLabel } from "@/lib/score";
import { fmtRelative, fmtTime } from "@/lib/tz";

export interface FeaturedCard {
  slug: string;
  name: string;
  state: string;
  stateName: string;
  nextHigh: { t: number; h: number } | null;
  nextLow: { t: number; h: number } | null;
  now: number;
  score: number | null;
}

export default function FeaturedTabs({
  groups,
}: {
  groups: { state: string; stateName: string; cards: FeaturedCard[] }[];
}) {
  const [active, setActive] = useState(groups[0]?.state ?? "");

  useEffect(() => {
    fetch("/api/geo")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { state?: string | null } | null) => {
        if (d?.state && groups.some((g) => g.state === d.state)) {
          setActive(d.state);
        }
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const group = groups.find((g) => g.state === active) ?? groups[0];
  if (!group) return null;

  return (
    <div>
      <div
        className="mb-4 flex gap-1 rounded-xl border border-line bg-card/60 p-1 text-sm w-fit"
        role="tablist"
        aria-label="Featured state"
      >
        {groups.map((g) => (
          <button
            key={g.state}
            role="tab"
            aria-selected={g.state === group.state}
            onClick={() => setActive(g.state)}
            className={`rounded-lg px-3 py-1.5 font-medium transition-colors ${
              g.state === group.state
                ? "bg-sky-400/15 text-sky-300"
                : "text-ink-faint hover:text-ink-dim"
            }`}
          >
            {g.stateName}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {group.cards.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.state}/${c.slug}`}
            className="card card-hover flex flex-col gap-3 p-5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink">{c.name}</p>
                <p className="text-xs text-ink-faint">{c.stateName}</p>
              </div>
              {c.score != null && (
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <p
                    className="text-lg font-bold leading-none tabular-nums"
                    style={{ color: SCORE_COLORS[scoreLabel(c.score)] }}
                  >
                    {c.score}
                    <span className="text-[10px] font-medium text-ink-faint"> /100</span>
                  </p>
                  <ScoreBadge label={scoreLabel(c.score)} size="sm" />
                </div>
              )}
            </div>
            <dl className="mt-1 space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-faint">Next high</dt>
                <dd className="tabular-nums text-ink-dim">
                  {c.nextHigh
                    ? `${fmtTime(c.nextHigh.t)} · ${c.nextHigh.h.toFixed(1)} ft`
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-faint">Next low</dt>
                <dd className="tabular-nums text-ink-dim">
                  {c.nextLow
                    ? `${fmtTime(c.nextLow.t)} · ${c.nextLow.h.toFixed(1)} ft`
                    : "—"}
                </dd>
              </div>
            </dl>
            <p className="mt-auto text-xs text-teal-300/90">
              {c.nextHigh && c.nextLow
                ? c.nextHigh.t < c.nextLow.t
                  ? `Tide rising — high ${fmtRelative(c.nextHigh.t, c.now)}`
                  : `Tide falling — low ${fmtRelative(c.nextLow.t, c.now)}`
                : "Open dashboard"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
