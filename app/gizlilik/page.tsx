import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Gizlilik politikası ve veri kullanımı hakkında bilgi.",
  alternates: { canonical: "/gizlilik" },
};

export default function GizlilikPage() {
  return (
    <article>
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Gizlilik Politikası</h1>
      </header>
      <section className="prose prose-neutral dark:prose-invert max-w-none">
        <p>
          Bu site herhangi bir kişisel veri toplamamaktadır. Üçüncü taraf
          analitik veya reklam hizmeti kullanılmamaktadır.
        </p>
        <p>
          İçerikler yalnızca bilgilendirme amaçlıdır. Sorularınız için{" "}
          <a href="/iletisim">iletişim sayfasından</a> ulaşabilirsiniz.
        </p>
      </section>
    </article>
  );
}
