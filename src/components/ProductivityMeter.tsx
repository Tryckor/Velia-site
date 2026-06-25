"use client";

import { useEffect, useRef, useState } from "react";

// Widget "Vitesse de réponse" (sourcé Harvard Business Review, 2011) :
// répondre à un prospect dans l'heure = ~7x plus de chances de le convertir.
// Barre courte "Sans Velia" (×1) → barre longue Velia (×7). Construction
// progressive, auto-play au reveal du hero (prop play), rejouable au clic.
// NB: composant historiquement nommé ProductivityMeter — conserve ce nom
// d'export pour ne pas casser l'import existant.
export function ProductivityMeter({ play = true }: { play?: boolean }) {
  const [reveal, setReveal] = useState(false);
  const [sansW, setSansW] = useState(0);
  const [avecW, setAvecW] = useState(0);
  const [mult, setMult] = useState(1);
  const [done, setDone] = useState(false);
  const raf = useRef<number | undefined>(undefined);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function countTo(from: number, to: number, dur: number, cb?: () => void) {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setMult(from + (to - from) * p);
      if (p < 1) raf.current = requestAnimationFrame(step);
      else cb?.();
    };
    raf.current = requestAnimationFrame(step);
  }

  function run() {
    if (raf.current) cancelAnimationFrame(raf.current);
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setReveal(false);
    setSansW(0);
    setAvecW(0);
    setMult(1);
    setDone(false);

    requestAnimationFrame(() => requestAnimationFrame(() => setReveal(true)));
    // 1) petite barre "Sans Velia" (×1)
    timers.current.push(setTimeout(() => setSansW(14), 700));
    // 2) grande barre "Avec Velia" qui monte à ×7
    timers.current.push(
      setTimeout(() => {
        setAvecW(100);
        countTo(1, 7, 1300, () => setDone(true));
      }, 1250),
    );
  }

  useEffect(() => {
    if (!play) return;
    const t = setTimeout(run, 400);
    return () => {
      clearTimeout(t);
      timers.current.forEach(clearTimeout);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play]);

  const up = (d: number): React.CSSProperties =>
    reveal ? { animation: `pm-up 0.6s ${d}s both` } : { opacity: 0 };

  return (
    <div
      onClick={run}
      className="mx-auto w-full max-w-[460px] cursor-pointer rounded-[22px] border border-black/[0.07] bg-white p-7 shadow-[0_40px_90px_-40px_rgba(20,20,60,0.4)]"
      title="Rejouer l'animation"
    >
      <style>{`@keyframes pm-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="flex items-center justify-between" style={up(0.05)}>
        <div className="text-[15px] font-medium text-[#0a0a0a]">
          Vos chances de convertir un prospect
        </div>
        <span className="rounded-full bg-[#f4f6fa] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">
          réponse &lt; 1 h
        </span>
      </div>

      {/* Le chiffre clé */}
      <div className="my-5 flex items-baseline gap-2" style={up(0.15)}>
        <span className="text-[46px] font-medium leading-none text-[#0a0a0a]">
          ×{mult.toFixed(mult >= 6.95 ? 0 : 1)}
        </span>
        <span className="text-[15px] text-[#6b7280]">avec Velia</span>
      </div>

      {/* Comparatif */}
      <div className="space-y-3.5">
        <div style={up(0.28)}>
          <div className="mb-1.5 flex justify-between text-[12.5px] text-[#8a8f98]">
            <span>Sans Velia · réponse en ~42 h</span>
            <span>×1</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-[#eef0f4]">
            <div
              className="h-full rounded-full"
              style={{ width: `${sansW}%`, background: "#cfd4dd", transition: "width .8s cubic-bezier(.5,0,.2,1)" }}
            />
          </div>
        </div>

        <div style={up(0.4)}>
          <div className="mb-1.5 flex justify-between text-[12.5px] font-medium text-[#0a0a0a]">
            <span>Avec Velia · réponse instantanée</span>
            <span style={{ color: "#5b3bd6", opacity: done ? 1 : 0, transition: "opacity .4s" }}>×7</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-[#eef0f4]">
            <div
              className="h-full rounded-full"
              style={{
                width: `${avecW}%`,
                background: "linear-gradient(90deg,#2b6bff,#7c5cff)",
                transition: "width 1.3s cubic-bezier(.5,0,.2,1)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-black/[0.06] pt-3.5 text-center text-[11.5px] leading-relaxed text-[#9aa0a8]" style={up(0.55)}>
        Source : <span className="text-[#6b7280]">Harvard Business Review</span> — audit de 2 241 entreprises (2011).
        <br />
        Contacter un prospect dans l'heure = ~7× plus de chances de le convertir.
      </div>
    </div>
  );
}
