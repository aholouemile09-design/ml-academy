Le terminal n'est pas une relique pour nostalgiques : c'est la seule interface disponible sur une machine distante. Un serveur AWS, un conteneur Docker, une machine d'entraînement GPU louée à l'heure n'ont pas de bureau. Tout ce que tu feras en production passera par là, et la documentation que tu liras suppose que tu sais t'en servir.

Cette leçon traite du shell lui-même — ce qu'il fait de ce que tu tapes — plutôt que de la liste des commandes, qu'on retient en les utilisant.

## Ce qu'est un shell

Un shell est une boucle : il lit une ligne, la découpe, lance un programme, attend, affiche le résultat, et recommence. La ligne que tu tapes se découpe toujours de la même façon.

```bash
ls -la mon_dossier
```

`ls` est le **programme**, un fichier exécutable sur le disque. `-la` et `mon_dossier` sont ses **arguments**, passés sous forme de texte. Le shell ne sait rien de ce que `ls` va en faire : son travail s'arrête au découpage.

Les options courtes s'écrivent avec un tiret et une lettre, et se groupent : `-la` est la même chose que `-l -a`. Les options longues prennent deux tirets et un mot : `--all`, `--recursive`. Quand tu ne sais plus, `commande --help` est plus rapide qu'une recherche en ligne, et `man commande` donne la documentation complète sur Mac et Linux.

### Les shells que tu croiseras

| Shell | Où | Remarque |
| --- | --- | --- |
| `bash` | Linux, Git Bash, Colab, Docker | la référence, celle de la documentation |
| `zsh` | macOS depuis Catalina | compatible bash pour l'essentiel |
| PowerShell | Windows | langage différent, objets au lieu de texte |
| CMD | Windows, ancien | à éviter, capacités très limitées |

Sous Windows, tu as donc le choix, et il vaut mieux le faire consciemment. **Git Bash** donne un vrai bash et les commandes Unix de la documentation. **PowerShell** est plus puissant que bash sur certains points — il manipule des objets typés, pas du texte — mais sa syntaxe n'est pas celle que tu liras partout ailleurs. **WSL** installe un vrai Linux dans Windows, et c'est l'option la plus proche de la production.

Un piège de PowerShell à connaître tout de suite : **la version 5.1, livrée avec Windows, n'a pas les opérateurs `&&` et `||`.** Ils existent depuis PowerShell 7. Si une commande copiée d'un tutoriel échoue avec une erreur d'analyse, c'est souvent ça.

## Les chemins

Un **chemin absolu** part de la racine : `/home/emile/projet` sous Unix, `C:\Users\Emile\projet` sous Windows. Un **chemin relatif** part de l'endroit où tu es : `projet/data`, `../autre`.

Quatre raccourcis à connaître :

| Symbole | Signifie |
| --- | --- |
| `.` | le dossier courant |
| `..` | le dossier parent |
| `~` | ton dossier personnel |
| `-` | le dossier précédent, avec `cd -` |

`pwd` répond toujours à « où suis-je ? », et c'est la première commande à taper quand quelque chose ne se passe pas comme prévu. L'immense majorité des « le fichier n'existe pas » sont des « je ne suis pas où je crois ».

Deux différences entre systèmes qui coûtent du temps :

**Le séparateur.** Unix utilise `/`, Windows `\`. En Python, écris toujours `/` ou utilise `pathlib` — Windows accepte les deux, Unix n'accepte pas l'antislash.

**La casse.** Sous Linux, `Data.csv` et `data.csv` sont deux fichiers différents. Sous Windows et macOS par défaut, c'est le même. Un code qui marche sur ton portable et casse sur le serveur a très souvent cette cause, et le message d'erreur ne la mentionne jamais.

### Les espaces dans les noms

```bash
cd Mes Documents      # erreur : deux arguments
cd "Mes Documents"    # un seul argument
cd Mes\ Documents     # l'espace échappé
```

Le shell découpe sur les espaces, point. Un chemin qui en contient doit être protégé par des guillemets. Sous Windows c'est quasi systématique — `C:\Users\User 1\` en contient un —, et c'est la cause d'erreur la plus fréquente des premières semaines.

## Deux gains de temps immédiats

**La touche Tab complète.** Tape les trois premières lettres d'un nom de fichier et appuie sur Tab : le shell finit. S'il y a plusieurs possibilités, un deuxième appui les liste. Ce n'est pas un confort, c'est une **vérification** : si Tab ne complète pas, le fichier n'est pas là où tu crois, et tu viens de l'apprendre avant de lancer la commande.

**L'historique.** Les flèches haut et bas rejouent les commandes précédentes. `Ctrl+R` ouvre une recherche dans l'historique : tape quelques lettres, le shell retrouve la commande complète. Sur une longue commande d'entraînement avec douze arguments, c'est la différence entre dix secondes et deux minutes.

## Les jokers sont développés par le shell

```bash
ls *.csv          # tous les fichiers finissant par .csv
ls data_?.csv     # un seul caractère quelconque
ls [abc]*.py      # commençant par a, b ou c
```

Le point important n'est pas la syntaxe, c'est **qui fait le travail**. Le shell remplace `*.csv` par la liste des fichiers correspondants *avant* de lancer le programme. `rm *.csv` reçoit donc déjà la liste complète ; `rm` n'a jamais vu l'étoile.

Deux conséquences. Si aucun fichier ne correspond, bash passe l'étoile telle quelle au programme, qui se plaint d'un fichier nommé `*.csv` — message déroutant, cause simple. Et pour vérifier ce qu'une commande destructrice va toucher, remplace-la par `ls` : la liste affichée est exactement celle qui sera traitée.

## Les flux et les redirections

Tout programme Unix a trois canaux : l'entrée standard (**stdin**), la sortie standard (**stdout**) et la sortie d'erreur (**stderr**). Les séparer paraît pédant jusqu'au jour où ça explique un comportement incompréhensible.

```bash
python train.py > sortie.txt        # stdout dans un fichier, écrase
python train.py >> journal.txt      # stdout, ajoute à la fin
python train.py 2> erreurs.txt      # stderr seulement
python train.py > tout.txt 2>&1     # les deux dans le même fichier
python train.py < donnees.txt       # le fichier devient stdin
```

La ligne à retenir est la première : **`>` ne capture pas les erreurs.** Un script lancé avec `> journal.txt` qui plante laisse un journal vide et affiche l'erreur à l'écran, où personne ne la lit. Pour un travail qui tourne longtemps, c'est `> journal.txt 2>&1`.

Et `>` **écrase sans demander**. `commande > fichier_important.csv` détruit le fichier avant même que la commande ne démarre, parce que le shell prépare la redirection en premier.

### Le tube

```bash
cat ventes.csv | grep "2026" | wc -l
```

Le tube branche la sortie d'un programme sur l'entrée du suivant. C'est l'idée centrale d'Unix : des outils qui font une chose, assemblés en ligne. Chaque maillon ne voit que du texte, ce qui permet d'en enchaîner autant qu'on veut sans qu'ils se connaissent.

PowerShell fait la même chose avec des **objets** plutôt que du texte, ce qui est plus robuste — pas d'analyse de chaîne approximative — mais rend les deux syntaxes non interchangeables. C'est la vraie raison pour laquelle on ne peut pas simplement traduire un script bash mot à mot.

## Les codes de retour

Tout programme rend un entier en finissant : `0` veut dire « tout va bien », n'importe quoi d'autre signale une erreur. C'est ce sur quoi repose l'enchaînement conditionnel.

```bash
echo $?                      # le code du dernier programme
pytest && git push           # pousse SEULEMENT si les tests passent
commande || echo "échec"     # le deuxième tourne si le premier échoue
commande1 ; commande2        # les deux, quoi qu'il arrive
```

`&&` est ce qui rend une chaîne de commandes sûre. `pytest ; git push` pousse même quand les tests échouent ; `pytest && git push` ne pousse que si tout passe. La différence tient à un caractère et elle est entière.

En PowerShell 5.1, sans `&&`, l'équivalent est `pytest; if ($?) { git push }`.

## Supprimer est définitif

`rm` n'a pas de corbeille. Rien ne confirme, rien ne se récupère.

```bash
rm fichier.py
rm -r dossier/          # récursif
rm -rf dossier/         # récursif et sans la moindre question
```

Trois habitudes qui valent mieux que la prudence :

**Regarde avant d'agir.** `ls` avec le même motif, puis `rm`. La liste affichée est celle qui va disparaître.

**Méfie-toi de l'espace parasite.** `rm -rf / chemin` au lieu de `rm -rf /chemin` demande la suppression de la racine. Les systèmes modernes refusent ce cas précis, mais `rm -rf ~ /projet` n'est pas protégé.

**Ne lance jamais une commande que tu ne comprends pas**, surtout copiée d'une réponse en ligne. Si elle contient `rm`, `dd`, `chmod -R` ou `curl ... | bash`, lis-la en entier d'abord.

## Les variables d'environnement

Une variable d'environnement est une paire nom-valeur que le shell transmet aux programmes qu'il lance. C'est par là que passent les clés d'API, les chemins de configuration et le comportement par défaut des outils.

```bash
MA_VAR="valeur"           # variable de shell : visible ici seulement
export MA_VAR="valeur"    # exportée : visible par les programmes lancés
echo $MA_VAR
env | sort                # tout l'environnement
```

La distinction entre les deux premières lignes est celle qu'on découvre en perdant une heure. Sans `export`, la variable existe dans ton shell mais **aucun programme lancé depuis ce shell ne la voit** — ton script Python ne la trouvera pas.

En PowerShell, c'est `$env:MA_VAR = "valeur"`, et la lecture `$env:MA_VAR`.

Deux propriétés à intégrer :

**La portée est la session.** Fermer le terminal efface tout. Pour qu'une variable persiste, elle va dans `~/.bashrc` (ou `~/.zshrc`), ou dans les variables système sous Windows.

**L'héritage descend, jamais ne remonte.** Un programme hérite de l'environnement de son parent. Il peut le modifier pour lui-même et pour ses enfants, jamais pour le shell qui l'a lancé. C'est pourquoi un script ne peut pas changer ton répertoire courant.

### Le PATH

`PATH` est la liste des dossiers où le shell cherche les programmes, séparés par `:` sous Unix et par `;` sous Windows. Quand tu tapes `python`, le shell parcourt ces dossiers **dans l'ordre** et exécute le premier `python` trouvé.

```bash
echo $PATH
which python        # quel programme sera réellement lancé
which -a python     # tous les candidats, dans l'ordre
```

`which` est la commande de diagnostic la plus utile de toute cette leçon. « Pourquoi mon paquet n'est pas trouvé », « pourquoi ce n'est pas la bonne version de Python », « pourquoi la commande marche dans un terminal et pas dans l'autre » : les trois se répondent avec `which`. Sous PowerShell, c'est `Get-Command python`.

Un `command not found` signifie exactement une chose : aucun dossier du `PATH` ne contient ce programme. Soit il n'est pas installé, soit son dossier n'est pas dans le `PATH` — et l'installateur l'a souvent signalé dans un message qu'on n'a pas lu.

### Les secrets ne vont pas dans le code

Une clé d'API écrite dans un fichier `.py` finit dans Git, et un secret poussé sur un dépôt est compromis définitivement. La forme correcte est un fichier `.env` à la racine du projet, **ignoré par Git**, lu au démarrage :

```python
from dotenv import load_dotenv
import os

load_dotenv()
cle = os.environ["ANTHROPIC_API_KEY"]
```

`os.environ["X"]` lève une erreur claire si la variable manque ; `os.environ.get("X")` rend `None` et laisse le programme échouer trois fonctions plus loin. Préfère la première forme pour ce qui est obligatoire.

## Windows et WSL

Si tu travailles sous WSL, tes disques Windows sont montés sous `/mnt/c/`. Tu peux donc travailler sur les mêmes fichiers depuis les deux mondes, et il y a deux pièges à connaître.

**Les performances.** Un projet rangé dans `/mnt/c/...` et manipulé depuis Linux traverse une couche de traduction à chaque accès ; `pip install` peut y être plusieurs fois plus lent. Range les projets WSL dans le système de fichiers Linux, sous `~`.

**Les fins de ligne.** Windows termine ses lignes par deux caractères (CRLF), Unix par un seul (LF). Un script bash écrit sous Windows et lancé sous Linux donne `bad interpreter: No such file or directory` — c'est le retour chariot invisible collé au nom de l'interpréteur. Configure ton éditeur en LF pour tout ce qui est code.

## Au clavier

- **`cd` dans un script ne change rien à ton shell.** Le script tourne dans un processus enfant. Pour qu'un script modifie ton environnement, il faut le *sourcer* : `source script.sh`, et non `./script.sh`. C'est exactement pour cette raison que l'activation d'un environnement virtuel s'écrit avec `source`.
- **`Ctrl+C` interrompt, `Ctrl+D` termine l'entrée, `Ctrl+L` nettoie l'écran.** Et si un programme t'a laissé un terminal illisible, `reset` le remet d'aplomb.
- **Une commande qui ne rend rien a souvent réussi.** La tradition Unix est de se taire quand tout va bien. L'absence de message n'est pas un bug.
- **Lis le message d'erreur en entier.** « Permission denied » et « No such file or directory » sont deux problèmes qui n'ont rien à voir, et on les confond en ne lisant que les trois premiers mots.

Pour aller plus loin, le MIT Missing Semester (missing.csail.mit.edu) couvre tout cela en vidéo, gratuitement, avec des exercices. C'est la meilleure ressource existante sur le sujet, et elle se termine en une semaine.
