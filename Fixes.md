Fixes: Synchronize Property Slider Controls with Project Section

1. Objective
   Achieve full visual and functional consistency across the platform by migrating the new Luxury Slider Controls (Pagination & Arrows) from the Projects section to the Properties section.

2. Requirements
   Standardization: Implement the featured-slider-controls pattern in the PropertySliderComponent.

Visual Alignment: The Arrows and Pagination in the Properties section must match the Projects section's positioning, styling (Modern/Luxury), and animation exactly.

Component Reusability: If possible, refactor the featured-slider-controls into a shared/reusable component to ensure any future UI updates reflect across both Properties and Projects.

3. Implementation Steps
   Template Sync: Update property-slider.component.html to include the same controls structure used in projects.

Style Migration: Ensure the SCSS/Tailwind classes for the luxury arrows and numerical/progress pagination are applied to the Properties slider.

Logic Integration: \* Connect the existing Property Slider's "Next/Prev" logic to the new controls.

Ensure the active state of the pagination correctly reflects the current index of the property cards.

RTL Check: Verify that the "mirroring" of arrows works perfectly in the Arabic layout, matching the behavior implemented in the Projects section.

4. Final Polish
   Ensure the spacing (Gaps and Margins) between the property cards and the new controls is identical to the Projects section to maintain the "Airy" luxury feel.
