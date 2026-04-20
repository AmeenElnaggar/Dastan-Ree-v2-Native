import { properties } from "../../data/properties.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";

const PAGE_SIZE = 9;
let currentPage = 1;
let activeFinishing = "all";
let activeFurnishing = "all";
let sortOrder = "newest";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderHeader("#page-header-root");
  renderFilterBar("#filters-root");
  bindFilters();
  renderProperties();
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
          <span class="ph__breadcrumb-current">Properties</span>
        </nav>
        <h1 class="ph__title">Our Properties</h1>
        <div class="ph__accent" aria-hidden="true"></div>
        <p class="ph__subtitle">Browse our curated collection of residential and<br class="ph__br"> commercial properties across the UAE.</p>
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
          <span class="pf__label">Finishing:</span>
          <button class="pf__pill pf__pill--active" data-finishing="all">All</button>
          <button class="pf__pill" data-finishing="Fully Finished">Fully Finished</button>
          <button class="pf__pill" data-finishing="Semi-Finished">Semi-Finished</button>
          <button class="pf__pill" data-finishing="Core &amp; Shell">Core &amp; Shell</button>
        </div>
        <span class="pf__sep" aria-hidden="true"></span>
        <div class="pf__types">
          <span class="pf__label">Furnishing:</span>
          <button class="pf__pill pf__pill--active" data-furnishing="all">All</button>
          <button class="pf__pill" data-furnishing="Fully Furnished">Furnished</button>
          <button class="pf__pill" data-furnishing="Semi-Furnished">Semi-Furnished</button>
          <button class="pf__pill" data-furnishing="Unfurnished">Unfurnished</button>
        </div>
        <div class="pf__controls">
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
  document.querySelectorAll(".pf__pill[data-finishing]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pf__pill[data-finishing]").forEach((b) => b.classList.remove("pf__pill--active"));
      btn.classList.add("pf__pill--active");
      activeFinishing = btn.dataset.finishing;
      currentPage = 1;
      renderProperties();
    });
  });

  document.querySelectorAll(".pf__pill[data-furnishing]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pf__pill[data-furnishing]").forEach((b) => b.classList.remove("pf__pill--active"));
      btn.classList.add("pf__pill--active");
      activeFurnishing = btn.dataset.furnishing;
      currentPage = 1;
      renderProperties();
    });
  });

  document.querySelector("#sort-select").addEventListener("change", (e) => {
    sortOrder = e.target.value;
    currentPage = 1;
    renderProperties();
  });

  document.querySelector("#reset-filters").addEventListener("click", () => {
    activeFinishing = "all";
    activeFurnishing = "all";
    sortOrder = "newest";
    currentPage = 1;

    document.querySelectorAll(".pf__pill[data-finishing]").forEach((b) => b.classList.remove("pf__pill--active"));
    document.querySelector(".pf__pill[data-finishing='all']").classList.add("pf__pill--active");
    document.querySelectorAll(".pf__pill[data-furnishing]").forEach((b) => b.classList.remove("pf__pill--active"));
    document.querySelector(".pf__pill[data-furnishing='all']").classList.add("pf__pill--active");
    document.querySelector("#sort-select").value = "newest";

    renderProperties();
  });

  document.querySelector("#load-more-btn").addEventListener("click", () => {
    currentPage++;
    renderProperties(true);
  });
}

function getFiltered() {
  let list = [...properties];

  if (activeFinishing !== "all") list = list.filter((p) => p.finishingType === activeFinishing);
  if (activeFurnishing !== "all") list = list.filter((p) => p.furnishingStatus === activeFurnishing);

  if (sortOrder === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (sortOrder === "price-desc") list.sort((a, b) => b.price - a.price);

  return list;
}

function renderProperties(append = false) {
  const filtered = getFiltered();
  const total = filtered.length;
  const slice = filtered.slice(0, currentPage * PAGE_SIZE);

  const grid = document.querySelector("#properties-grid");
  const countEl = document.querySelector("#results-count");
  const loadMoreWrap = document.querySelector("#load-more-wrap");

  if (!append) grid.innerHTML = "";
  const fragment = document.createDocumentFragment();
  slice.slice(append ? (currentPage - 1) * PAGE_SIZE : 0).forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = renderPropertyCard(p);
    fragment.appendChild(div.firstElementChild);
  });
  grid.appendChild(fragment);

  countEl.textContent = `Showing ${slice.length} of ${total} properties`;
  loadMoreWrap.classList.toggle("hidden", slice.length >= total);
}
