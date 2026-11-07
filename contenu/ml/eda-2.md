Plotly génère des graphiques interactifs (zoom, hover, filtres) — indispensables pour les dashboards et Jupyter notebooks.

**Plotly Express — API haut niveau**
```python
import plotly.express as px
import plotly.graph_objects as go

# Nuage de points interactif
fig = px.scatter(
    df, x="feature1", y="target",
    color="catégorie", size="importance",
    hover_data=["id", "description"],
    title="Features vs Target",
    template="plotly_dark"
)
fig.show()

# Histogramme interactif
fig = px.histogram(df, x="salaire", nbins=50, color="département",
                   marginal="box", hover_data=df.columns)
fig.show()

# Matrice de corrélation interactive
fig = px.imshow(df.corr(), text_auto=".2f", color_continuous_scale="RdBu_r",
                title="Corrélations")
fig.show()
```

**Plotly Graph Objects — contrôle total**
```python
# Dashboard multi-graphiques
from plotly.subplots import make_subplots

fig = make_subplots(rows=2, cols=2,
                    subplot_titles=("Distribution", "Corrélation", "Tendance", "Catégories"))

fig.add_trace(go.Histogram(x=df["age"], name="Âge"), row=1, col=1)
fig.add_trace(go.Scatter(x=df["x"], y=df["y"], mode="markers", name="Données"), row=1, col=2)
fig.add_trace(go.Scatter(x=dates, y=valeurs, mode="lines+markers", name="Trend"), row=2, col=1)
fig.add_trace(go.Bar(x=catégories, y=comptes, name="Catégories"), row=2, col=2)

fig.update_layout(title="Dashboard EDA", height=700, template="plotly_dark")
fig.show()
```
