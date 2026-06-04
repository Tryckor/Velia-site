"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "./Logo";

// Vitesse de lecture du fond vidéo (1 = normal). Plus bas = aiguille plus lente.
const PLAYBACK_RATE = 0.3;

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#070707] px-6">
      {/* Background video (clock — time slipping away) */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        // Nudge the clock so its 12–6 axis sits dead centre. translateX+ = clock
        // moves right; the small scale avoids any black edge appearing.
        style={{ transform: "scale(1.06) translateX(0.5%)" }}
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

      {/* Legibility overlays */}
      <div aria-hidden className="absolute inset-0 bg-black/50" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,7,0.75) 0%, rgba(7,7,7,0.25) 35%, rgba(7,7,7,0.55) 100%)",
        }}
      />

      {/* Single light pool on the ground under the clock — one radial gradient:
          a truly white core, brighter overall, spreading wide so the light still
          reaches the left/right edges before fading out. A tiny 10px blur is
          layered on the gradient itself to erase 8-bit colour banding (the
          "rings / multiple cores" artefact) while keeping one clean pool. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 50% 24% at 50% 93%, #ffffff 0%, #ffffff 14%, rgba(255,255,255,0.74) 34%, rgba(255,255,255,0.44) 54%, rgba(255,255,255,0.18) 74%, transparent 92%)",
          filter: "blur(10px)",
          WebkitFilter: "blur(10px)",
        }}
      />

      {/* Floating service cards framing the clock (desktop only, ≥1280px).
          They tell visitors what Velia sells the moment they land. Monochrome,
          glassy, placed in the four corners so they never cover the headline. */}
      {/* Top-left — Réceptionniste IA (AI agents) */}
      <div className="drift pointer-events-none absolute left-4 top-24 z-10 hidden w-64 rounded-2xl border border-black/5 bg-white/95 p-4 text-foreground shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)] backdrop-blur-sm xl:block 2xl:left-12">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-white">
            <LogoMark className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Réceptionniste IA</span>
            <span className="text-xs text-muted">En ligne · 24/7</span>
          </div>
          <span className="relative ml-auto flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3 py-1.5 text-xs text-white">
            Bonjour, êtes-vous ouvert samedi ?
          </div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-[#f3f3f3] px-3 py-1.5 text-xs">
            Oui, de 9h à 18h. Je vous réserve un créneau ?
          </div>
        </div>
      </div>

      {/* Top-right — Temps gagné (automation ROI) */}
      <div className="drift-slow pointer-events-none absolute right-4 top-28 z-10 hidden w-44 rounded-2xl border border-black/5 bg-white/95 p-4 text-foreground shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)] backdrop-blur-sm xl:block 2xl:right-12">
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

      {/* Bottom-left — Automatisation pipeline */}
      <div className="drift pointer-events-none absolute bottom-24 left-6 z-10 hidden w-64 rounded-2xl border border-black/5 bg-white/95 p-4 text-foreground shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)] backdrop-blur-sm [animation-delay:1.2s] xl:block 2xl:left-12">
        <span className="text-xs text-muted">Automatisation</span>
        <div className="mt-3 flex items-center justify-between text-xs font-medium">
          <span className="rounded-lg bg-[#f3f3f3] px-2.5 py-1.5">Devis</span>
          <span className="text-muted">→</span>
          <span className="rounded-lg bg-[#f3f3f3] px-2.5 py-1.5">Relance</span>
          <span className="text-muted">→</span>
          <span className="rounded-lg bg-foreground px-2.5 py-1.5 text-white">
            Signé
          </span>
        </div>
      </div>

      {/* Bottom-right — SEO / référencement */}
      <div className="drift-slow pointer-events-none absolute bottom-28 right-6 z-10 hidden w-52 rounded-2xl border border-black/5 bg-white/95 p-4 text-foreground shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)] backdrop-blur-sm [animation-delay:0.6s] xl:block 2xl:right-12">
        <span className="text-xs text-muted">Référencement SEO</span>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight">1ʳᵉ</span>
          <span className="text-sm text-muted">page Google</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path
              d="M4 14l5-5 4 4 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15 6h5v5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Trafic organique en hausse
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center text-white">
        <p className="float-in mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/80 backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Agence digitale & intelligence artificielle
        </p>

        <h1 className="float-in-2 text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          Pendant que vous hésitez,
          <br />
          vos concurrents répondent déjà.
        </h1>

        <p className="float-in-3 mx-auto mt-7 max-w-xl text-pretty text-lg text-white/75">
          Velia fait répondre votre entreprise en premier : sites web,
          automatisations et agents IA qui captent chaque client, 24h/24.
        </p>

        <div className="float-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="group w-full rounded-full bg-white px-7 py-3.5 font-medium text-foreground transition-all hover:opacity-90 sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              Réserver mon audit gratuit
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </a>
          <a
            href="#services"
            className="w-full rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/70 sm:w-auto"
          >
            Découvrir nos services
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#services"
        aria-label="Défiler"
        className="float-in-5 absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-black/70 transition-colors hover:text-black"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
          Scroll
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-black/60 to-transparent" />
      </a>
    </section>
  );
}
