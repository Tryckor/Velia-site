"use client";

import { useEffect, useRef } from "react";

// Version CLAIRE du hero horloge : mêmes couleurs d'accent (bleu), mais inversé
// — fond blanc, texte noir, et la vidéo de l'horloge passée en `invert` pour
// devenir claire (traits foncés sur fond clair). "Noir ↔ blanc".
const PLAYBACK_RATE = 0.08;

export function VideoHeroLight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white px-6">
      {/* Vidéo horloge INVERSÉE (noir↔blanc) — discrète, contrastée, nette */}
      <video
        ref={videoRef}
        className="clock-zoom absolute inset-0 h-full w-full object-cover"
        style={{
          filter: "invert(1) grayscale(1) contrast(1.6) brightness(1.18)",
          opacity: 0.45,
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedMetadata={(e) => {
          e.currentTarget.playbackRate = PLAYBACK_RATE;
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Voiles de lisibilité (clairs) */}
      <div aria-hidden className="absolute inset-0 bg-white/40" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 40%, rgba(255,255,255,0.80) 100%)",
        }}
      />
      {/* Voile central : garde le titre parfaitement net, l'horloge reste un fond léger */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 64% 52% at 50% 44%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.55) 45%, transparent 78%)",
        }}
      />
      {/* Ombre douce au sol (ancrage, version claire) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-44"
        style={{ background: "linear-gradient(transparent, rgba(255,255,255,0.9))" }}
      />

      {/* Kicker (dégradé bleu — inchangé) */}
      <p className="float-in absolute left-1/2 top-[104px] z-10 w-full -translate-x-1/2 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]">
        <span className="gradient-text">
          Sites web · Automatisations · Agents IA · SEO · Chatbots
        </span>
      </p>

      <div className="relative z-10 mx-auto max-w-5xl text-center text-[#0a0a0a]">
        <h1 className="float-in-2 text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Pendant que vous hésitez,
          <br />
          vos concurrents répondent déjà.
        </h1>

        <p className="float-in-3 mx-auto mt-7 max-w-2xl text-pretty text-lg text-[#5b5b5b]">
          Velia conçoit votre site, automatise votre quotidien et déploie des
          agents IA qui répondent à chaque client — jour et nuit.
        </p>

        <div className="float-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="btn-gradient group w-full rounded-full px-7 py-3.5 font-medium text-white shadow-[0_20px_55px_-14px_var(--accent-2)] transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              Réserver mon audit gratuit
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </a>
          <a
            href="#decouvrir"
            className="w-full rounded-full border border-black/15 bg-white/60 px-7 py-3.5 font-medium text-[#0a0a0a] backdrop-blur transition-colors hover:border-black/40 sm:w-auto"
          >
            Découvrir nos services
          </a>
        </div>

        <div className="float-in-5 mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#6b6b6b]">
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

      {/* Scroll cue (foncé sur clair) */}
      <a
        href="#decouvrir"
        aria-label="Défiler"
        className="float-in-5 absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-black/55 transition-colors hover:text-black"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
        <span className="h-9 w-px bg-gradient-to-b from-black/50 to-transparent" />
      </a>
    </section>
  );
}
