import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-24">
      <div className="text-5xl mb-4">🧭</div>
      <h1 className="text-2xl font-bold text-white mb-2">Page introuvable</h1>
      <p className="text-slate-400 mb-6 max-w-md">
        Cette page n'existe pas ou plus. Retourne à l'accueil pour continuer ton parcours.
      </p>
      <Link href="/" className="btn-primary">
        Retour à l'accueil
      </Link>
    </div>
  );
}
