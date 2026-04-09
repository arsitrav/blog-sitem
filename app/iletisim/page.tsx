import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Benimle iletişime geçin.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">İletişim</h1>
        <p className="text-[var(--muted-foreground)]">
          Sorularınız veya işbirliği teklifleri için ulaşabilirsiniz.
        </p>
      </header>
      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/oguzaliyigit"
            target="_blank"
            rel="noopener noreferrer"
          >
            oguzaliyigit
          </a>
        </p>
      </section>
    </article>
  );
}
