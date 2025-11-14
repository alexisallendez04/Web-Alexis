// Datos de las demos
const demos = [
    {
        name: "María González",
        image: 'images/demos/Maria-Gonzalez.png',
        gradient: "linear-gradient(135deg, #7dd3c0 0%, #5fb8a5 100%)",
        tags: ["Nutricionista", "Web con reservas"],
        url: "demos/Maria-Gonzalez/index.html"
    },
    {
        name: "Laura Martínez",
        image: 'images/demos/Laura-Martinez.png',
        gradient: "linear-gradient(135deg, #f5a3b7 0%, #e88ba3 100%)",
        tags: ["Nutricionista", "Web profesional"],
        url: "demos/Laura-Martinez/index.html"
    },
    {
        name: "Ana Rodríguez",
        image: 'images/demos/Ana-Rodriguez.png',
        gradient: "linear-gradient(135deg, #ffd89b 0%, #ffc870 100%)",
        tags: ["Nutricionista", "Web moderna"],
        url: "demos/Ana-Rodriguez/index.html"
    },
    {
        name: "Diego Fernández",
        image: 'images/screens/Diego-Fernandez.png',
        gradient: "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)",
        tags: ["Coach Fitness", "Web minimalista"],
        url: "demos/Diego-Fernandez/index.html"
    },
    {
        name: "Valentina Torres",
        image: 'images/demos/Valentina-Torres.png',
        gradient: "linear-gradient(135deg, #f5a3b7 0%, #e88ba3 100%)",
        tags: ["Nutricionista", "Web elegante"],
        url: "demos/Valentina-Torres/index.html"
    },
    {
        name: "Santiago Martínez",
        image: 'images/demos/Santiago-Martinez.png',
        gradient: "linear-gradient(135deg, #ffd89b 0%, #ffc870 100%)",
        tags: ["Coach Fitness", "Web con conversión"],
        url: "demos/Isabella-Romero/index.html"
    }
];

// Función para renderizar las demos
function renderDemos() {
    const demosGrid = document.getElementById('demosGrid');
    if (!demosGrid) return;
    
    demos.forEach(demo => {
        const demoCard = document.createElement('div');
        demoCard.className = 'demo-card';
        
        // Si hay imagen, usar img tag, sino usar gradiente con texto
        const imageContent = demo.image 
            ? `<img src="${demo.image}" alt="${demo.name}" class="demo-image">`
            : `<div class="demo-image" style="background: ${demo.gradient};">
                <span style="font-size: 1.5rem; font-weight: 600;">${demo.name}</span>
               </div>`;
        
        // Codificar la URL correctamente para manejar caracteres especiales
        const encodedUrl = demo.url.split('/').map(part => 
            encodeURIComponent(part)
        ).join('/');
        
        demoCard.innerHTML = `
            ${imageContent}
            <div class="demo-content">
                <h3 class="demo-name">${demo.name}</h3>
                <div class="demo-tags">
                    ${demo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${encodedUrl}" class="btn-demo" target="_blank" rel="noopener noreferrer">
                    <i class="bi bi-link-45deg me-2"></i>Ver demo en vivo
                </a>
            </div>
        `;
        
        demosGrid.appendChild(demoCard);
    });
}

// Función para configurar los botones de WhatsApp
function setupWhatsAppButton() {
    // ⚠️ IMPORTANTE: Reemplaza con tu número de WhatsApp
    const phoneNumber = '542664022762'; // 🔴 CAMBIAR ESTO
    const phoneNumberDisplay = '+54 2664 022762'; // 🔴 CAMBIAR ESTO
    
    // Mensaje predefinido
    const message = encodeURIComponent('Hola Alexis, vi tu web y quiero mi web profesional lista en 48 horas');
    
    // URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Configurar todos los botones de WhatsApp
    const whatsappBtnNav = document.getElementById('whatsappBtnNav');
    const whatsappBtnHowItWorks = document.getElementById('whatsappBtnHowItWorks');
    const whatsappBtnOffer = document.getElementById('whatsappBtnOffer');
    const whatsappBtnContact = document.getElementById('whatsappBtnContact');
    
    if (whatsappBtnNav) {
        whatsappBtnNav.href = whatsappUrl;
        whatsappBtnNav.target = '_blank';
        whatsappBtnNav.rel = 'noopener noreferrer';
    }
    
    if (whatsappBtnHowItWorks) {
        whatsappBtnHowItWorks.href = whatsappUrl;
        whatsappBtnHowItWorks.target = '_blank';
        whatsappBtnHowItWorks.rel = 'noopener noreferrer';
    }
    
    if (whatsappBtnOffer) {
        whatsappBtnOffer.href = whatsappUrl;
        whatsappBtnOffer.target = '_blank';
        whatsappBtnOffer.rel = 'noopener noreferrer';
    }
    
    if (whatsappBtnContact) {
        whatsappBtnContact.href = whatsappUrl;
        whatsappBtnContact.target = '_blank';
        whatsappBtnContact.rel = 'noopener noreferrer';
    }
}

// Función para manejar el formulario de contacto
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // ⚠️ CONFIGURACIÓN DE EMAILJS
    // 1. Crea una cuenta en https://www.emailjs.com/ (es gratis)
    // 2. Crea un servicio de email (Gmail, Outlook, etc.)
    // 3. Crea un template de email
    // 4. Reemplaza estos valores con los tuyos:
    const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY'; // 🔴 CAMBIAR: Tu Public Key de EmailJS
    const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID'; // 🔴 CAMBIAR: Tu Service ID
    const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID'; // 🔴 CAMBIAR: Tu Template ID
    const TU_EMAIL = 'alexisallendez04@gmail.com'; // 🔴 Tu email donde quieres recibir los mensajes
    
    // Inicializar EmailJS (solo si está configurado)
    if (EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const profesion = document.getElementById('profesion').value;
        const instagram = document.getElementById('instagram').value;
        const whatsapp = document.getElementById('whatsapp').value;
        
        // Construir mensaje para WhatsApp
        let mensaje = `Hola Alexis, quiero mi web profesional.\n\n`;
        mensaje += `Nombre: ${nombre}\n`;
        mensaje += `Profesión: ${profesion}\n`;
        if (instagram) {
            mensaje += `Instagram: ${instagram}\n`;
        }
        mensaje += `WhatsApp: ${whatsapp}`;
        
        const phoneNumber = '542664022762'; // 🔴 CAMBIAR ESTO
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
        
        // Enviar por EmailJS (solo si está configurado)
        if (EMAILJS_PUBLIC_KEY !== 'TU_PUBLIC_KEY') {
            const templateParams = {
                from_name: nombre,
                from_profesion: profesion,
                from_instagram: instagram || 'No proporcionado',
                from_whatsapp: whatsapp,
                to_email: TU_EMAIL,
                message: `Nuevo contacto desde la web:\n\nNombre: ${nombre}\nProfesión: ${profesion}\nInstagram: ${instagram || 'No proporcionado'}\nWhatsApp: ${whatsapp}`
            };
            
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
                .then(function(response) {
                    console.log('Email enviado exitosamente!', response.status, response.text);
                    // Mostrar mensaje de éxito
                    showFormMessage('¡Mensaje enviado! Te contactaré pronto.', 'success');
                }, function(error) {
                    console.log('Error al enviar email:', error);
                    // Mostrar mensaje de error pero aún así abrir WhatsApp
                    showFormMessage('Hubo un error al enviar el email, pero puedes contactarme por WhatsApp.', 'error');
                });
        }
        
        // Abrir WhatsApp (siempre se abre)
        window.open(whatsappUrl, '_blank');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// Función para mostrar mensajes en el formulario
function showFormMessage(message, type) {
    const formWrapper = document.querySelector('.contact-form-wrapper');
    if (!formWrapper) return;
    
    // Remover mensaje anterior si existe
    const existingMessage = formWrapper.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Crear nuevo mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;
    formWrapper.insertBefore(messageDiv, formWrapper.firstChild);
    
    // Remover mensaje después de 5 segundos
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Función para animar elementos al hacer scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar todas las cards y secciones
    const elementsToAnimate = document.querySelectorAll(
        '.demo-card, .step-card, .benefit-card, .testimonial-card, .offer-card, .contact-card, .section-title, .section-subtitle'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px) scale(0.95)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Animación especial para secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, { threshold: 0.2 });
        sectionObserver.observe(section);
    });
}

// Función para manejar la carga de la imagen de perfil
function setupProfileImage() {
    const profileImage = document.getElementById('profileImage');
    const imagePlaceholder = document.getElementById('imagePlaceholder');
    const footerProfileImage = document.getElementById('footerProfileImage');
    const footerProfilePlaceholder = document.getElementById('footerProfilePlaceholder');
    
    // Imagen de perfil en footer
    if (footerProfileImage && footerProfilePlaceholder) {
        const img = new Image();
        img.onload = function() {
            footerProfileImage.src = img.src;
            footerProfileImage.classList.add('loaded');
            footerProfilePlaceholder.classList.add('hidden');
        };
        
        img.onerror = function() {
            footerProfileImage.classList.remove('loaded');
            footerProfilePlaceholder.classList.remove('hidden');
        };
        
        img.src = footerProfileImage.getAttribute('src') || 'images/foto-perfil.jpg';
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    renderDemos();
    setupWhatsAppButton();
    setupProfileImage();
    setupNavbar();
    animateOnScroll();
    setupContactForm();
    
    // Smooth scroll para los enlaces internos
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
});
