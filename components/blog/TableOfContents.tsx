import type { Heading } from "@/types";

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  if (headings.length === 0) return null;

  return (
    <nav aria-label="İçindekiler" className="text-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
        İçindekiler
      </p>
      <ol className="space-y-1 list-none m-0 p-0">
        {headings.map((h) => (
          <li
            key={h.id}
            style={{ paddingLeft: h.level === 3 ? "0.875rem" : undefined }}
          >
            <a
              href={`#${h.id}`}
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors leading-relaxed block py-0.5"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
