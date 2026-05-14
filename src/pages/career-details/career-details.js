import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render global components
  // Navbar is solid on this page (no transparent option passed or pass false)
  renderNavbar("#navbar-root", { transparent: false });
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

  // 3. Handle File Input Display
  const fileInput = document.getElementById("file-upload");
  const fileNameDisplay = document.getElementById("file-name-display");

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener("change", function(e) {
      if (this.files && this.files[0]) {
        fileNameDisplay.textContent = this.files[0].name;
        fileNameDisplay.style.color = "#0a1e77";
        fileNameDisplay.style.fontWeight = "600";
      } else {
        fileNameDisplay.textContent = "PDF, DOC up to 5MB";
        fileNameDisplay.style.color = "";
        fileNameDisplay.style.fontWeight = "";
      }
    });
  }

  // 4. Handle Form Submission
  const form = document.getElementById("applicationForm");
  const formMessage = document.getElementById("form-message");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalContent = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      submitBtn.disabled = true;

      // Simulate API Call
      setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        formMessage.textContent = "Application submitted successfully! We will review your profile and get back to you.";
        formMessage.className = "mt-4 p-3 rounded text-sm text-center bg-green-50 text-green-700 border border-green-200 block";
        
        form.reset();
        if(fileNameDisplay) {
            fileNameDisplay.textContent = "PDF, DOC up to 5MB";
            fileNameDisplay.style.color = "";
            fileNameDisplay.style.fontWeight = "";
        }

        setTimeout(() => {
          formMessage.classList.add("hidden");
        }, 5000);
      }, 1500);
    });
  }
});
