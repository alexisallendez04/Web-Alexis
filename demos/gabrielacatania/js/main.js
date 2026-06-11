const WHATSAPP_NUMBER = "5492254585248";
const WHATSAPP_DEFAULT_MSG =
  "Hola, Gabriela. Quiero consultarte sobre un asunto legal. ¿Podemos coordinar una primera orientación?";
const LAWYER_NAME = "Gabriela Catania";
const INSTAGRAM_URL = "https://www.instagram.com/abogadagabrielacatania/";

const PRACTICE_AREA_MAP = {
  "Derecho Laboral": "Consultoría General",
  "Accidentes de Tránsito": "Daños y Perjuicios",
  "Derecho de Familia": "Consultoría General",
  "Divorcios": "Consultoría General",
  "Otro": "Consultoría General",
};

const MOTION = {
  staggerStep: 0.09,
  staggerMax: 0.48,
  revealThreshold: 0.14,
  revealRootMargin: "0px 0px -8% 0px",
};

document.addEventListener("DOMContentLoaded", () => {
  initHeroImage();
  initPageLoad();
  initWhatsAppLinks();
  initSocialLinks();
  initNavbar();
  initFloatingWhatsApp();
  initScrollReveal();
  equalizeCaseCards();
  initCasesCarousel();
  initContactForm();
  initPracticeAreaLinks();
});

if (document.fonts?.ready) {
  document.fonts.ready.then(equalizeCaseCards);
}

window.addEventListener("resize", equalizeCaseCards);

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function initHeroImage() {
  const img = document.querySelector(".hero-header__bg-img");
  const markReady = () => document.body.classList.add("is-hero-ready");

  if (!img) {
    markReady();
    return;
  }

  if (img.complete && img.naturalWidth > 0) {
    markReady();
    return;
  }

  img.addEventListener("load", markReady, { once: true });
  img.addEventListener("error", markReady, { once: true });
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

function openWhatsAppChat(message) {
  const text = encodeURIComponent(message);
  const isMobile = /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const base = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
  window.open(base + "?phone=" + WHATSAPP_NUMBER + "&text=" + text, "_blank", "noopener,noreferrer");
}

function buildConsultationMessage({ nombre, area, consulta }) {
  return [
    "Hola Dra. " + LAWYER_NAME + ", quisiera realizar una consulta.",
    "",
    "Nombre: " + nombre,
    "",
    "Área de consulta: " + area,
    "",
    "Consulta:",
    consulta,
  ].join("\n");
}

function initWhatsAppLinks() {
  const url = getWhatsAppUrl(WHATSAPP_DEFAULT_MSG);

  document.querySelectorAll(".js-whatsapp-direct").forEach((link) => {
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
}

function initSocialLinks() {
  const instagram = document.querySelector(".js-social-instagram");

  if (instagram) {
    instagram.href = INSTAGRAM_URL;
    instagram.target = "_blank";
    instagram.rel = "noopener noreferrer";
  }
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const navToggler = document.getElementById("navToggler");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".navbar-menu__link[href^='#']");

  if (!navbar || !navToggler || !navMenu) return;

  let ticking = false;
  const scrollThreshold = 56;
  const sectionIds = ["situaciones", "areas", "autoridad", "faq", "contacto"];

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
  const isMobile = window.matchMedia("(max-width: 767.98px)").matches;

  const singles = document.querySelectorAll(
    ".cta-band, .cases-carousel, .studio-coverage, .faq-cta, .contact-trust, .contact-section__header, .about-portrait"
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
      threshold: isMobile ? 0.05 : MOTION.revealThreshold,
      rootMargin: isMobile ? "0px 0px 2% 0px" : MOTION.revealRootMargin,
    }
  );

  observeTargets.forEach((el) => observer.observe(el));

  if (isMobile) {
    window.setTimeout(() => {
      observeTargets.forEach((el) => el.classList.add("is-visible"));
    }, 1200);
  }
}

function initPracticeAreaLinks() {
  const areaSelect = document.getElementById("area");
  if (!areaSelect) return;

  const setArea = (value) => {
    const mapped = PRACTICE_AREA_MAP[value] || value;
    const hasOption = Array.from(areaSelect.options).some((opt) => opt.value === mapped);
    if (hasOption) areaSelect.value = mapped;
    areaSelect.dispatchEvent(new Event("change", { bubbles: true }));
  };

  document.querySelectorAll(".practice-card__link[data-area]").forEach((link) => {
    link.addEventListener("click", () => setArea(link.dataset.area));
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmit");
  const fieldIds = ["nombre", "area", "consulta"];

  if (!form || !submitBtn) return;

  const getField = (id) => document.getElementById(id);

  const isFormComplete = () =>
    fieldIds.every((id) => {
      const el = getField(id);
      return el && el.value.trim() !== "";
    });

  const updateSubmitState = () => {
    submitBtn.disabled = !isFormComplete();
  };

  const validateForm = () => {
    let valid = true;

    fieldIds.forEach((id) => {
      const el = getField(id);
      const isEmpty = !el.value.trim();
      el.classList.toggle("is-invalid", isEmpty);
      if (isEmpty) valid = false;
    });

    return valid;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    openWhatsAppChat(
      buildConsultationMessage({
        nombre: getField("nombre").value.trim(),
        area: getField("area").value,
        consulta: getField("consulta").value.trim(),
      })
    );
  });

  fieldIds.forEach((id) => {
    const el = getField(id);
    if (!el) return;

    const clearError = () => {
      if (el.value.trim()) el.classList.remove("is-invalid");
      updateSubmitState();
    };

    el.addEventListener("input", clearError);
    el.addEventListener("change", clearError);
  });

  updateSubmitState();
}

const CASES_AUTOPLAY_PX_PER_SEC = 48;

function equalizeCaseCards() {
  const track = document.getElementById("casesTrack");
  if (!track) return;

  const sourceGroup = track.querySelector('.cases-slider__group:not([aria-hidden="true"])');
  if (!sourceGroup) return;

  const allCards = track.querySelectorAll(".case-card");
  const allQuotes = track.querySelectorAll(".case-card__quote");
  const allResults = track.querySelectorAll(".case-card__result");

  allCards.forEach((card) => {
    card.style.minHeight = "";
  });
  allQuotes.forEach((el) => {
    el.style.minHeight = "";
  });
  allResults.forEach((el) => {
    el.style.minHeight = "";
  });

  const sourceCards = sourceGroup.querySelectorAll(".case-card");
  let maxQuoteHeight = 0;
  let maxResultHeight = 0;

  sourceCards.forEach((card) => {
    const quote = card.querySelector(".case-card__quote");
    const result = card.querySelector(".case-card__result");
    if (quote) maxQuoteHeight = Math.max(maxQuoteHeight, quote.offsetHeight);
    if (result) maxResultHeight = Math.max(maxResultHeight, result.offsetHeight);
  });

  if (maxQuoteHeight > 0) {
    allQuotes.forEach((el) => {
      el.style.minHeight = maxQuoteHeight + "px";
    });
  }

  if (maxResultHeight > 0) {
    allResults.forEach((el) => {
      el.style.minHeight = maxResultHeight + "px";
    });
  }

  let maxCardHeight = 0;
  sourceCards.forEach((card) => {
    maxCardHeight = Math.max(maxCardHeight, card.offsetHeight);
  });

  if (maxCardHeight > 0) {
    allCards.forEach((card) => {
      card.style.minHeight = maxCardHeight + "px";
    });
  }
}

function initCasesCarousel() {
  const track = document.getElementById("casesTrack");
  const slider = document.getElementById("casesSlider");
  const prevBtn = document.getElementById("casesPrev");
  const nextBtn = document.getElementById("casesNext");

  if (!track || prefersReducedMotion()) {
    return;
  }

  let offset = 0;
  let paused = false;
  let halfWidth = 0;
  let lastTime = 0;
  let resumeTimer = null;
  let rafId = null;

  const measure = () => {
    equalizeCaseCards();
    halfWidth = track.scrollWidth / 2;
    if (offset >= halfWidth && halfWidth > 0) offset -= halfWidth;
    applyTransform();
  };

  const applyTransform = () => {
    track.style.transform = "translate3d(-" + offset + "px, 0, 0)";
  };

  const tick = (time) => {
    if (!lastTime) lastTime = time;
    const delta = (time - lastTime) / 1000;
    lastTime = time;

    if (!paused && halfWidth > 0) {
      offset += CASES_AUTOPLAY_PX_PER_SEC * delta;
      if (offset >= halfWidth) offset -= halfWidth;
      applyTransform();
    }

    rafId = requestAnimationFrame(tick);
  };

  const pause = () => {
    paused = true;
  };

  const resume = () => {
    paused = false;
    lastTime = 0;
  };

  const pauseTemporarily = () => {
    pause();
    clearTimeout(resumeTimer);
    resumeTimer = window.setTimeout(resume, 4500);
  };

  const getStep = () => {
    const card = track.querySelector(".case-card");
    if (!card) return 364;
    const group = track.querySelector(".cases-slider__group");
    const gap = group ? parseFloat(getComputedStyle(group).gap) || 24 : 24;
    return card.offsetWidth + gap;
  };

  const nudge = (direction) => {
    measure();
    offset = (offset + direction * getStep() + halfWidth) % halfWidth;
    applyTransform();
    pauseTemporarily();
  };

  slider?.addEventListener("mouseenter", pause);
  slider?.addEventListener("mouseleave", resume);
  slider?.addEventListener("focusin", pause);
  slider?.addEventListener("focusout", (event) => {
    if (slider.contains(event.relatedTarget)) return;
    resume();
  });

  prevBtn?.addEventListener("click", () => nudge(-1));
  nextBtn?.addEventListener("click", () => nudge(1));

  window.addEventListener("resize", measure);
  measure();
  rafId = requestAnimationFrame(tick);
}
