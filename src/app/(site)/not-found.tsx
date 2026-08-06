import Link from "next/link";
import SearchBar from "@/components/SearchBar";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-28 text-center sm:px-6">
      <p className="text-6xl" aria-hidden>🌊</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">
        That spot isn&apos;t on the chart yet
      </h1>
      <p className="mt-3 text-ink-dim">
        We&apos;re adding new locations constantly. Try searching for a nearby spot,
        or head back to shore.
      </p>
      <div className="mt-6">
        <SearchBar />
      </div>
      <Link href="/" className="mt-6 inline-block text-sm text-sky-300 hover:text-teal-300">
        ← Back to the dashboard
      </Link>
    </div>
  );
}
