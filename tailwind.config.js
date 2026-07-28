/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Mapped to CSS variables — flip automatically with .dark / .light class
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        // Palette « Forêt & Or ». Comme les fonds, les accents passent par des
        // variables CSS : le mode clair a besoin d'un or nettement plus foncé
        // pour rester lisible sur fond pâle.
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          light: "rgb(var(--accent-light) / <alpha-value>)",
          // Nom historique conservé (utilisé dans tout le code) : c'est
          // désormais le vert secondaire de la palette, plus le cyan.
          cyan: "rgb(var(--accent-2) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
