const NAV_LINKS = [
  { label: "Home", href: "../home/index.html" },
  { label: "Projects", href: "../projects/index.html" },
  { label: "Properties", href: "../properties/index.html" },
  { label: "Blogs", href: "../blogs/index.html" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact Us", href: "#" },
];

const GLOBE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>`;

function getCurrentLang() {
  return localStorage.getItem("site-lang") || "EN";
}

function applyLang(lang) {
  localStorage.setItem("site-lang", lang);
  document.documentElement.lang = lang.toLowerCase();
  document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
}

const PHONE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

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

  // Apply saved language on every page load
  applyLang(getCurrentLang());

  const currentPath = window.location.pathname;

  // Normalize a path for exact comparison: strip trailing index.html and trailing slash
  const normalizePath = (p) =>
    p.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
  const normalizedCurrent = normalizePath(currentPath);

  // Resolve a relative or absolute href to an absolute pathname
  const resolveHref = (href) => {
    if (href === "#") return null;
    try {
      return new URL(href, window.location.href).pathname;
    } catch {
      return href;
    }
  };

  const initialClass = transparent
    ? "navbar--transparent"
    : "navbar--solid navbar--scrolled";

  const lang = getCurrentLang();
  const langBtn = `
    <button class="navbar__lang-btn navbar__lang-toggle" type="button" aria-label="Switch language">
      ${GLOBE_ICON}
      <span>${lang}</span>
    </button>`;

  root.innerHTML = `
    <header class="navbar ${initialClass}" id="site-navbar">
      <div class="navbar__inner">

        <!-- Logo -->
        <a href="../../../src/pages/home/index.html" class="navbar__brand" aria-label="Dastan Home">
          <img src="../../../src/assets/images/dastan-logo.svg" alt="Dastan Real Estate" class="navbar__logo" />
        </a>

        <!-- Desktop Nav Links -->
        <nav class="navbar__nav" aria-label="Main navigation">
          ${NAV_LINKS.map((link) => {
            const isActive =
              link.href !== "#" &&
              normalizePath(resolveHref(link.href)) === normalizedCurrent;
            return `<a href="${link.href}" class="navbar__link${isActive ? " navbar__link--active" : ""}">${link.label}</a>`;
          }).join("")}
        </nav>

        <!-- Right: phone + language + hamburger -->
        <div class="navbar__right">

          ${langBtn}

          <a href="tel:+20224000000" class="navbar__phone">
            ${PHONE_ICON}
            <span>+20 224 000 000</span>
          </a>

          <button class="navbar__hamburger" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>

        </div>
      </div>

      <!-- Mobile drawer -->
      <nav class="navbar__mobile" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
        ${NAV_LINKS.map((link) => `<a href="${link.href}" class="navbar__mobile-link">${link.label}</a>`).join("")}
        <div class="navbar__mobile-footer">
          <a href="tel:+20224000000" class="navbar__phone">
            ${PHONE_ICON}
            <span>+20 224 000 000</span>
          </a>
          ${langBtn}
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

  // ── Language toggle ──────────────────────────────────────────────────
  root.querySelectorAll(".navbar__lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = getCurrentLang() === "AR" ? "EN" : "AR";
      applyLang(next);
      root
        .querySelectorAll(".navbar__lang-toggle span")
        .forEach((s) => (s.textContent = next));
    });
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
