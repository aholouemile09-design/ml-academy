"use client";

import { useState } from "react";
import { useUserProgress } from "@/lib/userProgress";
import { AVATAR_COLORS, AVATAR_OPTIONS, getAvatarEmoji } from "@/lib/avatars";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export function ProfileAvatar({ profile, size = "lg" }) {
  const color = AVATAR_COLORS.find(c => c.id === profile?.colorId) || AVATAR_COLORS[0];
  const emoji = getAvatarEmoji(profile);
  const sz = {
    xs: "w-7 h-7 text-sm",
    sm: "w-8 h-8 text-base",
    md: "w-10 h-10 text-lg",
    lg: "w-16 h-16 text-3xl",
    xl: "w-20 h-20 text-4xl",
  }[size] || "w-10 h-10 text-lg";

  return (
    <div className={`${sz} ${color.bg} rounded-full flex items-center justify-center shrink-0 select-none`}>
      {emoji}
    </div>
  );
}

function AvatarPicker({ selectedAvatar, selectedColor, onSelectAvatar, onSelectColor }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-500 mb-2">Choisis ton avatar</p>
        <div className="grid grid-cols-8 gap-2">
          {AVATAR_OPTIONS.map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectAvatar(opt.id)}
              title={opt.label}
              className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all hover:scale-110 ${
                selectedAvatar === opt.id
                  ? "ring-2 ring-accent scale-110 bg-accent/20"
                  : "bg-ink-800 hover:bg-ink-700"
              }`}
            >
              {opt.emoji}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">Couleur de fond</p>
        <div className="flex gap-2">
          {AVATAR_COLORS.map(c => (
            <button key={c.id} type="button" onClick={() => onSelectColor(c.id)}
              className={`w-8 h-8 rounded-full ${c.bg} transition-all ${
                selectedColor === c.id
                  ? `ring-2 ring-offset-2 ring-offset-ink-900 ${c.ring} scale-110`
                  : "opacity-60 hover:opacity-100"
              }`}
              title={c.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangePasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setOpen(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  if (!open) {
    return (
      <div className="mt-3">
        <button onClick={() => setOpen(true)}
          className="w-full card p-4 border-dashed border-ink-600 text-slate-400 hover:text-white hover:border-accent/50 text-sm font-semibold transition-colors">
          🔒 Changer mon mot de passe
        </button>
        {success && <p className="text-sm text-emerald-400 mt-3 text-center">Mot de passe mis à jour !</p>}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 border-dashed border-ink-600 space-y-4 mt-3">
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Nouveau mot de passe</label>
        <input type="password" required minLength={6} value={newPassword} onChange={e => setNewPassword(e.target.value)}
          className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" autoFocus />
      </div>
      <div>
        <label className="text-xs text-slate-500 mb-1 block">Confirmer le mot de passe</label>
        <input type="password" required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
          className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-accent" />
      </div>
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? "Mise à jour…" : "Enregistrer"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn-secondary">Annuler</button>
      </div>
    </form>
  );
}

export default function ComptePage() {
  const ctx = useUserProgress();
  const [name, setName] = useState("");
  const [colorId, setColorId] = useState("indigo");
  const [avatarId, setAvatarId] = useState("robot");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!ctx?.ready) return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;

  if (!ctx.user) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-slate-400 mb-4">Connecte-toi pour accéder à ton compte.</p>
        <Link href="/connexion" className="btn-primary">Se connecter →</Link>
      </div>
    );
  }

  const profile = { name: ctx.displayName, colorId: ctx.colorId, avatarId: ctx.avatarId };

  const startEdit = () => {
    setName(ctx.displayName);
    setColorId(ctx.colorId);
    setAvatarId(ctx.avatarId);
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    ctx.updateProfile({ displayName: name.trim(), colorId, avatarId });
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">👤 Mon compte</h1>
        <p className="text-slate-400">Ta progression est sauvegardée sur ton compte et accessible depuis n'importe quel appareil.</p>
      </div>

      <div className="card p-6 mb-6 border-accent/30 bg-accent/5">
        <div className="flex items-center gap-4">
          <ProfileAvatar profile={profile} size="xl" />
          <div>
            <h2 className="text-xl font-bold text-white">{ctx.displayName || ctx.user.email}</h2>
            <p className="text-xs text-slate-500">{ctx.user.email}</p>
            <div className="flex gap-4 mt-1 text-sm text-slate-400">
              <span>⚡ {ctx.xp} XP</span>
              <span>📚 {ctx.completedLessons.length} leçons</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-3 flex-wrap">
          <Link href="/dashboard" className="btn-primary text-sm">Voir mon dashboard</Link>
          <Link href="/parcours" className="btn-secondary text-sm">Continuer le cours</Link>
        </div>
      </div>

      {editing ? (
        <form onSubmit={handleSave} className="card p-5 border-dashed border-ink-600 space-y-5">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Prénom ou pseudo…"
            maxLength={20}
            className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600"
            autoFocus
          />
          <AvatarPicker
            selectedAvatar={avatarId}
            selectedColor={colorId}
            onSelectAvatar={setAvatarId}
            onSelectColor={setColorId}
          />
          <div className="flex gap-3">
            <button type="submit" disabled={!name.trim()} className="btn-primary disabled:opacity-40">Enregistrer</button>
            <button type="button" onClick={() => setEditing(false)} className="btn-secondary">Annuler</button>
          </div>
        </form>
      ) : (
        <button onClick={startEdit}
          className="w-full card p-4 border-dashed border-ink-600 text-slate-400 hover:text-white hover:border-accent/50 text-sm font-semibold transition-colors">
          ✎ Modifier mon profil (nom, avatar, couleur)
        </button>
      )}
      {saved && <p className="text-sm text-emerald-400 mt-3 text-center">Profil mis à jour !</p>}

      <ChangePasswordForm />

      <form action="/auth/logout" method="post" className="mt-8">
        <button type="submit" className="btn-secondary text-rose-400 border-rose-500/30 hover:border-rose-500 w-full">
          Se déconnecter
        </button>
      </form>

      <DeleteAccountSection />
    </div>
  );
}

function DeleteAccountSection() {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/account/delete", { method: "POST" });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Une erreur est survenue.");
      setLoading(false);
      return;
    }
    window.location.href = "/";
  };

  if (!confirming) {
    return (
      <div className="mt-4">
        <button onClick={() => setConfirming(true)}
          className="w-full text-xs text-slate-600 hover:text-rose-400 transition-colors py-2">
          Supprimer mon compte
        </button>
      </div>
    );
  }

  return (
    <div className="mt-4 card p-5 border-rose-500/30 bg-rose-500/5 space-y-3">
      <p className="text-sm text-rose-300 font-semibold">Supprimer mon compte</p>
      <p className="text-xs text-slate-400">
        Cette action est irréversible. Ton compte et toute ta progression seront définitivement supprimés.
      </p>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <div className="flex gap-3">
        <button onClick={handleDelete} disabled={loading}
          className="btn-secondary text-rose-400 border-rose-500/30 hover:border-rose-500 text-sm disabled:opacity-50">
          {loading ? "Suppression…" : "Confirmer la suppression"}
        </button>
        <button onClick={() => setConfirming(false)} className="btn-secondary text-sm">Annuler</button>
      </div>
    </div>
  );
}
