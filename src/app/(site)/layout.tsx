import Link from "next/link";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-abyss/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center gap-1.5 font-semibold tracking-tight sm:gap-2">
            <span aria-hidden className="hidden h-7 w-7 place-items-center min-[380px]:grid rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 text-sm text-abyss">
              ≈
            </span>
            <span>
              USTide<span className="text-gradient">Charts</span>
            </span>
          </Link>
          <div className="flex items-center text-[13px] text-ink-dim sm:gap-2 sm:text-sm">
            <Link href="/locations" className="rounded-lg px-1 py-1.5 transition-colors hover:bg-card-hi hover:text-ink min-[380px]:px-1.5 sm:px-3">
              Locations
            </Link>
            <Link href="/guides" className="rounded-lg px-1 py-1.5 transition-colors hover:bg-card-hi hover:text-ink min-[380px]:px-1.5 sm:px-3">
              Guides
            </Link>
            <Link href="/water-temps" className="rounded-lg px-1 py-1.5 transition-colors hover:bg-card-hi hover:text-ink min-[380px]:px-1.5 sm:px-3">
              <span className="hidden sm:inline">Water </span>Temps
            </Link>
            <a
              href="https://theanglerstore.com?utm_source=ustidecharts&utm_medium=nav"
              className="ml-0.5 whitespace-nowrap rounded-lg bg-gradient-to-r from-sky-500/90 to-teal-500/90 px-2 py-1.5 font-medium text-abyss transition-opacity hover:opacity-90 sm:px-3"
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
            <div className="flex flex-wrap gap-x-12 gap-y-8">
              <div className="flex flex-col gap-2">
                <p className="font-medium text-ink-dim">Explore</p>
                <Link href="/california" className="hover:text-ink-dim">California Tides</Link>
                <Link href="/florida" className="hover:text-ink-dim">Florida Tides</Link>
                <Link href="/texas" className="hover:text-ink-dim">Texas Tides</Link>
                <Link href="/georgia" className="hover:text-ink-dim">Georgia Tides</Link>
                <Link href="/south-carolina" className="hover:text-ink-dim">South Carolina Tides</Link>
                <Link href="/north-carolina" className="hover:text-ink-dim">North Carolina Tides</Link>
                <Link href="/washington" className="hover:text-ink-dim">Washington Tides</Link>
                <Link href="/oregon" className="hover:text-ink-dim">Oregon Tides</Link>
                <Link href="/louisiana" className="hover:text-ink-dim">Louisiana Tides</Link>
                <Link href="/mississippi" className="hover:text-ink-dim">Mississippi Tides</Link>
                <Link href="/alabama" className="hover:text-ink-dim">Alabama Tides</Link>
                <Link href="/virginia" className="hover:text-ink-dim">Virginia Tides</Link>
                <Link href="/maryland" className="hover:text-ink-dim">Maryland Tides</Link>
                <Link href="/delaware" className="hover:text-ink-dim">Delaware Tides</Link>
                <Link href="/new-jersey" className="hover:text-ink-dim">New Jersey Tides</Link>
                <Link href="/new-york" className="hover:text-ink-dim">New York Tides</Link>
                <Link href="/connecticut" className="hover:text-ink-dim">Connecticut Tides</Link>
                <Link href="/rhode-island" className="hover:text-ink-dim">Rhode Island Tides</Link>
                <Link href="/massachusetts" className="hover:text-ink-dim">Massachusetts Tides</Link>
                <Link href="/new-hampshire" className="hover:text-ink-dim">New Hampshire Tides</Link>
                <Link href="/maine" className="hover:text-ink-dim">Maine Tides</Link>
                <Link href="/guides" className="hover:text-ink-dim">Fishing Guides</Link>
                <Link href="/water-temps" className="hover:text-ink-dim">Water Temperatures</Link>
                <Link href="/widget" className="hover:text-ink-dim">Free Tide Widget</Link>
                <Link href="/about" className="hover:text-ink-dim">About</Link>
                <Link href="/contact" className="hover:text-ink-dim">Contact</Link>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-ink-dim">Popular Tide Charts</p>
                <Link href="/california/san-diego" className="hover:text-ink-dim">San Diego Tides</Link>
                <Link href="/california/los-angeles" className="hover:text-ink-dim">Los Angeles Tides</Link>
                <Link href="/california/san-francisco" className="hover:text-ink-dim">San Francisco Tides</Link>
                <Link href="/california/monterey" className="hover:text-ink-dim">Monterey Tides</Link>
                <Link href="/florida/tampa-bay" className="hover:text-ink-dim">Tampa Bay Tides</Link>
                <Link href="/florida/miami" className="hover:text-ink-dim">Miami Tides</Link>
                <Link href="/florida/key-west" className="hover:text-ink-dim">Key West Tides</Link>
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
