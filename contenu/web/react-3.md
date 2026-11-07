Pour les applications réelles, il faut gérer l'état partagé entre composants et organiser le code proprement.

**Context API — état global sans librairie**
```jsx
// lib/AppContext.js
import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);

  const addXp = (amount) => setXp(prev => prev + amount);

  return (
    <AppContext.Provider value={{ user, xp, addXp }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personnalisé pour consommer le contexte
export function useApp() {
  return useContext(AppContext);
}

// Dans n'importe quel composant enfant
function LessonComplete() {
  const { xp, addXp } = useApp();
  return (
    <button onClick={() => addXp(50)}>
      Terminer (+50 XP) — Total : {xp}
    </button>
  );
}
```

**Hook personnalisé — réutiliser la logique**
```jsx
// hooks/useLocalStorage.js
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue));
  });

  const set = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, set];
}

// Utilisation
const [progress, setProgress] = useLocalStorage("progress", { xp: 0 });
```

**Bonnes pratiques React/Next.js** :
- Un composant = une responsabilité
- Props drilling > 2 niveaux → Context ou state management
- Toujours une `key` stable dans les listes (`key={item.id}`, pas l'index)
- `useMemo` / `useCallback` uniquement quand les perfs le nécessitent vraiment
- Tester avec React Testing Library
