import { projects } from "../../data/projects.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderProjectCard } from "../../shared/components/project-card/ProjectCard.js";
import { renderPageHeader } from "../../shared/layouts/page-header.js";

const PAGE_SIZE = 9;
let currentPage = 1;
let activeType = "all";
let sortOrder = "newest";

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root");
  renderFooter("#footer-root");
  renderPageHeader("#page-header-root", {
    title: "Our Projects",
    subtitle:
      "Explore our full portfolio of residential and commercial developments.",
    breadcrumbs: [
      { label: "Home", href: "../home/index.html" },
      { label: "Projects" },
    ],
  });

  bindFilters();
  renderProjects();
});

function bindFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeType = btn.dataset.type;
      currentPage = 1;
      renderProjects();
    });
  });

  document.querySelector("#sort-select").addEventListener("change", (e) => {
    sortOrder = e.target.value;
    currentPage = 1;
    renderProjects();
  });

  document.querySelector("#load-more-btn").addEventListener("click", () => {
    currentPage++;
    renderProjects(true);
  });
}

function getFiltered() {
  let list =
    activeType === "all"
      ? [...projects]
      : projects.filter((p) => p.type === activeType);

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
