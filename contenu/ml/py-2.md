Les 4 structures clés : **listes** (ordonnées, modifiables), **tuples** (immuables), **dictionnaires** (clé→valeur), **ensembles** (uniques).

```python
notes = {"maths": 15, "python": 18}
carres = [x**2 for x in range(10) if x % 2 == 0]
```

Les compréhensions de listes sont omniprésentes dans le code de data science : elles remplacent des boucles entières en une ligne lisible.

**Slicing**, essentiel pour manipuler des tableaux :
```python
data = [10, 20, 30, 40, 50]
data[1:4]   # [20, 30, 40]
data[::-1]  # liste inversée
```
