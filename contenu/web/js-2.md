Le DOM (Document Object Model) est la représentation JavaScript de la page HTML. Le manipuler = rendre la page interactive.

**Sélectionner des éléments**
```javascript
// Moderne (recommandé)
const btn = document.querySelector("#submit-btn");
const cards = document.querySelectorAll(".card");

// Lire et modifier
btn.textContent = "Chargement...";
btn.classList.add("loading");
btn.style.opacity = "0.5";
```

**Événements**
```javascript
btn.addEventListener("click", (event) => {
  event.preventDefault();    // éviter la soumission du formulaire
  console.log("Cliqué !");
});

// Délégation d'événements — efficace pour les listes dynamiques
document.querySelector(".modules-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("module-btn")) {
    openModule(e.target.dataset.moduleId);
  }
});
```

**Créer des éléments dynamiquement**
```javascript
function createModuleCard(module) {
  const card = document.createElement("div");
  card.className = "card p-6";
  card.innerHTML = `
    <span class="text-2xl">${module.icon}</span>
    <h3 class="font-bold">${module.title}</h3>
    <p>${module.description}</p>
  `;
  return card;
}

document.querySelector(".grid").append(createModuleCard(module));
```

**LocalStorage** — persistance côté client :
```javascript
// Sauvegarder la progression
localStorage.setItem("completedLessons", JSON.stringify(["py-1", "py-2"]));

// Lire
const done = JSON.parse(localStorage.getItem("completedLessons") || "[]");
```
