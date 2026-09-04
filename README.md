# Template de site vitrine — à dupliquer par client

Base réplicable inspirée du site du cabinet Dang Fantou. Génère un site statique
multilingue (FR/EN) à partir d'un fichier de contenu, avec déploiement automatique.

## Comment ça marche

- `data.json` → tout le contenu texte du site (FR + EN)
- `build.js` → génère les pages HTML à partir de `data.json`
- `style.css` → design du site, piloté par des **tokens** dans `:root`
  (couleurs, tailles de police, espacements) — voir `styles/README.md` pour
  des presets de couleurs prêts à l'emploi
- `admin.html` → interface protégée par mot de passe pour éditer le contenu ;
  le bouton « Enregistrer et publier » committe directement `data.json` sur
  GitHub via `api/save.js`, ce qui déclenche le redéploiement automatique
- `api/save.js` → fonction serverless Vercel : vérifie le mot de passe puis
  écrit sur GitHub (voir « Admin & mot de passe » ci-dessous)
- `vercel.json` → indique à Vercel d'exécuter `node build.js` avant chaque
  déploiement (le site n'a pas de `package.json`, donc pas de build sans ça)

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
   - Vercel : connecter le repo depuis le dashboard (ou `vercel link` +
     `vercel git connect` en CLI), aucune config de build supplémentaire
     (déjà dans `vercel.json`).
   - Ou o2switch/FTP (comme Dang Fantou) : renseigner les secrets `SFTP_SERVER`,
     `SFTP_USERNAME`, `SFTP_PASSWORD` dans les secrets GitHub du repo.
7. **Configurer l'admin** (voir section suivante) : ajouter les 4 variables
   d'environnement Vercel du projet.
8. **Premier push** → le site est généré et déployé automatiquement.

## Admin & mot de passe (`admin.html`)

`admin.html` permet d'éditer le contenu texte et de publier directement,
sans toucher à GitHub à la main. Ça repose sur une fonction serverless
(`api/save.js`) qui committe `data.json` à ta place — le token GitHub n'est
donc jamais exposé côté client.

À configurer une fois par projet client, dans Vercel → Project → Settings →
Environment Variables :

| Variable | Valeur |
|---|---|
| `ADMIN_PASSWORD` | Le mot de passe d'accès à `admin.html` |
| `GITHUB_TOKEN` | Un Personal Access Token GitHub *fine-grained*, permission **Contents: Read and write**, limité à ce seul repo |
| `GITHUB_REPO` | `owner/repo` du site client |
| `GITHUB_BRANCH` | Branche à mettre à jour (`main` en général) |

Après ajout des variables, redéployer une fois (`vercel --prod` ou un push)
pour qu'elles soient prises en compte.

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
