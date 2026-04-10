import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import GithubSlugger from "github-slugger";
import type { Post, PostFrontmatter, Heading } from "@/types";
import { getMDXComponents } from "@/components/mdx/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

/** Her 3. h2 başlığından ÖNCE <NewsletterInline /> enjekte eder (code block'ları atlar) */
function injectNewsletterBetweenH2s(content: string): string {
  // Code block'ları geçici placeholder'larla koru
  const codeBlocks: string[] = [];
  const masked = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `\u0000CODEBLOCK${codeBlocks.length - 1}\u0000`;
  });

  let h2Count = 0;
  const injected = masked.replace(/^(## .+)$/gm, (match) => {
    h2Count++;
    // 4., 7., 10. h2'den önce newsletter ekle (her 3 başlık sonrası)
    if (h2Count > 1 && (h2Count - 1) % 3 === 0) {
      return `<NewsletterInline />\n\n${match}`;
    }
    return match;
  });

  // Code block'ları geri koy
  return injected.replace(/\u0000CODEBLOCK(\d+)\u0000/g, (_, i) => codeBlocks[Number(i)]);
}

function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  const slugger = new GithubSlugger();

  for (const match of content.matchAll(headingRegex)) {
    const level = match[1].length;
    const text = match[2].trim();
    // Strip inline markdown so slug matches rehype-slug's output
    const plainText = text
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [text](url) → text
      .replace(/[*_`]/g, "");                    // **bold**, _italic_, `code`
    const id = slugger.slug(plainText);
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
    source: injectNewsletterBetweenH2s(content),
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
