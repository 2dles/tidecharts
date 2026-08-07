import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductCard from "@/components/ProductCard";
import AdSlot from "@/components/AdSlot";
import { ARTICLES, getArticle } from "@/lib/articles";
import { getProducts } from "@/lib/gear";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/guides/${article.slug}` },
    openGraph: { title: article.title, description: article.description, type: "article" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const gear = getProducts(article.gearKeys);
  const related = article.relatedSlugs
    .map((s) => getArticle(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: { "@type": "Organization", name: "USTideCharts" },
    publisher: { "@type": "Organization", name: "USTideCharts" },
    mainEntityOfPage: `https://ustidecharts.com/guides/${article.slug}`,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: article.title, href: `/guides/${article.slug}` },
        ]}
      />
      <article className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-teal-300/80">
          Guide · {article.readMinutes} min read
        </p>
        <h1 className="mt-2 text-balance text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-dim">
          {article.description}
        </p>
        {article.sections.map((s, i) => (
          <section key={i} className="mt-8">
            {s.heading && (
              <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
            )}
            {s.paragraphs.map((p, j) => (
              <p key={j} className="mt-4 leading-relaxed text-ink-dim">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      <AdSlot placement="guide" />

      <section className="mt-12" aria-labelledby="article-gear-h">
        <h2 id="article-gear-h" className="text-lg font-semibold tracking-tight">
          Gear Mentioned in This Guide
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {gear.map((p) => (
            <ProductCard key={p.key} p={p} />
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-h">
          <h2 id="related-h" className="text-lg font-semibold tracking-tight">
            Keep Reading
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link key={r.slug} href={`/guides/${r.slug}`} className="card card-hover p-5">
                <p className="font-semibold leading-snug">{r.title}</p>
                <p className="mt-2 text-xs text-ink-faint">{r.readMinutes} min read</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
