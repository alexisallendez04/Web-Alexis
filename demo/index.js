// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para enlaces internos
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

    // Animación al hacer scroll (Intersection Observer) - Mejorado para Bootstrap
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Una vez animado, dejar de observar
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll(
        '.procedure-card, .benefit-item, .testimonial-card, .gallery-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Efecto parallax suave en hero (mejorado)
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            // Solo aplicar parallax en la primera pantalla
            const parallaxValue = scrolled * 0.3;
            hero.style.transform = `translateY(${parallaxValue}px)`;
        }
        
        lastScroll = scrolled;
    }, { passive: true });

    // Lazy loading para imágenes (nativo del navegador)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Agregar efecto hover mejorado a las tarjetas
    const cards = document.querySelectorAll('.procedure-card, .benefit-item, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Validar y formatear números de WhatsApp
    function formatWhatsAppNumber(number) {
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.length === 10) {
            return '52' + cleaned;
        }
        return cleaned;
    }

    // Agregar evento de clic a todos los botones de WhatsApp para tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
        button.addEventListener('click', function() {
            // Aquí puedes agregar tracking de analytics si lo necesitas
            console.log('WhatsApp button clicked:', this.href);
        });
    });

    // Prevenir comportamiento por defecto en enlaces externos y agregar target="_blank"
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // Mejorar accesibilidad: agregar focus visible a botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--color-gold)';
            this.style.outlineOffset = '2px';
        });
        
        button.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Optimización: precargar imágenes críticas
    const criticalImages = [
        document.querySelector('.hero-image img'),
        document.querySelector('.about-image img')
    ].filter(Boolean);

    criticalImages.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Animación suave para la sección de descanso al hacer scroll
    const spacerSection = document.querySelector('.spacer-section');
    if (spacerSection) {
        const spacerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        spacerSection.style.opacity = '0';
        spacerSection.style.transform = 'translateY(20px)';
        spacerSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        spacerObserver.observe(spacerSection);
    }

    // Mejorar la transición del hero a procedimientos
    const proceduresSection = document.querySelector('.procedures');
    if (proceduresSection) {
        const proceduresObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar las tarjetas de procedimientos con delay escalonado
                    const cards = entry.target.querySelectorAll('.procedure-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 100);
                    });
                    proceduresObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        proceduresObserver.observe(proceduresSection);
    }

    // Optimización: usar requestAnimationFrame para animaciones suaves
    let ticking = false;
    function updateOnScroll() {
        // Aquí puedes agregar más lógica de scroll si es necesario
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });

    // Agregar clase para mejorar el rendimiento en móviles
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-device');
    }

    // Detectar cambios de tamaño de ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth <= 768) {
                document.body.classList.add('mobile-device');
            } else {
                document.body.classList.remove('mobile-device');
            }
        }, 250);
    });

    console.log('✅ Sitio web de medicina estética cargado correctamente con Bootstrap 5');
});

