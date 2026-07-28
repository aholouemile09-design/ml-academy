"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const [locked, setLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setWarning("");
    setLoading(true);

    // La connexion passe par notre route serveur, qui applique le
    // rate-limiting avant de valider les identifiants auprès de Supabase.
    let res, data;
    try {
      res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      data = await res.json();
    } catch {
      setLoading(false);
      setError("Connexion au serveur impossible. Vérifie ta connexion internet.");
      return;
    }
    setLoading(false);

    if (res.status === 429) {
      setLocked(true);
      setError(data.message || "Trop de tentatives. Réessaie plus tard.");
      return;
    }

    if (!res.ok) {
      setError(data.message || "Email ou mot de passe incorrect.");
      if (typeof data.remaining === "number" && data.remaining > 0 && data.remaining <= 2) {
        setWarning(
          `Attention : ${data.remaining} tentative${data.remaining > 1 ? "s" : ""} restante${
            data.remaining > 1 ? "s" : ""
          } avant blocage temporaire.`
        );
      }
      return;
    }

    router.push("/espace");
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Connexion</h1>
      <p className="text-slate-400 mb-8">Retrouve ta progression depuis n'importe quel appareil.</p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Mot de passe</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
        </div>
        {error && (
          <div className={`rounded-xl px-4 py-3 border text-sm ${
            locked
              ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
              : "border-rose-500/30 bg-rose-500/10 text-rose-300"
          }`}>
            {locked && <span className="mr-1">🔒</span>}
            {error}
          </div>
        )}
        {warning && !locked && (
          <p className="text-xs text-amber-400">⚠️ {warning}</p>
        )}
        <button type="submit" disabled={loading || locked} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Connexion…" : locked ? "Temporairement bloqué" : "Se connecter"}
        </button>
      </form>

      <p className="text-sm text-slate-500 mt-5 text-center">
        Pas encore de compte ? <Link href="/inscription" className="text-accent-light hover:underline">Créer un compte</Link>
      </p>
    </div>
  );
}
