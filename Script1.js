// ===========================
// LAUREN LEIGH PETRUS — script.js
// Resized / refined version
// ===========================

// --- NAV scrolled state ---
const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
}

// --- HAMBURGER ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// --- SCROLL REVEAL for project cards ---
const cards = document.querySelectorAll('.reveal-card');

if (cards.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const index = Number(entry.target.dataset.index) || 0;
            const delay = index * 100;

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    });

    cards.forEach(card => observer.observe(card));
}

// --- SUBTLE CURSOR DOT (desktop only) ---
if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');

    dot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: #C94477;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width .2s, height .2s, opacity .25s;
        opacity: 0;
    `;

    document.body.appendChild(dot);

    document.addEventListener('mousemove', (e) => {
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
        dot.style.opacity = '0.85';
    });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
    });

    document.querySelectorAll('a, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            dot.style.width = '16px';
            dot.style.height = '16px';
            dot.style.opacity = '0.28';
        });

        el.addEventListener('mouseleave', () => {
            dot.style.width = '6px';
            dot.style.height = '6px';
            dot.style.opacity = '0.85';
        });
    });
}