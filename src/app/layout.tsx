import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * Deliberately not using next/font/google here: it requires a network
 * call to fonts.googleapis.com at build time, which fails in offline/
 * proxied/sandboxed build environments. The system font stack in
 * globals.css looks clean across platforms and keeps the build hermetic.
 * Swap in next/font/google (or next/font/local) freely once you have a
 * reliable connection to Google Fonts in your build environment.
 */

const siteUrl = "https://bioverse.example.edu";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BioVerse — Explore Life From Cell to Human",
    template: "%s | BioVerse",
  },
  description:
    "BioVerse is an interactive 3D biology learning universe: explore the human body, cells, genetics and more. Learn biology. See it. Interact with it. Understand it.",
  openGraph: {
    title: "BioVerse — Explore Life From Cell to Human",
    description:
      "An interactive 3D biology learning universe covering human anatomy, cell biology, genetics and more, in English and বাংলা.",
    url: siteUrl,
    siteName: "BioVerse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioVerse — Explore Life From Cell to Human",
    description: "Learn Biology. See It. Interact With It. Understand It.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-bg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
