import { properties } from "../../data/properties.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";
import { renderFilterBanner } from "../../shared/components/filter-banner/FilterBanner.js";

const PER_PAGE = 6;
let page = 1;
let sortOrder = "default";

const filters = {
  purpose: [],
  types: [],
  beds: [],
  baths: [],
  priceMin: null,
  priceMax: null,
  areaMin: null,
  areaMax: null,
  community: [],
  statuses: [],
  furnishing: null,
  parking: false,
  views: [],
  amenities: [],
};

const COMMUNITY_LABELS = {
  "new-cairo": "New Cairo",
  "new-capital": "New Administrative Capital",
  "north-coast": "North Coast",
  "red-sea": "Red Sea Coast",
  "west-cairo": "West Cairo",
  "cairo-center": "Cairo Centre",
};

const VIEW_LABELS = {
  sea: "Sea View",
  city: "City View",
  garden: "Garden View",
  pool: "Pool View",
  golf: "Golf View",
  canal: "Canal View",
};

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderHeader("#page-header-root");
  renderFilterBanner("#filter-banner-root");
  renderProperties();

  initFilterAccordions();
  initCheckboxFilters();
  initPillFilters();
  initTagFilters();
  initRangeFilters();
  initParkingToggle();
  initMobileSidebar();

  document.querySelector("#clearAllFilters").addEventListener("click", clearAllFilters);
  document.querySelector("#emptyResetBtn").addEventListener("click", clearAllFilters);

  document.querySelector("#sort-select").addEventListener("change", (e) => {
    sortOrder = e.target.value;
    page = 1;
    renderProperties();
  });
});

// ── Header ────────────────────────────────────────────────────────
function renderHeader(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
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
            <span class="page-header__crumb page-header__crumb--active">All Properties</span>
          </nav>
          <h1 class="page-header__title">All Properties</h1>
          <p class="page-header__subtitle">Discover curated residential &amp; commercial listings across the region</p>
        </div>
        <div class="page-header__stats">
          <div class="page-header__stat">
            <span class="page-header__stat-value">800+</span>
            <span class="page-header__stat-label">Listings</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">5</span>
            <span class="page-header__stat-label">Types</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">20</span>
            <span class="page-header__stat-label">Locations</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ── Filter accordions ─────────────────────────────────────────────
function initFilterAccordions() {
  document.querySelectorAll(".filter-section__toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const body = btn.nextElementSibling;
      if (!body) return;
      btn.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        body.classList.add("filter-section__body--collapsed");
      } else {
        body.classList.remove("filter-section__body--collapsed");
        body.style.animation = "none";
        body.offsetHeight; // reflow
        body.style.animation = "";
      }
    });
  });
}

// ── Checkbox filters (purpose, type, community, status) ───────────
function initCheckboxFilters() {
  document.querySelectorAll("input.adv-filter[type='checkbox']:not(#parkingFilter)").forEach((cb) => {
    const name = cb.getAttribute("name");
    if (!name) return;
    cb.addEventListener("change", () => {
      const key = nameToKey(name);
      if (!Array.isArray(filters[key])) return;
      if (cb.checked) {
        if (!filters[key].includes(cb.value)) filters[key].push(cb.value);
      } else {
        filters[key] = filters[key].filter((v) => v !== cb.value);
      }
      refresh();
    });
  });
}

function nameToKey(name) {
  const map = { purpose: "purpose", type: "types", community: "community", status: "statuses" };
  return map[name] || name;
}

// ── Pill filters ──────────────────────────────────────────────────
function initPillFilters() {
  document.querySelectorAll(".filter-pills").forEach((group) => {
    const key = group.dataset.filter;
    const isMulti = group.dataset.multi !== "false";
    if (!key) return;

    group.querySelectorAll(".filter-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        const val = pill.dataset.value;

        if (isMulti) {
          const isActive = pill.classList.toggle("filter-pill--active");
          if (!Array.isArray(filters[key])) filters[key] = [];
          if (isActive) {
            if (!filters[key].includes(val)) filters[key].push(val);
          } else {
            filters[key] = filters[key].filter((v) => v !== val);
          }
        } else {
          const alreadyActive = pill.classList.contains("filter-pill--active");
          group.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("filter-pill--active"));
          filters[key] = null;
          if (!alreadyActive) {
            pill.classList.add("filter-pill--active");
            filters[key] = val;
          }
        }
        refresh();
      });
    });
  });
}

// ── Tag filters ───────────────────────────────────────────────────
function initTagFilters() {
  document.querySelectorAll(".filter-tags").forEach((group) => {
    const key = group.dataset.filter;
    if (!key) return;
    group.querySelectorAll(".filter-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        const val = tag.dataset.value;
        const isActive = tag.classList.toggle("filter-tag--active");
        if (!Array.isArray(filters[key])) filters[key] = [];
        if (isActive) {
          if (!filters[key].includes(val)) filters[key].push(val);
        } else {
          filters[key] = filters[key].filter((v) => v !== val);
        }
        refresh();
      });
    });
  });
}

// ── Range filters (debounced 400ms) ───────────────────────────────
function initRangeFilters() {
  ["priceMin", "priceMax", "areaMin", "areaMax"].forEach((id) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;
    let timer;
    el.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        filters[id] = el.value ? Number(el.value) : null;
        refresh();
      }, 400);
    });
  });
}

// ── Parking toggle ────────────────────────────────────────────────
function initParkingToggle() {
  const el = document.querySelector("#parkingFilter");
  if (!el) return;
  el.addEventListener("change", () => {
    filters.parking = el.checked;
    refresh();
  });
}

// ── Mobile sidebar ────────────────────────────────────────────────
function initMobileSidebar() {
  const btn = document.querySelector("#filtersMobileBtn");
  const sidebar = document.querySelector("#filtersSidebar");
  const overlay = document.querySelector("#sidebarOverlay");
  if (!btn || !sidebar || !overlay) return;

  const open = () => {
    sidebar.classList.add("filters-sidebar--open");
    overlay.classList.add("sidebar-overlay--visible");
    overlay.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    sidebar.classList.remove("filters-sidebar--open");
    overlay.classList.remove("sidebar-overlay--visible");
    overlay.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", () =>
    sidebar.classList.contains("filters-sidebar--open") ? close() : open()
  );
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
}

// ── Refresh ───────────────────────────────────────────────────────
function refresh() {
  page = 1;
  renderProperties();
  renderActiveFilters();
  updateFilterBadge();
}

// ── Active filter chips ───────────────────────────────────────────
function renderActiveFilters() {
  const container = document.querySelector("#activeFilters");
  if (!container) return;
  container.innerHTML = "";

  const addChip = (label, key, value) => {
    const chip = document.createElement("span");
    chip.className = "filter-chip";
    chip.dataset.type = key;
    chip.dataset.value = value ?? "";
    chip.innerHTML = `${label}<button class="filter-chip__remove" aria-label="Remove ${label}"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>`;
    chip.querySelector(".filter-chip__remove").addEventListener("click", () => removeFilter(key, value));
    container.appendChild(chip);
  };

  filters.purpose.forEach((v) => addChip(v === "sale" ? "For Sale" : "For Rent", "purpose", v));
  filters.types.forEach((v) => addChip(v, "types", v));
  filters.community.forEach((v) => addChip(COMMUNITY_LABELS[v] || v, "community", v));
  filters.statuses.forEach((v) => addChip(v, "statuses", v));
  filters.beds.forEach((v) => addChip(v === "0" ? "Studio" : `${v === "5" ? "5+" : v} Beds`, "beds", v));
  filters.baths.forEach((v) => addChip(`${v === "4" ? "4+" : v} Baths`, "baths", v));
  if (filters.furnishing) addChip(filters.furnishing, "furnishing", null);
  if (filters.parking) addChip("Parking", "parking", null);
  filters.views.forEach((v) => addChip(VIEW_LABELS[v] || v, "views", v));
  filters.amenities.forEach((v) => addChip(v.charAt(0).toUpperCase() + v.slice(1), "amenities", v));
  if (filters.priceMin !== null) addChip(`From ${filters.priceMin.toLocaleString()} EGP`, "priceMin", null);
  if (filters.priceMax !== null) addChip(`Up to ${filters.priceMax.toLocaleString()} EGP`, "priceMax", null);
  if (filters.areaMin !== null) addChip(`From ${filters.areaMin} sqm`, "areaMin", null);
  if (filters.areaMax !== null) addChip(`Up to ${filters.areaMax} sqm`, "areaMax", null);

  updateFilterBadge();
}

function removeFilter(key, value) {
  if (["purpose", "types", "community", "statuses", "beds", "baths", "views", "amenities"].includes(key)) {
    filters[key] = filters[key].filter((v) => v !== value);
    syncFilterUI(key, value, false);
  } else if (key === "furnishing") {
    filters.furnishing = null;
    document.querySelectorAll("#furnishingPills .filter-pill").forEach((p) => p.classList.remove("filter-pill--active"));
  } else if (key === "parking") {
    filters.parking = false;
    const el = document.querySelector("#parkingFilter");
    if (el) el.checked = false;
  } else {
    filters[key] = null;
    const el = document.querySelector(`#${key}`);
    if (el) el.value = "";
  }
  page = 1;
  renderProperties();
  renderActiveFilters();
  updateFilterBadge();
}

function syncFilterUI(key, value, active) {
  const nameMap = { purpose: "purpose", types: "type", community: "community", statuses: "status" };
  const inputName = nameMap[key];
  if (inputName) {
    const el = document.querySelector(`input[name="${inputName}"][value="${value}"]`);
    if (el) el.checked = active;
  }
  const groupSel = { beds: "#bedsPills", baths: "#bathsPills", views: "#viewsTags", amenities: "#amenitiesTags" }[key];
  if (groupSel) {
    const el = document.querySelector(`${groupSel} [data-value="${value}"]`);
    if (el) {
      el.classList.remove("filter-pill--active", "filter-tag--active");
      if (active) {
        el.classList.add(el.classList.contains("filter-tag") ? "filter-tag--active" : "filter-pill--active");
      }
    }
  }
}

function clearAllFilters() {
  filters.purpose = [];
  filters.types = [];
  filters.beds = [];
  filters.baths = [];
  filters.priceMin = null;
  filters.priceMax = null;
  filters.areaMin = null;
  filters.areaMax = null;
  filters.community = [];
  filters.statuses = [];
  filters.furnishing = null;
  filters.parking = false;
  filters.views = [];
  filters.amenities = [];

  document.querySelectorAll("input.adv-filter[type='checkbox']").forEach((cb) => (cb.checked = false));
  document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("filter-pill--active"));
  document.querySelectorAll(".filter-tag").forEach((t) => t.classList.remove("filter-tag--active"));
  ["priceMin", "priceMax", "areaMin", "areaMax"].forEach((id) => {
    const el = document.querySelector(`#${id}`);
    if (el) el.value = "";
  });

  page = 1;
  renderProperties();
  renderActiveFilters();
  updateFilterBadge();
}

function updateFilterBadge() {
  const count =
    filters.purpose.length + filters.types.length + filters.beds.length +
    filters.baths.length + filters.statuses.length + filters.community.length +
    filters.views.length + filters.amenities.length +
    (filters.furnishing ? 1 : 0) + (filters.parking ? 1 : 0) +
    (filters.priceMin !== null ? 1 : 0) + (filters.priceMax !== null ? 1 : 0) +
    (filters.areaMin !== null ? 1 : 0) + (filters.areaMax !== null ? 1 : 0);

  const badge = document.querySelector("#filtersBadge");
  if (!badge) return;
  badge.textContent = count;
  badge.hidden = count === 0;
}

// ── Pagination ────────────────────────────────────────────────────
function renderPagination(total) {
  const nav = document.querySelector("#pagination");
  if (!nav) return;

  const totalPages = Math.ceil(total / PER_PAGE);
  if (totalPages <= 1) { nav.innerHTML = ""; return; }

  const chevLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
  const chevRight = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

  let html = `<button class="pagination__btn" id="pagePrev" aria-label="Previous page"${page === 1 ? " disabled" : ""}>${chevLeft}Prev</button>`;

  buildPageRange(page, totalPages).forEach((p) => {
    if (p === "…") {
      html += `<span class="pagination__ellipsis">…</span>`;
    } else {
      html += `<button class="pagination__page${p === page ? " pagination__page--active" : ""}" data-page="${p}" aria-label="Page ${p}"${p === page ? ' aria-current="page"' : ""}>${p}</button>`;
    }
  });

  html += `<button class="pagination__btn" id="pageNext" aria-label="Next page"${page === totalPages ? " disabled" : ""}>Next${chevRight}</button>`;
  nav.innerHTML = html;

  nav.querySelector("#pagePrev")?.addEventListener("click", () => {
    if (page > 1) { page--; renderProperties(); scrollToResults(); }
  });
  nav.querySelector("#pageNext")?.addEventListener("click", () => {
    if (page < totalPages) { page++; renderProperties(); scrollToResults(); }
  });
  nav.querySelectorAll(".pagination__page").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = Number(btn.dataset.page);
      if (p !== page) { page = p; renderProperties(); scrollToResults(); }
    });
  });
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("…");
  for (let j = Math.max(2, current - 1); j <= Math.min(total - 1, current + 1); j++) pages.push(j);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

function scrollToResults() {
  const results = document.querySelector(".properties-results");
  if (results) {
    window.scrollTo({ top: results.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
  }
}

// ── Filter + Sort ─────────────────────────────────────────────────
function getFiltered() {
  let list = [...properties];

  if (filters.purpose.length) list = list.filter((p) => filters.purpose.includes(p.purpose));
  if (filters.types.length) list = list.filter((p) => filters.types.includes(p.type));
  if (filters.community.length) list = list.filter((p) => filters.community.includes(p.community));
  if (filters.statuses.length) list = list.filter((p) => filters.statuses.includes(p.status));

  if (filters.beds.length) {
    list = list.filter((p) =>
      filters.beds.some((b) => (b === "0" ? p.bedrooms === 0 : b === "5" ? p.bedrooms >= 5 : p.bedrooms === Number(b)))
    );
  }
  if (filters.baths.length) {
    list = list.filter((p) =>
      filters.baths.some((b) => (b === "4" ? p.bathrooms >= 4 : p.bathrooms === Number(b)))
    );
  }

  if (filters.priceMin !== null) list = list.filter((p) => p.price >= filters.priceMin);
  if (filters.priceMax !== null) list = list.filter((p) => p.price <= filters.priceMax);
  if (filters.areaMin !== null) list = list.filter((p) => p.area >= filters.areaMin);
  if (filters.areaMax !== null) list = list.filter((p) => p.area <= filters.areaMax);

  if (filters.furnishing) list = list.filter((p) => p.furnishingStatus === filters.furnishing);
  if (filters.parking) list = list.filter((p) => p.parking === true);

  if (filters.views.length) {
    list = list.filter((p) => filters.views.every((v) => p.views && p.views.includes(v)));
  }
  if (filters.amenities.length) {
    list = list.filter((p) => filters.amenities.every((a) => p.amenityIds.includes(a)));
  }

  if (sortOrder === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sortOrder === "area-asc") list.sort((a, b) => a.area - b.area);

  return list;
}

// ── Render ────────────────────────────────────────────────────────
function renderProperties() {
  const filtered = getFiltered();
  const total = filtered.length;
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const grid = document.querySelector("#properties-grid");
  const countEl = document.querySelector("#results-count");
  const emptyEl = document.querySelector("#propertiesEmpty");

  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  pageItems.forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = renderPropertyCard(p);
    fragment.appendChild(div.firstElementChild);
  });
  grid.appendChild(fragment);

  countEl.innerHTML = `Showing <strong>${total}</strong> propert${total !== 1 ? "ies" : "y"}`;
  renderPagination(total);
  emptyEl.hidden = total > 0;
  grid.style.display = total === 0 ? "none" : "";
}
