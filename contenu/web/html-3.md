« Responsive » ne veut pas dire « ça rentre sur un téléphone ». Ça veut dire que la mise en page est **une fonction de l'espace disponible**, et non une suite de cas particuliers. La différence est pratique : la première approche survit aux écrans que tu n'as pas testés, la seconde casse au premier format imprévu.

```css
/* Trois media queries, trois paliers, et une largeur intermédiaire qui casse */
.grille { grid-template-columns: 1fr; }
@media (min-width: 768px)  { .grille { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grille { grid-template-columns: repeat(3, 1fr); } }

/* La même chose, sans palier, valable à toutes les largeurs */
.grille { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
```

Les media queries restent nécessaires, mais ce sont le dernier outil, pas le premier.

## Le viewport, et ce que la balise répare

Un téléphone a un écran de 1170 pixels physiques de large. Le CSS, lui, raisonne en **pixels logiques** : l'iPhone en question fait 390 px de large pour le CSS, avec un rapport de 3 pixels physiques par pixel CSS. C'est le **DPR**, le rapport de densité, et c'est pour cette raison qu'une image de 390 px de large y paraît floue alors qu'elle occupe bien toute la largeur.

Sans la balise `viewport`, un navigateur mobile fait son rendu dans une fenêtre virtuelle de 980 px — la largeur typique d'un site de 2007 — puis dézoome l'ensemble pour le faire tenir. Résultat : la page est complète, et illisible.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`width=device-width` dit « la fenêtre CSS fait la largeur logique de l'appareil ». C'est la ligne qui rend le responsive possible. N'y ajoute jamais `maximum-scale=1` ni `user-scalable=no` : ces valeurs interdisent le zoom, dont une partie des utilisateurs a besoin pour lire. Elles sont considérées comme un manquement d'accessibilité, et iOS les ignore désormais.

## Les points de rupture ne sont pas des appareils

L'erreur de méthode la plus répandue est de choisir ses paliers d'après une liste d'appareils. Cette liste change tous les ans, et les tailles se chevauchent — une tablette en paysage fait la largeur d'un portable.

**Le bon critère : élargis la fenêtre jusqu'à ce que la mise en page devienne laide, et place un palier là.** C'est le contenu qui dicte le point de rupture, pas le catalogue d'Apple.

Les valeurs par défaut de Tailwind servent de référence commune, et il n'y a aucune raison d'en changer sans motif :

| Préfixe | Seuil | Usage habituel |
| --- | --- | --- |
| aucun | à partir de 0 | La base, c'est-à-dire mobile |
| `sm:` | 640 px | Grand téléphone en paysage |
| `md:` | 768 px | Tablette |
| `lg:` | 1024 px | Portable |
| `xl:` | 1280 px | Grand écran |
| `2xl:` | 1536 px | Très grand écran |

Ces préfixes sont des `min-width` : ce qui est écrit sans préfixe s'applique **partout**, et `md:` ajoute à partir de 768 px sans rien retirer en dessous. Une classe `md:grid-cols-2` ne dit pas « deux colonnes sur tablette », elle dit « deux colonnes à partir de 768 px et au-delà ».

## Les requêtes de conteneur : la vraie réponse

Une media query interroge la **fenêtre**. Mais un composant ne connaît pas la fenêtre : la même carte peut se trouver dans une colonne de 300 px ou dans une pleine largeur de 1200 px, sur le même écran. Styler d'après la fenêtre revient à deviner.

Les **requêtes de conteneur** interrogent la taille du parent :

```css
.carte-hote {
  container-type: inline-size;   /* ce conteneur devient mesurable */
  container-name: carte;
}

@container carte (min-width: 400px) {
  .carte { display: grid; grid-template-columns: 120px 1fr; }
}
```

Le composant devient alors vraiment autonome : il s'adapte à la place qu'on lui donne, où qu'on le pose. C'est un changement de méthode, pas une optimisation — et c'est aujourd'hui pris en charge par tous les navigateurs courants.

Les unités qui vont avec existent aussi : `cqw` vaut 1 % de la largeur du conteneur, `cqi` 1 % de sa taille en ligne. `font-size: 4cqw` donne un titre proportionnel à sa carte, pas à l'écran.

En Tailwind 3, les classes `@container` et `@md:` passent par le greffon officiel `@tailwindcss/container-queries` ; en CSS nu, la syntaxe ci-dessus fonctionne sans rien installer.

## Le texte fluide, et le piège d'accessibilité de `clamp()`

`clamp()` prend trois valeurs : un minimum, une valeur idéale, un maximum.

```css
h1 { font-size: clamp(1.75rem, 1.25rem + 2.5vw, 3rem); }
```

Ça se lit : jamais moins de 1,75 rem, jamais plus de 3 rem, et entre les deux une valeur qui grandit avec la fenêtre. Une déclaration remplace trois paliers, et la taille ne saute plus brutalement à 768 px.

**Le piège** est dans le terme du milieu. Écrit en `vw` seul — `clamp(1.75rem, 5vw, 3rem)` — la valeur idéale ne dépend plus que de la fenêtre, et **plus du tout du réglage de taille de police de l'utilisateur**. Quelqu'un qui zoome ou qui a mis 24 px par défaut n'obtient aucun changement : le texte reste fermé à l'agrandissement, ce qui est un échec d'accessibilité caractérisé.

La règle est donc simple : **le terme du milieu contient toujours une part en `rem`.** `1.25rem + 2.5vw` répond au zoom par sa composante `rem` tout en restant fluide par sa composante `vw`.

## Dimensionner d'après le contenu

Trois mots-clés peu connus remplacent beaucoup de calculs :

| Valeur | Signification |
| --- | --- |
| `min-content` | La largeur du mot le plus long : l'élément se comprime au maximum |
| `max-content` | La largeur du contenu sans aucun retour à la ligne |
| `fit-content` | `max-content` tant que ça rentre, sinon la place disponible |

```css
/* Un bouton qui fait exactement la largeur de son texte, sans width fixe */
.etiquette { width: fit-content; }

/* Une image pleine largeur sur mobile, bornée ensuite, sans media query */
.illustration { width: min(100%, 720px); margin-inline: auto; }
```

`min()` et `max()` en CSS sont souvent plus lisibles qu'un palier : `min(100%, 720px)` dit « le plus petit des deux », ce qui est exactement l'intention, alors qu'une media query la reconstitue en trois lignes.

## Les images responsives, pour de vrai

Servir une image de 2000 px à un téléphone, c'est faire payer trois secondes de chargement et des données mobiles pour des pixels invisibles. Le HTML sait l'éviter.

```html
<img
  src="courbe-800.webp"
  srcset="courbe-400.webp 400w, courbe-800.webp 800w, courbe-1600.webp 1600w"
  sizes="(min-width: 1024px) 50vw, 100vw"
  width="1600" height="900"
  alt="Courbe ROC du modèle, AUC 0,912"
  loading="lazy" decoding="async">
```

`srcset` décrit les fichiers disponibles et **leur largeur réelle en pixels**. `sizes` décrit la place que l'image va occuper dans la mise en page. Le navigateur combine les deux avec le DPR de l'appareil et choisit seul le bon fichier — avant même que le CSS soit chargé, d'où la nécessité de lui décrire la mise en page dans `sizes`.

C'est l'attribut qu'on oublie : sans `sizes`, le navigateur suppose `100vw` et télécharge souvent trop gros.

**`<picture>` sert à autre chose que `srcset`.** `srcset` sert à choisir une **résolution** de la même image ; `<picture>` sert à changer d'**image** ou de **format** :

```html
<picture>
  <source media="(max-width: 640px)" srcset="portrait.avif" type="image/avif">
  <source srcset="paysage.avif" type="image/avif">
  <img src="paysage.jpg" alt="…">
</picture>
```

Le navigateur prend la première `<source>` qu'il sait lire, d'où l'ordre : les formats modernes d'abord, le `<img>` en dernier recours. AVIF pèse en général 30 à 50 % de moins que JPEG à qualité égale, WebP autour de 30 % de moins.

Trois attributs complètent le tableau. `width` et `height` réservent la place et évitent le saut de contenu au chargement. `loading="lazy"` diffère les images hors écran — mais **jamais l'image principale**, qu'il faut au contraire marquer `fetchpriority="high"`. Et `decoding="async"` évite que le décodage bloque le premier affichage.

Dans Next.js, le composant `next/image` génère tout ça pour toi : `srcset`, `sizes`, formats modernes, dimensions. C'est l'une des rares abstractions qu'il n'y a aucune raison de refuser.

## Le survol n'existe pas au doigt

Un style `:hover` sur un écran tactile se déclenche au toucher et **reste appliqué** après, parce qu'il n'y a pas d'événement « le doigt est parti ailleurs ». Un bouton touché garde donc sa couleur de survol jusqu'au toucher suivant, ce qui ressemble à un bug d'état.

```css
@media (hover: hover) and (pointer: fine) {
  .carte:hover { transform: translateY(-4px); }
}
```

`hover: hover` demande « le dispositif de pointage peut-il survoler », `pointer: fine` demande « est-il précis ». Les deux ensemble décrivent une souris ou un pavé tactile, et excluent le doigt.

Le corollaire pour le doigt est la **taille de cible**. Les recommandations convergent entre 44 et 48 px de côté — ce n'est pas la taille du texte, c'est celle de la zone cliquable, qu'on obtient avec du `padding` :

```css
.lien-icone { padding: 0.75rem; }   /* une icône de 20px devient une cible de 44px */
```

Sous ce seuil, le taux d'erreur de touche grimpe franchement, et l'exercice final du module te fait vérifier ce point.

## Les encoches et les zones sûres

Sur un téléphone à encoche ou à barre gestuelle, une partie de l'écran est occupée par le système. Un pied de page collé en bas se retrouve sous la barre d'accueil, à moitié inaccessible.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

```css
.barre-basse {
  padding-bottom: calc(0.75rem + env(safe-area-inset-bottom));
}
```

`env(safe-area-inset-bottom)` vaut zéro sur les appareils sans encoche, donc la ligne est sans risque. Elle demande cependant `viewport-fit=cover` pour être renseignée.

## Comment Tailwind fonctionne réellement

C'est le point le plus important de cette leçon, parce qu'il explique le bug Tailwind numéro un.

Tailwind n'est pas une feuille de style qu'on charge : c'est une **étape de compilation**. À chaque build, l'outil lit les fichiers listés dans `content` de `tailwind.config.js`, cherche dedans des **chaînes de caractères** qui ressemblent à des noms de classes, et ne génère que le CSS correspondant. Tout le reste est absent du fichier final — c'est ce qui donne des feuilles de quelques kilooctets.

La conséquence est immédiate et brutale :

```jsx
// Ne produit AUCUN style : la chaîne "text-red-500" n'apparaît nulle part
const couleur = "red";
<p className={`text-${couleur}-500`}>Erreur</p>

// Fonctionne : les deux chaînes complètes existent dans le fichier
const couleurs = { erreur: "text-red-500", succes: "text-emerald-500" };
<p className={couleurs[statut]}>…</p>
```

Tailwind ne comprend pas ton JavaScript, il cherche du texte. **Aucun nom de classe construit par concaténation ne sera jamais généré.** Il n'y a pas d'erreur, pas d'avertissement : le style est simplement absent, et on cherche longtemps ailleurs. La solution est toujours la même, un objet de correspondance avec des classes écrites en entier.

Le corollaire : si une classe n'apparaît que dans un fichier non listé dans `content` — un fichier Markdown, une réponse d'API, une base de données — elle ne sera pas générée non plus. Pour ces cas, la clé `safelist` de la configuration force la génération.

### L'ordre des classes dans l'attribut ne compte pas

```jsx
<div className="p-8 p-2">   {/* laquelle gagne ? */}
```

Ni l'une ni l'autre de façon fiable : c'est l'ordre dans **la feuille de style générée** qui tranche, pas l'ordre dans l'attribut. Deux classes qui visent la même propriété sont donc un conflit silencieux — et c'est exactement ce qui arrive quand un composant accepte un `className` de l'extérieur :

```jsx
// Le p-2 de l'appelant ne surchargera pas forcément le p-8 du composant
function Carte({ className }) {
  return <div className={`p-8 rounded-2xl ${className}`}>…</div>;
}
```

C'est la raison d'exister de la bibliothèque `tailwind-merge`, qui résout les conflits en gardant la dernière classe de chaque famille. Sans elle, la règle de prudence est de ne pas exposer de `className` qui surcharge, ou de n'y accepter que des propriétés que le composant ne fixe pas lui-même.

### `@apply` est un dernier recours

```css
.card { @apply bg-ink-900 rounded-2xl p-6 border border-ink-700; }
```

`@apply` recrée exactement ce que Tailwind cherchait à supprimer : un nom de classe à inventer, à maintenir, et dont on ne sait plus s'il est encore utilisé. La bonne façon d'extraire un motif répété est un **composant**, pas une classe utilitaire déguisée.

Ce site utilise `@apply` pour une poignée de classes — `.card` dans `app/globals.css` — et c'est un compromis assumé sur des motifs présents partout. Ce n'est pas la façon normale de travailler avec Tailwind.

## Ce que la configuration apporte

Les classes de Tailwind ne sont pas magiques : ce sont des noms pour des **valeurs décidées une fois**. C'est tout l'intérêt, et on le perd dès qu'on écrit des valeurs arbitraires partout.

```jsx
<div className="p-6">        {/* une valeur du système : 1.5rem */}
<div className="p-[27px]">   {/* une valeur arbitraire : hors système */}
```

La syntaxe entre crochets existe pour les cas réels — une hauteur imposée, une valeur venue d'une maquette — pas comme façon habituelle d'écrire. Dès qu'une valeur revient trois fois, sa place est dans `theme.extend` de la configuration.

Ce projet pousse la logique plus loin : les couleurs de sa configuration ne sont pas des codes hexadécimaux mais des **propriétés CSS personnalisées**.

```js
colors: {
  ink: { 900: "rgb(var(--ink-900) / <alpha-value>)" },
}
```

`--ink-900` est redéfini selon le thème, et `<alpha-value>` est remplacé par Tailwind à la génération pour que `bg-ink-900/50` continue de fonctionner. Résultat : `darkMode: "class"` suffit à basculer tout le site, parce que la bascule change les propriétés CSS et non les classes. C'est exactement le mécanisme vu dans la leçon précédente, appliqué à l'échelle d'un projet — et tu peux le lire dans `tailwind.config.js` et `app/globals.css`.

## Tester pour de vrai

Le mode appareil des outils de développement est utile, et **il ment sur trois points** : il n'a pas le vrai clavier virtuel, qui réduit la hauteur visible de moitié ; il simule mal les zones sûres ; et il ne reproduit ni la latence réseau ni la lenteur du processeur d'un téléphone d'entrée de gamme. Pour une vérification sérieuse, branche ton téléphone et ouvre la page dessus — en USB, les outils de Chrome se connectent à l'onglet distant.

Quatre vérifications qui prennent chacune une minute :

1. **Redimensionne en continu**, lentement, de 320 à 1600 px. Aucun palier ne doit produire de contenu coupé, de texte à deux mots par ligne, ni de barre horizontale.
2. **Zoome à 200 %** au clavier. La page doit rester utilisable sans défilement horizontal — c'est un critère des règles d'accessibilité, et c'est ce que casse un `clamp()` sans terme en `rem`.
3. **Simule une connexion lente** dans l'onglet Network, en 3G ralentie. C'est là qu'on voit les images non optimisées et les sauts de contenu.
4. **Teste les préférences système** : `prefers-reduced-motion` et `prefers-color-scheme` se forcent dans les outils de développement, onglet Rendering.

## Au clavier

1. Prends une page existante et remplace une media query par `clamp()` sur la taille des titres. Zoome ensuite à 200 % et compare avec une version en `vw` seul.
2. Dans un composant React, construis un nom de classe par interpolation, du genre `bg-` suivi d'une variable puis de `-500`. Constate l'absence totale de style, puis corrige avec un objet de correspondance.
3. Mets la même carte dans une colonne de 280 px et dans une pleine largeur, sur le même écran. Fais-la s'adapter avec `container-type: inline-size` et un `@container`.
4. Ajoute `srcset` et `sizes` à une image, puis regarde dans l'onglet Network quel fichier est réellement téléchargé en réduisant la fenêtre.

**Ressources** : la documentation Tailwind — https://tailwindcss.com/docs · les images responsives sur MDN — https://developer.mozilla.org/fr/docs/Web/HTML/Responsive_images · les requêtes de conteneur — https://developer.mozilla.org/fr/docs/Web/CSS/CSS_containment/Container_queries
