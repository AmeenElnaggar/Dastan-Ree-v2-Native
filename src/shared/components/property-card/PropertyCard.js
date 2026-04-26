import { formatNumber } from "../../../utils/format.js";

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
  const detailsUrl = `../property-details/index.html?id=${id}`;
  const badgeText = status || "For Sale";
  const formattedAmount = formatNumber(price);

  const metaItems = [
    bedrooms != null
      ? `<span class="property-card__meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14"/><path d="M3 14h18"/><path d="M3 10h18"/><rect x="9" y="14" width="6" height="8"/></svg>
          <span>${bedrooms}</span><span class="property-card__meta-label">Beds</span>
        </span>`
      : null,
    bathrooms != null
      ? `<span class="property-card__meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><line x1="10" x2="8" y1="5" y2="7"/><line x1="2" x2="22" y1="12" y2="12"/></svg>
          <span>${bathrooms}</span><span class="property-card__meta-label">Baths</span>
        </span>`
      : null,
    area != null
      ? `<span class="property-card__meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>
          <span>${area}</span><span class="property-card__meta-label">Sqft</span>
        </span>`
      : null,
  ]
    .filter(Boolean)
    .join("");

  return `
    <div class="relative w-[380px] group">

  <!-- Decorative Frame -->
  <div class="absolute inset-0 border border-gray-300 translate-x-2 translate-y-2"></div>

  <!-- Card -->
  <div class="relative bg-white overflow-hidden shadow-xl transition-all duration-200
              group-hover:translate-x-2 group-hover:translate-y-2">

    <!-- Image Wrapper -->
    <div class="relative h-60 overflow-hidden">

      <img
        src="${image}"
        alt="${name}"
        class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      <span class="absolute top-5 left-5 bg-black text-white text-xs tracking-widest px-4 py-2 uppercase">
        ${badgeText}
      </span>

    </div>

    <div class="relative p-5 flex flex-col gap-3">

      <div class="absolute inset-0 right-[10px] bottom-[10px] bg-no-repeat bg-right-bottom bg-[length:35px_auto] opacity-20 pointer-events-none z-0" style="background-image:url('../../assets/images/logo-pattern.png')"></div>

      <div class="flex items-baseline gap-2">
        <span class="text-xs font-semibold text-[#64748b] tracking-widest uppercase">EGP</span>
        <span class="text-xl font-bold text-gray-900">${formattedAmount}</span>
      </div>

      <h3 class="text-xl font-semibold  leading-tight">
        ${name}
      </h3>

      <div class="flex items-center gap-1.5 text-gray-500 text-sm ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        <span class="truncate">${location || "Location N/A"}</span>
      </div>

      <div class="flex items-center gap-3 border-t border-gray-100 py-3">
        ${metaItems}
      </div>

      <a href="${detailsUrl}" class="inline-flex items-center gap-3 bg-black text-white text-xs font-semibold tracking-widest uppercase px-6 py-3 transition-all duration-300 hover:bg-amber-500 group/cta self-start">
        <span>View Property</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover/cta:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>

    </div>

  </div>

  <div class="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-400 transition-opacity duration-500 group-hover:opacity-0"></div>

</div>
  `;
}
