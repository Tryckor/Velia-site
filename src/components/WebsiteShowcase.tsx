"use client";

import { useRef, useState } from "react";

// Vitrine "wow" : une grande fenêtre de navigateur, inclinée en 3D et réactive
// au curseur, montrant un site premium qui défile tout seul à l'intérieur.
// Objectif : prouver le savoir-faire web de Velia dès le hero.
export function WebsiteShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 6, ry: -8 });

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: 6 - py * 8, ry: -8 + px * 10 });
  }
  function reset() {
    setTilt({ rx: 6, ry: -8 });
  }

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative w-full"
      style={{ perspective: "1400px" }}
    >
      <style>{`
        @keyframes ws-scroll { 0% { transform: translateY(0); } 50% { transform: translateY(-46%); } 100% { transform: translateY(0); } }
        @keyframes ws-float { 0%,100% { translate: 0 0; } 50% { translate: 0 -12px; } }
        @keyframes ws-pop { 0% { opacity: 0; transform: translateY(12px) scale(.96); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      {/* halo accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 35%, var(--accent-soft), transparent 70%)",
        }}
      />

      <div
        className="mx-auto w-full max-w-3xl rounded-[18px] border border-black/10 bg-white shadow-[0_60px_120px_-40px_rgba(10,20,60,0.5)]"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 300ms ease-out",
          animation: "ws-float 7s ease-in-out infinite",
        }}
      >
        {/* Barre du navigateur */}
        <div className="flex items-center gap-2 rounded-t-[18px] border-b border-black/5 bg-[#f5f6f8] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-center text-[11px] text-black/45">
            votre-entreprise.fr
          </span>
        </div>

        {/* Fenêtre : contenu qui défile tout seul */}
        <div className="relative h-[420px] overflow-hidden rounded-b-[18px] bg-white">
          <div style={{ animation: "ws-scroll 18s ease-in-out infinite" }}>
            <InnerSite />
          </div>
          {/* léger fondu bas pour la boucle */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
            style={{ background: "linear-gradient(transparent, white)" }}
          />
        </div>

        {/* badge flottant en avant-plan */}
        <div
          className="absolute -right-4 -top-4 rounded-2xl border border-black/5 bg-white px-4 py-2.5 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)]"
          style={{ transform: "translateZ(60px)", animation: "ws-pop 0.6s 0.4s both" }}
        >
          <div className="text-[11px] font-medium text-[#0a0a0a]/50">Performance</div>
          <div className="text-lg font-semibold leading-none text-[#0a0a0a]">
            100<span className="text-accent">/100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ====== Mini-site premium affiché dans la fenêtre ====== */
function InnerSite() {
  return (
    <div className="text-[#0f1115]">
      {/* nav */}
      <div className="flex items-center justify-between px-6 py-4">
        <span className="text-sm font-semibold tracking-tight">STUDIO·M</span>
        <div className="hidden items-center gap-5 text-[11px] text-black/55 sm:flex">
          <span>Projets</span>
          <span>Studio</span>
          <span>Contact</span>
        </div>
        <span className="rounded-full bg-[#0f1115] px-3 py-1.5 text-[11px] font-medium text-white">
          Démarrer
        </span>
      </div>

      {/* hero du mini-site */}
      <div className="px-6 pb-8 pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
          Studio de design
        </p>
        <h3 className="mt-2 text-3xl font-semibold leading-[1.05] tracking-tight">
          Une marque
          <br />
          qui marque.
        </h3>
        <p className="mt-3 max-w-sm text-[12px] leading-relaxed text-black/55">
          On crée des identités et des sites qui transforment les visiteurs en
          clients.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-[#0f1115] px-4 py-2 text-[11px] font-medium text-white">
            Voir nos projets
          </span>
          <span className="rounded-full border border-black/15 px-4 py-2 text-[11px] font-medium">
            Nous écrire
          </span>
        </div>
      </div>

      {/* image hero (bloc gradient + formes) */}
      <div className="px-6">
        <div
          className="relative h-40 overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(135deg, #1b2a6b 0%, #2b6bff 55%, #7c5cff 100%)" }}
        >
          <div
            className="absolute -right-6 -top-6 h-28 w-28 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
          <div
            className="absolute bottom-3 left-4 right-4 rounded-xl bg-white/90 p-3 backdrop-blur"
          >
            <div className="h-2 w-24 rounded bg-black/70" />
            <div className="mt-2 h-2 w-40 rounded bg-black/15" />
            <div className="mt-1.5 h-2 w-32 rounded bg-black/15" />
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="grid grid-cols-3 gap-3 px-6 py-7">
        {[
          ["+128%", "conversions"],
          ["2,4×", "trafic"],
          ["48 h", "mise en ligne"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-xl bg-[#f4f6fa] p-3 text-center">
            <div className="text-base font-semibold">{n}</div>
            <div className="text-[10px] text-black/45">{l}</div>
          </div>
        ))}
      </div>

      {/* cartes projets */}
      <div className="grid grid-cols-3 gap-3 px-6 pb-8">
        {[
          "linear-gradient(135deg,#0bb67a,#16b8c8)",
          "linear-gradient(135deg,#ff6a1a,#ffa05a)",
          "linear-gradient(135deg,#7c5cff,#e05cff)",
        ].map((g, i) => (
          <div key={i} className="overflow-hidden rounded-xl border border-black/5">
            <div className="h-16" style={{ background: g }} />
            <div className="p-2">
              <div className="h-2 w-3/4 rounded bg-black/60" />
              <div className="mt-1.5 h-1.5 w-1/2 rounded bg-black/15" />
            </div>
          </div>
        ))}
      </div>

      {/* bande CTA */}
      <div className="mx-6 mb-10 rounded-2xl bg-[#0f1115] px-6 py-6 text-center text-white">
        <div className="text-lg font-semibold">Prêt à lancer votre site ?</div>
        <div className="mt-1 text-[11px] text-white/60">
          Audit offert · réponse sous 24 h
        </div>
        <span className="mt-3 inline-block rounded-full bg-white px-4 py-2 text-[11px] font-medium text-[#0f1115]">
          Réserver un appel
        </span>
      </div>
    </div>
  );
}
