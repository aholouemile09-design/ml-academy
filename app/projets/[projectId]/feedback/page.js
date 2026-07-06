"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useUserProgress } from "@/lib/userProgress";
import { getProject } from "@/lib/projects";
import Link from "next/link";

const RUBRIC_ITEMS = [
  { key: "correction", label: "Correction", desc: "Mon code fonctionne sans erreurs" },
  { key: "lisibilite", label: "Lisibilité", desc: "Mon code est clair et bien nommé" },
  { key: "structure", label: "Structure", desc: "Mon code est bien organisé en fonctions/modules" },
  { key: "bonnes_pratiques", label: "Bonnes pratiques", desc: "J'applique les conventions du langage" },
  { key: "tests", label: "Tests", desc: "J'ai vérifié/testé mon code" },
];

const SCORES = ["Non", "Partiellement", "Oui"];

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function FeedbackText({ text }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
      {text}
    </div>
  );
}

export default function ProjectFeedbackPage() {
  const { projectId } = useParams();
  const project = getProject(projectId);
  const { user, loaded } = useUserProgress();

  const [codeOrUrl, setCodeOrUrl] = useState("");
  const [rubric, setRubric] = useState({});
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("rubric"); // rubric → submit → result
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  const fetchHistory = useCallback(async () => {
    const res = await fetch(`/api/project-feedback?project_id=${projectId}`);
    const data = await res.json();
    setHistory(data.submissions ?? []);
    setHistoryLoading(false);
  }, [projectId]);

  useEffect(() => {
    if (loaded && user) fetchHistory();
    else if (loaded) setHistoryLoading(false);
  }, [loaded, user, fetchHistory]);

  if (!loaded) return <div className="max-w-2xl mx-auto px-6 py-20 text-center text-slate-500">Chargement…</div>;

  if (!project) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <p className="text-slate-400">Projet introuvable.</p>
      <Link href="/projets" className="btn-primary mt-4 inline-block">Retour aux projets</Link>
    </div>
  );

  if (!user) return (
    <div className="max-w-md mx-auto px-6 py-20 text-center">
      <p className="text-slate-400 mb-4">Connecte-toi pour soumettre ton code pour feedback.</p>
      <Link href="/connexion" className="btn-primary">Se connecter →</Link>
    </div>
  );

  const setRubricScore = (key, score) => setRubric(r => ({ ...r, [key]: score }));

  const rubricComplete = RUBRIC_ITEMS.every(item => rubric[item.key] !== undefined);

  const handleSubmit = async () => {
    if (!codeOrUrl.trim()) { setError("Colle ton code ou l'URL de ton repo."); return; }
    setError("");
    setLoading(true);

    const apiKey = typeof window !== "undefined" ? localStorage.getItem("ml-academy-api-key") : null;
    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers["x-user-api-key"] = apiKey;

    const res = await fetch("/api/project-feedback", {
      method: "POST",
      headers,
      body: JSON.stringify({
        project_id: projectId,
        project_title: project.title,
        code_or_url: codeOrUrl,
        rubric: Object.fromEntries(RUBRIC_ITEMS.map(i => [i.label, rubric[i.key] ?? "—"])),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) { setError(data.error || "Erreur lors de la génération du feedback."); return; }
    setFeedback(data.feedback);
    setStep("result");
    fetchHistory();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <Link href="/projets" className="text-xs text-slate-500 hover:text-accent-light transition-colors">← Projets</Link>
        <h1 className="text-2xl font-bold text-white mt-2">{project.title}</h1>
        <p className="text-slate-400 text-sm mt-1">Soumettre pour feedback guidé</p>
      </div>

      {step === "rubric" && (
        <div className="space-y-6">
          <div className="card p-6 space-y-4">
            <h2 className="text-base font-semibold text-white">1. Auto-évaluation avant le feedback</h2>
            <p className="text-xs text-slate-500">Prends le temps de réfléchir à ton travail avant de recevoir le retour de l'IA.</p>
            {RUBRIC_ITEMS.map(item => (
              <div key={item.key}>
                <p className="text-sm text-slate-300 mb-1">{item.label} — <span className="text-slate-500 text-xs">{item.desc}</span></p>
                <div className="flex gap-2">
                  {SCORES.map(score => (
                    <button key={score} onClick={() => setRubricScore(item.key, score)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                        rubric[item.key] === score
                          ? "border-accent bg-accent/15 text-white"
                          : "border-ink-700 text-slate-500 hover:border-accent/40"
                      }`}>
                      {score}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => setStep("submit")} disabled={!rubricComplete}
            className="btn-primary w-full disabled:opacity-40">
            Continuer → Soumettre mon code
          </button>
        </div>
      )}

      {step === "submit" && (
        <div className="space-y-5">
          <div className="card p-6 space-y-4">
            <h2 className="text-base font-semibold text-white">2. Colle ton code ou l'URL de ton repo</h2>
            <p className="text-xs text-slate-500">GitHub public, extrait de code, ou les deux. Ne soumets que ce que tu as écrit toi-même.</p>
            <textarea
              value={codeOrUrl}
              onChange={e => setCodeOrUrl(e.target.value)}
              rows={10}
              placeholder="https://github.com/... ou colle ton code ici"
              className="w-full bg-ink-950 border border-ink-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent placeholder:text-slate-600 resize-y"
            />
            {error && <p className="text-sm text-rose-400">{error}</p>}
            {!localStorage?.getItem?.("ml-academy-api-key") && (
              <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg p-3">
                ⚠️ Aucune clé API Anthropic configurée. Le feedback utilisera la clé partagée du site (limitée).{" "}
                <Link href="/parametres" className="underline hover:text-white">Configurer ma clé →</Link>
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep("rubric")} className="btn-secondary text-sm">← Retour</button>
            <button onClick={handleSubmit} disabled={loading || !codeOrUrl.trim()}
              className="btn-primary flex-1 disabled:opacity-40">
              {loading ? "Analyse en cours… (10-20s)" : "Obtenir le feedback →"}
            </button>
          </div>
        </div>
      )}

      {step === "result" && (
        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="text-base font-semibold text-white mb-4">Feedback sur ton code</h2>
            <FeedbackText text={feedback} />
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => { setStep("rubric"); setRubric({}); setCodeOrUrl(""); setFeedback(""); }}
              className="btn-secondary text-sm">Nouvelle soumission</button>
            <button onClick={() => setShowHistory(true)} className="btn-secondary text-sm">
              Voir l'historique ({history.length})
            </button>
          </div>
        </div>
      )}

      {/* Historique */}
      {(showHistory || (step !== "result" && history.length > 0)) && (
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Historique des soumissions</h2>
            {showHistory && <button onClick={() => setShowHistory(false)} className="text-xs text-slate-500 hover:text-white">Fermer</button>}
          </div>
          {historyLoading ? (
            <p className="text-slate-500 text-sm">Chargement…</p>
          ) : history.length === 0 ? (
            <p className="text-slate-500 text-sm">Aucune soumission pour ce projet.</p>
          ) : (
            <div className="space-y-3">
              {history.map(s => (
                <details key={s.id} className="card p-4">
                  <summary className="cursor-pointer text-sm font-medium text-slate-300 flex items-center justify-between">
                    <span>Soumission du {formatDate(s.created_at)}</span>
                    <span className="text-xs text-slate-600">▼</span>
                  </summary>
                  <div className="mt-4 space-y-3">
                    <div className="bg-ink-800 rounded-xl p-3">
                      <p className="text-xs text-slate-500 mb-1">Code soumis</p>
                      <pre className="text-xs text-slate-300 whitespace-pre-wrap overflow-x-auto max-h-32 overflow-y-auto">{s.code_or_url}</pre>
                    </div>
                    {s.feedback && (
                      <div>
                        <p className="text-xs text-slate-500 mb-2">Feedback reçu</p>
                        <FeedbackText text={s.feedback} />
                      </div>
                    )}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
