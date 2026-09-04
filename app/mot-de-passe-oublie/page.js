"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function FormulaireOubli() {
  const params = useSearchParams();
  const lienInvalide = params.get("erreur") === "lien";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [envoye, setEnvoye] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    let res, data;
    try {
      res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      data = await res.json();
    } catch {
      setLoading(false);
      setError("Connexion au serveur impossible. Vérifie ta connexion internet.");
      return;
    }
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Impossible d'envoyer le lien pour le moment.");
      return;
    }
    setEnvoye(true);
  };

  // Écran de confirmation. Il ne dit pas si le compte existe : c'est
  // volontaire, et c'est ce qui empêche de se servir de ce formulaire pour
  // savoir qui est inscrit.
  if (envoye) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-3">📬 Regarde ta boîte mail</h1>
        <p className="text-slate-400">
          Si un compte existe avec l'adresse <strong className="text-white">{email}</strong>, un lien de
          réinitialisation vient d'y être envoyé. Il est valable une heure et ne fonctionne qu'une fois.
        </p>
        <p className="text-sm text-slate-500 mt-4">
          Rien reçu au bout de quelques minutes ? Vérifie les indésirables, et assure-toi d'avoir saisi
          l'adresse utilisée à l'inscription.
        </p>
        <p className="text-sm text-slate-500 mt-6">
          Ouvre le lien <strong className="text-slate-300">depuis ce navigateur</strong> — c'est lui qui
          détient la preuve de ta demande.
        </p>
        <Link href="/connexion" className="btn-primary inline-block mt-6">
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-2">Mot de passe oublié</h1>
      <p className="text-slate-400 mb-8">
        Indique l'adresse de ton compte : tu recevras un lien pour en choisir un nouveau.
      </p>

      {lienInvalide && (
        <div className="rounded-xl px-4 py-3 border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm mb-5">
          <p className="font-semibold mb-1">🔗 Ce lien n'a pas fonctionné</p>
          <p className="text-amber-200/80">
            Il a peut-être expiré, déjà servi, ou été ouvert dans un autre navigateur que celui d'où
            venait la demande. Refais une demande ci-dessous.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
          />
        </div>
        {error && (
          <div className="rounded-xl px-4 py-3 border border-rose-500/30 bg-rose-500/10 text-rose-300 text-sm">
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Envoi…" : "Envoyer le lien"}
        </button>
      </form>

      <p className="text-sm text-slate-500 mt-5 text-center">
        Tu t'en souviens finalement ?{" "}
        <Link href="/connexion" className="text-accent-light hover:underline">
          Se connecter
        </Link>
      </p>
    </>
  );
}

export default function MotDePasseOubliePage() {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <Suspense fallback={<p className="text-slate-500 text-sm">Chargement…</p>}>
        <FormulaireOubli />
      </Suspense>
    </div>
  );
}
