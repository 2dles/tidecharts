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
};

export const STATE_SLUGS = Object.keys(STATES);

export function getState(slug: string): StateConfig | undefined {
  return STATES[slug];
}

export function stateCodeFor(stateSlug: string): string {
  return STATES[stateSlug]?.code ?? "US";
}
