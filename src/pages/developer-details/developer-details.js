import { developers } from "../../data/developers.data.js";
import { projects } from "../../data/projects.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const id = Number(new URLSearchParams(window.location.search).get("id"));
  const developer = developers.find((d) => d.id === id) || developers[0];

  if (!developer) {
    document.querySelector(".dd-main").innerHTML = `
      <div class="max-w-3xl mx-auto px-6 text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Developer not found</h2>
        <p class="text-gray-500 mb-6">The developer you're looking for doesn't exist.</p>
        <a href="../developers/index.html" class="dd-cta__btn dd-cta__btn--primary" style="text-decoration:none;display:inline-flex;">
          Back to Developers
        </a>
      </div>`;
    return;
  }

  hydrateDeveloper(developer);
  initProjectsSlider(developer);
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

  const devProjects = projects.filter((p) => projectBelongsTo(p, d));
  const availableCount = (devProjects.length ? devProjects : pickProjectsFor(d)).length;

  const meta = document.getElementById("dd-meta");
  meta.innerHTML = [
    d.location
      ? `<span class="dd-hero__meta-item"><i class="fa-solid fa-location-dot"></i>${escapeHtml(d.location)}</span>`
      : "",
    d.projects
      ? `<span class="dd-hero__meta-item"><i class="fa-solid fa-building"></i>${d.projects} Projects</span>`
      : "",
    availableCount
      ? `<span class="dd-hero__meta-item"><i class="fa-solid fa-layer-group"></i>${availableCount} Available Properties</span>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const facts = document.getElementById("dd-facts");
  facts.innerHTML = [
    d.phone
      ? renderFact(
          "phone",
          "Phone",
          `<a href="tel:${d.phone.replace(/\s+/g, "")}" class="dd-fact__link">${escapeHtml(d.phone)}</a>`
        )
      : "",
    d.email
      ? renderFact(
          "envelope",
          "Email",
          `<a href="mailto:${escapeHtml(d.email)}" class="dd-fact__link">${escapeHtml(d.email)}</a>`
        )
      : "",
    d.location ? renderFact("location-dot", "Address", escapeHtml(d.location)) : "",
  ]
    .filter(Boolean)
    .join("");

  document.getElementById("dd-cta-title").textContent = `Considering ${d.name}?`;
  document.getElementById("dd-cta-subtitle").textContent =
    `Speak with a Dastan advisor about ${d.name}'s available units, upcoming launches, and exclusive pre-market opportunities.`;
}

function initProjectsSlider(developer) {
  const section = document.getElementById("dd-projects");
  const root = document.getElementById("dd-projects-slider-root");
  if (!section || !root) return;

  const matched = projects.filter((p) => projectBelongsTo(p, developer));
  const list = matched.length ? matched : pickProjectsFor(developer);

  if (!list.length) {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  document.getElementById("dd-projects-title").textContent =
    `Projects by ${developer.name}`;

  root.innerHTML = `
    <div class="swiper dd-projects-swiper">
      <div class="swiper-wrapper">
        ${list.map((p) => `<div class="swiper-slide">${renderProjectCard(p)}</div>`).join("")}
      </div>
    </div>
  `;

  const prevBtn = document.getElementById("dd-projects-prev");
  const nextBtn = document.getElementById("dd-projects-next");
  const currentEl = document.getElementById("dd-projects-current");
  const totalEl = document.getElementById("dd-projects-total");

  function updateControls(sw) {
    currentEl.textContent = String(sw.snapIndex + 1).padStart(2, "0");
    totalEl.textContent = String(sw.snapGrid.length).padStart(2, "0");
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
  }

  const swiper = new Swiper(root.querySelector(".dd-projects-swiper"), {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: false,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 28 },
    },
    on: {
      init(sw) { updateControls(sw); },
      slideChange(sw) { updateControls(sw); },
      breakpoint(sw) { updateControls(sw); },
    },
  });

  prevBtn.addEventListener("click", () => swiper.slidePrev());
  nextBtn.addEventListener("click", () => swiper.slideNext());
}

function projectBelongsTo(project, developer) {
  const target = developer.name.toLowerCase();
  if (typeof project.developer === "string") {
    return project.developer.toLowerCase().includes(target);
  }
  if (project.developer && typeof project.developer === "object") {
    const name = project.developer.name_en || project.developer.name || "";
    return name.toLowerCase().includes(target);
  }
  return false;
}

function pickProjectsFor(developer) {
  if (!projects.length) return [];
  const offset = ((developer.id - 1) % projects.length + projects.length) % projects.length;
  const take = Math.min(6, projects.length);
  return Array.from({ length: take }, (_, i) => projects[(offset + i) % projects.length]);
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

function renderFact(icon, label, value) {
  return `<li class="dd-fact">
    <span class="dd-fact__icon"><i class="fa-solid fa-${icon}"></i></span>
    <div class="dd-fact__body">
      <div class="dd-fact__label">${label}</div>
      <div class="dd-fact__value">${value}</div>
    </div>
  </li>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
