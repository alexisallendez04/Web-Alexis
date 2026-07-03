import { initNavigation, initWhatsAppFloat } from "./modules/navigation.js";
import { initAnimations } from "./modules/animations.js";
import { initFaq, initContactForm } from "./modules/forms.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAnimations();
  initFaq();
  initContactForm();
  initWhatsAppFloat();
});
