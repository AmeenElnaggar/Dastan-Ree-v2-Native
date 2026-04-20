# Task: High-End Redesign of Projects Listing Page

## 1. Objective

Complete visual and structural overhaul of the Projects Listing page. The goal is to create a "Luxury Digital Showroom" experience that is innovative, minimalist, and highly performant using **Native HTML/CSS/JS**.

## 2. Header & Introduction Section

- **Typography:** \* **Main Title:** Large, elegant serif or modern sans-serif (e.g., "Explore Our Exclusive Projects").
  - **Short Description:** A refined sub-headline providing context (max 2 lines).
- **Alignment:** Centered alignment with generous top/bottom padding (`80px 20px`) to create a "Breathable" luxury feel.

## 3. Innovative Filter Bar (The "Command Center")

- **Design:** A horizontal, sticky filter bar that stays at the top during scroll.
- **Filter Elements:** \* Minimalist dropdowns for: **Location**, **Price Range**, **Property Type**, and **Delivery Status**.
  - **Visual Style:** Use clean borders (`1px solid #eee`) and subtle hover states. No heavy shadows.
- **Interactivity:** Filters should update the listing dynamically without a full page reload (using Vanilla JS to filter the project cards).

## 4. Projects Grid (The "Showroom")

- **Layout:** A clean 3-column grid (or 2-column for a more "Gallery" feel).
- **Card Redesign (Luxury Standards):**
  - **Image Ratio:** High-quality 4:3 aspect ratio.
  - **The "Developer Seal":** Place the circular developer logo as a small floating seal on the top-right of the image.
  - **Content:** - Project Title (Bold & Sharp).
    - Location (Subtle icon + text).
    - Starting Price (Elegant font weight).
  - **Hover Animation:** A "Premium Lift" effect—image slightly zooms in, and a subtle overlay appears with a "View Details" button.

## 5. Modern Pagination

- **Style:** Minimalist numbering.
- **State:** High contrast for the active page, muted for others.
- **Navigation:** Clear "Next" and "Prev" arrows using FontAwesome or clean SVGs.

## 6. Global Aesthetics (Luxury & Innovation)

- **Color Palette:** Primary White background, Navy/Gold/Black accents (#0c1a2e / #0a1e77).
- **Spacing:** Increase the `gap` between cards and sections (minimum `40px`).
- **RTL Precision:** Use CSS Logical Properties to ensure the filter bar and grid icons mirror perfectly for the Arabic version.

## 7. Guidance for Claude Code Execution

1. **Structural Cleanup:** Remove any old sidebars or cluttered layouts.
2. **Component Reuse:** Ensure the "Project Card" component remains consistent with the design used in the "Similar Projects" section.
3. **JS Performance:** Ensure the filter logic is fast and smooth.
4. **Mobile Optimization:** On mobile, collapse the filter bar into a "Filter" button that opens a clean side-drawer or modal.
