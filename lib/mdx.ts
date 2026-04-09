import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import type { Post, PostFrontmatter, Heading } from "@/types";
import { getMDXComponents } from "@/components/mdx/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];

  for (const match of content.matchAll(headingRegex)) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    headings.push({ id, text, level });
  }

  return headings;
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();

  return slugs
    .map((slug) => {
      const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = data as PostFrontmatter;
      const stats = readingTime(content);

      return {
        ...frontmatter,
        slug,
        content,
        readingTime: Math.ceil(stats.minutes),
        headings: extractHeadings(content),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByCategory(categorySlug: string): Post[] {
  return getAllPosts().filter((p) => p.category === categorySlug);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((p) => p.author === authorSlug);
}

export async function getCompiledPost(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;
  const stats = readingTime(content);
  const headings = extractHeadings(content);

  const { content: compiledContent } = await compileMDX({
    source: content,
    components: getMDXComponents(),
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor"],
                ariaLabel: "Bağlantı",
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: { dark: "github-dark", light: "github-light" },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return {
    post: {
      ...frontmatter,
      slug,
      content,
      readingTime: Math.ceil(stats.minutes),
      headings,
    } as Post,
    compiledContent,
  };
}
