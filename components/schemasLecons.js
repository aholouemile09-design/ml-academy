/**
 * Les schémas d'entête de leçon, un par leçon qui en tire quelque chose.
 *
 * Un schéma est écrit à la main : c'est du contenu pédagogique, pas de la
 * décoration. La règle d'admission est simple — le dessin doit dire ce que le
 * texte dit mal. Une leçon dont le propos tient déjà dans un tableau ou une
 * liste n'a pas de schéma, et c'est volontaire : une vignette par leçon
 * « pour faire joli » coûte une seconde de lecture à chaque ouverture et ne
 * rend rien.
 *
 * Le dessin est écrit dans la page, pas chargé comme image : aucune requête,
 * aucun fichier à stocker, et les couleurs sont les jetons du thème, donc le
 * clair et le sombre partagent la même version.
 *
 * Repère de dessin : 440 × 140, texte uniquement par les composants ci-dessous
 * (jamais de texte libre en JSX, pour que les apostrophes françaises passent).
 */

const TRAIT = "rgb(var(--ink-600))";
const ACCENT = "rgb(var(--accent-light))";
const TEXTE = "rgb(var(--color-text-muted))";
const SURFACE = "rgb(var(--ink-800))";

// ── Vocabulaire de dessin ───────────────────────────────────────────────────
// Trois formes suffisent à tous les schémas : une boîte, une flèche, un mot.

function Boite({ x, y, l = 70, h = 30, t, accent, mono = true, fs = 13, plein = true }) {
  const c = accent ? ACCENT : TRAIT;
  return (
    <>
      <rect
        x={x}
        y={y}
        width={l}
        height={h}
        rx="6"
        fill={plein && !accent ? SURFACE : "none"}
        stroke={c}
        strokeWidth={accent ? 1.5 : 1}
      />
      {t !== undefined && (
        <text
          x={x + l / 2}
          y={y + h / 2 + fs * 0.36}
          textAnchor="middle"
          fontSize={fs}
          fill={accent ? ACCENT : TEXTE}
          fontFamily={mono ? "monospace" : "inherit"}
        >
          {t}
        </text>
      )}
    </>
  );
}

function Fleche({ x1, y1, x2, y2 = y1, accent, epais = 1.5 }) {
  return (
    <path
      d={`M${x1} ${y1} L${x2} ${y2}`}
      stroke={accent ? ACCENT : TRAIT}
      strokeWidth={epais}
      markerEnd={accent ? "url(#fleche-accent)" : "url(#fleche-trait)"}
    />
  );
}

function Legende({ x, y, t, accent, fs = 11, ancre = "start", mono = false }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={ancre}
      fontSize={fs}
      fill={accent ? ACCENT : TEXTE}
      fontFamily={mono ? "monospace" : "inherit"}
    >
      {t}
    </text>
  );
}

/**
 * Tirage pseudo-aléatoire déterministe.
 * Les positions « au hasard » doivent être les mêmes sur le serveur et dans le
 * navigateur, sinon React signale une divergence d'hydratation. Un simple
 * modulo ne convient pas : i * k % n reste une progression régulière, et un
 * nuage ainsi semé sort en diagonales bien visibles.
 */
function alea(graine) {
  const x = Math.sin(graine * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Une petite courbe tracée à partir d'une fonction, pour les schémas math. */
function Courbe({ x0, y0, l, h, f, accent, points = 40 }) {
  const d = Array.from({ length: points + 1 }, (_, i) => {
    const t = i / points;
    return `${i ? "L" : "M"}${(x0 + t * l).toFixed(1)} ${(y0 - f(t) * h).toFixed(1)}`;
  }).join(" ");
  return <path d={d} fill="none" stroke={accent ? ACCENT : TRAIT} strokeWidth="1.5" />;
}

// ── Les schémas ─────────────────────────────────────────────────────────────

export const SCHEMAS = {
  "py-1": {
    alt: "Les noms a et b pointent vers la même liste en mémoire : l'affectation ne copie pas l'objet, elle ajoute une étiquette.",
    dessin: (
      <>
        <Boite x={24} y={26} l={52} t="a" />
        <Boite x={24} y={74} l={52} t="b" />
        <Fleche x1={80} y1={41} x2={150} accent />
        <Fleche x1={80} y1={89} x2={150} accent />
        <Boite x={156} y={44} l={110} h={42} t="[1, 2, 3]" fs={15} accent />
        <Legende x={300} y={60} t="un seul objet" />
        <Legende x={300} y={78} t="deux étiquettes" />
      </>
    ),
  },

  "py-2": {
    alt: "Une compréhension de liste enchaîne deux opérations sur une source : elle filtre, puis transforme, et produit une nouvelle liste.",
    dessin: (
      <>
        <Legende x={20} y={38} t="[ f(x)  for x in source  if g(x) ]" accent fs={13} mono />
        <Boite x={20} y={62} l={74} h={32} t="source" fs={12} />
        <Fleche x1={98} y1={78} x2={128} />
        <Boite x={132} y={62} l={74} h={32} t="if g(x)" fs={12} />
        <Fleche x1={210} y1={78} x2={240} />
        <Boite x={244} y={62} l={74} h={32} t="f(x)" fs={12} />
        <Fleche x1={322} y1={78} x2={352} accent />
        <Boite x={356} y={62} l={64} h={32} t="liste" fs={12} accent />
        <Legende x={169} y={112} t="on garde" ancre="middle" fs={10} />
        <Legende x={281} y={112} t="on transforme" ancre="middle" fs={10} />
      </>
    ),
  },

  "py-3": {
    alt: "Une boucle Python traite les éléments un par un ; NumPy applique la même opération à tout le tableau en un seul appel compilé.",
    dessin: (
      <>
        <Legende x={20} y={26} t="boucle Python — un élément à la fois" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Boite key={i} x={20 + i * 34} y={36} l={26} h={22} />
        ))}
        <Legende x={20} y={86} t="NumPy — tout le tableau d'un coup" accent />
        <Boite x={20} y={96} l={194} h={22} accent />
        <Legende x={250} y={52} t="6 allers-retours" fs={12} />
        <Legende x={250} y={112} t="1 appel compilé" accent fs={12} />
      </>
    ),
  },

  "sql-2": {
    alt: "Les quatre jointures diffèrent par les lignes conservées : INNER garde l'intersection, LEFT toute la table de gauche, RIGHT celle de droite, FULL les deux.",
    dessin: (
      <>
        {[
          ["INNER", 34, [false, true, false]],
          ["LEFT", 142, [true, true, false]],
          ["RIGHT", 250, [false, true, true]],
          ["FULL", 358, [true, true, true]],
        ].map(([nom, cx, [g, i, d]]) => (
          <g key={nom}>
            <circle cx={cx - 14} cy={56} r="24" fill={g ? ACCENT : "none"} fillOpacity={g ? 0.28 : 0} stroke={TRAIT} />
            <circle cx={cx + 14} cy={56} r="24" fill={d ? ACCENT : "none"} fillOpacity={d ? 0.28 : 0} stroke={TRAIT} />
            {i && (
              // Les deux arcs se rejoignent aux intersections exactes des
              // cercles : 56 ± √(24² − 14²), soit 36,5 et 75,5.
              <path
                d={`M${cx} 36.5 A24 24 0 0 1 ${cx} 75.5 A24 24 0 0 1 ${cx} 36.5 Z`}
                fill={ACCENT}
                fillOpacity="0.55"
                stroke="none"
              />
            )}
            <Legende x={cx - 30} y={60} t="A" ancre="middle" fs={10} mono />
            <Legende x={cx + 30} y={60} t="B" ancre="middle" fs={10} mono />
            <Legende x={cx} y={104} t={nom} ancre="middle" accent fs={12} mono />
          </g>
        ))}
        <Legende x={220} y={128} t="les lignes conservées, pas les colonnes" ancre="middle" fs={10} />
      </>
    ),
  },

  "math-1": {
    alt: "Un scalaire est un nombre, un vecteur une colonne de nombres, une matrice une grille : le produit matriciel enchaîne les trois.",
    dessin: (
      <>
        <Legende x={40} y={24} t="scalaire" ancre="middle" fs={10} />
        <Boite x={24} y={56} l={32} h={28} t="3" fs={13} />
        <Legende x={118} y={24} t="vecteur" ancre="middle" fs={10} />
        {[0, 1, 2].map((i) => (
          <Boite key={i} x={102} y={32 + i * 26} l={32} h={24} />
        ))}
        <Legende x={226} y={24} t="matrice" ancre="middle" fs={10} />
        {[0, 1, 2].map((i) =>
          [0, 1, 2].map((j) => <Boite key={`${i}-${j}`} x={184 + j * 28} y={32 + i * 26} l={26} h={24} />)
        )}
        <Legende x={300} y={60} t="M @ v" accent fs={14} mono />
        <Fleche x1={344} y1={56} x2={372} accent />
        {[0, 1, 2].map((i) => (
          <Boite key={i} x={380} y={32 + i * 26} l={32} h={24} accent plein={false} />
        ))}
      </>
    ),
  },

  "math-2": {
    alt: "Le gradient est la pente de la courbe en un point ; la descente de gradient avance pas à pas dans le sens opposé, jusqu'au creux.",
    dessin: (
      <>
        <Courbe x0={30} y0={124} l={300} h={96} f={(t) => (2 * t - 1.1) ** 2 * 0.8} />
        {[0.07, 0.22, 0.38, 0.5].map((t, i) => {
          const x = 30 + t * 300;
          const y = 124 - (2 * t - 1.1) ** 2 * 0.8 * 96;
          return <circle key={i} cx={x} cy={y} r="4" fill={ACCENT} opacity={0.4 + i * 0.2} />;
        })}
        <Fleche x1={52} y1={34} x2={92} y2={62} accent />
        <Legende x={56} y={26} t="pente = gradient" accent fs={11} />
        <Legende x={185} y={134} t="chaque pas descend la pente" ancre="middle" fs={10} />
        <Legende x={348} y={118} t="minimum" accent fs={11} />
      </>
    ),
  },

  "math-4": {
    alt: "La SVD trouve l'axe qui porte le plus de variance ; projeter le nuage sur cet axe réduit la dimension en perdant peu d'information.",
    dessin: (
      <>
        {Array.from({ length: 22 }, (_, i) => {
          const t = i / 21;
          const x = 36 + t * 150;
          const y = 104 - t * 68 + (((i * 37) % 11) - 5) * 2.6;
          return <circle key={i} cx={x} cy={y} r="3" fill={TRAIT} />;
        })}
        <path d="M30 110 L196 34" stroke={ACCENT} strokeWidth="1.5" />
        <Legende x={120} y={128} t="axe de plus grande variance" ancre="middle" accent fs={10} />
        <Fleche x1={212} y1={70} x2={250} accent />
        {Array.from({ length: 22 }, (_, i) => (
          <circle key={i} cx={268 + i * 7} cy={70} r="3" fill={TRAIT} />
        ))}
        <Legende x={344} y={48} t="2 dimensions → 1" ancre="middle" fs={11} />
        <Legende x={344} y={96} t="l'essentiel est conservé" ancre="middle" fs={10} />
      </>
    ),
  },

  "math-6": {
    alt: "Un test d'hypothèse découpe la distribution : au centre on ne rejette pas, dans les queues on rejette. L'intervalle de confiance est la zone centrale.",
    dessin: (
      <>
        <Courbe
          x0={60}
          y0={110}
          l={320}
          h={84}
          f={(t) => Math.exp(-((t - 0.5) ** 2) / 0.045)}
          accent
        />
        <path d="M60 110 H380" stroke={TRAIT} />
        <path d="M148 110 V34" stroke={TRAIT} strokeDasharray="3 3" />
        <path d="M292 110 V34" stroke={TRAIT} strokeDasharray="3 3" />
        <Legende x={220} y={82} t="on ne rejette pas" ancre="middle" fs={11} />
        <Legende x={220} y={99} t="intervalle à 95 %" ancre="middle" accent fs={10} />
        <Legende x={96} y={128} t="rejet" ancre="middle" fs={10} />
        <Legende x={344} y={128} t="rejet" ancre="middle" fs={10} />
        <Legende x={96} y={30} t="2,5 %" ancre="middle" fs={10} />
        <Legende x={344} y={30} t="2,5 %" ancre="middle" fs={10} />
      </>
    ),
  },

  "fe-1": {
    alt: "L'encodage one-hot remplace une colonne catégorielle par une colonne binaire par modalité : aucune modalité n'est plus grande qu'une autre.",
    dessin: (
      <>
        <Legende x={24} y={26} t="couleur" fs={11} mono />
        {["rouge", "vert", "bleu"].map((v, i) => (
          <Boite key={v} x={24} y={36 + i * 30} l={72} h={26} t={v} fs={11} />
        ))}
        <Fleche x1={104} y1={78} x2={140} accent />
        <Legende x={152} y={26} t="rouge   vert   bleu" fs={11} mono />
        {[
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ].map((ligne, i) =>
          ligne.map((v, j) => (
            <Boite
              key={`${i}-${j}`}
              x={152 + j * 54}
              y={36 + i * 30}
              l={48}
              h={26}
              t={String(v)}
              fs={11}
              accent={v === 1}
            />
          ))
        )}
        <Legende x={334} y={74} t="pas d'ordre" fs={11} />
        <Legende x={334} y={92} t="inventé" fs={11} />
      </>
    ),
  },

  "fe-2": {
    alt: "Deux variables d'ordres de grandeur très différents écrasent la plus petite ; la mise à l'échelle leur redonne le même poids.",
    dessin: (
      <>
        <Legende x={24} y={26} t="avant" fs={11} />
        <Boite x={24} y={34} l={230} h={22} t="salaire : 0 → 80 000" fs={11} />
        <Boite x={24} y={62} l={16} h={22} />
        <Legende x={48} y={78} t="âge : 0 → 80" fs={11} />
        <Legende x={24} y={110} t="le modèle ne voit plus que le salaire" fs={10} />
        <Fleche x1={266} y1={60} x2={296} accent />
        <Legende x={310} y={26} t="après" accent fs={11} />
        <Boite x={310} y={34} l={110} h={22} t="0 → 1" fs={11} accent />
        <Boite x={310} y={62} l={110} h={22} t="0 → 1" fs={11} accent />
        <Legende x={310} y={110} t="même poids" fs={10} />
      </>
    ),
  },

  "ml-1": {
    alt: "En apprentissage supervisé, le modèle apprend sur des exemples étiquetés, puis prédit l'étiquette de données qu'il n'a jamais vues.",
    dessin: (
      <>
        <Legende x={24} y={26} t="entraînement" fs={11} />
        <Boite x={24} y={36} l={60} h={28} t="X" fs={13} />
        <Boite x={24} y={70} l={60} h={28} t="y" fs={13} accent />
        <Fleche x1={90} y1={66} x2={124} />
        <Boite x={130} y={50} l={94} h={36} t="modèle" fs={13} mono={false} accent />
        <Legende x={177} y={106} t="apprend la règle" ancre="middle" fs={10} />
        <Fleche x1={230} y1={68} x2={266} accent />
        <Legende x={274} y={40} t="données nouvelles" fs={10} />
        <Boite x={274} y={48} l={60} h={28} t="X'" fs={13} />
        <Fleche x1={340} y1={62} x2={364} accent />
        <Boite x={370} y={48} l={50} h={28} t="ŷ" fs={13} accent />
      </>
    ),
  },

  "ml-3": {
    alt: "Un arbre de décision enchaîne des questions jusqu'à une feuille ; une forêt aléatoire fait voter des centaines d'arbres différents.",
    dessin: (
      <>
        <Boite x={62} y={14} l={92} h={24} t="âge < 30 ?" fs={11} mono={false} accent />
        <Fleche x1={92} y1={40} x2={60} y2={58} />
        <Fleche x1={124} y1={40} x2={156} y2={58} />
        <Legende x={62} y={54} t="oui" ancre="middle" fs={9} />
        <Legende x={154} y={54} t="non" ancre="middle" fs={9} />
        <Boite x={16} y={60} l={78} h={24} t="revenu ?" fs={11} mono={false} />
        <Boite x={124} y={60} l={64} h={24} t="classe B" fs={11} mono={false} />
        <Fleche x1={40} y1={86} x2={28} y2={100} />
        <Fleche x1={70} y1={86} x2={82} y2={100} />
        <Boite x={6} y={102} l={48} h={22} t="A" fs={11} mono={false} />
        <Boite x={62} y={102} l={48} h={22} t="B" fs={11} mono={false} />
        <path d="M214 20 V124" stroke={TRAIT} strokeDasharray="4 4" />
        <Legende x={236} y={44} t="× 300 arbres, chacun sur" fs={11} />
        <Legende x={236} y={62} t="un tirage différent" fs={11} />
        <Legende x={236} y={92} t="la forêt prend le vote majoritaire" accent fs={11} />
      </>
    ),
  },

  "ml-4": {
    alt: "La matrice de confusion croise la vérité et la prédiction : les erreurs se lisent hors de la diagonale, et chaque métrique en est un rapport.",
    dessin: (
      <>
        <Legende x={100} y={22} t="prédit" ancre="middle" fs={10} />
        <Legende x={60} y={46} t="pos." ancre="middle" fs={10} />
        <Legende x={140} y={46} t="nég." ancre="middle" fs={10} />
        <Legende x={16} y={74} t="réel +" fs={10} />
        <Legende x={16} y={112} t="réel −" fs={10} />
        <Boite x={24} y={54} l={72} h={34} t="VP" fs={12} accent />
        <Boite x={104} y={54} l={72} h={34} t="FN" fs={12} />
        <Boite x={24} y={92} l={72} h={34} t="FP" fs={12} />
        <Boite x={104} y={92} l={72} h={34} t="VN" fs={12} accent />
        <Legende x={208} y={56} t="précision = VP / (VP + FP)" fs={11} mono />
        <Legende x={208} y={80} t="rappel    = VP / (VP + FN)" fs={11} mono />
        <Legende x={208} y={110} t="la diagonale est ce qui va bien" accent fs={10} />
      </>
    ),
  },

  "ml-5": {
    alt: "Sans étiquettes, le modèle ne peut que regrouper : il découpe le nuage de points en groupes homogènes, sans savoir ce qu'ils représentent.",
    dessin: (
      <>
        {Array.from({ length: 30 }, (_, i) => (
          <circle key={i} cx={34 + alea(i) * 150} cy={30 + alea(i + 70) * 92} r="3.5" fill={TRAIT} />
        ))}
        <Legende x={110} y={132} t="aucune étiquette" ancre="middle" fs={10} />
        <Fleche x1={204} y1={74} x2={240} accent />
        {[
          [288, 48],
          [364, 42],
          [330, 100],
        ].map(([cx, cy], g) => (
          <g key={g}>
            <circle cx={cx} cy={cy} r="30" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeDasharray="3 3" />
            {Array.from({ length: 7 }, (_, i) => (
              <circle
                key={i}
                cx={cx - 16 + alea(i + g * 31) * 32}
                cy={cy - 16 + alea(i + g * 31 + 70) * 32}
                r="3.5"
                fill={ACCENT}
              />
            ))}
          </g>
        ))}
      </>
    ),
  },

  "st-1": {
    alt: "Une série temporelle se décompose en trois signaux superposés : une tendance, une saisonnalité répétée et un bruit résiduel.",
    dessin: (
      <>
        <Legende x={20} y={20} t="série observée" accent fs={10} />
        <Courbe
          x0={20}
          y0={56}
          l={180}
          h={34}
          f={(t) => 0.25 + t * 0.5 + 0.25 * Math.sin(t * 18) + 0.08 * Math.sin(t * 61)}
          accent
        />
        <Legende x={214} y={48} t="=" fs={16} />
        <Legende x={240} y={20} t="tendance" fs={10} />
        <Courbe x0={240} y0={44} l={60} h={20} f={(t) => 0.2 + t * 0.8} />
        <Legende x={305} y={48} t="+" ancre="middle" fs={14} />
        <Legende x={312} y={20} t="saison" fs={10} />
        <Courbe x0={312} y0={44} l={60} h={20} f={(t) => 0.5 + 0.45 * Math.sin(t * 19)} />
        <Legende x={377} y={48} t="+" ancre="middle" fs={14} />
        <Legende x={384} y={20} t="bruit" fs={10} />
        <Courbe x0={384} y0={44} l={46} h={20} f={(t) => 0.5 + 0.35 * Math.sin(t * 73)} />
        <Legende x={240} y={96} t="les deux premiers se prévoient," fs={11} />
        <Legende x={240} y={114} t="le troisième se mesure" fs={11} />
        <Legende x={20} y={96} t="le découpage avant le modèle" fs={10} />
      </>
    ),
  },

  "dl-1": {
    alt: "Un neurone pondère ses entrées, en fait la somme avec un biais, puis passe le résultat dans une fonction d'activation non linéaire.",
    dessin: (
      <>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Boite x={16} y={28 + i * 32} l={38} h={24} t={`x${i + 1}`} fs={11} />
            <Fleche x1={60} y1={40 + i * 32} x2={126} y2={74} />
            <Legende x={86} y={34 + i * 32} t={`w${i + 1}`} fs={10} mono />
          </g>
        ))}
        <circle cx={150} cy={74} r="24" fill={SURFACE} stroke={ACCENT} strokeWidth="1.5" />
        <Legende x={150} y={79} t="Σ" ancre="middle" accent fs={17} />
        <Legende x={150} y={118} t="+ biais" ancre="middle" fs={10} />
        <Fleche x1={178} y1={74} x2={212} accent />
        <Boite x={218} y={56} l={84} h={36} t="activation" fs={11} mono={false} accent />
        <Fleche x1={308} y1={74} x2={344} accent />
        <Boite x={350} y={58} l={46} h={32} t="y" fs={13} accent />
        <Legende x={218} y={114} t="sans elle, tout le réseau reste linéaire" fs={10} />
      </>
    ),
  },

  "dl-2": {
    alt: "La passe avant calcule la prédiction couche après couche ; la rétropropagation remonte l'erreur en sens inverse pour corriger chaque poids.",
    dessin: (
      <>
        {["entrée", "couche 1", "couche 2", "sortie"].map((nom, i) => (
          <Boite key={nom} x={18 + i * 108} y={50} l={88} h={38} t={nom} fs={11} mono={false} />
        ))}
        {[0, 1, 2].map((i) => (
          <Fleche key={i} x1={108 + i * 108} y1={62} x2={122 + i * 108} accent />
        ))}
        <Legende x={220} y={32} t="passe avant — on calcule la prédiction" ancre="middle" accent fs={11} />
        {[0, 1, 2].map((i) => (
          <Fleche key={i} x1={122 + i * 108} y1={78} x2={108 + i * 108} />
        ))}
        <Legende x={220} y={112} t="rétropropagation — on remonte l'erreur et on corrige les poids" ancre="middle" fs={11} />
      </>
    ),
  },

  "dl-3": {
    alt: "Un filtre convolutif glisse sur l'image et produit une carte d'activation : les mêmes poids servent partout, d'où bien moins de paramètres.",
    dessin: (
      <>
        <Legende x={20} y={22} t="image" fs={10} />
        {Array.from({ length: 6 }, (_, i) =>
          Array.from({ length: 6 }, (_, j) => (
            <rect key={`${i}-${j}`} x={20 + j * 18} y={30 + i * 16} width="17" height="15" fill={SURFACE} stroke={TRAIT} strokeWidth="0.5" />
          ))
        )}
        <rect x={38} y={46} width="53" height="47" fill={ACCENT} fillOpacity="0.2" stroke={ACCENT} strokeWidth="1.5" />
        <Legende x={64} y={136} t="filtre 3×3" ancre="middle" accent fs={10} />
        <Fleche x1={140} y1={70} x2={180} accent />
        <Legende x={160} y={58} t="×" ancre="middle" fs={11} />
        <Legende x={196} y={22} t="carte d'activation" fs={10} />
        {Array.from({ length: 4 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => (
            <rect
              key={`${i}-${j}`}
              x={196 + j * 18}
              y={30 + i * 16}
              width="17"
              height="15"
              fill={ACCENT}
              fillOpacity={0.12 + (((i * 3 + j * 5) % 5) / 5) * 0.55}
              stroke={ACCENT}
              strokeWidth="0.5"
            />
          ))
        )}
        <Legende x={288} y={58} t="les mêmes poids glissent" fs={11} />
        <Legende x={288} y={76} t="sur toute l'image" fs={11} />
        <Legende x={288} y={102} t="d'où très peu de paramètres" accent fs={10} />
      </>
    ),
  },

  "dl-4": {
    alt: "Un réseau récurrent déroulé dans le temps : le même bloc traite chaque pas et transmet un état caché au suivant, qui porte la mémoire.",
    dessin: (
      <>
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Boite x={44 + i * 96} y={46} l={62} h={38} t="RNN" fs={11} mono={false} accent />
            <Boite x={52 + i * 96} y={104} l={46} h={24} t={`x${i + 1}`} fs={11} />
            <Fleche x1={75 + i * 96} y1={102} x2={75 + i * 96} y2={88} />
            {i < 3 && <Fleche x1={110 + i * 96} y1={65} x2={136 + i * 96} accent />}
            {i < 3 && <Legende x={123 + i * 96} y={58} t={`h${i + 1}`} ancre="middle" accent fs={10} mono />}
          </g>
        ))}
        <Legende x={20} y={26} t="le même bloc, répété dans le temps — l'état caché h porte la mémoire" fs={11} />
      </>
    ),
  },

  "gen-1": {
    alt: "Un auto-encodeur compresse l'entrée jusqu'à un goulot d'étranglement, l'espace latent, puis la reconstruit : ce goulot force le modèle à ne garder que l'essentiel.",
    dessin: (
      <>
        <path d="M30 24 L150 56 L150 84 L30 116 Z" fill={SURFACE} stroke={TRAIT} />
        <Legende x={88} y={74} t="encodeur" ancre="middle" fs={11} />
        <Boite x={158} y={54} l={46} h={32} accent />
        <Legende x={181} y={74} t="z" ancre="middle" accent fs={14} mono />
        <Legende x={181} y={108} t="latent" ancre="middle" accent fs={10} />
        <path d="M212 56 L332 24 L332 116 L212 84 Z" fill={SURFACE} stroke={TRAIT} />
        <Legende x={272} y={74} t="décodeur" ancre="middle" fs={11} />
        <Legende x={348} y={62} t="reconstruction" fs={11} />
        <Legende x={348} y={80} t="la plus fidèle possible" fs={10} />
        <Legende x={30} y={134} t="le goulot force le modèle à choisir ce qu'il garde" fs={10} />
      </>
    ),
  },

  "gen-3": {
    alt: "Dans un GAN, le générateur fabrique de fausses images et le discriminateur tente de les distinguer des vraies : chacun progresse contre l'autre.",
    dessin: (
      <>
        <Boite x={16} y={24} l={64} h={28} t="bruit" fs={11} mono={false} />
        <Fleche x1={84} y1={38} x2={110} />
        <Boite x={116} y={20} l={96} h={36} t="générateur" fs={11} mono={false} accent />
        <Fleche x1={216} y1={38} x2={248} accent />
        <Boite x={254} y={24} l={62} h={28} t="faux" fs={11} mono={false} accent />
        <Boite x={254} y={92} l={62} h={28} t="vrais" fs={11} mono={false} />
        <Fleche x1={320} y1={38} x2={340} y2={62} />
        <Fleche x1={320} y1={106} x2={340} y2={82} />
        <Boite x={346} y={54} l={82} h={36} t="juge" fs={11} mono={false} accent />
        <Legende x={16} y={82} t="le générateur gagne quand le juge se trompe ;" fs={11} />
        <Legende x={16} y={100} t="le juge gagne quand il ne se trompe pas." fs={11} />
        <Legende x={16} y={126} t="L'entraînement est cette partie, pas une descente tranquille." accent fs={10} />
      </>
    ),
  },

  "gen-4": {
    alt: "Un modèle de diffusion apprend à inverser un bruitage progressif : on ajoute du bruit pas à pas à l'entraînement, le modèle apprend à le retirer.",
    dessin: (
      <>
        <Legende x={20} y={22} t="bruitage — connu, pas appris" fs={10} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={20 + i * 82} y={32} width="56" height="40" rx="5" fill={SURFACE} stroke={TRAIT} />
            {Array.from({ length: 4 + i * 9 }, (_, k) => (
              <circle
                key={k}
                cx={24 + alea(k) * 48}
                cy={36 + alea(k + 70) * 32}
                r="1.6"
                fill={TRAIT}
                transform={`translate(${i * 82} 0)`}
              />
            ))}
            {i < 4 && <Fleche x1={80 + i * 82} y1={52} x2={98 + i * 82} />}
          </g>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <Fleche key={i} x1={344 - i * 82} y1={92} x2={326 - i * 82} accent />
        ))}
        <Legende x={20} y={126} t="débruitage — c'est ça, le modèle : il apprend à remonter un pas" accent fs={11} />
      </>
    ),
  },

  "nlp-1": {
    alt: "Le texte est découpé en tokens, chaque token reçoit un identifiant, puis un vecteur : c'est ce vecteur, et non le mot, que le modèle manipule.",
    dessin: (
      <>
        <Boite x={20} y={24} l={192} h={30} t="« le chat dort »" fs={13} mono={false} />
        <Fleche x1={116} y1={58} x2={116} y2={76} />
        {["le", "chat", "dort"].map((tok, i) => (
          <Boite key={tok} x={20 + i * 66} y={80} l={58} h={28} t={tok} fs={12} />
        ))}
        <Legende x={116} y={126} t="tokens" ancre="middle" fs={10} />
        <Fleche x1={224} y1={94} x2={256} accent />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            {Array.from({ length: 5 }, (_, j) => (
              <rect
                key={j}
                x={264 + j * 20}
                y={38 + i * 30}
                width="18"
                height="22"
                rx="3"
                fill={ACCENT}
                fillOpacity={0.15 + (((i * 7 + j * 11) % 5) / 5) * 0.5}
                stroke={ACCENT}
                strokeWidth="0.5"
              />
            ))}
          </g>
        ))}
        <Legende x={264} y={128} t="vecteurs — la proximité y a un sens" accent fs={10} />
      </>
    ),
  },

  "nlp-2": {
    alt: "L'attention laisse chaque token regarder tous les autres et pondérer leur apport : c'est ce qui résout à quoi renvoie un pronom.",
    dessin: (
      <>
        {["le", "chat", "qui", "dort", "il"].map((tok, i) => (
          <Boite key={tok} x={24 + i * 76} y={92} l={60} h={28} t={tok} fs={12} accent={i === 4} />
        ))}
        {[
          [0, 0.18],
          [1, 0.95],
          [2, 0.22],
          [3, 0.4],
        ].map(([i, p]) => (
          <path
            key={i}
            d={`M${334} 92 Q${(334 + 54 + i * 76) / 2} 34 ${54 + i * 76} 92`}
            fill="none"
            stroke={ACCENT}
            strokeWidth={0.6 + p * 3.4}
            opacity={0.25 + p * 0.65}
          />
        ))}
        <Legende x={24} y={24} t="« il » regarde tous les mots et choisit où porter son poids" fs={11} />
        <Legende x={24} y={136} t="le lien le plus épais est celui que l'attention a appris" accent fs={10} />
      </>
    ),
  },

  "cloud-1": {
    alt: "Une image Docker est un empilement de couches figées ; un conteneur est cette image en exécution, avec une couche d'écriture jetable par-dessus.",
    dessin: (
      <>
        <Legende x={24} y={22} t="image — figée, partagée" fs={10} />
        {["python:3.11-slim", "pip install -r req.txt", "COPY ./app", "CMD uvicorn"].map((c, i) => (
          <Boite key={c} x={24} y={30 + i * 26} l={200} h={22} t={c} fs={10} />
        ))}
        <Fleche x1={234} y1={74} x2={266} accent />
        <Legende x={276} y={22} t="conteneur — en exécution" accent fs={10} />
        <Boite x={276} y={56} l={144} h={22} t="couche d'écriture" fs={10} accent />
        <Boite x={276} y={82} l={144} h={22} t="les mêmes couches" fs={10} />
        <Legende x={276} y={126} t="jeter le conteneur ne touche pas l'image" fs={10} />
      </>
    ),
  },

  "ops-2": {
    alt: "Le chemin du notebook à la production : extraire le code en modules, l'exposer derrière une API, puis figer l'ensemble dans une image.",
    dessin: (
      <>
        {[
          ["notebook", "exploratoire"],
          ["modules", "testables"],
          ["API", "contrat stable"],
          ["image", "reproductible"],
        ].map(([nom, sous], i) => (
          <g key={nom}>
            <Boite x={18 + i * 108} y={44} l={88} h={38} t={nom} fs={12} mono={false} accent={i === 3} />
            <Legende x={62 + i * 108} y={100} t={sous} ancre="middle" fs={10} />
            {i < 3 && <Fleche x1={110 + i * 108} y1={63} x2={122 + i * 108} accent />}
          </g>
        ))}
        <Legende x={18} y={26} t="chaque étape rend la précédente rejouable par quelqu'un d'autre" fs={11} />
      </>
    ),
  },

  "ops-3": {
    alt: "La dérive : la distribution des données de production s'éloigne de celle de l'entraînement, et le modèle se dégrade sans que rien ne tombe en panne.",
    dessin: (
      <>
        <Courbe x0={30} y0={104} l={200} h={66} f={(t) => Math.exp(-((t - 0.5) ** 2) / 0.03)} />
        <Courbe x0={150} y0={104} l={200} h={66} f={(t) => Math.exp(-((t - 0.5) ** 2) / 0.03)} accent />
        <path d="M24 104 H394" stroke={TRAIT} />
        <Legende x={130} y={32} t="entraînement" ancre="middle" fs={11} />
        <Legende x={250} y={32} t="production" ancre="middle" accent fs={11} />
        <Fleche x1={160} y1={120} x2={236} accent />
        <Legende x={198} y={136} t="dérive" ancre="middle" accent fs={10} />
        <Legende x={300} y={76} t="rien ne tombe" fs={11} />
        <Legende x={300} y={94} t="en panne" fs={11} />
      </>
    ),
  },
};
