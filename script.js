document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU LOGIC (Fixed)
    const menu = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menu) {
        menu.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents clicks from bubbling up
            navLinks.classList.toggle('active');
            menu.classList.toggle('is-active'); // Optional: for animating the bars
        });
    }

    // Close menu when clicking a link (Important for mobile flow)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. REVEAL ON SCROLL
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. CINEMATIC PAGE TRANSITIONS (Refined)
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        const href = link.getAttribute('href');

        // Only trigger transition if:
        // - It's a link to a separate HTML file
        // - It's NOT a link to a section on the SAME page (e.g., #about)
        if (href && href.includes('.html') && !href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                // If it's a link to the page we are already on, don't transition
                const currentPath = window.location.pathname;
                if (currentPath.endsWith(href)) return;

                e.preventDefault();
                const destination = href;

                // Trigger Fade Out
                document.body.classList.add('fade-out');

                // Redirect after animation
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);
            });
        }
    });
});