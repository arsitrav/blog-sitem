import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getAllAuthors, getAuthorBySlug } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";
import Breadcrumb from "@/components/blog/Breadcrumb";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = getAuthorBySlug(params.slug);
  if (!author) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    title: author.name,
    description: author.shortBio,
    alternates: { canonical: `/yazar/${author.slug}` },
    openGraph: {
      title: author.name,
      description: author.shortBio,
      url: `${siteUrl}/yazar/${author.slug}`,
      type: "profile",
    },
  };
}

export default async function YazarPage({ params }: Props) {
  const author = getAuthorBySlug(params.slug);
  if (!author) notFound();

  const posts = await getPostsByAuthor(params.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio,
    url: `${siteUrl}/yazar/${author.slug}`,
    ...(author.social.github && {
      sameAs: [`https://github.com/${author.social.github}`],
    }),
  };

  return (
    <>
      <Script id="person-schema" type="application/ld+json">
        {JSON.stringify(personSchema)}
      </Script>
      <Breadcrumb
        items={[{ name: author.name, href: `/yazar/${author.slug}` }]}
      />
      <section>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{author.name}</h1>
          <p className="text-[var(--muted-foreground)]">{author.shortBio}</p>
          {author.bio && (
            <p className="mt-3 text-sm leading-relaxed">{author.bio}</p>
          )}
        </header>
        <h2 className="text-lg font-semibold mb-4">Yazılar</h2>
        {posts.length === 0 ? (
          <p className="text-[var(--muted-foreground)]">Henüz yazı yok.</p>
        ) : (
          <ul className="list-none m-0 p-0">
            {posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
