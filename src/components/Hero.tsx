import { LogoMark } from "./Logo";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-36 sm:pt-44">
      {/* animated grid + aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0 grid-bg"
          style={{
            maskImage:
              "radial-gradient(ellipse 75% 60% at 50% 0%, #000 35%, transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 60% at 50% 0%, #000 35%, transparent 72%)",
          }}
        />
        <div className="aurora absolute left-1/2 top-[-10%] h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.10),transparent_60%)] blur-2xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — copy */}
        <div className="text-center lg:text-left">
          <p className="float-in mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-4 py-1.5 text-xs text-muted backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-foreground" />
            </span>
            Agence digitale & intelligence artificielle
          </p>

          <h1 className="float-in-2 text-balance text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            <span className="ink-gradient">Transformez votre entreprise</span>{" "}
            avec le digital et l&apos;IA.
          </h1>

          <p className="float-in-3 mx-auto mt-7 max-w-xl text-pretty text-lg text-muted lg:mx-0">
            Sites web, automatisations, SEO et agents IA sur mesure. Un seul
            partenaire pour gagner du temps, des clients — et une longueur
            d&apos;avance.
          </p>

          <div className="float-in-4 mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start sm:justify-center">
            <a
              href="#contact"
              className="group w-full rounded-full bg-foreground px-7 py-3.5 font-medium text-white transition-all hover:opacity-90 hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                Réserver mon audit gratuit
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
            <a
              href="#roi"
              className="w-full rounded-full border border-line bg-white/60 px-7 py-3.5 font-medium backdrop-blur transition-colors hover:border-foreground sm:w-auto"
            >
              Calculer ce que je perds
            </a>
          </div>

          <div className="float-in-5 mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted lg:justify-start">
            <Check>Audit offert</Check>
            <Check>Sans engagement</Check>
            <Check>Réponse sous 24 h</Check>
          </div>
        </div>

        {/* Right — floating product cards */}
        <div className="relative mx-auto hidden h-[440px] w-full max-w-md lg:block">
          {/* main card: receptionist IA call */}
          <div className="drift absolute left-0 top-6 w-72 rounded-2xl border border-line bg-white p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-white">
                <LogoMark className="h-4 w-4" />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Réceptionniste IA</span>
                <span className="text-xs text-muted">En ligne · 24/7</span>
              </div>
              <span className="ml-auto h-2 w-2 rounded-full bg-foreground" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3.5 py-2 text-xs text-white">
                Bonjour, êtes-vous ouvert samedi ?
              </div>
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-[#f3f3f3] px-3.5 py-2 text-xs">
                Oui, de 9h à 18h. Je vous réserve un créneau ?
              </div>
            </div>
          </div>

          {/* stat card */}
          <div className="drift-slow absolute right-0 top-0 w-44 rounded-2xl border border-line bg-white p-4 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)]">
            <span className="text-xs text-muted">Temps gagné / sem.</span>
            <p className="mt-1 text-3xl font-semibold tracking-tight">12 h</p>
            <div className="mt-2 flex items-end gap-1">
              {[40, 65, 50, 80, 95].map((h, i) => (
                <span
                  key={i}
                  className="w-3 rounded-sm bg-foreground/80"
                  style={{ height: `${h * 0.32}px` }}
                />
              ))}
            </div>
          </div>

          {/* automation flow card */}
          <div className="drift absolute bottom-2 right-6 w-64 rounded-2xl border border-line bg-white p-4 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.35)] [animation-delay:1.5s]">
            <span className="text-xs text-muted">Automatisation</span>
            <div className="mt-3 flex items-center justify-between text-xs font-medium">
              <span className="rounded-lg bg-[#f3f3f3] px-2.5 py-1.5">
                Devis
              </span>
              <span className="text-muted">→</span>
              <span className="rounded-lg bg-[#f3f3f3] px-2.5 py-1.5">
                Relance
              </span>
              <span className="text-muted">→</span>
              <span className="rounded-lg bg-foreground px-2.5 py-1.5 text-white">
                Signé
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-foreground"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
      >
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {children}
    </span>
  );
}
