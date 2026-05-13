import { blogs } from "../../data/blogs.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderBlogCard } from "../../shared/components/blog-card/BlogCard.js";

const PER_PAGE = 6;
const READ_TIMES = [5, 4, 6, 3, 5, 4];
let page = 1;
let sortOrder = "newest";

const filters = {
  search: "",
  categories: [],
  years: [],
  months: [],
  readTime: null,
};

const MONTH_LABELS = {
  1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
  7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec",
};

const READ_TIME_LABELS = {
  quick: "Quick read",
  medium: "Medium read",
  long: "Long read",
};

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderHeader("#page-header-root");
  populateCategoryFilters();
  populateYearFilters();
  renderBlogs();

  initFilterAccordions();
  initCheckboxFilters();
  initPillFilters();
  initSearchInput();
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
    renderBlogs();
  });
});

// ── Helpers ───────────────────────────────────────────────────────
function parseDate(str) {
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function getReadTime(blog) {
  return READ_TIMES[(blog.id - 1) % READ_TIMES.length];
}

function readTimeBucket(minutes) {
  if (minutes < 4) return "quick";
  if (minutes <= 5) return "medium";
  return "long";
}

// ── Header ────────────────────────────────────────────────────────
function renderHeader(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const totalArticles = blogs.length;
  const totalCategories = new Set(blogs.map((b) => b.category).filter(Boolean)).size;
  const totalYears = new Set(
    blogs.map((b) => parseDate(b.date)?.getFullYear()).filter(Boolean),
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
            <span class="page-header__crumb page-header__crumb--active">Insights &amp; Stories</span>
          </nav>
          <h1 class="page-header__title">Insights &amp; Stories</h1>
          <p class="page-header__subtitle">Market trends, investor guides, and lifestyle pieces from across the region</p>
        </div>
        <div class="page-header__stats">
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalArticles}+</span>
            <span class="page-header__stat-label">Articles</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalCategories}</span>
            <span class="page-header__stat-label">Categories</span>
          </div>
          <div class="page-header__stat-div"></div>
          <div class="page-header__stat">
            <span class="page-header__stat-value">${totalYears}</span>
            <span class="page-header__stat-label">Years</span>
          </div>
        </div>
      </div>
    </header>
  `;
}

// ── Populate dynamic filters ──────────────────────────────────────
function populateCategoryFilters() {
  const list = document.querySelector("#categoryList");
  if (!list) return;
  const categories = [...new Set(blogs.map((b) => b.category).filter(Boolean))].sort();
  list.innerHTML = categories
    .map(
      (cat) => `
        <label class="filter-check">
          <input type="checkbox" name="category" value="${cat}" class="adv-filter"/>
          <span class="filter-check__box"></span>${cat}
        </label>`,
    )
    .join("");
}

function populateYearFilters() {
  const group = document.querySelector("#yearPills");
  if (!group) return;
  const years = [
    ...new Set(
      blogs.map((b) => parseDate(b.date)?.getFullYear()).filter(Boolean),
    ),
  ].sort((a, b) => b - a);
  group.innerHTML = years
    .map(
      (y) => `<button class="filter-pill" data-value="${y}" type="button">${y}</button>`,
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

// ── Checkbox filters (category) ───────────────────────────────────
function initCheckboxFilters() {
  document
    .querySelectorAll("input.adv-filter[type='checkbox']")
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
  const map = { category: "categories" };
  return map[name] || name;
}

// ── Pill filters ──────────────────────────────────────────────────
function initPillFilters() {
  document.querySelectorAll(".filter-pills").forEach((group) => {
    const key = group.dataset.filter;
    const isMulti = group.dataset.multi !== "false";
    if (!key) return;

    group.addEventListener("click", (e) => {
      const pill = e.target.closest(".filter-pill");
      if (!pill || !group.contains(pill)) return;
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
}

// ── Search input (debounced) ──────────────────────────────────────
function initSearchInput() {
  const el = document.querySelector("#searchInput");
  if (!el) return;
  let timer;
  el.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      filters.search = el.value.trim().toLowerCase();
      refresh();
    }, 250);
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
  renderBlogs();
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

  if (filters.search) addChip(`"${filters.search}"`, "search", null);
  filters.categories.forEach((v) => addChip(v, "categories", v));
  filters.years.forEach((v) => addChip(v, "years", v));
  filters.months.forEach((v) => addChip(MONTH_LABELS[v] || v, "months", v));
  if (filters.readTime) addChip(READ_TIME_LABELS[filters.readTime], "readTime", null);

  updateFilterBadge();
}

function removeFilter(key, value) {
  if (["categories", "years", "months"].includes(key)) {
    filters[key] = filters[key].filter((v) => v !== value);
    syncFilterUI(key, value, false);
  } else if (key === "readTime") {
    filters.readTime = null;
    document
      .querySelectorAll("#readTimePills .filter-pill")
      .forEach((p) => p.classList.remove("filter-pill--active"));
  } else if (key === "search") {
    filters.search = "";
    const el = document.querySelector("#searchInput");
    if (el) el.value = "";
  }
  page = 1;
  renderBlogs();
  renderActiveFilters();
  updateFilterBadge();
}

function syncFilterUI(key, value, active) {
  if (key === "categories") {
    const el = document.querySelector(`input[name="category"][value="${value}"]`);
    if (el) el.checked = active;
    return;
  }
  const groupSel = { years: "#yearPills", months: "#monthPills" }[key];
  if (groupSel) {
    const el = document.querySelector(`${groupSel} [data-value="${value}"]`);
    if (el) {
      el.classList.toggle("filter-pill--active", active);
    }
  }
}

function clearAllFilters() {
  filters.search = "";
  filters.categories = [];
  filters.years = [];
  filters.months = [];
  filters.readTime = null;

  const search = document.querySelector("#searchInput");
  if (search) search.value = "";

  document
    .querySelectorAll("input.adv-filter[type='checkbox']")
    .forEach((cb) => (cb.checked = false));
  document
    .querySelectorAll(".filter-pill")
    .forEach((p) => p.classList.remove("filter-pill--active"));

  page = 1;
  renderBlogs();
  renderActiveFilters();
  updateFilterBadge();
}

function updateFilterBadge() {
  const count =
    (filters.search ? 1 : 0) +
    filters.categories.length +
    filters.years.length +
    filters.months.length +
    (filters.readTime ? 1 : 0);

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
      renderBlogs();
      scrollToResults();
    }
  });
  nav.querySelector("#pageNext")?.addEventListener("click", () => {
    if (page < totalPages) {
      page++;
      renderBlogs();
      scrollToResults();
    }
  });
  nav.querySelectorAll(".pagination__page").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = Number(btn.dataset.page);
      if (p !== page) {
        page = p;
        renderBlogs();
        scrollToResults();
      }
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
    window.scrollTo({
      top: results.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  }
}

// ── Filter + Sort ─────────────────────────────────────────────────
function getFiltered() {
  let list = [...blogs];

  if (filters.search) {
    const q = filters.search;
    list = list.filter(
      (b) =>
        (b.title || "").toLowerCase().includes(q) ||
        (b.description || "").toLowerCase().includes(q) ||
        (b.category || "").toLowerCase().includes(q),
    );
  }

  if (filters.categories.length) {
    list = list.filter((b) => filters.categories.includes(b.category));
  }

  if (filters.years.length) {
    list = list.filter((b) => {
      const d = parseDate(b.date);
      return d && filters.years.includes(String(d.getFullYear()));
    });
  }

  if (filters.months.length) {
    list = list.filter((b) => {
      const d = parseDate(b.date);
      return d && filters.months.includes(String(d.getMonth() + 1));
    });
  }

  if (filters.readTime) {
    list = list.filter((b) => readTimeBucket(getReadTime(b)) === filters.readTime);
  }

  if (sortOrder === "newest") {
    list.sort((a, b) => (parseDate(b.date) ?? 0) - (parseDate(a.date) ?? 0));
  } else if (sortOrder === "oldest") {
    list.sort((a, b) => (parseDate(a.date) ?? 0) - (parseDate(b.date) ?? 0));
  } else if (sortOrder === "title-asc") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOrder === "title-desc") {
    list.sort((a, b) => b.title.localeCompare(a.title));
  }

  return list;
}

// ── Render ────────────────────────────────────────────────────────
function renderBlogs() {
  const filtered = getFiltered();
  const total = filtered.length;
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const grid = document.querySelector("#blogs-grid");
  const countEl = document.querySelector("#results-count");
  const emptyEl = document.querySelector("#propertiesEmpty");

  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  pageItems.forEach((b) => {
    const div = document.createElement("div");
    div.innerHTML = renderBlogCard(b);
    fragment.appendChild(div.firstElementChild);
  });
  grid.appendChild(fragment);

  countEl.innerHTML = `Showing <strong>${total}</strong> article${total !== 1 ? "s" : ""}`;
  renderPagination(total);
  emptyEl.hidden = total > 0;
  grid.style.display = total === 0 ? "none" : "";
}
