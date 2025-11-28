// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 90; // Ajuste para navbar fijo
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar navbar en móvil si está abierto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // Cambiar navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // Animación al hacer scroll (Intersection Observer) - Mejorado
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }, index * 50);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    const animateElements = document.querySelectorAll(
        '.demo-card, .benefit-card, .process-step, .result-card, .pricing-card-enhanced'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Agregar evento de clic a todos los botones de WhatsApp para tracking
    document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
        button.addEventListener('click', function() {
            console.log('WhatsApp button clicked:', this.href);
            // Aquí puedes agregar tracking de analytics si lo necesitas
        });
    });

    // Prevenir comportamiento por defecto en enlaces externos y agregar target="_blank"
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        if (link.href.includes('wa.me') && !link.hasAttribute('target')) {
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

    // Animación para la sección de dolor
    const painItems = document.querySelectorAll('.pain-item');
    const painObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                painItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 150);
                });
                painObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    if (painItems.length > 0) {
        painObserver.observe(painItems[0].closest('.pain-section'));
    }

    // Animación para solution box
    const solutionBox = document.querySelector('.solution-box');
    if (solutionBox) {
        const solutionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    solutionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        solutionObserver.observe(solutionBox);
    }

    // Optimización: usar requestAnimationFrame para animaciones suaves
    let ticking = false;
    function updateOnScroll() {
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

    console.log('✅ Landing page cargada correctamente');
});
