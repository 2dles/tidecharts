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
// Last generated 2026-11-26.
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
    price: 26.99,
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
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/748815.jpg",
    gradient: "linear-gradient(135deg,#0d4a4a,#137a6e)",
    icon: "🎣",
  },
  "braid-light": {
    key: "braid-light",
    name: "Sufix 832 Advanced Superline Braid — 8 lb, Ghost, 300 yd",
    category: "Line & Leader",
    price: 29.99,
    blurb:
      "Eight-pound test in Ghost, the near-translucent finish. This is the spool for finesse work, surfperch on small plastics, bay bass on light jigs, anywhere heavier…",
    image: "https://productimageserver.com/product/xl/90752XL.jpg",
    gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)",
    icon: "🧵",
  },
  "bank-sinker-4oz": {
    key: "bank-sinker-4oz",
    name: "MO's Bank Sinkers — 4 oz, 20-Pack",
    category: "Terminal Tackle",
    price: 32.99,
    blurb:
      "Four ounces is the weight most 9 to 11 foot surf rods are built to throw, and the one to reach for when the water is moving hard enough that a 3 oz starts walking.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/27482_252522cb-927d-4573-93c1-166ddacf10f1.jpg",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "jig-head-fish-1-8": {
    key: "jig-head-fish-1-8",
    name: "Eagle Claw Saltwater Fish Head Jig — 1/8 oz, Assorted, 10-Pack",
    category: "Lures",
    price: 4.99,
    blurb:
      "A fish-head profile on a 90-degree leg, which is what keeps a soft plastic running straight instead of rolling on the retrieve.",
    image: "https://cdn.shopify.com/s/files/1/0033/5442/7456/files/898413_22b03e62-0858-4c17-9a5c-39551765026f.png",
    gradient: "linear-gradient(135deg,#52340e,#8a5a1d)",
    icon: "⚓",
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
      "A trolling minnow that runs at fifteen feet without weight or a downrigger, the lip does the work.",
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
    "braid-light",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-head-fish-1-8",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "halibut": [
    "dwave-combo-8",
    "braid-light",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-head-fish-1-8",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "rockfish": [
    "daiwa-ft-surf-9",
    "fluoro-leader",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "lingcod": [
    "daiwa-ft-surf-9",
    "fluoro-leader",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "surfperch": [
    "dwave-combo-8",
    "braid-light",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-head-fish-1-8",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "salmon": [
    "dwave-combo-8",
    "lead-core",
    "mustad-barrel-swivel-2-0",
    "bank-sinker-4oz",
    "xrap-magnum",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "yellowtail": [
    "dwave-combo-8",
    "fluoro-leader",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "calico-bass": [
    "daiwa-ft-surf-9",
    "fluoro-leader",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "corbina": [
    "dwave-combo-8",
    "braid-light",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-head-fish-1-8",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "spotted-bay-bass": [
    "daiwa-ft-surf-9",
    "fluoro-leader",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-assort",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ],
  "leopard-shark": [
    "dwave-combo-8",
    "braid-light",
    "circle-hooks",
    "bank-sinker-4oz",
    "jig-head-fish-1-8",
    "landing-net",
    "pliers",
    "dipsy-mid"
  ]
};

export interface Kit {
  /** The store's bundle id. Resolves at theanglerstore.com/bundles#<id>. */
  id: string;
  name: string;
  /** The kit's own first sentence, from the store catalog. */
  blurb: string;
  pieces: number;
  price: number;
  saving: number;
  shipsFree: boolean;
}

/** Kits on sale today, priced exactly as the store's cart prices them. */
export const KITS: Record<string, Kit> = {
  "surf-starter": {
    id: "surf-starter",
    name: "The Surf Starter",
    blurb: "A rod, a reel, line, hooks, weight and the pliers to get the hook back.",
    pieces: 5,
    price: 150.41,
    saving: 20.52,
    shipsFree: true,
  },
  "big-surf": {
    id: "big-surf",
    name: "The Big Surf Kit",
    blurb: "The same idea as the Starter, built heavier.",
    pieces: 5,
    price: 156.13,
    saving: 21.30,
    shipsFree: true,
  },
  "beach-day": {
    id: "beach-day",
    name: "The Beach Day Kit",
    blurb: "Braid, circle hooks, 4 oz bank sinkers, pliers and a net.",
    pieces: 5,
    price: 114.55,
    saving: 15.63,
    shipsFree: true,
  },
  "bay-jetty": {
    id: "bay-jetty",
    name: "The Bay & Jetty Kit",
    blurb: "A 7 ft combo you can work along a wall without catching the rocks behind you, 15 lb low-vis braid, a titanium leader for anything that bites through mono, small circle hooks and a net.",
    pieces: 5,
    price: 120.07,
    saving: 16.38,
    shipsFree: true,
  },
  "rockfish-ling": {
    id: "rockfish-ling",
    name: "The Rockfish & Lingcod Kit",
    blurb: "Two weights of vertical jig, hi-vis braid so you can tell what your line is doing in 200 ft of water, a swivel rated well past what you'll put on it, and a net.",
    pieces: 5,
    price: 98.29,
    saving: 13.41,
    shipsFree: true,
  },
  "salmon-troll": {
    id: "salmon-troll",
    name: "The Salmon Trolling Kit",
    blurb: "Metered lead core so you know exactly how deep you are, a mid-size diver, an 11 in flasher, a release and a snubber.",
    pieces: 5,
    price: 102.47,
    saving: 13.98,
    shipsFree: true,
  },
};

const KIT_FOR_SPECIES: Record<string, string> = {
  "striped-bass": "surf-starter",
  "striped-bass-atlantic": "surf-starter",
  "surfperch": "surf-starter",
  "redtail-surfperch": "surf-starter",
  "corbina": "surf-starter",
  "halibut": "surf-starter",
  "pompano": "surf-starter",
  "whiting": "surf-starter",
  "black-drum": "surf-starter",
  "bluefish": "surf-starter",
  "atlantic-croaker": "surf-starter",
  "calico-bass": "bay-jetty",
  "spotted-bay-bass": "bay-jetty",
  "leopard-shark": "bay-jetty",
  "redfish": "bay-jetty",
  "speckled-trout": "bay-jetty",
  "snook": "bay-jetty",
  "sheepshead": "bay-jetty",
  "mangrove-snapper": "bay-jetty",
  "tautog": "bay-jetty",
  "black-sea-bass": "bay-jetty",
  "scup": "bay-jetty",
  "summer-flounder": "bay-jetty",
  "southern-flounder": "bay-jetty",
  "flounder-gulf": "bay-jetty",
  "winter-flounder": "bay-jetty",
  "weakfish": "bay-jetty",
  "rockfish": "rockfish-ling",
  "lingcod": "rockfish-ling",
  "cabezon": "rockfish-ling",
  "salmon": "salmon-troll",
  "salmon-ak": "salmon-troll"
};
const DEFAULT_KIT = "beach-day";

export function kitUrl(k: Kit): string {
  return `${STORE}/bundles?utm_source=ustidecharts&utm_medium=kit#${k.id}`;
}

/**
 * The one kit to show on a page: the first of its species (pass them most
 * active first) that has a kit, else the default. null if none is on sale.
 */
export function kitFor(speciesKeys: string[]): Kit | null {
  for (const s of speciesKeys) {
    const id = KIT_FOR_SPECIES[s];
    if (id && KITS[id]) return KITS[id];
  }
  return DEFAULT_KIT ? KITS[DEFAULT_KIT] ?? null : null;
}

/** Relevant almost anywhere saltwater; tops a list back up when one drops out. */
const BACKFILL: readonly string[] = ["pliers","landing-net","circle-hooks","tackle-bag"];
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
