import { renderNavbar } from '../components/navbar/Navbar.js';
import { renderFooter } from '../components/footer/Footer.js';

/**
 * Bootstraps the shared layout (navbar + footer) for a page.
 * Call once per page after DOM is ready.
 *
 * @param {{ navbarSelector?: string, footerSelector?: string }} options
 */
export function initBaseLayout({
  navbarSelector = '#navbar-root',
  footerSelector = '#footer-root',
} = {}) {
  renderNavbar(navbarSelector);
  renderFooter(footerSelector);
}
