React décompose l'UI en **composants** réutilisables. Chaque composant = une fonction qui retourne du JSX.

**Composant fonctionnel de base**
```jsx
// Un composant = une fonction qui retourne du JSX
function ModuleCard({ icon, title, description, level }) {
  return (
    <div className="card p-6 hover:border-accent/50 transition-colors">
      <span className="text-3xl">{icon}</span>
      <h3 className="font-bold text-white mt-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
      <span className="text-xs text-emerald-400">{level}</span>
    </div>
  );
}

// Utilisation
<ModuleCard icon="🐍" title="Python" description="Les bases" level="Débutant" />
```

**useState — état local**
```jsx
import { useState } from "react";

function QuizQuestion({ question, options, answer }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  return (
    <div>
      <p>{question}</p>
      {options.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(i)}
          className={selected === i ? "bg-accent" : "bg-ink-800"}
        >
          {opt}
        </button>
      ))}
      <button onClick={() => setShowResult(true)}>Valider</button>
      {showResult && (
        <p>{selected === answer ? "✅ Correct !" : "❌ Incorrect"}</p>
      )}
    </div>
  );
}
```

**useEffect — effets de bord**
```jsx
import { useEffect, useState } from "react";

function Dashboard() {
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    // Exécuté après le rendu
    const saved = JSON.parse(localStorage.getItem("progress") || "{}");
    setProgress(saved);
  }, []); // [] = exécuté une seule fois au montage

  if (!progress) return <p>Chargement...</p>;
  return <p>XP : {progress.xp}</p>;
}
```

**Ressource** : react.dev — https://react.dev (tutoriel officiel interactif)
