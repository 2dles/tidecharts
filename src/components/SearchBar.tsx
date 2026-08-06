"use client";

// Instant location search — filters as you type, keyboard navigable.

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCATIONS, type Location } from "@/lib/locations";

function match(loc: Location, q: string): number {
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  const name = loc.name.toLowerCase();
  if (name.startsWith(query)) return 3;
  if (name.includes(query)) return 2;
  if (loc.aliases?.some((a) => a.includes(query))) return 2;
  if (loc.stateName.toLowerCase().startsWith(query)) return 1;
  return 0;
}

export default function SearchBar({ large = false }: { large?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = large ? "loc-search-list-hero" : "loc-search-list";

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return LOCATIONS.map((l) => ({ l, score: match(l, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.l);
  }, [q]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (loc: Location) => {
    setOpen(false);
    setQ("");
    router.push(`/${loc.state}/${loc.slug}`);
  };

  return (
    <div ref={wrapRef} className="relative w-full">
      <div
        className={`flex items-center gap-3 rounded-2xl border border-line-hi bg-deep/80 backdrop-blur transition-colors focus-within:border-sky-400/60 ${
          large ? "px-5 py-4" : "px-4 py-2.5"
        }`}
      >
        <svg
          width={large ? 20 : 16}
          height={large ? 20 : 16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-ink-faint"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === "Enter" && results[active]) {
              go(results[active]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Search a fishing spot — Monterey, Half Moon Bay, San Diego…"
          className={`w-full bg-transparent text-ink placeholder:text-ink-faint focus:outline-none ${
            large ? "text-lg" : "text-sm"
          }`}
          aria-label="Search fishing locations"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-autocomplete="list"
          aria-controls={listId}
          aria-activedescendant={
            open && results[active] ? `${listId}-${results[active].slug}` : undefined
          }
        />
      </div>

      {open && q.trim() && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Location suggestions"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-line-hi bg-deep/95 shadow-2xl backdrop-blur-xl"
        >
          {results.length === 0 && (
            <li className="px-5 py-4 text-sm text-ink-faint">
              No matches yet — try Monterey, Bodega Bay, or San Diego. More
              states are on the way.
            </li>
          )}
          {results.map((loc, i) => (
            <li
              key={loc.slug}
              id={`${listId}-${loc.slug}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(loc)}
              className={`flex cursor-pointer items-center justify-between px-5 py-3 transition-colors ${
                i === active ? "bg-sky-400/10" : ""
              }`}
            >
              <span>
                <span className="font-medium text-ink">{loc.name}</span>
                <span className="ml-2 text-sm text-ink-faint">
                  {loc.stateName}
                </span>
              </span>
              <span className="text-xs text-ink-faint">{loc.tagline}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
