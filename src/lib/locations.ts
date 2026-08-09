// Location registry — the California pilot.
// stationId = NOAA CO-OPS tide prediction station.

export type Region = "norcal" | "central" | "socal";

export interface Location {
  slug: string;
  name: string;
  state: string; // slug, e.g. "california"
  stateName: string;
  stationId: string;
  stationName: string;
  lat: number;
  lon: number;
  region: Region;
  /** "featured" = hand-curated page; "station" = auto-generated from NOAA list */
  tier?: "featured" | "station";
  /** Nearest coastal city, when it differs from the station name (auto pages) */
  nearCity?: string;
  tagline: string;
  intro: string;
  speciesKeys: string[];
  nearby: string[]; // slugs
  aliases?: string[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "crescent-city",
    name: "Crescent City",
    state: "california",
    stateName: "California",
    stationId: "9419750",
    stationName: "Crescent City",
    lat: 41.745,
    lon: -124.183,
    region: "norcal",
    tagline: "Rugged North Coast fishing at the Oregon border",
    intro:
      "Crescent City sits on California's far north coast, where cold, nutrient-rich water pushes big lingcod and rockfish close to shore. The harbor jetty and Battery Point produce year-round, and the Smith River mouth draws salmon in the fall.",
    speciesKeys: ["lingcod", "rockfish", "salmon", "surfperch", "cabezon"],
    nearby: ["bodega-bay", "san-francisco"],
    aliases: ["del norte"],
  },
  {
    slug: "eureka",
    name: "Eureka",
    state: "california",
    stateName: "California",
    stationId: "9418767",
    stationName: "North Spit, Humboldt Bay",
    lat: 40.767,
    lon: -124.217,
    region: "norcal",
    tagline: "Humboldt Bay — salmon runs, big perch, and bay sharks",
    intro:
      "Eureka sits on Humboldt Bay, the largest protected water between San Francisco and Coos Bay. The North and South jetties produce rockfish and lingcod in fishable swell, redtail perch stack along the spits in spring, and the bay itself holds leopard sharks and the occasional halibut all summer. When the salmon are in, the entrance can be shoulder to shoulder.",
    speciesKeys: ["salmon", "rockfish", "lingcod", "surfperch", "leopard-shark"],
    nearby: ["crescent-city", "point-arena", "bodega-bay"],
    aliases: ["humboldt", "north spit", "samoa"],
  },
  {
    slug: "point-arena",
    name: "Point Arena",
    state: "california",
    stateName: "California",
    stationId: "9416841",
    stationName: "Arena Cove",
    lat: 38.915,
    lon: -123.711,
    region: "norcal",
    tagline: "Mendocino's wild coast — rockfish water, few crowds",
    intro:
      "Point Arena is the Mendocino coast at its most unspoiled: a small pier in Arena Cove, kelp-covered reef in every direction, and almost no fishing pressure. The cove gives up rockfish, cabezon, and greenling to jigs and bait, lingcod prowl the deeper edges, and the flat rocks north of the pier are a classic poke-poling stretch on minus tides.",
    speciesKeys: ["rockfish", "lingcod", "cabezon", "surfperch", "salmon"],
    nearby: ["bodega-bay", "eureka", "point-reyes"],
    aliases: ["arena cove", "mendocino"],
  },
  {
    slug: "point-reyes",
    name: "Point Reyes",
    state: "california",
    stateName: "California",
    stationId: "9415020",
    stationName: "Point Reyes",
    lat: 37.994,
    lon: -122.974,
    region: "norcal",
    tagline: "Eleven miles of surf, stripers, and monster perch",
    intro:
      "Point Reyes National Seashore fronts one of the longest fishable beaches in California. The Great Beach is famous for oversized barred surfperch and summer striped bass blitzes, while Tomales Bay on the peninsula's back side offers protected water for halibut drifting and leopard shark soaking when the outer coast is blown out.",
    speciesKeys: ["surfperch", "striped-bass", "halibut", "leopard-shark", "rockfish"],
    nearby: ["bodega-bay", "san-francisco", "point-arena"],
    aliases: ["tomales bay", "great beach", "drakes"],
  },
  {
    slug: "bodega-bay",
    name: "Bodega Bay",
    state: "california",
    stateName: "California",
    stationId: "9415625",
    stationName: "Bodega Harbor Entrance",
    lat: 38.308,
    lon: -123.055,
    region: "norcal",
    tagline: "Sonoma Coast's classic port for rockfish and crab",
    intro:
      "Bodega Bay is the Sonoma Coast's fishing hub — a protected harbor ringed by productive reef. Doran Beach delivers easy surfperch fishing, the jetty holds greenling and rockfish, and short boat runs reach world-class lingcod grounds off Bodega Head.",
    speciesKeys: ["rockfish", "lingcod", "surfperch", "halibut", "salmon"],
    nearby: ["san-francisco", "half-moon-bay", "crescent-city"],
    aliases: ["sonoma", "doran beach"],
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    state: "california",
    stateName: "California",
    stationId: "9414290",
    stationName: "San Francisco (Golden Gate)",
    lat: 37.806,
    lon: -122.465,
    region: "norcal",
    tagline: "Big tides and big stripers inside the Golden Gate",
    intro:
      "San Francisco Bay funnels enormous tidal flows past beaches, piers, and rocky points — and moving water means feeding fish. Striped bass blitz Ocean Beach and Crissy Field, halibut stack up on the flats, and sturgeon prowl the deep channels in winter.",
    speciesKeys: ["striped-bass", "halibut", "rockfish", "leopard-shark", "surfperch"],
    nearby: ["half-moon-bay", "bodega-bay", "santa-cruz"],
    aliases: ["sf", "golden gate", "ocean beach", "bay area"],
  },
  {
    slug: "half-moon-bay",
    name: "Half Moon Bay",
    state: "california",
    stateName: "California",
    stationId: "9414131",
    stationName: "Pillar Point Harbor",
    lat: 37.503,
    lon: -122.482,
    region: "norcal",
    tagline: "Pillar Point Harbor — jetty, kayak, and beach fishing",
    intro:
      "Half Moon Bay's Pillar Point Harbor is one of the most accessible fisheries on the coast. The breakwater shelters kayak anglers chasing rockfish, the jetty gives up perch and the odd halibut, and the long state beaches to the south are prime striper water in summer.",
    speciesKeys: ["rockfish", "striped-bass", "surfperch", "halibut", "lingcod"],
    nearby: ["san-francisco", "santa-cruz", "bodega-bay"],
    aliases: ["pillar point", "mavericks", "princeton"],
  },
  {
    slug: "richmond",
    name: "Richmond",
    state: "california",
    stateName: "California",
    stationId: "9414863",
    stationName: "Richmond",
    lat: 37.928,
    lon: -122.4,
    region: "norcal",
    tagline: "East Bay shoreline — striper piers and sturgeon flats",
    intro:
      "Richmond's shoreline faces the deep, current-swept center of San Francisco Bay. Point Pinole and the Richmond riprap are classic striped bass water on a moving tide, halibut slide onto the flats off Brooks Island in summer, and the same mudflats produce leopard sharks and bat rays for anglers soaking bait through an evening flood.",
    speciesKeys: ["striped-bass", "halibut", "leopard-shark", "rockfish"],
    nearby: ["san-francisco", "alameda", "point-reyes"],
    aliases: ["point pinole", "east bay"],
  },
  {
    slug: "alameda",
    name: "Alameda",
    state: "california",
    stateName: "California",
    stationId: "9414750",
    stationName: "Alameda",
    lat: 37.772,
    lon: -122.3,
    region: "norcal",
    tagline: "City-side flats with real halibut and striper fishing",
    intro:
      "Alameda puts legitimate fishing inside the urban East Bay: Crown Memorial Beach is one of the most reliable shore halibut spots in the entire estuary, stripers work the rockwall on tide swings, and the protected water means it's fishable when the coast is a mess. Ferry Point and the Encinal boat ramp open up the whole central bay.",
    speciesKeys: ["halibut", "striped-bass", "leopard-shark", "surfperch"],
    nearby: ["san-francisco", "richmond", "redwood-city"],
    aliases: ["crown beach", "oakland", "east bay"],
  },
  {
    slug: "redwood-city",
    name: "Redwood City",
    state: "california",
    stateName: "California",
    stationId: "9414523",
    stationName: "Redwood City",
    lat: 37.507,
    lon: -122.212,
    region: "norcal",
    tagline: "South Bay sloughs — sharks, rays, and tidal creek stripers",
    intro:
      "The South Bay around Redwood City is a maze of sloughs, levees, and warm shallow flats that fish completely differently from the open coast. Leopard sharks and bat rays feed hard here on big tides, stripers push deep into the creeks in fall, and the sheltered water makes it the Bay Area's most dependable option on windy days.",
    speciesKeys: ["leopard-shark", "striped-bass", "halibut", "surfperch"],
    nearby: ["alameda", "san-francisco", "half-moon-bay"],
    aliases: ["south bay", "sloughs"],
  },
  {
    slug: "santa-cruz",
    name: "Santa Cruz",
    state: "california",
    stateName: "California",
    stationId: "9413745",
    stationName: "Santa Cruz, Monterey Bay",
    lat: 36.958,
    lon: -122.017,
    region: "central",
    tagline: "Monterey Bay's north shore — wharf, kelp, and reef",
    intro:
      "Santa Cruz fishes the sheltered north corner of Monterey Bay. The municipal wharf is a family favorite for mackerel and perch, kelp beds off Lighthouse Point hold kelp bass and rockfish, and live-bait drifts on the flats produce quality halibut all summer.",
    speciesKeys: ["halibut", "rockfish", "surfperch", "lingcod", "white-seabass"],
    nearby: ["monterey", "half-moon-bay", "san-francisco"],
    aliases: ["capitola", "wharf"],
  },
  {
    slug: "monterey",
    name: "Monterey",
    state: "california",
    stateName: "California",
    stationId: "9413450",
    stationName: "Monterey",
    lat: 36.605,
    lon: -121.888,
    region: "central",
    tagline: "Deep canyon water meets easy shoreline access",
    intro:
      "Monterey sits beside a submarine canyon that pulls deep, cold water — and the fish that come with it — remarkably close to shore. The Coast Guard jetty, Wharf No. 2, and the sandy stretch toward Seaside offer some of the most varied shore fishing in California.",
    speciesKeys: ["rockfish", "lingcod", "halibut", "white-seabass", "surfperch", "salmon"],
    nearby: ["santa-cruz", "santa-barbara", "half-moon-bay"],
    aliases: ["cannery row", "pacific grove"],
  },
  {
    slug: "san-simeon",
    name: "San Simeon",
    state: "california",
    stateName: "California",
    stationId: "9412553",
    stationName: "San Simeon",
    lat: 35.642,
    lon: -121.188,
    region: "central",
    tagline: "Hearst Castle's coast — pier fishing and empty reef",
    intro:
      "San Simeon is the quiet stretch of Highway 1 most anglers drive straight past — which is exactly the point. The pier at San Simeon Cove needs no license and sits over sand that holds perch and the odd halibut, while the reef and kelp north toward Piedras Blancas fish like a marine preserve's edge: thick with rockfish, cabezon, and greenling.",
    speciesKeys: ["surfperch", "rockfish", "cabezon", "halibut", "lingcod"],
    nearby: ["avila-beach", "monterey", "santa-barbara"],
    aliases: ["cambria", "hearst", "piedras blancas"],
  },
  {
    slug: "avila-beach",
    name: "Avila Beach",
    state: "california",
    stateName: "California",
    stationId: "9412110",
    stationName: "Port San Luis",
    lat: 35.169,
    lon: -120.754,
    region: "central",
    tagline: "Port San Luis — three piers in one protected cove",
    intro:
      "Avila Beach hides in the lee of Point San Luis, giving it some of the calmest fishing water on the Central Coast. Three piers — Avila, Cal Poly, and Harford — cover everything from sandy-bottom perch and halibut to deep-water rockfish at Harford's end, and the mooring fields hold white seabass when the squid show up in spring.",
    speciesKeys: ["halibut", "surfperch", "rockfish", "white-seabass", "lingcod"],
    nearby: ["san-simeon", "santa-barbara", "monterey"],
    aliases: ["port san luis", "pismo", "san luis obispo", "harford pier"],
  },
  {
    slug: "santa-barbara",
    name: "Santa Barbara",
    state: "california",
    stateName: "California",
    stationId: "9411340",
    stationName: "Santa Barbara",
    lat: 34.408,
    lon: -119.685,
    region: "socal",
    tagline: "The American Riviera — calico bass and halibut country",
    intro:
      "Santa Barbara's south-facing coast is sheltered from prevailing swell, making for calm, fishable water most of the year. Stearns Wharf, the harbor entrance, and the kelp lines toward Goleta hold calico bass, halibut, and white seabass in spring.",
    speciesKeys: ["calico-bass", "halibut", "white-seabass", "surfperch", "rockfish"],
    nearby: ["santa-monica", "monterey", "newport-beach"],
    aliases: ["goleta", "stearns wharf"],
  },
  {
    slug: "santa-monica",
    name: "Santa Monica",
    state: "california",
    stateName: "California",
    stationId: "9410840",
    stationName: "Santa Monica",
    lat: 34.008,
    lon: -118.5,
    region: "socal",
    tagline: "L.A.'s beach fishery — corbina, perch, and bay bass",
    intro:
      "Santa Monica Bay is Los Angeles' front-yard fishery. Summer mornings bring corbina cruising the shorebreak, the pier produces mackerel and halibut, and artificial reefs a short distance out hold sand bass and sculpin year-round.",
    speciesKeys: ["corbina", "surfperch", "halibut", "spotted-bay-bass", "leopard-shark"],
    nearby: ["los-angeles", "newport-beach", "santa-barbara"],
    aliases: ["la", "venice", "malibu"],
  },
  {
    slug: "los-angeles",
    name: "Los Angeles Harbor",
    state: "california",
    stateName: "California",
    stationId: "9410660",
    stationName: "Los Angeles (Outer Harbor)",
    lat: 33.72,
    lon: -118.272,
    region: "socal",
    tagline: "San Pedro's breakwalls, bays, and big bass structure",
    intro:
      "The Los Angeles–Long Beach harbor complex is a maze of breakwalls, docks, and channels — pure structure fishing. Spotted bay bass and sand bass live on nearly every piece of it, halibut sit on the channel edges, and the federal breakwater is a calico bass highway.",
    speciesKeys: ["spotted-bay-bass", "calico-bass", "halibut", "yellowtail", "leopard-shark"],
    nearby: ["newport-beach", "santa-monica", "san-diego"],
    aliases: ["san pedro", "long beach", "cabrillo"],
  },
  {
    slug: "newport-beach",
    name: "Newport Beach",
    state: "california",
    stateName: "California",
    stationId: "9410580",
    stationName: "Newport Bay Entrance",
    lat: 33.603,
    lon: -117.883,
    region: "socal",
    tagline: "Harbor bass by day, surf corbina at first light",
    intro:
      "Newport Beach pairs a huge protected harbor with miles of quality surf. The bay's docks and moorings are a spotted bay bass factory, the jetties give up calicos and the occasional yellowtail, and the beaches from the Wedge to Crystal Cove fish well on any moving tide.",
    speciesKeys: ["spotted-bay-bass", "calico-bass", "corbina", "halibut", "yellowtail"],
    nearby: ["los-angeles", "san-diego", "santa-monica"],
    aliases: ["balboa", "the wedge", "orange county"],
  },
  {
    slug: "la-jolla",
    name: "La Jolla",
    state: "california",
    stateName: "California",
    stationId: "9410230",
    stationName: "La Jolla (Scripps Pier)",
    lat: 32.867,
    lon: -117.257,
    region: "socal",
    tagline: "Kelp beds, yellowtail, and world-class kayak fishing",
    intro:
      "La Jolla's kelp forest is the most famous kayak fishery in California. Yellowtail patrol the kelp edge from spring through fall, white seabass ghost through in spring, and the underwater canyon brings deep water — and big marks — within a short paddle.",
    speciesKeys: ["yellowtail", "white-seabass", "calico-bass", "halibut", "rockfish"],
    nearby: ["san-diego", "newport-beach", "los-angeles"],
    aliases: ["scripps", "kayak"],
  },
  {
    slug: "san-diego",
    name: "San Diego",
    state: "california",
    stateName: "California",
    stationId: "9410170",
    stationName: "San Diego Bay",
    lat: 32.714,
    lon: -117.174,
    region: "socal",
    tagline: "America's sportfishing capital",
    intro:
      "San Diego calls itself the sportfishing capital of the world, and the bay backs it up. Spotted bay bass and halibut live on the eelgrass flats, bonefish (yes, really) show in the south bay, and the point at Cabrillo opens onto some of the best kelp fishing on the coast.",
    speciesKeys: ["spotted-bay-bass", "yellowtail", "calico-bass", "halibut", "corbina"],
    nearby: ["la-jolla", "newport-beach", "los-angeles"],
    aliases: ["mission bay", "coronado", "point loma"],
  },
];

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getNearby(loc: Location): Location[] {
  return loc.nearby
    .map((s) => getLocation(s))
    .filter((l): l is Location => Boolean(l));
}
