// California inshore species knowledge base.

export interface Species {
  key: string;
  /** Path under /public, e.g. "/species/striped-bass.jpg" — card shows it when set */
  image?: string;
  name: string;
  scientific: string;
  emoji: string;
  seasonMonths: number[]; // 1-12, months of peak activity
  seasonLabel: string;
  bait: string[];
  techniques: string;
  gearKeys: string[]; // TheAnglerStore product keys
  tempRangeF: [number, number];
}

export const SPECIES: Record<string, Species> = {
  "striped-bass": {
    key: "striped-bass",
    image: "/species/striped-bass.jpg",
    name: "Striped Bass",
    scientific: "Morone saxatilis",
    emoji: "🐟",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonLabel: "May – October",
    bait: ["Anchovies", "Topwater plugs", "Swimbaits", "Bucktail jigs"],
    techniques:
      "Work troughs and rip currents on a moving tide. Dawn topwater in flat surf is the classic bite.",
    gearKeys: ["surf-rod", "braided-line", "swimbait-kit", "sand-spike"],
    tempRangeF: [55, 68],
  },
  halibut: {
    key: "halibut",
    image: "/species/halibut.jpg",
    name: "California Halibut",
    scientific: "Paralichthys californicus",
    emoji: "🐠",
    seasonMonths: [4, 5, 6, 7, 8, 9],
    seasonLabel: "April – September",
    bait: ["Live anchovies", "Swimbaits", "Hair raisers", "Frozen squid"],
    techniques:
      "Drag baits slowly along sandy bottom near structure edges. Slow retrieve — halibut ambush from below.",
    gearKeys: ["inshore-combo", "circle-hooks", "landing-net", "fluoro-leader"],
    tempRangeF: [58, 70],
  },
  rockfish: {
    key: "rockfish",
    image: "/species/rockfish.jpg",
    name: "Rockfish",
    scientific: "Sebastes spp.",
    emoji: "🐡",
    seasonMonths: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasonLabel: "April – December (check regs)",
    bait: ["Shrimp flies", "Metal jigs", "Squid strips", "Swimbaits"],
    techniques:
      "Fish vertically over reef and kelp. Keep the bait just off bottom to dodge snags and hook quality grade.",
    gearKeys: ["jig-assort", "braided-line", "tackle-bag", "pliers"],
    tempRangeF: [48, 62],
  },
  lingcod: {
    key: "lingcod",
    image: "/species/lingcod.jpg",
    name: "Lingcod",
    scientific: "Ophiodon elongatus",
    emoji: "🦈",
    seasonMonths: [4, 5, 6, 7, 8, 9, 10, 11],
    seasonLabel: "April – November",
    bait: ["Large swimbaits", "Metal jigs", "Live mackerel"],
    techniques:
      "Big baits, rocky bottom, and patience. Lings follow hooked fish up — keep a net ready at the surface.",
    gearKeys: ["jig-assort", "landing-net", "braided-line", "pliers"],
    tempRangeF: [46, 60],
  },
  surfperch: {
    key: "surfperch",
    image: "/species/surfperch.jpg",
    name: "Barred Surfperch",
    scientific: "Amphistichus argenteus",
    emoji: "🐟",
    seasonMonths: [1, 2, 3, 4, 5, 11, 12],
    seasonLabel: "Year-round, best in winter–spring",
    bait: ["Sand crabs", "Gulp! sandworms", "Motor oil grubs"],
    techniques:
      "Carolina rig in the first trough behind the shorebreak. Follow the tide in — perch feed where sand crabs wash out.",
    gearKeys: ["surf-rod", "carolina-kit", "sand-spike", "tackle-bag"],
    tempRangeF: [52, 66],
  },
  salmon: {
    key: "salmon",
    image: "/species/salmon.jpg",
    name: "King Salmon",
    scientific: "Oncorhynchus tshawytscha",
    emoji: "🐟",
    seasonMonths: [6, 7, 8, 9],
    seasonLabel: "June – September (check regs)",
    bait: ["Trolled anchovies", "Spoons", "Hoochies"],
    techniques:
      "Troll bait near bait schools and temperature breaks. Early season fishes deep; late season pushes near river mouths.",
    gearKeys: ["inshore-combo", "landing-net", "cooler", "fluoro-leader"],
    tempRangeF: [50, 60],
  },
  "white-seabass": {
    key: "white-seabass",
    image: "/species/white-seabass.jpg",
    name: "White Seabass",
    scientific: "Atractoscion nobilis",
    emoji: "🐋",
    seasonMonths: [3, 4, 5, 6, 7],
    seasonLabel: "March – July",
    bait: ["Live squid", "Big swimbaits", "Iron jigs"],
    techniques:
      "Find the squid, find the seabass. Fish structure and kelp edges at dawn, gray light, and tide swings.",
    gearKeys: ["inshore-combo", "circle-hooks", "landing-net", "cooler"],
    tempRangeF: [58, 68],
  },
  yellowtail: {
    key: "yellowtail",
    image: "/species/yellowtail.jpg",
    name: "California Yellowtail",
    scientific: "Seriola dorsalis",
    emoji: "🐟",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonLabel: "May – October",
    bait: ["Live mackerel", "Surface irons", "Yo-yo jigs"],
    techniques:
      "Kelp lines and current seams. When birds work bait on the surface, throw the iron and wind fast.",
    gearKeys: ["jig-assort", "braided-line", "pliers", "cooler"],
    tempRangeF: [62, 72],
  },
  "calico-bass": {
    key: "calico-bass",
    image: "/species/calico-bass.jpg",
    name: "Calico Bass",
    scientific: "Paralabrax clathratus",
    emoji: "🐠",
    seasonMonths: [4, 5, 6, 7, 8, 9, 10],
    seasonLabel: "April – October",
    bait: ["Weedless swimbaits", "Live anchovies", "Plastics"],
    techniques:
      "Cast tight to kelp stringers and boiler rocks. Moving water turns the kelp line into a feeding lane.",
    gearKeys: ["inshore-combo", "swimbait-kit", "braided-line", "pliers"],
    tempRangeF: [60, 72],
  },
  corbina: {
    key: "corbina",
    image: "/species/corbina.jpg",
    name: "California Corbina",
    scientific: "Menticirrhus undulatus",
    emoji: "🐟",
    seasonMonths: [6, 7, 8, 9],
    seasonLabel: "June – September",
    bait: ["Sand crabs", "Bloodworms", "Ghost shrimp"],
    techniques:
      "Sight-fish skinny water at first light on an incoming tide. Long fluorocarbon leaders — corbina are famously picky.",
    gearKeys: ["surf-rod", "fluoro-leader", "carolina-kit", "sand-spike"],
    tempRangeF: [62, 74],
  },
  "spotted-bay-bass": {
    key: "spotted-bay-bass",
    image: "/species/spotted-bay-bass.jpg",
    name: "Spotted Bay Bass",
    scientific: "Paralabrax maculatofasciatus",
    emoji: "🐠",
    seasonMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    seasonLabel: "Year-round",
    bait: ["Plastics on leadheads", "Small swimbaits", "Ghost shrimp"],
    techniques:
      "Hit dock pilings, riprap, and eelgrass edges on moving water. A 3-inch plastic on a ¼ oz head is the bay standard.",
    gearKeys: ["inshore-combo", "swimbait-kit", "pliers", "tackle-bag"],
    tempRangeF: [58, 75],
  },
  "leopard-shark": {
    key: "leopard-shark",
    image: "/species/leopard-shark.jpg",
    name: "Leopard Shark",
    scientific: "Triakis semifasciata",
    emoji: "🦈",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonLabel: "May – October",
    bait: ["Squid", "Mackerel chunks", "Midshipman"],
    techniques:
      "Soak fresh bait on the flats during an evening incoming tide. Steel or heavy mono leader, circle hooks for a clean release.",
    gearKeys: ["surf-rod", "circle-hooks", "pliers", "sand-spike"],
    tempRangeF: [58, 72],
  },
  cabezon: {
    key: "cabezon",
    image: "/species/cabezon.jpg",
    name: "Cabezon",
    scientific: "Scorpaenichthys marmoratus",
    emoji: "🐡",
    seasonMonths: [3, 4, 5, 6, 7, 8, 9, 10],
    seasonLabel: "March – October",
    bait: ["Squid", "Shrimp", "Small crabs"],
    techniques:
      "Drop baits into rocky holes and jetty gaps. Strong first run — keep them out of the rocks.",
    gearKeys: ["jig-assort", "braided-line", "pliers", "tackle-bag"],
    tempRangeF: [48, 62],
  },
};

/** Activity level for a species in a given month (1-12). */
export function speciesActivity(
  s: Species,
  month: number,
): "high" | "medium" | "low" {
  if (s.seasonMonths.includes(month)) return "high";
  const near = s.seasonMonths.some(
    (m) => Math.abs(m - month) === 1 || Math.abs(m - month) === 11,
  );
  return near ? "medium" : "low";
}
