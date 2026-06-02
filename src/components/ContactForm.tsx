"use client";

import { useState } from "react";

const SERVICES = [
  "Site web",
  "Automatisation",
  "SEO",
  "Agent IA / Réceptionniste",
  "Chatbot",
  "Hébergement mail",
  "Autre / je ne sais pas encore",
];

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Une erreur est survenue.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-line bg-white p-10 text-center">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-medium">Message bien reçu.</h3>
        <p className="mt-2 max-w-sm text-muted">
          Merci pour votre confiance. Je reviens vers vous sous 24&nbsp;h ouvrées
          pour échanger sur votre projet.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-muted underline underline-offset-4 hover:text-foreground"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" name="name" required placeholder="Jean Dupont" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          placeholder="jean@entreprise.fr"
        />
        <Field label="Entreprise" name="company" placeholder="Nom de l'entreprise" />
        <Field label="Téléphone" name="phone" placeholder="06 12 34 56 78" />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm text-muted" htmlFor="service">
          Quel besoin&nbsp;?
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-foreground outline-none transition-colors focus:border-foreground"
        >
          <option value="" disabled>
            Sélectionnez un service…
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm text-muted" htmlFor="message">
          Votre projet
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Parlez-moi de votre activité et de ce que vous aimeriez accomplir…"
          className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-foreground"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3.5 font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
      >
        {status === "loading" ? "Envoi…" : "Envoyer ma demande"}
      </button>
      <p className="mt-3 text-center text-xs text-muted">
        Réponse sous 24&nbsp;h ouvrées · Aucun engagement
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-muted" htmlFor={name}>
        {label}
        {required && <span className="text-foreground"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-white px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-foreground"
      />
    </div>
  );
}
