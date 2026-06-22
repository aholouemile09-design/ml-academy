"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark"); // SSR-safe default

  // Lire le thème sauvegardé (client uniquement)
  useEffect(() => {
    const saved = localStorage.getItem("ml-academy-theme") || "dark";
    setTheme(saved);
    applyTheme(saved);
  }, []);

  function applyTheme(t) {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(t);
  }

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("ml-academy-theme", next);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
