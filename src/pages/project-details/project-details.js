import { amenities } from "../../data/amenities.data.js";
import { projects } from "../../data/projects.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { openModal } from "../../shared/components/modal/Modal.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";
import { AMENITY_ICONS, getFacilityIcon, getPurposeIcon } from "../../shared/components/amenities/icons.js";
import { qs } from "../../utils/dom.js";
import { formatNumber } from "../../utils/format.js";
import { getParam } from "../../utils/router.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");

  const id = getParam("id") || projects[0]?.id;
  const project = projects.find((p) => p.id === id) || projects[0];

  if (!project) {
    document.body.innerHTML =
      '<p class="text-center py-20 text-gray-500">Project not found.</p>';
    return;
  }

  renderProject(project);
  bindActions(project);
});

function renderProject(p) {
  document.title = `${p.name} — Dastan Real Estate`;

  // Section 1: Header left — logo + title + short description
  const devLogo = qs("#property-dev-logo");
  devLogo.src = p.developerLogo || "";
  devLogo.alt = p.developer || "";

  qs("#property-title").textContent = p.name;
  qs("#property-short-desc").textContent = p.shortDescription || "";

  // Header right — price & finishing date
  qs("#property-price").innerHTML =
    `<span class="price-amount">${formatNumber(p.price)}</span>
     <span class="price-currency">EGP</span>`;

  qs("#property-finishing").innerHTML =
    `<span class="finishing-label">Finishing:</span>
     <span class="finishing-value">${p.finishingType || "—"}</span>`;

  // Section 3: Gallery
  renderGallery(p.images || []);

  // Key details — 4 primary metrics
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const details = [
    { label: "Area", value: `${p.area} sqm`, icon: "fa-ruler-combined" },
    {
      label: "Finishing",
      value: p.finishingType || "—",
      icon: "fa-paint-roller",
    },
    {
      label: "Delivery Date",
      value: p.deliveryDate || "—",
      icon: "fa-calendar-check",
    },
    { label: "Type", value: capitalize(p.type), icon: "fa-building" },
  ];
  qs("#property-details").innerHTML = details
    .map(
      (d) =>
        `<div class="property-detail-item">
       <div class="property-detail-icon"><i class="fa-solid ${d.icon}"></i></div>
       <div class="property-detail-label">${d.label}</div>
       <div class="property-detail-value">${d.value}</div>
     </div>`,
    )
    .join("");

  qs("#property-overview").innerHTML = `<p>${p.description}</p>`;

  // Section 4: Amenities + Facilities + Purpose Types
  renderAmenities(p);

  // Section 5: Floor Plans
  renderFloorPlans(p.floorPlans || []);

  // Section 6: Map
  renderMap(p);

  // Section 7: Similar Projects
  renderSimilarProjects(p);

  // Sidebar
  qs("#property-agent").innerHTML = `<div class="property-agent-card">
       <h3 class="property-section-title">Listed By</h3>
       <div class="agent-profile">
         <div class="agent-avatar"
              style="background-image:url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200')">
         </div>
         <div class="agent-info">
           <div class="agent-name">Sarah Al-Hassan</div>
           <div class="agent-rating">★★★★★</div>
           <div class="agent-email">
             <a href="mailto:sarah@dastan.ae">sarah@dastan.ae</a>
           </div>
           <div class="agent-phone">
             <i class="fa-solid fa-phone"></i> +971 50 123 4567
           </div>
         </div>
       </div>
       <button class="agent-contact-btn" id="contact-agent-btn">
         <i class="fa-regular fa-envelope"></i> Contact Agent
       </button>
     </div>`;
}

function renderGallery(images) {
  if (!images.length) {
    document.querySelector(".property-gallery").style.display = "none";
    return;
  }

  const heroImg = qs("#gallery-hero-img");
  const thumbsContainer = qs("#gallery-thumbs");

  heroImg.src = images[0];
  heroImg.alt = "Gallery image 1";

  thumbsContainer.innerHTML = images
    .map(
      (src, i) =>
        `<button type="button" class="property-gallery-thumb${i === 0 ? " is-active" : ""}" data-index="${i}">
           <img src="${src}" alt="Gallery thumbnail ${i + 1}" loading="lazy" />
         </button>`,
    )
    .join("");

  thumbsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".property-gallery-thumb");
    if (!btn) return;
    const index = Number(btn.dataset.index);
    heroImg.src = images[index];
    heroImg.alt = `Gallery image ${index + 1}`;
    thumbsContainer
      .querySelectorAll(".property-gallery-thumb.is-active")
      .forEach((el) => el.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
}

function renderAmenities(p) {
  const projectAmenities = amenities.filter((a) => p.amenityIds.includes(a.id));

  qs("#property-amenities").innerHTML = projectAmenities
    .map((a) => {
      const faIcon = AMENITY_ICONS[a.id] || "fa-star";
      return `<div class="property-amenity-item">
       <i class="fa-solid ${faIcon}"></i>
       <span>${a.name}</span>
     </div>`;
    })
    .join("");

  const facilitiesBlock = qs("#property-facilities-block");
  if (p.facilities && p.facilities.length > 0) {
    facilitiesBlock.innerHTML = `
      <h4 class="property-sub-title">Facilities</h4>
      <div class="property-amenities-grid">
        ${p.facilities
          .map(
            (f) =>
              `<div class="property-amenity-item">
             <i class="fa-solid ${getFacilityIcon(f)}"></i>
             <span>${f}</span>
           </div>`,
          )
          .join("")}
      </div>`;
  }

  const purposesBlock = qs("#property-purposes-block");
  if (p.purposeTypes && p.purposeTypes.length > 0) {
    purposesBlock.innerHTML = `
      <h4 class="property-sub-title">Purpose Types</h4>
      <div class="property-amenities-grid">
        ${p.purposeTypes
          .map(
            (pt) =>
              `<div class="property-amenity-item">
             <i class="fa-solid ${getPurposeIcon(pt)}"></i>
             <span>${pt}</span>
           </div>`,
          )
          .join("")}
      </div>`;
  }
}

function renderFloorPlans(floorPlans) {
  const section = qs("#floor-plans-section");
  if (!floorPlans.length) {
    section.style.display = "none";
    return;
  }

  qs("#floor-plans-list").innerHTML = floorPlans
    .map(
      (fp) =>
        `<div class="floor-plan-item">
       <div class="floor-plan-header">
         <span class="floor-plan-name">${fp.name}</span>
         <i class="fa-solid fa-chevron-down floor-plan-chevron"></i>
       </div>
       <div class="floor-plan-body">
         <img src="${fp.image}" alt="${fp.name}" class="floor-plan-img" loading="lazy" />
       </div>
     </div>`,
    )
    .join("");

  qs("#floor-plans-list").addEventListener("click", (e) => {
    const header = e.target.closest(".floor-plan-header");
    if (!header) return;
    const item = header.closest(".floor-plan-item");
    const isOpen = item.classList.contains("is-open");
    document
      .querySelectorAll(".floor-plan-item.is-open")
      .forEach((el) => el.classList.remove("is-open"));
    if (!isOpen) item.classList.add("is-open");
  });
}

function renderMap(p) {
  if (!p.latitude || !p.longitude) {
    qs("#map-section").style.display = "none";
    return;
  }

  const map = L.map("property-map").setView([p.latitude, p.longitude], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
  L.marker([p.latitude, p.longitude])
    .addTo(map)
    .bindPopup(`<strong>${p.name}</strong>`)
    .openPopup();
}

function renderSimilarProjects(currentProject) {
  const similar = projects
    .filter((p) => p.id !== currentProject.id)
    .slice(0, 2);

  const container = qs("#similar-projects-grid");
  if (!container) return;

  if (similar.length === 0) {
    qs(".property-section--related").style.display = "none";
    return;
  }

  container.innerHTML = similar.map((p) => renderProjectCard(p)).join("");
}

function bindActions(project) {
  document.addEventListener("click", (e) => {
    if (e.target.closest("#contact-agent-btn")) {
      openModal({
        title: `Contact Agent`,
        content: `
          <form id="contact-form" class="flex flex-col gap-4">
            <input type="text" placeholder="Your Name" required class="input" />
            <input type="email" placeholder="Email Address" required class="input" />
            <input type="tel" placeholder="Phone Number" class="input" />
            <textarea placeholder="Message about ${project.name}..."
                      rows="4" class="input resize-none"></textarea>
            <button type="submit" class="btn-primary">Send Message</button>
          </form>`,
        onOpen: (modal) => {
          modal
            .querySelector("#contact-form")
            .addEventListener("submit", (ev) => {
              ev.preventDefault();
              modal.querySelector("#contact-form").innerHTML =
                '<p class="text-center text-green-600 font-medium py-4">Message sent! We\'ll be in touch soon.</p>';
            });
        },
      });
    }
  });
}
