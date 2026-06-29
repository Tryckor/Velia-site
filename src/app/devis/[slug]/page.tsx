import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { QuoteBotArtisan } from "@/components/QuoteBotArtisan";
import { allClientSlugs, getClient } from "@/lib/artisanConfigs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allClientSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) return { title: "Devis instantané" };
  return {
    title: `Devis instantané — ${client.enseigne}`,
    description: `Un assistant qui chiffre une estimation en 30 secondes et capte vos demandes 24h/24, pour ${client.enseigne}.`,
    robots: { index: false }, // pages clients : pas indexées (démo privée)
  };
}

const STEPS_CLIENT = [
  { n: "1", t: "Le visiteur décrit son projet", d: "Il choisit son besoin et répond à 2-3 questions simples." },
  { n: "2", t: "Il reçoit une estimation en 30 s", d: "Une fourchette de prix indicative, 24h/24 — même le soir et le week-end." },
  { n: "3", t: "Vous recevez le contact qualifié", d: "Nom, téléphone et projet vous arrivent direct. Vous rappelez un prospect déjà chaud." },
];

export default async function ClientDevisPage({ params }: Props) {
  const { slug } = await params;
  const client = getClient(slug);
  if (!client) notFound();

  return (
    <div className="min-h-screen bg-white">
      <Nav light={false} />

      <main className="px-6">
        <section className="mx-auto grid max-w-6xl items-center gap-12 pb-16 pt-32 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-40">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
              Devis automatisé{client.zone ? ` · ${client.zone}` : ""}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.06] tracking-tight text-[#0a0a0a] sm:text-5xl">
              {client.enseigne} — un devis chiffré en{" "}
              <span className="accent-gradient bg-clip-text text-transparent">30 secondes</span>, 24h/24.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-[#5b5b5b]">
              Voici l’assistant tel qu’il apparaîtra pour vos clients. Essayez-le : choisissez un
              métier, répondez à 2-3 questions, et voyez l’estimation arriver en direct.
            </p>
            <div className="mt-6 rounded-2xl border border-black/[0.07] bg-[#f7f8fa] p-4 text-[15px] text-[#0a0a0a]">
              <span className="font-medium">Répondre dans l’heure = jusqu’à 7× plus de chances</span> de
              qualifier le prospect.{" "}
              <span className="text-[#9aa0a8]">(Harvard Business Review.)</span>
            </div>
          </div>

          <div id="demo" className="scroll-mt-28">
            <QuoteBotArtisan config={client.config} />
            <p className="mt-3 text-center text-[13px] text-[#9aa0a8]">
              👆 Démo en direct — cliquez sur un métier pour l’essayer
            </p>
          </div>
        </section>

        <section className="border-t border-black/[0.06] py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-balance text-2xl font-medium tracking-tight text-[#0a0a0a] sm:text-3xl">
              Comment ça marche
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {STEPS_CLIENT.map((s) => (
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
      </main>

      <footer className="border-t border-black/[0.06] py-10 text-center text-sm text-[#9aa0a8]">
        Assistant devis fourni par{" "}
        <Link href="/" className="underline hover:text-[#0a0a0a]">
          Velia
        </Link>
      </footer>
    </div>
  );
}
