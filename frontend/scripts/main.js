// Main JavaScript functionality
class JobPlatform {
    constructor() {
        this.currentUser = null;
        this.jobs = [];
        this.provinces = {
            'gauteng': ['Johannesburg', 'Pretoria', 'Sandton', 'Randburg', 'Centurion'],
            'western-cape': ['Cape Town', 'Stellenbosch', 'Paarl', 'Worcester'],
            'kzn': ['Durban', 'Pietermaritzburg', 'Ballito', 'Richards Bay'],
            'eastern-cape': ['Port Elizabeth', 'East London', 'Grahamstown'],
            'free-state': ['Bloemfontein', 'Welkom', 'Bethlehem'],
            'mpumalanga': ['Nelspruit', 'Witbank', 'Middleburg'],
            'limpopo': ['Polokwane', 'Modimolle', 'Phalaborwa'],
            'north-west': ['Mahikeng', 'Rustenburg', 'Potchefstroom'],
            'northern-cape': ['Kimberley', 'Upington', 'Springbok']
        };
        
        this.init();
    }

    init() {
        this.loadComponents();
        this.initializeEventListeners();
        this.loadSampleJobs();
        this.initializeAnimations();
        this.startCounters();
    }

    loadComponents() {
        // Load header and footer
        fetch('components/header.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header').innerHTML = data;
            });

        fetch('components/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            });
    }

    initializeEventListeners() {
        // Province selection
        const provinceSelect = document.getElementById('provinceSelect');
        if (provinceSelect) {
            provinceSelect.addEventListener('change', (e) => {
                this.updateCityOptions(e.target.value);
            });
        }

        // Registration form
        const registrationForm = document.getElementById('registrationForm');
        if (registrationForm) {
            registrationForm.addEventListener('submit', (e) => this.handleRegistration(e));
        }

        // Scroll animations
        window.addEventListener('scroll', () => this.handleScroll());
    }

    updateCityOptions(province) {
        const citySelect = document.getElementById('citySelect');
        if (!citySelect) return;

        citySelect.innerHTML = '<option value="">All Cities</option>';
        
        if (province && this.provinces[province]) {
            this.provinces[province].forEach(city => {
                const option = document.createElement('option');
                option.value = city.toLowerCase();
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    }

    loadSampleJobs() {
        this.jobs = [
            {
                id: 1,
                title: "Senior Software Developer",
                company: "Tech Innovations SA",
                location: "Johannesburg, Gauteng",
                salary: "R85,000",
                type: "Full-time",
                description: "Looking for an experienced developer to join our dynamic team...",
                posted: "2 hours ago",
                urgent: true
            },
            {
                id: 2,
                title: "Data Scientist",
                company: "DataFlow Analytics",
                location: "Cape Town, Western Cape",
                salary: "R95,000",
                type: "Full-time",
                description: "Join our AI research team working on cutting-edge projects...",
                posted: "1 day ago",
                urgent: true
            },
            {
                id: 3,
                title: "Marketing Manager",
                company: "Brand Builders",
                location: "Durban, KZN",
                salary: "R65,000",
                type: "Full-time",
                description: "Lead our marketing team to new heights...",
                posted: "3 days ago",
                urgent: false
            }
        ];

        this.renderJobs();
    }

    renderJobs() {
        const jobsGrid = document.getElementById('jobsGrid');
        if (!jobsGrid) return;

        jobsGrid.innerHTML = this.jobs.map(job => `
            <div class="job-card" data-aos="fade-up">
                ${job.urgent ? '<div class="card-badge">URGENT</div>' : ''}
                <h3>${job.title}</h3>
                <p class="company">${job.company}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                <p class="salary"><i class="fas fa-money-bill-wave"></i> ${job.salary}/month</p>
                <p class="type"><i class="fas fa-clock"></i> ${job.type}</p>
                <p class="description">${job.description}</p>
                <div class="job-actions">
                    <button class="btn btn-primary" onclick="jobPlatform.applyToJob(${job.id})">
                        <i class="fas fa-paper-plane"></i>
                        Apply Now
                    </button>
                    <button class="btn btn-secondary" onclick="jobPlatform.saveJob(${job.id})">
                        <i class="fas fa-heart"></i>
                        Save
                    </button>
                </div>
                <p class="posted-time">${job.posted}</p>
            </div>
        `).join('');
    }

    async applyToJob(jobId) {
        if (!this.currentUser) {
            showRegistrationModal();
            return;
        }

        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        try {
            // Simulate AI-powered application
            const result = await this.submitAIApplication(job);
            
            if (result.success) {
                this.showNotification('Application submitted successfully!', 'success');
            } else {
                this.showNotification('Application failed. Please try again.', 'error');
            }
        } catch (error) {
            this.showNotification('Error submitting application', 'error');
        }
    }

    async submitAIApplication(job) {
        // Simulate AI processing
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'AI-optimized application submitted',
                    applicationId: `app_${Date.now()}`,
                    optimizationScore: 92
                });
            }, 2000);
        });
    }

    async handleRegistration(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            province: document.getElementById('province').value,
            plan: document.getElementById('plan').value
        };

        try {
            const result = await this.registerUser(formData);
            
            if (result.success) {
                this.currentUser = result.user;
                this.showNotification('Registration successful!', 'success');
                closeModal('registrationModal');
                
                // Redirect to dashboard or show success page
                setTimeout(() => {
                    this.showWelcomeScreen(result.user);
                }, 1000);
            }
        } catch (error) {
            this.showNotification('Registration failed. Please try again.', 'error');
        }
    }

    async registerUser(userData) {
        // Simulate API call
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    success: true,
                    user: {
                        id: `user_${Date.now()}`,
                        ...userData,
                        joinDate: new Date().toISOString()
                    },
                    message: 'Welcome to JobConnect SA!'
                });
            }, 1500);
        });
    }

    startCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.round(current);
            }, 16);
        });
    }

    initializeAnimations() {
        // Initialize AOS (Animate On Scroll)
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    }

    handleScroll() {
        // Add scroll-based animations
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    showWelcomeScreen(user) {
        // Show welcome screen with next steps
        const welcomeHTML = `
            <div class="welcome-screen">
                <div class="welcome-content">
                    <h2>Welcome to JobConnect SA, ${user.name}! 🎉</h2>
                    <p>Your career transformation starts now!</p>
                    <div class="welcome-steps">
                        <div class="step">
                            <i class="fas fa-upload"></i>
                            <h3>Upload Your CV</h3>
                            <p>Let our AI optimize your resume</p>
                        </div>
                        <div class="step">
                            <i class="fas fa-briefcase"></i>
                            <h3>Find Jobs</h3>
                            <p>Browse personalized job matches</p>
                        </div>
                        <div class="step">
                            <i class="fas fa-rocket"></i>
                            <h3>Get Hired</h3>
                            <p>Apply with one click and track applications</p>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">
                        LET'S GET STARTED!
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', welcomeHTML);
    }
}

// Global functions
function showRegistrationModal() {
    document.getElementById('registrationModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function searchJobs() {
    const province = document.getElementById('provinceSelect').value;
    const city = document.getElementById('citySelect').value;
    const industry = document.getElementById('industrySelect').value;
    const salary = document.getElementById('salaryRange').value;
    
    jobPlatform.showNotification('Searching for matching jobs...', 'info');
    
    // Simulate search
    setTimeout(() => {
        jobPlatform.renderJobs();
        jobPlatform.showNotification('Found 25 matching jobs!', 'success');
    }, 1000);
}

function selectPlan(plan) {
    showRegistrationModal();
    document.getElementById('plan').value = plan;
}

// Initialize the platform
const jobPlatform = new JobPlatform();

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}
