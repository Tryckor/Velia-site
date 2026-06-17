"use client";

import { useEffect, useRef, useState } from "react";

// Vitesse de lecture du fond vidéo (1 = normal). Plus bas = aiguille plus lente.
const PLAYBACK_RATE = 0.08;
// Durée d'affichage de chaque slide avant rotation auto (ms).
const DURATION = 10000;

const BLUE_GRADIENT = "linear-gradient(135deg, #0f255f 0%, #2b6bff 52%, #6aa0ff 100%)";
const VIOLET_GRADIENT = "linear-gradient(135deg, #271360 0%, #7c5cff 52%, #a98bff 100%)";

// 3 panneaux : horloge (sombre) → présence en ligne (bleu) → automatisation/IA (violet)
const COUNT = 3;

// Onglets de la navbar (1 par panneau)
const NAV = [
  { label: "Accueil", color: "#0a0a0a" },
  { label: "Présence en ligne", color: "#2b6bff" },
  { label: "Automatisation & IA", color: "#7c5cff" },
] as const;

// Style d'apparition en cascade (seulement quand le panneau est actif)
function rise(isActive: boolean, delay: number): React.CSSProperties | undefined {
  return isActive ? { animation: `trinity-rise 0.7s ${delay}s both` } : undefined;
}

export function HeroTrinity() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = PLAYBACK_RATE;
  }, []);

  // Rotation automatique toutes les DURATION ms (en pause au survol).
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % COUNT), DURATION);
    return () => clearTimeout(t);
  }, [active, paused]);

  const step = 100 / COUNT;

  return (
    <section
      className="relative h-[100svh] overflow-hidden bg-[#070707]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      <style>{`
        @keyframes trinity-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes trinity-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes trinity-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes trinity-bar { from { transform: scaleY(0.12); } to { transform: scaleY(1); } }
        @keyframes trinity-blink { 0%,80%,100% { opacity: .25; } 40% { opacity: 1; } }
      `}</style>

      {/* Piste : 3 panneaux qui glissent ensemble */}
      <div
        className="flex h-full"
        style={{
          width: `${COUNT * 100}%`,
          transform: `translateX(-${active * step}%)`,
          transition: "transform 950ms cubic-bezier(0.65,0,0.35,1)",
        }}
      >
        {/* ───────────────── Slide 1 — l'horloge (design d'origine + aperçus) ───────────────── */}
        <div
          className="relative flex h-full flex-col justify-center overflow-hidden px-6"
          style={{ width: `${step}%` }}
        >
          <video
            ref={videoRef}
            className="clock-zoom absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = PLAYBACK_RATE;
            }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>

          <div aria-hidden className="absolute inset-0 bg-black/50" />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,7,7,0.75) 0%, rgba(7,7,7,0.25) 35%, rgba(7,7,7,0.55) 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              background:
                "radial-gradient(ellipse 50% 24% at 50% 93%, #ffffff 0%, #ffffff 14%, rgba(255,255,255,0.74) 34%, rgba(255,255,255,0.44) 54%, rgba(255,255,255,0.18) 74%, transparent 92%)",
              filter: "blur(10px)",
              WebkitFilter: "blur(10px)",
            }}
          />

          <p className="absolute left-1/2 top-[104px] z-10 w-full -translate-x-1/2 px-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-[13px] sm:tracking-[0.2em]">
            <span className="gradient-text">
              Sites web · Automatisations · Agents IA · SEO · Chatbots
            </span>
          </p>

          <div className="relative z-10 mx-auto max-w-5xl text-center text-white">
            <h1 className="text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">
              Pendant que vous hésitez,
              <br />
              vos concurrents répondent déjà.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-white/75">
              Velia conçoit votre site, automatise votre quotidien et déploie
              des agents IA qui répondent à chaque client — jour et nuit.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-gradient group w-full rounded-full px-7 py-3.5 font-medium shadow-[0_20px_55px_-14px_var(--accent-2)] transition-transform hover:scale-[1.02] sm:w-auto"
              >
                <span className="inline-flex items-center gap-2">
                  Réserver mon audit gratuit
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
              <a
                href="#decouvrir"
                className="w-full rounded-full border border-white/30 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/70 sm:w-auto"
              >
                Découvrir nos services
              </a>
            </div>
          </div>

          {/* Aperçus des panneaux voisins, centrés verticalement sur les bords */}
          {/* Droite → panneau bleu (présence en ligne) */}
          <PeekTab
            side="right"
            onClick={() => setActive(1)}
            gradient={BLUE_GRADIENT}
            glow="rgba(106,160,255,0.55)"
            label="Présence en ligne"
          />
          {/* Gauche → panneau violet (automatisation / IA) */}
          <PeekTab
            side="left"
            onClick={() => setActive(2)}
            gradient={VIOLET_GRADIENT}
            glow="rgba(169,139,255,0.55)"
            label="Automatisation & IA"
          />
        </div>

        {/* ───────────────── Slide 2 — Présence en ligne (bleu) ───────────────── */}
        <ColoredSlide
          step={step}
          gradient={BLUE_GRADIENT}
          glow="rgba(106,160,255,0.5)"
          isActive={active === 1}
          eyebrow="Présence en ligne"
          title={"Un site qui travaille\npour vous, 24 h/24."}
          text="Des sites rapides et élégants, pensés pour convertir vos visiteurs en clients — avec un SEO qui vous fait remonter sur Google."
          chips={["Sites web", "SEO", "Référencement local"]}
          visual={<BrowserMockup />}
        />

        {/* ───────────────── Slide 3 — Automatisation & IA (violet) ───────────────── */}
        <ColoredSlide
          step={step}
          gradient={VIOLET_GRADIENT}
          glow="rgba(169,139,255,0.5)"
          isActive={active === 2}
          eyebrow="Automatisation & IA"
          title={"Vos tâches répétitives,\ngérées sans vous."}
          text="Agents IA et chatbots qui répondent à chaque client, prennent les rendez-vous et génèrent vos devis — jour et nuit, sans vous."
          chips={["Automatisations", "Agents IA", "Chatbots"]}
          visual={<ChatMockup />}
        />
      </div>

      {/* ───────── Navbar de navigation (cliquable depuis n'importe quel panneau) ───────── */}
      <nav
        aria-label="Navigation des panneaux"
        className="pointer-events-auto absolute bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/20 bg-black/35 p-1.5 backdrop-blur-md"
      >
        {NAV.map((item, i) => {
          const isActive = i === active;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(i)}
              aria-current={isActive}
              className={`relative overflow-hidden rounded-full px-3.5 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm ${
                isActive ? "text-[#0a0a0a]" : "text-white/75 hover:text-white"
              }`}
            >
              {/* Pastille blanche de l'onglet actif */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-white" />
              )}
              {/* Barre de progression 10 s par-dessus la pastille */}
              {isActive && (
                <span
                  aria-hidden
                  key={`${active}-${paused}`}
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left"
                  style={{
                    background: item.color,
                    animation: `trinity-progress ${DURATION}ms linear forwards`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
              <span className="relative inline-flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: isActive ? item.color : "rgba(255,255,255,0.5)" }}
                />
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </section>
  );
}

/* ============================ Onglet de bord (aperçu élégant) ============================ */
function PeekTab({
  side,
  onClick,
  gradient,
  glow,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  gradient: string;
  glow: string;
  label: string;
}) {
  const isRight = side === "right";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Voir : ${label}`}
      className={`group absolute top-1/2 z-20 hidden -translate-y-1/2 md:flex ${
        isRight ? "right-0" : "left-0"
      }`}
    >
      <div
        className={`flex flex-col items-center gap-3 border border-white/20 px-3 py-6 text-white backdrop-blur-md transition-transform duration-500 ${
          isRight
            ? "rounded-l-2xl group-hover:-translate-x-1"
            : "rounded-r-2xl group-hover:translate-x-1"
        }`}
        style={{ background: gradient, boxShadow: `0 24px 70px -22px ${glow}` }}
      >
        {/* Libellé vertical, jamais coupé */}
        <span
          className="text-[12px] font-medium uppercase tracking-[0.22em] text-white/90"
          style={{
            writingMode: "vertical-rl",
            transform: isRight ? "none" : "rotate(180deg)",
          }}
        >
          {label}
        </span>
        {/* Flèche dans un disque */}
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/20 text-sm transition-transform group-hover:scale-110">
          {isRight ? "→" : "←"}
        </span>
      </div>
    </button>
  );
}

/* ============================ Panneau coloré générique ============================ */
function ColoredSlide({
  step,
  gradient,
  glow,
  isActive,
  eyebrow,
  title,
  text,
  chips,
  visual,
}: {
  step: number;
  gradient: string;
  glow: string;
  isActive: boolean;
  eyebrow: string;
  title: string;
  text: string;
  chips: string[];
  visual: React.ReactNode;
}) {
  return (
    <div
      className="relative flex h-full items-center overflow-hidden px-6 py-24 sm:px-10"
      style={{ width: `${step}%`, background: gradient }}
    >
      {/* Fond à petits carrés (grille fondue) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 35%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 45%, #000 35%, transparent 82%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 55% 60% at 70% 40%, ${glow} 0%, transparent 70%)` }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Texte */}
        <div className="text-center text-white lg:text-left">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-[13px]"
            style={rise(isActive, 0.05)}
          >
            {eyebrow}
          </p>
          <h1
            className="mt-5 whitespace-pre-line text-balance text-4xl font-medium leading-[1.06] tracking-tight sm:text-5xl lg:text-[3.4rem]"
            style={rise(isActive, 0.13)}
          >
            {title}
          </h1>
          <p
            className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/85 lg:mx-0"
            style={rise(isActive, 0.22)}
          >
            {text}
          </p>
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start"
            style={rise(isActive, 0.3)}
          >
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
          <div
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            style={rise(isActive, 0.38)}
          >
            <a
              href="#contact"
              className="group w-full rounded-full bg-white px-7 py-3.5 font-medium text-[#0a0a0a] shadow-[0_20px_55px_-18px_rgba(0,0,0,0.6)] transition-transform hover:scale-[1.02] sm:w-auto"
            >
              <span className="inline-flex items-center gap-2">
                Réserver mon audit gratuit
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </a>
            <a
              href="#decouvrir"
              className="w-full rounded-full border border-white/40 bg-white/5 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-white/80 sm:w-auto"
            >
              Découvrir nos services
            </a>
          </div>
        </div>

        {/* Visuel (maquette) */}
        <div
          className="hidden justify-center lg:flex"
          style={isActive ? { animation: "trinity-rise 0.8s 0.25s both" } : undefined}
        >
          <div style={{ animation: "trinity-float 6s ease-in-out infinite" }}>{visual}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================ Maquette navigateur (bleu) ============================ */
function BrowserMockup() {
  const bars = [38, 52, 46, 70, 88, 100];
  return (
    <div className="w-[420px] max-w-full overflow-hidden rounded-2xl border border-white/20 bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]">
      {/* Barre du navigateur */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-[#f4f6fa] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 rounded-md bg-white px-3 py-1 text-xs text-black/45">
          velia-digital.com
        </span>
      </div>
      {/* Corps du site */}
      <div className="space-y-4 p-5 text-[#0a0a0a]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">VELIA</span>
          <div className="flex gap-3 text-[10px] text-black/40">
            <span>Services</span>
            <span>Méthode</span>
            <span>Contact</span>
          </div>
        </div>
        <div>
          <div className="text-base font-semibold leading-tight">
            Des sites qui convertissent.
          </div>
          <div className="mt-1 text-[11px] text-black/50">
            Rapides, élégants, optimisés pour Google.
          </div>
        </div>
        {/* Tableau de bord : graphe + stat */}
        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-3 rounded-xl bg-[#f4f6fa] p-3">
            <div className="mb-2 text-[9px] font-medium uppercase tracking-wide text-black/40">
              Demandes / mois
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 origin-bottom rounded-t-sm"
                  style={{
                    height: `${h}%`,
                    background: "linear-gradient(180deg,#2b6bff,#6aa0ff)",
                    animation: `trinity-bar 0.7s ${0.3 + i * 0.08}s ease-out both`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-center rounded-xl bg-[#0f255f] p-3 text-white">
            <div className="text-2xl font-semibold leading-none">+128%</div>
            <div className="mt-1 text-[10px] text-white/70">de demandes de devis</div>
          </div>
        </div>
        {/* Tuiles services */}
        <div className="grid grid-cols-3 gap-2">
          {["Site web", "SEO", "Réservation"].map((t) => (
            <div
              key={t}
              className="rounded-lg border border-black/5 bg-[#f4f6fa] px-2 py-2 text-center text-[10px] font-medium text-black/60"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ Maquette chat IA (violet) ============================ */
function ChatMockup() {
  return (
    <div className="w-[360px] max-w-full overflow-hidden rounded-[26px] border border-white/20 bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]">
      {/* En-tête */}
      <div className="flex items-center gap-3 bg-[#271360] px-5 py-4 text-white">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sm font-semibold">
          V
        </span>
        <div className="flex-1">
          <div className="text-sm font-semibold">Assistant Velia</div>
          <div className="flex items-center gap-1.5 text-[11px] text-white/70">
            <span className="h-2 w-2 rounded-full bg-[#28c840]" /> en ligne · répond en 2 s
          </div>
        </div>
      </div>
      {/* Conversation */}
      <div className="space-y-3 bg-[#f6f4fc] p-4">
        <div className="flex justify-start">
          <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[13px] text-[#0a0a0a] shadow-sm">
            Bonjour, je voudrais un devis pour rénover une salle de bain de 6 m².
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className="max-w-[82%] rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-[13px] text-white shadow-sm"
            style={{ background: "linear-gradient(135deg,#7c5cff,#a98bff)" }}
          >
            Avec plaisir ! Pour 6 m², comptez environ <b>4 200 €</b>. Je vous envoie le
            devis détaillé par email 📄
          </div>
        </div>
        <div className="flex justify-end">
          <div
            className="rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm"
            style={{ background: "linear-gradient(135deg,#7c5cff,#a98bff)" }}
          >
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-white"
                  style={{ animation: `trinity-blink 1.2s ${i * 0.2}s infinite` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Pied : badge */}
      <div className="flex items-center justify-center gap-2 border-t border-black/5 bg-white px-4 py-3 text-[11px] font-medium text-black/55">
        <span className="h-2 w-2 rounded-full bg-[#7c5cff]" />
        Devis capturé · client recontacté 24 h/24
      </div>
    </div>
  );
}
