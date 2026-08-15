export function initTestimonials() {
  const root = document.querySelector("[data-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-carousel-track]");
  const slides = [...root.querySelectorAll("[data-carousel-slide]")];
  const prev = root.querySelector("[data-carousel-prev]");
  const next = root.querySelector("[data-carousel-next]");
  const indexEl = root.querySelector("[data-carousel-index]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!track || slides.length < 2) return;

  let current = 0;
  let startX = 0;
  let deltaX = 0;
  let dragging = false;

  const pad = (n) => String(n).padStart(2, "0");

  const goTo = (i) => {
    current = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, idx) => {
      slide.setAttribute("aria-hidden", idx === current ? "false" : "true");
    });
    if (indexEl) indexEl.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
  };

  prev?.addEventListener("click", () => goTo(current - 1));
  next?.addEventListener("click", () => goTo(current + 1));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(current - 1);
    if (e.key === "ArrowRight") goTo(current + 1);
  });

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true;
    startX = e.clientX;
    deltaX = 0;
    track.style.transition = "none";
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    deltaX = e.clientX - startX;
    const percent = (deltaX / root.offsetWidth) * 100;
    track.style.transform = `translateX(calc(-${current * 100}% + ${percent}%))`;
  };

  const onPointerUp = () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = reduced ? "none" : "";
    const threshold = root.offsetWidth * 0.18;
    if (deltaX > threshold) goTo(current - 1);
    else if (deltaX < -threshold) goTo(current + 1);
    else goTo(current);
  };

  track.addEventListener("pointerdown", onPointerDown);
  track.addEventListener("pointermove", onPointerMove);
  track.addEventListener("pointerup", onPointerUp);
  track.addEventListener("pointercancel", onPointerUp);

  goTo(0);
}
