(function() {
    // INITIALIZE EMAILJS - Replace with your Public Key
    emailjs.init("HUbO2WDTiC7csM48K"); 
})();

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('inquiry-form');
    const submitBtn = document.getElementById('submit-btn');
    const typeInput = document.getElementById('inquiry_type');
    
    const clientBtn = document.getElementById('mode-client');
    const talentBtn = document.getElementById('mode-talent');
    const messageLabel = document.getElementById('message-label');

    // 1. MODE SELECTOR LOGIC
    clientBtn.addEventListener('click', () => {
        typeInput.value = "Hire Talent";
        clientBtn.classList.add('active');
        talentBtn.classList.remove('active');
        messageLabel.innerText = "Mandate Brief";
    });

    talentBtn.addEventListener('click', () => {
        typeInput.value = "Find Role";
        talentBtn.classList.add('active');
        clientBtn.classList.remove('active');
        messageLabel.innerText = "Career Objectives";
    });

    // 2. FORM SUBMISSION
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Loading State
            submitBtn.innerText = "Transmitting...";
            submitBtn.disabled = true;

            // Use your Service ID and Template ID from EmailJS Dashboard
            const serviceID = 'service_672zcvy';
            const templateID = 'template_8kb41o3';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Success UI
                    document.getElementById('form-container').innerHTML = `
                        <div class="success-message reveal reveal-active" style="text-align: center; padding: 40px 0;">
                            <div style="font-size: 50px; margin-bottom: 20px;">✓</div>
                            <h2 class="text-gradient">Transmission Successful</h2>
                            <p style="color: white; margin-top: 15px;">Your inquiry has been logged in the H-Rep strategic portal. A consultant will contact you shortly.</p>
                            <a href="index.html" class="btn-primary" style="margin-top: 30px; display: inline-block;">Return Home</a>
                        </div>
                    `;
                }, (error) => {
                    alert("Submission failed. Error: " + JSON.stringify(error));
                    submitBtn.innerText = "Submit Inquiry";
                    submitBtn.disabled = false;
                });
        });
    }
});