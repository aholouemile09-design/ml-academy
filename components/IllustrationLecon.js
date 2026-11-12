import { SCHEMAS } from "@/components/schemasLecons";

/**
 * Le schéma d'entête d'une leçon, quand elle en a un.
 *
 * Les leçons sans schéma ne rendent rien : c'est le cas par défaut, et la
 * règle d'admission est dans schemasLecons.js — le dessin doit dire ce que le
 * texte dit mal.
 *
 * Le SVG est écrit dans la page plutôt que chargé comme image : pas de
 * requête, pas de fichier, et les couleurs sont les jetons du thème, donc un
 * seul dessin sert au mode clair et au mode sombre. Le rapport de forme est
 * porté par le viewBox, la place est donc réservée avant le rendu et il n'y a
 * aucun décalage de mise en page à rattraper.
 */
export default function IllustrationLecon({ leconId }) {
  const schema = SCHEMAS[leconId];
  if (!schema) return null;

  return (
    <figure className="mb-6 rounded-xl border border-ink-700 bg-ink-900/40 overflow-hidden">
      <svg viewBox="0 0 440 140" className="w-full h-auto block" role="img" aria-label={schema.alt}>
        <defs>
          {/* Deux pointes : l'une suit l'accent, l'autre le trait neutre. */}
          <marker id="fleche-accent" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 z" fill="rgb(var(--accent-light))" />
          </marker>
          <marker id="fleche-trait" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0 0 L7 3.5 L0 7 z" fill="rgb(var(--ink-600))" />
          </marker>
        </defs>
        {schema.dessin}
      </svg>
    </figure>
  );
}
