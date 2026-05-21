import { developers } from "../../data/developers.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const developer = developers.find((d) => d.id === id) || developers[0];

  if (!developer) {
    document.querySelector(".dd-main").innerHTML = `
      <div class="max-w-3xl mx-auto px-6 text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Developer not found</h2>
        <p class="text-gray-500 mb-6">The developer you're looking for doesn't exist.</p>
        <a href="../developers/index.html" class="dd-submit" style="text-decoration:none;display:inline-flex;">
          Back to Developers
        </a>
      </div>`;
    return;
  }

  hydrateDeveloper(developer);
  setupForm(developer);
  initFadeUp();
});

function hydrateDeveloper(d) {
  document.getElementById("page-title").textContent = `${d.name} — Dastan Real Estate`;

  if (d.cover) {
    document.getElementById("dd-hero-bg").style.backgroundImage = `url("${d.cover}")`;
  }

  const logo = document.getElementById("dd-logo");
  logo.src = d.logo;
  logo.alt = d.alt || d.name;

  document.getElementById("dd-name").textContent = d.name;
  document.getElementById("dd-tagline").textContent = d.tagline || "";
  document.getElementById("dd-description").textContent = d.description || "";

  const meta = document.getElementById("dd-meta");
  meta.innerHTML = [
    d.location
      ? `<span class="dd-hero__meta-item"><i class="fa-solid fa-location-dot"></i>${escapeHtml(d.location)}</span>`
      : "",
    d.founded
      ? `<span class="dd-hero__meta-item"><i class="fa-solid fa-calendar"></i>Founded ${d.founded}</span>`
      : "",
    d.website && d.website !== "#"
      ? `<span class="dd-hero__meta-item"><i class="fa-solid fa-globe"></i><a href="${d.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></span>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const stats = document.getElementById("dd-stats");
  const yearsActive = d.founded ? new Date().getFullYear() - d.founded : null;
  stats.innerHTML = [
    d.projects
      ? `<div class="dd-stat"><div class="dd-stat__value">${d.projects}+</div><div class="dd-stat__label">Projects</div></div>`
      : "",
    yearsActive
      ? `<div class="dd-stat"><div class="dd-stat__value">${yearsActive}</div><div class="dd-stat__label">Years Active</div></div>`
      : "",
    d.location
      ? `<div class="dd-stat"><div class="dd-stat__value">${escapeHtml(d.location.split(",")[0])}</div><div class="dd-stat__label">Headquarters</div></div>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  document.getElementById("dd-form-subtitle").textContent =
    `Speak with our team about ${d.name}'s available units and upcoming launches.`;
}

function setupForm(developer) {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("cf-message-box");
  const submitBtn = form.querySelector(".dd-submit");
  const originalBtnHTML = submitBtn.innerHTML;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      showMessage(messageBox, "Please fill in all required fields.", "error");
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i><span>Sending…</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;

      showMessage(
        messageBox,
        `Thanks! Your inquiry about ${developer.name} has been received. We'll be in touch shortly.`,
        "success"
      );
      form.reset();

      setTimeout(() => {
        messageBox.hidden = true;
      }, 6000);
    }, 1200);
  });
}

function showMessage(box, text, type) {
  box.textContent = text;
  box.className = `dd-form-message dd-form-message--${type}`;
  box.hidden = false;
}

function initFadeUp() {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
