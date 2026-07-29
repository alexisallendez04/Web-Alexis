import { initAnimations, initMicrointeractions } from "./modules/animations.js";
import {
  initGoogleReviewLinks,
  initNavigation,
  initWhatsAppFloat,
  initWhatsAppLinks,
} from "./modules/navigation.js";
import { initFaq, initContactForm } from "./modules/forms.js";
import { initTestimonials } from "./modules/testimonials.js";

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppLinks();
  initGoogleReviewLinks();
  initNavigation();
  initAnimations();
  initMicrointeractions();
  initFaq();
  initContactForm();
  initWhatsAppFloat();
  initTestimonials();
});
