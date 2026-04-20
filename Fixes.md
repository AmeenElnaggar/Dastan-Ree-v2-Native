# Add Blogs Section — Implementation Directive

We need to add a new **Blogs Section** to the Home Page.

This section should be implemented as a complete feature including:

• Blog Section Layout
• Reusable Blog Card Component
• Slider for blog items
• Mock data for blogs

---

## 1. Section Placement

The Blogs Section must be added as the **last section on the Home Page**.

Page order:

Hero
Featured Projects
Property Listing
Why Choose Us
Blogs Section ← NEW (LAST)

---

## 2. Blog Card Component

Create a **reusable Blog Card component**.

This component must be structured similarly to other shared components in the project.

It should be reusable and not hardcoded inside the section.

---

## 3. Blog Card Content

Each blog card should display:

• Blog Image
• Blog Title
• Short Description (excerpt)
• Publication Date
• CTA (Read More)

Do not omit any of these elements.

---

## 4. Blog Card Design

The design should follow the same **modern luxury real estate style** used across the project.

Expectations:

• clean layout
• strong image focus
• elegant typography
• proper spacing
• subtle hover effects

The card should feel consistent with:

• Property Card
• Project Card

But still visually distinct as a blog card.

---

## 5. Slider Implementation

The Blogs Section must use a **Swiper slider**.

Requirements:

• same slider behavior used in Property Listing
• smooth sliding
• proper spacing between cards
• responsive layout

Do not create a completely different slider style.

Reuse the existing slider patterns.

---

## 6. Section Header

The Blogs Section should include:

• Section Title (e.g. “Latest Articles” or “From Our Blog”)
• Optional action (e.g. “Browse All”)

The header should be aligned consistently with other sections.

---

## 7. Mock Data

Create a **mock data file for blogs**.

Each blog item should include:

• id
• title
• image
• description (short excerpt)
• date

The data should be realistic and suitable for a real estate website.

---

## 8. Architecture Rules

Follow the existing project structure:

• Blog Card → shared component
• Blogs Section → feature (Home page)
• Mock data → data folder

Do not mix logic or duplicate components.

---

## 9. Interaction & UX

Hover behavior should feel:

• smooth
• subtle
• modern

Possible interactions:

• image zoom
• card elevation
• CTA highlight

Animations must be consistent with the rest of the project.

---

## 10. Constraints

• Do not introduce new libraries
• Continue using Swiper
• Keep the code clean and modular
• Maintain naming consistency with the project

---

## Final Goal

Add a **complete Blogs Section** that feels like a natural extension of the website:

• modern
• elegant
• real estate focused
• fully reusable and scalable
