// Curated flagship locations for Louisiana, Mississippi and Alabama. Station
// IDs verified against NOAA mdapi (stations.json, type=tidepredictions) on
// 2026-11-09. Three per state: these feed the homepage cards and anchor the
// state index; every other station in the state is generated from the NOAA
// list by stations.ts.
//
// Intros stick to public landmarks (barrier islands, passes, bays, public
// piers) and widely documented patterns. No invented local knowledge, no
// regulations stated as fact.

import type { Location } from "./locations";

export const GULF_LOCATIONS: Location[] = [
  // ── Louisiana ────────────────────────────────────────────────────────────
  {
    slug: "grand-isle",
    name: "Grand Isle",
    state: "louisiana",
    stateName: "Louisiana",
    stationId: "8761724",
    stationName: "East Point, Grand Isle",
    lat: 29.263,
    lon: -89.957,
    region: "southeast",
    tagline: "Louisiana's inhabited barrier island, between Barataria Bay and the Gulf",
    intro:
      "Grand Isle sits at the edge of the Gulf with Barataria Bay and its marshes behind it, so one town gives you surf, passes and back-bay fishing. Speckled trout and redfish are the main event, with sheepshead and drum around structure and flounder in the fall. The tide here is small and usually runs once a day, one high and one low, and wind can move more water than the tide does; a strong north wind empties the marsh, a south wind stacks it up.",
    speciesKeys: ["speckled-trout", "redfish", "southern-flounder", "sheepshead", "black-drum"],
    nearby: ["cocodrie", "cameron"],
    aliases: ["barataria bay", "caminada pass", "port fourchon"],
  },
  {
    slug: "cocodrie",
    name: "Cocodrie",
    state: "louisiana",
    stateName: "Louisiana",
    stationId: "8762928",
    stationName: "Cocodrie, Terrebonne Bay",
    lat: 29.245,
    lon: -90.662,
    region: "central",
    tagline: "The end of the road south of Houma, in the Terrebonne marsh",
    intro:
      "Cocodrie is at the end of the highway south of Houma, on the edge of Terrebonne Bay, and almost everything around it is marsh, bayou and open bay. It is a boat and kayak fishery: redfish in the ponds and along marsh edges, speckled trout on the bay's reefs and islands, flounder and drum in the channels. With a tide this small, moving water matters more than height; fish the stretch when it is actually falling or rising, and watch the wind.",
    speciesKeys: ["redfish", "speckled-trout", "southern-flounder", "black-drum", "sheepshead"],
    nearby: ["grand-isle", "cameron"],
    aliases: ["terrebonne bay", "houma", "chauvin"],
  },
  {
    slug: "cameron",
    name: "Cameron",
    state: "louisiana",
    stateName: "Louisiana",
    stationId: "8768094",
    stationName: "Calcasieu Pass",
    lat: 29.768,
    lon: -93.343,
    region: "southwest",
    tagline: "Calcasieu Pass, the jetties and Calcasieu Lake behind them",
    intro:
      "Cameron sits on Calcasieu Pass, the channel that connects Calcasieu Lake and the Lake Charles ship channel with the Gulf. The jetties at the pass are a shore fishery for redfish, trout, drum and sheepshead, and Calcasieu Lake behind it is a well-known speckled trout and redfish lake. Strong outgoing tides through the pass pull bait out of the lake and marsh, which is when the jetties tend to fish best.",
    speciesKeys: ["speckled-trout", "redfish", "southern-flounder", "black-drum", "sheepshead"],
    nearby: ["grand-isle", "cocodrie"],
    aliases: ["calcasieu pass", "calcasieu lake", "big lake", "lake charles", "holly beach"],
  },

  // ── Mississippi ──────────────────────────────────────────────────────────
  {
    slug: "biloxi",
    name: "Biloxi",
    state: "mississippi",
    stateName: "Mississippi",
    stationId: "8744117",
    stationName: "Biloxi",
    lat: 30.412,
    lon: -88.903,
    region: "mississippi-sound",
    tagline: "Mississippi Sound, the beachfront piers and Biloxi Bay",
    intro:
      "Biloxi faces Mississippi Sound, a shallow body of water sheltered from the open Gulf by a chain of barrier islands a few miles offshore. Public piers along the beachfront put shore anglers over the Sound for speckled trout, redfish, sheepshead and flounder, and Biloxi Bay and the Back Bay behind town add marsh edges and bridges. Tides are small and mostly once a day; wind direction changes the water level and clarity as much as the tide does.",
    speciesKeys: ["speckled-trout", "redfish", "southern-flounder", "sheepshead", "spanish-mackerel"],
    nearby: ["gulfport", "pascagoula"],
    aliases: ["biloxi bay", "back bay", "d'iberville", "ocean springs"],
  },
  {
    slug: "gulfport",
    name: "Gulfport",
    state: "mississippi",
    stateName: "Mississippi",
    stationId: "8745557",
    stationName: "Gulfport Harbor, Mississippi Sound",
    lat: 30.36,
    lon: -89.082,
    region: "mississippi-sound",
    tagline: "The harbor, the beachfront and the boats to Ship Island",
    intro:
      "Gulfport's harbor is the jumping-off point for Ship Island, the barrier island on the far side of Mississippi Sound, and the beachfront here runs for miles with public piers along it. Inside the Sound the fishing is for speckled trout, redfish, flounder and sheepshead; out at the islands the surf adds Spanish mackerel and, in the warm months, the chance of bigger Gulf fish. The tide is small and usually daily, so wind and water clarity are the bigger variables.",
    speciesKeys: ["speckled-trout", "redfish", "southern-flounder", "sheepshead", "spanish-mackerel"],
    nearby: ["biloxi", "pascagoula"],
    aliases: ["ship island", "long beach", "pass christian"],
  },
  {
    slug: "pascagoula",
    name: "Pascagoula",
    state: "mississippi",
    stateName: "Mississippi",
    stationId: "8741533",
    stationName: "Pascagoula NOAA Lab",
    lat: 30.368,
    lon: -88.563,
    region: "mississippi-sound",
    tagline: "Where the Pascagoula River meets Mississippi Sound",
    intro:
      "Pascagoula sits at the mouth of the Pascagoula River, one of the largest undammed rivers in the lower 48, where it spreads into marsh and meets Mississippi Sound. The mix of fresh and salt water makes the river mouth and the marsh edges good redfish and speckled trout country, with flounder and drum along the channels. River flow after heavy rain can push fresh, muddy water well out into the Sound and move the fish with it.",
    speciesKeys: ["speckled-trout", "redfish", "southern-flounder", "black-drum", "sheepshead"],
    nearby: ["biloxi", "gulfport"],
    aliases: ["pascagoula river", "gautier", "moss point"],
  },

  // ── Alabama ──────────────────────────────────────────────────────────────
  {
    slug: "dauphin-island",
    name: "Dauphin Island",
    state: "alabama",
    stateName: "Alabama",
    stationId: "8735180",
    stationName: "Dauphin Island",
    lat: 30.25,
    lon: -88.075,
    region: "mobile-bay",
    tagline: "The barrier island at the mouth of Mobile Bay",
    intro:
      "Dauphin Island sits across the mouth of Mobile Bay, with the Gulf on one side and Mississippi Sound and the bay on the other. Everything that moves between the bay and the Gulf passes close by, so the island's beaches and the pass at its east end hold speckled trout, redfish, flounder and sheepshead, and Spanish mackerel and cobia along the Gulf side in the warm months. The tide is small and usually once a day; the outgoing tide out of Mobile Bay is the one to watch.",
    speciesKeys: ["speckled-trout", "redfish", "southern-flounder", "spanish-mackerel", "cobia"],
    nearby: ["gulf-shores", "mobile"],
    aliases: ["fort gaines", "mobile bay entrance"],
  },
  {
    slug: "gulf-shores",
    name: "Gulf Shores",
    state: "alabama",
    stateName: "Alabama",
    stationId: "8731439",
    stationName: "Gulf Shores, ICWW",
    lat: 30.28,
    lon: -87.684,
    region: "gulf-beaches",
    tagline: "Gulf State Park Pier, the surf and the passes to Orange Beach",
    intro:
      "Gulf Shores and Orange Beach are Alabama's Gulf beaches, and the Gulf State Park Pier is the best-known place to fish them from shore. The surf holds pompano, whiting and redfish, the pier adds Spanish and king mackerel and spring cobia, and Perdido Pass at Orange Beach is the inlet that connects the back bays to the Gulf. The tide station is on the Intracoastal Waterway behind the beach rather than on the beach itself.",
    speciesKeys: ["pompano", "spanish-mackerel", "redfish", "king-mackerel", "cobia"],
    nearby: ["dauphin-island", "mobile"],
    aliases: ["orange beach", "gulf state park", "perdido pass", "fort morgan"],
  },
  {
    slug: "mobile",
    name: "Mobile",
    state: "alabama",
    stateName: "Alabama",
    stationId: "8737048",
    stationName: "Mobile State Docks, Mobile River",
    lat: 30.705,
    lon: -88.04,
    region: "mobile-bay",
    tagline: "The head of Mobile Bay and the edge of the Delta",
    intro:
      "Mobile sits at the top of Mobile Bay where the Mobile-Tensaw Delta drains into it, so the water here is brackish and changes with river flow. The upper bay and the causeway across it are a shore and kayak fishery for redfish, speckled trout and flounder when the river is low and the salt pushes north. Mobile Bay is also known for the summer \"jubilee\", when fish and crabs crowd the eastern shore's beaches on calm nights; it is a low-oxygen event, not a tide event, and can't be predicted from a tide table.",
    speciesKeys: ["redfish", "speckled-trout", "southern-flounder", "black-drum", "sheepshead"],
    nearby: ["dauphin-island", "gulf-shores"],
    aliases: ["mobile bay", "mobile river", "daphne", "fairhope", "spanish fort"],
  },
];
