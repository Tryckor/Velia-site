import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Velia — Agence digitale & IA",
    short_name: "Velia",
    description:
      "Sites web, automatisations, SEO et agents IA sur mesure pour votre entreprise.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/velia-logo.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
