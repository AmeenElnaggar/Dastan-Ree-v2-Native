import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";

const escape = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

function closeAllDropdowns(except) {
  document.querySelectorAll(".select-field.is-open").forEach((el) => {
    if (el === except) return;
    el.classList.remove("is-open");
    el.querySelector(".ms-trigger")?.setAttribute("aria-expanded", "false");
  });
}

let dropdownGlobalListenersBound = false;
function bindDropdownGlobalListeners() {
  if (dropdownGlobalListenersBound) return;
  dropdownGlobalListenersBound = true;
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select-field")) closeAllDropdowns(null);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns(null);
  });
}

function bindSelectFields(form) {
  const fields = form.querySelectorAll(".select-field");
  if (!fields.length) return;

  fields.forEach((wrapper) => {
    const hidden = wrapper.querySelector(".select-field__hidden");
    const trigger = wrapper.querySelector(".ms-trigger");
    const dropdown = wrapper.querySelector(".ms-dropdown");
    const placeholder = wrapper.querySelector(".ms-placeholder");
    const valueEl = wrapper.querySelector(".ms-value");
    const optionsContainer = wrapper.querySelector(".ms-options");

    const renderOptions = () => {
      const opts = Array.from(hidden.options).filter((o) => o.value !== "");
      optionsContainer.innerHTML = opts
        .map((o) => {
          const selected = o.value === hidden.value;
          return `
            <button type="button" class="ms-option ms-option--single ${selected ? "is-selected" : ""}" role="option" aria-selected="${selected}" data-value="${o.value}">
              <span class="ms-option__label">${escape(o.text)}</span>
              <i class="fa-solid fa-check ms-option__tick" aria-hidden="true"></i>
            </button>`;
        })
        .join("");
    };

    const updateDisplay = () => {
      const opt = hidden.options[hidden.selectedIndex];
      const hasValue = hidden.value !== "" && opt && opt.value !== "";
      placeholder.style.display = hasValue ? "none" : "";
      valueEl.textContent = hasValue ? opt.text : "";
      wrapper.classList.toggle("has-selection", hasValue);
    };

    trigger.addEventListener("click", () => {
      if (hidden.disabled) return;
      const willOpen = !wrapper.classList.contains("is-open");
      closeAllDropdowns(willOpen ? wrapper : null);
      wrapper.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });

    optionsContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".ms-option");
      if (!btn) return;
      e.stopPropagation();
      hidden.value = btn.dataset.value;
      hidden.dispatchEvent(new Event("change", { bubbles: true }));
      wrapper.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });

    dropdown.addEventListener("click", (e) => e.stopPropagation());

    hidden.addEventListener("change", () => {
      renderOptions();
      updateDisplay();
      wrapper.classList.remove("is-invalid");
    });

    renderOptions();
    updateDisplay();
  });

  bindDropdownGlobalListeners();
}

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
    bindSelectFields(contactForm);

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
