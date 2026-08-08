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
