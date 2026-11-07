Chaque projet Python doit avoir son propre environnement virtuel. Sinon, les conflits de versions te feront perdre des heures.

> 💡 **Quel terminal utilises-tu ?** Les commandes d'activation du venv sont différentes selon l'environnement.

---

## Créer et activer un environnement virtuel

**Créer le venv** (identique partout) :
```bash
python -m venv .venv
```
> Sur Mac/Linux, utilise `python3` si `python` ne fonctionne pas.

**Activer le venv :**

| Environnement | Commande |
|--------------|---------|
| bash / zsh (Mac/Linux) | `source .venv/bin/activate` |
| PowerShell (Windows) | `.venv\Scripts\Activate.ps1` |
| CMD (Windows) | `.venv\Scripts\activate.bat` |
| Git Bash (Windows) | `source .venv/Scripts/activate` |

**Désactiver** (identique partout) :
```bash
deactivate
```

> ⚠️ **PowerShell — erreur fréquente** : si tu vois *"l'exécution de scripts est désactivée"*, exécute une fois en tant qu'administrateur :
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> Ensuite relance `.venv\Scripts\Activate.ps1` normalement.

**Vérifier que le venv est actif** — ton prompt doit afficher `(.venv)` devant :
```
(.venv) PS C:\projet>    ← PowerShell
(.venv) user@machine:~/projet$    ← bash
```

---

## Gérer les dépendances (identique dans tous les environnements)

```bash
pip install pandas scikit-learn   # installer des paquets
pip freeze > requirements.txt     # capturer l'état exact
pip install -r requirements.txt   # reproduire sur une autre machine
pip list                          # voir ce qui est installé
pip show pandas                   # détails d'un paquet
```

**Structure de projet recommandée par ton plan**
```
projet/
├── src/               # code Python (fonctions, modules)
├── notebooks/         # exploration Jupyter uniquement
├── data_sample/       # petit échantillon de données (versionnable)
├── tests/             # tests pytest
├── requirements.txt   # dépendances
└── README.md          # obligatoire
```

**PyCharm** : IDE professionnel pour Python. Configure-le pour utiliser ton venv comme interpréteur : Settings → Python Interpreter → Add → Existing → .venv/bin/python.

**VS Code** : plus léger, excellent avec l'extension Python. Le terminal intégré reconnaît automatiquement le venv.
