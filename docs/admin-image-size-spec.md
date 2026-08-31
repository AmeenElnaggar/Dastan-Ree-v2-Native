# Admin Dashboard — Recommended Image Sizes (Home Page)

Reference for the notes shown next to every image upload field in the Admin Dashboard.
Every number below is derived from the live front-end CSS in this repo, not estimated.

Scope: **home page sections only**. Other pages (project details, developer details, blogs,
events, careers) are to follow.

**Method** — the recommended size is the largest box the image occupies on a desktop
viewport, doubled for retina, then rounded to a clean figure. Where the CSS uses
`object-fit: cover` or `background-size: cover`, the image is cropped to fill the box, so
the *aspect ratio* matters as much as the pixel count.

Reference container: `max-w-7xl` (1280px) with `px-6` padding → **1232px** of content width.

---

## The notes, field by field

Ordered by where the image appears as you scroll the home page.

### 1. Navbar logo

|  |  |
|---|---|
| **Recommended** | SVG (preferred), or **480 × 200 px** transparent PNG |
| **Aspect ratio** | ~2.4 : 1 (landscape) |
| **Rendered at** | 60 px tall, width auto (50 px in the mobile drawer) |
| **Fit** | Natural — not cropped |
| **Source** | `src/shared/components/navbar/navbar.css:62` |

> **Note copy:** "SVG preferred. If uploading a PNG, use 480 × 200 px with a transparent background."

⚠️ Over the hero the navbar applies `filter: brightness(0) invert(1)` — the logo is
flattened to pure white. A multi-colour logo will render as a white silhouette, so upload a
single-colour mark whose shape reads on its own.

---

### 2. Hero slider — slide image

|  |  |
|---|---|
| **Recommended** | **1920 × 1080 px** |
| **Aspect ratio** | 16 : 9 |
| **Rendered at** | Full bleed — 100vw wide; height from a 16:9 `aspect-ratio` (true 16:9 from ultrawide down to a ~750 px viewport), clamped to 420 px min / 100svh max |
| **Fit** | `object-fit: cover` on a real `<img>` (cropped to fill) |
| **Source** | `src/shared/components/hero-slider/hero-slider.css:57-74, 518-565`, `src/shared/sliders/HeroSlider.js:89` |

> **Note copy:** "Recommended 1920 × 1080 px (16:9). Minimum 1600 × 900 px. Keep the main subject centred — the image is cropped to fill the screen."

⚠️ **The hero has no upload field of its own.** `HeroSlider.js:89` reads
`project.images[0]` — the **first image of a featured project's gallery** is what fills the
screen. So the first gallery image of any featured project must meet the hero spec
(1920 × 1080), not a gallery-sized spec. Two ways to handle it in the dashboard:

- give featured projects a dedicated "Hero image" field, or
- show the 1920 × 1080 note on the *first* gallery slot specifically, with the rest at
  gallery size.

The same image is reused as the thumbnail in the strip — 80 × 80 on desktop, 64 × 64
under 1024 px, 56 × 56 under 640 px (`hero-slider.css:288-290`, `518-565`) — which is fine,
it downscales.

Slide text sits over the left ~620 px, so avoid putting detail there.

---

### 3. Filter banner — background watermark

|  |  |
|---|---|
| **Recommended** | **600 × 600 px** transparent PNG, or SVG |
| **Aspect ratio** | 1 : 1 |
| **Rendered at** | Full banner height (~230 px), width auto, at 8% opacity |
| **Fit** | Natural |
| **Source** | `src/shared/components/filter-banner/filter-banner.css:23-42` |

> **Note copy:** "Recommended 600 × 600 px, transparent background. Colour is not preserved — only the shape shows."

⚠️ The CSS applies `brightness(0) invert(1) grayscale(1)`, which discards all colour and
renders the alpha channel as a flat white silhouette. Upload a shape, not a picture.

---

### 4. Explore by Location — featured card (first card)

|  |  |
|---|---|
| **Recommended** | **1040 × 960 px** |
| **Aspect ratio** | ~1.1 : 1 (near square) |
| **Rendered at** | 516 × 474 px (spans both grid rows) |
| **Fit** | `cover` |
| **Source** | `src/shared/components/locations/locations.css:75-79, 129-140` |

> **Note copy:** "Recommended 1040 × 960 px (near square). This is the large card — it needs more detail than the other four."

Grid maths: `1.5fr 1fr 1fr` with a 14 px gap across 1232 px → the featured column is 516 px
wide and spans two 230 px rows plus the gap = 474 px tall.

---

### 5. Explore by Location — standard card (cards 2–5)

|  |  |
|---|---|
| **Recommended** | **700 × 470 px** |
| **Aspect ratio** | 3 : 2 (landscape) |
| **Rendered at** | 344 × 230 px |
| **Fit** | `cover` |
| **Source** | `src/shared/components/locations/locations.css:75-79` |

> **Note copy:** "Recommended 700 × 470 px (3:2 landscape). Minimum 480 × 320 px."

Under 640 px every card becomes full-width at 250 px tall, so the crop widens — keep the
subject centred.

---

### 6. Featured Projects — project card image

|  |  |
|---|---|
| **Recommended** | **800 × 1000 px** |
| **Aspect ratio** | 4 : 5 (**portrait**) |
| **Rendered at** | 389 × 500 px |
| **Fit** | `cover` |
| **Source** | `src/shared/components/project-card/project-card.css:7, 33-39` — 3-up at ≥1024px |

> **Note copy:** "Recommended 800 × 1000 px (4:5 portrait). Landscape photos will be cropped heavily at the sides."

⚠️ This is the only tall card on the page. A landscape photo loses roughly 60% of its
width. The bottom ~40% is covered by a dark gradient and the project title, so keep the
subject in the upper two-thirds.

---

### 7. Our Latest Properties — property card image

|  |  |
|---|---|
| **Recommended** | **800 × 450 px** |
| **Aspect ratio** | 16 : 9 (landscape) |
| **Rendered at** | 399 × 220 px |
| **Fit** | `cover` |
| **Source** | `src/shared/components/property-card/property-card.css:22-39` — 3-up at ≥1280px |

> **Note copy:** "Recommended 800 × 450 px (16:9). Minimum 560 × 315 px."

---

### 8. Why Choose Us — feature icon (×4)

|  |  |
|---|---|
| **Recommended** | **200 × 200 px** transparent PNG, or SVG |
| **Aspect ratio** | 1 : 1 |
| **Rendered at** | 36 × 36 px, inside a 56 px white circle |
| **Fit** | `contain` — **not** cropped |
| **Source** | `src/pages/home/home.css:566-583` |

> **Note copy:** "Recommended 200 × 200 px, square, transparent background. The icon sits on white."

One of only two fields using `contain`, so nothing is cut off — but leave ~10% padding
inside the square or the icon touches the circle's edge.

---

### 9. From Our Blog — blog card image

|  |  |
|---|---|
| **Recommended** | **800 × 450 px** |
| **Aspect ratio** | 16 : 9 (landscape) |
| **Rendered at** | 389 × 220 px |
| **Fit** | `cover` |
| **Source** | `src/shared/components/blog-card/blog-card.css:18-31` — 3-up at ≥1024px |

> **Note copy:** "Recommended 800 × 450 px (16:9). A date badge overlays the top-left corner."

---

### 10. CTA ribbon — background image

|  |  |
|---|---|
| **Recommended** | **1920 × 1080 px** |
| **Aspect ratio** | 16 : 9 |
| **Rendered at** | Full-bleed band — 100vw wide; height from a 16 : 9 `aspect-ratio` (810 px at a 1440 px viewport) |
| **Fit** | `object-fit: cover` on a real `<img>` — band matches the source ratio, so nothing is cropped |
| **Source** | `src/shared/components/cta/cta.css:1-37`, `src/shared/components/cta/Cta.js:7-12` |

> **Note copy:** "Recommended 1920 × 1080 px (16:9). A dark overlay sits on top — avoid images containing text."

The band carries a 16 : 9 `aspect-ratio` on the section itself — the same ratio as the
recommended source — so the photo is shown **whole at every width**, with no cropping to
plan around. The trade-off is height: the band is as tall as a 16:9 image is at full
viewport width (810 px at 1440 px, 1080 px at 1920 px), so this is a full-screen-scale
banner, not a thin ribbon. A 55–70% black gradient covers it, so busy or low-contrast
photography works fine here — but at this size the image is a feature of the page, so it
should be a strong one.

---

### 11. Developers ("Trusted By") — developer / partner logo

|  |  |
|---|---|
| **Recommended** | **240 × 240 px** — must be square |
| **Aspect ratio** | 1 : 1 (**strict**) |
| **Rendered at** | 120 × 120 px, masked to a circle |
| **Fit** | `cover` — **cropped** |
| **Source** | `src/pages/home/home.css:678-704` |

> **Note copy:** "Recommended 240 × 240 px, square. The logo is cropped to a circle — centre the mark and leave padding around it."

⚠️ **The most likely failure on the page.** `.partner-card__logo` uses `object-fit: cover`
inside a circular wrapper, so a wide logo lockup gets its left and right edges cut off and
then the corners masked away. Upload a square canvas with the mark centred and roughly 15%
padding. (If you'd rather accept wide logos as-is, that's a one-line front-end fix: switch
`cover` → `contain` at `home.css:702`.)

---

### 12. Event pop-up image

|  |  |
|---|---|
| **Recommended** | **700 × 880 px** |
| **Aspect ratio** | ~4 : 5 (portrait) |
| **Rendered at** | 343 × ≥320 px (44% of a 780 px modal) |
| **Fit** | `cover` |
| **Source** | `src/shared/components/event-popup/event-popup.css:66-80`, `EventPopup.js:56` |

> **Note copy:** "Recommended 700 × 880 px (4:5 portrait). Keep the subject centred — it is cropped to a wide strip on mobile."

⚠️ Cropped two very different ways: a narrow portrait column on desktop, and a full-width
180 px-tall strip on mobile (`event-popup.css:221-228`). Only a centred subject survives
both.

---

### 13. Footer logo

|  |  |
|---|---|
| **Recommended** | SVG (preferred), or **480 × 200 px** transparent PNG |
| **Aspect ratio** | ~2.4 : 1 |
| **Rendered at** | 52 px tall, width auto |
| **Fit** | Natural |
| **Source** | `src/shared/components/footer/footer.css:64-72` |

> **Note copy:** "SVG preferred. If uploading a PNG, use 480 × 200 px with a transparent background."

⚠️ Same caveat as the navbar: `filter: invert(1) brightness(2)` flattens the logo to white.

---

## Quick reference

| Field | Recommended | Ratio | Fit |
|---|---|---|---|
| Navbar logo | SVG / 480 × 200 | 2.4:1 | natural |
| Hero slide (= featured project's 1st gallery image) | 1920 × 1080 | 16:9 | cover |
| Filter banner watermark | 600 × 600 | 1:1 | natural |
| Location card — featured | 1040 × 960 | 1.1:1 | cover |
| Location card — standard | 700 × 470 | 3:2 | cover |
| Project card | 800 × 1000 | 4:5 | cover |
| Property card | 800 × 450 | 16:9 | cover |
| Why Choose Us icon | 200 × 200 | 1:1 | contain |
| Blog card | 800 × 450 | 16:9 | cover |
| CTA background | 1920 × 1080 | 16:9 | cover |
| Developer logo | 240 × 240 | 1:1 strict | cover |
| Event pop-up | 700 × 880 | 4:5 | cover |
| Footer logo | SVG / 480 × 200 | 2.4:1 | natural |

---

## Soft warnings (non-blocking)

The recommended-size note is always visible **before** a file is chosen. After a file is
chosen, read its natural dimensions client-side and show a warning if any rule below trips.
The warning is informational only: the upload proceeds, Save stays enabled, nothing is
rejected.

```js
const img = new Image();
img.onload = () => check(img.naturalWidth, img.naturalHeight);
img.src = URL.createObjectURL(file);
```

**Rule 1 — Too small.** Trips when either dimension falls below 70% of the recommendation.

> "This image is {W} × {H}. The recommended size for this field is {RW} × {RH} — smaller
> images may look soft or pixelated here. You can still save it."

**Rule 2 — Wrong shape.** Trips when the uploaded aspect ratio differs from the
recommendation by more than **20%** (tighten to **10%** for the developer logo and the Why
Choose Us icon, which are strictly square). Applies only to `cover` fields — `contain`
fields never crop.

> "This image is {landscape/portrait/square} but this slot is {portrait/landscape/square}
> ({RW} × {RH}). The {top and bottom / left and right} edges will be cropped."

**Rule 3 — Unnecessarily large.** Trips when the width exceeds 3× the recommendation, or
the file is over 2 MB.

> "This image is much larger than needed ({size}). Resizing to about {RW} × {RH} will keep
> the page loading quickly."

Severity is advisory throughout — an amber note under the field, never a red error, never a
disabled Save.

### Thresholds

| Field | Warn if smaller than | Ratio tolerance |
|---|---|---|
| Hero slide | 1344 × 756 | ±20% |
| Location — featured | 728 × 672 | ±20% |
| Location — standard | 490 × 329 | ±20% |
| Project card | 560 × 700 | ±20% |
| Property card | 560 × 315 | ±20% |
| Blog card | 560 × 315 | ±20% |
| CTA background | 1344 × 756 | ±20% |
| Developer logo | 168 × 168 | ±10% |
| Why Choose Us icon | 140 × 140 | ±10% (no crop warning — uses `contain`) |
| Event pop-up | 490 × 616 | ±20% |
| Navbar / footer logo | 336 × 140 | not enforced (SVG accepted) |

## Formats and file size

- **Photography** (hero, cards, CTA, event) — JPEG at quality ~80. Target under 500 KB for
  cards, under 800 KB for full-bleed. WebP if the delivery pipeline supports it.
- **Logos and icons** (navbar, footer, developer, Why Choose Us, watermark) — SVG where a
  vector source exists, otherwise PNG-24 with a real alpha channel. Never JPEG: it has no
  transparency and will show a white box.
- The front-end applies no server-side resizing today — whatever is uploaded is what ships
  to the browser, at full weight.

---

*Derived from the front-end CSS as of commit `7904677`. If a card's dimensions change in
CSS, update this document and the dashboard notes together.*
