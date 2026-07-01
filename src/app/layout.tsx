import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://velia-digital.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Velia",
  description:
    "Agence digitale & IA : sites web, automatisations, SEO, agents IA et chatbots sur mesure.",
  url: siteUrl,
  email: "veliadigital.fr@gmail.com",
  image: `${siteUrl}/velia-logo.png`,
  areaServed: "FR",
  knowsAbout: [
    "Création de sites web",
    "Automatisation",
    "Référencement SEO",
    "Agents IA",
    "Chatbots",
    "Hébergement mail",
    "Devis instantané par IA",
  ],
  slogan: "Le digital qui fait gagner du temps et des clients.",
};

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
    images: [
      { url: "/velia-logo.png", width: 512, height: 512, alt: "Velia" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Velia — Sites web, automatisations & IA",
    description:
      "Sites web, automatisations, SEO, agents IA et chatbots pour votre entreprise.",
    images: ["/velia-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <ElevenLabsWidget />
      </body>
    </html>
  );
}
