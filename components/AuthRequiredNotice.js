"use client";

import Link from "next/link";

/**
 * Avertit que l'écriture vient d'être abandonnée faute de session.
 *
 * Toutes les écritures passent par `persist()` dans lib/userProgress : sans
 * compte, elles ne faisaient rien et ne disaient rien. Ce bandeau est la seule
 * réponse visible à un clic qui, sinon, n'en aurait aucune.
 */
export default function AuthRequiredNotice({ onClose }) {
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-md card p-4 flex items-start gap-3"
    >
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">Progression non enregistrée</p>
        <p className="text-xs text-slate-400 mt-1">
          Tu n'es pas connecté. Crée un compte ou connecte-toi pour conserver tes leçons,
          ton XP et ta série sur tous tes appareils.
        </p>
        <div className="mt-3 flex gap-2">
          <Link href="/connexion" className="btn-primary text-xs px-4 py-2">
            Se connecter
          </Link>
          <Link href="/inscription" className="btn-secondary text-xs px-4 py-2">
            Créer un compte
          </Link>
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="text-slate-500 hover:text-white transition-colors text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}
