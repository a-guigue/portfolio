// Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const prenom = this.querySelector('input[placeholder="Prénom"]').value;
            const nom = this.querySelector('input[placeholder="Nom de famille"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const objet = this.querySelector('input[placeholder="Objet"]').value;
            const message = this.querySelector('textarea').value;
            
            const mailtoLink = `mailto:aurelien.guigue.pro@gmail.com?subject=${encodeURIComponent(objet)}&body=${encodeURIComponent(`De: ${prenom} ${nom}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            window.location.href = mailtoLink;
            
            // Reset le formulaire après ouverture du client mail
            setTimeout(() => {
                this.reset();
            }, 500);
        });

        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.timeline-item, .about-content').forEach(el => {
            observer.observe(el);
        });