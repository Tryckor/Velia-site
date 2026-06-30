# 🗂️ VELIA — État du projet (handoff complet)
### Lis CE fichier en premier pour reprendre. Reprenable depuis n'importe quel compte/machine. MàJ : 30/06/2026.

> Ce fichier vit DANS le repo → un simple `git clone` te rend le code ET tout le contexte.
> ⚠️ Les **contacts de prospection** (données personnelles de tiers) ne sont PAS dans le repo : ils sont en local (`~/Desktop/Velia-strategie/prospects-64.csv`).

---

## 1. Résumé express
**Velia** = micro-agence digitale. Produit phare = **chatbot de devis automatisé 24/7 pour artisans du bâtiment** (+ fiche Google, site, automatisations en upsell). Site vitrine en ligne et fonctionnel. 1er client visé = **EPCC** (artisan Lons 64). Phase actuelle : peaufiner le site + démarrer la prospection.

## 2. 🔑 Code / déploiement
- Repo : ce dépôt (**GitHub : Tryckor/Velia-site**), branche **`main`** = déployée.
- En ligne : **https://velia-digitalcom.vercel.app** (Vercel, rebuild auto au push).
- Repo local canonique : **`~/dev/velia-site`** (hors iCloud). ⚠️ NE PAS utiliser `~/Desktop/velia-site` (iCloud → tue git).
- Reprise : `git clone https://github.com/Tryckor/Velia-site.git ~/dev/velia-site && cd ~/dev/velia-site && npm install`. Build : `npm run build`. Déployer : `git push origin main`.
- Stack : Next.js 16 + Tailwind.

## 3. ✅ Construit et en ligne
- **Accueil** : hero cinématique BLANC (`HeroCinematic`, vidéo tunnel) + horloge en 2ᵉ section (`ClockSection`). ⚠️ PAS l'ancien hero noir `VideoHero`.
- **Services** : section home (cartes cliquables) → pages dédiées **`/services/[slug]`** (sites-web, visibilite-google, automatisations, reception-ia, email-pro) + **`/devis-artisans`** (chatbot). Contenu : `src/lib/serviceLandings.ts` + composant `ServiceLanding`. Chaque page = hero + stat sourcée animée + comment ça marche + bénéfices + inclus + CTA + réduction du risque.
- **Navbar** : menu déroulant Services (desktop + mobile) → les 6 pages.
- **« SEO » → « Visibilité locale Google »** partout (décision : on vend la fiche Google, pas le vrai SEO).
- **Chatbot** `QuoteBotArtisan` : paramétrable par artisan (`src/lib/artisanConfig.ts`), **multi-besoins** (cumul + total), **sous-questions de chiffrage** (réno élec au m², plomberie neuve par nb d'appareils). Lead → `/api/contact` (Supabase + Resend ; ⚠️ clés Resend pas encore sur Vercel → lead pas encore mailé).
- **Système multi-clients** : `src/lib/artisanConfigs.ts` → `/devis/[slug]`, `/embed/[slug]` (bot nu iframe), `public/embed.js` (bulle flottante à coller en 1 ligne).
- **Démo client EPCC** : `/clients/epcc` (vitrine portfolio à son nom + chatbot + bulle). Prix = fourchettes marché à caler.

## 4. 🎯 Décisions stratégiques
- **Positionnement** : accroche = le chatbot de devis ; le reste en upsell (spécialisation = mieux pour un débutant ; chatbots convertissent mieux que pages statiques — fait vérifié).
- **Prix** : pas de prix fixes sur le site (CTA « audit gratuit », prix en conversation).
- **Réduction du risque** : garantie / sans engagement / offre 1er client.
- **EN COURS** : diagnostic « cibler UN métier (plombier/élec/clim) vs large BTP » (recherche lancée — résultat à récupérer/relancer).

## 5. EPCC (1er client) — détails & contacts en local
- Artisan Lons (64), métiers élec/plomberie/clim. Démo : `/clients/epcc`.
- Contacts + offre + prix : docs locaux **`~/Desktop/EPCC-Velia/`** (proposition, trame d'appel, fiche audit prix, plan Google).
- Reste : caler ses vrais prix avec lui · brancher Resend · l'appeler.

## 6. 📁 Documents (en LOCAL, à copier si tu changes de machine)
- `~/Desktop/Velia-strategie/` : `00-REPRISE-handoff.md`, `01-site-conversion-et-positionnement.md`, `02-playbook-vente.md`, `03-liste-prospects-64.md`, **`prospects-64.csv`** (~28 prospects 64).
- `~/Desktop/EPCC-Velia/` : proposition, trame d'appel, fiche audit, plan Google, recherche chiffrage BTP.
- Mémoire IA (ce Mac/compte) : `~/.claude/projects/-Users-tao-Desktop/memory/`.

## 7. ▶️ Prochaines actions
1. Appeler les 2 meilleurs prospects (priorité 5) — coordonnées dans `prospects-64.csv` — avec le script de `02-playbook-vente.md`.
2. Pour un prospect chaud : créer sa démo `/clients/<nom>` (registre `src/lib/artisanConfigs.ts`).
3. Finir le **diagnostic métier** (quel corps de métier cibler).
4. EPCC : caler les prix + brancher la notif mail (clés `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` sur Vercel).

## 8. 🔁 Reprendre dans une nouvelle conversation
- **Même Mac/compte** : la mémoire IA se recharge seule → « on reprend Velia ».
- **Autre compte/machine** : `git clone` ce repo → ouvre **`docs/ETAT-DU-PROJET.md`** (ce fichier) → dis à l'IA « lis docs/ETAT-DU-PROJET.md, on reprend Velia ». Pour les contacts de prospection, ramène aussi le dossier local `~/Desktop/Velia-strategie/`.
