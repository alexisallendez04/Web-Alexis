(function () {
  const fill = document.getElementById("spineFill");
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("siteNav");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function updateSpine() {
    if (!fill) return;
    if (reduceMotion) {
      fill.style.height = "100%";
      return;
    }
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(100, (scrolled / max) * 100) : 0;
    fill.style.height = pct + "%";
  }

  window.addEventListener("scroll", updateSpine, { passive: true });
  updateSpine();

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    const question = item.querySelector(".faq-q");
    if (!question) return;
    question.addEventListener("click", function () {
      item.classList.toggle("open");
      question.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
    });
  });

  document.querySelectorAll(".contact-form").forEach(function (form) {
    form.addEventListener("submit", submitContactForm);
  });

  function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById("cf-name").value.trim();
    const contact = document.getElementById("cf-contact").value.trim();
    const area = document.getElementById("cf-area").value;
    const msg = document.getElementById("cf-message").value.trim();
    const errorEl = document.getElementById("cf-error");
    if (!name || !contact) {
      errorEl.textContent = "Completá al menos el nombre y un teléfono o email de contacto.";
      return;
    }
    errorEl.textContent = "";
    let text = "Hola, soy " + name + ".";
    if (area) text += " Quiero hacer una consulta sobre " + area + ".";
    if (msg) text += " " + msg;
    text += " (Contacto: " + contact + ")";
    const url = "https://wa.me/5491169691045?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  }

  const reveals = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    reveals.forEach(function (el) {
      el.classList.add("in");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
