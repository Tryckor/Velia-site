"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArtisanConfig, DEFAULT_CONFIG, Trade, TRADE_META } from "@/lib/artisanConfig";

// Chatbot "devis instantané" scripté (sans IA/API = 100% fiable, instantané)
// pour artisans BTP : plomberie / électricité / climatisation / salle de bain.
// Entièrement PARAMÉTRABLE par artisan via `config` (métiers, taux horaire,
// prix) — voir src/lib/artisanConfig.ts. À caler avec le patron avant mise en ligne.

type Msg = { type: "bot" | "user" | "est"; html: string };
type Opt = {
  label: string;
  next?: string;
  set?: Record<string, number | string>;
  est?: { lbl: string; lo: number; hi: number };
  estCpl?: boolean;
  estPartial?: boolean;
};

/** Construit le scénario du chatbot à partir de la config de l'artisan. */
function buildFlow(cfg: ArtisanConfig): Record<string, { bot: string; options: Opt[] }> {
  const flow: Record<string, { bot: string; options: Opt[] }> = {};

  // Un métier n'est proposé que s'il a vraiment des prestations configurées.
  const hasContent = (m: Trade) => (m === "sdb" ? !!cfg.sdb?.surfaces.length : !!cfg[m]?.length);
  const metiers = cfg.metiers.filter(hasContent);

  // Accueil : un bouton par métier réellement exercé.
  flow.start = {
    bot: "Bonjour 👋 Je suis l’assistant devis. En 30 secondes, je vous donne une estimation. C’est pour quel projet ?",
    options: metiers.map((m) => ({
      label: `${TRADE_META[m].emoji} ${TRADE_META[m].label}`,
      next: m === "sdb" ? "sdb_surface" : m,
    })),
  };

  if (cfg.metiers.includes("sdb") && cfg.sdb) {
    flow.sdb_surface = {
      bot: "Super 🚿 Quelle surface environ ?",
      options: cfg.sdb.surfaces.map((s) => ({
        label: s.label,
        set: { lo: s.lo, hi: s.hi, lbl: s.lbl },
        next: "sdb_type",
      })),
    };
    flow.sdb_type = {
      bot: "Rénovation complète ou partielle ?",
      options: [
        { label: "Complète (tout refaire)", estCpl: true },
        { label: "Partielle", estPartial: true },
      ],
    };
  }

  const prestaStep = (m: Exclude<Trade, "sdb">, bot: string) => {
    const prestas = cfg[m];
    if (cfg.metiers.includes(m) && prestas?.length) {
      flow[m] = {
        bot,
        options: prestas.map((p) => ({ label: p.label, est: { lbl: p.lbl, lo: p.lo, hi: p.hi } })),
      };
    }
  };
  prestaStep("plomb", "🔧 Quel type d’intervention ?");
  prestaStep("elec", "⚡ Quel est votre besoin ?");
  prestaStep("clim", "❄️ Combien de pièces à climatiser ?");

  return flow;
}

const r100 = (n: number) => Math.round((n / 100)) * 100;
const fmt = (n: number) => n.toLocaleString("fr-FR");

export function QuoteBotArtisan({ config = DEFAULT_CONFIG }: { config?: ArtisanConfig }) {
  const FLOW = useMemo(() => buildFlow(config), [config]);
  const majCpl = config.sdb?.majorationComplete ?? 1.35;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [choices, setChoices] = useState<Opt[]>([]);
  const [mode, setMode] = useState<"choices" | "form" | "done">("choices");
  const ctx = useRef<Record<string, number | string>>({});
  const scroller = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [telErr, setTelErr] = useState(false);
  const [sending, setSending] = useState(false);

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
    ctx.current = { ...ctx.current, _lbl: lbl, _lo: lo, _hi: hi };
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
      showEstimate(`rénover ${c.lbl} (complète)`, r100(Number(c.lo) * majCpl), r100(Number(c.hi) * majCpl));
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

  async function submit() {
    if (!tel.trim()) {
      setTelErr(true);
      return;
    }
    if (sending) return;
    setSending(true);

    const c = ctx.current;
    const projet = String(c._lbl ?? "projet non précisé");
    const fourchette =
      c._lo != null && c._hi != null ? ` — estimation indicative ${fmt(Number(c._lo))} – ${fmt(Number(c._hi))} €` : "";

    push({ type: "user", html: `${name || "Client"} · ${tel}` });
    setMode("done");

    // Envoi réel du lead (best-effort, ne bloque jamais l'UX).
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || "Client",
          phone: tel.trim(),
          service: projet,
          source: "devis-bot",
          message: `Demande via l'assistant devis : ${projet}${fourchette}. À recontacter au ${tel.trim()}.`,
        }),
      });
    } catch {
      // Le visiteur voit quand même la confirmation ; le lead est aussi loggué côté serveur.
    } finally {
      setSending(false);
    }

    setTimeout(() => {
      push({ type: "bot", html: `Merci ${name || ""} ! 🛠️ <b>Votre artisan</b> vous recontacte très vite avec votre devis.` });
    }, 300);
  }

  function restart() {
    setMsgs([]);
    setChoices([]);
    setName("");
    setTel("");
    setTelErr(false);
    setSending(false);
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
          <div className="text-sm font-semibold">{config.nom ? `Assistant devis · ${config.nom}` : "Assistant devis"}</div>
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
              disabled={sending}
              className="rounded-xl bg-[#15171c] py-2.5 text-[14px] font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {sending ? "Envoi…" : "Recevoir mon devis →"}
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
        {config.metiers.map((m) => TRADE_META[m].label).join(" · ")}
      </div>
    </div>
  );
}
