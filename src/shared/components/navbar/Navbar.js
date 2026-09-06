const NAV_LINKS = [
  { label: "Home", href: "../home/index.html" },
  { label: "Projects", href: "../projects/index.html" },
  { label: "Properties", href: "../properties/index.html" },
  { label: "Dastan Exit", href: "../dastan-exit/index.html" },
  {
    label: "Society",
    children: [
      { label: "Events", href: "../events/index.html" },
      { label: "Blogs", href: "../blogs/index.html" },
    ],
  },
  { label: "About Us", href: "../about-us/index.html" },
  { label: "Contact Us", href: "../contact-us/index.html" },
];

const UNIT_REQUEST_HREF = "../unit-request/index.html";

const GLOBE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>`;

function getCurrentLang() {
  return localStorage.getItem("site-lang") || "EN";
}

function applyLang(lang) {
  localStorage.setItem("site-lang", lang);
  document.documentElement.lang = lang.toLowerCase();
  document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
}

const PLUS_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

const PHONE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

const CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

const CARET_ICON = `<svg class="navbar__caret" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

const PHONE_NUMBER = "+20 224 000 000";
const PHONE_TEL = "+20224000000";

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

  const isActiveHref = (href) =>
    href &&
    href !== "#" &&
    normalizePath(resolveHref(href)) === normalizedCurrent;

  const renderDesktopLink = (link) => {
    if (link.children) {
      const active = link.children.some((c) => isActiveHref(c.href));
      return `
        <div class="navbar__dropdown" data-dropdown>
          <button class="navbar__link navbar__dropdown-toggle${active ? " navbar__link--active" : ""}" type="button" aria-haspopup="true" aria-expanded="false">
            <span>${link.label}</span>
          </button>
          <div class="navbar__dropdown-menu" role="menu">
            ${link.children
              .map(
                (c) =>
                  `<a href="${c.href}" class="navbar__dropdown-item${isActiveHref(c.href) ? " navbar__dropdown-item--active" : ""}" role="menuitem">${c.label}</a>`,
              )
              .join("")}
          </div>
        </div>`;
    }
    return `<a href="${link.href}" class="navbar__link${isActiveHref(link.href) ? " navbar__link--active" : ""}">${link.label}</a>`;
  };

  const renderMobileLink = (link) => {
    if (link.children) {
      const active = link.children.some((c) => isActiveHref(c.href));
      return `
        <div class="navbar__mobile-group" data-mobile-dropdown>
          <button class="navbar__mobile-link navbar__mobile-dropdown-toggle${active ? " navbar__mobile-link--active" : ""}" type="button" aria-expanded="false">
            <span>${link.label}</span>${CARET_ICON}
          </button>
          <div class="navbar__mobile-submenu">
            ${link.children
              .map(
                (c) =>
                  `<a href="${c.href}" class="navbar__mobile-sublink${isActiveHref(c.href) ? " navbar__mobile-sublink--active" : ""}">${c.label}</a>`,
              )
              .join("")}
          </div>
        </div>`;
    }
    return `<a href="${link.href}" class="navbar__mobile-link${isActiveHref(link.href) ? " navbar__mobile-link--active" : ""}">${link.label}</a>`;
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
          ${NAV_LINKS.map(renderDesktopLink).join("")}
        </nav>

        <!-- Right: phone + language + hamburger -->
        <div class="navbar__right">

          ${langBtn}

          <a href="tel:${PHONE_TEL}" class="navbar__phone-icon" aria-label="Call ${PHONE_NUMBER}">
            ${PHONE_ICON}
            <span class="navbar__tooltip">${PHONE_NUMBER}</span>
          </a>

          <a href="${UNIT_REQUEST_HREF}" class="navbar__cta-outline">
            ${PLUS_ICON}
            <span>Submit Property</span>
          </a>

          <button class="navbar__hamburger" id="hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>

        </div>
      </div>

      <!-- Mobile drawer -->
      <nav class="navbar__mobile" id="mobile-nav" aria-label="Mobile navigation" aria-hidden="true">
        <div class="navbar__mobile-header">
          <a href="../../../src/pages/home/index.html" class="navbar__mobile-brand" aria-label="Dastan Home">
            <img src="../../../src/assets/images/dastan-logo.svg" alt="Dastan Real Estate" class="navbar__mobile-logo" />
          </a>
          <button class="navbar__mobile-close" id="mobile-close-btn" type="button" aria-label="Close menu">
            ${CLOSE_ICON}
          </button>
        </div>

        <div class="navbar__mobile-links">
          ${NAV_LINKS.map(renderMobileLink).join("")}
        </div>

        <div class="navbar__mobile-footer">
          <a href="tel:${PHONE_TEL}" class="navbar__mobile-phone">
            ${PHONE_ICON}
            <span>${PHONE_NUMBER}</span>
          </a>
          <div class="navbar__mobile-actions">
            <a href="${UNIT_REQUEST_HREF}" class="navbar__cta-outline">
              ${PLUS_ICON}
              <span>Submit Property</span>
            </a>
            ${langBtn}
          </div>
        </div>
      </nav>
    </header>
    ${!transparent ? '<div class="navbar-spacer" aria-hidden="true"></div>' : ""}
  `;

  // ── Mobile hamburger toggle ──────────────────────────────────────────
  const hamburgerBtn = root.querySelector("#hamburger-btn");
  const mobileNav = root.querySelector("#mobile-nav");
  const mobileCloseBtn = root.querySelector("#mobile-close-btn");

  const setMobileNav = (isOpen) => {
    mobileNav.classList.toggle("navbar__mobile--open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
    hamburgerBtn.classList.toggle("navbar__hamburger--open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
  };

  hamburgerBtn.addEventListener("click", () => {
    setMobileNav(!mobileNav.classList.contains("navbar__mobile--open"));
  });

  mobileCloseBtn?.addEventListener("click", () => setMobileNav(false));

  // ── Desktop dropdowns (click to open) ────────────────────────────────
  const desktopDropdowns = root.querySelectorAll("[data-dropdown]");

  const closeDropdowns = (except) => {
    desktopDropdowns.forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove("navbar__dropdown--open");
      dd.querySelector(".navbar__dropdown-toggle")
        ?.setAttribute("aria-expanded", "false");
    });
  };

  desktopDropdowns.forEach((dd) => {
    const toggle = dd.querySelector(".navbar__dropdown-toggle");
    toggle?.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.toggle("navbar__dropdown--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      closeDropdowns(dd);
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-dropdown]")) closeDropdowns();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdowns();
  });

  // ── Mobile submenus (accordion) ──────────────────────────────────────
  root.querySelectorAll("[data-mobile-dropdown]").forEach((grp) => {
    const toggle = grp.querySelector(".navbar__mobile-dropdown-toggle");
    toggle?.addEventListener("click", () => {
      const isOpen = grp.classList.toggle("navbar__mobile-group--open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
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
