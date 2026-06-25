export const metadata = {
  title: "Mentions légales — CodeGraft Academy",
};

export default function MentionsLegalesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-bold text-white">Mentions légales</h1>

      <p className="text-sm text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-lg p-4">
        ⚠️ Modèle générique à compléter avec tes informations réelles (éditeur, contact, hébergeur) avant publication.
      </p>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Éditeur du site</h2>
        <p>
          CodeGraft Academy est édité par : [Nom / raison sociale à compléter].
          <br />
          Contact : [adresse e-mail à compléter]
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Hébergement</h2>
        <p>
          Ce site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
          <br />
          <a href="https://vercel.com" className="underline hover:text-white" target="_blank" rel="noreferrer">
            vercel.com
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus pédagogiques, textes, et éléments graphiques de CodeGraft Academy sont la
          propriété de l'éditeur du site, sauf mention contraire. Toute reproduction sans autorisation est interdite.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Services tiers utilisés</h2>
        <p>
          Le site fait appel, à la demande de l'utilisateur, à l'API Anthropic (Claude) pour le tuteur IA et à l'API
          GitHub pour la publication de projets. Ces services sont soumis à leurs propres conditions d'utilisation
          et politiques de confidentialité.
        </p>
      </section>
    </div>
  );
}
