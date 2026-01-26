// Activation du flip au clic et au clavier
document.querySelectorAll('.flip-card').forEach(card => {
    const toggle = (ev) => {
        if (ev.target.closest('a')) return;
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
    };

    card.addEventListener('click', toggle);

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(e);
        }
        if (e.key === 'Escape') {
            card.classList.remove('is-flipped');
            card.setAttribute('aria-pressed', 'false');
        }
    });

    // Fermer la carte si clic en dehors
    document.addEventListener('click', (e) => {
        if (!card.contains(e.target) && card.classList.contains('is-flipped')) {
            card.classList.remove('is-flipped');
            card.setAttribute('aria-pressed', 'false');
        }
    }, true);
});

// Smooth scroll pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
        nav.classList.add('hidden');
    } else {
        nav.classList.remove('hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});