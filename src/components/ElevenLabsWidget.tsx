"use client";

import React, { useEffect } from "react";

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
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.type = "text/javascript";
    document.body.appendChild(s);
  }, []);

  return React.createElement("elevenlabs-convai", { "agent-id": AGENT_ID });
}
