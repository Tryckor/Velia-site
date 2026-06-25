"use client";

import { useEffect, useRef, useState } from "react";

// Jauge "Votre productivité" : bloquée à 40 % (sans Velia), puis les 60 %
// manquants se remplissent en couleur Velia jusqu'à 100 %. Auto-play au montage,
// rejouable au clic.
export function ProductivityMeter() {
  const [pct, setPct] = useState(40);
  const [filled, setFilled] = useState(false);
  const [done, setDone] = useState(false);
  const raf = useRef<number | undefined>(undefined);

  function run() {
    if (raf.current) cancelAnimationFrame(raf.current);
    setPct(40);
    setFilled(false);
    setDone(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setFilled(true);
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min((now - t0) / 1500, 1);
          setPct(Math.round(40 + 60 * p));
          if (p < 1) raf.current = requestAnimationFrame(step);
          else setDone(true);
        };
        raf.current = requestAnimationFrame(step);
      }),
    );
  }

  useEffect(() => {
    const t = setTimeout(run, 600);
    return () => {
      clearTimeout(t);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-[440px] rounded-[22px] border border-black/[0.07] bg-white p-7 shadow-[0_40px_90px_-40px_rgba(20,20,60,0.4)]">
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-medium text-[#0a0a0a]">Votre productivité</div>
        <span
          className="rounded-full px-2.5 py-1 text-xs font-medium transition-all duration-500"
          style={{
            color: "#5b3bd6",
            background: "#efebff",
            opacity: done ? 1 : 0,
            transform: done ? "translateY(0)" : "translateY(4px)",
          }}
        >
          +60 % avec Velia
        </span>
      </div>

      <div className="my-4 flex items-baseline gap-2">
        <span className="text-[44px] font-medium leading-none text-[#0a0a0a]">{pct}</span>
        <span className="text-xl text-[#9aa0a8]">%</span>
      </div>

      <div className="flex h-4 overflow-hidden rounded-[10px] bg-[#eef0f4]">
        <div className="h-full" style={{ width: "40%", background: "#cfd4dd" }} />
        <div
          className="h-full"
          style={{
            width: filled ? "60%" : "0%",
            background: "linear-gradient(90deg,#2b6bff,#7c5cff)",
            transition: "width 1.5s cubic-bezier(.5,0,.2,1)",
          }}
        />
      </div>

      <div className="mt-3 flex gap-4 text-xs text-[#8a8f98]">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-[9px] w-[9px] rounded-[3px]" style={{ background: "#cfd4dd" }} />
          Sans Velia
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="h-[9px] w-[9px] rounded-[3px]"
            style={{ background: "linear-gradient(90deg,#2b6bff,#7c5cff)" }}
          />
          Ajouté par Velia
        </span>
      </div>

      <button
        type="button"
        onClick={run}
        className="mt-5 w-full rounded-full py-3.5 text-[15px] font-medium text-white transition-transform hover:-translate-y-0.5"
        style={{ background: "linear-gradient(100deg,#2b6bff,#7c5cff)" }}
      >
        {done ? "Productivité maximale ✓" : "Booster avec Velia →"}
      </button>
      <div className="mt-3 text-center text-[12.5px] text-[#9aa0a8]">
        Velia automatise le reste — vous gagnez les 60 % qui manquent.
      </div>
    </div>
  );
}
