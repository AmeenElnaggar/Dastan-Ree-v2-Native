import { projects } from "../../../data/projects.data.js";

/**
 * Injects the redesigned Signature Brand Block footer into the given selector.
 * @param {string} selector
 */
export function renderFooter(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  const projectLinks = featuredProjects
    .map(
      (p) =>
        `<li><a href="/src/pages/project-details/index.html?id=${p.id}" class="footer__link">${p.name}</a></li>`
    )
    .join("");

  root.innerHTML = `
    <footer class="footer">
      <div class="footer__inner">

        <!-- Col 1: Brand Identity -->
        <div class="footer__brand">
          <a href="/src/pages/home/index.html" class="footer__logo-wrap" aria-label="Dastan Home">
            <div class="footer__logo-aura"></div>
            <img
              src="/src/assets/images/dastan-logo.svg"
              alt="Dastan Real Estate"
              class="footer__logo-img"
            />
          </a>
          <p class="footer__tagline">
            Crafting iconic living spaces since 2009.<br>
            Where architecture meets aspiration.
          </p>
          <div class="footer__socials">
            <a href="#" aria-label="Facebook" class="footer__social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" class="footer__social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="footer__social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" aria-label="YouTube" class="footer__social-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Exclusive Projects -->
        <div class="footer__col">
          <h4 class="footer__heading">Exclusive Projects</h4>
          <ul class="footer__list">
            ${projectLinks}
          </ul>
        </div>

        <!-- Col 3: Quick Navigation -->
        <div class="footer__col">
          <h4 class="footer__heading">Navigate</h4>
          <ul class="footer__list">
            <li><a href="/src/pages/home/index.html" class="footer__link">Home</a></li>
            <li><a href="/src/pages/projects/index.html" class="footer__link">All Projects</a></li>
            <li><a href="#" class="footer__link">About Us</a></li>
            <li><a href="#" class="footer__link">Blog</a></li>
            <li><a href="#" class="footer__link">Careers</a></li>
          </ul>
        </div>

        <!-- Col 4: Contact & Social -->
        <div class="footer__col">
          <h4 class="footer__heading">Contact</h4>
          <ul class="footer__list footer__list--contact">
            <li>
              <a href="https://maps.google.com/?q=Business+Bay+Dubai" target="_blank" rel="noopener">
                <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Downtown, Business Bay, Dubai</span>
              </a>
            </li>
            <li>
              <a href="tel:+97140000000">
                <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.17h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z"/></svg>
                <span>+971 4 000 0000</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@dastan.ae">
                <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>info@dastan.ae</span>
              </a>
            </li>
            <li>
              <a href="#">
                <svg class="footer__contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>Mon – Sat, 9am – 6pm</span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div class="footer__bottom">
        <p>© ${new Date().getFullYear()} Dastan Real Estate. All rights reserved.</p>
        <div class="footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
  `;
}
