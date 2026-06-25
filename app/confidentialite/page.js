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
        <h2 className="text-xl font-semibold text-white mb-2">Données stockées localement</h2>
        <p>
          CodeGraft Academy ne dispose pas de compte utilisateur côté serveur. Les données suivantes sont stockées
          uniquement dans le navigateur (localStorage), sur l'appareil de l'utilisateur, et ne sont jamais transmises
          à nos serveurs :
        </p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Progression dans les parcours (modules terminés, quiz)</li>
          <li>Préférences de thème (clair/sombre)</li>
          <li>Profil pédagogique choisi</li>
          <li>Clé API personnelle Anthropic et token GitHub, si renseignés dans Paramètres</li>
        </ul>
        <p className="mt-2">
          Ces données restent sur l'appareil de l'utilisateur et sont supprimées en vidant le cache du navigateur ou
          le localStorage du site. Elles ne sont jamais envoyées à CodeGraft Academy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Données transmises à des tiers</h2>
        <p>
          Si l'utilisateur renseigne une clé API Anthropic dans Paramètres et utilise le tuteur IA, les messages
          échangés sont envoyés directement à l'API Anthropic via notre serveur, qui ne les conserve pas en base.
          De même, si l'utilisateur fournit un token GitHub pour publier un projet, ce token est utilisé uniquement
          pour l'appel à l'API GitHub côté serveur, le temps de la requête, et n'est jamais stocké.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Cookies</h2>
        <p>Ce site n'utilise pas de cookies de suivi publicitaire ni d'analytics tiers à ce jour.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white mb-2">Droits des utilisateurs</h2>
        <p>
          Les données étant stockées localement et non sur nos serveurs, l'utilisateur garde un contrôle total :
          il peut les supprimer à tout moment via les paramètres de son navigateur. Pour toute question, contactez
          [adresse e-mail à compléter].
        </p>
      </section>
    </div>
  );
}
