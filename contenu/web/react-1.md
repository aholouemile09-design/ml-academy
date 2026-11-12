React tient en une équation : **l'interface est une fonction de l'état.** Tu ne décris pas comment passer d'un écran à l'autre, tu décris à quoi ressemble l'écran pour un état donné, et React se charge de la transition. Tout le reste — le rendu, la réconciliation, les clés — n'est que la mécanique qui rend cette promesse tenable.

```jsx
function Compteur() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Cliqué {n} fois</button>;
}
```

## Ce que « rendu » veut dire

Le mot est trompeur. Un **rendu**, c'est simplement React qui appelle ta fonction composant pour obtenir la description de l'écran. Il ne touche pas encore au DOM.

Le cycle complet a trois temps :

1. **Déclenchement** — un `setState`, ou le rendu d'un parent.
2. **Rendu** — React appelle les composants concernés et obtient un arbre d'éléments. C'est du calcul pur, aucun effet visible.
3. **Validation** — React compare ce nouvel arbre au précédent et applique au DOM **uniquement les différences**.

La conséquence est importante et contre-intuitive : **un nouveau rendu qui produit le même résultat ne modifie rien à l'écran.** Un champ de saisie conserve son curseur, une vidéo continue de jouer, le défilement ne bouge pas. « Trop de rendus » n'est donc pas un problème en soi — c'est un problème seulement si le calcul est coûteux ou s'il produit des différences inutiles.

C'est aussi pourquoi un composant doit être une **fonction pure** : appelé deux fois avec les mêmes props et le même état, il doit renvoyer la même chose. Modifier une variable extérieure, muter un objet reçu en props, écrire dans le DOM pendant le rendu : tout cela casse l'hypothèse sur laquelle React s'appuie pour optimiser.

C'est d'ailleurs la raison du comportement qui déroute tout le monde : **en développement, `StrictMode` appelle chaque composant deux fois** et exécute chaque effet deux fois au montage. Ce n'est pas un bug, c'est un détecteur : un composant pur ne s'en aperçoit pas, un composant impur double ses effets de bord et se signale tout seul. En production, cela n'arrive pas.

## L'état est un instantané

Dans un rendu donné, une variable d'état est une **constante**. Elle ne changera pas en cours de route, quoi qu'on fasse.

```jsx
function Compteur() {
  const [n, setN] = useState(0);

  function triple() {
    setN(n + 1);
    setN(n + 1);
    setN(n + 1);
  }
  // n passe de 0 à 1, pas à 3
}
```

Dans ce rendu, `n` vaut `0`. Les trois lignes demandent donc trois fois « mets l'état à 1 ». React les regroupe, applique la dernière, et réaffiche une fois avec `n = 1`.

La forme fonctionnelle lit la valeur la plus récente au moment où la mise à jour est appliquée :

```jsx
setN((precedent) => precedent + 1);   // trois fois → 3
```

**La règle : si la nouvelle valeur dépend de l'ancienne, utilise la forme fonctionnelle.** Sans exception. Ça évite aussi un bug plus subtil, où une mise à jour lancée depuis un minuteur ou une réponse réseau lit une valeur périmée capturée dans une fermeture.

Et le **regroupement** s'applique à tout depuis React 18 : plusieurs `setState` dans un gestionnaire d'événement, dans un `setTimeout` ou après un `await` ne produisent qu'un seul nouveau rendu.

## Pourquoi muter l'état ne change rien à l'écran

React ne compare pas le contenu de l'état — ce serait coûteux. Il compare la **référence**.

```jsx
taches.push(nouvelle);
setTaches(taches);          // même tableau, même référence → React ne fait rien
```

Il faut toujours **remplacer** :

```jsx
setTaches((prev) => [...prev, nouvelle]);
setTaches((prev) => prev.map((t) => (t.id === id ? { ...t, faite: !t.faite } : t)));
setTaches((prev) => prev.filter((t) => t.id !== id));
```

Deux méthodes sont particulièrement traîtresses : **`sort` et `reverse` renvoient le tableau tout en l'ayant modifié sur place.** Le code paraît correct — on affecte bien le retour — et pourtant la référence est inchangée. D'où `[...liste].sort(…)`, ou les méthodes récentes `toSorted()` et `toReversed()` qui renvoient une copie.

Pour un objet imbriqué, la copie par décomposition est superficielle et il faut descendre à chaque niveau :

```jsx
setProfil((p) => ({ ...p, adresse: { ...p.adresse, ville: "Edmonton" } }));
```

Quand la structure devient profonde, c'est le signal qu'il faut soit l'aplatir, soit passer à `useReducer`, soit utiliser une bibliothèque de mise à jour immuable. Trois niveaux de décomposition dans un `setState` est le seuil où le code devient illisible.

## L'état appartient à une position dans l'arbre

C'est le mécanisme que personne n'explique, et il règle trois questions d'un coup.

React n'associe pas l'état à un composant, mais à **sa position dans l'arbre de rendu**. Tant qu'un composant du même type reste à la même place, son état survit — même si ses props changent du tout au tout.

```jsx
{estConnecte ? <Formulaire titre="Profil" /> : <Formulaire titre="Connexion" />}
```

Les deux `Formulaire` sont au même emplacement : **c'est la même instance**, et le texte déjà saisi reste là quand on bascule. Ce n'est pas toujours souhaitable.

À l'inverse, déplacer un composant dans l'arbre réinitialise son état, même visuellement identique.

Le levier explicite est l'attribut `key` :

```jsx
<QuestionQuiz key={indexQuestion} question={q} />
```

Changer la `key` dit à React « ce n'est plus le même composant » : il démonte l'ancien, en monte un neuf, et l'état repart de zéro. **C'est l'usage de `key` qu'on n'enseigne presque jamais** — il ne sert pas qu'aux listes, c'est la façon canonique de réinitialiser un sous-arbre.

L'alternative par `useEffect` qui remet l'état à zéro quand une prop change fonctionne, mais elle provoque un rendu supplémentaire pendant lequel l'ancien état s'affiche brièvement.

## Les clés de liste, et l'index comme fausse bonne idée

```jsx
{taches.map((t) => <LigneTache key={t.id} tache={t} />)}
```

La `key` permet à React de reconnaître un élément d'un rendu à l'autre. Avec l'index comme clé, cette identité suit la **position**, pas la donnée :

```jsx
{taches.map((t, i) => <LigneTache key={i} tache={t} />)}   // à éviter
```

Supprime le premier élément d'une liste de trois : les éléments restants glissent en positions 0 et 1. React croit que les éléments 0 et 1 ont simplement changé de contenu et **conserve leur état interne** — une case cochée, un champ en cours d'édition, une animation — qui se retrouve rattaché à la mauvaise ligne. C'est un bug qui ne se voit qu'avec un état local dans les lignes, donc découvert tard.

L'index est acceptable dans un seul cas : une liste qui n'est jamais réordonnée, ni filtrée, ni amputée, et dont les éléments n'ont aucun état. Autant prendre l'habitude de l'identifiant.

Et la clé doit être **stable** : `key={Math.random()}` ou `key={crypto.randomUUID()}` remonte tout à chaque rendu, ce qui détruit l'état et fait clignoter la page.

## Ne pas stocker ce qui se calcule

L'erreur d'état la plus répandue est la duplication :

```jsx
// À éviter : deux sources de vérité qui vont diverger
const [taches, setTaches] = useState([]);
const [nbRestantes, setNbRestantes] = useState(0);

// Correct : une seule source, le reste se calcule
const [taches, setTaches] = useState([]);
const nbRestantes = taches.filter((t) => !t.faite).length;
```

Toute valeur déductible de l'état n'est pas un état : c'est un calcul, et il se refait à chaque rendu — ce qui coûte quelques microsecondes et garantit qu'il ne peut jamais être faux. Un second `useState` à maintenir synchronisé finira par se désynchroniser, toujours dans le cas qu'on n'avait pas prévu.

Trois questions pour savoir si quelque chose mérite un `useState` : est-ce que ça change au cours du temps, est-ce que ça ne se déduit pas d'autre chose, et est-ce que la vue doit se redessiner quand ça change. Trois « oui » sont nécessaires.

Si la réponse à la dernière est non — un identifiant de minuteur, une valeur précédente, un verrou — c'est `useRef` : une valeur qui survit aux rendus sans en déclencher.

## Faire remonter l'état

Deux composants frères qui doivent partager une donnée la font vivre chez leur parent commun, qui la redescend en props.

```jsx
function Quiz() {
  const [choisie, setChoisie] = useState(null);
  return (
    <>
      <Options choisie={choisie} onChoisir={setChoisie} />
      <Validation active={choisie !== null} />
    </>
  );
}
```

Les props descendent, les événements remontent. Un composant enfant ne modifie jamais ses props : il appelle une fonction que le parent lui a donnée. C'est un flux à sens unique, et c'est ce qui rend une application React lisible — pour comprendre d'où vient une valeur, il suffit de remonter.

Quand la donnée doit traverser cinq niveaux dont aucun ne s'en sert, c'est le moment d'un contexte. Pas avant : trois niveaux de transmission sont normaux et plus explicites qu'un contexte.

## Les champs contrôlés

```jsx
const [texte, setTexte] = useState("");
<input value={texte} onChange={(e) => setTexte(e.target.value)} />
```

Un champ **contrôlé** tire sa valeur de l'état React : le DOM n'est plus la source de vérité, il n'en est que le reflet. C'est ce qui permet de valider à la frappe, de formater en direct, ou de vider le champ depuis ailleurs.

Deux avertissements fréquents, et leur cause :

**« You provided a `value` prop without an `onChange` handler »** — le champ est en lecture seule de fait, puisque rien ne met l'état à jour. Soit tu ajoutes `onChange`, soit tu voulais `readOnly`, soit tu voulais `defaultValue` (champ non contrôlé).

**« A component is changing an uncontrolled input to be controlled »** — l'état initial vaut `undefined` ou `null`, puis devient une chaîne. Initialise toujours un champ texte avec `""`, une case avec `false`.

Le champ **non contrôlé**, avec `defaultValue` et une `ref` lue à la soumission, reste parfaitement valable pour un formulaire simple : moins de rendus, moins de code. Le contrôlé s'impose dès qu'il faut réagir à chaque frappe.

## Deux pièges d'affichage conditionnel

```jsx
{taches.length && <Liste taches={taches} />}
```

Quand la liste est vide, `taches.length` vaut `0`, et `0` est une valeur que React **affiche**. Un zéro apparaît à l'écran, sans explication. Les autres valeurs fausses — `false`, `null`, `undefined` — ne sont pas affichées, d'où la surprise.

La correction est de produire un vrai booléen : `{taches.length > 0 && <Liste … />}`.

Second piège, l'appel au lieu de la référence :

```jsx
<button onClick={supprimer(id)}>      // appelle supprimer AU RENDU
<button onClick={() => supprimer(id)}>  // correct
```

La première forme exécute la fonction pendant le rendu et passe son retour à `onClick`. Avec un `setState` dedans, c'est une boucle infinie immédiate.

## Au clavier

1. Écris un compteur avec trois `setN(n + 1)` dans le même gestionnaire. Observe `n` passer à 1, puis corrige avec la forme fonctionnelle.
2. Fais une liste de trois champs de saisie avec `key={i}`, tape du texte dans chacun, puis supprime le premier. Observe les valeurs glisser. Recommence avec `key={item.id}`.
3. Affiche `{liste.length && <X/>}` avec une liste vide et cherche le zéro à l'écran.
4. Mets un `console.log` dans un composant et compte les appels en développement, puis après `npm run build`.
5. Ajoute un `key` changeante sur un sous-composant à état et vérifie qu'il se réinitialise sans aucun `useEffect`.

**Ressources** : la documentation officielle, entièrement réécrite et excellente — https://fr.react.dev/learn · en particulier « Préserver et réinitialiser l'état » — https://fr.react.dev/learn/preserving-and-resetting-state
