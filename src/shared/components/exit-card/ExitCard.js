import { formatPrice, formatNumber } from "../../../utils/format.js";
import {
  exitListings,
  exitMath,
  BUYER_FEE_RATE,
} from "../../../data/exit-listings.data.js";
import { openModal } from "../modal/Modal.js";

const STAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;

const VERIFIED_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const PIN_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

const ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

const BED_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

const BATH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M4 6h16M4 18h7"/><circle cx="17" cy="18" r="3"/></svg>`;

const AREA_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`;

/**
 * One Dastan Exit opportunity, laid out like a property card — image,
 * title, location, bed/bath/area — with the figures a buyer of an
 * assigned contract actually decides on (cash owed to the seller now, the
 * gain against today's market price) added underneath. The card itself
 * only opens the mandatory-info dialog; the property page is one step
 * further in, reached from the dialog's own CTA.
 *
 * @param {import("../../../data/exit-listings.data.js").exitListings[number]} listing
 */
export function renderExitCard(listing) {
  const {
    id,
    unitCode,
    project,
    developer,
    location,
    type,
    bedrooms,
    bathrooms,
    area,
    transferStatus,
    verified,
    featured,
    negotiable,
    image,
  } = listing;

  const math = exitMath(listing);

  const badges = [
    featured
      ? `<span class="exit-card__badge exit-card__badge--featured">${STAR_ICON} Featured</span>`
      : "",
    verified
      ? `<span class="exit-card__badge exit-card__badge--verified">${VERIFIED_ICON} Verified</span>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  const statusModifier =
    transferStatus === "Ready for transfer" ? "ready" : "review";

  return `
    <article class="exit-card exit-card-enter">
      <div class="exit-card__image-wrap">
        <button type="button" class="exit-card__img-link" data-exit-open="${id}" aria-label="View mandatory info for ${project}">
          <img class="exit-card__img" src="${image}" alt="${project} — ${type}" loading="lazy" decoding="async" />
        </button>
        <div class="exit-card__badges">${badges}</div>
        <span class="exit-card__status exit-card__status--${statusModifier}">${transferStatus}</span>
        <span class="exit-card__code">${unitCode}</span>
      </div>

      <div class="exit-card__body">
        <h3 class="exit-card__title">
          <button type="button" class="exit-card__title-link" data-exit-open="${id}">${project}</button>
        </h3>
        <p class="exit-card__location">${PIN_ICON} ${developer} &middot; ${location}</p>

        ${buildSpecs(bedrooms, bathrooms, area)}

        <div class="exit-card__cash-row">
          <div class="exit-card__cash">
            <span class="exit-card__cash-label">
              Cash now
              ${negotiable ? `<span class="exit-card__negotiable">Negotiable</span>` : ""}
            </span>
            <span class="exit-card__cash-value">${formatPrice(math.cashNow)}</span>
          </div>
          <div class="exit-card__gain">
            <span class="exit-card__gain-label">Your gain</span>
            <span class="exit-card__gain-value">+ ${formatPrice(math.gain)}</span>
          </div>
        </div>

        <div class="exit-card__footer">
          <div class="exit-card__price">
            <span class="exit-card__price-label">Market Price Today</span>
            <span class="exit-card__price-value">${formatPrice(listing.marketPriceToday)}</span>
          </div>
          <button type="button" class="exit-card__cta" data-exit-open="${id}" aria-label="View mandatory info for ${project}">
            View details ${ARROW_ICON}
          </button>
        </div>
      </div>
    </article>
  `;
}

function buildSpecs(bedrooms, bathrooms, area) {
  const items = [];

  if (bedrooms != null) {
    items.push(`<span class="exit-card__spec">
      ${BED_ICON}
      ${bedrooms === 0 ? "Studio" : `${bedrooms} Beds`}
    </span>`);
  }

  if (bathrooms != null) {
    if (items.length) items.push(`<span class="exit-card__spec-dot"></span>`);
    items.push(`<span class="exit-card__spec">${BATH_ICON} ${bathrooms} Baths</span>`);
  }

  if (area != null) {
    if (items.length) items.push(`<span class="exit-card__spec-dot"></span>`);
    items.push(
      `<span class="exit-card__spec">${AREA_ICON} ${formatNumber(area)} m&sup2;</span>`,
    );
  }

  if (!items.length) return "";
  return `<div class="exit-card__specs">${items.join("")}</div>`;
}

/* ==========================================
   MANDATORY-INFO DIALOG
   ========================================== */

/**
 * Wires up every `[data-exit-open]` trigger currently in the document —
 * card image, title, and CTA all open the same dialog. Delegated on
 * `document` so it survives the listing grid being re-painted on filter
 * or sort, rather than needing to be re-attached after every repaint.
 */
export function initExitCardDialogs() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-exit-open]");
    if (!trigger) return;

    const listing = exitListings.find((l) => l.id === trigger.dataset.exitOpen);
    if (!listing) return;

    openModal({
      title: listing.project,
      content: buildDialogContent(listing),
      onOpen: wireGalleryDrag,
    });
  });
}

/**
 * Lets a mouse drag the slide strip the way a finger already can, and
 * eases it to rest on whichever slide is nearest once the drag ends —
 * CSS scroll-snap only fires on an active scroll gesture, so the release
 * itself needs its own smooth nudge to the target.
 */
function wireGalleryDrag(modalEl) {
  const gallery = modalEl.querySelector(".exit-dialog__gallery");
  const slide = gallery?.querySelector(".exit-dialog__slide");
  if (!gallery || !slide) return;

  const step = slide.offsetWidth + parseFloat(getComputedStyle(gallery).gap || 0);

  let dragging = false;
  let startX = 0;
  let startScroll = 0;

  gallery.addEventListener("mousedown", (e) => {
    dragging = true;
    startX = e.pageX;
    startScroll = gallery.scrollLeft;
    gallery.classList.add("exit-dialog__gallery--dragging");
  });

  const stopDrag = () => {
    if (!dragging) return;
    dragging = false;
    gallery.classList.remove("exit-dialog__gallery--dragging");

    const nearest = Math.round(gallery.scrollLeft / step) * step;
    gallery.scrollTo({ left: nearest, behavior: "smooth" });
  };
  gallery.addEventListener("mouseup", stopDrag);
  gallery.addEventListener("mouseleave", stopDrag);

  gallery.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    gallery.scrollLeft = startScroll - (e.pageX - startX);
  });
}

function buildDialogContent(listing) {
  const {
    developer,
    location,
    type,
    bedrooms,
    bathrooms,
    area,
    finishing,
    contractYear,
    contractPrice,
    installment,
    remainingToDeveloper,
    deliveryDate,
    marketPriceToday,
    transferStatus,
    verified,
    negotiable,
    propertyId,
    images,
    project,
  } = listing;

  const math = exitMath(listing);
  const feeLabel = `${(BUYER_FEE_RATE * 100).toFixed(2).replace(/0$/, "")}%`;
  const detailsUrl = `../property-details/index.html?id=${propertyId}`;

  return `
    <div class="exit-dialog">
      <div class="exit-dialog__gallery">
        ${images
          .map(
            (src, i) => `
          <div class="exit-dialog__slide">
            <img src="${src}" alt="${project} — ${type}, photo ${i + 1}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" />
          </div>`,
          )
          .join("")}
      </div>

      <div class="exit-dialog__unit">
        <p class="exit-dialog__meta">${PIN_ICON} ${developer} &middot; ${location}</p>
        <p class="exit-dialog__specs">
          ${type} &middot; ${bedrooms} beds &middot; ${bathrooms} baths &middot; ${formatNumber(area)} m&sup2; &middot; ${finishing}
        </p>
      </div>

      <div class="exit-dialog__headline">
        <div class="exit-dialog__headline-item">
          <span>Cash required now</span>
          <strong>${formatPrice(math.cashNow)}</strong>
          <small>${formatPrice(math.totalDueNow)} total, incl. the ${feeLabel} buyer fee</small>
        </div>
        <div class="exit-dialog__headline-item exit-dialog__headline-item--gain">
          <span>Your gain against today's price</span>
          <strong>+ ${formatPrice(math.gain)}</strong>
          <small>Market today ${formatPrice(marketPriceToday)}</small>
        </div>
      </div>

      <dl class="exit-dialog__figures">
        <div class="exit-dialog__figure">
          <dt>Contract price</dt>
          <dd>${formatPrice(contractPrice)}</dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Paid by the seller</dt>
          <dd>${math.paidPercent}% of the contract</dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Remaining to the developer</dt>
          <dd>${formatPrice(remainingToDeveloper)}</dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Instalment</dt>
          <dd>${formatPrice(installment.amount)} <span>/ ${installment.frequency.toLowerCase()}</span></dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Instalments left</dt>
          <dd>${installment.remaining}</dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Handover</dt>
          <dd>${deliveryDate}</dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Contract price / m&sup2;</dt>
          <dd>${formatPrice(math.pricePerMeterContract)}</dd>
        </div>
        <div class="exit-dialog__figure">
          <dt>Contract signed</dt>
          <dd>${contractYear}</dd>
        </div>
      </dl>

      <div class="exit-dialog__trust">
        ${verified ? `<span class="exit-dialog__trust-item exit-dialog__trust-item--verified">${VERIFIED_ICON} Documents verified</span>` : ""}
        <span class="exit-dialog__trust-item exit-dialog__trust-item--status">${transferStatus}</span>
        ${negotiable ? `<span class="exit-dialog__trust-item">Cash negotiable</span>` : ""}
      </div>

      <a href="${detailsUrl}" class="exit-dialog__cta">
        Go to property details ${ARROW_ICON}
      </a>
    </div>
  `;
}
