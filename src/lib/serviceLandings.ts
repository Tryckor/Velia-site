/**
 * Contenu des pages-service détaillées (/services/[slug]).
 * Une entrée = une vraie landing : hero, stat sourcée, "comment ça marche",
 * bénéfices, "ce qui est inclus". Stats validées (voir mémoire velia-stats-claims).
 */

export type Step = { n: string; t: string; d: string };
export type Benefit = { t: string; d: string };
export type ServiceStat = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  source: string;
};

export type ServiceLanding = {
  slug: string;
  eyebrow: string;
  /** Titre H1 découpé pour mettre un mot en dégradé. */
  h1: { lead: string; accent: string; tail: string };
  subtitle: string;
  /** Petit encart de réassurance chiffrée dans le hero (optionnel). */
  heroStat?: { strong: string; rest: string; source: string };
  /** Grande stat animée (bande sombre) — optionnel. */
  stat?: ServiceStat;
  included: string[];
  steps: Step[];
  benefits: Benefit[];
  metaTitle: string;
  metaDesc: string;
};

export const SERVICE_LANDINGS: Record<string, ServiceLanding> = {
  "sites-web": {
    slug: "sites-web",
    eyebrow: "Site web sur mesure",
    h1: { lead: "Un site qui transforme vos visiteurs en ", accent: "clients", tail: "." },
    subtitle:
      "Rapide, élégant, optimisé mobile — pensé pour convertir, jamais un template. Vitrine, prise de rendez-vous ou e-commerce.",
    heroStat: {
      strong: "Un site rapide convertit jusqu'à 3× plus",
      rest: " (1 s contre 5 s de chargement).",
      source: "Portent, 2022 (B2B).",
    },
    stat: {
      to: 3,
      suffix: "×",
      label: "plus de conversions avec un site rapide (1 s vs 5 s de chargement)",
      source: "Portent, 2022.",
    },
    included: [
      "Vitrine, prise de rendez-vous ou e-commerce",
      "Optimisé mobile et rapide à charger",
      "Bonnes bases SEO incluses (titres, indexation Google)",
      "Hébergement, sécurité et mises à jour",
    ],
    steps: [
      { n: "1", t: "On cadre votre projet", d: "On part de votre activité, vos clients et vos objectifs. Vous validez la maquette avant tout développement." },
      { n: "2", t: "On conçoit et on développe", d: "Un site sur mesure, rapide et optimisé mobile, à votre image — pas un template tout fait." },
      { n: "3", t: "On met en ligne, clé en main", d: "Hébergement, nom de domaine, sécurité. Vous n'avez rien à gérer, et on vous forme à le mettre à jour." },
    ],
    benefits: [
      { t: "Une première impression pro", d: "Votre site est souvent le premier contact — il inspire confiance avant même le premier appel." },
      { t: "Plus de demandes", d: "Un parcours clair et rapide guide le visiteur jusqu'au contact ou à la prise de rendez-vous." },
      { t: "Mieux trouvé sur Google", d: "Bonnes bases SEO et site rapide : Google vous référence et vous classe mieux." },
    ],
    metaTitle: "Création de site web sur mesure",
    metaDesc: "Un site rapide, élégant et optimisé mobile, pensé pour transformer vos visiteurs en clients. Vitrine, rendez-vous ou e-commerce.",
  },

  "visibilite-google": {
    slug: "visibilite-google",
    eyebrow: "Visibilité locale",
    h1: { lead: "Soyez le premier que vos clients ", accent: "trouvent", tail: " sur Google." },
    subtitle:
      "Fiche Google Business, avis clients et présence locale — le levier n°1 pour qu'un client près de chez vous tombe sur VOUS, pas sur un concurrent.",
    heroStat: {
      strong: "40 % des dirigeants de TPE-PME",
      rest: " estiment que le numérique augmente leur chiffre d'affaires.",
      source: "Baromètre France Num 2025 (DGE).",
    },
    stat: {
      to: 40,
      suffix: " %",
      label: "des dirigeants de TPE-PME estiment que le numérique augmente leur chiffre d'affaires",
      source: "Baromètre France Num 2025 (DGE), 11 021 entreprises.",
    },
    included: [
      "Création et optimisation de votre fiche Google Business",
      "Photos, services, zones et horaires soignés",
      "Collecte d'avis clients (campagne conforme RGPD)",
      "Suivi de votre présence locale",
    ],
    steps: [
      { n: "1", t: "On crée et optimise votre fiche Google", d: "Photos, services, zones desservies, horaires : une fiche complète qui inspire confiance." },
      { n: "2", t: "On lance la collecte d'avis", d: "Une campagne simple auprès de vos clients satisfaits — 100 % conforme (on ne paie ni n'incite jamais un avis)." },
      { n: "3", t: "Vous apparaissez localement", d: "Sur Google Maps et dans les recherches « près de chez moi », vous remontez. On suit les résultats." },
    ],
    benefits: [
      { t: "Visible quand on vous cherche", d: "« plombier + votre ville » : c'est vous qui sortez, pas le concurrent d'à côté." },
      { t: "La confiance des avis", d: "Des étoiles et des avis récents rassurent et font décrocher le téléphone." },
      { t: "Sans rien gérer", d: "On s'occupe de la fiche, des photos et des relances d'avis. Vous récoltez les appels." },
    ],
    metaTitle: "Visibilité locale & fiche Google Business",
    metaDesc: "Soyez trouvé sur Google et Maps quand un client cherche près de chez vous. Création de fiche Google Business, avis clients et présence locale.",
  },

  automatisations: {
    slug: "automatisations",
    eyebrow: "Automatisation",
    h1: { lead: "Arrêtez de perdre du temps sur les ", accent: "tâches répétitives", tail: "." },
    subtitle:
      "Relances, devis, saisie, synchronisation de vos outils : on automatise ce qui vous mange vos soirées, pour que vous vous concentriez sur votre métier.",
    heroStat: {
      strong: "5,6 h par semaine gagnées en moyenne",
      rest: " grâce à l'IA et l'automatisation dans les PME.",
      source: "2026 Small Business AI Outlook.",
    },
    stat: {
      to: 5.6,
      decimals: 1,
      suffix: " h",
      label: "gagnées par semaine en moyenne grâce à l'IA et l'automatisation",
      source: "2026 Small Business AI Outlook (1 009 entreprises).",
    },
    included: [
      "Relances et rappels automatiques",
      "Devis et documents pré-remplis",
      "Vos outils connectés entre eux",
      "Des heures gagnées chaque semaine",
    ],
    steps: [
      { n: "1", t: "On repère vos tâches chronophages", d: "Diagnostic gratuit : on liste ce que vous refaites à la main chaque semaine." },
      { n: "2", t: "On automatise", d: "Relances, devis, saisie, connexions entre vos outils (agenda, mail, CRM…)." },
      { n: "3", t: "Vous gagnez du temps", d: "Les tâches se font seules, sans erreur ni oubli. Vous récupérez des heures." },
    ],
    benefits: [
      { t: "Plus d'oublis", d: "Relances et rappels partent automatiquement, au bon moment, sans y penser." },
      { t: "Moins de saisie", d: "Les infos circulent entre vos outils sans double saisie ni copier-coller." },
      { t: "Des soirées libérées", d: "Le temps administratif fond — vous le rendez à votre métier (ou à vous)." },
    ],
    metaTitle: "Automatisation des tâches répétitives",
    metaDesc: "On automatise relances, devis, saisie et synchronisation de vos outils. L'IA et l'automatisation font gagner en moyenne 5,6 h/semaine aux PME.",
  },

  "reception-ia": {
    slug: "reception-ia",
    eyebrow: "Agent IA & Réceptionniste",
    h1: { lead: "Ne ratez plus jamais un ", accent: "client", tail: ", jour et nuit." },
    subtitle:
      "Un assistant qui répond aux demandes 24/7, qualifie vos prospects et vous transmet les contacts chauds — même quand vous êtes sur un chantier ou au lit.",
    heroStat: {
      strong: "Répondre dans l'heure = jusqu'à 7× plus de chances",
      rest: " de qualifier un prospect (délai moyen réel : 42 h).",
      source: "Harvard Business Review, 2011.",
    },
    stat: {
      to: 7,
      suffix: "×",
      label: "plus de chances de convertir en répondant dans l'heure plutôt qu'en 42 h",
      source: "Harvard Business Review, 2011 (2 241 entreprises).",
    },
    included: [
      "Répond aux messages instantanément",
      "Qualifie et oriente chaque demande",
      "Vous transfère les contacts chauds",
      "Disponible jour et nuit",
    ],
    steps: [
      { n: "1", t: "Le client vous contacte", d: "Par votre site, WhatsApp ou un formulaire — à toute heure du jour et de la nuit." },
      { n: "2", t: "L'assistant répond et qualifie", d: "Il répond tout de suite, pose les bonnes questions et cadre la demande." },
      { n: "3", t: "Vous recevez le contact chaud", d: "Nom, besoin, coordonnées : vous rappelez un prospect déjà prêt à avancer." },
    ],
    benefits: [
      { t: "Zéro demande perdue", d: "Le soir, le week-end, en plein chantier : plus rien ne passe à la trappe." },
      { t: "Vous répondez le premier", d: "Le premier qui répond décroche souvent le client. Ici, la réponse est instantanée." },
      { t: "Des prospects qualifiés", d: "Fini les demandes vagues ou hors zone : vous ne perdez plus de temps." },
    ],
    metaTitle: "Agent IA & Réceptionniste 24/7",
    metaDesc: "Un assistant qui répond aux demandes 24/7, qualifie vos prospects et vous transmet les contacts chauds. Ne ratez plus jamais un client.",
  },

  "email-pro": {
    slug: "email-pro",
    eyebrow: "Adresse mail pro",
    h1: { lead: "Une adresse à votre nom, pour une image ", accent: "sérieuse", tail: "." },
    subtitle:
      "vous@votre-entreprise.fr plutôt qu'une adresse gmail ou hotmail : plus de crédibilité, une boîte fiable et sécurisée, configurée sur tous vos appareils.",
    included: [
      "Adresse à votre nom de domaine",
      "Boîte sécurisée et fiable, anti-spam inclus",
      "Configurée sur tous vos appareils",
      "Support en cas de souci",
    ],
    steps: [
      { n: "1", t: "On crée vos adresses", d: "vous@votre-entreprise.fr, et autant d'adresses que nécessaire (contact@, devis@…)." },
      { n: "2", t: "On sécurise et on configure", d: "Anti-spam, sauvegarde, et configuration sur votre téléphone et votre ordinateur." },
      { n: "3", t: "Vous écrivez en pro", d: "Chaque mail renforce votre image. On reste disponible en cas de souci." },
    ],
    benefits: [
      { t: "Crédibilité immédiate", d: "Une adresse à votre nom de domaine fait sérieux dès le premier contact." },
      { t: "Fiable et sécurisée", d: "Anti-spam et sauvegardes : votre boîte ne tombe pas et reste protégée." },
      { t: "Sur tous vos appareils", d: "Configurée partout, vos mails vous suivent du bureau au chantier." },
    ],
    metaTitle: "Hébergement mail professionnel",
    metaDesc: "Une adresse pro à votre nom de domaine (vous@votre-entreprise.fr), fiable et sécurisée, pour une image sérieuse. Configurée sur tous vos appareils.",
  },
};

export function getServiceLanding(slug: string): ServiceLanding | undefined {
  return SERVICE_LANDINGS[slug];
}

export function allServiceSlugs(): string[] {
  return Object.keys(SERVICE_LANDINGS);
}
