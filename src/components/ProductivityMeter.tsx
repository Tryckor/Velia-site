"use client";

import { useEffect, useRef, useState } from "react";

// Jauge "Votre productivité" — construction PROGRESSIVE : tout est vide au
// départ, les éléments apparaissent en cascade, la barre se remplit 0→40 %
// (sans Velia), puis les 60 % Velia jusqu'à 100 %. Auto-play + rejouable.
export function ProductivityMeter() {
  const [reveal, setReveal] = useState(false);
  const [baseW, setBaseW] = useState(0);
  const [extraW, setExtraW] = useState(0);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef<number | undefined>(undefined);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function countTo(from: number, to: number, dur: number, cb?: () => void) {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setPct(Math.round(from + (to - from) * p));
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
    setBaseW(0);
    setExtraW(0);
    setPct(0);
    setDone(false);

    requestAnimationFrame(() => requestAnimationFrame(() => setReveal(true)));
    // 1) la barre grise se remplit 0 → 40 %
    timers.current.push(
      setTimeout(() => {
        setBaseW(40);
        countTo(0, 40, 900);
      }, 750),
    );
    // 2) pause, puis les 60 % Velia se remplissent → 100 %
    timers.current.push(
      setTimeout(() => {
        setExtraW(60);
        countTo(40, 100, 1200, () => setDone(true));
      }, 2150),
    );
  }

  useEffect(() => {
    const t = setTimeout(run, 400);
    return () => {
      clearTimeout(t);
      timers.current.forEach(clearTimeout);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const up = (d: number): React.CSSProperties =>
    reveal ? { animation: `pm-up 0.6s ${d}s both` } : { opacity: 0 };

  return (
    <div className="mx-auto w-full max-w-[440px] rounded-[22px] border border-black/[0.07] bg-white p-7 shadow-[0_40px_90px_-40px_rgba(20,20,60,0.4)]">
      <style>{`@keyframes pm-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="flex items-center justify-between">
        <div className="text-[15px] font-medium text-[#0a0a0a]" style={up(0.05)}>
          Votre productivité
        </div>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            color: "#5b3bd6",
            background: "#efebff",
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(4px)",
            transition: "opacity .4s, transform .4s",
          }}
        >
          +60 % avec Velia
        </span>
      </div>

      <div className="my-4 flex items-baseline gap-2" style={up(0.15)}>
        <span className="text-[44px] font-medium leading-none text-[#0a0a0a]">{pct}</span>
        <span className="text-xl text-[#9aa0a8]">%</span>
      </div>

      <div className="flex h-4 overflow-hidden rounded-[10px] bg-[#eef0f4]" style={up(0.25)}>
        <div
          className="h-full"
          style={{ width: `${baseW}%`, background: "#cfd4dd", transition: "width .9s cubic-bezier(.5,0,.2,1)" }}
        />
        <div
          className="h-full"
          style={{
            width: `${extraW}%`,
            background: "linear-gradient(90deg,#2b6bff,#7c5cff)",
            transition: "width 1.2s cubic-bezier(.5,0,.2,1)",
          }}
        />
      </div>

      <div className="mt-3 flex gap-4 text-xs text-[#8a8f98]" style={up(0.35)}>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-[9px] w-[9px] rounded-[3px]" style={{ background: "#cfd4dd" }} />
          Sans Velia
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-[9px] w-[9px] rounded-[3px]" style={{ background: "linear-gradient(90deg,#2b6bff,#7c5cff)" }} />
          Ajouté par Velia
        </span>
      </div>

      <button
        type="button"
        onClick={run}
        className="mt-5 w-full rounded-full py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "linear-gradient(100deg,#2b6bff,#7c5cff)", ...up(0.5) }}
      >
        {done ? "Productivité maximale ✓" : "Booster avec Velia →"}
      </button>
      <div className="mt-3 text-center text-[12.5px] text-[#9aa0a8]" style={up(0.6)}>
        Velia automatise le reste — vous gagnez les 60 % qui manquent.
      </div>
    </div>
  );
}
