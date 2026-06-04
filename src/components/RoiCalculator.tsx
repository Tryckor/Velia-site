"use client";

import { useMemo, useState } from "react";

/* ----------------------------------------------------------------------------
 * A per-service "cost of doing nothing" calculator.
 * Each service exposes 1–2 sliders and computes a transparent, believable
 * estimate of what the prospect loses today — to create the urge to act.
 * Figures are illustrative estimates, clearly labelled as such.
 * -------------------------------------------------------------------------- */

type Slider = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  unit: string;
  format?: (v: number) => string;
};

type Service = {
  id: string;
  tab: string;
  title: string;
  sliders: Slider[];
  /** returns the main figure + supporting lines */
  compute: (v: Record<string, number>) => {
    headline: number;
    headlineSuffix: string;
    headlinePrefix?: string;
    caption: string;
    lines: { label: string; value: string }[];
  };
};

const euro = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const SERVICES: Service[] = [
  {
    id: "auto",
    tab: "Automatisations",
    title: "Le temps perdu sur les tâches répétitives",
    sliders: [
      {
        key: "hours",
        label: "Heures/semaine sur des tâches répétitives",
        min: 1,
        max: 40,
        step: 1,
        default: 10,
        unit: "h",
      },
      {
        key: "rate",
        label: "Coût horaire moyen (salaire chargé)",
        min: 15,
        max: 80,
        step: 1,
        default: 30,
        unit: "€/h",
      },
    ],
    compute: ({ hours, rate }) => {
      const perYearHours = hours * 47; // semaines travaillées
      const cost = perYearHours * rate;
      return {
        headline: cost,
        headlinePrefix: "",
        headlineSuffix: " €",
        caption: "perdus chaque année en tâches automatisables",
        lines: [
          { label: "Heures récupérées / an", value: `${euro(perYearHours)} h` },
          {
            label: "Soit l'équivalent de",
            value: `${Math.round(perYearHours / 7)} jours de travail`,
          },
        ],
      };
    },
  },
  {
    id: "agent",
    tab: "Agent IA / Réceptionniste",
    title: "Les appels manqués = des clients perdus",
    sliders: [
      {
        key: "calls",
        label: "Appels manqués / semaine",
        min: 1,
        max: 50,
        step: 1,
        default: 8,
        unit: "appels",
      },
      {
        key: "basket",
        label: "Panier moyen d'un client",
        min: 20,
        max: 2000,
        step: 10,
        default: 150,
        unit: "€",
      },
    ],
    compute: ({ calls, basket }) => {
      const convert = 0.3; // 30% d'un appel = un client potentiel
      const lostPerMonth = calls * 4.3 * convert * basket;
      return {
        headline: lostPerMonth,
        headlineSuffix: " €",
        caption: "de chiffre d'affaires manqué chaque mois",
        lines: [
          {
            label: "Sur un an",
            value: `${euro(lostPerMonth * 12)} €`,
          },
          {
            label: "Un réceptionniste IA répond",
            value: "24h/24, 7j/7",
          },
        ],
      };
    },
  },
  {
    id: "web",
    tab: "Site web",
    title: "Les visiteurs qui repartent sans acheter",
    sliders: [
      {
        key: "visitors",
        label: "Visiteurs / mois sur votre site",
        min: 100,
        max: 20000,
        step: 100,
        default: 1500,
        unit: "",
      },
      {
        key: "basket",
        label: "Panier moyen d'un client",
        min: 20,
        max: 2000,
        step: 10,
        default: 120,
        unit: "€",
      },
    ],
    compute: ({ visitors, basket }) => {
      // un site lent/daté convertit ~1%, un site pro pensé pour convertir ~3%
      const gain = visitors * (0.03 - 0.01) * basket;
      return {
        headline: gain,
        headlineSuffix: " €",
        caption: "de ventes supplémentaires possibles chaque mois",
        lines: [
          { label: "Sur un an", value: `${euro(gain * 12)} €` },
          {
            label: "Un site qui convertit, c'est",
            value: "x2 à x3 de clients",
          },
        ],
      };
    },
  },
  {
    id: "seo",
    tab: "SEO",
    title: "Les clients qui vous cherchent sur Google",
    sliders: [
      {
        key: "searches",
        label: "Recherches/mois sur votre activité (zone)",
        min: 100,
        max: 30000,
        step: 100,
        default: 2000,
        unit: "",
      },
      {
        key: "value",
        label: "Valeur d'un nouveau client",
        min: 20,
        max: 3000,
        step: 10,
        default: 200,
        unit: "€",
      },
    ],
    compute: ({ searches, value }) => {
      // 1ʳᵉ page Google ~ 28% des clics ; on capte ~ un tiers de façon réaliste
      const clicks = searches * 0.28;
      const leads = clicks * 0.05; // 5% des clics deviennent contacts
      const revenue = leads * value;
      return {
        headline: revenue,
        headlineSuffix: " €",
        caption: "de CA potentiel/mois en étant bien référencé",
        lines: [
          { label: "Visites captées / mois", value: `${euro(clicks)}` },
          { label: "Nouveaux contacts / mois", value: `~${Math.round(leads)}` },
        ],
      };
    },
  },
  {
    id: "devis",
    tab: "Devis instantané",
    title: "Les leads perdus à cause du temps d'attente",
    sliders: [
      {
        key: "leads",
        label: "Demandes de devis / mois",
        min: 5,
        max: 300,
        step: 5,
        default: 40,
        unit: "",
      },
      {
        key: "value",
        label: "Valeur moyenne d'un projet",
        min: 100,
        max: 30000,
        step: 100,
        default: 2500,
        unit: "€",
      },
    ],
    compute: ({ leads, value }) => {
      // ~35% des demandes ne se concrétisent pas faute de réponse rapide,
      // valorisées au taux de signature courant (~30%).
      const lost = leads * 0.35 * value * 0.3;
      return {
        headline: lost,
        headlineSuffix: " €",
        caption: "de CA perdu/mois faute de réponse assez rapide",
        lines: [
          { label: "Sur un an", value: `${euro(lost * 12)} €` },
          { label: "Avec un devis IA", value: "réponse en 30 s, 24/7" },
        ],
      };
    },
  },
  {
    id: "chatbot",
    tab: "Chatbot",
    title: "Les questions sans réponse, le soir et le week-end",
    sliders: [
      {
        key: "visitors",
        label: "Visiteurs / mois sur votre site",
        min: 100,
        max: 20000,
        step: 100,
        default: 1500,
        unit: "",
      },
      {
        key: "basket",
        label: "Panier moyen d'un client",
        min: 20,
        max: 2000,
        step: 10,
        default: 120,
        unit: "€",
      },
    ],
    compute: ({ visitors, basket }) => {
      // ~3% des visiteurs poseraient une question ; un chatbot en convertit ~20%
      const engaged = visitors * 0.03;
      const won = engaged * 0.2;
      const revenue = won * basket;
      return {
        headline: revenue,
        headlineSuffix: " €",
        caption: "de ventes récupérées/mois en répondant instantanément",
        lines: [
          { label: "Visiteurs engagés / mois", value: `~${Math.round(engaged)}` },
          { label: "Disponibilité", value: "Réponses 24h/24" },
        ],
      };
    },
  },
];

export function RoiCalculator() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  const [values, setValues] = useState<Record<string, Record<string, number>>>(
    () =>
      Object.fromEntries(
        SERVICES.map((s) => [
          s.id,
          Object.fromEntries(s.sliders.map((sl) => [sl.key, sl.default])),
        ])
      )
  );

  const current = values[service.id];
  const result = useMemo(
    () => service.compute(current),
    [service, current]
  );

  const setValue = (key: string, val: number) =>
    setValues((prev) => ({
      ...prev,
      [service.id]: { ...prev[service.id], [key]: val },
    }));

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      {/* Tabs */}
      <div className="marquee-mask flex gap-1 overflow-x-auto border-b border-line p-2">
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              i === active
                ? "bg-accent text-white"
                : "text-muted hover:bg-[#f4f4f4] hover:text-foreground"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>

      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
        {/* Inputs */}
        <div>
          <h3 className="text-xl font-medium">{service.title}</h3>
          <p className="mt-1.5 text-sm text-muted">
            Bougez les curseurs avec vos chiffres réels.
          </p>

          <div className="mt-8 space-y-8">
            {service.sliders.map((sl) => (
              <div key={sl.key}>
                <div className="mb-3 flex items-baseline justify-between gap-4">
                  <label className="text-sm text-muted">{sl.label}</label>
                  <span className="shrink-0 text-base font-semibold tabular-nums">
                    {sl.format
                      ? sl.format(current[sl.key])
                      : euro(current[sl.key])}
                    {sl.unit ? ` ${sl.unit}` : ""}
                  </span>
                </div>
                <input
                  type="range"
                  min={sl.min}
                  max={sl.max}
                  step={sl.step}
                  value={current[sl.key]}
                  onChange={(e) => setValue(sl.key, Number(e.target.value))}
                  aria-label={sl.label}
                  className="h-1 w-full cursor-pointer appearance-none rounded-full bg-line accent-[var(--accent)] [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(0,0,0,0.25)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col justify-center rounded-2xl bg-foreground p-8 text-white">
          <p className="text-xs uppercase tracking-[0.18em] text-white/50">
            Ce que ça vous coûte aujourd&apos;hui
          </p>
          <div className="mt-3 flex items-end gap-1">
            <span className="text-5xl font-semibold tracking-tight tabular-nums sm:text-6xl">
              {result.headlinePrefix}
              {euro(result.headline)}
            </span>
            <span className="mb-1.5 text-2xl font-medium text-white/80">
              {result.headlineSuffix}
            </span>
          </div>
          <p className="mt-2 max-w-xs text-sm text-white/70">
            {result.caption}
          </p>

          <div className="mt-7 space-y-3 border-t border-white/15 pt-6">
            {result.lines.map((line) => (
              <div
                key={line.label}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-white/60">{line.label}</span>
                <span className="font-semibold tabular-nums">{line.value}</span>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Récupérer cet argent
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <p className="border-t border-line px-6 py-4 text-center text-xs text-muted sm:px-10">
        Estimations indicatives basées sur des moyennes du marché — votre
        situation réelle est évaluée gratuitement lors de l&apos;audit.
      </p>
    </div>
  );
}
