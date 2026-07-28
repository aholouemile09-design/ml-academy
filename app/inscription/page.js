"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { validatePassword, PASSWORD_MIN_LENGTH } from "@/lib/passwordPolicy";
import PasswordStrength from "@/components/PasswordStrength";

export default function InscriptionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Politique de mot de passe appliquée avant tout appel réseau.
    const check = validatePassword(password);
    if (!check.valid) {
      setError(check.message);
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName.trim() || email.split("@")[0] },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">📬 Vérifie ta boîte mail</h1>
        <p className="text-slate-400">
          Un lien de confirmation a été envoyé à <strong className="text-white">{email}</strong>. Clique-le pour
          activer ton compte, puis connecte-toi.
        </p>
        <Link href="/connexion" className="btn-primary inline-block mt-6">Aller à la connexion</Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Créer un compte</h1>
      <p className="text-slate-400 mb-8">Ta progression sera sauvegardée et accessible depuis n'importe quel appareil.</p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Prénom ou pseudo</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={20}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Mot de passe</label>
          <input
            type="password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent"
          />
          <PasswordStrength password={password} />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Confirme le mot de passe</label>
          <input
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`w-full bg-ink-950 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent ${
              confirm && confirm !== password ? "border-rose-500/60" : "border-ink-700"
            }`}
          />
          {confirm && confirm !== password && (
            <p className="text-xs text-rose-400 mt-1.5">Les deux mots de passe ne correspondent pas.</p>
          )}
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Création…" : "Créer mon compte"}
        </button>
      </form>

      <p className="text-sm text-slate-500 mt-5 text-center">
        Déjà un compte ? <Link href="/connexion" className="text-accent-light hover:underline">Se connecter</Link>
      </p>
    </div>
  );
}
