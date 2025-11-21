// Datos de las demos - Solo 2-3 demos de calidad
const demos = [
    {
        name: "Estudio Jurídico – Derecho Civil (Demo)",
        subtitle: "Estructura profesional enfocada en claridad, confianza y contacto directo.",
        image: null,
        gradient: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        tags: ["Estudio Jurídico", "Derecho Civil"],
        url: "#"
    },
    {
        name: "Estudio Jurídico – Derecho Corporativo (Demo)",
        subtitle: "Estructura profesional enfocada en claridad, confianza y contacto directo.",
        image: null,
        gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        tags: ["Estudio Jurídico", "Derecho Corporativo"],
        url: "#"
    }
];

// Función para renderizar el portfolio
function renderPortfolio() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;
    
    demos.forEach((demo, index) => {
        const portfolioCard = document.createElement('div');
        portfolioCard.className = 'portfolio-card';
        portfolioCard.style.animationDelay = `${index * 0.1}s`;
        
        // Usar gradiente con texto
        const imageContent = `<div class="portfolio-image" style="background: ${demo.gradient};">
            <span class="portfolio-image-text">${demo.name}</span>
        </div>`;
        
        // Codificar la URL correctamente para manejar caracteres especiales
        const encodedUrl = demo.url && demo.url !== '#' 
            ? demo.url.split('/').map(part => encodeURIComponent(part)).join('/')
            : '#';
        
        portfolioCard.innerHTML = `
            ${imageContent}
            <div class="portfolio-content">
                <h3 class="portfolio-name">${demo.name}</h3>
                ${demo.subtitle ? `<p class="portfolio-subtitle">${demo.subtitle}</p>` : ''}
                <div class="portfolio-tags">
                    ${demo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                ${demo.url !== '#' ? `
                    <a href="${encodedUrl}" class="btn-portfolio" target="_blank" rel="noopener noreferrer">
                        <i class="bi bi-link-45deg me-2"></i>Ver demo completa
                    </a>
                ` : `
                    <span class="btn-portfolio btn-portfolio-disabled">
                        <i class="bi bi-clock me-2"></i>Próximamente
                    </span>
                `}
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioCard);
    });
}

// Función para configurar los enlaces de contacto
function setupContactLinks() {
    const whatsappLink = document.getElementById('whatsappLink');
    const emailLink = document.getElementById('emailLink');
    
    if (whatsappLink) {
        const phoneNumber = '542664022762';
        const message = encodeURIComponent('Hola Alexis, vi tu portafolio y me interesa conocer más sobre tus servicios.');
        whatsappLink.href = `https://wa.me/${phoneNumber}?text=${message}`;
        whatsappLink.target = '_blank';
        whatsappLink.rel = 'noopener noreferrer';
    }
    
    if (emailLink) {
        emailLink.href = 'mailto:alexisallendez04@gmail.com';
    }
}

// Función para manejar el navbar
function setupNavbar() {
    const navbar = document.getElementById('mainNavbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efecto al hacer scroll
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Ejecutar al cargar para verificar posición inicial
    handleScroll();
    
    // Escuchar scroll
    window.addEventListener('scroll', handleScroll);
    
    // Activar link según la sección visible
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
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
}

// Función para manejar la carga de la imagen de perfil
function setupProfileImage() {
    const profileImage = document.getElementById('aboutProfileImage');
    const imagePlaceholder = document.getElementById('aboutProfilePlaceholder');
    
    if (profileImage && imagePlaceholder) {
        const img = new Image();
        img.onload = function() {
            profileImage.src = img.src;
            profileImage.classList.add('loaded');
            imagePlaceholder.classList.add('hidden');
        };
        
        img.onerror = function() {
            profileImage.classList.remove('loaded');
            imagePlaceholder.classList.remove('hidden');
        };
        
        img.src = profileImage.getAttribute('src') || 'images/foto-perfil.jpg';
    }
}

// Función para animaciones al scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos con clase fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
    
    // Observar cards del portfolio
    document.querySelectorAll('.portfolio-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.8s ease-out ${index * 0.1}s, transform 0.8s ease-out ${index * 0.1}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderPortfolio();
    setupContactLinks();
    setupNavbar();
    setupProfileImage();
    setupScrollAnimations();
    
    // Smooth scroll para los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

