// Fond "la puce fabrique le site" : après l'intro, une belle puce processeur
// (noir & blanc) s'allume, pulse et émet des pistes qui se tracent vers les
// bords — le contenu de la page se génère dans la foulée (voir délais dans
// HeroCinematic). Décoratif (aria-hidden), 100% SVG/CSS.

// Pistes émises par la puce vers les bords (style PCB, angles droits).
const TRACES: number[][][] = [
  [[600, 250], [600, 140], [840, 140], [840, 30]],
  [[600, 450], [600, 560], [380, 560], [380, 690]],
  [[470, 300], [300, 300], [300, 120], [60, 120]],
  [[730, 300], [900, 300], [900, 140], [1140, 140]],
  [[470, 400], [320, 400], [320, 600], [90, 600]],
  [[730, 400], [880, 400], [880, 560], [1120, 560]],
  [[470, 350], [150, 350]],
  [[730, 350], [1070, 350]],
  [[540, 250], [540, 180], [330, 180]],
  [[660, 450], [660, 520], [900, 520]],
];

function dOf(points: number[][]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
}

// pattes (pins) de la puce
const PINS_H = [270, 295, 320, 345, 370, 395, 420]; // y des pins gauche/droite
const PINS_V = [490, 525, 560, 595, 630, 665, 700]; // x des pins haut/bas

export function HeroBackdrop({ play }: { play: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes hb-draw { to { stroke-dashoffset: 0; } }
        @keyframes hb-pad { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: scale(1); } }
        @keyframes hb-twinkle { 0%,100% { opacity: .4; } 50% { opacity: 1; } }
        @keyframes hb-chip-in { from { opacity: 0; transform: scale(.82); } to { opacity: 1; transform: scale(1); } }
        @keyframes hb-core { 0%,100% { opacity: .3; } 50% { opacity: .85; } }
        @keyframes hb-pin { 0% { opacity: .18; } 50% { opacity: .55; } 100% { opacity: .18; } }
        @keyframes hb-ring { 0% { opacity: .5; transform: scale(.3); } 100% { opacity: 0; transform: scale(1.8); } }
        @keyframes hb-sweep { 0% { transform: translateX(-160px); } 100% { transform: translateX(160px); } }

        .hb-trace { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .hb-play .hb-trace { animation: hb-draw 1.1s ease-out forwards; }
        .hb-pad, .hb-pin, .hb-ring, .hb-core, .hb-sweep { opacity: 0; }
        .hb-chipgrp { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .hb-play .hb-chipgrp { animation: hb-chip-in .7s .1s ease-out forwards; }
        .hb-play .hb-core { animation: hb-core 2.4s .9s ease-in-out infinite; }
        .hb-play .hb-pin { animation: hb-pin 2.2s ease-in-out infinite; }
        .hb-play .hb-pad { transform-box: fill-box; transform-origin: center; animation: hb-pad .45s ease-out forwards, hb-twinkle 3s ease-in-out infinite; }
        .hb-play .hb-ring { animation: hb-ring 2.6s .7s ease-out infinite; }
        .hb-play .hb-sweep { opacity: 1; animation: hb-sweep 2.6s 1s ease-in-out infinite; }
      `}</style>

      <svg
        className={`absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 ${play ? "hb-play" : ""}`}
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="hb-body" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fbfbfc" />
            <stop offset="0.5" stopColor="#eef0f3" />
            <stop offset="1" stopColor="#e2e5ea" />
          </linearGradient>
          <linearGradient id="hb-die" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#15171c" />
            <stop offset="1" stopColor="#2a2e38" />
          </linearGradient>
          <radialGradient id="hb-coreg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#cfd6e2" stopOpacity="0.5" />
            <stop offset="1" stopColor="#cfd6e2" stopOpacity="0" />
          </radialGradient>
          <clipPath id="hb-dieclip">
            <rect x="500" y="262" width="200" height="176" rx="10" />
          </clipPath>
        </defs>

        {/* Pistes émises + pastilles */}
        <g fill="none" stroke="rgba(10,10,10,0.20)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((pts, i) => (
            <path key={i} className="hb-trace" d={dOf(pts)} pathLength={1} style={{ animationDelay: `${1.0 + i * 0.08}s` }} />
          ))}
        </g>
        <g fill="rgba(10,10,10,0.5)">
          {TRACES.map((pts, i) => {
            const e = pts[pts.length - 1];
            return (
              <circle key={i} className="hb-pad" cx={e[0]} cy={e[1]} r={i % 3 === 0 ? 5 : 3.5}
                style={{ animationDelay: `${1.0 + i * 0.08 + 0.9}s, ${1.9 + i * 0.08}s` }} />
            );
          })}
        </g>

        {/* ============ LA PUCE ============ */}
        <g className="hb-chipgrp">
          {/* halo d'émission */}
          <circle className="hb-ring" cx="600" cy="350" r="160" fill="none" stroke="rgba(10,10,10,0.18)" strokeWidth="2" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          <circle className="hb-ring" cx="600" cy="350" r="160" fill="none" stroke="rgba(10,10,10,0.12)" strokeWidth="2" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: "1.6s" }} />

          {/* pins */}
          <g fill="#0a0a0a">
            {PINS_H.map((y, i) => (
              <g key={`h${y}`}>
                <rect className="hb-pin" x="452" y={y - 6} width="22" height="12" rx="2" style={{ animationDelay: `${0.6 + i * 0.05}s` }} />
                <rect className="hb-pin" x="726" y={y - 6} width="22" height="12" rx="2" style={{ animationDelay: `${0.6 + i * 0.05}s` }} />
              </g>
            ))}
            {PINS_V.map((x, i) => (
              <g key={`v${x}`}>
                <rect className="hb-pin" x={x - 6} y="232" width="12" height="22" rx="2" style={{ animationDelay: `${0.6 + i * 0.05}s` }} />
                <rect className="hb-pin" x={x - 6} y="446" width="12" height="22" rx="2" style={{ animationDelay: `${0.6 + i * 0.05}s` }} />
              </g>
            ))}
          </g>

          {/* corps de la puce */}
          <rect x="474" y="254" width="252" height="192" rx="18" fill="url(#hb-body)" stroke="rgba(10,10,10,0.5)" strokeWidth="2" />
          {/* repère coin */}
          <circle cx="500" cy="280" r="6" fill="none" stroke="rgba(10,10,10,0.4)" strokeWidth="2" />

          {/* die (cœur sombre) avec micro-grille */}
          <rect x="500" y="262" width="200" height="176" rx="10" fill="url(#hb-die)" />
          <g clipPath="url(#hb-dieclip)">
            <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
              {[290, 320, 350, 380, 410].map((y) => <line key={y} x1="500" y1={y} x2="700" y2={y} />)}
              {[530, 565, 600, 635, 670].map((x) => <line key={x} x1={x} y1="262" x2={x} y2="438" />)}
            </g>
            {/* balayage lumineux "processing" */}
            <rect className="hb-sweep" x="560" y="262" width="80" height="176"
              fill="url(#hb-coreg)" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          </g>

          {/* cœur lumineux qui pulse */}
          <circle className="hb-core" cx="600" cy="350" r="60" fill="url(#hb-coreg)" />
          {/* logo V au centre */}
          <path d="M576 326 L600 384 L624 326" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      {/* Voile blanc pour la lisibilité du titre (haut) + fondu bas */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 38% at 50% 26%, rgba(255,255,255,0.86), transparent 70%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(transparent, white)" }} />
    </div>
  );
}
