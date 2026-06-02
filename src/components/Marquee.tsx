const ITEMS = [
  "Sites web",
  "Automatisations",
  "SEO",
  "Agents IA",
  "Réceptionniste IA",
  "Chatbots",
  "Hébergement mail",
  "Applications",
  "Intégrations",
];

function Row() {
  return (
    <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
      {ITEMS.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 whitespace-nowrap text-2xl font-medium text-muted/70 sm:text-3xl"
        >
          {item}
          <span aria-hidden className="text-foreground/30">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee-mask flex select-none overflow-hidden py-2">
      <Row />
      <Row />
    </div>
  );
}
