import { productUrl, type Product } from "@/lib/gear";

export default function ProductCard({ p, reason }: { p: Product; reason?: string }) {
  return (
    <a
      href={productUrl(p)}
      className="card card-hover group flex flex-col overflow-hidden"
      target="_blank"
      rel="noopener"
    >
      <div
        className="relative flex h-28 items-center justify-center text-4xl"
        style={{ background: p.gradient }}
        aria-hidden
      >
        <span className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
          {p.icon}
        </span>
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-abyss/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-300 backdrop-blur">
            {p.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-ink-faint">
          {p.category}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-ink">{p.name}</p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-ink-dim">
          {reason ?? p.blurb}
        </p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-semibold tabular-nums text-ink">
            ${p.price.toFixed(2)}
          </span>
          <span className="text-xs font-medium text-sky-300 transition-colors group-hover:text-teal-300">
            Shop at TheAnglerStore →
          </span>
        </div>
      </div>
    </a>
  );
}
