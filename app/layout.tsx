import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Blog Sitem";
const authorName = process.env.NEXT_PUBLIC_AUTHOR_NAME ?? "Oğuz Ali Yiğit";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: "Yazılım, web geliştirme ve teknoloji üzerine yazılar.",
  openGraph: {
    siteName,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: "/images/og/default.png",
        width: 1200,
        height: 630,
        alt: "TKAS Blog Sitem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: siteUrl,
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  founder: { "@type": "Person", name: authorName },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="font-sans bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col antialiased">
        <Script id="org-schema" type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </Script>
        <Script id="website-schema" type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </Script>
        <Header />
        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
