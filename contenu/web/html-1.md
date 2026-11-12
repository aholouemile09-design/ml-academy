HTML décrit la **structure** d'un document, pas son apparence. Une balise répond à la question « qu'est-ce que c'est », jamais « à quoi ça ressemble » — c'est le travail du CSS. Cette séparation est la raison pour laquelle une même page peut être lue par un navigateur, un lecteur d'écran, un robot d'indexation et un lecteur de flux.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Détection de fraude — CodeGraft</title>
</head>
<body>
  <header><nav aria-label="Navigation principale">…</nav></header>
  <main>
    <article>
      <h1>Détection de fraude bancaire</h1>
      <p>Modèle de classification sur 100 000 transactions.</p>
    </article>
  </main>
  <footer><p>© 2026</p></footer>
</body>
</html>
```

## Ce que le navigateur fait réellement de ton HTML

Le navigateur ne lit pas ton fichier : il le transforme en **DOM**, un arbre d'objets en mémoire. Tout le reste — le CSS, le JavaScript, le lecteur d'écran — travaille sur cet arbre, jamais sur ton texte. Comprendre ça explique une bonne part des bugs HTML.

Deux conséquences immédiates.

**Le navigateur ne refuse jamais ton HTML.** Il n'existe pas d'erreur de syntaxe fatale en HTML : une balise mal fermée, mal imbriquée ou inconnue est *réparée* selon un algorithme normalisé. Le résultat est un DOM valide, mais pas toujours celui que tu croyais écrire.

```html
<!-- Ce que tu écris -->
<p>Un paragraphe <div>et un bloc</div> dedans.</p>

<!-- Ce que le DOM contient réellement -->
<p>Un paragraphe </p>
<div>et un bloc</div>
<p> dedans.</p>
```

Un `<p>` ne peut pas contenir de contenu de type bloc : rencontrant `<div>`, le parseur **ferme le paragraphe tout seul**. Ton CSS `p > div` ne s'appliquera jamais, et tu chercheras longtemps pourquoi. Même famille de pièges : un `<li>` hors de `<ul>`, un `<td>` hors de `<tr>`, un `<form>` imbriqué dans un autre `<form>` (le second est purement supprimé).

**C'est pour ça que le validateur du W3C sert à quelque chose.** Ce n'est pas un contrôle qualité cosmétique : c'est le seul moyen de voir l'écart entre ce que tu as écrit et ce que le navigateur a construit. Les exercices te font valider la page sans erreur — ce n'est pas un caprice.

Pour inspecter le DOM réel, ouvre les outils de développement (F12), onglet **Elements**. Ce que tu y vois n'est pas ton fichier, c'est l'arbre. Le menu contextuel « Afficher le code source de la page », lui, montre le fichier brut : la différence entre les deux est exactement ce que le parseur a réparé.

## L'en-tête de document, ligne par ligne

Le `<head>` ne s'affiche pas, et c'est précisément pour ça qu'on le bâcle. Chaque ligne y a un effet mesurable.

| Ligne | Ce qu'elle fait réellement |
| --- | --- |
| `<!DOCTYPE html>` | Active le mode standard. Sans elle, le navigateur bascule en *quirks mode* et imite les bugs de 1999 — dont un modèle de boîte différent |
| `lang="fr"` | Choisit la prononciation du synthétiseur vocal, la langue de la correction orthographique et les règles de coupure de mots |
| `charset="UTF-8"` | Doit apparaître dans le **premier kilooctet** du fichier, sinon le navigateur a déjà commencé à décoder autrement — d'où les « Ã© » à la place des « é » |
| `viewport` | Sans elle, un mobile fait le rendu dans une fenêtre virtuelle de 980 px puis dézoome : tout est minuscule et illisible |
| `<title>` | Onglet, favori, résultat de recherche, historique. Ce que Google affiche en bleu |
| `<meta name="description">` | Non pris en compte dans le classement, mais c'est le texte affiché sous le lien dans les résultats. Il décide du clic |

Deux ajouts qui se négligent toujours et se voient tout de suite :

```html
<!-- L'aperçu quand on partage le lien (Slack, LinkedIn, WhatsApp, Discord) -->
<meta property="og:title" content="Détection de fraude bancaire">
<meta property="og:description" content="Modèle de classification, AUC 0,912.">
<meta property="og:image" content="https://exemple.fr/apercu.png">

<!-- La couleur de la barre d'adresse sur mobile -->
<meta name="theme-color" content="#0a0e1a">
```

Les balises **Open Graph** sont lues par toutes les messageries. Sans elles, ton lien de portfolio apparaît comme une ligne de texte grise ; avec elles, comme une carte avec une image. C'est dix minutes de travail pour la première impression d'un recruteur.

## Choisir la bonne balise

La liste des balises sémantiques s'apprend en cinq minutes. Savoir laquelle prendre, c'est autre chose. Voici le critère de chacune.

| Balise | Le test qui tranche |
| --- | --- |
| `article` | Le contenu garderait-il du sens, seul, sorti de la page ? Un billet, une fiche produit, un commentaire : oui. Une barre latérale : non |
| `section` | Ai-je un **titre** à lui donner ? Si la réponse est non, ce n'est pas une `section` |
| `div` | Aucune signification, uniquement un support de style ou de mise en page. C'est un choix légitime, pas un échec |
| `aside` | Contenu tangent au contenu principal, qu'on pourrait retirer sans l'abîmer : encadré, publicité, liens connexes |
| `nav` | Un bloc de navigation **majeur**. Trois liens dans un pied de page n'en sont pas un : trop de `nav` revient à n'en avoir aucun |
| `main` | Le contenu propre à cette page, une seule fois par document, hors en-tête et pied de page répétés |

La confusion la plus fréquente est `section` contre `div`. Une `section` sans titre n'apporte rien : les lecteurs d'écran l'annoncent comme une région anonyme, ce qui ajoute du bruit au lieu d'aider. Un `div` assume qu'il ne veut rien dire, et c'est honnête.

Et l'erreur inverse existe aussi : tout envelopper dans `article` et `section` parce que c'est « plus moderne ». Une page sémantique n'est pas une page sans `div`, c'est une page où chaque balise porteuse de sens en porte un vrai.

## L'arbre d'accessibilité, et pourquoi ARIA arrive en dernier

À partir du DOM, le navigateur construit un second arbre : **l'arbre d'accessibilité**. C'est lui que lisent les lecteurs d'écran, et il ne contient pas des balises mais des couples rôle/nom : « lien, Accueil », « bouton, Envoyer », « région de navigation ».

Chaque balise sémantique a un **rôle implicite**. `<nav>` donne `role="navigation"`, `<button>` donne `role="button"`, `<h1>` donne `role="heading"` de niveau 1. Écrire `<nav role="navigation">` est donc une redondance sans effet.

D'où la première règle d'ARIA, formulée par ses propres auteurs : **n'utilise pas ARIA.** Si une balise HTML fait le travail, elle le fait mieux, parce qu'elle apporte en plus le comportement (focus, clavier, activation) que les attributs ARIA ne fournissent jamais. ARIA ne sert que pour ce que HTML ne sait pas exprimer : un onglet, un accordéon, une boîte de dialogue non native, un état `aria-expanded`.

L'attribut utile est surtout `aria-label`, pour **nommer** ce que le texte visible ne nomme pas :

```html
<!-- Deux nav sur la même page : sans nom, le lecteur d'écran annonce
     « navigation » deux fois et l'utilisateur ne peut pas les distinguer -->
<nav aria-label="Navigation principale">…</nav>
<nav aria-label="Fil d'Ariane">…</nav>

<!-- Un bouton dont le contenu est une icône : il n'a aucun nom accessible -->
<button aria-label="Fermer">×</button>
```

**Pour les images, l'attribut `alt` est obligatoire — y compris vide.**

```html
<img src="graphique-auc.png" alt="Courbe ROC du modèle, AUC de 0,912">
<img src="separateur.svg" alt="">
```

`alt=""` signifie « décoratif, à ignorer » : le lecteur d'écran passe sans rien dire. Un `alt` **absent**, lui, pousse certains lecteurs à lire le nom du fichier à voix haute — « graphique tiret a u c point p n g ». Le vide est une information, l'absence est un oubli.

Et `alt` n'est pas une infobulle : l'infobulle est `title`, qui n'apparaît qu'au survol de la souris, donc jamais au clavier ni au doigt. Ne mets jamais dans `title` une information nécessaire.

## Les formulaires : ce qui part réellement au serveur

C'est l'endroit où l'on perd le plus de temps en débogage, pour une raison simple : ce qui est envoyé ne dépend pas de ce qui est affiché.

**La règle unique : seul un champ avec un attribut `name` est envoyé.** Pas de `name`, pas de donnée — le champ s'affiche, se remplit, et disparaît à la soumission. L'`id` sert à relier le `label` et à cibler en CSS ou en JavaScript ; il ne part jamais au serveur. Les deux attributs ont des rôles disjoints, même quand on leur donne la même valeur.

Le reste des règles, en bloc :

```html
<form action="/api/contact" method="POST">
  <!-- Groupe de cases : même name, crochets pour recevoir un tableau -->
  <input type="checkbox" name="sujets[]" value="ml" id="s-ml">
  <label for="s-ml">Machine learning</label>

  <!-- Boutons radio : c'est le name identique qui les rend exclusifs -->
  <input type="radio" name="niveau" value="debutant" id="n-deb">
  <label for="n-deb">Débutant</label>
  <input type="radio" name="niveau" value="avance" id="n-av">
  <label for="n-av">Avancé</label>

  <!-- Une case non cochée n'est PAS envoyée : elle est absente, pas « false » -->
  <input type="checkbox" name="newsletter" value="oui">

  <button type="submit">Envoyer</button>
</form>
```

| Point | À retenir |
| --- | --- |
| `method="GET"` | Les données partent dans l'URL : visibles, mises en favori, enregistrées dans les journaux du serveur. Réservé à la recherche et au filtrage, **jamais** un mot de passe |
| `method="POST"` | Les données partent dans le corps de la requête. Tout formulaire qui modifie quelque chose |
| `enctype` | Pour envoyer un fichier il faut `enctype="multipart/form-data"`. Sans lui, le serveur reçoit le nom du fichier, pas son contenu |
| `disabled` | Le champ n'est **pas** envoyé. C'est la cause classique du « champ manquant » côté serveur |
| `readonly` | Le champ est envoyé, non modifiable. À choisir quand la valeur doit arriver au serveur |
| `<button>` sans `type` | Vaut `type="submit"` à l'intérieur d'un formulaire. Un bouton décoratif doit porter `type="button"`, sinon il soumet la page |
| `fieldset` + `legend` | Regroupe les radios et les cases liées. Le lecteur d'écran annonce la légende avant chaque option, sans quoi « Débutant » arrive sans contexte |

Un champ non coché absent plutôt que `false` est le détail qui casse le plus de validations côté serveur. Ton schéma doit traiter l'absence, pas attendre un booléen.

### Le type de champ change le clavier du téléphone

Sur mobile, `type` décide du clavier affiché. C'est le gain d'ergonomie le moins coûteux de tout le web.

| Type | Effet |
| --- | --- |
| `email` | Clavier avec `@` visible, validation du format par le navigateur |
| `tel` | Pavé numérique téléphonique, sans validation de format (les formats nationaux sont trop variés) |
| `url` | Clavier avec `/` et `.com` |
| `search` | Touche « Rechercher » à la place d'« Entrée », et une croix d'effacement |
| `date`, `time` | Sélecteur natif du système, traduit et accessible gratuitement |
| `number` | Pavé numérique, mais voir l'avertissement ci-dessous |

`type="number"` a trois pièges réels : la molette de la souris modifie la valeur quand le champ a le focus, les zéros de tête sont perdus, et un champ vide renvoie une chaîne vide et non zéro. Pour un code postal, un numéro de carte ou un identifiant — qui ne sont pas des quantités — préfère :

```html
<input type="text" inputmode="numeric" autocomplete="postal-code" name="cp">
```

`inputmode` donne le clavier numérique sans aucun des comportements de `number`.

## La validation du navigateur n'est pas de la sécurité

HTML sait valider tout seul, et c'est très utile :

```html
<input type="email" name="email" required>
<input type="password" name="mdp" minlength="12" required>
<input type="text" name="cp" pattern="[0-9]{5}" title="Cinq chiffres">
```

Mais **cette validation est une aide à la saisie, rien de plus.** N'importe qui ouvre les outils de développement, supprime l'attribut `required`, et soumet. Ou envoie la requête directement, sans jamais charger ta page. Le navigateur appartient à l'utilisateur : rien de ce qui s'y exécute n'est une protection.

La règle qui en découle vaut pour toute ta carrière : **toute entrée est revalidée côté serveur, par un schéma, avant d'être utilisée.** La validation HTML évite un aller-retour inutile, elle ne remplace jamais le contrôle serveur. Tu verras cette règle réapparaître en Node, puis avec Zod — c'est la même, à chaque étage.

Deux finesses de style sur la validation :

`:invalid` s'applique **dès le chargement**, avant que l'utilisateur ait tapé quoi que ce soit : un formulaire vide s'affiche alors tout en rouge, ce qui est agressif et faux. Le sélecteur à utiliser est `:user-invalid`, qui n'intervient qu'après une interaction réelle.

```css
input:user-invalid { border-color: #f87171; }
```

Et `novalidate` sur le `<form>` désactive la validation native quand tu gères les messages toi-même — ce qui est souvent le cas, les bulles natives n'étant ni stylables ni traduisibles par toi.

### `placeholder` n'est pas une étiquette

Le `placeholder` disparaît dès la première frappe : l'utilisateur ne peut plus vérifier ce qu'on lui demandait. Son contraste est volontairement faible, donc souvent sous le seuil de lisibilité. Et plusieurs lecteurs d'écran ne l'annoncent pas du tout.

Un `placeholder` sert à montrer un **exemple de format**, à côté d'un vrai `label` :

```html
<label for="tel">Téléphone</label>
<input type="tel" id="tel" name="tel" placeholder="06 12 34 56 78">
```

## `autocomplete` : trente secondes de gagnées par formulaire

L'attribut `autocomplete` indique au navigateur et au gestionnaire de mots de passe ce que contient le champ. Les valeurs sont normalisées, et `autocomplete="on"` ne sert à rien : il faut le nom précis.

```html
<input autocomplete="email" type="email" name="email">
<input autocomplete="current-password" type="password" name="mdp">
<input autocomplete="new-password" type="password" name="nouveau">
<input autocomplete="street-address" name="adresse">
<input autocomplete="one-time-code" inputmode="numeric" name="code">
```

La distinction `current-password` / `new-password` est celle qui change tout : elle dit au gestionnaire de mots de passe s'il doit **remplir** ou **proposer d'enregistrer**. Mal renseignée, elle fait écraser un mot de passe existant par une suggestion. Et `one-time-code` permet au téléphone de proposer le code reçu par SMS en un tapotement.

## Les tableaux de données

Un tableau HTML sert aux **données tabulaires** — pas à la mise en page, c'était la pratique d'avant 2005. Et un tableau de données a besoin de deux choses que presque personne n'écrit :

```html
<table>
  <caption>Performances par modèle, jeu de test</caption>
  <thead>
    <tr>
      <th scope="col">Modèle</th>
      <th scope="col">AUC</th>
      <th scope="col">Rappel</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Régression logistique</th>
      <td>0,871</td>
      <td>0,64</td>
    </tr>
  </tbody>
</table>
```

Le `<caption>` donne son titre au tableau, lu avant le contenu. L'attribut `scope` dit si un `<th>` est l'en-tête d'une colonne ou d'une ligne : c'est ce qui permet au lecteur d'écran d'annoncer « Régression logistique, AUC, 0,871 » au lieu du seul nombre. Sans `scope`, un tableau de dix colonnes devient une suite de chiffres sans signification.

## Échapper le contenu

Trois caractères ne peuvent pas apparaître tels quels dans du HTML, parce qu'ils signifient quelque chose pour le parseur :

| Caractère | Écriture | Pourquoi |
| --- | --- | --- |
| `<` | `&lt;` | Ouvrirait une balise |
| `>` | `&gt;` | Fermerait une balise |
| `&` | `&amp;` | Commencerait une entité |

Ça paraît anecdotique jusqu'au moment où le texte vient d'un utilisateur. Si quelqu'un saisit `<script>…</script>` dans un champ commentaire et que tu réaffiches la valeur sans l'échapper, le navigateur ne voit pas du texte : il voit une balise, et il l'exécute. C'est une faille **XSS**, et elle reste l'une des plus répandues du web.

React et les moteurs de gabarit modernes échappent par défaut, ce qui règle le cas courant. Mais ils offrent tous une porte de sortie — `dangerouslySetInnerHTML` en React, `v-html` en Vue — dont le nom est un avertissement. Tu la retrouveras dans la leçon sur la sécurité du parcours ; retiens pour l'instant qu'**afficher du texte utilisateur n'est jamais neutre**.

## Les liens et les images, trois détails qui se voient

```html
<a href="https://github.com/…" target="_blank" rel="noopener noreferrer">
  Le code sur GitHub
</a>

<img src="courbe.png" alt="Courbe ROC, AUC 0,912"
     width="800" height="450" loading="lazy">
```

**`target="_blank"` exige `rel="noopener"`.** Sans lui, la page ouverte reçoit une référence vers la tienne via `window.opener` et peut la rediriger ailleurs — c'est la base du *tabnabbing*. Les navigateurs récents l'appliquent d'office, mais l'écrire reste la bonne habitude, et `noreferrer` ajoute de ne pas transmettre l'URL d'origine.

**`width` et `height` sur les images ne fixent pas la taille affichée** quand le CSS dit autre chose : ils donnent le **ratio**, ce qui permet au navigateur de réserver la place avant que l'image arrive. Sans eux, le texte saute vers le bas au chargement — c'est le *Cumulative Layout Shift*, pénalisé par Google et détesté par tout le monde.

**`loading="lazy"`** diffère le chargement des images hors écran. À ne pas mettre sur l'image principale, visible d'emblée : la différer retarde l'affichage que l'utilisateur attend.

## Au clavier

Trois manipulations courtes, à faire maintenant.

1. Écris une page avec `<p>Texte <div>bloc</div> suite</p>`, ouvre-la, et compare l'onglet Elements avec le code source de la page. Compte les paragraphes dans chacun.
2. Fais un formulaire avec un champ sans `name`, un champ `disabled` et une case non cochée. Soumets-le en `GET` et lis l'URL obtenue : elle te montre exactement ce qui part.
3. Ajoute les quatre balises Open Graph à une page, publie-la, et colle le lien dans une conversation. Compare avant/après.

Et prends cinq minutes pour parcourir une page que tu connais bien avec la touche Tab uniquement. C'est le test le plus rentable de cette leçon.

**Ressources** : MDN Web Docs, référence absolue — https://developer.mozilla.org/fr/docs/Web/HTML · le validateur — https://validator.w3.org · la liste complète des valeurs d'`autocomplete` — https://developer.mozilla.org/fr/docs/Web/HTML/Attributes/autocomplete
