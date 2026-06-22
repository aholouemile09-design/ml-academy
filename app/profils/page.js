"use client";

import { useState } from "react";
import { useProfiles, AVATAR_COLORS } from "@/lib/profiles";
import Link from "next/link";

function Avatar({ name, colorId, size = "lg" }) {
  const color = AVATAR_COLORS.find(c => c.id === colorId) || AVATAR_COLORS[0];
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const sz = size === "lg" ? "w-16 h-16 text-xl" : size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return (
    <div className={`${sz} ${color.bg} rounded-full flex items-center justify-center font-bold text-white shrink-0`}>
      {initials}
    </div>
  );
}

function ProfileCard({ profile, isActive, onSwitch, onDelete }) {
  const color = AVATAR_COLORS.find(c => c.id === profile.colorId) || AVATAR_COLORS[0];
  const lessons = profile.completedLessons?.length || 0;
  const xp = profile.xp || 0;
  const quizCount = Object.keys(profile.quizScores || {}).length;

  return (
    <div className={`card p-5 border-2 transition-all ${isActive ? `border-${color.id}-500/60 bg-${color.id}-500/5` : "border-ink-700 hover:border-ink-600"}`}>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar name={profile.name} colorId={profile.colorId} size="lg" />
          {isActive && (
            <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-ink-900 flex items-center justify-center text-xs">✓</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-white text-lg">{profile.name}</h3>
            {isActive && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">Actif</span>}
          </div>
          <div className="flex gap-4 mt-1 text-xs text-slate-500">
            <span>⚡ {xp} XP</span>
            <span>📚 {lessons} leçons</span>
            <span>✅ {quizCount} quiz</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {!isActive && (
            <button onClick={() => onSwitch(profile.id)}
              className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/30 text-accent-light text-sm font-semibold hover:bg-accent/20 transition-colors">
              Choisir
            </button>
          )}
          <button onClick={() => onDelete(profile.id)}
            className="px-3 py-2 rounded-lg border border-rose-500/20 text-rose-400 text-sm hover:bg-rose-500/10 transition-colors">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProfilsPage() {
  const { profiles, activeProfile, addProfile, deleteProfile, switchProfile, maxReached, ready } = useProfiles();
  const [name, setName]         = useState("");
  const [colorId, setColorId]   = useState("indigo");
  const [showForm, setShowForm] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  if (!ready) return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    addProfile(name.trim(), colorId);
    setName("");
    setColorId("indigo");
    setShowForm(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">👤 Profils</h1>
        <p className="text-slate-400">Chaque profil a sa propre progression, ses scores et son XP. Jusqu'à 5 profils.</p>
      </div>

      {/* Profil actif en grand */}
      {activeProfile && (
        <div className="card p-6 mb-6 border-accent/30 bg-accent/5">
          <p className="text-xs text-slate-500 uppercase font-semibold mb-3">Profil actif</p>
          <div className="flex items-center gap-4">
            <Avatar name={activeProfile.name} colorId={activeProfile.colorId} size="lg" />
            <div>
              <h2 className="text-xl font-bold text-white">{activeProfile.name}</h2>
              <div className="flex gap-4 mt-1 text-sm text-slate-400">
                <span>⚡ {activeProfile.xp} XP</span>
                <span>📚 {activeProfile.completedLessons?.length || 0} leçons complétées</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link href="/dashboard" className="btn-primary text-sm">Voir mon dashboard</Link>
            <Link href="/parcours" className="btn-secondary text-sm">Continuer le cours</Link>
          </div>
        </div>
      )}

      {/* Liste des profils */}
      <div className="space-y-3 mb-6">
        {profiles.map(p => (
          <ProfileCard
            key={p.id}
            profile={p}
            isActive={p.id === activeProfile?.id}
            onSwitch={switchProfile}
            onDelete={(id) => setToDelete(id)}
          />
        ))}
      </div>

      {/* Formulaire d'ajout */}
      {!maxReached && (
        showForm ? (
          <form onSubmit={handleAdd} className="card p-5 border-dashed border-ink-600">
            <p className="text-sm font-semibold text-white mb-4">Nouveau profil</p>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Prénom ou pseudo…"
              maxLength={20}
              className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent placeholder:text-slate-600 mb-4"
              autoFocus
            />
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-2">Couleur de l'avatar</p>
              <div className="flex gap-2">
                {AVATAR_COLORS.map(c => (
                  <button key={c.id} type="button" onClick={() => setColorId(c.id)}
                    className={`w-8 h-8 rounded-full ${c.bg} transition-all ${colorId === c.id ? `ring-2 ring-offset-2 ring-offset-ink-900 ${c.ring} scale-110` : "opacity-60 hover:opacity-100"}`}
                    title={c.label}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={!name.trim()} className="btn-primary disabled:opacity-40">Créer</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Annuler</button>
            </div>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)}
            className="w-full card p-4 border-dashed border-ink-600 text-slate-400 hover:text-white hover:border-accent/50 text-sm font-semibold transition-colors">
            + Ajouter un profil ({profiles.length}/{5})
          </button>
        )
      )}

      {maxReached && (
        <p className="text-center text-sm text-slate-500 mt-4">Maximum de 5 profils atteint.</p>
      )}

      {/* Confirmation suppression */}
      {toDelete && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="card p-6 max-w-sm w-full">
            <h3 className="font-bold text-white mb-2">Supprimer ce profil ?</h3>
            <p className="text-sm text-slate-400 mb-5">
              Toute la progression de <strong className="text-white">{profiles.find(p => p.id === toDelete)?.name}</strong> sera effacée définitivement.
            </p>
            <div className="flex gap-3">
              <button onClick={() => { deleteProfile(toDelete); setToDelete(null); }}
                className="flex-1 py-2 rounded-lg bg-rose-500 text-white text-sm font-semibold hover:bg-rose-600 transition-colors">
                Supprimer
              </button>
              <button onClick={() => setToDelete(null)} className="flex-1 btn-secondary text-sm">Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
