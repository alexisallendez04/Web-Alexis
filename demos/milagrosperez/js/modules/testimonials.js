const POSTER_READY = "is-poster-ready";
const PLAYING = "is-playing";
const FADING = "is-fading";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function preparePoster(root) {
  if (root.dataset.posterPrepared === "true") return;
  root.dataset.posterPrepared = "true";

  const posterPath =
    root.dataset.videoPoster ||
    root.querySelector("[data-video-poster-img]")?.dataset.src;
  const img = root.querySelector("[data-video-poster-img]");
  const placeholder = root.querySelector("[data-video-placeholder]");

  if (!posterPath || !img) return;

  const revealPoster = () => {
    img.hidden = false;
    img.removeAttribute("hidden");
    root.classList.add(POSTER_READY);
    if (placeholder) placeholder.hidden = true;
  };

  const keepPlaceholder = () => {
    img.hidden = true;
    img.setAttribute("hidden", "");
    root.classList.remove(POSTER_READY);
    if (placeholder) placeholder.hidden = false;
  };

  img.addEventListener("load", revealPoster, { once: true });
  img.addEventListener("error", keepPlaceholder, { once: true });

  img.setAttribute("src", posterPath);

  if (img.complete) {
    if (img.naturalWidth > 0) revealPoster();
    else keepPlaceholder();
  }
}

function createVideoElement(src, poster) {
  const video = document.createElement("video");
  video.className = "testimonial-video__player";
  video.src = src;
  video.controls = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.preload = "none";
  if (poster) video.poster = poster;
  video.setAttribute("controlslist", "nodownload");
  video.setAttribute("aria-label", "Testimonio en video de Leonel");
  return video;
}

function playTestimonial(root) {
  if (root.dataset.videoStarted === "true") return;

  const src = root.dataset.videoSrc;
  const poster = root.dataset.videoPoster || "";
  const media = root.querySelector("[data-video-media]");
  const playBtn = root.querySelector("[data-video-play]");

  if (!src || !media) return;

  root.dataset.videoStarted = "true";

  const video = createVideoElement(src, poster);
  const reduced = prefersReducedMotion();

  const mount = () => {
    media.replaceChildren(video);
    root.classList.add(PLAYING);
    root.classList.remove(FADING);

    const playPromise = video.play();
    if (playPromise?.catch) {
      playPromise.catch(() => {
        /* Autoplay bloqueado: el usuario usa los controls nativos */
      });
    }

    playBtn?.remove();
  };

  if (reduced) {
    mount();
    return;
  }

  root.classList.add(FADING);
  window.setTimeout(mount, 280);
}

function bindPlay(root) {
  const playBtn = root.querySelector("[data-video-play]");
  if (!playBtn) return;

  playBtn.addEventListener("click", () => playTestimonial(root));
}

function observeSection(root) {
  const section = root.closest("#testimonios") || root;

  if (!("IntersectionObserver" in window)) {
    preparePoster(root);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        preparePoster(root);
        observer.disconnect();
      });
    },
    {
      root: null,
      rootMargin: "120px 0px",
      threshold: 0.05,
    }
  );

  observer.observe(section);
}

function initVideoTestimonials() {
  const roots = document.querySelectorAll("[data-video-testimonial]");
  if (!roots.length) return;

  roots.forEach((root) => {
    bindPlay(root);
    observeSection(root);
  });
}

function equalizeSlideHeights(slides) {
  slides.forEach((slide) => {
    slide.style.minHeight = "";
  });

  const maxHeight = Math.max(
    ...slides.map((slide) => slide.getBoundingClientRect().height)
  );

  if (!Number.isFinite(maxHeight) || maxHeight <= 0) return;

  slides.forEach((slide) => {
    slide.style.minHeight = `${Math.ceil(maxHeight)}px`;
  });
}

function getSnapAlign() {
  return window.matchMedia("(min-width: 768px)").matches ? "start" : "center";
}

function getMaxIndex(slides) {
  const perView = window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
  return Math.max(0, slides.length - perView);
}

function getActiveIndex(track, slides) {
  const align = getSnapAlign();
  const trackRect = track.getBoundingClientRect();
  let bestIndex = 0;
  let bestDistance = Infinity;

  slides.forEach((slide, index) => {
    const rect = slide.getBoundingClientRect();
    const distance =
      align === "center"
        ? Math.abs(rect.left + rect.width / 2 - (trackRect.left + trackRect.width / 2))
        : Math.abs(rect.left - trackRect.left);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });

  return Math.min(bestIndex, getMaxIndex(slides));
}

function getScrollLeftForSlide(track, slide, align) {
  // Posición estable (no depende del scroll a medias)
  const left = slide.offsetLeft;

  if (align === "center") {
    return left - (track.clientWidth - slide.offsetWidth) / 2;
  }

  return left;
}

function initQuotesCarousel() {
  const root = document.querySelector("[data-testimonials-carousel]");
  if (!root) return;

  const track = root.querySelector("[data-carousel-track]");
  const dotsWrap = root.querySelector("[data-carousel-dots]");
  const prevBtn = root.querySelector("[data-carousel-prev]");
  const nextBtn = root.querySelector("[data-carousel-next]");
  const slides = [...root.querySelectorAll(".testimonials-quotes__slide")];

  if (!track || !dotsWrap || slides.length === 0) return;

  const reduced = prefersReducedMotion();
  let activeIndex = 0;
  let scrollRaf = 0;
  let programmatic = false;
  let programmaticTimer = 0;

  const setActive = (index) => {
    activeIndex = index;
    [...dotsWrap.children].forEach((dot, i) => {
      const selected = i === index;
      dot.setAttribute("aria-selected", selected ? "true" : "false");
      dot.tabIndex = selected ? 0 : -1;
    });

    if (prevBtn) prevBtn.disabled = index <= 0;
    if (nextBtn) nextBtn.disabled = index >= getMaxIndex(slides);
  };

  const buildDots = () => {
    dotsWrap.replaceChildren();
    const count = getMaxIndex(slides) + 1;

    for (let index = 0; index < count; index++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "testimonials-quotes__dot";
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-label", `Ir al testimonio ${index + 1}`);
      btn.addEventListener("click", () => goTo(index));
      dotsWrap.appendChild(btn);
    }

    setActive(Math.min(activeIndex, getMaxIndex(slides)));
  };

  const endProgrammatic = () => {
    programmatic = false;
    if (programmaticTimer) {
      window.clearTimeout(programmaticTimer);
      programmaticTimer = 0;
    }
    setActive(getActiveIndex(track, slides));
  };

  const snapTo = (index, behavior = "auto") => {
    const next = Math.min(Math.max(index, 0), getMaxIndex(slides));
    const align = getSnapAlign();
    const left = Math.max(0, getScrollLeftForSlide(track, slides[next], align));

    programmatic = true;
    if (programmaticTimer) window.clearTimeout(programmaticTimer);
    setActive(next);
    track.scrollTo({ left, behavior });

    if (behavior === "auto") {
      endProgrammatic();
      return;
    }

    programmaticTimer = window.setTimeout(endProgrammatic, 450);
  };

  const goTo = (index) => {
    snapTo(index, reduced ? "auto" : "smooth");
  };

  const syncFromScroll = () => {
    if (programmatic) return;
    setActive(getActiveIndex(track, slides));
  };

  track.addEventListener(
    "scroll",
    () => {
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(syncFromScroll);
    },
    { passive: true }
  );

  track.addEventListener("scrollend", endProgrammatic);

  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(activeIndex - 1);
    }
  });

  prevBtn?.addEventListener("click", () => goTo(activeIndex - 1));
  nextBtn?.addEventListener("click", () => goTo(activeIndex + 1));

  const refresh = () => {
    equalizeSlideHeights(slides);
    buildDots();
    snapTo(Math.min(activeIndex, getMaxIndex(slides)), "auto");
  };

  buildDots();
  equalizeSlideHeights(slides);
  snapTo(0, "auto");

  window.addEventListener("resize", refresh);

  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {});
  }
}

export function initTestimonials() {
  initVideoTestimonials();
  initQuotesCarousel();
}
