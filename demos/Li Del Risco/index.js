// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll para enlaces internos
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

// Inicializar AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const empresa = document.getElementById('empresa').value;
        const telefono = document.getElementById('telefono').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Crear mensaje para WhatsApp
        let whatsappMessage = `Hola, me llamo ${nombre}.\n\n`;
        if (empresa) {
            whatsappMessage += `Empresa: ${empresa}\n`;
        }
        whatsappMessage += `Teléfono: ${telefono}\n`;
        whatsappMessage += `Email: ${email}\n\n`;
        whatsappMessage += `Mensaje: ${mensaje}`;
        
        const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp con el mensaje
        window.open(whatsappUrl, '_blank');
        
        // Limpiar formulario
        contactForm.reset();
        
        // Mostrar mensaje de confirmación
        alert('Redirigiendo a WhatsApp para enviar tu consulta...');
    });
}

// Botón Scroll to Top
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

// Efecto Parallax
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
            const rate = (scrolled - sectionTop) * 0.5;
            const parallaxBg = parallaxSection.querySelector('.parallax-background');
            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${Math.max(0, rate)}px)`;
            }
        }
    }
    parallaxTicking = false;
}

window.addEventListener('scroll', function() {
    if (!parallaxTicking) {
        window.requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}, { passive: true });

// Optimización de rendimiento
let ticking = false;

function updateOnScroll() {
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

// Agregar clase loaded al body cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('loaded');
});

// Tracking de clicks en botones de WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function() {
        console.log('WhatsApp button clicked');
        // Aquí puedes agregar tracking de analytics si lo necesitas
    });
});

console.log('✅ Web de Li Del Risco cargada correctamente');

