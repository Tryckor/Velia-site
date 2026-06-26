"use client";

import { useEffect, useRef } from "react";

// Section "horloge / FOMO" — l'ancien hero horloge réutilisé en SECTION de
// milieu de page, encadré dans une carte sombre posée sur le fond clair (pour
// s'intégrer au thème clair tout en gardant le rendu cinématique de l'horloge).
const PLAYBACK_RATE = 0.08;

export function ClockSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[28px] bg-[#070707] px-6 py-20 shadow-[0_50px_120px_-50px_rgba(0,0,0,0.6)]">
          {/* Horloge (originale, sombre) */}
          <video
            ref={videoRef}
            className="clock-zoom absolute inset-0 h-full w-full object-cover"
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

          {/* Voiles de lisibilité */}
          <div aria-hidden className="absolute inset-0 bg-black/55" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(7,7,7,0.2) 0%, rgba(7,7,7,0.7) 100%)",
            }}
          />
          {/* Halo blanc au sol sous l'horloge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 50% 22% at 50% 96%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 38%, rgba(255,255,255,0.12) 62%, transparent 88%)",
              filter: "blur(10px)",
              WebkitFilter: "blur(10px)",
            }}
          />

          {/* Contenu */}
          <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-[12px]">
              <span className="gradient-text">Le temps joue contre vous</span>
            </p>
            <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              Pendant que vous hésitez,
              <br />
              vos concurrents répondent déjà.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/75 sm:text-lg">
              Chaque minute d’attente, c’est un client qui va voir ailleurs.
              Velia répond à votre place, capte la demande et la transforme — jour
              et nuit.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
                href="#roi"
                className="w-full rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/70 sm:w-auto"
              >
                Calculer ce que je perds
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
