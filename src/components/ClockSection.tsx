"use client";

import { useEffect, useRef, useState } from "react";

// Section "horloge / FOMO" — copy haute-conversion (loss aversion, source HBR),
// accroche fixe « Pendant que vous hésitez, vos concurrents répondent déjà »,
// avec un balayage de couleur sur « répondent déjà » déclenché au scroll.
const PLAYBACK_RATE = 0.08;

export function ClockSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  // Déclenche les animations quand la section entre dans l'écran (une fois).
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const up = (d: number): React.CSSProperties =>
    seen ? { animation: `clk-up 0.7s ${d}s both` } : { opacity: 0 };

  return (
    <section ref={sectionRef} className="bg-white px-6 py-20 sm:py-28">
      <style>{`
        @keyframes clk-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes clk-sweep { from { background-position: 180% 0; } to { background-position: -40% 0; } }
        .clk-key { background: linear-gradient(110deg,#7fb0ff 0%,#ffffff 22%,#b79bff 44%,#ffffff 66%,#7fb0ff 88%); background-size: 220% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; background-position: 180% 0; }
        .clk-key.go { animation: clk-sweep 1.5s 0.5s ease-out forwards; }
      `}</style>

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

          <div aria-hidden className="absolute inset-0 bg-black/55" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(7,7,7,0.2) 0%, rgba(7,7,7,0.7) 100%)",
            }}
          />
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
          <div className="relative z-10 mx-auto max-w-2xl text-center text-white">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-[12px]"
              style={up(0.05)}
            >
              Le premier qui répond décroche le client
            </p>

            <h2 className="mt-5 text-balance text-3xl font-medium leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
              <span style={up(0.15)} className="inline-block">
                Pendant que vous hésitez,
              </span>
              <br />
              <span style={up(0.28)} className="inline-block">
                vos concurrents{" "}
                <span className={`clk-key${seen ? " go" : ""}`}>répondent déjà.</span>
              </span>
            </h2>

            <p
              className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/75 sm:text-lg"
              style={up(0.42)}
            >
              Répondre dans l’heure, c’est{" "}
              <span className="font-medium text-white">
                7× plus de chances de qualifier le prospect
              </span>{" "}
              <span className="text-white/55">(Harvard Business Review)</span> — et la
              moyenne réelle est de <span className="font-medium text-white">42 heures</span>.
              Velia répond à votre place, en quelques secondes, 24/7.
            </p>

            <div
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={up(0.54)}
            >
              <a
                href="#contact"
                className="btn-gradient group w-full rounded-full px-7 py-3.5 font-medium text-white shadow-[0_20px_55px_-14px_var(--accent-2)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  Activer ma réponse 24/7
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

            <p className="mt-5 text-xs text-white/45" style={up(0.64)}>
              Audit offert · Sans engagement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
