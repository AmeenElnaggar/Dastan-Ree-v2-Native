import { formatPrice } from "../../../utils/format.js";

export function renderPropertyCard(property) {
  const {
    id,
    name,
    price,
    image,
    bedrooms,
    bathrooms,
    area,
    location,
    status,
    type,
    featured,
  } = property;
  const detailsUrl = `../property-details/index.html?id=${id}`;

  const statusBadge = status
    ? `<span class="property-card__purpose">${status}</span>`
    : "";

  const featuredBadge = featured
    ? `<span class="property-card__featured">&#9733; Featured</span>`
    : "";

  const typePill = type
    ? `<span class="property-card__type">${type}</span>`
    : "";

  const specs = buildSpecs(bedrooms, bathrooms, area);

  return `
    <article class="property-card property-card-enter">
      <div class="property-card__image-wrap">
        <a href="${detailsUrl}" class="property-card__img-link" tabindex="-1" aria-hidden="true">
          <img class="property-card__img" src="${image}" alt="${name}" loading="lazy" />
        </a>
        ${statusBadge}
        ${featuredBadge}
      </div>
      <div class="property-card__body">
        <h3 class="property-card__title">
          <a href="${detailsUrl}" class="property-card__title-link">${name}</a>
        </h3>
        <div class="property-card__location">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          ${location || "Location N/A"}
        </div>
        ${specs}
        <div class="property-card__footer">
          <div class="property-card__price">
            <span class="property-card__price-label">Sale Price</span>
            <span class="property-card__price-value">${formatPrice(price)}</span>
          </div>
          <a href="${detailsUrl}" class="property-card__cta" aria-label="View ${name}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>
    </article>
  `;
}

function buildSpecs(bedrooms, bathrooms, area) {
  const items = [];

  if (bedrooms != null) {
    items.push(`<span class="property-card__spec">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      ${bedrooms === 0 ? "Studio" : `${bedrooms} Beds`}
    </span>`);
  }

  if (bathrooms != null) {
    if (items.length)
      items.push(`<span class="property-card__spec-dot"></span>`);
    items.push(`<span class="property-card__spec">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 6h16M4 18h7"/><circle cx="17" cy="18" r="3"/></svg>
      ${bathrooms} Baths
    </span>`);
  }

  if (area != null) {
    if (items.length)
      items.push(`<span class="property-card__spec-dot"></span>`);
    items.push(`<span class="property-card__spec">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      ${area} sqm
    </span>`);
  }

  if (!items.length) return "";
  return `<div class="property-card__specs">${items.join("")}</div>`;
}
