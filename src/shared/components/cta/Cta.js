export function renderCta(selector) {
  const el = document.querySelector(selector);
  if (!el) return;

  el.innerHTML = `
    <section  class="cta-section"><div  aria-hidden="true" class="cta-bg" style="background-image: url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&amp;q=80');"></div><div  aria-hidden="true" class="cta-overlay"></div><div  class="container cta-content"><h2  class="cta-title">Your Dream Property Awaits</h2><p  class="cta-subtitle">Connect with our expert team and discover exclusive real estate opportunities tailored for you.</p><a href="#" class="cta__button"
            >Get In Touch</a></div></section>

  `;
}
