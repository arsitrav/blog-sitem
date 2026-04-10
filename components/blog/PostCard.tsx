import Link from "next/link";
import type { Post } from "@/types";
import { getCategoryBySlug } from "@/lib/categories";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const dateStr = new Date(post.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const category = post.category ? getCategoryBySlug(post.category) : undefined;

  return (
    <article className="group border-b border-[var(--border)] py-8 last:border-0">
      <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-2.5 font-medium tracking-wide">
        <time dateTime={post.date}>{dateStr}</time>
        <span aria-hidden>·</span>
        <span>{post.readingTime} dk okuma</span>
        {category && (
          <>
            <span aria-hidden>·</span>
            <Link
              href={`/kategori/${category.slug}`}
              className="text-[var(--accent)] hover:underline"
            >
              {category.name}
            </Link>
          </>
        )}
      </div>
      <h2 className="text-lg font-semibold tracking-tight mb-2 transition-colors group-hover:text-[var(--accent)]">
        <Link
          href={`/blog/${post.slug}`}
          className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4 line-clamp-2">
        {post.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
