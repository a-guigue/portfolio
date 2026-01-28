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

const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navLinks.classList.toggle("active");

    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !expanded);
});

/* Fermer le menu quand on clique sur un lien */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        burger.classList.remove("active");
        navLinks.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
    });
});

//detection du scroll
const elements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // animation une seule fois
            }
        });
    },
    {
        threshold: 0.2
    }
);

elements.forEach(el => observer.observe(el));
