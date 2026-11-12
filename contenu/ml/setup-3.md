Un interpréteur Python n'a qu'un seul dossier de bibliothèques installées. Installer `pandas` le met à la disposition de tout ce qui tourne avec ce Python, et il ne peut y en avoir qu'**une version à la fois**.

C'est là tout le problème. Un projet de l'an dernier a besoin de `numpy 1.24`, celui d'aujourd'hui de `numpy 2.1` : les deux ne peuvent pas cohabiter dans le même interpréteur. En machine learning, où une version mineure de `scikit-learn` change parfois un résultat, ce n'est pas une gêne théorique.

L'environnement virtuel résout cela : **un interpréteur et un jeu de bibliothèques par projet.**

## Ce qu'est réellement un venv

Il n'y a aucune magie, et le démystifier évite beaucoup de confusion.

```bash
python -m venv .venv
```

Cette commande crée un dossier `.venv` contenant trois choses : un lien vers l'interpréteur Python qui l'a créé, un dossier `site-packages` vide qui recevra les installations, et un fichier `pyvenv.cfg` qui dit de quel Python il dérive.

**Activer n'installe rien et ne lance rien.** Le script d'activation se contente de deux gestes : il place le dossier `.venv/bin` (ou `.venv\Scripts`) **en tête de ton `PATH`**, et il modifie ton invite pour afficher `(.venv)`. C'est tout. À partir de là, `python` et `pip` trouvés en premier dans le `PATH` sont ceux du venv, et `pip install` écrit dans son `site-packages`.

| Environnement | Commande d'activation |
| --- | --- |
| bash / zsh (Mac, Linux) | `source .venv/bin/activate` |
| Git Bash (Windows) | `source .venv/Scripts/activate` |
| PowerShell (Windows) | `.venv\Scripts\Activate.ps1` |
| CMD (Windows) | `.venv\Scripts\activate.bat` |

Trois conséquences découlent directement de ce fonctionnement.

**L'activation ne vaut que pour le terminal courant.** Un deuxième onglet n'est pas activé. Un script lancé depuis un autre shell non plus.

**On écrit `source`, pas `./`.** Comme vu au cours sur le terminal, un script exécuté tourne dans un processus enfant et ne peut pas modifier le `PATH` de son parent. `source` l'exécute dans le shell courant, ce qui est précisément ce qu'on veut.

**Un venv se jette.** Il ne contient rien d'unique : juste des paquets téléchargeables. Quand il est dans un état incompréhensible, `rm -rf .venv` puis on recommence. C'est souvent la réparation la plus rapide, et elle ne perd rien.

### Deux erreurs d'installation fréquentes

**PowerShell refuse d'exécuter le script d'activation.** Le message parle d'exécution de scripts désactivée. La politique par défaut de Windows bloque les scripts non signés. Une fois pour toutes, dans un PowerShell utilisateur :

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

`RemoteSigned` autorise les scripts locaux et exige une signature pour ceux téléchargés ; `-Scope CurrentUser` évite d'avoir à ouvrir une session administrateur et limite la portée à ton compte.

**Sous Linux, `ensurepip is not available`.** Les distributions Debian et Ubuntu livrent Python sans le module `venv`, qui est dans un paquet séparé. Le message indique le nom à installer, qui dépend de ta version de Python :

```bash
sudo apt install python3.12-venv
```

## pip, et pourquoi l'écrire `python -m pip`

```bash
python -m pip install pandas
python -m pip list
python -m pip show pandas
```

La commande `pip` est un exécutable à part, et rien ne garantit qu'elle appartienne au Python que tu crois. Sur une machine avec plusieurs versions installées, `pip install` peut parfaitement déposer le paquet dans un interpréteur, pendant que `python` en lance un autre — d'où le `ModuleNotFoundError` juste après une installation réussie.

`python -m pip` élimine la question : il lance le pip **de l'interpréteur nommé `python`**, celui-là même qui exécutera ton code. Prends-le comme forme par défaut ; c'est trois caractères de plus et une classe entière de problèmes en moins.

`python -m pip show pandas` affiche au passage le chemin d'installation : c'est la preuve directe que le paquet est bien dans le venv et pas ailleurs.

## Figer les versions

`pip install pandas` installe la dernière version du jour. Lancée dans six mois, la même commande en installera une autre. Un projet qui ne dit pas de quelles versions il dépend n'est pas reproductible, et « ça marche chez moi » est la conséquence directe.

Il y a deux fichiers possibles, et la distinction mérite d'être nette.

**Le fichier d'intention.** Tu y écris ce dont le projet a besoin, à la main :

```
pandas==2.2.3
scikit-learn==1.5.2
pytest==8.3.3
```

**Le fichier d'état**, produit par `pip freeze`, liste **tout** ce qui est installé, dépendances transitives comprises — souvent quarante lignes pour trois paquets demandés.

Les deux servent, à des moments différents : le fichier d'intention se lit et s'entretient, le fichier d'état garantit une reconstitution à l'identique. Pour un projet d'apprentissage, le premier suffit largement.

### Les opérateurs de version

| Écriture | Signifie |
| --- | --- |
| `pandas==2.2.3` | exactement cette version |
| `pandas>=2.0` | au moins celle-ci, n'importe laquelle au-dessus |
| `pandas~=2.2.0` | au moins 2.2.0, sans dépasser 2.3 |
| `pandas` | n'importe laquelle, donc la dernière |

Le numérotage suit en général le **versionnage sémantique** : `MAJEUR.MINEUR.CORRECTIF`. Un incrément de correctif corrige sans rien casser, un mineur ajoute sans rien casser, un majeur **casse volontairement** quelque chose.

La règle à appliquer pour un projet qui doit tenir : **épingle exactement.** `>=` revient à dire « je veux bien tout ce que les auteurs publieront, y compris ce qui cassera mon code ». Le jour où tu veux monter de version, tu le fais exprès, tu relances les tests, et tu as une ligne de différence à relire.

## Choisir son outil

| Outil | Pour quoi | Remarque |
| --- | --- | --- |
| `venv` + `pip` | tout projet Python pur | inclus, rien à installer |
| `conda` | paquets scientifiques compilés, CUDA | gère aussi les bibliothèques système |
| `uv` | les mêmes usages que venv + pip | beaucoup plus rapide, récent |
| `poetry` | bibliothèques publiées | gère la résolution et la publication |

`venv` est le bon choix par défaut, et le seul qui soit toujours disponible. `conda` garde un avantage réel quand un paquet dépend de bibliothèques C ou d'une version précise de CUDA : il installe aussi ces briques non-Python, ce que `pip` ne sait pas faire.

Un conseil qui évite des heures : **ne mélange pas conda et pip dans le même environnement.** Les deux tiennent chacun leur propre comptabilité de ce qui est installé, et aucun ne voit ce que l'autre a fait.

### Installer les paquets lourds

`pip install torch` ou `pip install tensorflow` télécharge plusieurs gigaoctets. Ces paquets sont livrés en **wheels**, des archives déjà compilées pour ton système et ta version de Python — rien ne se compile chez toi tant qu'une wheel existe pour ta plateforme. Si tu vois une compilation démarrer, c'est qu'il n'y en a pas : ta version de Python est probablement trop récente de quelques semaines.

Pour PyTorch, la commande dépend de ton matériel : la version processeur et les versions CUDA viennent d'index différents, et le site officiel génère la ligne exacte. Ne copie pas une commande `pip install torch` trouvée dans un tutoriel de 2023, elle installera la mauvaise.

## Le piège Jupyter

Celui-ci mérite sa section, parce qu'il touche tout le monde et que le message d'erreur ne dit pas ce qui se passe.

Tu actives ton venv, tu installes `pandas`, tu lances `jupyter notebook`, et la première cellule répond `ModuleNotFoundError: No module named 'pandas'`.

La raison : **un notebook ne s'exécute pas dans le terminal, mais dans un noyau**, un processus Python séparé que Jupyter choisit dans une liste. Si Jupyter est installé globalement, il propose le noyau global, qui n'a jamais vu ton venv.

La solution est d'enregistrer le venv comme noyau :

```bash
python -m pip install ipykernel
python -m ipykernel install --user --name=mon-projet
```

Le noyau `mon-projet` apparaît alors dans le menu « Kernel » de Jupyter, et il faut le sélectionner explicitement. Pour vérifier depuis une cellule quel Python tourne réellement :

```python
import sys
print(sys.executable)
```

Ce chemin doit contenir `.venv`. S'il ne le contient pas, aucune installation faite dans ton terminal ne sera visible — et tu peux relancer `pip install` autant de fois que tu veux, cela ne changera rien.

## Structurer le projet

```
projet/
├── src/               code réutilisable (modules, fonctions)
├── notebooks/         exploration jetable
├── tests/             tests pytest
├── data_sample/       petit échantillon versionnable
├── .venv/             ignoré par Git
├── .env               secrets, ignoré par Git
├── requirements.txt
└── README.md
```

La séparation `src/` et `notebooks/` est celle qui compte. Un notebook est un outil d'exploration : on y exécute les cellules dans le désordre, on garde un état invisible en mémoire, et le résultat n'est reproductible pour personne. Dès qu'un bout de code mérite d'être rappelé deux fois, il part dans `src/` sous forme de fonction, et le notebook l'importe. C'est ce qui rend possible, plus tard, de sortir un modèle d'un notebook pour le mettre en production.

### Faire que les imports fonctionnent

Lancer `pytest` depuis la racine et obtenir `ModuleNotFoundError: No module named 'src'` est un passage obligé. Python cherche les modules dans le dossier du script lancé, pas dans celui d'où tu l'as lancé.

La réponse la plus simple est un fichier `pytest.ini` à la racine :

```
[pytest]
pythonpath = .
```

La racine du projet entre alors dans le chemin de recherche, et `from src.utils import moyenne` fonctionne depuis les tests. Évite la solution qu'on trouve partout, qui consiste à bricoler `sys.path` en tête de chaque fichier : elle marche, et elle se propage dans tout le projet.

### Les secrets

Un fichier `.env` à la racine, **ignoré par Git**, et `python-dotenv` pour le lire. Pour que le suivant sache quoi y mettre, dépose à côté un `.env.example` versionné, avec les noms des variables et des valeurs vides. C'est la documentation la moins chère qui existe.

## Configurer l'éditeur

**PyCharm** : Settings, puis Python Interpreter, Add Local Interpreter, Existing, et tu désignes `.venv/bin/python` (ou `.venv\Scripts\python.exe`). PyCharm détecte souvent le venv tout seul à l'ouverture du dossier et propose de l'utiliser — accepte.

**VS Code** : `Ctrl+Shift+P`, « Python: Select Interpreter », et choisis celui du `.venv`. L'interpréteur sélectionné s'affiche dans la barre d'état en bas, et c'est l'endroit à regarder quand un import est souligné en rouge alors que le paquet est installé.

Dans les deux cas, le terminal intégré active le venv automatiquement une fois l'interpréteur choisi. Si ce n'est pas le cas, ferme-le et rouvres-en un : il hérite de la configuration au démarrage, pas après.

## Au clavier

- **Vérifie avant d'installer, pas après.** Un coup d'œil au `(.venv)` de l'invite coûte zéro seconde, et `pip install` dans le Python système se nettoie beaucoup moins facilement qu'il ne se fait.
- **Ne renomme pas et ne déplace pas un dossier de venv.** Les chemins qu'il contient sont absolus et écrits à la création ; déplacé, il cesse de fonctionner de façon obscure. Recrée-le, c'est une minute.
- **`pip install` ne met pas à jour.** Si le paquet est déjà là, pip ne touche à rien. Il faut `python -m pip install --upgrade pandas`.
- **Un conflit de dépendances se lit.** Quand pip annonce qu'il ne trouve pas de combinaison compatible, le message nomme les deux paquets qui s'excluent et leurs contraintes. C'est généralement un paquet épinglé trop bas quelque part, pas une fatalité.
- **Le `.venv` ne se versionne jamais.** Il pèse des centaines de mégaoctets, il est spécifique à ton système, et `requirements.txt` suffit à le reconstruire ailleurs.
