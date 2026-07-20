import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { careers } from "../../data/careers.data.js";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderJobDetails(job) {
  // Page title + heading
  document.title = `${job.title} — Dastan Real Estate`;

  const titleEl = document.getElementById("jd-title");
  if (titleEl) titleEl.textContent = job.title;

  const subtitleEl = document.getElementById("jd-form-subtitle");
  if (subtitleEl)
    subtitleEl.textContent = `Submit your application for ${job.title}`;

  // Header meta
  const metaEl = document.getElementById("jd-meta");
  if (metaEl) {
    metaEl.innerHTML = `
      <span class="flex items-center gap-2"
        ><i class="fa-solid fa-location-dot text-[var(--color-gold-accent)]"></i>
        ${escapeHtml(job.location)}</span
      >
      <span class="flex items-center gap-2"
        ><i class="fa-solid fa-clock text-[var(--color-gold-accent)]"></i>
        ${escapeHtml(job.type)}</span
      >
      <span class="flex items-center gap-2"
        ><i class="fa-solid ${job.departmentIcon} text-[var(--color-gold-accent)]"></i>
        ${escapeHtml(job.department)} Department</span
      >`;
  }

  // About
  const aboutEl = document.getElementById("jd-about");
  if (aboutEl) aboutEl.textContent = job.about;

  // Responsibilities
  const respEl = document.getElementById("jd-responsibilities");
  if (respEl) {
    respEl.innerHTML = job.responsibilities
      .map(
        (item) => `
        <li class="flex items-start">
          <i class="fa-solid fa-check text-[var(--color-gold-accent)] mt-1 mr-3"></i>
          <span class="text-gray-600 leading-relaxed">${escapeHtml(item)}</span>
        </li>`
      )
      .join("");
  }

  // Requirements
  const reqEl = document.getElementById("jd-requirements");
  if (reqEl) {
    reqEl.innerHTML = job.requirements
      .map(
        (item) => `
        <li class="flex items-start">
          <i class="fa-solid fa-circle-dot text-[var(--color-gold-accent)] text-xs mt-1.5 mr-3"></i>
          <span class="text-gray-600 leading-relaxed">${escapeHtml(item)}</span>
        </li>`
      )
      .join("");
  }

  // Benefits
  const benefitsEl = document.getElementById("jd-benefits");
  if (benefitsEl) {
    benefitsEl.innerHTML = job.benefits
      .map(
        (b) => `
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-[#f8fafc] flex items-center justify-center text-[var(--color-gold-accent)]">
            <i class="fa-solid ${b.icon}"></i>
          </div>
          <span class="font-medium text-gray-800">${escapeHtml(b.label)}</span>
        </div>`
      )
      .join("");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render global components
  // Navbar is solid on this page (no transparent option passed or pass false)
  renderNavbar("#navbar-root", { transparent: false });
  renderFooter("#footer-root");

  // 2. Render the selected job from mock data (?id=)
  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const job = careers.find((c) => c.id === id) || careers[0];
  renderJobDetails(job);

  // 3. Initialize Intersection Observer for fade-up animations
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

  // 4. Handle File Input Display
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

  // 5. Handle Form Submission
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
