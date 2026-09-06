import { formatPrice, formatNumber } from "../../../utils/format.js";
import { exitMath, BUYER_FEE_RATE } from "../../../data/exit-listings.data.js";

const STAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const VERIFIED_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const PIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

const ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

/**
 * One Dastan Exit opportunity, rendered around the figures a buyer of an
 * assigned contract actually decides on: the cash owed to the seller now,
 * the balance that carries on to the developer, and the gain against
 * today's market price.
 *
 * @param {import("../../../data/exit-listings.data.js").exitListings[number]} listing
 */
export function renderExitCard(listing) {
  const {
    unitCode,
    project,
    developer,
    location,
    type,
    bedrooms,
    bathrooms,
    area,
    finishing,
    contractYear,
    installment,
    marketPriceToday,
    remainingToDeveloper,
    deliveryDate,
    transferStatus,
    verified,
    featured,
    negotiable,
    image,
  } = listing;

  const math = exitMath(listing);
  const feeLabel = `${(BUYER_FEE_RATE * 100).toFixed(2).replace(/0$/, "")}%`;

  const badges = [
    featured
      ? `<span class="exit-card__badge exit-card__badge--featured">${STAR_ICON} Featured</span>`
      : "",
    verified
      ? `<span class="exit-card__badge exit-card__badge--verified">${VERIFIED_ICON} Documents verified</span>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return `
    <article class="exit-card">
      <div class="exit-card__media">
        <img class="exit-card__img" src="${image}" alt="${project} — ${type}" loading="lazy" decoding="async" />
        <div class="exit-card__badges">${badges}</div>
        <span class="exit-card__code">${unitCode}</span>
      </div>

      <div class="exit-card__body">
        <header class="exit-card__head">
          <h3 class="exit-card__title">${project}</h3>
          <p class="exit-card__meta">${PIN_ICON} ${developer} &middot; ${location}</p>
        </header>

        <p class="exit-card__specs">
          ${type} &middot; ${bedrooms} beds &middot; ${bathrooms} baths &middot; ${formatNumber(area)} m&sup2;
          <span class="exit-card__specs-sub">${finishing} &middot; contract of ${contractYear}</span>
        </p>

        <div class="exit-card__cash">
          <span class="exit-card__cash-label">
            Cash required now
            ${negotiable ? `<span class="exit-card__negotiable">Negotiable</span>` : ""}
          </span>
          <span class="exit-card__cash-value">${formatPrice(math.cashNow)}</span>
          <span class="exit-card__cash-note">
            ${formatPrice(math.totalDueNow)} in total, including the ${feeLabel} buyer fee
          </span>
        </div>

        <div class="exit-card__gain">
          <span class="exit-card__gain-label">Your gain against today's price</span>
          <span class="exit-card__gain-value">+ ${formatPrice(math.gain)}</span>
          <span class="exit-card__gain-note">Market today ${formatPrice(marketPriceToday)}</span>
        </div>

        <dl class="exit-card__figures">
          <div class="exit-card__figure">
            <dt>Remaining to the developer</dt>
            <dd>${formatPrice(remainingToDeveloper)}</dd>
          </div>
          <div class="exit-card__figure">
            <dt>Instalment</dt>
            <dd>${formatPrice(installment.amount)} <span>/ ${installment.frequency.toLowerCase()}</span></dd>
          </div>
          <div class="exit-card__figure">
            <dt>Instalments left</dt>
            <dd>${installment.remaining}</dd>
          </div>
          <div class="exit-card__figure">
            <dt>Handover</dt>
            <dd>${deliveryDate}</dd>
          </div>
          <div class="exit-card__figure">
            <dt>Contract price / m&sup2;</dt>
            <dd>${formatPrice(math.pricePerMeterContract)}</dd>
          </div>
          <div class="exit-card__figure">
            <dt>Paid by the seller</dt>
            <dd>${math.paidPercent}% of the contract</dd>
          </div>
        </dl>

        <footer class="exit-card__footer">
          <span class="exit-card__status exit-card__status--${transferStatus === "Ready for transfer" ? "ready" : "review"}">
            ${transferStatus}
          </span>
          <a href="../contact-us/index.html" class="exit-card__cta" data-exit-unit="${unitCode}">
            Request the file ${ARROW_ICON}
          </a>
        </footer>
      </div>
    </article>
  `;
}
