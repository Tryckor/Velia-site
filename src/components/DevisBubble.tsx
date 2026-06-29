"use client";

import { useState } from "react";
import { QuoteBotArtisan } from "./QuoteBotArtisan";
import type { ArtisanConfig } from "@/lib/artisanConfig";

/**
 * Bulle flottante « Demander mon devis gratuit » — reproduit, EN VRAI, ce que
 * verraient les visiteurs du site de l'artisan une fois le chatbot installé
 * (équivalent de public/embed.js, mais en composant React pour la démo).
 */
export function DevisBubble({
  config,
  label = "Demander mon devis gratuit",
}: {
  config?: ArtisanConfig;
  label?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Panneau du chatbot */}
      <div
        className={`fixed bottom-24 right-4 z-[60] w-[min(420px,calc(100vw-2rem))] transition-all duration-200 ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <QuoteBotArtisan config={config} />
      </div>

      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={label}
        className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_-12px_rgba(43,107,255,0.6)] transition-transform hover:-translate-y-0.5"
        style={{ background: "linear-gradient(135deg,#2b6bff,#7c5cff)" }}
      >
        {open ? (
          <>
            <span className="text-lg leading-none">✕</span> Fermer
          </>
        ) : (
          <>
            <span className="text-lg leading-none">💬</span> {label}
          </>
        )}
      </button>
    </>
  );
}
