Apprendre = minimiser une erreur. L'outil : la **dérivée**, qui indique dans quelle direction et à quelle vitesse une fonction change.

Pour une fonction de plusieurs variables, le **gradient** ∇f est le vecteur des dérivées partielles. Il pointe vers la plus forte montée — on descend donc dans la direction opposée :

```
θ ← θ - α ∇L(θ)
```

C'est la **descente de gradient**, l'algorithme qui entraîne quasiment tous les modèles modernes. α est le *learning rate* : trop grand, on diverge ; trop petit, on apprend trop lentement.

La **règle de la chaîne** permet de calculer le gradient de fonctions composées — c'est le fondement de la **rétropropagation** dans les réseaux de neurones :
```
(f∘g)'(x) = f'(g(x)) · g'(x)
```
