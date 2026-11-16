// Curated flagship locations for Alaska and Hawaii. Station IDs verified
// against NOAA mdapi (stations.json, type=tidepredictions) on 2026-11-16.
// Three per state: these feed the homepage cards and anchor the state index;
// every other station in the state is generated from the NOAA list by
// stations.ts.
//
// Intros stick to public landmarks (harbors, spits, bays, public parks) and
// widely documented patterns. No invented local knowledge, no regulations
// stated as fact.

import type { Location } from "./locations";

export const AKHI_LOCATIONS: Location[] = [
  // ── Alaska ───────────────────────────────────────────────────────────────
  {
    slug: "anchorage",
    name: "Anchorage",
    state: "alaska",
    stateName: "Alaska",
    stationId: "9455920",
    stationName: "Anchorage, Knik Arm",
    lat: 61.2375,
    lon: -149.8904,
    region: "southcentral",
    tagline: "Knik Arm and some of the biggest tides in the country",
    intro:
      "Anchorage sits at the head of Cook Inlet where Knik Arm and Turnagain Arm meet, and the tide here swings close to thirty feet on the big days, among the largest ranges anywhere in the United States. That much water moving twice a day means fast currents, a well-known bore tide in Turnagain Arm, and wide mudflats that drain and refill quickly; the flats are dangerous to walk, and the tide table is the first thing to read before going near them. The city's shore fishery is Ship Creek downtown, where kings and silvers run in summer and the bite is tied closely to the tide.",
    speciesKeys: ["salmon-ak"],
    nearby: ["homer", "juneau"],
    aliases: ["knik arm", "ship creek", "cook inlet", "turnagain arm"],
  },
  {
    slug: "juneau",
    name: "Juneau",
    state: "alaska",
    stateName: "Alaska",
    stationId: "9452210",
    stationName: "Juneau",
    lat: 58.2988,
    lon: -134.4106,
    region: "southeast",
    tagline: "Gastineau Channel, Auke Bay and the Inside Passage",
    intro:
      "Juneau's tide station is in Gastineau Channel, the narrow waterway between downtown and Douglas Island, and the range here runs well past fifteen feet on spring tides. The city is a salmon, halibut and crab town: Auke Bay's public harbor is the main launch for the Inside Passage waters to the north, and Douglas Island's shoreline and the channel itself get plenty of shore fishing in summer. A big outgoing tide through the channel moves a lot of water, so boaters and kayakers plan around the turn as much as anglers do.",
    speciesKeys: ["salmon-ak", "pacific-halibut", "dungeness-crab", "rockfish"],
    nearby: ["anchorage", "homer"],
    aliases: ["gastineau channel", "auke bay", "douglas"],
  },
  {
    slug: "homer",
    name: "Homer",
    state: "alaska",
    stateName: "Alaska",
    stationId: "9455558",
    stationName: "Homer, Coal Point, Kachemak Bay",
    lat: 59.6014,
    lon: -151.4106,
    region: "southcentral",
    tagline: "The Homer Spit, Kachemak Bay and the halibut fleet",
    intro:
      "Homer's station is at the end of the Spit, the long gravel bar that runs out into Kachemak Bay and holds the harbor, the charter docks and the Nick Dudiak Fishing Lagoon, a public shore fishery stocked for summer salmon. Homer calls itself the halibut capital, and the charter fleet works the bay and lower Cook Inlet on the slack water between tides, when the current eases enough to hold bottom. Kachemak Bay's range is over twenty feet on the biggest tides, so the beaches, the lagoon and the harbor approaches all change character through the day.",
    speciesKeys: ["pacific-halibut", "salmon-ak", "rockfish"],
    nearby: ["anchorage", "juneau"],
    aliases: ["homer spit", "kachemak bay", "coal point"],
  },

  // ── Hawaii ───────────────────────────────────────────────────────────────
  {
    slug: "honolulu",
    name: "Honolulu",
    state: "hawaii",
    stateName: "Hawaii",
    stationId: "1612340",
    stationName: "Honolulu",
    lat: 21.3033,
    lon: -157.8645,
    region: "oahu",
    tagline: "Honolulu Harbor, Ala Moana and the Waikiki shoreline",
    intro:
      "Honolulu's tide station is in the harbor, and the tides here are small, usually under two feet between high and low, with two unequal highs and lows a day. A small range still matters on a reef coast: the rising tide brings water and fish over the reef flats at Ala Moana, Magic Island and Waikiki, and the falling tide drains them. Shore fishing in town is whipping and dunking from the breakwalls, the Ala Wai, and the public shoreline parks, with the dawn and dusk rising tides the usual windows.",
    speciesKeys: ["papio-ulua", "oio", "moi"],
    nearby: ["kahului", "hilo"],
    aliases: ["waikiki", "ala moana", "oahu", "honolulu harbor"],
  },
  {
    slug: "kahului",
    name: "Kahului",
    state: "hawaii",
    stateName: "Hawaii",
    stationId: "1615680",
    stationName: "Kahului",
    lat: 20.8949,
    lon: -156.469,
    region: "maui-county",
    tagline: "Kahului Harbor and Maui's north shore",
    intro:
      "Kahului is Maui's commercial port, and the tide station sits in the harbor on the island's windward north shore. The range is small, about two feet on the bigger days, but the north shore takes trade-wind surf most of the year, and the combination of tide and swell decides when the harbor breakwalls and the beach parks to the east are fishable. Kanaha Beach Park next door is a public shoreline with sand and reef, the kind of ground where moi and papio feed on a rising tide.",
    speciesKeys: ["papio-ulua", "oio", "moi"],
    nearby: ["honolulu", "hilo"],
    aliases: ["maui", "kahului harbor", "kanaha"],
  },
  {
    slug: "hilo",
    name: "Hilo",
    state: "hawaii",
    stateName: "Hawaii",
    stationId: "1617760",
    stationName: "Hilo",
    lat: 19.7303,
    lon: -155.0556,
    region: "hawaii-island",
    tagline: "Hilo Bay, the breakwater and the Big Island's windward side",
    intro:
      "Hilo's station is inside Hilo Bay, behind the long breakwater that shelters the harbor from the open Pacific on the Big Island's wet, windward side. Tides are small, a couple of feet at most, with two unequal highs and lows a day. The bayfront, Coconut Island and the breakwater are the public shore spots, and the rivers that empty into the bay keep the water brackish near the mouths. The rising tide and the first of the drop are the usual windows for papio along the breakwater and the rocky points either side of the bay.",
    speciesKeys: ["papio-ulua", "moi", "oio"],
    nearby: ["kahului", "honolulu"],
    aliases: ["hilo bay", "big island", "hawaii island"],
  },
];
