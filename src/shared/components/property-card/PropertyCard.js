import { formatPrice } from "../../../utils/format.js";

export function renderPropertyCard(property) {
  const { id, name, price, image, bedrooms, bathrooms, area } = property;
  const detailsUrl = `../../pages/project-details/index.html?id=${id}`;

  const featureItems = [
    bedrooms != null
      ? `<span class="property-card__feat"><i class="fa-solid fa-bed"></i> ${bedrooms}</span>`
      : null,
    bathrooms != null
      ? `<span class="property-card__feat"><i class="fa-solid fa-bath"></i> ${bathrooms}</span>`
      : null,
    area != null
      ? `<span class="property-card__feat"><i class="fa-solid fa-ruler-combined"></i> ${area}</span>`
      : null,
  ]
    .filter(Boolean)
    .join("");

  return `
    <a href="${detailsUrl}" class="property-card" data-id="${id}">
      <div class="property-card__fig" style="background-image: url('${image}')"></div>
      <div class="property-card__gradient"></div>
      <div class="property-card__details">
        <div class="property-card__title">${name}</div>
        <div class="property-card__price">${formatPrice(price)}</div>
        ${featureItems ? `<div class="property-card__features">${featureItems}</div>` : ""}
      </div>
      <div class="property-card__cta">View Details</div>
    </a>
  `;
}
