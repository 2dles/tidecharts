import Link from "next/link";

// Deliberately static and tiny. This boundary gets serialized into EVERY
// page under the (site) layout, so anything rendered here — like the old
// SearchBar + full location index — ships on all ~900 pages whether they use
// it or not (that one mistake added ~210 KB to every station page).
export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-28 text-center sm:px-6">
      <p className="text-6xl" aria-hidden>🌊</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        That spot isn&apos;t on the chart yet
      </h1>
      <p className="mt-3 text-ink-dim">
        We&apos;re adding new locations constantly. Browse every station we
        cover, or head back to shore.
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <Link
          href="/locations"
          className="rounded-xl border border-line-hi bg-card px-5 py-2.5 font-medium text-sky-300 transition-colors hover:border-sky-400/50 hover:text-teal-300"
        >
          Browse all locations →
        </Link>
        <Link href="/" className="text-sm text-ink-faint hover:text-ink-dim">
          ← Back to the dashboard
        </Link>
      </div>
    </div>
  );
}
