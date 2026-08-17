import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About USTideCharts",
  description:
    "What USTideCharts is, where the data comes from, how the fishing score is computed, and why the site exists.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        About <span className="text-ink-faint">USTideCharts</span>
      </h1>

      <div className="prose-invert mt-6 space-y-5 text-[15px] leading-relaxed text-ink-dim">
        <p>
          USTideCharts exists to answer one question in five seconds:{" "}
          <span className="text-ink">is it worth going fishing today?</span>{" "}
          Answering it used to take three browser tabs — a tide table, a weather
          forecast, and a solunar calendar — and some mental math. We put the
          tide chart, the weather, the water conditions, and a single honest
          0–100 fishing score on one page, for every NOAA tide prediction
          station in California and Florida, with more states on the way.
        </p>
        <p>
          The site is independently built and angler-run, based in the San
          Francisco Bay Area. It started with one frustration: the tide sites
          we used every week were slow, buried the chart under ads, and rounded
          NOAA&apos;s predictions until the times drifted by twenty minutes or
          more. Tide times are a solved scientific problem — there is no excuse
          for showing anglers the wrong ones.
        </p>

        <h2 className="pt-2 text-xl font-semibold tracking-tight text-ink">
          Where the data comes from
        </h2>
        <p>
          Tide predictions come directly from{" "}
          <a
            href="https://tidesandcurrents.noaa.gov/"
            rel="noopener"
            className="text-sky-300 hover:text-teal-300"
          >
            NOAA CO-OPS
          </a>{" "}
          harmonic prediction stations — the same data printed in official tide
          tables — refreshed continuously and displayed to the minute, in each
          station&apos;s own local time zone. Weather, wind, waves, and sea
          surface temperature come from the Open-Meteo forecast models. Sun and
          moon times are computed astronomically for each station&apos;s exact
          coordinates. If a live feed is ever unreachable, the page says so
          with a visible badge instead of quietly showing stale numbers.
        </p>
        <p>
          The fishing score is our own formula, and it&apos;s fully documented in{" "}
          <Link
            href="/guides/how-the-fishing-score-works"
            className="text-sky-300 hover:text-teal-300"
          >
            How the Fishing Score Works
          </Link>{" "}
          — tide movement weighted heaviest, then dawn/dusk light, moon phase,
          wind, weather, and water temperature. We&apos;d rather you understand
          it than trust it blindly.
        </p>

        <h2 className="pt-2 text-xl font-semibold tracking-tight text-ink">
          How the site makes money
        </h2>
        <p>
          USTideCharts is free and doesn&apos;t require an account. It&apos;s
          supported by advertising and by gear recommendations that link to{" "}
          <a
            href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=about"
            rel="noopener"
            className="text-sky-300 hover:text-teal-300"
          >
            TheAnglerStore
          </a>
          , our sister shop. Every product card shows the store&apos;s real
          name and price for the exact item it links to, and pages only claim
          gear was &quot;matched to the species&quot; when it actually was.
          Tide predictions are for planning, not navigation — always check
          conditions on the water, and check current regulations before keeping
          any fish.
        </p>
        <p>
          Questions, corrections, or a station you want covered? See the{" "}
          <Link href="/contact" className="text-sky-300 hover:text-teal-300">
            contact page
          </Link>
          . If you run a marina, bait shop, or charter site, our{" "}
          <Link href="/widget" className="text-sky-300 hover:text-teal-300">
            free embeddable tide widget
          </Link>{" "}
          puts a live chart on your own page.
        </p>
      </div>
    </div>
  );
}
