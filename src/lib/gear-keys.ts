// Species → gear-key resolution.
//
// The store repo generates src/lib/gear.ts (NEVER hand-edited here) and is
// slated to include BY_SPECIES: Record<species, string[]> derived from the
// store's own species tagging. This module prefers that map and falls back to
// the hand-written per-species lists in species.ts / species-fl.ts. The import
// is tolerant: until a regeneration actually ships BY_SPECIES, everything
// resolves through the fallbacks and behavior is unchanged.

import * as gear from "./gear";

const BY_SPECIES: Record<string, string[]> =
  (gear as { BY_SPECIES?: Record<string, string[]> }).BY_SPECIES ?? {};

export function gearKeysFor(speciesKey: string, fallback: string[]): string[] {
  const fromStore = BY_SPECIES[speciesKey];
  return fromStore && fromStore.length > 0 ? fromStore : fallback;
}

/**
 * Keys that are honest recommendations *anywhere* saltwater — not chosen for
 * a species. When a page's gear pool is universal-only (e.g. Florida species
 * the NorCal-focused store has nothing targeted for), the page copy must not
 * claim the gear was matched to the species.
 */
export const UNIVERSAL_KEYS: ReadonlySet<string> = new Set([
  "braided-line",
  "fluoro-leader",
  "pliers",
  "landing-net",
  "circle-hooks",
  "tackle-bag",
  "cooler",
]);
