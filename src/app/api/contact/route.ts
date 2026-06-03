import { NextResponse } from "next/server";
import { handleLead, validateLead } from "@/lib/leads";

/** Best-effort in-memory rate limit (per warm serverless instance). */
const HITS = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 6;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = HITS.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    HITS.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  // crude IP for rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Merci de réessayer dans une minute." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. If filled, pretend success and drop.
  const hp = (body as Record<string, unknown>)?.website;
  if (typeof hp === "string" && hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const { lead, error } = validateLead(body);
  if (error || !lead) {
    return NextResponse.json({ error: error ?? "Requête invalide." }, { status: 400 });
  }

  await handleLead(lead);

  // We always return ok to the visitor — the safety-net log guarantees no loss.
  return NextResponse.json({ ok: true });
}
