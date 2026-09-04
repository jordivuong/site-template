# Template de site vitrine — à dupliquer par client

Base réplicable inspirée du site du cabinet Dang Fantou. Génère un site statique
multilingue (FR/EN) à partir d'un fichier de contenu, avec déploiement automatique.

## Comment ça marche

- `data.json` → tout le contenu texte du site (FR + EN)
- `build.js` → génère les pages HTML à partir de `data.json`
- `style.css` → design du site, piloté par des **tokens** dans `:root`
  (couleurs, tailles de police, espacements)
- `admin.html` → interface simple pour éditer le contenu sans toucher au JSON à la main
- `.github/workflows/deploy.yml` → build + déploiement automatique à chaque push

## Pour dupliquer ce template sur un nouveau projet client

1. **Cloner ce repo** sous un nouveau nom (`client-nomduclient`).
2. **Remplir le bloc `CONFIG` en haut de `build.js`** : URL du site, Google Maps,
   Formspree, Google Tag Manager, infos schema.org (adapter `SCHEMA_TYPE` au
   métier du client : `LocalBusiness`, `Attorney`, `Restaurant`, etc.).
3. **Remplacer le contenu de `data.json`** par les textes du client (garder la
   même structure — clés identiques en FR et EN).
4. **Ajuster les tokens dans `style.css`** (`:root`) pour l'identité visuelle du
   client : couleurs, tailles de police, espacements. C'est le seul endroit à
   modifier pour changer l'apparence globale.
5. **Remplacer les images** dans `/images` et `/img` (photos, logo, favicon).
6. **Configurer le déploiement** :
   - Vercel : connecter le repo depuis le dashboard, aucune config supplémentaire.
   - Ou o2switch/FTP (comme Dang Fantou) : renseigner les secrets `SFTP_SERVER`,
     `SFTP_USERNAME`, `SFTP_PASSWORD` dans les secrets GitHub du repo.
7. **Premier push** → le site est généré et déployé automatiquement.

## Ajustements visuels courants

Tout se fait dans le bloc `:root` de `style.css` :

```css
:root {
    --accent-color: #FF967C;   /* couleur d'accent */
    --fs-base: 1rem;            /* taille de texte courant */
    --space-md: 30px;           /* espacement standard */
    /* ... */
}
```

Modifier une valeur ici change tout le site de façon cohérente, sans toucher
à la structure des pages.

## Pages générées

- `index.html` / `index-en.html` — présentation
- `cabinet.html` / `cabinet-en.html` — équipe (adapter le nom de la page selon
  le métier du client si besoin)
- `actualites.html` / `actualites-en.html` — actualités/publications
- `mentions-legales.html` / `mentions-legales-en.html` — mentions légales

Pour ajouter ou retirer une page, dupliquer une des fonctions `generate...Content`
dans `build.js` et l'ajouter au tableau `pagesToBuild` en bas du fichier.
