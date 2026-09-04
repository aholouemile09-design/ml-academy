"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { validatePassword, PASSWORD_MIN_LENGTH } from "@/lib/passwordPolicy";
import PasswordStrength from "@/components/PasswordStrength";

export default function ReinitialiserMotDePassePage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [lienPerime, setLienPerime] = useState(false);
  const [fait, setFait] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Contrôle immédiat, pour ne pas faire attendre un aller-retour réseau
    // sur une faute évidente. Le serveur refera la même vérification :
    // celle-ci est un confort, pas une protection.
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
    let res, data;
    try {
      res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      data = await res.json();
    } catch {
      setLoading(false);
      setError("Connexion au serveur impossible. Vérifie ta connexion internet.");
      return;
    }
    setLoading(false);

    if (!res.ok) {
      if (data.error === "no_recovery_session" || data.error === "no_session") {
        setLienPerime(true);
        return;
      }
      setError(data.message || "Impossible d'enregistrer le nouveau mot de passe.");
      return;
    }

    setPassword("");
    setConfirm("");
    setFait(true);
    router.refresh();
  };

  if (lienPerime) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">⌛ Lien expiré</h1>
        <p className="text-slate-400">
          Ce lien de réinitialisation n'est plus valide. Ils ne servent qu'une fois, et ne restent
          actifs qu'un temps limité — c'est ce qui les rend sûrs.
        </p>
        <Link href="/mot-de-passe-oublie" className="btn-primary inline-block mt-6">
          Demander un nouveau lien
        </Link>
      </div>
    );
  }

  if (fait) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">✅ Mot de passe modifié</h1>
        <p className="text-slate-400">
          Tu es connecté sur cet appareil. Par précaution, toutes tes autres sessions ont été fermées :
          si quelqu'un était resté connecté ailleurs, il ne l'est plus.
        </p>
        <Link href="/espace" className="btn-primary inline-block mt-6">
          Aller à mon espace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">Nouveau mot de passe</h1>
      <p className="text-slate-400 mb-8">
        Choisis-en un que tu n'utilises nulle part ailleurs. Un gestionnaire de mots de passe s'en
        souviendra à ta place.
      </p>

      <form onSubmit={handleSubmit} className="card p-6 space-y-4">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">Nouveau mot de passe</label>
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
        {error && (
          <div className="rounded-xl px-4 py-3 border border-rose-500/30 bg-rose-500/10 text-rose-300 text-sm">
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
          {loading ? "Enregistrement…" : "Enregistrer le nouveau mot de passe"}
        </button>
      </form>
    </div>
  );
}
