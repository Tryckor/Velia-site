"use client";

import { useEffect, useRef, useState } from "react";

// Vitesse de lecture du fond vidéo (1 = normal). Plus bas = aiguille plus lente.
const PLAYBACK_RATE = 0.08;
// Durée d'affichage de chaque slide avant rotation auto (ms).
const DURATION = 10000;

const SLIDES = [
  { key: "clock" },
  {
    key: "blue",
    eyebrow: "Présence en ligne",
    title: "Un site qui travaille\npour vous, 24 h/24.",
    text: "Des sites rapides et élégants, pensés pour convertir vos visiteurs en clients — et un SEO qui vous fait remonter sur Google.",
    chips: ["Sites web", "SEO", "Référencement local"],
    gradient:
      "linear-gradient(135deg, #122a6e 0%, #2b6bff 52%, #6aa0ff 100%)",
    glow: "rgba(106,160,255,0.55)",
  },
  {
    key: "violet",
    eyebrow: "Automatisation & IA",
    title: "Vos tâches répétitives,\ngérées sans vous.",
    text: "Automatisations sur-mesure, agents IA et chatbots qui répondent à chaque client, prennent les rendez-vous et relancent vos devis — jour et nuit.",
    chips: ["Automatisations", "Agents IA", "Chatbots"],
    gradient:
      "linear-gradient(135deg, #2c1670 0%, #7c5cff 52%, #a98bff 100%)",
    glow: "rgba(169,139,255,0.55)",
  },
] as const;

export function HeroTrinity() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  // Rotation automatique toutes les DURATION ms (en pause au survol).
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % SLIDES.length),
      DURATION,
    );
    return () => clearTimeout(t);
  }, [active, paused]);

  const trackWidth = SLIDES.length * 100;
  const step = 100 / SLIDES.length;

  return (
    <section
      className="relative h-[100svh] overflow-hidden bg-[#070707]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Keyframes locaux (barre de progression + apparition du contenu) */}
      <style>{`
        @keyframes trinity-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes trinity-rise {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Piste : 3 panneaux qui glissent ensemble */}
      <div
        className="flex h-full ease-[cubic-bezier(0.65,0,0.35,1)]"
        style={{
          width: `${trackWidth}%`,
          transform: `translateX(-${active * step}%)`,
          transition: "transform 950ms cubic-bezier(0.65,0,0.35,1)",
        }}
      >
        {/* ───────── Slide 1 — l'horloge (design d'origine) ───────── */}
        <div
          className="relative flex h-full flex-col justify-center overflow-hidden px-6"
          style={{ width: `${step}%` }}
        >
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

          <div aria-hidden className="absolute inset-0 bg-black/50" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,7,7,0.75) 0%, rgba(7,7,7,0.25) 35%, rgba(7,7,7,0.55) 100%)",
            }}
          />
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

          <p className="absolute left-1/2 top-[104px] z-10 w-full -translate-x-1/2 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]">
            <span className="gradient-text">
              Sites web · Automatisations · Agents IA · SEO · Chatbots
            </span>
          </p>

          <div className="relative z-10 mx-auto max-w-5xl text-center text-white">
            <h1 className="text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Pendant que vous hésitez,
              <br />
              vos concurrents répondent déjà.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-white/75">
              Velia conçoit votre site, automatise votre quotidien et déploie
              des agents IA qui répondent à chaque client — jour et nuit.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
          </div>
        </div>

        {/* ───────── Slides 2 & 3 — panneaux colorés ───────── */}
        {SLIDES.slice(1).map((slide) => {
          // index réel dans SLIDES (1 ou 2)
          const idx = SLIDES.findIndex((s) => s.key === slide.key);
          const isActive = idx === active;
          return (
            <div
              key={slide.key}
              className="relative flex h-full flex-col justify-center overflow-hidden px-6"
              style={{ width: `${step}%`, background: slide.gradient }}
            >
              {/* Fond à petits carrés (grille subtile) */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "46px 46px",
                  maskImage:
                    "radial-gradient(ellipse 75% 75% at 50% 45%, #000 35%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 75% at 50% 45%, #000 35%, transparent 80%)",
                }}
              />
              {/* Halo lumineux */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse 60% 55% at 50% 40%, ${slide.glow} 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-[13px]"
                  style={
                    isActive
                      ? {
                          animation: "trinity-rise 0.7s 0.05s both",
                        }
                      : undefined
                  }
                >
                  {slide.eyebrow}
                </p>
                <h1
                  className="mt-5 whitespace-pre-line text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl"
                  style={
                    isActive
                      ? { animation: "trinity-rise 0.7s 0.13s both" }
                      : undefined
                  }
                >
                  {slide.title}
                </h1>
                <p
                  className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-white/85"
                  style={
                    isActive
                      ? { animation: "trinity-rise 0.7s 0.22s both" }
                      : undefined
                  }
                >
                  {slide.text}
                </p>
                <div
                  className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
                  style={
                    isActive
                      ? { animation: "trinity-rise 0.7s 0.3s both" }
                      : undefined
                  }
                >
                  {slide.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div
                  className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
                  style={
                    isActive
                      ? { animation: "trinity-rise 0.7s 0.38s both" }
                      : undefined
                  }
                >
                  <a
                    href="#contact"
                    className="group w-full rounded-full bg-white px-7 py-3.5 font-medium text-[#0a0a0a] shadow-[0_20px_55px_-18px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.02] sm:w-auto"
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
                    className="w-full rounded-full border border-white/40 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/80 sm:w-auto"
                  >
                    Découvrir nos services
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ───────── Indicateurs (3 points + barre de progression 10 s) ───────── */}
      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {SLIDES.map((s, i) => {
          const isActive = i === active;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Aller au panneau ${i + 1}`}
              aria-current={isActive}
              className="relative h-1.5 overflow-hidden rounded-full transition-all duration-500"
              style={{
                width: isActive ? 44 : 14,
                background: "rgba(255,255,255,0.3)",
              }}
            >
              {isActive && (
                <span
                  // key force le remontage → la barre repart de 0 à chaque slide
                  key={`${active}-${paused}`}
                  className="absolute inset-0 origin-left rounded-full bg-white"
                  style={{
                    animation: `trinity-progress ${DURATION}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
