import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = "https://velia.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Velia — Sites web, automatisations & IA pour votre entreprise",
    template: "%s · Velia",
  },
  description:
    "Velia conçoit des sites web modernes, des automatisations, du SEO, des agents IA et des chatbots pour faire gagner du temps et des clients aux entreprises.",
  keywords: [
    "création site web",
    "agence web",
    "automatisation",
    "SEO",
    "agent IA",
    "chatbot",
    "intelligence artificielle entreprise",
  ],
  authors: [{ name: "Velia" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Velia",
    title: "Velia — Sites web, automatisations & IA pour votre entreprise",
    description:
      "Sites web, automatisations, SEO, agents IA et chatbots. Velia construit des outils digitaux qui font gagner du temps et des clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velia — Sites web, automatisations & IA",
    description:
      "Sites web, automatisations, SEO, agents IA et chatbots pour votre entreprise.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
