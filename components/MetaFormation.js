/**
 * Les trois chiffres qui qualifient une formation, avec leurs pictogrammes.
 *
 * Mêmes données et mêmes icônes sur la carte de l'accueil (en colonne) et en
 * tête de la page du parcours (en ligne). Les écrire aux deux endroits, c'est
 * se garantir qu'ils finiront par ne plus se ressembler.
 */
const Trait = (props) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    className="shrink-0"
    {...props}
  />
);

export default function MetaFormation({ modules, lecons, niveau, direction = "colonne" }) {
  return (
    <div
      className={`text-sm text-slate-500 ${
        direction === "ligne" ? "flex flex-wrap gap-x-7 gap-y-2" : "flex flex-col gap-2"
      }`}
    >
      <span className="flex items-center gap-2.5">
        <Trait><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18" /></Trait>
        {modules} modules
      </span>
      <span className="flex items-center gap-2.5">
        <Trait><path d="M4 5a2 2 0 0 1 2-2h8l6 6v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" /><path d="M14 3v6h6" /></Trait>
        {lecons} leçons
      </span>
      <span className="flex items-center gap-2.5">
        <Trait><path d="M4 20V11M10 20V4M16 20v-6M22 20H2" /></Trait>
        {niveau}
      </span>
    </div>
  );
}
