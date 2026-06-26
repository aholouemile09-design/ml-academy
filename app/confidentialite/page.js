export const metadata = {
  title: "Politique de confidentialité — CodeGraft Academy",
};

export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-slate-300 space-y-6">
      <h1 className="text-3xl font-bold text-white">Politique de confidentialité</h1>

      <p className="text-sm text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-lg p-4">
        ⚠️ Modèle générique à adapter avec un conseil juridique avant publication, notamment si le site cible des
        utilisateurs dans l'UE (RGPD).
      </p>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Compte utilisateur et données sauvegardées</h2>
        <p>
          La création d'un compte (email + mot de passe) permet de sauvegarder votre progression de façon à y
          accéder depuis n'importe quel appareil. Ces données sont hébergées par notre prestataire technique
          Supabase (Supabase Inc., infrastructure cloud avec base de données PostgreSQL), localisé selon la région
          choisie pour le projet, et sont protégées par un contrôle d'accès strict (chaque utilisateur ne peut lire
          ou modifier que ses propres données — politique de sécurité au niveau des lignes / RLS).
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Adresse email et mot de passe (haché, jamais stocké en clair, géré par Supabase Auth)</li>
          <li>Progression dans les parcours (modules terminés, quiz, XP)</li>
          <li>Nom affiché, avatar et couleur choisis</li>
        </ul>
        <p className="mt-2">
          Le mot de passe n'est jamais visible ni accessible par l'éditeur du site : son traitement (hachage,
          vérification) est entièrement délégué à Supabase Auth.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Données stockées localement (navigateur)</h2>
        <p>
          Certaines données restent uniquement dans le navigateur (localStorage) et ne sont jamais transmises à nos
          serveurs ni à Supabase :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Préférences de thème (clair/sombre)</li>
          <li>Clé API personnelle Anthropic et token GitHub, si renseignés dans Paramètres</li>
        </ul>
        <p className="mt-2">
          Ces données restent sur l'appareil de l'utilisateur et sont supprimées en vidant le cache du navigateur ou
          le localStorage du site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Données transmises à des tiers</h2>
        <p>
          Si l'utilisateur renseigne une clé API Anthropic dans Paramètres et utilise le tuteur IA, les messages
          échangés sont envoyés directement à l'API Anthropic via notre serveur, qui ne les conserve pas en base.
          De même, si l'utilisateur fournit un token GitHub pour publier un projet, ce token est utilisé uniquement
          pour l'appel à l'API GitHub côté serveur, le temps de la requête, et n'est jamais stocké. L'authentification
          et la base de données de progression sont hébergées par Supabase, sous-traitant technique de CodeGraft
          Academy, soumis à sa propre politique de confidentialité.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Cookies</h2>
        <p>
          Le site utilise des cookies techniques strictement nécessaires au maintien de la session de connexion
          (gérés par Supabase Auth). Aucun cookie de suivi publicitaire ni d'analytics tiers n'est utilisé.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Droits des utilisateurs</h2>
        <p>
          Conformément à la réglementation applicable (RGPD pour les utilisateurs de l'UE), vous pouvez demander
          l'accès, la rectification ou la suppression de votre compte et de vos données à tout moment en nous
          contactant à aholou.emile09@gmail.com. La suppression du compte entraîne la suppression de l'ensemble des
          données de progression associées dans notre base.
        </p>
      </section>
    </div>
  );
}
