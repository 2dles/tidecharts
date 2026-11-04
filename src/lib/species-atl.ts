// Gulf-and-Atlantic inshore species that Florida's file does not already
// cover. Merged into SPECIES in species.ts alongside CA and FL. Texas, Georgia
// and the Carolinas reuse redfish, speckled-trout, sheepshead, tarpon,
// spanish-mackerel and snook from species-fl.ts; these are the additions.
//
// Images intentionally absent until public-domain ones are sourced (see
// SPECIES-IMAGES.md). The card renders fine without one.

import type { Species } from "./species";

export const ATL_SPECIES: Record<string, Species> = {
  "southern-flounder": {
    key: "southern-flounder",
    name: "Southern Flounder",
    scientific: "Paralichthys lethostigma",
    emoji: "🐠",
    seasonMonths: [4, 5, 9, 10, 11],
    seasonLabel: "Spring and fall; the fall run to the passes is the event",
    bait: ["Live mud minnows", "Finger mullet", "Gulp! shrimp on a jig head", "Bucktail jigs"],
    techniques:
      "Drag a bait slowly along the bottom at channel edges, jetty rocks and the down-current side of structure on an outgoing tide. In the fall, flounder stack in passes and inlets on their way to the Gulf or ocean; fish the drop-offs then.",
    gearKeys: ["inshore-combo", "jig-head-fish-1-8", "braided-line", "fluoro-leader"],
    tempRangeF: [58, 82],
  },
  "black-drum": {
    key: "black-drum",
    name: "Black Drum",
    scientific: "Pogonias cromis",
    emoji: "🐟",
    seasonMonths: [1, 2, 3, 4, 10, 11, 12],
    seasonLabel: "Fall through spring; big drum run the passes in late winter",
    bait: ["Blue crab halves", "Dead shrimp", "Clams", "Cut mullet"],
    techniques:
      "A bottom fish that feeds by feel, so scent beats action: crab or shrimp on a fish-finder rig, left still on a channel edge, jetty or bridge. The late-winter run of 30-plus pound drum through Gulf and Atlantic passes is a shore-fishable event; keep the small ones, release the big breeders.",
    gearKeys: ["dwave-combo-8", "circle-hooks", "bank-sinker-4oz", "mustad-barrel-swivel-2-0"],
    tempRangeF: [50, 80],
  },
  bluefish: {
    key: "bluefish",
    name: "Bluefish",
    scientific: "Pomatomus saltatrix",
    emoji: "🐟",
    seasonMonths: [4, 5, 6, 9, 10, 11],
    seasonLabel: "Spring and fall runs along the beach; summer offshore",
    bait: ["Cut menhaden", "Metal spoons and jigs", "Topwater plugs", "Finger mullet"],
    techniques:
      "When blues are blitzing bait in the surf you will see birds working and bait spraying; throw a metal or a popper into it. Wire or heavy mono leader, because they bite through everything else and through each other. Bleed and ice them immediately if you plan to eat them.",
    gearKeys: ["surf-rod", "braided-line", "fluoro-leader", "sand-spike"],
    tempRangeF: [55, 75],
  },
  cobia: {
    key: "cobia",
    name: "Cobia",
    scientific: "Rachycentron canadum",
    emoji: "🐟",
    seasonMonths: [4, 5, 6, 9, 10],
    seasonLabel: "Spring migration along the beaches, again in the fall",
    bait: ["Live eels", "Live pinfish or menhaden", "Big bucktail jigs", "Large soft plastics"],
    techniques:
      "A sight-fishing target that cruises just under the surface along the beach, often shadowing rays, turtles or buoys. From a pier or jetty, watch the up-current side and have a heavy jig ready to pitch. They follow a hooked fish to the boat and can be caught in pairs.",
    gearKeys: ["dwave-combo-8", "braided-line", "fluoro-leader", "circle-hooks"],
    tempRangeF: [68, 82],
  },
  "king-mackerel": {
    key: "king-mackerel",
    name: "King Mackerel",
    scientific: "Scomberomorus cavalla",
    emoji: "🐟",
    seasonMonths: [4, 5, 6, 9, 10, 11],
    seasonLabel: "Spring and fall, when water is in the 70s",
    bait: ["Live menhaden or bluefish", "Slow-trolled ribbonfish", "Spoons", "Large plugs"],
    techniques:
      "From ocean piers, the classic setup is a live bait suspended off the end on a trolley rig under a float. Wire leader and treble stinger hooks; a king hits from behind and bites a bait in half. From a boat, slow-troll live baits along color changes and over nearshore structure.",
    gearKeys: ["dwave-combo-8", "braided-line", "circle-hooks", "landing-net"],
    tempRangeF: [68, 84],
  },
  whiting: {
    key: "whiting",
    name: "Whiting (Southern Kingfish)",
    scientific: "Menticirrhus americanus",
    emoji: "🐠",
    seasonMonths: [3, 4, 5, 6, 9, 10, 11],
    seasonLabel: "Spring through fall; the most reliable surf fish on the Gulf and South Atlantic",
    bait: ["Fresh dead shrimp", "Sand fleas", "Cut squid", "Fishbites"],
    techniques:
      "Small hooks, small baits, close in. Whiting feed in the first trough and the wash, often within a long cast of dry sand, on a rising tide. A two-hook bottom rig with a pyramid or bank sinker, left still, is all it takes. Good eating and no size pressure, so a great starter target.",
    gearKeys: ["surf-rod", "bank-sinker-4oz", "circle-hooks", "sand-spike"],
    tempRangeF: [60, 85],
  },
};
