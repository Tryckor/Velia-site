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

      const count = Math.min(130, Math.max(46, Math.floor((width * height) / 9000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 2.2 + Math.random() * 3,
      }));
    }

    function step() {
      ctx!.clearRect(0, 0, width, height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      // links between nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const o = (1 - d / LINK_DIST) * 0.32;
            ctx!.strokeStyle = `rgba(10,10,10,${o.toFixed(3)})`;
            ctx!.lineWidth = 1.1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // cursor interaction: highlight links from pointer to nearby nodes
      if (pointer.active) {
        for (const n of nodes) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_DIST) {
            const o = (1 - d / CURSOR_DIST) * 0.5;
            ctx!.strokeStyle = `rgba(10,10,10,${o.toFixed(3)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(pointer.x, pointer.y);
            ctx!.lineTo(n.x, n.y);
            ctx!.stroke();
            // gently pull nodes toward the cursor
            n.x -= (dx / d) * (1 - d / CURSOR_DIST) * 0.6;
            n.y -= (dy / d) * (1 - d / CURSOR_DIST) * 0.6;
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const near =
          pointer.active &&
          Math.hypot(n.x - pointer.x, n.y - pointer.y) < CURSOR_DIST;
        ctx!.fillStyle = near ? "rgba(10,10,10,0.95)" : "rgba(10,10,10,0.58)";
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
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
