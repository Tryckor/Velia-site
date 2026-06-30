"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";

const WORDS = [
  "site web",
  "automatisation",
  "agent IA",
  "visibilité Google",
  "chatbot",
  "boîte mail pro",
];

/**
 * Kinetic-typography services line. One headline, one rotating word — describes
 * everything Velia sells in a single uncluttered statement (research: rotating
 * headlines deliver several messages in the same space; sliders don't convert).
 * Respects prefers-reduced-motion (falls back to a static list).
 */
export function ServicesKinetic() {
  const [reduced, setReduced] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setReduced(true);
      return;
    }
    const t = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2100);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="px-6 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Ce que Velia fait pour vous
        </p>

        {reduced ? (
          <h2 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
            Votre site web, automatisation, agent IA, visibilité Google,
            chatbot ou boîte mail pro —{" "}
            <span className="gradient-text">clé en main</span>.
          </h2>
        ) : (
          <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
            Votre{" "}
            <span
              key={i}
              className="word-swap gradient-text inline-block"
            >
              {WORDS[i]}
            </span>
            ,<br className="hidden sm:block" /> clé en main.
          </h2>
        )}

        <p className="mx-auto mt-6 max-w-xl text-pretty text-muted sm:text-lg">
          Un seul partenaire pour tout votre digital — du site à l&apos;IA, on
          conçoit, on connecte et on automatise.
        </p>

        <a
          href="#services"
          className="btn-gradient mt-9 inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium transition-transform hover:scale-[1.02]"
        >
          Voir tous nos services
          <span aria-hidden>→</span>
        </a>
      </Reveal>
    </section>
  );
}
