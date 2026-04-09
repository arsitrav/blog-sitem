import Link from "next/link";
import Script from "next/script";
import type { BreadcrumbItem } from "@/types";

interface Props {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: Props) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Anasayfa",
        item: siteUrl,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${siteUrl}${item.href}`,
      })),
    ],
  };

  return (
    <>
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(schema)}
      </Script>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted-foreground)] list-none m-0 p-0">
          <li>
            <Link
              href="/"
              className="hover:text-[var(--foreground)] transition-colors"
            >
              Anasayfa
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1.5">
              <span aria-hidden>/</span>
              {i === items.length - 1 ? (
                <span
                  className="text-[var(--foreground)]"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
