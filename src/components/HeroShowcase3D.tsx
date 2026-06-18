"use client";

import { useRef, useState } from "react";

// Visuel interactif 3D : une maquette de tableau de bord Velia qui s'incline
// vers le curseur (tilt), avec graphe animé, stat +128 % et une notification
// "nouveau lead" qui flotte en avant-plan (profondeur 3D).
export function HeroShowcase3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 → 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 12, ry: px * 14 });
  }
  function reset() {
    setTilt({ rx: 0, ry: 0 });
  }

  const bars = [42, 55, 48, 70, 84, 100];

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative"
      style={{ perspective: "1100px" }}
    >
      {/* halo accent derrière la carte */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 60% 40%, var(--accent-soft), transparent 70%)",
        }}
      />

      <div
        className="relative w-[420px] max-w-full rounded-[24px] border border-black/10 bg-white shadow-[0_45px_100px_-35px_rgba(0,0,0,0.5)]"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 250ms ease-out",
          animation: "showcase-float 6s ease-in-out infinite",
        }}
      >
        <style>{`
          @keyframes showcase-float { 0%,100% { translate: 0 0; } 50% { translate: 0 -10px; } }
          @keyframes showcase-bar { from { transform: scaleY(0.1); } to { transform: scaleY(1); } }
          @keyframes showcase-pop { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
          @keyframes showcase-blink { 0%,80%,100% { opacity: .25; } 40% { opacity: 1; } }
        `}</style>

        {/* En-tête appli */}
        <div className="flex items-center justify-between border-b border-black/5 px-5 py-3.5">
          <span className="text-sm font-semibold tracking-tight text-[#0a0a0a]">
            VELIA · Tableau de bord
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0a0a0a]/55">
            <span className="h-2 w-2 rounded-full bg-[#28c840]" /> Assistant IA en ligne
          </span>
        </div>

        {/* Corps */}
        <div className="space-y-4 p-5">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wide text-[#0a0a0a]/40">
                Demandes captées
              </div>
              <div className="mt-0.5 text-3xl font-semibold leading-none text-[#0a0a0a]">
                248
              </div>
            </div>
            <div className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
              +128 % ce mois
            </div>
          </div>

          {/* Graphe */}
          <div className="rounded-xl bg-[#f4f6fa] p-3">
            <div className="flex h-24 items-end gap-2">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 origin-bottom rounded-t-md"
                  style={{
                    height: `${h}%`,
                    background: "linear-gradient(180deg, var(--accent), var(--accent-2))",
                    animation: `showcase-bar 0.7s ${0.2 + i * 0.09}s ease-out both`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Ligne "conversation IA" */}
          <div className="flex items-center gap-2.5 rounded-xl border border-black/5 bg-white px-3 py-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
              IA
            </span>
            <span className="text-[13px] text-[#0a0a0a]/70">
              Devis envoyé automatiquement au client
            </span>
            <span className="ml-auto flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  style={{ animation: `showcase-blink 1.2s ${i * 0.2}s infinite` }}
                />
              ))}
            </span>
          </div>
        </div>

        {/* Notification flottante en avant-plan (profondeur 3D) */}
        <div
          className="absolute -right-5 -top-5 flex items-center gap-2.5 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)]"
          style={{
            transform: "translateZ(60px)",
            animation: "showcase-pop 0.6s 0.5s both",
          }}
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-[#28c840] text-white">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-[#0a0a0a]">Nouveau lead capté</div>
            <div className="text-[11px] text-[#0a0a0a]/50">par votre agent IA · à l’instant</div>
          </div>
        </div>
      </div>
    </div>
  );
}
