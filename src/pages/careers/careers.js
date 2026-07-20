import { renderNavbar } from "../../shared/components/navbar/Navbar.js";
import { renderFooter } from "../../shared/components/footer/Footer.js";
import { careers } from "../../data/careers.data.js";

const PAGE_SIZE = 6;

function renderJobItem(job, index) {
  return `
    <div class="job-item fade-up" style="transition-delay: ${index * 0.1}s">
      <div class="job-item__content">
        <h3 class="job-item__title">${job.title}</h3>
        <div class="job-item__meta">
          <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
          <span><i class="fa-solid fa-clock"></i> ${job.type}</span>
          <span><i class="fa-solid ${job.departmentIcon}"></i> ${job.department}</span>
        </div>
        <p class="job-item__desc">${job.shortDesc}</p>
      </div>
      <div class="job-item__action">
        <a href="../career-details/index.html?id=${job.id}" class="job-item__btn"
          >Apply Now</a
        >
      </div>
    </div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Render global components
  renderNavbar("#navbar-root", { transparent: true });
  renderFooter("#footer-root");

  const jobList = document.getElementById("job-list");
  const paginationEl = document.getElementById("careersPagination");
  let currentPage = 1;

  // 2. Intersection Observer for fade-up animations
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0.1 }
  );

  function observeFadeUps(scope) {
    (scope || document)
      .querySelectorAll(".fade-up:not(.visible)")
      .forEach((el) => observer.observe(el));
  }

  // 3. Render the current page of open positions
  function renderPage() {
    const total = careers.length;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = careers.slice(start, start + PAGE_SIZE);

    if (jobList) {
      jobList.innerHTML = pageItems.map(renderJobItem).join("");
      observeFadeUps(jobList);
    }

    renderPagination(totalPages);
  }

  // 4. Pagination controls
  function renderPagination(totalPages) {
    if (!paginationEl) return;
    if (totalPages <= 1) {
      paginationEl.hidden = true;
      paginationEl.innerHTML = "";
      return;
    }
    paginationEl.hidden = false;

    const chevLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`;
    const chevRight = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;

    let html = `<button class="pagination__btn" data-action="prev" aria-label="Previous page"${currentPage === 1 ? " disabled" : ""}>${chevLeft}<span>Prev</span></button>`;

    buildPageRange(currentPage, totalPages).forEach((p) => {
      if (p === "…") {
        html += `<span class="pagination__ellipsis">…</span>`;
      } else {
        const active = p === currentPage;
        html += `<button class="pagination__page${active ? " pagination__page--active" : ""}" data-page="${p}" aria-label="Page ${p}"${active ? ' aria-current="page"' : ""}>${p}</button>`;
      }
    });

    html += `<button class="pagination__btn" data-action="next" aria-label="Next page"${currentPage === totalPages ? " disabled" : ""}><span>Next</span>${chevRight}</button>`;

    paginationEl.innerHTML = html;

    paginationEl.querySelectorAll("[data-page]").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentPage = Number(btn.dataset.page);
        renderPage();
        scrollToJobs();
      });
    });
    paginationEl
      .querySelector('[data-action="prev"]')
      ?.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage -= 1;
          renderPage();
          scrollToJobs();
        }
      });
    paginationEl
      .querySelector('[data-action="next"]')
      ?.addEventListener("click", () => {
        if (currentPage < totalPages) {
          currentPage += 1;
          renderPage();
          scrollToJobs();
        }
      });
  }

  function scrollToJobs() {
    jobList?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 5. Initial render + observe the static fade-up elements
  renderPage();
  observeFadeUps(document);
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
