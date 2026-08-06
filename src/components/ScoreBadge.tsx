import { SCORE_COLORS } from "@/lib/score";
import type { ScoreLabel } from "@/lib/types";

export default function ScoreBadge({
  label,
  size = "md",
}: {
  label: ScoreLabel;
  size?: "sm" | "md";
}) {
  const color = SCORE_COLORS[label];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${
        size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"
      }`}
      style={{
        color,
        borderColor: `${color}44`,
        background: `${color}14`,
      }}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}
