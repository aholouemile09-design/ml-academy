# Journal de travail — CodeGraft Academy

Repo GitHub : https://github.com/aholouemile09-design/ml-academy
Déployé sur Vercel sous le domaine : `codegraft.vercel.app`
Stack : Next.js 14 (App Router), React 18, Tailwind CSS

## Contexte

Site créé via Cowork (Claude), pas de code source local au départ — analysé et corrigé
directement depuis une copie clonée du repo GitHub, puis les changements ont été
recopiés dans le dossier de travail local (`codegraft/ml-academy`).

## État actuel (dernier commit poussé : `a960a01`)

Tous les changements ci-dessous sont **déjà commités et pushés sur `main`**. Pour
continuer à la maison : `git pull` dans ce dossier, puis `npm install`.

### 1. Audit de sécurité (terminé)

Findings classés par gravité — voir détail dans l'historique de conversation si besoin,
résumé des correctifs appliqués :

- **Critique** — `next@14.2.5` avait une faille d'autorisation/cache (CVE). Mis à jour
  vers `14.2.35` (dernière version patch de la branche 14.x). *Un passage à Next 15/16
  réglerait des vulnérabilités résiduelles "high/moderate" mais c'est un changement
  majeur avec breaking changes — pas fait, à décider plus tard.*
- **Élevé** — `app/api/chat/route.js` et `app/api/github/route.js` n'avaient aucune
  validation d'entrée ni limite de débit (la clé Anthropic serveur ou le compte GitHub
  de l'utilisateur pouvaient être abusés sans contrôle). Corrigé :
  - `lib/rateLimit.js` — rate-limiter en mémoire par IP (basique, par instance
    serverless ; pour une garantie stricte multi-instance il faudrait un store partagé
    type Upstash/Redis — non fait, MVP suffisant pour l'instant).
  - Validation stricte : format des messages (rôle, longueur, nombre max), nom de repo
    GitHub (regex), chemins de fichiers (anti path-traversal), nombre/taille de fichiers.
- **Moyen** — Aucun header de sécurité. Ajouté dans `next.config.mjs` : CSP,
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, HSTS.
- **Faible** — Les routes API renvoyaient `String(e)` / le détail brut des erreurs au
  client (fuite d'info mineure). Remplacé par `console.error` côté serveur uniquement.
- **Pas un problème** — pas de DB donc pas d'injection SQL ; pas de secrets en dur dans
  le code (les patterns trouvés étaient du contenu pédagogique dans `lib/curriculum.js`
  et `lib/webdev.js`) ; pas de `.env` commité dans l'historique git ; CORS par défaut OK.

### 2. Audit fonctionnel/UX (terminé)

- Lien mort `/pmp/examen-blanc` (module inexistant) corrigé → pointe vers `/pmp`
  (`app/page.js`). **Note** : la fonctionnalité "examen blanc chronométré" est évoquée
  dans le contenu marketing mais n'est pas implémentée comme page dédiée — à construire
  si tu veux vraiment cette feature.
- Ajout `app/not-found.js` — vraie page 404 stylée (avant : tout en HTTP 200, y compris
  les routes dynamiques `[moduleId]`/`[certId]` invalides, géré seulement côté React
  avec un message "introuvable" → mauvais pour le SEO/crawlers).
- Ajout `app/sitemap.js` et `app/robots.js` (génèrent `/sitemap.xml` et `/robots.txt`).
- Métadonnées enrichies dans `app/layout.js` : `metadataBase`, OpenGraph, Twitter card.
  *Pas d'image OpenGraph dédiée (og:image) — à ajouter si tu veux un aperçu soigné quand
  le lien est partagé sur les réseaux sociaux.*
- Ajout des pages légales `app/mentions-legales/page.js` et
  `app/confidentialite/page.js`, liées en footer (`app/layout.js`). Remplies avec :
  - Éditeur : Aholou Emile, nom commercial « Codegraft »
  - Contact : aholou.emile09@gmail.com
  - Hébergeur : Vercel Inc.
  - ⚠️ **À vérifier toi-même** : disponibilité du nom "Codegraft" auprès de l'INPI
    (https://www.inpi.fr) et Infogreffe avant tout dépôt de marque/création de société —
    une recherche web rapide n'a rien trouvé de bloquant mais ce n'est pas une recherche
    d'antériorité juridique fiable.

### 3. Vérifié, pas de souci trouvé

- Toutes les images `next/image` ont déjà un `alt` correct.
- Toutes les routes principales répondent en 200 ; build de prod (`npm run build` +
  `npm run start`) testé avec succès.
- Pas de bouton mort (`href="#"`, `onClick` vide) ni de TODO/FIXME oublié dans le code.
- Le flux d'obtention de la clé API Anthropic (page Paramètres) et du token GitHub
  (page Projets/Publier) est bien expliqué à l'utilisateur, avec liens directs.

## Limites connues / pistes pour la suite (pas encore traitées)

1. **Progression utilisateur 100% côté client** (`localStorage`, voir `lib/progress.js`).
   Pas de compte serveur : un vidage de cache = perte totale de la progression, pas de
   sync entre appareils. Pour un vrai produit "école en ligne", il faudrait à terme une
   base de données + authentification (gros changement d'architecture, à discuter avant
   de s'y lancer).
2. **Pas d'analytics** — aucun outil de suivi d'usage actif actuellement.
3. **Next.js 15/16** — upgrade majeur qui réglerait les dernières vulnérabilités
   `npm audit` restantes (high/moderate), mais breaking changes à anticiper.
4. **Examen blanc PMP chronométré** — mentionné dans le contenu marketing, jamais
   implémenté comme fonctionnalité réelle.
5. **Image OpenGraph dédiée** — pour un meilleur aperçu au partage sur réseaux sociaux.

## Comment relancer le projet en local

```bash
cd codegraft/ml-academy   # ce dossier
git pull                  # récupérer les derniers changements si modifiés ailleurs
npm install
npm run dev               # http://localhost:3000
```

Build de production (pour tester avant déploiement) :

```bash
npm run build
npm run start
```

## Déploiement

Le déploiement se fait automatiquement via Vercel à chaque `git push` sur `main`
(repo GitHub connecté à Vercel). Pas de configuration manuelle nécessaire.
