// Fond "circuit imprimé" noir & blanc qui SE DESSINE tout seul (effet : la page
// se fabrique en temps réel). Déclenché via `play` à la fin de l'intro.
// Décoratif (aria-hidden), 100% SVG/CSS, lisibilité du texte préservée.

// Pistes du circuit (style PCB, angles droits) partant de la puce centrale.
const TRACES: number[][][] = [
  [[600, 300], [600, 150], [820, 150], [820, 40]],
  [[600, 400], [600, 560], [400, 560], [400, 680]],
  [[540, 330], [300, 330], [300, 130], [70, 130]],
  [[660, 330], [900, 330], [900, 150], [1130, 150]],
  [[540, 370], [330, 370], [330, 600], [110, 600]],
  [[660, 370], [880, 370], [880, 560], [1110, 560]],
  [[560, 300], [560, 210], [320, 210]],
  [[640, 400], [640, 500], [900, 500]],
  [[540, 350], [160, 350]],
  [[660, 350], [1060, 350]],
  [[600, 300], [600, 220], [470, 220], [470, 70]],
  [[600, 400], [600, 470], [720, 470], [720, 660]],
];

function dOf(points: number[][]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
}

export function HeroBackdrop({ play }: { play: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes hb-draw { to { stroke-dashoffset: 0; } }
        @keyframes hb-pad { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: scale(1); } }
        @keyframes hb-pulse { 0%,100% { opacity: .35; } 50% { opacity: .9; } }
        @keyframes hb-chip { from { opacity: 0; transform: scale(.7); } to { opacity: 1; transform: scale(1); } }
        @keyframes hb-glow { 0%,100% { opacity: .25; } 50% { opacity: .6; } }
        .hb-trace { stroke-dasharray: 1; stroke-dashoffset: 1; }
        .hb-play .hb-trace { animation: hb-draw 1.3s ease-out forwards; }
        .hb-pad { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .hb-play .hb-pad { animation: hb-pad .5s ease-out forwards, hb-pulse 3s ease-in-out infinite; }
        .hb-chip { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .hb-play .hb-chip { animation: hb-chip .6s .1s ease-out forwards; }
      `}</style>

      <svg
        className={`absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 ${play ? "hb-play" : ""}`}
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Pistes qui se tracent */}
        <g fill="none" stroke="rgba(10,10,10,0.20)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {TRACES.map((pts, i) => (
            <path
              key={i}
              className="hb-trace"
              d={dOf(pts)}
              pathLength={1}
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            />
          ))}
        </g>

        {/* Pastilles en bout de piste (s'allument) */}
        <g fill="rgba(10,10,10,0.5)">
          {TRACES.map((pts, i) => {
            const end = pts[pts.length - 1];
            return (
              <circle
                key={i}
                className="hb-pad"
                cx={end[0]}
                cy={end[1]}
                r={i % 3 === 0 ? 5 : 3.5}
                style={{ animationDelay: `${0.15 + i * 0.1 + 1.1}s, ${1.6 + i * 0.1}s` }}
              />
            );
          })}
        </g>

        {/* Puce centrale */}
        <g className="hb-chip">
          <rect x="540" y="300" width="120" height="100" rx="10" fill="none" stroke="rgba(10,10,10,0.35)" strokeWidth="2.5" />
          <rect x="566" y="326" width="68" height="48" rx="5" fill="rgba(10,10,10,0.07)" stroke="rgba(10,10,10,0.3)" strokeWidth="1.5" />
          {/* pattes de la puce */}
          {[330, 350, 370].map((y) => (
            <g key={y} stroke="rgba(10,10,10,0.3)" strokeWidth="2">
              <line x1="528" y1={y} x2="540" y2={y} />
              <line x1="660" y1={y} x2="672" y2={y} />
            </g>
          ))}
          {[570, 600, 630].map((x) => (
            <g key={x} stroke="rgba(10,10,10,0.3)" strokeWidth="2">
              <line x1={x} y1="288" x2={x} y2="300" />
              <line x1={x} y1="400" x2={x} y2="412" />
            </g>
          ))}
          {/* halo doux qui respire */}
          <circle cx="600" cy="350" r="90" fill="rgba(10,10,10,0.05)" style={{ animation: play ? "hb-glow 4s ease-in-out infinite" : "none" }} />
        </g>
      </svg>

      {/* Voile blanc derrière le titre (lisibilité) + fondu bas */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 42% at 50% 30%, rgba(255,255,255,0.82), transparent 70%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(transparent, white)" }}
      />
    </div>
  );
}
