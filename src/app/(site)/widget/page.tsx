import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import CopyButton from "@/components/CopyButton";
import { LOCATIONS } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Free Embeddable Tide Chart Widget for Your Website",
  description:
    "Add a live, interactive NOAA tide chart to your marina, harbor, bait shop, or charter website — free, no signup, one line of code.",
  alternates: { canonical: "/widget" },
};

const snippet = (
  slug: string,
) => `<iframe src="https://ustidecharts.com/embed/${slug}"
  title="Tide chart"
  width="100%" height="460"
  style="border:0;border-radius:12px;overflow:hidden"
  loading="lazy"></iframe>`;

export default function WidgetPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Tide Widget", href: "/widget" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Free Tide Chart <span className="text-ink-faint">Widget</span>
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-ink-dim">
        Run a marina, harbor office, bait shop, charter operation, or fishing
        club? Put a live, interactive tide chart on your own website — the same
        NOAA-powered chart from USTideCharts, free, no signup, no API key. Paste
        one line of code and it stays current forever.
      </p>

      <section className="mt-8" aria-labelledby="how-widget-h">
        <h2 id="how-widget-h" className="text-lg font-semibold tracking-tight">
          Add it in 30 seconds
        </h2>
        <ol className="mt-3 max-w-2xl space-y-2 text-sm leading-relaxed text-ink-dim">
          <li>
            <span className="font-medium text-ink">1.</span> Pick your location
            slug from the{" "}
            <Link href="/california" className="text-sky-300 hover:text-teal-300">
              locations page
            </Link>{" "}
            — it&apos;s the last part of the URL (e.g.{" "}
            <code className="rounded bg-card-hi px-1.5 py-0.5 text-xs">monterey</code>,{" "}
            <code className="rounded bg-card-hi px-1.5 py-0.5 text-xs">half-moon-bay</code>).
          </li>
          <li>
            <span className="font-medium text-ink">2.</span> Paste this snippet
            into your page, swapping the slug if needed:
          </li>
        </ol>

        <div className="card mt-4 overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">
              Embed code
            </p>
            <CopyButton text={snippet("monterey")} />
          </div>
          <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-sky-200">
            {snippet("monterey")}
          </pre>
        </div>
      </section>

      <section className="mt-10" aria-labelledby="preview-h">
        <h2 id="preview-h" className="text-lg font-semibold tracking-tight">
          Live preview
        </h2>
        <div className="card mt-4 p-2 sm:p-3">
          <iframe
            src="/embed/monterey"
            title="Monterey tide chart widget preview"
            width="100%"
            height="460"
            style={{ border: 0, borderRadius: 12, overflow: "hidden" }}
            loading="lazy"
          />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="widget-faq-h">
        <h2 id="widget-faq-h" className="text-lg font-semibold tracking-tight">
          The fine print
        </h2>
        <div className="mt-3 max-w-2xl space-y-3 text-sm leading-relaxed text-ink-dim">
          <p>
            The widget is free for any website, commercial or not. Tide
            predictions come from NOAA CO-OPS and refresh automatically — you
            never need to update anything. The chart is fully interactive:
            visitors can pan, zoom, and hover just like on USTideCharts.
          </p>
          <p>
            We ask only that the small &quot;USTideCharts&quot; credit link stays
            visible. Currently available for {LOCATIONS.length} California
            locations, with more states coming — if you need a location we
            don&apos;t cover yet, reach out and we&apos;ll usually add it within
            a week.
          </p>
        </div>
      </section>
    </div>
  );
}
