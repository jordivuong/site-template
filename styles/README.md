# Presets de style

Le design du site est entièrement piloté par les 6 variables de couleur dans le
bloc `:root` de `style.css` (voir `1. VARIABLES & RESET`). Changer ces 6 valeurs
change l'identité visuelle du site sans toucher au HTML ni à la mise en page.

Trois presets sont fournis ici, inspirés des tendances actuelles des sites
d'avocats en France (minimalisme, couleurs sobres, typographie affirmée en
titres) :

| Fichier | Ambiance | Aperçu couleurs |
|---|---|---|
| [`editorial-chaleureux.css`](./editorial-chaleureux.css) | Chaleureux, typographie large et affirmée — **c'est le style par défaut du template** | crème `#FCF9F0` + accent corail `#FF967C` |
| [`sobre-marine.css`](./sobre-marine.css) | Classique, institutionnel, rassurant | blanc + accent bleu marine `#22406B` |
| [`minimal-pastel.css`](./minimal-pastel.css) | Épuré, lumineux, doux | blanc cassé + accent sauge pastel `#8FAE93` |

## Pour appliquer un preset à un nouveau client

1. Ouvre le fichier du preset choisi dans ce dossier.
2. Copie les 6 lignes de couleurs.
3. Colle-les à la place des 6 lignes équivalentes dans le bloc `:root` de
   `style.css` (racine du projet), en écrasant les valeurs par défaut.
4. Supprime (ou ignore) le contenu de `styles/` dans le site dupliqué — ce
   dossier n'est qu'une bibliothèque de référence, il n'est jamais chargé par
   le site lui-même.

Aucune autre modification n'est nécessaire : la police (Playfair), les tailles
de texte et les espacements restent identiques entre les 3 presets.
