import type { Metadata } from "next";
import { QuoteBotArtisan } from "@/components/QuoteBotArtisan";
import { getClient } from "@/lib/artisanConfigs";

/**
 * BROUILLON de site pour EPCC (artisan, Lons 64) — vitrine portfolio Velia.
 * Page-démo uniquement : noindex, hébergée sur le domaine Velia, JAMAIS
 * publiée sur epcc64.fr sans accord de Thomas. Contenu repris de epcc64.fr.
 */
export const metadata: Metadata = {
  title: "EPCC — Électricité, plomberie, salle de bain & climatisation à Lons (64)",
  description:
    "EPCC, l'artisan qui vous simplifie la vie : électricité, plomberie, salle de bain et climatisation à Lons, Pau et 50 km autour. Devis gratuit en 30 s.",
  robots: { index: false },
};

const TEL = "07 89 31 48 03";
const TEL_HREF = "tel:+33789314803";
const EMAIL = "thomas@epcc64.fr";

const SERVICES = [
  {
    icon: "⚡",
    t: "Électricité",
    d: "Installations neuves, rénovation, mise aux normes NF C 15-100, domotique et bornes de recharge.",
  },
  {
    icon: "🔧",
    t: "Plomberie",
    d: "Fuites, canalisations, chauffe-eau, sanitaires, rénovation complète. Dépannage rapide.",
  },
  {
    icon: "🚿",
    t: "Salle de bain",
    d: "Conception et réalisation clé en main : carrelage, plomberie et électricité. Un seul chantier, un seul contact.",
  },
  {
    icon: "❄️",
    t: "Climatisation",
    d: "Installation, mise en service et entretien de systèmes air/air, pour votre confort toute l'année.",
  },
];

const ENGAGEMENTS = [
  { t: "Un seul interlocuteur", d: "Tous les corps de métier réunis : vous ne courez plus après dix artisans." },
  { t: "Devis gratuit & sans engagement", d: "Une estimation claire avant de vous décider, sans surprise." },
  { t: "Travaux aux normes", d: "Respect des normes NF C 15-100 et des DTU, pour une installation sûre et durable." },
  { t: "Interventions d'urgence", d: "Plomberie ou électricité : on intervient vite quand ça ne peut pas attendre." },
];

const ZONES = ["Lons", "Pau", "Lescar", "Idron", "Jurançon", "Billère", "Biganos"];

export default function EpccSitePage() {
  const cfg = getClient("epcc")!.config;

  return (
    <div className="min-h-screen bg-white text-[#0f172a]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-baseline gap-1 text-xl font-extrabold tracking-tight">
            <span className="text-[#1d4ed8]">EP</span>
            <span>CC</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#475569] md:flex">
            <a href="#services" className="hover:text-[#0f172a]">Services</a>
            <a href="#zones" className="hover:text-[#0f172a]">Zones</a>
            <a href="#devis" className="hover:text-[#0f172a]">Devis en ligne</a>
            <a href="#contact" className="hover:text-[#0f172a]">Contact</a>
          </nav>
          <a
            href={TEL_HREF}
            className="rounded-full bg-[#1d4ed8] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_-10px_rgba(29,78,216,0.7)] transition-transform hover:scale-[1.03]"
          >
            {TEL}
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#eff4ff] to-white" />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-20 lg:grid-cols-2 lg:gap-16 lg:pb-28 lg:pt-28">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                Électricité · Plomberie · Salle de bain · Climatisation
              </p>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                L'artisan qui vous{" "}
                <span className="bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] bg-clip-text text-transparent">
                  simplifie la vie
                </span>.
              </h1>
              <p className="mt-6 max-w-xl text-pretty text-lg text-[#475569]">
                EPCC réunit tous les corps de métier du bâtiment sous un seul interlocuteur.
                Plus de 20 ans d'expérience au service de votre confort — à Lons, Pau et dans un
                rayon de 50 km.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#devis"
                  className="rounded-full bg-[#1d4ed8] px-7 py-3.5 text-center font-semibold text-white shadow-[0_18px_45px_-14px_rgba(29,78,216,0.75)] transition-transform hover:scale-[1.02]"
                >
                  Devis gratuit en 30 s →
                </a>
                <a
                  href={TEL_HREF}
                  className="rounded-full border border-[#cbd5e1] bg-white px-7 py-3.5 text-center font-semibold text-[#0f172a] transition-colors hover:border-[#1d4ed8]/50"
                >
                  📞 {TEL}
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#64748b]">
                <span>✓ +20 ans d'expérience</span>
                <span>✓ Devis gratuit</span>
                <span>✓ Normes NF C 15-100</span>
                <span>✓ Urgences</span>
              </div>
            </div>

            <div id="devis-top" className="lg:pl-6">
              <QuoteBotArtisan config={cfg} />
              <p className="mt-3 text-center text-[13px] text-[#94a3b8]">
                👆 Estimez votre projet en direct — choisissez un métier
              </p>
            </div>
          </div>
        </section>

        {/* BANDE CONFIANCE */}
        <section className="border-y border-black/[0.06] bg-[#0f172a] text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-6 py-10 sm:grid-cols-4">
            {[
              ["+20 ans", "d'expérience cumulée"],
              ["4 métiers", "1 seul interlocuteur"],
              ["Gratuit", "devis sans engagement"],
              ["7j/7", "interventions d'urgence"],
            ].map(([big, small]) => (
              <div key={small} className="text-center">
                <div className="text-2xl font-extrabold text-[#60a5fa] sm:text-3xl">{big}</div>
                <div className="mt-1 text-[13px] text-white/70">{small}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20 sm:py-24">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Nos services</h2>
          <p className="mt-3 max-w-2xl text-[#475569]">
            Du dépannage rapide à la rénovation complète, EPCC prend en charge l'ensemble de votre projet.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.t}
                className="rounded-2xl border border-black/[0.08] bg-white p-6 transition-shadow hover:shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#eff4ff] text-2xl">
                  {s.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#64748b]">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ENGAGEMENTS */}
        <section className="bg-[#f8fafc] py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Pourquoi choisir EPCC
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {ENGAGEMENTS.map((e) => (
                <div key={e.t} className="flex gap-4">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-[#1d4ed8]" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="text-[17px] font-semibold">{e.t}</h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#64748b]">{e.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEVIS EN LIGNE (chatbot) */}
        <section id="devis" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#1d4ed8]">
                Devis instantané
              </p>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Une estimation en 30 secondes, à toute heure.
              </h2>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#475569]">
                Décrivez votre projet à notre assistant : vous obtenez une fourchette de prix
                indicative immédiatement, même le soir et le week-end. On affine ensuite ensemble
                sur place — gratuitement et sans engagement.
              </p>
              <ul className="mt-6 space-y-2.5 text-[15px]">
                {[
                  "Réponse immédiate, 24h/24",
                  "Aucune création de compte",
                  "Vous êtes rappelé rapidement pour le devis précis",
                ].map((li) => (
                  <li key={li} className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-[#1d4ed8]" fill="none" stroke="currentColor" strokeWidth="2.8">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {li}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <QuoteBotArtisan config={cfg} />
            </div>
          </div>
        </section>

        {/* ZONES */}
        <section id="zones" className="bg-[#f8fafc] py-20 scroll-mt-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Zones d'intervention
            </h2>
            <p className="mt-3 max-w-2xl text-[#475569]">
              Basés à Lons (64140), nous intervenons dans un rayon de 50 km autour de Pau.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {ZONES.map((z) => (
                <span
                  key={z}
                  className="rounded-full border border-[#cbd5e1] bg-white px-4 py-2 text-sm font-medium text-[#0f172a]"
                >
                  📍 {z}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-[#cbd5e1] px-4 py-2 text-sm text-[#94a3b8]">
                … et alentours
              </span>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Parlons de votre projet
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-[#475569]">
                Un projet, une urgence, une question ? Appelez directement Thomas, ou lancez votre
                devis en ligne en haut de page.
              </p>
              <div className="mt-8 space-y-4 text-[16px]">
                <a href={TEL_HREF} className="flex items-center gap-3 font-medium hover:text-[#1d4ed8]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eff4ff]">📞</span>
                  {TEL}
                </a>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 font-medium hover:text-[#1d4ed8]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eff4ff]">✉️</span>
                  {EMAIL}
                </a>
                <div className="flex items-center gap-3 text-[#475569]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eff4ff]">🕐</span>
                  Lundi – Vendredi, 8h00 – 19h00
                </div>
                <div className="flex items-center gap-3 text-[#475569]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eff4ff]">📍</span>
                  64140 Lons, Pyrénées-Atlantiques
                </div>
              </div>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#1d4ed8] to-[#0ea5e9] p-8 text-white sm:p-10">
              <h3 className="text-2xl font-bold">Devis gratuit en 30 secondes</h3>
              <p className="mt-3 text-white/85">
                Pas envie d'attendre ? Estimez votre projet maintenant avec notre assistant en ligne,
                disponible jour et nuit.
              </p>
              <a
                href="#devis"
                className="mt-6 inline-block rounded-full bg-white px-7 py-3.5 font-semibold text-[#1d4ed8] transition-transform hover:scale-[1.02]"
              >
                Lancer mon devis →
              </a>
              <p className="mt-6 text-sm text-white/70">
                Ou appelez le {TEL} — réponse rapide, devis sans engagement.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-black/[0.06] bg-[#0f172a] text-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-base font-extrabold text-white">
              <span className="text-[#60a5fa]">EP</span>CC
            </div>
            <p className="mt-1 text-white/60">
              Électricité · Plomberie · Salle de bain · Climatisation — Lons (64) · SIRET 948 493 549
            </p>
          </div>
          <p className="text-white/50">
            Site & devis en ligne réalisés par{" "}
            <a href="/" className="underline hover:text-white">Velia</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
