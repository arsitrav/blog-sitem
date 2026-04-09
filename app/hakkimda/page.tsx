import type { Metadata } from "next";
import { getAuthorBySlug } from "@/lib/authors";

export const metadata: Metadata = {
  title: "Hakkımda",
  description: "Oğuz Ali Yiğit hakkında.",
  alternates: { canonical: "/hakkimda" },
};

export default function HakkimdaPage() {
  const author = getAuthorBySlug("oguz-ali");

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{author?.name ?? "Hakkımda"}</h1>
        {author?.shortBio && (
          <p className="text-[var(--muted-foreground)]">{author.shortBio}</p>
        )}
      </header>
      {author?.bio && (
        <section className="prose prose-neutral dark:prose-invert max-w-none">
          <p>{author.bio}</p>
        </section>
      )}
    </article>
  );
}
