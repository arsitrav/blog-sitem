import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getAllPostSlugs, getCompiledPost } from "@/lib/mdx";
import { getAuthorBySlug } from "@/lib/authors";
import TableOfContents from "@/components/blog/TableOfContents";
import Breadcrumb from "@/components/blog/Breadcrumb";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = await getCompiledPost(params.slug);
  if (!result) return {};

  const { post } = result;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const result = await getCompiledPost(params.slug);
  if (!result) notFound();

  const { post, compiledContent } = result;
  const author = getAuthorBySlug(post.author);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${siteUrl}/blog/${post.slug}`,
    author: author
      ? { "@type": "Person", name: author.name }
      : { "@type": "Person", name: post.author },
    keywords: post.tags.join(", "),
  };

  const dateStr = new Date(post.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Script id="article-schema" type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </Script>
      <Breadcrumb
        items={[{ name: post.title, href: `/blog/${post.slug}` }]}
      />
      <div className={post.headings.length > 0 ? "lg:grid lg:grid-cols-[1fr_220px] lg:gap-12" : "max-w-[730px]"}>
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-3">
              <time dateTime={post.date}>{dateStr}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} dk okuma</span>
              {author && (
                <>
                  <span aria-hidden>·</span>
                  <a
                    href={`/yazar/${author.slug}`}
                    className="hover:text-[var(--foreground)] transition-colors"
                  >
                    {author.name}
                  </a>
                </>
              )}
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-3">
              {post.title}
            </h1>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              {post.description}
            </p>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <section className="prose prose-neutral dark:prose-invert max-w-none">
            {compiledContent}
          </section>
        </article>
        {post.headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
