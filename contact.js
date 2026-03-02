document.addEventListener('DOMContentLoaded', () => {
    const btnClient = document.getElementById('mode-client');
    const btnTalent = document.getElementById('mode-talent');
    const companyField = document.getElementById('company-field');
    const messageLabel = document.getElementById('message-label');
    const messageInput = document.querySelector('textarea');
    const form = document.getElementById('inquiry-form');
    const formContainer = document.getElementById('form-container');

    // 1. Toggle between Hire Talent and Find Role modes
    btnClient.addEventListener('click', () => {
        btnClient.classList.add('active');
        btnTalent.classList.remove('active');
        companyField.style.display = 'block';
        messageLabel.innerText = "Mandate Brief";
        messageInput.placeholder = "Briefly describe your requirements...";
    });

    btnTalent.addEventListener('click', () => {
        btnTalent.classList.add('active');
        btnClient.classList.remove('active');
        companyField.style.display = 'none';
        messageLabel.innerText = "Career Goals";
        messageInput.placeholder = "Tell us about your next professional move...";
    });

    // 2. Handle the Submission Animation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Transmitting...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        // Simulate a premium delay for processing
        setTimeout(() => {
            formContainer.style.opacity = '0';
            
            setTimeout(() => {
                formContainer.innerHTML = `
                    <div class="success-msg">
                        <span class="success-icon">✓</span>
                        <h2>Mandate Received</h2>
                        <p>A strategic consultant will review your inquiry and contact you within 24 hours.</p>
                        <br>
                        <a href="index.html" class="btn-primary" style="display:inline-block; text-decoration:none;">Return to Headquarters</a>
                    </div>
                `;
                formContainer.style.opacity = '1';
            }, 300);
        }, 1500);
    });
});