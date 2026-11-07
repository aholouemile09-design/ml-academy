// Mini-rendu markdown sans dépendance externe :
// titres (## et ###), gras, code inline, blocs de code, tableaux, listes à
// puces, listes numérotées, citations (>) et retours à la ligne simples à
// l'intérieur d'un paragraphe.

export default function Markdown({ text }) {
  const blocks = text.split(/```/);

  return (
    <div className="space-y-4 leading-relaxed text-slate-300">
      {blocks.map((block, i) =>
        i % 2 === 1 ? (
          <pre
            key={i}
            className="bg-ink-800 border border-ink-700 rounded-xl p-4 overflow-x-auto text-sm font-mono text-slate-200"
          >
            <code>{block.replace(/^[a-z]*\n/, "")}</code>
          </pre>
        ) : (
          block
            .split("\n\n")
            .filter((p) => p.trim())
            .map((para, j) => renderBlock(para, `${i}-${j}`))
        )
      )}
    </div>
  );
}

const BULLET = /^[-*]\s+/;
const NUMBERED = /^(\d+)[.)]\s+/;
const QUOTE = /^>\s?/;
const TITRE = /^(#{2,3})\s+(.+)$/;
const TABLEAU_LIGNE = /^\s*\|.*\|\s*$/;
const TABLEAU_SEPARATEUR = /^\s*\|[\s:|-]+\|\s*$/;

/** Les cellules d'une ligne de tableau, barres de bord retirées. */
function cellules(ligne) {
  return ligne
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

/** L'alignement d'une colonne, lu sur la ligne de séparation (:--- , ---:). */
function alignement(separateur) {
  const gauche = separateur.startsWith(":");
  const droite = separateur.endsWith(":");
  if (gauche && droite) return "text-center";
  return droite ? "text-right" : "text-left";
}

/**
 * Un paragraphe peut en réalité être une liste, une citation ou du texte
 * multi-lignes. On décide sur la première ligne, puis on rend en conséquence.
 */
function renderBlock(para, key) {
  const lines = para.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return null;

  // ── Titre de section ───────────────────────────────────────────────────
  // L'espacement passe par le padding : le conteneur gère déjà les marges
  // verticales (space-y-4) et deux utilitaires de marge se disputeraient.
  const titre = lines.length === 1 && lines[0].match(TITRE);
  if (titre) {
    const [, diese, texte] = titre;
    return diese === "##" ? (
      <h2 key={key} className="text-lg font-bold text-white pt-5">
        {renderInline(texte)}
      </h2>
    ) : (
      <h3 key={key} className="text-base font-semibold text-white pt-3">
        {renderInline(texte)}
      </h3>
    );
  }

  // ── Tableau ────────────────────────────────────────────────────────────
  // Un tableau se reconnaît à sa ligne de tirets, pas à sa position : dans ce
  // dépôt il est presque toujours collé à une ligne de titre en gras, sans
  // ligne vide. On cherche donc où il commence et on rend le début en texte.
  const debut = lines.findIndex(
    (l, i) => TABLEAU_LIGNE.test(l) && TABLEAU_SEPARATEUR.test(lines[i + 1] ?? "")
  );
  if (debut !== -1 && lines.slice(debut).every((l) => TABLEAU_LIGNE.test(l))) {
    const tableau = renderTableau(lines.slice(debut), key);
    if (debut === 0) return tableau;
    return (
      <div key={key} className="space-y-2">
        <p>{withLineBreaks(lines.slice(0, debut))}</p>
        {tableau}
      </div>
    );
  }

  // ── Liste à puces ──────────────────────────────────────────────────────
  if (lines.every((l) => BULLET.test(l))) {
    return (
      <ul key={key} className="space-y-1.5 pl-1">
        {lines.map((l, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-accent-light shrink-0 mt-0.5">•</span>
            <span>{renderInline(l.replace(BULLET, ""))}</span>
          </li>
        ))}
      </ul>
    );
  }

  // ── Liste numérotée ────────────────────────────────────────────────────
  if (lines.every((l) => NUMBERED.test(l))) {
    return (
      <ol key={key} className="space-y-1.5 pl-1">
        {lines.map((l, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="text-accent-light font-mono text-sm shrink-0 mt-0.5">
              {l.match(NUMBERED)[1]}.
            </span>
            <span>{renderInline(l.replace(NUMBERED, ""))}</span>
          </li>
        ))}
      </ol>
    );
  }

  // ── Citation / encadré ─────────────────────────────────────────────────
  if (lines.every((l) => QUOTE.test(l))) {
    return (
      <blockquote
        key={key}
        className="border-l-2 border-accent/50 pl-4 py-1 text-slate-400 italic"
      >
        {withLineBreaks(lines.map((l) => l.replace(QUOTE, "")))}
      </blockquote>
    );
  }

  // ── Paragraphe classique (retours à la ligne simples préservés) ────────
  return <p key={key}>{withLineBreaks(lines)}</p>;
}

/**
 * Les lignes d'un tableau, séparateur compris, en vrai tableau HTML.
 *
 * Le conteneur porte `min-w-0` en plus de `overflow-x-auto` : sans lui, un
 * élément de grille garde sa largeur de contenu et c'est la page qui
 * s'élargit au lieu du conteneur qui défile. Les cellules coupent les mots
 * longs, pour qu'une URL ou un nom de fonction ne pousse pas une colonne.
 */
function renderTableau(lines, key) {
  const entetes = cellules(lines[0]);
  const alignements = cellules(lines[1]).map(alignement);
  const corps = lines.slice(2).map(cellules);

  return (
    <div key={`${key}-tableau`} className="overflow-x-auto min-w-0">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ink-700">
            {entetes.map((cell, i) => (
              <th
                key={i}
                className={`px-3 py-2 font-semibold text-white break-words ${
                  alignements[i] ?? "text-left"
                }`}
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {corps.map((ligne, i) => (
            <tr key={i} className="border-b border-ink-800 last:border-0">
              {ligne.map((cell, j) => (
                <td
                  key={j}
                  className={`px-3 py-2 align-top break-words ${
                    alignements[j] ?? "text-left"
                  }`}
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function withLineBreaks(lines) {
  return lines.map((line, i) => (
    <span key={i}>
      {i > 0 && <br />}
      {renderInline(line)}
    </span>
  ));
}

function renderInline(text) {
  // découpe sur **gras**, *italique* et `code`
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="bg-ink-800 border border-ink-700 px-1.5 py-0.5 rounded-md font-mono text-accent-light text-[0.9em]">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
