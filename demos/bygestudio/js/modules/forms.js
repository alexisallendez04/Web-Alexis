import { SITE } from "../config.js";
import { getWhatsAppUrl } from "./navigation.js";

export function initServiceAsunto() {
  const select = document.getElementById("asunto");
  if (!select) return;

  document.querySelectorAll("[data-asunto]").forEach((el) => {
    el.addEventListener("click", () => {
      const value = el.getAttribute("data-asunto");
      if (value) select.value = value;
    });
  });
}

export function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const asunto = String(data.get("asunto") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();

    if (!nombre || !email || !asunto || !mensaje) {
      if (status) status.textContent = "Completá todos los campos para enviar la consulta.";
      return;
    }

    const body = `Hola, soy ${nombre} (${email}).\n\nConsulta sobre ${asunto}:\n${mensaje}`;
    const wa = getWhatsAppUrl(body);
    const mail = SITE.contact.email?.trim();

    if (wa) {
      window.open(wa, "_blank", "noopener,noreferrer");
      if (status) status.textContent = "Abrimos WhatsApp con tu consulta.";
      form.reset();
      return;
    }

    if (mail) {
      const mailto = `mailto:${mail}?subject=${encodeURIComponent(`Consulta sobre ${asunto}`)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      if (status) status.textContent = "Abrimos tu correo para enviar la consulta.";
      form.reset();
      return;
    }

    const ig = SITE.social.instagram;
    if (ig) {
      window.open(ig, "_blank", "noopener,noreferrer");
      if (status) {
        status.textContent =
          "Todavía no cargamos WhatsApp ni email. Te llevamos al Instagram @bygestudio para escribirnos.";
      }
    }
  });
}
