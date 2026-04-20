import { projects } from '../../data/projects.data.js';
import { renderProjectCard } from '../../shared/components/project-card/ProjectCard.js';
import { renderNavbar } from '../../shared/components/navbar/Navbar.js';
import { renderFooter } from '../../shared/components/footer/Footer.js';

const PAGE_SIZE = 9;
let currentPage = 1;
let filters = { location: 'all', price: 'all', type: 'all', status: 'all' };
let sortOrder = 'newest';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('#navbar-root');
  renderFooter('#footer-root');
  populateLocationOptions();
  bindFilters();
  renderProjects();
});

function populateLocationOptions() {
  const locations = [...new Set(projects.map(p => p.location).filter(Boolean))].sort();
  const desktopSel = document.querySelector('#filter-location');
  const mobileSel = document.querySelector('#m-filter-location');
  locations.forEach(loc => {
    const opt = `<option value="${loc}">${loc}</option>`;
    desktopSel.insertAdjacentHTML('beforeend', opt);
    mobileSel.insertAdjacentHTML('beforeend', opt);
  });
}

function bindFilters() {
  document.querySelector('#filter-location').addEventListener('change', e => { filters.location = e.target.value; resetPage(); syncMobile(); updateBadge(); });
  document.querySelector('#filter-price').addEventListener('change', e => { filters.price = e.target.value; resetPage(); syncMobile(); updateBadge(); });
  document.querySelector('#filter-type').addEventListener('change', e => { filters.type = e.target.value; resetPage(); syncMobile(); updateBadge(); });
  document.querySelector('#filter-status').addEventListener('change', e => { filters.status = e.target.value; resetPage(); syncMobile(); updateBadge(); });
  document.querySelector('#sort-select').addEventListener('change', e => { sortOrder = e.target.value; resetPage(); });

  document.querySelector('#mobile-filter-btn').addEventListener('click', openDrawer);
  document.querySelector('#drawer-close').addEventListener('click', closeDrawer);
  document.querySelector('#drawer-backdrop').addEventListener('click', closeDrawer);
  document.querySelector('#drawer-apply').addEventListener('click', applyDrawer);
  document.querySelector('#drawer-reset').addEventListener('click', () => { resetFilters(); closeDrawer(); });
  document.querySelector('#clear-filters-btn').addEventListener('click', resetFilters);

  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
}

function resetPage() {
  currentPage = 1;
  renderProjects();
}

function applyDrawer() {
  filters.location = document.querySelector('#m-filter-location').value;
  filters.price = document.querySelector('#m-filter-price').value;
  filters.type = document.querySelector('#m-filter-type').value;
  filters.status = document.querySelector('#m-filter-status').value;
  syncDesktop();
  updateBadge();
  resetPage();
  closeDrawer();
}

function syncMobile() {
  document.querySelector('#m-filter-location').value = filters.location;
  document.querySelector('#m-filter-price').value = filters.price;
  document.querySelector('#m-filter-type').value = filters.type;
  document.querySelector('#m-filter-status').value = filters.status;
}

function syncDesktop() {
  document.querySelector('#filter-location').value = filters.location;
  document.querySelector('#filter-price').value = filters.price;
  document.querySelector('#filter-type').value = filters.type;
  document.querySelector('#filter-status').value = filters.status;
}

function resetFilters() {
  filters = { location: 'all', price: 'all', type: 'all', status: 'all' };
  syncDesktop();
  syncMobile();
  updateBadge();
  resetPage();
}

function updateBadge() {
  const count = Object.values(filters).filter(v => v !== 'all').length;
  const badge = document.querySelector('#active-filter-count');
  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
}

function openDrawer() {
  syncMobile();
  const drawer = document.querySelector('#filter-drawer');
  drawer.classList.add('filter-drawer--open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  const drawer = document.querySelector('#filter-drawer');
  drawer.classList.remove('filter-drawer--open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function getFiltered() {
  let list = [...projects];

  if (filters.location !== 'all') list = list.filter(p => p.location === filters.location);
  if (filters.type !== 'all') list = list.filter(p => p.type === filters.type);
  if (filters.status !== 'all') list = list.filter(p => p.status === filters.status);
  if (filters.price !== 'all') {
    const [min, max] = filters.price.split('-').map(Number);
    list = list.filter(p => p.price >= min && p.price <= max);
  }

  if (sortOrder === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sortOrder === 'price-desc') list.sort((a, b) => b.price - a.price);

  return list;
}

function renderProjects() {
  const filtered = getFiltered();
  const total = filtered.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const slice = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const grid = document.querySelector('#projects-grid');
  const countEl = document.querySelector('#results-count');
  const noResults = document.querySelector('#no-results');
  const pagination = document.querySelector('#pagination');

  if (total === 0) {
    noResults.classList.remove('hidden');
    grid.classList.add('hidden');
    countEl.textContent = '';
    pagination.innerHTML = '';
    return;
  }

  noResults.classList.add('hidden');
  grid.classList.remove('hidden');
  countEl.textContent = `Showing ${slice.length} of ${total} project${total !== 1 ? 's' : ''}`;

  grid.innerHTML = '';
  const fragment = document.createDocumentFragment();
  slice.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = renderProjectCard(p);
    fragment.appendChild(div.firstChild);
  });
  grid.appendChild(fragment);

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  const pagination = document.querySelector('#pagination');
  if (totalPages <= 1) { pagination.innerHTML = ''; return; }

  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalPages;

  let html = `<button class="pagination__btn pagination__arrow${prevDisabled ? ' pagination__btn--disabled' : ''}"
    data-page="${currentPage - 1}" ${prevDisabled ? 'disabled' : ''} aria-label="Previous page">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  </button>`;

  getPageRange(currentPage, totalPages).forEach(p => {
    if (p === '...') {
      html += `<span class="pagination__ellipsis">…</span>`;
    } else {
      const active = p === currentPage;
      html += `<button class="pagination__btn${active ? ' pagination__btn--active' : ''}" data-page="${p}"
        aria-label="Page ${p}"${active ? ' aria-current="page"' : ''}>${p}</button>`;
    }
  });

  html += `<button class="pagination__btn pagination__arrow${nextDisabled ? ' pagination__btn--disabled' : ''}"
    data-page="${currentPage + 1}" ${nextDisabled ? 'disabled' : ''} aria-label="Next page">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  </button>`;

  pagination.innerHTML = html;

  pagination.querySelectorAll('[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      currentPage = parseInt(btn.dataset.page);
      renderProjects();
      document.querySelector('#command-center').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function getPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}
