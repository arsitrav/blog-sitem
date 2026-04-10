"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/types";

const HEADER_OFFSET = 96; // sticky header yüksekliği (~90px) + buffer

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Görünür heading'lerin en yukarıdakini aktif say
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: `-${HEADER_OFFSET}px 0px -60% 0px` }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: y, behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
  };

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
              onClick={(e) => handleClick(e, h.id)}
              className={`text-xs leading-relaxed block py-0.5 transition-colors ${
                activeId === h.id
                  ? "text-[var(--foreground)] font-medium"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
