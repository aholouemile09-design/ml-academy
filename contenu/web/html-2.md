Le CSS a mauvaise réputation parce qu'on l'apprend par recettes. On retient `display: flex` et `justify-content: center`, puis un jour une règle ne s'applique pas, un `z-index` reste sans effet, un `position: sticky` ne colle pas — et là, sans le modèle mental, il ne reste que l'essai-erreur.

Cette leçon donne le modèle. Quatre mécanismes expliquent la quasi-totalité des surprises CSS : la cascade, l'héritage, le modèle de boîte et le flux.

```css
/* Un sélecteur, une déclaration, une valeur */
.carte > h2:first-child { font-size: 1.5rem; }
/*  ^ sur quoi           ^ quelle propriété  ^ quelle valeur */
```

## La cascade : pourquoi ta règle ne s'applique pas

Quand deux règles visent le même élément et la même propriété, le navigateur tranche dans cet ordre strict. Il s'arrête au premier critère qui départage.

| Rang | Critère |
| --- | --- |
| 1 | L'origine et l'importance : un `!important` de l'auteur bat tout le reste (sauf un `!important` de l'utilisateur, posé pour raison d'accessibilité) |
| 2 | La **spécificité** du sélecteur |
| 3 | L'**ordre d'apparition** : à spécificité égale, la dernière déclarée gagne |

La spécificité se compte comme un triplet, jamais comme un nombre. On additionne, par catégorie, et on compare de gauche à droite.

| Sélecteur | Triplet | Lecture |
| --- | --- | --- |
| `h1` | 0-0-1 | un élément |
| `.carte` | 0-1-0 | une classe |
| `.carte h1` | 0-1-1 | une classe, un élément |
| `.carte.active h1` | 0-2-1 | deux classes, un élément |
| `#hero` | 1-0-0 | un identifiant |
| `style="…"` | hors concours | l'attribut `style` bat tous les sélecteurs |

La comparaison est lexicographique : **0-1-0 bat 0-0-99**. Une seule classe l'emporte sur quatre-vingt-dix-neuf balises. C'est pour ça qu'empiler des sélecteurs d'éléments ne sert à rien, et qu'un `#id` dans une feuille de style devient presque impossible à surcharger proprement.

`!important` est la sortie de route : il fonctionne une fois, puis la règle suivante doit elle aussi être `!important`, et la feuille entière devient ingérable. **S'il te faut un `!important`, c'est le signe que ton sélecteur initial était trop spécifique.** Baisse la spécificité au lieu de monter l'importance.

Deux pseudo-classes modernes servent précisément à contrôler la spécificité :

```css
/* :is() prend la spécificité de son argument le PLUS spécifique */
:is(h1, h2, h3) { margin-block: 0.5em; }      /* 0-0-1 */

/* :where() vaut TOUJOURS 0-0-0 : la règle se surcharge sans effort */
:where(.prose) a { text-decoration: underline; }
```

`:where()` est l'outil idéal pour une feuille de base ou une bibliothèque : les styles qu'elle pose sont surchargeables par n'importe quoi.

## L'héritage, et les quatre mots-clés qui le pilotent

Certaines propriétés passent aux enfants, d'autres non. La frontière n'est pas arbitraire : **ce qui concerne le texte est hérité, ce qui concerne la boîte ne l'est pas.**

| Hérité | Non hérité |
| --- | --- |
| `color`, `font-*`, `line-height`, `text-align` | `margin`, `padding`, `border`, `background` |
| `letter-spacing`, `white-space`, `cursor`, `visibility` | `width`, `height`, `display`, `position` |

Quatre valeurs permettent de forcer le comportement :

```css
.enfant {
  border: inherit;   /* prend la valeur du parent, même pour une propriété non héritée */
  color: initial;    /* la valeur par défaut de la SPÉCIFICATION, pas celle du navigateur */
  margin: unset;     /* = inherit si la propriété est héritée, initial sinon */
  padding: revert;   /* revient à la valeur de la feuille du NAVIGATEUR */
}
```

`revert` est celui qu'on cherche en général sans le connaître : pour rendre à un `<ul>` ses puces après les avoir supprimées globalement, `list-style: revert` fait exactement ce qu'on veut, là où `initial` donnerait `disc` même sur un élément qui n'en aurait pas.

## Le modèle de boîte, et la ligne qu'on écrit une fois pour toutes

Chaque élément est une boîte à quatre couches : contenu, `padding`, `border`, `margin`. La question est : à quoi s'applique `width` ?

```css
.boite { width: 300px; padding: 20px; border: 2px solid; }
/* box-sizing: content-box (défaut historique) → largeur réelle 344 px */
/* box-sizing: border-box                     → largeur réelle 300 px */
```

En `content-box`, ajouter du `padding` **élargit** l'élément, ce qui casse toute mise en page où une largeur doit être respectée. Personne ne veut ça. D'où la première règle de toute feuille de style depuis quinze ans :

```css
*, *::before, *::after { box-sizing: border-box; }
```

Tailwind l'applique déjà dans son préambule, ce qui explique qu'on n'y pense jamais en travaillant avec lui — et qu'on se fasse surprendre le jour où on écrit du CSS nu.

**Les marges verticales fusionnent.** Deux éléments successifs avec `margin-bottom: 20px` et `margin-top: 30px` ne sont pas séparés de 50 px mais de 30 : le navigateur garde la plus grande. Et la marge du premier enfant peut **sortir** de son parent si celui-ci n'a ni `padding`, ni `border`, ni `overflow` déclaré — d'où les « espaces fantômes » au-dessus d'une section.

La fusion ne se produit ni dans un conteneur `flex`, ni dans un conteneur `grid`. C'est une raison de plus de préférer `gap` aux marges : `gap` ne fusionne jamais, et on n'a pas à retrancher la marge du dernier élément.

## Le flux, et les cinq valeurs de `position`

Par défaut, les éléments se posent les uns après les autres : les blocs occupent toute la largeur et s'empilent, les éléments en ligne se suivent et passent à la ligne. C'est le **flux normal**, et la plupart des mises en page devraient y rester.

| Valeur | Comportement |
| --- | --- |
| `static` | Le défaut. Dans le flux ; `top`, `left`, `z-index` sont **ignorés** |
| `relative` | Dans le flux, mais décalé visuellement. **La place d'origine reste occupée** |
| `absolute` | Retiré du flux. Positionné par rapport au plus proche ancêtre positionné, sinon par rapport au document |
| `fixed` | Retiré du flux. Positionné par rapport à la fenêtre, donc immobile au défilement |
| `sticky` | Dans le flux jusqu'à un seuil, puis fixé. Un hybride |

Le piège de `absolute` est le mot « ancêtre positionné » : un élément absolu cherche son référentiel chez son premier ancêtre dont `position` n'est pas `static`. On oublie de poser `position: relative` sur le parent, et le badge censé être dans le coin de la carte part dans le coin de la page.

`sticky` a deux conditions, et les deux manquent souvent :

```css
.entete-tableau {
  position: sticky;
  top: 0;        /* obligatoire : sans seuil, sticky ne fait rien du tout */
}
```

Et **aucun ancêtre ne doit avoir `overflow: hidden`, `auto` ou `scroll`**. C'est la raison pour laquelle un `overflow-x: hidden` posé sur `body` pour masquer un débordement casse tous les éléments collants de la page — un second bug qu'on ne relie jamais au premier.

### Les contextes d'empilement, et le `z-index: 9999` qui ne marche pas

Deux règles expliquent tous les problèmes de superposition.

**`z-index` n'a aucun effet sur un élément `position: static`.** C'est la première chose à vérifier.

**Un contexte d'empilement enferme ses enfants.** Si un parent crée un contexte, ses descendants ne peuvent plus en sortir : un enfant à `z-index: 9999` dans un parent à `z-index: 1` reste sous un voisin du parent à `z-index: 2`. Le `9999` ne se compare qu'à ses frères, jamais au reste de la page.

Et le détail qui surprend : **un contexte d'empilement est créé par bien autre chose que `z-index`.** `transform`, `opacity` inférieure à 1, `filter`, `will-change`, `isolation: isolate`, un élément `position: fixed`. Une simple animation de survol en `transform: scale(1.02)` peut donc enfermer un menu déroulant qui fonctionnait très bien la veille.

Le panneau **Layers** des outils de développement affiche ces contextes. C'est plus rapide que d'augmenter les nombres au hasard.

## Flexbox, au-delà de `display: flex`

Flexbox dispose des éléments le long d'un axe. Tout le vocabulaire en découle : `flex-direction` choisit l'**axe principal**, et l'axe perpendiculaire est l'**axe transverse**. `justify-content` agit sur le principal, `align-items` sur le transverse — et les deux échangent leur sens quand on passe en `column`. C'est la source de confusion numéro un, et il n'y a rien d'autre à comprendre.

**La propriété `flex` est un raccourci de trois valeurs**, et c'est là que les mises en page se jouent :

```css
.element { flex: 1; }          /* = flex: 1 1 0%   */
.element { flex: auto; }       /* = flex: 1 1 auto */
.element { flex: none; }       /* = flex: 0 0 auto */
.element { flex: 1 1 300px; }  /* grandir, rétrécir, base 300px */
```

La différence entre `flex: 1` et `flex: auto` décide de tout : avec `1 1 0%`, la base est nulle et tous les éléments finissent **de largeur égale** quel que soit leur contenu ; avec `1 1 auto`, la base est la taille du contenu et un élément plus long reste plus large. Quand une rangée de boutons refuse de s'égaliser, c'est ce chiffre qu'il faut regarder.

**Un élément flex a `min-width: auto`, et c'est la cause du débordement le plus déroutant du CSS.** Cette valeur implicite empêche l'élément de devenir plus petit que son contenu — un titre long, une URL insécable, un `<pre>` large forcent alors leur conteneur à s'élargir, et c'est la page entière qui déborde.

```css
.colonne-texte {
  flex: 1;
  min-width: 0;   /* autorise enfin le rétrécissement */
}
```

`min-width: 0` sur l'enfant flex, ou `overflow: hidden` qui a le même effet. Retiens cette ligne : tu la réécriras des dizaines de fois, et elle résout une bonne part des débordements horizontaux que l'exercice de diagnostic te fera chercher.

Dernière confusion utile à lever : `align-items` aligne les éléments **dans leur ligne**, `align-content` aligne **les lignes entre elles** et ne sert donc que si `flex-wrap: wrap` a produit plusieurs lignes. Sur un flex d'une seule ligne, `align-content` n'a aucun effet.

## Grid, au-delà de `display: grid`

Grid ne raisonne pas en colonnes mais en **lignes de grille**, numérotées à partir de 1. Trois colonnes créent quatre lignes verticales, et `grid-column: 1 / 3` signifie « de la ligne 1 à la ligne 3 », soit deux colonnes.

```css
.grille {
  display: grid;
  grid-template-columns: 200px 1fr 1fr;
  gap: 1rem;
}
.vedette { grid-column: 1 / -1; }   /* -1 = la dernière ligne, quel qu'en soit le nombre */
.deux     { grid-column: span 2; }  /* deux pistes, sans dire lesquelles */
```

`-1` pour la dernière ligne est le raccourci le plus utile : il survit à un changement du nombre de colonnes.

**L'unité `fr` distribue l'espace restant**, après que les pistes fixes et le `gap` ont été servis. Donc `grid-template-columns: 200px 1fr` avec `gap: 1rem` donne à la seconde colonne la largeur du conteneur moins 200 px moins 1 rem.

Mais `1fr` cache un piège jumeau de celui de Flexbox : **`1fr` vaut en réalité `minmax(auto, 1fr)`**, et ce `auto` refuse de descendre sous la taille du contenu. Une piste `1fr` contenant un tableau large ou un bloc de code s'élargit donc au-delà de sa part, et la grille déborde.

```css
grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
```

C'est l'équivalent exact du `min-width: 0` de Flexbox. Même cause, même correctif.

**La grille implicite** se crée toute seule : si tu places plus d'éléments que de cases déclarées, Grid ajoute des lignes. Elles valent `auto` par défaut, ce qui donne des hauteurs irrégulières — d'où `grid-auto-rows` :

```css
.galerie {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(180px, auto);  /* au moins 180px, plus si le contenu l'exige */
}
```

Et le raccourci qui remplace cinq lignes de centrage : `place-items: center` sur le conteneur centre dans les deux axes. `place-content`, `place-self` suivent la même logique de paire `align`/`justify`.

## Les unités, et celles qui mentent

| Unité | À quoi elle se rapporte |
| --- | --- |
| `rem` | La taille de police de `<html>`. **Change si l'utilisateur agrandit les polices du navigateur** |
| `em` | La taille de police de l'élément courant. Se compose donc en cascade |
| `%` | Dépend de la propriété : la largeur du parent pour `width`, mais **sa largeur aussi** pour `padding` et `margin`, y compris verticaux |
| `vw`, `vh` | La fenêtre. `100vw` inclut la barre de défilement verticale, d'où un débordement de quelques pixels |
| `dvh` | La hauteur **dynamique** : la vraie réponse au problème mobile |
| `ch` | La largeur du caractère « 0 ». Idéal pour limiter une longueur de ligne |

**`rem` plutôt que `px` pour les tailles de texte**, parce que `px` ignore le réglage de taille de police du navigateur : un utilisateur qui a mis 20 px par défaut pour voir correctement n'obtient aucun changement sur ton site. C'est le point d'accessibilité le plus souvent manqué.

**`em` se compose**, ce qui est utile sur `padding` et dangereux sur `font-size` : trois niveaux imbriqués à `font-size: 0.9em` donnent 0,729 fois la taille d'origine, et plus personne ne sait d'où vient la valeur.

**`100vh` sur mobile n'est pas la hauteur visible.** Les navigateurs mobiles comptent la fenêtre barre d'adresse rétractée : un bloc en `height: 100vh` dépasse donc l'écran au chargement, et son bas passe sous la barre. `100dvh` suit la hauteur réelle, et `100svh` prend la plus petite — les deux sont disponibles partout aujourd'hui.

Pour la largeur de lecture, une ligne remplace une media query :

```css
.prose { width: min(100%, 68ch); margin-inline: auto; }
```

68 caractères est l'ordre de grandeur recommandé en typographie ; au-delà, l'œil perd sa ligne en revenant à gauche.

## Les propriétés personnalisées ne sont pas des variables

`--accent: #6366f1` ressemble à une variable, mais c'est une **propriété CSS à part entière** : elle est héritée, elle participe à la cascade, et elle peut être redéfinie sur n'importe quel sélecteur. C'est exactement ce qui rend un changement de thème possible sans toucher une seule règle :

```css
:root           { --fond: #0a0e1a; --texte: #e2e8f0; }
[data-theme="clair"] { --fond: #f8fafc; --texte: #1e293b; }

body { background: var(--fond); color: var(--texte); }
```

Basculer l'attribut `data-theme` sur `<html>` redéfinit les propriétés, qui se propagent par héritage à toute la page. Aucune règle n'est réécrite. C'est la mécanique du thème sombre de ce site.

Deux détails pratiques : `var(--marge, 1rem)` fournit une valeur de repli si la propriété n'est pas définie, et une propriété personnalisée invalide rend la déclaration qui l'utilise *non valide au calcul* — l'élément prend alors la valeur héritée, pas la valeur précédente. Un `--accent: 16px` utilisé dans `color` ne provoque pas d'erreur visible, juste une couleur inattendue.

## `:has()`, le sélecteur de parent

Pendant vingt ans, le CSS ne savait pas styler un élément d'après son contenu. C'est fini :

```css
/* Une carte qui contient une image reçoit une mise en page différente */
.carte:has(img) { grid-template-rows: auto 1fr; }

/* Un label dont la case est cochée */
label:has(input:checked) { font-weight: 600; }

/* Un formulaire contenant un champ en erreur */
form:has(:user-invalid) .bouton-envoyer { opacity: 0.5; }
```

Ça remplace une quantité de JavaScript qui n'existait que pour ajouter une classe. `:has()` est pris en charge par tous les navigateurs courants depuis fin 2023.

## Animer sans ralentir la page

Le navigateur affiche une image en trois temps : **calcul de la mise en page**, **peinture**, **composition**. Animer `width`, `height`, `top`, `margin` ou `padding` recommence les trois à chaque image — soixante fois par seconde, sur tous les éléments concernés. Animer `transform` et `opacity` ne refait que la composition, qui s'exécute sur le processeur graphique.

```css
.carte {
  transition: transform 180ms ease-out, opacity 180ms ease-out;
}
.carte:hover { transform: translateY(-4px); }

@media (prefers-reduced-motion: reduce) {
  .carte { transition: none; }
}
```

**`transform` et `opacity` uniquement, 120 à 240 ms, et `prefers-reduced-motion` respecté.** Ce dernier point n'est pas une politesse : le mouvement déclenche des nausées et des migraines chez une partie réelle des visiteurs, et le système d'exploitation expose déjà leur choix. Il suffit de le lire.

Et `transition: all` est à éviter : il anime des propriétés que tu n'as pas prévues, y compris celles qui déclenchent une mise en page, et rend le coût imprévisible. Nomme toujours les propriétés.

## Déboguer du CSS

Quatre réflexes, dans cet ordre.

1. **Onglet Styles, panneau de droite.** Les déclarations barrées sont celles qui ont perdu la cascade, et le navigateur affiche laquelle a gagné. La question « pourquoi ma règle ne s'applique pas » se règle là en dix secondes.
2. **Onglet Computed.** La valeur finalement calculée, en pixels réels, avec la chaîne d'héritage. C'est là qu'on découvre qu'un `font-size` vient de trois niveaux plus haut.
3. **Les badges `flex` et `grid`** à côté du sélecteur dans l'onglet Elements : ils superposent les axes, les numéros de lignes de grille et les `gap` directement sur la page.
4. **`outline` plutôt que `border` pour inspecter.** `outline` ne prend pas de place dans la mise en page, donc il ne déplace rien — c'est pour ça que l'astuce `* { outline: 1px solid red }` fonctionne sans fausser ce qu'elle mesure.

## Au clavier

1. Écris deux règles qui visent le même élément, l'une avec `.a .b`, l'autre avec `#c`. Vérifie dans l'onglet Styles laquelle gagne, puis remplace `#c` par `:where(#c)` et regarde le résultat s'inverser.
2. Mets trois éléments de longueurs très différentes dans un conteneur flex. Compare `flex: 1` et `flex: auto` sur les enfants.
3. Mets une URL de 200 caractères sans espace dans une colonne flex. Constate le débordement, puis ajoute `min-width: 0`.
4. Pose un `transform: scale(1.01)` sur un conteneur qui contient un menu déroulant en `position: absolute` avec un grand `z-index`. Observe le menu passer derrière le contenu voisin.

**Ressources** : le guide Flexbox de CSS-Tricks — https://css-tricks.com/snippets/css/a-guide-to-flexbox · le guide Grid — https://css-tricks.com/snippets/css/complete-guide-grid · la spécificité expliquée sur MDN — https://developer.mozilla.org/fr/docs/Web/CSS/Specificity
