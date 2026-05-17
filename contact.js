(function() {
    // INITIALIZE EMAILJS - Locked with your active Public Key
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

    // 2. PARSE URL INQUIRY STRINGS FOR DYNAMIC ROLES
    const urlParams = new URLSearchParams(window.location.search);
    const targetJob = urlParams.get('job');

    if (targetJob) {
        const messageBox = document.getElementById('message');
        if (messageBox) {
            messageBox.value = `Hello H-Rep Team,\n\nI am writing to express my interest and request additional tracking specifications regarding the open "${targetJob}" mandate posted on your platform.\n\nPlease advise on the background screening criteria and protocol steps.`;
        }
        // Force the form context toggle automatically to Talent processing mode
        if (talentBtn) {
            talentBtn.click();
        }
    }

    // 3. FORM SUBMISSION
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Loading State
            submitBtn.innerText = "Transmitting...";
            submitBtn.disabled = true;

            // Verified active Service ID and Template ID strings
            const serviceID = 'service_672zcvy';
            const templateID = 'template_8kb41o3';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    // Success UI Display Injection
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