-- Velia — table des leads (demandes de contact + devis instantané)
-- À exécuter dans Supabase : SQL Editor → coller → Run.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text,
  company     text,
  service     text,
  message     text not null,
  source      text not null default 'contact'
);

-- Index pour trier/filtrer rapidement
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_source_idx on public.leads (source);

-- Sécurité : on active RLS et on ne crée AUCUNE policy publique.
-- => seul l'accès via la clé "service_role" (côté serveur uniquement) peut
--    insérer/lire. Le site web utilise cette clé dans une route serveur.
alter table public.leads enable row level security;

-- (Optionnel) Empêcher toute lecture publique reste garanti par l'absence de policy.
-- Pour consulter les leads : Supabase → Table editor → leads, ou via le service_role.
