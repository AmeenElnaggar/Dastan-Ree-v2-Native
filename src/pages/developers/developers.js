import { developers } from "../../data/developers.data.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { renderNavbar } from "../../shared/components/navbar/Navbar.js";

const PAGE_SIZE = 8;

document.addEventListener("DOMContentLoaded", () => {
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const grid = document.getElementById("developersGrid");
  const empty = document.getElementById("developersEmpty");
  const countEl = document.getElementById("developersCount");
  const input = document.getElementById("developersSearch");
  const clearBtn = document.getElementById("developersSearchClear");
  const paginationEl = document.getElementById("developersPagination");

  let filtered = developers.slice();
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

    grid.innerHTML = pageItems.map(renderDeveloperCard).join("");
    grid.hidden = total === 0;
    empty.hidden = total > 0;

    countEl.innerHTML = `<strong>${total}</strong> ${
      total === 1 ? "developer" : "developers"
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

    let html = `<button class="developers-pagination__btn" data-action="prev" aria-label="Previous page"${currentPage === 1 ? " disabled" : ""}>${chevLeft}<span>Prev</span></button>`;

    buildPageRange(currentPage, totalPages).forEach((p) => {
      if (p === "…") {
        html += `<span class="developers-pagination__ellipsis">…</span>`;
      } else {
        const active = p === currentPage;
        html += `<button class="developers-pagination__page${active ? " developers-pagination__page--active" : ""}" data-page="${p}" aria-label="Page ${p}"${active ? ' aria-current="page"' : ""}>${p}</button>`;
      }
    });

    html += `<button class="developers-pagination__btn" data-action="next" aria-label="Next page"${currentPage === totalPages ? " disabled" : ""}><span>Next</span>${chevRight}</button>`;

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
      ? developers.filter((d) => {
          const haystack = [d.name, d.location, d.tagline]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();
          return haystack.includes(q);
        })
      : developers.slice();
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

function renderDeveloperCard(d, index) {
  const delay = Math.min(index * 0.05, 0.4);
  const cover = d.cover || d.logo;
  return `
    <a href="../developer-details/index.html?id=${d.id}" class="developer-card fade-up" role="listitem" style="transition-delay: ${delay}s" aria-label="${escapeAttr(d.name)}">
      <div class="developer-card__cover">
        <img class="developer-card__cover-img" src="${cover}" alt="" aria-hidden="true" loading="lazy" />
        ${d.projects ? `<span class="developer-card__projects"><strong>${d.projects}</strong> Projects</span>` : ""}
      </div>
      <div class="developer-card__body">
        <div class="developer-card__crest">
          <img class="developer-card__logo" src="${d.logo}" alt="${escapeAttr(d.alt || d.name)}" loading="lazy" />
        </div>
        <h3 class="developer-card__name">${escapeHtml(d.name)}</h3>
        ${d.tagline ? `<p class="developer-card__tagline">${escapeHtml(d.tagline)}</p>` : ""}
        <div class="developer-card__footer">
          ${d.location ? `<span class="developer-card__location"><i class="fa-solid fa-location-dot"></i>${escapeHtml(d.location)}</span>` : "<span></span>"}
          <span class="developer-card__cta">View<i class="fa-solid fa-arrow-right"></i></span>
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
