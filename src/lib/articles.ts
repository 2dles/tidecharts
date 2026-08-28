// Long-form SEO guides. Each recommends TheAnglerStore gear.

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  readMinutes: number;
  gearKeys: string[];
  sections: ArticleSection[];
  relatedSlugs: string[];
  /** State slugs this guide is specific to; omit for general guides. */
  states?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "how-tides-affect-fishing",
    title: "How Tides Affect Fishing: The Complete Guide",
    description:
      "The complete guide to fishing tides: why moving water catches fish, which tide stages actually matter, and the best time to fish any tide — planned around the water, not the clock.",
    readMinutes: 7,
    gearKeys: ["surf-rod", "braided-line", "carolina-kit", "tackle-bag"],
    relatedSlugs: ["how-to-read-tide-charts", "best-moon-phase-for-fishing"],
    sections: [
      {
        paragraphs: [
          "Ask ten veteran anglers for their number-one planning rule and at least nine will say the same thing: fish the moving water. Tides are the metronome of inshore fishing. They move bait, concentrate predators, and switch feeding windows on and off with a reliability that weather never matches. Learn to read them and you will catch more fish on fewer trips — it really is that direct.",
          "A tide is a very slow wave, driven by the gravitational pull of the moon and sun, that sweeps water toward and away from the coast on a schedule you can predict years in advance. On most of the West Coast that schedule is 'mixed semidiurnal' — two high tides and two low tides a day, of noticeably different sizes. The vertical difference between a high and the following low can exceed six feet in Northern California, and all of that water has to physically flow past your fishing spot on its way in and out.",
        ],
      },
      {
        heading: "Why moving water means feeding fish",
        paragraphs: [
          "Current does three things at once. It dislodges food — sand crabs, worms, shrimp — and pushes it along predictable lanes. It disorients baitfish, which struggle to hold position in flowing water. And it gives predators an ambush structure: they hold in the calm pockets behind rocks, troughs, and channel edges, letting the tide deliver dinner. Slack water shuts all three mechanisms off, which is why the hour of dead-still water around the extremes is so often lifeless.",
          "The practical rule: plan to be fishing during the middle two to three hours of a tide swing, when water is moving fastest. The old saying is 'fish the last of the incoming and the first of the outgoing' — both sides of a high — because that combination pushes bait tight to shore, then pulls it back out through concentrated funnels.",
        ],
      },
      {
        heading: "Incoming vs. outgoing",
        paragraphs: [
          "An incoming (flood) tide floods shallow feeding flats that were dry or skinny an hour before. Surf species like barred surfperch and corbina ride it almost to the sand, hunting crabs washed loose in the shorebreak. Bay fish push up onto eelgrass flats. If you fish beaches, the incoming is your friend, and the first hours of it often fish better as the water climbs.",
          "An outgoing (ebb) tide drains those same flats and forces everything — bait and water alike — out through channels, harbor mouths, and river openings. That is structure fishing time: halibut, stripers, and bass sit on the down-current side of the funnel and eat what the drain delivers. Jetty tips and channel edges are outgoing-tide spots almost everywhere in the world.",
        ],
      },
      {
        heading: "Tide size matters too",
        paragraphs: [
          "Not all swings are equal. Around new and full moons the sun and moon pull together, producing 'spring' tides — bigger highs, lower lows, and much faster current between them. Around quarter moons the pulls partly cancel, and the gentler 'neap' tides move less water. A 6-foot swing can produce triple the current speed of a 2-foot swing at the same spot, and the fishing usually follows. USTideCharts' fishing score bakes tide movement in as its heaviest factor for exactly this reason.",
          "One caution: the biggest spring tides can actually muddy the water and scatter bait on some beaches. If your spot fishes poorly on the extremes, try the days flanking the full or new moon, when movement is strong but not chaotic.",
        ],
      },
      {
        heading: "Putting it together",
        paragraphs: [
          "Before any trip, look at three things on the tide chart: when the water is moving (fish then), which direction it is moving (pick your spot to match), and how big the swing is (set your expectations). Pair a moving tide with dawn or dusk and you have stacked the two most powerful factors in inshore fishing on top of each other.",
          // Named the store's own "Carolina rig kit" and called all three items
          // "field-tested" — the kit was never a real product, and nobody here
          // has field-tested anything. Only name what we actually stock.
          "Gear-wise, moving water rewards tackle that stays in touch with the bottom. A long surf rod keeps your line above the shorebreak, braided line telegraphs every tick through the current, and a sliding sinker running above a swivel lets a perch or corbina pick up the bait without feeling the weight. The rod, the braid and the swivel are in the cards below — the sinker is the one piece you'll still want to pick up locally.",
        ],
      },
    ],
  },
  {
    slug: "how-to-read-tide-charts",
    title: "How to Read a Tide Chart (Without a Decoder Ring)",
    description:
      "Highs, lows, MLLW, tide height vs. tide movement — a five-minute course that turns the squiggly line into a fishing plan.",
    readMinutes: 5,
    gearKeys: ["inshore-combo", "headlamp", "pliers"],
    relatedSlugs: ["how-tides-affect-fishing", "best-moon-phase-for-fishing"],
    sections: [
      {
        paragraphs: [
          "A tide chart is just a graph of predicted water height over time. The horizontal axis is the clock; the vertical axis is feet of water above a reference level. The wave-shaped line tells you when the ocean at that exact station will be high, low, rising, or falling. Everything else — the numbers, the abbreviations, the datum jargon — is detail on top of that simple picture.",
        ],
      },
      {
        heading: "What the numbers mean",
        paragraphs: [
          "Tide heights in the United States are quoted in feet relative to MLLW — Mean Lower Low Water — the long-term average of each day's lowest tide. A '+5.8 ft high' means the water will stand 5.8 feet above that average lowest level. Negative numbers happen too: a '−1.2 ft' low is a minus tide, water lower than an average low, which exposes rocks, reefs, and clam beds that are normally submerged. Minus tides are prized for tidepooling and bait gathering, and the huge swing that follows them moves serious water.",
          "Times on NOAA-based charts (including USTideCharts) are given in the station's local time, already adjusted for daylight saving. Every prediction is for a specific station — a harbor entrance, a pier — and the timing can shift by 30–60 minutes just a few miles up a bay, so pick the station closest to where you'll actually stand.",
        ],
      },
      {
        heading: "Height is not movement",
        paragraphs: [
          "The most common beginner mistake is fixating on the peaks and valleys. Fish do not bite because the water is high; they bite because the water is moving. On the graph, movement is the slope of the line: the steep sections between a high and a low are when current runs hardest, and the flat crests and troughs are slack water. The steepest point — and usually the best fishing — comes roughly halfway between a high and a low.",
          "That's why an interactive chart earns its keep. Hover along the USTideCharts graph and you'll see both the height and whether the tide is rising or falling at that minute — the two facts that actually build a game plan.",
        ],
      },
      {
        heading: "A 60-second planning routine",
        paragraphs: [
          "First, find today's swings: two highs and two lows, unequal in size. Second, circle the mid-tide hours on each side of the biggest swing — that's your moving water. Third, check whether either window overlaps dawn or dusk; if it does, that's the trip. Fourth, glance at the low-tide height: a minus low means exposed structure at low water and a fast, fishy flood behind it.",
          // "Both live in the accessories aisle at TheAnglerStore" — there is
          // no headlamp in the catalog, so "both" was one.
          "If your best window lands before sunrise — and the good ones often do — plan for the dark as well as the tide. A hands-free light matters more than most people expect, and a good pair of saltwater pliers earns its keep when you're unhooking a fish by feel. The pliers are in the cards below.",
        ],
      },
    ],
  },
  {
    slug: "best-moon-phase-for-fishing",
    title: "The Best Moon Phase for Fishing, According to the Data",
    description:
      "New moon, full moon, or quarters? What solunar theory actually claims, what holds up, and how to use the moon without overthinking it.",
    readMinutes: 6,
    gearKeys: ["swimbait-kit", "headlamp", "cooler"],
    relatedSlugs: ["how-tides-affect-fishing", "how-to-read-tide-charts"],
    sections: [
      {
        paragraphs: [
          "Anglers have argued about the moon for as long as there have been boats. Solunar theory — first popularized by John Alden Knight in 1926 — claims fish feed hardest when the moon is directly overhead or underfoot, and that days around the new and full moons outfish the quarters. Nearly a century later, every fishing app ships some version of a solunar calendar. So what should you actually do with it?",
        ],
      },
      {
        heading: "The honest answer: the moon works through the tide",
        paragraphs: [
          "For saltwater anglers, the moon's clearest, most defensible effect is not mystical at all — it is tidal. New and full moons align the sun and moon's gravity, producing spring tides: bigger swings, faster current, more bait swept into the strike zone. Quarter moons produce lazy neap tides. If moving water is the engine of inshore feeding (it is), then the moon phase is the throttle. Prefer the three or four days around a new or full moon, not because of moonbeams, but because those are the days the ocean moves hardest.",
          "Between the two, many veteran surf and bay anglers give the nod to the new moon. You get the same big water movement as the full, plus dark nights — which concentrates feeding into the dawn and dusk windows you're fishing anyway. Around a full moon, fish that fed all night under bright moonlight can be sluggish at sunrise.",
        ],
      },
      {
        heading: "Major and minor periods",
        paragraphs: [
          "Classic solunar tables mark two 'major' periods (moon overhead and moon underfoot, about two hours each) and two 'minor' periods (moonrise and moonset) per day. The evidence here is thinner, but the logic of stacking odds is sound: when a major period, a tide swing, and first light land in the same hour, every planning system agrees that's the hour to be fishing. The USTideCharts fishing score treats moon phase as a meaningful but secondary factor — about half the weight of tide movement — which matches what the water tells us.",
        ],
      },
      {
        heading: "How to actually plan with it",
        paragraphs: [
          "Don't cancel a trip because the calendar shows a quarter moon — a mid-tide dawn on a neap week beats a slack-water noon on a spring week, every time. Use the moon as a tiebreaker: when you can choose your day, choose the one within a few days of new or full. When you can't, fish the best tide window your day offers and let the score do the math.",
          // Named "the ColdCatch at TheAnglerStore" — a brand that does not
          // exist, attached to a cooler we do not sell. Describe the job, and
          // let the cards name the product.
          "Spring-tide fishing is fast fishing: more current means more casts, more grabs, and better odds of a limit hitting the sand. A soft jerkbait covers the reaction bite when the water is ripping, and if the plan comes together you'll want a cooler that holds ice through a long minus-tide morning. Both are in the cards below.",
        ],
      },
    ],
  },
  {
    slug: "how-the-fishing-score-works",
    title: "How the USTideCharts Fishing Score Works",
    description:
      "Exactly what goes into the 0–100 fishing score on every location page — the six factors, how they're weighted, and what the score can and can't tell you.",
    readMinutes: 6,
    gearKeys: ["braided-line", "pliers", "tackle-bag"],
    relatedSlugs: ["how-tides-affect-fishing", "best-moon-phase-for-fishing"],
    sections: [
      {
        paragraphs: [
          "Every location page on USTideCharts shows a fishing score from 0 to 100, updated continuously through the day. It isn't a guess and it isn't magic — it's a weighted blend of six measurable conditions, computed the same way for every hour at every station. This page explains the formula, because a score you can't interrogate is a score you shouldn't trust.",
          "The single heaviest factor is tide movement, at roughly a third of the score. We compute the rate of change of the tide — how many feet per hour the water is rising or falling right now — from NOAA's own harmonic predictions. Fast-moving water moves bait and turns predators on; slack water turns them off. A ripping mid-tide scores high whether the water is coming in or going out, because both directions concentrate feeding, just at different kinds of spots.",
        ],
      },
      {
        heading: "The other five factors",
        paragraphs: [
          "Light is next, at about a quarter of the score. Dawn and dusk are the most reliable bite windows in inshore fishing, so hours near sunrise and sunset get a strong boost, computed from the actual sun times at that station's coordinates — not a generic clock.",
          "Moon phase contributes the solunar component: days near new and full moons score higher because the same alignment that creates spring tides is associated with stronger feeding activity. Wind matters at about fifteen percent — a light breeze is neutral-to-good, but as wind climbs past fresh into strong, casting, boat control, and water clarity all degrade, and the score reflects it. The last slices go to general weather (a front or thunderstorm knocks points off) and water temperature, which is scored against the preferred range of the species typical for that region.",
          "The 'Best windows today' list is the same math run for every hour of the day, then grouped into the stretches that score highest. A day's headline number is its best window, not its average — a day with one excellent dawn window and a dead afternoon is still a day worth fishing, and the score says so.",
        ],
      },
      {
        heading: "What the score is not",
        paragraphs: [
          "The score doesn't know what you fish for, and it can't see bait in the water, boat traffic, or the school of fish that showed up for no reason at all. Treat it the way you'd treat a strong weather forecast: an honest summary of the conditions that are knowable in advance. It stacks the odds; it doesn't guarantee the outcome. If the score says 85 and your local knowledge says the spot needs a west swell to fish well, believe your local knowledge.",
          "Everything feeding the score is public, primary-source data: tide predictions from NOAA CO-OPS harmonic stations, weather and marine conditions from the Open-Meteo forecast models, and astronomical calculations for sun and moon. When a live feed is unreachable we say so on the page with a visible 'sample data' badge rather than quietly showing stale numbers.",
        ],
      },
    ],
  },
  {
    slug: "incoming-vs-outgoing-tide",
    title: "Incoming vs. Outgoing Tide: Which Is Actually Better for Fishing?",
    description:
      "The honest answer to fishing's oldest argument — why the flood wins on flats and beaches, the ebb wins at creek mouths and jetties, and movement beats both.",
    readMinutes: 6,
    gearKeys: ["surf-rod", "braided-line", "circle-hooks", "landing-net"],
    relatedSlugs: ["how-tides-affect-fishing", "minus-tides-explained"],
    sections: [
      {
        paragraphs: [
          "Ask this question on any pier and you'll start an argument. Half the crowd swears by the incoming — 'fish follow the water in.' The other half wants the outgoing — 'the drain brings the bait to you.' Both halves are right, because the real answer is that direction matters less than location, and neither matters as much as movement itself.",
          "Start with the physics. An incoming (flood) tide pushes water onto ground that was shallow or dry an hour ago. That rising water is a dinner bell: sand crabs get churned loose in the shorebreak, shrimp and baitfish spread onto flooding flats, and predators follow them shallow with the security of deepening water over their backs. This is why the flood is king on beaches, flats, and estuary shallows — the fish are literally arriving with the water under your feet.",
        ],
      },
      {
        heading: "Where the outgoing wins",
        paragraphs: [
          "An outgoing (ebb) tide runs the same movie in reverse, and the geometry changes everything. All the water that spread across a marsh or lagoon at high tide has to funnel back out through a handful of channels, creek mouths, and harbor entrances — and it takes the food with it. Predators know this. Stripers, halibut, snook, and redfish stack up on the down-current side of these drains and let the tide deliver every shrimp and baitfish the marsh grew that day.",
          "That's why a marsh creek station can genuinely fish best on a strong ebb, while the open beach a mile away fishes best on the flood. In San Francisco Bay, the creek mouths and sloughs of San Pablo Bay are classic outgoing-tide water; the ocean beaches on the same day want the incoming. Neither rule transfers — the spot decides.",
          "The last of the incoming and the first of the outgoing — the two hours bracketing high tide — deserve a special mention. Bait gets pushed to its shallowest, most vulnerable position at the top of the tide, then the reversal drags it back out through the funnels. Many veteran anglers plan entire trips around nothing but that window.",
        ],
      },
      {
        heading: "So what should you actually do?",
        paragraphs: [
          "Pick the structure first, then the tide stage that activates it. Fishing a beach or a flat? Arrive two hours before high and fish the flood up. Fishing a creek mouth, jetty tip, or channel edge? Fish the middle hours of the outgoing, when the drain runs hardest. Can't choose your spot? Then just fish whenever the water is moving fastest — the middle third of any swing — and avoid the slack hour around each extreme.",
          "Our fishing score deliberately rewards tide movement in both directions rather than picking a side, precisely because the 'right' direction is a property of your spot, not of the tide. The score tells you when the water will move; the sections above tell you where to stand when it does.",
        ],
      },
    ],
  },
  {
    slug: "minus-tides-explained",
    title: "Minus Tides Explained: The Best Low Tides of the Year",
    description:
      "What a negative tide is, why the biggest minus tides cluster around new and full moons, and how anglers, clammers, and tidepoolers should plan around them.",
    readMinutes: 5,
    gearKeys: ["tackle-bag", "pliers", "cooler"],
    relatedSlugs: ["how-to-read-tide-charts", "incoming-vs-outgoing-tide"],
    sections: [
      {
        paragraphs: [
          "Scan a tide table and you'll occasionally see a low tide with a minus sign — -0.8 ft, -1.5 ft. That negative number means the water will drop below the average of the lowest low tides (a reference level called MLLW, mean lower low water). In plain terms: the ocean pulls back farther than it does on an ordinary day, exposing ground that spends most of the year underwater.",
          "Minus tides aren't random. They arrive in clusters of three to five days around new and full moons — the same spring-tide alignment that produces the biggest highs also produces the deepest lows. The most dramatic minus tides of the year tend to come when a spring cycle coincides with the moon's closest approach to Earth, and in daylight they're an event: reefs, boulder fields, and sand flats you've never seen stand exposed for an hour or two.",
        ],
      },
      {
        heading: "Why anglers care",
        paragraphs: [
          "A minus tide is a scouting session no map can match. The trough that holds perch, the channel a halibut ambushes from, the boulder a big lingcod lives under — at a strong minus tide you can walk out and look at them. Photograph the structure at dead low, and you'll fish that spot with x-ray vision at every tide for the rest of the year.",
          "The fishing around a minus tide is its own reward. A deep low means an enormous volume of water has to return on the following flood, so the incoming after a minus tide runs harder than usual — often the strongest, fishiest incoming of the month. Poke-polers work the exposed rocks at dead low; surf anglers fish the trough as it refills; clammers and tidepoolers get their only legal shot at ground that's normally three feet under.",
          "Two safety notes that experienced coast walkers treat as law: know when the tide turns, because water that left over two hours can come back over flats faster than a casual walk — and never turn your back on the ocean on exposed rock. The chart on every location page shows exactly when the low bottoms out and how fast the water returns.",
        ],
      },
      {
        heading: "Finding them",
        paragraphs: [
          "Any location page on USTideCharts shows negative lows directly in the tide table — they're the entries below 0 ft — and pages call out when today includes a minus tide. Look at the 7-day view around the next new or full moon and you'll usually find the cluster. West Coast minus tides favor early morning in winter and spring; the best daylight minus tides in California typically land in May, June, and July.",
        ],
      },
    ],
  },
  {
    slug: "florida-tide-fishing",
    states: ["florida"],
    title: "Tide Fishing in Florida: Gulf, Atlantic, and the Keys",
    description:
      "Florida's three coasts run on three different tide regimes. How tides work on the Gulf, the Atlantic, and the Keys — and how snook, redfish, and tarpon use them.",
    readMinutes: 7,
    gearKeys: ["braided-line", "fluoro-leader", "circle-hooks", "landing-net"],
    relatedSlugs: ["how-tides-affect-fishing", "incoming-vs-outgoing-tide"],
    sections: [
      {
        paragraphs: [
          "Florida looks like one fishery on a map and fishes like three. The Atlantic coast gets two solid tides a day. The Gulf coast gets a mixed, often lopsided schedule where one of the day's tides may barely move. And the Keys sit between two ocean basins whose tides disagree with each other, producing currents that matter more than the height change itself. If you learn tides in one region and move to another, relearn them — the rules genuinely change.",
          "What doesn't change: Florida's inshore fish are as tide-driven as fish anywhere on Earth. Snook, redfish, seatrout, and tarpon all organize their day around moving water. The state's shallow flats and mangrove shorelines make tide height a matter of access too — a redfish flat that's perfect at high tide is a mud field at low.",
        ],
      },
      {
        heading: "The Atlantic coast",
        paragraphs: [
          "From Jacksonville to Miami, tides are semidiurnal — two highs and two lows of similar size, roughly six hours apart, with a range of two to six feet. That regularity makes planning easy: inlets and their bridges are the great fish concentrators here, and the outgoing tide through an inlet is the classic bite, flushing bait from the Intracoastal out to waiting snook and tarpon. Beach fishing for pompano and whiting favors the incoming, especially the first hours of light.",
        ],
      },
      {
        heading: "The Gulf coast",
        paragraphs: [
          "Tampa Bay south through the Ten Thousand Islands runs on mixed tides with a smaller range — often a foot or two — and some days effectively deliver one long tide. With less vertical range, wind matters enormously: a stiff onshore blow can hold a 'low' tide up for hours, and a hard east wind can empty a flat the chart says should be wet. Gulf anglers learn to read the chart and the wind together.",
          "The payoff of the small range is that when the water does move, it's predictable where: passes, creek mouths, and the edges of flats. A negative low on the Gulf side pulls fish off the flats into potholes and channels, where they're concentrated and catchable. The flood that follows spreads redfish back onto the flats to tail — the sight-fishing window Florida is famous for.",
        ],
      },
      {
        heading: "The Keys",
        paragraphs: [
          "The Keys are a chain of dams between the Atlantic and the Gulf, and every channel between islands is a spillway where the two basins try to equalize. Tide height changes are modest, but current through the channels can be fierce — and current, not height, is what turns on tarpon in the passes and puts bonefish and permit on the flats. Flats guides plan almost entirely around water movement and depth-over-the-flat: bonefish push onto a flat on the flood, feed up-current, and slide off as it drains.",
          "One practical note for reading charts in the Keys and the western Panhandle: Florida spans two time zones, and every USTideCharts page shows times in the station's own local time — Eastern for most of the state, Central west of the Apalachicola area — so the time on the page is the time on your phone when you're standing there.",
        ],
      },
    ],
  },
  {
    slug: "surf-fishing-san-diego",
    states: ["california"],
    title: "Surf Fishing San Diego: Beaches, Seasons, and the Sand Crab Rule",
    description:
      "Where and when to surf fish in San Diego — from Imperial Beach to Torrey Pines — plus the one bait rule that outfishes everything else.",
    readMinutes: 8,
    gearKeys: ["surf-rod", "braided-line", "carolina-kit", "pliers"],
    relatedSlugs: ["california-pier-fishing", "how-tides-affect-fishing", "incoming-vs-outgoing-tide"],
    sections: [
      {
        paragraphs: [
          "San Diego might be the easiest place in California to learn surf fishing. The waves are gentler than up north, the water is warmer, the fish bite most of the year, and there are seventy-odd miles of sand between the border and Oceanside where you can walk on and cast. You don't need a boat, you don't need to wake up at 3 a.m. (though it helps), and the whole kit fits in one hand.",
          "The fish you're most likely to meet are barred surfperch — the bread and butter, willing nearly year-round — yellowfin croaker and spotfin croaker in the warm months, California corbina cruising the shallows in summer, and the occasional halibut lying ambushed near a rip or river mouth from spring through early fall. None of them require heavy gear. A light 7-to-9-foot rod, 15–20 lb braid, and a small box of terminal tackle covers everything on this list.",
        ],
      },
      {
        heading: "The sand crab rule",
        paragraphs: [
          "Here's the rule that will outfish any lure recommendation: fish what the beach feeds them. Everything in the San Diego surf eats sand crabs, and you can gather your bait for free at your feet. Watch the wet sand as a wave recedes — the little V-shaped ripples are sand crab colonies breathing. Scoop with your hand or a small rake, keep a dozen soft-shelled ones (the molting, grayish ones are candy), and pin one on a size 2 or 4 hook. When crabs are scarce, a two-inch motor-oil colored grub or a fresh mussel does honest work.",
          "Rig them Carolina style: a sliding egg sinker on the main line, a small swivel, then eighteen inches of lighter fluorocarbon to the hook. The sliding weight lets a perch pick up the bait and swim without feeling resistance — with fish this size, that half-second of trust is the whole game.",
        ],
      },
      {
        heading: "Reading the beaches",
        paragraphs: [
          "Every good surf beach in San Diego is really a series of underwater neighborhoods: troughs (the deeper lanes that run parallel to shore — look for darker water and waves that don't break), rips (the churned, foamy rivers running out to sea, which dig holes fish sit in), and the flat sandy shelves in between. Fish the edges of structure, not the middle of nowhere. At low tide, walk the beach and photograph the exposed troughs and holes; at the next high tide you'll be casting into a map instead of guessing.",
          "As for which beaches: Torrey Pines and Blacks Beach fish beautifully and feel wild for being inside a city. Del Mar and Solana Beach have classic trough structure. Coronado's Silver Strand is long, lonely, and full of perch. Imperial Beach, near the border, gets less pressure than anywhere and gives up corbina all summer. Honestly, though, the specific beach matters less than the structure in front of you — a good rip at an average beach beats dead-flat sand at a famous one.",
        ],
      },
      {
        heading: "Timing it",
        paragraphs: [
          "The tide matters more than the calendar. The classic San Diego surf window is the incoming tide, especially the last two hours before high — rising water pushes sand crabs loose and brings the fish within a short cast of dry sand. Dawn stacks the odds further; corbina in particular feed shockingly shallow in the first low light, sometimes with their backs out of the water. Check your beach's tide chart on this site, find a morning where the incoming crosses sunrise, and go.",
          "One legal note: unlike California's public piers, fishing from the beach requires a sport fishing license if you're 16 or older, and regulations change — check the CDFW site before you keep anything. Surfperch have a size and bag limit, and there's a spring closure for keeping them in some years. Ten minutes of reading saves an expensive conversation with a warden.",
        ],
      },
    ],
  },
  {
    slug: "san-francisco-bay-fishing",
    states: ["california"],
    title: "Fishing San Francisco Bay: Stripers, Halibut, and Serious Tides",
    description:
      "A shore angler's guide to San Francisco Bay — where the stripers and halibut are, why the Bay's huge tides decide everything, and the spots you can fish on foot.",
    readMinutes: 8,
    gearKeys: ["surf-rod", "braided-line", "circle-hooks", "landing-net"],
    relatedSlugs: ["incoming-vs-outgoing-tide", "how-tides-affect-fishing", "minus-tides-explained"],
    sections: [
      {
        paragraphs: [
          "San Francisco Bay is the biggest estuary on the West Coast, and it fishes like one: a vast machine of moving water, mudflats, channels, and creek mouths where the tide is not one factor among many — it is the whole schedule. The Golden Gate squeezes enormous volumes of the Pacific in and out twice a day, and every fish in the Bay organizes its life around that pump.",
          "For a shore angler the headliners are striped bass and California halibut. Stripers run the Bay from spring into fall, hunting the shorelines and creek mouths hardest at dawn, dusk, and any time the current runs. Halibut slide onto the flats from late spring through summer, laying flat on sand and mud waiting for anything shiny to swim past. Behind them: leopard sharks and bat rays all year (great fun on medium gear), jacksmelt for the light-tackle crowd, and white sturgeon in the winter for the patient few.",
        ],
      },
      {
        heading: "The tide is the strategy",
        paragraphs: [
          "The Bay's tide swings routinely run five and six feet, which means ferocious current in the channels and a bite that switches on and off like a light. The rule that organizes everything: fish the moving water, and match the direction to the spot. Beaches and flats — Crissy Field is the classic — fish best on the flood, as bait and stripers push shallow with the rising water. Creek and slough mouths — the Petaluma River, Gallinas Creek, the San Pablo Bay drains — fish best on the ebb, when everything the marsh grew that day funnels out past waiting mouths.",
          "San Pablo Bay deserves a special word. The Bay's northern lobe is shallow, muddy, and unglamorous, and it is stuffed with fish. Its sloughs drain warm, food-rich marsh on every outgoing tide, and the stripers know the schedule better than you do. If you live in Marin or the East Bay, the water fifteen minutes from your door is better than you think.",
        ],
      },
      {
        heading: "Fishing it on foot",
        paragraphs: [
          "You can fish a remarkable amount of this Bay without a boat. In the city, Crissy Field and Fort Point put you on the parade route between the Gate and the flats. In Marin, Fort Baker, McNears Beach, and the China Camp shoreline cover the deep and the shallow ends of the game. The East Bay has Point Pinole and the Emeryville and Alameda shorelines — the Alameda rock walls are a halibut spot hiding in plain sight. (A note of respect for a fallen giant: the Berkeley Pier, once the Bay's great free fishing platform, has been closed for years — don't plan a trip around old internet posts.)",
          "Bait and methods stay simple. For stripers: cut anchovy or sardine soaked on the bottom, or better, walk and cast — a white swimbait or a topwater plug at first light along any riprap bank. For halibut: a live smelt or a slowly retrieved swimbait dragged across the flats. For sharks and rays: squid on a circle hook, and a real hook-remover, not your fingers.",
          "Two honest cautions. The Bay's currents are strong enough to sweep gear and people; respect the water around channels and jetties, especially on big spring tides. And the wind machine turns on most afternoons from spring through summer — the glassy magic hours are dawn and dusk, which conveniently are also when the fish agree to eat. A license is required from shore here (piers are the exception), and striper and halibut regulations have size and bag limits — check CDFW before you keep anything.",
        ],
      },
    ],
  },
  {
    slug: "tampa-bay-fishing",
    states: ["florida"],
    title: "Tampa Bay Fishing: Snook, Redfish, and Reading a Wind-Blown Tide",
    description:
      "How to fish Tampa Bay — the flats, the mangroves, the famous pier — and why the Bay's small, wind-bent tides reward anglers who read water instead of clocks.",
    readMinutes: 8,
    gearKeys: ["braided-line", "fluoro-leader", "circle-hooks", "landing-net"],
    relatedSlugs: ["florida-tide-fishing", "incoming-vs-outgoing-tide", "how-tides-affect-fishing"],
    sections: [
      {
        paragraphs: [
          "Tampa Bay is four hundred square miles of the best inshore fishing in Florida, wrapped around two cities that mostly don't notice. Under the flight paths and past the container ships are grass flats, mangrove shorelines, oyster bars, and channel edges holding the Gulf coast's big four: snook, redfish, spotted seatrout, and — in early summer — tarpon the size of doors.",
          "What makes the Bay a thinking angler's fishery is its water. Tides here are small, often a foot or two, and some days effectively deliver one long tide instead of the tidy two-a-day rhythm of the Atlantic side. Wind bends the schedule further: a stiff onshore blow can hold water on the flats for hours past the chart's promised low, and a hard east wind can drain them early. The chart tells you the plan; the wind edits it. Read both together and you're ahead of most of the boats.",
        ],
      },
      {
        heading: "The big four, in their seasons",
        paragraphs: [
          "Snook are the Bay's glamour fish — ambush predators that stack along mangrove roots, dock lights, and pass edges, inhaling whitebait and shrimp on moving water. They're a warm-weather fish, best from spring through fall, and they're heavily protected: closed seasons, a required snook permit, and slot limits, so check FWC's current rules before you dream about dinner. Most locals release them all anyway.",
          "Redfish are the flats' honest workers. On higher water they push onto shin-deep grass and root out crabs, sometimes with their copper tails waving in the air — 'tailing' fish, the Gulf coast's signature sight. Fall is prime, when they school big. Spotted seatrout hold over grass in slightly deeper water year-round and are the most democratic bite in the Bay — a popping cork with a shrimp fools them a hundred years running. And from roughly May through July, migrating tarpon pour through the passes and along the beaches; even if you never hook one, watching a 120-pound fish roll at sunrise recalibrates your idea of what inshore means.",
        ],
      },
      {
        heading: "Where to start on foot or by kayak",
        paragraphs: [
          "Fort De Soto Park, at the Bay's mouth, is the everything-spot: wadeable flats, mangrove edges, beach access, and its own piers. Weedon Island and Cockroach Bay are the kayak sanctuaries — shallow, protected, full of tailing reds. And the Sunshine Skyway Fishing Piers are a Florida institution: the repurposed spans of the old bridge run far out over real depth, and the pier operation covers your fishing license while you're on it (entry and rules on the state park's site). Deep water, big current, and grouper-to-tarpon possibilities, all from a walkway.",
          "One seasonal wrinkle worth planning around: winter negative lows. Cold-season minus tides drain the flats almost dry, which sounds like a disaster and is actually a gift — every fish that was spread across a mile of grass is now concentrated in the potholes and channels, and the warming incoming that follows puts them back on the flats hungry. Watch this site's tide pages for the negative numbers, then fish the refill.",
        ],
      },
    ],
  },
  {
    slug: "california-pier-fishing",
    states: ["california"],
    title: "Pier Fishing in California: No License, No Boat, No Excuses",
    description:
      "California's public piers are free to fish — no license required. What to catch, how to rig, which piers shine, and the two-rod rule everyone should know.",
    readMinutes: 7,
    gearKeys: ["inshore-combo", "braided-line", "circle-hooks", "tackle-bag"],
    relatedSlugs: ["surf-fishing-san-diego", "how-to-read-tide-charts", "how-tides-affect-fishing"],
    sections: [
      {
        paragraphs: [
          "Here is the best-kept open secret in California fishing: on a public ocean pier, you don't need a fishing license. Not a day pass, not anything — it's one of the few places in the state where anyone can legally wet a line for free. That single rule has made piers the great classroom of California angling, where kids, newcomers, and old-timers stand shoulder to shoulder over the same water.",
          "The fine print is short but real: the pier must be a public pier in ocean or bay waters, all the normal size and bag limits still apply, and the regulations allow no more than two rods per person while you're on it. (From beaches and rocks, by contrast, a license is required at 16 and up.) Rules change year to year, so give the CDFW regulations a skim before you go — it costs five minutes.",
        ],
      },
      {
        heading: "What actually bites at a pier",
        paragraphs: [
          "Piers put you over deeper, structure-rich water than any beach cast can reach, and the cast of characters shows it. The reliable year-round crowd: walleye and barred surfperch around the pilings, jacksmelt in the mid-water, and small sharks and rays for anyone soaking bait on the bottom. Warm months add Pacific mackerel and jack crevalle-fast bonito runs in some years, plus halibut lying in the sand between pilings — a legal halibut from a pier is a genuine trophy. NorCal piers add the winter possibility of Dungeness crab in a hoop net where crabbing is allowed.",
          "The single most useful pier technique is the sabiki rig: a string of six tiny flies dropped straight down that catches smelt, anchovies, and small mackerel almost on command. That's an afternoon of fun on its own — and it's how you get live bait. A lively smelt sent back down on a sliding rig, swimming near the bottom, is exactly how those pier halibut and bigger bass get caught.",
        ],
      },
      {
        heading: "Choosing your pier, and your moment",
        paragraphs: [
          "Nearly every coastal town has one, and they all fish. Pacifica's pier is a NorCal workhorse with crab and perch pedigree. The Santa Cruz Wharf puts you over deep water in Monterey Bay. Down south, Balboa, Huntington Beach, and San Clemente's piers are classic SoCal platforms with mackerel runs and summer bonito, and Crystal Pier in San Diego lets you fish practically over the surf zone. Piers do close periodically for storm damage and repairs — check the city or harbor's page before driving far.",
          "Timing works the same as everywhere else in this sport: moving water beats slack, and the hours around a tide change concentrate the bite around the pilings. Dawn and dusk stack the deck further, and evening piers have their own pleasures — lights, mackerel swirling in the glow, and the kind of conversations that only happen over a rail. Bring a small cooler, a rag, pliers you can find in the dark, and a rig or two more than you think you'll lose to the pilings. You'll lose them. Everyone does.",
        ],
      },
    ],
  },
  {
    slug: "free-fishing-piers-san-diego",
    states: ["california"],
    title: "Free Fishing Piers in San Diego: Where to Cast Without a License",
    description:
      "Every public pier in San Diego where you can fish free with no license — ocean piers, bay piers, what bites at each, and which piers to check before you drive.",
    readMinutes: 7,
    gearKeys: ["inshore-combo", "braided-line", "circle-hooks", "tackle-bag"],
    relatedSlugs: ["california-pier-fishing", "surf-fishing-san-diego", "how-tides-affect-fishing"],
    sections: [
      {
        paragraphs: [
          "San Diego is one of the best cities in America to fish for free. California law lets anyone fish from a public ocean or bay pier without a license — no day pass, no paperwork, just the normal size and bag limits and a two-rod maximum while you're on the pier. Add a city wrapped around a giant bay and fronted by open ocean, and you get more free fishing platforms than most people ever get around to trying.",
          "The piers split into two personalities. Ocean piers stand in the surf and the swell, where mackerel, perch, croaker, rays, and the occasional halibut come through with the tide. Bay piers sit on calm, protected water — friendlier for kids and beginners — and fish more like a harbor: smelt and small bass all day, bonefish-fast shortfin corvina for the lucky, and rays and small sharks after dark.",
        ],
      },
      {
        heading: "The ocean piers",
        paragraphs: [
          "Crystal Pier in Pacific Beach is the postcard — a working pier with cottages on it, open to the public during the day, casting you straight over the surf zone where corbina and croaker patrol. Imperial Beach Pier, down by the border, is the sleeper: long, uncrowded, with honest mackerel runs and perch around the pilings, plus one of the best sunset views in the county.",
          "Two famous names come with an asterisk right now. The Ocean Beach Pier — once the West Coast's longest concrete pier — has been closed for years awaiting its replacement project, and Oceanside's pier has been rebuilding in stages since its 2024 fire. Both cities post current status online; check before you drive rather than trusting an old blog post (this one included — pier status changes, the fish don't).",
        ],
      },
      {
        heading: "The bay piers",
        paragraphs: [
          "San Diego Bay is ringed with free public piers that most tourists walk right past. Shelter Island Pier is the flagship — bait shop nearby, lights at night, and a steady parade of smelt, mackerel, bass, and bonito in warm-water years. Embarcadero Marina Park's pier puts you downtown over deep water; Coronado's Ferry Landing pier fishes the same channel from the other side; and Pepper Park Pier in National City covers the quieter south bay, where the muddy bottom means croaker and rays.",
          "Bay technique is simple: a sabiki rig straight down for smelt and small mackerel, then send something bigger back down under a sliding sinker and see who's home. Bring a crab-style drop net if you're serious — it's the legal, pier-friendly way to land anything too heavy to crank up the rail, and the day you hook a big bat ray you'll be glad it's there.",
          "Timing works like everywhere else in this sport: the hours around a tide change beat slack water, dawn and dusk beat midday, and night on a lit pier is its own show — the lights pull in bait, and the bait pulls in everything else. Check the tide page for whichever pier you pick, aim for moving water, and let the free platform do the rest.",
        ],
      },
    ],
  },
  {
    slug: "florida-keys-bridge-fishing",
    states: ["florida"],
    title: "Bridge Fishing in the Florida Keys: Free Piers Over World-Class Water",
    description:
      "The old bridges of the Overseas Highway are free fishing piers standing over tarpon channels. Which spans you can fish, what bites, and how to fish a ripping Keys current.",
    readMinutes: 7,
    gearKeys: ["braided-line", "fluoro-leader", "circle-hooks", "landing-net"],
    relatedSlugs: ["florida-tide-fishing", "tampa-bay-fishing", "incoming-vs-outgoing-tide"],
    sections: [
      {
        paragraphs: [
          "When Florida replaced the old Overseas Highway bridges, it left many of the original spans standing beside the new road — and turned them into some of the best free fishing piers on Earth. They stand directly over the channels where the Atlantic and the Gulf trade water twice a day, which means the fish don't come to the bridge. The bridge was built over the fish.",
          "The names to know are the old spans maintained as fishing piers: Long Key, Channel Two and Channel Five near Islamorada, and Tom's Harbor near Duck Key are the classics, with parking and a walk-on deck. (The famous restored stretch of the Old Seven Mile Bridge at Pigeon Key is a pedestrian showpiece where fishing isn't part of the deal — enjoy the walk, carry the rod elsewhere.) Access rules and repairs shift over the years, so glance at current signage and county pages before planning a long drive around one span.",
        ],
      },
      {
        heading: "What you're standing over",
        paragraphs: [
          "The honest everyday catch is mangrove snapper — abundant, delicious, and smarter than they look, demanding small hooks and the lightest leader the current allows. Around them: yellowtail snapper, grunts, jacks that arrive like a street gang, Spanish mackerel in the cooler months, and barracuda that will follow anything shiny to your feet. After dark the channels change owners — big snook hunt the light lines and shadows, and from spring into summer the tarpon come, rolling through the bridge channels like the tide made them.",
          "A tarpon from a bridge deck is mostly an experience rather than a landing — a hundred-pound fish in ripping current with pilings everywhere wins the argument more often than not. Anglers who do it seriously use heavy leader, a long-handled net or a walk-down plan, and modest expectations. Everyone else just watches them roll at sunset, which costs nothing and is worth the whole trip.",
        ],
      },
      {
        heading: "Fishing the current",
        paragraphs: [
          "Keys bridges are current-fishing school. The tide's vertical range is small here, but the volume moving between the Gulf and the Atlantic through a narrow cut is enormous — the water under your feet can run like a river. The bite tracks that movement: the start and end of each tide run, when current is strong-but-fishable, usually beats the peak rip, and dead slack is nap time. Uptide casts that drift your bait naturally back to the pilings out-fish anchoring a pound of lead against the flow.",
          "One licensing note, because Florida differs from California: fishing from shore or a bridge here isn't automatically license-free. Florida residents can get a free shoreline fishing license; visitors need a regular non-resident license unless the specific pier holds a blanket license. It's cheap and online — sort it before you go, and check FWC's current rules for snapper sizes and closures while you're there.",
        ],
      },
    ],
  },
  {
    slug: "california-halibut-fishing",
    states: ["california"],
    title: "California Halibut From Shore: Flat Fish, Sharp Strategy",
    description:
      "How to catch California halibut without a boat — the sandy structure they ambush from, the moving-water windows, live bait vs. lures, and the 22-inch rule.",
    readMinutes: 7,
    gearKeys: ["surf-rod", "braided-line", "fluoro-leader", "landing-net"],
    relatedSlugs: ["san-francisco-bay-fishing", "surf-fishing-san-diego", "how-tides-affect-fishing"],
    sections: [
      {
        paragraphs: [
          "The California halibut is the state's great shore-fishing prize: a fish that can go twenty pounds, tastes like it costs forty dollars a plate, and lives within casting distance of the sand for half the year. It's also a masterclass in ambush. A halibut buries itself flush with the bottom, both eyes up, and waits — sometimes for days — for one baitfish to swim over the wrong square foot of ocean.",
          "That lifestyle tells you everything about how to catch one. You're not looking for halibut; you're looking for the square feet they'd choose. Sandy bottom next to something — a channel edge, a trough in the surf, the mouth of a harbor or river, the down-current side of a jetty — anywhere moving water funnels baitfish over sand. From spring through early fall they slide shallow to feed, and the back of every bay and the length of every beach becomes a possibility.",
        ],
      },
      {
        heading: "Two ways to fish for them",
        paragraphs: [
          "The bait game: a live smelt, small perch, or anchovy on a sliding sinker rig, cast to the edge of structure and left to swim nervously near the bottom. Nervous is the point — a halibut that's ignored a thousand dead things will rise off the sand for one panicking baitfish. Piers and jetty tips are made for this; catch bait on a sabiki first, then upgrade it into a halibut candidate.",
          "The lure game covers more water, which matters for an ambush fish you have to find. A three-to-five-inch swimbait on a lead head, retrieved slow and low enough to tick bottom every few cranks, is the classic; so is a jerkbait twitched over the flats of Mission Bay or San Francisco Bay at first light. Cast in a fan, move fifty steps, repeat — shore halibut fishing is a walking sport.",
          "When you hook one, don't celebrate early. Halibut are notorious for coming in like a wet towel, seeing the shore, and detonating. Keep the rod loaded, walk them onto sand gently or net them — and then check the tape: the legal minimum is 22 inches, measured properly, and shorts must go back healthy. Most shore-caught fish are shorts; the one that isn't is a memory. Bag limits differ north and south of Point Sur, so give the CDFW rules a look before you keep anything.",
        ],
      },
      {
        heading: "The window that matters",
        paragraphs: [
          "Halibut are moving-water feeders like everything else, but they add a twist: they favor the warmer, calmer conditions inside the tide cycle, and the flats they hunt can literally drain at low water. The reliable window is the middle of an incoming tide through the first of the outgoing, when bait streams over freshly flooded sand. Pair that with dawn on a spring or summer morning and you've stacked the deck as high as shore fishing allows. The fishing score on this site's location pages is doing that math for you — a high score on a bay or beach page in May through September is a halibut invitation.",
        ],
      },
    ],
  },
  {
    slug: "night-fishing-tides",
    title: "Night Fishing and Tides: How to Fish After Dark",
    description:
      "Fishing at night flips the rules — light becomes structure, big fish come shallow, and the tide matters more than ever. How to plan, rig, and stay safe after sunset.",
    readMinutes: 6,
    gearKeys: ["braided-line", "pliers", "landing-net", "tackle-bag"],
    relatedSlugs: ["how-tides-affect-fishing", "best-moon-phase-for-fishing", "minus-tides-explained"],
    sections: [
      {
        paragraphs: [
          "Every serious inshore angler eventually discovers the same secret: the water they fish all day becomes a different, better place at night. Predators that spent daylight hours sulking in deep water slide shallow under cover of dark. Bait loses its visual defenses. Fishing pressure disappears. And the tide — which mattered plenty at noon — becomes nearly the whole story, because at night the fish are hunting by feel, scent, and the movement of water.",
          "The planning is simple once you see it: pick a night when a strong tide swing overlaps the hours after sunset or before dawn. A flood tide arriving in the first hours of darkness pushes bait and predators onto beaches and flats together; an ebb draining a marsh at midnight runs the same conveyor belt of food it runs at noon, minus the boat traffic and the shadows that make fish cautious.",
        ],
      },
      {
        heading: "Light is structure now",
        paragraphs: [
          "At night, any light on the water works like a reef. Pier lights, dock lights, bridge lights — each one grows a glowing ball of plankton, which gathers baitfish, which gathers everything that eats baitfish. The oldest night-fishing rule is to fish the shadow line, not the bright pool: predators hold in the dark edge and raid the lit water. In Florida that's snook and tarpon staged along dock lights; in California it's bass, croaker, and rays circling a lit pier while mackerel swirl in the glow.",
          "Moon phase adds a layer worth thinking about. Dark nights around the new moon concentrate fish hard on artificial light and give scent-hunters like sharks and rays the advantage they love. Full-moon nights spread the game out — the whole flat is dimly lit, fish roam wider, and topwater in moonlight becomes a real (and unforgettable) option. Neither is wrong; they're different games, and the new-moon nights conveniently coincide with the biggest tide swings of the month.",
        ],
      },
      {
        heading: "Rigging and staying safe",
        paragraphs: [
          "Keep the tackle simpler than your daytime spread — retying in the dark punishes complexity. Scent and vibration beat subtlety: fresh cut bait, lures that thump or rattle, darker lure colors that silhouette against the sky's glow. Rig a rod or two before sunset, and make your headlamp a red-light model — white light kills your night vision and, shined on the water, can kill the bite.",
          "Safety is part of the skill, not an afterthought. Fish water you already know from daylight, mind the incoming tide behind you on flats and rock, tell someone where you are, and treat every unseen splash with respect. The reward for the discipline is the best fishing of the month with nobody around — check your spot's tide page, find the night the big swing crosses the dark hours, and go meet the other shift.",
        ],
      },
    ],
  },
  {
    slug: "surf-fishing-los-angeles",
    states: ["california"],
    title: "Surf Fishing Los Angeles: Good Water Hiding in Plain Sight",
    description:
      "Where to surf fish in LA — from Malibu to Cabrillo — what bites through the seasons, and the grunion-run spectacle every Angeleno should see once.",
    readMinutes: 7,
    gearKeys: ["surf-rod", "braided-line", "carolina-kit", "pliers"],
    relatedSlugs: ["surf-fishing-san-diego", "california-halibut-fishing", "how-tides-affect-fishing"],
    sections: [
      {
        paragraphs: [
          "Los Angeles hides its fishing the way it hides everything else — in plain sight, behind traffic. The same beaches that host ten million towels a year hold barred surfperch all winter, corbina and yellowfin croaker all summer, and halibut wherever a creek mouth or rock pile interrupts the sand. Dawn belongs to the anglers; by the time the crowds arrive, the morning bite is done and you're packing up with a story.",
          "The geography sorts itself into three stretches. Malibu's beaches — Zuma especially — are classic steep-and-trough surfperch water with a wilder feel. The middle bay, Santa Monica through Dockweiler to El Segundo, is gentler, family-scaled sand where croaker and perch work the shallow troughs (and where a long walk away from the parking lot doubles your odds). The south end, from Torrance Beach around to Cabrillo Beach in San Pedro, adds structure — rocks, jetties, and the harbor's influence — which is exactly where the halibut and bigger bass want to be.",
        ],
      },
      {
        heading: "Seasons and the LA specialty",
        paragraphs: [
          "The calendar here is generous. Winter through spring is surfperch season, when the biggest barred perch of the year ride the storm-stirred water — a sand crab or motor-oil grub in the trough is all it takes. Summer flips the cast to croaker and corbina, sight-fishing in inches of water on the flooding tide, with halibut lurking near any structure into early fall. There is no month when the LA surf has nothing to offer.",
          "And then there's the spectacle nowhere else can match: the grunion run. On certain nights after the higher tides of a full or new moon, thousands of small silver fish ride waves onto LA's beaches to spawn in the wet sand. During open season you may take them — by hand only, no nets, no digging tools, license required — and some months are watch-only to protect the spawn. CDFW publishes the expected run schedule each year; check it, go once, and you'll understand why people plan their month around small fish dancing in the moonlight. Practical anglers also note what a grunion run means: every predator in the surf knows the schedule too, and the nights around a run can be the best bait-soaking of the summer.",
        ],
      },
      {
        heading: "Making it work",
        paragraphs: [
          "The technique is the standard SoCal surf kit: a light 7-to-9-foot rod, a Carolina rig with a sliding sinker, sand crabs gathered at your feet or a two-inch grub when they're scarce. Read the beach at low tide — troughs, rip edges, crab beds — then fish the incoming, ideally where it crosses dawn. A license is required from the sand at 16 and up (piers are the free exception), and perch and halibut carry size and bag rules worth two minutes on the CDFW site.",
          "The honest local advice: distance from access points is the best lure in Los Angeles. The fish are pressured near every stairway and parking lot; fifteen minutes of walking puts you on water that gets fished a tenth as often. Pick your beach's tide page on this site, find the morning the incoming crosses first light, and let the city sleep in.",
        ],
      },
    ],
  },
  {
    slug: "monterey-bay-fishing",
    states: ["california"],
    title: "Fishing Monterey Bay: Cold Water, Deep Canyon, Big Rewards",
    description:
      "A shore and kayak guide to Monterey Bay — rockfish on the kelp edges, perch on the beaches, halibut on the flats, and why the underwater canyon changes everything.",
    readMinutes: 7,
    gearKeys: ["surf-rod", "jig-assort", "braided-line", "landing-net"],
    relatedSlugs: ["california-halibut-fishing", "california-pier-fishing", "minus-tides-explained"],
    sections: [
      {
        paragraphs: [
          "Monterey Bay is what happens when one of the deepest submarine canyons on the planet runs almost to the beach. The Monterey Canyon funnels cold, nutrient-rich water toward shore, and that upwelling feeds everything — the kelp forests, the bait schools, the whales the tourists come for, and a shore fishery as rich as any in California. You are never fishing far from deep, living water here.",
          "The bay splits into two personalities. The southern rim — Monterey, Pacific Grove, toward Carmel — is rock and kelp country, home to rockfish, cabezon, lingcod, and greenling within casting distance of shore. The long eastern crescent — Del Monte Beach up through Sand City, Marina, and Moss Landing — is open sand: surfperch water mile after mile, with halibut on the flats in the warm half of the year and the harbor at Moss Landing sitting right on the canyon's head.",
        ],
      },
      {
        heading: "Rock, sand, and the kayak option",
        paragraphs: [
          "The rocky side fishes like a jig-and-bait sport: cast metal or drop shrimp flies along the kelp edges, keep the bait moving to dodge snags, and let the minus tides show you the structure you're fishing blind the rest of the month. Respect the closures — parts of this coast are marine protected areas where take is restricted or prohibited, and the boundaries are mapped on CDFW's site. The rules are strict because the place is special; know your spot's status before your first cast.",
          "The sandy side is classic Carolina-rig surfperch fishing, best in winter and spring, with the Salinas River mouth area and the troughs off Marina drawing the crowds who know. Halibut prowl the same sand from late spring on. And Monterey is one of California's great kayak fisheries — protected morning water, rockfish and lingcod a paddle from the launch, and halibut on the flats — with the standing local rules: go early before the wind, wear the layers cold water demands, and never share a bait ball with the sea lions.",
        ],
      },
      {
        heading: "Piers, safety, and timing",
        paragraphs: [
          "For the boatless and license-less, the Monterey Wharf and the Santa Cruz Wharf across the bay both offer free public-pier fishing over deep water — jacksmelt, perch, mackerel in season, and the occasional surprise from the canyon's food chain. The same two-rod pier rule and normal limits apply.",
          "Two safety notes belong in every Monterey guide. This is sneaker-wave and cold-water coast: never turn your back on the ocean from the rocks, and treat any water entry as a wetsuit conversation. And the afternoon wind is nearly a law of physics here — the glassy window is dawn until late morning, which happens to be when the tide-and-light math on this site's Monterey page usually points anyway. Fish the morning flood, watch for whale spouts on the horizon, and remember you're fishing the edge of a mile-deep canyon from dry sand — there's nowhere else quite like it.",
        ],
      },
    ],
  },
  {
    slug: "miami-shore-fishing",
    states: ["florida"],
    title: "Shore Fishing Miami: Tarpon Under the Causeways, Pompano in the Surf",
    description:
      "Where to fish Miami without a boat — Government Cut and South Pointe, the Key Biscayne causeways, beach pompano season, and the night tarpon game.",
    readMinutes: 7,
    gearKeys: ["braided-line", "fluoro-leader", "circle-hooks", "landing-net"],
    relatedSlugs: ["florida-tide-fishing", "florida-keys-bridge-fishing", "night-fishing-tides"],
    sections: [
      {
        paragraphs: [
          "Miami is a world-class fishery wearing a nightclub's clothes. Between the cruise ships and the condo glass, an ocean inlet, a chain of causeway bridges, and miles of open beach put more legitimate shore fishing inside one city than almost anywhere in Florida. The fish commute through downtown; you just have to stand in the right places.",
          "The anchor is Government Cut, the deep shipping inlet between South Beach and Fisher Island. Every tide pushes ocean water — and everything that swims in it — through that funnel, and South Pointe Park's jetty and pier let you fish the north side of the show: jacks and snapper on the rocks, mackerel and blue runners in the current, snook along the shadow lines, and tarpon rolling through like they own the lease. Moving water is everything at an inlet; time your session to the tide chart, not the parking meter.",
        ],
      },
      {
        heading: "The causeways and the flats",
        paragraphs: [
          "The Rickenbacker Causeway to Key Biscayne is Miami's free fishing highway: legal bridge and shoreline access, wadeable grass flats along the roadside, and a night scene all its own. Dawn on the flats means bonefish tailing within sight of the skyline — one of sport fishing's strangest juxtapositions — plus snook and the odd permit for the persistent. After dark, the causeway shadow lines turn on: tarpon and snook hunt the light edges, and a live shrimp drifted down-current along a bridge shadow is as close to a Miami guarantee as shore fishing offers.",
          "North of the city, Haulover's inlet and pier run the same tidal game as Government Cut with a little less glamour and often better parking. Everywhere, the rule is the Keys rule: fish the current seams and shadow edges on a moving tide, uptide casts drifting naturally to the structure, and slack water is for re-rigging and cafecito.",
        ],
      },
      {
        heading: "Beach season and the paperwork",
        paragraphs: [
          "Miami's beaches have their own calendar. Winter through spring is pompano season — the surf angler's payday — when a sand flea or a piece of shrimp on a small hook, cast past the bar on an incoming tide, produces the best-eating fish on this coast. Whiting fill the slow days, jacks crash bait at dawn year-round, and summer brings snook into the trough within a rod's length of the towels. Light surf gear is enough; Florida's beaches rarely demand the heavy artillery.",
          "The paperwork, because Florida differs from California: shore fishing here isn't automatically free. Florida residents can register for a no-cost shoreline license; visitors need a regular non-resident license (cheap, online, minutes). Snook require their own stamp and observe closed seasons, tarpon over 40 inches must stay in the water, and FWC's rules are the living document to check. Sort it once and the whole city opens up — the skyline makes a strange, spectacular backdrop for a bent rod.",
        ],
      },
    ],
  },
  {
    slug: "sand-crabs-best-free-bait",
    title: "Sand Crabs: How to Find, Catch, and Rig the Beach's Best Free Bait",
    description:
      "The complete guide to sand crabs (sand fleas) — reading the swash for colonies, gathering them legally, keeping them lively, and rigging them for surfperch, corbina, and pompano.",
    readMinutes: 6,
    gearKeys: ["carolina-kit", "circle-hooks", "tackle-bag", "surf-rod"],
    relatedSlugs: ["surf-fishing-san-diego", "surf-fishing-los-angeles", "how-tides-affect-fishing"],
    sections: [
      {
        paragraphs: [
          "The best surf bait in America is free, lives under your feet, and most beachgoers have never seen one. The sand crab — Pacific mole crab on the West Coast, 'sand flea' to the Atlantic and Gulf crowd — is a thumb-sized burrowing crustacean that filters the swash zone in colonies of thousands. It is the number-one natural food of barred surfperch and California corbina, and the bait that built the Florida pompano fishery. When you fish a sand crab, you aren't imitating the forage. You are the forage.",
          "Finding them is a reading skill. As a wave recedes, watch the glassy wet sand: a colony reveals itself as a patch of small V-shaped ripples — hundreds of tiny antennae combing the backwash — or as pea-sized bubbling holes as the crabs rebury. Colonies move with the tide and the season, so walk the swash until you find the V's rather than digging at random.",
        ],
      },
      {
        heading: "Gathering and keeping them",
        paragraphs: [
          "The technique is almost embarrassing: as a wave pulls back over a colony, scoop a double handful of sand and let the water sieve it through your fingers — the crabs are the things kicking. A cheap mesh bait rake speeds it up, but hands genuinely work. Store them in a small bucket of damp sand (not standing water, which suffocates them) kept cool and shaded, and they'll stay lively all session.",
          "Two sorting tips separate the pros. First, softshells are gold: crabs that have just molted feel leathery instead of crunchy, and fish prefer them so strongly that many veterans fish nothing else. Second, the orange ones matter: females carrying bright orange eggs under the tail are corbina and pompano candy. And a legal note — in California, sand crabs for personal bait are fair game with a fishing license where gathering is allowed, but state parks and marine protected areas can restrict collecting anything; a glance at local rules beats a ranger conversation. Take what you'll use, and the colony replaces itself.",
        ],
      },
      {
        heading: "Rigging the forage",
        paragraphs: [
          "The rig is the surf standard: Carolina style, sliding egg sinker on the main line, small swivel, eighteen inches of light fluorocarbon, and a size 2 to 6 hook — smaller than beginners expect, because the bait is small and the fish are wary. Hook the crab from underneath up through the digger flap at the tail end, leaving the point exposed. It stays alive, sits naturally on the bottom, and kicks — and the kicking is the advertisement.",
          "Then fish it where you found it: the same swash zone and first trough the colony lives in, on an incoming tide that's churning crabs loose and ringing the dinner bell. Cast beyond the trough, let the rig settle, and keep just enough tension to feel the tap-tap of a perch or the slow pull of a corbina picking it up. When a beach's crab beds, an incoming tide, and first light all line up — that's not luck, that's the pattern. The tide pages on this site will tell you when; the V's in the sand will tell you where.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
