export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO 8601: "2024-01-15"
  author: string; // author slug
  category: string; // category slug
  tags: string[];
  tldr?: string;
  image?: string;
}

export interface Heading {
  id: string;
  text: string;
  level: number; // 2 or 3
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number; // minutes
  headings: Heading[];
}

export interface Author {
  name: string;
  slug: string;
  bio: string;
  shortBio: string;
  avatar: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Category {
  name: string;
  slug: string;
  description: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}
