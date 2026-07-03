import { SITE } from "./config.js";

export function initNavigation() {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const sectionIds = ["inicio", "especialidades", "nosotros", "proceso", "casos", "faq", "contacto"];

  const closeMobileMenu = () => {
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Abrir menú");
    navMobile?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  const openMobileMenu = () => {
    navToggle?.setAttribute("aria-expanded", "true");
    navToggle?.setAttribute("aria-label", "Cerrar menú");
    navMobile?.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    isOpen ? closeMobileMenu() : openMobileMenu();
  });

  navMobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMobileMenu();
  });

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);

    const scrollPos = window.scrollY + (header?.offsetHeight ?? 80) + 48;
    let currentId = "inicio";

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= scrollPos) currentId = id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      link.classList.toggle("is-active", href === currentId);
    });
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
      const offset = header?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  });
}

export function initWhatsAppFloat() {
  const float = document.getElementById("whatsappFloat");
  if (!float) return;

  const url = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(SITE.contact.whatsappMessage)}`;
  float.href = url;
  float.target = "_blank";
  float.rel = "noopener noreferrer";

  let visible = false;
  const showAfter = 400;

  const toggle = () => {
    const shouldShow = window.scrollY > showAfter;
    if (shouldShow === visible) return;
    visible = shouldShow;
    float.classList.toggle("is-visible", shouldShow);
  };

  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}
