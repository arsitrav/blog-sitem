import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Blog" },
  { href: "/hakkimda", label: "Hakkımda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Blog Sitem";

  return (
    <header className="sticky top-0 z-50 bg-[var(--background)]/80 backdrop-blur-sm">
      <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <Image
            src="/images/logo/tkas.png"
            alt="ikas Logo"
            width={157}
            height={40}
            className="h-6 w-auto"
            priority
          />
          <span className="text-base font-semibold tracking-tight text-[var(--foreground)] hidden sm:inline">
            {siteName}
          </span>
        </Link>
        <nav aria-label="Ana menü">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors px-3 py-1.5 rounded-full hover:bg-[var(--muted)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/feed.xml"
                className="text-xs text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors px-3 py-1 rounded-full border border-[var(--border)] hover:border-[var(--accent)] ml-2"
              >
                RSS
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
