// Multi-state configuration. Everything state-specific — regions, species
// defaults, city maps, copy — lives here so adding a state is one entry.

export interface StateConfig {
  slug: string; // URL segment, e.g. "california"
  name: string; // "California"
  code: string; // NOAA state code + display abbreviation, e.g. "CA"
  timezoneNote?: string;
  description: string; // state index intro
  regions: { key: string; name: string }[];
  regionFor: (lat: number, lon: number) => string;
  regionSpecies: Record<string, string[]>;
  cities: [string, number, number][];
  featured: string[]; // curated slugs to feature on the homepage
  regsName: string; // fishing regulations agency, e.g. "CDFW"
  regsUrl: string;
  /** Rough bounding box [south, west, north, east] for map framing. */
  bounds: [number, number, number, number];
}

const CA_CITIES: [string, number, number][] = [
  ["Trinidad", 41.06, -124.14], ["Arcata", 40.87, -124.08],
  ["Ferndale", 40.58, -124.26], ["Shelter Cove", 40.03, -124.06],
  ["Fort Bragg", 39.45, -123.8], ["Mendocino", 39.31, -123.8],
  ["Gualala", 38.77, -123.53], ["Jenner", 38.45, -123.12],
  ["Tomales", 38.25, -122.9], ["Dillon Beach", 38.25, -122.96],
  ["Inverness", 38.1, -122.86], ["Stinson Beach", 37.9, -122.64],
  ["Bolinas", 37.91, -122.69], ["Sausalito", 37.86, -122.49],
  ["Mill Valley", 37.91, -122.55], ["Tiburon", 37.87, -122.46],
  ["San Rafael", 37.97, -122.53], ["Novato", 38.11, -122.57],
  ["Petaluma", 38.23, -122.64], ["Vallejo", 38.1, -122.26],
  ["Benicia", 38.05, -122.16], ["Martinez", 38.02, -122.13],
  ["Pittsburg", 38.03, -121.88], ["Antioch", 38.0, -121.81],
  ["Berkeley", 37.87, -122.3], ["Emeryville", 37.84, -122.29],
  ["Oakland", 37.8, -122.27], ["San Leandro", 37.72, -122.16],
  ["Hayward", 37.64, -122.12], ["Fremont", 37.55, -122.05],
  ["San Mateo", 37.56, -122.31], ["Palo Alto", 37.45, -122.11],
  ["Alviso", 37.42, -121.97], ["Pacifica", 37.61, -122.49],
  ["Pescadero", 37.26, -122.38], ["Capitola", 36.97, -121.95],
  ["Watsonville", 36.91, -121.79], ["Moss Landing", 36.8, -121.79],
  ["Marina", 36.68, -121.8], ["Pacific Grove", 36.62, -121.92],
  ["Carmel", 36.55, -121.92], ["Big Sur", 36.27, -121.81],
  ["Cambria", 35.56, -121.08], ["Cayucos", 35.44, -120.89],
  ["Morro Bay", 35.37, -120.85], ["Los Osos", 35.31, -120.83],
  ["Pismo Beach", 35.14, -120.64], ["Guadalupe", 34.97, -120.57],
  ["Lompoc", 34.64, -120.46], ["Goleta", 34.42, -119.83],
  ["Carpinteria", 34.4, -119.52], ["Ventura", 34.28, -119.29],
  ["Oxnard", 34.2, -119.18], ["Port Hueneme", 34.15, -119.2],
  ["Malibu", 34.03, -118.78], ["Venice", 33.99, -118.47],
  ["Marina del Rey", 33.98, -118.45], ["Manhattan Beach", 33.88, -118.41],
  ["Hermosa Beach", 33.86, -118.4], ["Redondo Beach", 33.84, -118.39],
  ["San Pedro", 33.74, -118.29], ["Long Beach", 33.77, -118.19],
  ["Seal Beach", 33.74, -118.1], ["Huntington Beach", 33.66, -118.0],
  ["Laguna Beach", 33.54, -117.78], ["Dana Point", 33.47, -117.7],
  ["San Clemente", 33.43, -117.62], ["Oceanside", 33.2, -117.38],
  ["Carlsbad", 33.16, -117.35], ["Encinitas", 33.04, -117.29],
  ["Del Mar", 32.96, -117.27], ["Coronado", 32.69, -117.18],
  ["Imperial Beach", 32.58, -117.11], ["Chula Vista", 32.64, -117.08],
  ["National City", 32.68, -117.1], ["Solana Beach", 32.99, -117.27],
  ["Montara", 37.54, -122.51], ["Moss Beach", 37.52, -122.51],
  ["El Granada", 37.5, -122.47], ["Aptos", 36.98, -121.9],
  ["Seaside", 36.61, -121.85], ["Grover Beach", 35.12, -120.62],
  ["Summerland", 34.42, -119.6], ["Isla Vista", 34.41, -119.86],
  ["South San Francisco", 37.65, -122.41], ["San Bruno", 37.63, -122.41],
  ["Brisbane", 37.68, -122.4], ["Millbrae", 37.6, -122.39],
  ["Burlingame", 37.58, -122.35], ["Foster City", 37.56, -122.27],
  ["Menlo Park", 37.45, -122.18], ["Union City", 37.59, -122.02],
  ["Newark", 37.53, -122.04], ["Milpitas", 37.43, -121.9],
  ["Sunnyvale", 37.37, -122.04], ["Albany", 37.89, -122.3],
  ["El Cerrito", 37.92, -122.31], ["Pinole", 38.0, -122.29],
  ["Hercules", 38.02, -122.26], ["Rodeo", 38.03, -122.27],
  ["Crockett", 38.05, -122.21], ["Port Costa", 38.05, -122.18],
  ["Napa", 38.3, -122.29], ["American Canyon", 38.17, -122.26],
  ["Suisun City", 38.24, -122.04], ["Rio Vista", 38.16, -121.69],
  ["Isleton", 38.16, -121.61], ["Stockton", 37.95, -121.29],
  ["Sacramento", 38.58, -121.49], ["West Sacramento", 38.58, -121.53],
  ["Larkspur", 37.93, -122.53], ["Corte Madera", 37.93, -122.51],
  ["San Quentin", 37.94, -122.49], ["Fairfax", 37.99, -122.59],
  ["Sonoma", 38.29, -122.46],
];

const FL_CITIES: [string, number, number][] = [
  ["Fernandina Beach", 30.67, -81.46], ["Jacksonville", 30.33, -81.66],
  ["Jacksonville Beach", 30.29, -81.39], ["St. Augustine", 29.9, -81.31],
  ["Palm Coast", 29.58, -81.21], ["Ormond Beach", 29.29, -81.06],
  ["Daytona Beach", 29.21, -81.02], ["Ponce Inlet", 29.08, -80.93],
  ["New Smyrna Beach", 29.03, -80.93], ["Titusville", 28.61, -80.81],
  ["Cocoa Beach", 28.32, -80.61], ["Satellite Beach", 28.18, -80.6],
  ["Melbourne", 28.08, -80.6], ["Sebastian", 27.82, -80.47],
  ["Vero Beach", 27.64, -80.4], ["Fort Pierce", 27.45, -80.33],
  ["Jensen Beach", 27.25, -80.22], ["Stuart", 27.2, -80.25],
  ["Hobe Sound", 27.06, -80.14], ["Jupiter", 26.93, -80.09],
  ["Palm Beach Gardens", 26.82, -80.14], ["West Palm Beach", 26.71, -80.05],
  ["Lake Worth", 26.62, -80.06], ["Boynton Beach", 26.53, -80.06],
  ["Delray Beach", 26.46, -80.07], ["Boca Raton", 26.35, -80.08],
  ["Deerfield Beach", 26.32, -80.1], ["Pompano Beach", 26.23, -80.12],
  ["Fort Lauderdale", 26.12, -80.14], ["Dania Beach", 26.05, -80.14],
  ["Hollywood", 26.01, -80.15], ["Hallandale Beach", 25.98, -80.15],
  ["North Miami", 25.89, -80.19], ["Miami Beach", 25.79, -80.13],
  ["Miami", 25.76, -80.19], ["Key Biscayne", 25.69, -80.16],
  ["Coral Gables", 25.72, -80.27], ["Homestead", 25.47, -80.48],
  ["Key Largo", 25.09, -80.45], ["Tavernier", 25.01, -80.52],
  ["Islamorada", 24.92, -80.63], ["Marathon", 24.71, -81.09],
  ["Big Pine Key", 24.67, -81.35], ["Key West", 24.56, -81.78],
  ["Everglades City", 25.86, -81.38], ["Chokoloskee", 25.81, -81.36],
  ["Marco Island", 25.94, -81.73], ["Naples", 26.14, -81.79],
  ["Bonita Springs", 26.34, -81.84], ["Fort Myers Beach", 26.45, -81.95],
  ["Fort Myers", 26.64, -81.87], ["Cape Coral", 26.56, -81.95],
  ["Sanibel", 26.44, -82.02], ["Matlacha", 26.63, -82.07],
  ["Boca Grande", 26.75, -82.26], ["Punta Gorda", 26.93, -82.05],
  ["Port Charlotte", 26.98, -82.09], ["Englewood", 26.96, -82.35],
  ["Venice", 27.1, -82.45], ["Sarasota", 27.34, -82.53],
  ["Bradenton", 27.5, -82.57], ["Anna Maria", 27.53, -82.73],
  ["St. Petersburg", 27.77, -82.64], ["Gulfport", 27.75, -82.7],
  ["St. Pete Beach", 27.72, -82.74], ["Clearwater", 27.97, -82.8],
  ["Dunedin", 28.02, -82.77], ["Tarpon Springs", 28.15, -82.76],
  ["Tampa", 27.95, -82.46], ["Apollo Beach", 27.77, -82.41],
  ["Hudson", 28.36, -82.69], ["Homosassa", 28.78, -82.61],
  ["Crystal River", 28.9, -82.59], ["Cedar Key", 29.14, -83.04],
  ["Steinhatchee", 29.67, -83.39], ["Apalachicola", 29.73, -84.99],
  ["Port St. Joe", 29.81, -85.3], ["Mexico Beach", 29.94, -85.42],
  ["Panama City", 30.16, -85.66], ["Panama City Beach", 30.18, -85.81],
  ["Destin", 30.39, -86.5], ["Fort Walton Beach", 30.42, -86.62],
  ["Navarre", 30.4, -86.86], ["Gulf Breeze", 30.37, -87.16],
  ["Pensacola", 30.42, -87.22], ["Perdido Key", 30.29, -87.44],
];


const TX_CITIES: [string, number, number][] = [
  ["Sabine Pass", 29.73, -93.87], ["Port Arthur", 29.9, -93.93],
  ["Crystal Beach", 29.45, -94.63], ["Port Bolivar", 29.37, -94.77],
  ["Galveston", 29.3, -94.8], ["Texas City", 29.38, -94.9],
  ["Kemah", 29.54, -95.02], ["San Leon", 29.49, -94.95],
  ["Jamaica Beach", 29.19, -94.98], ["Surfside Beach", 28.95, -95.29],
  ["Freeport", 28.95, -95.36], ["Quintana", 28.94, -95.32],
  ["Sargent", 28.77, -95.62], ["Matagorda", 28.69, -95.97],
  ["Palacios", 28.71, -96.22], ["Port O'Connor", 28.45, -96.41],
  ["Seadrift", 28.41, -96.71], ["Rockport", 28.02, -97.05],
  ["Aransas Pass", 27.91, -97.15], ["Port Aransas", 27.83, -97.06],
  ["Corpus Christi", 27.8, -97.4], ["Padre Island", 27.62, -97.22],
  ["Port Mansfield", 26.56, -97.43], ["South Padre Island", 26.1, -97.17],
  ["Port Isabel", 26.07, -97.21],
];

const GA_CITIES: [string, number, number][] = [
  ["Savannah", 32.08, -81.09], ["Tybee Island", 32.0, -80.85],
  ["Thunderbolt", 32.03, -81.05], ["Skidaway Island", 31.94, -81.05],
  ["Richmond Hill", 31.94, -81.3], ["Midway", 31.8, -81.43],
  ["Darien", 31.37, -81.43], ["Sapelo Island", 31.47, -81.25],
  ["Brunswick", 31.15, -81.49], ["St. Simons Island", 31.15, -81.37],
  ["Sea Island", 31.19, -81.34], ["Jekyll Island", 31.07, -81.42],
  ["St. Marys", 30.73, -81.55], ["Cumberland Island", 30.85, -81.45],
  ["Kingsland", 30.8, -81.69],
];

const SC_CITIES: [string, number, number][] = [
  ["Little River", 33.87, -78.61], ["North Myrtle Beach", 33.82, -78.68],
  ["Myrtle Beach", 33.69, -78.89], ["Surfside Beach", 33.61, -78.97],
  ["Garden City", 33.58, -79.0], ["Murrells Inlet", 33.55, -79.04],
  ["Pawleys Island", 33.43, -79.12], ["Georgetown", 33.37, -79.29],
  ["McClellanville", 33.09, -79.46], ["Isle of Palms", 32.79, -79.79],
  ["Sullivan's Island", 32.76, -79.84], ["Mount Pleasant", 32.83, -79.83],
  ["Charleston", 32.78, -79.93], ["Folly Beach", 32.66, -79.94],
  ["Kiawah Island", 32.61, -80.08], ["Seabrook Island", 32.58, -80.17],
  ["Edisto Beach", 32.5, -80.3], ["Beaufort", 32.43, -80.67],
  ["Port Royal", 32.38, -80.69], ["Fripp Island", 32.32, -80.47],
  ["Hilton Head Island", 32.22, -80.75], ["Bluffton", 32.24, -80.86],
  ["Daufuskie Island", 32.11, -80.88],
];

const NC_CITIES: [string, number, number][] = [
  ["Corolla", 36.38, -75.83], ["Duck", 36.17, -75.75],
  ["Kitty Hawk", 36.07, -75.7], ["Kill Devil Hills", 36.03, -75.67],
  ["Nags Head", 35.96, -75.63], ["Manteo", 35.91, -75.67],
  ["Rodanthe", 35.59, -75.47], ["Avon", 35.35, -75.5],
  ["Buxton", 35.27, -75.54], ["Frisco", 35.24, -75.62],
  ["Hatteras", 35.22, -75.69], ["Ocracoke", 35.11, -75.98],
  ["Cedar Island", 34.99, -76.3], ["Harkers Island", 34.69, -76.56],
  ["Beaufort", 34.72, -76.66], ["Morehead City", 34.72, -76.73],
  ["Atlantic Beach", 34.7, -76.74], ["Emerald Isle", 34.68, -77.0],
  ["Swansboro", 34.69, -77.12], ["Surf City", 34.43, -77.55],
  ["Topsail Beach", 34.37, -77.63], ["Wrightsville Beach", 34.21, -77.8],
  ["Wilmington", 34.23, -77.94], ["Carolina Beach", 34.04, -77.89],
  ["Kure Beach", 33.99, -77.91], ["Southport", 33.92, -78.02],
  ["Oak Island", 33.91, -78.14], ["Holden Beach", 33.91, -78.3],
  ["Ocean Isle Beach", 33.89, -78.43], ["Sunset Beach", 33.88, -78.51],
];

export const STATES: Record<string, StateConfig> = {
  california: {
    slug: "california",
    name: "California",
    code: "CA",
    description:
      "Live NOAA tide predictions and fishing forecasts for the California coast, from the redwood coast to the Mexican border — every station in NOAA's network.",
    regions: [
      { key: "norcal", name: "Northern California" },
      { key: "central", name: "Central Coast" },
      { key: "socal", name: "Southern California" },
    ],
    regionFor: (lat) => (lat >= 37.4 ? "norcal" : lat >= 35.0 ? "central" : "socal"),
    regionSpecies: {
      norcal: ["striped-bass", "halibut", "rockfish", "surfperch", "leopard-shark"],
      central: ["rockfish", "halibut", "surfperch", "lingcod", "white-seabass"],
      socal: ["calico-bass", "halibut", "spotted-bay-bass", "corbina", "yellowtail"],
    },
    cities: CA_CITIES,
    featured: ["monterey", "half-moon-bay", "san-diego", "bodega-bay"],
    regsName: "CDFW regulations",
    regsUrl: "https://wildlife.ca.gov/Fishing/Ocean/Regulations",
    bounds: [32.4, -124.5, 42.0, -117.0],
  },
  florida: {
    slug: "florida",
    name: "Florida",
    code: "FL",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Florida coast — Atlantic beaches, the Gulf, the Panhandle, and the Keys, every station in NOAA's network.",
    regions: [
      { key: "panhandle", name: "Panhandle" },
      { key: "gulf", name: "Gulf Coast" },
      { key: "atlantic", name: "Atlantic Coast" },
      { key: "keys", name: "Florida Keys" },
    ],
    regionFor: (lat, lon) => {
      if (lat < 25.4) return "keys";
      if (lat > 29.3 && lon < -83.8) return "panhandle";
      if (lon > -81.8) return "atlantic";
      return "gulf";
    },
    regionSpecies: {
      panhandle: ["redfish", "speckled-trout", "pompano", "spanish-mackerel", "flounder-gulf"],
      gulf: ["snook", "redfish", "speckled-trout", "tarpon", "sheepshead"],
      atlantic: ["snook", "pompano", "tarpon", "spanish-mackerel", "mangrove-snapper"],
      keys: ["tarpon", "bonefish-fl", "mangrove-snapper", "permit", "snook"],
    },
    cities: FL_CITIES,
    featured: ["key-west", "tampa-bay", "miami", "cocoa-beach"],
    regsName: "FWC regulations",
    regsUrl: "https://myfwc.com/fishing/saltwater/recreational/",
    bounds: [24.4, -87.7, 30.9, -79.9],
  },

  texas: {
    slug: "texas",
    name: "Texas",
    code: "TX",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Texas coast — Sabine Pass to South Padre, the jetties, the bays and the surf, every station in NOAA's network.",
    regions: [
      { key: "upper-coast", name: "Upper Coast" },
      { key: "mid-coast", name: "Middle Coast" },
      { key: "lower-coast", name: "Lower Coast" },
    ],
    regionFor: (lat) => (lat >= 28.8 ? "upper-coast" : lat >= 27.3 ? "mid-coast" : "lower-coast"),
    regionSpecies: {
      "upper-coast": ["redfish", "speckled-trout", "black-drum", "southern-flounder", "sheepshead"],
      "mid-coast": ["redfish", "speckled-trout", "black-drum", "southern-flounder", "spanish-mackerel"],
      "lower-coast": ["redfish", "speckled-trout", "snook", "black-drum", "tarpon"],
    },
    cities: TX_CITIES,
    featured: ["galveston", "port-aransas", "freeport"],
    regsName: "TPWD regulations",
    regsUrl: "https://tpwd.texas.gov/regulations/outdoor-annual/fishing/saltwater-fishing",
    bounds: [25.9, -97.6, 30.1, -93.5],
  },
  georgia: {
    slug: "georgia",
    name: "Georgia",
    code: "GA",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Georgia coast — Tybee to Cumberland, the Golden Isles and the biggest tides on the South Atlantic, every station in NOAA's network.",
    regions: [
      { key: "savannah-coast", name: "Savannah Coast" },
      { key: "golden-isles", name: "Golden Isles" },
    ],
    regionFor: (lat) => (lat >= 31.6 ? "savannah-coast" : "golden-isles"),
    regionSpecies: {
      "savannah-coast": ["redfish", "speckled-trout", "whiting", "southern-flounder", "bluefish"],
      "golden-isles": ["redfish", "speckled-trout", "whiting", "southern-flounder", "tarpon"],
    },
    cities: GA_CITIES,
    featured: ["tybee-island", "st-simons-island", "jekyll-island"],
    regsName: "Georgia DNR regulations",
    regsUrl: "https://georgiawildlife.com/fishing/saltwater",
    bounds: [30.6, -81.8, 32.3, -80.7],
  },
  "south-carolina": {
    slug: "south-carolina",
    name: "South Carolina",
    code: "SC",
    description:
      "Live NOAA tide predictions and fishing forecasts for the South Carolina coast — the Grand Strand piers, Charleston's jetties and the Lowcountry sounds, every station in NOAA's network.",
    regions: [
      { key: "grand-strand", name: "Grand Strand" },
      { key: "lowcountry", name: "Lowcountry" },
    ],
    regionFor: (lat) => (lat >= 33.2 ? "grand-strand" : "lowcountry"),
    regionSpecies: {
      "grand-strand": ["whiting", "bluefish", "spanish-mackerel", "king-mackerel", "redfish"],
      lowcountry: ["redfish", "speckled-trout", "southern-flounder", "sheepshead", "cobia"],
    },
    cities: SC_CITIES,
    featured: ["charleston", "myrtle-beach", "hilton-head-island"],
    regsName: "SCDNR regulations",
    regsUrl: "https://www.dnr.sc.gov/regulations.html",
    bounds: [32.0, -81.2, 33.9, -78.5],
  },
  "north-carolina": {
    slug: "north-carolina",
    name: "North Carolina",
    code: "NC",
    description:
      "Live NOAA tide predictions and fishing forecasts for the North Carolina coast — the Outer Banks, Cape Hatteras, the Crystal Coast and the Cape Fear beaches, every station in NOAA's network.",
    regions: [
      { key: "outer-banks", name: "Outer Banks" },
      { key: "crystal-coast", name: "Crystal Coast" },
      { key: "cape-fear", name: "Cape Fear Coast" },
    ],
    regionFor: (lat) => (lat >= 35.0 ? "outer-banks" : lat >= 34.5 ? "crystal-coast" : "cape-fear"),
    regionSpecies: {
      "outer-banks": ["redfish", "bluefish", "spanish-mackerel", "striped-bass", "cobia"],
      "crystal-coast": ["redfish", "speckled-trout", "southern-flounder", "spanish-mackerel", "sheepshead"],
      "cape-fear": ["redfish", "southern-flounder", "speckled-trout", "king-mackerel", "whiting"],
    },
    cities: NC_CITIES,
    featured: ["nags-head", "cape-hatteras", "wrightsville-beach"],
    regsName: "NC Marine Fisheries regulations",
    regsUrl: "https://www.deq.nc.gov/about/divisions/marine-fisheries/recreational-fishing",
    bounds: [33.8, -78.6, 36.6, -75.4],
  },
};

export const STATE_SLUGS = Object.keys(STATES);

export function getState(slug: string): StateConfig | undefined {
  return STATES[slug];
}

export function stateCodeFor(stateSlug: string): string {
  return STATES[stateSlug]?.code ?? "US";
}
