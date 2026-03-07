document.addEventListener('DOMContentLoaded', () => {
    // 1. MOBILE MENU LOGIC
    const menu = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if(menu) {
        menu.addEventListener('click', () => navLinks.classList.toggle('active'));
    }

    // 2. REVEAL ON SCROLL LOGIC
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('reveal-active');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 3. THE SICK PAGE TRANSITION LOGIC
    const transitionLinks = document.querySelectorAll('a[href="contact.html"], .logo a');

    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Only trigger if it's a page-to-page link
            const destination = link.getAttribute('href');
            
            if (destination.includes('.html')) {
                e.preventDefault(); // Stop the immediate jump
                
                document.body.classList.add('fade-out'); // Trigger CSS animation

                // Wait for the animation (500ms) then change page
                setTimeout(() => {
                    window.location.href = destination;
                }, 500);
            }
        });
    });
});
(function() {
    // Replace with your Public Key from Account > Integration
    emailjs.init(template_ljxokkg); 
})();

window.onload = function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Visual feedback for the user
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // These IDs come from your EmailJS "Email Services" and "Email Templates" tabs
            const serviceID = 'YOUR_SERVICE_ID';
            const templateID = 'YOUR_TEMPLATE_ID';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    alert("Thank you! Your inquiry has been sent to H-Rep.");
                    submitBtn.innerText = "Send Message";
                    submitBtn.disabled = false;
                    contactForm.reset(); 
                }, (err) => {
                    submitBtn.innerText = "Send Message";
                    submitBtn.disabled = false;
                    alert("Something went wrong. Error: " + JSON.stringify(err));
                });
        });
    }
}