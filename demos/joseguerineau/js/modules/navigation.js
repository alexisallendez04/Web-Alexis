import { SITE } from "../config.js";

export function initSocialLinks() {
  const container = document.getElementById("footer-social");
  if (!container || !SITE.social?.linkedin) return;

  container.innerHTML = `
    <p class="site-footer__label">Redes</p>
    <a href="${SITE.social.linkedin}" class="site-footer__link" target="_blank" rel="noopener noreferrer">LinkedIn de José</a>
  `;
}

const SECTION_IDS = [
  "inicio",
  "problema",
  "servicios",
  "diferenciales",
  "testimonios",
  "proceso",
  "sobre",
  "faq",
  "contacto",
];

export function initWhatsAppLinks() {
  const phone = SITE.contact.whatsapp;
  const defaultMessage = SITE.contact.whatsappMessage;
  const displayPhone = SITE.contact.phone;

  document.querySelectorAll("[data-wa]").forEach((el) => {
    const message = el.dataset.waMessage?.trim() || defaultMessage;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    el.href = url;
    if (el.tagName === "A") {
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  const footerPhone = document.getElementById("footer-phone");
  if (footerPhone && displayPhone) {
    footerPhone.textContent = displayPhone;
  }
}

export function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMenu = () => {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navMobile.classList.remove("is-open");
    navMobile.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    navMobile.classList.add("is-open");
    navMobile.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    navToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  navMobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });

  const setActiveLink = () => {
    const offset = (navbar?.offsetHeight ?? 88) + 32;
    const scrollPos = window.scrollY + offset;
    let current = "inicio";

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", href === current);
    });
  };

  const onScroll = () => {
    navbar?.classList.toggle("is-scrolled", window.scrollY > 10);
    setActiveLink();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        (navbar?.offsetHeight ?? 88);

      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  });
}

export function initWhatsAppFloat() {
  const btn = document.getElementById("waFloat");
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle("is-visible", window.scrollY > 200);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}
