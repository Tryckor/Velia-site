"use client";

import { useEffect, useRef } from "react";

// Hero "clair" : page BLANCHE, mais l'horloge reste l'ORIGINALE (sombre, non
// inversée) et repose sur une AURÉOLE FONCÉE centrale → ses chiffres blancs
// ressortent, et l'auréole se fond dans le blanc autour.
const PLAYBACK_RATE = 0.08;

export function VideoHeroLight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  // Même rayon pour l'auréole, le masque vidéo et le voile → transition nette.
  const RADIAL = "ellipse 58% 54% at 50% 46%";

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-white px-6">
      {/* Auréole foncée derrière l'horloge (se fond dans le blanc) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(${RADIAL}, #070707 0%, #070707 42%, rgba(7,7,7,0.55) 60%, rgba(7,7,7,0) 74%)`,
        }}
      />

      {/* Horloge ORIGINALE (non inversée), masquée pour se fondre dans le blanc */}
      <video
        ref={videoRef}
        className="clock-zoom absolute inset-0 h-full w-full object-cover"
        style={{
          WebkitMaskImage: `radial-gradient(${RADIAL}, #000 44%, transparent 73%)`,
          maskImage: `radial-gradient(${RADIAL}, #000 44%, transparent 73%)`,
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

      {/* Voile foncé central pour la lisibilité du titre (texte blanc dessus) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 52% 44% at 50% 46%, rgba(7,7,7,0.62) 0%, rgba(7,7,7,0.30) 50%, transparent 72%)",
        }}
      />

      {/* Kicker (dégradé bleu) — sur le blanc en haut */}
      <p className="float-in absolute left-1/2 top-[104px] z-10 w-full -translate-x-1/2 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]">
        <span className="gradient-text">
          Sites web · Automatisations · Agents IA · SEO · Chatbots
        </span>
      </p>

      {/* Contenu (texte blanc, posé sur l'auréole foncée) */}
      <div className="relative z-10 mx-auto max-w-5xl text-center text-white">
        <h1 className="float-in-2 text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Pendant que vous hésitez,
          <br />
          vos concurrents répondent déjà.
        </h1>

        <p className="float-in-3 mx-auto mt-7 max-w-2xl text-pretty text-lg text-white/75">
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
            className="w-full rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/70 sm:w-auto"
          >
            Découvrir nos services
          </a>
        </div>

        <div className="float-in-5 mx-auto mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60">
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

      {/* Scroll cue (foncé, sur le blanc en bas) */}
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
