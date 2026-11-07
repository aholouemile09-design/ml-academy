Une figure Matplotlib est une image. Une figure Plotly est un programme accompagné de ses données. Presque tout ce qu'il faut savoir sur Plotly — ses forces, ses limites, et ses deux pièges sérieux — découle de cette seule différence.

## Une figure Plotly est un objet JSON

Un objet `Figure` n'est pas un dessin : c'est un dictionnaire à deux clés.

```python
fig = px.scatter(df, x="age", y="tarif")
print(fig)
# Figure({
#     'data':   [{'x': array([22., 38., 26., ...]), 'y': array([7.25, 71.28, ...]), ...}],
#     'layout': {'template': ..., 'xaxis': {'title': {'text': 'age'}}, ...}
# })
```

**`data`** est une liste de *traces* — une trace par série tracée. **`layout`** est tout le reste : axes, titres, légende, thème. C'est un arbre qu'on peut lire et modifier après coup, ce qui est très pratique :

```python
fig.update_layout(height=600, template="plotly_dark")
fig.update_xaxes(title="âge du passager")
fig.update_traces(marker_size=4)
```

Trois conséquences découlent directement de ce format, et ce sont elles qui comptent.

**Les données voyagent avec la figure.** Un export HTML contient **tous les points**, en clair, dans le fichier. Envoyer à un client un graphique Plotly de ton analyse interne, c'est lui envoyer la table. Ce n'est pas théorique : il suffit d'ouvrir le `.html` dans un éditeur de texte pour lire les valeurs. Avant de partager une figure Plotly, demande-toi si tu accepterais d'envoyer le CSV.

**La taille suit le nombre de points.** Cent mille observations font plusieurs mégaoctets de JSON, que le navigateur doit analyser et garder en mémoire. Dans un notebook, cette figure est enregistrée **dans le `.ipynb`** : le fichier gonfle, et Git, qui versionne du texte, se retrouve avec des mégaoctets de JSON illisible à chaque exécution. Le réflexe : `jupyter nbconvert --clear-output` avant de commiter, ou ne pas commiter les sorties.

**Le coût est par point**, là où celui d'un PNG est fixe. C'est la raison mécanique derrière tout le reste.

## Express ou Graph Objects

Deux portes d'entrée, et la différence entre elles provoque le blocage le plus fréquent.

**`plotly.express`** prend un DataFrame et rend une figure **complète** — traces, mise en page, couleurs, légende, étiquettes d'axes déduites des noms de colonnes. Une ligne.

```python
fig = px.scatter(df, x="age", y="tarif", color="classe", facet_col="sexe")
```

**`plotly.graph_objects`** fournit les briques. Tu assembles.

```python
fig = go.Figure()
fig.add_trace(go.Scatter(x=df["age"], y=df["tarif"], mode="markers"))
```

**Le blocage** : `make_subplots` attend des **traces**, et `px` rend une **figure**. On ne peut donc pas poser un `px.scatter` dans un panneau — c'est pour ça qu'un dashboard multi-panneaux s'écrit en `go`.

Mais il y a une sortie, et elle vaut d'être connue : une figure `px` **contient** ses traces, dans `fig.data`. On peut donc les extraire.

```python
from plotly.subplots import make_subplots

fig = make_subplots(rows=1, cols=2, subplot_titles=("Âge", "Tarif × âge"))

petit = px.scatter(df, x="age", y="tarif", color="classe")
for trace in petit.data:                      # une trace par classe
    fig.add_trace(trace, row=1, col=2)
```

On garde la concision de `px` pour produire les traces, et le contrôle de `make_subplots` pour les placer. Ce qu'on perd, c'est la mise en page de `px` : les titres d'axes et la légende sont à refaire à la main.

## Le format long, la vraie friction de `px`

`px` suppose des données **au format long** : une ligne par observation, une colonne par variable. C'est sa condition de fonctionnement, et c'est ce qui bloque quand on arrive avec un tableau de bord Excel.

Un tableau large — une colonne par année — ne permet pas `color=`, parce qu'il n'existe aucune colonne contenant l'année.

```python
# Large : une colonne par annee
#   mois | ca_2023 | ca_2024 | ca_2025

long = large.melt(id_vars="mois", var_name="annee", value_name="ca")
#   mois | annee   | ca
# Maintenant color="annee" a un sens
fig = px.line(long, x="mois", y="ca", color="annee")
```

Toutes les fonctionnalités qui font l'intérêt de `px` — `color`, `facet_col`, `facet_row`, `animation_frame`, `size`, `symbol` — ont besoin d'**une colonne à faire correspondre**. `melt` est donc le passage obligé, et c'est le geste pandas le plus utile du module.

## Le survol se conçoit, il ne s'obtient pas

Le survol par défaut affiche x et y, c'est-à-dire ce qu'on lit déjà sur les axes. Il n'apporte rien tel quel.

En `px`, deux paramètres suffisent :

```python
fig = px.scatter(df, x="age", y="tarif",
                 hover_name="nom",                      # en gras, en haut
                 hover_data=["classe", "port", "survie"])
```

En `go`, on écrit le gabarit :

```python
go.Scatter(
    x=df["age"], y=df["tarif"], mode="markers",
    customdata=df[["nom", "port"]],
    hovertemplate="<b>%{customdata[0]}</b><br>âge %{x} — tarif %{y:.2f}<br>%{customdata[1]}<extra></extra>",
)
```

Et une option qui n'a aucun équivalent statique, sur une série temporelle :

```python
fig.update_layout(hovermode="x unified")
```

Elle affiche, pour la date survolée, **la valeur de toutes les séries d'un coup**. Comparer cinq courbes à un instant donné est impossible sur un PNG — l'œil doit suivre cinq lignes jusqu'à une verticale imaginaire. C'est le cas où l'interactivité fait vraiment une différence de nature.

**Le test qui tranche** : si le survol n'ajoute rien à ce que le graphique montre déjà, l'interactivité n'ajoute rien non plus.

## Le renderer, ou pourquoi `fig.show()` n'affiche rien

Symptôme classique : le code tourne sans erreur, et aucune figure n'apparaît. La cause est presque toujours le *renderer*.

```python
import plotly.io as pio
print(pio.renderers.default)      # "notebook", "vscode", "browser", "png"...
pio.renderers.default = "browser"
```

`fig.show()` délègue au renderer courant, que Plotly devine d'après l'environnement — et il devine mal dans un terminal, dans certaines configurations de VS Code, ou derrière un notebook distant. Forcer `"browser"` règle la majorité des cas : la figure s'ouvre dans un onglet.

Dans un script, préfère de toute façon écrire un fichier :

```python
fig.write_html("analyse.html")
```

Pour une **image** (`write_image`, ou un PNG dans un rapport), Plotly a besoin du paquet **kaleido**, installé séparément : il lance un navigateur sans interface pour faire le rendu. Si l'objectif final est un PNG dans un document, c'est un détour — Matplotlib le fait sans dépendance supplémentaire.

## La performance : `Scattergl`

Par défaut, `go.Scatter` dessine en SVG : un élément par point. Ça s'écroule entre dix mille et cent mille points — l'onglet se fige, le zoom devient inutilisable.

```python
go.Scattergl(x=x, y=y, mode="markers")          # WebGL, par le GPU
px.scatter(df, x="a", y="b", render_mode="webgl")
```

WebGL tient le million de points. Deux réserves, qui ne sont pas des détails :

- il offre **moins de fonctionnalités** que le rendu SVG, et quelques options de style y sont ignorées ou rendues différemment ;
- les navigateurs **limitent le nombre de contextes WebGL** simultanés, en général autour de huit ou seize. Un dashboard de douze panneaux `Scattergl` peut donc avoir des panneaux vides, sans message d'erreur.

Au-delà, la bonne réponse n'est plus le mode de rendu mais l'**agrégation** : `px.density_heatmap` compte les points par cellule et n'en transmet plus qu'une grille. Mille cellules remplacent un million de points, et la structure reste visible.

## Ce que l'interactivité ne répare pas

**Un mauvais graphique avec du zoom reste un mauvais graphique.** L'interactivité ne compense pas un choix de représentation inadapté, elle le rend juste plus long à constater.

**L'interactivité ne cache rien, elle ajoute.** Le lecteur qui ne survole pas — c'est-à-dire la majorité — ne voit que l'**état par défaut**. Donc l'état par défaut doit déjà répondre à la question. Compter sur le survol pour faire passer l'information principale, c'est la réserver à ceux qui cherchent.

**Un dashboard n'est pas une analyse.** Douze panneaux sans question produisent douze graphiques que personne ne regarde. Un tableau de bord utile répond à une liste de questions écrites **avant** de l'ouvrir.

## Partager une figure

```python
fig.write_html("rapport.html", include_plotlyjs="cdn")
```

Par défaut, Plotly **embarque sa propre bibliothèque JavaScript** dans le fichier : environ trois mégaoctets avant même tes données. `include_plotlyjs="cdn"` la remplace par une balise `<script>` vers un CDN — le fichier tombe à quelques dizaines de kilooctets, mais exige une connexion à l'ouverture. Garde le défaut pour un fichier qui doit marcher hors ligne, passe en `"cdn"` pour tout le reste.

Et le rappel qui compte le plus : **ce fichier contient tes données**. Un HTML Plotly se transmet comme un export de table, pas comme une image.

## Au clavier

```python
import plotly.express as px
import plotly.io as pio

pio.renderers.default = "browser"     # a mettre une fois, regle 90 % des "rien ne s'affiche"

long = large.melt(id_vars="mois", var_name="annee", value_name="ca")

fig = px.line(long, x="mois", y="ca", color="annee",
              title="Chiffre d'affaires par annee")
fig.update_layout(hovermode="x unified")      # compare toutes les series a une date
fig.write_html("ca.html", include_plotlyjs="cdn")
```

Trois réflexes :

1. **Avant de partager un HTML Plotly, ouvre-le dans un éditeur de texte.** Tu verras tes données en clair, et tu décideras en connaissance de cause.
2. **`melt` avant `px`.** Dès qu'une fonctionnalité de `px` refuse de marcher, la cause est presque toujours un tableau au format large.
3. **Au-delà de dix mille points, `render_mode="webgl"` ; au-delà du million, agrège.** Changer de mode de rendu ne remplace pas le fait de réduire la quantité de données transmise.
