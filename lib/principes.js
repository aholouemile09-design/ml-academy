// ─────────────────────────────────────────────────────────────────────────────
//  Les principes de CodeGraft
// ─────────────────────────────────────────────────────────────────────────────
//
//  Les règles de méthode qui reviennent d'un module à l'autre. Elles ne sont
//  rattachées à aucune leçon en particulier : ce sont les réflexes qui restent
//  quand la syntaxe est oubliée.
//
//  Chaque principe a :
//    court     la formule courte, celle qui défile dans le bandeau
//    titre     l'intitulé de la fiche
//    texte     le développement — pourquoi, et quoi en faire
//    categorie la famille (voir CATEGORIES)
//    source    le module où on le rencontre pour la première fois (facultatif)
//
//  Règle de rédaction : un principe doit tenir dans une phrase mémorisable.
//  S'il en faut trois, c'est qu'il y a en réalité trois principes.
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = {
  apprendre: { label: "Apprendre", icon: "🧠", couleur: "text-accent-light" },
  coder: { label: "Écrire du code", icon: "⌨️", couleur: "text-emerald-400" },
  donnees: { label: "Regarder les données", icon: "🔍", couleur: "text-sky-400" },
  modeles: { label: "Construire des modèles", icon: "🤖", couleur: "text-amber-400" },
  production: { label: "Mettre en production", icon: "🚀", couleur: "text-rose-400" },
};

export const PRINCIPES = [
  // ── Apprendre ─────────────────────────────────────────────────────────────
  {
    id: "reconnaissance-production",
    categorie: "apprendre",
    court: "Comprendre en lisant n'est pas savoir écrire.",
    titre: "La reconnaissance n'est pas la production",
    texte: `Quand tu lis une solution, ton cerveau dit « oui, logique, je suis » — et il a raison, il comprend. Mais comprendre en lisant ne coûte aucun effort de rappel.

Devant l'éditeur vide, on ne te demande plus de reconnaître : on te demande d'aller chercher. Ce sont deux mémoires différentes, et seule la seconde a été sollicitée.

C'est pour ça qu'on peut suivre un cours entier, tout comprendre, et rester tétanisé devant un fichier vide. Ce n'est pas un manque de connaissances, c'est un entraînement qui n'a jamais eu lieu.`,
  },
  {
    id: "module-fini",
    categorie: "apprendre",
    court: "Un module est fini quand tu peux le reproduire fenêtre fermée.",
    titre: "Le seul critère qui compte",
    texte: `« J'ai fini la leçon » ne veut rien dire. « J'ai compris » non plus — c'est même le piège principal.

Le test est simple et sans appel : page blanche, sans copier-coller, sans regarder le cours, tu écris quelque chose qui marche.

Si tu bloques, tant mieux : tu viens d'apprendre exactement où est ton trou. Ce blocage est l'information que tu cherchais, pas un échec.`,
  },
  {
    id: "commentaires-francais",
    categorie: "apprendre",
    court: "Écris le problème en français avant d'écrire du code.",
    titre: "La méthode anti-page blanche",
    texte: `Ne commence jamais par du code. Commence par écrire les étapes en français, en commentaires, dans ton fichier :

\`# 1. ouvrir le fichier / # 2. pour chaque ligne… / # 3. garder ceux au-dessus de 10\`

Puis tu remplis, une étape à la fois, en exécutant après chacune.

Tu ne te demandes jamais « comment j'écris ce programme » — question impossible. Tu te demandes « comment j'ouvre un fichier » — question à laquelle tu sais répondre en trente secondes.

Et ces commentaires restent dans le code final : ils sont devenus sa structure.`,
  },
  {
    id: "decouper-la-question",
    categorie: "apprendre",
    court: "Une question impossible cache trois questions faciles.",
    titre: "Découper avant de chercher",
    texte: `« Comment je fais ce programme ? » n'a pas de réponse. « Comment je trouve le maximum d'une liste ? » en a une, immédiate.

Le blocage vient presque toujours d'une question posée trop haut. Descends d'un cran, puis encore d'un cran, jusqu'à obtenir une question que tu sais traiter.

C'est la compétence qu'on n'enseigne jamais explicitement : passer d'un problème à du code. La syntaxe s'apprend en une semaine, ça, non.`,
  },
  {
    id: "zero-copier-coller",
    categorie: "apprendre",
    court: "Retape le code à la main. Puis referme et réécris-le.",
    titre: "Zéro copier-coller",
    texte: `Copier-coller le code d'un cours ne laisse aucune trace. Le retaper caractère par caractère en laisse une.

Mais l'étape qui compte vraiment vient après : ferme le cours et réécris-le de mémoire. Tu vas échouer — c'est exactement le but. **L'échec de rappel est ce qui grave, pas la lecture.**

Puis modifie-le pour qu'il fasse autre chose. Trois passages, trois profondeurs différentes.`,
  },
  {
    id: "essaie-puis-cherche",
    categorie: "apprendre",
    court: "Essaie d'abord, cherche ensuite.",
    titre: "L'ordre du recours à l'aide",
    texte: `Chercher de l'aide est normal et professionnel. Mais l'ordre change tout.

Même trente secondes de blocage avant de consulter modifient ce qui reste : c'est l'effort de rappel qui ancre, pas la lecture de la réponse.

L'ordre : ton cours et tes notes, puis la documentation, puis l'indice, et la correction en dernier — seulement quand tu as déjà écrit quelque chose, même faux.

Le seul vrai piège serait d'ouvrir la correction avant d'avoir tapé une ligne.`,
  },
  {
    id: "comment-vs-quoi",
    categorie: "apprendre",
    court: "Cherche « comment on écrit ça », jamais « qu'est-ce que je dois faire ».",
    titre: "Les deux types de recherche",
    texte: `**« Comment on écrit ça ? »** — la syntaxe de \`groupby\`, l'ordre des arguments, comment ouvrir un fichier. Cherche, toujours. C'est ce que font les développeurs professionnels toute la journée. Personne ne retient les signatures par cœur.

**« Qu'est-ce que je dois faire ? »** — quelle structure choisir, quelles étapes suivre. Là, non. C'est précisément ce que l'exercice entraîne, et le chercher revient à le supprimer.

La première recherche te fait gagner du temps. La seconde te fait perdre l'exercice.`,
  },
  {
    id: "casse-le-expres",
    categorie: "apprendre",
    court: "Pour comprendre du code, casse-le.",
    titre: "Lire du code existant",
    texte: `Ne lis pas de haut en bas comme un texte. Cherche d'abord le point d'entrée, puis pour chaque fonction : qu'est-ce qui entre, qu'est-ce qui sort. Ignore l'intérieur au premier passage.

Ensuite exécute-le et mets des \`print()\` partout pour voir les valeurs réelles.

Et le meilleur outil de compréhension : **casse-le exprès.** Change une valeur, supprime une ligne, vois ce qui pète. Ce qui casse te dit à quoi ça servait.`,
  },

  // ── Écrire du code ────────────────────────────────────────────────────────
  {
    id: "cas-limite",
    categorie: "coder",
    court: "Une fonction qui plante sur un cas limite n'est pas finie.",
    titre: "Le cas limite fait partie du travail",
    source: "Python",
    texte: `Une fonction qui marche sur l'exemple du cours mais tombe sur une liste vide, une division par zéro ou une valeur manquante n'est pas terminée.

Prends l'habitude de te demander, avant de passer à la suite : **« qu'est-ce qui casse ça ? »**

C'est la question qui sépare un script d'exercice d'un code sur lequel quelqu'un peut compter.`,
  },
  {
    id: "extraire-une-fonction",
    categorie: "coder",
    court: "Si un bloc a un nom clair, il mérite d'être une fonction.",
    titre: "Quand extraire",
    source: "Python",
    texte: `Tu n'as pas besoin d'une règle sur le nombre de lignes. Le signal est plus simple : si tu peux nommer ce que fait un bloc en trois mots, il mérite d'être extrait.

\`mention(note)\`, \`rapport_qualite(df)\`, \`detecter_derive(ref, prod)\` — chacun raconte ce qu'il fait sans qu'on lise son contenu.

C'est ce qui rend un fichier lisible : on peut suivre la logique sans jamais descendre dans les détails.`,
  },
  {
    id: "lire-une-erreur",
    categorie: "coder",
    court: "Savoir lire une erreur vaut plus que connaître dix méthodes.",
    titre: "L'erreur dit où regarder",
    source: "Python",
    texte: `Un \`KeyError: 'prix'\` ne dit pas « ton code est mauvais », il dit « Pandas ne trouve pas ce nom de colonne » — et dans l'immense majorité des cas c'est un espace parasite, une majuscule ou un accent.

Le réflexe n'est pas de deviner, c'est d'aller voir : \`df.columns.tolist()\`.

Chaque message d'erreur contient l'endroit exact où regarder. Apprendre à les lire fait gagner plus de temps que n'importe quelle bibliothèque.`,
  },
  {
    id: "diagnostic-ordonne",
    categorie: "coder",
    court: "Diagnostiquer, c'est éliminer dans l'ordre — pas essayer au hasard.",
    titre: "L'ordre du diagnostic",
    source: "Setup Pro",
    texte: `Devant une panne, la tentation est d'essayer des choses. C'est ce qui fait perdre le plus de temps.

La méthode : lister les causes de la plus fréquente à la plus rare, et les éliminer une par une avec un test à chaque fois.

\`ModuleNotFoundError\` ? D'abord \`which python\` — le venv est-il activé ? C'est le cas dans huit fois sur dix. Faire \`pip install\` directement « marche » parfois, en installant au mauvais endroit, et crée un problème plus difficile la semaine suivante.`,
  },
  {
    id: "mesure-avant-apres",
    categorie: "coder",
    court: "Une optimisation sans mesure avant/après est une croyance.",
    titre: "Mesurer, corriger, remesurer",
    source: "SQL",
    texte: `Avant de toucher à quoi que ce soit, mesure. \`EXPLAIN ANALYZE\` pour une requête, \`%timeit\` pour du Python, les percentiles pour une latence.

Ajouter un index « au cas où » est un anti-patron : chaque index ralentit les écritures. On optimise ce qu'on a mesuré comme lent, jamais ce qu'on imagine lent.

Et note les deux chiffres. « C'est plus rapide » n'est pas un résultat ; « on est passé de 8 s à 40 ms » en est un.`,
  },

  // ── Regarder les données ──────────────────────────────────────────────────
  {
    id: "regarde-avant-de-charger",
    categorie: "donnees",
    court: "Regarde le fichier avant de le charger.",
    titre: "Le premier geste sur une donnée",
    source: "Setup Pro",
    texte: `Cinq commandes au terminal — taille, en-tête, nombre de lignes, recherche, extrait — prennent deux secondes sur un fichier que Pandas mettrait plusieurs minutes à lire.

Elles t'évitent de découvrir au bout de dix minutes que le séparateur est exotique, que l'en-tête tient sur trois lignes, ou que la colonne attendue n'existe pas.

Regarder avant de charger est le réflexe le plus rentable du métier.`,
  },
  {
    id: "bonne-nouvelle-suspecte",
    categorie: "donnees",
    court: "Une performance anormalement bonne est une hypothèse à réfuter.",
    titre: "Le doute face à une bonne nouvelle",
    source: "EDA",
    texte: `Un AUC de 0,99 en détection de fraude ne devrait jamais déclencher une célébration, mais une enquête.

Quand un score s'améliore d'un coup après un changement de préparation des données, la première hypothèse à tester n'est pas « j'ai bien travaillé » mais « ai-je introduit une fuite ? ».

Le doute face à une bonne nouvelle est un réflexe professionnel. Il coûte dix minutes et évite des mois d'illusion.`,
  },
  {
    id: "disponible-au-moment-de-predire",
    categorie: "donnees",
    court: "Cette valeur existe-t-elle à l'instant où je dois prédire ?",
    titre: "La question qui attrape les fuites",
    source: "EDA",
    texte: `Pour chaque variable, une seule question : **au moment où je dois décider, est-ce que je connais déjà cette valeur ?**

\`montant_rembourse\` n'existe qu'après qu'une fraude a été constatée. \`score_risque_final\` est produit en fin de traitement. Les deux corrèlent magnifiquement avec la cible, et les deux seront vides en production.

C'est une question **chronologique**, pas statistique — et c'est pour ça qu'aucune bibliothèque ne la posera à ta place.`,
  },
  {
    id: "fit-train-transform-partout",
    categorie: "donnees",
    court: "fit sur le train, transform partout.",
    titre: "La règle qui évite la fuite la plus courante",
    source: "Feature Engineering",
    texte: `\`fit\` **apprend** quelque chose des données : une moyenne d'imputation, un écart-type de scaling, un vocabulaire d'encodage.

Si ces paramètres sont calculés en incluant le jeu de test, chaque ligne de test a contribué à sa propre normalisation. Le score devient optimiste et ne se reproduit pas.

La règle vaut pour tout ce qui apprend : imputation, scaling, encodage, sélection de variables, PCA. Et le \`Pipeline\` de scikit-learn rend l'erreur structurellement impossible — c'est la vraie raison de l'utiliser.`,
  },
  {
    id: "chiffre-raconte",
    categorie: "donnees",
    court: "Un chiffre qu'on ne sait pas raconter est un chiffre qu'on n'a pas compris.",
    titre: "L'interprétation fait partie du résultat",
    source: "Python",
    texte: `Produire un tableau croisé n'est que la moitié du travail. La phrase qui l'accompagne est l'autre moitié.

« Une femme de première classe avait 97 % de chances de survivre, un homme de troisième classe 13 % — le sexe pesait plus que la classe, mais les deux se cumulaient. »

Si tu ne peux pas écrire cette phrase, tu as calculé sans comprendre. Et c'est cette phrase, pas le tableau, qui permettra à quelqu'un de décider.`,
  },
  {
    id: "graphique-sans-question",
    categorie: "donnees",
    court: "Un graphique sans question n'a rien à dire.",
    titre: "La question d'abord, le graphique ensuite",
    source: "EDA",
    texte: `Vingt graphiques produits par réflexe valent moins que six graphiques répondant chacun à une question écrite au-dessus.

Et le type de graphique découle du type des variables, pas du goût : catégorielle × numérique appelle un boxplot, numérique × numérique un nuage de points, beaucoup de paires une heatmap.

L'œil compare très bien les positions et les longueurs, mal les angles et les surfaces. C'est toute la condamnation du camembert.`,
  },

  // ── Construire des modèles ────────────────────────────────────────────────
  {
    id: "score-parfait-mauvaise-nouvelle",
    categorie: "modeles",
    court: "Un score d'entraînement parfait n'est jamais une bonne nouvelle.",
    titre: "100 % en train veut dire mémorisation",
    source: "ML classique",
    texte: `Un arbre sans contrainte atteint toujours 100 % sur le train : il lui suffit de créer une feuille par exemple. Ce n'est pas de l'apprentissage, c'est une table de correspondance.

Le diagnostic se lit en trois cas : deux courbes basses et proches → sous-apprentissage ; deux hautes et proches → régime sain ; train haute et test basse → mémorisation.

Contraindre un modèle le rend **moins bon sur le train et meilleur sur le test**. C'est contre-intuitif, et c'est tout le métier.`,
  },
  {
    id: "test-une-seule-fois",
    categorie: "modeles",
    court: "Le jeu de test ne se regarde qu'une fois.",
    titre: "Protéger la seule estimation honnête",
    source: "ML classique",
    texte: `Chaque fois que tu ajustes un hyperparamètre en regardant le score de test, tu transformes ce test en jeu de validation.

Au bout de quelques allers-retours, il ne mesure plus rien : il te dit ce que tu as optimisé, pas ce que ton modèle vaudra en production.

Les hyperparamètres se choisissent sur un jeu de validation ou par validation croisée. Le test sert une fois, à la fin, pour rapporter un chiffre.`,
  },
  {
    id: "comparaisons-multiples",
    categorie: "modeles",
    court: "Plus tu essaies de configurations, plus ton meilleur score est optimiste.",
    titre: "Le piège des comparaisons multiples",
    source: "ML classique",
    texte: `Si tu lances cinquante pièces et gardes la meilleure, elle aura l'air biaisée. C'est exactement ce qui se passe avec cinquante essais d'Optuna sur un même jeu de validation.

La meilleure valeur observée combine la vraie qualité du modèle et la chance d'être tombée sur un découpage favorable. Le gain réel est typiquement la moitié du gain annoncé.

La parade est la validation croisée imbriquée : une boucle interne qui optimise, une boucle externe qui évalue et n'a jamais participé au choix.`,
  },
  {
    id: "seuil-economique",
    categorie: "modeles",
    court: "Un seuil de décision est un arbitrage économique, pas un réglage technique.",
    titre: "0,5 n'est presque jamais le bon seuil",
    source: "ML classique",
    texte: `Le 0,5 utilisé par défaut n'est optimal que si les classes sont équilibrées **et** si les deux types d'erreur coûtent la même chose. C'est-à-dire presque jamais.

Si rater une fraude coûte 420 € et bloquer une transaction légitime 20 €, il devient rationnel de bloquer largement : chaque fraude évitée paie vingt et une fausses alertes. Le seuil optimal descend vers 0,08.

La question à poser au métier dès le début d'un projet : **que coûte une fausse alerte, et que coûte un cas manqué ?** Souvent personne n'a le chiffre, et la poser fait plus avancer le projet que trois points d'AUC.`,
  },
  {
    id: "baseline-dabord",
    categorie: "modeles",
    court: "Commence toujours par une baseline. Note son score.",
    titre: "Le chiffre à battre",
    source: "ML classique",
    texte: `Une régression logistique prend trente secondes, s'explique à un non-technicien, et donne le plancher de référence.

Si ton XGBoost optimisé ne la bat pas nettement, la complexité supplémentaire n'est pas justifiée — et tu viens de t'épargner un modèle difficile à maintenir et impossible à expliquer.

Le corollaire : sur données déséquilibrées, chiffre aussi le score d'un modèle trivial qui prédit toujours la classe majoritaire. C'est le vrai plancher, et il est souvent gênant.`,
  },
  {
    id: "meilleur-modele-production",
    categorie: "modeles",
    court: "Le meilleur modèle n'est pas le plus précis, c'est celui qu'on peut maintenir.",
    titre: "Le coût total de possession",
    source: "Séries temporelles",
    texte: `En production, le score n'est qu'un critère parmi cinq : précision, interprétabilité, temps d'entraînement, capacité à intégrer des variables externes, et coût de maintenance.

Un gain de 2 % de précision ne compense jamais un modèle que l'équipe ne saura pas déboguer un dimanche soir.

Si l'écart entre le meilleur et le plus simple est inférieur à l'incertitude de mesure, prends le plus simple. Toujours.`,
  },

  // ── Mettre en production ──────────────────────────────────────────────────
  {
    id: "modele-systeme-vivant",
    categorie: "production",
    court: "Un modèle en production n'est pas un livrable, c'est un système vivant.",
    titre: "Le modèle se dégrade, pas le code",
    source: "MLOps",
    texte: `Le code ne pourrit pas tout seul. Un modèle, si — parce que le monde qu'il décrit change.

Et cette dégradation est **silencieuse** : une API qui répond en 30 ms avec des prédictions fausses affiche exactement les mêmes métriques d'infrastructure qu'une API qui répond juste.

C'est la différence fondamentale entre déployer un logiciel et déployer un modèle. C'est ce qui justifie l'existence du MLOps.`,
  },
  {
    id: "secret-publie",
    categorie: "production",
    court: "Un secret publié est un secret compromis.",
    titre: "Ce que Git ne peut pas défaire",
    source: "Setup Pro",
    texte: `\`git rm --cached .env\` retire le fichier des prochains commits. Il ne l'efface pas de l'historique, ni des serveurs, ni des caches, ni des forks. Des robots scannent les dépôts publics en continu, souvent en moins d'une minute.

Réécrire l'historique est possible et ne change rien au fond : **la seule réponse correcte à un secret exposé est de le remplacer.**

Le \`.gitignore\` se crée au premier commit du projet, avant qu'il y ait quoi que ce soit à protéger.`,
  },
  {
    id: "moindre-privilege",
    categorie: "production",
    court: "Pour chaque permission : que se passe-t-il si cette machine est compromise ?",
    titre: "Le moindre privilège",
    source: "Cloud",
    texte: `\`AmazonS3FullAccess\` « pour aller plus vite » donne un accès en lecture, écriture **et suppression** sur tous les buckets du compte — sauvegardes comprises.

N'accorde que ce qui est nécessaire, sur les ressources exactement concernées. Et sépare les droits : une API qui écrit des logs ne doit jamais pouvoir les effacer, ni remplacer le modèle qu'elle lit.

La même logique vaut pour une image Docker : chaque outil superflu qu'elle contient est une surface d'attaque de plus.`,
  },
  {
    id: "post-mortem-sans-coupable",
    categorie: "production",
    court: "Un post-mortem qui cherche un coupable ne produit aucune amélioration.",
    titre: "Chercher la faille, pas le responsable",
    source: "Cloud",
    texte: `Chercher un responsable pousse chacun à minimiser son rôle, ce qui appauvrit l'analyse et fait disparaître l'information utile.

Chercher la faille systémique produit des correctifs qui tiennent — et personne n'a « oublié » un contrôle qui n'existait pas.

Un bon post-mortem dit ce qui s'est passé, pourquoi ça n'a pas été détecté, ce qu'on change, et **ce qu'on ne change pas**.`,
  },
  {
    id: "proxy-features",
    categorie: "production",
    court: "« Nous n'utilisons pas cette variable » n'est pas une garantie d'équité.",
    titre: "Le modèle reconstitue ce qu'on lui cache",
    source: "MLOps",
    texte: `Retirer la variable sensible ne fait presque jamais disparaître les écarts entre groupes. Le code postal encode partiellement l'origine géographique et sociale, le type de contrat encode partiellement l'âge.

Le modèle reconstitue l'information à partir de variables corrélées, sans jamais l'avoir vue.

C'est pourtant la réponse la plus fréquente en entreprise. La seule façon de savoir est de **mesurer les écarts sur les résultats** : taux d'acceptation, faux positifs et faux négatifs, groupe par groupe.`,
  },
  {
    id: "arbitrage-explicite",
    categorie: "production",
    court: "Rends l'arbitrage explicite et chiffré. Ne le tranche pas en silence.",
    titre: "Ce qui relève du technique, et ce qui n'en relève pas",
    source: "MLOps",
    texte: `On ne peut pas satisfaire simultanément parité démographique, égalité des chances et calibration : c'est un résultat d'impossibilité démontré, pas une limite technique.

Il n'existe donc pas de modèle « équitable » dans l'absolu. Il faut choisir quel critère privilégier — et ce choix est un arbitrage de valeurs, pas un problème d'optimisation.

Le rôle de l'ingénieur est d'apporter les chiffres du compromis, pas de le trancher seul dans le code. **Un choix implicite reste un choix ; simplement, personne ne l'a assumé.**`,
  },
  {
    id: "reproductible-ou-anecdote",
    categorie: "production",
    court: "Un résultat qu'on ne sait pas reproduire est une anecdote.",
    titre: "Fixer les graines, figer les versions",
    source: "MLOps",
    texte: `Sans graine fixée, ton collègue relance ton script et obtient 0,84 au lieu de 0,89 — et personne ne sait si c'est le hasard du découpage ou une vraie différence.

La reproductibilité tient à quatre choses : le code, les **données** (versionnées), l'**environnement** (versions figées) et l'**aléatoire** (graines fixées). La cause n°1 des écarts est la deuxième.

Et comme le déterminisme strict est impossible sur GPU, on rapporte une moyenne et un écart-type sur plusieurs graines. **« F1 = 0,864 ± 0,011 » est honnête ; « F1 = 0,89 » ne l'est pas.**`,
  },
];

/** Le principe du jour — stable sur 24 h, identique pour tout le monde. */
export function principeDuJour(date = new Date()) {
  const jour = Math.floor(date.getTime() / 86_400_000);
  return PRINCIPES[jour % PRINCIPES.length];
}

export function principesParCategorie() {
  const groupes = {};
  for (const cle of Object.keys(CATEGORIES)) {
    groupes[cle] = PRINCIPES.filter((p) => p.categorie === cle);
  }
  return groupes;
}

export function getPrincipe(id) {
  return PRINCIPES.find((p) => p.id === id);
}
