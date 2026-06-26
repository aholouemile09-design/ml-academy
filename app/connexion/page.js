"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ConnexionPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("Email ou mot de passe incorrect.");
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
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Connexion…" : "Se connecter"}
        </button>
      </form>

      <p className="text-sm text-slate-500 mt-5 text-center">
        Pas encore de compte ? <Link href="/inscription" className="text-accent-light hover:underline">Créer un compte</Link>
      </p>
    </div>
  );
}
