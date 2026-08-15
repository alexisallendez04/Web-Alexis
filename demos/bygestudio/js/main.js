import { initAnimations } from "./modules/animations.js";
import { initNavigation, initWhatsAppLinks } from "./modules/navigation.js";
import { initContactForm, initServiceAsunto } from "./modules/forms.js";
import { initTestimonials } from "./modules/testimonials.js";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initNavigation();
  initAnimations();
  initServiceAsunto();
  initContactForm();
  initTestimonials();
});
