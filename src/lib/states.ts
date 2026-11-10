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

const WA_CITIES: [string, number, number][] = [
  ["Blaine", 48.99, -122.75], ["Birch Bay", 48.92, -122.75],
  ["Bellingham", 48.75, -122.48], ["Anacortes", 48.51, -122.61],
  ["Friday Harbor", 48.53, -123.01], ["Eastsound", 48.7, -122.91],
  ["La Conner", 48.39, -122.5], ["Oak Harbor", 48.29, -122.64],
  ["Coupeville", 48.22, -122.69], ["Langley", 48.04, -122.41],
  ["Everett", 47.98, -122.2], ["Mukilteo", 47.95, -122.3],
  ["Edmonds", 47.81, -122.38], ["Kingston", 47.8, -122.5],
  ["Seattle", 47.6, -122.34], ["Bainbridge Island", 47.63, -122.52],
  ["Bremerton", 47.57, -122.63], ["Port Orchard", 47.54, -122.64],
  ["Des Moines", 47.4, -122.33], ["Vashon", 47.45, -122.46],
  ["Gig Harbor", 47.33, -122.58], ["Tacoma", 47.25, -122.44],
  ["Steilacoom", 47.17, -122.6], ["Olympia", 47.04, -122.9],
  ["Shelton", 47.22, -123.1], ["Hoodsport", 47.41, -123.14],
  ["Brinnon", 47.68, -122.9], ["Quilcene", 47.82, -122.88],
  ["Port Ludlow", 47.92, -122.69], ["Port Townsend", 48.12, -122.76],
  ["Sequim", 48.08, -123.1], ["Port Angeles", 48.12, -123.43],
  ["Sekiu", 48.26, -124.3], ["Neah Bay", 48.37, -124.62],
  ["La Push", 47.91, -124.64], ["Taholah", 47.35, -124.29],
  ["Moclips", 47.24, -124.22], ["Ocean Shores", 46.97, -124.16],
  ["Aberdeen", 46.98, -123.82], ["Hoquiam", 46.98, -123.89],
  ["Westport", 46.89, -124.1], ["Grayland", 46.8, -124.09],
  ["Tokeland", 46.71, -123.98], ["Raymond", 46.69, -123.73],
  ["South Bend", 46.66, -123.8], ["Ocean Park", 46.49, -124.05],
  ["Long Beach", 46.35, -124.05], ["Ilwaco", 46.31, -124.04],
  ["Chinook", 46.27, -123.95], ["Cathlamet", 46.2, -123.38],
  ["Longview", 46.14, -122.94], ["Vancouver", 45.63, -122.67],
];

const OR_CITIES: [string, number, number][] = [
  ["Astoria", 46.19, -123.83], ["Warrenton", 46.17, -123.92],
  ["Hammond", 46.2, -123.95], ["Seaside", 45.99, -123.92],
  ["Cannon Beach", 45.89, -123.96], ["Manzanita", 45.72, -123.93],
  ["Nehalem", 45.72, -123.89], ["Wheeler", 45.69, -123.88],
  ["Rockaway Beach", 45.61, -123.94], ["Garibaldi", 45.56, -123.91],
  ["Bay City", 45.52, -123.89], ["Tillamook", 45.46, -123.84],
  ["Netarts", 45.43, -123.95], ["Pacific City", 45.2, -123.96],
  ["Neskowin", 45.1, -123.98], ["Lincoln City", 44.96, -124.01],
  ["Depoe Bay", 44.81, -124.06], ["Newport", 44.64, -124.05],
  ["Toledo", 44.62, -123.94], ["Waldport", 44.43, -124.07],
  ["Yachats", 44.31, -124.1], ["Florence", 43.98, -124.1],
  ["Reedsport", 43.7, -124.1], ["Winchester Bay", 43.68, -124.18],
  ["North Bend", 43.41, -124.22], ["Coos Bay", 43.37, -124.22],
  ["Charleston", 43.34, -124.33], ["Bandon", 43.12, -124.41],
  ["Port Orford", 42.75, -124.5], ["Gold Beach", 42.41, -124.42],
  ["Brookings", 42.05, -124.27], ["St. Helens", 45.86, -122.81],
  ["Portland", 45.52, -122.68],
];

const LA_CITIES: [string, number, number][] = [
  ["Holly Beach", 29.77, -93.46], ["Cameron", 29.8, -93.33],
  ["Hackberry", 30.0, -93.34], ["Lake Charles", 30.23, -93.22],
  ["Grand Chenier", 29.77, -92.98], ["Pecan Island", 29.66, -92.43],
  ["Intracoastal City", 29.79, -92.15], ["Delcambre", 29.95, -91.99],
  ["Cypremort Point", 29.73, -91.85], ["Morgan City", 29.7, -91.21],
  ["Houma", 29.6, -90.72], ["Dulac", 29.39, -90.71],
  ["Chauvin", 29.44, -90.6], ["Cocodrie", 29.25, -90.66],
  ["Leeville", 29.25, -90.21], ["Port Fourchon", 29.11, -90.2],
  ["Grand Isle", 29.24, -90.0], ["Lafitte", 29.67, -90.1],
  ["Port Sulphur", 29.48, -89.69], ["Empire", 29.39, -89.6],
  ["Venice", 29.28, -89.35], ["Pointe a la Hache", 29.58, -89.8],
  ["Hopedale", 29.89, -89.65], ["Delacroix", 29.76, -89.79],
  ["New Orleans", 29.95, -90.07], ["Slidell", 30.28, -89.78],
  ["Mandeville", 30.36, -90.07], ["Madisonville", 30.4, -90.16],
];

const MS_CITIES: [string, number, number][] = [
  ["Waveland", 30.29, -89.38], ["Bay St. Louis", 30.31, -89.33],
  ["Pass Christian", 30.32, -89.25], ["Long Beach", 30.35, -89.15],
  ["Gulfport", 30.37, -89.09], ["Biloxi", 30.4, -88.89],
  ["D'Iberville", 30.43, -88.89], ["Ocean Springs", 30.41, -88.83],
  ["Gautier", 30.39, -88.61], ["Pascagoula", 30.37, -88.56],
  ["Moss Point", 30.41, -88.53],
];

const AL_CITIES: [string, number, number][] = [
  ["Bayou La Batre", 30.4, -88.25], ["Coden", 30.38, -88.23],
  ["Dauphin Island", 30.25, -88.11], ["Theodore", 30.55, -88.17],
  ["Mobile", 30.69, -88.04], ["Spanish Fort", 30.67, -87.92],
  ["Daphne", 30.6, -87.9], ["Fairhope", 30.52, -87.9],
  ["Point Clear", 30.48, -87.92], ["Magnolia Springs", 30.4, -87.78],
  ["Bon Secour", 30.31, -87.73], ["Fort Morgan", 30.23, -88.02],
  ["Gulf Shores", 30.25, -87.7], ["Orange Beach", 30.29, -87.57],
  ["Elberta", 30.41, -87.6],
];

const VA_CITIES: [string, number, number][] = [
  ["Chincoteague", 37.93, -75.38], ["Wachapreague", 37.6, -75.69],
  ["Oyster", 37.29, -75.92], ["Cape Charles", 37.27, -76.02],
  ["Onancock", 37.71, -75.75], ["Saxis", 37.92, -75.72],
  ["Reedville", 37.84, -76.28], ["Kilmarnock", 37.71, -76.38],
  ["Deltaville", 37.55, -76.33], ["Gloucester Point", 37.25, -76.5],
  ["Yorktown", 37.24, -76.51], ["Poquoson", 37.12, -76.35],
  ["Hampton", 37.03, -76.35], ["Newport News", 36.98, -76.43],
  ["Norfolk", 36.85, -76.29], ["Portsmouth", 36.84, -76.3],
  ["Virginia Beach", 36.85, -75.98], ["Sandbridge", 36.73, -75.94],
  ["Smithfield", 36.98, -76.63], ["Williamsburg", 37.27, -76.71],
  ["Urbanna", 37.64, -76.57], ["Colonial Beach", 38.25, -76.96],
  ["Fredericksburg", 38.3, -77.46], ["Alexandria", 38.8, -77.05],
];

const MD_CITIES: [string, number, number][] = [
  ["Ocean City", 38.34, -75.08], ["Berlin", 38.32, -75.22],
  ["Crisfield", 37.98, -75.85], ["Deal Island", 38.16, -75.95],
  ["Cambridge", 38.56, -76.08], ["Tilghman Island", 38.71, -76.34],
  ["St. Michaels", 38.79, -76.22], ["Easton", 38.77, -76.08],
  ["Kent Island", 38.95, -76.32], ["Rock Hall", 39.14, -76.24],
  ["Chestertown", 39.21, -76.07], ["Havre de Grace", 39.55, -76.09],
  ["Baltimore", 39.28, -76.61], ["Annapolis", 38.98, -76.49],
  ["Deale", 38.78, -76.55], ["Chesapeake Beach", 38.69, -76.53],
  ["Solomons", 38.32, -76.45], ["Lexington Park", 38.27, -76.45],
  ["Point Lookout", 38.04, -76.32], ["Leonardtown", 38.29, -76.64],
  ["Washington", 38.89, -77.03],
];

const DE_CITIES: [string, number, number][] = [
  ["Fenwick Island", 38.46, -75.05], ["Bethany Beach", 38.54, -75.06],
  ["Rehoboth Beach", 38.72, -75.08], ["Lewes", 38.77, -75.14],
  ["Milford", 38.91, -75.43], ["Bowers", 39.06, -75.4],
  ["Dover", 39.16, -75.52], ["Leipsic", 39.24, -75.52],
  ["Woodland Beach", 39.33, -75.47], ["Delaware City", 39.58, -75.59],
  ["New Castle", 39.66, -75.57], ["Wilmington", 39.74, -75.55],
];

const NJ_CITIES: [string, number, number][] = [
  ["Keansburg", 40.44, -74.13], ["Highlands", 40.4, -73.99],
  ["Perth Amboy", 40.51, -74.27], ["Long Branch", 40.3, -73.99],
  ["Asbury Park", 40.22, -74.01], ["Belmar", 40.18, -74.02],
  ["Manasquan", 40.12, -74.05], ["Point Pleasant Beach", 40.09, -74.05],
  ["Seaside Heights", 39.94, -74.07], ["Toms River", 39.95, -74.2],
  ["Barnegat Light", 39.76, -74.11], ["Forked River", 39.84, -74.19],
  ["Beach Haven", 39.56, -74.24], ["Tuckerton", 39.6, -74.34],
  ["Brigantine", 39.41, -74.36], ["Atlantic City", 39.36, -74.42],
  ["Ventnor", 39.34, -74.48], ["Margate", 39.33, -74.5],
  ["Ocean City", 39.28, -74.57], ["Sea Isle City", 39.15, -74.69],
  ["Avalon", 39.1, -74.72], ["Stone Harbor", 39.05, -74.76],
  ["Wildwood", 38.99, -74.81], ["Cape May", 38.94, -74.91],
  ["Villas", 39.03, -74.94], ["Fortescue", 39.24, -75.17],
  ["Salem", 39.57, -75.47], ["Camden", 39.93, -75.12],
  ["Trenton", 40.22, -74.76], ["Jersey City", 40.72, -74.05],
  ["Hoboken", 40.74, -74.03], ["Bayonne", 40.67, -74.11],
];

const NY_CITIES: [string, number, number][] = [
  ["Staten Island", 40.58, -74.15], ["Coney Island", 40.57, -73.98],
  ["Manhattan", 40.75, -73.99], ["Brooklyn", 40.65, -73.95],
  ["Queens", 40.73, -73.79], ["Bronx", 40.84, -73.86],
  ["City Island", 40.85, -73.79], ["Yonkers", 40.93, -73.9],
  ["Nyack", 41.09, -73.92], ["Peekskill", 41.29, -73.92],
  ["Newburgh", 41.5, -74.01], ["Poughkeepsie", 41.7, -73.93],
  ["Kingston", 41.93, -73.97], ["Albany", 42.65, -73.75],
  ["Rockaway", 40.58, -73.82], ["Long Beach", 40.59, -73.66],
  ["Freeport", 40.66, -73.58], ["Babylon", 40.7, -73.33],
  ["Fire Island", 40.64, -73.16], ["Patchogue", 40.77, -73.02],
  ["Moriches", 40.81, -72.82], ["Hampton Bays", 40.87, -72.52],
  ["Southampton", 40.88, -72.39], ["Sag Harbor", 41.0, -72.29],
  ["East Hampton", 40.96, -72.18], ["Montauk", 41.04, -71.95],
  ["Greenport", 41.1, -72.36], ["Orient", 41.14, -72.3],
  ["Mattituck", 41.0, -72.54], ["Port Jefferson", 40.95, -73.07],
  ["Northport", 40.9, -73.34], ["Huntington", 40.87, -73.43],
  ["Oyster Bay", 40.87, -73.53], ["Glen Cove", 40.86, -73.63],
  ["Port Washington", 40.83, -73.7],
];

const CT_CITIES: [string, number, number][] = [
  ["Greenwich", 41.03, -73.63], ["Stamford", 41.05, -73.54],
  ["Norwalk", 41.1, -73.42], ["Westport", 41.14, -73.36],
  ["Fairfield", 41.14, -73.26], ["Bridgeport", 41.18, -73.19],
  ["Stratford", 41.18, -73.13], ["Milford", 41.22, -73.06],
  ["New Haven", 41.3, -72.92], ["Branford", 41.28, -72.81],
  ["Guilford", 41.28, -72.68], ["Madison", 41.28, -72.6],
  ["Clinton", 41.28, -72.53], ["Westbrook", 41.28, -72.45],
  ["Old Saybrook", 41.29, -72.38], ["Old Lyme", 41.32, -72.33],
  ["Niantic", 41.33, -72.19], ["New London", 41.36, -72.1],
  ["Groton", 41.35, -72.08], ["Mystic", 41.35, -71.97],
  ["Stonington", 41.34, -71.91], ["Essex", 41.35, -72.39],
  ["East Haddam", 41.45, -72.46], ["Middletown", 41.56, -72.65],
  ["Hartford", 41.76, -72.67],
];

const RI_CITIES: [string, number, number][] = [
  ["Westerly", 41.38, -71.83], ["Watch Hill", 41.31, -71.86],
  ["Charlestown", 41.38, -71.64], ["Point Judith", 41.36, -71.48],
  ["Narragansett", 41.43, -71.46], ["Wickford", 41.57, -71.45],
  ["East Greenwich", 41.66, -71.46], ["Warwick", 41.7, -71.42],
  ["Providence", 41.82, -71.41], ["East Providence", 41.81, -71.37],
  ["Bristol", 41.67, -71.27], ["Portsmouth", 41.6, -71.25],
  ["Tiverton", 41.63, -71.21], ["Newport", 41.49, -71.31],
  ["Jamestown", 41.5, -71.37], ["Little Compton", 41.51, -71.17],
  ["Block Island", 41.17, -71.56],
];

const MA_CITIES: [string, number, number][] = [
  ["Newburyport", 42.81, -70.88], ["Plum Island", 42.75, -70.8],
  ["Ipswich", 42.68, -70.84], ["Rockport", 42.66, -70.62],
  ["Gloucester", 42.61, -70.66], ["Marblehead", 42.5, -70.86],
  ["Salem", 42.52, -70.9], ["Lynn", 42.46, -70.95],
  ["Revere", 42.41, -71.0], ["Boston", 42.36, -71.05],
  ["Quincy", 42.25, -71.0], ["Hull", 42.3, -70.9],
  ["Cohasset", 42.24, -70.8], ["Scituate", 42.2, -70.73],
  ["Marshfield", 42.09, -70.71], ["Duxbury", 42.04, -70.67],
  ["Plymouth", 41.96, -70.67], ["Sandwich", 41.76, -70.5],
  ["Barnstable", 41.7, -70.3], ["Hyannis", 41.65, -70.28],
  ["Dennis", 41.73, -70.19], ["Wellfleet", 41.94, -70.03],
  ["Provincetown", 42.05, -70.19], ["Orleans", 41.79, -69.99],
  ["Chatham", 41.68, -69.96], ["Harwich", 41.69, -70.08],
  ["Falmouth", 41.55, -70.62], ["Woods Hole", 41.52, -70.67],
  ["Bourne", 41.74, -70.6], ["Wareham", 41.76, -70.72],
  ["Marion", 41.7, -70.76], ["New Bedford", 41.64, -70.93],
  ["Westport", 41.51, -71.07], ["Fall River", 41.7, -71.16],
  ["Vineyard Haven", 41.45, -70.6], ["Edgartown", 41.39, -70.51],
  ["Menemsha", 41.35, -70.77], ["Nantucket", 41.28, -70.1],
];

const NH_CITIES: [string, number, number][] = [
  ["Seabrook", 42.89, -70.87], ["Hampton", 42.94, -70.84],
  ["North Hampton", 42.97, -70.83], ["Rye", 43.01, -70.77],
  ["New Castle", 43.07, -70.72], ["Portsmouth", 43.07, -70.76],
  ["Newington", 43.1, -70.83], ["Dover", 43.2, -70.87],
  ["Durham", 43.13, -70.93], ["Exeter", 42.98, -70.95],
];

const ME_CITIES: [string, number, number][] = [
  ["Kittery", 43.09, -70.74], ["York", 43.16, -70.65],
  ["Ogunquit", 43.25, -70.6], ["Wells", 43.32, -70.58],
  ["Kennebunkport", 43.36, -70.48], ["Biddeford Pool", 43.44, -70.36],
  ["Saco", 43.5, -70.44], ["Old Orchard Beach", 43.52, -70.38],
  ["Scarborough", 43.58, -70.33], ["Cape Elizabeth", 43.56, -70.2],
  ["South Portland", 43.64, -70.24], ["Portland", 43.66, -70.26],
  ["Falmouth", 43.73, -70.24], ["Freeport", 43.86, -70.1],
  ["Harpswell", 43.8, -69.98], ["Bath", 43.91, -69.82],
  ["Phippsburg", 43.82, -69.81], ["Boothbay Harbor", 43.85, -69.63],
  ["Damariscotta", 44.03, -69.53], ["Friendship", 43.98, -69.33],
  ["Port Clyde", 43.93, -69.26], ["Rockland", 44.1, -69.11],
  ["Camden", 44.21, -69.06], ["Belfast", 44.43, -69.0],
  ["Bucksport", 44.57, -68.8], ["Castine", 44.39, -68.8],
  ["Stonington", 44.16, -68.67], ["Blue Hill", 44.41, -68.59],
  ["Southwest Harbor", 44.28, -68.33], ["Bar Harbor", 44.39, -68.2],
  ["Ellsworth", 44.54, -68.42], ["Winter Harbor", 44.39, -68.08],
  ["Milbridge", 44.53, -67.88], ["Jonesport", 44.53, -67.6],
  ["Machias", 44.72, -67.46], ["Lubec", 44.86, -66.98],
  ["Eastport", 44.91, -66.99],
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
  washington: {
    slug: "washington",
    name: "Washington",
    code: "WA",
    description:
      "Live NOAA tide predictions and fishing forecasts for Washington's salt water: Puget Sound, the San Juans, the Strait of Juan de Fuca, the outer coast and the lower Columbia, every station in NOAA's network.",
    regions: [
      { key: "puget-sound", name: "Puget Sound & San Juans" },
      { key: "strait", name: "Strait of Juan de Fuca" },
      { key: "outer-coast", name: "Outer Coast" },
      { key: "columbia-river", name: "Lower Columbia River" },
    ],
    regionFor: (lat, lon) =>
      lat < 46.4 && lon > -123.6
        ? "columbia-river"
        : lon < -123.7 && lat < 48.0
          ? "outer-coast"
          : lat >= 48.0 && lon < -123.3
            ? "strait"
            : "puget-sound",
    regionSpecies: {
      "puget-sound": ["salmon", "dungeness-crab", "lingcod", "cabezon"],
      strait: ["salmon", "lingcod", "rockfish", "cabezon", "dungeness-crab"],
      "outer-coast": ["salmon", "dungeness-crab", "rockfish", "lingcod", "redtail-surfperch"],
      "columbia-river": ["salmon", "white-sturgeon"],
    },
    cities: WA_CITIES,
    featured: ["seattle", "westport", "port-townsend"],
    regsName: "WDFW regulations",
    regsUrl: "https://wdfw.wa.gov/fishing/regulations",
    bounds: [45.5, -124.8, 49.0, -122.0],
  },
  oregon: {
    slug: "oregon",
    name: "Oregon",
    code: "OR",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Oregon coast: the Columbia River mouth, Tillamook, Yaquina and Coos bays, and the south coast rivers, every station in NOAA's network.",
    regions: [
      { key: "north-coast", name: "North Coast" },
      { key: "central-coast", name: "Central Coast" },
      { key: "south-coast", name: "South Coast" },
      { key: "columbia-river", name: "Columbia & Willamette" },
    ],
    regionFor: (lat, lon) =>
      lat >= 45.3 && lon > -123.6
        ? "columbia-river"
        : lat >= 45.0
          ? "north-coast"
          : lat >= 43.6
            ? "central-coast"
            : "south-coast",
    regionSpecies: {
      "north-coast": ["salmon", "dungeness-crab", "rockfish", "lingcod", "redtail-surfperch"],
      "central-coast": ["dungeness-crab", "rockfish", "lingcod", "redtail-surfperch", "salmon"],
      "south-coast": ["dungeness-crab", "rockfish", "lingcod", "redtail-surfperch", "salmon"],
      "columbia-river": ["salmon", "white-sturgeon"],
    },
    cities: OR_CITIES,
    featured: ["astoria", "newport", "coos-bay"],
    regsName: "ODFW regulations",
    regsUrl: "https://myodfw.com/fishing/regulations",
    bounds: [42.0, -124.6, 46.3, -122.6],
  },
  louisiana: {
    slug: "louisiana",
    name: "Louisiana",
    code: "LA",
    description:
      "Live NOAA tide predictions and fishing forecasts for coastal Louisiana: Calcasieu and Cameron, Vermilion and Terrebonne bays, Grand Isle, Barataria, the river delta and Lake Pontchartrain, every station in NOAA's network.",
    regions: [
      { key: "southwest", name: "Southwest Louisiana" },
      { key: "central", name: "Vermilion, Atchafalaya & Terrebonne" },
      { key: "southeast", name: "Southeast Louisiana" },
    ],
    regionFor: (_lat, lon) => (lon <= -91.8 ? "southwest" : lon <= -90.2 ? "central" : "southeast"),
    regionSpecies: {
      southwest: ["speckled-trout", "redfish", "southern-flounder", "black-drum", "sheepshead"],
      central: ["redfish", "speckled-trout", "southern-flounder", "black-drum", "sheepshead"],
      southeast: ["speckled-trout", "redfish", "southern-flounder", "sheepshead", "black-drum"],
    },
    cities: LA_CITIES,
    featured: ["grand-isle", "cocodrie", "cameron"],
    regsName: "LDWF regulations",
    regsUrl: "https://www.wlf.louisiana.gov/page/recreational-saltwater-finfish",
    bounds: [28.9, -93.9, 30.4, -88.8],
  },
  mississippi: {
    slug: "mississippi",
    name: "Mississippi",
    code: "MS",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Mississippi Gulf Coast: Bay St. Louis to Pascagoula, Mississippi Sound and the barrier islands, every station in NOAA's network.",
    regions: [{ key: "mississippi-sound", name: "Mississippi Sound" }],
    regionFor: () => "mississippi-sound",
    regionSpecies: {
      "mississippi-sound": ["speckled-trout", "redfish", "southern-flounder", "sheepshead", "spanish-mackerel"],
    },
    cities: MS_CITIES,
    featured: ["biloxi", "gulfport", "pascagoula"],
    regsName: "MDMR regulations",
    regsUrl: "https://dmr.ms.gov/recreational-fishing/",
    bounds: [30.1, -89.7, 30.5, -88.3],
  },
  alabama: {
    slug: "alabama",
    name: "Alabama",
    code: "AL",
    description:
      "Live NOAA tide predictions and fishing forecasts for coastal Alabama: Mobile Bay, Dauphin Island, Fort Morgan, Gulf Shores and Orange Beach, every station in NOAA's network.",
    regions: [
      { key: "mobile-bay", name: "Mobile Bay & Dauphin Island" },
      { key: "gulf-beaches", name: "Gulf Shores & Orange Beach" },
    ],
    regionFor: (lat, lon) => (lon > -87.85 && lat < 30.4 ? "gulf-beaches" : "mobile-bay"),
    regionSpecies: {
      "mobile-bay": ["speckled-trout", "redfish", "southern-flounder", "sheepshead", "black-drum"],
      "gulf-beaches": ["pompano", "spanish-mackerel", "redfish", "king-mackerel", "cobia"],
    },
    cities: AL_CITIES,
    featured: ["dauphin-island", "gulf-shores", "mobile"],
    regsName: "Alabama Marine Resources regulations",
    regsUrl: "https://www.outdooralabama.com/fishing/saltwater-recreational-size-creel-limits",
    bounds: [30.2, -88.4, 31.0, -87.5],
  },
  "virginia": {
    slug: "virginia",
    name: "Virginia",
    code: "VA",
    description:
      "Live NOAA tide predictions and fishing forecasts for Virginia's tidal water: Virginia Beach, the mouth of the Chesapeake, the Eastern Shore and the bay's rivers, every station in NOAA's network.",
    regions: [
      { key: "virginia-beach", name: "Virginia Beach & Oceanfront" },
      { key: "chesapeake-bay", name: "Chesapeake Bay & Rivers" },
      { key: "eastern-shore", name: "Eastern Shore" },
    ],
    regionFor: (lat, lon) => (lon > -75.8 && lat > 37.0 ? "eastern-shore" : lon > -76.05 && lat < 36.95 ? "virginia-beach" : "chesapeake-bay"),
    regionSpecies: {
      "virginia-beach": ["summer-flounder", "bluefish", "atlantic-croaker", "redfish", "spanish-mackerel"],
      "chesapeake-bay": ["atlantic-croaker", "summer-flounder", "striped-bass-atlantic", "speckled-trout", "cobia"],
      "eastern-shore": ["summer-flounder", "black-sea-bass", "redfish", "bluefish", "tautog"],
    },
    cities: VA_CITIES,
    featured: ["virginia-beach", "chesapeake-bay-bridge-tunnel", "chincoteague"],
    regsName: "VMRC regulations",
    regsUrl: "https://mrc.virginia.gov/regulations/swrecfishingrules.shtm",
    bounds: [36.5, -77.5, 38.9, -75.2],
  },
  "maryland": {
    slug: "maryland",
    name: "Maryland",
    code: "MD",
    description:
      "Live NOAA tide predictions and fishing forecasts for Maryland's tidal water: Ocean City and the coastal bays, and the Chesapeake from the Susquehanna Flats to Point Lookout, every station in NOAA's network.",
    regions: [
      { key: "chesapeake", name: "Chesapeake Bay & Rivers" },
      { key: "coastal-bays", name: "Ocean City & Coastal Bays" },
    ],
    regionFor: (_lat, lon) => (lon > -75.3 ? "coastal-bays" : "chesapeake"),
    regionSpecies: {
      "chesapeake": ["striped-bass-atlantic", "atlantic-croaker", "bluefish", "summer-flounder"],
      "coastal-bays": ["summer-flounder", "striped-bass-atlantic", "tautog", "black-sea-bass", "bluefish"],
    },
    cities: MD_CITIES,
    featured: ["ocean-city", "annapolis", "solomons-island"],
    regsName: "Maryland DNR regulations",
    regsUrl: "https://dnr.maryland.gov/fisheries/pages/regulations/index.aspx",
    bounds: [37.9, -77.3, 39.7, -75.0],
  },
  "delaware": {
    slug: "delaware",
    name: "Delaware",
    code: "DE",
    description:
      "Live NOAA tide predictions and fishing forecasts for Delaware: the Delaware River and Bay, Lewes and Cape Henlopen, Indian River Inlet and the inland bays, every station in NOAA's network.",
    regions: [
      { key: "delaware-bay", name: "Delaware River & Bay" },
      { key: "beaches-inland-bays", name: "Beaches & Inland Bays" },
    ],
    regionFor: (lat) => (lat >= 38.75 ? "delaware-bay" : "beaches-inland-bays"),
    regionSpecies: {
      "delaware-bay": ["striped-bass-atlantic", "summer-flounder", "weakfish", "atlantic-croaker", "bluefish"],
      "beaches-inland-bays": ["summer-flounder", "striped-bass-atlantic", "tautog", "bluefish", "black-sea-bass"],
    },
    cities: DE_CITIES,
    featured: ["lewes", "indian-river-inlet", "delaware-city"],
    regsName: "DNREC fishing regulations",
    regsUrl: "https://dnrec.delaware.gov/fish-wildlife/fishing/",
    bounds: [38.4, -75.8, 39.8, -75.0],
  },
  "new-jersey": {
    slug: "new-jersey",
    name: "New Jersey",
    code: "NJ",
    description:
      "Live NOAA tide predictions and fishing forecasts for New Jersey: Sandy Hook to Cape May, the inlets and back bays of the Jersey Shore, Delaware Bay and the tidal rivers, every station in NOAA's network.",
    regions: [
      { key: "north-shore", name: "North Jersey Shore" },
      { key: "south-shore", name: "South Jersey Shore" },
      { key: "delaware-bay", name: "Delaware Bay & River" },
    ],
    regionFor: (lat, lon) => (lon <= -74.9 || (lat > 39.8 && lon < -74.6) ? "delaware-bay" : lat >= 39.8 ? "north-shore" : "south-shore"),
    regionSpecies: {
      "north-shore": ["striped-bass-atlantic", "summer-flounder", "bluefish", "black-sea-bass", "tautog"],
      "south-shore": ["summer-flounder", "striped-bass-atlantic", "bluefish", "weakfish", "black-sea-bass"],
      "delaware-bay": ["striped-bass-atlantic", "summer-flounder", "weakfish", "atlantic-croaker"],
    },
    cities: NJ_CITIES,
    featured: ["sandy-hook", "atlantic-city", "cape-may"],
    regsName: "NJ Fish & Wildlife marine regulations",
    regsUrl: "https://dep.nj.gov/njfw/fishing/marine/",
    bounds: [38.9, -75.6, 41.0, -73.9],
  },
  "new-york": {
    slug: "new-york",
    name: "New York",
    code: "NY",
    description:
      "Live NOAA tide predictions and fishing forecasts for New York's tidal water: New York Harbor, the Hudson up to Albany, and Long Island's South Shore, North Shore and East End, every station in NOAA's network.",
    regions: [
      { key: "nyc-harbor", name: "New York Harbor" },
      { key: "hudson-river", name: "Hudson River" },
      { key: "south-shore", name: "Long Island South Shore" },
      { key: "north-shore-east-end", name: "Long Island North Shore & East End" },
    ],
    regionFor: (lat, lon) => (lon < -73.7 && lat > 40.95 ? "hudson-river" : lon < -73.75 ? "nyc-harbor" : lat < 40.87 ? "south-shore" : "north-shore-east-end"),
    regionSpecies: {
      "nyc-harbor": ["striped-bass-atlantic", "bluefish", "summer-flounder", "scup", "black-sea-bass"],
      "hudson-river": ["striped-bass-atlantic"],
      "south-shore": ["striped-bass-atlantic", "summer-flounder", "bluefish", "weakfish", "black-sea-bass"],
      "north-shore-east-end": ["striped-bass-atlantic", "scup", "tautog", "black-sea-bass", "bluefish"],
    },
    cities: NY_CITIES,
    featured: ["new-york-city", "montauk", "jones-inlet"],
    regsName: "NYSDEC saltwater regulations",
    regsUrl: "https://dec.ny.gov/things-to-do/saltwater-fishing",
    bounds: [40.5, -74.3, 42.7, -71.8],
  },
  "connecticut": {
    slug: "connecticut",
    name: "Connecticut",
    code: "CT",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Connecticut shore of Long Island Sound, Greenwich to Stonington, and the tidal Connecticut River, every station in NOAA's network.",
    regions: [
      { key: "western", name: "Western Sound" },
      { key: "eastern", name: "Eastern Sound & Connecticut River" },
    ],
    regionFor: (lat, lon) => (lon < -72.6 && !(lon > -72.75 && lat > 41.4) ? "western" : "eastern"),
    regionSpecies: {
      "western": ["striped-bass-atlantic", "bluefish", "scup", "tautog", "summer-flounder"],
      "eastern": ["striped-bass-atlantic", "tautog", "scup", "black-sea-bass", "bluefish"],
    },
    cities: CT_CITIES,
    featured: ["new-london", "new-haven", "bridgeport"],
    regsName: "CT DEEP saltwater regulations",
    regsUrl: "https://portal.ct.gov/deep/fishing/saltwater/saltwater-fishing",
    bounds: [41.0, -73.7, 41.8, -71.8],
  },
  "rhode-island": {
    slug: "rhode-island",
    name: "Rhode Island",
    code: "RI",
    description:
      "Live NOAA tide predictions and fishing forecasts for Rhode Island: Narragansett Bay, the south coast from Watch Hill to Point Judith, and Block Island, every station in NOAA's network.",
    regions: [
      { key: "narragansett-bay", name: "Narragansett Bay" },
      { key: "south-coast", name: "South Coast & Block Island" },
    ],
    regionFor: (lat, lon) => (lat > 41.4 && lon > -71.5 ? "narragansett-bay" : "south-coast"),
    regionSpecies: {
      "narragansett-bay": ["striped-bass-atlantic", "tautog", "scup", "black-sea-bass", "bluefish"],
      "south-coast": ["striped-bass-atlantic", "tautog", "scup", "summer-flounder", "black-sea-bass"],
    },
    cities: RI_CITIES,
    featured: ["newport-rhode-island", "point-judith", "block-island"],
    regsName: "RIDEM recreational fishing",
    regsUrl: "https://dem.ri.gov/natural-resources-bureau/marine-fisheries/recreational-saltwater-fishing/recreational-saltwater",
    bounds: [41.1, -71.9, 41.9, -71.1],
  },
  "massachusetts": {
    slug: "massachusetts",
    name: "Massachusetts",
    code: "MA",
    description:
      "Live NOAA tide predictions and fishing forecasts for coastal Massachusetts: the North Shore, Boston Harbor, Cape Cod and the Canal, Buzzards Bay, Martha's Vineyard and Nantucket, every station in NOAA's network.",
    regions: [
      { key: "boston-north-shore", name: "Boston & North Shore" },
      { key: "cape-cod-islands", name: "Cape Cod & Islands" },
      { key: "south-coast", name: "South Shore & Buzzards Bay" },
    ],
    regionFor: (lat, lon) => (lat >= 42.2 ? "boston-north-shore" : lon > -70.65 ? "cape-cod-islands" : "south-coast"),
    regionSpecies: {
      "boston-north-shore": ["striped-bass-atlantic", "atlantic-mackerel", "bluefish", "winter-flounder"],
      "cape-cod-islands": ["striped-bass-atlantic", "bluefish", "scup", "black-sea-bass", "summer-flounder"],
      "south-coast": ["scup", "tautog", "black-sea-bass", "striped-bass-atlantic", "summer-flounder"],
    },
    cities: MA_CITIES,
    featured: ["boston", "cape-cod-canal", "chatham"],
    regsName: "Mass. DMF regulations",
    regsUrl: "https://www.mass.gov/info-details/recreational-saltwater-fishing-regulations",
    bounds: [41.2, -71.2, 42.9, -69.9],
  },
  "new-hampshire": {
    slug: "new-hampshire",
    name: "New Hampshire",
    code: "NH",
    description:
      "Live NOAA tide predictions and fishing forecasts for New Hampshire's seacoast: Hampton Harbor, Portsmouth and the Piscataqua, Great Bay and the Isles of Shoals, every station in NOAA's network.",
    regions: [
      { key: "seacoast", name: "Seacoast & Great Bay" },
    ],
    regionFor: () => "seacoast",
    regionSpecies: {
      "seacoast": ["striped-bass-atlantic", "atlantic-mackerel", "winter-flounder", "bluefish"],
    },
    cities: NH_CITIES,
    featured: ["portsmouth", "hampton-harbor", "isles-of-shoals"],
    regsName: "NH Fish and Game saltwater rules",
    regsUrl: "https://www.wildlife.nh.gov/saltwater-fisheries-new-hampshire/recreational-saltwater-fishing",
    bounds: [42.8, -71.0, 43.3, -70.6],
  },
  "maine": {
    slug: "maine",
    name: "Maine",
    code: "ME",
    description:
      "Live NOAA tide predictions and fishing forecasts for the Maine coast: the southern beaches, Casco Bay, Midcoast and Penobscot Bay, Mount Desert Island and Downeast to Eastport, every station in NOAA's network.",
    regions: [
      { key: "southern-maine", name: "Southern Maine & Casco Bay" },
      { key: "midcoast", name: "Midcoast & Penobscot Bay" },
      { key: "downeast", name: "Downeast" },
    ],
    regionFor: (_lat, lon) => (lon < -69.8 ? "southern-maine" : lon < -68.5 ? "midcoast" : "downeast"),
    regionSpecies: {
      "southern-maine": ["striped-bass-atlantic", "atlantic-mackerel", "bluefish"],
      "midcoast": ["atlantic-mackerel", "striped-bass-atlantic"],
      "downeast": ["atlantic-mackerel", "striped-bass-atlantic"],
    },
    cities: ME_CITIES,
    featured: ["portland", "kennebunkport", "bar-harbor"],
    regsName: "Maine DMR recreational rules",
    regsUrl: "https://www.maine.gov/dmr/fisheries/recreational/fishing-regulations-tips",
    bounds: [43.0, -71.1, 45.2, -66.9],
  },
};

export const STATE_SLUGS = Object.keys(STATES);

export function getState(slug: string): StateConfig | undefined {
  return STATES[slug];
}

/** "California, Florida, … and North Carolina", for copy that names the coverage. */
export const STATE_NAMES_TEXT = (() => {
  const n = Object.values(STATES).map((s) => s.name);
  return n.length > 1 ? `${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}` : n[0];
})();

export function stateCodeFor(stateSlug: string): string {
  return STATES[stateSlug]?.code ?? "US";
}
