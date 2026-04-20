const NAV_LINKS = [
  { label: "Home", href: "/src/pages/home/index.html" },
  { label: "Projects", href: "/src/pages/projects/index.html" },
  { label: "Properties", href: "/src/pages/properties/index.html" },
  { label: "Blogs", href: "#" },
  { label: "Careers", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
];

const PHONE_ICON = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36
      1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1
      1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 4.5c0-.55.45-1
      1-1H7.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24
      1.02L6.6 10.8z"/>ظ
  </svg>`;

/**
 * Injects the navbar into the given selector.
 * @param {string} selector
 * @param {{ transparent?: boolean }} options
 *   transparent: true  → homepage overlay mode (starts clear, turns white on scroll)
 *   transparent: false → always white with shadow (default for inner pages)
 */
export function renderNavbar(selector, options = {}) {
  const { transparent = false } = options;
  const root = document.querySelector(selector);
  if (!root) return;

  const currentPath = window.location.pathname;

  // Normalize a path for exact comparison: strip trailing index.html and trailing slash
  const normalizePath = (p) =>
    p.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  const normalizedCurrent = normalizePath(currentPath);

  const initialClass = transparent
    ? "navbar--transparent"
    : "navbar--solid navbar--scrolled";

  root.innerHTML = `
    <header class="navbar ${initialClass}" id="site-navbar">
      <div class="navbar__inner">

        <!-- Logo -->
        <a href="/src/pages/home/index.html" class="navbar__brand" aria-label="Dastan Home">
          <img src="/src/assets/images/dastan-logo.svg" alt="Dastan Real Estate" class="navbar__logo" />
        </a>

        <!-- Desktop Nav Links -->
        <nav class="navbar__nav" aria-label="Main navigation">
          ${NAV_LINKS.map((link) => {
            const isActive =
              link.href !== "#" &&
              normalizePath(link.href) === normalizedCurrent;
            return `<a href="${link.href}" class="navbar__link${isActive ? " navbar__link--active" : ""}">${link.label}</a>`;
          }).join("")}
        </nav>

        <!-- Right: phone + language + hamburger -->
        <div class="navbar__right">

          <a href="tel:19220" class="navbar__phone">
            ${PHONE_ICON}
            <span>19220</span>
          </a>

          <div class="navbar__lang" aria-label="Language switcher">
            <button class="navbar__lang-btn" type="button">AR</button>
            <span class="navbar__lang-sep" aria-hidden="true">|</span>
            <button class="navbar__lang-btn" type="button">EN</button>
          </div>

          <button class="navbar__hamburger" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>

        </div>
      </div>

      <!-- Mobile drawer -->
      <nav class="navbar__mobile" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
        ${NAV_LINKS.map((link) => `<a href="${link.href}" class="navbar__mobile-link">${link.label}</a>`).join("")}
        <div class="navbar__mobile-footer">
          <a href="tel:19220" class="navbar__phone">
            ${PHONE_ICON}
            <span>19220</span>
          </a>
          <div class="navbar__lang">
            <button class="navbar__lang-btn" type="button">AR</button>
            <span class="navbar__lang-sep" aria-hidden="true">|</span>
            <button class="navbar__lang-btn" type="button">EN</button>
          </div>
        </div>
      </nav>
    </header>
    ${!transparent ? '<div class="navbar-spacer" aria-hidden="true"></div>' : ""}
  `;

  // ── Mobile hamburger toggle ──────────────────────────────────────────
  const hamburgerBtn = root.querySelector("#hamburger-btn");
  const mobileNav = root.querySelector("#mobile-nav");

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("navbar__mobile--open");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
    hamburgerBtn.classList.toggle("navbar__hamburger--open", isOpen);
  });

  // ── Scroll behavior (homepage only) ─────────────────────────────────
  if (transparent) {
    const header = root.querySelector("#site-navbar");
    window.addEventListener(
      "scroll",
      () => {
        const scrolled = window.scrollY > 30;
        header.classList.toggle("navbar--transparent", !scrolled);
        header.classList.toggle("navbar--solid", scrolled);
        header.classList.toggle("navbar--scrolled", scrolled);
      },
      { passive: true },
    );
  }
}
