import { Feed } from "feed";
import { getAllPosts } from "./mdx";

export async function generateRSS(): Promise<string> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Blog Sitem";
  const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Blog Yazarı";

  const feed = new Feed({
    title: siteName,
    description: `${siteName} — son yazılar`,
    id: siteUrl,
    link: siteUrl,
    language: "tr",
    feedLinks: { rss2: `${siteUrl}/feed.xml` },
    author: { name: authorName, link: siteUrl },
    copyright: `© ${new Date().getFullYear()} ${authorName}`,
  });

  const posts = getAllPosts();

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      category: [{ name: post.category }],
    });
  }

  return feed.rss2();
}
