import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How USTideCharts handles data: what we collect, cookies, advertising, and your choices.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy <span className="text-ink-faint">Policy</span>
      </h1>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-ink-dim">
        <p>
          <em>Last updated: August 2026.</em> USTideCharts.com (&quot;we&quot;)
          is a fishing-planning website. This page explains what information the
          site handles and the choices you have.
        </p>

        <h2 className="pt-2 text-lg font-semibold tracking-tight text-ink">
          What we collect
        </h2>
        <p>
          USTideCharts does not require accounts and does not ask for personal
          information to use the site. Like most websites, our hosting provider
          keeps standard server logs (IP address, browser type, pages
          requested) for security and performance. If we use analytics, the
          data is aggregate — page views, referral sources, approximate
          geography — and is not used to identify individuals.
        </p>

        <h2 className="pt-2 text-lg font-semibold tracking-tight text-ink">
          Tide and weather data
        </h2>
        <p>
          Tide predictions come from NOAA CO-OPS and weather/marine forecasts
          from Open-Meteo. Requests for that data are made by our servers, not
          from your browser, so those providers do not receive your personal
          information from us.
        </p>

        <h2 className="pt-2 text-lg font-semibold tracking-tight text-ink">
          Advertising and cookies
        </h2>
        <p>
          We may display advertising served by Google AdSense. Google and its
          partners may use cookies or similar technologies to serve ads based
          on your visits to this and other websites. You can opt out of
          personalized advertising at{" "}
          <a
            href="https://adssettings.google.com"
            className="text-sky-300 hover:text-teal-300"
            rel="noopener"
          >
            Google Ads Settings
          </a>
          , and learn how Google uses data at{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            className="text-sky-300 hover:text-teal-300"
            rel="noopener"
          >
            policies.google.com
          </a>
          . Visitors in regions with consent requirements are shown a consent
          message before any advertising cookies are set.
        </p>

        <h2 className="pt-2 text-lg font-semibold tracking-tight text-ink">
          Links to other sites
        </h2>
        <p>
          Product recommendations link to TheAnglerStore.com and may include
          referral parameters so we can understand which recommendations are
          useful. External sites have their own privacy policies.
        </p>

        <h2 className="pt-2 text-lg font-semibold tracking-tight text-ink">
          Contact
        </h2>
        <p>
          Questions about this policy: email{" "}
          <a
            href="mailto:hello@ustidecharts.com"
            className="text-sky-300 hover:text-teal-300"
          >
            hello@ustidecharts.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
