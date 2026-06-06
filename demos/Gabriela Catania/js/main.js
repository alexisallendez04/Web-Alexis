/* ── Configuración: reemplace con el número real de WhatsApp ── */
const WHATSAPP_NUMBER = "549XXXXXXXXXX";
const WHATSAPP_DEFAULT_MSG = "Hola, quiero realizar una consulta legal.";

const MOTION = {
  staggerStep: 0.09,
  staggerMax: 0.48,
  revealThreshold: 0.14,
  revealRootMargin: "0px 0px -8% 0px",
};

document.addEventListener("DOMContentLoaded", () => {
  initPageLoad();
  initWhatsAppLinks();
  initNavbar();
  initFloatingWhatsApp();
  initScrollReveal();
  initContactForm();
  initPracticeAreaLinks();
});

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initPageLoad() {
  if (prefersReducedMotion()) {
    document.body.classList.add("is-page-loaded");
    return;
  }

  requestAnimationFrame(() => {
    document.body.classList.add("is-page-loaded");
  });
}

function getWhatsAppUrl(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

function initWhatsAppLinks() {
  const url = getWhatsAppUrl(WHATSAPP_DEFAULT_MSG);

  document.querySelectorAll(".js-whatsapp-direct").forEach((link) => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggler = document.getElementById("navToggler");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".navbar-menu__link[href^='#']");

  if (!navbar || !navToggler || !navMenu) return;

  let ticking = false;
  const scrollThreshold = 56;
  const sectionIds = ["areas", "solucion", "testimonios", "autoridad", "faq", "contacto"];

  const syncNavHeight = () => {
    document.documentElement.style.setProperty("--nav-height", navbar.offsetHeight + "px");
  };

  const setActiveLink = () => {
    const scrollPos = window.scrollY + navbar.offsetHeight + 48;
    let currentId = "";

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) {
        currentId = id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("navbar-menu__link--active", href === currentId);
    });
  };

  const setMenuOpen = (isOpen) => {
    document.body.classList.toggle("nav-menu-open", isOpen);
    if (isOpen) syncNavHeight();
  };

  const updateNavbar = () => {
    const isCompact = window.scrollY > scrollThreshold;
    navbar.classList.toggle("scrolled", isCompact);
    setActiveLink();
    syncNavHeight();
    ticking = false;
  };

  const resizeObserver = new ResizeObserver(syncNavHeight);
  resizeObserver.observe(navbar);

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();

  document.getElementById("logoHome")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    closeMobileMenu(navMenu, navToggler, setMenuOpen);
  });

  navToggler.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggler.classList.toggle("active", isOpen);
    navToggler.setAttribute("aria-expanded", isOpen);
    navToggler.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    setMenuOpen(isOpen);
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMobileMenu(navMenu, navToggler, setMenuOpen));
  });

  window.addEventListener("resize", () => {
    updateNavbar();
    syncNavHeight();
    if (window.innerWidth >= 992) {
      closeMobileMenu(navMenu, navToggler, setMenuOpen);
    }
  });
}

function closeMobileMenu(navMenu, navToggler, setMenuOpen) {
  navMenu.classList.remove("open");
  navToggler.classList.remove("active");
  navToggler.setAttribute("aria-expanded", "false");
  navToggler.setAttribute("aria-label", "Abrir menú");
  if (setMenuOpen) setMenuOpen(false);
  else document.body.classList.remove("nav-menu-open");
}

function initFloatingWhatsApp() {
  const floatBtn = document.getElementById("whatsappFloat");
  if (!floatBtn) return;

  const showAfter = 320;
  let visible = false;

  const toggleVisibility = () => {
    const shouldShow = window.scrollY > showAfter;
    if (shouldShow === visible) return;
    visible = shouldShow;
    floatBtn.classList.toggle("is-visible", shouldShow);
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();
}

function applyStaggerDelays(container) {
  Array.from(container.children).forEach((child, index) => {
    const delay = Math.min(index * MOTION.staggerStep, MOTION.staggerMax);
    child.style.transitionDelay = delay + "s";
  });
}

function initScrollReveal() {
  const reduced = prefersReducedMotion();

  const singles = document.querySelectorAll(
    ".cta-band, .cases-slider, .studio-coverage, .faq-cta, .contact-trust, .contact-section__header"
  );

  const staggers = document.querySelectorAll(".reveal-stagger");
  const headers = document.querySelectorAll(".section-header");
  const pauseInner = document.querySelector(".visual-pause__inner");
  const contactCard = document.querySelector(".contact-card");
  const faqItems = document.querySelectorAll(".faq-accordion .accordion-item");

  singles.forEach((el) => el.classList.add("reveal"));
  if (contactCard) contactCard.classList.add("reveal");
  faqItems.forEach((el) => el.classList.add("reveal"));

  /* visual-pause: animación por hijos vía .visual-pause__inner.is-visible */

  const casesSlider = document.querySelector(".cases-slider");
  if (casesSlider) {
    casesSlider.classList.remove("reveal");
    casesSlider.classList.add("reveal-fade");
  }

  staggers.forEach((el) => {
    el.classList.add("reveal-stagger");
    if (!reduced) applyStaggerDelays(el);
  });

  headers.forEach((el) => el.classList.add("reveal"));

  const observeTargets = [
    ...singles,
    ...staggers,
    ...headers,
    ...(pauseInner ? [pauseInner] : []),
    ...(contactCard ? [contactCard] : []),
    ...faqItems,
  ];

  if (reduced) {
    observeTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: MOTION.revealThreshold,
      rootMargin: MOTION.revealRootMargin,
    }
  );

  observeTargets.forEach((el) => observer.observe(el));
}

function initPracticeAreaLinks() {
  const areaSelect = document.getElementById("area");
  if (!areaSelect) return;

  const setArea = (value) => {
    const hasOption = Array.from(areaSelect.options).some((opt) => opt.value === value);
    if (hasOption) areaSelect.value = value;
  };

  document.querySelectorAll(".practice-card__link[data-area]").forEach((link) => {
    link.addEventListener("click", () => setArea(link.dataset.area));
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const fields = ["nombre", "telefono", "area", "mensaje"];

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    fields.forEach((id) => {
      const el = document.getElementById(id);
      const isEmpty = !el.value.trim();
      el.classList.toggle("is-invalid", isEmpty);
      if (isEmpty) valid = false;
    });

    if (!valid) return;

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const area = document.getElementById("area").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    const text = [
      "Hola, Gabriela. Quiero iniciar una consulta.",
      "",
      "Nombre: " + nombre,
      "Teléfono: " + telefono,
      "Área: " + area,
      "",
      "Consulta:",
      mensaje,
    ].join("\n");

    window.open(getWhatsAppUrl(text), "_blank", "noopener,noreferrer");
  });

  fields.forEach((id) => {
    document.getElementById(id)?.addEventListener("input", function () {
      if (this.value.trim()) this.classList.remove("is-invalid");
    });
  });
}
