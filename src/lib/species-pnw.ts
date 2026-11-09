// Pacific Northwest species that the California file does not already cover.
// Merged into SPECIES in species.ts. Washington and Oregon reuse salmon,
// lingcod, rockfish and cabezon from the California entries; these are the
// additions. California's surfperch entry is barred surfperch, which is
// uncommon this far north, so the PNW surf species is listed separately.
//
// Rules change often for all three of these (crab size/sex/season, sturgeon
// retention). Cards point people at the state regs; nothing here states a
// rule as fact. Images absent until public-domain ones are sourced.

import type { Species } from "./species";

export const PNW_SPECIES: Record<string, Species> = {
  "dungeness-crab": {
    key: "dungeness-crab",
    name: "Dungeness Crab",
    scientific: "Metacarcinus magister",
    emoji: "🦀",
    seasonMonths: [7, 8, 9, 10, 11, 12],
    seasonLabel: "Seasons differ by state and area (check regs)",
    bait: ["Chicken or turkey parts", "Fish carcasses", "Clams", "Bait in a closed bait cage"],
    techniques:
      "Ring nets or pots from a public dock, jetty or boat. Rings need checking every 15 to 30 minutes; pots can soak longer. Slack water around high and low tide is the easy time: gear stays where you dropped it and lines don't drag. Size, sex and limit rules apply in both states, so carry a crab gauge and check the current regs.",
    gearKeys: ["cooler"],
    tempRangeF: [45, 60],
  },
  "redtail-surfperch": {
    key: "redtail-surfperch",
    name: "Redtail Surfperch",
    scientific: "Amphistichus rhodoterus",
    emoji: "🐟",
    seasonMonths: [3, 4, 5, 6],
    seasonLabel: "Year-round; spring is the peak",
    bait: ["Sand shrimp", "Clam necks", "Gulp! sandworms", "Small grubs"],
    techniques:
      "Fish the troughs just behind the breakers with a two-hook rig or a Carolina rig and a light weight. The incoming tide toward high is the classic window, when perch move up into the surf to feed. Look for darker water and rips that mark the deeper troughs.",
    gearKeys: ["surf-rod", "carolina-kit", "sand-spike", "tackle-bag"],
    tempRangeF: [48, 60],
  },
  "white-sturgeon": {
    key: "white-sturgeon",
    name: "White Sturgeon",
    scientific: "Acipenser transmontanus",
    emoji: "🐟",
    seasonMonths: [1, 2, 3, 4, 5, 6],
    seasonLabel: "Year-round fish; open seasons and retention rules change often",
    bait: ["Smelt", "Sand shrimp", "Squid", "Herring"],
    techniques:
      "A bottom fish of the big rivers and estuaries. Heavy weight, a sliding sinker rig and fresh bait on the edge of a deep channel. In the tidal lower river, the bite often follows the tide change, when current picks up and carries scent. Retention rules for sturgeon are strict and change often; check current regs, and expect much of the fishing to be catch and release.",
    gearKeys: ["circle-hooks", "braided-line"],
    tempRangeF: [45, 65],
  },
};
