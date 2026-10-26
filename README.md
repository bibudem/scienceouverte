# Science ouverte — Bibliothèques de l’UdeM

Page unique (one-pager) présentant l’engagement des bibliothèques de l’Université de Montréal envers la science ouverte. HTML, CSS et JavaScript natifs, sans dépendance ni étape de compilation.

## Lancer la page

Les modules JavaScript (`type="module"`) ne se chargent pas en ouvrant le fichier par double-clic : il faut un petit serveur local.

```sh
cd science-ouverte          
python3 -m http.server 8765
```

Puis ouvrir <http://127.0.0.1:8765/>.


## Mettre à jour les chiffres

Tous les chiffres viennent de `data/chiffres.json`. Pour en changer un, modifiez sa valeur dans ce fichier : il est mis à jour partout où il apparaît (section « En chiffres », tuiles, panneaux de détail).

- Écrire les nombres sans espaces ni virgule de milliers : `6197193`, `2.5`. Le format (6 197 193 ; 2,5 %) est appliqué automatiquement.
- Une valeur en texte (`"plus de 3 000"`) est affichée telle quelle.
- Changer aussi `mise_a_jour` (date du pied de page), et `dateModified` dans le bloc JSON-LD de `index.html`.

Les chiffres écrits dans `index.html` servent de repli si JavaScript est désactivé : les mettre à jour aussi lors d’une révision annuelle.

## Référencement et performances

- Titre et description pensés pour Google, balise `canonical`, données structurées schema.org (`WebPage`, éditeur `Library`).
- Tout le contenu est dans le HTML : lisible par les moteurs sans exécuter de JavaScript.
- Polices locales (aucune requête externe), photo du haut de page et polices du titre préchargées.
- L’entrée du haut de page est animée en CSS pur : le texte s’affiche au premier rendu, sans attendre le JavaScript (meilleur LCP).

## Principes

- **Amélioration progressive.** Le contenu complet est dans le HTML. Sans JavaScript, tout reste lisible : les quatre piliers s’affichent à la suite, les chiffres sont écrits en clair, les animations sont désactivées. Avec JavaScript, les cartes deviennent des tuiles qui s’ouvrent dans un panneau.
- **Cascade explicite.** Les couches `tokens → base → a11y → components → motion` fixent la priorité des styles, peu importe la spécificité des sélecteurs.
- **Mouvement responsable.** Animations limitées à `transform`, `opacity` et `clip-path` ; ressorts physiques pour les ouvertures ; fondus seulement si l’appareil demande moins de mouvement.
- **Accessibilité WCAG 2.2 AA.** Vérifiée avec axe-core, au clavier et par calcul des contrastes.
- **Marque UdeM.** Couleurs et typographies (Figtree, Lora) selon [marque.umontreal.ca](https://marque.umontreal.ca/).
