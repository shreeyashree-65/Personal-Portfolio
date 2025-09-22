// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation active state
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    const resumeSection = document.querySelector('#resume');
    
    if (!resumeSection) return;
    
    const resumeTop = resumeSection.offsetTop;
    const resumeHeight = resumeSection.clientHeight;
    const scrollTop = window.scrollY;
    
    if (scrollTop >= resumeTop - window.innerHeight / 2 && 
        scrollTop <= resumeTop + resumeHeight) {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
};

// Throttled scroll event for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            animateSkillBars();
            ticking = false;
        });
        ticking = true;
    }
});

// Button click handlers
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.toLowerCase();
        if (buttonText === 'resume') {
            document.querySelector('#resume').scrollIntoView({
                behavior: 'smooth'
            });
        } else if (buttonText === 'portfolio') {
            document.querySelector('#portfolio').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add hover effects to portfolio items
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Typing effect for the main title (optional enhancement)
const typeWriter = (element, text, delay = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, delay);
        }
    };
    
    type();
};

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.hero-text h1');
    if (title) {
        const originalText = title.textContent;
        typeWriter(title, originalText, 150);
    }
});

// Mobile menu toggle (for future mobile optimization)
const toggleMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
};

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});