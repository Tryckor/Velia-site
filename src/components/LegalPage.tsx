import Link from "next/link";
import { LogoMark } from "./Logo";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link href="/" aria-label="Velia — accueil" className="inline-flex items-center gap-2.5">
            <LogoMark className="h-5 w-5" />
            <span className="wordmark text-[15px] leading-none pl-[0.1em]">VELIA</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{title}</h1>
        {updated && (
          <p className="mt-3 text-sm text-muted">Dernière mise à jour : {updated}</p>
        )}
        <div className="legal-prose mt-10 space-y-6 text-[15px] leading-relaxed text-muted">
          {children}
        </div>
      </main>

      <footer className="border-t border-line px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
          <span>© 2026 Velia. Tous droits réservés.</span>
          <nav className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-foreground">
              Confidentialité
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
