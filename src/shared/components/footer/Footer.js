/**
 * Injects the footer into the given selector.
 * @param {string} selector
 */
export function renderFooter(selector) {
  const root = document.querySelector(selector);
  if (!root) return;

  root.innerHTML = `
    <footer class="footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <a href="/src/pages/home/index.html" class="footer__logo">🏛️ Dastan</a>
          <p class="footer__tagline">Crafting premium living spaces since 2009. Your dream property is just a conversation away.</p>
          <div class="footer__socials">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Instagram">in</a>
            <a href="#" aria-label="LinkedIn">li</a>
          </div>
        </div>

        <div class="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/src/pages/home/index.html">Home</a></li>
            <li><a href="/src/pages/projects/index.html">Projects</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Property Types</h4>
          <ul>
            <li><a href="#">Apartments</a></li>
            <li><a href="#">Villas</a></li>
            <li><a href="#">Townhouses</a></li>
            <li><a href="#">Commercial</a></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>📍 Downtown, Business Bay</li>
            <li>📞 +971 4 000 0000</li>
            <li>✉️ info@dastan.ae</li>
            <li>🕒 Mon–Sat, 9am–6pm</li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© ${new Date().getFullYear()} Dastan Real Estate. All rights reserved.</p>
      </div>
    </footer>
  `;
}
