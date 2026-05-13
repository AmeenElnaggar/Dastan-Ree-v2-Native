import { projects } from "../../data/projects.data.js";
import { renderFilterBanner } from "../../shared/components/filter-banner/FilterBanner.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";

const PER_PAGE = 6;
let page = 1;
let sortOrder = "default";

const filters = {
  purpose: [],
  types: [],
  statuses: [],
  developers: [],
  beds: [],
  baths: [],
  priceMin: null,
  priceMax: null,
  areaMin: null,
  areaMax: null,
  year: [],
  finishing: null,
  furnishing: null,
  featured: false,
  amenities: [],
};

const TYPE_LABELS = {
  apartment: "Apartment",
  villa: "Villa",
  townhouse: "Townhouse",
  penthouse: "Penthouse",
  office: "Office",
  retail: "Retail",
};

const AMENITY_LABELS = {
  pool: "Pool",
  gym: "Gym",
  parking: "Parking",
  security: "Security",
  beach: "Beach",
  garden: "Garden",
  concierge: "Concierge",
  spa: "Spa",
  playground: "Playground",
  rooftop: "Rooftop",
  cafe: "Café",
};

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderHeader("#page-header-root");
  renderFilterBanner("#filter-banner-root");
  populateDeveloperFilters();
  renderProjects();

  initFilterAccordions();
  initCheckboxFilters();
  initPillFilters();
  initTagFilters();
  initRangeFilters();
  initFeaturedToggle();
  initMobileSidebar();

  document
    .querySelector("#clearAllFilters")
    .addEventListener("click", clearAllFilters);
  document
    .querySelector("#emptyResetBtn")
    .addEventListener("click", clearAllFilters);

  document.querySelector("#sort-select").addEventListener("change", (e) => {
    sortOrder = e.target.value;
    page = 1;
    renderProjects();
  });
});

// ── Header ────────────────────────────────────────────────────────
function renderHeader(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const totalProjects = projects.length;
  const totalTypes = new Set(projects.map((p) => p.type).filter(Boolean)).size;
  const totalDevelopers = new Set(
    projects.map((p) => p.developer).filter(Boolean),
  ).size;

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
            <span class="page-header__crumb page-header__crumb--active">All Projects</span>
          </nav>
          <h1 class="page-header__title">All Projects</h1>
          <p class="page-header__subtitle">Explore master-planned developments by the region's leading developers</p>
        </div>
        <div class="page-header__stats">
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalProjects}+</span>
            <span class="page-header__stat-label">Projects</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalTypes}</span>
            <span class="page-header__stat-label">Types</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalDevelopers}</span>
            <span class="page-header__stat-label">Developers</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ── Developer list (populated from data) ──────────────────────────
function populateDeveloperFilters() {
  const list = document.querySelector("#developerList");
  if (!list) return;
  const developers = [
    ...new Set(projects.map((p) => p.developer).filter(Boolean)),
  ].sort();
  list.innerHTML = developers
    .map(
      (dev) => `
        <label class="filter-check">
          <input type="checkbox" name="developer" value="${dev}" class="adv-filter"/>
          <span class="filter-check__box"></span>${dev}
        </label>`,
    )
    .join("");
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

// ── Checkbox filters ──────────────────────────────────────────────
function initCheckboxFilters() {
  document
    .querySelectorAll("input.adv-filter[type='checkbox']:not(#featuredFilter)")
    .forEach((cb) => {
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
  const map = {
    purpose: "purpose",
    type: "types",
    status: "statuses",
    developer: "developers",
  };
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
          group
            .querySelectorAll(".filter-pill")
            .forEach((p) => p.classList.remove("filter-pill--active"));
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

// ── Featured toggle ───────────────────────────────────────────────
function initFeaturedToggle() {
  const el = document.querySelector("#featuredFilter");
  if (!el) return;
  el.addEventListener("change", () => {
    filters.featured = el.checked;
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
    sidebar.classList.contains("filters-sidebar--open") ? close() : open(),
  );
  overlay.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// ── Refresh ───────────────────────────────────────────────────────
function refresh() {
  page = 1;
  renderProjects();
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
    chip
      .querySelector(".filter-chip__remove")
      .addEventListener("click", () => removeFilter(key, value));
    container.appendChild(chip);
  };

  filters.purpose.forEach((v) => addChip(v, "purpose", v));
  filters.types.forEach((v) => addChip(TYPE_LABELS[v] || v, "types", v));
  filters.statuses.forEach((v) => addChip(v, "statuses", v));
  filters.developers.forEach((v) => addChip(v, "developers", v));
  filters.beds.forEach((v) =>
    addChip(v === "0" ? "Studio" : `${v === "5" ? "5+" : v} Beds`, "beds", v),
  );
  filters.baths.forEach((v) =>
    addChip(`${v === "4" ? "4+" : v} Baths`, "baths", v),
  );
  filters.year.forEach((v) => addChip(v === "2026" ? "2026+" : v, "year", v));
  if (filters.finishing) addChip(filters.finishing, "finishing", null);
  if (filters.furnishing) addChip(filters.furnishing, "furnishing", null);
  if (filters.featured) addChip("Featured", "featured", null);
  filters.amenities.forEach((v) =>
    addChip(AMENITY_LABELS[v] || v, "amenities", v),
  );
  if (filters.priceMin !== null)
    addChip(`From ${filters.priceMin.toLocaleString()} EGP`, "priceMin", null);
  if (filters.priceMax !== null)
    addChip(`Up to ${filters.priceMax.toLocaleString()} EGP`, "priceMax", null);
  if (filters.areaMin !== null)
    addChip(`From ${filters.areaMin} sqm`, "areaMin", null);
  if (filters.areaMax !== null)
    addChip(`Up to ${filters.areaMax} sqm`, "areaMax", null);

  updateFilterBadge();
}

function removeFilter(key, value) {
  if (
    [
      "purpose",
      "types",
      "statuses",
      "developers",
      "beds",
      "baths",
      "year",
      "amenities",
    ].includes(key)
  ) {
    filters[key] = filters[key].filter((v) => v !== value);
    syncFilterUI(key, value, false);
  } else if (key === "finishing") {
    filters.finishing = null;
    document
      .querySelectorAll("#finishingPills .filter-pill")
      .forEach((p) => p.classList.remove("filter-pill--active"));
  } else if (key === "furnishing") {
    filters.furnishing = null;
    document
      .querySelectorAll("#furnishingPills .filter-pill")
      .forEach((p) => p.classList.remove("filter-pill--active"));
  } else if (key === "featured") {
    filters.featured = false;
    const el = document.querySelector("#featuredFilter");
    if (el) el.checked = false;
  } else {
    filters[key] = null;
    const el = document.querySelector(`#${key}`);
    if (el) el.value = "";
  }
  page = 1;
  renderProjects();
  renderActiveFilters();
  updateFilterBadge();
}

function syncFilterUI(key, value, active) {
  const nameMap = {
    purpose: "purpose",
    types: "type",
    statuses: "status",
    developers: "developer",
  };
  const inputName = nameMap[key];
  if (inputName) {
    const el = document.querySelector(
      `input[name="${inputName}"][value="${value}"]`,
    );
    if (el) el.checked = active;
  }
  const groupSel = {
    beds: "#bedsPills",
    baths: "#bathsPills",
    year: "#yearPills",
    amenities: "#amenitiesTags",
  }[key];
  if (groupSel) {
    const el = document.querySelector(`${groupSel} [data-value="${value}"]`);
    if (el) {
      el.classList.remove("filter-pill--active", "filter-tag--active");
      if (active) {
        el.classList.add(
          el.classList.contains("filter-tag")
            ? "filter-tag--active"
            : "filter-pill--active",
        );
      }
    }
  }
}

function clearAllFilters() {
  filters.purpose = [];
  filters.types = [];
  filters.statuses = [];
  filters.developers = [];
  filters.beds = [];
  filters.baths = [];
  filters.priceMin = null;
  filters.priceMax = null;
  filters.areaMin = null;
  filters.areaMax = null;
  filters.year = [];
  filters.finishing = null;
  filters.furnishing = null;
  filters.featured = false;
  filters.amenities = [];

  document
    .querySelectorAll("input.adv-filter[type='checkbox']")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll(".filter-pill")
    .forEach((p) => p.classList.remove("filter-pill--active"));
  document
    .querySelectorAll(".filter-tag")
    .forEach((t) => t.classList.remove("filter-tag--active"));
  ["priceMin", "priceMax", "areaMin", "areaMax"].forEach((id) => {
    const el = document.querySelector(`#${id}`);
    if (el) el.value = "";
  });

  page = 1;
  renderProjects();
  renderActiveFilters();
  updateFilterBadge();
}

function updateFilterBadge() {
  const count =
    filters.purpose.length +
    filters.types.length +
    filters.statuses.length +
    filters.developers.length +
    filters.beds.length +
    filters.baths.length +
    filters.year.length +
    filters.amenities.length +
    (filters.finishing ? 1 : 0) +
    (filters.furnishing ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.priceMin !== null ? 1 : 0) +
    (filters.priceMax !== null ? 1 : 0) +
    (filters.areaMin !== null ? 1 : 0) +
    (filters.areaMax !== null ? 1 : 0);

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
  if (totalPages <= 1) {
    nav.innerHTML = "";
    return;
  }

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
    if (page > 1) {
      page--;
      renderProjects();
      scrollToResults();
    }
  });
  nav.querySelector("#pageNext")?.addEventListener("click", () => {
    if (page < totalPages) {
      page++;
      renderProjects();
      scrollToResults();
    }
  });
  nav.querySelectorAll(".pagination__page").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = Number(btn.dataset.page);
      if (p !== page) {
        page = p;
        renderProjects();
        scrollToResults();
      }
    });
  });
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (current > 3) pages.push("…");
  for (
    let j = Math.max(2, current - 1);
    j <= Math.min(total - 1, current + 1);
    j++
  )
    pages.push(j);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

function scrollToResults() {
  const results = document.querySelector(".properties-results");
  if (results) {
    window.scrollTo({
      top: results.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  }
}

// ── Filter + Sort ─────────────────────────────────────────────────
function getFiltered() {
  let list = [...projects];

  if (filters.purpose.length) {
    list = list.filter(
      (p) =>
        Array.isArray(p.purposeTypes) &&
        p.purposeTypes.some((t) => filters.purpose.includes(t)),
    );
  }
  if (filters.types.length)
    list = list.filter((p) =>
      filters.types.includes((p.type || "").toLowerCase()),
    );
  if (filters.statuses.length)
    list = list.filter((p) => filters.statuses.includes(p.status));
  if (filters.developers.length)
    list = list.filter((p) => filters.developers.includes(p.developer));

  if (filters.beds.length) {
    list = list.filter((p) =>
      filters.beds.some((b) =>
        b === "0"
          ? p.bedrooms === 0
          : b === "5"
            ? p.bedrooms >= 5
            : p.bedrooms === Number(b),
      ),
    );
  }
  if (filters.baths.length) {
    list = list.filter((p) =>
      filters.baths.some((b) =>
        b === "4" ? p.bathrooms >= 4 : p.bathrooms === Number(b),
      ),
    );
  }

  if (filters.priceMin !== null)
    list = list.filter((p) => p.price >= filters.priceMin);
  if (filters.priceMax !== null)
    list = list.filter((p) => p.price <= filters.priceMax);
  if (filters.areaMin !== null)
    list = list.filter((p) => p.area >= filters.areaMin);
  if (filters.areaMax !== null)
    list = list.filter((p) => p.area <= filters.areaMax);

  if (filters.year.length) {
    list = list.filter((p) =>
      filters.year.some((y) =>
        y === "2026" ? p.year >= 2026 : p.year === Number(y),
      ),
    );
  }

  if (filters.finishing)
    list = list.filter((p) => p.finishingType === filters.finishing);
  if (filters.furnishing)
    list = list.filter((p) => p.furnishingStatus === filters.furnishing);
  if (filters.featured) list = list.filter((p) => p.featured === true);

  if (filters.amenities.length) {
    list = list.filter((p) =>
      filters.amenities.every(
        (a) => Array.isArray(p.amenityIds) && p.amenityIds.includes(a),
      ),
    );
  }

  if (sortOrder === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (sortOrder === "area-asc") list.sort((a, b) => a.area - b.area);
  else if (sortOrder === "year-asc") list.sort((a, b) => a.year - b.year);
  else if (sortOrder === "year-desc") list.sort((a, b) => b.year - a.year);

  return list;
}

// ── Render ────────────────────────────────────────────────────────
function renderProjects() {
  const filtered = getFiltered();
  const total = filtered.length;
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const grid = document.querySelector("#projects-grid");
  const countEl = document.querySelector("#results-count");
  const emptyEl = document.querySelector("#propertiesEmpty");

  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  pageItems.forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = renderProjectCard(p);
    fragment.appendChild(div.firstElementChild);
  });
  grid.appendChild(fragment);

  countEl.innerHTML = `Showing <strong>${total}</strong> project${total !== 1 ? "s" : ""}`;
  renderPagination(total);
  emptyEl.hidden = total > 0;
  grid.style.display = total === 0 ? "none" : "";
}
