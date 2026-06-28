import Link from "next/link";
import { Nav } from "@/components/Nav";
import { QuoteBotArtisan } from "@/components/QuoteBotArtisan";

export const metadata = {
  title: "Devis automatisé pour artisans — Velia",
  description:
    "Un assistant qui répond à vos prospects et chiffre une estimation en 30 secondes, 24h/24. Ne ratez plus un chantier faute de réponse rapide.",
};

const STEPS = [
  { n: "1", t: "Le visiteur décrit son projet", d: "Il choisit son besoin (salle de bain, plomberie, élec, clim) et répond à 2-3 questions simples." },
  { n: "2", t: "Il reçoit une estimation en 30 s", d: "Le chatbot calcule une fourchette de prix indicative, 24h/24 — même le soir et le week-end." },
  { n: "3", t: "Vous recevez le contact qualifié", d: "Nom, téléphone et projet vous arrivent direct par mail/SMS. Vous rappelez un prospect déjà chaud." },
];

const BENEFITS = [
  { t: "Vous ne ratez plus un chantier", d: "Les demandes du soir et du week-end sont captées automatiquement, pas perdues." },
  { t: "Des leads déjà qualifiés", d: "Le projet est cadré avant même que vous décrochiez — vous gagnez un temps précieux." },
  { t: "Vous répondez avant vos concurrents", d: "Le premier qui répond décroche le client. Ici, la réponse est instantanée." },
];

export default function DevisArtisansPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav light={false} />

      <main className="px-6">
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 pb-16 pt-32 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-40">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
              Devis automatisé · artisans du bâtiment
            </p>
            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.06] tracking-tight text-[#0a0a0a] sm:text-5xl">
              Un devis chiffré en{" "}
              <span className="accent-gradient bg-clip-text text-transparent">30 secondes</span>, 24h/24.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-[#5b5b5b]">
              Un assistant s’installe sur votre site et répond à chaque prospect — même la nuit et
              le week-end. Vous ne perdez plus de chantiers parce que vous avez répondu trop tard.
            </p>

            <div className="mt-6 rounded-2xl border border-black/[0.07] bg-[#f7f8fa] p-4 text-[15px] text-[#0a0a0a]">
              <span className="font-medium">Répondre dans l’heure = jusqu’à 7× plus de chances</span> de
              qualifier le prospect.{" "}
              <span className="text-[#9aa0a8]">(Harvard Business Review — la moyenne réelle est de 42 h.)</span>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="btn-gradient group rounded-full px-7 py-3.5 text-center font-medium text-white shadow-[0_20px_55px_-16px_var(--accent-2)] transition-transform hover:scale-[1.02]"
              >
                Réserver mon audit gratuit →
              </Link>
              <a
                href="#demo"
                className="rounded-full border border-[#e2e2e2] bg-white px-7 py-3.5 text-center font-medium text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]/40"
              >
                Tester la démo
              </a>
            </div>
          </div>

          {/* Chatbot live */}
          <div id="demo" className="scroll-mt-28">
            <QuoteBotArtisan />
            <p className="mt-3 text-center text-[13px] text-[#9aa0a8]">
              👆 Démo en direct — cliquez sur un métier pour l’essayer
            </p>
          </div>
        </section>

        {/* COMMENT ÇA MARCHE */}
        <section className="border-t border-black/[0.06] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-balance text-2xl font-medium tracking-tight text-[#0a0a0a] sm:text-3xl">
              Comment ça marche
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="rounded-2xl border border-black/[0.07] bg-white p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-[17px] font-medium text-[#0a0a0a]">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#6b6b6b]">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CE QUE ÇA CHANGE */}
        <section className="border-t border-black/[0.06] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-balance text-2xl font-medium tracking-tight text-[#0a0a0a] sm:text-3xl">
              Ce que ça change pour vous
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {BENEFITS.map((b) => (
                <div key={b.t} className="flex gap-3">
                  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="text-[17px] font-medium text-[#0a0a0a]">{b.t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-[#6b6b6b]">{b.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFRE */}
        <section className="border-t border-black/[0.06] py-16 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-medium tracking-tight text-[#0a0a0a] sm:text-3xl">
              Une offre simple, sans engagement
            </h2>
            <div className="mt-10 rounded-[24px] border border-black/[0.08] bg-[#f7f8fa] p-8 text-left sm:p-10">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-4xl font-semibold text-[#0a0a0a]">39 €</span>
                <span className="text-[#6b6b6b]">/ mois</span>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  installation à partir de 199 €
                </span>
              </div>
              <ul className="mt-6 space-y-3">
                {[
                  "Assistant devis installé sur votre site, 24h/24",
                  "Paramétré avec vos prestations et vos prix",
                  "Contacts qualifiés envoyés direct par mail / SMS",
                  "Améliorations, mises à jour et support inclus",
                  "Sans engagement — annulable à tout moment",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-[#0a0a0a]">
                    <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] text-[#6b6b6b]">
                Un seul chantier capté en plus dans l’année et c’est rentabilisé largement.
              </p>
              <Link
                href="/#contact"
                className="btn-gradient mt-7 inline-block rounded-full px-7 py-3.5 font-medium text-white shadow-[0_20px_55px_-16px_var(--accent-2)] transition-transform hover:scale-[1.02]"
              >
                Réserver mon audit gratuit →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] py-10 text-center text-sm text-[#9aa0a8]">
        Velia — Devis automatisé pour artisans ·{" "}
        <Link href="/" className="underline hover:text-[#0a0a0a]">
          Retour au site
        </Link>
      </footer>
    </div>
  );
}
