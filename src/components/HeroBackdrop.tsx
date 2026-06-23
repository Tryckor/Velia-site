// Fond subtil du hero : deux halos de couleur (bleu/violet) qui dérivent
// doucement, pour habiller le blanc sans le surcharger. Décoratif.
// (Le prop `play` est accepté mais ignoré — gardé pour compat d'appel.)

export function HeroBackdrop(_props: { play?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes hb-drift1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(50px,36px); } }
        @keyframes hb-drift2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-46px,-30px); } }
      `}</style>
      <div
        className="absolute -left-24 top-4 h-[34rem] w-[34rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(43,107,255,0.16), transparent 70%)", filter: "blur(48px)", animation: "hb-drift1 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-24 top-10 h-[32rem] w-[32rem] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(124,92,255,0.14), transparent 70%)", filter: "blur(48px)", animation: "hb-drift2 21s ease-in-out infinite" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40" style={{ background: "linear-gradient(transparent, white)" }} />
    </div>
  );
}
