export function initAnimations() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const targets = document.querySelectorAll("[data-reveal], [data-reveal-stagger]");

  if (!targets.length) return;

  if (reduced) {
    targets.forEach((el) => el.classList.add("is-visible"));
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
      threshold: 0.1,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  targets.forEach((el) => observer.observe(el));
}

export function initMicrointeractions() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;

  document.querySelectorAll(".btn-cta, .btn-outline").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.add("is-pressed");
      window.setTimeout(() => btn.classList.remove("is-pressed"), 180);
    });
  });
}
