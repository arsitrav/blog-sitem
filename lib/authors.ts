import fs from "fs";
import path from "path";
import type { Author } from "@/types";

const AUTHORS_DIR = path.join(process.cwd(), "content", "authors");

export function getAllAuthors(): Author[] {
  return fs
    .readdirSync(AUTHORS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(AUTHORS_DIR, f), "utf-8");
      return JSON.parse(raw) as Author;
    });
}

export function getAuthorBySlug(slug: string): Author | undefined {
  const filePath = path.join(AUTHORS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Author;
}
