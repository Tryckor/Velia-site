// Fond sur-mesure du hero : aurore de couleurs (bleu/violet) + réseau de nœuds
// "IA connectée" qui flotte, grille fine, et un voile blanc pour garder le
// texte parfaitement lisible. Décoratif (aria-hidden), 100% CSS/SVG.

const NODES = [
  [120, 120], [300, 80], [480, 160], [660, 90], [850, 150],
  [180, 300], [400, 320], [620, 280], [820, 340],
  [260, 480], [520, 460], [720, 500], [900, 470],
] as const;

// arêtes (indices des nœuds reliés)
const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [1, 6], [2, 6], [3, 7], [4, 8],
  [5, 6], [6, 7], [7, 8],
  [5, 9], [6, 10], [7, 11], [8, 12],
  [9, 10], [10, 11], [11, 12],
] as const;

export function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes hb-drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(60px,40px); } }
        @keyframes hb-drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-55px,-35px); } }
        @keyframes hb-drift3 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-45px); } }
        @keyframes hb-net { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-14px,10px) scale(1.015); } }
        @keyframes hb-twinkle { 0%,100% { opacity: .35; } 50% { opacity: 1; } }
      `}</style>

      {/* Aurore : blobs de couleur diffus */}
      <div
        className="absolute -left-32 -top-24 h-[42rem] w-[42rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(43,107,255,0.28), transparent 70%)", filter: "blur(50px)", animation: "hb-drift1 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-28 -top-16 h-[40rem] w-[40rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.26), transparent 70%)", filter: "blur(50px)", animation: "hb-drift2 21s ease-in-out infinite" }}
      />
      <div
        className="absolute left-1/3 top-1/3 h-[34rem] w-[34rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(22,184,200,0.18), transparent 70%)", filter: "blur(55px)", animation: "hb-drift3 24s ease-in-out infinite" }}
      />

      {/* Réseau "IA connectée" */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ animation: "hb-net 20s ease-in-out infinite" }}
      >
        <g stroke="rgba(43,107,255,0.22)" strokeWidth="1">
          {EDGES.map(([a, b], i) => (
            <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
          ))}
        </g>
        <g>
          {NODES.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 4 : 2.6}
              fill={i % 2 ? "rgba(124,92,255,0.85)" : "rgba(43,107,255,0.85)"}
              style={{ animation: `hb-twinkle ${3 + (i % 4)}s ease-in-out ${i * 0.25}s infinite` }}
            />
          ))}
        </g>
      </svg>

      {/* Grille fine fondue */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,10,10,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,10,0.045) 1px, transparent 1px)",
          backgroundSize: "62px 62px",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, #000 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, #000 25%, transparent 78%)",
        }}
      />

      {/* Voile blanc pour la lisibilité du texte (centre) + fondu vers le bas */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 55% 45% at 50% 32%, rgba(255,255,255,0.78), transparent 70%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(transparent, white)" }}
      />
    </div>
  );
}
