import { projects } from "../../data/projects.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";

const PAGE_SIZE = 9;
let currentPage = 1;
let activeType = "all";
let filterStatus = "";
let filterDeveloper = "";
let filterLocation = "";
let filterPrice = "";
let sortOrder = "newest";

const statuses = [...new Set(projects.map((p) => p.status))].sort();
const developers = [...new Set(projects.map((p) => p.developer))].sort();
const locations = [...new Set(projects.map((p) => p.location))].sort();

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderHeader("#page-header-root");
  renderFilterBar("#filters-root");
  bindFilters();
  renderProjects();
});

function renderHeader(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  root.innerHTML = `
    <section class="ph">
      <div class="ph__inner">
        <nav class="ph__breadcrumb" aria-label="Breadcrumb">
          <a href="../home/index.html" class="ph__breadcrumb-link">Home</a>
          <span class="ph__breadcrumb-sep" aria-hidden="true">/</span>
          <span class="ph__breadcrumb-current">Projects</span>
        </nav>
        <h1 class="ph__title">Our Projects</h1>
        <div class="ph__accent" aria-hidden="true"></div>
        <p class="ph__subtitle">Explore our full portfolio of residential and commercial<br class="ph__br"> developments across the UAE.</p>

      </div>
    </section>
  `;
}

function renderFilterBar(selector) {
  const root = document.querySelector(selector);
  if (!root) return;
  root.innerHTML = `
    <div class="pf">
      <div class="pf__inner">
        <div class="pf__types">
          <button class="pf__pill pf__pill--active" data-type="all">All</button>
          <button class="pf__pill" data-type="apartment">Apartments</button>
          <button class="pf__pill" data-type="villa">Villas</button>
          <button class="pf__pill" data-type="commercial">Commercial</button>
        </div>
        <div class="pf__controls">
          <select class="pf__select" id="filter-status">
            <option value="">Any Status</option>
            ${statuses.map((s) => `<option value="${s}">${s}</option>`).join("")}
          </select>
          <select class="pf__select" id="filter-developer">
            <option value="">Any Developer</option>
            ${developers.map((d) => `<option value="${d}">${d}</option>`).join("")}
          </select>
          <select class="pf__select" id="filter-location">
            <option value="">Any Location</option>
            ${locations.map((l) => `<option value="${l}">${l}</option>`).join("")}
          </select>
          <select class="pf__select" id="filter-price">
            <option value="">Any Price</option>
            <option value="0-1000000">Under AED 1M</option>
            <option value="1000000-3000000">AED 1M – 3M</option>
            <option value="3000000-6000000">AED 3M – 6M</option>
            <option value="6000000-999999999">AED 6M+</option>
          </select>
          <span class="pf__sep" aria-hidden="true"></span>
          <select class="pf__select pf__select--sort" id="sort-select">
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
          <button class="pf__reset" id="reset-filters">Reset</button>
        </div>
      </div>
    </div>
  `;
}

function bindFilters() {
  document.querySelectorAll(".pf__pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".pf__pill")
        .forEach((b) => b.classList.remove("pf__pill--active"));
      btn.classList.add("pf__pill--active");
      activeType = btn.dataset.type;
      currentPage = 1;
      renderProjects();
    });
  });

  document.querySelector("#filter-status").addEventListener("change", (e) => {
    filterStatus = e.target.value;
    currentPage = 1;
    renderProjects();
  });

  document
    .querySelector("#filter-developer")
    .addEventListener("change", (e) => {
      filterDeveloper = e.target.value;
      currentPage = 1;
      renderProjects();
    });

  document.querySelector("#filter-location").addEventListener("change", (e) => {
    filterLocation = e.target.value;
    currentPage = 1;
    renderProjects();
  });

  document.querySelector("#filter-price").addEventListener("change", (e) => {
    filterPrice = e.target.value;
    currentPage = 1;
    renderProjects();
  });

  document.querySelector("#sort-select").addEventListener("change", (e) => {
    sortOrder = e.target.value;
    currentPage = 1;
    renderProjects();
  });

  document.querySelector("#reset-filters").addEventListener("click", () => {
    activeType = "all";
    filterStatus = "";
    filterDeveloper = "";
    filterLocation = "";
    filterPrice = "";
    sortOrder = "newest";
    currentPage = 1;

    document
      .querySelectorAll(".pf__pill")
      .forEach((b) => b.classList.remove("pf__pill--active"));
    document
      .querySelector(".pf__pill[data-type='all']")
      .classList.add("pf__pill--active");
    document.querySelector("#filter-status").value = "";
    document.querySelector("#filter-developer").value = "";
    document.querySelector("#filter-location").value = "";
    document.querySelector("#filter-price").value = "";
    document.querySelector("#sort-select").value = "newest";

    renderProjects();
  });

  document.querySelector("#load-more-btn").addEventListener("click", () => {
    currentPage++;
    renderProjects(true);
  });
}

function getFiltered() {
  let list = [...projects];

  if (activeType !== "all") list = list.filter((p) => p.type === activeType);
  if (filterStatus) list = list.filter((p) => p.status === filterStatus);
  if (filterDeveloper)
    list = list.filter((p) => p.developer === filterDeveloper);
  if (filterLocation) list = list.filter((p) => p.location === filterLocation);
  if (filterPrice) {
    const [min, max] = filterPrice.split("-").map(Number);
    list = list.filter((p) => p.price >= min && p.price <= max);
  }

  if (sortOrder === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") list.sort((a, b) => b.price - a.price);

  return list;
}

function renderProjects(append = false) {
  const filtered = getFiltered();
  const total = filtered.length;
  const slice = filtered.slice(0, currentPage * PAGE_SIZE);

  const grid = document.querySelector("#projects-grid");
  const countEl = document.querySelector("#results-count");
  const loadMoreWrap = document.querySelector("#load-more-wrap");

  if (!append) grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  slice.slice(append ? (currentPage - 1) * PAGE_SIZE : 0).forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = renderProjectCard(p);
    fragment.appendChild(div.firstElementChild);
  });
  grid.appendChild(fragment);

  countEl.textContent = `Showing ${slice.length} of ${total} projects`;
  loadMoreWrap.classList.toggle("hidden", slice.length >= total);
}
