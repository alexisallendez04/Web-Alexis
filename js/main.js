(() => {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector(".hero");
  const root = document.documentElement;

  const clamp01 = (n) => Math.min(Math.max(n, 0), 1);

  /* ── Lenis smooth scroll ── */
  let lenis = null;

  const getScrollY = () => (lenis ? lenis.scroll : window.scrollY);

  const updateHeaderState = (y) => {
    const headerH = header?.offsetHeight ?? 88;
    const heroEnd = hero ? hero.offsetTop + hero.offsetHeight : headerH;
    const pastHero = y >= heroEnd - headerH - 12;
    header?.classList.toggle("is-scrolled", pastHero);
  };

  const applyScrollEffects = (y) => {
    updateHeaderState(y);

    const docHeight = Math.max(root.scrollHeight - window.innerHeight, 1);
    root.style.setProperty("--page-progress", clamp01(y / docHeight).toFixed(4));

    if (!hero || prefersReducedMotion) return;

    const heroTravel = Math.max(hero.offsetHeight * 1.05, 1);
    const raw = clamp01(y / heroTravel);
    const exit = 1 - Math.pow(1 - raw, 1.7);
    hero.style.setProperty("--hero-exit", exit.toFixed(4));
  };

  if (!prefersReducedMotion && typeof window.Lenis === "function") {
    lenis = new window.Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
      autoRaf: false,
    });

    lenis.on("scroll", ({ scroll }) => {
      applyScrollEffects(scroll);
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    root.classList.add("has-smooth-scroll");
  } else {
    const onNativeScroll = () => applyScrollEffects(window.scrollY);
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onNativeScroll, { passive: true });
  }

  applyScrollEffects(getScrollY());
  window.addEventListener("resize", () => applyScrollEffects(getScrollY()), {
    passive: true,
  });

  /* ── Mobile menu ── */
  const closeMenu = () => {
    menuToggle?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("is-open");
    header?.classList.remove("is-menu-open");
    document.body.style.overflow = "";
    lenis?.start();
    setTimeout(() => {
      if (!menuToggle?.classList.contains("is-open")) {
        mobileNav?.setAttribute("hidden", "");
      }
    }, 700);
  };

  const openMenu = () => {
    menuToggle?.classList.add("is-open");
    menuToggle?.setAttribute("aria-expanded", "true");
    header?.classList.add("is-menu-open");
    mobileNav?.removeAttribute("hidden");
    requestAnimationFrame(() => mobileNav?.classList.add("is-open"));
    document.body.style.overflow = "hidden";
    lenis?.stop();
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ── Anchor smooth scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      closeMenu();

      const offset = header?.offsetHeight ?? 72;

      if (lenis) {
        lenis.scrollTo(target, {
          offset: -offset,
          duration: 1.55,
          easing: (t) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
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
      { threshold: 0.22, rootMargin: "0px 0px -18% 0px" }
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

  /* ── Project panel tabs ── */
  const projectPanel = document.querySelector("[data-project-panel]");
  if (projectPanel) {
    const tabs = [...projectPanel.querySelectorAll("[data-project-tab]")];
    const views = [...projectPanel.querySelectorAll("[data-project-panel-view]")];

    const activateProject = (id, { focusTab = false } = {}) => {
      tabs.forEach((tab) => {
        const isActive = tab.dataset.projectTab === id;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
        if (isActive && focusTab) tab.focus();
      });

      views.forEach((view) => {
        const isActive = view.dataset.projectPanelView === id;
        view.classList.toggle("is-active", isActive);
        view.hidden = !isActive;
      });
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        activateProject(tab.dataset.projectTab);
      });

      tab.addEventListener("keydown", (e) => {
        const currentIndex = tabs.indexOf(tab);
        if (currentIndex < 0) return;

        let nextIndex = null;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          nextIndex = 0;
        } else if (e.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) return;
        e.preventDefault();
        activateProject(tabs[nextIndex].dataset.projectTab, { focusTab: true });
      });
    });
  }

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

  /* ── Logo 3D tilt ── */
  const logoLink = document.querySelector(".logo");
  const logoTilt = document.querySelector(".logo__tilt");

  if (logoLink && logoTilt && !prefersReducedMotion) {
    const maxRotate = 12;

    logoLink.addEventListener("mouseenter", () => {
      logoTilt.classList.add("is-active");
    });

    logoLink.addEventListener("mousemove", (e) => {
      const rect = logoLink.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      logoTilt.style.transform =
        `rotateY(${px * maxRotate}deg) rotateX(${-py * maxRotate}deg) translateY(-4px) scale(1.04)`;
    });

    logoLink.addEventListener("mouseleave", () => {
      logoTilt.classList.remove("is-active");
      logoTilt.style.transform = "";
    });
  }
})();
