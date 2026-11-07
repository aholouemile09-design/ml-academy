Git est le système de versioning standard. GitHub est ton portfolio public. Tout recruteur ML regardera ton GitHub.

**Commandes Git quotidiennes**
```bash
git init                          # initialiser un repo
git clone URL                     # cloner un repo existant
git status                        # état des fichiers
git add fichier.py                # stager un fichier
git add .                         # stager tout
git commit -m "feat: add model"   # commiter
git push origin main              # envoyer sur GitHub
git pull                          # récupérer les dernières modifs
git log --oneline                 # historique compact
```

**Structure d'un commit propre** — suit la convention Conventional Commits :
```
feat: add logistic regression baseline
fix: correct data leakage in train/test split
docs: update README with installation steps
refactor: extract preprocessing into function
```

**Branches** — une branche = une fonctionnalité :
```bash
git checkout -b feature/eda       # créer + aller dans la branche
git checkout main                 # revenir sur main
git merge feature/eda             # fusionner
```

**Le .gitignore** — ce qu'on ne versionne JAMAIS :
```
.env
*.csv
data/
__pycache__/
.DS_Store
node_modules/
```

**Ressource** : Pro Git (livre gratuit) — https://git-scm.com/book/en/v2
