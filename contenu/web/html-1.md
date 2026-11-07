HTML (HyperText Markup Language) définit la **structure** d'une page web. HTML5 introduit des balises sémantiques qui donnent du sens au contenu.

**Structure d'une page HTML5 complète**
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CodeGraft Academy</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <nav>
      <a href="/">Accueil</a>
      <a href="/parcours">Parcours</a>
    </nav>
  </header>
  <main>
    <article>
      <h1>Introduction au Machine Learning</h1>
      <p>Le ML permet aux machines d'apprendre depuis les données.</p>
    </article>
    <aside>Ressources complémentaires</aside>
  </main>
  <footer>© 2026 CodeGraft Academy</footer>
</body>
</html>
```

**Balises sémantiques clés** : `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.

**Formulaires** — essentiels pour les applications :
```html
<form action="/submit" method="POST">
  <input type="email" name="email" required placeholder="ton@email.com">
  <input type="password" name="mdp" minlength="8">
  <select name="niveau">
    <option value="debutant">Débutant</option>
    <option value="avance">Avancé</option>
  </select>
  <button type="submit">S'inscrire</button>
</form>
```

**Ressource** : MDN Web Docs (référence absolue) — https://developer.mozilla.org/fr/docs/Web/HTML
