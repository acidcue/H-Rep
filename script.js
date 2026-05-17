document.addEventListener('DOMContentLoaded', () => {
    // 1. SCROLL REVEAL ANIMATIONS
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    // 3. INITIALIZE JOBS ENGINE
    loadJobBoard();
});

function loadJobBoard() {
    const jobBoard = document.getElementById('job-board');
    const noJobsMsg = document.getElementById('no-jobs-msg');
    if (!jobBoard) return;

    const oldCards = jobBoard.querySelectorAll('.dynamic-job-card');
    oldCards.forEach(card => card.remove());

    const savedJobs = JSON.parse(localStorage.getItem('hrep_jobs')) || [];

    if (savedJobs.length === 0) {
        if (noJobsMsg) noJobsMsg.style.display = 'block';
    } else {
        if (noJobsMsg) noJobsMsg.style.display = 'none';
        
        savedJobs.forEach((job, index) => {
            const card = document.createElement('div');
            card.className = 'job-card dynamic-job-card reveal-active';
            card.style.cssText = "background: #fff; padding: 30px; border-radius: 15px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 12px rgba(0,0,0,0.01);";
            
            card.innerHTML = `
                <div class="job-info">
                    <span class="job-tag" style="color: #C5A059; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Ref: ${job.id}</span>
                    <h3 style="margin: 5px 0 8px 0; color: #1A2B48; font-size: 1.25rem; font-weight: 700;">${job.title}</h3>
                    <p style="color: #666; font-size: 0.9rem; margin: 0;">${job.location}</p>
                </div>
                <div style="display: flex; gap: 15px; align-items: center;">
                    <a href="contact.html?job=${encodeURIComponent(job.title)}" class="btn-inquire" style="text-decoration: none; font-size: 0.85rem; font-weight: bold; padding: 10px 20px; border: 1px solid #C5A059; color: #C5A059; border-radius: 50px; transition: 0.3s;">Inquire About Role</a>
                    <button onclick="event.stopPropagation(); adminDeleteJob(${index})" class="delete-ui-btn" style="background: #ff4d4d; color: white; border: none; padding: 10px 15px; border-radius: 50px; cursor: pointer; font-size: 0.8rem; font-weight: bold; display: none;">Remove</button>
                </div>
            `;
            jobBoard.appendChild(card);
        });
    }
}

function adminAddJob() {
    const accessKey = prompt("Enter H-Rep Administration Portal Key:");
    if (accessKey !== "HREP_ADMIN") { alert("Access Denied."); return; }

    const actionMode = prompt("Type 'ADD' to introduce a mandate, or type 'MANAGE' to show deletion options:").toUpperCase();

    if (actionMode === "MANAGE") {
        document.querySelectorAll('.delete-ui-btn').forEach(btn => btn.style.display = 'inline-block');
        return;
    }

    if (actionMode !== "ADD") return;

    const title = prompt("Enter Position Title:"); if (!title) return;
    const id = prompt("Assign Reference Code:"); if (!id) return;
    const location = prompt("Enter Location Settings:"); if (!location) return;

    const savedJobs = JSON.parse(localStorage.getItem('hrep_jobs')) || [];
    savedJobs.push({ title, id, location });
    localStorage.setItem('hrep_jobs', JSON.stringify(savedJobs));
    
    loadJobBoard();
}

function adminDeleteJob(index) {
    const savedJobs = JSON.parse(localStorage.getItem('hrep_jobs')) || [];
    savedJobs.splice(index, 1);
    localStorage.setItem('hrep_jobs', JSON.stringify(savedJobs));
    loadJobBoard();
}