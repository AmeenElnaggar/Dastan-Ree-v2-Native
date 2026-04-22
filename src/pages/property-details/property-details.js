import { amenities } from "../../data/amenities.data.js";
import { properties } from "../../data/properties.data.js";
import {
  AMENITY_ICONS,
  getFacilityIcon,
  getPurposeIcon,
} from "../../shared/components/amenities/icons.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { openModal } from "../../shared/components/modal/Modal.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";
import { formatNumber } from "../../utils/format.js";
import { getParam } from "../../utils/router.js";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const id = getParam("id") || properties[0]?.id;
  const property = properties.find((p) => p.id === id) || properties[0];

  if (!property) {
    document.body.innerHTML =
      '<p class="text-center py-20 text-gray-500">Property not found.</p>';
    return;
  }

  renderProperty(property);
  initHeroSwiper(property);
  initSimilarSwiper(property);
  initStickyBar();
  bindActions(property);
});

// ── Render ────────────────────────────────────────────────────────

function renderProperty(p) {
  document.title = `${p.name} — Dastan Real Estate`;

  renderHeroOverlay(p);
  renderStatsRibbon(p);
  renderAbout(p);
  renderAmenities(p);
  renderFloorPlans(p.floorPlans || []);
  renderMasterplan(p);
  renderMap(p);
  renderNeighborhood(p);
  renderSidebar(p);
}

function renderHeroOverlay(p) {
  const badge = document.querySelector("#hero-badge");
  const TYPE_LABEL = {
    apartment: "Apartment",
    villa: "Villa",
    commercial: "Commercial",
  };
  badge.textContent = TYPE_LABEL[p.type] || p.type || "";

  document.querySelector("#hero-title").textContent = p.name;
  document.querySelector("#hero-location").innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ${p.location}`;

  document.querySelector("#hero-price-card").innerHTML = `
    <div class="pd-hero__price-label">Starting From</div>
    <div class="pd-hero__price-row">
      <span class="pd-hero__price-currency">EGP</span>
      <span class="pd-hero__price-amount">${formatNumber(p.price)}</span>
    </div>
    <button class="pd-hero__schedule-btn" id="hero-schedule-btn" type="button">
      <i class="fa-regular fa-calendar-check" aria-hidden="true"></i> Schedule a Viewing
    </button>`;

  // Sticky bar
  document.querySelector("#sticky-name").textContent = p.name;
  document.querySelector("#sticky-price").textContent =
    `EGP ${formatNumber(p.price)}`;
}

function renderStatsRibbon(p) {
  const stats = [
    {
      icon: "fa-bed",
      label: "Bedrooms",
      value: p.bedrooms != null ? p.bedrooms : "—",
    },
    {
      icon: "fa-bath",
      label: "Bathrooms",
      value: p.bathrooms != null ? p.bathrooms : "—",
    },
    {
      icon: "fa-ruler-combined",
      label: "Area",
      value: p.area ? `${p.area} m²` : "—",
    },
    {
      icon: "fa-calendar-check",
      label: "Delivery",
      value: p.deliveryDate || "—",
    },
    {
      icon: "fa-paint-roller",
      label: "Finishing",
      value: p.finishingType || "—",
    },
    { icon: "fa-couch", label: "Furnishing", value: p.furnishingStatus || "—" },
  ];

  document.querySelector("#stats-grid").innerHTML = stats
    .map(
      (s) => `
      <div class="pd-stat-card">
        <div class="pd-stat-card__icon"><i class="fa-solid ${s.icon}" aria-hidden="true"></i></div>
        <div class="pd-stat-card__label">${s.label}</div>
        <div class="pd-stat-card__value">${s.value}</div>
      </div>`,
    )
    .join("");
}

function renderAbout(p) {
  const devLogoHtml = p.developerLogo
    ? `<img src="${p.developerLogo}" alt="${p.developer}" class="pd-developer-card__logo" loading="lazy" />`
    : `<div class="pd-developer-card__logo pd-developer-card__logo--placeholder"><i class="fa-solid fa-building"></i></div>`;

  document.querySelector("#about-body").innerHTML = `
    <p class="pd-about__text">${p.description || p.shortDescription || ""}</p>
    <div class="pd-developer-card">
      ${devLogoHtml}
      <div class="pd-developer-card__label">Developer</div>
      <div class="pd-developer-card__name">${p.developer || "—"}</div>
    </div>`;
}

function renderAmenities(p) {
  const propAmenities = amenities.filter((a) =>
    (p.amenityIds || []).includes(a.id),
  );

  document.querySelector("#amenities-grid").innerHTML =
    propAmenities
      .map(
        (a) => `
      <div class="pd-amenity-item">
        <i class="fa-solid ${AMENITY_ICONS[a.id] || "fa-star"}" aria-hidden="true"></i>
        <span>${a.name}</span>
      </div>`,
      )
      .join("") || '<p class="text-sm text-gray-400">No amenities listed.</p>';

  const facilBlock = document.querySelector("#facilities-block");
  if (p.facilities && p.facilities.length > 0) {
    facilBlock.innerHTML = `
      <div class="pd-chips-section">
        <div class="pd-chips-label">Facilities</div>
        <div class="pd-chips">
          ${p.facilities
            .map(
              (f) =>
                `<span class="pd-chip"><i class="fa-solid ${getFacilityIcon(f)}" aria-hidden="true"></i>${f}</span>`,
            )
            .join("")}
        </div>
      </div>`;
  }

  const purposeBlock = document.querySelector("#purposes-block");
  if (p.purposeTypes && p.purposeTypes.length > 0) {
    purposeBlock.innerHTML = `
      <div class="pd-chips-section">
        <div class="pd-chips-label">Purpose</div>
        <div class="pd-chips">
          ${p.purposeTypes
            .map(
              (pt) =>
                `<span class="pd-chip"><i class="fa-solid ${getPurposeIcon(pt)}" aria-hidden="true"></i>${pt}</span>`,
            )
            .join("")}
        </div>
      </div>`;
  }
}

function renderFloorPlans(floorPlans) {
  const section = document.querySelector("#floorplans-section");
  if (!floorPlans.length) {
    section.style.display = "none";
    return;
  }

  const tabsEl = document.querySelector("#floorplan-tabs");
  const imgEl = document.querySelector("#floorplan-active-img");

  const activate = (index) => {
    imgEl.src = floorPlans[index].image;
    imgEl.alt = floorPlans[index].name;
    tabsEl
      .querySelectorAll(".pd-floorplan-tab")
      .forEach((t, i) => t.classList.toggle("active", i === index));
  };

  tabsEl.innerHTML = floorPlans
    .map(
      (fp, i) =>
        `<button class="pd-floorplan-tab${i === 0 ? " active" : ""}" data-index="${i}" type="button">${fp.name}</button>`,
    )
    .join("");

  imgEl.src = floorPlans[0].image;
  imgEl.alt = floorPlans[0].name;

  tabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".pd-floorplan-tab");
    if (!btn) return;
    activate(Number(btn.dataset.index));
  });
}

function renderMasterplan(p) {
  const section = document.querySelector("#masterplan-section");
  if (!p.masterplanImage) {
    section.style.display = "none";
    return;
  }
  document.querySelector("#masterplan-img").src = p.masterplanImage;
}

function renderMap(p) {
  const section = document.querySelector("#map-section");
  if (!p.latitude || !p.longitude) {
    section.style.display = "none";
    return;
  }

  const map = L.map("property-map").setView([p.latitude, p.longitude], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const icon = L.divIcon({
    className: "",
    html: `<div class="pd-map-pin"><i class="fa-solid fa-location-dot"></i></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  L.marker([p.latitude, p.longitude], { icon })
    .addTo(map)
    .bindPopup(`<strong>${p.name}</strong><br>${p.location}`)
    .openPopup();
}

function renderNeighborhood(p) {
  const items = (p.facilities || []).slice(0, 6).map(
    (f) => `<div class="pd-neighborhood__item">
      <i class="fa-solid ${getFacilityIcon(f)}" aria-hidden="true"></i>
      <span>${f}</span>
    </div>`,
  );

  document.querySelector("#neighborhood-list").innerHTML = `
    <div class="pd-neighborhood__title">Neighborhood Highlights</div>
    ${items.join("") || '<p class="text-sm text-gray-400">No highlights available.</p>'}`;
}

function renderSidebar(p) {
  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");

  document.querySelector("#quick-facts").innerHTML = `
    <div class="pd-quick-facts__title">Quick Facts</div>
    ${[
      ["Status", p.status || "—"],
      ["Type", capitalize(p.type)],
      ["Total Units", p.units != null ? p.units : "—"],
      ["Year Built", p.year || "—"],
    ]
      .map(
        ([k, v]) =>
          `<div class="pd-quick-facts__row">
            <span class="pd-quick-facts__key">${k}</span>
            <span class="pd-quick-facts__val">${v}</span>
          </div>`,
      )
      .join("")}`;

  document.querySelector("#contact-form-card").innerHTML = `
    <div class="pd-cform__title">Get in Touch</div>
    <form class="pd-cform__form" id="sidebar-contact-form" novalidate>
      <div class="pd-cform__field">
        <label class="pd-cform__label" for="cf-name">Full Name</label>
        <input class="pd-cform__input" id="cf-name" type="text" placeholder="Your name" required />
      </div>
      <div class="pd-cform__field">
        <label class="pd-cform__label" for="cf-phone">Phone</label>
        <input class="pd-cform__input" id="cf-phone" type="tel" placeholder="+20 xxx xxx xxxx" />
      </div>
      <div class="pd-cform__field">
        <label class="pd-cform__label" for="cf-message">Message</label>
        <textarea class="pd-cform__input pd-cform__textarea" id="cf-message" rows="4" placeholder="I'm interested in ${p.name}…"></textarea>
      </div>
      <button class="pd-cform__submit" type="submit">Send Enquiry</button>
      <a class="pd-cform__whatsapp" href="https://wa.me/9712019220" target="_blank" rel="noopener">
        <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> WhatsApp Us
      </a>
    </form>`;

  document
    .querySelector("#sidebar-contact-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      form.innerHTML =
        '<p class="pd-cform__success">Thank you! We\'ll be in touch shortly.</p>';
    });
}

// ── Sliders ───────────────────────────────────────────────────────

function initHeroSwiper(p) {
  const slidesContainer = document.querySelector("#hero-slides");
  const images = p.images && p.images.length ? p.images : [p.image];

  slidesContainer.innerHTML = images
    .map(
      (src) =>
        `<div class="swiper-slide">
          <img src="${src}" alt="${p.name}" loading="lazy" />
        </div>`,
    )
    .join("");

  new Swiper("#hero-swiper", {
    loop: images.length > 1,
    autoplay:
      images.length > 1 ? { delay: 5500, disableOnInteraction: false } : false,
    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 1200,
    navigation: {
      nextEl: ".pd-hero__btn--next",
      prevEl: ".pd-hero__btn--prev",
    },
    pagination: {
      el: ".pd-hero__pagination",
      clickable: true,
    },
  });
}

function initSimilarSwiper(currentProperty) {
  const similar = properties
    .filter((p) => p.type === currentProperty.type)
    .slice(0, 6);

  const section = document.querySelector("#similar-section");
  if (!similar.length) {
    section.style.display = "none";
    return;
  }

  const slidesEl = document.querySelector("#similar-slides");
  similar.forEach((p) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = renderPropertyCard(p);
    slidesEl.appendChild(slide);
  });

  new Swiper("#similar-swiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: similar.length > 3,
    navigation: {
      nextEl: "#similar-next",
      prevEl: "#similar-prev",
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

// ── Sticky Bar ────────────────────────────────────────────────────

function initStickyBar() {
  const stickyBar = document.querySelector("#pd-sticky");
  const hero = document.querySelector("#pd-hero");

  const observer = new IntersectionObserver(
    ([entry]) => {
      const visible = !entry.isIntersecting;
      stickyBar.classList.toggle("pd-sticky--visible", visible);
      stickyBar.setAttribute("aria-hidden", String(!visible));
    },
    { threshold: 0.05 },
  );
  observer.observe(hero);
}

// ── Actions ───────────────────────────────────────────────────────

function openViewingModal(propertyName) {
  openModal({
    title: "Schedule a Viewing",
    content: `
      <form id="viewing-form" class="flex flex-col gap-4">
        <input type="text" placeholder="Your Full Name" required class="input" />
        <input type="email" placeholder="Email Address" required class="input" />
        <input type="tel" placeholder="Phone Number" class="input" />
        <input type="date" class="input" />
        <textarea placeholder="Any specific requests for ${propertyName}..." rows="3" class="input resize-none"></textarea>
        <button type="submit" class="btn-primary">Confirm Viewing Request</button>
      </form>`,
    onOpen: (modal) => {
      modal.querySelector("#viewing-form").addEventListener("submit", (ev) => {
        ev.preventDefault();
        modal.querySelector("#viewing-form").innerHTML =
          '<p class="text-center text-green-600 font-medium py-6">Your viewing request has been received!<br>Our agent will contact you shortly.</p>';
      });
    },
  });
}

function bindActions(property) {
  document.addEventListener("click", (e) => {
    if (
      e.target.closest("#hero-schedule-btn") ||
      e.target.closest("#sticky-schedule-btn")
    ) {
      openViewingModal(property.name);
    }

    if (e.target.closest("#masterplan-expand-btn")) {
      const src = document.querySelector("#masterplan-img")?.src;
      if (src) {
        openModal({
          title: "Masterplan",
          content: `<img src="${src}" alt="Masterplan" style="width:100%;border-radius:8px;" />`,
        });
      }
    }
  });
}
