import { locations } from "../../data/locations.data.js";
import { projects } from "../../data/projects.data.js";
import { properties } from "../../data/properties.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const id = new URLSearchParams(window.location.search).get("id");
  const location = locations.find((l) => l.id === id) || locations[0];

  if (!location) {
    document.querySelector("main, body").innerHTML += `
      <div class="max-w-3xl mx-auto px-6 text-center py-20">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Location not found</h2>
        <a href="../locations/index.html" class="ld-submit" style="text-decoration:none;display:inline-flex;">Back to Locations</a>
      </div>`;
    return;
  }

  hydrateLocation(location);
  renderListings(location);
  initFadeUp();
});

function hydrateLocation(loc) {
  document.getElementById("page-title").textContent = `${loc.name} — Dastan Real Estate`;
  document.getElementById("ld-hero-bg").style.backgroundImage = `url("${loc.image}")`;
  document.getElementById("ld-region").textContent = loc.region;
  document.getElementById("ld-name").textContent = loc.name;
  document.getElementById("ld-name-inline").textContent = loc.name;
  document.getElementById("ld-subtitle").textContent =
    `Discover what's available in ${loc.name} — from new launches to ready-to-move listings.`;

  document.getElementById("ld-description").textContent =
    describe(loc);

  const projectCount = countMatches(projects, loc.searchKey);
  const propertyCount = countMatches(properties, loc.searchKey);
  const totalListings = projectCount + propertyCount;

  document.getElementById("ld-hero-stats").innerHTML = [
    `<span class="ld-hero__stat"><i class="fa-solid fa-location-dot"></i>${escapeHtml(loc.region)}</span>`,
    totalListings
      ? `<span class="ld-hero__stat"><i class="fa-solid fa-building"></i>${totalListings} ${totalListings === 1 ? "Listing" : "Listings"}</span>`
      : "",
    loc.featured
      ? `<span class="ld-hero__stat"><i class="fa-solid fa-star"></i>Featured Destination</span>`
      : "",
  ]
    .filter(Boolean)
    .join("");
}

function describe(loc) {
  return `${loc.name} is one of ${loc.region}'s most sought-after addresses, known for its blend of accessibility, lifestyle amenities, and long-term value. Whether you're looking for an off-plan investment or a ready home, the area offers a mix of developments from leading regional developers. Our team curates the best available units across launches and resale to match your brief.`;
}

function countMatches(list, key) {
  const needle = key.toLowerCase();
  return list.filter((item) =>
    (item.location || "").toLowerCase().includes(needle)
  ).length;
}

function matchListings(list, key) {
  const needle = key.toLowerCase();
  return list.filter((item) =>
    (item.location || "").toLowerCase().includes(needle)
  );
}

function renderListings(loc) {
  const projectMatches = matchListings(projects, loc.searchKey);
  const propertyMatches = matchListings(properties, loc.searchKey);

  if (projectMatches.length) {
    initSlider({
      sectionId: "ld-projects-section",
      rootId: "ld-projects-root",
      prevId: "ld-projects-prev",
      nextId: "ld-projects-next",
      currentId: "ld-projects-current",
      totalId: "ld-projects-total",
      items: projectMatches,
      renderCard: renderProjectCard,
    });
  }

  if (propertyMatches.length) {
    initSlider({
      sectionId: "ld-properties-section",
      rootId: "ld-properties-root",
      prevId: "ld-properties-prev",
      nextId: "ld-properties-next",
      currentId: "ld-properties-current",
      totalId: "ld-properties-total",
      items: propertyMatches,
      renderCard: renderPropertyCard,
    });
  }

  if (!projectMatches.length && !propertyMatches.length) {
    document.getElementById("ld-no-listings").hidden = false;
  }
}

function initSlider({ sectionId, rootId, prevId, nextId, currentId, totalId, items, renderCard }) {
  const section = document.getElementById(sectionId);
  const root = document.getElementById(rootId);
  if (!section || !root) return;

  section.hidden = false;
  root.innerHTML = `
    <div class="swiper ld-listings-swiper">
      <div class="swiper-wrapper">
        ${items.map((item) => `<div class="swiper-slide">${renderCard(item)}</div>`).join("")}
      </div>
    </div>
  `;

  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  const currentEl = document.getElementById(currentId);
  const totalEl = document.getElementById(totalId);

  function updateControls(sw) {
    currentEl.textContent = String(sw.snapIndex + 1).padStart(2, "0");
    totalEl.textContent = String(sw.snapGrid.length).padStart(2, "0");
    prevBtn.disabled = sw.isBeginning;
    nextBtn.disabled = sw.isEnd;
  }

  const swiper = new Swiper(root.querySelector(".ld-listings-swiper"), {
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
