"use client";

import { useEffect, useRef } from "react";

const PLAYBACK_RATE = 0.3;
const LINE_1 = ["Pendant", "que", "vous", "hésitez,"];
const LINE_2 = ["vos", "concurrents", "répondent", "déjà."];

/**
 * "WOW" variant of the hero — keeps the clock the user loves, but adds:
 *  - a living colour aurora (animated mesh-gradient blobs) over the clock,
 *  - a kinetic headline that rises word-by-word with a blur-in,
 *  - the gradient CTA + glow.
 * Same clarity-first structure (kicker, subtitle, reassurance).
 */
export function VideoHeroWow() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#070707] px-6">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
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
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,7,0.75) 0%, rgba(7,7,7,0.22) 35%, rgba(7,7,7,0.6) 100%)",
        }}
      />

      {/* WOW — living colour aurora drifting over the clock */}
      <div
        aria-hidden
        className="blob blob-a left-[6%] top-[8%] h-[420px] w-[420px]"
        style={{ opacity: 0.32 }}
      />
      <div
        aria-hidden
        className="blob blob-b blob-2 right-[4%] top-[14%] h-[460px] w-[460px]"
        style={{ opacity: 0.32 }}
      />
      <div
        aria-hidden
        className="blob blob-a bottom-[6%] left-1/2 h-[360px] w-[360px] -translate-x-1/2"
        style={{ opacity: 0.22 }}
      />

      {/* White floor light pool */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 135% 24% at 50% 93%, #ffffff 0%, #ffffff 6%, rgba(255,255,255,0.72) 16%, rgba(255,255,255,0.5) 30%, rgba(255,255,255,0.34) 46%, rgba(255,255,255,0.2) 68%, rgba(255,255,255,0.1) 86%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center text-white">
        <p className="float-in mb-6 text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-[13px] sm:tracking-[0.18em]">
          <span className="gradient-text">
            Sites web · Automatisations · Agents IA · SEO · Chatbots
          </span>
        </p>

        <h1 className="text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
          <span className="block">
            {LINE_1.map((w, i) => (
              <span
                key={i}
                className="word-rise inline-block"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                {w}&nbsp;
              </span>
            ))}
          </span>
          <span className="block">
            {LINE_2.map((w, i) => (
              <span
                key={i}
                className="word-rise inline-block"
                style={{ animationDelay: `${0.5 + i * 0.08}s` }}
              >
                {w}&nbsp;
              </span>
            ))}
          </span>
        </h1>

        <p className="float-in-3 mx-auto mt-7 max-w-2xl text-pretty text-lg text-white/75">
          Velia conçoit votre site, automatise votre quotidien et déploie des
          agents IA qui répondent à chaque client — jour et nuit.
        </p>

        <div className="float-in-4 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="btn-gradient group w-full rounded-full px-7 py-3.5 font-medium shadow-[0_20px_55px_-14px_var(--accent-2)] transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <span className="inline-flex items-center gap-2">
              Réserver mon audit gratuit
              <span className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
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
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#decouvrir"
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
