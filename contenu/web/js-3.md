Les applications web communiquent avec des serveurs via HTTP. Fetch + async/await rendent ce code clair et maintenable.

**Fetch de base**
```javascript
// GET — récupérer des données
async function fetchModules() {
  try {
    const response = await fetch("/api/modules");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur:", error);
  }
}
```

**POST — envoyer des données**
```javascript
async function askTutor(question) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question }),
  });
  const { reply } = await response.json();
  return reply;
}
```

**Gestion des états de chargement** — pattern UX essentiel :
```javascript
async function sendQuestion() {
  btn.disabled = true;
  btn.textContent = "Chargement...";
  spinner.style.display = "block";

  try {
    const reply = await askTutor(input.value);
    appendMessage("assistant", reply);
  } catch (e) {
    appendMessage("error", "Une erreur s'est produite.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Envoyer";
    spinner.style.display = "none";
  }
}
```

**Promise.all** — requêtes en parallèle :
```javascript
const [user, modules, progress] = await Promise.all([
  fetch("/api/user").then(r => r.json()),
  fetch("/api/modules").then(r => r.json()),
  fetch("/api/progress").then(r => r.json()),
]);
```
