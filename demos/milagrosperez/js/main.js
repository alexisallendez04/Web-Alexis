import { initAnimations, initMicrointeractions } from "./modules/animations.js";
import {
  initGoogleReviewLinks,
  initNavigation,
  initTurnifyLinks,
  initWhatsAppFloat,
  initWhatsAppLinks,
} from "./modules/navigation.js";
import { initFaq } from "./modules/forms.js";
import { initTestimonials } from "./modules/testimonials.js";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initTurnifyLinks();
  initGoogleReviewLinks();
  initNavigation();
  initAnimations();
  initMicrointeractions();
  initFaq();
  initWhatsAppFloat();
  initTestimonials();
});
