export function initTestimonialsCarousel() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-carousel-track]");
  const slides = [...root.querySelectorAll(".testimonials-carousel__slide")];
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");

  if (!track || slides.length === 0) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let perView = getPerView();
  let autoTimer = null;

  function getPerView() {
    return window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
  }

  function maxIndex() {
    return Math.max(0, slides.length - perView);
  }

  function equalizeHeights() {
    slides.forEach((slide) => {
      slide.style.height = "";
    });
    const maxHeight = Math.max(
      ...slides.map((slide) => slide.getBoundingClientRect().height)
    );
    slides.forEach((slide) => {
      slide.style.height = `${maxHeight}px`;
    });
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    const count = maxIndex() + 1;

    for (let i = 0; i < count; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "testimonials-carousel__dot";
      btn.setAttribute("aria-label", `Ir al grupo ${i + 1}`);
      btn.setAttribute("aria-selected", i === index ? "true" : "false");
      btn.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function update() {
    const gap = parseFloat(getComputedStyle(track).gap) || 20;
    const slideWidth = slides[0].getBoundingClientRect().width;
    const offset = index * (slideWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;

    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, i) => {
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
    }
  }

  function goTo(next) {
    index = Math.min(Math.max(next, 0), maxIndex());
    update();
    restartAuto();
  }

  function next() {
    goTo(index >= maxIndex() ? 0 : index + 1);
  }

  function prev() {
    goTo(index <= 0 ? maxIndex() : index - 1);
  }

  function restartAuto() {
    if (autoTimer) clearInterval(autoTimer);
    if (reduced || slides.length <= perView) return;
    autoTimer = setInterval(next, 6500);
  }

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const delta = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(delta) < 40) return;
      delta < 0 ? next() : prev();
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    const nextPerView = getPerView();
    if (nextPerView !== perView) {
      perView = nextPerView;
      index = Math.min(index, maxIndex());
      buildDots();
    }
    equalizeHeights();
    update();
  });

  buildDots();
  equalizeHeights();
  update();
  restartAuto();
}
