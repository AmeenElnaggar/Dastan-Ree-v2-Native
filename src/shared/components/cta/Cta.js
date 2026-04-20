export function renderCta(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.innerHTML = `
    <section class="luxury-cta">
      <div class="luxury-cta__overlay" aria-hidden="true"></div>
      <div class="luxury-cta__inner">
        <h2 class="luxury-cta__heading">Your Dream Property Awaits</h2>
        <p class="luxury-cta__desc">Let our experts guide you to the perfect home.</p>
        <a href="/src/pages/projects/index.html" class="luxury-cta__btn">Get in Touch</a>
      </div>
    </section>
  `;
}
