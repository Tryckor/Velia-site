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
    <section className="px-6 py-10">
      <Reveal className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white px-6 py-9 text-center">
            <div className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
              {stat.value}
            </div>
            <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-snug text-muted">
              {stat.label}
            </p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
