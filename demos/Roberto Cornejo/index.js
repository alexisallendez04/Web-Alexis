window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Cerrar el menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        }
    });
});

AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Parallax mejorado - solo se aplica cuando la sección es visible
let parallaxTicking = false;

function updateParallax() {
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        const rect = parallaxSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Solo aplicar parallax si la sección está visible
        if (rect.top < windowHeight && rect.bottom > 0) {
            const scrolled = window.pageYOffset;
            const sectionTop = parallaxSection.offsetTop;
            const rate = (scrolled - sectionTop) * 0.3;
            parallaxSection.style.transform = `translateY(${Math.max(0, rate)}px)`;
        }
    }
    parallaxTicking = false;
}

window.addEventListener('scroll', function() {
    if (!parallaxTicking) {
        window.requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
});

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent === '+') {
                    animateCounter(stat, 10);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.lawyer-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
    });
});

let ticking = false;

function updateOnScroll() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Crear mensaje para WhatsApp
        const whatsappMessage = `Hola, me llamo ${nombre}.\n\nTeléfono: ${telefono}\nEmail: ${email}\n\nMensaje: ${mensaje}`;
        const whatsappUrl = `https://wa.me/5216641748296?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp con el mensaje
        window.open(whatsappUrl, '_blank');
        
        // Opcional: mostrar mensaje de confirmación
        alert('Redirigiendo a WhatsApp para enviar tu consulta...');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// ============================================
// BOTÓN SCROLL TO TOP
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

