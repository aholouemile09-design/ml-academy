CSS (Cascading Style Sheets) contrôle l'apparence. Flexbox et Grid ont révolutionné la mise en page.

**Les sélecteurs essentiels**
```css
/* Élément */       p { color: #334155; }
/* Classe */        .card { background: #0f1525; }
/* ID */            #hero { height: 100vh; }
/* Combinaisons */  .nav a:hover { color: #818cf8; }
```

**Flexbox** — disposition en ligne ou colonne :
```css
.navbar {
  display: flex;
  justify-content: space-between;  /* espacement horizontal */
  align-items: center;              /* alignement vertical */
  gap: 1rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;                  /* retour à la ligne auto */
  gap: 1.5rem;
}
.card { flex: 1 1 300px; }         /* taille minimale 300px */
```

**CSS Grid** — grilles bidimensionnelles :
```css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;  /* sidebar + contenu */
  grid-template-rows: auto 1fr auto; /* header + main + footer */
  min-height: 100vh;
}

/* Grille responsive sans media queries */
.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

**Variables CSS & thème sombre** :
```css
:root {
  --bg: #0a0e1a;
  --bg-card: #0f1525;
  --accent: #6366f1;
  --text: #e2e8f0;
}
body { background: var(--bg); color: var(--text); }
```

**Ressource** : css-tricks.com/snippets/css/a-guide-to-flexbox/ + Grid Guide
