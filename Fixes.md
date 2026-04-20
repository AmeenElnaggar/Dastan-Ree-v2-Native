# Fixes v4: Footer Background & Social Link Refinement

## 1. Objective

Fix the missing footer background texture and simplify the social media hover interactions to achieve a "Minimalist Luxury" aesthetic.

## 2. Background Texture Implementation

- **Task:** Apply the following image as the footer background: `https://solviadevelopments.com/assets/media/footer-bg.png`
- **Styling Logic:** \* Set the `background-color` to `#0c1a2e`.
  - Use `background-image` for the provided URL.
  - Use `background-repeat: repeat` and `background-position: center`.
  - **Crucial:** Set `background-blend-mode: overlay` or adjust the `opacity` of the background pattern (e.g., via a pseudo-element `::before`) so it appears as a very subtle, sophisticated texture, not a dominant image.

## 3. Social Media Links (Minimalist Hover)

- **Initial State:** Social icons should be slightly muted (e.g., `text-white/50` or a soft grey).
- **Hover State:** \* On hover, the icon color should transition **only to pure white** (`text-white`).
  - **Remove** any glows, scales, or background fills.
  - Use a very smooth and slow transition (e.g., `transition: color 0.4s ease`).

## 4. Design Cleanup

- **Title & Text:** Ensure all footer headings and text are clean and follow the professional typography scale defined previously.
- **Logo:** Ensure the logo remains clearly visible and well-aligned with the new background texture.
- **Spacing:** Maintain the professional, "Airy" padding to keep the design feeling high-end and calm.

## 5. Technical Requirements

- Use Tailwind for the color and transition utilities.
- If the background image is still not showing, verify the CSS path and ensure the container has a relative position if using a pseudo-element for the pattern.
