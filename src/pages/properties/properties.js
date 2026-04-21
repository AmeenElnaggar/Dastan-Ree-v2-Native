import { properties } from "../../data/properties.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";

const PAGE_SIZE = 9;
let currentPage = 1;
let activeArea = "all";
let activeType = "all";
let activeBedrooms = "all";
let activeDeveloper = "all";
let minPrice = "";
let maxPrice = "";

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
        <p class="ph__subtitle">Browse our curated collection of residential and<br class="ph__br"> commercial properties across the EGY.</p>
      </div>
    </section>
  `;
}

function renderFilterBar(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const areas = [
    ...new Set(properties.map((p) => p.location).filter(Boolean)),
  ].sort();
  const types = [
    ...new Set(properties.map((p) => p.type).filter(Boolean)),
  ].sort();
  const developers = [
    ...new Set(properties.map((p) => p.developer).filter(Boolean)),
  ].sort();

  const typeLabels = {
    apartment: "Apartment",
    villa: "Villa",
    commercial: "Commercial",
    townhouse: "Townhouse",
    penthouse: "Penthouse",
    studio: "Studio",
    office: "Office",
  };

  root.innerHTML = `
    <div class="pf">
      <div class="pf__inner">
        <div class="pf__grid">
          <div class="pf__field">
            <label class="pf__field-label" for="area-select">Area</label>
            <select class="pf__select pf__select--field" id="area-select">
              <option value="all">All Areas</option>
              ${areas.map((a) => `<option value="${a}">${a}</option>`).join("")}
            </select>
          </div>
          <div class="pf__field">
            <label class="pf__field-label" for="type-select">Property Type</label>
            <select class="pf__select pf__select--field" id="type-select">
              <option value="all">All Types</option>
              ${types.map((t) => `<option value="${t}">${typeLabels[t] || t.charAt(0).toUpperCase() + t.slice(1)}</option>`).join("")}
            </select>
          </div>
          <div class="pf__field">
            <label class="pf__field-label" for="bedrooms-select">Bedrooms</label>
            <select class="pf__select pf__select--field" id="bedrooms-select">
              <option value="all">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
            </select>
          </div>
          <div class="pf__field">
            <label class="pf__field-label" for="developer-select">Developer</label>
            <select class="pf__select pf__select--field" id="developer-select">
              <option value="all">All Developers</option>
              ${developers.map((d) => `<option value="${d}">${d}</option>`).join("")}
            </select>
          </div>
          <div class="pf__field">
            <label class="pf__field-label">Price Range</label>
            <div class="pf__price-range">
              <input type="number" class="pf__input" id="min-price" placeholder="Min" min="0" />
              <span class="pf__price-sep">—</span>
              <input type="number" class="pf__input" id="max-price" placeholder="Max" min="0" />
            </div>
          </div>
        </div>

        <div class="pf__row">
          <div class="pf__controls">
          <button class="pf__reset" id="reset-filters">↺ Reset</button>
          <button class="pf__apply" id="apply-filters">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function applyFilters() {
  activeArea = document.querySelector("#area-select").value;
  activeType = document.querySelector("#type-select").value;
  activeBedrooms = document.querySelector("#bedrooms-select").value;
  activeDeveloper = document.querySelector("#developer-select").value;
  minPrice = document.querySelector("#min-price").value;
  maxPrice = document.querySelector("#max-price").value;
  currentPage = 1;
  renderProperties();
}

function bindFilters() {
  document
    .querySelector("#apply-filters")
    .addEventListener("click", applyFilters);

  document.querySelector("#reset-filters").addEventListener("click", () => {
    activeArea = "all";
    activeType = "all";
    activeBedrooms = "all";
    activeDeveloper = "all";
    minPrice = "";
    maxPrice = "";
    currentPage = 1;

    document.querySelector("#area-select").value = "all";
    document.querySelector("#type-select").value = "all";
    document.querySelector("#bedrooms-select").value = "all";
    document.querySelector("#developer-select").value = "all";
    document.querySelector("#min-price").value = "";
    document.querySelector("#max-price").value = "";

    renderProperties();
  });

  document.querySelector("#load-more-btn").addEventListener("click", () => {
    currentPage++;
    renderProperties(true);
  });
}

function getFiltered() {
  let list = [...properties];

  if (activeArea !== "all")
    list = list.filter((p) => p.location === activeArea);
  if (activeType !== "all") list = list.filter((p) => p.type === activeType);
  if (activeBedrooms !== "all") {
    const n = parseInt(activeBedrooms, 10);
    list = list.filter((p) => (n >= 4 ? p.bedrooms >= 4 : p.bedrooms === n));
  }
  if (activeDeveloper !== "all")
    list = list.filter((p) => p.developer === activeDeveloper);
  if (minPrice !== "") list = list.filter((p) => p.price >= Number(minPrice));
  if (maxPrice !== "") list = list.filter((p) => p.price <= Number(maxPrice));

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
