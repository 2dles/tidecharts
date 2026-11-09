// Curated flagship locations for Washington and Oregon. Station IDs verified
// against NOAA mdapi (stations.json, type=tidepredictions) on 2026-11-09.
// Three per state: these feed the homepage cards and anchor the state index;
// every other station in the state is generated from the NOAA list by
// stations.ts.
//
// Intros stick to public landmarks (bays, jetties, river mouths, public docks)
// and widely documented patterns. No invented local knowledge, no
// regulations stated as fact.

import type { Location } from "./locations";

export const PNW_LOCATIONS: Location[] = [
  // ── Washington ───────────────────────────────────────────────────────────
  {
    slug: "seattle",
    name: "Seattle",
    state: "washington",
    stateName: "Washington",
    stationId: "9447130",
    stationName: "Seattle (Madison St.), Elliott Bay",
    lat: 47.603,
    lon: -122.339,
    region: "puget-sound",
    tagline: "Elliott Bay, Puget Sound and two unequal tides a day",
    intro:
      "Seattle's tides are mixed: two highs and two lows most days, and they are not the same size. The difference between the higher high and the lower low is often more than ten feet, so the lower low is the one that exposes beaches and the bigger swing is the one that moves water hardest along the Sound's points and shorelines. Puget Sound is a salmon, crab and bottomfish fishery, and Elliott Bay's public piers and shoreline parks put anglers and crabbers on deep water close to downtown.",
    speciesKeys: ["salmon", "dungeness-crab", "lingcod", "cabezon"],
    nearby: ["port-townsend", "westport"],
    aliases: ["elliott bay", "puget sound", "west seattle"],
  },
  {
    slug: "westport",
    name: "Westport",
    state: "washington",
    stateName: "Washington",
    stationId: "9441102",
    stationName: "Westport, Point Chehalis",
    lat: 46.904,
    lon: -124.105,
    region: "outer-coast",
    tagline: "The Grays Harbor entrance, the jetty and a working charter fleet",
    intro:
      "Westport sits on the south side of the Grays Harbor entrance, where a big estuary drains into the open Pacific. It is one of Washington's main ocean salmon and bottomfish ports, and the jetty, the marina docks and the surf beaches to the south give shore anglers and crabbers plenty to work. The harbor entrance can be rough on a big outgoing tide against a westerly swell; the tide table here is as much a boating tool as a fishing one.",
    speciesKeys: ["salmon", "dungeness-crab", "rockfish", "lingcod", "redtail-surfperch"],
    nearby: ["seattle", "port-townsend"],
    aliases: ["grays harbor", "westhaven", "point chehalis"],
  },
  {
    slug: "port-townsend",
    name: "Port Townsend",
    state: "washington",
    stateName: "Washington",
    stationId: "9444900",
    stationName: "Port Townsend",
    lat: 48.111,
    lon: -122.76,
    region: "puget-sound",
    tagline: "Admiralty Inlet, where Puget Sound meets the Strait",
    intro:
      "Port Townsend sits at the top of Admiralty Inlet, the main channel connecting Puget Sound with the Strait of Juan de Fuca. Nearly all of the Sound's tidal water moves past here, so currents off the points are strong and the timing of slack water matters for boaters, divers and anglers alike. Salmon, lingcod and crab are the main games, and the town's public docks and beaches make it easy to fish without a boat.",
    speciesKeys: ["salmon", "lingcod", "dungeness-crab", "cabezon"],
    nearby: ["seattle", "westport"],
    aliases: ["admiralty inlet", "port hadlock"],
  },

  // ── Oregon ───────────────────────────────────────────────────────────────
  {
    slug: "astoria",
    name: "Astoria",
    state: "oregon",
    stateName: "Oregon",
    stationId: "9439040",
    stationName: "Astoria (Tongue Point)",
    lat: 46.207,
    lon: -123.768,
    region: "north-coast",
    tagline: "The mouth of the Columbia, where river and tide fight it out",
    intro:
      "Astoria is on the Columbia River a few miles inside its mouth, and the tide here is always mixed up with the river. High river flow in spring raises water levels and shortens the flood, so actual heights can differ from the prediction more than on the open coast. The lower Columbia is famous for its late-summer salmon fishery near the mouth, and crabbing is popular in the estuary when the river runs low and salty. The Columbia River Bar is one of the most dangerous on the coast; check the bar conditions, not just the tide, before crossing.",
    speciesKeys: ["salmon", "dungeness-crab", "white-sturgeon"],
    nearby: ["newport", "coos-bay"],
    aliases: ["columbia river", "warrenton", "hammond"],
  },
  {
    slug: "newport",
    name: "Newport",
    state: "oregon",
    stateName: "Oregon",
    stationId: "9435380",
    stationName: "South Beach, Yaquina Bay",
    lat: 44.625,
    lon: -124.045,
    region: "central-coast",
    tagline: "Yaquina Bay crabbing, the jetties and the bayfront docks",
    intro:
      "Newport sits on Yaquina Bay, one of the busiest bays on the Oregon coast for recreational crabbing. Public docks and piers on the bay put crab rings in the water without a boat, and the jetties at the bay mouth hold rockfish, lingcod and greenling. Crabbing and jetty fishing both go best around slack water: crab rings stay put, and the current along the rocks eases off enough to keep a bait near the bottom.",
    speciesKeys: ["dungeness-crab", "rockfish", "lingcod", "redtail-surfperch", "salmon"],
    nearby: ["coos-bay", "astoria"],
    aliases: ["yaquina bay", "south beach", "depoe bay"],
  },
  {
    slug: "coos-bay",
    name: "Coos Bay",
    state: "oregon",
    stateName: "Oregon",
    stationId: "9432780",
    stationName: "Charleston, Coos Bay",
    lat: 43.345,
    lon: -124.322,
    region: "south-coast",
    tagline: "Oregon's biggest bay, the Charleston docks and the south jetty",
    intro:
      "Coos Bay is the largest estuary entirely in Oregon, and the tide station is at Charleston near its mouth. The bay is a major crabbing and clamming destination, the jetties at the entrance are fished for rockfish and lingcod, and the beaches north and south carry redtail surfperch through the spring. Big tides here empty the tideflats; low water is when the bay's clam beds are exposed.",
    speciesKeys: ["dungeness-crab", "rockfish", "lingcod", "redtail-surfperch", "salmon"],
    nearby: ["newport", "astoria"],
    aliases: ["charleston", "north bend", "empire"],
  },
];
