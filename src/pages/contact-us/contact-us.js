import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render global components
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

  // 3. Handle Form Submission
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalBtnContent = submitBtn.innerHTML;

      // Visual feedback: loading state
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call delay
      setTimeout(() => {
        // Success state
        submitBtn.innerHTML = originalBtnContent;
        submitBtn.disabled = false;
        
        formStatus.textContent = "Thank you! Your message has been sent successfully. We will get back to you soon.";
        formStatus.className = "form-status success";
        formStatus.style.display = "block";

        contactForm.reset();

        // Hide message after a few seconds
        setTimeout(() => {
          formStatus.style.display = "none";
        }, 5000);
      }, 1500);
    });
  }
});
