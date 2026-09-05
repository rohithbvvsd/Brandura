document.addEventListener('DOMContentLoaded', () => {

    /* ===== Navbar scroll effect ===== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ===== Mobile menu toggle ===== */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    /* ===== Active nav link on scroll ===== */
    const sections = document.querySelectorAll('section[id]');
    const linkEls = document.querySelectorAll('.nav-link');

    const setActive = () => {
        let current = '';
        sections.forEach(section => {
            const top = window.scrollY;
            const offset = section.offsetTop - 120;
            if (top >= offset) {
                current = section.getAttribute('id');
            }
        });
        linkEls.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', setActive);
    setActive();

    /* ===== Scroll reveal animation ===== */
    const revealEls = document.querySelectorAll('.section-head, .service-card, .about-grid, .founder-card, .contact-grid, .hero-content');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => {
        el.classList.add('reveal');

        // Reveal service cards / features individually with stagger
        if (el.classList.contains('service-card')) {
            revealObserver.observe(el);
        } else {
            revealObserver.observe(el);
        }
    });

    /* ===== Animated counter ===== */
    const counters = document.querySelectorAll('.stat-num');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(ease * (target - start) + start);
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ===== Hide placeholder fallbacks when images load ===== */
    document.querySelectorAll('.card-main img, .founder-photo img').forEach(img => {
        img.addEventListener('load', () => {
            const parent = img.closest('.card-main, .founder-photo');
            if (parent) {
                const fallback = parent.querySelector('.card-fallback, .founder-fallback');
                if (fallback) fallback.style.display = 'none';
            }
        });
    });

    /* ===== Footer year ===== */
    document.getElementById('year').textContent = new Date().getFullYear();

});
