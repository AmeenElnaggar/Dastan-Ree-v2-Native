// Resolved against this module's own URL, not the page that renders it — a
// plain relative src in innerHTML resolves against the *document*, so it would
// break the moment the CTA is used from a page at a different depth.
const BG_IMAGE = new URL(
  "../../../assets/images/home/cta-banner.jpg",
  import.meta.url
).href;

export function renderCta(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.innerHTML = `
    <section class="cta-section">
      <img
        class="cta-bg"
        src="${BG_IMAGE}"
        alt=""
        loading="lazy"
        decoding="async" />
      <div aria-hidden="true" class="cta-overlay"></div>
      <div class="container cta-content">
        <h2 class="cta-title">Your Dream Property Awaits</h2>
        <p class="cta-subtitle">
          Connect with our expert team and discover exclusive real estate
          opportunities tailored for you.
        </p>
        <a href="../contact-us/index.html" class="cta__button">Get In Touch</a>
      </div>
    </section>
  `;
}
