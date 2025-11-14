// Setup Hero Image
function setupHeroImage() {
    const heroImage = document.getElementById('heroCoachImage');
    const imagePlaceholder = document.getElementById('heroImagePlaceholder');
    
    if (heroImage && imagePlaceholder) {
        const img = new Image();
        img.onload = function() {
            heroImage.src = img.src;
            heroImage.classList.add('loaded');
            imagePlaceholder.classList.add('hidden');
        };
        
        img.onerror = function() {
            heroImage.classList.remove('loaded');
            imagePlaceholder.classList.remove('hidden');
        };
        
        img.src = heroImage.getAttribute('src') || 'profesional.jpg';
    }
}

// Setup About Image
function setupAboutImage() {
    const aboutImage = document.querySelector('.about-profile-image');
    const aboutPlaceholder = document.getElementById('aboutImagePlaceholder');
    
    if (aboutImage && aboutPlaceholder) {
        const img = new Image();
        img.onload = function() {
            aboutImage.src = img.src;
            aboutImage.classList.add('loaded');
            aboutPlaceholder.classList.add('hidden');
        };
        
        img.onerror = function() {
            aboutImage.classList.remove('loaded');
            aboutPlaceholder.classList.remove('hidden');
        };
        
        img.src = aboutImage.getAttribute('src') || 'retrato.jpg';
    }
}

// Setup WhatsApp Button
function setupWhatsAppButton() {
    const phoneNumber = '542664022762'; // 🔴 CAMBIAR ESTO
    const message = encodeURIComponent('Hola Diego, vi tu web y quiero comenzar mi transformación');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    const whatsappBtnContact = document.getElementById('whatsappBtnContact');
    const contactBtnOverlay = document.getElementById('contactBtnOverlay');
    
    if (whatsappBtnContact) {
        whatsappBtnContact.href = whatsappUrl;
        whatsappBtnContact.target = '_blank';
        whatsappBtnContact.rel = 'noopener noreferrer';
    }
    
    if (contactBtnOverlay) {
        contactBtnOverlay.href = whatsappUrl;
        contactBtnOverlay.target = '_blank';
        contactBtnOverlay.rel = 'noopener noreferrer';
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Si es un botón de WhatsApp, no prevenir default
        if (this.id === 'whatsappBtnContact' || this.id === 'contactBtnOverlay') {
            return;
        }
        
        // Si es el botón "Comenzar", hacer scroll suave
        if (href === '#contacto' || href === '#inicio' || href === '#sobre-mi' || href === '#precios') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Setup FAQ Accordion
function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    setupHeroImage();
    setupAboutImage();
    setupWhatsAppButton();
    setupFAQ();
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.pricing-card, .testimonial-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
        observer.observe(el);
    });
    
});

