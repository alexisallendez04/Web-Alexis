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
// CALIFICACIÓN DE LEAD (debe coincidir con index.html: #leadQualifierModal, #leadStep1…)
// ============================================

const WHATSAPP_PHONE = '5215551234567';

const LEAD_Q1_LABELS = {
    contratos: 'Contratos o negociación de contratos',
    civil_mercantil: 'Litigio civil o mercantil',
    representacion: 'Representación / juicios',
    tramites: 'Trámites y regularizaciones',
    empresarial: 'Asesoría empresarial o societaria',
    otro_area: 'Penal, familia, laboral o migratorio',
    otro_general: 'Otro tema no listado'
};

const LEAD_Q2_LABELS = {
    hechos_plazo: 'Hechos claros y/o plazo o audiencia',
    pronto: 'Necesito avanzar en días o semanas',
    preventivo: 'Asesoría preventiva sin conflicto abierto',
    solo_info: 'Solo información general, sin caso aún'
};

const LEAD_Q3_LABELS = {
    tj_presencial: 'Cita presencial en Tijuana',
    mixta: 'Mixta: TJ + seguimiento remoto',
    remota_contratos: 'Principalmente remota (contratos / documentos)',
    fuera_bc: 'Todo presencial fuera de Tijuana / BC'
};

function leadDisqualifyReason(state) {
    if (state.q1 === 'otro_area' || state.q1 === 'otro_general') return 'area';
    if (state.q2 === 'solo_info') return 'intencion';
    if (state.q3 === 'fuera_bc') return 'lugar';
    return null;
}

function leadThanksCopy(reason) {
    if (reason === 'area') {
        return 'Por el tipo de materia que seleccionaste, no somos la opción adecuada desde este despacho. Te agradecemos el contacto y te sugerimos acudir a un abogado especialista en esa área o a los servicios de orientación de tu localidad.';
    }
    if (reason === 'intencion') {
        return 'En este canal priorizamos casos con hechos o plazos concretos para poder ayudarte bien. Gracias por tu interés: cuando tengas definido el asunto, podés volver a hacer la evaluación.';
    }
    if (reason === 'lugar') {
        return 'Nuestro trabajo se concentra en Tijuana y Baja California (con posibilidad de partes del trámite en remoto). Para representación presencial en otra entidad, te conviene un despacho local. Gracias por tu tiempo.';
    }
    return 'Gracias por tu interés. En este momento no podemos continuar por este canal.';
}

function leadBuildWhatsAppBody(state, nombre, telefono, detalle) {
    return [
        'Hola, completé la evaluación en la web y quiero coordinar el siguiente paso.',
        '',
        `Nombre: ${nombre}`,
        `WhatsApp / teléfono: ${telefono}`,
        '',
        '— Respuestas —',
        `1) Asunto: ${LEAD_Q1_LABELS[state.q1] || state.q1}`,
        `2) Etapa: ${LEAD_Q2_LABELS[state.q2] || state.q2}`,
        `3) Modalidad: ${LEAD_Q3_LABELS[state.q3] || state.q3}`,
        '',
        'Detalle breve:',
        detalle
    ].join('\n');
}

(function initLeadQualifier() {
    const modalEl = document.getElementById('leadQualifierModal');
    if (!modalEl || typeof bootstrap === 'undefined') return;

    const modal = new bootstrap.Modal(modalEl);
    const progressBar = document.getElementById('leadQualifierProgressBar');
    const backBtn = document.getElementById('leadBackBtn');
    const thanksEl = document.getElementById('leadThanksMessage');
    const footer = document.getElementById('leadQualifierFooter');
    const qualifiedForm = document.getElementById('leadQualifiedForm');

    const panels = {
        1: document.getElementById('leadStep1'),
        2: document.getElementById('leadStep2'),
        3: document.getElementById('leadStep3'),
        qualified: document.getElementById('leadStepQualified'),
        thanks: document.getElementById('leadStepThanks')
    };

    const state = { q1: null, q2: null, q3: null };

    function setProgress(stepIndex) {
        const pct = stepIndex <= 1 ? 12 : stepIndex === 2 ? 45 : stepIndex === 3 ? 78 : 100;
        if (progressBar) {
            progressBar.style.width = pct + '%';
            const wrap = progressBar.closest('.lead-qualifier-progress');
            if (wrap) wrap.setAttribute('aria-valuenow', String(pct));
        }
    }

    function showOnly(panelKey) {
        const active = String(panelKey);
        Object.entries(panels).forEach(([key, el]) => {
            if (!el) return;
            el.classList.toggle('d-none', key !== active);
        });
        backBtn?.classList.toggle('d-none', active === '1' || active === 'thanks');
        footer?.classList.toggle('d-none', active === 'thanks');

        if (active === '1') setProgress(1);
        else if (active === '2') setProgress(2);
        else if (active === '3') setProgress(3);
        else setProgress(4);
    }

    function resetFlow() {
        state.q1 = state.q2 = state.q3 = null;
        qualifiedForm?.reset();
        showOnly(1);
    }

    function openQualifier() {
        resetFlow();
        modal.show();
    }

    document.querySelectorAll('.js-open-lead-qualifier').forEach((el) => {
        el.addEventListener('click', () => openQualifier());
    });

    const floatBtn = document.getElementById('whatsappFloat');
    if (floatBtn) {
        floatBtn.addEventListener('click', () => openQualifier());
    }

    modalEl.addEventListener('hidden.bs.modal', () => resetFlow());

    document.querySelectorAll('#leadStep1 [data-q1]').forEach((btn) => {
        btn.addEventListener('click', () => {
            state.q1 = btn.getAttribute('data-q1');
            showOnly(2);
        });
    });

    document.querySelectorAll('#leadStep2 [data-q2]').forEach((btn) => {
        btn.addEventListener('click', () => {
            state.q2 = btn.getAttribute('data-q2');
            showOnly(3);
        });
    });

    document.querySelectorAll('#leadStep3 [data-q3]').forEach((btn) => {
        btn.addEventListener('click', () => {
            state.q3 = btn.getAttribute('data-q3');
            const reason = leadDisqualifyReason(state);
            if (reason) {
                if (thanksEl) thanksEl.textContent = leadThanksCopy(reason);
                showOnly('thanks');
            } else {
                showOnly('qualified');
            }
        });
    });

    backBtn?.addEventListener('click', () => {
        const visible = Object.entries(panels).find(([, el]) => el && !el.classList.contains('d-none'));
        const key = visible ? visible[0] : null;
        if (key === '2') showOnly(1);
        else if (key === '3') showOnly(2);
        else if (key === 'qualified') showOnly(3);
    });

    const leadFormFeedback = document.getElementById('leadFormFeedback');

    function showLeadFormError(msg) {
        if (!leadFormFeedback) return;
        leadFormFeedback.textContent = msg;
        leadFormFeedback.classList.remove('d-none');
    }

    function clearLeadFormError() {
        if (!leadFormFeedback) return;
        leadFormFeedback.textContent = '';
        leadFormFeedback.classList.add('d-none');
    }

    function phoneDigitsOnly(phone) {
        return String(phone).replace(/\D/g, '');
    }

    function openWhatsAppWithText(body) {
        const waUrl =
            'https://api.whatsapp.com/send?phone=' +
            WHATSAPP_PHONE +
            '&text=' +
            encodeURIComponent(body);

        const newTab = window.open(waUrl, '_blank', 'noopener,noreferrer');
        if (newTab) {
            modal.hide();
            return;
        }

        modal.hide();
        window.location.assign(waUrl);
    }

    qualifiedForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        clearLeadFormError();

        const nombre = document.getElementById('leadNombre')?.value.trim();
        const telefonoRaw = document.getElementById('leadTelefono')?.value.trim();
        const detalle = document.getElementById('leadDetalle')?.value.trim();
        const telefonoDigits = phoneDigitsOnly(telefonoRaw);

        if (!nombre || !telefonoRaw || !detalle) {
            showLeadFormError('Completá los tres campos para continuar a WhatsApp.');
            return;
        }
        if (telefonoDigits.length < 10) {
            showLeadFormError('Ingresá un número válido con código de país o local (al menos 10 dígitos).');
            return;
        }

        const body = leadBuildWhatsAppBody(state, nombre, telefonoRaw, detalle);

        openWhatsAppWithText(body);
    });
})();

// ============================================
// BOTÓN SCROLL TO TOP
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (!scrollToTopBtn) return;
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

