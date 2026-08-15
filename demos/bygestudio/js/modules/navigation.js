import { SITE } from "../config.js";

const SECTION_IDS = ["inicio", "quienes-somos", "servicios", "contacto"];

export function getWhatsAppUrl(message) {
  const number = SITE.contact.whatsapp?.trim();
  if (!number) return "";
  const text = message || SITE.contact.whatsappMessage;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function initWhatsAppLinks() {
  const url = getWhatsAppUrl();
  const email = SITE.contact.email?.trim();

  document.querySelectorAll("[data-wa]").forEach((el) => {
    if (!url) {
      el.setAttribute("href", "#contacto");
      el.removeAttribute("target");
      return;
    }

    el.href = url;
    if (el.tagName === "A") {
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  const waBlock = document.querySelector("[data-wa-block]");
  if (waBlock) waBlock.hidden = false;

  const emailBlock = document.querySelector("[data-email-block]");
  const emailLink = document.getElementById("contactEmail");
  if (email && emailBlock && emailLink) {
    emailBlock.hidden = false;
    emailLink.href = `mailto:${email}`;
    emailLink.textContent = email;
  }
}

export function initNavigation() {
  const nav = document.getElementById("navbar");
  const toggle = document.getElementById("navToggle");
  const mobile = document.getElementById("navMobile");
  const links = document.querySelectorAll("[data-nav-link]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const closeMenu = () => {
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.setAttribute("aria-label", "Abrir menú");
    mobile?.classList.remove("is-open");
    mobile?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    toggle?.setAttribute("aria-expanded", "true");
    toggle?.setAttribute("aria-label", "Cerrar menú");
    mobile?.classList.add("is-open");
    mobile?.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
  };

  toggle?.addEventListener("click", () => {
    toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  mobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });

  const setActive = () => {
    const offset = (nav?.offsetHeight ?? 72) + 24;
    const pos = window.scrollY + offset;
    let current = "inicio";

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= pos) current = id;
    });

    links.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      const active = href === current;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  const onScroll = () => {
    nav?.classList.toggle("is-scrolled", window.scrollY > 12);
    setActive();
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
        (nav?.offsetHeight ?? 72);

      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  });
}
