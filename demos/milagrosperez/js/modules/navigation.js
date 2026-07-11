import { SITE } from "../config.js";

const SECTION_IDS = ["inicio", "problema", "solucion", "servicios", "proceso", "quien-esta", "testimonios", "faq", "contacto"];

const MOBILE_MENU_HIDDEN = [
  "translate-y-[-110%]",
  "opacity-0",
  "invisible",
  "pointer-events-none",
];

const MOBILE_MENU_VISIBLE = [
  "translate-y-0",
  "opacity-100",
  "visible",
  "pointer-events-auto",
];

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function initWhatsAppLinks() {
  const url = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(SITE.contact.whatsappMessage)}`;
  const externalLabel = "Consultar con Milagros Perez (se abre en una nueva pestaña)";

  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.href = url;
    if (el.tagName === "A") {
      el.target = "_blank";
      el.rel = "noopener noreferrer";
      if (!el.getAttribute("aria-label")) {
        el.setAttribute("aria-label", externalLabel);
      }
    }
  });
}

export function initNavigation() {
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMobile = document.getElementById("navMobile");
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let lastFocusedBeforeMenu = null;

  const getFocusableInMenu = () =>
    navMobile ? [...navMobile.querySelectorAll(FOCUSABLE)] : [];

  const trapFocus = (e) => {
    if (!navMobile || navMobile.getAttribute("aria-hidden") === "true") return;

    const focusable = getFocusableInMenu();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const closeMenu = () => {
    if (!navToggle || !navMobile) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navMobile.classList.add(...MOBILE_MENU_HIDDEN);
    navMobile.classList.remove(...MOBILE_MENU_VISIBLE);
    navMobile.setAttribute("aria-hidden", "true");
    document.body.classList.remove("nav-open");
    document.removeEventListener("keydown", trapFocus);

    if (lastFocusedBeforeMenu instanceof HTMLElement) {
      lastFocusedBeforeMenu.focus();
      lastFocusedBeforeMenu = null;
    }
  };

  const openMenu = () => {
    if (!navToggle || !navMobile) return;
    lastFocusedBeforeMenu = document.activeElement;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    navMobile.classList.remove(...MOBILE_MENU_HIDDEN);
    navMobile.classList.add(...MOBILE_MENU_VISIBLE);
    navMobile.setAttribute("aria-hidden", "false");
    document.body.classList.add("nav-open");
    document.addEventListener("keydown", trapFocus);

    const focusable = getFocusableInMenu();
    focusable[0]?.focus();
  };

  navToggle?.addEventListener("click", () => {
    navToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle?.getAttribute("aria-expanded") === "true") {
      closeMenu();
    }
  });

  navMobile?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) closeMenu();
  });

  const setActiveLink = () => {
    const offset = (navbar?.offsetHeight ?? 72) + 32;
    const scrollPos = window.scrollY + offset;
    let current = "inicio";

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollPos) current = id;
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href")?.slice(1);
      const isActive = href === current;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
        link.classList.add("text-primary");
        link.classList.remove("text-muted");
      } else {
        link.removeAttribute("aria-current");
        if (link.classList.contains("nav-link")) {
          link.classList.remove("text-primary");
          link.classList.add("text-muted");
        }
      }
    });
  };

  const onScroll = () => {
    navbar?.classList.toggle("border-border", window.scrollY > 10);
    navbar?.classList.toggle("shadow-card", window.scrollY > 10);
    setActiveLink();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelector(".skip-link")?.addEventListener("click", () => {
    requestAnimationFrame(() => document.getElementById("main")?.focus());
  });

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
        (navbar?.offsetHeight ?? 72);

      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    });
  });
}

export function initWhatsAppFloat() {
  const btn = document.getElementById("waFloat");
  if (!btn) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const show = () => {
    const visible = window.scrollY > 200;
    btn.classList.toggle("opacity-100", visible);
    btn.classList.toggle("translate-y-0", visible);
    btn.classList.toggle("pointer-events-auto", visible);
    btn.classList.toggle("opacity-0", !visible);
    btn.classList.toggle("translate-y-3", !visible);
    btn.classList.toggle("pointer-events-none", !visible);
    btn.classList.toggle("is-pulsing", visible && !reduced);
  };

  window.addEventListener("scroll", show, { passive: true });
  show();
}
