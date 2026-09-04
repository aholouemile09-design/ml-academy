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
          // ink-600 était utilisé à une dizaine d'endroits sans avoir jamais
          // été défini : Tailwind n'émettait rien et ces bordures tombaient
          // sur le gris par défaut, hors palette.
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        // Les surfaces sont neutres et l'accent porte seul la couleur — c'est
        // la règle du système visuel repris ici. Comme les fonds, les accents
        // passent par des variables CSS : le mode clair a besoin d'un bleu
        // nettement plus foncé pour rester lisible sur fond pâle.
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          light: "rgb(var(--accent-light) / <alpha-value>)",
          // Nom historique conservé (utilisé dans tout le code) : c'est
          // désormais le violet secondaire, partenaire de dégradé du bleu.
          cyan: "rgb(var(--accent-2) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        // Ombre en six couches, chacune presque invisible. C'est
        // l'empilement qui produit la profondeur, pas une ombre marquée.
        derek:
          "0px 0px 0px 1px rgb(0 0 0 / 0.06), 0px 1px 1px -0.5px rgb(0 0 0 / 0.06), 0px 3px 3px -1.5px rgb(0 0 0 / 0.06), 0px 6px 6px -3px rgb(0 0 0 / 0.06), 0px 12px 12px -6px rgb(0 0 0 / 0.06), 0px 24px 24px -12px rgb(0 0 0 / 0.06)",
        // Anneau d'un pixel + ombre courte : le relief d'une carte posée.
        hairline:
          "0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)",
      },
    },
  },
  plugins: [],
};
