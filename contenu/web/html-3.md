60% du trafic web vient des mobiles. Un site responsive s'adapte à toutes les tailles d'écran.

**Media queries — approche mobile-first** :
```css
/* Mobile par défaut */
.grid { grid-template-columns: 1fr; }

/* Tablette (≥ 768px) */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

**Tailwind CSS** — framework utility-first. Au lieu d'écrire du CSS custom, tu utilises des classes prédéfinies :
```html
<!-- Sans Tailwind -->
<div style="background:#0f1525; border-radius:1rem; padding:1.5rem">

<!-- Avec Tailwind -->
<div class="bg-slate-900 rounded-2xl p-6">

<!-- Responsive avec Tailwind -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

Tailwind est utilisé dans CE site (CodeGraft Academy) — tu peux inspecter les classes dans le code pour apprendre.

**Unités modernes** :
- `rem` : relatif à la taille de base (accessibilité)
- `%`, `vw`, `vh` : relatif au viewport
- `clamp(1rem, 4vw, 2rem)` : taille fluide entre min et max

**Ressource** : Tailwind CSS Docs — https://tailwindcss.com/docs
