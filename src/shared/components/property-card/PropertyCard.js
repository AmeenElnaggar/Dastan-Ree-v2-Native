import { formatPrice } from "../../../utils/format.js";

export function renderPropertyCard(property) {
  const { id, name, price, image, bedrooms, bathrooms, area } = property;
  const detailsUrl = `../../pages/project-details/index.html?id=${id}`;

  const features = [
    bedrooms != null ? `${bedrooms} BD` : null,
    bathrooms != null ? `${bathrooms} BA` : null,
    area != null ? `${area} SF` : null,
  ]
    .filter(Boolean)
    .join(" | ");

  return `
    <a href="${detailsUrl}" class="property-card" data-id="${id}">
      <div class="property-card__fig" style="background-image: url('${image}')"></div>
      <div class="property-card__gradient"></div>
      <div class="property-card__details">
        <div class="property-card__title">${name}</div>
        <div class="property-card__price">${formatPrice(price)}</div>
        ${features ? `<div class="property-card__features">${features}</div>` : ""}
      </div>
      <div class="property-card__cta">View Details</div>
    </a>
  `;
}
