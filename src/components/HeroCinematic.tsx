"use client";

import { useEffect, useRef, useState } from "react";
import { ProductivityMeter } from "./ProductivityMeter";
import { HeroBackdrop } from "./HeroBackdrop";

// Durée de l'intro cinématique plein écran (ms) avant le passage en page blanche.
const INTRO_MS = 3000;

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
    <section className="relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden bg-white px-6 pb-16 pt-28 sm:pt-32">
      <style>{`
        @keyframes cine-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cine-word { from { opacity: 0; transform: translateY(36px); letter-spacing: 0.6em; } to { opacity: 1; transform: translateY(0); letter-spacing: 0.22em; } }
        @keyframes cine-fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cine-drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(50px,36px); } }
        @keyframes cine-drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-46px,-30px); } }
        @keyframes cine-scroll { 0%,100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(6px); opacity: 1; } }
      `}</style>

      {/* ===================== Fond circuit N&B qui se dessine (la page se fabrique) ===================== */}
      <HeroBackdrop play={revealed} />

      {/* ===================== Contenu : page blanche épurée (centrée) ===================== */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]"
          style={rise(revealed, 0.1)}
        >
          <span className="accent-gradient bg-clip-text text-transparent">
            Sites web · Automatisations · Agents IA · SEO · Chatbots
          </span>
        </p>

        <h1
          className="mt-5 text-balance text-4xl font-medium leading-[1.05] tracking-tight text-[#0a0a0a] sm:text-5xl"
          style={rise(revealed, 0.2)}
        >
          On conçoit, on automatise,
          <br />
          <span className="accent-gradient bg-clip-text text-transparent">
            et l’IA répond pour vous.
          </span>
        </h1>

        <p
          className="mx-auto mt-5 max-w-xl text-pretty text-base text-[#5b5b5b] sm:text-lg"
          style={rise(revealed, 0.32)}
        >
          Velia crée votre site, automatise votre quotidien et déploie des
          agents IA qui répondent à chaque client — jour et nuit.
        </p>

        <div
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={rise(revealed, 0.44)}
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

        {/* Réassurance */}
        <div
          className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6b6b6b]"
          style={rise(revealed, 0.56)}
        >
          {["Audit offert", "Réponse sous 24 h", "Sans engagement"].map((t) => (
            <span key={t} className="inline-flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2.6">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ===================== Vitrine : site premium animé en 3D ===================== */}
      <div
        className="relative z-10 mt-14 w-full max-w-4xl"
        style={rise(revealed, 0.62)}
      >
        <ProductivityMeter play={revealed} />
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
