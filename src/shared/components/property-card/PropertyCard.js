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
  } = property;
  const detailsUrl = `../../pages/project-details/index.html?id=${id}`;
  const badgeText = status || "For Sale";

  const metaItems = [
    bedrooms != null
      ? `<span class="property-card__meta-item"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b68c2f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14"/><path d="M3 14h18"/><path d="M3 10h18"/><rect x="9" y="14" width="6" height="8"/></svg>${bedrooms} Beds</span>`
      : null,
    bathrooms != null
      ? `<span class="property-card__meta-item"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b68c2f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/></svg>${bathrooms} Baths</span>`
      : null,
    area != null
      ? `<span class="property-card__meta-item"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b68c2f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>${area} m²</span>`
      : null,
  ]
    .filter(Boolean)
    .join("");

  return `
    <a href="${detailsUrl}" class="property-card" data-id="${id}">
      <div class="property-card__image">
        <img src="${image}" alt="${name}" class="property-card__img" loading="lazy" />
        <div class="property-card__overlay"></div>
        <span class="property-card__badge">${badgeText}</span>

      </div>
      <div class="property-card__content">
        <div class="property-card__title">${name}</div>
        ${location ? `<div class="property-card__location"><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b68c2f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>${location}</div>` : ""}
        ${metaItems ? `<div class="property-card__meta">${metaItems}</div>` : ""}
        <div class="property-card__footer">
          <div class="property-card__price">${formatPrice(price)}</div>
          <div class="property-card__cta">View Details</div>
        </div>
      </div>
    </a>
  `;
}
