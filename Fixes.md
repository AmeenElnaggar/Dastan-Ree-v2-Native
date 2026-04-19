# Task: Rebuild Hero Slider — Native HTML / CSS / JS

## Overview

Replace the **current hero slider** in the app with a pixel-faithful native implementation.
The reference lives in `reference/` and was built with Angular + Swiper Web Components.
Your job is to reproduce the **exact same visual result and behaviour** using only
**vanilla HTML, CSS (or SCSS), and JavaScript** — no Angular, no framework, no Swiper package
(use the Swiper CDN script instead so the Web Component API remains identical if preferred,
or rewrite using plain JS — your call, but the UX must match).

---

## Reference files (read these first)

| File                                   | What it contains                                                        |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `reference/hero-slider.component.html` | Angular template — maps 1-to-1 to the DOM structure you must produce    |
| `reference/hero-slider.component.scss` | Full SCSS — copy variable names, every keyframe, every selector pattern |
| `reference/hero-slider.component.ts`   | Angular logic — translate all signals/computed values to plain JS state |

> **Angular-specific things to ignore / translate:**
>
> - `@for`, `@if` → plain JS DOM rendering or Handlebars-style template strings
> - `signal()` / `computed()` → regular `let` variables + update functions
> - `[routerLink]` → plain `<a href="...">` links
> - `| transloco` pipe → use the text content directly (hardcode or use `data-i18n` attributes)
> - `@ViewChild` / `afterNextRender` → `document.querySelector` + `DOMContentLoaded`
> - `[style.background-image]` binding → set `element.style.backgroundImage` in JS
> - `[class.hero-thumb--active]` → toggle class manually in JS

---

## Layout & Visual Spec (do NOT deviate)

### Dimensions

```
$thumb-size:      80px
$thumb-wrap-py:   20px   (padding-block on thumb section)
$info-bar-height: 130px
$bottom-height:   250px  (thumb + info = 80 + 40 + 130)
```

### Structure (top → bottom, z-axis)

```
<section.hero-slider>            ← full viewport height (100svh, min 600px), overflow hidden
  <div.hero-slider__stage>       ← absolute inset:0, z-index:1  (the Swiper lives here)
    <swiper-container>
      <swiper-slide> × N         ← one per project
        <div.hero-slide>
          <div.hero-slide__bg>   ← background-image, Ken Burns on active slide
          <div.hero-slide__gradient>  ← dark gradient overlay (bottom-heavy)
          <div.hero-slide__content>   ← absolute, bottom = $bottom-height
            .hero-slide__eyebrow  (location + map-marker icon)
            .hero-slide__title    (project name)
            .hero-slide__developer (developer + building icon)

  <!-- NAV ARROWS — absolute on :host at vertical center, z-index 20 -->
  <button.hero-slider__nav-btn--prev>
  <button.hero-slider__nav-btn--next>

  <!-- BOTTOM SECTION — absolute bottom, z-index 10 -->
  <div.hero-slider__bottom>
    <div.hero-slider__thumbs-wrap>   ← padding-block: 20px
      <div class="container">
        <div.hero-slider__thumbs-row> (role=tablist)
          <button.hero-thumb> × N   ← 80×80, bg-image, active class = hero-thumb--active

    <div.hero-slider__info-row>      ← min-height 130px, padding-inline 32px
      <div.hero-slider__info-left>   ← 50vw dark glass panel, overlay progress bar
        <span.hero-slider__info-meta>  (calendar icon + "Completion YEAR")
        <div.hero-slider__desc-row>
          <p.hero-slider__info-desc>   (2-line clamp)
          <a.hero-slider__cta-link>    ("VIEW DETAILS" + gold line)
      <div.hero-slider__pagination>
        <span.hero-slider__page-current>  (01)
        <span.hero-slider__page-sep>      (/)
        <span.hero-slider__page-total>    (05)
```

---

## Animations — implement ALL of these exactly

| Name                  | Applied to                                             | Spec                                                                          |
| --------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `heroBgZoom`          | `.hero-slide__bg` on active slide                      | scale 1→1.06, 12s ease forwards                                               |
| `slideContentIn`      | Each `> *` inside `.hero-slide__inner` on active slide | opacity 0→1 + translateY 24px→0, 0.75s, stagger delays: 0.10s / 0.25s / 0.40s |
| `slideBottomIn`       | Children of `.hero-slider__info-left`                  | opacity 0→1 + translateY 18px→0, 0.80s, delays: 0.35s / 0.50s                 |
| `fadeInCta`           | `.hero-slider__cta-link`                               | opacity 0→1 + translateX -6px→0, 0.7s ease, delay 0.6s                        |
| `heroOverlayProgress` | `::after` pseudo on `.hero-slider__info-left`          | width 0→100%, duration = autoplay delay (6000ms), linear forwards             |

> **Bottom re-mount trick (from `restartBottom()`):**
> When the slide changes, remove the info-left panel from the DOM for ~20 ms then re-add it.
> This re-triggers all CSS animations cleanly — implement the same pattern in JS.

---

## JavaScript Behaviour

```
autoplayDelay  = 6000 ms
speed          = 1100 ms transition
loop           = true
pauseOnHover   = true (pause autoplay when mouse enters the slider)

activeIndex    — tracks real slide index (0-based)
bottomVisible  — boolean; false for 20ms on slide change, then true (triggers re-animation)

currentSlideLabel  = String(activeIndex + 1).padStart(2, '0')
totalSlidesLabel   = String(projects.length).padStart(2, '0')
currentProject     = projects[activeIndex]
```

### Events to wire

- `swiperslidechange` → update `activeIndex`, call `restartBottom()`
- Prev / Next buttons → `swiper.slidePrev()` / `swiper.slideNext()`
- Thumbnail click → `swiper.slideToLoop(index, 800)`

---

## CSS Variables expected (define or inherit from your design system)

```css
--color-gold
--spacing-1 … --spacing-10 (multiples of 4px or your base unit)
--text-xs, --text-sm
--font-semibold, --font-medium, --font-bold, --font-extrabold
--radius-sm
--transition-base, --transition-fast
```

---

## RTL Support

```css
[dir="rtl"] .hero-slider__nav-btn--prev:hover i {
  transform: translateX(3px);
}
[dir="rtl"] .hero-slider__nav-btn--next:hover i {
  transform: translateX(-3px);
}
```

Pass `dir` attribute to the Swiper instance to match.

---

## Responsive Breakpoints

| Breakpoint | Change                                                  |
| ---------- | ------------------------------------------------------- |
| ≤ 1024px   | `.hero-slider__info-left` width → 60vw                  |
| ≤ 767px    | `.hero-slider__info-left` width → 100%, max-width 320px |
| ≤ 640px    | Nav arrows hidden (`display: none`)                     |
| ≤ 480px    | `.hero-slider__info-left` hidden (`display: none`)      |

---

## Data Shape (projects array)

Each project object has:

```js
{
  id: string,
  name: string,
  location: string,
  developer: string,
  description: string,
  completionYear: number,
  images: string[]   // images[0] is the hero/thumb image
}
```

Wire this to whatever data source the current app uses.

---

## Acceptance Criteria

- [ ] Visually identical to the Angular reference at all breakpoints
- [ ] All 5 animations fire correctly on every slide change
- [ ] `heroOverlayProgress` restarts on every slide change (via DOM re-mount trick)
- [ ] Thumbnails highlight active slide with gold top border + no dark overlay
- [ ] Pagination counter updates correctly (zero-padded)
- [ ] Autoplay pauses on hover
- [ ] RTL works
- [ ] No Angular, no framework dependencies
