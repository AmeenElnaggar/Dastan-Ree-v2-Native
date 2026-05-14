import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render global components
  // Render navbar with transparent background initially for the hero section
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  // 2. Initialize Intersection Observer for fade-up animations
  const fadeUpElements = document.querySelectorAll(".fade-up");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeUpElements.forEach((el) => {
    observer.observe(el);
  });
});
