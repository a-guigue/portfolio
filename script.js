// Cartes retournables
const flipCards = document.querySelectorAll(".flip-card");

const setFlipped = (card, flipped) => {
    card.classList.toggle("is-flipped", flipped);
    card.setAttribute("aria-pressed", String(flipped));
};

flipCards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (e.target.closest("a")) return;
        setFlipped(card, !card.classList.contains("is-flipped"));
    });

    card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setFlipped(card, !card.classList.contains("is-flipped"));
        }
        if (e.key === "Escape") {
            setFlipped(card, false);
        }
    });
});

// Fermer les cartes ouvertes si clic en dehors (un seul écouteur pour toutes les cartes)
document.addEventListener("click", (e) => {
    flipCards.forEach(card => {
        if (!card.contains(e.target) && card.classList.contains("is-flipped")) {
            setFlipped(card, false);
        }
    });
}, true);

// Smooth scroll pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        const target = id.length > 1 && document.querySelector(id);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.pushState(null, "", id);
    });
});

// Menu burger
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

const setMenuOpen = (open) => {
    burger.classList.toggle("active", open);
    navLinks.classList.toggle("active", open);
    burger.setAttribute("aria-expanded", String(open));
};

burger.addEventListener("click", () => {
    setMenuOpen(!navLinks.classList.contains("active"));
});

/* Fermer le menu quand on clique sur un lien ou qu'on appuie sur Échap */
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenuOpen(false);
});

// Détection du scroll : animation une seule fois par section
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll(".scroll-animate").forEach(el => observer.observe(el));
