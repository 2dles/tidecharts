// Alaska and Hawaii species that the other files do not already cover.
// Merged into SPECIES in species.ts. Alaska reuses rockfish, lingcod and
// Dungeness crab from the California and PNW entries; the California "King
// Salmon" card is a trolling card written for the Pacific coast, so Alaska
// gets its own salmon entry covering the shore fishery too. Hawaii's inshore
// fish share nothing with the mainland lists, so all three are new.
//
// Halibut, salmon and moi all carry seasons, size rules and closures that
// change by year and by area. Cards point people at ADF&G or DAR; nothing
// here states a rule as fact. Images absent until public-domain ones are
// sourced. Gear keys are the store's universal saltwater items only; the
// store stocks nothing targeted at these fisheries.

import type { Species } from "./species";

export const AKHI_SPECIES: Record<string, Species> = {
  // ── Alaska ───────────────────────────────────────────────────────────────
  "pacific-halibut": {
    key: "pacific-halibut",
    name: "Pacific Halibut",
    scientific: "Hippoglossus stenolepis",
    emoji: "🐠",
    seasonMonths: [5, 6, 7, 8, 9],
    seasonLabel: "May – September (check regs)",
    bait: ["Herring", "Salmon heads and bellies", "Octopus", "Large jigs"],
    techniques:
      "A bottom fish of sand, gravel and mud flats, usually fished at anchor or on a slow drift with heavy weights and big baits. Slack water around the turn of the tide is the easy window: less current means less weight and a bait that stays on the bottom. In Alaska's big tides the current can be too strong to fish the bottom mid-tide, so the tide table decides when you fish as much as where. Size, limit and charter rules differ by area and year; check ADF&G before you keep one.",
    gearKeys: ["circle-hooks", "braided-line", "landing-net", "cooler"],
    tempRangeF: [40, 55],
  },
  "salmon-ak": {
    key: "salmon-ak",
    name: "Salmon (Alaska)",
    scientific: "Oncorhynchus spp.",
    emoji: "🐟",
    seasonMonths: [6, 7, 8, 9],
    seasonLabel: "June – September; runs differ by species and river (check regs)",
    bait: ["Herring", "Spoons and spinners", "Hoochies", "Cured roe"],
    techniques:
      "Five species run Alaska's coast in summer, kings first, then sockeye, pinks, silvers and chums, and much of the fishing is from shore at river mouths and in the salt just outside them. An incoming tide pushes fish toward the mouth; the hours around high tide are the usual shore window. Boats troll herring, spoons or hoochies off points and along kelp. Which species you can keep, where and when changes by river and by year; ADF&G posts emergency orders through the season, so check before you go.",
    gearKeys: ["landing-net", "cooler", "pliers", "braided-line"],
    tempRangeF: [45, 58],
  },

  // ── Hawaii ───────────────────────────────────────────────────────────────
  "papio-ulua": {
    key: "papio-ulua",
    name: "Papio & Ulua (Jacks)",
    scientific: "Caranx spp.",
    emoji: "🐟",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonLabel: "Year-round; summer is the peak",
    bait: ["Live oama or halalu", "Cut tako (octopus)", "Whipping plugs and jigs", "Bubble and fly rigs"],
    techniques:
      "Papio are the small jacks and ulua the big ones, mostly giant trevally, and they are the shore fish of Hawaii. Whipping, casting and retrieving a plug, jig or bubble-and-fly rig from rocks and sand, works best at first light and dusk on a rising tide, when jacks move in over the reef edge to feed. Dunking a live bait or slide bait from a rocky point is the big-fish method. Rising water onto the reef flat and the first hours of the drop are the classic windows. Size limits apply; check DAR.",
    gearKeys: ["surf-rod", "braided-line", "pliers", "landing-net"],
    tempRangeF: [74, 82],
  },
  oio: {
    key: "oio",
    name: "Oio (Pacific Bonefish)",
    scientific: "Albula glossodonta",
    emoji: "🐟",
    seasonMonths: [4, 5, 6, 7, 8, 9, 10],
    seasonLabel: "Year-round",
    bait: ["Shrimp", "Small crabs", "Clam or tako strips", "Shrimp-pattern flies"],
    techniques:
      "A fish of the sand and seagrass flats. Oio move onto a flat with the incoming tide to root for crabs and shrimp and slide off as it drops, so the rising tide and the first of the fall are the time to be wading or watching. Dunking a shrimp on a light sliding-sinker rig from the edge of a flat is the traditional Hawaii method; fly anglers sight-fish them the way they fish bonefish anywhere. Check DAR for current size limits.",
    gearKeys: ["fluoro-leader", "circle-hooks", "pliers", "tackle-bag"],
    tempRangeF: [74, 82],
  },
  moi: {
    key: "moi",
    name: "Moi (Pacific Threadfin)",
    scientific: "Polydactylus sexfilis",
    emoji: "🐟",
    seasonMonths: [9, 10, 11, 12, 1, 2, 3],
    seasonLabel: "Seasonal closure and size rules apply (check regs)",
    bait: ["Shrimp", "Small crabs", "Sand turtles (mole crabs)", "Small grubs and jigs"],
    techniques:
      "Moi feed in the wash along sandy beaches and at the edges of rocky points, often in water only a few feet deep, so a light rod and a small bait cast into the white water is the whole technique. A rising tide with some surf puts them right at your feet. Moi have a closed season and a size and bag limit in Hawaii, and the dates and numbers are set by DAR, so check the current rules before you fish for them.",
    gearKeys: ["surf-rod", "fluoro-leader", "pliers", "tackle-bag"],
    tempRangeF: [74, 82],
  },
};
