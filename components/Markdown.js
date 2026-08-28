// Mini-rendu markdown sans dépendance externe :
// gras, code inline, blocs de code, listes à puces, listes numérotées,
// citations (>) et retours à la ligne simples à l'intérieur d'un paragraphe.

export default function Markdown({ text }) {
  const blocks = text.split(/```/);

  return (
    <div className="space-y-4 leading-relaxed text-slate-300">
      {blocks.map((block, i) =>
        i % 2 === 1 ? (
          <pre
            key={i}
            className="bg-ink-950 border border-ink-700 rounded-xl p-4 overflow-x-auto text-sm text-accent-cyan"
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

/**
 * Un paragraphe peut en réalité être une liste, une citation ou du texte
 * multi-lignes. On décide sur la première ligne, puis on rend en conséquence.
 */
function renderBlock(para, key) {
  const lines = para.split("\n").filter((l) => l.trim());
  if (lines.length === 0) return null;

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
        <code key={i} className="bg-ink-800 px-1.5 py-0.5 rounded text-accent-cyan text-sm">
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
