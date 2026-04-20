# Property Details Page — Layout & UI Implementation (Reference Based)

## Objective

Implement a **Property Details Page** that visually and structurally matches the provided reference.

Reference Page:

https://pixelprime.co/themes/resideo-wp/demo-1/properties/colorful-little-apartment/

The goal is to reproduce the **same layout structure, hierarchy, and visual behavior** using our current project architecture.

This page should follow a **modern luxury real estate design language**, with clean spacing, elegant typography, and structured information presentation.

---

# Reference Source

A **local reference folder** has been provided.

Claude Code must inspect:

```
reference/index.html
```

Inside that file there is a section called:

```
pxp-single-property-top
```

This section defines the **core layout structure of the property details page**.

Claude must:

• analyze the structure
• understand the layout hierarchy
• reproduce the layout using our project architecture

Important:

Do **not reuse the `pxp-` class names**.

Instead, implement **clean project-specific class names**.

---

# Page Goal

Create a **Property Details Page layout identical to the reference**, including:

• header section structure
• gallery / slider section
• property meta information
• content layout
• clean luxury spacing

The page must feel like a **premium real estate listing page**.

---

# Page Layout Overview

The page should follow this high-level structure:

```
Property Details Page
    Property Top Section
        Breadcrumb
        Property Title
        Property Meta
        Property Actions
    Property Media Section
        Image Gallery / Slider
    Property Information
        Description
        Details
        Amenities
```

For this fix, the focus is on **rebuilding the Top Section and Media Layout**.

---

# Property Top Section

This section corresponds to the **pxp-single-property-top** layout from the reference.

It sits at the **top of the property details page**, before the gallery.

It contains the **main property identity information**.

---

## Breadcrumb

A breadcrumb navigation should appear at the top.

Example structure:

```
Home / Properties / Property Name
```

Requirements:

• small typography
• subtle color
• proper spacing from page top

---

## Property Title

The property title should appear prominently.

Example:

```
Colorful Little Apartment
```

Typography guidelines:

• bold
• large heading
• strong visual hierarchy

The title should feel **elegant and premium**.

---

## Property Meta Information

Below the title, display important property metadata.

Examples:

• location
• property type
• listing status

Layout should be **clean and horizontally aligned**.

Icons may be used to improve clarity.

---

## Property Actions

On the right side of the top section there should be **action elements**.

Examples:

• share
• save
• print

These should be implemented as **minimal icon buttons**.

Requirements:

• subtle hover effects
• clean spacing
• consistent icon size

---

# Property Media Section

Below the top section comes the **Property Media Area**.

This area displays the **main property gallery**.

---

## Gallery Structure

The gallery should follow the **reference layout**.

Expected behavior:

• main large image
• supporting images
• slider or gallery interaction

Swiper.js should be used for the gallery slider if necessary.

Images should feel **immersive and high-quality**.

---

## Image Styling

Images must:

• maintain correct aspect ratio
• fill their containers
• avoid distortion

Recommended styling:

```
object-fit: cover
```

Spacing between images should be **balanced and elegant**.

---

# Visual Design Guidelines

The entire page must follow a **luxury real estate visual style**.

Key principles:

### Clean Layout

• generous spacing
• well-aligned elements
• minimal clutter

### Elegant Typography

Headings should feel **strong and premium**.

Body text should remain **readable and balanced**.

### Visual Hierarchy

Users should immediately recognize:

• property title
• location
• main gallery

---

# Component Structure

The implementation should remain **modular and reusable**.

Suggested structure:

```
property-details-page
    property-header
    property-gallery
    property-content
```

Each section should be **separated logically**.

---

# Class Naming Rules

Do NOT reuse reference classes such as:

```
pxp-*
```

Instead, create project-specific names such as:

```
property-header
property-title
property-meta
property-gallery
property-breadcrumb
```

Naming must remain **clear and scalable**.

---

# Responsiveness

The layout must adapt properly across screen sizes.

### Desktop

• full layout visible
• gallery displayed prominently

### Tablet

• reduced spacing
• stacked meta layout

### Mobile

• stacked layout
• simplified gallery presentation

---

# Data Source

Use **mock data** for the property content.

Example fields:

```
title
location
price
bedrooms
bathrooms
area
images
description
amenities
```

The design should be **data-driven**.

---

# Implementation Goal

Recreate the **Property Details Page layout** so that it visually matches the provided reference.

Expected outcome:

• identical layout hierarchy
• clean luxury design
• modular implementation
• responsive layout
• modern real estate presentation
