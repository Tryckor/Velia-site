"use client";

import { useEffect, useRef, useState } from "react";

// Widget hero "Temps récupéré" (stat parapluie couvrant toute l'offre IA de
// Velia). Source : 2026 Small Business AI Outlook (Business.com) — l'IA fait
// gagner en moyenne 5,6 h/semaine aux PME (~250 h/an). Construction progressive,
// auto-play au reveal du hero (prop play), rejouable au clic.
// NB: nom d'export ProductivityMeter conservé (import existant).
const TARGET_H = 5.6;

export function ProductivityMeter({ play = true }: { play?: boolean }) {
  const [reveal, setReveal] = useState(false);
  const [hours, setHours] = useState(0);
  const [barW, setBarW] = useState(0);
  const [done, setDone] = useState(false);
  const raf = useRef<number | undefined>(undefined);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  function countTo(to: number, dur: number, cb?: () => void) {
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setHours(to * p);
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
    setHours(0);
    setBarW(0);
    setDone(false);

    requestAnimationFrame(() => requestAnimationFrame(() => setReveal(true)));
    timers.current.push(
      setTimeout(() => {
        setBarW(100);
        countTo(TARGET_H, 1700, () => setDone(true));
      }, 800),
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
        <div className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#6b7280]">
          Temps récupéré chaque semaine
        </div>
        <span className="rounded-full bg-[#f4f6fa] px-2.5 py-1 text-[11px] font-medium text-[#6b7280]">
          grâce à l’IA
        </span>
      </div>

      {/* Le chiffre clé */}
      <div className="mb-1 mt-5 flex items-baseline gap-2" style={up(0.15)}>
        <span className="text-[52px] font-medium leading-none text-[#0a0a0a]">
          {hours.toFixed(1).replace(".", ",")}
        </span>
        <span className="text-[20px] font-medium text-[#0a0a0a]">h</span>
        <span className="text-[15px] text-[#6b7280]">/ semaine</span>
      </div>
      <div
        className="text-[13px] text-[#9aa0a8]"
        style={{ ...up(0.15), opacity: done ? 1 : 0, transition: "opacity .5s" }}
      >
        soit <span className="font-medium text-[#5b3bd6]">≈ 250 h gagnées par an</span>
      </div>

      {/* Barre flourish */}
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#eef0f4]" style={up(0.28)}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${barW}%`,
            background: "linear-gradient(90deg,#2b6bff,#7c5cff)",
            transition: "width 1.6s cubic-bezier(.5,0,.2,1)",
          }}
        />
      </div>

      {/* Couverture services */}
      <div className="mt-4 flex flex-wrap gap-1.5" style={up(0.4)}>
        {["Sites web", "Automatisations", "Chatbots", "Réceptionniste IA", "SEO"].map((s) => (
          <span key={s} className="rounded-full bg-[#f4f6fa] px-2.5 py-1 text-[11.5px] text-[#5b5b5b]">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-black/[0.06] pt-3.5 text-center text-[11.5px] leading-relaxed text-[#9aa0a8]" style={up(0.55)}>
        Source : <span className="text-[#6b7280]">2026 Small Business AI Outlook</span> (Business.com) — 1 009 PME interrogées.
      </div>
    </div>
  );
}
