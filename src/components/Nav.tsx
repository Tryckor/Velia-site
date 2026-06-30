"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoMark } from "./Logo";

// Sous-menu Services → pages détaillées (conversion : accès direct + maillage SEO).
const SERVICE_MENU = [
  { href: "/services/sites-web", label: "Sites web" },
  { href: "/devis-artisans", label: "Chatbot & devis 24/7" },
  { href: "/services/visibilite-google", label: "Visibilité locale Google" },
  { href: "/services/automatisations", label: "Automatisations" },
  { href: "/services/reception-ia", label: "Agent IA & Réceptionniste" },
  { href: "/services/email-pro", label: "Hébergement mail" },
];

// Ancres absolues (/#…) pour fonctionner depuis n'importe quelle page.
const LINKS = [
  { href: "/#devis", label: "Devis IA" },
  { href: "/#roi", label: "Calculateur" },
  { href: "/#faq", label: "FAQ" },
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
          {/* Services — déroulant vers les pages détaillées */}
          <div className="group relative">
            <a
              href="/#services"
              className={`inline-flex items-center gap-1 border-b border-current pb-1 text-sm transition-colors ${
                onDark ? "text-white/80 hover:text-white" : "text-muted hover:text-foreground"
              }`}
            >
              Services
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            {/* Panneau (le pt-3 fait le pont de survol) */}
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgba(20,20,60,0.35)]">
                {SERVICE_MENU.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3.5 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-accent/10 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`inline-block border-b border-current pb-1 text-sm transition-colors ${
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
              onDark ? "bg-white text-foreground" : "btn-gradient"
            }`}
          >
            Réserver mon audit
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
          open ? "max-h-[40rem] border-b border-line" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {/* Services + sous-liens */}
          <a
            href="/#services"
            onClick={() => setOpen(false)}
            className="pt-3 pb-1 text-base font-medium text-foreground"
          >
            Services
          </a>
          <div className="mb-1 flex flex-col border-l border-line pl-3">
            {SERVICE_MENU.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-[15px] text-foreground/75"
              >
                {item.label}
              </Link>
            ))}
          </div>

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
            href="/#contact"
            onClick={() => setOpen(false)}
            className="btn-gradient mt-2 rounded-full px-5 py-3 text-center text-base font-medium"
          >
            Réserver mon audit
          </a>
        </div>
      </div>
    </header>
  );
}
