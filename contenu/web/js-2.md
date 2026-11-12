Le DOM n'est pas ton fichier HTML : c'est l'arbre d'objets que le navigateur en a construit, et c'est la seule chose que JavaScript peut toucher. Cette leçon porte sur les mécanismes qui expliquent les bugs d'interface — la propagation des événements, le nettoyage des écouteurs, et le coût réel de chaque modification de l'arbre.

```javascript
const bouton = document.querySelector("#envoyer");
const cartes = document.querySelectorAll(".carte");

bouton.textContent = "Chargement…";
bouton.classList.add("occupe");
bouton.disabled = true;
```

## Sélectionner, et le piège des collections vivantes

| Méthode | Renvoie | Vivante ? |
| --- | --- | --- |
| `querySelector` | Le premier élément, ou `null` | — |
| `querySelectorAll` | Une `NodeList` **figée** | Non |
| `getElementById` | Un élément, ou `null` | — |
| `getElementsByClassName` | Une `HTMLCollection` **vivante** | Oui |
| `getElementsByTagName` | Une `HTMLCollection` **vivante** | Oui |

Une collection **vivante** se met à jour toute seule quand le document change. C'est la source d'une boucle infinie classique :

```javascript
const divs = document.getElementsByTagName("div");
for (let i = 0; i < divs.length; i++) {
  divs[i].append(document.createElement("div"));   // divs.length augmente à chaque tour
}
```

`querySelectorAll` renvoie une liste figée au moment de l'appel, ce qui est presque toujours ce qu'on veut. Son défaut symétrique : les éléments ajoutés après ne s'y trouvent pas, et il faut relancer la requête.

Petite subtilité pratique : une `NodeList` a `forEach` mais ni `map` ni `filter`. Pour disposer de toutes les méthodes de tableau, il faut la convertir : `[...document.querySelectorAll(".carte")]`.

## `textContent`, `innerText`, `innerHTML` : trois coûts différents

| Propriété | Ce qu'elle fait | Coût |
| --- | --- | --- |
| `textContent` | Lit ou écrit le texte brut, balises comprises comme du texte | Le moins cher |
| `innerText` | Lit le texte **tel qu'il est affiché** : ignore ce qui est masqué, respecte les retours à la ligne visuels | Déclenche un recalcul de mise en page à chaque lecture |
| `innerHTML` | Analyse la chaîne comme du HTML et reconstruit le sous-arbre | Le plus cher, et le seul dangereux |

`innerText` est une mesure visuelle : pour savoir ce qui est affiché, le navigateur doit avoir calculé la mise en page. Le lire dans une boucle est une façon très efficace de figer une page. Quand tu veux le texte, prends `textContent`.

**`innerHTML` avec du contenu non maîtrisé est une faille XSS.** La chaîne est analysée comme du HTML : une balise `<img src=x onerror="…">` venue d'un champ utilisateur ou d'une réponse d'API s'exécute. La règle tient en une phrase : **du texte s'écrit avec `textContent`, jamais avec `innerHTML`.**

Quand il faut de la structure, l'élément `<template>` est l'alternative propre aux chaînes HTML :

```html
<template id="modele-carte">
  <article class="carte"><h3></h3><p></p></article>
</template>
```

```javascript
const modele = document.querySelector("#modele-carte");

function creerCarte(produit) {
  const noeud = modele.content.cloneNode(true);   // true = copie profonde
  noeud.querySelector("h3").textContent = produit.nom;         // sûr
  noeud.querySelector("p").textContent  = produit.description; // sûr
  return noeud;
}
```

Le contenu d'un `<template>` n'est ni affiché ni exécuté tant qu'il n'est pas cloné : les images ne se chargent pas, les scripts ne tournent pas. Et comme chaque valeur passe par `textContent`, l'injection devient impossible par construction.

Deux accès complémentaires :

```javascript
el.classList.add("actif");
el.classList.toggle("ouvert", condition);   // le second argument force l'état
el.classList.contains("actif");

el.dataset.moduleId;        // lit  data-module-id   (tiret → camelCase)
el.dataset.moduleId = "py"; // écrit data-module-id
```

La conversion `data-module-id` vers `dataset.moduleId` se fait automatiquement, et c'est une source de confusion quand on cherche `dataset["module-id"]`, qui vaut `undefined`.

## La propagation des événements

Un clic ne frappe pas un élément : il traverse l'arbre, en trois phases.

1. **Capture** — de `window` vers l'élément cliqué, en descendant.
2. **Cible** — l'élément lui-même.
3. **Bouillonnement** — de l'élément vers `window`, en remontant.

Par défaut, un écouteur se déclenche en phase de bouillonnement. C'est ce qui rend la **délégation** possible : poser un écouteur sur un conteneur capte les clics de tous ses descendants, présents comme futurs. Pour écouter en phase de capture : `addEventListener("click", fn, { capture: true })`.

Deux propriétés, et on confond toujours les deux :

```javascript
liste.addEventListener("click", (e) => {
  e.target;         // l'élément RÉELLEMENT cliqué — peut être une icône, un span…
  e.currentTarget;  // l'élément qui porte l'écouteur — ici, toujours `liste`
});
```

`e.target` descend aussi profond que le clic. C'est pourquoi la délégation s'écrit avec `closest`, qui remonte depuis la cible jusqu'à l'élément qui nous intéresse :

```javascript
const bouton = e.target.closest("[data-action]");
if (!bouton) return;
```

Trois méthodes d'arrêt, souvent utilisées l'une pour l'autre :

| Méthode | Effet |
| --- | --- |
| `preventDefault()` | Annule l'**action par défaut** du navigateur : soumission du formulaire, suivi du lien, défilement. La propagation continue |
| `stopPropagation()` | Arrête la **remontée** vers les ancêtres. L'action par défaut a quand même lieu |
| `stopImmediatePropagation()` | Idem, et empêche en plus les autres écouteurs **du même élément** |

`stopPropagation` est à manier avec précaution : il casse silencieusement toute délégation posée plus haut, y compris celle d'une bibliothèque. Le symptôme — « mon menu ne se ferme plus quand je clique ailleurs » — se diagnostique mal.

**Tous les événements ne bouillonnent pas.** `focus`, `blur`, `load`, `mouseenter` et `mouseleave` restent sur leur cible, ce qui rend la délégation impossible. Leurs équivalents qui bouillonnent existent : `focusin` et `focusout` pour les deux premiers, `mouseover` et `mouseout` pour les derniers. C'est la réponse à « pourquoi ma délégation sur `blur` ne marche pas ».

## Retirer un écouteur, et pourquoi ça échoue

```javascript
element.addEventListener("click", () => faire());
element.removeEventListener("click", () => faire());   // ne retire RIEN
```

`removeEventListener` compare les références de fonction. Deux fonctions anonymes identiques au caractère près sont deux objets différents : le retrait ne trouve rien et échoue en silence.

La réponse moderne est `AbortController`, qui retire un nombre quelconque d'écouteurs d'un coup :

```javascript
const controleur = new AbortController();

element.addEventListener("click", gerer,   { signal: controleur.signal });
window .addEventListener("resize", ajuster, { signal: controleur.signal });

controleur.abort();   // les deux écouteurs sont retirés, sans garder de référence
```

C'est le même objet que celui qui annule un `fetch`, et c'est devenu le motif standard de nettoyage — notamment dans le `useEffect` de React, au module suivant.

Deux options complètent le tableau :

```javascript
element.addEventListener("click", fn, { once: true });      // se retire après un appel
window .addEventListener("scroll", fn, { passive: true });  // promet de ne pas bloquer
```

`passive: true` dit au navigateur que l'écouteur n'appellera pas `preventDefault()`. Sans cette promesse, le navigateur doit attendre la fin de ton code avant de faire défiler la page, ce qui produit le défilement saccadé caractéristique sur mobile. Pour `scroll`, `touchstart` et `wheel`, c'est à mettre systématiquement.

## Le coût d'une modification du DOM

Le navigateur travaille en trois temps : il calcule la **mise en page** (où va chaque boîte), il **peint**, puis il **compose**. Modifier une propriété géométrique invalide la mise en page, ce qu'on appelle un *reflow*.

Un reflow n'est pas cher en soi. Ce qui coûte, c'est d'en provoquer des centaines en alternant lectures et écritures :

```javascript
// Catastrophique : chaque lecture force le recalcul de l'écriture précédente
for (const el of elements) {
  el.style.height = el.offsetHeight + 10 + "px";
}

// Correct : on lit tout, puis on écrit tout
const hauteurs = elements.map((el) => el.offsetHeight);   // lectures groupées
elements.forEach((el, i) => { el.style.height = hauteurs[i] + 10 + "px"; });
```

Le navigateur met normalement les écritures en file et ne recalcule qu'une fois. Mais lire une propriété géométrique — `offsetHeight`, `getBoundingClientRect()`, `scrollTop`, `getComputedStyle()` — l'oblige à vider la file **immédiatement** pour répondre juste. Alterner lecture et écriture annule donc tout le regroupement : c'est le *layout thrashing*.

La règle : **lis tout d'abord, écris tout ensuite.** Et quand c'est possible, change une classe plutôt que dix propriétés de style — une classe est une seule modification.

Pour une animation, `requestAnimationFrame` exécute le code juste avant la prochaine image, synchronisé avec l'écran :

```javascript
requestAnimationFrame(() => { element.style.transform = `translateY(${y}px)`; });
```

`setTimeout(fn, 16)` n'est pas synchronisé et dérive ; `requestAnimationFrame` se met en pause quand l'onglet est masqué, ce qui économise la batterie.

## Les observateurs, et la fin des écouteurs de défilement

Écouter `scroll` pour savoir si un élément est visible est coûteux et imprécis. Trois observateurs natifs font le travail mieux, de façon asynchrone et hors du fil principal.

```javascript
// Déclenche quand un élément entre dans la fenêtre — défilement infini,
// images paresseuses, animations à l'apparition
const vue = new IntersectionObserver((entrees) => {
  for (const e of entrees) if (e.isIntersecting) charger(e.target);
}, { rootMargin: "200px" });            // anticipe de 200 px avant l'entrée

document.querySelectorAll(".a-charger").forEach((el) => vue.observe(el));
```

`ResizeObserver` surveille la taille d'un **élément** — pas de la fenêtre, ce qu'aucune media query ne sait faire. `MutationObserver` surveille les changements de l'arbre, utile pour réagir à du contenu inséré par un script tiers.

Les trois se débranchent avec `.disconnect()`, et l'oublier est une fuite mémoire.

## Les formulaires côté DOM

```javascript
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();                       // sinon la page recharge

  const donnees = Object.fromEntries(new FormData(formulaire));
  // { email: "…", message: "…" } — les champs sans `name` sont absents

  if (!formulaire.checkValidity()) {
    formulaire.reportValidity();            // affiche les messages natifs
    return;
  }
  envoyer(donnees);
});
```

`FormData` lit le formulaire d'après les attributs `name`, exactement comme le ferait une soumission réelle — donc avec les mêmes règles : pas de `name`, pas de donnée ; un champ `disabled` est absent ; une case non cochée est absente.

Attention avec `Object.fromEntries` : pour un champ à valeurs multiples — un groupe de cases — seule la dernière est conservée. Il faut alors `donnees.getAll("sujets")`.

## `localStorage` : ce qu'il est vraiment

```javascript
localStorage.setItem("progression", JSON.stringify(["py-1", "py-2"]));
const faites = JSON.parse(localStorage.getItem("progression") ?? "[]");
```

Six propriétés à connaître avant de s'en servir :

| Propriété | Conséquence |
| --- | --- |
| Il ne stocke que des **chaînes** | `JSON.stringify` et `JSON.parse` à chaque fois, et `localStorage.getItem("x")` d'un nombre renvoie `"42"`, pas `42` |
| Il est **synchrone** | Une écriture bloque le fil principal. À éviter dans une boucle ou un gestionnaire de défilement |
| Le quota est d'environ **5 Mo** | Au-delà, `setItem` lève une `QuotaExceededError` |
| Il peut **lever** | Navigation privée, cookies bloqués, quota plein. Toute lecture et toute écriture se protègent par un `try/catch` |
| Il est lié à l'**origine** | Un même domaine en `http` et en `https` ne partage rien |
| Il est lisible par **tout script de la page** | Donc par une faille XSS |

La dernière ligne a une conséquence directe : **on n'y met jamais de jeton d'authentification.** Une seule injection de script suffit à l'exfiltrer. Les jetons de session vont dans un cookie `HttpOnly`, que JavaScript ne peut pas lire — le module Backend y revient.

Et comme la lecture peut échouer, une petite enveloppe évite de répéter le `try/catch` :

```javascript
const stockage = {
  lire(cle, defaut = null) {
    try { return JSON.parse(localStorage.getItem(cle)) ?? defaut; }
    catch { return defaut; }
  },
  ecrire(cle, valeur) {
    try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch { /* quota */ }
  },
};
```

`sessionStorage` a exactement la même interface, mais meurt avec l'onglet. Pour de vrais volumes — des mégaoctets, des fichiers, des recherches — c'est IndexedDB, asynchrone et autrement plus complexe.

## Le focus, qu'on oublie toujours

Quand un script ouvre une fenêtre modale, le focus reste sur la page derrière. Un utilisateur au clavier continue de tabuler dans le contenu masqué, sans comprendre où il est.

```javascript
const precedent = document.activeElement;   // on retient d'où on vient

dialogue.hidden = false;
dialogue.querySelector("h2").setAttribute("tabindex", "-1");
dialogue.querySelector("h2").focus();       // on déplace le focus dans la modale

// à la fermeture
dialogue.hidden = true;
precedent.focus();                          // et on le rend là où il était
```

`tabindex="-1"` rend un élément focalisable **par script** sans l'ajouter à l'ordre de tabulation — c'est exactement ce qu'il faut pour un titre ou un conteneur.

Et avant d'écrire tout ça : l'élément `<dialog>` est natif, il gère le focus, la touche Échap, le fond assombri et le retour du focus à la fermeture. `dialogue.showModal()` suffit. C'est l'exemple type de la fonctionnalité qu'on réimplémente mal faute de savoir qu'elle existe.

## Au clavier

1. Fais une liste de 500 éléments avec un écouteur par bouton, puis la même par délégation. Compare la mémoire dans l'onglet Memory des outils de développement.
2. Pose un écouteur `blur` par délégation sur un conteneur de champs. Constate qu'il ne se déclenche jamais, puis remplace par `focusout`.
3. Écris une boucle qui lit `offsetHeight` et écrit `style.height` en alternance sur 1 000 éléments. Mesure avec `console.time`, puis sépare lectures et écritures et remesure.
4. Mets `<script>alert(1)</script>` dans un champ, affiche-le avec `innerHTML`, puis avec `textContent`. Regarde la différence dans l'onglet Elements.
5. Remplace une modale faite à la main par un `<dialog>` et teste la touche Échap et la tabulation.

**Ressources** : le DOM sur MDN — https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model · la référence des événements — https://developer.mozilla.org/fr/docs/Web/Events
