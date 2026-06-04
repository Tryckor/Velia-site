"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#devis", label: "Devis IA" },
  { href: "#roi", label: "Calculateur" },
  { href: "#faq", label: "FAQ" },
];

export function Nav({ light = false }: { light?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // White nav elements while sitting over a dark hero (top, not scrolled).
  const onDark = light && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto grid h-[4.5rem] max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6">
        {/* Left — bigger Velia logo */}
        <a
          href="#top"
          aria-label="Velia — accueil"
          className={`justify-self-start transition-colors duration-300 ${
            onDark ? "text-white" : "text-foreground"
          }`}
        >
          <span className="inline-flex items-center gap-2.5">
            <LogoMark className="h-7 w-7" />
            <span className="wordmark pl-[0.1em] text-[18px] leading-none">
              VELIA
            </span>
          </span>
        </a>

        {/* Center — navigation links */}
        <div className="hidden items-center gap-9 justify-self-center md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors ${
                onDark
                  ? "text-white/80 hover:text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — CTA (desktop) + menu button (mobile) */}
        <div className="flex items-center justify-self-end">
          <a
            href="#contact"
            className={`hidden rounded-full px-5 py-2 text-sm font-medium transition-opacity hover:opacity-85 md:inline-flex ${
              onDark ? "bg-white text-foreground" : "bg-accent text-white"
            }`}
          >
            Réserver un appel
          </a>

          <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-px w-6 ${onDark ? "bg-white" : "bg-foreground"} transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 ${onDark ? "bg-white" : "bg-foreground"} transition-opacity duration-200 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 ${onDark ? "bg-white" : "bg-foreground"} transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden bg-white transition-[max-height] duration-400 ease-out ${
          open ? "max-h-96 border-b border-line" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground/90"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-foreground px-5 py-3 text-center text-base font-medium text-white"
          >
            Réserver un appel
          </a>
        </div>
      </div>
    </header>
  );
}
