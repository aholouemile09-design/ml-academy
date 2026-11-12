`useEffect` n'est pas un cycle de vie. Ce n'est pas « le code qui s'exécute après le rendu » : c'est un mécanisme de **synchronisation avec un système extérieur à React** — un abonnement, un minuteur, une connexion, une API du navigateur.

La question à se poser avant d'en écrire un n'est donc pas « quand dois-je lancer ça ? » mais **« avec quel système extérieur suis-je en train de me synchroniser ? »**. Quand il n'y en a pas, l'effet est presque toujours de trop.

```jsx
useEffect(() => {
  const connexion = ouvrir(salonId);        // synchronisation
  return () => connexion.fermer();          // désynchronisation
}, [salonId]);                              // quand salonId change, on refait les deux
```

## La plupart des effets ne devraient pas exister

| Ce qu'on écrit en effet | Ce qu'il faut faire |
| --- | --- |
| Calculer une valeur dérivée de l'état | La calculer pendant le rendu, sans état ni effet |
| Réagir à un clic ou à une soumission | Le code va dans le gestionnaire d'événement |
| Réinitialiser l'état quand une prop change | Changer la `key` du composant |
| Mettre à jour un état parent après un changement | Remonter l'état, ou appeler un callback dans l'événement |
| Charger des données | Un composant serveur, ou une bibliothèque de chargement |

Le premier cas est le plus fréquent et le plus coûteux :

```jsx
// À éviter : un rendu de plus, un état à maintenir, un risque de désynchronisation
const [filtrees, setFiltrees] = useState([]);
useEffect(() => { setFiltrees(taches.filter((t) => !t.faite)); }, [taches]);

// Correct
const filtrees = taches.filter((t) => !t.faite);
```

La version avec effet affiche d'abord une liste vide, puis la bonne : deux rendus, et un clignotement visible sur une liste longue. La version directe est juste par construction.

Le second cas est une question d'intention. Un effet répond à « l'écran est affiché, synchronise » ; un gestionnaire répond à « l'utilisateur a fait quelque chose ». Envoyer un message, afficher une notification, journaliser un achat sont des conséquences d'une **action**, pas d'un affichage. Les mettre dans un effet les fait partir deux fois en développement, et au mauvais moment en production.

## Le tableau de dépendances n'est pas un réglage

| Forme | Quand l'effet s'exécute |
| --- | --- |
| Absent | Après **chaque** rendu. Presque toujours un bug |
| `[]` | Une seule fois, au montage |
| `[a, b]` | Au montage, puis chaque fois que `a` ou `b` change |

L'absence de tableau combinée à un `setState` dans l'effet produit une boucle : l'effet modifie l'état, l'état déclenche un rendu, le rendu relance l'effet. C'est le scénario des centaines de requêtes identiques dans l'onglet réseau.

**Le linter a raison.** Retirer une dépendance pour faire taire l'avertissement ne corrige rien : l'effet continue de lire une valeur périmée, capturée dans une fermeture du rendu précédent. Le bug devient simplement plus difficile à voir.

Quand une dépendance relance l'effet trop souvent, la cause est presque toujours une **référence instable** :

```jsx
// filtres est un objet recréé à chaque rendu du parent :
// sa référence change, même si son contenu est identique
useEffect(() => { charger(filtres); }, [filtres]);        // se relance sans cesse

// Dépendre des valeurs primitives
useEffect(() => { charger(periode, tri); }, [periode, tri]);
```

Trois solutions, par ordre de préférence : dépendre de valeurs primitives plutôt que de l'objet ; déplacer la fonction **à l'intérieur** de l'effet, ce qui la retire des dépendances ; ou stabiliser la référence avec `useMemo` / `useCallback` chez celui qui la crée.

## Le nettoyage est la moitié du mécanisme

La fonction renvoyée par un effet est appelée **avant chaque réexécution** et au démontage. C'est ce qui rend les effets rejouables sans accumuler de dégâts.

```jsx
useEffect(() => {
  const controleur = new AbortController();

  (async () => {
    try {
      const r = await fetch(`/api/stats?periode=${periode}`, { signal: controleur.signal });
      setStats(await r.json());
    } catch (e) {
      if (e.name !== "AbortError") setErreur(e.message);
    }
  })();

  return () => controleur.abort();   // annule la requête en cours
}, [periode]);
```

Sans ce nettoyage, deux problèmes se cumulent.

**La course entre réponses.** L'utilisateur passe de « 7 jours » à « 30 jours ». Deux requêtes sont en vol ; rien ne garantit l'ordre d'arrivée. Si la première revient en dernier, elle écrase l'affichage avec les données du filtre précédent, alors que l'interface indique « 30 jours ». Le bug est intermittent et irreproductible à la demande.

**La fuite.** Un `setState` appelé après le démontage travaille pour rien et retient le composant en mémoire. Sur une page où l'on navigue beaucoup, cela s'accumule.

Si l'annulation n'est pas possible — un calcul, une bibliothèque sans `signal` — le drapeau local fait l'affaire :

```jsx
useEffect(() => {
  let annule = false;
  charger().then((d) => { if (!annule) setDonnees(d); });
  return () => { annule = true; };
}, [cle]);
```

Et le rappel qui vaut pour toute cette leçon : **en Next.js, une bonne partie de ces problèmes disparaît avec un composant serveur.** Le chargement se fait avant le rendu, il n'y a ni effet, ni course, ni état de chargement à gérer.

## Les hooks personnalisés

Un hook personnalisé est une fonction dont le nom commence par `use` et qui appelle d'autres hooks. Il ne partage **pas** d'état entre ses appelants : chaque composant qui l'utilise obtient son propre état. C'est de la réutilisation de **logique**, pas de données.

```jsx
export function useLocalStorage(cle, valeurParDefaut) {
  const [valeur, setValeur] = useState(valeurParDefaut);   // identique serveur et client
  const [charge, setCharge] = useState(false);

  useEffect(() => {
    try {
      const brut = localStorage.getItem(cle);
      if (brut !== null) setValeur(JSON.parse(brut));
    } catch { /* navigation privée, quota, JSON corrompu */ }
    setCharge(true);
  }, [cle]);

  useEffect(() => {
    if (!charge) return;            // sans ce garde, on écraserait avant d'avoir lu
    try { localStorage.setItem(cle, JSON.stringify(valeur)); } catch { /* quota */ }
  }, [cle, valeur, charge]);

  return [valeur, setValeur];
}
```

Trois détails portent tout le poids de ces lignes.

**L'état initial doit être identique sur le serveur et sur le client.** Lire `localStorage` dans l'initialiseur de `useState` produit un HTML serveur différent du premier rendu client : c'est une erreur d'hydratation, et React remplace tout l'arbre. D'où la valeur par défaut, puis la lecture dans un effet.

**Le drapeau `charge` évite l'effacement.** Sans lui, le second effet s'exécute au premier rendu avec la valeur par défaut et **écrit par-dessus** les données existantes avant que le premier effet ait eu le temps de les lire.

**Le `try/catch` n'est pas excessif.** `localStorage` lève en navigation privée, quand les cookies sont bloqués, et quand le quota est atteint. Une exception non attrapée dans un hook de ce genre fait tomber toute la page.

## Le contexte, et son coût

```jsx
const ContexteProgression = createContext(null);

export function useProgression() {
  const v = useContext(ContexteProgression);
  if (v === null) throw new Error("useProgression hors de <FournisseurProgression>");
  return v;
}
```

L'erreur explicite remplace un `Cannot read properties of null` qui apparaîtrait trois composants plus loin, sans rapport visible avec la cause.

Le coût qu'on découvre en production : **tout changement de la valeur du contexte réaffiche l'intégralité des consommateurs**, même ceux qui ne lisent que la partie inchangée. Deux mesures l'évitent.

**Mémoriser l'objet de valeur.** Sans cela, `value={{ xp, terminer }}` crée un objet neuf à chaque rendu du fournisseur, donc une nouvelle référence, donc un réaffichage de tous les consommateurs :

```jsx
const valeur = useMemo(() => ({ lecons, xp, terminer }), [lecons, xp, terminer]);
return <ContexteProgression.Provider value={valeur}>{children}</ContexteProgression.Provider>;
```

**Séparer l'état des actions.** Les fonctions, elles, ne changent jamais ; les données changent souvent. Deux contextes — un pour les valeurs, un pour les fonctions stabilisées par `useCallback` — font que les composants qui n'ont besoin que d'un bouton ne se réaffichent plus du tout.

Et la limite à garder en tête : **un contexte n'est pas un gestionnaire d'état.** Il transporte une valeur à travers l'arbre, c'est tout. Pour des données venues du serveur, il n'apporte ni cache, ni déduplication, ni revalidation — c'est le rôle d'une bibliothèque de chargement, ou d'un composant serveur.

## Mémoriser, et quand ça ne sert à rien

```jsx
const trie = useMemo(() => [...lignes].sort(comparer), [lignes]);
const gerer = useCallback((id) => selectionner(id), []);
const Ligne = memo(function Ligne({ ligne }) { /* … */ });
```

| Outil | Ce qu'il fait |
| --- | --- |
| `useMemo` | Garde le **résultat** d'un calcul tant que ses dépendances ne changent pas |
| `useCallback` | Garde la **référence** d'une fonction. C'est `useMemo` pour une fonction |
| `memo` | Évite de réafficher un composant si ses props sont référentiellement identiques |

Les trois ne servent que dans deux situations : un calcul réellement coûteux, ou la **stabilité de référence** exigée par une dépendance d'effet ou par un enfant mémorisé.

Partout ailleurs, ils coûtent plus qu'ils ne rapportent : une comparaison à chaque rendu, de la mémoire retenue, et surtout un tableau de dépendances de plus à maintenir juste. Mémoriser `const total = a + b` est une perte nette.

Le piège classique est le `memo` inutile : il ne sert à rien si le parent passe une fonction en ligne ou un objet littéral, puisque la référence change à chaque fois. Un `memo` sans `useCallback` côté parent est un `memo` qui ne s'active jamais — et on croit avoir optimisé.

Le compilateur React, en cours de déploiement dans l'écosystème, insère ces mémorisations automatiquement. Dans un projet qui l'active, écrire des `useMemo` à la main devient du bruit. Vérifie ce qu'utilise ton projet avant d'en semer partout.

## Les hooks qu'on connaît mal

**`useRef`** garde une valeur entre les rendus **sans** en déclencher. Pour un identifiant de minuteur, un nœud du DOM, la valeur précédente d'une prop. Ne jamais lire ou écrire une `ref` pendant le rendu : c'est une impureté, et React n'en garantit pas le moment.

**`useLayoutEffect`** s'exécute après la mise à jour du DOM mais **avant** que le navigateur ne peigne. C'est ce qu'il faut pour mesurer un élément et le repositionner sans clignotement — une infobulle, un menu qui doit tenir dans l'écran. Il bloque la peinture, donc on ne s'en sert que pour ça. Et il ne s'exécute pas côté serveur, ce qui produit un avertissement en rendu serveur.

**`useId`** génère un identifiant stable, identique sur le serveur et sur le client. C'est la bonne réponse pour relier un `label` à son champ dans un composant réutilisable, là où un compteur ou un nombre aléatoire casserait l'hydratation.

**`useSyncExternalStore`** abonne un composant à une source extérieure à React — un store maison, `localStorage` partagé entre onglets, l'état en ligne du navigateur — en garantissant la cohérence avec le rendu concurrent. C'est la primitive correcte pour ce que l'on bricole habituellement avec `useEffect` et `useState`.

## Mesurer avant d'optimiser

Le profileur des outils React enregistre une interaction et montre, composant par composant, le temps de rendu et **la raison** du réaffichage. L'option « Highlight updates when components render » fait clignoter à l'écran ce qui se réaffiche : dix secondes d'utilisation suffisent à repérer le composant qui se redessine à chaque frappe.

Trois causes couvrent presque tous les cas réels :

Un **état placé trop haut** : une saisie stockée dans un composant racine réaffiche toute la page à chaque caractère. Le descendre là où il sert suffit.

Une **valeur de contexte non mémorisée**, qui réaffiche tous les consommateurs.

Une **liste longue sans virtualisation** : au-delà de quelques centaines de lignes visibles, il faut ne rendre que ce qui est à l'écran.

Et l'ordre compte : mesurer, corriger la cause, remesurer. Une optimisation non mesurée est une complication.

## Au clavier

1. Écris un `useEffect` sans tableau de dépendances contenant un `setState`. Ouvre l'onglet réseau et compte. Puis ajoute `[]`.
2. Dépends d'un objet recréé à chaque rendu du parent, constate la boucle, puis dépends de ses champs primitifs.
3. Reproduis la course : deux requêtes avec des temps de réponse différents, et le mauvais résultat affiché. Corrige avec `AbortController` dans le nettoyage.
4. Écris `useLocalStorage` sans le drapeau `charge`, recharge la page, et constate la perte des données.
5. Mets un `memo` sur un composant enfant et passe-lui une fonction en ligne. Vérifie avec le profileur qu'il se réaffiche quand même, puis ajoute `useCallback`.
6. Active « Highlight updates » et tape dans un champ de recherche. Regarde ce qui clignote.

**Ressources** : « Vous n'avez peut-être pas besoin d'un effet » — https://fr.react.dev/learn/you-might-not-need-an-effect · « Synchroniser avec les effets » — https://fr.react.dev/learn/synchronizing-with-effects
