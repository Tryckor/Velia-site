import { Counter } from "./Counter";
import { Reveal } from "./Reveal";

const STATS = [
  {
    value: <Counter to={6} />,
    label: "expertises réunies sous un même toit",
  },
  {
    value: "24/7",
    label: "votre IA ne dort jamais, ne rate aucun appel",
  },
  {
    value: <Counter to={100} suffix=" %" />,
    label: "sur mesure — jamais un template",
  },
  {
    value: <Counter to={24} suffix=" h" />,
    label: "délai de réponse maximum à votre demande",
  },
];

export function StatsBand() {
  return (
    <section className="px-6 py-14">
      <Reveal className="surface-dark relative mx-auto max-w-6xl overflow-hidden rounded-[28px] px-8 py-14 text-white">
        {/* living gradient blobs for depth & colour */}
        <div
          aria-hidden
          className="blob blob-a left-[12%] top-[-40%] h-72 w-72"
        />
        <div
          aria-hidden
          className="blob blob-b blob-2 right-[10%] bottom-[-45%] h-80 w-80"
        />
        <p className="relative mb-10 text-center text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          Velia en chiffres
        </p>
        <div className="relative grid gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center ${
                i < 3 ? "lg:border-r lg:border-white/10" : ""
              }`}
            >
              <div className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {stat.value}
              </div>
              <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-snug text-white/55">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
