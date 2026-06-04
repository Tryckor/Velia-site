"use client";

import { useEffect, useRef } from "react";

/**
 * NeuralField — an elegant, interactive "neural network" backdrop.
 * Slowly drifting nodes connected by hairline links (a data / AI mesh) that
 * react to the cursor. Monochrome + faded so it stays luxe on the light theme.
 *
 * Performance & stability:
 *  - single rAF loop, DPR capped at 2
 *  - pauses when offscreen (IntersectionObserver) or tab hidden
 *  - respects prefers-reduced-motion (renders one still frame)
 *  - full teardown on unmount
 */
type Node = { x: number; y: number; vx: number; vy: number; r: number };

export function NeuralField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let running = false;

    const pointer = { x: -9999, y: -9999, active: false };

    const LINK_DIST = 158; // px between nodes to draw a link
    const CURSOR_DIST = 220; // px around the cursor to react

    function build() {
      const parent = canvas!.parentElement;
      const rect = parent
        ? parent.getBoundingClientRect()
        : canvas!.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(72, Math.max(26, Math.floor((width * height) / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 3 + Math.random() * Math.random() * 10,
      }));
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      // graceful drift (wrap softly around edges)
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -30) n.x = width + 30;
        if (n.x > width + 30) n.x = -30;
        if (n.y < -30) n.y = height + 30;
        if (n.y > height + 30) n.y = -30;
      }

      // soft light following the cursor
      if (pointer.active) {
        const R = 260;
        const g = ctx!.createRadialGradient(
          pointer.x, pointer.y, 0, pointer.x, pointer.y, R,
        );
        g.addColorStop(0, "rgba(10,10,10,0.05)");
        g.addColorStop(1, "rgba(10,10,10,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, width, height);
      }

      // the network reveals itself only AROUND the cursor (clean at rest)
      if (pointer.active) {
        const near = nodes.filter(
          (n) => Math.hypot(n.x - pointer.x, n.y - pointer.y) < CURSOR_DIST,
        );
        // links from cursor to nearby particles
        for (const n of near) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          const o = (1 - d / CURSOR_DIST) * 0.4;
          ctx!.strokeStyle = `rgba(10,10,10,${o.toFixed(3)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(pointer.x, pointer.y);
          ctx!.lineTo(n.x, n.y);
          ctx!.stroke();
          // gentle attraction
          n.x += (pointer.x - n.x) * 0.004;
          n.y += (pointer.y - n.y) * 0.004;
        }
        // links between the nearby particles (local mesh)
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < LINK_DIST) {
              const o = (1 - d / LINK_DIST) * 0.2;
              ctx!.strokeStyle = `rgba(10,10,10,${o.toFixed(3)})`;
              ctx!.lineWidth = 1;
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }

      // soft luminous particles
      for (const n of nodes) {
        const near =
          pointer.active &&
          Math.hypot(n.x - pointer.x, n.y - pointer.y) < CURSOR_DIST;
        const core = near ? 0.6 : 0.38;
        const R = Math.max(4, n.r * 2.4);
        const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, R);
        g.addColorStop(0, `rgba(10,10,10,${core})`);
        g.addColorStop(0.45, `rgba(10,10,10,${(core * 0.35).toFixed(3)})`);
        g.addColorStop(1, "rgba(10,10,10,0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, R, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function loop() {
      step();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    }

    function onResize() {
      build();
      step(); // draw one frame immediately
    }
    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    }
    function onLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onVisibility() {
      if (document.hidden) stop();
      else if (visible) start();
    }

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );

    build();
    step();
    io.observe(canvas);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) start();

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        maskImage:
          "radial-gradient(ellipse 135% 110% at 50% 30%, #fff 62%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 135% 110% at 50% 30%, #fff 62%, transparent 100%)",
      }}
    />
  );
}
