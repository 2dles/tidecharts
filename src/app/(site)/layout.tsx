import Link from "next/link";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-abyss/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span aria-hidden className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 text-sm text-abyss">
              ≈
            </span>
            <span>
              USTide<span className="text-gradient">Charts</span>
            </span>
          </Link>
          <div className="flex items-center gap-0.5 text-sm text-ink-dim sm:gap-2">
            <Link href="/california" className="rounded-lg px-2 py-1.5 transition-colors hover:bg-card-hi hover:text-ink sm:px-3">
              Locations
            </Link>
            <Link href="/guides" className="rounded-lg px-2 py-1.5 transition-colors hover:bg-card-hi hover:text-ink sm:px-3">
              Guides
            </Link>
            <Link href="/water-temps" className="hidden rounded-lg px-2 py-1.5 transition-colors hover:bg-card-hi hover:text-ink sm:block sm:px-3">
              Water Temps
            </Link>
            <a
              href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=nav"
              className="ml-1 whitespace-nowrap rounded-lg bg-gradient-to-r from-sky-500/90 to-teal-500/90 px-2.5 py-1.5 font-medium text-abyss transition-opacity hover:opacity-90 sm:px-3"
            >
              <span className="hidden sm:inline">Gear </span>Store
            </a>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-line">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-ink-faint sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <p className="font-medium text-ink-dim">USTideCharts</p>
              <p className="mt-2">
                America&apos;s fishing dashboard. Tide predictions from NOAA CO-OPS;
                weather and marine forecasts from Open-Meteo. Predictions are for
                planning — always check conditions on the water.
              </p>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-ink-dim">Explore</p>
                <Link href="/california" className="hover:text-ink-dim">California Tides</Link>
                <Link href="/guides" className="hover:text-ink-dim">Fishing Guides</Link>
                <Link href="/water-temps" className="hover:text-ink-dim">Water Temperatures</Link>
                <Link href="/widget" className="hover:text-ink-dim">Free Tide Widget</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-ink-dim">Shop</p>
                <a href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=footer" className="hover:text-ink-dim">
                  TheAnglerStore
                </a>
              </div>
            </div>
          </div>
          <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-6">
            <span>© {new Date().getFullYear()} USTideCharts.com · Not for navigation.</span>
            <Link href="/privacy" className="hover:text-ink-dim">
              Privacy Policy
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
