import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryBySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";
import Breadcrumb from "@/components/blog/Breadcrumb";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/kategori/${category.slug}` },
    openGraph: {
      title: category.name,
      description: category.description,
    },
  };
}

export default async function KategoriPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const posts = await getPostsByCategory(params.slug);

  return (
    <>
      <Breadcrumb
        items={[{ name: category.name, href: `/kategori/${category.slug}` }]}
      />
      <section>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{category.name}</h1>
          <p className="text-[var(--muted-foreground)]">
            {category.description}
          </p>
        </header>
        {posts.length === 0 ? (
          <p className="text-[var(--muted-foreground)]">
            Bu kategoride henüz yazı yok.
          </p>
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
