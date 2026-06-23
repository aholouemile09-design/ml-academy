"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PROJECTS, PROJECT_LEVELS } from "@/lib/projects";
import Link from "next/link";

// Génère un README professionnel pour le projet
function buildReadme(project, code, username) {
  const levelInfo = PROJECT_LEVELS[project.level];
  const date = new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
  return `# ${project.icon} ${project.title}

> Projet réalisé dans le cadre de **CodeGraft Academy** — ${date}

## 🎯 Objectif

${project.description}

**Ce que j'ai appris :** ${project.learning_goal}

## 🛠 Technologies utilisées

${project.skills.map(s => `- ${s}`).join("\n")}

## 📋 Étapes réalisées

${project.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## 📚 Ressources consultées

${project.resources?.map(r => `- [${r.label}](${r.url})`).join("\n") || "- Documentation officielle"}

## 🏷 Niveau

**${levelInfo?.label}** — parcours CodeGraft Academy

---

*Projet publié automatiquement depuis [CodeGraft Academy](https://codegraft.vercel.app/)*${username ? ` par @${username}` : ""}
`;
}

// Slug propre pour nom de repo
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[àâä]/g, "a").replace(/[éèêë]/g, "e").replace(/[îï]/g, "i")
    .replace(/[ôö]/g, "o").replace(/[ùûü]/g, "u").replace(/[ç]/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function PublierContent() {
  const searchParams = useSearchParams();
  const [projectId, setProjectId] = useState(searchParams.get("id") || "");
  const [token, setToken]         = useState("");
  const [code, setCode]           = useState("");
  const [filename, setFilename]   = useState("main.py");
  const [status, setStatus]       = useState("idle"); // idle | loading | success | error
  const [result, setResult]       = useState(null);
  const [errorMsg, setErrorMsg]   = useState("");

  // Charger le token sauvegardé
  useEffect(() => {
    const saved = localStorage.getItem("ml-academy-github-token");
    if (saved) setToken(saved);
  }, []);

  const project = PROJECTS.find(p => p.id === projectId);
  const repoSlug = project ? `codegraft-${toSlug(project.title)}` : "";

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!token || !project) return;
    setStatus("loading");
    setErrorMsg("");

    // Sauvegarder le token localement
    localStorage.setItem("ml-academy-github-token", token);

    const readme = buildReadme(project, code, "");
    const files  = code.trim() ? [{ path: filename || "main.py", content: code }] : [];

    try {
      const res = await fetch("/api/github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-github-token": token,
        },
        body: JSON.stringify({
          repoName: repoSlug,
          description: `${project.title} — CodeGraft Academy`,
          readme,
          files,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setResult(data);
      } else {
        setStatus("error");
        setErrorMsg(data.detail || data.error || "Erreur inconnue");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(String(err));
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-8">
        <Link href="/projets" className="text-sm text-slate-400 hover:text-white mb-4 inline-block">← Retour aux projets</Link>
        <h1 className="text-3xl font-bold text-white mb-2">🐙 Publier sur GitHub</h1>
        <p className="text-slate-400">Crée un repo GitHub pour ton projet directement depuis CodeGraft Academy.</p>
      </div>

      {status === "success" && result ? (
        <div className="card p-8 text-center border-emerald-500/30 bg-emerald-500/5">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-xl font-bold text-white mb-2">Repo créé avec succès !</h2>
          <p className="text-slate-400 mb-6">Ton projet est maintenant public sur GitHub.</p>
          <a href={result.repoUrl} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2">
            🐙 Voir le repo sur GitHub →
          </a>
          <div className="mt-4">
            <button onClick={() => { setStatus("idle"); setResult(null); setCode(""); }}
              className="text-sm text-slate-400 hover:text-white">
              Publier un autre projet
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePublish} className="space-y-6">

          {/* Étape 1 — Token GitHub */}
          <div className="card p-5">
            <h2 className="font-semibold text-white mb-1">1. Token GitHub personnel</h2>
            <p className="text-xs text-slate-500 mb-3">
              Génère un token sur{" "}
              <a href="https://github.com/settings/tokens/new?scopes=repo&description=ML+Academy" target="_blank" rel="noopener noreferrer" className="text-accent-light hover:underline">
                github.com → Settings → Developer settings → Personal access tokens
              </a>
              . Coche uniquement le scope <code className="bg-ink-800 px-1 rounded text-xs">repo</code>.
              Le token est sauvegardé localement dans ton navigateur.
            </p>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent placeholder:text-slate-600"
            />
            {token && (
              <p className="text-xs text-emerald-400 mt-1.5">✓ Token enregistré</p>
            )}
          </div>

          {/* Étape 2 — Choisir le projet */}
          <div className="card p-5">
            <h2 className="font-semibold text-white mb-3">2. Quel projet veux-tu publier ?</h2>
            <div className="grid gap-2 max-h-64 overflow-y-auto pr-1">
              {PROJECTS.map(p => {
                const lvl = PROJECT_LEVELS[p.level];
                return (
                  <label key={p.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      projectId === p.id ? "border-accent bg-accent/10" : "border-ink-700 hover:border-ink-600"
                    }`}>
                    <input type="radio" name="project" value={p.id}
                      checked={projectId === p.id}
                      onChange={() => setProjectId(p.id)}
                      className="accent-indigo-500" />
                    <span className="text-lg">{p.icon}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-white font-medium">{p.title}</span>
                      <span className={`ml-2 text-xs ${lvl.color}`}>{lvl.label}</span>
                    </div>
                  </label>
                );
              })}
            </div>
            {project && (
              <p className="text-xs text-slate-500 mt-3">
                Nom du repo : <code className="bg-ink-800 px-1.5 py-0.5 rounded text-accent-light">{repoSlug}</code>
              </p>
            )}
          </div>

          {/* Étape 3 — Coller son code (optionnel) */}
          <div className="card p-5">
            <h2 className="font-semibold text-white mb-1">3. Ton code <span className="text-slate-500 font-normal text-sm">(optionnel)</span></h2>
            <p className="text-xs text-slate-500 mb-3">
              Colle ton code principal. Il sera ajouté au repo avec le README auto-généré. Si tu n'as pas encore de code, laisse vide.
            </p>
            <div className="flex gap-2 mb-2">
              <input
                value={filename}
                onChange={e => setFilename(e.target.value)}
                placeholder="main.py"
                className="w-40 bg-ink-950 border border-ink-700 rounded-lg px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-accent"
              />
              <span className="text-xs text-slate-600 self-center">Nom du fichier</span>
            </div>
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              rows={10}
              placeholder={"# Colle ton code ici…\nimport pandas as pd\n\n# ..."}
              className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-3 text-xs font-mono focus:outline-none focus:border-accent placeholder:text-slate-700 resize-y"
            />
          </div>

          {/* Erreur */}
          {status === "error" && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-400">
              ❌ {errorMsg || "Une erreur s'est produite. Vérifie ton token et réessaie."}
            </div>
          )}

          {/* Bouton */}
          <button
            type="submit"
            disabled={!token || !project || status === "loading"}
            className="w-full btn-primary py-3 text-base disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Création du repo en cours…
              </>
            ) : (
              "🐙 Créer le repo GitHub →"
            )}
          </button>

          <p className="text-center text-xs text-slate-600">
            Ton token ne quitte jamais ton navigateur sauf pour appeler l'API GitHub via notre serveur.
            Il n'est jamais enregistré côté serveur.
          </p>
        </form>
      )}
    </div>
  );
}

export default function PublierPage() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>}>
      <PublierContent />
    </Suspense>
  );
}
