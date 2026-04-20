# Fixes: Luxury Editorial Blog Section Redesign

## 1. Objective

Redesign the **Blog/News Section** to match the "Modern Luxury" aesthetic of the Properties and Projects sections. The goal is to transform the blog cards into a premium "Editorial" style and integrate the shared `featured-slider-controls`.

## 2. Blog Card Redesign (The Luxury Aesthetic)

- **Visual Concept:** Think "High-End Lifestyle Magazine."
- **Image Treatment:** \* Use a fixed aspect ratio (e.g., `16:9` or `4:5`) with a very subtle `darken` overlay that lightens on hover.
  - Add a "Date Badge" that looks minimalist (e.g., a simple white box with a thin border and elegant serif typography).
- **Typography & Content:**
  - **Category Tag:** Small, uppercase, and with high letter-spacing (`tracking-[0.2em]`) above the title.
  - **Title:** Use a semi-bold Slate-900 font with a strict `line-clamp-2` to maintain card symmetry.
  - **Description:** A very short, muted excerpt that only shows on larger screens.
- **Interactions:** A sophisticated "Read More" link that animates an arrow or an underline on hover.

## 3. Slider & Navigation Integration

- **Synchronization:** Implement the exact same `featured-slider-controls` (Pagination & Arrows) used in the Projects and Properties sections.
- **Alignment:** Ensure the arrows and pagination are perfectly aligned with the grid, maintaining identical margins and padding for visual consistency.
- **Transition:** Use a "Slide & Fade" transition for the blog cards during navigation for a more "Fluid" feel.

## 4. UI/UX Innovation Details

- **Micro-Innovation:** Add a "Read Time" indicator (e.g., "5 min read") using a minimalist icon.
- **Glassmorphism:** If the card has tags or categories, use a `backdrop-blur-sm` background for those elements to give a modern "Glass" look.
- **Shadows:** Apply the same "Soft-Global-Illumination" shadow used in the Property cards to ensure the entire page feels like one cohesive design.

## 5. Technical & RTL Requirements

- **Logical Properties:** Use `padding-inline`, `margin-inline`, and `border-start` to ensure the layout is perfectly balanced for Arabic (RTL).
- **Data Binding:** Maintain existing data models (Title, Date, Image, Category) and ensure they are bound correctly using Angular Signals.
- **Responsiveness:** Ensure a clean grid transition (1 card on mobile, 2 on tablet, 3 on desktop).
