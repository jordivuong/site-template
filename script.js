document.addEventListener('DOMContentLoaded', () => {
    // Retrait du rideau et affichage progressif au chargement
    setTimeout(() => {
        document.documentElement.classList.remove('curtain-down', 'header-hidden'); 
        setTimeout(() => {
            document.documentElement.classList.remove('text-hidden'); 
            document.body.classList.add('loaded'); 
        }, 400); 
    }, 50);

    // GESTION DE LA POPIN CONTACT
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.modal-close');

    document.querySelectorAll('.btn-contact-modal').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // ANIMATIONS DE TRANSITION AU CLIC SUR LES LIENS DE NAVIGATION
    document.querySelectorAll('nav a').forEach(lien => {
        lien.addEventListener('click', function(e) {
            if (this.classList.contains('btn-contact-modal')) return;

            const dest = this.href;
            if (dest === window.location.href) return;
            
            e.preventDefault(); 
            document.body.classList.remove('loaded');
            document.documentElement.classList.add('text-hidden');
            setTimeout(() => {
                document.documentElement.classList.add('curtain-down');
                setTimeout(() => {
                    document.documentElement.classList.add('header-hidden');
                    setTimeout(() => { window.location.href = dest; }, 200);
                }, 400);
            }, 200); 
        });
    });
});
