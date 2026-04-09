import Link from "next/link";

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Blog Sitem";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[var(--border)]">
      <div className="mx-auto max-w-3xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
        <p className="tracking-tight">
          © {year} {siteName}
        </p>
        <nav aria-label="Alt menü">
          <ul className="flex gap-5 list-none m-0 p-0">
            <li>
              <Link href="/gizlilik" className="hover:text-[var(--foreground)] transition-colors">
                Gizlilik
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-[var(--foreground)] transition-colors">
                İletişim
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
