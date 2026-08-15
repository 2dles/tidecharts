// ─────────────────────────────────────────────────────────────────────────────
// GENERATED FILE — DO NOT EDIT BY HAND.
//
// Source of truth: theanglerstore/src/lib/products.ts
// Regenerate:      npx tsx scripts/generate-gear.ts   (in the store repo)
// Verify:          npx tsx scripts/generate-gear.ts --check
//
// Every name, price and sentence below is copied from the product page the
// card links to, so the two can never disagree. An earlier hand-written
// version of this file drifted from the catalog and advertised prices and
// product names that did not exist — do not reintroduce that by editing here.
//
// Last generated 2026-08-15.
// ─────────────────────────────────────────────────────────────────────────────

export interface Product {
  /** The store's product key. Resolves at theanglerstore.com/products/<key>. */
  key: string;
  name: string;
  category: string;
  price: number;
  blurb: string;
  /** Licensed supplier photography, served from the supplier's CDN. */
  image?: string;
  gradient: string; // card art fallback
  icon: string;
}

const STORE = "https://theanglerstore.com";

export function productUrl(p: Product): string {
  return `${STORE}/products/${p.key}?utm_source=ustidecharts&utm_medium=gear-rec`;
}

/**
 * Keyed by the *request* key used across locations.ts, species.ts,
 * species-fl.ts and articles.ts. Those keys are a contract and never change;
 * the product each one resolves to follows whatever the store stocks.
 */
export const PRODUCTS: Record<string, Product> = {
  "surf-rod": {
    key: "surf-rod",
    name: "Daiwa FT Surf Spinning Rod — 10', 2-Piece Medium",
    category: "Surf Rods",
    price: 34.99,
    blurb:
      "Ten feet is the length most surfcasters land on: enough to clear the first break and keep a bait out past it, still short enough to cast all day without your…",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/533338.jpg",
    gradient: "linear-gradient(135deg,#0e3a5c,#155e88)",
    icon: "🎣",
  },
  "braided-line": {
    key: "braided-line",
    name: "Sufix 832 Advanced Superline Braid — 20 lb, 300 yd",
    category: "Line & Leader",
    price: 34.99,
    blurb:
      "Seven HMPE fibers plus one GORE Performance Fiber, braided at 32 picks per inch. The GORE fiber is what makes this line quiet through the guides and stubborn…",
    image: "https://productimageserver.com/product/xl/90822XL.jpg",
    gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)",
    icon: "🧵",
  },
  "fluoro-leader": {
    key: "fluoro-leader",
    name: "Sufix Wind-On Fluorocarbon Leader — 50 lb, 11 yd",
    category: "Line & Leader",
    price: 15.49,
    blurb:
      "A braided loop on one end means you connect to your main line without a knot or a swivel, and the leader winds straight through the guides onto the reel.",
    image: "https://productimageserver.com/product/xl/110924XL.jpg",
    gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)",
    icon: "🧵",
  },
  "circle-hooks": {
    key: "circle-hooks",
    name: "Eagle Claw Lazer Sharp Offset Circle Sea Hook — 4/0, 50-Pack",
    category: "Terminal Tackle",
    price: 15.97,
    blurb:
      "The circle hook does the work for you: no strike, just let the rod load and the hook finds the corner of the jaw on its own.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/4378_c106da28-2af5-4b19-886f-88dcadc01272.jpg",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "jig-assort": {
    key: "jig-assort",
    name: "Williamson Vortex Speed 300 Jig — 10.5 oz",
    category: "Lures",
    price: 24.99,
    blurb:
      "One side convex, the other concave, so the jig spins as it drops rather than falling dead.",
    image: "https://productimageserver.com/product/xl/101149XL.jpg",
    gradient: "linear-gradient(135deg,#52340e,#8a5a1d)",
    icon: "⚓",
  },
  "landing-net": {
    key: "landing-net",
    name: "Attwood Fold-N-Stow Fishing Net — Medium",
    category: "Nets & Landing",
    price: 19.24,
    blurb:
      "A flip of the handle opens it and locks it; pull the trigger and it collapses back down to something you can stow under a seat or strap to a pack.",
    image: "https://productimageserver.com/product/xl/103114XL.jpg",
    gradient: "linear-gradient(135deg,#0f3d51,#177a91)",
    icon: "🥅",
  },
  pliers: {
    key: "pliers",
    name: "Rapala 8\" Super Stainless Steel Pliers",
    category: "Tools",
    price: 32.99,
    blurb:
      "Eight inches of stainless with an internal spring that holds the jaws open, so you can work one-handed while the other hand is busy holding a fish.",
    image: "https://productimageserver.com/product/xl/110902XL.jpg",
    gradient: "linear-gradient(135deg,#334155,#516782)",
    icon: "🔧",
  },
  "tackle-bag": {
    key: "tackle-bag",
    name: "Rapala Venture 13 Backpack",
    category: "Tackle Storage",
    price: 70.49,
    blurb:
      "Built for people who fish on foot. Thirteen litres of main compartment that swallows three 3700-size tackle boxes, three zippered pockets, tool attachment points…",
    image: "https://productimageserver.com/product/xl/105698XL.jpg",
    gradient: "linear-gradient(135deg,#3f2d3f,#6b4a66)",
    icon: "🎒",
  },
  cooler: {
    key: "cooler",
    name: "Coleman CHILLER 28-Can Soft-Sided Backpack Cooler",
    category: "Coolers",
    price: 48.49,
    blurb:
      "Twenty-eight cans of capacity with TempLock insulation that holds ice past twelve hours, in a soft-sided pack you wear rather than carry.",
    image: "https://productimageserver.com/product/xl/98875XL.jpg",
    gradient: "linear-gradient(135deg,#134e4a,#1a7a72)",
    icon: "🧊",
  },
  "inshore-combo": {
    key: "okuma-tundra-7",
    name: "Okuma Tundra Surf Spinning Rod — 7 ft, 2-Piece",
    category: "Surf Rods",
    price: 25.95,
    blurb:
      "Okuma build the Tundra as a surf series and say so themselves — they describe it as favoured by catfish anglers and cost-conscious surf anglers.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/362064_c7df0fb1-c7ea-4a9f-b785-fc59546fe82f.jpg",
    gradient: "linear-gradient(135deg,#0e3a5c,#155e88)",
    icon: "🎣",
  },
  "swimbait-kit": {
    key: "zoom-fluke-smokin-shad",
    name: "Zoom Fluke 4\" — Smokin' Shad, 10-Pack",
    category: "Soft Baits",
    price: 3.99,
    blurb:
      "Same darting soft-jerkbait profile in the standard body, in a translucent shad pattern that covers most clear-water situations.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/12399.jpg",
    gradient: "linear-gradient(135deg,#14532d,#1f7a45)",
    icon: "🐟",
  },
  "carolina-kit": {
    key: "mustad-barrel-swivel-4",
    name: "Mustad High-Speed Multi-Link Swivel — Size 4, 9-Pack, 77 lb",
    category: "Terminal Tackle",
    price: 6.99,
    blurb:
      "A spinning bait or a trolled lure puts twist into your line every second it's in the water, and twist is what turns a good spool into a bird's nest.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/25555_17981431-bf71-4f6c-9e48-0b3b32e57e3c.jpg",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "dwave-combo-8": {
    key: "dwave-combo-8",
    name: "Daiwa D-Wave Saltwater Spinning Combo — 8 ft, 2-Piece Medium",
    category: "Rod & Reel Combos",
    price: 59.99,
    blurb:
      "Eight feet is the honest middle: long enough to keep line above the wash on a gentle beach, short enough to fish from a pier or a boat without apologising to anyone.",
    gradient: "linear-gradient(135deg,#0d4a4a,#137a6e)",
    icon: "🎣",
  },
  "bank-sinker-4oz": {
    key: "bank-sinker-4oz",
    name: "MO's Bank Sinkers — 4 oz, 20-Pack",
    category: "Terminal Tackle",
    price: 32.99,
    blurb:
      "Four ounces is the weight most 9 to 11 foot surf rods are built to throw, and the one to reach for when the water is moving hard enough that a 3 oz starts walking.",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "dipsy-mid": {
    key: "dipsy-mid",
    name: "Luhr-Jensen 3¼″ Dipsy Diver — Clear UV",
    category: "Trolling & Rigging",
    price: 16.99,
    blurb:
      "The size most trollers reach for first. Deeper and further out than the 2¼, without the pull of the largest.",
    image: "https://productimageserver.com/product/xl/102268XL.jpg",
    gradient: "linear-gradient(135deg,#1e293b,#334155)",
    icon: "🎣",
  },
  "daiwa-ft-surf-9": {
    key: "daiwa-ft-surf-9",
    name: "Daiwa FT Surf Spinning Rod — 9', 2-Piece Medium",
    category: "Surf Rods",
    price: 34.99,
    blurb:
      "The short one, for jetties, piers and beaches where you don't need to reach the horizon. Easier to control in a crowd and easier to fit in a car.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/533342.jpg",
    gradient: "linear-gradient(135deg,#0e3a5c,#155e88)",
    icon: "🎣",
  },
  "bank-sinker-3oz": {
    key: "bank-sinker-3oz",
    name: "MO's Bank Sinkers — 3 oz, 26-Pack",
    category: "Terminal Tackle",
    price: 29.99,
    blurb:
      "The everyday surf weight for moderate current — heavy enough to hold a bait through a push, light enough to cast on a medium rod all morning.",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "dwave-combo-7": {
    key: "dwave-combo-7",
    name: "Daiwa D-Wave Saltwater Spinning Combo — 7 ft, 2-Piece Medium",
    category: "Rod & Reel Combos",
    price: 59.99,
    blurb:
      "The inshore length of the D-Wave range: seven feet of medium fiberglass on a 40-size reel, rated by Daiwa for saltwater as well as heavy freshwater.",
    gradient: "linear-gradient(135deg,#0d4a4a,#137a6e)",
    icon: "🎣",
  },
  "lead-core": {
    key: "lead-core",
    name: "Sufix Performance Lead Core — 18 lb, 200 yd",
    category: "Line & Leader",
    price: 31.99,
    blurb:
      "Lead core sinks, and it changes color every ten yards so you can count exactly how much you have out.",
    image: "https://productimageserver.com/product/xl/96824XL.jpg",
    gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)",
    icon: "🧵",
  },
  "mustad-barrel-swivel-2-0": {
    key: "mustad-barrel-swivel-2-0",
    name: "Mustad High-Speed Multi-Link Swivel — Size 2/0, 4-Pack, 72 lb",
    category: "Terminal Tackle",
    price: 7.49,
    blurb:
      "A spinning bait or a trolled lure puts twist into your line every second it's in the water, and twist is what turns a good spool into a bird's nest.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/6544.jpg",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "xrap-magnum": {
    key: "xrap-magnum",
    name: "Rapala X-Rap Magnum 15 — Hot Pink UV",
    category: "Lures",
    price: 21.99,
    blurb:
      "A trolling minnow that runs at fifteen feet without weight or a downrigger — the lip does the work.",
    image: "https://productimageserver.com/product/xl/89811XL.jpg",
    gradient: "linear-gradient(135deg,#52340e,#8a5a1d)",
    icon: "⚓",
  },
};

/**
 * Requested keys the catalog has no honest answer for. They render nothing
 * rather than sending a reader to a product the store cannot ship.
 *
 * · sand-spike — no beach sand spike in the catalog — Rod Holders are all boat mounts
 * · headlamp — no headlamp in the catalog — the only light that fits is 12V boat-powered
 */
export const UNAVAILABLE: readonly string[] = ["sand-spike","headlamp"];

/**
 * Species slug -> product keys, ordered as a KIT: rod, line, terminal, lure,
 * then the rest. Derived from the store's own per-product species tagging, not
 * hand-picked here.
 *
 * A species absent from this map has nothing in the catalog tagged for it —
 * the eleven Florida species, plus white seabass and cabezon. Those fall back
 * to USTideCharts' own lists rather than being handed a NorCal surf rod and
 * told it was chosen for bonefish.
 */
export const BY_SPECIES: Record<string, string[]> = {
  "striped-bass": [
    "dwave-combo-8",
    "braided-line",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "halibut": [
    "dwave-combo-8",
    "braided-line",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "rockfish": [
    "daiwa-ft-surf-9",
    "braided-line",
    "circle-hooks",
    "bank-sinker-3oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "lingcod": [
    "daiwa-ft-surf-9",
    "braided-line",
    "circle-hooks",
    "bank-sinker-3oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "surfperch": [
    "dwave-combo-8",
    "braided-line",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "salmon": [
    "dwave-combo-7",
    "lead-core",
    "mustad-barrel-swivel-2-0",
    "bank-sinker-3oz",
    "xrap-magnum",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "yellowtail": [
    "dwave-combo-7",
    "braided-line",
    "circle-hooks",
    "bank-sinker-3oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "calico-bass": [
    "daiwa-ft-surf-9",
    "braided-line",
    "circle-hooks",
    "bank-sinker-3oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "corbina": [
    "dwave-combo-8",
    "braided-line",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "spotted-bay-bass": [
    "daiwa-ft-surf-9",
    "braided-line",
    "circle-hooks",
    "bank-sinker-3oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "leopard-shark": [
    "dwave-combo-8",
    "braided-line",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ]
};

/** Relevant almost anywhere saltwater; tops a list back up when one drops out. */
const BACKFILL: readonly string[] = ["braided-line","pliers","landing-net","circle-hooks","tackle-bag"];
const MIN_CARDS = 3;

export function getProducts(keys: string[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  const take = (k: string) => {
    const p = PRODUCTS[k];
    if (!p || seen.has(p.key)) return;
    seen.add(p.key);
    out.push(p);
  };
  for (const k of keys) take(k);
  // A page that asked for four and lost one to an unstocked category should
  // still look considered, so top it back up — but never past what was asked
  // for, and never with something we can't ship.
  for (const k of BACKFILL) {
    if (out.length >= Math.min(MIN_CARDS, keys.length)) break;
    take(k);
  }
  return out;
}
