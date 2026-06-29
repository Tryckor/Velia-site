"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ElevenLabs Conversational AI widget (voice agent).
 * Loads the official embed script once, then renders the <elevenlabs-convai>
 * custom element which the script upgrades into the floating voice launcher.
 * Floats bottom-right by default — the QuoteBot launcher is moved bottom-left
 * so the two don't overlap.
 */
const AGENT_ID = "agent_0601kt8mh9ydexsbw39kz44fn8qh";
const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

export function ElevenLabsWidget() {
  const pathname = usePathname();

  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
  }, []);

  // Pas de widget vocal dans les pages embarquées (iframe du chatbot artisan).
  if (pathname?.startsWith("/embed")) return null;

  // Only the agent-id — everything else (avatar, variant, colours, texts) is
  // controlled by the ElevenLabs dashboard so the site matches it exactly.
  return React.createElement("elevenlabs-convai", {
    "agent-id": AGENT_ID,
  });
}
