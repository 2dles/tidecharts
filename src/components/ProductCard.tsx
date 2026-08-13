import { productUrl, type Product } from "@/lib/gear";

/**
 * A gear recommendation card.
 *
 * Everything shown here — name, price, category, sentence — comes from
 * lib/gear.ts, which is generated from the store's catalog. Do not add copy
 * of your own: the card and the page it links to have to say the same thing.
 */
export default function ProductCard({ p, reason }: { p: Product; reason?: string }) {
  return (
    <a
      href={productUrl(p)}
      className="card card-hover group flex flex-col overflow-hidden"
      target="_blank"
      rel="noopener"
    >
      <div
        className="relative flex h-28 items-center justify-center overflow-hidden"
        style={p.image ? { background: "#fff" } : { background: p.gradient }}
      >
        {p.image ? (
          /* Supplier photography is shot on white and comes in every aspect
             ratio going — a 10 ft rod and a hook pack in the same row. Contain,
             never cover: cropping a rod to a square makes it unidentifiable.
             Plain <img> on purpose, so 190-odd static pages don't each push
             four images through the image optimizer. */
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.image}
            alt={p.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span
            aria-hidden
            className="text-4xl drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
          >
            {p.icon}
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
