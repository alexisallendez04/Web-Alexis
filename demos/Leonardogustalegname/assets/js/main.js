(function () {
  const WA_TURNOS = "5491124950376";
  const WA_URGENCIAS = "5491169691045";

  function waLink(mensaje, numero) {
    return "https://wa.me/" + (numero || WA_TURNOS) + "?text=" + encodeURIComponent(mensaje);
  }

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
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const errorEl = form.querySelector(".cf-error");
      const name = (form.elements.name && form.elements.name.value.trim()) || "";
      const contact = (form.elements.contact && form.elements.contact.value.trim()) || "";
      const area = (form.elements.area && form.elements.area.value) || "";
      const msg = (form.elements.message && form.elements.message.value.trim()) || "";
      if (!name || !contact) {
        if (errorEl) errorEl.textContent = "Complete al menos el nombre y un teléfono o email de contacto.";
        return;
      }
      if (errorEl) errorEl.textContent = "";
      let text = "Hola, soy " + name + ".";
      if (area) text += " Quiero hacer una consulta sobre " + area + ".";
      if (msg) text += " " + msg;
      text += " (Contacto: " + contact + ")";
      const url = waLink(text);
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.assign(url);
      }
    });
  });

  const hero = document.querySelector(".hero");
  const fab = document.querySelector(".wa-fab");
  if (hero && fab) {
    const syncFab = function (heroVisible) {
      fab.classList.toggle("is-shown", !heroVisible);
      fab.classList.toggle("is-hidden", heroVisible);
      fab.setAttribute("aria-hidden", heroVisible ? "true" : "false");
    };
    syncFab(true);
    const heroObs = new IntersectionObserver(
      function (entries) {
        syncFab(entries[0].isIntersecting);
      },
      { threshold: 0.2 }
    );
    heroObs.observe(hero);
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
