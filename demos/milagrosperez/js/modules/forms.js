import { SITE } from "../config.js";

const setPanelState = (item, isOpen) => {
  const button = item.querySelector(".faq-question");
  const panel = item.querySelector(".faq-answer");

  item.classList.toggle("is-open", isOpen);
  button?.setAttribute("aria-expanded", isOpen ? "true" : "false");
  panel?.setAttribute("aria-hidden", isOpen ? "false" : "true");
};

export function initFaq() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const button = item.querySelector(".faq-question");
    const panel = item.querySelector(".faq-answer");

    if (!button || !panel) return;

    const panelId = panel.id || `faq-panel-${Math.random().toString(36).slice(2, 9)}`;
    panel.id = panelId;
    button.setAttribute("aria-controls", panelId);
    setPanelState(item, false);

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => setPanelState(other, false));

      if (!isOpen) {
        setPanelState(item, true);
      }
    });
  });
}

export function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const fields = ["nombre", "telefono", "mensaje"];
  const submitBtn = form.querySelector('[type="submit"]');

  const getField = (id) => form.querySelector(`#${id}`);

  const isComplete = () =>
    fields.every((id) => {
      const el = getField(id);
      return el && el.value.trim() !== "";
    });

  const updateSubmit = () => {
    if (submitBtn) submitBtn.disabled = !isComplete();
  };

  const validate = () => {
    let valid = true;

    fields.forEach((id) => {
      const el = getField(id);
      if (!el) return;
      const empty = !el.value.trim();
      el.classList.toggle("is-invalid", empty);
      el.setAttribute("aria-invalid", empty ? "true" : "false");
      if (empty) valid = false;
    });

    return valid;
  };

  const buildMessage = () => {
    const nombre = getField("nombre")?.value.trim() ?? "";
    const telefono = getField("telefono")?.value.trim() ?? "";
    const mensaje = getField("mensaje")?.value.trim() ?? "";

    return [
      `Hola, quisiera consultar con ${SITE.name}.`,
      "",
      `Nombre: ${nombre}`,
      `Teléfono: ${telefono}`,
      "",
      "Consulta:",
      mensaje,
    ].join("\n");
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    const url = `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank", "noopener,noreferrer");

    const success = form.querySelector(".form-success");
    if (success) {
      success.hidden = false;
      form.reset();
      updateSubmit();
      fields.forEach((id) => getField(id)?.classList.remove("is-invalid"));
    }
  });

  fields.forEach((id) => {
    const el = getField(id);
    if (!el) return;

    const onInput = () => {
      if (el.value.trim()) {
        el.classList.remove("is-invalid");
        el.setAttribute("aria-invalid", "false");
      }
      updateSubmit();
    };

    el.addEventListener("input", onInput);
    el.addEventListener("change", onInput);
  });

  updateSubmit();
}
