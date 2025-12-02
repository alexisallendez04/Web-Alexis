// Acordeón de Preguntas Frecuentes
document.addEventListener('DOMContentLoaded', function() {
    // Configurar velocidad del collapse de Bootstrap para móvil
    const mobileMenu = document.getElementById('navbarNavMobile');
    if (mobileMenu) {
        // Override de la velocidad de transición
        const style = document.createElement('style');
        style.textContent = `
            #navbarNavMobile {
                transition: height 0.15s ease !important;
            }
            #navbarNavMobile.collapsing {
                transition: height 0.15s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const arrow = item.querySelector('.faq-arrow');
        
        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');
            
            // Cerrar todos los demás items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherArrow = otherItem.querySelector('.faq-arrow');
                    otherAnswer.style.maxHeight = null;
                    otherArrow.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle del item actual
            if (isOpen) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                arrow.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                arrow.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando fetch para enviar a un servidor
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        });
    }
    
    // Smooth scroll mejorado para los enlaces del navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                // Obtener la posición del navbar para ajustar el offset
                const navbarHeight = document.querySelector('.navbar-desktop')?.offsetHeight || 
                                    document.querySelector('.navbar-mobile')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                // Cerrar menú móvil si está abierto (más rápido)
                const mobileMenu = document.getElementById('navbarNavMobile');
                if (mobileMenu && mobileMenu.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(mobileMenu) || new bootstrap.Collapse(mobileMenu, { toggle: false });
                    bsCollapse.hide();
                }
                
                // Smooth scroll con animación personalizada
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animaciones al hacer scroll (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos con animación
    const animatedElements = document.querySelectorAll(
        '.reason-card, .service-card, .how-works-step, .faq-item, .contact-info-card, .contact-form-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navbar con efecto al hacer scroll (mantiene el espacio superior)
    const navbar = document.querySelector('.navbar-desktop');
    const navbarCircular = document.querySelector('.navbar-circular');
    const navbarMobile = document.querySelector('.navbar-mobile');
    const navbarMobileCircular = document.querySelector('.navbar-mobile-circular');
    const heroSection = document.querySelector('.hero-section');
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        
        // Actualizar navbar desktop
        if (navbar && navbarCircular) {
            // Si está dentro del hero, hacer la barra más transparente
            if (scrollY < heroHeight * 0.8) {
                navbarCircular.style.background = 'rgba(255, 255, 255, 0.5)';
                navbarCircular.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            } else {
                // Fuera del hero, barra más visible
                navbarCircular.style.background = 'rgba(255, 255, 255, 0.85)';
                navbarCircular.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            }
            
            // Mantener padding y sombra del navbar
            if (scrollY > 50) {
                navbar.style.padding = '60px 0';
                navbar.style.boxShadow = 'none';
            } else {
                navbar.style.padding = '60px 0';
                navbar.style.boxShadow = 'none';
            }
        }
        
        // Actualizar navbar mobile
        if (navbarMobile && navbarMobileCircular) {
            // Si está dentro del hero, hacer la barra más transparente
            if (scrollY < heroHeight * 0.8) {
                navbarMobileCircular.style.background = 'rgba(255, 255, 255, 0.5)';
                navbarMobileCircular.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            } else {
                // Fuera del hero, barra más visible
                navbarMobileCircular.style.background = 'rgba(255, 255, 255, 0.85)';
                navbarMobileCircular.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
            }
        }
    }
    
    // Actualizar al cargar
    updateNavbar();
    
    // Actualizar al hacer scroll
    window.addEventListener('scroll', updateNavbar, { passive: true });
    
    // Scroll premium con inercia más pesada - Versión mejorada
    let isScrolling = false;
    let scrollTimeout;
    let currentScroll = 0;
    let targetScroll = 0;
    let ease = 0.12;
    let isAnimating = false;
    let animationFrameId = null;
    let lastWheelTime = 0;
    
    // Aplicar efecto de scroll pesado con suavizado
    function applyHeavyScroll() {
        // Solo aplicar en desktop, no en móviles
        if (window.innerWidth < 992) {
            return;
        }
        
        document.documentElement.style.scrollBehavior = 'auto';
        
        // Inicializar posición
        currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        targetScroll = currentScroll;
        
        // Función de animación suave mejorada
        function smoothScroll() {
            const diff = targetScroll - currentScroll;
            
            if (Math.abs(diff) > 0.5) {
                currentScroll += diff * ease;
                window.scrollTo({
                    top: currentScroll,
                    left: 0,
                    behavior: 'auto'
                });
                isAnimating = true;
                document.body.classList.add('scrolling');
                animationFrameId = requestAnimationFrame(smoothScroll);
            } else {
                currentScroll = targetScroll;
                window.scrollTo({
                    top: currentScroll,
                    left: 0,
                    behavior: 'auto'
                });
                isAnimating = false;
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(function() {
                    document.body.classList.remove('scrolling');
                }, 200);
            }
        }
        
        // Escuchar eventos de scroll nativo (para touch y otros)
        let scrollListener = function() {
            if (!isAnimating) {
                const newScroll = window.pageYOffset || document.documentElement.scrollTop;
                if (Math.abs(newScroll - targetScroll) > 10) {
                    targetScroll = newScroll;
                    currentScroll = newScroll;
                }
            }
        };
        
        window.addEventListener('scroll', scrollListener, { passive: true });
        
        // Escuchar rueda del mouse con más resistencia
        let wheelListener = function(e) {
            const now = Date.now();
            if (now - lastWheelTime < 16) return; // Throttle a ~60fps
            lastWheelTime = now;
            
            e.preventDefault();
            
            const delta = e.deltaY;
            const scrollAmount = delta * 0.55;
            
            targetScroll += scrollAmount;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));
            
            if (!isAnimating) {
                smoothScroll();
            }
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                document.body.classList.remove('scrolling');
            }, 300);
        };
        
        window.addEventListener('wheel', wheelListener, { passive: false });
        
        // Limpiar listeners al desmontar (si es necesario)
        window.addEventListener('beforeunload', function() {
            window.removeEventListener('scroll', scrollListener);
            window.removeEventListener('wheel', wheelListener);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }
    
    // Aplicar solo en desktop
    if (window.innerWidth >= 992) {
        applyHeavyScroll();
    }
    
    // Re-aplicar si cambia el tamaño de ventana
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth >= 992) {
                // Recargar la página para re-aplicar el scroll
                // O mejor, solo aplicar si no está ya aplicado
            }
        }, 250);
    });
});

