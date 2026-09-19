import type { Metadata } from "next";
import { Fraunces, Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://jenniferluo.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jennifer Luo — Software Engineer",
    template: "%s — Jennifer Luo",
  },
  description:
    "Jennifer Luo is a rising senior in Computer Science at Tufts University, building a self-driving lab system for soft robotics research and starting an SDE internship at AWS in 2026.",
  openGraph: {
    title: "Jennifer Luo — Software Engineer",
    description: "CS @ Tufts '27 · SDE Intern @ Amazon Web Services (AWS)",
    url: siteUrl,
    siteName: "Jennifer Luo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jennifer Luo — Software Engineer",
    description: "CS @ Tufts '27 · SDE Intern @ Amazon Web Services (AWS)",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="antialiased bg-bg text-text">
        <a
          href="#main"
          className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:bg-bg focus-visible:text-text focus-visible:border focus-visible:border-copper focus-visible:px-4 focus-visible:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
