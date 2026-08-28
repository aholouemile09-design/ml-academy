// ─────────────────────────────────────────────────────────────────────────────
//  Exercices du parcours Web Full Stack
// ─────────────────────────────────────────────────────────────────────────────
//
//  Greffé sur WEB_CURRICULUM au chargement (voir lib/webdev.js).
//  Même format et mêmes règles que lib/exercises.js pour le parcours ML :
//
//    lessons      { [lessonId]: [exerciceA, exerciceB] }
//    finalExercise  l'exercice global qui rassemble tout le module
//    quizExtra      questions ajoutées au quiz de base
//
//  kind "application" → guidé, juste après le concept
//  kind "blanche"     → énoncé en français, aucun squelette, aucune méthode
//
//  ⚠️ Les valeurs entre backticks sont des littéraux de gabarit JS : tout
//  backtick de code inline à l'intérieur doit être échappé. Lancer
//  `node scripts/verifier-exercices.js` après chaque ajout.
// ─────────────────────────────────────────────────────────────────────────────

export const WEB_EXERCISES = {
  // ══ HTML5 & CSS3 ══════════════════════════════════════════════════════════
  "html-css": {
    lessons: {
      "html-1": [
        {
          id: "html-1-a",
          kind: "application",
          title: "Une page projet en HTML sémantique",
          statement: `Crée une page HTML5 complète présentant un projet ML : titre, description, métriques obtenues, auteur, et un formulaire de contact.

Contraintes :
1. structure sémantique complète — \`header\`, \`nav\`, \`main\`, \`article\`, \`aside\`, \`footer\`
2. un seul \`h1\` sur la page, et une hiérarchie de titres sans trou (pas de \`h3\` sans \`h2\` au-dessus)
3. chaque champ du formulaire associé à son \`label\`
4. \`lang="fr"\` et la balise \`viewport\`

Passe ensuite la page au [validateur du W3C](https://validator.w3.org/) : elle doit sortir sans erreur.`,
          hint: `Pour associer un label à son champ, deux façons : \`<label for="email">\` avec \`<input id="email">\`, ou envelopper l'input dans le label. La première est préférable, elle marche même si la structure change.`,
          solution: `\`\`\`html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Détection de fraude — projet ML</title>
</head>
<body>
  <header>
    <nav aria-label="Navigation principale">
      <a href="/">Accueil</a>
      <a href="/projets">Projets</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Détection de fraude bancaire</h1>
      <p>Modèle de classification sur 100 000 transactions.</p>

      <h2>Résultats</h2>
      <dl>
        <dt>AUC</dt><dd>0,912</dd>
        <dt>Rappel</dt><dd>0,78</dd>
      </dl>

      <h2>Me contacter</h2>
      <form action="/contact" method="POST">
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" required>

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>

        <button type="submit">Envoyer</button>
      </form>
    </article>

    <aside>
      <h2>Ressources</h2>
      <ul><li><a href="https://github.com/…">Le code sur GitHub</a></li></ul>
    </aside>
  </main>

  <footer><p>© 2026 Emile</p></footer>
</body>
</html>
\`\`\`

**Le \`label\` n'est pas décoratif, c'est fonctionnel.** Il agrandit la zone cliquable — cliquer sur le texte place le curseur dans le champ — et c'est ce qui permet à un lecteur d'écran d'annoncer « Adresse e-mail, champ de saisie ». Sans lui, l'utilisateur entend « champ de saisie » et ne sait pas quoi y mettre.

**La hiérarchie de titres est une table des matières.** Les utilisateurs de lecteurs d'écran naviguent en sautant de titre en titre — c'est leur équivalent du survol visuel. Un \`h3\` qui suit directement un \`h1\` casse cette navigation. Et Google lit cette hiérarchie exactement de la même façon.

**\`lang="fr"\`** indique au synthétiseur vocal quelle prononciation utiliser. Sans lui, une page française est lue avec un accent anglais, souvent incompréhensible.

**\`<dl>\` pour les métriques** plutôt qu'un tableau ou des \`div\` : une liste de définitions est faite exactement pour des paires terme/valeur. Choisir la balise qui décrit le contenu, c'est ça, la sémantique.`,
        },
        {
          id: "html-1-b",
          kind: "blanche",
          title: "Sortir de la soupe de div",
          statement: `**Page blanche.** Refonte et démonstration.

Voici une page qui « marche » visuellement :

\`\`\`html
<div class="top">
  <div class="menu">
    <div class="lien" onclick="go('/')">Accueil</div>
    <div class="lien" onclick="go('/blog')">Blog</div>
  </div>
</div>
<div class="contenu">
  <div class="gros-titre">Mon article</div>
  <div class="texte">Le contenu de l'article…</div>
  <div class="petit-titre">Commentaires</div>
</div>
<div class="bas">© 2026</div>
\`\`\`

1. réécris-la en HTML sémantique
2. **prouve** que ta version est meilleure — trouve au moins **trois** différences concrètes et vérifiables
3. teste la navigation **au clavier uniquement**, sans souris, sur les deux versions
4. explique pourquoi \`onclick\` sur un \`div\` est un problème et pas seulement un choix de style

**Le point 3 est le cœur de l'exercice.** Débranche ta souris pour de vrai.`,
          hint: `Un \`div\` n'est pas focalisable au clavier et n'a aucun rôle annoncé. Essaie de parcourir la première version avec la touche Tab : combien d'éléments peux-tu atteindre ? Puis regarde ce que donne \`Ctrl+F\` d'un lecteur d'écran ou le plan du document.`,
          solution: `\`\`\`html
<header>
  <nav aria-label="Navigation principale">
    <a href="/">Accueil</a>
    <a href="/blog">Blog</a>
  </nav>
</header>

<main>
  <article>
    <h1>Mon article</h1>
    <p>Le contenu de l'article…</p>

    <section>
      <h2>Commentaires</h2>
    </section>
  </article>
</main>

<footer><p>© 2026</p></footer>
\`\`\`

**Les trois différences vérifiables** :

**1. La navigation au clavier.** Dans la version en \`div\`, la touche Tab ne s'arrête sur **rien** : un \`div\` n'est pas focalisable. La page est totalement inutilisable sans souris. Avec des \`<a href>\`, Tab parcourt les liens et Entrée les active — sans une ligne de JavaScript.

**2. Le plan du document.** Les lecteurs d'écran proposent une liste des titres et des repères (*landmarks*) pour sauter directement au contenu. La version en \`div\` n'en a aucun : l'utilisateur doit écouter la page entière, du début, à chaque visite. La version sémantique offre « navigation, contenu principal, pied de page » et une hiérarchie de titres.

**3. Le comportement des liens.** Un \`<a href>\` s'ouvre dans un nouvel onglet au clic du milieu, se copie par clic droit, s'affiche dans la barre d'état au survol, et est suivi par les moteurs de recherche. Un \`div onclick\` ne fait rien de tout ça.

**4. Pourquoi \`onclick\` sur un \`div\` est un vrai problème** :

Ce n'est pas un choix esthétique, c'est une fonctionnalité manquante. Le navigateur donne gratuitement à \`<a>\` et \`<button>\` : la focalisabilité, l'activation à Entrée et Espace, un rôle annoncé aux technologies d'assistance, un style de focus visible.

Pour obtenir la même chose avec un \`div\`, il faudrait écrire \`tabindex="0"\`, \`role="link"\`, un gestionnaire de clavier pour Entrée **et** Espace, et un style \`:focus-visible\`. Quatre lignes pour réimplémenter, moins bien, ce qu'une balise fait déjà.

**La règle : choisis la balise qui décrit ce que l'élément EST, pas ce à quoi il ressemble.** Le CSS s'occupe de l'apparence. Un lien qui ressemble à un bouton reste un \`<a>\` ; un bouton qui ressemble à un lien reste un \`<button>\`.

Et l'accessibilité n'est pas une préoccupation marginale : elle est **obligatoire** pour tout site public en Europe et au Canada, et c'est le premier point qu'un recruteur regarde sur une page que tu lui montres.`,
        },
      ],
      "html-2": [
        {
          id: "html-2-a",
          kind: "application",
          title: "Navbar Flexbox et grille sans media query",
          statement: `Stylise la page de l'exercice précédent :

1. un **thème sombre** défini avec des variables CSS (\`--bg\`, \`--texte\`, \`--accent\`)
2. une **navbar en Flexbox** : logo à gauche, liens à droite, alignés verticalement
3. une **grille de cartes responsive sans aucune media query** — 1 colonne sur mobile, plusieurs sur grand écran, automatiquement
4. un état \`:hover\` et un état \`:focus-visible\` distincts sur les liens

Le point 3 est celui qui compte : redimensionne la fenêtre et regarde la grille se réorganiser toute seule.`,
          hint: `\`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))\` — le navigateur place autant de colonnes de 280 px minimum qu'il peut, et les étire pour remplir. Aucune media query nécessaire. Essaie aussi \`auto-fit\` et observe la différence quand il y a peu d'éléments.`,
          solution: `\`\`\`css
:root {
  --bg: #0a0e1a;
  --bg-carte: #0f1525;
  --accent: #6366f1;
  --texte: #e2e8f0;
}

body {
  background: var(--bg);
  color: var(--texte);
  font-family: system-ui, sans-serif;
}

/* Navbar : logo à gauche, liens à droite */
.navbar {
  display: flex;
  justify-content: space-between;   /* pousse les deux blocs aux extrémités */
  align-items: center;              /* centre verticalement */
  gap: 1rem;
  padding: 1rem 1.5rem;
}

.navbar nav { display: flex; gap: 1.5rem; }

.navbar a { color: var(--texte); text-decoration: none; }
.navbar a:hover { color: var(--accent); }
.navbar a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* Grille responsive SANS media query */
.cartes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.carte {
  background: var(--bg-carte);
  border-radius: 1rem;
  padding: 1.5rem;
}
\`\`\`

**\`repeat(auto-fill, minmax(280px, 1fr))\` fait tout le travail.** Le navigateur calcule lui-même combien de colonnes de 280 px minimum tiennent dans l'espace disponible, puis les étire avec \`1fr\` pour remplir. Une ligne de CSS remplace trois media queries — et elle s'adapte à des largeurs que tu n'avais pas prévues.

**\`auto-fill\` contre \`auto-fit\`** : avec trois cartes sur un écran large, \`auto-fill\` garde des colonnes vides à droite et les cartes restent à 280 px ; \`auto-fit\` fait disparaître les colonnes vides et étire les trois cartes sur toute la largeur. Le choix dépend de l'effet voulu, et c'est la question qu'on se pose une fois puis qu'on retient.

**\`:focus-visible\` plutôt que \`:focus\`** : \`:focus\` s'active aussi au clic à la souris, ce qui affiche un contour que la plupart des développeurs finissent par supprimer — cassant du même coup la navigation au clavier. \`:focus-visible\` n'apparaît que quand le navigateur estime que l'utilisateur navigue au clavier. C'est la solution au faux dilemme « joli ou accessible ».

**Ne supprime jamais l'\`outline\` sans le remplacer.** \`outline: none\` seul rend un site inutilisable au clavier, et c'est l'erreur d'accessibilité la plus répandue du web.`,
        },
        {
          id: "html-2-b",
          kind: "blanche",
          title: "Flexbox ou Grid ?",
          statement: `**Page blanche.** Décision avant code.

Quatre mises en page à réaliser. Pour **chacune**, décide **Flexbox ou Grid**, justifie en une phrase, puis code-la.

1. Une barre de navigation : logo à gauche, 4 liens au centre, bouton « Connexion » à droite.
2. Un tableau de bord : sidebar fixe de 250 px à gauche, contenu qui prend le reste, header en haut et footer en bas sur toute la largeur.
3. Une liste de tags de hauteurs variables qui passent à la ligne quand il n'y a plus de place.
4. Une galerie où la première image occupe 2 colonnes et 2 lignes, les autres une seule case.

**Le critère de choix n'est pas donné.** Trouve-le en observant ce que chaque cas demande — et écris-le en une phrase à la fin.`,
          hint: `Pose-toi la question : est-ce que je dispose des éléments **le long d'un axe** en les laissant se répartir, ou est-ce que je place des éléments **dans une trame** que j'ai définie à l'avance ? La réponse départage les quatre cas.`,
          solution: `**1. Navbar → Flexbox.** Une seule dimension, et on veut que les éléments se répartissent selon leur contenu.
\`\`\`css
.navbar { display: flex; justify-content: space-between; align-items: center; }
.navbar nav { display: flex; gap: 1.5rem; }
\`\`\`

**2. Tableau de bord → Grid.** Deux dimensions simultanées : des colonnes (sidebar + contenu) **et** des lignes (header, main, footer). Flexbox demanderait des conteneurs imbriqués.
\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
}
.dashboard > header { grid-area: header; }
\`\`\`
Les \`grid-template-areas\` sont un dessin ASCII de la mise en page dans la feuille de style : on lit la structure sans exécuter la page.

**3. Tags qui passent à la ligne → Flexbox.** Les éléments ont des largeurs variables dictées par leur contenu ; on veut qu'ils s'écoulent naturellement, pas qu'ils s'alignent sur une trame.
\`\`\`css
.tags { display: flex; flex-wrap: wrap; gap: .5rem; }
\`\`\`

**4. Galerie avec une image mise en avant → Grid.** Il faut faire déborder un élément précis sur plusieurs colonnes **et** plusieurs lignes. Flexbox en est incapable.
\`\`\`css
.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.galerie img:first-child { grid-column: span 2; grid-row: span 2; }
\`\`\`

---

**Le critère, en une phrase** :

> **Flexbox distribue le long d'un axe et laisse le contenu décider ; Grid place dans une trame que tu as définie.**

Autrement dit : Flexbox part du **contenu** vers la mise en page, Grid part de la **mise en page** vers le contenu.

Le raccourci pratique : **une seule direction → Flexbox ; lignes et colonnes ensemble → Grid.** Et il est tout à fait normal de combiner les deux — une Grid pour la structure de page, des Flexbox à l'intérieur de chaque zone. C'est même ce qu'on fait la plupart du temps.

**Ce que cet exercice entraîne, c'est le choix**, pas la syntaxe. Les deux techniques s'apprennent en une heure ; savoir laquelle sortir devant une maquette est ce qui prend du temps — et c'est exactement le genre de décision que personne n'enseigne explicitement.`,
        },
      ],
      "html-3": [
        {
          id: "html-3-a",
          kind: "application",
          title: "Passer la page en Tailwind",
          statement: `Convertis la page des exercices précédents en **Tailwind CSS**, et rends-la parfaitement responsive.

1. installe Tailwind et remplace ton CSS custom par des classes utilitaires
2. la grille doit faire 1 colonne sur mobile, 2 sur tablette, 3 sur desktop
3. les tailles de texte s'adaptent aussi (\`text-2xl md:text-4xl\`)
4. teste sur **320 px de large** — c'est le plus petit écran encore courant

Puis compare : combien de lignes de CSS custom te reste-t-il ?`,
          hint: `Les préfixes de Tailwind sont **mobile-first** : \`grid-cols-1 md:grid-cols-2 lg:grid-cols-3\` signifie « 1 colonne par défaut, 2 à partir de 768 px, 3 à partir de 1024 px ». Ce qui est écrit sans préfixe s'applique à toutes les tailles.`,
          solution: `\`\`\`html
<header class="flex items-center justify-between gap-4 px-6 py-4">
  <span class="font-extrabold text-lg">CodeGraft</span>
  <nav class="flex gap-4 sm:gap-6 text-sm">
    <a href="/" class="hover:text-indigo-400 focus-visible:outline-2
                       focus-visible:outline-indigo-500">Accueil</a>
    <a href="/blog" class="hover:text-indigo-400">Blog</a>
  </nav>
</header>

<main class="px-4 sm:px-6 py-8">
  <h1 class="text-2xl md:text-4xl font-bold">Détection de fraude</h1>

  <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <article class="bg-slate-900 rounded-2xl p-6">…</article>
  </div>
</main>
\`\`\`

**Il ne doit te rester quasiment aucun CSS custom** — c'est le signe que la conversion est réussie.

**Ce que Tailwind résout réellement, c'est le nommage.** Le problème du CSS classique n'est pas d'écrire les règles, c'est d'inventer et de maintenir des noms de classes : \`.carte\`, \`.carte-titre\`, \`.carte-titre--large\`… Au bout de quelques mois, personne ne sait plus quelle classe est encore utilisée, et supprimer du CSS devient risqué. Avec Tailwind, le style vit dans le HTML : supprimer l'élément supprime son style, mécaniquement.

**Le prix à payer, c'est du HTML verbeux.** C'est un vrai inconvénient, pas un détail — et c'est pour ça qu'on extrait les motifs répétés en composants (React) ou avec \`@apply\` pour les cas simples. Ce site utilise cette approche : regarde la classe \`.card\` dans \`app/globals.css\`.

**Le mobile-first n'est pas une convention arbitraire.** Écrire le style de base pour mobile puis ajouter les écrans larges donne toujours moins de code que l'inverse : les mises en page mobiles sont plus simples, donc elles font une meilleure base par défaut.

**Et 320 px n'est pas un caprice.** C'est la largeur d'un iPhone SE, encore très utilisé. Une page qui déborde à 320 px déborde chez une part réelle de tes visiteurs.`,
        },
        {
          id: "html-3-b",
          kind: "blanche",
          title: "La page qui déborde sur mobile",
          statement: `**Page blanche.** Diagnostic.

Ta page a une barre de défilement **horizontale** sur mobile. Le contenu déborde à droite, et on ne voit pas d'où ça vient.

Écris la démarche complète :
1. comment **trouver** l'élément coupable — donne une technique qui fonctionne à coup sûr, pas « regarder chaque élément »
2. les **cinq** causes les plus fréquentes de débordement horizontal, avec pour chacune le correctif
3. un test automatisable qui détecte le problème avant la mise en ligne

Puis reproduis délibérément deux de ces causes et vérifie que ta technique de détection les trouve.

**Ne devine pas.** Il existe une astuce CSS d'une ligne qui rend le coupable visible immédiatement.`,
          hint: `Un contour appliqué à **tous** les éléments de la page rend visible celui qui dépasse du cadre. Et en JavaScript, on peut comparer la largeur de chaque élément à celle du document pour lister les fautifs automatiquement.`,
          solution: `**1. Trouver le coupable**

L'astuce d'une ligne, à coller dans la console :
\`\`\`css
* { outline: 1px solid red; }
\`\`\`
L'élément qui dépasse du bord devient immédiatement visible.

La version qui **liste** les coupables, plus fiable sur une page longue :
\`\`\`javascript
[...document.querySelectorAll("*")].forEach((el) => {
  if (el.getBoundingClientRect().right > document.documentElement.clientWidth) {
    console.log(el, el.getBoundingClientRect().right);
  }
});
\`\`\`

**2. Les cinq causes fréquentes**

**a) Une largeur fixe en pixels.** \`width: 400px\` sur un écran de 320 px déborde de 80 px.
→ \`max-width: 100%\` plutôt qu'une largeur fixe.

**b) Une image sans contrainte.** Une photo de 1200 px de large déborde de tout.
→ \`img { max-width: 100%; height: auto; }\` — à mettre dans la feuille de style de base, une fois pour toutes.

**c) Un mot ou une URL insécable.** Une longue adresse ou un jeton sans espace ne peut pas être coupé.
→ \`overflow-wrap: anywhere;\` sur le conteneur de texte.

**d) Un tableau ou un bloc de code trop large.** Ils ne se compressent pas.
→ envelopper dans un conteneur \`overflow-x: auto\` : c'est le tableau qui défile, pas la page.

**e) Une marge ou un padding négatif mal compensé.** \`-mx-6\` sans \`overflow-hidden\` sur le parent élargit le contenu au-delà du viewport.
→ \`overflow-x: hidden\` sur le conteneur concerné — jamais sur \`body\`, ce qui masquerait le symptôme sans corriger la cause et casserait \`position: sticky\`.

**3. Le test automatisable**

\`\`\`javascript
// À lancer dans Playwright, ou à coller dans la console
function detecterDebordement() {
  const largeur = document.documentElement.clientWidth;
  const coupables = [...document.querySelectorAll("*")].filter(
    (el) => el.getBoundingClientRect().right > largeur + 1
  );
  return coupables.map((el) => ({
    selecteur: el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : ""),
    depassement: Math.round(el.getBoundingClientRect().right - largeur) + "px",
  }));
}
\`\`\`

En test end-to-end, on force le viewport à 320 px et on vérifie que la liste est vide :
\`\`\`javascript
await page.setViewportSize({ width: 320, height: 800 });
const coupables = await page.evaluate(detecterDebordement);
expect(coupables).toHaveLength(0);
\`\`\`

---

**Le réflexe à retenir : \`overflow-x: hidden\` sur \`body\` n'est pas un correctif, c'est un pansement.** Il fait disparaître la barre de défilement mais le contenu reste inaccessible — l'utilisateur ne peut simplement plus l'atteindre. Et il casse silencieusement \`position: sticky\` sur toute la page, ce qui produit un second bug qu'on ne relie jamais au premier.

**Et le \`+ 1\` dans la comparaison** absorbe les erreurs d'arrondi sur les écrans à densité fractionnaire, qui sinon produisent des faux positifs à chaque exécution.`,
        },
      ],
    },
    finalExercise: {
      title: "Page produit accessible",
      duration: "4 à 6 h",
      covers: ["html-1", "html-2", "html-3"],
      brief: `Une page produit qui fonctionne au clavier, au lecteur d'écran, et sur mobile.

Cet exercice **rassemble les 3 leçons du module** — sémantique et formulaires (leçon 1), Flexbox et Grid (leçon 2), responsive et Tailwind (leçon 3).

Ce n'est pas un exercice de style. Une page peut être magnifique et totalement inutilisable pour une partie de ses visiteurs — et en Europe comme au Canada, l'accessibilité d'un site public est une **obligation légale**, pas une option.`,
      dataset: `Pas de jeu de données : invente un produit et ses caractéristiques. Prends quelque chose que tu connais, tu écriras de meilleurs textes.

Ta page doit contenir au minimum : un en-tête avec navigation, une grille de produits ou de variantes, une fiche détaillée, un formulaire (contact ou commande), et un pied de page.`,
      steps: [
        "**Structure sémantique complète** — `header`, `nav`, `main`, `article`, `footer`, un seul `h1`, une hiérarchie de titres sans trou. Validée sans erreur au W3C. (leçon 1)",
        "**Grille de produits responsive sans media query** — `auto-fit` ou `auto-fill` avec `minmax`. Redimensionne la fenêtre en continu : aucun palier ne doit casser. (leçon 2)",
        "**Formulaire accessible** — chaque champ associé à son `label`, messages d'erreur reliés au champ par `aria-describedby`, et les erreurs annoncées et non seulement colorées en rouge. (leçon 1)",
        "**Navigation entièrement au clavier** — débranche ta souris. Tab doit atteindre tous les éléments interactifs, dans un ordre logique, avec un focus toujours visible. Ajoute un lien « aller au contenu » en début de page. (leçons 1 et 2)",
        "**Score Lighthouse Accessibilité ≥ 90**, capture d'écran à l'appui. Et lis les points restants : Lighthouse ne détecte qu'environ un tiers des problèmes réels. (leçon 3)",
        "**Test à 320 px** — aucune barre de défilement horizontale, aucun texte tronqué, aucune cible cliquable de moins de 44 px. (leçon 3)",
      ],
      checklist: [
        "J'ai parcouru toute la page au clavier, souris débranchée, sans jamais me perdre",
        "Le focus est visible en permanence — je n'ai supprimé aucun outline sans le remplacer",
        "Ma page valide au W3C sans erreur",
        "Aucun débordement horizontal à 320 px de large",
        "Mes messages d'erreur de formulaire sont lisibles sans percevoir la couleur",
        "Mon score Lighthouse Accessibilité est ≥ 90 et j'ai lu les points restants",
      ],
      selfCheck: `Le vrai test : **ferme les yeux et fais parcourir ta page par un lecteur d'écran** — VoiceOver sur Mac (Cmd+F5), Narrateur sur Windows (Ctrl+Win+Entrée), NVDA si tu veux l'outil de référence.

Écoute la page du début à la fin sans regarder l'écran. Si tu ne comprends pas où tu es, ce qu'est chaque zone, ni ce que fait chaque bouton, ta page est inaccessible — quel que soit ton score Lighthouse.

C'est dix minutes inconfortables, et c'est ce qui change durablement la façon dont on écrit du HTML.`,
    },
    quizExtra: [
      {
        q: "Pourquoi `<div onclick=\"…\">Envoyer</div>` est-il problématique plutôt qu'un `<button>` ?",
        options: [
          "C'est plus lent à exécuter",
          "Un div n'est pas focalisable au clavier, n'a aucun rôle annoncé, et ne réagit ni à Entrée ni à Espace",
          "onclick est déprécié en HTML5",
          "Il faut ajouter une classe CSS pour que ça fonctionne",
        ],
        answer: 1,
        explain:
          "Le navigateur offre gratuitement à <button> et <a> : la focalisabilité, l'activation au clavier, un rôle annoncé aux lecteurs d'écran et un style de focus. Pour obtenir la même chose avec un div, il faudrait tabindex, role, un gestionnaire clavier pour Entrée ET Espace, et un style :focus-visible — quatre lignes pour réimplémenter moins bien ce qu'une balise fait déjà. La règle : choisis la balise qui décrit ce que l'élément EST, pas ce à quoi il ressemble.",
      },
      {
        q: "Que fait `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` ?",
        options: [
          "Il crée exactement 3 colonnes de 280 px",
          "Le navigateur place autant de colonnes d'au moins 280 px qu'il peut, et les étire pour remplir — sans aucune media query",
          "Il limite la grille à une largeur de 280 px",
          "Il répète la première colonne automatiquement",
        ],
        answer: 1,
        explain:
          "Une ligne remplace trois media queries, et elle s'adapte à des largeurs que tu n'avais pas prévues. Différence avec auto-fit : avec peu d'éléments, auto-fill garde des colonnes vides et les cartes restent à 280 px, tandis qu'auto-fit fait disparaître les colonnes vides et étire les cartes sur toute la largeur.",
      },
      {
        q: "Pourquoi préférer `:focus-visible` à `:focus` ?",
        options: [
          "Parce que :focus est déprécié",
          "Parce que :focus s'active aussi au clic souris, ce qui pousse les développeurs à supprimer l'outline — cassant la navigation clavier",
          "Parce que :focus-visible est plus performant",
          "Parce que :focus ne fonctionne pas sur les liens",
        ],
        answer: 1,
        explain:
          ":focus-visible n'apparaît que quand le navigateur estime que l'utilisateur navigue au clavier. C'est la sortie du faux dilemme « joli ou accessible » : on garde un contour net pour ceux qui en ont besoin sans l'afficher au clic souris. Et il ne faut jamais écrire outline: none sans fournir un remplacement — c'est l'erreur d'accessibilité la plus répandue du web.",
      },
      {
        q: "Ta page a une barre de défilement horizontale sur mobile. Quelle est la MAUVAISE façon de corriger ?",
        options: [
          "Mettre max-width: 100% sur les images",
          "Mettre overflow-x: hidden sur body",
          "Envelopper les tableaux dans un conteneur overflow-x: auto",
          "Ajouter overflow-wrap: anywhere sur les longs textes",
        ],
        answer: 1,
        explain:
          "overflow-x: hidden sur body est un pansement : il masque la barre de défilement mais le contenu qui dépasse devient tout simplement inatteignable. Et il casse silencieusement position: sticky sur toute la page, produisant un second bug qu'on ne relie jamais au premier. Il faut trouver l'élément coupable — l'astuce `* { outline: 1px solid red }` le rend visible immédiatement.",
      },
      {
        q: "Que signifie l'approche « mobile-first » en CSS ?",
        options: [
          "Concevoir uniquement pour mobile",
          "Écrire le style de base pour les petits écrans, puis ajouter les écrans larges avec min-width",
          "Tester d'abord sur un téléphone",
          "Charger un fichier CSS différent sur mobile",
        ],
        answer: 1,
        explain:
          "Ce n'est pas une convention arbitraire : les mises en page mobiles sont plus simples, donc elles font une meilleure base par défaut, et on obtient toujours moins de code qu'en partant du desktop pour retrancher. C'est aussi la logique des préfixes Tailwind — ce qui est écrit sans préfixe s'applique partout, md: et lg: n'ajoutent que pour les écrans plus larges.",
      },
      {
        q: "Quand choisir Grid plutôt que Flexbox ?",
        options: [
          "Grid est toujours préférable, Flexbox est obsolète",
          "Quand il faut placer des éléments dans une trame à deux dimensions définie à l'avance ; Flexbox distribue le long d'un seul axe",
          "Grid pour le desktop, Flexbox pour le mobile",
          "Grid uniquement pour les tableaux de données",
        ],
        answer: 1,
        explain:
          "Flexbox part du contenu vers la mise en page — les éléments se répartissent le long d'un axe selon leur taille. Grid part de la mise en page vers le contenu — tu définis lignes et colonnes, puis tu y places les éléments. Raccourci : une seule direction → Flexbox ; lignes ET colonnes ensemble → Grid. Et on combine très souvent les deux : une Grid pour la page, des Flexbox dans chaque zone.",
      },
    ],
  },

  // ══ JAVASCRIPT MODERNE (ES6+) ═════════════════════════════════════════════
  javascript: {
    lessons: {
      "js-1": [
        {
          id: "js-1-a",
          kind: "application",
          title: "Chaîner map, filter et reduce",
          statement: `\`\`\`javascript
const modules = [
  { id: "py",  titre: "Python",        heures: 12, niveau: "debutant",     fait: true  },
  { id: "ml",  titre: "ML classique",  heures: 20, niveau: "intermediaire", fait: false },
  { id: "dl",  titre: "Deep Learning", heures: 18, niveau: "intermediaire", fait: false },
  { id: "nlp", titre: "NLP",           heures: 16, niveau: "avance",        fait: true  },
  { id: "ops", titre: "MLOps",         heures: 14, niveau: "avance",        fait: false },
];
\`\`\`

Sans écrire une seule boucle \`for\`, produis :

1. la liste des titres en majuscules
2. les modules de niveau avancé non terminés
3. le total d'heures restantes (modules non faits)
4. un objet \`{ debutant: 1, intermediaire: 2, avance: 2 }\` comptant les modules par niveau
5. le module le plus long

Puis écris le point 3 **en une seule chaîne** de méthodes.`,
          hint: `\`reduce\` sert à bien plus que des sommes : son accumulateur peut être un nombre, un objet, un tableau. Pour le point 4, pars d'un objet vide et incrémente une clé. Pour le point 5, compare deux éléments à chaque tour.`,
          solution: `\`\`\`javascript
// 1. Titres en majuscules
const titres = modules.map((m) => m.titre.toUpperCase());

// 2. Avancés non terminés
const aFaire = modules.filter((m) => m.niveau === "avance" && !m.fait);

// 3. Heures restantes, en une seule chaîne
const heuresRestantes = modules
  .filter((m) => !m.fait)
  .reduce((total, m) => total + m.heures, 0);          // 52

// 4. Comptage par niveau — l'accumulateur est un objet
const parNiveau = modules.reduce((acc, m) => {
  acc[m.niveau] = (acc[m.niveau] || 0) + 1;
  return acc;
}, {});                                                // { debutant: 1, … }

// 5. Le plus long
const plusLong = modules.reduce((max, m) => (m.heures > max.heures ? m : max));
\`\`\`

**\`reduce\` est la méthode qui débloque tout le reste.** Beaucoup de gens la voient comme « la somme d'un tableau » — c'est le cas le plus simple, pas sa définition. Son accumulateur peut être n'importe quoi : un nombre, un objet, un tableau, une chaîne. Le comptage par niveau au point 4 est exactement le « détecteur de doublons » du module Python, réécrit en JavaScript.

**Le \`(acc[m.niveau] || 0) + 1\`** est l'équivalent du \`dict.get(cle, 0)\` de Python : il évite d'écrire un \`if\` pour le premier passage sur chaque clé.

**Le point 5 n'a pas de valeur initiale** dans son \`reduce\`, volontairement : sans elle, le premier élément sert de point de départ et l'itération commence au second. C'est ce qu'on veut pour un maximum — mais attention, cette forme **plante sur un tableau vide**. C'est le même réflexe qu'au module Python : demande-toi toujours ce qui casse ta fonction.

**Ces méthodes retournent un nouveau tableau**, elles ne modifient pas l'original. C'est ce qui permet de les enchaîner, et c'est aussi pourquoi React s'appuie dessus : les données d'origine restent intactes, donc comparables.`,
        },
        {
          id: "js-1-b",
          kind: "blanche",
          title: "Quand la chaîne fonctionnelle est un mauvais choix",
          statement: `**Page blanche.** Refactoring **et** jugement.

\`\`\`javascript
function analyser(transactions) {
  const resultat = {};
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (t.statut !== "validee") continue;
    if (!resultat[t.client]) {
      resultat[t.client] = { total: 0, nb: 0 };
    }
    resultat[t.client].total += t.montant;
    resultat[t.client].nb += 1;
  }
  for (const client in resultat) {
    resultat[client].moyenne = resultat[client].total / resultat[client].nb;
  }
  return resultat;
}
\`\`\`

1. réécris cette fonction en style fonctionnel
2. compare les deux versions sur trois critères : lisibilité, performance, débogabilité
3. **trouve un cas où tu garderais la boucle \`for\`** — il en existe plusieurs, cite-en deux avec un argument précis
4. mesure les deux versions sur 1 million de transactions

**Le point 3 est le vrai exercice.** « Le fonctionnel c'est mieux » est un slogan, pas un raisonnement.`,
          hint: `Pense aux situations où une boucle peut faire quelque chose que \`map\`/\`filter\`/\`reduce\` ne peuvent pas : s'arrêter avant la fin, sauter des éléments sans les parcourir, ou éviter de créer des tableaux intermédiaires. Pour la mesure : \`console.time()\` / \`console.timeEnd()\`.`,
          solution: `**1. La version fonctionnelle**

\`\`\`javascript
const analyser = (transactions) =>
  Object.fromEntries(
    Object.entries(
      transactions
        .filter((t) => t.statut === "validee")
        .reduce((acc, t) => {
          const c = acc[t.client] ?? { total: 0, nb: 0 };
          acc[t.client] = { total: c.total + t.montant, nb: c.nb + 1 };
          return acc;
        }, {})
    ).map(([client, { total, nb }]) => [client, { total, nb, moyenne: total / nb }])
  );
\`\`\`

**2. La comparaison honnête**

**Lisibilité** : la boucle gagne ici. La version fonctionnelle empile \`fromEntries\`, \`entries\`, \`reduce\`, \`map\` et une déstructuration imbriquée — il faut la lire trois fois. Le fonctionnel gagne sur des chaînes **courtes** (2 ou 3 maillons) et perd au-delà.

**Performance** : la boucle gagne. Chaque maillon crée un tableau ou un objet intermédiaire ; la boucle fait un seul passage sans allocation superflue. Sur un million d'éléments, l'écart est typiquement d'un facteur 2 à 4.

**Débogabilité** : la boucle gagne. On peut poser un point d'arrêt sur une ligne précise, inspecter \`i\`, \`t\`, l'état partiel. Dans une chaîne, il faut découper l'expression pour observer un intermédiaire.

**3. Quand garder la boucle — les cas réels**

**a) Quand il faut s'arrêter tôt.** Chercher la première transaction dépassant un seuil dans un tableau d'un million d'éléments : un \`for\` avec \`break\` s'arrête au premier trouvé ; un \`filter\` parcourt tout puis jette 999 999 résultats. (\`find\` et \`some\` s'arrêtent, eux — mais \`map\`, \`filter\` et \`reduce\` non.)

**b) Quand la performance compte vraiment** — boucle sur des millions d'éléments, animation à 60 images par seconde, traitement en temps réel. Chaque tableau intermédiaire est une allocation, donc du travail pour le ramasse-miettes.

**c) Quand la logique est un accumulateur d'états multiples.** Ce cas précis en est un : on construit un objet **et** on compte **et** on calcule une moyenne. Le forcer dans un \`reduce\` produit du code plus obscur que la boucle qu'il remplace.

**d) Quand il faut l'index et le voisin.** Comparer chaque élément au précédent se fait naturellement avec \`i\` et \`i-1\` ; en fonctionnel, ça devient acrobatique.

**4. La mesure**

\`\`\`javascript
const gros = Array.from({ length: 1_000_000 }, (_, i) => ({
  client: "c" + (i % 500),
  montant: Math.random() * 100,
  statut: Math.random() > 0.1 ? "validee" : "annulee",
}));

console.time("boucle");      analyser(gros);            console.timeEnd("boucle");
console.time("fonctionnel"); analyserFonctionnel(gros); console.timeEnd("fonctionnel");
// boucle       ~45 ms
// fonctionnel  ~130 ms
\`\`\`

---

**Le principe : le style fonctionnel est un outil de lisibilité, pas une religion.**

Il brille sur des transformations courtes et enchaînables — \`items.filter(actif).map(nom)\` se lit mieux que six lignes de boucle. Il se retourne contre toi dès que la chaîne dépasse trois maillons ou que la logique est un accumulateur d'états.

**Et le critère de décision est simple : est-ce que la version fonctionnelle se lit plus vite que la boucle ?** Si oui, prends-la. Si tu dois la relire trois fois, tu viens d'échanger de la performance contre de la complexité, ce qui est le pire des deux mondes.`,
        },
      ],
      "js-2": [
        {
          id: "js-2-a",
          kind: "application",
          title: "Un quiz interactif en JavaScript pur",
          statement: `Construis un quiz fonctionnel **sans aucune bibliothèque** :

1. un tableau de 5 questions avec leurs options et la bonne réponse
2. l'affichage d'une question à la fois, options générées dynamiquement
3. au clic : coloration de la bonne et de la mauvaise réponse, désactivation des autres
4. un bouton « suivante » qui passe à la question d'après
5. un écran de score final, avec un bouton « recommencer »
6. le meilleur score conservé dans \`localStorage\`

Contrainte : **une seule** fonction \`afficherQuestion(index)\` qui redessine l'écran. Pas de manipulation dispersée du DOM.`,
          hint: `Sépare l'**état** (l'index courant, le score, les réponses données) du **rendu** (la fonction qui dessine à partir de l'état). Chaque action modifie l'état puis rappelle le rendu. C'est exactement le modèle mental de React, en version manuelle.`,
          solution: `\`\`\`javascript
const questions = [
  { q: "Que retourne typeof null ?", options: ["null", "object", "undefined"], reponse: 1 },
  // … 4 autres
];

// ── L'état, en un seul endroit ────────────────────────────────────────────
const etat = { index: 0, score: 0, valide: false };

const $ = (sel) => document.querySelector(sel);

// ── Le rendu, fonction pure de l'état ─────────────────────────────────────
function afficherQuestion() {
  const q = questions[etat.index];

  $("#zone").innerHTML = \`
    <p class="compteur">Question \${etat.index + 1} / \${questions.length}</p>
    <h2>\${q.q}</h2>
    <div class="options">
      \${q.options.map((opt, i) => \`<button data-i="\${i}">\${opt}</button>\`).join("")}
    </div>
    <button id="suivante" hidden>Suivante</button>
  \`;
}

// ── Délégation : UN seul écouteur pour tous les boutons ───────────────────
$("#zone").addEventListener("click", (e) => {
  const bouton = e.target.closest("button[data-i]");

  if (bouton && !etat.valide) {
    const choix = Number(bouton.dataset.i);
    const q = questions[etat.index];
    etat.valide = true;
    if (choix === q.reponse) etat.score++;

    $("#zone").querySelectorAll("button[data-i]").forEach((b) => {
      const i = Number(b.dataset.i);
      b.disabled = true;
      if (i === q.reponse) b.classList.add("correcte");
      else if (i === choix) b.classList.add("fausse");
    });
    $("#suivante").hidden = false;
    return;
  }

  if (e.target.id === "suivante") {
    etat.index++;
    etat.valide = false;
    etat.index < questions.length ? afficherQuestion() : afficherScore();
  }
});

function afficherScore() {
  const meilleur = Math.max(etat.score, Number(localStorage.getItem("meilleurScore") || 0));
  localStorage.setItem("meilleurScore", String(meilleur));
  $("#zone").innerHTML = \`
    <h2>Score : \${etat.score} / \${questions.length}</h2>
    <p>Meilleur score : \${meilleur}</p>
    <button id="rejouer">Recommencer</button>
  \`;
}

afficherQuestion();
\`\`\`

**La séparation état / rendu est ce que l'exercice t'apprend vraiment.** Une action ne touche jamais le DOM directement : elle modifie \`etat\`, puis le rendu redessine. C'est exactement le modèle de React — \`useState\` puis re-rendu — et le comprendre à la main rend React évident au lieu de magique.

**Un seul écouteur pour tous les boutons**, posé sur le conteneur. Les boutons sont recréés à chaque question ; leur attacher un écouteur individuellement obligerait à le refaire à chaque rendu. C'est la **délégation d'événements**, sujet de l'exercice suivant.

**\`e.target.closest("button[data-i]")\`** plutôt que \`e.target\` : si le bouton contient une icône, le clic peut atterrir sur l'icône et non sur le bouton. \`closest\` remonte l'arbre jusqu'au bouton. C'est une source de bug très fréquente et difficile à reproduire.

⚠️ **\`innerHTML\` avec des données utilisateur est une faille XSS.** Ici les questions sont écrites par toi, donc c'est sûr. Dès que le contenu vient d'un utilisateur ou d'une API, il faut \`textContent\` ou un échappement — le module Backend y revient.`,
        },
        {
          id: "js-2-b",
          kind: "blanche",
          title: "500 écouteurs sur une liste qui rame",
          statement: `**Page blanche.** Diagnostic et correction de performance.

Une page affiche une liste de 500 produits. Chaque carte a un bouton « Ajouter au panier ». Le code actuel :

\`\`\`javascript
function afficherProduits(produits) {
  const liste = document.querySelector("#liste");
  liste.innerHTML = "";
  produits.forEach((p) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.innerHTML = \`<h3>\${p.nom}</h3><button class="ajouter">Ajouter</button>\`;
    carte.querySelector(".ajouter").addEventListener("click", () => ajouter(p.id));
    liste.appendChild(carte);
  });
}
\`\`\`

Le filtrage par catégorie, qui rappelle cette fonction, met **plus d'une seconde** et la page se fige.

1. identifie **deux** problèmes distincts dans ce code
2. corrige-les
3. **mesure** l'amélioration
4. explique pourquoi le second problème provoque une fuite mémoire, même après \`innerHTML = ""\`

**Il y a deux causes, pas une.** L'une concerne les écouteurs, l'autre la façon dont on insère dans le DOM.`,
          hint: `Problème 1 : 500 écouteurs pour un comportement identique — un seul suffirait, posé plus haut dans l'arbre. Problème 2 : chaque \`appendChild\` sur un élément déjà dans la page force le navigateur à recalculer la mise en page. Cherche du côté de \`DocumentFragment\`.`,
          solution: `**1. Les deux problèmes**

**a) 500 écouteurs pour un comportement unique.** Chaque \`addEventListener\` alloue de la mémoire et une closure qui capture \`p\`. À chaque filtrage, on en recrée 500.

**b) 500 insertions individuelles dans le DOM en cours d'affichage.** Chaque \`appendChild\` sur un élément déjà attaché peut déclencher un recalcul de mise en page (*reflow*). Cinq cents reflows synchrones bloquent le fil principal — c'est le figement.

**2. La correction**

\`\`\`javascript
// ── UN seul écouteur, posé une fois, hors de la fonction de rendu ────────
document.querySelector("#liste").addEventListener("click", (e) => {
  const bouton = e.target.closest(".ajouter");
  if (!bouton) return;
  ajouter(bouton.dataset.id);          // l'id voyage dans le DOM, pas dans une closure
});

function afficherProduits(produits) {
  const liste = document.querySelector("#liste");

  // On construit HORS du document : aucun reflow pendant la construction
  const fragment = document.createDocumentFragment();

  produits.forEach((p) => {
    const carte = document.createElement("div");
    carte.className = "carte";
    carte.innerHTML =
      \`<h3>\${p.nom}</h3><button class="ajouter" data-id="\${p.id}">Ajouter</button>\`;
    fragment.appendChild(carte);       // dans le fragment : gratuit
  });

  liste.replaceChildren(fragment);     // UNE seule insertion, un seul reflow
}
\`\`\`

**3. La mesure**

\`\`\`javascript
console.time("rendu");
afficherProduits(produits);
console.timeEnd("rendu");
// avant : ~1100 ms
// après :   ~35 ms
\`\`\`

**4. Pourquoi la fuite mémoire persiste après \`innerHTML = ""\`**

\`innerHTML = ""\` retire les éléments du document, mais chaque écouteur détient une **closure qui capture \`p\`** — l'objet produit complet. Tant qu'une référence subsiste quelque part (une file d'événements en cours, un observateur, un timer), ni la closure ni l'objet capturé ne peuvent être collectés.

Sur une page où l'utilisateur filtre trente fois, on accumule des milliers de closures orphelines. Le symptôme classique : une page qui devient de plus en plus lente au fil de l'utilisation, sans erreur ni pic visible.

**La délégation supprime le problème à la racine** : un seul écouteur, posé sur un conteneur qui ne disparaît jamais, et **l'identifiant voyage dans le DOM** (\`data-id\`) au lieu d'être capturé dans une closure. Rien à nettoyer.

---

**Les deux principes à retenir** :

**Un écouteur par comportement, pas par élément.** Pose-le sur l'ancêtre stable le plus proche. Bonus : ça marche automatiquement pour les éléments ajoutés plus tard.

**Construis hors du document, insère une fois.** \`DocumentFragment\` ou \`replaceChildren\` transforment N reflows en un seul. C'est la même idée que la vectorisation NumPy du parcours ML : une opération groupée bat N opérations unitaires.`,
        },
      ],
      "js-3": [
        {
          id: "js-3-a",
          kind: "application",
          title: "Afficher les dépôts GitHub, avec les trois états",
          statement: `Intègre l'API publique de GitHub — \`https://api.github.com/users/{username}/repos\` — et affiche les dépôts d'un utilisateur.

Ton interface doit gérer **explicitement les trois états**, visibles à l'écran :
1. **chargement** — un indicateur, et le bouton désactivé
2. **succès** — la liste des dépôts triés par nombre d'étoiles
3. **erreur** — un message lisible, différent selon le cas (utilisateur inexistant, limite de requêtes atteinte, réseau coupé)

Teste les trois : un nom valide, un nom inexistant, et le mode hors-ligne des outils de développement.`,
          hint: `\`fetch\` ne lève **pas** d'exception sur un code 404 — il faut vérifier \`response.ok\` toi-même. Une exception n'est levée que si la requête n'aboutit pas du tout (réseau coupé, DNS). C'est le piège n°1 de fetch.`,
          solution: `\`\`\`javascript
const $ = (sel) => document.querySelector(sel);

async function chargerDepots(username) {
  // ── État 1 : chargement ────────────────────────────────────────────────
  $("#bouton").disabled = true;
  $("#zone").innerHTML = '<p class="chargement">Chargement…</p>';

  try {
    const reponse = await fetch(\`https://api.github.com/users/\${username}/repos?per_page=100\`);

    // fetch ne lève PAS sur 404 : on vérifie nous-mêmes
    if (!reponse.ok) {
      if (reponse.status === 404) throw new Error(\`Aucun utilisateur « \${username} ».\`);
      if (reponse.status === 403) throw new Error("Limite de requêtes GitHub atteinte. Réessaie dans une heure.");
      throw new Error(\`Erreur serveur (\${reponse.status}).\`);
    }

    const depots = await reponse.json();

    // ── État 2 : succès ──────────────────────────────────────────────────
    if (depots.length === 0) {
      $("#zone").innerHTML = "<p>Cet utilisateur n'a aucun dépôt public.</p>";
      return;
    }

    $("#zone").innerHTML = depots
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((d) => \`
        <article class="depot">
          <h3><a href="\${d.html_url}" target="_blank" rel="noopener">\${d.name}</a></h3>
          <p>\${d.description ?? "Pas de description"}</p>
          <span>⭐ \${d.stargazers_count} · \${d.language ?? "—"}</span>
        </article>\`)
      .join("");

  } catch (erreur) {
    // ── État 3 : erreur ──────────────────────────────────────────────────
    const message = erreur instanceof TypeError
      ? "Impossible de joindre GitHub. Vérifie ta connexion."   // réseau
      : erreur.message;                                          // nos erreurs métier
    $("#zone").innerHTML = \`<p class="erreur">\${message}</p>\`;

  } finally {
    // Exécuté dans TOUS les cas — succès comme échec
    $("#bouton").disabled = false;
  }
}
\`\`\`

**Le piège n°1 de \`fetch\` : il ne lève pas d'exception sur un 404 ou un 500.** Un \`try/catch\` seul ne suffit donc pas — la promesse est tenue, avec une réponse d'erreur. Il faut tester \`response.ok\` explicitement. Une exception n'est levée que si la requête n'aboutit pas du tout, et c'est alors un \`TypeError\`, ce qui permet de distinguer « le serveur a répondu une erreur » de « je n'ai pas pu joindre le serveur ».

**Le \`finally\` est ce qui rend l'interface fiable.** Réactiver le bouton uniquement dans le bloc \`try\` le laisserait désactivé pour toujours en cas d'erreur — l'utilisateur est bloqué et doit recharger la page. C'est un bug extrêmement courant.

**Les trois états ne sont pas du confort, ils sont l'interface.** Une page qui ne montre rien pendant deux secondes est perçue comme cassée : l'utilisateur reclique, ce qui déclenche une seconde requête. Et un message d'erreur générique du type « Une erreur est survenue » n'aide personne — « limite de requêtes atteinte, réessaie dans une heure » dit quoi faire.

**\`rel="noopener"\`** sur les liens en \`target="_blank"\` : sans lui, la page ouverte peut manipuler la page d'origine via \`window.opener\`. C'est une faille de sécurité réelle, et le réflexe se prend une fois.`,
        },
        {
          id: "js-3-b",
          kind: "blanche",
          title: "Six requêtes, trois secondes",
          statement: `**Page blanche.** Optimisation et jugement.

Ce code met environ 3 secondes à s'exécuter :

\`\`\`javascript
async function chargerTableauDeBord(userId) {
  const profil     = await fetch(\`/api/user/\${userId}\`).then((r) => r.json());
  const modules    = await fetch("/api/modules").then((r) => r.json());
  const progres    = await fetch(\`/api/progress/\${userId}\`).then((r) => r.json());
  const badges     = await fetch(\`/api/badges/\${userId}\`).then((r) => r.json());
  const classement = await fetch(\`/api/leaderboard\`).then((r) => r.json());
  const recos      = await fetch(\`/api/reco/\${profil.niveau}\`).then((r) => r.json());
  return { profil, modules, progres, badges, classement, recos };
}
\`\`\`

1. explique **pourquoi** c'est lent — la cause n'est pas le serveur
2. accélère-le, et mesure le gain
3. **attention** : l'une des six requêtes ne peut pas être parallélisée. Laquelle, et pourquoi ?
4. que se passe-t-il avec \`Promise.all\` si **une seule** requête échoue ? Est-ce le comportement que tu veux ici ?
5. propose la version qui dégrade proprement plutôt que de tout perdre

**Le point 3 est le piège de l'exercice.** Relis attentivement les six lignes avant de tout paralléliser.`,
          hint: `Chaque \`await\` bloque la ligne suivante jusqu'à ce que la promesse soit tenue. Six requêtes de 500 ms enchaînées font 3 s ; lancées ensemble, elles font 500 ms. Mais regarde bien ce que la dernière requête utilise dans son URL.`,
          solution: `**1. Pourquoi c'est lent** : chaque \`await\` **suspend** l'exécution jusqu'à la réponse. Les six requêtes s'exécutent donc en série — 6 × 500 ms = 3 s — alors que le serveur pourrait toutes les traiter en même temps. Le goulot n'est pas le serveur, c'est la façon dont on l'interroge.

**3. La requête qui ne peut pas être parallélisée** : la dernière. \`/api/reco/\${profil.niveau}\` a besoin de \`profil\`, qui vient de la **première** requête. Il y a une vraie dépendance de données ; les cinq autres sont indépendantes.

**2 et 5. La version correcte, en deux vagues**

\`\`\`javascript
async function chargerTableauDeBord(userId) {
  const enJson = (r) => (r.ok ? r.json() : Promise.reject(new Error(\`HTTP \${r.status}\`)));

  // Vague 1 : tout ce qui est indépendant, en parallèle
  const [profil, modules, progres, badges, classement] = await Promise.all([
    fetch(\`/api/user/\${userId}\`).then(enJson),
    fetch("/api/modules").then(enJson),
    fetch(\`/api/progress/\${userId}\`).then(enJson),
    fetch(\`/api/badges/\${userId}\`).then(enJson),
    fetch("/api/leaderboard").then(enJson),
  ]);

  // Vague 2 : dépend de profil, donc après
  const recos = await fetch(\`/api/reco/\${profil.niveau}\`).then(enJson);

  return { profil, modules, progres, badges, classement, recos };
}
// avant : ~3000 ms      après : ~1000 ms (deux vagues de 500 ms)
\`\`\`

**4. Le comportement de \`Promise.all\` en cas d'échec**

\`Promise.all\` rejette **dès la première erreur** et tu perds tous les autres résultats, même ceux déjà arrivés. Pour un tableau de bord, c'est le mauvais comportement : si le classement est en panne, on veut quand même afficher le profil, les modules et la progression.

**La version qui dégrade proprement** :

\`\`\`javascript
async function chargerTableauDeBord(userId) {
  const enJson = (r) => (r.ok ? r.json() : Promise.reject(new Error(\`HTTP \${r.status}\`)));

  const resultats = await Promise.allSettled([
    fetch(\`/api/user/\${userId}\`).then(enJson),
    fetch("/api/modules").then(enJson),
    fetch(\`/api/progress/\${userId}\`).then(enJson),
    fetch(\`/api/badges/\${userId}\`).then(enJson),
    fetch("/api/leaderboard").then(enJson),
  ]);

  const [profil, modules, progres, badges, classement] =
    resultats.map((r) => (r.status === "fulfilled" ? r.value : null));

  // Le profil est indispensable : sans lui, pas de page
  if (!profil) throw new Error("Profil indisponible");

  // Le reste est optionnel : on affiche ce qu'on a
  const recos = await fetch(\`/api/reco/\${profil.niveau}\`).then(enJson).catch(() => null);

  return { profil, modules, progres, badges, classement, recos };
}
\`\`\`

---

**Trois principes** :

**\`await\` en série n'est justifié que par une dépendance de données réelle.** Devant une suite d'\`await\`, la question est toujours : est-ce que la ligne N a besoin du résultat de la ligne N-1 ? Si non, elles doivent partir ensemble.

**\`Promise.all\` échoue en bloc, \`Promise.allSettled\` jamais.** Le choix dépend du besoin : \`all\` quand tout est indispensable et qu'un échec doit tout annuler, \`allSettled\` quand l'affichage peut être partiel. Un tableau de bord relève presque toujours du second cas.

**Et la vraie question à se poser avant d'optimiser : ces six routes devraient-elles exister ?** Une seule route \`/api/dashboard/{userId}\` renverrait tout en un aller-retour — 500 ms au lieu de 1 000, et un seul point de défaillance à gérer. Le sur-découpage d'API est un problème de conception que le parallélisme masque sans le résoudre.`,
        },
      ],
    },
    finalExercise: {
      title: "Tableau de bord temps réel",
      duration: "5 à 8 h",
      covers: ["js-1", "js-2", "js-3"],
      brief: `Consommer une API publique et afficher des données qui se rafraîchissent, **sans framework**.

Cet exercice **rassemble les 3 leçons du module** — ES6+ et méthodes de tableaux (leçon 1), DOM et événements (leçon 2), fetch et asynchrone (leçon 3).

Le faire sans framework est le but, pas une contrainte arbitraire : tu vas réimplémenter à la main l'état, le rendu et la mise à jour. Quand tu ouvriras React au module suivant, tu sauras exactement quel problème il résout — au lieu d'apprendre une syntaxe magique.`,
      dataset: `Choisis une API publique sans authentification :

- **GitHub** — \`https://api.github.com/search/repositories?q=machine+learning&sort=stars\`
- **Open-Meteo** — météo, sans clé : \`https://api.open-meteo.com/v1/forecast?latitude=45.5&longitude=-73.6&hourly=temperature_2m\`
- **REST Countries** — \`https://restcountries.com/v3.1/all\`

Prends-en une dont le sujet t'intéresse : tu vas passer plusieurs heures dessus.`,
      steps: [
        "**Récupération asynchrone** en `async/await`, avec vérification de `response.ok` — `fetch` ne lève pas d'exception sur un 404. (leçon 3)",
        "**Les trois états visibles à l'écran** : chargement, succès, erreur. Avec des messages d'erreur qui disent quoi faire, pas « une erreur est survenue ». (leçon 3)",
        "**Recherche avec anti-rebond (debounce) écrit à la main** — pas de bibliothèque. Une frappe de 10 caractères doit déclencher une seule requête, pas dix. (leçons 1 et 2)",
        "**Tri et filtres sans rechargement**, en gardant la séparation état / rendu : une action modifie l'état, puis le rendu redessine. (leçons 1 et 2)",
        "**Cache en localStorage avec expiration** — les données sont conservées avec leur horodatage et rechargées si elles ont plus de N minutes. (leçons 2 et 3)",
        "**Un seul écouteur par comportement**, par délégation — pas un écouteur par carte. Vérifie-le en comptant tes `addEventListener`. (leçon 2)",
      ],
      checklist: [
        "fetch vérifie response.ok — je ne compte pas sur try/catch seul pour les 404",
        "Le bouton se réactive même en cas d'erreur (finally), l'interface ne reste jamais bloquée",
        "Mon debounce est écrit à la main et je peux expliquer ligne par ligne ce qu'il fait",
        "Je n'ai pas un écouteur par élément de liste — j'ai compté",
        "Mon cache expire : je stocke un horodatage à côté des données",
        "L'état et le rendu sont séparés : aucune action ne touche le DOM directement",
      ],
      selfCheck: `Le vrai test : **coupe ta connexion internet en plein usage, puis rebranche-la.**

Ton application doit afficher un message clair, laisser l'interface utilisable, et se remettre à fonctionner à la reconnexion sans recharger la page. La plupart des projets d'apprentissage se figent définitivement à la première erreur réseau — parce que le bouton n'a jamais été réactivé.

Deuxième test, plus dur : **fais tourner l'application pendant dix minutes en filtrant sans arrêt**, puis regarde la mémoire dans les outils de développement. Si elle grimpe sans jamais redescendre, tu as une fuite — probablement des écouteurs accumulés.`,
    },
    quizExtra: [
      {
        q: "Que fait `fetch('/api/x')` si le serveur répond 404 ?",
        options: [
          "Elle lève une exception attrapée par try/catch",
          "Elle réussit : la promesse est tenue avec une réponse dont response.ok vaut false",
          "Elle retourne null",
          "Elle réessaie automatiquement",
        ],
        answer: 1,
        explain:
          "C'est le piège n°1 de fetch : un try/catch seul ne détecte PAS les erreurs HTTP. La promesse n'est rejetée que si la requête n'aboutit pas du tout — réseau coupé, DNS — et c'est alors un TypeError. Il faut donc tester response.ok explicitement, ce qui permet en prime de distinguer « le serveur a répondu une erreur » de « je n'ai pas pu joindre le serveur ».",
      },
      {
        q: "Pourquoi mettre la réactivation d'un bouton dans un bloc `finally` plutôt que dans le `try` ?",
        options: [
          "Pour que le code soit plus lisible",
          "Parce que finally s'exécute dans tous les cas : sans lui, une erreur laisse le bouton désactivé pour toujours",
          "Parce que try ne peut pas contenir de manipulation du DOM",
          "Parce que finally s'exécute avant le catch",
        ],
        answer: 1,
        explain:
          "C'est un bug extrêmement courant : la requête échoue, le bouton reste grisé, l'utilisateur est bloqué et doit recharger la page. Tout ce qui doit se produire quel que soit le résultat — réactiver un contrôle, masquer un indicateur de chargement, fermer une connexion — appartient au finally.",
      },
      {
        q: "Six `await fetch()` à la suite prennent 3 secondes. Pourquoi ?",
        options: [
          "Le serveur est saturé",
          "Chaque await suspend l'exécution jusqu'à la réponse : les requêtes partent en série au lieu de partir ensemble",
          "fetch limite à une requête par seconde",
          "Le navigateur bride les requêtes simultanées",
        ],
        answer: 1,
        explain:
          "Six requêtes de 500 ms enchaînées font 3 s ; lancées ensemble avec Promise.all elles font 500 ms. La question à se poser devant une suite d'await : la ligne N a-t-elle besoin du résultat de la ligne N-1 ? Si non, elles doivent partir ensemble. Et si une seule dépend d'une autre, on fait deux vagues.",
      },
      {
        q: "Quelle est la différence entre Promise.all et Promise.allSettled ?",
        options: [
          "allSettled est plus rapide",
          "all rejette dès la première erreur et tu perds tous les résultats ; allSettled attend tout et te dit pour chacun s'il a réussi",
          "all ne fonctionne qu'avec fetch",
          "allSettled exécute les promesses en série",
        ],
        answer: 1,
        explain:
          "Le choix dépend du besoin. Promise.all quand tout est indispensable et qu'un échec doit tout annuler. Promise.allSettled quand un affichage partiel vaut mieux que rien — cas d'un tableau de bord : si le classement est en panne, on veut quand même afficher le profil et la progression.",
      },
      {
        q: "Une liste de 500 éléments avec un addEventListener par bouton. Quel est le problème principal ?",
        options: [
          "Le code est simplement plus verbeux",
          "500 écouteurs et 500 closures à recréer à chaque rendu, avec fuite mémoire — un seul écouteur délégué suffirait",
          "addEventListener est limité à 100 par page",
          "Les événements ne se déclenchent plus au-delà de 200 éléments",
        ],
        answer: 1,
        explain:
          "Chaque écouteur alloue une closure qui capture l'objet. Après trente filtrages, on accumule des milliers de closures orphelines — d'où une page de plus en plus lente sans erreur visible. La délégation résout ça à la racine : un écouteur sur un conteneur stable, et l'identifiant qui voyage dans le DOM via data-id plutôt que d'être capturé. Bonus : ça marche pour les éléments ajoutés plus tard.",
      },
      {
        q: "Pourquoi construire les éléments dans un DocumentFragment avant de les insérer ?",
        options: [
          "Pour que le code soit plus court",
          "Parce que chaque insertion dans le document affiché peut déclencher un recalcul de mise en page : le fragment transforme N reflows en un seul",
          "Parce que createElement ne fonctionne pas directement sur le document",
          "Pour éviter les failles XSS",
        ],
        answer: 1,
        explain:
          "Cinq cents appendChild sur un élément déjà attaché bloquent le fil principal — c'est le figement de la page. Construire hors du document puis insérer une fois fait passer un rendu de 1100 ms à 35 ms. C'est la même idée que la vectorisation NumPy du parcours ML : une opération groupée bat N opérations unitaires.",
      },
    ],
  },

  // ══ TYPESCRIPT ════════════════════════════════════════════════════════════
  typescript: {
    lessons: {
      "ts-1": [
        {
          id: "ts-1-a",
          kind: "application",
          title: "Typer un module de cours",
          statement: `Écris les types d'un module de formation :

1. un type \`Niveau\` limité à \`"debutant" | "intermediaire" | "avance"\`
2. une interface \`Lecon\` : \`id\`, \`titre\`, \`duree\`, \`contenu\`, et \`terminee\` **optionnelle**
3. une interface \`Module\` : \`id\`, \`titre\`, \`niveau\`, un tableau de \`Lecon\`, et une icône
4. une fonction \`dureeTotale(module: Module): number\` qui additionne les durées

Puis **fais échouer le compilateur volontairement** de trois façons différentes, et note le message d'erreur à chaque fois.

Le point 5 est le plus instructif : apprendre à lire les erreurs de TypeScript vaut plus que connaître sa syntaxe.`,
          hint: `Un type littéral (\`"a" | "b"\`) restreint les valeurs autorisées, pas seulement le type. Le \`?\` après un nom de propriété la rend optionnelle — la propriété devient alors de type \`T | undefined\`, ce que TypeScript t'obligera à gérer.`,
          solution: `\`\`\`typescript
type Niveau = "debutant" | "intermediaire" | "avance";

interface Lecon {
  id: string;
  titre: string;
  duree: number;          // en minutes
  contenu: string;
  terminee?: boolean;     // optionnelle : boolean | undefined
}

interface Module {
  id: string;
  titre: string;
  niveau: Niveau;
  icone: string;
  lecons: Lecon[];
}

function dureeTotale(module: Module): number {
  return module.lecons.reduce((total, l) => total + l.duree, 0);
}

// ── Trois erreurs volontaires ────────────────────────────────────────────

const m: Module = {
  id: "ts", titre: "TypeScript", niveau: "expert",   // ❌ 1
  icone: "🔷", lecons: [],
};
// Type '"expert"' is not assignable to type 'Niveau'.

const l: Lecon = { id: "ts-1", titre: "Types", duree: "40 min", contenu: "" };  // ❌ 2
// Type 'string' is not assignable to type 'number'.

const l2: Lecon = { id: "ts-1", titre: "Types", duree: 40 };                    // ❌ 3
// Property 'contenu' is missing in type '{ … }' but required in type 'Lecon'.
\`\`\`

**Le type littéral \`Niveau\` est ce qui rend TypeScript utile ici.** Avec \`niveau: string\`, la faute de frappe \`"expert"\` passerait à la compilation et casserait silencieusement à l'exécution — par exemple en cherchant \`LEVELS["expert"]\` qui vaut \`undefined\`. L'union ferme la porte : seules trois valeurs existent, et ton éditeur les propose en autocomplétion.

**Le \`?\` a une conséquence qu'on sous-estime** : \`terminee\` devient \`boolean | undefined\`. TypeScript refusera \`if (lecon.terminee === true)\` sans problème, mais te forcera à gérer le cas \`undefined\` partout où ça compte. C'est exactement le but : la propriété manquante devient visible dans le code au lieu de produire un bug.

**Interface ou type ?** Pour décrire la forme d'un objet, les deux fonctionnent. \`interface\` peut être étendue et fusionnée par déclarations successives, ce qui est utile pour des bibliothèques ; \`type\` gère en plus les unions, les intersections et les types calculés. En pratique : \`interface\` pour les objets, \`type\` pour tout le reste — et la cohérence dans un projet compte plus que le choix lui-même.

**Et lire les erreurs est la vraie compétence.** TypeScript dit toujours ce qu'il attendait et ce qu'il a reçu. Les messages sont longs mais suivent une structure fixe : commence toujours par la **dernière** ligne, c'est souvent là qu'est la cause.`,
        },
        {
          id: "ts-1-b",
          kind: "blanche",
          title: "Les trois bugs que le typage révèle",
          statement: `**Page blanche.** Migration et démonstration.

Ce code JavaScript est en production. Il contient **au moins trois bugs latents** :

\`\`\`javascript
function calculerProgression(utilisateur, modules) {
  const total = modules.reduce((n, m) => n + m.lecons.length, 0);
  const faites = utilisateur.leconsTerminees.length;
  const pourcentage = (faites / total) * 100;

  return {
    pourcentage: pourcentage.toFixed(1),
    restantes: total - faites,
    niveau: NIVEAUX[utilisateur.niveau].label,
    prochainBadge: BADGES.find((b) => b.seuil > faites).nom,
  };
}
\`\`\`

1. ajoute les types — sans modifier la logique
2. note **chaque** erreur que le compilateur remonte
3. classe-les : lesquelles étaient de vrais bugs, lesquelles sont du bruit ?
4. corrige les vrais bugs
5. dis ce que TypeScript **n'aurait pas** attrapé ici — il y a au moins un problème qui lui échappe

**Le point 5 est le plus important.** TypeScript n'est pas un filet complet, et croire l'inverse est dangereux.`,
          hint: `Regarde ce qui peut valoir \`undefined\` : un \`find\` qui ne trouve rien, un accès à un objet par une clé dynamique, une division. Active \`strict: true\` et \`noUncheckedIndexedAccess\` dans le tsconfig — la seconde option est celle qui révèle le plus.`,
          solution: `**1 et 2. La version typée, et ce que le compilateur remonte**

\`\`\`typescript
interface Utilisateur { niveau: string; leconsTerminees: string[]; }
interface Module { lecons: { id: string }[]; }
interface Badge { seuil: number; nom: string; }

declare const NIVEAUX: Record<string, { label: string }>;
declare const BADGES: Badge[];

function calculerProgression(utilisateur: Utilisateur, modules: Module[]) {
  const total = modules.reduce((n, m) => n + m.lecons.length, 0);
  const faites = utilisateur.leconsTerminees.length;
  const pourcentage = (faites / total) * 100;

  return {
    pourcentage: pourcentage.toFixed(1),
    restantes: total - faites,
    niveau: NIVEAUX[utilisateur.niveau].label,        // ❌ possibly 'undefined'
    prochainBadge: BADGES.find((b) => b.seuil > faites).nom,  // ❌ possibly 'undefined'
  };
}
\`\`\`

**3. Le tri entre vrais bugs et bruit**

**Bug réel n°1 — \`BADGES.find(...).nom\`.** \`find\` retourne \`Badge | undefined\`. Quand l'utilisateur a terminé toutes les leçons, aucun badge n'a de seuil supérieur : \`find\` retourne \`undefined\` et l'accès à \`.nom\` **plante**. Le bug se déclenche exactement au moment le plus visible — quand un utilisateur termine le parcours.

**Bug réel n°2 — \`NIVEAUX[utilisateur.niveau]\`.** \`niveau\` est typé \`string\`, donc n'importe quelle chaîne. Une valeur absente de \`NIVEAUX\` donne \`undefined\`, et \`.label\` plante. Avec \`noUncheckedIndexedAccess\`, TypeScript le signale ; sans cette option, il fait confiance au \`Record\` et laisse passer.

**Bug réel n°3 — la division par \`total\`.** Si \`modules\` est vide, \`total\` vaut 0 et \`pourcentage\` vaut \`NaN\`. \`NaN.toFixed(1)\` retourne \`"NaN"\`, affiché tel quel dans l'interface. **TypeScript ne dit rien** : \`NaN\` est un \`number\` parfaitement valide.

**Bruit** : le fait que \`pourcentage\` soit un \`string\` en sortie (à cause de \`toFixed\`) n'est pas un bug, mais c'est un piège pour l'appelant, qui pourrait vouloir le comparer numériquement.

**4. La version corrigée**

\`\`\`typescript
type Niveau = "debutant" | "intermediaire" | "avance";

interface Utilisateur { niveau: Niveau; leconsTerminees: string[]; }

function calculerProgression(utilisateur: Utilisateur, modules: Module[]) {
  const total = modules.reduce((n, m) => n + m.lecons.length, 0);
  const faites = utilisateur.leconsTerminees.length;
  const pourcentage = total === 0 ? 0 : (faites / total) * 100;   // bug 3

  const prochain = BADGES.find((b) => b.seuil > faites);           // bug 1

  return {
    pourcentage: Number(pourcentage.toFixed(1)),
    restantes: Math.max(0, total - faites),
    niveau: NIVEAUX[utilisateur.niveau].label,                     // bug 2 : Niveau, plus string
    prochainBadge: prochain?.nom ?? "Tous les badges obtenus",
  };
}
\`\`\`

**5. Ce que TypeScript n'attrape pas — et c'est le point de l'exercice**

**Le \`NaN\`.** Une division par zéro produit un \`number\` valide. Le typage ne dit rien des **valeurs**, seulement des **formes**.

**La logique métier fausse.** Si \`leconsTerminees\` contenait des doublons, \`faites\` dépasserait \`total\` et \`restantes\` deviendrait négatif. TypeScript est parfaitement satisfait — c'est un nombre.

**Et surtout : les données venues de l'extérieur.** Si \`utilisateur\` provient d'un \`fetch\`, écrire \`const u: Utilisateur = await r.json()\` est une **promesse non vérifiée**. \`json()\` retourne \`any\` ; l'annotation ne valide rien à l'exécution. Le serveur peut renvoyer n'importe quoi, TypeScript compile, et ça casse en production.

**C'est la limite fondamentale : TypeScript disparaît à la compilation.** À l'exécution, il ne reste que du JavaScript. Toute donnée franchissant une frontière — API, formulaire, localStorage, variable d'environnement — doit être **validée à l'exécution**. C'est exactement le rôle de Zod, au programme de la leçon 4.`,
        },
      ],
      "ts-2": [
        {
          id: "ts-2-a",
          kind: "application",
          title: "Une fonction générique et les types utilitaires",
          statement: `1. Écris \`trouverParId<T>\` qui fonctionne avec **n'importe quel** objet possédant un \`id\`, en préservant le type de retour. Teste-la sur un tableau de \`Module\` puis de \`Lecon\` : ton éditeur doit connaître le type exact dans les deux cas.

2. À partir de cette interface :
\`\`\`typescript
interface Utilisateur {
  id: string; email: string; nom: string; xp: number; avatarUrl: string;
}
\`\`\`
construis avec les **types utilitaires** :
- \`MiseAJour\` — toutes les propriétés optionnelles sauf \`id\`
- \`ProfilPublic\` — uniquement \`nom\` et \`avatarUrl\`
- \`SansAvatar\` — tout sauf \`avatarUrl\`
- \`ParId\` — un dictionnaire \`{ [id: string]: Utilisateur }\``,
          hint: `Pour la contrainte générique : \`<T extends { id: string }>\`. Les utilitaires à combiner sont \`Partial\`, \`Pick\`, \`Omit\` et \`Record\` — et rien n'empêche de les imbriquer.`,
          solution: `\`\`\`typescript
// 1. Générique contraint : T doit avoir un id, mais peut avoir tout le reste
function trouverParId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

const mod = trouverParId(MODULES, "typescript");   // Module | undefined
const lec = trouverParId(LECONS, "ts-1");          // Lecon  | undefined
// Le type est PRÉSERVÉ : mod?.lecons est connu, lec?.duree aussi

// 2. Les types utilitaires
type MiseAJour   = Partial<Omit<Utilisateur, "id">> & Pick<Utilisateur, "id">;
type ProfilPublic = Pick<Utilisateur, "nom" | "avatarUrl">;
type SansAvatar   = Omit<Utilisateur, "avatarUrl">;
type ParId        = Record<string, Utilisateur>;
\`\`\`

**Le générique préserve le type, \`any\` le détruit.** Avec \`(items: any[]): any\`, la fonction compile mais tu perds toute autocomplétion et toute vérification en aval : \`mod.lecons\` ne serait plus contrôlé, et une faute de frappe passerait. Le \`<T>\` dit « je ne sais pas quel type, mais c'est **le même** en entrée et en sortie ».

**La contrainte \`extends { id: string }\`** est ce qui rend la fonction utilisable : sans elle, TypeScript refuse \`item.id\`, puisque rien ne garantit que \`T\` possède cette propriété. La contrainte est un contrat minimal — « donne-moi n'importe quoi, du moment que ça a un id ».

**\`MiseAJour\` combine trois utilitaires** parce que le besoin est réel : dans une requête PATCH, tous les champs sont optionnels **sauf** l'identifiant, qui dit quoi modifier. \`Partial<Utilisateur>\` seul rendrait \`id\` optionnel, ce qui n'a pas de sens.

**\`ProfilPublic\` avec \`Pick\` a une valeur de sécurité**, pas seulement de confort : une fonction typée \`ProfilPublic\` **ne peut pas** renvoyer l'e-mail par accident. Le type devient une garantie de non-fuite de données. C'est bien plus solide qu'un commentaire « attention, ne pas exposer l'email ».

**Ces types sont dérivés, pas dupliqués.** Ajouter un champ à \`Utilisateur\` met automatiquement à jour \`SansAvatar\` et \`MiseAJour\`. Redéclarer les interfaces à la main créerait une divergence silencieuse dès la première évolution.`,
        },
        {
          id: "ts-2-b",
          kind: "blanche",
          title: "Éliminer tous les any",
          statement: `**Page blanche.**

\`\`\`typescript
function fusionner(cible: any, source: any): any {
  for (const cle in source) {
    if (typeof source[cle] === "object" && source[cle] !== null) {
      cible[cle] = fusionner(cible[cle] ?? {}, source[cle]);
    } else {
      cible[cle] = source[cle];
    }
  }
  return cible;
}

function extraire(reponse: any, chemin: string): any {
  return chemin.split(".").reduce((obj, cle) => obj?.[cle], reponse);
}
\`\`\`

Retire **tous** les \`any\` sans casser les appelants, et sans les remplacer mécaniquement par \`unknown\` — il faut que les fonctions restent utilisables.

Pour chacune :
1. quel type exprime réellement l'intention ?
2. écris la version typée
3. montre un appel qui compilait avant et qui est maintenant refusé — et explique pourquoi c'est une bonne nouvelle

**Puis réponds** : dans quel cas \`any\` reste-t-il légitime ? Il y en a.`,
          hint: `Pour \`fusionner\`, le retour combine les deux entrées : cherche du côté des génériques et des intersections. Pour \`extraire\`, le type de retour ne peut pas être connu à la compilation — c'est le cas d'usage exact de \`unknown\` plus une garde de type chez l'appelant.`,
          solution: `**1. \`fusionner\` — génériques et intersection**

\`\`\`typescript
function fusionner<C extends object, S extends object>(cible: C, source: S): C & S {
  const resultat: Record<string, unknown> = { ...cible };

  for (const [cle, valeur] of Object.entries(source)) {
    const existant = resultat[cle];
    if (valeur !== null && typeof valeur === "object" && !Array.isArray(valeur)) {
      resultat[cle] = fusionner(
        (existant !== null && typeof existant === "object" ? existant : {}) as object,
        valeur as object
      );
    } else {
      resultat[cle] = valeur;
    }
  }
  return resultat as C & S;
}

const config = fusionner({ port: 3000 }, { hote: "localhost" });
config.port;   // number ✅
config.hote;   // string ✅
config.debug;  // ❌ Property 'debug' does not exist
\`\`\`

L'intersection \`C & S\` exprime exactement l'intention : le résultat a **les propriétés des deux**. Avec \`any\`, \`config.debug\` compilait et valait \`undefined\` à l'exécution — une faute de frappe invisible jusqu'au crash.

**2. \`extraire\` — le cas d'usage d'\`unknown\`**

\`\`\`typescript
function extraire(reponse: unknown, chemin: string): unknown {
  return chemin.split(".").reduce<unknown>(
    (obj, cle) =>
      obj !== null && typeof obj === "object" ? (obj as Record<string, unknown>)[cle] : undefined,
    reponse
  );
}

// L'appelant est CONTRAINT de vérifier
const brut = extraire(reponse, "data.user.name");
// brut.toUpperCase();               // ❌ 'brut' is of type 'unknown'

if (typeof brut === "string") {
  brut.toUpperCase();                // ✅ après la garde
}
\`\`\`

Le chemin est une chaîne construite à l'exécution : **aucun système de types ne peut savoir** ce qu'il désigne. \`unknown\` est la réponse honnête — « je ne sais pas, vérifie avant d'utiliser ».

**3. L'appel désormais refusé, et pourquoi c'est bien**

\`\`\`typescript
const nom = extraire(reponse, "data.user.name");
nom.toUpperCase();     // compilait avec any, refusé avec unknown
\`\`\`

Avec \`any\`, ce code plantait à l'exécution dès que le chemin était absent — \`Cannot read properties of undefined\`. Avec \`unknown\`, l'erreur remonte **à l'écriture**, à l'endroit exact où la vérification manque.

**La différence entre \`any\` et \`unknown\`, en une phrase** : \`any\` désactive le vérificateur, \`unknown\` **oblige** à prouver le type avant usage. Les deux acceptent n'importe quelle valeur en entrée ; seul \`unknown\` protège la sortie.

**Quand \`any\` reste légitime** :

**Migrer progressivement un gros projet JavaScript.** Mettre \`any\` partout puis resserrer fichier par fichier est une stratégie valable — bien meilleure que de tout bloquer pendant trois semaines.

**Les types de bibliothèques tierces mal ou pas typées**, en attendant de fournir une déclaration correcte.

**Un cas où tu as déjà prouvé le type par ailleurs** et où contourner le vérificateur coûte moins qu'un cast alambiqué — mais alors on écrit un commentaire expliquant pourquoi.

Dans le doute, **\`unknown\` est le défaut**. \`any\` devrait être un choix conscient, jamais une facilité — c'est pour ça que la règle \`no-explicit-any\` existe dans la plupart des configurations ESLint.`,
        },
      ],
      "ts-3": [
        {
          id: "ts-3-a",
          kind: "application",
          title: "Typer un composant React",
          statement: `Écris un composant \`CarteModule\` correctement typé :

1. une interface de props avec des champs obligatoires et optionnels, dont deux fonctions de rappel — l'une sans argument, l'autre avec
2. \`useState\` typés : un nombre, un tableau d'objets, et une valeur qui peut être \`null\`
3. un \`useRef\` sur un \`<input>\`, avec l'accès sécurisé au \`.current\`
4. un gestionnaire d'événement typé sur un \`onChange\`
5. le composant doit accepter \`children\`

Puis provoque volontairement deux erreurs de props et lis les messages.`,
          hint: `Une fonction de rappel se type \`() => void\` ou \`(id: string) => void\`. Pour \`useRef\` sur un élément du DOM : \`useRef<HTMLInputElement>(null)\` — et l'accès se fait avec \`?.\` puisque la référence vaut \`null\` avant le montage. Pour les enfants : \`children: React.ReactNode\`.`,
          solution: `\`\`\`tsx
import { useState, useRef, type ChangeEvent, type ReactNode } from "react";

type Niveau = "debutant" | "intermediaire" | "avance";

interface Lecon { id: string; titre: string; }

interface CarteModuleProps {
  id: string;
  titre: string;
  niveau: Niveau;
  icone: string;
  terminee?: boolean;                       // optionnelle
  onOuvrir?: () => void;                    // rappel sans argument
  onTerminer?: (id: string) => void;        // rappel avec argument
  children?: ReactNode;                     // contenu imbriqué
}

export function CarteModule({
  id, titre, niveau, icone,
  terminee = false,
  onOuvrir,
  onTerminer,
  children,
}: CarteModuleProps) {
  const [score, setScore] = useState(0);                        // number, inféré
  const [lecons, setLecons] = useState<Lecon[]>([]);            // annotation nécessaire
  const [selection, setSelection] = useState<number | null>(null);
  const champRef = useRef<HTMLInputElement>(null);

  const surSaisie = (e: ChangeEvent<HTMLInputElement>) => {
    setScore(Number(e.target.value));
  };

  return (
    <div className="card p-6" onClick={onOuvrir}>
      <span>{icone}</span>
      <h3>{titre}</h3>
      <span>{niveau}</span>

      <input ref={champRef} type="number" onChange={surSaisie} />
      <button onClick={() => champRef.current?.focus()}>Focus</button>

      {onTerminer && <button onClick={() => onTerminer(id)}>Terminer</button>}
      {terminee && <span>✅</span>}
      {children}
    </div>
  );
}

// ── Erreurs volontaires ──────────────────────────────────────────────────
// <CarteModule id="ts" titre="TS" niveau="expert" icone="🔷" />
//   Type '"expert"' is not assignable to type 'Niveau'.
// <CarteModule id="ts" titre="TS" icone="🔷" />
//   Property 'niveau' is missing but required in type 'CarteModuleProps'.
\`\`\`

**\`useState(0)\` n'a pas besoin d'annotation** — TypeScript infère \`number\` depuis la valeur initiale. En revanche \`useState([])\` infère \`never[]\`, un tableau qui n'accepte rien : d'où l'annotation \`useState<Lecon[]>([])\`. Même chose pour \`useState(null)\`, qui infère \`null\` et refuserait ensuite un nombre — d'où \`useState<number | null>(null)\`.

**La règle : annote quand la valeur initiale est plus pauvre que ce que l'état contiendra.** Tableau vide, \`null\`, objet vide.

**\`champRef.current?.focus()\`** : la référence vaut \`null\` avant le montage du composant. Le \`?.\` n'est pas de la prudence excessive, c'est TypeScript qui refuse l'accès sans lui — et il a raison, un appel dans un gestionnaire précoce planterait.

**Typer les props transforme le composant en contrat.** L'appelant obtient l'autocomplétion, les erreurs à l'écriture, et la documentation intégrée : survoler \`<CarteModule>\` dans l'éditeur affiche toutes les props avec leurs types. C'est ce qui rend un composant partageable dans une équipe.

**\`ReactNode\` plutôt que \`JSX.Element\`** pour \`children\` : \`ReactNode\` accepte aussi une chaîne, un nombre, un tableau, \`null\` — tout ce que React sait afficher.`,
        },
        {
          id: "ts-3-b",
          kind: "blanche",
          title: "Un composant, deux formes exclusives",
          statement: `**Page blanche.** Modélisation de types.

Tu dois écrire un composant \`Action\` qui rend **soit un lien, soit un bouton** :

- en mode lien : il **doit** recevoir \`href\`, et **ne doit pas** recevoir \`onClick\`
- en mode bouton : il **doit** recevoir \`onClick\`, et **ne doit pas** recevoir \`href\`

Une première version naïve serait :

\`\`\`tsx
interface ActionProps {
  label: string;
  href?: string;
  onClick?: () => void;
}
\`\`\`

1. explique ce que cette version **autorise à tort** — trouve trois appels absurdes qu'elle laisse compiler
2. écris la version qui rend ces trois appels impossibles
3. montre les messages d'erreur obtenus
4. explique comment TypeScript sait, **à l'intérieur** du composant, laquelle des deux formes il manipule

**Le nom de la technique n'est pas donné.** Cherche comment exprimer « soit A, soit B, jamais les deux ».`,
          hint: `Le type d'un composant n'est pas obligé d'être une interface unique : il peut être une **union** de deux formes. Ajoute à chaque forme un champ qui les distingue, ou utilise \`never\` pour interdire une propriété dans l'une des branches.`,
          solution: `**1. Ce que la version naïve autorise à tort**

\`\`\`tsx
<Action label="Envoyer" />                                  // ni href ni onClick : inerte
<Action label="Envoyer" href="/a" onClick={() => {}} />     // les deux : lequel gagne ?
<Action label="Envoyer" href={undefined} />                 // href présent mais vide
\`\`\`

Tous les trois compilent, et tous les trois sont des bugs. Le premier produit un élément qui ne fait rien, le deuxième un comportement indéterminé, le troisième un lien mort. **Le type ne modélise pas la réalité** : il dit « ces deux propriétés sont optionnelles et indépendantes », alors qu'elles sont en fait **exclusives et obligatoires**.

**2. La version correcte — une union discriminée**

\`\`\`tsx
type ActionProps =
  | { label: string; href: string; onClick?: never }
  | { label: string; onClick: () => void; href?: never };

export function Action(props: ActionProps) {
  if ("href" in props) {
    return <a href={props.href} className="btn">{props.label}</a>;
  }
  return <button onClick={props.onClick} className="btn">{props.label}</button>;
}
\`\`\`

Variante avec un champ discriminant explicite, souvent plus lisible quand les formes se multiplient :

\`\`\`tsx
type ActionProps =
  | { variante: "lien";   label: string; href: string }
  | { variante: "bouton"; label: string; onClick: () => void };

export function Action(props: ActionProps) {
  switch (props.variante) {
    case "lien":   return <a href={props.href}>{props.label}</a>;
    case "bouton": return <button onClick={props.onClick}>{props.label}</button>;
  }
}
\`\`\`

**3. Les erreurs obtenues**

\`\`\`
<Action label="Envoyer" />
  Property 'href' is missing … | Property 'onClick' is missing …

<Action label="Envoyer" href="/a" onClick={() => {}} />
  Type '() => void' is not assignable to type 'undefined'.
\`\`\`

Les trois appels absurdes sont maintenant refusés **à l'écriture**.

**4. Comment TypeScript sait, à l'intérieur, quelle forme il manipule**

C'est le **rétrécissement de type** (*narrowing*). Le test \`if ("href" in props)\` ou le \`switch\` sur \`props.variante\` élimine une branche de l'union. Dans le bloc \`if\`, TypeScript sait que \`props\` est la première forme : \`props.href\` est un \`string\` — pas \`string | undefined\` — et \`props.onClick\` n'existe pas.

C'est ce qui rend l'union discriminée utilisable : **le type se rétrécit tout seul** au fur et à mesure des vérifications, sans le moindre cast.

**Le \`onClick?: never\`** est l'astuce qui interdit la propriété dans l'autre branche : \`never\` n'accepte aucune valeur, donc fournir un \`onClick\` en mode lien est refusé. Le \`?\` permet simplement de ne pas l'écrire du tout.

---

**Le principe général : rends les états impossibles inexprimables.**

C'est l'une des idées les plus rentables du typage. Plutôt que de valider à l'exécution qu'une combinaison de props est cohérente — puis d'écrire un test pour ça — on construit un type dans lequel la combinaison incohérente **ne peut pas s'écrire**.

Le motif se réutilise partout, notamment pour l'état d'un chargement :

\`\`\`typescript
type Etat<T> =
  | { statut: "chargement" }
  | { statut: "succes"; donnees: T }
  | { statut: "erreur";  message: string };
\`\`\`

Impossible d'avoir des données **et** une erreur, ou un état de succès sans données. Les trois états du module JavaScript, rendus vérifiables par le compilateur.`,
        },
      ],
      "ts-4": [
        {
          id: "ts-4-a",
          kind: "application",
          title: "Valider une requête avec Zod",
          statement: `Ajoute TypeScript et Zod à une API Express de prédictions :

1. un schéma Zod pour le corps de \`POST /api/predict\` — un tableau de nombres \`features\` de longueur 4 à 20, et un \`modelVersion\` optionnel au format \`v1\`, \`v2\`…
2. **infère** le type TypeScript depuis le schéma, sans le réécrire
3. un middleware de validation réutilisable qui renvoie un 400 avec les erreurs détaillées
4. le gestionnaire de route typé, où \`req.body\` est déjà validé
5. teste avec un corps valide, un corps sans \`features\`, et un \`features\` contenant une chaîne`,
          hint: `\`z.infer<typeof schema>\` produit le type TypeScript correspondant au schéma — une seule source de vérité, jamais de divergence. Pour le format de version : \`z.string().regex(/^v\\d+$/)\`.`,
          solution: `\`\`\`typescript
import express, { type Request, type Response, type NextFunction } from "express";
import { z } from "zod";

// ── 1. Le schéma : la SEULE source de vérité ─────────────────────────────
const PredictionSchema = z.object({
  features: z.array(z.number()).min(4).max(20),
  modelVersion: z.string().regex(/^v\\d+$/).optional(),
});

// ── 2. Le type est INFÉRÉ, pas réécrit ───────────────────────────────────
type PredictionBody = z.infer<typeof PredictionSchema>;
// { features: number[]; modelVersion?: string }

// ── 3. Middleware de validation réutilisable ─────────────────────────────
const valider =
  (schema: z.ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const resultat = schema.safeParse(req.body);
    if (!resultat.success) {
      return res.status(400).json({
        erreur: "Corps de requête invalide",
        details: resultat.error.issues.map((i) => ({
          champ: i.path.join("."),
          message: i.message,
        })),
      });
    }
    req.body = resultat.data;      // données validées ET converties
    next();
  };

// ── 4. La route : req.body est déjà propre ───────────────────────────────
const app = express();
app.use(express.json());

app.post("/api/predict", valider(PredictionSchema), async (req, res) => {
  const { features, modelVersion = "v1" } = req.body as PredictionBody;
  const resultat = await lancerModele(features);
  res.json({ prediction: resultat.valeur, modelVersion });
});
\`\`\`

\`\`\`bash
# Corps valide
curl -X POST localhost:3000/api/predict -H "Content-Type: application/json" \\
     -d '{"features":[1,2,3,4]}'
# {"prediction":0.87,"modelVersion":"v1"}

# features manquant
# {"erreur":"Corps de requête invalide",
#  "details":[{"champ":"features","message":"Required"}]}

# features avec une chaîne
# "details":[{"champ":"features.2","message":"Expected number, received string"}]
\`\`\`

**\`z.infer\` est le point central : une seule déclaration produit la validation à l'exécution ET le type à la compilation.** Écrire une interface TypeScript à côté du schéma créerait deux sources de vérité qui divergeraient à la première évolution — et la divergence serait silencieuse.

**\`safeParse\` plutôt que \`parse\`** : \`parse\` lève une exception, ce qui oblige à un \`try/catch\` autour de chaque route. \`safeParse\` retourne un objet \`{ success, data | error }\` qui se traite comme un flux normal. Dans une API, on préfère toujours la seconde forme.

**Le \`req.body = resultat.data\` n'est pas cosmétique.** Zod ne fait pas que valider : il **transforme**. Il retire les champs non déclarés, applique les valeurs par défaut, et convertit quand on le lui demande. Réaffecter garantit que la route travaille sur les données nettoyées, pas sur l'entrée brute.

**Le \`i.path.join(".")\`** produit \`"features.2"\` pour le troisième élément du tableau — un message que le client peut afficher à côté du bon champ. Un message d'erreur générique du type « données invalides » oblige l'utilisateur à deviner.

**Le middleware est générique** : il prend n'importe quel schéma. Une fois écrit, tu l'appliques à toutes tes routes, et la validation d'entrée cesse d'être un travail répété.`,
        },
        {
          id: "ts-4-b",
          kind: "blanche",
          title: "Pourquoi l'interface ne protège pas ton API",
          statement: `**Page blanche.** Démonstration.

Un collègue affirme : « on est en TypeScript strict, on n'a pas besoin de Zod — l'interface suffit ».

\`\`\`typescript
interface Inscription {
  email: string;
  age: number;
  role: "user" | "admin";
}

app.post("/api/inscription", (req: Request<{}, {}, Inscription>, res) => {
  creerUtilisateur(req.body);       // req.body est typé Inscription
  res.status(201).json({ ok: true });
});
\`\`\`

**Prouve-lui qu'il a tort**, avec une démonstration exécutable.

1. écris la requête \`curl\` qui casse cette route alors que le code compile parfaitement
2. explique **pourquoi** TypeScript ne peut rien y faire — la raison est fondamentale, pas un oubli
3. montre la version protégée par Zod
4. liste **toutes** les frontières d'une application où le même problème se pose
5. réponds à l'objection « mais on contrôle notre propre frontend »

**Le point 2 est ce qu'il faut vraiment comprendre.** Ce n'est pas une faiblesse de TypeScript, c'est sa nature.`,
          hint: `Demande-toi ce qu'il reste du typage une fois le code compilé et exécuté par Node. Et regarde ce que retourne réellement \`express.json()\` : d'où viennent ces données, et qui les a vérifiées ?`,
          solution: `**1. La requête qui casse tout, alors que le code compile**

\`\`\`bash
curl -X POST localhost:3000/api/inscription \\
  -H "Content-Type: application/json" \\
  -d '{"email": 12345, "age": "trente", "role": "superadmin", "isAdmin": true}'
\`\`\`

Résultat : \`creerUtilisateur\` reçoit un e-mail numérique, un âge textuel, un rôle inexistant, et un champ \`isAdmin\` que personne n'a déclaré — qui finira peut-être en base si l'ORM fait un \`insert\` du corps entier. **Aucune erreur, code 201.**

**2. Pourquoi TypeScript ne peut rien y faire**

**Les types de TypeScript n'existent pas à l'exécution.** La compilation les efface : il ne reste que du JavaScript. \`Request<{}, {}, Inscription>\` est une **annotation**, c'est-à-dire une promesse que le développeur fait au compilateur — pas une vérification.

Et cette promesse porte sur des données que le développeur ne contrôle pas : \`express.json()\` fait un \`JSON.parse\` du corps de la requête, qui retourne \`any\`. Annoter \`any\` avec un type, c'est simplement **affirmer** quelque chose que rien ne garantit.

Ce n'est pas un oubli des concepteurs de TypeScript, c'est son périmètre : il vérifie la cohérence du code que tu écris, pas la conformité des données qui entrent.

**3. La version protégée**

\`\`\`typescript
import { z } from "zod";

const InscriptionSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(13).max(120),
  role: z.enum(["user", "admin"]),
}).strict();          // refuse tout champ non déclaré

type Inscription = z.infer<typeof InscriptionSchema>;

app.post("/api/inscription", (req, res) => {
  const resultat = InscriptionSchema.safeParse(req.body);
  if (!resultat.success) {
    return res.status(400).json({ erreur: resultat.error.issues });
  }
  creerUtilisateur(resultat.data);        // typé ET vérifié
  res.status(201).json({ ok: true });
});
\`\`\`

Le \`.strict()\` est essentiel ici : sans lui, Zod ignore silencieusement \`isAdmin\` — ce qui est déjà mieux que de le laisser passer, mais \`.strict()\` **rejette** la requête, ce qui signale une tentative au lieu de la masquer.

**4. Toutes les frontières concernées**

Le problème est identique partout où une donnée **entre** dans l'application :

- les corps, paramètres et requêtes HTTP entrants
- les réponses des **API externes** — un service tiers change son format sans prévenir
- \`localStorage\` et les cookies — l'utilisateur peut les modifier à la main
- les variables d'environnement — souvent des chaînes vides ou absentes
- les fichiers de configuration et les données lues sur disque
- les messages de files d'attente et de WebSockets
- les résultats de requêtes SQL brutes, si l'ORM ne les type pas

**La règle : toute donnée qui franchit la frontière du programme doit être validée à l'exécution.** À l'intérieur, TypeScript suffit ; à la frontière, il ne peut rien.

**5. L'objection « on contrôle notre frontend »**

Elle est fausse pour quatre raisons :

**Le frontend n'est pas une barrière.** N'importe qui peut appeler ton API avec \`curl\`, Postman, ou en modifiant le JavaScript dans son navigateur. Une validation côté client est une aide à la saisie, jamais une sécurité.

**Ton propre frontend a des bugs.** Un champ mal nommé après un renommage envoie des données malformées, et sans validation le serveur les accepte.

**Les versions se désynchronisent.** Une application mobile installée reste sur une ancienne version du contrat pendant des mois.

**Et le jour où l'API devient publique**, ou qu'un partenaire s'y branche, la validation devient indispensable — mieux vaut qu'elle soit là depuis le début que de l'ajouter sur trente routes en urgence.

---

**La formule à retenir : TypeScript protège le code à la compilation, Zod protège les données à l'exécution.** Ce sont deux problèmes différents, et l'un ne remplace jamais l'autre. C'est exactement pour ça que \`z.infer\` existe : une seule déclaration, les deux protections.`,
        },
      ],
    },
    finalExercise: {
      title: "Migration stricte d'un projet JavaScript",
      duration: "5 à 8 h",
      covers: ["ts-1", "ts-2", "ts-3", "ts-4"],
      brief: `Reprends ton tableau de bord du module JavaScript et passe-le en TypeScript strict, **sans un seul \`any\`**.

Cet exercice **rassemble les 4 leçons du module** — types et interfaces (leçon 1), génériques et utilitaires (leçon 2), typage React (leçon 3), validation à l'exécution avec Zod (leçon 4).

L'intérêt de migrer du code **existant** plutôt que d'écrire du neuf : les erreurs que le compilateur va remonter sont de vrais bugs que tu avais écrits sans le savoir. C'est la meilleure démonstration de ce que sert TypeScript.`,
      dataset: `Ton propre projet du module JavaScript. Si tu ne l'as pas fait, n'importe quel projet JS d'au moins 200 lignes consommant une API fera l'affaire.

Point de départ :
\`\`\`bash
npm install -D typescript @types/node
npx tsc --init
npm install zod
\`\`\``,
      steps: [
        "**Active `strict: true`** dans le `tsconfig.json` et corrige toutes les erreurs. Ajoute aussi `noUncheckedIndexedAccess` — c'est l'option qui révèle le plus de vrais bugs. (leçon 1)",
        "**Type les réponses de l'API et valide-les avec Zod** — `z.infer` pour ne déclarer qu'une fois. Toute donnée qui entre doit être vérifiée à l'exécution. (leçon 4)",
        "**Écris une fonction générique réutilisable** et justifie son intérêt : qu'aurait-on perdu avec `any` ? (leçon 2)",
        "**Remplace tout `any` restant par `unknown` + garde de type.** Si un `any` survit, écris en commentaire pourquoi il est légitime. (leçon 2)",
        "**Modélise ton état de chargement en union discriminée** — chargement, succès, erreur — de façon à ce que « des données ET une erreur » soit inexprimable. (leçon 3)",
        "**Documente 3 bugs que le typage a révélés** : le code d'origine, ce que TypeScript a dit, pourquoi c'était un vrai bug.",
      ],
      checklist: [
        "strict: true est actif et le projet compile sans erreur",
        "Aucun `any` explicite — ou alors accompagné d'un commentaire qui le justifie",
        "Toute donnée venue de l'extérieur passe par un schéma Zod",
        "Mon type d'état rend impossible la combinaison « succès sans données »",
        "Mes types dérivés utilisent Pick/Omit/Partial plutôt que d'être réécrits à la main",
        "J'ai documenté 3 bugs réels que la migration a fait apparaître",
      ],
      selfCheck: `Le vrai test : **envoie à ton API, avec \`curl\`, un corps de requête volontairement absurde** — mauvais types, champs en trop, valeurs hors bornes.

Elle doit répondre 400 avec un message qui dit quel champ pose problème. Si elle répond 200, ou si elle plante avec une erreur 500 illisible, ta validation n'existe pas — quel que soit le nombre d'interfaces que tu as écrites.

C'est la démonstration en une commande de la différence entre « typé » et « validé ».`,
    },
    quizExtra: [
      {
        q: "Ton API est en TypeScript strict et `req.body` est typé. Es-tu protégé contre un corps de requête malformé ?",
        options: [
          "Oui, TypeScript vérifie le type à la réception",
          "Non : les types disparaissent à la compilation — l'annotation est une promesse du développeur, pas une vérification",
          "Oui, à condition d'activer strict: true",
          "Seulement si le client est aussi en TypeScript",
        ],
        answer: 1,
        explain:
          "express.json() fait un JSON.parse qui retourne any ; annoter any avec un type revient à AFFIRMER quelque chose que rien ne garantit. Ce n'est pas un oubli de TypeScript, c'est son périmètre : il vérifie la cohérence du code écrit, pas la conformité des données entrantes. Toute donnée franchissant la frontière du programme — HTTP, API externes, localStorage, variables d'environnement — doit être validée à l'exécution.",
      },
      {
        q: "Quelle est la différence entre `any` et `unknown` ?",
        options: [
          "Aucune, unknown est juste le nom moderne",
          "Les deux acceptent toute valeur en entrée, mais unknown oblige à prouver le type avant de l'utiliser — any désactive le vérificateur",
          "unknown n'accepte que les objets",
          "any est plus performant à la compilation",
        ],
        answer: 1,
        explain:
          "Avec any, `valeur.toUpperCase()` compile et plante à l'exécution. Avec unknown, le compilateur refuse tant qu'une garde — `typeof valeur === \"string\"` — n'a pas rétréci le type. L'erreur remonte à l'écriture, là où la vérification manque. unknown devrait être le défaut ; any un choix conscient, jamais une facilité.",
      },
      {
        q: "`useState([])` dans un composant TypeScript. Quel type est inféré ?",
        options: [
          "any[]",
          "never[] — un tableau qui n'accepte aucun élément, d'où la nécessité d'annoter useState<Lecon[]>([])",
          "unknown[]",
          "object[]",
        ],
        answer: 1,
        explain:
          "TypeScript infère depuis la valeur initiale, et un tableau vide ne contient aucune information de type. Même piège avec useState(null), qui infère null et refusera ensuite un nombre. La règle : annote quand la valeur initiale est plus pauvre que ce que l'état contiendra — tableau vide, null, objet vide.",
      },
      {
        q: "Comment interdire qu'un composant reçoive à la fois `href` et `onClick` ?",
        options: [
          "En rendant les deux optionnels et en vérifiant à l'exécution",
          "Avec une union discriminée : deux formes exclusives, dont une seule peut être satisfaite",
          "En utilisant deux composants séparés, c'est la seule solution",
          "Avec Partial<Props>",
        ],
        answer: 1,
        explain:
          "Deux props optionnelles indépendantes autorisent « ni l'une ni l'autre » et « les deux » — deux bugs. Une union `{href: string; onClick?: never} | {onClick: () => void; href?: never}` rend ces cas inexprimables. Et à l'intérieur, le rétrécissement de type fait que TypeScript sait quelle forme il manipule après un `if (\"href\" in props)`. Principe général : rends les états impossibles inexprimables.",
      },
      {
        q: "À quoi sert `z.infer<typeof MonSchema>` ?",
        options: [
          "À valider les données une seconde fois",
          "À produire le type TypeScript depuis le schéma Zod : une seule source de vérité, validation à l'exécution ET typage à la compilation",
          "À convertir un type TypeScript en schéma Zod",
          "À générer la documentation de l'API",
        ],
        answer: 1,
        explain:
          "Écrire une interface à côté du schéma créerait deux sources de vérité qui divergeraient à la première évolution — silencieusement. Avec z.infer, une seule déclaration produit les deux protections : Zod vérifie à l'exécution, TypeScript vérifie le code. C'est la réponse exacte à « TypeScript protège le code, Zod protège les données ».",
      },
      {
        q: "Pourquoi préférer `safeParse` à `parse` dans une route d'API ?",
        options: [
          "safeParse est plus rapide",
          "parse lève une exception, ce qui impose un try/catch autour de chaque route ; safeParse retourne { success, data | error } qui se traite comme un flux normal",
          "parse ne fonctionne pas avec les objets imbriqués",
          "safeParse valide plus strictement",
        ],
        answer: 1,
        explain:
          "Dans une API, une entrée invalide n'est pas un cas exceptionnel : c'est un cas nominal qui doit produire un 400 avec un message utile. safeParse en fait un flux de contrôle normal. Et penser à `.strict()` sur le schéma : sans lui, Zod ignore silencieusement les champs non déclarés, alors que les rejeter signale une tentative au lieu de la masquer.",
      },
    ],
  },

  // ══ REACT & NEXT.JS ═══════════════════════════════════════════════════════
  "react-nextjs": {
    lessons: {
      "react-1": [
        {
          id: "react-1-a",
          kind: "application",
          title: "Un composant de quiz avec état",
          statement: `Écris un composant \`QuestionQuiz\` qui reçoit en props une question, un tableau d'options et l'index de la bonne réponse.

1. au clic sur une option, elle se sélectionne visuellement
2. un bouton « Valider » révèle la bonne et la mauvaise réponse, et désactive les options
3. après validation, un message et un bouton « Suivante »
4. le bouton « Valider » est désactivé tant qu'aucune option n'est choisie
5. le composant se réinitialise correctement quand la question change

Le point 5 est celui qui piège tout le monde : passe à la question suivante et regarde si la sélection précédente reste affichée.`,
          hint: `Quand un composant garde un état interne mais que ses props changent, l'état ne se remet pas à zéro tout seul. Deux solutions : une \`key\` différente sur le composant parent, ou une réinitialisation explicite. La première est la plus propre — cherche pourquoi.`,
          solution: `\`\`\`jsx
"use client";
import { useState } from "react";

export function QuestionQuiz({ question, options, reponse, onSuivante }) {
  const [choisie, setChoisie] = useState(null);
  const [validee, setValidee] = useState(false);

  const correcte = choisie === reponse;

  return (
    <div className="card p-6 space-y-4">
      <h3 className="text-lg font-semibold text-white">{question}</h3>

      <div className="space-y-2">
        {options.map((opt, i) => {
          let style = "border-ink-700 hover:border-accent/60";
          if (validee) {
            if (i === reponse) style = "border-emerald-500 bg-emerald-500/10";
            else if (i === choisie) style = "border-rose-500 bg-rose-500/10";
            else style = "border-ink-700 opacity-50";
          } else if (i === choisie) {
            style = "border-accent bg-accent/10";
          }

          return (
            <button
              key={i}
              disabled={validee}
              onClick={() => setChoisie(i)}
              className={\`w-full text-left px-4 py-3 rounded-xl border \${style}\`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!validee ? (
        <button
          onClick={() => setValidee(true)}
          disabled={choisie === null}
          className="btn-primary disabled:opacity-40"
        >
          Valider
        </button>
      ) : (
        <>
          <p>{correcte ? "✅ Correct" : "❌ Incorrect"}</p>
          <button onClick={onSuivante} className="btn-secondary">Suivante</button>
        </>
      )}
    </div>
  );
}
\`\`\`

**Et la réinitialisation, côté parent** :

\`\`\`jsx
<QuestionQuiz
  key={indexCourant}          // ← LA solution du point 5
  question={questions[indexCourant].q}
  options={questions[indexCourant].options}
  reponse={questions[indexCourant].reponse}
  onSuivante={() => setIndexCourant((i) => i + 1)}
/>
\`\`\`

**Le point 5 est le vrai enseignement.** Quand les props changent, React **réutilise** l'instance du composant : l'état interne survit. La question suivante s'affiche donc avec la sélection et la validation de la précédente — bug très courant et difficile à diagnostiquer quand on ne connaît pas le mécanisme.

**Changer la \`key\` force React à démonter l'ancienne instance et à en monter une neuve**, avec un état vierge. C'est l'usage de \`key\` que personne n'enseigne : ce n'est pas seulement pour les listes, c'est le moyen canonique de dire « c'est un composant différent, recommence à zéro ».

L'alternative — un \`useEffect\` qui remet l'état à zéro quand la question change — fonctionne mais provoque un rendu supplémentaire avec l'ancien état affiché brièvement. La \`key\` est plus simple et plus correcte.

**Le style calculé dans le \`map\`** plutôt qu'en CSS conditionnel dispersé : toute la logique d'apparence tient dans un seul bloc lisible, où l'on voit d'un coup les quatre états possibles d'une option.

**\`disabled={choisie === null}\`** et non \`disabled={!choisie}\` : l'index 0 est une réponse valide, et \`!0\` vaut \`true\`. C'est un bug classique en JavaScript, et il passe totalement inaperçu tant qu'on ne teste pas la première option.`,
        },
        {
          id: "react-1-b",
          kind: "blanche",
          title: "Le composant qui ne se met pas à jour",
          statement: `**Page blanche.** Diagnostic.

Ce composant ne réaffiche rien quand on ajoute une tâche. Le tableau est bien modifié — on le voit dans un \`console.log\` — mais l'écran ne bouge pas.

\`\`\`jsx
function ListeTaches() {
  const [taches, setTaches] = useState([{ id: 1, texte: "Faire les exercices", faite: false }]);

  const ajouter = (texte) => {
    taches.push({ id: Date.now(), texte, faite: false });
    setTaches(taches);
    console.log(taches);          // le tableau contient bien la nouvelle tâche
  };

  const basculer = (id) => {
    const t = taches.find((x) => x.id === id);
    t.faite = !t.faite;
    setTaches(taches);
  };

  return <ul>{taches.map((t) => <li key={t.id}>{t.texte}</li>)}</ul>;
}
\`\`\`

1. explique **précisément** pourquoi React ne réaffiche pas
2. corrige les deux fonctions
3. explique ce que React compare exactement pour décider de réafficher
4. donne la règle générale, applicable aussi aux objets et aux objets imbriqués
5. montre le même bug appliqué à un objet plutôt qu'à un tableau

**Le \`console.log\` qui montre la bonne valeur est ce qui rend le bug si déroutant.** La donnée est correcte, l'affichage non.`,
          hint: `\`push\` modifie le tableau existant et retourne sa nouvelle longueur — il ne crée pas de nouveau tableau. Que compare React entre l'ancien et le nouvel état pour savoir s'il doit réafficher ? Et que vaut cette comparaison quand c'est le même objet des deux côtés ?`,
          solution: `**1. Pourquoi React ne réaffiche pas**

\`taches.push(...)\` modifie le tableau **en place** : c'est toujours le même objet, à la même adresse mémoire. \`setTaches(taches)\` passe donc à React exactement la référence qu'il avait déjà.

React compare l'ancien et le nouvel état avec \`Object.is\` — une comparaison de **référence**, pas de contenu. Puisque c'est le même objet, React conclut « rien n'a changé » et n'ordonnance aucun rendu. Le tableau a bien été modifié, mais l'écran n'est jamais redessiné.

**2. La correction**

\`\`\`jsx
const ajouter = (texte) => {
  setTaches((prev) => [...prev, { id: Date.now(), texte, faite: false }]);
};

const basculer = (id) => {
  setTaches((prev) =>
    prev.map((t) => (t.id === id ? { ...t, faite: !t.faite } : t))
  );
};
\`\`\`

Deux points au-delà de l'immuabilité :

**\`[...prev, nouveau]\` crée un nouveau tableau** — nouvelle référence, donc React réaffiche.

**\`{ ...t, faite: !t.faite }\` crée un nouvel objet** pour la tâche modifiée, et laisse les autres intactes. Écrire \`prev.map(t => { t.faite = !t.faite; return t; })\` créerait bien un nouveau tableau, mais muterait les objets à l'intérieur — ce qui casse les optimisations de \`React.memo\` sur les enfants.

**La forme fonctionnelle \`setTaches(prev => …)\`** est préférable à \`setTaches([...taches, …])\` : elle garantit de travailler sur l'état le plus récent, même si plusieurs mises à jour sont groupées dans le même cycle.

**3. Ce que React compare**

\`Object.is(ancienEtat, nouvelEtat)\`. Pour les primitives — nombres, chaînes, booléens — cela revient à comparer les valeurs. Pour les objets et les tableaux, cela compare les **références**. React ne parcourt jamais le contenu : ce serait trop coûteux sur des structures profondes, à chaque mise à jour.

**4. La règle générale**

> **Ne modifie jamais l'état en place. Remplace-le toujours par une nouvelle valeur.**

Les méthodes qui **mutent** — à éviter sur l'état : \`push\`, \`pop\`, \`shift\`, \`unshift\`, \`splice\`, \`sort\`, \`reverse\`.

Leurs équivalents qui **retournent du neuf** : \`[...arr, x]\`, \`arr.slice(0, -1)\`, \`arr.filter(...)\`, \`arr.map(...)\`, \`[...arr].sort()\`, \`arr.toSorted()\`.

⚠️ \`sort\` et \`reverse\` sont les plus traîtres : ils *retournent* le tableau, ce qui donne l'illusion d'une copie, alors qu'ils l'ont trié **en place**. D'où le \`[...arr].sort()\`.

**5. Le même bug sur un objet — et sur un objet imbriqué**

\`\`\`jsx
// ❌ Mutation : aucun réaffichage
const changerNom = (nom) => { utilisateur.nom = nom; setUtilisateur(utilisateur); };

// ✅ Nouvelle référence
const changerNom = (nom) => setUtilisateur((u) => ({ ...u, nom }));

// ❌ Piège de l'imbrication : la copie est SUPERFICIELLE
setUtilisateur((u) => ({ ...u, profil: Object.assign(u.profil, { ville: "Dakar" }) }));

// ✅ Copier chaque niveau modifié
setUtilisateur((u) => ({ ...u, profil: { ...u.profil, ville: "Dakar" } }));
\`\`\`

Le spread ne copie qu'**un niveau**. Sur des structures profondes, il faut recopier chaque niveau du chemin modifié — ce qui devient vite pénible, et c'est exactement pourquoi des bibliothèques comme Immer existent.

---

**Ce bug est le plus fréquent chez les débutants React**, et le \`console.log\` correct est ce qui le rend déroutant : la donnée est juste, l'affichage non. Une fois qu'on a compris que React compare des **références**, tout le modèle mental de l'immuabilité devient évident au lieu d'être une règle arbitraire.`,
        },
      ],
      "react-2": [
        {
          id: "react-2-a",
          kind: "application",
          title: "Routes, route API et Server Component",
          statement: `Dans un projet Next.js avec l'App Router, crée :

1. quatre routes : \`/\`, \`/modules\`, \`/modules/[id]\` et \`/a-propos\`
2. la page \`/modules\` en **Server Component** qui charge les données côté serveur
3. la page \`/modules/[id]\` qui lit son paramètre dynamique
4. une route API \`POST /api/contact\` qui reçoit un JSON et répond
5. un \`loading.js\` et un \`error.js\` sur le segment \`/modules\`

Puis vérifie dans l'onglet réseau du navigateur : la page \`/modules\` doit arriver **déjà rendue**, sans requête de données côté client.`,
          hint: `Dans l'App Router, un composant est Server par défaut. \`"use client"\` en tête de fichier le bascule côté client. Un Server Component peut être \`async\` et faire un \`await\` directement dans le corps — c'est impossible côté client.`,
          solution: `\`\`\`
app/
├── page.js                    → /
├── a-propos/page.js           → /a-propos
├── modules/
│   ├── page.js                → /modules
│   ├── loading.js             → affiché pendant le chargement
│   ├── error.js               → affiché en cas d'erreur
│   └── [id]/page.js           → /modules/python
└── api/contact/route.js       → POST /api/contact
\`\`\`

\`\`\`jsx
// app/modules/page.js — Server Component : PAS de "use client"
export default async function PageModules() {
  const modules = await getModules();        // s'exécute sur le serveur
  return (
    <ul>
      {modules.map((m) => (
        <li key={m.id}><a href={\`/modules/\${m.id}\`}>{m.titre}</a></li>
      ))}
    </ul>
  );
}
\`\`\`

\`\`\`jsx
// app/modules/[id]/page.js
export default async function PageModule({ params }) {
  const { id } = await params;               // params est asynchrone (Next 15+)
  const module = await getModule(id);
  if (!module) notFound();
  return <h1>{module.titre}</h1>;
}
\`\`\`

\`\`\`jsx
// app/modules/loading.js
export default function Loading() {
  return <p className="text-slate-500">Chargement des modules…</p>;
}

// app/modules/error.js — doit être un Client Component
"use client";
export default function Error({ error, reset }) {
  return (
    <div>
      <p>Une erreur est survenue : {error.message}</p>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
\`\`\`

\`\`\`javascript
// app/api/contact/route.js
export async function POST(request) {
  const { email, message } = await request.json();
  if (!email || !message) {
    return Response.json({ erreur: "Champs manquants" }, { status: 400 });
  }
  await enregistrerMessage(email, message);
  return Response.json({ ok: true }, { status: 201 });
}
\`\`\`

**Ce qu'il faut observer dans l'onglet réseau** : la page \`/modules\` arrive en HTML **déjà rendu**, sans requête de données côté client. Le code de \`getModules\` n'est jamais envoyé au navigateur — ni la fonction, ni les identifiants qu'elle utilise. C'est le double gain des Server Components : moins de JavaScript envoyé, et la possibilité d'accéder directement à la base ou à des secrets.

**\`loading.js\` n'est pas un simple message d'attente.** Next l'utilise comme frontière de Suspense : le reste de la page s'affiche immédiatement pendant que ce segment charge. Sans lui, la navigation semble bloquée.

**\`error.js\` doit être un Client Component** — il a besoin d'interactivité pour le bouton \`reset\`. C'est l'une des rares contraintes strictes de l'App Router.

**\`params\` est asynchrone depuis Next 15** : il faut l'attendre. Le code plus ancien qui écrit \`params.id\` directement produit désormais un avertissement, puis une erreur.

**\`Response.json()\`** est l'API web standard — l'App Router abandonne le couple \`req, res\` d'Express au profit des objets \`Request\` et \`Response\` natifs, les mêmes que dans le navigateur.`,
        },
        {
          id: "react-2-b",
          kind: "blanche",
          title: "Server ou Client ?",
          statement: `**Page blanche.** Décision d'architecture.

Pour chacun de ces six composants, décide **Server Component ou Client Component**, et justifie en une phrase :

1. une liste d'articles chargée depuis la base de données
2. un bouton « J'aime » avec un compteur qui s'incrémente au clic
3. un fil d'Ariane calculé depuis l'URL
4. une barre de recherche avec suggestions en direct
5. un tableau de bord affichant des statistiques, avec un onglet interactif pour changer de période
6. un pied de page avec des liens statiques

Puis, pour le n° 5, montre **comment le découper** pour envoyer le minimum de JavaScript au navigateur.

**Le n° 5 est le cœur de l'exercice.** La réponse « tout en Client » fonctionne mais gâche l'intérêt de Next.`,
          hint: `Un Client Component est nécessaire dès qu'il faut : un état (\`useState\`), un effet (\`useEffect\`), un gestionnaire d'événement, ou une API du navigateur. Tout le reste peut — et devrait — rester Server. Et un Server Component peut **contenir** un Client Component.`,
          solution: `**1. Liste d'articles → Server.** Elle charge des données et n'a aucune interactivité. Elle accède directement à la base, sans exposer d'API ni envoyer de JavaScript.

**2. Bouton « J'aime » → Client.** Il a un \`onClick\` et un \`useState\`. Il doit être aussi **petit que possible** : un composant dédié, pas une page entière basculée en client.

**3. Fil d'Ariane → Server.** L'URL est connue du serveur via \`params\`. Utiliser \`usePathname\` forcerait inutilement le passage en client.

**4. Barre de recherche → Client.** Saisie contrôlée, anti-rebond, appels au fil de la frappe : c'est de l'interactivité pure.

**5. Tableau de bord → les deux, découpés.** C'est le cas intéressant.

**6. Pied de page → Server.** Des liens statiques n'ont besoin d'aucun JavaScript.

**Le découpage du n° 5** :

\`\`\`jsx
// app/dashboard/page.js — SERVER : charge les données
import { SelecteurPeriode } from "./SelecteurPeriode";

export default async function Dashboard({ searchParams }) {
  const { periode = "30j" } = await searchParams;
  const stats = await getStatistiques(periode);       // sur le serveur

  return (
    <div>
      <h1>Tableau de bord</h1>

      {/* Le SEUL morceau interactif */}
      <SelecteurPeriode valeur={periode} />

      {/* Rendu côté serveur : zéro JS envoyé */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <article key={s.id} className="card p-6">
            <p className="text-2xl">{s.valeur}</p>
            <p className="text-sm">{s.libelle}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
\`\`\`

\`\`\`jsx
// app/dashboard/SelecteurPeriode.js — CLIENT, minuscule
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function SelecteurPeriode({ valeur }) {
  const router = useRouter();
  const params = useSearchParams();

  const changer = (p) => {
    const q = new URLSearchParams(params);
    q.set("periode", p);
    router.push(\`?\${q}\`);          // l'URL change -> le Server Component recharge
  };

  return (
    <div className="flex gap-2">
      {["7j", "30j", "12m"].map((p) => (
        <button key={p} onClick={() => changer(p)}
                className={p === valeur ? "btn-primary" : "btn-secondary"}>
          {p}
        </button>
      ))}
    </div>
  );
}
\`\`\`

**L'astuce du n° 5 : l'état vit dans l'URL, pas dans un \`useState\`.** Le sélecteur ne stocke rien ; il modifie la barre d'adresse, ce qui déclenche un nouveau rendu serveur avec les bonnes données.

Trois bénéfices gratuits : la page est **partageable** — l'URL contient la période ; le **bouton retour** fonctionne ; et les statistiques ne transitent jamais en JSON vers le client, elles arrivent déjà rendues.

**La règle de découpage** : *pousse la frontière \`"use client"\` le plus bas possible dans l'arbre.* Un \`"use client"\` en haut d'une page bascule **tous ses enfants** en client, y compris ceux qui n'en avaient pas besoin — et tout leur code part dans le navigateur.

**Le réflexe : Server par défaut, Client par exception**, et l'exception doit être un composant feuille aussi petit que possible.

⚠️ Un Server Component peut contenir un Client Component, mais l'inverse est impossible — sauf en passant le Server Component en \`children\`. C'est la contrainte qui structure toute l'architecture d'une application App Router.`,
        },
      ],
      "react-3": [
        {
          id: "react-3-a",
          kind: "application",
          title: "Un Context et un hook personnalisé",
          statement: `1. Crée un \`ProgressionContext\` qui expose : les leçons terminées, l'XP, une fonction \`terminerLecon(id)\` et une fonction \`reinitialiser()\`.

2. Écris un hook \`useLocalStorage(cle, valeurParDefaut)\` qui se comporte comme \`useState\` mais persiste dans le navigateur.

3. Branche les deux : la progression doit survivre à un rechargement de page.

4. Écris un hook \`useProgression()\` qui lève une erreur explicite s'il est utilisé hors du Provider.

**Attention au rendu serveur** : \`localStorage\` n'existe pas côté serveur. Ton hook doit fonctionner sans provoquer d'erreur d'hydratation.`,
          hint: `Lire \`localStorage\` pendant le premier rendu provoque un décalage entre le HTML serveur et le rendu client — une erreur d'hydratation. La parade : initialiser avec la valeur par défaut, puis lire le stockage dans un \`useEffect\` après le montage.`,
          solution: `\`\`\`jsx
// hooks/useLocalStorage.js
"use client";
import { useState, useEffect, useCallback } from "react";

export function useLocalStorage(cle, valeurParDefaut) {
  // 1er rendu : TOUJOURS la valeur par défaut, identique serveur et client
  const [valeur, setValeur] = useState(valeurParDefaut);
  const [charge, setCharge] = useState(false);

  // Après le montage : on lit le stockage
  useEffect(() => {
    try {
      const brut = window.localStorage.getItem(cle);
      if (brut !== null) setValeur(JSON.parse(brut));
    } catch {
      /* mode privé, stockage bloqué : on garde la valeur par défaut */
    }
    setCharge(true);
  }, [cle]);

  // On n'écrit qu'après la lecture initiale, sinon on écraserait le stockage
  useEffect(() => {
    if (!charge) return;
    try {
      window.localStorage.setItem(cle, JSON.stringify(valeur));
    } catch {
      /* quota dépassé : non bloquant */
    }
  }, [cle, valeur, charge]);

  return [valeur, setValeur, charge];
}
\`\`\`

\`\`\`jsx
// lib/ProgressionContext.js
"use client";
import { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ProgressionContext = createContext(null);

export function ProgressionProvider({ children }) {
  const [terminees, setTerminees] = useLocalStorage("lecons-terminees", []);
  const [xp, setXp] = useLocalStorage("xp", 0);

  const terminerLecon = useCallback((id) => {
    setTerminees((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setXp((prev) => prev + 50);
  }, [setTerminees, setXp]);

  const reinitialiser = useCallback(() => {
    setTerminees([]);
    setXp(0);
  }, [setTerminees, setXp]);

  return (
    <ProgressionContext.Provider value={{ terminees, xp, terminerLecon, reinitialiser }}>
      {children}
    </ProgressionContext.Provider>
  );
}

export function useProgression() {
  const ctx = useContext(ProgressionContext);
  if (ctx === null) {
    throw new Error("useProgression doit être utilisé à l'intérieur d'un <ProgressionProvider>");
  }
  return ctx;
}
\`\`\`

**Le double \`useEffect\` résout l'hydratation.** Si le hook lisait \`localStorage\` dans l'initialiseur de \`useState\`, le serveur rendrait la valeur par défaut et le client une valeur différente — React détecte le décalage et signale une erreur d'hydratation. En initialisant toujours à la valeur par défaut puis en lisant après le montage, les deux rendus concordent.

**Le drapeau \`charge\` évite d'écraser le stockage.** Sans lui, le second effet s'exécuterait au premier rendu avec la valeur par défaut et **effacerait** les données existantes avant même de les avoir lues. Ce bug est silencieux et détruit les données des utilisateurs.

**Le \`try/catch\` n'est pas de la prudence excessive** : en navigation privée, avec les cookies tiers bloqués, ou quand le quota est atteint, \`localStorage\` **lève une exception**. Sans protection, l'application entière plante.

**L'erreur explicite dans \`useProgression\`** transforme un \`Cannot read properties of null\` incompréhensible en un message qui dit exactement quoi faire. C'est le motif standard de tout hook de contexte, et il coûte trois lignes.

**\`useCallback\` stabilise les fonctions** pour qu'elles ne changent pas de référence à chaque rendu — ce qui déclencherait le réaffichage de tous les consommateurs du contexte.`,
        },
        {
          id: "react-3-b",
          kind: "blanche",
          title: "La page qui fait 400 requêtes",
          statement: `**Page blanche.** Diagnostic.

Un utilisateur signale que la page « rame ». Dans l'onglet réseau, tu vois **des centaines de requêtes** vers \`/api/stats\`, en continu, tant que la page est ouverte.

\`\`\`jsx
function Statistiques({ userId }) {
  const [stats, setStats] = useState(null);
  const [filtres, setFiltres] = useState({ periode: "30j" });

  useEffect(() => {
    fetch(\`/api/stats?user=\${userId}&periode=\${filtres.periode}\`)
      .then((r) => r.json())
      .then(setStats);
  });

  return <div>{stats ? <Graphique donnees={stats} /> : <p>Chargement…</p>}</div>;
}
\`\`\`

1. explique **précisément** le mécanisme de la boucle
2. corrige-le
3. il reste ensuite un **second** problème, plus subtil, qui se déclenche quand \`filtres\` change souvent — trouve-le
4. corrige-le aussi
5. ajoute l'annulation des requêtes obsolètes

**Il y a deux bugs distincts**, et le second ne se voit que quand le premier est corrigé.`,
          hint: `Que se passe-t-il quand un \`useEffect\` n'a **aucun** tableau de dépendances ? Et pour le point 3 : si deux requêtes partent coup sur coup, es-tu certain que celle qui répond en dernier est celle qui a été lancée en dernier ?`,
          solution: `**1. Le mécanisme de la boucle**

L'effet n'a **pas de tableau de dépendances** : il s'exécute donc après **chaque** rendu. Or il appelle \`setStats\`, ce qui provoque un nouveau rendu, qui relance l'effet, qui rappelle \`setStats\`… Boucle infinie, limitée seulement par la latence réseau.

Le \`console.log\` n'aide pas ici : chaque requête individuelle est correcte. Seul l'onglet réseau révèle le problème.

**2. La correction**

\`\`\`jsx
useEffect(() => {
  fetch(\`/api/stats?user=\${userId}&periode=\${filtres.periode}\`)
    .then((r) => r.json())
    .then(setStats);
}, [userId, filtres.periode]);      // ← relancé uniquement si CES valeurs changent
\`\`\`

Noter \`filtres.periode\` et non \`filtres\` : l'objet \`filtres\` est recréé à chaque rendu du parent, donc sa **référence** change même quand son contenu est identique — et l'effet se relancerait quand même. On dépend de la valeur primitive, pas de l'objet.

**Les trois formes du tableau de dépendances** :
- **absent** → à chaque rendu (presque toujours un bug)
- **\`[]\`** → une seule fois, au montage
- **\`[a, b]\`** → quand \`a\` ou \`b\` change

**3. Le second bug : la course entre réponses**

Quand l'utilisateur change vite de période — \`7j\` puis \`30j\` — deux requêtes partent. **Rien ne garantit qu'elles reviennent dans l'ordre.** Si la réponse de \`7j\` arrive après celle de \`30j\`, le dernier \`setStats\` écrit les données de \`7j\` alors que l'interface affiche \`30j\`.

Le résultat est un graphique qui **ne correspond pas au filtre sélectionné** — bug intermittent, impossible à reproduire volontairement, et qu'on met des heures à comprendre.

**4 et 5. La correction complète, avec annulation**

\`\`\`jsx
useEffect(() => {
  const controleur = new AbortController();
  let annule = false;

  setStats(null);                                  // état de chargement explicite

  fetch(\`/api/stats?user=\${userId}&periode=\${filtres.periode}\`, {
    signal: controleur.signal,
  })
    .then((r) => {
      if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
      return r.json();
    })
    .then((donnees) => {
      if (!annule) setStats(donnees);              // on ignore une réponse périmée
    })
    .catch((e) => {
      if (e.name !== "AbortError" && !annule) console.error(e);
    });

  // Fonction de nettoyage : appelée avant le prochain effet et au démontage
  return () => {
    annule = true;
    controleur.abort();
  };
}, [userId, filtres.periode]);
\`\`\`

**La fonction de nettoyage est le mécanisme clé de \`useEffect\`.** React l'appelle **avant** de relancer l'effet et au démontage du composant. Elle sert à défaire ce que l'effet a mis en place : annuler une requête, retirer un écouteur, arrêter un intervalle, fermer une connexion.

**\`AbortController\` annule réellement la requête** — le navigateur cesse d'attendre et le serveur peut abandonner le travail. Le drapeau \`annule\` est la ceinture de sécurité : même si une réponse arrive malgré tout, elle ne sera pas écrite dans l'état.

**Sans nettoyage, il y a aussi une fuite** : un composant démonté dont la requête aboutit appelle \`setStats\` sur un composant qui n'existe plus. React le tolère aujourd'hui, mais la closure et les données associées restent en mémoire.

---

**Les deux règles** :

**Un \`useEffect\` sans tableau de dépendances est presque toujours un bug.** Écris-le systématiquement, même vide, et laisse la règle ESLint \`react-hooks/exhaustive-deps\` te dire ce qui manque.

**Tout effet asynchrone a besoin d'un nettoyage.** La question à se poser : « si cet effet se relance avant la fin, ou si le composant disparaît, que doit-il défaire ? »

Et la remarque qui dépasse cet exercice : **une bonne partie de ces problèmes disparaît avec un Server Component**, qui charge les données côté serveur sans \`useEffect\` du tout — ou avec une bibliothèque comme TanStack Query, qui gère l'annulation, le cache et les courses pour toi.`,
        },
      ],
    },
    finalExercise: {
      title: "Application Next.js performante",
      duration: "8 à 12 h",
      covers: ["react-1", "react-2", "react-3"],
      brief: `Une application rendue côté serveur, rapide, avec des états de chargement soignés.

Cet exercice **rassemble les 3 leçons du module** — composants et état (leçon 1), App Router et Server Components (leçon 2), Context et hooks personnalisés (leçon 3).

C'est aussi le module qui construit le site que tu es en train d'utiliser : CodeGraft tourne exactement sur cette pile. Tu peux ouvrir son code source pendant l'exercice — c'est même recommandé.`,
      dataset: `Choisis une application que tu as envie d'utiliser vraiment : suivi de lecture, gestionnaire de recettes, tableau de bord de tes projets GitHub. Elle doit avoir au moins deux entités liées (par exemple des projets et des tâches).

\`\`\`bash
npx create-next-app@latest mon-app --app --tailwind
\`\`\``,
      steps: [
        "**Au moins 4 routes** avec l'App Router, dont une route dynamique `[id]` et une route API. (leçon 2)",
        "**Server Components pour les données, Client uniquement pour l'interactivité.** Pousse la frontière `\"use client\"` le plus bas possible dans l'arbre, et justifie chaque composant client. (leçon 2)",
        "**`loading.js` et `error.js` sur chaque segment de route** — le chargement ne doit jamais donner l'impression que la page est bloquée. (leçon 2)",
        "**Une mutation avec mise à jour optimiste** : l'interface réagit immédiatement, puis se corrige si le serveur refuse. Gère explicitement le cas de l'échec. (leçons 1 et 3)",
        "**Un Context et un hook personnalisé** — avec l'erreur explicite si le hook est utilisé hors du Provider. (leçon 3)",
        "**Score Lighthouse Performance ≥ 90 en production** (`npm run build && npm start`, pas en mode développement). (leçon 2)",
      ],
      checklist: [
        "Je ne mute jamais l'état : ni push, ni sort, ni assignation directe",
        "Chaque useEffect a un tableau de dépendances, et un nettoyage s'il est asynchrone",
        "Mes composants \"use client\" sont des feuilles, pas des pages entières",
        "Chaque segment de route a son loading.js et son error.js",
        "Ma mise à jour optimiste gère le cas où le serveur refuse",
        "Mon score Lighthouse est mesuré sur un build de production, pas en dev",
      ],
      selfCheck: `Le vrai test : **ouvre l'onglet réseau, coche « Disable cache », passe la connexion en « Slow 3G », et navigue dans ton application.**

Regarde deux choses. D'abord la quantité de JavaScript téléchargée : si une page qui ne fait qu'afficher des données envoie 300 Ko de JS, ta frontière client est trop haute. Ensuite le comportement : chaque navigation doit montrer immédiatement quelque chose — un squelette, un indicateur — jamais un écran figé.

C'est dans ces conditions que vit une bonne partie de tes utilisateurs, et c'est là que se voit la différence entre une application Next.js et une application React déguisée en Next.js.`,
    },
    quizExtra: [
      {
        q: "`taches.push(nouvelle); setTaches(taches);` — pourquoi React ne réaffiche-t-il pas ?",
        options: [
          "Parce que push est asynchrone",
          "Parce que push mute le tableau en place : c'est la même référence, et React compare les références avec Object.is",
          "Parce qu'il faut appeler setTaches deux fois",
          "Parce que le tableau dépasse la taille maximale",
        ],
        answer: 1,
        explain:
          "React ne parcourt jamais le contenu — ce serait trop coûteux. Il compare l'ancienne et la nouvelle référence : même objet, donc « rien n'a changé ». D'où la règle : ne modifie jamais l'état en place, remplace-le par une nouvelle valeur. Attention à sort et reverse, particulièrement traîtres : ils RETOURNENT le tableau tout en l'ayant trié en place, d'où le [...arr].sort().",
      },
      {
        q: "Un useEffect sans tableau de dépendances qui appelle setState. Que se passe-t-il ?",
        options: [
          "Il s'exécute une seule fois au montage",
          "Boucle infinie : il s'exécute après chaque rendu, setState provoque un rendu, qui relance l'effet",
          "React le bloque automatiquement après 10 exécutions",
          "Il ne s'exécute jamais",
        ],
        answer: 1,
        explain:
          "Absent → après chaque rendu ; [] → une fois au montage ; [a, b] → quand a ou b change. Le cas sans tableau est presque toujours un bug. Piège associé : dépendre d'un objet (filtres) plutôt que d'une valeur primitive (filtres.periode) — l'objet est recréé à chaque rendu du parent, donc sa référence change même à contenu identique, et l'effet se relance quand même.",
      },
      {
        q: "Deux requêtes partent coup sur coup quand l'utilisateur change de filtre. Quel bug guette ?",
        options: [
          "Le serveur va rejeter la seconde",
          "Une course : rien ne garantit l'ordre des réponses, donc une réponse périmée peut écraser la récente",
          "Le navigateur met la seconde en file d'attente",
          "Aucun, fetch garantit l'ordre",
        ],
        answer: 1,
        explain:
          "Si la réponse du filtre « 7j » arrive après celle de « 30j », le dernier setState écrit les mauvaises données pendant que l'interface affiche « 30j ». Bug intermittent, impossible à reproduire volontairement. La parade : un AbortController plus un drapeau `annule` dans la fonction de nettoyage du useEffect — React l'appelle avant de relancer l'effet et au démontage.",
      },
      {
        q: "Tu passes à la question suivante d'un quiz mais la sélection précédente reste affichée. Pourquoi ?",
        options: [
          "Il manque un useEffect de réinitialisation",
          "React réutilise l'instance du composant quand seules les props changent : l'état interne survit. Changer la `key` force un remontage propre",
          "Le state est stocké dans localStorage",
          "Les props ne sont pas passées correctement",
        ],
        answer: 1,
        explain:
          "C'est l'usage de `key` que personne n'enseigne : ce n'est pas réservé aux listes, c'est le moyen canonique de dire à React « c'est un composant différent, recommence à zéro ». L'alternative par useEffect fonctionne mais provoque un rendu supplémentaire où l'ancien état s'affiche brièvement.",
      },
      {
        q: "Où placer la directive `\"use client\"` dans une application Next.js ?",
        options: [
          "En haut de chaque page, c'est plus simple",
          "Le plus bas possible dans l'arbre : elle bascule tous les enfants en client, et tout leur code part dans le navigateur",
          "Dans le fichier layout.js racine",
          "Uniquement dans les routes API",
        ],
        answer: 1,
        explain:
          "Un \"use client\" en haut d'une page fait basculer tous ses enfants, y compris ceux qui n'avaient besoin d'aucune interactivité. Le réflexe : Server par défaut, Client par exception, et l'exception doit être un composant feuille aussi petit que possible — un sélecteur, un bouton. Souvent, l'état peut même vivre dans l'URL plutôt que dans un useState, ce qui rend la page partageable et fait fonctionner le bouton retour.",
      },
      {
        q: "Pourquoi un hook `useLocalStorage` ne doit-il pas lire le stockage dans l'initialiseur de useState ?",
        options: [
          "Parce que c'est trop lent",
          "Parce que localStorage n'existe pas côté serveur : le rendu serveur et le rendu client différeraient, provoquant une erreur d'hydratation",
          "Parce que useState n'accepte pas de fonction",
          "Parce que JSON.parse est bloquant",
        ],
        answer: 1,
        explain:
          "La parade : initialiser toujours avec la valeur par défaut — identique serveur et client — puis lire le stockage dans un useEffect après le montage. Et il faut un drapeau `charge` avant d'écrire : sans lui, le premier effet écrirait la valeur par défaut et EFFACERAIT les données existantes avant de les avoir lues. Enfin, try/catch obligatoire : en navigation privée, localStorage lève une exception.",
      },
    ],
  },

  // ══ BASES DE DONNÉES POUR LE WEB ══════════════════════════════════════════
  "databases-web": {
    lessons: {
      "db-1": [
        {
          id: "db-1-a",
          kind: "application",
          title: "Un schéma Prisma avec relations",
          statement: `Modélise une plateforme de cours avec Prisma :

1. \`User\` — id, email unique, nom, xp
2. \`Module\` — id, slug unique, titre
3. \`Lecon\` — id, titre, appartient à un \`Module\`
4. \`LeconTerminee\` — relie un \`User\` à une \`Lecon\`, avec une date, et **un utilisateur ne peut terminer une leçon qu'une fois**

Puis :
- lance la migration
- écris un script de peuplement (*seed*) créant 3 utilisateurs et 2 modules avec leurs leçons
- écris une requête qui retourne un utilisateur **avec** ses leçons terminées et le module de chacune`,
          hint: `La contrainte « une seule fois » s'exprime avec \`@@unique([userId, leconId])\` sur le modèle de liaison. Pour charger les relations en une requête, utilise \`include\` — et il s'imbrique.`,
          solution: `\`\`\`prisma
// prisma/schema.prisma
model User {
  id        Int               @id @default(autoincrement())
  email     String            @unique
  nom       String
  xp        Int               @default(0)
  createdAt DateTime          @default(now())
  terminees LeconTerminee[]
}

model Module {
  id     Int     @id @default(autoincrement())
  slug   String  @unique
  titre  String
  lecons Lecon[]
}

model Lecon {
  id        Int             @id @default(autoincrement())
  titre     String
  module    Module          @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  moduleId  Int
  terminees LeconTerminee[]

  @@index([moduleId])
}

model LeconTerminee {
  id         Int      @id @default(autoincrement())
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId     Int
  lecon      Lecon    @relation(fields: [leconId], references: [id], onDelete: Cascade)
  leconId    Int
  termineeLe DateTime @default(now())

  @@unique([userId, leconId])      // un utilisateur ne termine une leçon qu'une fois
  @@index([userId])
}
\`\`\`

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

\`\`\`javascript
// prisma/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

await prisma.module.create({
  data: {
    slug: "python", titre: "Python pour la Data Science",
    lecons: { create: [{ titre: "Bases de Python" }, { titre: "NumPy" }] },
  },
});

await prisma.user.createMany({
  data: [
    { email: "awa@ex.com", nom: "Awa" },
    { email: "kofi@ex.com", nom: "Kofi" },
    { email: "lina@ex.com", nom: "Lina" },
  ],
});
\`\`\`

\`\`\`javascript
// La requête avec relations imbriquées — UNE seule requête
const utilisateur = await prisma.user.findUnique({
  where: { email: "awa@ex.com" },
  include: {
    terminees: {
      include: { lecon: { include: { module: true } } },
      orderBy: { termineeLe: "desc" },
    },
  },
});
\`\`\`

**Le \`@@unique([userId, leconId])\` déplace une règle métier dans la base.** Sans lui, un double-clic sur « Terminer » crée deux lignes et attribue l'XP deux fois. On pourrait vérifier côté applicatif — mais il faudrait y penser dans chaque chemin de code, et une requête concurrente passerait quand même. La contrainte, elle, ne peut pas être contournée.

**\`onDelete: Cascade\`** évite les lignes orphelines : supprimer un utilisateur supprime ses leçons terminées. Sans directive explicite, la suppression échoue sur une violation de clé étrangère — ce qui est parfois voulu, mais doit être un choix.

**Les \`@@index\`** ne sont pas décoratifs : toute colonne servant à filtrer ou joindre fréquemment en a besoin. Prisma indexe automatiquement les clés primaires et les colonnes \`@unique\`, mais **pas** les clés étrangères. C'est la cause n°1 de lenteur sur une base Prisma qui grossit.

**\`include\` imbriqué produit une seule requête** avec les jointures nécessaires, là où une boucle en produirait des centaines — c'est le sujet de l'exercice suivant.

**Prisma génère un client typé** depuis ce schéma : \`utilisateur.terminees[0].lecon.module.titre\` est autocomplété et vérifié. Renomme un champ dans le schéma, et TypeScript te montre tous les endroits à corriger.`,
        },
        {
          id: "db-1-b",
          kind: "blanche",
          title: "La page qui fait 201 requêtes SQL",
          statement: `**Page blanche.** Diagnostic de performance.

Cette page affiche 200 leçons avec le nom de leur module. Elle met **4 secondes** à répondre.

\`\`\`javascript
const lecons = await prisma.lecon.findMany({ take: 200 });

const affichage = [];
for (const lecon of lecons) {
  const module = await prisma.module.findUnique({ where: { id: lecon.moduleId } });
  affichage.push({ titre: lecon.titre, module: module.titre });
}
\`\`\`

1. compte **exactement** combien de requêtes SQL partent, et explique le nom du problème
2. montre comment **voir** ces requêtes plutôt que de les deviner
3. corrige-le
4. mesure le gain
5. donne **deux autres** situations où le même problème apparaît sans boucle explicite — c'est là qu'il est vraiment dangereux

**Le point 5 est le plus important** : la version avec une boucle visible est la forme facile à repérer.`,
          hint: `Active le journal des requêtes de Prisma : \`new PrismaClient({ log: ["query"] })\`. Pour le point 5, pense à ce qui se passe quand chaque composant d'une liste charge lui-même ses données, ou quand un *resolver* GraphQL résout un champ pour chaque élément.`,
          solution: `**1. Le compte, et le nom**

**201 requêtes** : une pour charger les 200 leçons, puis **une par leçon** pour son module. C'est le problème **N+1** — 1 requête initiale, plus N requêtes dérivées.

Le coût n'est pas dans le travail de la base : chaque \`findUnique\` est instantané. Il est dans les **200 allers-retours réseau**, séquentiels à cause du \`await\` dans la boucle. À 20 ms d'aller-retour, cela fait 4 secondes de latence pure.

**2. Voir les requêtes**

\`\`\`javascript
const prisma = new PrismaClient({ log: ["query"] });
// Chaque requête SQL s'affiche dans la console, avec sa durée
\`\`\`

C'est le réflexe : **compter les requêtes avant d'optimiser**. Deviner mène à optimiser la mauvaise chose.

**3. La correction**

\`\`\`javascript
const lecons = await prisma.lecon.findMany({
  take: 200,
  include: { module: true },        // jointure : UNE seule requête
});

const affichage = lecons.map((l) => ({ titre: l.titre, module: l.module.titre }));
\`\`\`

**4. Le gain**

\`\`\`
avant : 201 requêtes — ~4 100 ms
après :   1 requête  —    ~35 ms
\`\`\`

**5. Les deux formes dangereuses, sans boucle visible**

**a) Le N+1 masqué par les composants.** Chaque carte charge elle-même son module :

\`\`\`jsx
// ❌ Chaque <CarteLecon> déclenche sa propre requête
function CarteLecon({ lecon }) {
  const [module, setModule] = useState(null);
  useEffect(() => {
    fetch(\`/api/modules/\${lecon.moduleId}\`).then((r) => r.json()).then(setModule);
  }, [lecon.moduleId]);
  return <div>{lecon.titre} — {module?.titre}</div>;
}
\`\`\`

Il n'y a **aucune boucle** dans ce code. Chaque composant est raisonnable pris isolément. Mais afficher 200 cartes déclenche 200 requêtes HTTP — pire que 200 requêtes SQL, puisque chacune traverse le réseau **et** rouvre une connexion à la base. C'est la forme la plus courante en React, et la plus difficile à repérer en relisant le code.

**b) Le N+1 dans un accès paresseux.** Avec certains ORM, accéder à \`lecon.module\` déclenche une requête à la volée :

\`\`\`javascript
const lecons = await Lecon.findAll();
lecons.forEach((l) => console.log(l.module.titre));   // une requête PAR ligne
\`\`\`

L'accès ressemble à une simple lecture de propriété. Prisma protège de ce cas — il exige un \`include\` explicite — mais Sequelize, TypeORM et les ORM de Django ou Rails y exposent.

---

**Le réflexe général : dès qu'une requête est à l'intérieur d'une boucle, d'un \`map\`, ou dans un composant rendu en liste, c'est un N+1.**

La correction est toujours la même idée : **charger en une fois ce dont on a besoin**, avec \`include\`, une jointure, ou un \`where: { id: { in: [...] } }\` quand la jointure n'est pas possible.

Et le test qui l'attrape avant la production : **journaliser le nombre de requêtes par appel d'API** et faire échouer le test au-delà d'un seuil. C'est exactement l'esprit du test de non-régression du module MLOps, appliqué aux bases de données.`,
        },
      ],
      "db-2": [
        {
          id: "db-2-a",
          kind: "application",
          title: "Stocker des prédictions avec Mongoose",
          statement: `Modélise le stockage des prédictions d'un modèle ML avec Mongoose :

1. un schéma \`Prediction\` : nom du modèle, données d'entrée **de structure libre**, prédiction, confiance bornée entre 0 et 1, métadonnées imbriquées, date
2. les opérations CRUD complètes
3. une requête retournant les 10 dernières prédictions de confiance supérieure à 0,9
4. une **agrégation** donnant la confiance moyenne par modèle
5. les index nécessaires — justifie chacun par une requête réelle`,
          hint: `\`mongoose.Schema.Types.Mixed\` accepte n'importe quelle structure — c'est ce qui rend MongoDB pertinent ici, puisque les features varient d'un modèle à l'autre. Pour l'agrégation : \`Model.aggregate([{ $group: … }])\`.`,
          solution: `\`\`\`javascript
import mongoose from "mongoose";

const PredictionSchema = new mongoose.Schema({
  modelName:  { type: String, required: true },
  inputData:  mongoose.Schema.Types.Mixed,          // structure libre
  prediction: Number,
  confidence: { type: Number, min: 0, max: 1, required: true },
  metadata: {
    version:  String,
    features: [String],
    latencyMs: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

// Index composé : sert la requête « dernières prédictions d'un modèle »
PredictionSchema.index({ modelName: 1, createdAt: -1 });
// Index simple : sert le filtre sur la confiance
PredictionSchema.index({ confidence: -1 });

const Prediction = mongoose.model("Prediction", PredictionSchema);

// ── CRUD ─────────────────────────────────────────────────────────────────
const p = await Prediction.create({
  modelName: "fraud-detector-v2",
  inputData: { montant: 1500, pays: "CA", heure: 3 },
  prediction: 1,
  confidence: 0.94,
  metadata: { version: "2.1.0", features: ["montant", "pays"], latencyMs: 23 },
});

await Prediction.findById(p._id);
await Prediction.updateOne({ _id: p._id }, { $set: { "metadata.version": "2.1.1" } });
await Prediction.deleteOne({ _id: p._id });

// ── 3. Les 10 dernières au-dessus de 0,9 ─────────────────────────────────
const recentes = await Prediction.find({ confidence: { $gt: 0.9 } })
  .sort({ createdAt: -1 })
  .limit(10)
  .lean();                                          // objets JS bruts, plus rapide

// ── 4. Confiance moyenne par modèle ──────────────────────────────────────
const parModele = await Prediction.aggregate([
  { $group: { _id: "$modelName", moyenne: { $avg: "$confidence" }, n: { $sum: 1 } } },
  { $sort: { moyenne: -1 } },
]);
\`\`\`

**\`Mixed\` est la raison d'être de MongoDB ici.** Les features varient d'un modèle à l'autre — un détecteur de fraude n'a pas les mêmes entrées qu'un modèle de recommandation. En PostgreSQL il faudrait une colonne \`JSONB\`, ce qui marche très bien aussi ; mais si **toutes** tes données sont de forme variable, MongoDB évite de se battre contre un schéma rigide.

⚠️ **\`Mixed\` a un piège** : Mongoose ne détecte pas les modifications à l'intérieur. Après \`doc.inputData.x = 1\`, il faut appeler \`doc.markModified("inputData")\` avant \`save()\`, sinon la modification est silencieusement ignorée.

**L'ordre des champs dans un index composé compte**, comme en SQL : \`{ modelName: 1, createdAt: -1 }\` sert « les dernières prédictions de tel modèle ». L'index inverse ne servirait pas cette requête. Le \`-1\` sur \`createdAt\` permet de lire l'index dans le sens du tri demandé, sans étape de tri.

**\`.lean()\`** retourne des objets JavaScript ordinaires au lieu de documents Mongoose complets. Deux à trois fois plus rapide, et suffisant dès qu'on ne fait que lire pour afficher.

**La validation \`min: 0, max: 1\`** est la même idée que le \`CHECK\` SQL du parcours ML : la règle métier vit dans la base, pas dispersée dans le code applicatif.`,
        },
        {
          id: "db-2-b",
          kind: "blanche",
          title: "PostgreSQL ou MongoDB ?",
          statement: `**Page blanche.** Décision d'architecture.

Pour chacun de ces quatre systèmes, choisis **PostgreSQL ou MongoDB**, et justifie en trois lignes :

1. une plateforme de cours — utilisateurs, modules, leçons, progression, paiements
2. un stockage de logs de prédictions ML — chaque modèle a des entrées de forme différente, ~50 millions de documents par mois
3. un catalogue produit e-commerce où chaque catégorie a des attributs différents (une chaussure a une pointure, un livre un ISBN)
4. un système bancaire de transferts entre comptes

Pour chacun, précise :
- ce que tu perdrais avec l'autre choix
- s'il existe une option qui rend le choix moins tranché

Puis réfute cette affirmation : **« MongoDB est plus rapide que PostgreSQL »**.`,
          hint: `Deux questions départagent presque tous les cas : ai-je besoin de **transactions** portant sur plusieurs entités à la fois, et mes données ont-elles une forme **stable** ? Et pour le point 3, regarde ce que PostgreSQL sait faire avec une colonne \`JSONB\`.`,
          solution: `**1. Plateforme de cours → PostgreSQL.**
Les données sont fondamentalement relationnelles — un utilisateur a des inscriptions, qui pointent vers des modules, qui contiennent des leçons. Et il y a des **paiements** : il faut des transactions ACID pour garantir qu'un paiement enregistré et un accès accordé se produisent ensemble ou pas du tout.
*Ce qu'on perdrait avec MongoDB* : les jointures naturelles, et la garantie transactionnelle multi-documents (elle existe depuis MongoDB 4.0 mais reste plus coûteuse et moins ergonomique).

**2. Logs de prédictions ML → MongoDB.**
Forme variable par modèle, très gros volume en écriture, lectures essentiellement analytiques et récentes. Le partitionnement horizontal (*sharding*) est natif, et l'absence de schéma rigide évite une migration à chaque nouveau modèle déployé.
*Ce qu'on perdrait avec PostgreSQL* : rien de rédhibitoire — \`JSONB\` ferait le travail — mais à 50 millions de documents mensuels, la montée en charge horizontale demanderait plus d'ingénierie.

**3. Catalogue e-commerce → PostgreSQL avec \`JSONB\`.** C'est le cas où l'opposition est fausse.
Les attributs communs — prix, stock, catégorie, nom — vont dans des colonnes typées ; les attributs variables vont dans une colonne \`JSONB\` indexable :
\`\`\`sql
CREATE TABLE produit (
  id SERIAL PRIMARY KEY,
  nom TEXT NOT NULL,
  prix NUMERIC(10,2) NOT NULL,
  categorie TEXT NOT NULL,
  attributs JSONB                      -- { "pointure": 42 } ou { "isbn": "978…" }
);
CREATE INDEX idx_attributs ON produit USING GIN (attributs);
SELECT * FROM produit WHERE attributs @> '{"pointure": 42}';
\`\`\`
On garde l'intégrité et les transactions sur ce qui est stable, et la souplesse sur ce qui varie. C'est presque toujours le bon compromis pour un catalogue.

**4. Système bancaire → PostgreSQL, sans discussion.**
Un transfert débite un compte **et** crédite l'autre : ces deux écritures doivent réussir ou échouer ensemble. C'est la définition même d'une transaction ACID, et c'est le domaine où PostgreSQL est le choix par défaut depuis des décennies.
*Ce qu'on perdrait avec MongoDB* : la simplicité et la solidité du modèle transactionnel, dans le seul domaine où l'erreur est inacceptable.

---

**La réfutation de « MongoDB est plus rapide »**

L'affirmation ne veut rien dire tant qu'on n'a pas précisé **quelle opération**.

**MongoDB est plus rapide** sur l'écriture de documents autonomes et sur la lecture d'un document entier par sa clé — parce qu'il n'y a ni jointure ni schéma à vérifier.

**PostgreSQL est plus rapide** dès qu'il y a des jointures, des agrégations complexes, ou des requêtes analytiques — c'est précisément ce pour quoi son moteur a été optimisé pendant trente ans.

**Et le plus souvent, la différence ne vient ni de l'un ni de l'autre.** Elle vient de l'absence d'index, d'un N+1, ou d'un schéma mal conçu. Une base MongoDB sans index est catastrophiquement lente ; une base PostgreSQL bien indexée traite des millions de lignes sans effort.

**Le vrai critère de choix n'est donc pas la vitesse, c'est la forme des données et le besoin de transactions.** Et pour beaucoup de projets, PostgreSQL avec \`JSONB\` offre les deux — ce qui explique pourquoi il est redevenu le choix par défaut, y compris pour des données semi-structurées.`,
        },
      ],
    },
    finalExercise: {
      title: "Schéma et accès de données d'un SaaS",
      duration: "5 à 8 h",
      covers: ["db-1", "db-2"],
      brief: `La base qui servira ton API au module suivant. Si elle est mal conçue, tout le backend en souffrira.

Cet exercice **rassemble les 2 leçons du module** — modélisation relationnelle avec Prisma (leçon 1), et le choix de la technologie de stockage (leçon 2).

Un point important : cette base n'est pas jetable. Le module Backend construira l'API par-dessus, et le module Déploiement la mettra en production. Les raccourcis pris ici te coûteront deux modules plus loin.`,
      dataset: `Un SaaS multi-utilisateurs de gestion de projets. Quatre entités au minimum :

- **utilisateurs** — authentification, profil
- **organisations** — un utilisateur peut appartenir à plusieurs, avec un rôle
- **projets** — appartiennent à une organisation
- **tâches** — appartiennent à un projet, assignées à un utilisateur

La relation utilisateur ↔ organisation est **plusieurs-à-plusieurs avec un rôle** : c'est la partie qui demande de la réflexion.`,
      steps: [
        "**Modélise les quatre entités** avec les bonnes cardinalités. La table de liaison utilisateur-organisation doit porter le rôle. (leçon 1)",
        "**Écris les migrations et un script de peuplement** reproductible : `prisma migrate reset` suivi du seed doit reconstruire une base utilisable en une commande. (leçon 1)",
        "**Ajoute les index nécessaires**, et justifie **chacun** par une requête réelle de ton application. Prisma n'indexe pas les clés étrangères automatiquement — c'est la cause n°1 de lenteur. (leçon 1)",
        "**Sécurité au niveau des lignes** : un utilisateur ne doit voir que les données des organisations auxquelles il appartient. Vérifie-le par un test qui échoue si l'isolation est cassée. (leçons 1 et 2)",
        "**Identifie une requête N+1 dans ton propre code**, corrige-la, et mesure avant/après avec le journal des requêtes activé. (leçon 1)",
        "**Justifie ton choix de base** en trois lignes : pourquoi PostgreSQL ici, et qu'est-ce qui aurait pu justifier MongoDB ou une colonne JSONB ?",
      ],
      checklist: [
        "`prisma migrate reset` + seed reconstruit une base utilisable en une commande",
        "Chacun de mes index est justifié par une requête réelle, pas ajouté au cas où",
        "J'ai un test qui prouve qu'un utilisateur ne peut pas lire les données d'une autre organisation",
        "J'ai activé le journal des requêtes et compté les requêtes de mes pages principales",
        "Ma table de liaison porte bien le rôle, et pas seulement les deux clés étrangères",
        "Aucune requête à l'intérieur d'une boucle, d'un map, ou d'un composant de liste",
      ],
      selfCheck: `Le vrai test : **active \`log: ["query"]\` et charge la page principale de ton application.**

Compte les requêtes SQL affichées. Si une page qui montre une liste de 20 éléments déclenche plus de 3 requêtes, tu as un N+1 quelque part — et il sera invisible tant que la base est petite.

C'est exactement le genre de problème qui ne se manifeste qu'en production, quand la table passe de 50 à 50 000 lignes.`,
    },
    quizExtra: [
      {
        q: "Une boucle qui fait `await prisma.module.findUnique(...)` pour chacune des 200 leçons. Combien de requêtes ?",
        options: [
          "1, Prisma regroupe automatiquement",
          "201 — c'est le problème N+1 : une requête initiale plus une par ligne",
          "200",
          "2, une par table",
        ],
        answer: 1,
        explain:
          "Le coût n'est pas le travail de la base — chaque requête est instantanée — mais les 200 allers-retours réseau séquentiels imposés par l'await dans la boucle. La correction : `include: { module: true }`, une seule requête avec jointure. Le réflexe : dès qu'une requête est dans une boucle, un map, ou un composant rendu en liste, c'est un N+1.",
      },
      {
        q: "Quelle est la forme la plus DANGEREUSE du problème N+1 ?",
        options: [
          "Celle avec une boucle for explicite",
          "Celle où chaque composant d'une liste charge lui-même ses données : aucune boucle visible, mais 200 requêtes HTTP",
          "Celle qui utilise Promise.all",
          "Celle qui touche plusieurs tables",
        ],
        answer: 1,
        explain:
          "Chaque composant est raisonnable pris isolément, et il n'y a pas de boucle dans le code — c'est ce qui la rend indétectable à la relecture. Mais afficher 200 cartes déclenche 200 requêtes HTTP, pire que 200 requêtes SQL puisque chacune traverse le réseau ET rouvre une connexion. C'est la forme la plus courante en React.",
      },
      {
        q: "À quoi sert `@@unique([userId, leconId])` dans un schéma Prisma ?",
        options: [
          "À accélérer les requêtes sur ces deux colonnes",
          "À garantir qu'un utilisateur ne peut terminer une leçon qu'une fois — la règle métier vit dans la base, pas dans le code",
          "À créer une clé primaire composite",
          "À forcer l'ordre des colonnes",
        ],
        answer: 1,
        explain:
          "Sans elle, un double-clic sur « Terminer » crée deux lignes et attribue l'XP deux fois. Une vérification applicative devrait être présente dans chaque chemin de code, et une requête concurrente passerait quand même. Une contrainte de base ne peut pas être contournée. Elle crée aussi un index au passage, mais ce n'est pas son objet principal.",
      },
      {
        q: "Ton catalogue e-commerce a des attributs différents par catégorie. Que choisis-tu ?",
        options: [
          "MongoDB, PostgreSQL ne gère pas les données variables",
          "PostgreSQL avec une colonne JSONB indexée : colonnes typées pour ce qui est stable, JSONB pour ce qui varie",
          "Une table par catégorie de produit",
          "Une table clé-valeur générique",
        ],
        answer: 1,
        explain:
          "C'est le cas où l'opposition SQL/NoSQL est fausse. Prix, stock et catégorie vont dans des colonnes typées avec leurs contraintes ; les attributs variables vont dans un JSONB indexé en GIN, interrogeable avec l'opérateur @>. On garde l'intégrité et les transactions sur ce qui est stable, et la souplesse sur le reste. C'est pour ça que PostgreSQL est redevenu le choix par défaut, même pour du semi-structuré.",
      },
      {
        q: "« MongoDB est plus rapide que PostgreSQL. » Que répondre ?",
        options: [
          "C'est vrai pour toutes les opérations",
          "La question n'a pas de sens sans préciser l'opération — et le plus souvent la lenteur vient d'un index manquant ou d'un N+1, pas du moteur",
          "C'est faux, PostgreSQL est toujours plus rapide",
          "Cela dépend uniquement du volume de données",
        ],
        answer: 1,
        explain:
          "MongoDB est plus rapide sur l'écriture de documents autonomes et la lecture par clé. PostgreSQL l'est sur les jointures et les agrégations complexes. Mais dans la grande majorité des cas réels, l'écart mesuré vient d'un index absent, d'un N+1 ou d'un schéma mal conçu. Le vrai critère de choix est la forme des données et le besoin de transactions ACID, pas la vitesse.",
      },
      {
        q: "Avec Mongoose, tu modifies `doc.inputData.x = 1` sur un champ de type Mixed, puis `doc.save()`. Que se passe-t-il ?",
        options: [
          "La modification est enregistrée normalement",
          "Elle est silencieusement ignorée : Mongoose ne détecte pas les changements dans un Mixed, il faut appeler doc.markModified(\"inputData\")",
          "Une erreur de validation est levée",
          "Le document entier est remplacé",
        ],
        answer: 1,
        explain:
          "C'est le piège du type Mixed, et il est silencieux : aucune erreur, aucun avertissement, la modification disparaît simplement. Mongoose suit les changements par chemin déclaré ; un Mixed n'ayant pas de structure connue, il ne peut pas savoir ce qui a bougé à l'intérieur. La souplesse du schéma libre a ce prix — c'est le genre de détail qui coûte une demi-journée la première fois.",
      },
      {
        q: "Prisma indexe-t-il automatiquement les clés étrangères ?",
        options: [
          "Oui, comme les clés primaires",
          "Non — c'est la cause n°1 de lenteur sur une base Prisma qui grossit : il faut ajouter @@index explicitement",
          "Oui, mais seulement en PostgreSQL",
          "Cela dépend de la version",
        ],
        answer: 1,
        explain:
          "Prisma indexe les clés primaires et les colonnes @unique, mais pas les clés étrangères. Tant que la table est petite, rien ne se voit ; à 100 000 lignes, chaque jointure devient un balayage complet. Toute colonne servant à filtrer ou joindre fréquemment a besoin de son index — et chacun doit être justifié par une requête réelle, jamais ajouté au cas où, puisqu'un index ralentit les écritures.",
      },
    ],
  },

  // ══ BACKEND : NODE.JS, EXPRESS & API REST ═════════════════════════════════
  "backend-node": {
    lessons: {
      "node-1": [
        {
          id: "node-1-a",
          kind: "application",
          title: "Un script Node qui traite des fichiers",
          statement: `Écris un script \`traiter.js\` qui :

1. lit un dossier \`data/\` et liste tous les fichiers \`.json\`
2. pour chacun, charge le contenu et extrait deux champs de ton choix
3. écrit un \`resultats.json\` agrégé, formaté lisiblement
4. affiche un résumé : nombre de fichiers traités, nombre en erreur
5. ne s'interrompt pas si **un** fichier est corrompu — il le signale et continue

Ajoute les scripts npm \`start\` et \`dev\` dans le \`package.json\`, et utilise \`path.join\` pour que ça fonctionne sur Windows comme sur Linux.`,
          hint: `Utilise les versions **promesses** des API fichiers : \`import { readdir, readFile, writeFile } from "node:fs/promises"\`. Pour le point 5, un \`try/catch\` **à l'intérieur** de la boucle — pas autour.`,
          solution: `\`\`\`javascript
// traiter.js
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DOSSIER = path.join(process.cwd(), "data");

async function traiter() {
  const fichiers = (await readdir(DOSSIER)).filter((f) => f.endsWith(".json"));

  const resultats = [];
  const erreurs = [];

  for (const fichier of fichiers) {
    try {
      const contenu = await readFile(path.join(DOSSIER, fichier), "utf8");
      const donnees = JSON.parse(contenu);
      resultats.push({
        fichier,
        modele: donnees.modelName ?? null,
        confiance: donnees.confidence ?? null,
      });
    } catch (e) {
      // try/catch DANS la boucle : un fichier corrompu n'arrête pas le traitement
      erreurs.push({ fichier, message: e.message });
    }
  }

  await writeFile(
    path.join(process.cwd(), "resultats.json"),
    JSON.stringify(resultats, null, 2),
    "utf8"
  );

  console.log(\`\${resultats.length} fichiers traités, \${erreurs.length} en erreur\`);
  erreurs.forEach((e) => console.error(\`  ✗ \${e.fichier} : \${e.message}\`));
}

traiter().catch((e) => {
  console.error("Échec :", e.message);
  process.exit(1);
});
\`\`\`

\`\`\`json
{
  "type": "module",
  "scripts": {
    "start": "node traiter.js",
    "dev": "node --watch traiter.js"
  }
}
\`\`\`

**\`node:fs/promises\` plutôt que les rappels.** Les versions historiques de \`fs\` prennent une fonction de rappel, ce qui produit l'imbrication qu'on appelle le *callback hell*. Les versions promesses s'utilisent avec \`await\` et se lisent de haut en bas.

**Le \`try/catch\` est dans la boucle, pas autour.** C'est tout le point 5 : autour, le premier fichier corrompu interromprait le traitement des suivants. Dedans, chaque fichier est isolé. C'est un choix de conception qu'il faut faire consciemment — parfois on veut au contraire tout arrêter à la première erreur.

**\`path.join\` plutôt que la concaténation.** \`"data" + "/" + fichier\` casse sur Windows, qui utilise l'antislash. \`path.join\` produit le bon séparateur partout. Même chose pour \`process.cwd()\` plutôt qu'un chemin absolu écrit en dur.

**Le \`process.exit(1)\`** en cas d'échec global : un code de sortie non nul signale l'erreur au shell, à un pipeline CI, ou à un ordonnanceur. Sans lui, un script qui a échoué est considéré comme réussi — exactement le mécanisme du test de non-régression du parcours ML.

**\`node --watch\`** relance le script à chaque modification, sans installer \`nodemon\` : c'est intégré à Node depuis la version 18.`,
        },
        {
          id: "node-1-b",
          kind: "blanche",
          title: "Le serveur qui se fige",
          statement: `**Page blanche.** Diagnostic.

Ce serveur répond normalement, sauf quand quelqu'un appelle \`/rapport\` : pendant **8 secondes**, il ne répond plus à **aucune** requête — même pas à \`/sante\`, qui ne fait rien.

\`\`\`javascript
import express from "express";
import { readFileSync } from "node:fs";

const app = express();

app.get("/sante", (req, res) => res.json({ ok: true }));

app.get("/rapport", (req, res) => {
  const brut = readFileSync("gros-fichier.json", "utf8");   // 400 Mo
  const donnees = JSON.parse(brut);
  const total = donnees.reduce((s, d) => s + d.montant, 0);
  res.json({ total, lignes: donnees.length });
});

app.listen(3000);
\`\`\`

1. explique **pourquoi** \`/sante\` cesse de répondre alors qu'elle ne fait rien
2. identifie les **deux** opérations bloquantes de \`/rapport\`
3. corrige la première
4. la seconde ne se corrige pas de la même façon — explique pourquoi, et donne deux stratégies
5. écris le test qui prouve la correction

**Le point 4 est le cœur.** Passer en asynchrone ne résout pas tout.`,
          hint: `Node exécute ton JavaScript sur **un seul fil**. Tant qu'une fonction s'exécute, rien d'autre ne peut s'exécuter — y compris le traitement des autres requêtes. Demande-toi laquelle des deux opérations rend la main pendant qu'elle travaille, et laquelle occupe le processeur sans interruption.`,
          solution: `**1. Pourquoi \`/sante\` se fige**

Node exécute tout le JavaScript sur **un seul fil**, la boucle d'événements. Tant qu'une fonction s'exécute, la boucle ne peut traiter aucun autre événement — les requêtes entrantes s'accumulent en file d'attente sans être servies.

\`/sante\` n'est pas lente : elle n'a simplement **jamais l'occasion de démarrer**.

**2. Les deux opérations bloquantes**

**a) \`readFileSync\`** — lecture **synchrone** de 400 Mo. Le fil est bloqué pendant toute l'entrée-sortie.

**b) \`JSON.parse\` + \`reduce\` sur 400 Mo** — calcul **pur**, occupant le processeur. Et celle-ci est la plus intéressante.

**3. Corriger la première : passer en asynchrone**

\`\`\`javascript
import { readFile } from "node:fs/promises";

app.get("/rapport", async (req, res) => {
  const brut = await readFile("gros-fichier.json", "utf8");   // rend la main
  // …
});
\`\`\`

Pendant l'attente du disque, la boucle d'événements est **libre** : elle peut servir \`/sante\`. C'est tout l'intérêt du modèle de Node — il n'est pas rapide sur un calcul, il est excellent pour attendre.

**4. Pourquoi la seconde ne se corrige pas ainsi**

\`await\` ne découpe pas un calcul. \`JSON.parse\` sur 400 Mo occupe le processeur de façon continue, et **rien** ne peut s'exécuter pendant ce temps. Envelopper l'appel dans une promesse ne change rien : le travail reste sur le fil principal.

C'est la distinction fondamentale : **Node excelle sur les opérations liées aux entrées-sorties, et souffre sur les opérations liées au processeur.**

**Deux stratégies** :

**a) Un fil de travail (*worker thread*)** — déporter le calcul sur un autre fil :

\`\`\`javascript
// rapport.worker.js
import { parentPort, workerData } from "node:worker_threads";
import { readFileSync } from "node:fs";

const donnees = JSON.parse(readFileSync(workerData.chemin, "utf8"));
parentPort.postMessage({
  total: donnees.reduce((s, d) => s + d.montant, 0),
  lignes: donnees.length,
});
\`\`\`

\`\`\`javascript
// serveur
import { Worker } from "node:worker_threads";

app.get("/rapport", (req, res, next) => {
  const worker = new Worker("./rapport.worker.js", {
    workerData: { chemin: "gros-fichier.json" },
  });
  worker.once("message", (resultat) => res.json(resultat));
  worker.once("error", next);
});
\`\`\`

**b) Le traitement en flux (*streaming*)** — ne jamais charger 400 Mo en mémoire :

\`\`\`javascript
import { createReadStream } from "node:fs";
import { parser } from "stream-json";
import { streamArray } from "stream-json/streamers/StreamArray";

app.get("/rapport", (req, res, next) => {
  let total = 0, lignes = 0;
  createReadStream("gros-fichier.json")
    .pipe(parser()).pipe(streamArray())
    .on("data", ({ value }) => { total += value.montant; lignes++; })
    .on("end", () => res.json({ total, lignes }))
    .on("error", next);
});
\`\`\`

Le flux traite par morceaux et **rend la main entre chacun**, donc la boucle reste réactive. C'est aussi la seule approche qui tienne quand le fichier dépasse la mémoire disponible.

**La meilleure stratégie reste souvent une troisième** : **précalculer**. Un rapport sur 400 Mo n'a pas besoin d'être recalculé à chaque requête — une tâche planifiée qui écrit le résultat, et l'API sert un fichier de 2 Ko.

**5. Le test qui prouve la correction**

\`\`\`javascript
// Lance /rapport, puis martèle /sante pendant ce temps
const rapport = fetch("http://localhost:3000/rapport");

const debut = Date.now();
const latences = [];
for (let i = 0; i < 20; i++) {
  const t = Date.now();
  await fetch("http://localhost:3000/sante");
  latences.push(Date.now() - t);
  await new Promise((r) => setTimeout(r, 100));
}
await rapport;

const max = Math.max(...latences);
console.log("latence max de /sante pendant /rapport :", max, "ms");
// avant : plusieurs milliers de ms      après : < 50 ms
\`\`\`

---

**Le principe : sur un serveur Node, toute fonction synchrone longue bloque *tous* les utilisateurs.**

Les coupables courants : \`readFileSync\`, \`JSON.parse\` sur de gros volumes, les boucles sur de grandes collections, le hachage de mots de passe synchrone, et les expressions régulières catastrophiques.

**Et le mot \`Sync\` dans un nom de fonction est un signal d'alarme dans un serveur** — parfaitement acceptable dans un script en ligne de commande, presque toujours un bug dans un gestionnaire de requête.`,
        },
      ],
      "node-2": [
        {
          id: "node-2-a",
          kind: "application",
          title: "Un CRUD REST avec les bons codes HTTP",
          statement: `Écris une API Express complète pour une ressource \`taches\` :

| Méthode | Route | Comportement attendu |
|---|---|---|
| GET | \`/api/taches\` | liste **paginée** (\`?page=&limite=\`) |
| GET | \`/api/taches/:id\` | une tâche, ou 404 |
| POST | \`/api/taches\` | crée, retourne **201** et l'objet créé |
| PATCH | \`/api/taches/:id\` | modifie partiellement |
| DELETE | \`/api/taches/:id\` | supprime, retourne **204** |

Contraintes :
1. les bons codes HTTP dans **tous** les cas, y compris les erreurs
2. la réponse paginée inclut le total et le nombre de pages
3. un middleware d'erreur **centralisé** — pas de \`try/catch\` répété dans chaque route
4. un middleware de journalisation qui affiche méthode, chemin, code et durée`,
          hint: `Depuis Express 5, une erreur levée dans un gestionnaire \`async\` est transmise automatiquement au middleware d'erreur. En Express 4, il faut un petit enrobage. Le middleware d'erreur se reconnaît à ses **quatre** paramètres : \`(err, req, res, next)\`.`,
          solution: `\`\`\`javascript
import express from "express";

const app = express();
app.use(express.json());

// ── Journalisation ───────────────────────────────────────────────────────
app.use((req, res, next) => {
  const debut = Date.now();
  res.on("finish", () => {
    console.log(\`\${req.method} \${req.originalUrl} \${res.statusCode} \${Date.now() - debut}ms\`);
  });
  next();
});

// ── Erreur métier typée ──────────────────────────────────────────────────
class ErreurHttp extends Error {
  constructor(statut, message) { super(message); this.statut = statut; }
}

// Enrobage pour Express 4 : transmet les rejets au middleware d'erreur
const asyncRoute = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// ── Routes ───────────────────────────────────────────────────────────────
app.get("/api/taches", asyncRoute(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limite = Math.min(100, Math.max(1, Number(req.query.limite) || 20));

  const [taches, total] = await Promise.all([
    prisma.tache.findMany({ skip: (page - 1) * limite, take: limite, orderBy: { id: "asc" } }),
    prisma.tache.count(),
  ]);

  res.json({
    donnees: taches,
    pagination: { page, limite, total, pages: Math.ceil(total / limite) },
  });
}));

app.get("/api/taches/:id", asyncRoute(async (req, res) => {
  const tache = await prisma.tache.findUnique({ where: { id: Number(req.params.id) } });
  if (!tache) throw new ErreurHttp(404, "Tâche introuvable");
  res.json(tache);
}));

app.post("/api/taches", asyncRoute(async (req, res) => {
  const { titre, projetId } = req.body;
  if (!titre) throw new ErreurHttp(422, "Le champ « titre » est obligatoire");
  const tache = await prisma.tache.create({ data: { titre, projetId } });
  res.status(201).location(\`/api/taches/\${tache.id}\`).json(tache);
}));

app.patch("/api/taches/:id", asyncRoute(async (req, res) => {
  const id = Number(req.params.id);
  if (!(await prisma.tache.findUnique({ where: { id } }))) {
    throw new ErreurHttp(404, "Tâche introuvable");
  }
  res.json(await prisma.tache.update({ where: { id }, data: req.body }));
}));

app.delete("/api/taches/:id", asyncRoute(async (req, res) => {
  await prisma.tache.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();                     // 204 : pas de corps
}));

// ── Middleware d'erreur : QUATRE paramètres, et EN DERNIER ───────────────
app.use((err, req, res, next) => {
  const statut = err.statut ?? 500;
  if (statut >= 500) console.error(err);      // on ne journalise que les vraies pannes
  res.status(statut).json({
    erreur: statut >= 500 ? "Erreur interne" : err.message,
  });
});
\`\`\`

**Les codes HTTP ne sont pas décoratifs, ils sont l'interface.** \`201\` avec un en-tête \`Location\` dit « créé, et voici où le trouver ». \`204\` dit « fait, et il n'y a rien à te renvoyer » — d'où l'absence de corps. \`404\` dit « cette ressource n'existe pas », \`422\` « ta requête est bien formée mais son contenu est invalide ».

Une API qui répond \`200 { "success": false }\` à tout oblige chaque client à inspecter le corps pour savoir si ça a marché — et casse tous les outils qui s'appuient sur le protocole : caches, répartiteurs de charge, supervision, tentatives automatiques.

**Le middleware d'erreur centralisé** supprime le \`try/catch\` de chaque route. Il se reconnaît à ses **quatre** paramètres — Express identifie les middlewares d'erreur par leur arité — et doit être déclaré **en dernier**, après toutes les routes.

**Ne jamais renvoyer le message d'une erreur 500 au client** : il contient souvent des chemins de fichiers, des noms de tables ou des fragments de requête SQL. On journalise le détail côté serveur, on renvoie un message générique.

**La pagination borne \`limite\`** : sans le \`Math.min(100, …)\`, un client peut demander \`?limite=999999\` et faire tomber le serveur. C'est un déni de service en une ligne d'URL.

**Le \`Promise.all\`** exécute la liste et le comptage en parallèle plutôt qu'en série — c'est exactement le motif du module JavaScript.`,
        },
        {
          id: "node-2-b",
          kind: "blanche",
          title: "L'API qui répond 200 à tout",
          statement: `**Page blanche.** Refonte d'une interface.

Une équipe a livré cette API. Elle « fonctionne » — le frontend l'utilise sans problème apparent.

\`\`\`javascript
app.get("/api/user/:id", async (req, res) => {
  const user = await db.getUser(req.params.id);
  res.json({ success: !!user, data: user, message: user ? "ok" : "not found" });
});

app.post("/api/user", async (req, res) => {
  try {
    const user = await db.createUser(req.body);
    res.json({ success: true, data: user });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  await db.deleteUser(req.params.id);
  res.json({ success: true });
});
\`\`\`

1. liste **tout** ce qui ne va pas — il y a au moins cinq problèmes distincts
2. réécris les trois routes correctement
3. explique concrètement ce qui **casse** à cause du 200 systématique : cite trois outils ou mécanismes qui cessent de fonctionner
4. explique le risque de sécurité de la route POST
5. explique pourquoi la route DELETE est dangereuse telle quelle

**Le point 3 est le plus convaincant** face à un collègue qui répond « ça marche quand même ».`,
          hint: `Le protocole HTTP a un vocabulaire que toute l'infrastructure comprend : navigateurs, caches, répartiteurs de charge, outils de supervision, bibliothèques clientes. Que se passe-t-il pour eux quand tout répond 200 ? Et pour le point 4, regarde ce qui part vers le client dans le \`catch\`.`,
          solution: `**1. Les cinq problèmes**

**a) Tout répond \`200\`**, y compris les erreurs et les ressources absentes.

**b) Le message d'exception brut est renvoyé au client** — il peut contenir un fragment de requête SQL, un chemin de fichier, un nom de table.

**c) Aucune validation d'entrée** : \`req.body\` part directement dans \`createUser\`.

**d) \`DELETE\` répond \`success: true\` même si l'utilisateur n'existait pas**, et sans aucune autorisation : n'importe qui peut supprimer n'importe quel compte.

**e) L'enveloppe \`{ success, data, message }\` réinvente HTTP.** Le protocole exprime déjà tout ça, en mieux.

**2. La réécriture**

\`\`\`javascript
app.get("/api/user/:id", asyncRoute(async (req, res) => {
  const user = await db.getUser(req.params.id);
  if (!user) throw new ErreurHttp(404, "Utilisateur introuvable");
  res.json(user);                                  // 200 + la ressource, point
}));

app.post("/api/user", asyncRoute(async (req, res) => {
  const parsed = UserSchema.safeParse(req.body);   // validation Zod
  if (!parsed.success) {
    return res.status(422).json({ erreur: "Données invalides", details: parsed.error.issues });
  }
  const user = await db.createUser(parsed.data);
  res.status(201).location(\`/api/user/\${user.id}\`).json(user);
}));

app.delete("/api/user/:id", requireAuth, asyncRoute(async (req, res) => {
  const id = req.params.id;
  if (req.user.id !== id && req.user.role !== "admin") {
    throw new ErreurHttp(403, "Action non autorisée");
  }
  const supprime = await db.deleteUser(id);
  if (!supprime) throw new ErreurHttp(404, "Utilisateur introuvable");
  res.status(204).end();
}));
\`\`\`

**3. Ce qui casse concrètement à cause du 200 systématique**

**Les caches et les CDN.** Ils s'appuient sur le code de statut pour décider de mettre en cache. Une réponse « not found » servie en \`200\` **est mise en cache** — et le jour où l'utilisateur est créé, le cache continue de servir l'erreur.

**La supervision et les alertes.** Datadog, Sentry, les tableaux de bord de Vercel calculent un taux d'erreur à partir des codes 4xx et 5xx. Avec cette API, le taux d'erreur affiché est **0 %** en permanence, même quand tout échoue. On ne détecte plus jamais une panne.

**Les bibliothèques clientes et les tentatives automatiques.** \`axios\` rejette sur 4xx/5xx ; \`fetch\` positionne \`response.ok\`. React Query, SWR et les répartiteurs de charge décident de réessayer ou de basculer sur la base du statut. Avec un 200 universel, chaque client doit inspecter le corps — et chacun le fait à sa façon, ce qui multiplie les bugs.

À quoi s'ajoutent : les tests d'intégration qui doivent parser le corps au lieu de vérifier un statut, et les journaux d'accès du serveur qui deviennent inexploitables.

**4. Le risque de la route POST**

\`res.json({ message: e.message })\` renvoie le message d'exception **brut**. Sur une violation de contrainte, PostgreSQL répond typiquement :

\`\`\`
duplicate key value violates unique constraint "users_email_key"
DETAIL: Key (email)=(cible@example.com) already exists.
\`\`\`

L'attaquant apprend le nom de la table, celui de la contrainte, le schéma — et surtout obtient un **oracle d'énumération** : il peut tester si une adresse est inscrite. Avec une base de fuites, c'est un outil de ciblage.

La règle : **journaliser le détail côté serveur, renvoyer un message générique au client.**

**5. Le danger de la route DELETE**

Elle n'a **ni authentification ni autorisation**. \`curl -X DELETE /api/user/42\` supprime le compte 42. Depuis n'importe où.

Et elle répond \`success: true\` même si rien n'a été supprimé, ce qui masque le problème pendant les tests : tout semble fonctionner.

**Authentification ≠ autorisation.** \`requireAuth\` répond à « qui es-tu ? » ; il faut en plus vérifier « as-tu le droit d'agir sur **cette** ressource ? ». C'est le sujet de l'exercice de la leçon suivante, et la faille la plus répandue des API en production.

---

**Le principe : HTTP est déjà une interface, ne la réinvente pas.**

L'enveloppe \`{ success, data }\` semble pratique, mais elle duplique en moins bien ce que le protocole exprime, et elle rend l'API incompatible avec tout l'outillage standard. Le statut porte le résultat, le corps porte la donnée.`,
        },
      ],
      "node-3": [
        {
          id: "node-3-a",
          kind: "application",
          title: "Authentification par JWT",
          statement: `Implémente une authentification complète :

1. \`POST /api/register\` — hache le mot de passe avec bcrypt (coût 12), refuse un e-mail déjà pris
2. \`POST /api/login\` — vérifie les identifiants et retourne un JWT valable 7 jours
3. un middleware \`requireAuth\` qui lit l'en-tête \`Authorization: Bearer <token>\`
4. \`GET /api/me\` — route protégée qui retourne le profil de l'utilisateur connecté
5. le secret JWT lu depuis une variable d'environnement, et le serveur **refuse de démarrer** s'il est absent

Teste les cas : bon mot de passe, mauvais mot de passe, token absent, token expiré, token modifié à la main.`,
          hint: `\`bcrypt.hash(motDePasse, 12)\` puis \`bcrypt.compare(saisi, hache)\`. Le 12 est le facteur de coût : chaque incrément double le temps de calcul. Pour le point 5, une vérification au démarrage suivie d'un \`process.exit(1)\`.`,
          solution: `\`\`\`javascript
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ── Le serveur refuse de démarrer sans secret ────────────────────────────
const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  console.error("JWT_SECRET manquant ou trop court (32 caractères minimum)");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.post("/api/register", asyncRoute(async (req, res) => {
  const parsed = RegisterSchema.safeParse(req.body);
  if (!parsed.success) throw new ErreurHttp(422, "Données invalides");

  const { email, motDePasse, nom } = parsed.data;
  if (await db.trouverParEmail(email)) {
    // Message volontairement vague : pas d'oracle d'énumération
    throw new ErreurHttp(409, "Inscription impossible avec ces informations");
  }

  const hache = await bcrypt.hash(motDePasse, 12);
  const user = await db.creerUtilisateur({ email, nom, motDePasseHache: hache });
  res.status(201).json({ id: user.id, email: user.email, nom: user.nom });
  //                     ^ jamais le hachage dans la réponse
}));

app.post("/api/login", asyncRoute(async (req, res) => {
  const { email, motDePasse } = req.body;
  const user = await db.trouverParEmail(email);

  // Comparaison même si l'utilisateur n'existe pas : évite de révéler
  // son existence par le temps de réponse (attaque temporelle)
  const valide = user
    ? await bcrypt.compare(motDePasse, user.motDePasseHache)
    : await bcrypt.compare(motDePasse, "$2b$12$invalidhashinvalidhashinvalidha");

  if (!user || !valide) throw new ErreurHttp(401, "Identifiants invalides");

  const token = jwt.sign({ sub: user.id, role: user.role }, SECRET, { expiresIn: "7d" });
  res.json({ token });
}));

// ── Middleware d'authentification ────────────────────────────────────────
export function requireAuth(req, res, next) {
  const entete = req.headers.authorization;
  if (!entete?.startsWith("Bearer ")) {
    return next(new ErreurHttp(401, "Authentification requise"));
  }
  try {
    const charge = jwt.verify(entete.slice(7), SECRET);
    req.user = { id: charge.sub, role: charge.role };
    next();
  } catch (e) {
    const message = e.name === "TokenExpiredError" ? "Session expirée" : "Token invalide";
    next(new ErreurHttp(401, message));
  }
}

app.get("/api/me", requireAuth, asyncRoute(async (req, res) => {
  const user = await db.trouverParId(req.user.id);
  res.json({ id: user.id, email: user.email, nom: user.nom });
}));
\`\`\`

**Le coût 12 de bcrypt est un choix délibéré.** Chaque incrément **double** le temps de calcul : environ 250 ms à 12, sur du matériel courant. C'est imperceptible pour un utilisateur qui se connecte, et cela rend une attaque par force brute des milliers de fois plus coûteuse. Un coût trop bas (4 ou 6) rend le hachage presque inutile.

⚠️ **Corollaire à ne pas oublier** : 250 ms de calcul processeur sur le fil principal de Node. \`bcrypt\` en version asynchrone déporte le travail sur le pool de fils de libuv, ce qui évite de bloquer la boucle — c'est exactement le problème de l'exercice \`node-1-b\`. La version \`bcrypt.hashSync\` bloquerait tout le serveur.

**La comparaison factice quand l'utilisateur n'existe pas** protège d'une attaque temporelle : sans elle, une réponse en 5 ms signifie « ce compte n'existe pas » et une réponse en 250 ms « il existe mais le mot de passe est faux ». On révèle ainsi quels e-mails sont inscrits.

**Le message « Identifiants invalides » est volontairement vague**, pour la même raison. « Mot de passe incorrect » confirmerait l'existence du compte.

**\`sub\` plutôt que \`userId\`** dans la charge utile : c'est le champ standard des JWT pour le sujet.

**Le refus de démarrer sans secret** évite le pire scénario : un déploiement où la variable manque, un secret par défaut utilisé silencieusement, et des tokens forgeables par n'importe qui. Échouer bruyamment au démarrage vaut infiniment mieux que fonctionner de travers.

⚠️ **Un JWT n'est ni chiffré ni révocable.** Sa charge est simplement encodée en base64 : n'importe qui peut la lire. N'y mets jamais d'information sensible. Et un token volé reste valable jusqu'à expiration — d'où l'intérêt de durées courtes plus un jeton de rafraîchissement pour les applications sensibles.`,
        },
        {
          id: "node-3-b",
          kind: "blanche",
          title: "Chacun peut lire les données des autres",
          statement: `**Page blanche.** Faille d'autorisation.

Cette API est protégée : toutes les routes exigent un token valide.

\`\`\`javascript
app.get("/api/projets/:id", requireAuth, asyncRoute(async (req, res) => {
  const projet = await prisma.projet.findUnique({
    where: { id: Number(req.params.id) },
    include: { taches: true },
  });
  if (!projet) throw new ErreurHttp(404, "Projet introuvable");
  res.json(projet);
}));

app.patch("/api/taches/:id", requireAuth, asyncRoute(async (req, res) => {
  const tache = await prisma.tache.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(tache);
}));
\`\`\`

Un utilisateur légitime, avec un token valide, peut lire et modifier les projets de **toutes** les autres organisations.

1. nomme la faille et explique **précisément** le mécanisme
2. montre la requête \`curl\` qui l'exploite
3. corrige les deux routes
4. explique la différence entre **authentification** et **autorisation** — et pourquoi \`requireAuth\` ne suffit jamais
5. écris le **test** qui prouve l'isolation, et qui échouerait sur la version actuelle
6. il reste un second problème sur la route PATCH, indépendant de l'autorisation — trouve-le

**Le point 6 est un piège différent.** Regarde ce que le client peut mettre dans \`req.body\`.`,
          hint: `Le token prouve qui est l'appelant, mais aucune des deux requêtes ne compare cette identité au propriétaire de la ressource demandée. Et pour le point 6 : quels champs \`req.body\` peut-il contenir, et lesquels sont écrits en base ?`,
          solution: `**1. La faille : *Broken Object Level Authorization*** — référence directe à un objet non sécurisée. C'est la vulnérabilité **n° 1 du Top 10 OWASP des API**.

Le mécanisme : \`requireAuth\` vérifie que le token est valide et remplit \`req.user\`. Puis la requête charge la ressource **par son identifiant seul**, sans jamais comparer \`req.user\` au propriétaire. L'identifiant venant de l'URL est entièrement contrôlé par le client.

**2. L'exploitation**

\`\`\`bash
# Token parfaitement légitime de l'utilisateur A
TOKEN="eyJhbGciOi..."

# On énumère les projets des autres
for id in $(seq 1 200); do
  curl -s -H "Authorization: Bearer $TOKEN" localhost:3000/api/projets/$id
done

# Et on modifie la tâche de quelqu'un d'autre
curl -X PATCH -H "Authorization: Bearer $TOKEN" \\
     -H "Content-Type: application/json" \\
     -d '{"titre":"compromis"}' localhost:3000/api/taches/9999
\`\`\`

Aucun outil d'attaque, aucun token volé : un compte légitime et une boucle.

**3. La correction — filtrer par le propriétaire dans la requête elle-même**

\`\`\`javascript
app.get("/api/projets/:id", requireAuth, asyncRoute(async (req, res) => {
  const projet = await prisma.projet.findFirst({
    where: {
      id: Number(req.params.id),
      organisation: { membres: { some: { userId: req.user.id } } },   // ← l'isolation
    },
    include: { taches: true },
  });
  // 404, pas 403 : on ne révèle pas que le projet existe
  if (!projet) throw new ErreurHttp(404, "Projet introuvable");
  res.json(projet);
}));

app.patch("/api/taches/:id", requireAuth, asyncRoute(async (req, res) => {
  const parsed = TachePatchSchema.safeParse(req.body);       // point 6
  if (!parsed.success) throw new ErreurHttp(422, "Données invalides");

  const resultat = await prisma.tache.updateMany({
    where: {
      id: Number(req.params.id),
      projet: { organisation: { membres: { some: { userId: req.user.id } } } },
    },
    data: parsed.data,
  });
  if (resultat.count === 0) throw new ErreurHttp(404, "Tâche introuvable");
  res.json(await prisma.tache.findUnique({ where: { id: Number(req.params.id) } }));
}));
\`\`\`

**Le point décisif : la condition de propriété est dans le \`where\`, pas dans un \`if\` après le chargement.** Charger puis vérifier fonctionne aussi, mais laisse la porte ouverte à l'oubli. Intégrée à la requête, l'isolation devient structurelle.

**Répondre 404 et non 403** : un 403 confirmerait que le projet 47 existe. Le 404 ne dit rien.

**4. Authentification contre autorisation**

**L'authentification** répond à « **qui es-tu ?** ». C'est le rôle du token, et c'est global à la requête.

**L'autorisation** répond à « **as-tu le droit d'agir sur cette ressource précise ?** ». Elle est spécifique à chaque objet et ne peut pas être déléguée à un middleware global — le middleware ne sait pas quelle ressource la route va charger.

C'est exactement pourquoi cette faille est si répandue : l'équipe met en place \`requireAuth\`, coche « sécurité » et passe à la suite. Toutes les routes sont authentifiées, aucune n'est autorisée.

**5. Le test qui prouve l'isolation**

\`\`\`javascript
test("un utilisateur ne peut pas lire le projet d'une autre organisation", async () => {
  const { token: tokenA } = await creerUtilisateurEtOrganisation("a@ex.com");
  const { projetId: projetB } = await creerUtilisateurEtOrganisation("b@ex.com");

  const reponse = await request(app)
    .get(\`/api/projets/\${projetB}\`)
    .set("Authorization", \`Bearer \${tokenA}\`);

  expect(reponse.status).toBe(404);        // échoue sur la version vulnérable : 200
});

test("un utilisateur ne peut pas modifier la tâche d'une autre organisation", async () => {
  const { token: tokenA } = await creerUtilisateurEtOrganisation("a@ex.com");
  const { tacheId: tacheB } = await creerUtilisateurEtOrganisation("b@ex.com");

  const reponse = await request(app)
    .patch(\`/api/taches/\${tacheB}\`)
    .set("Authorization", \`Bearer \${tokenA}\`)
    .send({ titre: "compromis" });

  expect(reponse.status).toBe(404);
});
\`\`\`

**Ce test devrait exister pour chaque ressource de l'API.** C'est le seul moyen d'empêcher la faille de revenir à la première refonte.

**6. Le second problème : l'affectation massive (*mass assignment*)**

\`data: req.body\` écrit en base **tout** ce que le client envoie :

\`\`\`bash
curl -X PATCH … -d '{"titre":"ok","projetId":999,"createdAt":"2020-01-01"}'
\`\`\`

L'utilisateur déplace la tâche vers un autre projet, réécrit sa date de création, et modifie n'importe quel champ du modèle — y compris ceux que l'interface n'expose pas.

La correction est le schéma Zod avec \`.strict()\` : seuls les champs explicitement autorisés passent. **Ne passe jamais \`req.body\` directement à une écriture en base.**

---

**Ces deux failles sont les plus courantes des API en production, et les plus faciles à éviter** — à condition d'y penser à chaque route, et de le prouver par un test.`,
        },
      ],
    },
    finalExercise: {
      title: "API sécurisée et testée",
      duration: "8 à 12 h",
      covers: ["node-1", "node-2", "node-3"],
      brief: `Expose en API la base que tu as conçue au module précédent. Elle doit résister à un utilisateur malveillant.

Cet exercice **rassemble les 3 leçons du module** — Node et l'asynchrone (leçon 1), Express et REST (leçon 2), authentification et sécurité (leçon 3).

L'angle est volontairement celui de l'attaquant : à chaque route, demande-toi ce qu'un utilisateur authentifié mais mal intentionné pourrait en faire. C'est ainsi que travaillent les gens qui sécurisent des API — et c'est ce qui distingue une API livrable d'un prototype.`,
      dataset: `La base du module précédent : utilisateurs, organisations, projets, tâches. Si tu ne l'as pas faite, reprends le schéma de son exercice final.

\`\`\`bash
npm install express zod bcrypt jsonwebtoken
npm install -D vitest supertest
\`\`\``,
      steps: [
        "**CRUD complet** sur projets et tâches, avec les codes HTTP corrects dans tous les cas et une pagination bornée — `limite` plafonnée, sinon `?limite=999999` est un déni de service. (leçon 2)",
        "**Validation Zod sur chaque entrée** : corps, paramètres d'URL, chaîne de requête. Avec `.strict()` pour bloquer l'affectation massive — ne passe jamais `req.body` directement à une écriture. (leçons 2 et 3)",
        "**Authentification JWT et autorisation par rôle** — le secret lu depuis l'environnement, et le serveur refuse de démarrer sans lui. (leçon 3)",
        "**Limitation de débit sur la connexion** : 5 tentatives par minute et par adresse IP. Sans elle, une attaque par force brute est triviale. (leçon 3)",
        "**Tests d'intégration**, dont **un par ressource** qui prouve qu'un utilisateur ne peut pas lire ni modifier les données d'une autre organisation. C'est la faille n°1 du Top 10 OWASP des API. (leçon 3)",
        "**Revue OWASP Top 10** : pour chacune des dix catégories, écris en deux lignes ta position — concerné et traité, concerné et non traité, ou non applicable et pourquoi.",
      ],
      checklist: [
        "Aucune fonction en `…Sync` dans un gestionnaire de requête",
        "Chaque route qui charge une ressource filtre par le propriétaire DANS la requête, pas après",
        "Je ne passe jamais req.body directement à une écriture en base",
        "Mes erreurs 500 ne renvoient jamais le message d'exception au client",
        "J'ai un test d'isolation par ressource, et il échoue si je retire la condition de propriété",
        "Ma limite de pagination est plafonnée côté serveur",
      ],
      selfCheck: `Le vrai test : **crée deux comptes dans deux organisations différentes, puis essaie sincèrement de voler les données de l'un avec le token de l'autre.**

Énumère les identifiants de 1 à 200 avec une boucle \`curl\`. Tente un PATCH sur une ressource qui ne t'appartient pas. Envoie des champs que l'interface n'expose pas.

Si tu obtiens quoi que ce soit d'autre qu'un 404 ou un 422, ton API n'est pas prête — et c'est exactement l'exercice que fera la première personne qui voudra l'attaquer.`,
    },
    quizExtra: [
      {
        q: "Un `readFileSync` de 400 Mo dans une route Express. Quel est l'effet sur les autres requêtes ?",
        options: [
          "Aucun, Express gère les requêtes en parallèle",
          "Toutes les requêtes sont bloquées : Node exécute le JavaScript sur un seul fil, rien d'autre ne peut s'exécuter",
          "Seules les requêtes vers la même route sont ralenties",
          "Node crée automatiquement un nouveau processus",
        ],
        answer: 1,
        explain:
          "Une route /sante qui ne fait rien cesse de répondre — elle n'a jamais l'occasion de démarrer. Le mot « Sync » dans un nom de fonction est un signal d'alarme dans un serveur : acceptable dans un script en ligne de commande, presque toujours un bug dans un gestionnaire de requête. Autres coupables : JSON.parse sur de gros volumes, bcrypt en version synchrone, et les expressions régulières catastrophiques.",
      },
      {
        q: "Passer `readFile` en version asynchrone corrige le blocage. Et pour un `JSON.parse` de 400 Mo ?",
        options: [
          "Le même await suffit",
          "Non : await ne découpe pas un calcul. Il faut un worker thread, du traitement en flux, ou précalculer",
          "Il faut augmenter la mémoire allouée à Node",
          "JSON.parse est déjà asynchrone",
        ],
        answer: 1,
        explain:
          "C'est la distinction fondamentale : Node excelle sur les opérations liées aux entrées-sorties — pendant l'attente, la boucle est libre — et souffre sur les opérations liées au processeur, qui l'occupent sans interruption. Envelopper un calcul dans une promesse ne change rien, le travail reste sur le fil principal. Et la meilleure stratégie est souvent la troisième : précalculer, et servir un fichier de 2 Ko.",
      },
      {
        q: "Une API répond 200 à tout, avec `{ success: false }` dans le corps en cas d'erreur. Qu'est-ce qui casse ?",
        options: [
          "Rien, c'est un choix de style",
          "Les caches mettent les erreurs en cache, la supervision affiche 0 % d'erreur en permanence, et les clients ne peuvent plus décider de réessayer",
          "Seule la lisibilité du code",
          "Uniquement la compatibilité avec GraphQL",
        ],
        answer: 1,
        explain:
          "HTTP est déjà une interface que toute l'infrastructure comprend. Un « not found » servi en 200 est mis en cache par le CDN et continue d'être servi après la création de la ressource. Datadog et Sentry calculent le taux d'erreur sur les 4xx/5xx : il reste à 0 % même quand tout échoue, donc plus aucune alerte. Le statut porte le résultat, le corps porte la donnée.",
      },
      {
        q: "Renvoyer `e.message` d'une exception de base de données au client. Quel est le risque ?",
        options: [
          "Le message est trop technique pour l'utilisateur",
          "Il révèle le schéma — noms de tables et de contraintes — et fournit un oracle permettant de tester si un e-mail est inscrit",
          "Il ralentit la réponse",
          "Aucun si l'API est en HTTPS",
        ],
        answer: 1,
        explain:
          "Une violation de contrainte PostgreSQL renvoie le nom de la table, celui de la contrainte, et souvent la valeur en conflit. L'attaquant apprend le schéma et obtient un moyen d'énumérer les comptes existants — un outil de ciblage direct. La règle : journaliser le détail côté serveur, renvoyer un message générique au client.",
      },
      {
        q: "Toutes tes routes ont `requireAuth`. Un utilisateur peut-il lire les données d'un autre ?",
        options: [
          "Non, le token garantit l'isolation",
          "Oui, si la requête charge la ressource par son seul identifiant sans comparer au propriétaire — c'est la faille n°1 du Top 10 OWASP des API",
          "Non, sauf si le token est volé",
          "Seulement s'il est administrateur",
        ],
        answer: 1,
        explain:
          "L'authentification répond à « qui es-tu ? », l'autorisation à « as-tu le droit d'agir sur CETTE ressource ? ». Un middleware global ne peut pas répondre à la seconde, puisqu'il ignore quelle ressource la route va charger. La correction : mettre la condition de propriété DANS le where de la requête, pas dans un if après le chargement — l'isolation devient structurelle. Et répondre 404 plutôt que 403, pour ne pas confirmer l'existence de la ressource.",
      },
      {
        q: "`prisma.tache.update({ where: { id }, data: req.body })`. Quel est le problème, au-delà de l'autorisation ?",
        options: [
          "req.body doit être converti en JSON",
          "L'affectation massive : le client peut écrire n'importe quel champ du modèle, y compris ceux que l'interface n'expose pas",
          "update ne fonctionne pas avec un objet dynamique",
          "Il manque un await",
        ],
        answer: 1,
        explain:
          "Un client peut envoyer {\"titre\":\"ok\",\"projetId\":999,\"createdAt\":\"2020-01-01\"} et déplacer la tâche, réécrire sa date, modifier des champs invisibles dans l'interface. La correction : un schéma Zod en .strict() qui ne laisse passer que les champs explicitement autorisés. Ne passe jamais req.body directement à une écriture en base.",
      },
    ],
  },

  // ══ DÉPLOIEMENT & PRODUCTION WEB ══════════════════════════════════════════
  "deployment-web": {
    lessons: {
      "deploy-1": [
        {
          id: "deploy-1-a",
          kind: "application",
          title: "Mettre l'application en ligne",
          statement: `Déploie ton application Next.js sur Vercel et ton API Node sur Railway :

1. le dépôt Git connecté, avec un déploiement automatique à chaque push sur \`main\`
2. les variables d'environnement configurées **dans l'interface de la plateforme**, jamais dans le dépôt
3. deux environnements distincts : *preview* (branches) et *production* (\`main\`), avec des **secrets différents**
4. vérifie qu'aucun secret n'est présent dans l'historique Git
5. teste que l'URL de preview et l'URL de production ne pointent **pas** sur la même base de données

Le point 5 est celui qu'on découvre le plus douloureusement.`,
          hint: `Sur Vercel, les variables se déclarent par environnement — Production, Preview, Development. Pour vérifier l'historique Git : \`git log --all -p -- .env\` ou un outil comme \`gitleaks\`.`,
          solution: `\`\`\`bash
# ── Vercel : le frontend ─────────────────────────────────────────────────
npm i -g vercel
vercel login
vercel link                    # relie le dossier au projet Vercel
vercel env add DATABASE_URL production
vercel env add DATABASE_URL preview        # valeur DIFFÉRENTE
vercel --prod

# ── Railway : l'API ──────────────────────────────────────────────────────
npm i -g @railway/cli
railway login
railway init
railway add --database postgres            # provisionne une base
railway up
\`\`\`

\`\`\`bash
# 4. Vérifier qu'aucun secret n'est dans l'historique
git log --all --full-history -p -- .env .env.local | head -50
grep -rn "sk-ant-\\|postgres://\\|BEGIN PRIVATE KEY" $(git rev-list --all) 2>/dev/null | head

# Ou avec l'outil dédié
npx gitleaks detect --source . --verbose
\`\`\`

\`\`\`bash
# 5. Vérifier que preview et production ne partagent pas la base
curl https://mon-app.vercel.app/api/sante          # production
curl https://mon-app-git-ma-branche.vercel.app/api/sante   # preview
# Les deux doivent rapporter un identifiant de base DIFFÉRENT
\`\`\`

**Le point 5 est celui qu'on apprend le plus douloureusement.** Un déploiement de preview qui pointe sur la base de production, c'est un test qui efface des données réelles. Le réflexe : exposer dans un endpoint \`/api/sante\` un identifiant non sensible de l'environnement — nom de la base, empreinte tronquée de l'URL — pour pouvoir vérifier d'un coup d'œil.

**Les variables d'environnement vivent dans la plateforme, pas dans le dépôt.** C'est le prolongement direct du \`.gitignore\` du module Setup : un \`.env\` commité est un secret compromis, et le retirer du fichier ne suffit pas — il faut le **révoquer**.

**\`.env.example\` est en revanche à versionner**, avec les clés et des valeurs factices. C'est la documentation de ce qu'il faut configurer, et ça évite le « ça ne démarre pas chez moi » du module Setup.

**Le déploiement automatique par branche** donne une URL de preview par pull request. C'est ce qui permet de faire relire un changement visuellement avant de fusionner — l'un des vrais apports des plateformes modernes.

⚠️ **Sur Next.js, toute variable préfixée \`NEXT_PUBLIC_\` est intégrée au bundle envoyé au navigateur.** Elle est donc **publique**, lisible par n'importe qui dans les outils de développement. N'y mets jamais une clé d'API secrète : c'est une confusion fréquente et coûteuse.`,
        },
        {
          id: "deploy-1-b",
          kind: "blanche",
          title: "Ça marche en local, ça casse en production",
          statement: `**Page blanche.** Diagnostic à distance.

Ton application tourne parfaitement en local. Le déploiement échoue — ou pire, il réussit et l'application plante à l'ouverture.

Écris le **protocole de diagnostic** pour ces trois symptômes, dans l'ordre des causes les plus probables :

1. le **build** échoue sur la plateforme mais passe en local
2. le build réussit, mais l'application affiche une erreur 500 à l'ouverture
3. tout fonctionne en preview, et casse uniquement en production

Pour chaque symptôme : les causes classées par fréquence, la commande ou l'endroit qui permet de trancher, et le correctif.

Puis donne la commande qui **reproduit localement** les conditions de la plateforme — celle qui aurait évité la moitié de ces problèmes.

**Indice sur le n° 1** : il existe une cause qui ne peut littéralement pas se produire sur un Mac ou sous Windows.`,
          hint: `Pense à ce qui diffère entre ta machine et le serveur : le système de fichiers, la version de Node, les dépendances installées, les variables d'environnement, et le mode d'exécution (développement contre production).`,
          solution: `**SYMPTÔME 1 — le build échoue sur la plateforme, passe en local**

**a) La casse des noms de fichiers.** C'est la cause n°1, et elle est **invisible** sur Mac et Windows, dont les systèmes de fichiers sont insensibles à la casse. Les serveurs tournent sous Linux, qui l'est.
\`import Button from "./components/button"\` alors que le fichier s'appelle \`Button.js\` : ça marche chez toi, ça échoue en production.
*Vérification* : \`git ls-files | grep -i nomdufichier\` pour voir le nom réel enregistré par Git.

**b) Une dépendance en \`devDependencies\` alors qu'elle est utilisée au build.** Les plateformes installent souvent sans les dépendances de développement.
*Vérification* : \`npm ci --omit=dev && npm run build\`.

**c) Une version de Node différente.** Le local est en 22, la plateforme en 18.
*Correctif* : fixer le champ \`engines\` du \`package.json\` et un \`.nvmrc\`.

**d) Une variable d'environnement nécessaire **au build***. Next évalue certaines variables à la construction : si elle manque, le build échoue.

**e) Un fichier ignoré par Git.** Il existe chez toi, il n'est jamais parti.
*Vérification* : \`git status --ignored\` et un clone dans un dossier vierge.

---

**SYMPTÔME 2 — le build passe, l'application renvoie 500**

**a) Une variable d'environnement d'exécution manquante.** Le build n'en avait pas besoin, l'exécution si.
*Vérification* : les journaux d'exécution de la plateforme — pas ceux du build, ce sont deux flux différents.

**b) La base de données inaccessible.** URL incorrecte, adresse IP non autorisée, SSL requis en production.
*Symptôme typique* : \`ECONNREFUSED\` ou \`self signed certificate\` dans les journaux.

**c) Les migrations non appliquées.** Le schéma local est à jour, celui de production non.
*Correctif* : \`prisma migrate deploy\` dans la commande de build ou de démarrage.

**d) Le mauvais port.** La plateforme impose son port via \`process.env.PORT\` ; un port codé en dur ne reçoit rien.
*Correctif* : \`app.listen(process.env.PORT || 3000)\`.

**e) Une différence de fuseau ou de locale**, qui casse un formatage de date ou de nombre.

---

**SYMPTÔME 3 — fonctionne en preview, casse en production**

**a) Des variables définies pour l'environnement Preview mais pas Production.** Cause n°1 de ce symptôme.
*Vérification* : comparer les deux listes dans l'interface de la plateforme, ligne à ligne.

**b) Les deux environnements partagent la base** — et le problème n'apparaît que sur les données réelles : un champ nul inattendu, un volume qui fait expirer une requête.

**c) Une différence de domaine** : cookies, CORS, redirections OAuth configurées pour l'URL de preview uniquement.

**d) Le cache.** La production est derrière un CDN, la preview souvent non. Un contenu périmé y est servi.

---

**La commande qui reproduit les conditions de la plateforme**

\`\`\`bash
# Un clone propre, dans un dossier vierge — élimine tout ce qui traîne en local
git clone <url> /tmp/verif && cd /tmp/verif

# Installation stricte à partir du verrou, sans devDependencies
npm ci --omit=dev

# Build ET exécution en mode production
NODE_ENV=production npm run build
NODE_ENV=production npm start
\`\`\`

**\`npm ci\` plutôt que \`npm install\`** : il installe exactement le contenu du \`package-lock.json\` et échoue si le verrou et le \`package.json\` divergent. C'est ce que font les plateformes, et c'est ce qui attrape les décalages de versions.

**Le clone dans un dossier vierge** est le geste décisif : il élimine d'un coup les fichiers ignorés par Git, les dépendances installées à la main, les \`.env\` locaux et les caches. C'est exactement le test « clone ton propre dépôt » du module Setup Pro, appliqué au déploiement.

---

**Le principe : la différence entre ta machine et la production est une dette qu'on paie au premier déploiement.** Plus tu la réduis tôt — même version de Node, même commande d'installation, même mode d'exécution — moins tu passeras de soirées à déboguer à distance.

**Et le conteneur Docker du parcours ML est la version radicale de cette idée** : au lieu de rapprocher les deux environnements, on expédie le sien.`,
        },
      ],
      "deploy-2": [
        {
          id: "deploy-2-a",
          kind: "application",
          title: "Optimiser jusqu'à 90 de score",
          statement: `Sur ton application déployée, applique les optimisations Next.js et mesure chaque gain :

1. mesure le score Lighthouse de départ sur le **build de production** — pas en mode développement
2. remplace les \`<img>\` par \`next/image\` avec dimensions et \`priority\` sur l'image principale
3. charge en différé (\`next/dynamic\`) au moins un composant lourd non visible au premier écran
4. ajoute la revalidation sur les appels \`fetch\` de données qui changent peu
5. remesure après **chaque** changement, et note le gain de chacun

Objectif : score Performance ≥ 90. Et surtout : sache **lequel** des changements a réellement compté.`,
          hint: `Un score Lighthouse mesuré en mode développement ne veut rien dire — le mode dev désactive les optimisations et ajoute des outils de débogage. Toujours \`npm run build && npm start\`, ou l'URL déployée.`,
          solution: `\`\`\`bash
# 1. La mesure de référence, sur un vrai build
npm run build && npm start
npx lighthouse http://localhost:3000 --view --preset=desktop
\`\`\`

\`\`\`jsx
// 2. next/image : dimensions obligatoires, format moderne, chargement différé auto
import Image from "next/image";

<Image src="/hero.jpg" alt="Aperçu du produit"
       width={1200} height={630}
       priority />                    // priority : uniquement pour l'image du premier écran

<Image src={photo.url} alt={photo.legende}
       width={400} height={300}
       sizes="(max-width: 768px) 100vw, 400px" />
\`\`\`

\`\`\`jsx
// 3. Chargement différé d'un composant lourd
import dynamic from "next/dynamic";

const GraphiqueLourd = dynamic(() => import("./GraphiqueLourd"), {
  loading: () => <p>Chargement du graphique…</p>,
  ssr: false,                          // si le composant dépend du navigateur
});
\`\`\`

\`\`\`javascript
// 4. Revalidation : les données sont mises en cache et rafraîchies toutes les heures
const donnees = await fetch("https://api.exemple.com/stats", {
  next: { revalidate: 3600 },
});

// Pour des données qui changent à chaque requête
const live = await fetch(url, { cache: "no-store" });
\`\`\`

**Le gain vient rarement d'où on l'attend, et c'est pourquoi il faut mesurer après chaque changement.**

**\`next/image\` est presque toujours le plus gros gain.** Il sert du WebP ou de l'AVIF quand le navigateur les accepte, redimensionne selon l'écran, et diffère le chargement des images hors écran. Une photo de 2 Mo devient 80 Ko sans perte visible.

**Les \`width\` et \`height\` sont obligatoires** — et ce n'est pas une contrainte gratuite : elles permettent au navigateur de réserver l'espace avant le chargement, ce qui supprime le décalage de mise en page. Le *Cumulative Layout Shift* est l'une des trois métriques principales de Lighthouse, et les images sans dimensions en sont la cause n°1.

**\`priority\` seulement sur l'image du premier écran.** Le mettre partout annule l'effet : si tout est prioritaire, plus rien ne l'est, et on télécharge dix images avant le premier affichage.

**\`next/dynamic\` ne réduit pas le poids total**, il le **décale** : le composant lourd n'entre pas dans le bundle initial. Utile pour un graphique, un éditeur de texte riche, une carte — inutile, voire nuisible, sur un petit composant, où l'aller-retour supplémentaire coûte plus qu'il ne rapporte.

**Et le premier réflexe avant toute optimisation reste de regarder ce qu'on envoie** : \`npm run build\` affiche la taille de chaque route. Une page à 400 Ko de JavaScript a un problème d'architecture — probablement une frontière \`"use client"\` trop haute, comme au module React — qu'aucune optimisation d'image ne corrigera.`,
        },
        {
          id: "deploy-2-b",
          kind: "blanche",
          title: "Provoquer la panne, la diagnostiquer, l'écrire",
          statement: `**Page blanche.** Exercice d'exploitation.

Tu ne peux pas savoir si ta supervision fonctionne tant que tu ne l'as pas éprouvée. Alors provoque une panne.

1. mets en place une supervision des erreurs sur ton application déployée (Sentry ou équivalent gratuit)
2. **casse volontairement** ta production d'une des façons suivantes — sans prévenir ton futur toi :
   - retire une variable d'environnement nécessaire
   - introduis une erreur qui ne se déclenche que sur une donnée particulière
   - fais expirer ou révoque une clé d'API externe
3. **diagnostique la panne en n'utilisant que les journaux et la supervision** — interdiction de relire le code que tu viens de modifier
4. corrige et vérifie le rétablissement
5. rédige un **post-mortem d'une page**

Chronomètre-toi : combien de temps entre le déclenchement et l'identification de la cause ?

**Le point 3 est la règle du jeu.** Si tu dois relire ton code pour comprendre, ta supervision ne sert à rien.`,
          hint: `Une bonne supervision te donne trois choses : la trace de l'erreur, le contexte — quelle route, quel utilisateur, quelles données — et la fréquence. Si tes journaux ne contiennent que \`Error: undefined\`, c'est le premier problème à corriger, avant même la panne.`,
          solution: `**1. La mise en place**

\`\`\`javascript
// instrumentation.js — Next.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV ?? "development",
  tracesSampleRate: 0.1,
  beforeSend(evenement) {
    // Ne jamais envoyer de données personnelles au service de supervision
    delete evenement.request?.cookies;
    return evenement;
  },
});
\`\`\`

Et un journal structuré côté API — le format JSON permet de filtrer et d'agréger :

\`\`\`javascript
const log = (niveau, message, contexte = {}) =>
  console.log(JSON.stringify({
    horodatage: new Date().toISOString(),
    niveau, message,
    requestId: contexte.requestId,
    ...contexte,
  }));

app.use((req, res, next) => {
  req.requestId = crypto.randomUUID();      // corrèle tous les journaux d'une requête
  next();
});
\`\`\`

**2. La panne à provoquer** — la plus instructive est la troisième : une erreur qui ne survient que sur une donnée particulière. C'est le cas réel le plus fréquent et le plus difficile.

\`\`\`javascript
// Ne plante que si le projet n'a aucune tâche
const avancement = projet.taches.filter((t) => t.faite).length / projet.taches.length;
// -> NaN, puis .toFixed() sur NaN, puis affichage cassé
\`\`\`

**3. Le diagnostic par les journaux seuls**

La démarche, dans l'ordre :

**Quand ?** — la supervision donne l'horodatage de la première occurrence. On le compare à l'heure du dernier déploiement : si les deux coïncident, la cause est dans ce déploiement.

**Quelle fréquence ?** — 3 erreurs ou 3 000 ne mènent pas au même diagnostic. Une erreur rare oriente vers une donnée particulière ; une erreur systématique vers une configuration.

**Sur quelle route, avec quel contexte ?** — la trace donne le fichier et la ligne ; le contexte donne le \`projetId\`, ce qui permet de reproduire.

**Quelle est la donnée déclenchante ?** — c'est là que le contexte enregistré fait la différence entre dix minutes et deux heures.

**Ce que tu découvres en faisant l'exercice** : la plupart des applications de formation ne journalisent rien d'exploitable. Un \`console.error(e)\` sans contexte donne une trace sans savoir **quelle requête, quel utilisateur, quelles données**. Le diagnostic devient impossible, et c'est le vrai enseignement de l'exercice.

**5. Le post-mortem**

\`\`\`markdown
# Post-mortem — affichage cassé sur les projets vides

## Résumé
Le 12/03 de 14h32 à 15h05 (33 min), la page projet renvoyait une erreur
pour tout projet sans tâche. 4 utilisateurs touchés, 61 erreurs.

## Chronologie
14h30  déploiement de la version 2.4.0 (calcul d'avancement)
14h32  première erreur remontée par Sentry
14h41  alerte reçue (seuil : 10 erreurs / 5 min)
14h52  cause identifiée : division par zéro quand taches.length === 0
14h58  correctif déployé
15h05  plus aucune erreur

## Cause
\`taches.filter(...).length / taches.length\` donne NaN sur un tableau vide.
\`NaN.toFixed(1)\` retourne "NaN", et le composant plante en aval.

## Pourquoi ça n'a pas été détecté
- Aucun test sur un projet sans tâche : le jeu de données de test
  contenait toujours au moins une tâche.
- Aucune revue du cas limite « collection vide ».
- 9 minutes entre la première erreur et l'alerte : seuil trop haut.

## Ce que nous changeons
1. Test unitaire sur le calcul d'avancement, cas vide inclus.
2. Jeu de données de seed enrichi d'un projet vide et d'un utilisateur sans projet.
3. Seuil d'alerte abaissé à 3 erreurs / 5 min sur les routes critiques.
4. Revue systématique des divisions : le dénominateur peut-il valoir zéro ?

## Ce que nous ne changeons pas
Le processus de déploiement. Un déploiement plus lent n'aurait rien évité ;
c'est un cas de test manquant, pas un problème de livraison.

## Métriques
Temps de détection : 9 min · Temps de résolution : 33 min
\`\`\`

---

**Trois enseignements** :

**Le cas de la collection vide est le bug le plus universel de l'informatique.** C'est exactement le « qu'est-ce qui casse ça ? » du premier exercice Python du parcours ML — liste vide, division par zéro — retrouvé ici en production, trois modules plus tard.

**Le temps de détection compte autant que le temps de résolution.** Neuf minutes d'alerte sur trente-trois minutes d'incident, c'est un quart du temps perdu avant même de commencer.

**Et un post-mortem qui cherche un coupable ne produit aucune amélioration** — c'est l'un des principes du parcours. Ici, la section « ce que nous ne changeons pas » est aussi importante que l'autre : elle empêche d'alourdir un processus qui n'était pas en cause.`,
        },
      ],
    },
    finalExercise: {
      title: "Mise en production supervisée",
      duration: "5 à 8 h",
      covers: ["deploy-1", "deploy-2"],
      brief: `Ton application en ligne, avec la capacité de détecter et de diagnostiquer un incident.

Cet exercice **rassemble les 2 leçons du module** — déploiement et environnements (leçon 1), performance et supervision (leçon 2). Et il clôt le parcours Web : l'application déployée ici est celle construite au fil des six modules précédents.

L'objectif n'est pas « le site est en ligne ». C'est : **le jour où il casse, tu le sais avant tes utilisateurs, et tu sais pourquoi en moins de dix minutes.**`,
      dataset: `Ton application des modules précédents : le frontend Next.js et l'API Node avec sa base. Si tu n'as pas tout, déploie ce que tu as — la chaîne compte plus que la taille du projet.`,
      steps: [
        "**Chaîne CI/CD** : les tests s'exécutent à chaque push, et le déploiement en production n'a lieu que s'ils passent. Un test rouge doit bloquer la mise en ligne. (leçon 1)",
        "**Environnements preview et production séparés**, avec des secrets ET des bases **distincts**. Vérifie-le par un endpoint `/api/sante` qui rapporte un identifiant d'environnement non sensible. (leçon 1)",
        "**Aucun secret dans l'historique Git** — vérifié avec `gitleaks` ou `git log --all -p`. Et si tu en trouves un : le retirer ne suffit pas, il faut le révoquer. (leçon 1)",
        "**Supervision des erreurs avec alerte** (Sentry ou équivalent), et des journaux structurés avec un identifiant de requête qui corrèle tous les messages d'un même appel. (leçon 2)",
        "**Score Lighthouse Performance ≥ 90** sur l'URL de production, avec le détail de ce qui a produit chaque gain. (leçon 2)",
        "**Provoque une panne volontaire, diagnostique-la par les journaux seuls, et rédige le post-mortem** d'une page — sans désigner de coupable. (leçon 2)",
      ],
      checklist: [
        "Un test rouge bloque effectivement le déploiement — je l'ai vérifié en cassant un test exprès",
        "Preview et production n'utilisent pas la même base : vérifié, pas supposé",
        "gitleaks ne trouve aucun secret dans l'historique",
        "Mes journaux contiennent un identifiant de requête et le contexte, pas juste la trace",
        "J'ai reçu une vraie alerte lors de ma panne volontaire",
        "Mon post-mortem contient une section « ce que nous ne changeons pas »",
      ],
      selfCheck: `Le vrai test, et c'est le dernier du parcours Web : **casse ta production un vendredi soir, ferme ton éditeur, et rouvre le lundi.**

Retrouve la cause en n'utilisant que ta supervision et tes journaux, sans relire le code. Si tu y arrives en moins de dix minutes, tu as construit un système exploitable — ce que la grande majorité des projets personnels ne sont pas.

Si tu dois relire ton code pour comprendre, la supervision est décorative. Et c'est précisément ce qu'on découvre le jour où l'incident est réel.`,
    },
    quizExtra: [
      {
        q: "Ton build passe en local et échoue sur la plateforme. Quelle est la cause n°1 ?",
        options: [
          "Une dépendance manquante dans package.json",
          "La casse d'un nom de fichier dans un import : invisible sur Mac et Windows, fatale sous Linux",
          "Une version de npm différente",
          "Un problème de réseau pendant l'installation",
        ],
        answer: 1,
        explain:
          "`import Button from \"./components/button\"` alors que le fichier s'appelle Button.js fonctionne sur un système de fichiers insensible à la casse — Mac, Windows — et échoue sur Linux, où tournent les serveurs. La vérification : `git ls-files | grep -i nomdufichier` pour voir le nom réel enregistré. Viennent ensuite les devDependencies utilisées au build et les versions de Node divergentes.",
      },
      {
        q: "Quelle commande reproduit le mieux les conditions de la plateforme sur ta machine ?",
        options: [
          "npm install && npm run dev",
          "Un clone dans un dossier vierge, puis npm ci --omit=dev, puis un build et un démarrage en NODE_ENV=production",
          "npm run build uniquement",
          "docker run node:20",
        ],
        answer: 1,
        explain:
          "Le clone dans un dossier vierge est le geste décisif : il élimine d'un coup les fichiers ignorés par Git, les dépendances installées à la main, les .env locaux et les caches. Et `npm ci` installe exactement le contenu du package-lock et échoue si le verrou diverge du package.json — c'est ce que font les plateformes. C'est le test « clone ton propre dépôt » du module Setup, appliqué au déploiement.",
      },
      {
        q: "Sur Next.js, à quoi sert le préfixe `NEXT_PUBLIC_` sur une variable d'environnement ?",
        options: [
          "À la rendre disponible sur toutes les branches",
          "À l'intégrer au bundle envoyé au navigateur — elle devient donc PUBLIQUE et lisible par n'importe qui",
          "À la chiffrer avant l'envoi au client",
          "À la partager entre plusieurs projets Vercel",
        ],
        answer: 1,
        explain:
          "C'est une confusion fréquente et coûteuse : le préfixe ne « publie » pas la variable au sens d'une autorisation, il l'expose littéralement dans le code JavaScript téléchargé par le navigateur. N'y mets jamais une clé d'API secrète — elle serait lisible dans les outils de développement. Réserve-le aux valeurs réellement publiques : une URL d'API, un identifiant d'analytics.",
      },
      {
        q: "Pourquoi un score Lighthouse mesuré en `npm run dev` ne veut-il rien dire ?",
        options: [
          "Lighthouse ne fonctionne pas en local",
          "Le mode développement désactive les optimisations et ajoute des outils de débogage : le score est artificiellement bas",
          "Le mode dev utilise une autre version de React",
          "Il faut être en HTTPS pour que Lighthouse fonctionne",
        ],
        answer: 1,
        explain:
          "Le mode développement recompile à la volée, désactive la minification et inclut les outils de rechargement à chaud. Toujours mesurer sur `npm run build && npm start` ou sur l'URL déployée. Et le premier réflexe avant toute optimisation : regarder la taille par route affichée par le build — une page à 400 Ko de JS a un problème d'architecture qu'aucune optimisation d'image ne corrigera.",
      },
      {
        q: "Pourquoi `width` et `height` sont-ils obligatoires sur `next/image` ?",
        options: [
          "Pour respecter les proportions de l'image",
          "Pour que le navigateur réserve l'espace avant le chargement, ce qui supprime le décalage de mise en page (CLS)",
          "Parce que Next.js ne sait pas lire les dimensions d'un fichier",
          "Pour choisir le format WebP ou AVIF",
        ],
        answer: 1,
        explain:
          "Le Cumulative Layout Shift est l'une des trois métriques principales de Lighthouse, et les images sans dimensions en sont la cause n°1 : le texte saute quand l'image finit de charger. Autre point à retenir : `priority` ne doit être mis QUE sur l'image du premier écran — le mettre partout annule l'effet, puisque si tout est prioritaire, plus rien ne l'est.",
      },
      {
        q: "Ton déploiement de preview utilise la même base de données que la production. Quel est le risque ?",
        options: [
          "Un ralentissement des requêtes",
          "Chaque test sur une branche écrit, modifie ou efface des données réelles d'utilisateurs",
          "Les migrations ne s'appliquent plus",
          "Aucun, tant qu'on ne déploie pas en production",
        ],
        answer: 1,
        explain:
          "C'est l'erreur qu'on n'apprend qu'une fois. Une preview sert à tester librement — y compris des migrations destructrices et des scripts de peuplement. Le réflexe : exposer dans un endpoint /api/sante un identifiant NON sensible de l'environnement (nom de base, empreinte tronquée de l'URL) pour pouvoir vérifier d'un coup d'œil que preview et production sont bien séparées. Vérifié, jamais supposé.",
      },
      {
        q: "Tu provoques une panne pour tester ta supervision. Quelle règle rend l'exercice utile ?",
        options: [
          "Prévenir l'équipe avant de casser quelque chose",
          "S'interdire de relire le code modifié : le diagnostic doit venir uniquement des journaux et de la supervision",
          "Le faire en dehors des heures de bureau",
          "Casser plusieurs choses à la fois pour gagner du temps",
        ],
        answer: 1,
        explain:
          "Si tu dois relire ton code pour comprendre, ta supervision est décorative — et c'est exactement ce qu'on découvre le jour où l'incident est réel. L'exercice révèle que la plupart des projets ne journalisent rien d'exploitable : un console.error(e) sans contexte donne une trace sans savoir quelle requête, quel utilisateur, quelles données. Un identifiant de requête qui corrèle tous les messages d'un même appel change tout.",
      },
    ],
  },

};
