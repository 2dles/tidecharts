import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Contact USTideCharts",
  description:
    "Get in touch — corrections, station requests, widget help, or partnership questions.",
  alternates: { canonical: "/contact" },
};

const EMAIL = "ajbmuse@gmail.com";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Contact <span className="text-ink-faint">Us</span>
      </h1>

      <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-dim">
        <p>
          USTideCharts is a small, independent operation, and mail gets read by
          the person who builds the site. The fastest way to reach us:
        </p>
        <p>
          <a
            href={`mailto:${EMAIL}?subject=USTideCharts`}
            className="inline-block rounded-xl border border-line-hi bg-card px-5 py-3 font-medium text-sky-300 transition-colors hover:border-sky-400/50 hover:text-teal-300"
          >
            {EMAIL}
          </a>
        </p>
        <p>A few things we especially want to hear about:</p>
        <p>
          <span className="text-ink">Data corrections.</span> If a tide time on
          any page disagrees with NOAA&apos;s official prediction for the same
          station, tell us the page and the time — we treat accuracy reports as
          the highest-priority mail we get.
        </p>
        <p>
          <span className="text-ink">Station and location requests.</span> We
          cover every NOAA tide prediction station in California and Florida.
          If your spot is missing or you want your state added next, ask — new
          locations usually ship within a week.
        </p>
        <p>
          <span className="text-ink">Widget and partnership questions.</span>{" "}
          Marinas, bait shops, harbormasters, and charter captains can embed
          our live tide chart free — see the{" "}
          <Link href="/widget" className="text-sky-300 hover:text-teal-300">
            widget page
          </Link>{" "}
          — and we&apos;re happy to help with setup.
        </p>
        <p className="text-sm text-ink-faint">
          For product and order questions about fishing gear, contact{" "}
          <a
            href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=contact"
            rel="noopener"
            className="text-sky-300 hover:text-teal-300"
          >
            TheAnglerStore
          </a>{" "}
          directly — it&apos;s our sister shop with its own support.
        </p>
      </div>
    </div>
  );
}
