(() => {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Scroll: header background ── */
  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 20);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  const closeMenu = () => {
    menuToggle?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (!menuToggle?.classList.contains("is-open")) {
        mobileNav?.setAttribute("hidden", "");
      }
    }, 700);
  };

  const openMenu = () => {
    menuToggle?.classList.add("is-open");
    menuToggle?.setAttribute("aria-expanded", "true");
    mobileNav?.removeAttribute("hidden");
    requestAnimationFrame(() => mobileNav?.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ── Smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const offset = header?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      closeMenu();
    });
  });

  /* ── Reveal on scroll ── */
  const revealTargets = document.querySelectorAll(".reveal, .reveal-stagger");

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ── External links ── */
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    if (!link.rel.includes("noopener")) {
      link.rel = "noopener noreferrer";
    }
  });

  /* ── WhatsApp flotante ── */
  const whatsappFloat = document.getElementById("whatsappFloat");
  if (whatsappFloat) {
    const show = () => whatsappFloat.classList.add("is-visible");

    if (prefersReducedMotion) {
      show();
    } else {
      setTimeout(show, 1200);
    }
  }
})();
