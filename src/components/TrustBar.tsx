import { Reveal } from "./Reveal";

const ITEMS = [
  "Audit gratuit",
  "Sans engagement",
  "Réponse sous 24 h",
  "100 % sur-mesure",
  "Conforme RGPD",
];

/**
 * Slim reassurance strip placed right under the hero — a credibility transfer
 * moment next to the primary CTA. Research: trust signals near the CTA lift
 * conversion, especially for a young brand without client logos yet.
 */
export function TrustBar() {
  return (
    <section className="border-b border-line bg-white px-6 py-5">
      <Reveal className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {ITEMS.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground/80"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {item}
          </span>
        ))}
      </Reveal>
    </section>
  );
}
