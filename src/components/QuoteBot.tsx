"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./Logo";

/* ----------------------------------------------------------------------------
 * QuoteBot — a live demo of the "Devis instantané par IA" service.
 * A scripted (no-API) conversational flow that qualifies a lead and generates
 * an instant price estimate from surface / rooms / project type, then captures
 * contact details. Mirrors exactly what a client would embed on their own site.
 *
 * Demo pricing is illustrative (renovation example) and easily swapped for a
 * real model later. Mount once; it renders a floating launcher + panel, and can
 * also be opened from anywhere via the `velia:open-quotebot` window event.
 * -------------------------------------------------------------------------- */

type Project = {
  label: string;
  /** [low, high] € per m², or null for a flat-rate (forfait) job */
  perM2: [number, number] | null;
  /** flat range used when perM2 is null */
  flat?: [number, number];
};

const PROJECTS: Project[] = [
  { label: "Rénovation complète", perM2: [450, 700] },
  { label: "Peinture / décoration", perM2: [25, 45] },
  { label: "Salle de bain", perM2: null, flat: [5000, 12000] },
  { label: "Cuisine", perM2: null, flat: [6000, 15000] },
  { label: "Autre projet", perM2: [200, 400] },
];

const SURFACES = [
  { label: "Moins de 30 m²", value: 25 },
  { label: "30 à 60 m²", value: 45 },
  { label: "60 à 100 m²", value: 80 },
  { label: "Plus de 100 m²", value: 130 },
];

const ROOMS = ["1", "2", "3", "4", "5 +"];

const DELAIS = ["Dès que possible", "Dans 1 à 3 mois", "Je me renseigne"];

type Phase = "projet" | "surface" | "pieces" | "delai" | "result" | "lead" | "done";

type Msg = { from: "bot" | "user"; text: string };

const fmt = (n: number) =>
  (Math.round(n / 100) * 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export function QuoteBot() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("projet");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [answers, setAnswers] = useState<{
    projet?: Project;
    surface?: number;
    pieces?: string;
    delai?: string;
  }>({});
  const [estimate, setEstimate] = useState<[number, number] | null>(null);
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "error">(
    "idle"
  );
  const [leadError, setLeadError] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // open from anywhere (hero / section buttons)
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("velia:open-quotebot", handler);
    return () => window.removeEventListener("velia:open-quotebot", handler);
  }, []);

  // initial greeting (once, even under StrictMode double-mount)
  useEffect(() => {
    if (!open || started.current) return;
    started.current = true;
    pushBot(
      "Bonjour 👋 Je suis l'assistant Velia. En 30 secondes, je vous prépare une estimation gratuite. Quel est votre projet ?"
    );
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing, phase]);

  useEffect(
    () => () => timers.current.forEach(clearTimeout),
    []
  );

  function pushBot(text: string, after = 600) {
    setTyping(true);
    const t = setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text }]);
      setTyping(false);
    }, after);
    timers.current.push(t);
  }

  function pushUser(text: string) {
    setMessages((m) => [...m, { from: "user", text }]);
  }

  function chooseProject(p: Project) {
    pushUser(p.label);
    setAnswers((a) => ({ ...a, projet: p }));
    setPhase("surface");
    pushBot("Parfait. Quelle surface concernée, environ ?");
  }

  function chooseSurface(s: { label: string; value: number }) {
    pushUser(s.label);
    setAnswers((a) => ({ ...a, surface: s.value }));
    setPhase("pieces");
    pushBot("Combien de pièces sont concernées ?");
  }

  function choosePieces(p: string) {
    pushUser(`${p} pièce${p === "1" ? "" : "s"}`);
    setAnswers((a) => ({ ...a, pieces: p }));
    setPhase("delai");
    pushBot("Et pour quand envisagez-vous les travaux ?");
  }

  function chooseDelai(d: string) {
    pushUser(d);
    const next = { ...answers, delai: d };
    setAnswers(next);
    const [lo, hi] = computeEstimate(next.projet!, next.surface!, next.pieces!);
    setEstimate([lo, hi]);
    setPhase("result");
    pushBot(
      `Merci ! D'après vos réponses, voici une première estimation pour votre projet.`,
      500
    );
    pushBot("__ESTIMATE__", 1300);
  }

  function startLead() {
    setPhase("lead");
    pushBot(
      "Pour recevoir un devis détaillé et gratuit (sans engagement), laissez-moi vos coordonnées 👇"
    );
  }

  async function submitLead(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLeadStatus("loading");
    setLeadError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const message = [
      `Devis instantané (démo)`,
      `Projet : ${answers.projet?.label}`,
      `Surface : ~${answers.surface} m²`,
      `Pièces : ${answers.pieces}`,
      `Délai : ${answers.delai}`,
      estimate ? `Estimation : ${fmt(estimate[0])} – ${fmt(estimate[1])} €` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: "Devis instantané par IA",
          message,
          source: "devis-bot",
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi.");
      pushUser(`${data.name} · ${data.email}`);
      setPhase("done");
      pushBot(
        "C'est noté ✅ Un expert Velia revient vers vous très vite avec votre devis détaillé. Excellente journée !"
      );
      setLeadStatus("idle");
    } catch (err) {
      setLeadStatus("error");
      setLeadError(err instanceof Error ? err.message : "Erreur.");
    }
  }

  function restart() {
    timers.current.forEach(clearTimeout);
    setMessages([]);
    setAnswers({});
    setEstimate(null);
    setPhase("projet");
    started.current = false;
    // re-trigger greeting
    setTimeout(() => {
      started.current = true;
      pushBot(
        "On recommence ! Quel est votre projet ?"
      );
    }, 50);
  }

  return (
    <>
      {/* No floating launcher — the devis demo is opened from the "Devis
          instantané par IA" service section via the velia:open-quotebot event. */}

      {/* Panel */}
      <div
        className={`fixed bottom-5 left-5 z-50 flex w-[calc(100vw-2.5rem)] max-w-[390px] origin-bottom-left flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] transition-all duration-300 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        }`}
        style={{ height: "min(620px, calc(100vh - 2.5rem))" }}
        role="dialog"
        aria-label="Assistant devis Velia"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
            <LogoMark className="h-4 w-4" />
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-tight">
              Assistant devis Velia
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              En ligne · répond en quelques secondes
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-[#f3f3f3] hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((m, i) =>
            m.text === "__ESTIMATE__" ? (
              <EstimateCard key={i} estimate={estimate} answers={answers} />
            ) : (
              <Bubble key={i} from={m.from}>
                {m.text}
              </Bubble>
            )
          )}
          {typing && <Typing />}
        </div>

        {/* Input zone */}
        <div className="border-t border-line bg-[#fafafa] px-4 py-3.5">
          {phase === "projet" && (
            <Chips items={PROJECTS.map((p) => p.label)} onPick={(_, i) => chooseProject(PROJECTS[i])} />
          )}
          {phase === "surface" && (
            <Chips items={SURFACES.map((s) => s.label)} onPick={(_, i) => chooseSurface(SURFACES[i])} />
          )}
          {phase === "pieces" && (
            <Chips items={ROOMS} onPick={(label) => choosePieces(label)} />
          )}
          {phase === "delai" && (
            <Chips items={DELAIS} onPick={(label) => chooseDelai(label)} />
          )}
          {phase === "result" && (
            <button
              onClick={startLead}
              className="w-full rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Recevoir mon devis détaillé →
            </button>
          )}
          {phase === "lead" && (
            <form onSubmit={submitLead} className="space-y-2">
              <input
                name="name"
                required
                placeholder="Votre nom"
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-foreground"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Votre email"
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-foreground"
              />
              <input
                name="phone"
                placeholder="Téléphone (optionnel)"
                className="w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-foreground"
              />
              {leadStatus === "error" && (
                <p className="text-xs text-red-600">{leadError}</p>
              )}
              <button
                type="submit"
                disabled={leadStatus === "loading"}
                className="w-full rounded-full bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {leadStatus === "loading" ? "Envoi…" : "Envoyer ma demande"}
              </button>
            </form>
          )}
          {phase === "done" && (
            <button
              onClick={restart}
              className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm font-medium transition-colors hover:border-foreground"
            >
              Simuler un autre devis
            </button>
          )}
          <p className="mt-2.5 text-center text-[11px] text-muted">
            Démo · estimation indicative générée par l&apos;IA
          </p>
        </div>
      </div>
    </>
  );
}

/* ----------------------------------------------------------------- pricing */
function computeEstimate(
  project: Project,
  surface: number,
  pieces: string
): [number, number] {
  const roomFactor = 1 + (Number(pieces.replace(" +", "")) - 1) * 0.04;
  if (project.perM2) {
    const [lo, hi] = project.perM2;
    return [lo * surface * roomFactor, hi * surface * roomFactor];
  }
  const [lo, hi] = project.flat ?? [4000, 9000];
  // scale flat jobs a bit by surface bracket
  const scale = surface <= 25 ? 0.85 : surface <= 45 ? 1 : surface <= 80 ? 1.2 : 1.45;
  return [lo * scale, hi * scale];
}

/* -------------------------------------------------------------- subviews */
function Bubble({ from, children }: { from: "bot" | "user"; children: React.ReactNode }) {
  const bot = from === "bot";
  return (
    <div className={`flex ${bot ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          bot
            ? "rounded-bl-sm bg-[#f3f3f3] text-foreground"
            : "rounded-br-sm bg-foreground text-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[#f3f3f3] px-4 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function Chips({
  items,
  onPick,
}: {
  items: string[];
  onPick: (label: string, index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((label, i) => (
        <button
          key={label}
          onClick={() => onPick(label, i)}
          className="rounded-full border border-line bg-white px-3.5 py-2 text-sm font-medium transition-colors hover:border-foreground hover:bg-foreground hover:text-white"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function EstimateCard({
  estimate,
  answers,
}: {
  estimate: [number, number] | null;
  answers: { projet?: Project; surface?: number; pieces?: string };
}) {
  if (!estimate) return null;
  return (
    <div className="rounded-2xl border border-transparent bg-accent p-4 text-white">
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/60">
        Votre estimation
      </p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight">
        {fmt(estimate[0])} – {fmt(estimate[1])} €
      </p>
      <div className="mt-3 space-y-1 border-t border-white/15 pt-3 text-xs text-white/70">
        <div className="flex justify-between gap-3">
          <span>Projet</span>
          <span className="text-white">{answers.projet?.label}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>Surface</span>
          <span className="text-white">~{answers.surface} m²</span>
        </div>
      </div>
    </div>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" strokeLinecap="round" />
    </svg>
  );
}
