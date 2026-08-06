import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ustidecharts.com"),
  title: {
    default: "USTideCharts — America's Fishing Dashboard",
    template: "%s | USTideCharts",
  },
  description:
    "Real-time tide charts, weather, fishing forecasts and trip planning for thousands of locations.",
  openGraph: {
    siteName: "USTideCharts",
    type: "website",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://ustidecharts.com/#org",
      name: "USTideCharts",
      url: "https://ustidecharts.com",
      description:
        "America's fishing dashboard — live NOAA tide charts, weather, and fishing forecasts.",
    },
    {
      "@type": "WebSite",
      "@id": "https://ustidecharts.com/#site",
      name: "USTideCharts",
      url: "https://ustidecharts.com",
      publisher: { "@id": "https://ustidecharts.com/#org" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://ustidecharts.com/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ocean-bg min-h-screen antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
