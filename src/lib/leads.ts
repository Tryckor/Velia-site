/**
 * Lead handling — the "hidden" backend of the site.
 *
 * Dependency-free on purpose: it talks to Supabase (PostgREST) and Resend via
 * their plain HTTPS REST APIs using `fetch`. Nothing to `npm install`.
 *
 * Everything is gated on environment variables and NEVER throws — if a service
 * isn't configured (or fails), the lead is still accepted and logged so no
 * prospect is ever lost. Wire it up by setting the env vars (see .env.example).
 */

export type Lead = {
  name: string;
  /** email OU phone est requis — un lead artisan capture souvent juste le tél. */
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  /** where the lead came from: "contact" | "devis-bot" | ... */
  source?: string;
};

export type LeadResult = {
  ok: true;
  stored: boolean;
  emailed: boolean;
  notes: string[];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: unknown): { lead?: Lead; error?: string } {
  if (!input || typeof input !== "object") return { error: "Requête invalide." };
  const o = input as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(o.name);
  const email = str(o.email);
  const phone = str(o.phone);
  const message = str(o.message);

  if (!name || !message || (!email && !phone)) {
    return { error: "Merci de renseigner votre nom, un moyen de contact (email ou téléphone) et votre message." };
  }
  if (name.length > 120 || email.length > 160 || phone.length > 40 || message.length > 4000) {
    return { error: "Un des champs est trop long." };
  }
  if (email && !EMAIL_RE.test(email)) return { error: "Adresse email invalide." };

  return {
    lead: {
      name,
      email: email || undefined,
      message,
      phone: phone || undefined,
      company: str(o.company) || undefined,
      service: str(o.service) || undefined,
      source: str(o.source) || "contact",
    },
  };
}

/** Insert the lead into Supabase via PostgREST. No-op if not configured. */
async function storeInSupabase(lead: Lead): Promise<{ ok: boolean; note: string }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { ok: false, note: "Supabase non configuré (ignoré)." };

  try {
    const res = await fetch(`${url}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email ?? null,
        phone: lead.phone ?? null,
        company: lead.company ?? null,
        service: lead.service ?? null,
        message: lead.message,
        source: lead.source ?? "contact",
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return { ok: false, note: `Supabase a refusé (${res.status}): ${t.slice(0, 120)}` };
    }
    return { ok: true, note: "Enregistré dans Supabase." };
  } catch (e) {
    return { ok: false, note: `Supabase injoignable: ${(e as Error).message}` };
  }
}

/** Send a notification email via Resend. No-op if not configured. */
async function notifyByEmail(lead: Lead): Promise<{ ok: boolean; note: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL || "Velia <onboarding@resend.dev>";
  if (!apiKey || !to) return { ok: false, note: "Resend non configuré (ignoré)." };

  const lines = [
    `Nouveau lead — source : ${lead.source}`,
    "",
    `Nom : ${lead.name}`,
    `Email : ${lead.email}`,
    `Téléphone : ${lead.phone ?? "—"}`,
    `Entreprise : ${lead.company ?? "—"}`,
    `Service : ${lead.service ?? "—"}`,
    "",
    "Message :",
    lead.message,
  ];

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject: `Nouveau lead Velia — ${lead.name} (${lead.service ?? "sans précision"})`,
        text: lines.join("\n"),
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      return { ok: false, note: `Resend a refusé (${res.status}): ${t.slice(0, 120)}` };
    }
    return { ok: true, note: "Email de notification envoyé." };
  } catch (e) {
    return { ok: false, note: `Resend injoignable: ${(e as Error).message}` };
  }
}

/** Persist + notify. Always resolves; never throws. */
export async function handleLead(lead: Lead): Promise<LeadResult> {
  const [stored, emailed] = await Promise.all([
    storeInSupabase(lead),
    notifyByEmail(lead),
  ]);

  // Safety net: always log so a lead is never silently lost in dev.
  console.log("[velia] lead", {
    ...lead,
    _stored: stored.ok,
    _emailed: emailed.ok,
  });

  return {
    ok: true,
    stored: stored.ok,
    emailed: emailed.ok,
    notes: [stored.note, emailed.note],
  };
}
