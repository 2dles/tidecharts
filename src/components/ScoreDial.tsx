// Fishing score dial — server-renderable SVG arc gauge.

import { SCORE_COLORS, scoreLabel } from "@/lib/score";

export default function ScoreDial({ score }: { score: number }) {
  const label = scoreLabel(score);
  const color = SCORE_COLORS[label];
  const r = 54;
  const c = 2 * Math.PI * r;
  const arc = 0.75 * c; // 270° gauge
  const filled = (score / 100) * arc;

  return (
    <div className="relative h-36 w-36">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-[135deg]">
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke="rgba(148,197,255,0.12)"
          strokeWidth="10"
          strokeDasharray={`${arc} ${c}`}
          strokeLinecap="round"
        />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${filled} ${c}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tabular-nums" style={{ color }}>
          {score}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-widest text-ink-faint">
          / 100
        </span>
      </div>
    </div>
  );
}
