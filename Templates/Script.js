// ----------------------
// Navbar scroll effect
// ----------------------
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ----------------------
// Mobile menu toggle
// ----------------------
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ----------------------
// Close mobile menu on link click
// ----------------------
document.querySelectorAll('.nav-link').forEach(n => 
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    })
);

// ----------------------
// Smooth scrolling
// ----------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
});

// ----------------------
// Animate metric bars on scroll
// ----------------------
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const metricFills = entry.target.querySelectorAll('.metric-fill');
            metricFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

// Observe performance section
const performanceSection = document.querySelector('#performance');
if (performanceSection) {
    observer.observe(performanceSection);
}

// ----------------------
// Feature cards animation
// ----------------------
const featureCards = document.querySelectorAll('.feature-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.3 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    cardObserver.observe(card);
});

// ----------------------
// Enhanced nav link active state
// ----------------------
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ----------------------
// Active link styles injected via JS
// ----------------------
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background: #1a237e !important;
        color: #fff !important;
    }
    .navbar.scrolled .nav-link.active {
        background: rgba(255, 255, 255, 0.3) !important;
    }
`;
document.head.appendChild(style);

// ----------------------
// IDS - Pie Chart using Chart.js
// ----------------------
const ctx = document.getElementById('attackChart').getContext('2d');
const attackChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Normal', 'DoS', 'R2L', 'U2R', 'Probe'],
        datasets: [{
            data: [50, 20, 15, 10, 5],
            backgroundColor: [
                '#4caf50', // green
                '#f44336', // red
                '#ff9800', // orange
                '#9c27b0', // purple
                '#03a9f4'  // blue
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            },
            title: {
                display: false
            }
        }
    }
});
