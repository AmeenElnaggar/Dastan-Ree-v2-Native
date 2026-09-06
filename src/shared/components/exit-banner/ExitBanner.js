import { formatNumber, formatPrice } from "../../../utils/format.js";

/**
 * Dastan Exit banner — the home-page introduction to the assignment
 * ("exit") service.
 *
 * Composition: the copy sits on a brand-navy block whose right edge curves
 * away, the sample comparison sits on the darker field beside it, and the
 * guarantees run along the bottom as small cards that overlap the two.
 *
 * The figures are a sample — a 10,000,000 EGP unit with 2,000,000 EGP
 * already paid — not live data.
 */
const EXAMPLE = {
  unitPrice: 10000000,
  paid: 2000000,
  cancellationRate: 0.15,
  refundYears: 3,
};

const EXIT_HREF = "../dastan-exit/index.html";

const ARROW_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;

const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const CHECK_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const FACTS = [
  "Zero seller commission",
  "1.25% buyer fee, on completion",
  "Figures verified against documents",
  "Developer-approved transfer",
];

export function renderExitBanner(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  const deduction = EXAMPLE.unitPrice * EXAMPLE.cancellationRate;
  // The penalty is levied on the whole unit price, so it can swallow most
  // of what the owner has actually paid in.
  const lossShare = Math.round((deduction / EXAMPLE.paid) * 100);

  el.innerHTML = `
    <section class="exit-banner" aria-labelledby="exit-banner-title">
      <div class="exit-banner__panel fade-up">

        <!-- The curved block spans the whole panel, not just the stage, so the
             facts row below sits on the same two backgrounds as the content. -->
        <div class="exit-banner__canvas" aria-hidden="true"></div>

        <div class="exit-banner__stage">
          <div class="exit-banner__copy">
            <p class="exit-banner__brandline">
              <span class="exit-banner__chip">Dastan Exit</span>
              <span class="exit-banner__kicker">Assignment, without an overprice</span>
            </p>
            <h2 class="exit-banner__title" id="exit-banner-title">
              Can no longer carry the instalments?
              <span class="exit-banner__title-accent">Hand over the contract, not your money.</span>
            </h2>
            <p class="exit-banner__text">
              Dastan Exit moves an installment contract from an owner who needs out to a buyer
              who wants in — at the price it was signed for. The seller recovers every pound
              paid; the buyer inherits the older plan, instalments intact. Cancelling instead
              can cost 10–15% of the total price, depending on your contract. Every figure is
              verified against the documents, and we carry the assignment through to completion.
            </p>
            <div class="exit-banner__actions">
              <a href="${EXIT_HREF}#exit-seller-form" class="exit-banner__btn exit-banner__btn--primary">
                Sell your unit ${ARROW_ICON}
              </a>
              <a href="${EXIT_HREF}#exit-opportunities" class="exit-banner__btn exit-banner__btn--ghost">
                Browse opportunities
              </a>
            </div>
          </div>

          <!-- One near-square sheet torn on the diagonal. Both pieces are
               laid over the same box and clipped to complementary halves, so
               the break is continuous; each is then nudged off the diagonal
               to open the gap. The red half keeps the top-right corner,
               the green the bottom-left. -->
          <div class="exit-torn">
            <p class="exit-torn__caption">
              Sample &middot; ${formatNumber(EXAMPLE.paid)} paid on a
              ${formatNumber(EXAMPLE.unitPrice)} unit
            </p>

            <div class="exit-torn__sheet">
              <div class="exit-torn__piece exit-torn__piece--loss">
                <div class="exit-torn__rim">
                  <div class="exit-torn__face">
                    <span class="exit-torn__badge">
                      ${CLOSE_ICON}Not recommended
                    </span>
                    <h3 class="exit-torn__title">Returning the unit to the developer</h3>
                    <span class="exit-torn__label">
                      Cancellation penalty (15% of the TOTAL price)
                    </span>
                    <span class="exit-torn__figure">&minus; ${formatPrice(deduction)}</span>
                    <span class="exit-torn__aside">
                      Paid back over <strong>${EXAMPLE.refundYears} years</strong>
                    </span>
                    <p class="exit-torn__note">
                      ${lossShare}% of their money lost + years of waiting
                    </p>
                  </div>
                </div>
              </div>

              <div class="exit-torn__piece exit-torn__piece--gain">
                <div class="exit-torn__rim">
                  <div class="exit-torn__face">
                    <span class="exit-torn__badge">
                      ${CHECK_ICON}Recommended
                    </span>
                    <h3 class="exit-torn__title">Transferring through Dastan Exit</h3>
                    <span class="exit-torn__label">Owner recovers what they paid</span>
                    <span class="exit-torn__figure">${formatPrice(EXAMPLE.paid)}</span>
                    <span class="exit-torn__aside">
                      <strong>Cash at transfer completion</strong>
                    </span>
                    <p class="exit-torn__note">
                      Full recovery &mdash; and the buyer gets an old price
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul class="exit-banner__facts">
          ${FACTS.map((fact) => `<li class="exit-fact">${fact}</li>`).join("")}
        </ul>
      </div>
    </section>
  `;
}
