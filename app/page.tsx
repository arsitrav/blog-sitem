import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import PostCard from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Yazılım, web geliştirme ve teknoloji üzerine yazılar.",
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <section className="max-w-[730px] mx-auto">
      <h1 className="text-2xl font-bold mb-8">Son Yazılar</h1>
      {posts.length === 0 ? (
        <p className="text-[var(--muted-foreground)]">Henüz yazı yok.</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
