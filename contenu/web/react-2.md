Next.js répond à une question que React seul ne traite pas : **où le code s'exécute-t-il ?** Avec l'App Router, un composant est exécuté sur le serveur par défaut, et n'est envoyé au navigateur que si tu le demandes explicitement. Comprendre cette frontière est l'essentiel du framework ; le reste est une convention de fichiers.

```text
app/
  layout.js            enveloppe commune, persiste entre les navigations
  page.js              la route /
  modules/
    page.js            la route /modules
    loading.js         affiché pendant le chargement de ce segment
    error.js           filet de sécurité pour ce segment
    [id]/page.js       la route /modules/:id
  api/contact/route.js la route POST /api/contact
```

## Les fichiers conventionnels

| Fichier | Rôle |
| --- | --- |
| `page.js` | Rend la route. Sans lui, le segment existe dans l'URL mais n'est pas accessible |
| `layout.js` | Enveloppe le segment et ses enfants. **Ne se réaffiche pas** lors d'une navigation interne |
| `template.js` | Comme un layout, mais remonté à chaque navigation — pour rejouer une animation d'entrée |
| `loading.js` | Interface de repli pendant le chargement, via une frontière `Suspense` automatique |
| `error.js` | Attrape les erreurs du segment. **Doit être un composant client** |
| `not-found.js` | Rendu par l'appel à `notFound()` ou pour une URL inconnue |
| `route.js` | Un gestionnaire HTTP, pas une page. Exporte `GET`, `POST`, etc. |

La propriété la plus utile est celle des **layouts qui ne se réaffichent pas** : une barre latérale avec son défilement, un lecteur audio, un état ouvert/fermé survivent à la navigation entre pages enfants. C'est ce qui donne la sensation d'application plutôt que de site.

Deux conventions de nommage complètent le tableau. Un dossier entre parenthèses — `(marketing)` — **groupe** des routes sans apparaître dans l'URL, ce qui permet de donner deux layouts différents à deux familles de pages. Un dossier préfixé d'un tiret bas — `_composants` — est ignoré par le routeur, pratique pour ranger du code à côté de la page qui l'utilise.

## Composants serveur et composants client

Un composant serveur s'exécute **uniquement sur le serveur**. Son code n'est jamais envoyé au navigateur.

```jsx
// app/modules/page.js — composant serveur par défaut
import { db } from "@/lib/db";

export default async function Modules() {
  const modules = await db.module.findMany();   // accès direct à la base
  return <Liste modules={modules} />;
}
```

Trois conséquences concrètes :

**Il peut être `async`**, et attendre directement une base de données ou un système de fichiers. Plus de `useEffect` pour charger des données, plus d'état de chargement à gérer à la main, plus d'aller-retour réseau supplémentaire.

**Ses dépendances ne pèsent rien côté client.** Une bibliothèque de rendu Markdown de 300 ko utilisée dans un composant serveur n'est pas téléchargée par le visiteur. C'est le gain de performance le plus direct du modèle.

**Les secrets y sont en sécurité.** Une clé d'API lue dans un composant serveur ne fuit pas — à condition de ne jamais la passer en prop à un composant client, où elle se retrouverait dans la charge utile envoyée au navigateur.

En échange, il ne peut pas utiliser d'état, d'effet, de gestionnaire d'événement, ni aucune API du navigateur. Pour cela, il faut `"use client"` :

```jsx
"use client";
import { useState } from "react";

export function BoutonJaime({ initial }) {
  const [n, setN] = useState(initial);
  return <button onClick={() => setN(n + 1)}>J'aime ({n})</button>;
}
```

| Besoin | Type |
| --- | --- |
| Lire une base, un fichier, un secret | Serveur |
| `useState`, `useEffect`, `useContext` | Client |
| `onClick`, `onChange`, un formulaire interactif | Client |
| `window`, `localStorage`, l'API géolocalisation | Client |
| Du contenu statique, du Markdown, une mise en forme | Serveur |

**Le réflexe : serveur par défaut, client par exception**, et l'exception doit être une feuille de l'arbre aussi petite que possible.

## La frontière suit les imports, pas le rendu

Voici le point qui change la façon d'architecturer une page, et qu'on découvre souvent trop tard.

`"use client"` marque un **point d'entrée** dans le graphe des imports : tout ce que ce fichier importe bascule aussi côté client. D'où le conseil de ne pas en mettre en haut d'une page.

Mais un composant serveur peut parfaitement être rendu **à l'intérieur** d'un composant client — à condition de lui être passé en prop, et non importé par lui :

```jsx
// app/page.js — composant serveur
import { Onglets } from "./onglets";          // client
import { ContenuLourd } from "./contenu";     // serveur

export default async function Page() {
  const donnees = await charger();
  return (
    <Onglets>
      <ContenuLourd donnees={donnees} />      {/* reste côté serveur */}
    </Onglets>
  );
}
```

`Onglets` gère l'état d'ouverture côté client, mais `ContenuLourd` a déjà été rendu sur le serveur : `Onglets` ne reçoit que le résultat, par `children`. C'est le motif qui permet d'avoir une coquille interactive autour d'un contenu serveur, et il évite de faire basculer la moitié de l'application.

La contrepartie à connaître : **tout ce qui traverse la frontière doit être sérialisable.** Un objet simple, un tableau, une chaîne, un nombre, une date passent ; une fonction, une classe, un `Map` ne passent pas. Une fonction passée en prop d'un composant serveur vers un composant client compile sans erreur et échoue à l'exécution.

## Charger des données, et les quatre caches

En Next 14, **`fetch` met en cache par défaut** dans un composant serveur. Une même URL demandée deux fois ne part qu'une fois, et le résultat est réutilisé entre les requêtes et entre les déploiements jusqu'à invalidation. C'est un piège quand on ne le sait pas : les données paraissent figées.

```js
fetch(url);                                    // Next 14 : mis en cache
fetch(url, { cache: "no-store" });             // jamais mis en cache
fetch(url, { next: { revalidate: 60 } });      // regénéré au plus toutes les 60 s
fetch(url, { next: { tags: ["modules"] } });   // invalidable par étiquette
```

Ce comportement a changé en Next 15, où le défaut est devenu « pas de cache ». **Vérifie la version du projet avant de recopier un exemple** : c'est la source de confusion numéro un sur l'App Router.

Quatre couches de cache coexistent, et savoir laquelle te gêne fait gagner des heures :

| Couche | Ce qu'elle garde | Durée |
| --- | --- | --- |
| Mémoïsation de requête | Les `fetch` identiques d'un même rendu | Le temps d'un rendu |
| Cache de données | Le résultat des `fetch` côté serveur | Persistant, jusqu'à invalidation |
| Cache de route complet | Le HTML et la charge utile des routes statiques | Jusqu'au prochain build ou revalidation |
| Cache du routeur | Les segments déjà visités, côté navigateur | Quelques secondes à quelques minutes |

Le dernier explique le « je mets à jour et je ne vois rien en revenant en arrière » : la navigation interne sert une version mémorisée côté client. `router.refresh()` le vide.

Pour invalider depuis le serveur après une écriture :

```js
import { revalidatePath, revalidateTag } from "next/cache";

revalidatePath("/modules");      // cette route
revalidateTag("modules");        // tous les fetch portant cette étiquette
```

## Statique ou dynamique

Par défaut, Next essaie de rendre chaque route **au build**, une fois pour toutes. Une route bascule en dynamique — rendue à chaque requête — dès qu'elle utilise `cookies()`, `headers()`, `searchParams`, ou un `fetch` en `no-store`.

Pour une route dynamique dont on connaît les valeurs à l'avance :

```js
export async function generateStaticParams() {
  const modules = await db.module.findMany({ select: { id: true } });
  return modules.map((m) => ({ id: m.id }));
}

export const revalidate = 3600;   // regénération en arrière-plan toutes les heures
```

C'est la régénération incrémentale : les pages sont servies instantanément depuis le cache, et rafraîchies en arrière-plan. Pour un catalogue de cours ou un blog, c'est le bon réglage — rapidité du statique, fraîcheur du dynamique.

Savoir ce qui a été produit : à la fin de `npm run build`, Next affiche la liste des routes avec un symbole par stratégie. C'est le premier endroit à regarder quand une page est plus lente que prévu.

## Routes API et Server Actions

Un `route.js` est un gestionnaire HTTP standard, avec les objets `Request` et `Response` du web :

```js
export async function POST(requete) {
  const corps = await requete.json();
  const resultat = SchemaContact.safeParse(corps);
  if (!resultat.success) {
    return Response.json({ erreur: "Requête invalide" }, { status: 400 });
  }
  await enregistrer(resultat.data);
  return Response.json({ ok: true }, { status: 201 });
}
```

Une **Server Action** est l'autre voie : une fonction qui s'écrit dans le code du composant et s'exécute sur le serveur.

```jsx
// app/contact/page.js
export default function Contact() {
  async function envoyer(donnees) {
    "use server";
    const resultat = SchemaContact.safeParse(Object.fromEntries(donnees));
    if (!resultat.success) return { erreur: "Requête invalide" };
    await enregistrer(resultat.data);
    revalidatePath("/contact");
  }

  return <form action={envoyer}>{/* … */}</form>;
}
```

L'intérêt réel est l'**amélioration progressive** : le formulaire fonctionne même si le JavaScript n'a pas chargé, parce qu'il s'agit d'une vraie soumission HTML. Et il n'y a plus de route à écrire, plus d'URL à maintenir, plus de type à synchroniser entre les deux côtés.

**Une Server Action est un point d'entrée public.** Next lui attribue une URL, et n'importe qui peut l'appeler avec n'importe quel argument — sans passer par ton formulaire. Elle a donc exactement les mêmes obligations qu'une route : valider ses entrées par un schéma, et vérifier que l'appelant a le droit d'agir sur la ressource visée. Le fait qu'elle s'écrive comme une fonction locale ne change rien.

| Choisir | Quand |
| --- | --- |
| Server Action | Une mutation déclenchée depuis ton interface : formulaire, bouton |
| Route handler | Un webhook, un client tiers, une API publique, un format non JSON |

## Les états de chargement et d'erreur

```jsx
// app/modules/loading.js
export default function Chargement() {
  return <SqueletteListe />;   // aux dimensions finales, pour éviter le saut
}
```

`loading.js` n'est pas un message d'attente : il place une frontière `Suspense` autour du segment, ce qui permet à Next d'**envoyer immédiatement** la coquille de la page — en-tête, navigation, mise en page — et de diffuser le contenu quand il est prêt. L'utilisateur voit une page structurée en quelques dizaines de millisecondes au lieu d'un écran blanc.

Pour un contrôle plus fin, on pose ses propres frontières :

```jsx
<Suspense fallback={<SqueletteStats />}>
  <StatistiquesLentes />        {/* le reste de la page n'attend pas */}
</Suspense>
```

`error.js` doit être un composant client, parce qu'il reçoit une fonction `reset` et doit pouvoir réagir au clic :

```jsx
"use client";
export default function Erreur({ error, reset }) {
  return (
    <div>
      <p>Impossible de charger les modules.</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
```

Il n'attrape pas tout : les erreurs d'un layout remontent au segment parent, et celles du layout racine demandent un `global-error.js`.

## Les briques qu'il faut connaître

**`next/link`** fait de la navigation côté client et **précharge** la route au survol ou dès qu'elle entre dans la fenêtre. Remplacer un `<Link>` par un `<a>` annule les deux et recharge la page entière.

**`next/image`** génère `srcset`, `sizes`, les formats modernes et réserve la place avant le chargement. Les attributs `width` et `height`, ou `fill` avec un parent positionné, sont obligatoires — c'est ce qui évite le saut de contenu.

**`next/font`** télécharge la police au build, la sert depuis ton domaine et génère le `font-display` adéquat. Pas de requête vers Google, pas de clignotement de texte, un point de conformité au RGPD en moins.

**Les métadonnées** s'exportent depuis la page ou le layout :

```js
export const metadata = {
  title: "Modules — CodeGraft",
  description: "Le parcours complet, module par module.",
  openGraph: { images: ["/apercu.png"] },
};
```

**Le middleware** s'exécute avant chaque requête, sur un environnement d'exécution restreint : pas de modules Node, pas d'accès direct à une base. Il sert à rediriger, réécrire, ou poser un en-tête — pas à faire du travail.

## Au clavier

1. Crée quatre routes dont une dynamique, et observe dans l'onglet réseau que la navigation entre elles ne recharge pas la page.
2. Mets un `console.log` dans un composant serveur et un autre dans un composant client. Regarde où chacun apparaît : terminal ou console du navigateur.
3. Ajoute un état à un layout, navigue entre deux pages enfants, et vérifie qu'il survit.
4. Fais un `fetch` vers une API qui renvoie l'heure, affiche-la, et recharge plusieurs fois. Observe si elle change, puis ajoute `cache: "no-store"`.
5. Enveloppe un composant lent dans un `Suspense` et compare le moment où la page devient visible, avant et après.
6. Lance `npm run build` et lis le tableau des routes : repère celles qui sont dynamiques et demande-toi pourquoi.

**Ressources** : la documentation de l'App Router — https://nextjs.org/docs/app · le guide du cache, à lire une fois en entier — https://nextjs.org/docs/app/building-your-application/caching
