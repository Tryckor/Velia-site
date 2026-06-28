"use client";

import { useEffect, useRef, useState } from "react";

// Chatbot "devis instantané" scripté (sans IA/API = 100% fiable, instantané)
// pour artisans BTP : plomberie / électricité / climatisation / salle de bain.
// Démo opérationnelle, intégrable ensuite sur le site d'un artisan.

type Msg = { type: "bot" | "user" | "est"; html: string };
type Opt = {
  label: string;
  next?: string;
  set?: Record<string, number | string>;
  est?: { lbl: string; lo: number; hi: number };
  estCpl?: boolean;
  estPartial?: boolean;
};

const FLOW: Record<string, { bot: string; options: Opt[] }> = {
  start: {
    bot: "Bonjour 👋 Je suis l’assistant devis. En 30 secondes, je vous donne une estimation. C’est pour quel projet ?",
    options: [
      { label: "🚿 Salle de bain", next: "sdb_surface" },
      { label: "🔧 Plomberie", next: "plomb" },
      { label: "⚡ Électricité", next: "elec" },
      { label: "❄️ Climatisation", next: "clim" },
    ],
  },
  sdb_surface: {
    bot: "Super 🚿 Quelle surface environ ?",
    options: [
      { label: "Moins de 4 m²", set: { lo: 3000, hi: 5500, lbl: "une petite salle de bain" }, next: "sdb_type" },
      { label: "4 à 6 m²", set: { lo: 4500, hi: 8500, lbl: "une salle de bain de 4-6 m²" }, next: "sdb_type" },
      { label: "6 à 10 m²", set: { lo: 6500, hi: 12000, lbl: "une salle de bain de 6-10 m²" }, next: "sdb_type" },
      { label: "Plus de 10 m²", set: { lo: 9000, hi: 16000, lbl: "une grande salle de bain" }, next: "sdb_type" },
    ],
  },
  sdb_type: {
    bot: "Rénovation complète ou partielle ?",
    options: [
      { label: "Complète (tout refaire)", estCpl: true },
      { label: "Partielle", estPartial: true },
    ],
  },
  plomb: {
    bot: "🔧 Quel type d’intervention ?",
    options: [
      { label: "Fuite / dépannage", est: { lbl: "un dépannage plomberie", lo: 90, hi: 300 } },
      { label: "Remplacement chauffe-eau", est: { lbl: "un remplacement de chauffe-eau", lo: 600, hi: 1500 } },
      { label: "Installation neuve", est: { lbl: "une installation plomberie neuve", lo: 1500, hi: 5000 } },
      { label: "Autre / je ne sais pas", est: { lbl: "votre projet plomberie", lo: 150, hi: 1200 } },
    ],
  },
  elec: {
    bot: "⚡ Quel est votre besoin ?",
    options: [
      { label: "Mise aux normes (tableau)", est: { lbl: "une mise aux normes du tableau", lo: 1000, hi: 2500 } },
      { label: "Rénovation élec complète", est: { lbl: "une rénovation électrique complète", lo: 3000, hi: 10000 } },
      { label: "Borne de recharge", est: { lbl: "une borne de recharge", lo: 1200, hi: 1800 } },
      { label: "Domotique", est: { lbl: "une installation domotique", lo: 1500, hi: 6000 } },
      { label: "Dépannage", est: { lbl: "un dépannage électrique", lo: 90, hi: 300 } },
    ],
  },
  clim: {
    bot: "❄️ Combien de pièces à climatiser ?",
    options: [
      { label: "1 pièce", est: { lbl: "une clim 1 pièce (mono-split)", lo: 1500, hi: 3000 } },
      { label: "2 à 3 pièces", est: { lbl: "une clim 2-3 pièces (multi-split)", lo: 3000, hi: 6000 } },
      { label: "4 pièces ou plus", est: { lbl: "une clim 4 pièces et +", lo: 6000, hi: 10000 } },
    ],
  },
};

const r100 = (n: number) => Math.round((n / 100)) * 100;
const fmt = (n: number) => n.toLocaleString("fr-FR");

export function QuoteBotArtisan() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [choices, setChoices] = useState<Opt[]>([]);
  const [mode, setMode] = useState<"choices" | "form" | "done">("choices");
  const ctx = useRef<Record<string, number | string>>({});
  const scroller = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [telErr, setTelErr] = useState(false);

  const push = (m: Msg) => setMsgs((x) => [...x, m]);

  useEffect(() => {
    const t = setTimeout(() => goStep("start"), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, choices, mode]);

  function goStep(key: string) {
    const step = FLOW[key];
    push({ type: "bot", html: step.bot });
    setTimeout(() => setChoices(step.options), 380);
  }

  function showEstimate(lbl: string, lo: number, hi: number) {
    push({
      type: "est",
      html: `Pour <strong>${lbl}</strong>, comptez environ<br><b>${fmt(lo)} – ${fmt(hi)} €</b><div class="mt-1.5 text-[12px] opacity-90">Estimation indicative — le devis précis et gratuit se fait sur place.</div>`,
    });
    setTimeout(() => {
      push({ type: "bot", html: "Souhaitez-vous être <b>recontacté gratuitement</b> pour un devis précis ? Laissez vos coordonnées 👇" });
      setTimeout(() => setMode("form"), 350);
    }, 480);
  }

  function pick(opt: Opt) {
    push({ type: "user", html: opt.label });
    setChoices([]);
    if (opt.set) ctx.current = { ...ctx.current, ...opt.set };
    if (opt.estCpl) {
      const c = ctx.current;
      showEstimate(`rénover ${c.lbl} (complète)`, r100(Number(c.lo) * 1.35), r100(Number(c.hi) * 1.35));
      return;
    }
    if (opt.estPartial) {
      const c = ctx.current;
      showEstimate(`rénover ${c.lbl} (partielle)`, Number(c.lo), Number(c.hi));
      return;
    }
    if (opt.est) {
      showEstimate(opt.est.lbl, opt.est.lo, opt.est.hi);
      return;
    }
    if (opt.next) setTimeout(() => goStep(opt.next!), 250);
  }

  function submit() {
    if (!tel.trim()) {
      setTelErr(true);
      return;
    }
    push({ type: "user", html: `${name || "Client"} · ${tel}` });
    setMode("done");
    setTimeout(() => {
      push({ type: "bot", html: `Merci ${name || ""} ! 🛠️ <b>Votre artisan</b> vous recontacte très vite avec votre devis.` });
    }, 300);
  }

  function restart() {
    setMsgs([]);
    setChoices([]);
    setName("");
    setTel("");
    ctx.current = {};
    setMode("choices");
    setTimeout(() => goStep("start"), 200);
  }

  return (
    <div className="mx-auto w-full max-w-[440px] overflow-hidden rounded-[22px] border border-black/[0.08] bg-white shadow-[0_40px_90px_-40px_rgba(20,20,60,0.45)]">
      {/* En-tête */}
      <div className="flex items-center gap-3 bg-[#15171c] px-4 py-3.5 text-white">
        <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-semibold text-[#15171c]" style={{ background: "linear-gradient(135deg,#2b6bff,#7c5cff)" }}>
          V
        </span>
        <div className="flex-1">
          <div className="text-sm font-semibold">Assistant devis</div>
          <div className="flex items-center gap-1.5 text-[12px] text-white/70">
            <span className="h-2 w-2 rounded-full bg-[#28c840]" /> En ligne · répond en 30 s
          </div>
        </div>
      </div>

      {/* Conversation */}
      <div ref={scroller} className="flex max-h-[420px] flex-col gap-2.5 overflow-y-auto bg-[#f7f8fa] p-4">
        {msgs.map((m, i) => {
          if (m.type === "user")
            return (
              <div key={i} className="max-w-[82%] self-end rounded-2xl rounded-tr-md bg-[#15171c] px-3.5 py-2.5 text-[14px] leading-snug text-white">
                <span dangerouslySetInnerHTML={{ __html: m.html }} />
              </div>
            );
          if (m.type === "est")
            return (
              <div key={i} className="max-w-[90%] self-start rounded-2xl rounded-tl-md px-4 py-3.5 text-[14px] leading-snug text-white" style={{ background: "linear-gradient(135deg,#2b6bff,#7c5cff)" }}>
                <span dangerouslySetInnerHTML={{ __html: m.html }} />
              </div>
            );
          return (
            <div key={i} className="max-w-[82%] self-start rounded-2xl rounded-tl-md border border-black/[0.06] bg-white px-3.5 py-2.5 text-[14px] leading-snug text-[#0a0a0a]">
              <span dangerouslySetInnerHTML={{ __html: m.html }} />
            </div>
          );
        })}

        {/* Choix */}
        {mode === "choices" && choices.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-2">
            {choices.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => pick(o)}
                className="rounded-full border border-accent bg-white px-3.5 py-2 text-[13px] font-medium text-accent transition-colors hover:bg-accent/10"
              >
                {o.label}
              </button>
            ))}
          </div>
        )}

        {/* Formulaire de contact */}
        {mode === "form" && (
          <div className="mt-1 flex flex-col gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre prénom"
              className="rounded-xl border border-black/10 bg-white px-3 py-2.5 text-[14px] outline-none focus:border-accent"
            />
            <input
              value={tel}
              onChange={(e) => {
                setTel(e.target.value);
                setTelErr(false);
              }}
              placeholder="Téléphone"
              className={`rounded-xl border bg-white px-3 py-2.5 text-[14px] outline-none focus:border-accent ${telErr ? "border-[#e24b4a]" : "border-black/10"}`}
            />
            <button
              type="button"
              onClick={submit}
              className="rounded-xl bg-[#15171c] py-2.5 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Recevoir mon devis →
            </button>
          </div>
        )}

        {/* Rejouer */}
        {mode === "done" && (
          <button type="button" onClick={restart} className="mt-1 self-start text-[12px] text-accent underline">
            ↻ Refaire une simulation
          </button>
        )}
      </div>

      <div className="bg-white py-2 text-center text-[11px] text-[#9aa0a8]">
        Plomberie · Électricité · Climatisation · Salle de bain
      </div>
    </div>
  );
}
