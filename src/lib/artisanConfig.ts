/**
 * Configuration d'un artisan pour l'assistant devis (`QuoteBotArtisan`).
 *
 * Tout ce qui doit être CALÉ AVEC LE PATRON vit ici : ses métiers, son taux
 * horaire, et ses fourchettes de prix. Le chatbot se génère à partir de cet
 * objet — on n'enregistre QUE les métiers qu'il fait réellement, avec SES prix.
 *
 * Pour un nouveau client : dupliquer DEFAULT_CONFIG, renseigner ses vrais
 * chiffres avec lui, et passer l'objet en prop : <QuoteBotArtisan config={...} />
 */

export type Trade = "sdb" | "plomb" | "elec" | "clim";

/**
 * Une sous-question posée AVANT d'estimer (ex. surface en m², nombre d'appareils).
 * Chaque réponse porte directement sa propre fourchette de prix.
 */
export type SubQuestion = {
  bot: string;
  options: { label: string; lbl?: string; lo: number; hi: number }[];
};

/**
 * Une prestation chiffrable : libellé + fourchette de prix.
 * Si `ask` est présent, on pose d'abord une sous-question (surface, nb d'appareils…)
 * et c'est la réponse choisie qui fixe la fourchette (lo/hi de la prestation = repli).
 */
export type Presta = { label: string; lbl: string; lo: number; hi: number; ask?: SubQuestion };

/** Palier de surface pour une salle de bain (prix de base avant majoration). */
export type SdbSurface = { label: string; lbl: string; lo: number; hi: number };

export type ArtisanConfig = {
  /** Nom affiché dans l'en-tête du chatbot (ex. "EPCC"). */
  nom?: string;
  /** Taux horaire main d'œuvre TTC (€/h). Sert aux estimations calculées. */
  tauxHoraire: number;
  /** Métiers réellement exercés — l'ordre = l'ordre des boutons. */
  metiers: Trade[];

  /** Salle de bain : paliers de surface + majoration d'une rénovation complète. */
  sdb?: {
    surfaces: SdbSurface[];
    /** Multiplicateur appliqué pour une rénovation COMPLÈTE (ex. 1.35 = +35 %). */
    majorationComplete: number;
  };
  /** Prestations plomberie. */
  plomb?: Presta[];
  /** Prestations électricité. */
  elec?: Presta[];
  /** Climatisation : prix par nombre de pièces. */
  clim?: Presta[];
};

/**
 * Config par défaut = fourchettes marché PLAUSIBLES (à remplacer par les vrais
 * prix du patron). Sert de gabarit et de démo générique sur /devis-artisans.
 */
export const DEFAULT_CONFIG: ArtisanConfig = {
  tauxHoraire: 55,
  metiers: ["sdb", "plomb", "elec", "clim"],

  sdb: {
    majorationComplete: 1.35,
    surfaces: [
      { label: "Moins de 4 m²", lbl: "une petite salle de bain", lo: 3000, hi: 5500 },
      { label: "4 à 6 m²", lbl: "une salle de bain de 4-6 m²", lo: 4500, hi: 8500 },
      { label: "6 à 10 m²", lbl: "une salle de bain de 6-10 m²", lo: 6500, hi: 12000 },
      { label: "Plus de 10 m²", lbl: "une grande salle de bain", lo: 9000, hi: 16000 },
    ],
  },
  plomb: [
    { label: "Fuite / dépannage", lbl: "un dépannage plomberie", lo: 90, hi: 300 },
    { label: "Remplacement chauffe-eau", lbl: "un remplacement de chauffe-eau", lo: 600, hi: 1500 },
    {
      // Le prix dépend du nombre de points d'eau (~600-1500 € l'appareil).
      label: "Installation neuve",
      lbl: "une installation plomberie neuve",
      lo: 1500,
      hi: 5000,
      ask: {
        bot: "Combien de points d'eau / appareils à installer ? (WC, lavabo, douche, évier…)",
        options: [
          { label: "1 à 2", lbl: "une installation plomberie (1-2 appareils)", lo: 800, hi: 3000 },
          { label: "3 à 5", lbl: "une installation plomberie (3-5 appareils)", lo: 2000, hi: 7500 },
          { label: "6 et plus", lbl: "une installation plomberie (6 appareils et +)", lo: 4000, hi: 12000 },
        ],
      },
    },
    { label: "Autre / je ne sais pas", lbl: "votre projet plomberie", lo: 150, hi: 1200 },
  ],
  elec: [
    { label: "Mise aux normes (tableau)", lbl: "une mise aux normes du tableau", lo: 1000, hi: 2500 },
    {
      // Réno complète = au m² (≈ 125-205 €/m², norme NF C 15-100).
      label: "Rénovation élec complète",
      lbl: "une rénovation électrique complète",
      lo: 3000,
      hi: 10000,
      ask: {
        bot: "Quelle surface environ ? (pour une rénovation complète, le prix se calcule au m²)",
        options: [
          { label: "Moins de 40 m²", lbl: "une rénovation élec (moins de 40 m²)", lo: 5000, hi: 8000 },
          { label: "40 à 70 m²", lbl: "une rénovation élec (40-70 m²)", lo: 5000, hi: 14000 },
          { label: "70 à 110 m²", lbl: "une rénovation élec (70-110 m²)", lo: 9000, hi: 22000 },
          { label: "Plus de 110 m²", lbl: "une rénovation élec (plus de 110 m²)", lo: 14000, hi: 31000 },
        ],
      },
    },
    { label: "Borne de recharge", lbl: "une borne de recharge", lo: 1200, hi: 1800 },
    { label: "Domotique", lbl: "une installation domotique", lo: 1500, hi: 6000 },
    { label: "Dépannage", lbl: "un dépannage électrique", lo: 90, hi: 300 },
  ],
  clim: [
    { label: "1 pièce", lbl: "une clim 1 pièce (mono-split)", lo: 1500, hi: 3000 },
    { label: "2 à 3 pièces", lbl: "une clim 2-3 pièces (multi-split)", lo: 3000, hi: 6000 },
    { label: "4 pièces ou plus", lbl: "une clim 4 pièces et +", lo: 6000, hi: 10000 },
  ],
};

/** Libellés/emoji par métier, pour les boutons d'accueil. */
export const TRADE_META: Record<Trade, { emoji: string; label: string; step: string }> = {
  sdb: { emoji: "🚿", label: "Salle de bain", step: "Salle de bain" },
  plomb: { emoji: "🔧", label: "Plomberie", step: "Plomberie" },
  elec: { emoji: "⚡", label: "Électricité", step: "Électricité" },
  clim: { emoji: "❄️", label: "Climatisation", step: "Climatisation" },
};
