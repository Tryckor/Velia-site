"use client";

import { useEffect, useRef, useState } from "react";

// Durée de l'intro cinématique plein écran (ms) avant le passage en page blanche.
const INTRO_MS = 3000;

const SERVICES = [
  { name: "Sites web", detail: "vitrines & e-commerce pensés pour convertir" },
  { name: "Automatisations", detail: "vos tâches répétitives en pilote automatique" },
  { name: "Agents IA", detail: "répondent et qualifient vos clients 24 h/24" },
  { name: "SEO", detail: "remontez en haut de Google" },
  { name: "Chatbots", detail: "captent vos prospects à chaud" },
];

function rise(on: boolean, delay: number): React.CSSProperties {
  return {
    animation: on ? `cine-rise 0.7s ${delay}s both` : "none",
    opacity: on ? undefined : 0,
  };
}

export function HeroCinematic() {
  const introVideo = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), INTRO_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-white">
      <style>{`
        @keyframes cine-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cine-word { from { opacity: 0; transform: translateY(36px); letter-spacing: 0.6em; } to { opacity: 1; transform: translateY(0); letter-spacing: 0.22em; } }
        @keyframes cine-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes cine-fadein { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* ===================== Contenu : page blanche ===================== */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-center px-6 py-28">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Colonne texte */}
          <div className="text-center lg:text-left">
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-accent"
              style={rise(revealed, 0.1)}
            >
              Agence en intelligence artificielle
            </p>
            <h1
              className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl lg:text-[3.4rem]"
              style={rise(revealed, 0.2)}
            >
              On conçoit, on automatise,
              <br />
              <span className="accent-gradient bg-clip-text text-transparent">
                et l’IA répond pour vous.
              </span>
            </h1>
            <p
              className="mx-auto mt-6 max-w-xl text-pretty text-lg text-[#5b5b5b] lg:mx-0"
              style={rise(revealed, 0.3)}
            >
              Velia crée votre site, automatise votre quotidien et déploie des
              agents IA qui répondent à chaque client — jour et nuit.
            </p>

            {/* Détails des services */}
            <ul className="mx-auto mt-8 grid max-w-xl gap-x-8 gap-y-3 text-left sm:grid-cols-2 lg:mx-0">
              {SERVICES.map((s, i) => (
                <li
                  key={s.name}
                  className="flex items-start gap-2.5"
                  style={rise(revealed, 0.4 + i * 0.07)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-1 h-4 w-4 shrink-0 text-accent"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                  >
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[15px] leading-snug text-[#0a0a0a]">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-[#6b6b6b]"> — {s.detail}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
              style={rise(revealed, 0.78)}
            >
              <a
                href="#contact"
                className="btn-gradient group w-full rounded-full px-7 py-3.5 font-medium text-white shadow-[0_20px_55px_-16px_var(--accent-2)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  Réserver mon audit gratuit
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
              <a
                href="#decouvrir"
                className="w-full rounded-full border border-[#e2e2e2] bg-white px-7 py-3.5 font-medium text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]/40 sm:w-auto"
              >
                Découvrir nos services
              </a>
            </div>
          </div>

          {/* Colonne vidéo encadrée */}
          <div
            className="flex justify-center"
            style={rise(revealed, 0.5)}
          >
            <div style={{ animation: "cine-float 6s ease-in-out infinite" }}>
              <div className="relative overflow-hidden rounded-[26px] border border-black/10 shadow-[0_40px_90px_-30px_rgba(0,0,0,0.45)]">
                <video
                  className="block h-[300px] w-[420px] max-w-full object-cover sm:h-[360px]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                >
                  <source src="/hero-tunnel.mp4" type="video/mp4" />
                </video>
                {/* léger voile pour fondre la vidéo dans le blanc */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0) 60%, rgba(255,255,255,0.12) 100%)",
                  }}
                />
                {/* badge */}
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#0a0a0a] shadow backdrop-blur">
                  Réponse en 2 s · 24 h/24
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== Intro cinématique plein écran ===================== */}
      <div
        aria-hidden
        className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-[1000ms] ease-out"
        style={{
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
        }}
      >
        <video
          ref={introVideo}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          <source src="/hero-tunnel.mp4" type="video/mp4" />
        </video>
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {!revealed && (
          <div className="relative text-center text-white">
            <h2
              className="text-5xl font-medium uppercase sm:text-7xl"
              style={{ animation: "cine-word 1.1s 0.2s both", letterSpacing: "0.22em" }}
            >
              Velia
            </h2>
            <p
              className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-white/70 sm:text-base"
              style={{ animation: "cine-fadein 1s 0.9s both" }}
            >
              Agence en intelligence artificielle
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
