// TheAnglerStore product catalog (prototype data).
// Every recommendation on USTideCharts links into the store.

export interface Product {
  key: string;
  name: string;
  category: string;
  price: number;
  blurb: string;
  badge?: string;
  gradient: string; // card art placeholder
  icon: string;
}

const STORE = "https://theanglerstore.com";

export function productUrl(p: Product): string {
  return `${STORE}/products/${p.key}?utm_source=ustidecharts&utm_medium=gear-rec`;
}

export const PRODUCTS: Record<string, Product> = {
  "surf-rod": {
    key: "surf-rod",
    name: "Shoreline Pro 11' Surf Rod Combo",
    category: "Rods & Combos",
    price: 149.99,
    blurb: "Two-piece graphite surf rod with a sealed 6000 spinning reel — the do-everything beach setup.",
    badge: "Best Seller",
    gradient: "linear-gradient(135deg,#0e3a5c,#155e88)",
    icon: "🎣",
  },
  "inshore-combo": {
    key: "inshore-combo",
    name: "Bayline 7'6\" Inshore Combo",
    category: "Rods & Combos",
    price: 119.99,
    blurb: "Light, fast-action combo built for bays, jetties, and kelp — halibut to bay bass.",
    gradient: "linear-gradient(135deg,#0d4a4a,#137a6e)",
    icon: "🎣",
  },
  "braided-line": {
    key: "braided-line",
    name: "DeepTide X8 Braided Line — 30 lb",
    category: "Line & Leader",
    price: 24.99,
    blurb: "Eight-strand braid with near-zero stretch. Feel every tick of the bottom.",
    badge: "Staff Pick",
    gradient: "linear-gradient(135deg,#233a5e,#3b5fa0)",
    icon: "🧵",
  },
  "fluoro-leader": {
    key: "fluoro-leader",
    name: "GhostWater Fluorocarbon Leader — 15 lb",
    category: "Line & Leader",
    price: 14.99,
    blurb: "Nearly invisible underwater — the difference-maker for picky corbina and seabass.",
    gradient: "linear-gradient(135deg,#1d3752,#2e5f83)",
    icon: "🧵",
  },
  "circle-hooks": {
    key: "circle-hooks",
    name: "TrueSet Circle Hooks — 25 pk",
    category: "Terminal Tackle",
    price: 9.99,
    blurb: "Corner-of-the-mouth hookups nearly every time. Better for the fish, better landing rates.",
    gradient: "linear-gradient(135deg,#3a2e59,#5d4a8f)",
    icon: "🪝",
  },
  "carolina-kit": {
    key: "carolina-kit",
    name: "Surf Standard Carolina Rig Kit",
    category: "Terminal Tackle",
    price: 19.99,
    blurb: "Sliders, beads, swivels, and hooks — 40 rigs' worth of the classic surfperch setup.",
    gradient: "linear-gradient(135deg,#4a3420,#7a5c36)",
    icon: "🪝",
  },
  "swimbait-kit": {
    key: "swimbait-kit",
    name: "BaitTheory Swimbait Kit — 24 pc",
    category: "Lures",
    price: 29.99,
    blurb: "Proven West Coast colors with matched leadheads — halibut, stripers, and bass.",
    badge: "Best Seller",
    gradient: "linear-gradient(135deg,#14532d,#1f7a45)",
    icon: "🐟",
  },
  "jig-assort": {
    key: "jig-assort",
    name: "IronWorks Coastal Jig Assortment",
    category: "Lures",
    price: 34.99,
    blurb: "Six jigs from 1–4 oz for rockfish, lingcod, and yo-yo yellowtail.",
    gradient: "linear-gradient(135deg,#52340e,#8a5a1d)",
    icon: "⚓",
  },
  "landing-net": {
    key: "landing-net",
    name: "TideGrip Folding Landing Net",
    category: "Accessories",
    price: 44.99,
    blurb: "Rubber-coated mesh, telescoping handle, folds flat for the jetty walk.",
    gradient: "linear-gradient(135deg,#0f3d51,#177a91)",
    icon: "🥅",
  },
  "sand-spike": {
    key: "sand-spike",
    name: "BeachAnchor Sand Spike — 2 pk",
    category: "Accessories",
    price: 21.99,
    blurb: "32-inch heavy PVC rod holders. Plant your spread and watch the tips.",
    gradient: "linear-gradient(135deg,#374151,#5b6472)",
    icon: "🏖️",
  },
  pliers: {
    key: "pliers",
    name: "SaltShield Aluminum Pliers",
    category: "Accessories",
    price: 27.99,
    blurb: "Corrosion-proof pliers with tungsten cutters that shear braid clean.",
    gradient: "linear-gradient(135deg,#334155,#516782)",
    icon: "🔧",
  },
  "tackle-bag": {
    key: "tackle-bag",
    name: "DryHaul Surf Tackle Bag",
    category: "Accessories",
    price: 59.99,
    blurb: "Waterproof base, four tray boxes, and a leader spool station.",
    gradient: "linear-gradient(135deg,#3f2d3f,#6b4a66)",
    icon: "🎒",
  },
  cooler: {
    key: "cooler",
    name: "ColdCatch 45 Qt Rotomolded Cooler",
    category: "Coolers",
    price: 189.99,
    blurb: "Ice for days, a bottle opener, and a fish ruler molded into the lid.",
    badge: "New",
    gradient: "linear-gradient(135deg,#134e4a,#1a7a72)",
    icon: "🧊",
  },
  headlamp: {
    key: "headlamp",
    name: "DawnPatrol Rechargeable Headlamp",
    category: "Accessories",
    price: 32.99,
    blurb: "400 lumens with a red mode that won't spook fish in the shallows.",
    gradient: "linear-gradient(135deg,#44403c,#6d655d)",
    icon: "🔦",
  },
};

export function getProducts(keys: string[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const k of keys) {
    if (!seen.has(k) && PRODUCTS[k]) {
      seen.add(k);
      out.push(PRODUCTS[k]);
    }
  }
  return out;
}
