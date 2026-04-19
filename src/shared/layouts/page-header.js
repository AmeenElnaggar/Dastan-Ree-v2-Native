/**
 * Renders a standard page header with title, subtitle, and breadcrumbs.
 *
 * @param {string} selector  - CSS selector of the container
 * @param {{ title: string, subtitle?: string, breadcrumbs?: Array<{label: string, href?: string}> }} options
 */
export function renderPageHeader(selector, { title, subtitle = '', breadcrumbs = [] }) {
  const root = document.querySelector(selector);
  if (!root) return;

  const breadcrumbHTML = breadcrumbs.length
    ? `<nav class="page-header__breadcrumb" aria-label="Breadcrumb">
        ${breadcrumbs.map((b, i) =>
          i < breadcrumbs.length - 1
            ? `<a href="${b.href}" class="page-header__breadcrumb-link">${b.label}</a><span aria-hidden="true"> / </span>`
            : `<span class="page-header__breadcrumb-current">${b.label}</span>`
        ).join('')}
       </nav>`
    : '';

  root.innerHTML = `
    <section class="page-header">
      <div class="page-header__inner">
        ${breadcrumbHTML}
        <h1 class="page-header__title">${title}</h1>
        ${subtitle ? `<p class="page-header__subtitle">${subtitle}</p>` : ''}
      </div>
    </section>
  `;
}
