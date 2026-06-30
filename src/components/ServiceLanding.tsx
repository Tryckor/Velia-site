import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import type { ServiceLanding as Data } from "@/lib/serviceLandings";

/** Page-service détaillée générée depuis une config (voir src/lib/serviceLandings.ts). */
export function ServiceLanding({ data }: { data: Data }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav light={false} />

      <main className="px-6">
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 pb-16 pt-32 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-40">
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-accent">
              {data.eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl">
              {data.h1.lead}
              <span className="gradient-text">{data.h1.accent}</span>
              {data.h1.tail}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted">{data.subtitle}</p>

            {data.heroStat && (
              <div className="mt-6 rounded-2xl border border-line bg-white p-4 text-[15px]">
                <span className="font-medium">{data.heroStat.strong}</span>
                {data.heroStat.rest}{" "}
                <span className="text-muted/70">({data.heroStat.source})</span>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="btn-gradient group rounded-full px-7 py-3.5 text-center font-medium shadow-[0_20px_55px_-16px_var(--accent-2)] transition-transform hover:scale-[1.02]"
              >
                Réserver mon audit gratuit →
              </Link>
              <Link
                href="/#services"
                className="rounded-full border border-line bg-white px-7 py-3.5 text-center font-medium transition-colors hover:border-foreground/40"
              >
                Voir tous les services
              </Link>
            </div>
          </Reveal>

          {/* Carte "ce qui est inclus" */}
          <Reveal delay={120}>
            <div className="card-glow rounded-[24px] border border-line bg-white p-7 sm:p-8">
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-accent">
                Ce qui est inclus
              </p>
              <ul className="mt-5 space-y-3.5">
                {data.included.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px]">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </section>

        {/* STAT BAND */}
        {data.stat && (
          <section className="mx-auto max-w-6xl pb-4">
            <Reveal className="overflow-hidden rounded-3xl bg-foreground px-8 py-10 text-white sm:px-12">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
                <div className="flex shrink-0 items-baseline">
                  <span className="text-6xl font-semibold tracking-tight tabular-nums text-[color:var(--accent-2)] sm:text-7xl">
                    <Counter
                      to={data.stat.to}
                      decimals={data.stat.decimals ?? 0}
                      prefix={data.stat.prefix ?? ""}
                      suffix={data.stat.suffix ?? ""}
                      group
                    />
                  </span>
                </div>
                <div>
                  <p className="text-pretty text-white/85 sm:text-lg">{data.stat.label}.</p>
                  <p className="mt-2 text-xs text-white/40">Source : {data.stat.source}</p>
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* COMMENT ÇA MARCHE */}
        <section className="border-t border-line py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">
                Comment ça marche
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {data.steps.map((s, i) => (
                <Reveal as="article" delay={(i % 3) * 80} key={s.n} className="rounded-2xl border border-line bg-white p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-[17px] font-medium">{s.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CE QUE ÇA CHANGE */}
        <section className="border-t border-line py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">
                Ce que ça change pour vous
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {data.benefits.map((b, i) => (
                <Reveal delay={(i % 3) * 80} key={b.t} className="flex gap-3">
                  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <h3 className="text-[17px] font-medium">{b.t}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{b.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-line py-16 sm:py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">
              On en parle ? Le premier échange est offert.
            </h2>
            <p className="mt-4 text-muted">
              Un diagnostic gratuit, sans engagement, pour voir ce que ça peut vous apporter concrètement.
            </p>
            <Link
              href="/#contact"
              className="btn-gradient mt-8 inline-block rounded-full px-7 py-3.5 font-medium shadow-[0_20px_55px_-16px_var(--accent-2)] transition-transform hover:scale-[1.02]"
            >
              Réserver mon audit gratuit →
            </Link>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line py-10 text-center text-sm text-muted">
        <Link href="/" className="underline hover:text-foreground">
          ← Retour à l'accueil Velia
        </Link>
      </footer>
    </div>
  );
}
