import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Fishing Guides — Tides, Moon Phases & Technique",
  description:
    "Long-form guides on how tides affect fishing, reading tide charts, moon phases, and surf fishing technique.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Fishing <span className="text-ink-faint">Guides</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink-dim">
        Understand the water and you&apos;ll never fish blind again. Field-tested
        guides on tides, moon phases, and technique.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {ARTICLES.map((a) => (
          <Link key={a.slug} href={`/guides/${a.slug}`} className="card card-hover flex flex-col p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-teal-300/80">
              Guide · {a.readMinutes} min read
            </p>
            <p className="mt-2 text-xl font-semibold leading-snug">{a.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-dim">{a.description}</p>
            <p className="mt-auto pt-4 text-sm font-medium text-sky-300">Read the guide →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
