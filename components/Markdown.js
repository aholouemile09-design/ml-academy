// Mini-rendu markdown (gras, code inline, blocs de code) sans dépendance externe.

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
            .map((para, j) => <p key={`${i}-${j}`}>{renderInline(para)}</p>)
        )
      )}
    </div>
  );
}

function renderInline(text) {
  // découpe sur **gras** et `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
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
    return part;
  });
}
