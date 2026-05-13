import { formatPrice } from "../../../utils/format.js";

export function renderProjectCard(project) {
  const { id, name, location, developer, image, price, deliveryDate, status } =
    project;
  const detailsUrl = `../../pages/project-details/index.html?id=${id}`;

  const developerBadge = developer
    ? `<div class="project-card__developer">${developer}</div>`
    : "";

  const statusBadge = status
    ? `<div class="project-card__status">${status}</div>`
    : "";

  const locationPin = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

  const calendarIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

  const metaHtml =
    location || deliveryDate
      ? `<div class="project-card__meta">
        ${location ? `<div class="project-card__location">${locationPin}${location}</div>` : ""}
        ${deliveryDate ? `<div class="project-card__delivery">${calendarIcon}${deliveryDate}</div>` : ""}
      </div>`
      : "";

  const priceHtml = price
    ? `<div class="project-card__price">
        <span class="project-card__price-from">Starting from</span>
        <span class="project-card__price-value">${formatPrice(price)}</span>
      </div>`
    : `<div></div>`;

  return `
    <a href="${detailsUrl}" class="project-card" data-id="${id}">
      <img class="project-card__img" src="../${image}" alt="${name}" loading="lazy" />
      <div class="project-card__gradient"></div>
      ${developerBadge}
      ${statusBadge}
      <div class="project-card__body">
        <h3 class="project-card__title">${name}</h3>
        ${metaHtml}
        <div class="project-card__divider"></div>
        <div class="project-card__footer">
          ${priceHtml}
          <span class="project-card__cta" aria-label="View ${name}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
      </div>
    </a>
  `;
}
