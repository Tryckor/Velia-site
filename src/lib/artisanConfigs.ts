/**
 * Registre des clients artisans : un slug d'URL → sa configuration de chatbot.
 *
 * Chaque entrée alimente :
 *   - la page-démo dédiée   /devis/<slug>
 *   - la page embarquée      /embed/<slug>   (iframe de la bulle flottante)
 *
 * Pour ajouter un client : copier un bloc, mettre SES vraies infos (caler les
 * prix avec lui), choisir un slug court. Le slug devient son URL publique.
 */

import { ArtisanConfig, DEFAULT_CONFIG } from "./artisanConfig";

export type ClientEntry = {
  /** Nom commercial affiché (hero, en-tête du bot). */
  enseigne: string;
  /** Ville / zone, pour le sous-titre (optionnel). */
  zone?: string;
  /** Config du chatbot (métiers, taux horaire, prix). */
  config: ArtisanConfig;
};

export const CLIENTS: Record<string, ClientEntry> = {
  // ⚠️ PRIX PROVISOIRES (fourchettes marché) — à CALER avec Thomas (EPCC) avant diffusion.
  epcc: {
    enseigne: "EPCC",
    zone: "Lons (64)",
    config: {
      nom: "EPCC",
      tauxHoraire: 55,
      // EPCC fait électricité, plomberie, climatisation (PAS de salle de bain).
      metiers: ["elec", "plomb", "clim"],
      elec: DEFAULT_CONFIG.elec,
      plomb: DEFAULT_CONFIG.plomb,
      clim: DEFAULT_CONFIG.clim,
    },
  },

  // ── Démos PROSPECTS (à montrer pendant l'appel) — prix = fourchettes marché,
  //    à caler avec le patron s'il signe. Slug court = son URL de démo.

  // Pielet Fils (Richard Pielet) — plomberie / chauffage — Lons (64). /devis/pielet
  pielet: {
    enseigne: "Pielet Fils",
    zone: "Lons (64)",
    config: {
      nom: "Pielet Fils",
      tauxHoraire: 55,
      metiers: ["plomb", "clim"],
      plomb: DEFAULT_CONFIG.plomb,
      clim: DEFAULT_CONFIG.clim,
    },
  },

  // Alain Galos — plombier-chauffagiste RGE — Gan (64). /devis/galos
  galos: {
    enseigne: "Alain Galos",
    zone: "Gan (64)",
    config: {
      nom: "Alain Galos",
      tauxHoraire: 55,
      metiers: ["plomb", "clim"],
      plomb: DEFAULT_CONFIG.plomb,
      clim: DEFAULT_CONFIG.clim,
    },
  },

  // Démo générique (sert de vitrine / exemple) — mêmes fourchettes par défaut.
  demo: {
    enseigne: "Votre entreprise",
    config: DEFAULT_CONFIG,
  },
};

export function getClient(slug: string): ClientEntry | undefined {
  return CLIENTS[slug.toLowerCase()];
}

export function allClientSlugs(): string[] {
  return Object.keys(CLIENTS);
}
