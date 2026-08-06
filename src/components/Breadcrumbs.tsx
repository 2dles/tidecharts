import Link from "next/link";

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `https://ustidecharts.com${c.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-faint">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {i === crumbs.length - 1 ? (
              <span className="text-ink-dim">{c.name}</span>
            ) : (
              <Link href={c.href} className="transition-colors hover:text-ink-dim">
                {c.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
