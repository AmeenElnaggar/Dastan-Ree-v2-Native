import { locations } from "../../data/locations.data.js";
import { projects } from "../../data/projects.data.js";
import { properties } from "../../data/properties.data.js";
import {
  initFilterReset,
  initFilterSelects,
} from "../../shared/components/filter-banner/FilterBanner.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";

const PAGE_SIZE = 8;
const allListings = [...projects, ...properties];

/** Hierarchical data for the cascading filters (mirrors unit-request). */
const LOCATION_TREE = {
  country: [
    { id: 1, name: "Egypt" },
    { id: 2, name: "United Arab Emirates" },
    { id: 3, name: "Saudi Arabia" },
  ],
  region: {
    1: [
      { id: 11, name: "Greater Cairo" },
      { id: 12, name: "North Coast" },
      { id: 13, name: "Red Sea" },
    ],
    2: [
      { id: 21, name: "Dubai" },
      { id: 22, name: "Abu Dhabi" },
    ],
    3: [
      { id: 31, name: "Central" },
      { id: 32, name: "Western" },
    ],
  },
  city: {
    11: [
      { id: 111, name: "New Cairo" },
      { id: 112, name: "6th of October" },
      { id: 113, name: "Sheikh Zayed" },
      { id: 114, name: "Madinaty" },
      { id: 115, name: "New Capital" },
    ],
    12: [
      { id: 121, name: "Sahel" },
      { id: 122, name: "Ras El Hekma" },
    ],
    13: [
      { id: 131, name: "Hurghada" },
      { id: 132, name: "Ain Sokhna" },
    ],
    21: [
      { id: 211, name: "Palm Jumeirah" },
      { id: 212, name: "Downtown Dubai" },
      { id: 213, name: "Dubai Marina" },
    ],
    22: [
      { id: 221, name: "Yas Island" },
      { id: 222, name: "Saadiyat Island" },
    ],
    31: [{ id: 311, name: "Riyadh" }],
    32: [{ id: 321, name: "Jeddah" }],
  },
  areaplace: {
    111: [
      { id: 1111, name: "Fifth Settlement" },
      { id: 1112, name: "Rehab" },
      { id: 1113, name: "Mountain View" },
    ],
    112: [
      { id: 1121, name: "Beverly Hills" },
      { id: 1122, name: "Dreamland" },
    ],
    113: [
      { id: 1131, name: "Allegria" },
      { id: 1132, name: "Westown" },
    ],
    114: [
      { id: 1141, name: "Madinaty Phase 1" },
      { id: 1142, name: "Madinaty Phase 2" },
    ],
    115: [
      { id: 1151, name: "R3" },
      { id: 1152, name: "R7" },
      { id: 1153, name: "R8" },
    ],
    121: [
      { id: 1211, name: "Marassi" },
      { id: 1212, name: "Hacienda Bay" },
    ],
    122: [{ id: 1221, name: "June" }],
    131: [
      { id: 1311, name: "Sahl Hasheesh" },
      { id: 1312, name: "El Gouna" },
    ],
    132: [{ id: 1321, name: "Stella Di Mare" }],
    211: [
      { id: 2111, name: "Atlantis" },
      { id: 2112, name: "Shoreline" },
    ],
    212: [{ id: 2121, name: "Burj Khalifa District" }],
    213: [{ id: 2131, name: "Marina Walk" }],
    221: [{ id: 2211, name: "Yas Acres" }],
    222: [{ id: 2221, name: "Saadiyat Beach" }],
    311: [{ id: 3111, name: "Olaya" }],
    321: [{ id: 3211, name: "Al Hamra" }],
  },
};

const ICONS = {
  globe: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  map: `<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>`,
  building: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 21V10h8v11"/><path d="M12 3v7"/>`,
  pin: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>`,
};

const CASCADE_FIELDS = [
  {
    key: "country",
    label: "Country",
    placeholder: "All Countries",
    icon: ICONS.globe,
    lookup: "country",
  },
  {
    key: "region",
    label: "Region",
    placeholder: "All Regions",
    icon: ICONS.map,
    lookup: "region",
    parent: "country",
  },
  {
    key: "city",
    label: "City",
    placeholder: "All Cities",
    icon: ICONS.building,
    lookup: "city",
    parent: "region",
  },
  {
    key: "area",
    label: "Area / Place",
    placeholder: "All Areas",
    icon: ICONS.pin,
    lookup: "areaplace",
    parent: "city",
  },
];

const ORDER = CASCADE_FIELDS.map((f) => f.key);
const cascadeState = { country: "", region: "", city: "", area: "" };

function getListingCount(searchKey) {
  const needle = (searchKey || "").toLowerCase();
  return allListings.filter((item) =>
    (item.location || "").toLowerCase().includes(needle),
  ).length;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderHeader("#page-header-root");

  const grid = document.getElementById("locationsGrid");
  const empty = document.getElementById("locationsEmpty");
  const countEl = document.getElementById("locationsCount");
  const paginationEl = document.getElementById("locationsPagination");

  const sorted = [...locations].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  let filtered = sorted.slice();
  let currentPage = 1;

  const fadeObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  function applyFilter() {
    const terms = ORDER.map((k) => cascadeState[k])
      .filter(Boolean)
      .map((t) => t.toLowerCase());

    filtered = sorted.filter((loc) => {
      const haystack = [loc.name, loc.region, loc.searchKey]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return terms.every((t) => haystack.includes(t));
    });
    currentPage = 1;
    renderPage();
  }

  function renderPage() {
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    grid.innerHTML = pageItems.map(renderLocationCard).join("");
    grid.hidden = total === 0;
    empty.hidden = total > 0;

    countEl.innerHTML = `<strong>${total}</strong> ${
      total === 1 ? "location" : "locations"
    }`;

    grid.querySelectorAll(".fade-up").forEach((el) => fadeObs.observe(el));

    renderPagination(totalPages);
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) {
      paginationEl.hidden = true;
      paginationEl.innerHTML = "";
      return;
    }
    paginationEl.hidden = false;

    const chevLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
    const chevRight = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

    let html = `<button class="locations-pagination__btn" data-action="prev" aria-label="Previous page"${currentPage === 1 ? " disabled" : ""}>${chevLeft}<span>Prev</span></button>`;

    buildPageRange(currentPage, totalPages).forEach((p) => {
      if (p === "…") {
        html += `<span class="locations-pagination__ellipsis">…</span>`;
      } else {
        const active = p === currentPage;
        html += `<button class="locations-pagination__page${active ? " locations-pagination__page--active" : ""}" data-page="${p}" aria-label="Page ${p}"${active ? ' aria-current="page"' : ""}>${p}</button>`;
      }
    });

    html += `<button class="locations-pagination__btn" data-action="next" aria-label="Next page"${currentPage === totalPages ? " disabled" : ""}><span>Next</span>${chevRight}</button>`;

    paginationEl.innerHTML = html;

    paginationEl.querySelectorAll("[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPage = Number(btn.dataset.page);
        renderPage();
        scrollToGrid();
      });
    });
    paginationEl
      .querySelector('[data-action="prev"]')
      ?.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage -= 1;
          renderPage();
          scrollToGrid();
        }
      });
    paginationEl
      .querySelector('[data-action="next"]')
      ?.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage += 1;
          renderPage();
          scrollToGrid();
        }
      });
  }

  function scrollToGrid() {
    grid.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll(".fade-up").forEach((el) => fadeObs.observe(el));

  renderLocationsFilterBanner("#filter-banner-root", {
    onApply: (state) => {
      Object.assign(cascadeState, state);
      applyFilter();
    },
  });

  renderPage();
});

/* ==========================================================================
   Page header (mirrors projects/properties page-header)
   ========================================================================== */
function renderHeader(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const totalLocations = locations.length;
  const totalRegions = new Set(locations.map((l) => l.region).filter(Boolean))
    .size;
  const totalCountries = LOCATION_TREE.country.length;

  root.innerHTML = `
    <header class="page-header">
      <div class="page-header__pattern"></div>
      <div class="page-header__inner">
        <div class="page-header__content">
          <nav class="page-header__breadcrumb" aria-label="Breadcrumb">
            <a href="../home/index.html" class="page-header__crumb">Home</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span class="page-header__crumb page-header__crumb--active">Locations</span>
          </nav>
          <h1 class="page-header__title">Find Your Perfect Address</h1>
          <p class="page-header__subtitle">Browse premium properties and projects across the region's most coveted destinations</p>
        </div>
        <div class="page-header__stats">
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalLocations}+</span>
            <span class="page-header__stat-label">Locations</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalRegions}</span>
            <span class="page-header__stat-label">Regions</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalCountries}</span>
            <span class="page-header__stat-label">Countries</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

/* ==========================================================================
   Locations filter banner — cascade country → region → city → area
   ========================================================================== */
function renderLocationsFilterBanner(rootSelector, { onApply } = {}) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  root.innerHTML = `
    <section class="filter-banner locations-filter-banner">
      <div class="filter-banner__watermark" aria-hidden="true">
        <img src="../../assets/images/logo-pattern.png" alt="" />
      </div>
      <div class="filter-banner__container">
        <div class="filter-banner__inner">
          <form class="filter-banner__form" aria-label="Location filters" id="locationsFilterForm">
            ${CASCADE_FIELDS.map(renderBannerField).join('<div class="filter-banner__divider" aria-hidden="true"></div>')}
            <div class="filter-banner__actions">
              <button type="button" class="filter-banner__reset-btn" id="locationsFilterReset" aria-label="Reset filters">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="1 4 1 10 7 10"/>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                </svg>
                <span>Reset</span>
              </button>
              <button type="button" class="filter-banner__search-btn" id="locationsFilterApply" aria-label="Search filters">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;

  // Initial: populate country, leave others empty/disabled
  populate(root, "country", LOCATION_TREE.country);
  ["region", "city", "area"].forEach((k) => populate(root, k, []));

  CASCADE_FIELDS.forEach((field) => {
    const sel = root.querySelector(`#filter_${field.key}`);
    sel.addEventListener("change", () => handleCascadeChange(root, field.key));
  });

  root.querySelector("#locationsFilterApply").addEventListener("click", () => {
    fireApply(root, onApply);
  });

  initFilterSelects(root);

  const form = root.querySelector(".filter-banner__form");
  initFilterReset(form, { onReset: () => fireApply(root, onApply) });
}

function fireApply(root, onApply) {
  if (typeof onApply !== "function") return;
  const state = {};
  CASCADE_FIELDS.forEach((f) => {
    const s = root.querySelector(`#filter_${f.key}`);
    const opt = s.options[s.selectedIndex];
    state[f.key] = s.value ? opt?.text || "" : "";
  });
  onApply(state);
}

function renderBannerField(field) {
  return `
    <div class="filter-banner__field">
      <label class="filter-banner__label" for="filter_${field.key}">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${field.icon}
        </svg>
        ${escapeHtml(field.label)}
      </label>
      <div class="filter-banner__select-wrap">
        <select class="filter-banner__select" id="filter_${field.key}" data-cascade="${field.key}" aria-label="${escapeAttr(field.label)}"${field.parent ? " disabled" : ""}>
          <option value="">${escapeHtml(field.placeholder)}</option>
        </select>
        <svg class="filter-banner__chevron" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </div>
  `;
}

function handleCascadeChange(root, changedKey) {
  const idx = ORDER.indexOf(changedKey);
  const changedSel = root.querySelector(`#filter_${changedKey}`);
  const childKey = ORDER[idx + 1];
  if (!childKey) return;

  const childField = CASCADE_FIELDS[idx + 1];
  const lookup = LOCATION_TREE[childField.lookup];
  const childOpts = changedSel.value ? lookup[changedSel.value] || [] : [];
  populate(root, childKey, childOpts);

  // Cascade-clear deeper levels (their parents are now empty/changed)
  for (let i = idx + 2; i < ORDER.length; i++) {
    populate(root, ORDER[i], []);
  }
}

function populate(root, key, options) {
  const sel = root.querySelector(`#filter_${key}`);
  if (!sel) return;
  const field = CASCADE_FIELDS.find((f) => f.key === key);
  const items = options
    .map((o) => `<option value="${o.id}">${escapeHtml(o.name)}</option>`)
    .join("");
  sel.innerHTML = `<option value="">${escapeHtml(field.placeholder)}</option>${items}`;
  sel.value = "";
  // Country always enabled; child levels disabled when no options.
  sel.disabled = field.parent ? options.length === 0 : false;
}

/* ==========================================================================
   Card + utilities
   ========================================================================== */
function buildPageRange(current, total) {
  const range = [];
  const delta = 1;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("…");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("…");
  if (total > 1) range.push(total);

  return range;
}

function renderLocationCard(loc, index) {
  const delay = Math.min(index * 0.05, 0.4);
  const count = getListingCount(loc.searchKey);
  const label = count === 1 ? "Listing" : "Listings";
  const href = `../location-details/index.html?id=${encodeURIComponent(loc.id)}`;

  return `
    <a href="${href}" class="location-card fade-up" role="listitem" style="transition-delay: ${delay}s" aria-label="${escapeAttr(loc.name)}">
      <div class="location-card__image-wrap">
        <img src="${loc.image}" alt="${escapeAttr(loc.name)}" class="location-card__img" loading="lazy" />
        <div class="location-card__overlay"></div>
      </div>
      <div class="location-card__body">
        <span class="location-card__region">${escapeHtml(loc.region)}</span>
        <h3 class="location-card__name">${escapeHtml(loc.name)}</h3>
        <div class="location-card__footer">
          <span class="location-card__count">${count} ${label}</span>
          <span class="location-card__explore">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    </a>
  `;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str) {
  return escapeHtml(str);
}
