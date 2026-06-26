import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { LogoMark } from "@/components/Logo";
import { VideoHero } from "@/components/VideoHero";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { ServicesKinetic } from "@/components/ServicesKinetic";
import { StatsBand } from "@/components/StatsBand";
import { Counter } from "@/components/Counter";
import { RoiCalculator } from "@/components/RoiCalculator";
import { ScrollProgress } from "@/components/ScrollProgress";
import { QuoteBot } from "@/components/QuoteBot";
import { OpenQuoteBotButton } from "@/components/OpenQuoteBotButton";

const SERVICES = [
  {
    title: "Sites web",
    desc: "Des sites rapides, élégants et pensés pour convertir. Vitrine, prise de rendez-vous ou e-commerce — sur mesure, jamais un template.",
    icon: IconBrowser,
  },
  {
    title: "Automatisations",
    desc: "On supprime les tâches répétitives : devis, relances, saisie, synchronisation d'outils. Vos équipes se concentrent sur l'essentiel.",
    icon: IconFlow,
  },
  {
    title: "SEO",
    desc: "Soyez trouvé sur Google. Audit technique, contenu et mots-clés pour faire venir des clients qui vous cherchent déjà.",
    icon: IconSearch,
  },
  {
    title: "Agents IA & Réceptionniste",
    desc: "Un assistant qui répond aux appels et aux demandes 24/7, qualifie vos prospects et ne rate plus jamais une opportunité.",
    icon: IconAgent,
  },
  {
    title: "Chatbots",
    desc: "Un conseiller intelligent sur votre site qui répond à vos clients instantanément et transforme les visiteurs en rendez-vous.",
    icon: IconChat,
  },
  {
    title: "Hébergement mail",
    desc: "Une adresse pro (vous@votre-entreprise.fr), sécurisée et fiable. Image sérieuse, boîte mail qui ne tombe jamais.",
    icon: IconMail,
  },
];

const STEPS = [
  {
    n: "01",
    title: "Diagnostic",
    desc: "On échange sur votre activité et vos objectifs. J'identifie où vous perdez du temps et des clients — gratuitement.",
  },
  {
    n: "02",
    title: "Conception sur mesure",
    desc: "Je conçois la solution adaptée à vos processus réels, pas une formule toute faite. Vous validez avant tout développement.",
  },
  {
    n: "03",
    title: "Déploiement",
    desc: "Mise en ligne, mise en place et tests. Tout est livré clé en main, prêt à l'emploi, et je vous forme à l'utiliser.",
  },
  {
    n: "04",
    title: "Optimisation continue",
    desc: "Je reste disponible. On mesure les résultats et on ajuste pour faire grandir l'impact mois après mois.",
  },
];

const VALUES = [
  {
    title: "Un interlocuteur unique",
    desc: "Pas de grande agence impersonnelle. Vous parlez directement à la personne qui construit votre projet.",
  },
  {
    title: "Tout au même endroit",
    desc: "Site, automatisations, SEO, IA, mail : un seul partenaire pour tout votre digital. Plus simple, plus cohérent.",
  },
  {
    title: "Orienté résultats",
    desc: "L'objectif n'est pas un joli site — c'est plus de temps gagné et plus de clients. Tout est pensé pour ça.",
  },
  {
    title: "Transparence totale",
    desc: "Devis clair, sans surprise ni jargon. Vous savez exactement ce que vous payez et pourquoi.",
  },
];

const FAQ = [
  {
    q: "Combien coûte un projet avec Velia ?",
    a: "Chaque projet est sur mesure, donc le tarif dépend de vos besoins. Après un premier échange gratuit, vous recevez un devis clair et fixe — aucune surprise. On peut commencer petit et faire évoluer ensuite.",
  },
  {
    q: "En combien de temps mon projet est-il livré ?",
    a: "Un site vitrine se livre généralement en 1 à 3 semaines. Une automatisation ou un agent IA, selon la complexité, en quelques jours à quelques semaines. On fixe ensemble un calendrier réaliste dès le départ.",
  },
  {
    q: "Je n'y connais rien en technique, est-ce un problème ?",
    a: "Au contraire, c'est mon métier. Je traduis tout en langage clair, je m'occupe de l'aspect technique de A à Z et je vous forme à utiliser votre outil. Vous n'avez rien à gérer.",
  },
  {
    q: "Mes données sont-elles en sécurité ?",
    a: "Oui. J'utilise des hébergeurs et outils reconnus, conformes au RGPD, avec sauvegardes et bonnes pratiques de sécurité. Vos données et celles de vos clients restent protégées.",
  },
  {
    q: "Est-ce que ça fonctionne avec mes outils actuels ?",
    a: "Dans la grande majorité des cas, oui. Les automatisations et l'IA s'intègrent à la plupart des outils du marché (agenda, CRM, messagerie, etc.). On vérifie ça ensemble lors du diagnostic.",
  },
  {
    q: "Que se passe-t-il après la livraison ?",
    a: "Je ne disparais pas. Vous bénéficiez d'un accompagnement, et je reste disponible pour les évolutions et l'optimisation. Votre réussite sur la durée, c'est aussi la mienne.",
  },
];

export default function Home({
  hero,
  navLight = true,
}: {
  hero?: React.ReactNode;
  navLight?: boolean;
}) {
  return (
    <div id="top" className="min-h-screen bg-background">
      <ScrollProgress />
      <Nav light={navLight} />
      <main>
        {hero ?? <VideoHero />}
        <TrustBar />
        <Hero />
        <ServicesKinetic />
        <StatsBand />
        <Services />
        <InstantQuote />
        <RoiSection />
        <Method />
        <WhyVelia />
        <CtaBand />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
      <QuoteBot />
    </div>
  );
}

/* -------------------------------------------------------------- Services */
function Services() {
  return (
    <section
      id="services"
      className="surface-soft relative scroll-mt-20 overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden
        className="blob blob-a -right-20 -top-24 h-[380px] w-[380px]"
      />
      <div
        aria-hidden
        className="blob blob-b blob-2 -left-24 bottom-0 h-[340px] w-[340px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Nos services"
            title="Tout votre digital, au même endroit"
            subtitle="Six leviers pour faire grandir votre entreprise. Ensemble ou séparément, selon vos priorités."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal
                as="article"
                delay={(i % 3) * 80}
                key={s.title}
                className="card-glow group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white p-7"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.06),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line text-accent transition-colors duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-medium">{s.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                  {s.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/0 transition-colors duration-300 group-hover:text-accent">
                  Estimer mon gain
                  <span aria-hidden>→</span>
                </span>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Instant quote */
function InstantQuote() {
  return (
    <section id="devis" className="scroll-mt-20 px-6 py-12">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-[#fafafa]">
        {/* Stat callout — the problem this service solves */}
        <div className="flex flex-col gap-5 bg-foreground px-8 py-8 text-white sm:flex-row sm:items-center sm:gap-9 sm:px-12">
          <div className="flex shrink-0 items-baseline">
            <span className="text-6xl font-semibold tracking-tight tabular-nums text-[color:var(--accent-2)] sm:text-7xl">
              <Counter to={78} />
            </span>
            <span className="text-3xl font-medium text-white/60 sm:text-4xl">
              %
            </span>
          </div>
          <div>
            <p className="text-pretty text-white/80 sm:text-lg">
              des clients commandent auprès de la{" "}
              <strong className="font-medium text-white">
                première entreprise qui leur répond
              </strong>
              . Les demandes qui n&apos;aboutissent pas sont le plus souvent
              perdues à cause du temps d&apos;attente —{" "}
              <strong className="font-medium text-white">
                le devis instantané par IA comble exactement ce manque : une
                réponse chiffrée en 30 secondes, 24h/24.
              </strong>
            </p>
            <p className="mt-2.5 text-xs text-white/40">
              Source : études sur la réactivité commerciale (Lead Response
              Management).
            </p>
          </div>
        </div>

        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Copy */}
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium">
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase tracking-wide text-white">
                Nouveau
              </span>
              Devis instantané par IA
            </p>
            <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-4xl">
              Un devis en{" "}
              <span className="gradient-text">30 secondes</span> — jusqu’à{" "}
              <span className="gradient-text">7×</span> plus de chances de
              qualifier le prospect.
            </h2>
            <p className="mt-5 text-pretty text-muted sm:text-lg">
              On installe sur votre site un assistant intelligent. Le visiteur
              clique sur «&nbsp;Demander mon devis&nbsp;», répond à quelques
              questions (surface, pièces, type de projet…) et reçoit une
              estimation chiffrée immédiatement.
            </p>

            <div className="mt-7 space-y-3">
              <Bullet>
                <strong className="font-medium text-foreground">
                  Le délai tue vos leads.
                </strong>{" "}
                Contacter un prospect dans l’heure plutôt qu’en 42 h, c’est
                jusqu’à 7× plus de chances de le qualifier (Harvard Business
                Review, 2011). Ici, la réponse est instantanée, 24h/24.
              </Bullet>
              <Bullet>
                <strong className="font-medium text-foreground">
                  Des leads déjà qualifiés.
                </strong>{" "}
                Vous ne recevez que des contacts sérieux, avec leur projet déjà
                cadré — vous gagnez un temps précieux.
              </Bullet>
              <Bullet>
                <strong className="font-medium text-foreground">
                  Vous ne ratez plus rien.
                </strong>{" "}
                Pendant que vos concurrents rappellent le lendemain, vous avez
                déjà envoyé une estimation.
              </Bullet>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <OpenQuoteBotButton className="btn-gradient group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-transform hover:scale-[1.02]">
                Essayer la démo en direct
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </OpenQuoteBotButton>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-7 py-3.5 font-medium transition-colors hover:border-foreground"
              >
                L&apos;installer chez moi
              </a>
            </div>
          </div>

          {/* Chat preview */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="rounded-3xl border border-line bg-white p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3 border-b border-line pb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-white">
                  <LogoMark className="h-3.5 w-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-tight">
                    Assistant devis
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    En ligne
                  </span>
                </div>
              </div>
              <div className="space-y-2.5 py-4">
                <Mock from="bot">Quel est votre projet ?</Mock>
                <Mock from="user">Rénovation salle de bain</Mock>
                <Mock from="bot">Quelle surface, environ ?</Mock>
                <Mock from="user">Environ 8 m²</Mock>
                <div className="rounded-2xl border border-transparent bg-accent p-4 text-white">
                  <span className="text-[11px] uppercase tracking-[0.16em] text-white/60">
                    Estimation
                  </span>
                  <p className="mt-1 text-2xl font-semibold tracking-tight">
                    6 000 – 9 000 €
                  </p>
                </div>
              </div>
              <OpenQuoteBotButton className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                Lancer la vraie démo →
              </OpenQuoteBotButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-sm leading-relaxed text-muted">
      <svg
        viewBox="0 0 24 24"
        className="mt-0.5 h-5 w-5 shrink-0 text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

function Mock({ from, children }: { from: "bot" | "user"; children: React.ReactNode }) {
  const bot = from === "bot";
  return (
    <div className={`flex ${bot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
          bot
            ? "rounded-bl-sm bg-[#f3f3f3] text-foreground"
            : "rounded-br-sm bg-foreground text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- ROI */
function RoiSection() {
  return (
    <section
      id="roi"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden
        className="blob blob-a -right-24 top-1/4 h-[380px] w-[380px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Calculateur"
            title="Combien vous coûte de ne rien faire ?"
            subtitle="Choisissez un service, entrez vos chiffres, et découvrez en direct ce que vous laissez sur la table chaque mois."
          />
        </Reveal>
        <Reveal delay={120} className="mt-14">
          <RoiCalculator />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Method */
function Method() {
  return (
    <section
      id="methode"
      className="surface-soft scroll-mt-20 px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            eyebrow="Notre méthode"
            title="Du premier échange aux résultats"
            subtitle="Une approche simple et transparente, pensée pour que vous sachiez toujours où vous en êtes."
          />
        </Reveal>
        <div className="relative mt-16">
          {/* connecting line */}
          <div
            aria-hidden
            className="absolute left-0 top-[7px] hidden h-px w-full bg-line lg:block"
          />
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="relative flex flex-col">
                  <span
                    aria-hidden
                    className="hidden h-3.5 w-3.5 rounded-full border-2 border-accent bg-white lg:block"
                  />
                  <span className="mt-0 text-sm font-semibold text-accent lg:mt-6">
                    {step.n}
                  </span>
                  <div className="hairline my-4 lg:hidden" />
                  <h3 className="text-lg font-medium lg:mt-1">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- WhyVelia */
function WhyVelia() {
  return (
    <section
      id="pourquoi"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden
        className="blob blob-b -left-24 top-10 h-[360px] w-[360px]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Pourquoi Velia"
            title="Un partenaire, pas un prestataire de plus"
            subtitle="Velia est née d'une conviction : les outils digitaux et l'IA ne devraient pas être réservés aux grandes entreprises. Vous méritez le même niveau d'exigence, avec la proximité en plus."
          />
          <a
            href="#contact"
            className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-transform hover:scale-[1.02]"
          >
            Parlons de votre projet
            <span aria-hidden>→</span>
          </a>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal
              key={v.title}
              delay={(i % 2) * 80}
              className="card-glow rounded-2xl border border-line bg-white p-7"
            >
              <LogoMark className="h-5 w-5 text-accent" />
              <h3 className="mt-4 font-medium">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {v.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- CtaBand */
function CtaBand() {
  return (
    <section className="px-6 py-12">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] px-8 py-16 text-center text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, #000, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 80% at 50% 50%, #000, transparent 75%)",
          }}
        />
        <LogoMark className="relative mx-auto h-9 w-9 text-white" />
        <h2 className="relative mx-auto mt-7 max-w-2xl text-balance text-3xl font-medium leading-tight sm:text-4xl">
          Les entreprises qui adoptent ces outils aujourd&apos;hui prendront
          l&apos;avantage demain.
        </h2>
        <p className="relative mx-auto mt-5 max-w-xl text-white/70">
          Commencez par un audit gratuit. Sans engagement, sans jargon — juste un
          regard clair sur ce que le digital peut vous apporter.
        </p>
        <a
          href="#contact"
          className="relative mt-9 inline-flex rounded-full bg-white px-7 py-3.5 font-medium text-foreground transition-opacity hover:opacity-90"
        >
          Réserver mon audit gratuit
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */
function FaqSection() {
  return (
    <section
      id="faq"
      className="surface-soft scroll-mt-20 px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce que vous vous demandez"
          />
        </Reveal>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 40}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-medium">
                  {item.q}
                  <span className="relative h-4 w-4 shrink-0 text-muted">
                    <span className="absolute left-1/2 top-1/2 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */
function Contact() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-20 overflow-hidden px-6 py-24"
    >
      <div
        aria-hidden
        className="blob blob-a -left-20 -top-16 h-[400px] w-[400px]"
      />
      <div
        aria-hidden
        className="blob blob-b blob-2 -right-24 bottom-0 h-[320px] w-[320px]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Discutons de votre projet"
            subtitle="Décrivez votre besoin en quelques mots. Je reviens vers vous sous 24 h ouvrées pour un premier échange — gratuit et sans engagement."
          />
          <div className="mt-10 space-y-5">
            <ContactInfo
              icon={IconMail}
              label="Email"
              value="contact@velia-digital.com"
              href="mailto:contact@velia-digital.com"
            />
            <ContactInfo
              icon={IconClock}
              label="Délai de réponse"
              value="Sous 24 h ouvrées"
            />
            <ContactInfo
              icon={IconShield}
              label="Engagement"
              value="Audit gratuit, aucun engagement"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: (p: { className?: string }) => React.ReactElement;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line">
        <Icon className="h-5 w-5 text-foreground" />
      </span>
      <span className="flex flex-col">
        <span className="text-xs uppercase tracking-wide text-muted">
          {label}
        </span>
        <span className="font-medium">{value}</span>
      </span>
    </div>
  );
  return href ? (
    <a href={href} className="block transition-opacity hover:opacity-70">
      {content}
    </a>
  ) : (
    content
  );
}

/* ---------------------------------------------------------------- Footer */
function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <span className="inline-flex items-center gap-2.5">
            <LogoMark className="h-5 w-5" />
            <span className="wordmark text-sm pl-[0.1em]">VELIA</span>
          </span>
          <p className="text-sm text-muted">
            Sites web · Automatisations · SEO · IA
          </p>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-muted">
          <a href="#services" className="hover:text-foreground">
            Services
          </a>
          <a href="#devis" className="hover:text-foreground">
            Devis IA
          </a>
          <a href="#roi" className="hover:text-foreground">
            Calculateur
          </a>
          <a href="#methode" className="hover:text-foreground">
            Méthode
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
          <a href="#contact" className="hover:text-foreground">
            Contact
          </a>
        </nav>
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row">
        <span>© 2026 Velia. Tous droits réservés.</span>
        <nav className="flex gap-5">
          <a href="/mentions-legales" className="hover:text-foreground">
            Mentions légales
          </a>
          <a href="/confidentialite" className="hover:text-foreground">
            Confidentialité
          </a>
        </nav>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------- Shared heading */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignCls = align === "center" ? "mx-auto text-center" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-muted sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- Icons */
function IconBrowser({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01M10 6.5h.01" strokeLinecap="round" />
    </svg>
  );
}
function IconFlow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="15" y="15" width="6" height="6" rx="1.5" />
      <path d="M9 6h4a2 2 0 0 1 2 2v7" strokeLinecap="round" />
    </svg>
  );
}
function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
function IconAgent({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 7V4M9 13h.01M15 13h.01" strokeLinecap="round" />
      <path d="M2 12v2M22 12v2" strokeLinecap="round" />
    </svg>
  );
}
function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" />
    </svg>
  );
}
function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
