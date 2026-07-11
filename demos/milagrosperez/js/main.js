import { initAnimations, initMicrointeractions } from "./modules/animations.js";
import {
  initNavigation,
  initWhatsAppFloat,
  initWhatsAppLinks,
} from "./modules/navigation.js";
import { initFaq, initContactForm } from "./modules/forms.js";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initNavigation();
  initAnimations();
  initMicrointeractions();
  initFaq();
  initContactForm();
  initWhatsAppFloat();
});
