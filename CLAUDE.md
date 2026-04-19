# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Build and minify Tailwind CSS to dist/styles.css
npm run build:css
```

No test framework is configured.

## Architecture

Vanilla JavaScript multi-page app (no framework, no bundler) for a real estate showcase. ES6 modules are used throughout.

### Page Routing

Three pages under `src/pages/`: `home/`, `projects/`, and `project-details/`. Navigation uses full page reloads with `window.location.href`. The root `index.html` redirects to `/src/pages/home/index.html`. Inter-page data is passed via URL query params (`?id=...`), handled by `src/shared/utils/router.js`.

### Component Pattern

All components are **pure functions that return HTML strings** and inject them into a DOM node:

```js
// src/shared/components/navbar/Navbar.js
export function renderNavbar(selector) {
  const el = qs(selector);
  el.innerHTML = `...html string...`;
  // attach event listeners after injection
}
```

Components live in `src/shared/components/`, each with a paired `.css` file. Page-level logic (filtering, pagination, modals) lives in the page's own `.js` file.

### Data Layer

All data is static mock data in `src/data/`. No API or backend exists:
- `projects.data.js` — 60+ properties with amenities
- `properties.data.js` — mapped subset for listings
- `amenities.data.js` — amenity definitions with icons

### Styling

Three-layer approach:
1. **CSS variables** in `src/shared/styles/variables.css` for design tokens (colors, spacing, shadows)
2. **BEM-named component CSS** alongside each component
3. **Tailwind CSS** via CDN for utility classes (not the compiled build during dev)

Design tokens: primary = sky blue (`#0ea5e9`), accent = gold (`#f59e0b`), fonts = Inter + Playfair Display.

### Shared Utilities

- `src/shared/utils/dom.js` — `qs()`, `qsa()`, `on()`, `show()`, `hide()`
- `src/shared/utils/format.js` — `formatPrice()`, `formatNumber()`, `truncate()`
- `src/shared/utils/router.js` — `getParam()`, `setParams()`, `navigate()`

### Sliders

Swiper v11 is used for carousels. Configs live in `src/shared/sliders/swiper.config.js`; initialization functions in `FeaturedSlider.js` and `RelatedSlider.js`.

### Modal System

`src/shared/components/modal/Modal.js` provides a singleton modal with `openModal()` / `closeModal()`. Supports a callback for form submission and Escape key to close.
