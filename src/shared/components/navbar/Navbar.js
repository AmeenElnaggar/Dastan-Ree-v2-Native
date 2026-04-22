const NAV_LINKS = [
  { label: "Home", href: "/src/pages/home/index.html" },
  { label: "Projects", href: "#" },
  { label: "Properties", href: "/src/pages/properties/index.html" },
  { label: "Blogs", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact Us", href: "#" },
];

const GLOBE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20A14.5 14.5 0 0 0 12 2"/><path d="M2 12h20"/></svg>`;

function getCurrentLang() {
  return localStorage.getItem("site-lang") || "AR";
}

function applyLang(lang) {
  localStorage.setItem("site-lang", lang);
  document.documentElement.lang = lang.toLowerCase();
  document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
}

const PHONE_ICON = `
  <svg _ngcontent-ng-c2431689971="" fill="#fff" height="24px" width="24px" version="1.1" viewBox="0 0 490 490"><g _ngcontent-ng-c2431689971=""><path _ngcontent-ng-c2431689971="" d="M465.45,204.248C456.781,90.169,361.179,0,244.917,0C128.656,0,33.063,90.169,24.394,204.248 c-0.407,1.104-0.641,117.413-0.641,117.413c0,5.644,4.566,10.209,10.208,10.209h31.463c25.191,0,45.678-20.486,45.678-45.679 v-42.936c0-25.192-20.487-45.679-45.678-45.679H45.562C57.275,97.957,142.2,20.417,244.917,20.417 c102.717,0,187.651,77.54,199.364,177.161h-19.861c-25.192,0-45.688,20.486-45.688,45.679v42.936 c0,25.192,20.496,45.679,45.688,45.679h19.408c-3.457,22.314-12.247,51.467-33.944,75.357 c-25.205,27.745-62.73,42.822-111.637,44.896c-1.773-15.345-14.841-27.301-30.652-27.301h-37.873 c-17.017,0-30.864,13.846-30.864,30.863c0,1.725-1.462,32.834,30.864,34.315h37.873c12.171,0,22.719-7.087,27.74-17.353 c56.378-1.659,99.981-19.025,129.662-51.693c28.352-31.215,38.326-69.321,41.093-95.362 C466.597,324.381,465.732,205.01,465.45,204.248z M65.424,217.994c13.926,0,25.262,11.334,25.262,25.262v42.936 c0,13.928-11.335,25.262-25.262,25.262H44.17c0,0,0.024-92.403,0.04-93.459H65.424z M267.597,469.583h-37.873 c-5.763,0-11.54-5.099-10.447-13.898c0.71-5.718,3.863-10.447,10.447-10.447h37.873c6.763,0,9.871,4.715,10.447,10.447 C278.991,465.106,273.359,469.583,267.597,469.583z M424.421,311.453c-13.938,0-25.272-11.334-25.272-25.262v-42.936 c0-13.928,11.334-25.262,25.272-25.262h21.213c0.017,1.056,0.04,93.459,0.04,93.459H424.421z"></path></g></svg>`;

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

          ${langBtn}

          <a href="tel:19220" class="navbar__phone">
            ${PHONE_ICON}
            <span>19220</span>
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
          <a href="tel:19220" class="navbar__phone">
            ${PHONE_ICON}
            <span>19220</span>
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
      root.querySelectorAll(".navbar__lang-toggle span").forEach((s) => (s.textContent = next));
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
