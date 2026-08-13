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
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
