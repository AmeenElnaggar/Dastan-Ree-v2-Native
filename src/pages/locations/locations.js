import { locations } from "../../data/locations.data.js";
import { projects } from "../../data/projects.data.js";
import { properties } from "../../data/properties.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";

const PAGE_SIZE = 8;
const allListings = [...projects, ...properties];

function getListingCount(searchKey) {
  const needle = searchKey.toLowerCase();
  return allListings.filter((item) =>
    (item.location || "").toLowerCase().includes(needle)
  ).length;
}

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const grid = document.getElementById("locationsGrid");
  const empty = document.getElementById("locationsEmpty");
  const countEl = document.getElementById("locationsCount");
  const input = document.getElementById("locationsSearch");
  const clearBtn = document.getElementById("locationsSearchClear");
  const paginationEl = document.getElementById("locationsPagination");

  // Sort featured first for a more curated feel on the first page
  const sorted = [...locations].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
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
    { threshold: 0.1 }
  );

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
    paginationEl.querySelector('[data-action="prev"]')?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderPage();
        scrollToGrid();
      }
    });
    paginationEl.querySelector('[data-action="next"]')?.addEventListener("click", () => {
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

  function applyFilter() {
    const q = input.value.trim().toLowerCase();
    clearBtn.hidden = q.length === 0;
    filtered = q
      ? sorted.filter((loc) => {
          const haystack = [loc.name, loc.region, loc.searchKey]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        })
      : sorted.slice();
    currentPage = 1;
    renderPage();
  }

  document.querySelectorAll(".fade-up").forEach((el) => fadeObs.observe(el));

  renderPage();

  let debounceId;
  input.addEventListener("input", () => {
    clearTimeout(debounceId);
    debounceId = setTimeout(applyFilter, 120);
  });

  clearBtn.addEventListener("click", () => {
    input.value = "";
    applyFilter();
    input.focus();
  });
});

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
    <a href="${href}" class="location-listing-card fade-up" role="listitem" style="transition-delay: ${delay}s" aria-label="${escapeAttr(loc.name)}">
      <div class="location-listing-card__image-wrap">
        <img class="location-listing-card__img" src="${loc.image}" alt="${escapeAttr(loc.name)}" loading="lazy" />
        <div class="location-listing-card__overlay"></div>
      </div>
      ${loc.featured ? `<span class="location-listing-card__featured-badge">Featured</span>` : ""}
      <div class="location-listing-card__body">
        <span class="location-listing-card__region">${escapeHtml(loc.region)}</span>
        <h3 class="location-listing-card__name">${escapeHtml(loc.name)}</h3>
        <div class="location-listing-card__footer">
          <span class="location-listing-card__count">${count} ${label}</span>
          <span class="location-listing-card__explore">
            Explore
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    </a>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(str) {
  return escapeHtml(str);
}
