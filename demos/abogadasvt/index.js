// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Set initial state
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll('.lawyer-card, .service-block, .feature-card, .contact-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// WhatsApp button click tracking (optional - for analytics)
document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
    button.addEventListener('click', function() {
        // You can add analytics tracking here
        console.log('WhatsApp button clicked');
    });
});

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                nombre: document.getElementById('nombre').value,
                telefono: document.getElementById('telefono').value,
                email: document.getElementById('email').value,
                asunto: document.getElementById('asunto').value,
                mensaje: document.getElementById('mensaje').value
            };
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success message
                formMessage.className = 'alert alert-success';
                formMessage.textContent = '¡Gracias! Tu consulta ha sido enviada. Nos pondremos en contacto contigo pronto.';
                formMessage.classList.remove('d-none');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.classList.add('d-none');
                }, 5000);
                
                // In a real implementation, you would send the data to your server:
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // })
                // .then(response => response.json())
                // .then(data => {
                //     // Handle success
                // })
                // .catch(error => {
                //     // Handle error
                // });
            }, 1500);
        });
    }
});

