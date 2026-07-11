import {
  initNavigation,
  initWhatsAppFloat,
  initWhatsAppLinks,
  initSocialLinks,
} from "./modules/navigation.js";
import { initAnimations } from "./modules/animations.js";
import { initFaq, initContactForm } from "./modules/forms.js";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initNavigation();
  initAnimations();
  initFaq();
  initContactForm();
  initWhatsAppFloat();
  initSocialLinks();
});
