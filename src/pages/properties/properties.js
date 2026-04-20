import { properties } from "../../data/properties.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderPropertyCard } from "../../shared/components/property-card/PropertyCard.js";
import { renderPageHeader } from "../../shared/layouts/page-header.js";

const PAGE_SIZE = 9;
let currentPage = 1;
let activeFinishing = "all";
let activeFurnishing = "all";
let sortOrder = "newest";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderPageHeader("#page-header-root", {
    title: "Our Properties",
    subtitle: "Browse our curated collection of residential and commercial properties.",
    breadcrumbs: [
      { label: "Home", href: "../home/index.html" },
      { label: "Properties" },
    ],
  });

  bindFilters();
  renderProperties();
});

function bindFilters() {
  document.querySelectorAll(".filter-btn[data-finishing]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-finishing]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeFinishing = btn.dataset.finishing;
      currentPage = 1;
      renderProperties();
    });
  });

  document.querySelectorAll(".filter-btn[data-furnishing]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn[data-furnishing]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
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
