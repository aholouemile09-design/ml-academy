import MetaFormation from "@/components/MetaFormation";

/**
 * L'en-tête commun aux trois pages de parcours.
 *
 * Les trois avaient trois traitements différents : une bannière photo sombre
 * pour le ML, une pastille « Nouveau parcours » et trois tuiles de chiffres
 * pour le web, la même pastille et quatre tuiles pour le PMP — dont deux
 * remplissaient le vide (« 100 % gratuit », « 2026 examen à jour »). Trois
 * pages sœurs qui ne se ressemblent pas, c'est un site qui a l'air assemblé.
 *
 * C'est la carte de l'accueil, dépliée : même surtitre de domaine, même titre,
 * mêmes trois chiffres.
 */
export default function EnteteParcours({ domaine, titre, chapo, modules, lecons, niveau }) {
  return (
    <header className="mb-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.09em] text-accent-light mb-2">
        {domaine}
      </p>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
        {titre}
      </h1>
      <p className="mt-3 max-w-2xl text-slate-400 leading-relaxed">{chapo}</p>
      <div className="mt-5 pt-5 border-t border-ink-700">
        <MetaFormation modules={modules} lecons={lecons} niveau={niveau} direction="ligne" />
      </div>
    </header>
  );
}
