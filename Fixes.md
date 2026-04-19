# Project Brief — Real Estate Web Application

## Project Overview

This project is a **Real Estate Web Application** that will be built as a **native frontend project** using the following technologies:

- **HTML**
- **CSS**
- **JavaScript**
- **Tailwind CSS**
- **Swiper.js** (for sliders)

This is **not a framework-based project** (no Angular, React, or Vue).  
The implementation should follow a **clean, modular structure** similar to modern frontend architectures while remaining a **pure native project**.

---

## Design Direction

The design must follow a **modern luxury style**, inspired by **high-end real estate websites**.

The UI should feel:

- Elegant
- Clean
- Spacious
- Premium
- Minimal but visually strong

Avoid generic or basic layouts. The design should resemble **modern real estate platforms used by luxury property developers and agencies**.

---

## Brand Identity

The main **brand identity color** for the project is:#0A1E77

### Usage Guidelines

- This color should be used as the **primary brand color**.
- It should appear in:
  - Buttons
  - Highlights
  - Key UI elements
  - Important interactive components

Other colors should complement this color to maintain a **luxury and professional appearance**.

---

## UI Philosophy

When implementing components and layouts, follow these principles:

- Clean spacing
- Large visual sections
- Clear typography hierarchy
- Smooth hover and interaction states
- Modern real estate visual patterns

The website should feel similar to **modern luxury property platforms**, not like a generic template.

---

## Implementation Expectations

- Use **TailwindCSS utilities** as the main styling approach.
- Maintain **clean and reusable structures**.
- Organize components and sections in a **clear folder structure**.
- Focus on **responsive design** from the beginning.

---

## Goal

The final result should look like a **premium real estate website** suitable for:

- Property developers
- Real estate agencies
- Luxury property listings

The experience should feel **modern, professional, and visually impressive**.

# Fixes v1 - Navbar — Real Estate Web Application

This document describes the required fixes and improvements for the **Navbar** in the Real Estate web application. The goal is to create a clean, modern, and responsive navigation bar that follows common patterns used in professional real estate websites.

---

## Logo

- Use the **logo image provided in the `assets` folder**.
- The logo should appear on the **left side of the navbar**.
- Ensure the logo scales properly and maintains good spacing within the navbar.

---

## Navigation Links

Add the following navigation links in this exact order:

- Home
- Projects
- Properties
- Blogs
- Events
- Careers
- About Us
- Contact Us

### Requirements

- Links should be **properly spaced and aligned horizontally**.
- Maintain a **clean and balanced layout**.
- Add **hover states** for better user interaction.
- Keep the styling **minimal and modern**.

---

## Phone Section

At the **right side of the navbar**, add:

- A **phone icon**
- The phone number:

19220

### Requirements

- The icon and number must be **aligned properly**.
- Styling should match the overall navbar design.

---

## Language Switcher

Next to the phone number, add a simple **language switcher**:

AR | EN

### Requirements

- Use **plain text only**.
- No dropdown or extra functionality is required for now.
- Keep the styling simple and consistent with the navbar.

---

## Navbar Behavior

### Homepage Behavior

On the **homepage only**:

- The navbar should be **transparent initially**.
- It should appear **above the hero section**.

When the user **scrolls down**:

- Change the navbar background to **white**.
- Add a **light shadow**.
- The transition should be **smooth**.

---

### Other Pages

On **all other pages**:

- The navbar should always have a **white background**.
- Add a **light shadow**.
- Do **not apply transparency** on these pages.

---

## Additional Requirements

- Use **TailwindCSS** for styling where possible.
- Ensure the navbar is **fully responsive**.
- Avoid unnecessary JavaScript except for the **scroll behavior**.
- Keep the implementation **clean and maintainable**.

---

## Goal

Build a **modern real estate style navbar** that:

- Looks professional and clean
- Works well with the homepage hero section
- Has proper scroll behavior
- Is responsive across different screen sizes

## Fixes v1.2 Navbar

Apply the following improvements to the Navbar component:

### 1. Center Navigation Links

The navigation links are currently not centered properly.

Requirements:

- The navigation links should be **perfectly centered horizontally** in the navbar.
- The logo should stay on the **left side**.
- The right side should contain the **phone icon + number (19220)** and the **language switcher (AR | EN)**.
- Use **flexbox with TailwindCSS** to properly align the layout.

Expected layout:

[ Logo ] [ Home | Projects | Properties | Blogs | Careers | About Us | Contact Us ] [ Phone 19220 | AR | EN ]

---

### 2. Remove "Events" Link

Remove the **Events** navigation link completely from the navbar.

The final links should be:

Home  
Projects  
Properties  
Blogs  
Careers  
About Us  
Contact Us

---

### 3. Fix Active Link Detection

Currently, **Projects** and **Properties** appear as active even when the user is on the **Home page**.

Requirements:

- Only the **correct route** should appear active.
- When the user is on the **Home page**, only **Home** should be active.
- Ensure the active state depends on the **current URL / route**, not on partial matches that cause multiple links to appear active.

---

### Notes

- Keep the **transparent navbar behavior on the Home page**.
- Maintain the **scroll behavior** (white background + soft shadow after scrolling).
- Do not change the overall design style defined in the project brief.

# Fixes v1.3 — Homepage Hero Slider Redesign

## Overview

Refactor the current **Homepage Hero Slider** to match a cleaner real estate landing design.

The hero section should contain:

- A full-height background image slider
- A centered title
- A search/filter box below the title

The goal is to create a modern real estate hero section similar to major property platforms.

---

# Hero Slider Layout

The hero section must:

- Take **100vh (full viewport height)**
- Use **background images** for slides
- Have the content **centered vertically and horizontally**

Structure:

Hero Section
Background Slider
Overlay Content
Title
Filters Box

---

# Slider Behavior

The slider should behave as a **background image rotator**.

Requirements:

- No navigation arrows
- No pagination bullets
- Slides should **automatically transition**
- Transition should be **simple fade or smooth change**
- Only **one background image visible at a time**

The effect should feel like:

Image disappears → next image appears

The slider should not contain UI controls.

---

# Hero Title

Centered inside the hero section.

Title text:

Find Your Future Home

Styling expectations:

- Large heading
- Centered
- Good contrast over the background image

---

# Filters Box

Below the title there should be a **search/filter box**.

This box will contain three elements.

## Filter Inputs

1️⃣ Property Type (Select Input)

Options:

- For Rent
- For Sale

---

2️⃣ Address Input

Placeholder:

Enter address...

This is a normal text input for searching locations.

---

3️⃣ Search Button

The search button should contain:

- A **search icon**
- Background color using the **website identity color**

---

# Spacing Requirements

The inputs inside the filters box should have:

- Clear spacing between them
- Proper padding
- Clean horizontal layout

Suggested layout:

[ Select Type ] [ Enter Address ] [ Search Button ]

---

# Design Requirements

The filters box should:

- Appear as a **floating search bar**
- Have a **clean modern style**
- Have padding and spacing between inputs
- Be centered under the title

---

# Technical Constraints

- Use **Tailwind CSS** for styling
- Keep JavaScript modular
- Do not introduce new libraries
- Keep the implementation simple and clean
- The slider must remain compatible with the current **Swiper setup**

---

# Goal

Create a **modern real estate hero section** with:

- Full-screen background slider
- Centered title
- Functional search/filter UI

# Fixes V1.4 — Hero Slider Styling & Functionality

## Context

The HTML structure for the **Homepage Hero Section** has already been created.

Do **NOT** change the HTML structure.

Your task is only to:

- Apply the correct styling
- Implement the slider behavior
- Load the slider images using mock data from JavaScript

---

# 1. Do Not Modify HTML Structure

The hero section HTML is already implemented.

Important:

- Do not rewrite the markup
- Do not move elements
- Do not change the structure

Only apply **styles and JavaScript logic**.

---

# 2. Hero Section Height

The hero section must:

- Take the **full viewport height (100vh)**
- The slider should cover the **entire hero background**

The background images must fill the section using:

- cover
- center positioning

---

# 3. Slider Behavior

The hero slider should behave like a **background image rotator**.

Requirements:

- Only **one image visible at a time**
- Images change automatically
- No arrows
- No pagination
- No navigation controls

The transition should be **smooth fade**.

The user should feel like the **background image is changing behind the hero content**.

---

# 4. Mock Data for Slides

The slider images must come from **mock data in JavaScript**.

Create a mock data file:

# Fixes v1.5 — Property Card Redesign (Property Listing Section)

## Context

The **Property Card component** is currently used in the Property Listing section.

The component needs a **visual redesign and hover animation improvements**.

Important:

- Do not change the component usage across pages.
- Only update the **layout and styling of the Property Card**.

---

# 1. Card Layout

The property card should become an **image-based card**.

Requirements:

- The **property image must cover the entire card**.
- The card should act as a **visual container with image background**.
- Property information should appear **only in the bottom section of the card**.

Structure concept:

Property Card  
 Image (full card)  
 Bottom Overlay  
 Property Info  
 View Details

---

# 2. Bottom Overlay

At the bottom of the card there should be a **content overlay**.

Requirements:

- Positioned at the **bottom of the image**
- Slight **dark gradient overlay**
- Ensures text readability

The overlay contains the property information.

---

# 3. Property Data

The following data must appear inside the bottom overlay:

- Property Title
- Property Price
- Property Details:

Example format:

BD | BA | SF

Example:

3 BD | 2 BA | 1800 SF

The layout should be **clean and compact**.

---

# 4. View Details Button

Below the property information there should be:

View Details

Requirements:

- It should be **text only**
- No button styling
- No background
- No borders

It should appear as a simple link-like text.

---

# 5. Hover Animation (Important)

The card should have **coordinated hover animations**.

When the user **hovers over the property card**:

### Image Animation

- The image should **zoom in slightly**

Effect:

smooth scale-up.

---

### Content Animation

The **overlay content container** should move **slightly upward**.

This creates space for the View Details link.

---

### View Details Animation

The **View Details text** should:

- appear from the **bottom**
- slide upward into view
- fade in smoothly

---

# 6. Hover Out Behavior

When the user removes the mouse from the card:

- The **View Details link slides down and disappears**
- The **overlay returns to its original position**
- The **image zoom returns to normal**

All animations should feel **smooth and coordinated**.

---

# 7. Animation Requirements

Use **smooth CSS transitions**.

The animation should feel:

- elegant
- modern
- subtle

Avoid aggressive or fast animations.

The goal is a **premium real estate card interaction**.

---

# 8. Technical Constraints

- Use **Tailwind CSS utilities**
- Keep the component reusable
- Do not break existing usage of the Property Card

---

# Goal

Create a **modern property card** with:

- full-image layout
- bottom overlay with property info
- elegant hover animations
- sliding "View Details" interaction

# Fixes V1.6 — Property Card Adjustments

## Context

The Property Card redesign has already been implemented successfully.

This task requires **small visual and layout adjustments only**.

Important:

- Do NOT rebuild the component.
- Do NOT change the HTML structure unless absolutely necessary.
- Only adjust **layout, styles, and animation behavior**.

---

# 1. Card Height & Aspect Ratio

The Property Card should have a **fixed visual height of 400px**.

Requirements:

- Card height: **400px**
- The image must still maintain a **proper aspect ratio**
- The image should use:

object-fit: cover

The image must fill the card area without distortion.

---

# 2. CTA Visibility Behavior

The element:

property-card\_\_cta

should behave as if it **does not exist initially**.

Default state:

- Hidden from view
- Not affecting the layout

When hovering over the card:

- The CTA should **slide up into view**
- The property info container should **move slightly upward** to make space for the CTA

This should feel like the CTA **emerges from the bottom of the card**.

---

# 3. Property Info Layout Update

Update the property information order.

New order:

Title  
Price  
Property Details (BD | BA | SF)

Example layout:

Property Title  
$450,000  
3 BD | 2 BA | 1800 SF

---

# 4. Price Styling

The property price should:

- Appear **below the title**
- Use **white color**
- Be clearly visible on the image overlay

Use good contrast with the background.

---

# 5. Animation Coordination

Hover interaction should behave as follows:

### On Hover

- Image slightly **zooms in**
- Property info container **moves upward**
- CTA **slides up and appears**

### On Hover Out

- CTA **slides down and disappears**
- Property info returns to its **original position**
- Image **zooms back to normal**

All transitions should be **smooth and coordinated**.

---

# 6. Animation Guidelines

Animations should feel:

- smooth
- subtle
- premium

Avoid fast or aggressive motion.

Use **CSS transitions with appropriate easing**.

---

# Goal

Refine the **Property Card interaction and layout** by:

- setting a consistent 400px card height
- improving CTA reveal behavior
- correcting property information hierarchy
- improving visual clarity of the price

# Fixes V1.7 — Property Card Animation Refinement

## Context

The Property Card design and hover interaction have already been implemented.

This task focuses only on **refining the animations** to make the interaction smoother and more coordinated.

Important:

- Do not change the layout or structure of the component.
- Only adjust animation timing, smoothness, and visual polish.

---

# 1. Property Info Animation

The element:

property-card\_\_info

currently moves upward on hover.

Required changes:

- Increase the **animation duration**
- The movement should feel **smooth and elegant**
- Use smoother easing for the transition

The animation should feel **more relaxed and natural** rather than quick.

---

# 2. Background Image Animation

The background image zoom effect should also be refined.

Required changes:

- Increase the **duration of the zoom animation**
- Ensure the zoom feels **soft and gradual**
- The image animation should feel synchronized with the info container animation

The animations should feel **connected rather than independent**.

---

# 3. View Details CTA Animation

The element:

property-card\_\_cta

currently slides into view on hover.

Required improvements:

- Increase the **animation duration**
- The CTA should **slide up smoothly**
- The motion should feel coordinated with the info container movement

It should appear as if the CTA **emerges naturally from the bottom** of the card.

---

# 4. Remove Underline

The **View Details** link should not display an underline.

Requirements:

- Remove the underline in both default and hover states
- Keep it as clean text

---

# 5. Animation Coordination

All hover animations should feel **synchronized and connected**.

On hover:

1. Image begins to **zoom in slowly**
2. Property info container **moves upward smoothly**
3. View Details CTA **slides up into view**

These animations should feel **like a single coordinated interaction**, not separate movements.

---

# 6. Overall Goal

Refine the Property Card interaction to achieve:

- smoother animations
- longer and more elegant transitions
- better coordination between elements
- a more **premium real estate UI interaction**

# Fixes V1.8 — Align Property Card Structure With Reference Layout

## Context

The Property Card already exists in the project.

However, the current implementation does not fully match the **layout and interaction pattern of the reference card**.

The goal of this fix is to **adjust the internal structure and styling of the Property Card** so that it behaves exactly like the provided reference.

## Reference

<div class="owl-item active" style="width: 310.167px;margin-right: 30px;"><div class="">
                    <a href="https://pixelprime.co/themes/resideo-wp/demo-1/properties/awesome-interior-apartment/" class="pxp-prop-card-1 rounded-lg ">
                        <div class="pxp-prop-card-1-fig pxp-cover" style="background-image: url(https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/prop-15-800x600.jpg);"></div>
                        <div class="pxp-prop-card-1-gradient pxp-animate"></div>
                        <div class="pxp-prop-card-1-details">
                            <div class="pxp-prop-card-1-details-title">Awesome Interior Apartment</div>
                            <div class="pxp-prop-card-1-details-price">$1,240,000 <span></span>
                            </div>
                            <div class="pxp-prop-card-1-details-features text-uppercase">4 BD<span>|</span>2 BA<span>|</span>2600 SF
                            </div>
                        </div>
                        <div class="pxp-prop-card-1-details-cta text-uppercase">View Details</div>
                    </a>
                </div></div>

Important:

- Use the **reference only for layout and behavior**
- Do not copy external data
- Keep using the existing project mock data
- Keep the component reusable

---

# 1. Card Root Element

The root element of the card should be a **link element**.

Example concept:

Property Card  
→ clickable container

Requirements:

- Position: **relative**
- Height: **400px**
- Border radius should match the design system
- Overflow should be hidden

The entire card should be clickable.

---

# 2. Cover Image Layer

The property image should act as a **background cover layer**.

Requirements:

- Positioned **absolute**
- Fill the entire card area

Properties concept:

- position: absolute
- inset: 0
- background-size: cover
- background-position: center

Animation requirements:

- Smooth zoom effect on hover
- Transition duration around **1s**
- Easing: **ease-in-out**

---

# 3. Gradient Overlay

A gradient overlay must sit above the image to improve text readability.

Requirements:

- Positioned **absolute**
- Cover the bottom half of the card

Concept:

Top area transparent  
Bottom area darker

Gradient concept:

linear-gradient(
to bottom,
rgba(0,0,0,0) 0%,
rgba(0,0,0,0.4) 100%
)

Position:

- absolute
- left: 0
- right: 0
- bottom: 0
- top: 50%

This gradient should **fade smoothly over the image**.

---

# 4. Property Details Container

The property information should appear inside a **details container positioned at the bottom**.

Required properties:

- position: absolute
- bottom: 0
- left: 0
- right: 0
- padding: 20px
- text color: white
- z-index above gradient

The container should include:

Title  
Price  
Property Features

Example layout:

Property Title  
$1,240,000  
4 BD | 2 BA | 2600 SF

Animation:

The details container should **move slightly upward on hover**.

Transition requirements:

- duration around **0.4s**
- easing: **ease-in-out**

---

# 5. CTA (View Details)

The CTA element should be placed **below the property details container**.

Initial state:

- opacity: 0
- translated downward (hidden below the card)

Concept:

transform: translateY(400%)

On hover:

- CTA should **slide upward**
- opacity should **fade in**

Transition:

- duration around **0.4s**
- easing: **ease-in-out**

CTA styling:

- white text
- uppercase
- small font size
- no underline
- no button styling

---

# 6. Hover Interaction

The hover interaction must coordinate **three animations together**.

When hovering the card:

1. Background image **zooms in slightly**
2. Property details container **moves upward**
3. CTA **slides up into view**

When hover ends:

1. Image **returns to normal scale**
2. Details container **returns to original position**
3. CTA **slides down and disappears**

All animations should feel **smooth and synchronized**.

---

# 7. Animation Coordination

Animations should feel **connected and progressive**, not abrupt.

Sequence feeling:

- Image zoom begins
- Details container shifts upward
- CTA appears smoothly

The interaction should feel like **a single cohesive animation**.

---

# Goal

The Property Card should visually match the **reference layout and interaction style**, including:

- full image background card
- bottom gradient overlay
- bottom-aligned property information
- hidden CTA that appears on hover
- smooth coordinated hover animations

# Fixes V1.9 — Property Listing Slider & Card Alignment With Reference

## Context

The **Property Listing Section** currently exists, but its layout and behavior do not fully match the reference implementation.

The goal of this fix is to **align both the Property Card design and the Properties Slider behavior** with the reference provided.

This includes:

- Property Card layout
- Slider structure
- Arrow behavior
- Slide spacing
- Visible slides

Important:

Do not introduce new libraries.

The slider must continue using **Swiper.js**.

---

# Part 1 — Property Card Structure

The Property Card must follow the same internal layering structure as the reference.

Card hierarchy:

Property Card (link container)  
→ Cover Image  
→ Gradient Overlay  
→ Property Details  
→ CTA (View Details)

---

## 1. Root Card Container

The root element should be a **link element**.

Requirements:

- position: relative
- height: 400px
- overflow: hidden
- border radius applied
- entire card clickable

---

## 2. Cover Image Layer

The property image should act as a **background layer**.

Use the following styling behavior:

- position: absolute
- inset: 0

Background properties:

background-size: cover  
background-position: center center  
background-repeat: no-repeat

Animation:

The image should **zoom slightly on hover**.

Transition:

smooth transition  
duration around **1s**  
ease-in-out

---

## 3. Gradient Overlay

A gradient overlay must sit above the image.

Purpose:

Improve text readability.

Properties:

- position: absolute
- left: 0
- right: 0
- bottom: 0
- top: 50%

Gradient:

linear-gradient(
to bottom,
rgba(0,0,0,0) 0%,
rgba(0,0,0,0.4) 100%
)

---

## 4. Property Details

The property information container should be positioned at the **bottom of the card**.

Properties:

position: absolute  
bottom: 0  
left: 0  
right: 0  
padding: 20px  
color: white  
z-index above gradient

Displayed data:

Title  
Price  
BD | BA | SF

Example layout:

Awesome Interior Apartment  
$1,240,000  
4 BD | 2 BA | 2600 SF

Animation:

The details container should **move upward slightly on hover**.

Transition:

duration around **0.4s**  
ease-in-out

---

## 5. CTA (View Details)

The CTA should appear **below the details container**.

Default state:

- hidden
- opacity: 0
- translated downward

Concept:

transform: translateY(400%)

On hover:

- slides upward
- fades in

Transition:

0.4s ease-in-out

CTA styling:

- white text
- uppercase
- small font
- no underline
- no button styling

---

# Part 2 — Properties Slider Layout

The Property Cards are displayed inside a **horizontal slider**.

The slider should visually match the reference.

---

## 1. Visible Slides

The slider should show:

3.5 cards

Meaning:

- 3 full cards
- half of the next card visible

Purpose:

Indicate more content available by scrolling.

Swiper configuration should allow partial visibility.

---

## 2. Slide Spacing

Spacing between cards should be:

30px

Each card should have consistent spacing.

---

## 3. Arrow Position

The navigation arrows should be positioned **relative to the slider container**.

They must be:

- vertically centered
- placed slightly outside the slider edges

Positioning concept:

top: 50%  
transform: translateY(-50%)

---

# Part 3 — Arrow Design

The arrows should follow the same visual design as the reference.

Arrow container styling:

background-color: white  
width: 64px  
height: 64px  
border-radius: 50%  
box-shadow: 0px 5px 10px rgba(0,0,0,0.16)

Properties:

position: absolute  
z-index: 10  
cursor: pointer

---

## Left Arrow

Position:

left: 0

Transform:

translate(-50%, -50%)

---

## Right Arrow

Position:

right: 20px

---

# Part 4 — Arrow Visibility Logic

The arrows should appear and disappear based on the **current slider position**.

Behavior:

At slider start:

Left arrow → hidden  
Right arrow → visible

After sliding forward:

Left arrow → visible  
Right arrow → visible

At slider end:

Left arrow → visible  
Right arrow → hidden

This behavior should be controlled by **Swiper state**.

---

# Part 5 — Overall Interaction

The section should feel **clean and interactive**.

Expected result:

- smooth sliding
- partially visible next card
- elegant hover interaction
- arrows appearing contextually
- consistent spacing between cards

---

# Goal

Rebuild the **Property Listing Section interaction** so it matches the reference behavior:

• identical card layering structure  
• proper hover animation  
• slider showing 3.5 cards  
• contextual navigation arrows  
• professional real estate UI interaction

#

Read the fixesv1.9 described in the fixes.md file.

Focus only on the section related to the Property Listing and Property Card fixes.

Your task is to carefully analyze this part and apply the required changes to the existing implementation.

Apply the fixes to:

1. The Property Listing section in the Home page
2. The shared Property Card component used across the project

Important instructions:

- Do not rewrite unrelated parts of the code.
- Only modify what is required to satisfy the fixes described in the document.
- Preserve the existing project structure and naming conventions.
- Ensure the hover animations, CTA behavior, layout structure, and slider behavior match the specifications described in the fixes.

The Property Card is a shared component, so the changes should be implemented in the shared component itself, not duplicated in the Home page.

Make sure the Home Property Listing section correctly uses the updated shared Property Card and apply the custom slider to this section with the related ref which is explained before in the fixesv1.9 .

Before implementing, briefly explain what parts of the code will be updated.
Then apply the changes.

# Fixes V2 — Add "Why Choose Us" Section

## Context

A new section must be added to the **Home Page** after the **Property Listing section**.

This section should replicate the **design and structure of the reference implementation** provided below.

The goal is to match the **layout, spacing, and card structure** as closely as possible to the reference.

---

# Section Placement

Insert the new section **directly after the Property Listing section** on the Home Page.

Home Page structure should become:

Hero Section  
Property Listing Section  
Why Choose Us Section ← NEW

---

# Background Image

The section must use a **full-width background image**.

Instead of using the image from the reference URL, use the image located inside the project:

assets/images/whychooseus/

Before implementing the styles, inspect the image inside this folder to understand the intended visual design.

Apply the same background behavior as the reference.

Required CSS behavior:

background-size: cover  
background-position: center center  
background-repeat: no-repeat

The background should cover the entire section width.

---

# Section Layout

The section contains the following elements:

• Section Title  
• Section Subtitle  
• Services Container  
• Four Service Cards

Overall structure:

Why Choose Us Section  
├─ Title  
├─ Subtitle  
└─ Services Container  
  ├─ Service Item  
  ├─ Service Item  
  ├─ Service Item  
  └─ Service Item

---

# Section Title

Title:

Why Choose Us

Subtitle:

We offer perfect real estate services.

Both elements must be **center aligned**.

Spacing should visually match the reference.

---

# Services Container

The **services container must match the visual design of the reference**.

Requirements:

• white background  
• rounded corners  
• centered inside the page container  
• visually floating above the background image

The container should appear as a **floating white block placed above the background section**.

Spacing and padding should follow the reference layout.

---

# Service Item Structure

Each service item must contain:

1. Icon image
2. Title
3. Description
4. CTA text

Layout should be **vertical and center aligned**.

Example layout:

Icon  
Title  
Description  
Learn more

Each service item should behave as a **clickable block**.

---

# Service Items Content

Service 1

Title:  
Find your future home

Description:  
We help you find a new home by offering a smart real estate experience

---

Service 2

Title:  
Experienced agents

Description:  
Find an experienced agent who knows your market best

---

Service 3

Title:  
Buy or rent homes

Description:  
Millions of houses and apartments in your favourite cities

---

Service 4

Title:  
List your own property

Description:  
Sign up now and sell or rent your own properties

---

# CTA Behavior

CTA text:

Learn more

Requirements:

• text only  
• uppercase  
• centered  
• not styled as a button

Hover behavior should match the reference interaction style.

---

# Implementation Rules

Important constraints:

• follow the reference structure exactly  
• do not introduce new UI patterns  
• keep the design consistent with the current UI system  
• use existing layout utilities where possible  
• ensure responsive behavior

---

# Reference HTML (Template)

Use the following markup as the **structural reference** for implementing the section.

```html
<div
  class="pxp-services pxp-cover pt-100 mb-200 mt-100"
  style="background-image: url(https://pixelprime.co/themes/resideo-wp/demo-1/wp-content/uploads/2020/07/services-h-fig-1920x1280.jpg);">
  <h2 class="text-center pxp-section-h2">Why Choose Us</h2>
  <p class="pxp-text-light text-center">
    We offer perfect real estate services.
  </p>

  <div class="container">
    <div class="pxp-services-container rounded-lg mt-4 mt-md-5">
      <a href="#" class="pxp-services-item">
        <div class="pxp-services-item-fig">
          <img src="services-1.png" alt="" />
        </div>

        <div class="pxp-services-item-text text-center">
          <div class="pxp-services-item-text-title">Find your future home</div>

          <div class="pxp-services-item-text-sub">
            We help you find a new home by offering a smart real estate
            experience
          </div>
        </div>

        <div class="pxp-services-item-cta text-uppercase text-center">
          Learn more
        </div>
      </a>

      <a href="#" class="pxp-services-item">
        <div class="pxp-services-item-fig">
          <img src="services-2.png" alt="" />
        </div>

        <div class="pxp-services-item-text text-center">
          <div class="pxp-services-item-text-title">Experienced agents</div>

          <div class="pxp-services-item-text-sub">
            Find an experienced agent who knows your market best
          </div>
        </div>

        <div class="pxp-services-item-cta text-uppercase text-center">
          Learn more
        </div>
      </a>

      <a href="#" class="pxp-services-item">
        <div class="pxp-services-item-fig">
          <img src="services-3.png" alt="" />
        </div>

        <div class="pxp-services-item-text text-center">
          <div class="pxp-services-item-text-title">Buy or rent homes</div>

          <div class="pxp-services-item-text-sub">
            Millions of houses and apartments in your favourite cities
          </div>
        </div>

        <div class="pxp-services-item-cta text-uppercase text-center">
          Learn more
        </div>
      </a>

      <a href="#" class="pxp-services-item">
        <div class="pxp-services-item-fig">
          <img src="services-4.png" alt="" />
        </div>

        <div class="pxp-services-item-text text-center">
          <div class="pxp-services-item-text-title">List your own property</div>

          <div class="pxp-services-item-text-sub">
            Sign up now and sell or rent your own properties
          </div>
        </div>

        <div class="pxp-services-item-cta text-uppercase text-center">
          Learn more
        </div>
      </a>
    </div>
  </div>
</div>
```

# Fixes V2.1 — Why Choose Us Item Hover Interaction

## Context

The **Why Choose Us section** has been implemented based on the reference.

This fix introduces **interactive hover behavior and visual improvements** for the service items to make the UI feel more modern and dynamic.

The goal is to create a **smooth, coordinated animation between the icon, text, and CTA** when hovering over a service item.

All animations should feel **connected and smooth**, not abrupt or independent.

---

# Part 1 — CTA Hover Animation

The **Learn more CTA** should be hidden by default.

Default state:

opacity: 0
transform: translateY(30px)

The CTA should not be visible initially.

When the user **hovers over the service item**:

• the CTA should **slide upward from bottom to top**
• the CTA should **fade in smoothly**

Animation behavior:

opacity → 1
transform → translateY(0)

The animation must feel **smooth and modern**.

Suggested transition:

duration: 0.4s – 0.5s
timing: ease-in-out

---

# Part 2 — Text Push Animation

When the CTA appears, the **text block (title + description)** should move slightly upward.

This creates space for the CTA and improves the interaction feel.

Hover behavior:

text container → translateY(-10px to -15px)

This movement must happen **at the same time as the CTA animation**.

The motion should feel connected, not sequential.

---

# Part 3 — Icon Animation

The service **icon should animate vertically** during hover.

Default state:

icon visible in its normal position.

On hover:

1. The icon should **move upward and disappear slightly**.

transform: translateY(-20px)
opacity: 0

2. Then it should **re-enter smoothly from above**.

transform: translateY(0)
opacity: 1

This animation should be **subtle and smooth**, not exaggerated.

The icon should feel **alive but not distracting**.

Suggested transition:

duration: 0.4s
ease-in-out

---

# Part 4 — Title Style Update

The **service item title** should have stronger visual emphasis.

Apply the following styling:

font-weight: 600 or 700
color: #333

This ensures the title has better readability against the white container.

Do not change the layout spacing.

---

# Part 5 — Animation Coordination

All animations inside the service item must feel **coordinated and synchronized**.

When hovering the service item:

• icon animates
• text shifts upward
• CTA appears

These animations must **start together** and feel part of the same interaction.

Do not create delayed or unrelated transitions.

The interaction should feel **modern, smooth, and cohesive**.

---

# Part 6 — Interaction Expectations

Final hover experience should feel like:

Hover service item
→ icon reacts
→ text moves upward
→ CTA appears smoothly

The result should resemble **modern SaaS or real estate landing page interactions**.

Avoid aggressive motion or large transforms.

Subtle, elegant animation is preferred.

---

# Goal

Enhance the **Why Choose Us service items** with modern hover interactions that feel smooth, coordinated, and professional while keeping the layout consistent with the reference design.

# Fixes v3 — Projects Card Redesign (Reference Based)

## Context

The **Projects Cards** currently exist in the application but their layout and hover interaction do not match the reference design.

This fix updates the **Project Card layout, animation behavior, and hover interactions** to follow the reference implementation.

The card must replicate the **same structure and visual behavior** seen in the reference.

Before implementing styles, carefully inspect the **reference image provided in the project assets**.

Reference image location:

assets/images/reference/project-card

The final result must visually match the reference image.

---

# Reference Template

Use the following **HTML structure as the layout reference**.

This structure defines the correct layering and hierarchy of the Project Card.

```html
<div class="col-sm-12 col-md-6 col-lg-4">
  <a href="#" class="pxp-areas-1-item rounded-lg">
    <div
      class="pxp-areas-1-item-fig pxp-cover"
      style="background-image: url(area-image.jpg);"></div>

    <div class="pxp-areas-1-item-details">
      <div class="pxp-areas-1-item-details-area">Marina District</div>

      <div class="pxp-areas-1-item-details-city">San Francisco</div>
    </div>

    <div class="pxp-areas-1-item-counter">
      <span>2 Properties</span>
    </div>

    <div class="pxp-areas-1-item-cta text-uppercase">Explore</div>
  </a>
</div>
```

This structure must be respected when implementing the card.

---

# Part 1 — Card Container

The root element `.pxp-areas-1-item` should behave as the card container.

Required properties:

position: relative
display: block
height: 400px
overflow: hidden
border-radius: inherit

The entire card must be **clickable**.

---

# Part 2 — Background Image Layer

The element `.pxp-areas-1-item-fig` represents the **background image layer**.

Properties:

position: absolute
inset: 0

Background styling:

background-size: cover
background-position: center center
background-repeat: no-repeat

Hover behavior:

The background image should **zoom slightly** when hovering the card.

Example transform concept:

transform: scale(1.08)

Transition:

duration: ~0.6s – 0.8s
timing: ease-in-out

---

# Part 3 — Card Details (Area + City)

The `.pxp-areas-1-item-details` block contains:

• area name
• city name

It should be positioned near the **bottom-left area of the card**.

Example layout behavior:

position: absolute
bottom: 60px
left: 20px
z-index: 3
color: white

Typography:

Area title → bold
City → smaller and lighter

The text should remain **visible above the image**.

---

# Part 4 — Properties Counter Animation

The `.pxp-areas-1-item-counter` element displays the number of properties.

This element must replicate the **reference hover behavior**.

Base styling:

```
.pxp-areas-1-item-counter {
    position: absolute;
    bottom: 110px;
    left: 20px;

    color: #333;
    font-weight: 700;
    text-transform: uppercase;

    padding: 6px 10px;
    border-radius: 50px;
    font-size: .6rem;

    z-index: 3;
    overflow: hidden;

    transform: scale(0);
    transition: all .2s ease-in-out;
}
```

Default state:

The counter should be **hidden initially** using:

transform: scale(0)

---

# Part 5 — Counter Background Animation (Pseudo Element)

The counter background uses a **:before pseudo-element** to create the sliding circular effect.

```
.pxp-areas-1-item-counter:before {
    content: "";
    display: block;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: #fff;
    border-radius: 50px;

    transform: translateX(-72%);
    transition: all .4s ease-in-out;
}
```

This pseudo element creates the **animated white background reveal**.

---

# Part 6 — Counter Hover Behavior

When hovering the card:

The counter should **appear with a scale animation**.

Hover state:

transform: scale(1)

At the same time:

The pseudo element should **slide from left to right**.

Example hover behavior:

```
.pxp-areas-1-item:hover .pxp-areas-1-item-counter {
    transform: scale(1);
}

.pxp-areas-1-item:hover .pxp-areas-1-item-counter:before {
    transform: translateX(0);
}
```

This creates the effect of a **rounded pill expanding from the left side**.

---

# Part 7 — CTA (Explore Button)

The CTA element `.pxp-areas-1-item-cta` must appear from the **bottom of the card**.

Default state:

opacity: 0
transform: translateY(40px)

Hover state:

opacity: 1
transform: translateY(0)

Positioning:

position: absolute
bottom: 20px
left: 20px
z-index: 3

Typography:

uppercase
small font size
bold weight

Transition:

duration: ~0.4s
ease-in-out

---

# Part 8 — Hover Interaction Coordination

All hover animations must happen **simultaneously and feel connected**.

When hovering the card:

1️⃣ background image zooms
2️⃣ properties counter appears
3️⃣ counter background slides in
4️⃣ explore CTA slides upward

These animations should start **at the same time**.

No element should animate significantly earlier than the others.

---

# Part 9 — Final Interaction Experience

Expected hover behavior:

Hover Project Card →

• background image zooms slightly
• property counter pill expands from left
• explore CTA slides up from bottom

All animations must feel:

• smooth
• modern
• subtle
• coordinated

Avoid aggressive motion.

The interaction should resemble **modern real estate website cards**.

---

# Goal

Rebuild the **Project Card interaction and layout** so it matches the provided reference image and template.

The final card should have:

• identical structure
• matching hover behavior
• animated counter reveal
• synchronized hover animations
• professional real estate UI interaction

# Fixes V3.1 — Project Card Structure Adjustment & Class Refactor

## Context

The **Project Card implementation** is now close to the desired design, but a few structural and naming improvements are required.

The goal of this fix is to:

• remove the `pxp-*` class naming
• replace them with **project-specific semantic class names**
• slightly adjust the **card layout structure**
• keep the **existing animations and styles where possible**

Important:

Do **not rewrite the card from scratch**.

Reuse the existing styling and behavior and only apply the structural adjustments described below.

---

# Part 1 — Rename All `pxp-*` Classes

All classes currently starting with:

pxp-

must be replaced with **semantic classes related to the project card**.

Example mapping concept:

```
pxp-areas-1-item           → project-card
pxp-areas-1-item-fig       → project-card__image
pxp-areas-1-item-details   → project-card__details
pxp-areas-1-item-counter   → project-card__counter
pxp-areas-1-item-cta       → project-card__cta
```

Important rules:

• class naming should follow **BEM-style structure**
• names must be **project-card related**
• remove **all pxp-prefixed classes**

Example final structure concept:

```
project-card
project-card__image
project-card__details
project-card__counter
project-card__cta
```

---

# Part 2 — New Card Layout Structure

The **card layout must be slightly adjusted**.

Currently:

Text content overlays the image.

New structure:

Image on top
Details section below with **white background**

Conceptual layout:

```
Project Card
 ├── Image Container
 │     ├── Background Image
 │     └── Counter
 │
 └── Details Container (white background)
       ├── Title
       ├── Location
       └── Explore CTA
```

---

# Part 3 — Image Section

The image container should remain visually similar to the current implementation.

Properties:

• position: relative
• overflow: hidden
• border-radius on top corners
• background image cover

The **zoom hover animation must remain unchanged**.

Counter element:

The counter must stay **inside the image container**.

The current **counter animation must remain exactly the same**.

Do not modify:

• scale animation
• pseudo-element background animation
• timing functions

Only update the **class names**.

---

# Part 4 — Details Section

The `.project-card__details` section must appear **below the image**.

Styling:

background-color: white
padding: 20px
display: flex
flex-direction: column
gap: 6px

Border radius:

bottom corners should match the card radius.

---

# Part 5 — Title Styling

The project title must be visually stronger.

Adjust typography:

font-weight: 600 or 700
color: #333
font-size slightly larger than the location text

Example structure:

```
<div class="project-card__title">
    Marina District
</div>
```

---

# Part 6 — Location Text

Below the title, display the **location text**.

Example:

```
<div class="project-card__location">
    San Francisco
</div>
```

Styling:

color: #777
font-size slightly smaller than title

---

# Part 7 — Explore CTA Position

The **Explore button** should now live inside the details section.

New structure:

```
project-card__details
   ├── title
   ├── location
   └── explore CTA
```

The CTA must be **aligned horizontally with the location text**.

Example layout concept:

```
Location text        Explore
```

Implementation suggestion:

Use flex layout.

Example concept:

```
display: flex
justify-content: space-between
align-items: center
```

---

# Part 8 — Explore CTA Animation

The **Explore CTA** should appear only when hovering the card.

Default state:

opacity: 0
transform: translateY(10px)

Hover state:

opacity: 1
transform: translateY(0)

Transition:

duration ~0.3s – 0.4s
ease-in-out

Important:

The animation should feel **smooth and subtle**.

---

# Part 9 — Hover Behavior Summary

When hovering the card:

1️⃣ background image zooms
2️⃣ counter animation appears
3️⃣ explore CTA fades and slides into view

The animations must remain **synchronized and smooth**.

---

# Part 10 — Final Visual Result

The final card should look like this structurally:

```
┌──────────────────────────┐
│                          │
│      Project Image       │
│                          │
│        Counter           │
│                          │
├──────────────────────────┤
│ Marina District          │
│ San Francisco     Explore│
└──────────────────────────┘
```

The result should feel:

• clean
• modern
• minimal
• aligned with real estate UI patterns

---

# Goal

Refactor the **Project Card implementation** to:

• remove `pxp-*` class naming
• introduce semantic `project-card` classes
• move details section below the image
• keep the counter animation unchanged
• align the Explore CTA with the location text
• preserve existing hover interactions

### Fixes v3.2 Featured Projects Section — UI Consistency

We need to refactor the **Featured Projects section** so that it follows the **exact same layout and slider structure used in the Property Listing slider**.

The goal is to keep **design consistency across the website** while still using **project-specific components and data**.

---

### 1. Section Header Structure

The **Featured Projects section header** must follow the **same structure used in the Property Listing section**.

Requirements:

- Use the **same layout and alignment**.
- Title on the **left side**.
- A **Browse All button** on the **right side**.
- The button must be aligned **horizontally with the section title**.

Example layout:

Section Title | Browse All Button

Important:

- Reuse the **same spacing, typography, and alignment rules** used in the Property Listing header.
- Do **not introduce new styles** if the same ones already exist.

---

### 2. Slider Structure

The **Featured Projects slider** must replicate the **same structure and behavior** used in the Property Listing slider.

Requirements:

- Same **Swiper configuration**
- Same **navigation arrows**
- Same **pagination style**
- Same **responsive behavior**
- Same **spacing between slides**
- Same **container structure**

Important:

Do **not create a different slider design**.

Instead, inspect the **Property Listing slider implementation** and reuse the **same structure and styles**.

---

### 3. Card Component Usage

Although the slider structure should match the Property Listing slider, the **card inside the slider must remain the Project Card**.

That means:

Use:

- `project-card`
- `project-card__image`
- `project-card__details`
- `project-card__title`
- `project-card__location`
- `project-card__explore`
- `project-card__counter`

Do **not reuse property card classes**.

Only the **slider structure and section layout** should match the Property Listing implementation.

---

### 4. Design Consistency Rules

Maintain full consistency with the rest of the project:

- Same **section paddings**
- Same **grid alignment**
- Same **slider navigation placement**
- Same **button styling**
- Same **responsive behavior**

The Featured Projects section should feel like **a natural extension of the Property Listing section**, not a completely different component.

---

### 5. Important Constraints

Do not modify the existing **Project Card design** that was implemented earlier.

Only adjust:

- Section layout
- Section header
- Slider container
- Slider configuration

The **Project Card itself should remain unchanged**.

### Critical Fix v1 — Property Listing Slider Using Wrong Card

There is a **major implementation mistake** that must be corrected.

While updating the Featured Projects section, the **Property Listing slider logic was accidentally modified**.

The function responsible for initializing the **properties slider** is now rendering the **project card**, which is incorrect.

Property Listing must **always use the Property Card**, not the Project Card.

---

### 1. Restore Property Card in Property Listing Slider

Inside the **properties slider initialization function**, the rendered card must be:

`property-card`

NOT:

`project-card`

The current implementation is incorrectly injecting **project card markup inside the Property Listing slider**.

This must be reverted.

---

### 2. Restore the Original Property Listing Card Structure

The **Property Listing slider** must use its **original card component and structure**.

Do **not reuse any `project-card` classes** inside the Property Listing section.

---

### 3. Maintain Full Separation Between Cards

The project must maintain **strict separation between card types**.

Property Listing → uses **Property Card only**

Featured Projects → uses **Project Card only**

Under no circumstances should the **Property Listing slider render project cards**.

---

### 4. Restore the Previous Slider Behavior

The **Property Listing slider behavior and structure must be restored exactly as it was before** the Featured Projects changes.

This includes:

- Same slider initialization
- Same card rendering logic
- Same DOM structure
- Same classes

The only section that should use **Project Cards** is:

**Featured Projects**

---

### 5. Important Constraint

Do not modify the **Featured Projects implementation** that was just created.

Only fix the incorrect change inside the **Property Listing slider initialization**.

After the fix:

Property Listing → Property Card
Featured Projects → Project Card
