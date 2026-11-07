Le terminal est l'outil central de tout développeur et ingénieur ML. Savoir l'utiliser fluidement t'économise des heures chaque semaine.

> 🐧 **Pourquoi bash ?** Les serveurs cloud (AWS, GCP, Azure), Google Colab, Docker et toute la documentation ML utilisent bash/Linux. C'est la langue du ML en production — autant l'apprendre dès le départ. Sur Windows, installe **Git Bash** (inclus avec Git) pour avoir un vrai terminal bash.

---

## Navigation de base

```bash
pwd             # dossier courant
ls -la          # liste détaillée avec fichiers cachés
cd projet/      # aller dans un dossier
cd ..           # remonter d'un niveau
mkdir src       # créer un dossier
cp a.py b.py    # copier un fichier
mv a.py src/    # déplacer / renommer
rm fichier.py   # supprimer un fichier (irréversible !)
rm -rf dossier/ # supprimer un dossier entier
```

> 💡 **Sur Windows (PowerShell)** : `pwd`, `ls`, `cd`, `mkdir`, `cp`, `mv` fonctionnent pareil. Différences : `rm -Recurse dossier` au lieu de `rm -rf`, et `dir` si tu es en CMD.

---

## Manipuler les fichiers de données

```bash
cat data.csv             # afficher le contenu
head -20 data.csv        # 20 premières lignes
wc -l data.csv           # compter les lignes
grep "erreur" logs.txt   # chercher dans un fichier
```

> 💡 **Sur Windows (PowerShell)** : `Get-Content data.csv -TotalCount 20`, `(Get-Content data.csv).Count`, `Select-String "erreur" logs.txt`. Sur CMD : `type data.csv`, `findstr "erreur" logs.txt`.

---

## Variables d'environnement — essentielles pour les clés API

```bash
export ANTHROPIC_API_KEY="sk-ant-..."
echo $ANTHROPIC_API_KEY
```

> 💡 **Sur Windows (PowerShell)** : `$env:ANTHROPIC_API_KEY = "sk-ant-..."` — Sur CMD : `set ANTHROPIC_API_KEY=sk-ant-...`

> ⚠️ Ces commandes définissent la variable pour la **session courante uniquement**. En pratique, utilise un fichier `.env` dans ton projet avec python-dotenv — ne mets jamais tes clés dans le code source !

---

**Ressource recommandée** : MIT Missing Semester — https://missing.csail.mit.edu/ (gratuit, excellente qualité)
