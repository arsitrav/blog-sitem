import fs from "fs";
import path from "path";
import type { Category } from "@/types";

const CATEGORIES_DIR = path.join(process.cwd(), "content", "categories");

export function getAllCategories(): Category[] {
  return fs
    .readdirSync(CATEGORIES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(CATEGORIES_DIR, f), "utf-8");
      return JSON.parse(raw) as Category;
    });
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const filePath = path.join(CATEGORIES_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Category;
}
