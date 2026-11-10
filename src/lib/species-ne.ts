// Mid-Atlantic and New England inshore species. Merged into SPECIES in
// species.ts. Bluefish comes from species-atl.ts. Atlantic striped bass gets
// its own entry because the California card (anchovies, swimbaits) is the
// wrong bait and season for the East Coast fishery.
//
// Size, bag and season rules for every one of these are set state by state
// and change most years (striped bass, fluke, sea bass and tautog
// especially). Cards point people at the state regs; nothing here states a
// rule as fact. Images absent until public-domain ones are sourced.

import type { Species } from "./species";

export const NE_SPECIES: Record<string, Species> = {
  "striped-bass-atlantic": {
    key: "striped-bass-atlantic",
    name: "Striped Bass (Atlantic)",
    scientific: "Morone saxatilis",
    emoji: "🐟",
    seasonMonths: [4, 5, 6, 9, 10, 11],
    seasonLabel: "Spring and fall migrations; summer in New England (check regs)",
    bait: ["Live or chunk bunker (menhaden)", "Clams", "Live eels", "Bucktail jigs", "Soft-plastic swimbaits"],
    techniques:
      "Stripers feed where moving water pushes bait against structure: inlet mouths, jetty tips, bridge shadows, rips and points. Fish the stronger part of the tide, and dawn, dusk and night, especially in summer. Chunks or clams on the bottom from the beach, eels or swimbaits at night along rocks. Circle hooks on bait; release fish carefully, most of the catch goes back.",
    gearKeys: ["surf-rod", "braided-line", "circle-hooks", "sand-spike"],
    tempRangeF: [50, 70],
  },
  "summer-flounder": {
    key: "summer-flounder",
    name: "Summer Flounder (Fluke)",
    scientific: "Paralichthys dentatus",
    emoji: "🐠",
    seasonMonths: [5, 6, 7, 8, 9],
    seasonLabel: "Late spring through early fall (check regs)",
    bait: ["Squid strips", "Live killifish (minnows)", "Gulp! swimming mullet", "Bucktail with a strip"],
    techniques:
      "Drift or slowly retrieve a bait along sandy and gravel bottom near channel edges, inlets and drop-offs. Moving water is everything: fluke face into the current and ambush bait, so a slack tide usually means a slow bite. Bounce the bottom and give a second before setting the hook.",
    gearKeys: ["inshore-combo", "jig-head-fish-1-8", "braided-line", "landing-net"],
    tempRangeF: [56, 75],
  },
  "black-sea-bass": {
    key: "black-sea-bass",
    name: "Black Sea Bass",
    scientific: "Centropristis striata",
    emoji: "🐟",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonLabel: "Late spring through fall (check regs)",
    bait: ["Squid", "Clams", "Small jigs", "Cut fish"],
    techniques:
      "A structure fish: rocks, wrecks, reefs, jetties and pilings. Drop a high-low rig or a small jig straight down and keep it just off the bottom. Bigger fish sit deeper; inshore jetties and piers hold plenty of smaller ones.",
    gearKeys: ["jig-assort", "bank-sinker-4oz", "braided-line", "pliers"],
    tempRangeF: [55, 75],
  },
  tautog: {
    key: "tautog",
    name: "Tautog (Blackfish)",
    scientific: "Tautoga onitis",
    emoji: "🐟",
    seasonMonths: [4, 5, 10, 11],
    seasonLabel: "Spring and fall, as water warms and cools (check regs)",
    bait: ["Green crabs", "Asian shore crabs", "Fiddler crabs", "Clams"],
    techniques:
      "Tog live in the rocks and eat crabs. Fish a crab on a short leader tight to the bottom against a jetty, wreck or rock pile, and expect to lose rigs. Slack and slow current make it far easier to keep a bait in the strike zone without snagging.",
    gearKeys: ["dwave-combo-8", "bank-sinker-4oz", "pliers", "circle-hooks"],
    tempRangeF: [45, 65],
  },
  scup: {
    key: "scup",
    name: "Scup (Porgy)",
    scientific: "Stenotomus chrysops",
    emoji: "🐟",
    seasonMonths: [5, 6, 7, 8, 9, 10],
    seasonLabel: "Late spring through fall (check regs)",
    bait: ["Squid strips", "Clams", "Sandworms"],
    techniques:
      "Small hooks and small baits on a two-hook rig, on the bottom near rocks, piers and mussel beds. Schools move through with the tide; when one fish bites, others are near. A good fish for kids off a public pier.",
    gearKeys: ["inshore-combo", "bank-sinker-4oz", "tackle-bag", "pliers"],
    tempRangeF: [55, 75],
  },
  weakfish: {
    key: "weakfish",
    name: "Weakfish (Gray Trout)",
    scientific: "Cynoscion regalis",
    emoji: "🐟",
    seasonMonths: [5, 6, 9, 10],
    seasonLabel: "Spring and fall; numbers are low in most years (check regs)",
    bait: ["Soft-plastic shad on a jig head", "Peeler crab", "Squid strips", "Bloodworms"],
    techniques:
      "Fish bays, inlets and channel edges, dusk and night especially, with a jig or bait worked slowly near the bottom. Weakfish get their name from a soft mouth, so a light drag and a net help.",
    gearKeys: ["inshore-combo", "jig-head-fish-1-8", "fluoro-leader", "landing-net"],
    tempRangeF: [58, 78],
  },
  "winter-flounder": {
    key: "winter-flounder",
    name: "Winter Flounder",
    scientific: "Pseudopleuronectes americanus",
    emoji: "🐠",
    seasonMonths: [3, 4, 5],
    seasonLabel: "Early spring in the bays (check regs)",
    bait: ["Sandworms", "Bloodworms", "Mussels", "Clams"],
    techniques:
      "Small mouths, so small hooks. Fish muddy and sandy bottom in back bays and harbors, and use chum (crushed mussels or clams) to bring them in. Sun-warmed shallows on an afternoon incoming tide are the classic early-season spot.",
    gearKeys: ["inshore-combo", "bank-sinker-4oz", "tackle-bag"],
    tempRangeF: [38, 55],
  },
  "atlantic-croaker": {
    key: "atlantic-croaker",
    name: "Atlantic Croaker",
    scientific: "Micropogonias undulatus",
    emoji: "🐟",
    seasonMonths: [5, 6, 7, 8, 9],
    seasonLabel: "Late spring through summer",
    bait: ["Bloodworms", "Squid", "Shrimp", "Peeler crab"],
    techniques:
      "A bottom fish that runs in schools over sand and mud, especially in the Chesapeake and its rivers. Two-hook bottom rig, small hooks, bait on the bottom. Evenings and the hours around a tide change are usually best from piers and shorelines.",
    gearKeys: ["inshore-combo", "bank-sinker-4oz", "circle-hooks", "tackle-bag"],
    tempRangeF: [60, 82],
  },
  "atlantic-mackerel": {
    key: "atlantic-mackerel",
    name: "Atlantic Mackerel",
    scientific: "Scomber scombrus",
    emoji: "🐟",
    seasonMonths: [6, 7, 8, 9],
    seasonLabel: "Summer in the Gulf of Maine",
    bait: ["Sabiki or mackerel tree rigs", "Small diamond jigs", "Small spoons"],
    techniques:
      "Schools move along the coast and into harbors in summer. A multi-hook mackerel rig with a small jig below, cast and retrieved or jigged from a wharf or rocks, often catches several at once. Look for birds and bait on the surface; the tide pushing into a harbor often brings them in.",
    gearKeys: ["jig-assort", "tackle-bag", "cooler"],
    tempRangeF: [48, 64],
  },
};
