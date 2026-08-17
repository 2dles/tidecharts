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
}

export const ARTICLES: Article[] = [
  {
    slug: "how-tides-affect-fishing",
    title: "How Tides Affect Fishing: The Complete Guide",
    description:
      "Why moving water catches fish, which tide stages actually matter, and how to plan a trip around the tide instead of the clock.",
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
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
