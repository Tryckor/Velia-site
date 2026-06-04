"use client";

import { useEffect, useRef } from "react";
import { LogoMark } from "./Logo";

type CardState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
};

/**
 * The 4 service cards drift gently across the hero and bounce off the edges
 * and off each other (2-card AABB collisions). Pure requestAnimationFrame
 * physics, desktop-only, paused for prefers-reduced-motion.
 */
export function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stateRef = useRef<CardState[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let running = false;

    const cards = () =>
      cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const SPEED = 0.8; // px per frame (~48px/s) — slow, premium drift
    // deterministic spread so it never overlaps badly on first paint
    const cols = [0.04, 0.62, 0.05, 0.55];
    const rows = [0.1, 0.08, 0.64, 0.68];
    const dirs = [
      [1, 0.7],
      [-0.85, 0.65],
      [0.7, -0.85],
      [-0.65, -0.75],
    ];

    const place = () => {
      const cs = cards();
      stateRef.current.forEach((s, i) => {
        const el = cs[i];
        if (el) el.style.transform = `translate(${s.x}px, ${s.y}px)`;
      });
    };

    const init = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      if (W === 0 || H === 0) return false; // hidden (mobile) → don't run
      const cs = cards();
      stateRef.current = cs.map((el, i) => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const prev = stateRef.current[i];
        let x = prev ? prev.x : cols[i % 4] * (W - w);
        let y = prev ? prev.y : rows[i % 4] * (H - h);
        x = Math.max(0, Math.min(x, W - w));
        y = Math.max(0, Math.min(y, H - h));
        const d = dirs[i % 4];
        const norm = Math.hypot(d[0], d[1]) || 1;
        const vx = prev ? prev.vx : (d[0] / norm) * SPEED;
        const vy = prev ? prev.vy : (d[1] / norm) * SPEED;
        return { x, y, vx, vy, w, h };
      });
      place();
      container.style.opacity = "1";
      return true;
    };

    const step = () => {
      const W = container.clientWidth;
      const H = container.clientHeight;
      const s = stateRef.current;

      // move + bounce off the four edges
      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        c.x += c.vx;
        c.y += c.vy;
        if (c.x <= 0) {
          c.x = 0;
          c.vx = Math.abs(c.vx);
        } else if (c.x + c.w >= W) {
          c.x = W - c.w;
          c.vx = -Math.abs(c.vx);
        }
        if (c.y <= 0) {
          c.y = 0;
          c.vy = Math.abs(c.vy);
        } else if (c.y + c.h >= H) {
          c.y = H - c.h;
          c.vy = -Math.abs(c.vy);
        }
      }

      // card-to-card collisions (resolve along least-penetration axis)
      for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j < s.length; j++) {
          const a = s[i];
          const b = s[j];
          const ox =
            Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
          const oy =
            Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
          if (ox > 0 && oy > 0) {
            if (ox < oy) {
              const p = ox / 2;
              const ac = a.x + a.w / 2;
              const bc = b.x + b.w / 2;
              if (ac < bc) {
                a.x -= p;
                b.x += p;
                a.vx = -Math.abs(a.vx);
                b.vx = Math.abs(b.vx);
              } else {
                a.x += p;
                b.x -= p;
                a.vx = Math.abs(a.vx);
                b.vx = -Math.abs(b.vx);
              }
            } else {
              const p = oy / 2;
              const ac = a.y + a.h / 2;
              const bc = b.y + b.h / 2;
              if (ac < bc) {
                a.y -= p;
                b.y += p;
                a.vy = -Math.abs(a.vy);
                b.vy = Math.abs(b.vy);
              } else {
                a.y += p;
                b.y -= p;
                a.vy = Math.abs(a.vy);
                b.vy = -Math.abs(b.vy);
              }
            }
          }
        }
      }

      place();
      rafRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      rafRef.current = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };

    if (init()) start();

    const onResize = () => {
      if (init()) start();
      else stop();
    };
    window.addEventListener("resize", onResize);
    // re-init once fonts/layout settle (card sizes can shift)
    const t = window.setTimeout(() => {
      if (init()) start();
    }, 350);

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  const cardBase =
    "absolute left-0 top-0 will-change-transform rounded-2xl border border-black/5 bg-white/95 p-4 text-foreground shadow-[0_30px_70px_-25px_rgba(0,0,0,0.65)] backdrop-blur-sm";

  return (
    <div
      ref={containerRef}
      aria-hidden
      style={{ opacity: 0 }}
      className="pointer-events-none absolute inset-0 z-20 hidden overflow-hidden opacity-0 transition-opacity duration-700 xl:block"
    >
      {/* Réceptionniste IA (agents IA) */}
      <div
        ref={(el) => {
          cardRefs.current[0] = el;
        }}
        className={`${cardBase} w-64`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-white">
            <LogoMark className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Réceptionniste IA</span>
            <span className="text-xs text-muted">En ligne · 24/7</span>
          </div>
          <span className="relative ml-auto flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
        </div>
        <div className="mt-3 space-y-2">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3 py-1.5 text-xs text-white">
            Bonjour, êtes-vous ouvert samedi ?
          </div>
          <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-[#f3f3f3] px-3 py-1.5 text-xs">
            Oui, de 9h à 18h. Je vous réserve un créneau ?
          </div>
        </div>
      </div>

      {/* Temps gagné (automatisations / ROI) */}
      <div
        ref={(el) => {
          cardRefs.current[1] = el;
        }}
        className={`${cardBase} w-44`}
      >
        <span className="text-xs text-muted">Temps gagné / sem.</span>
        <p className="mt-1 text-3xl font-semibold tracking-tight">12 h</p>
        <div className="mt-2 flex items-end gap-1">
          {[40, 65, 50, 80, 95].map((h, i) => (
            <span
              key={i}
              className="w-3 rounded-sm bg-foreground/80"
              style={{ height: `${h * 0.32}px` }}
            />
          ))}
        </div>
      </div>

      {/* Automatisation pipeline */}
      <div
        ref={(el) => {
          cardRefs.current[2] = el;
        }}
        className={`${cardBase} w-64`}
      >
        <span className="text-xs text-muted">Automatisation</span>
        <div className="mt-3 flex items-center justify-between text-xs font-medium">
          <span className="rounded-lg bg-[#f3f3f3] px-2.5 py-1.5">Devis</span>
          <span className="text-muted">→</span>
          <span className="rounded-lg bg-[#f3f3f3] px-2.5 py-1.5">Relance</span>
          <span className="text-muted">→</span>
          <span className="rounded-lg bg-foreground px-2.5 py-1.5 text-white">
            Signé
          </span>
        </div>
      </div>

      {/* SEO / référencement */}
      <div
        ref={(el) => {
          cardRefs.current[3] = el;
        }}
        className={`${cardBase} w-52`}
      >
        <span className="text-xs text-muted">Référencement SEO</span>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight">1ʳᵉ</span>
          <span className="text-sm text-muted">page Google</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5 text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path
              d="M4 14l5-5 4 4 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M15 6h5v5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Trafic organique en hausse
        </div>
      </div>
    </div>
  );
}
