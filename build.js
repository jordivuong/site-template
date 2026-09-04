const fs = require('fs');
const path = require('path');

const rawData = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
const siteData = JSON.parse(rawData);

/* ==========================================================================
   CONFIG CLIENT — seul bloc à modifier pour dupliquer ce template
   ========================================================================== */
const CONFIG = {
    BASE_URL: 'https://www.nom-de-domaine-client.fr',
    GOOGLE_MAPS_URL: 'https://maps.app.goo.gl/REMPLACER',
    FORMSPREE_ENDPOINT: 'https://formspree.io/f/REMPLACER',
    GTM_ID: 'GTM-XXXXXXX',
    THEME_COLOR: '#FCF9F0',

    // Métadonnées schema.org (adapter le type selon le métier du client :
    // Attorney, LocalBusiness, Restaurant, MedicalBusiness, etc.)
    SCHEMA_TYPE: 'LocalBusiness',
    SCHEMA_NAME: 'Nom du client',
    SCHEMA_IMAGE_PATH: 'images/photo-principale.jpg',
    SCHEMA_ADDRESS: {
        streetAddress: 'Adresse à compléter',
        addressLocality: 'Ville',
        postalCode: 'Code postal',
        addressCountry: 'FR'
    },
    SCHEMA_PHONE: '+33000000000',
    SCHEMA_EMAIL: 'contact@client.fr'
};

// Alias conservés pour compatibilité avec le reste du fichier
const BASE_URL = CONFIG.BASE_URL;
const GOOGLE_MAPS_URL = CONFIG.GOOGLE_MAPS_URL;
const FORMSPREE_ENDPOINT = CONFIG.FORMSPREE_ENDPOINT;

function formaterParagraphes(texte) {
    if (!texte) return '';
    return texte.split('\n\n').map(p => `<p>${p}</p>`).join('\n');
}

function cleanPhone(phone) {
    return phone ? phone.replace(/\s/g, '') : '';
}

function getPageSectionTitle(pageKey, lang) {
    const isFr = lang === 'fr';
    if (pageKey === 'cabinet') return isFr ? "L'équipe" : "The Firm";
    if (pageKey === 'actualites') return isFr ? "Actualités" : "News";
    if (pageKey === 'mentions-legales') return isFr ? "Mentions légales" : "Legal Notice";
    return '';
}

function generatePageTemplate({ lang, pageKey, title, description, canonicalUrl, contentHTML, activeMenu }) {
    const data = siteData[lang];
    const isFr = lang === 'fr';
    const langSwitchLabel = isFr ? 'EN' : 'FR';
    
    let langSwitchHref = '';
    if (pageKey === 'index') langSwitchHref = isFr ? 'index-en.html' : 'index.html';
    else if (pageKey === 'cabinet') langSwitchHref = isFr ? 'cabinet-en.html' : 'cabinet.html';
    else if (pageKey === 'actualites') langSwitchHref = isFr ? 'actualites-en.html' : 'actualites.html';
    else if (pageKey === 'mentions-legales') langSwitchHref = isFr ? 'mentions-legales-en.html' : 'mentions-legales.html';

    const frUrl = pageKey === 'index' ? `${BASE_URL}/index.html` : `${BASE_URL}/${pageKey}.html`;
    const enUrl = pageKey === 'index' ? `${BASE_URL}/index-en.html` : `${BASE_URL}/${pageKey}-en.html`;

    const sectionTitle = getPageSectionTitle(pageKey, lang);
    const contactNavLabel = isFr ? 'contact' : 'contact';

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="view-transition" content="same-origin">
    <meta name="theme-color" content="${CONFIG.THEME_COLOR}">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${CONFIG.GTM_ID}');</script>

    <link rel="icon" type="image/svg+xml" href="Favicon.svg"> 

    <title>${title}</title>
    <meta name="description" content="${description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${canonicalUrl}">

    <link rel="alternate" hreflang="fr" href="${frUrl}" />
    <link rel="alternate" hreflang="en" href="${enUrl}" />
    <link rel="alternate" hreflang="x-default" href="${frUrl}" />

    <meta property="og:type" content="website">
    <meta property="og:locale" content="${isFr ? 'fr_FR' : 'en_US'}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${BASE_URL}/${CONFIG.SCHEMA_IMAGE_PATH}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${BASE_URL}/${CONFIG.SCHEMA_IMAGE_PATH}">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${CONFIG.SCHEMA_TYPE}",
      "name": "${CONFIG.SCHEMA_NAME}",
      "image": "${BASE_URL}/${CONFIG.SCHEMA_IMAGE_PATH}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${CONFIG.SCHEMA_ADDRESS.streetAddress}",
        "addressLocality": "${CONFIG.SCHEMA_ADDRESS.addressLocality}",
        "postalCode": "${CONFIG.SCHEMA_ADDRESS.postalCode}",
        "addressCountry": "${CONFIG.SCHEMA_ADDRESS.addressCountry}"
      },
      "telephone": "${CONFIG.SCHEMA_PHONE}",
      "email": "${CONFIG.SCHEMA_EMAIL}",
      "url": "${BASE_URL}"
    }
    </script>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    
    <script>document.documentElement.classList.add('curtain-down', 'text-hidden', 'header-hidden');</script>
</head>
<body class="${pageKey === 'index' ? 'page-accueil' : ''}">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJM9CWVP" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <div class="top-section ${pageKey === 'index' ? 'top-section-home' : 'top-section-page'}">
        <header>
            <a href="${isFr ? 'index.html' : 'index-en.html'}" class="logo">
                <img src="img/Dang-Fantou-Logo.svg" alt="Dang Fantou Avocates" class="logo-img">
            </a>
            <nav>
                <ul>
                    <li><a href="${isFr ? 'index.html' : 'index-en.html'}" class="${activeMenu === 'presentation' ? 'active' : ''}">${data.menu.presentation}</a></li>
                    <li><a href="${isFr ? 'cabinet.html' : 'cabinet-en.html'}" class="${activeMenu === 'cabinet' ? 'active' : ''}">${data.menu.cabinet}</a></li>
                    <li><a href="${isFr ? 'actualites.html' : 'actualites-en.html'}" class="${activeMenu === 'actualites' ? 'active' : ''}">${data.menu.actualites}</a></li>
                    <li><a href="#contact-modal" class="btn-contact-modal">${contactNavLabel}</a></li>
                    <li><a href="${langSwitchHref}" id="lang-toggle">${langSwitchLabel}</a></li>
                </ul>
            </nav>
        </header>

        ${pageKey === 'index' ? `
        <div class="hero-content">
            <div class="hero-titles">
                <span class="main-title">${data.presentation.titre}</span>
                <span class="sub-title italic-text">${data.presentation.sous_titres}</span>
            </div>
            <hr class="separator">
            <div class="contact-infos">
                <p><a href="mailto:${data.presentation.contact}" class="contact-link">${data.presentation.contact}</a></p>
                <p><a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="contact-link">${data.presentation.adresse}</a></p>
            </div>
        </div>
        ` : `
        <div class="page-title-block" style="margin-top: auto;">
            <h1 style="font-size: var(--fs-4xl); font-family: var(--font-serif); font-weight: 400; margin-bottom: var(--space-xs);">${sectionTitle}</h1>
            <hr class="separator" style="transform: scaleX(1); margin-bottom: 30px;">
            <div class="contact-infos">
                <p><a href="mailto:${data.presentation.contact}" class="contact-link">${data.presentation.contact}</a></p>
                <p><a href="${GOOGLE_MAPS_URL}" target="_blank" rel="noopener noreferrer" class="contact-link">${data.presentation.adresse}</a></p>
            </div>
        </div>
        `}
    </div>

    <div class="bottom-section" style="${pageKey === 'index' ? 'position: relative;' : ''}">
        ${contentHTML}
    </div>

    <!-- POPIN / MODALE DE CONTACT SOBRE -->
    <div id="contact-modal" class="modal-overlay" aria-hidden="true">
        <div class="modal-container" role="dialog" aria-labelledby="modal-title">
            <button class="modal-close" aria-label="Fermer">&times;</button>
            <h2 id="modal-title">${isFr ? 'Contact' : 'Contact us'}</h2>
            <form action="${FORMSPREE_ENDPOINT}" method="POST" class="modal-form">
                <input type="text" name="_gotcha" style="display:none">
                
                <div class="form-group">
                    <label for="nom">${isFr ? 'Nom / Prénom' : 'Name'}</label>
                    <input type="text" id="nom" name="nom" required>
                </div>
                <div class="form-group">
                    <label for="email">${isFr ? 'Adresse e-mail' : 'Email address'}</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="telephone">${isFr ? 'Téléphone' : 'Phone'}</label>
                    <input type="tel" id="telephone" name="telephone">
                </div>
                <div class="form-group">
                    <label for="message">${isFr ? 'Message' : 'Message'}</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" class="modal-submit">${isFr ? 'Envoyer' : 'Send'}</button>
            </form>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>`;
}

function generateIndexContent(lang) {
    const data = siteData[lang];
    const isFr = lang === 'fr';
    const mentionsLink = isFr ? 'mentions-legales.html' : 'mentions-legales-en.html';
    const mentionsLabel = isFr ? 'Mentions légales' : 'Legal Notice';

    return `
        <div class="texte-presentation">${formaterParagraphes(data.presentation.texte)}</div>
        <a href="${mentionsLink}" style="position: absolute; bottom: 24px; right: 24px; color: var(--text-grey); font-size: var(--fs-xs); text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s;">${mentionsLabel}</a>
    `;
}

function generateCabinetContent(lang) {
    const data = siteData[lang];
    const cartesHTML = data.membres.map(membre => `
        <div class="membre-carte">
            <img src="${membre.photo}" alt="Photo de ${membre.nom}" class="membre-photo">
            <div class="membre-infos">
                <div class="membre-header">
                    <h2 class="membre-nom">${membre.nom}</h2>
                    <div class="membre-role">${membre.role}</div>
                </div>
                <div class="membre-contact-block">
                    ${membre.email ? `<a href="mailto:${membre.email}" class="contact-link">${membre.email}</a>` : ''}
                    ${membre.telephone ? `<a href="tel:${cleanPhone(membre.telephone)}" class="contact-link">${membre.telephone}</a>` : ''}
                    ${membre.linkedin ? `
                    <a href="${membre.linkedin}" target="_blank" rel="noopener noreferrer" class="linkedin-link" title="Profil LinkedIn de ${membre.nom}">
                        <img src="img/linkedin-icon.svg" alt="LinkedIn" class="linkedin-icon">
                    </a>` : ''}
                </div>
                <div class="membre-bio-block">${formaterParagraphes(membre.bio)}</div>
            </div>
        </div>
    `).join('\n');

    return `<div class="grille-equipe">${cartesHTML}</div>`;
}

function generateActualitesContent(lang) {
    const data = siteData[lang];
    const linkText = lang === 'fr' ? "» Lien vers l'article" : "» Read full article";
    const actusHTML = data.actualites.map(actu => `
        <div class="actu-carte">
            <h2 class="actu-titre">${actu.titre}</h2>
            <div class="actu-source">${actu.source}</div>
            <div class="actu-texte">${formaterParagraphes(actu.texte)}</div>
            ${actu.lien ? `<a href="${actu.lien}" target="_blank" rel="noopener noreferrer" class="actu-lien">${linkText}</a>` : ''}
        </div>
    `).join('\n');

    return `<div class="liste-actus">${actusHTML}</div>`;
}

function generateMentionsContent(lang) {
    const m = siteData[lang].mentions;
    return `
        <div style="max-width: 800px;">
            <h1 style="font-size: var(--fs-4xl); margin-bottom: var(--space-md);">${m.titre}</h1>
            
            <h2 style="font-size: var(--fs-lg); margin-top: var(--space-sm); margin-bottom: var(--space-2xs);">${m.editeur_titre}</h2>
            <div style="font-size: var(--fs-base); line-height: 1.6;">${formaterParagraphes(m.editeur_texte)}</div>

            <h2 style="font-size: var(--fs-lg); margin-top: var(--space-sm); margin-bottom: var(--space-2xs);">${m.hebergeur_titre}</h2>
            <div style="font-size: var(--fs-base); line-height: 1.6;">${formaterParagraphes(m.hebergeur_texte)}</div>

            <h2 style="font-size: var(--fs-lg); margin-top: var(--space-sm); margin-bottom: var(--space-2xs);">${m.cookies_titre}</h2>
            <div style="font-size: var(--fs-base); line-height: 1.6;">${formaterParagraphes(m.cookies_texte)}</div>

            <h2 style="font-size: var(--fs-lg); margin-top: var(--space-sm); margin-bottom: var(--space-2xs);">${m.droits_titre}</h2>
            <div style="font-size: var(--fs-base); line-height: 1.6;">${formaterParagraphes(m.droits_texte)}</div>
        </div>
    `;
}

const pagesToBuild = [
    { fileName: 'index.html', lang: 'fr', pageKey: 'index', activeMenu: 'presentation', canonicalUrl: `${BASE_URL}/index.html`, getContent: generateIndexContent },
    { fileName: 'cabinet.html', lang: 'fr', pageKey: 'cabinet', activeMenu: 'cabinet', canonicalUrl: `${BASE_URL}/cabinet.html`, getContent: generateCabinetContent },
    { fileName: 'actualites.html', lang: 'fr', pageKey: 'actualites', activeMenu: 'actualites', canonicalUrl: `${BASE_URL}/actualites.html`, getContent: generateActualitesContent },
    { fileName: 'mentions-legales.html', lang: 'fr', pageKey: 'mentions-legales', activeMenu: '', canonicalUrl: `${BASE_URL}/mentions-legales.html`, getContent: generateMentionsContent },

    { fileName: 'index-en.html', lang: 'en', pageKey: 'index', activeMenu: 'presentation', canonicalUrl: `${BASE_URL}/index-en.html`, getContent: generateIndexContent },
    { fileName: 'cabinet-en.html', lang: 'en', pageKey: 'cabinet', activeMenu: 'cabinet', canonicalUrl: `${BASE_URL}/cabinet-en.html`, getContent: generateCabinetContent },
    { fileName: 'actualites-en.html', lang: 'en', pageKey: 'actualites', activeMenu: 'actualites', canonicalUrl: `${BASE_URL}/actualites-en.html`, getContent: generateActualitesContent },
    { fileName: 'mentions-legales-en.html', lang: 'en', pageKey: 'mentions-legales', activeMenu: '', canonicalUrl: `${BASE_URL}/mentions-legales-en.html`, getContent: generateMentionsContent }
];

pagesToBuild.forEach(page => {
    const seo = siteData[page.lang].seo;
    const titleKey = `${page.pageKey.replace('-', '_')}_title`;
    const descKey = `${page.pageKey.replace('-', '_')}_description`;

    const contentHTML = page.getContent(page.lang);
    const fullHTML = generatePageTemplate({
        lang: page.lang,
        pageKey: page.pageKey,
        title: seo[titleKey],
        description: seo[descKey],
        canonicalUrl: page.canonicalUrl,
        contentHTML: contentHTML,
        activeMenu: page.activeMenu
    });

    fs.writeFileSync(path.join(__dirname, page.fileName), fullHTML, 'utf-8');
});
