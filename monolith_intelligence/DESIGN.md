---
name: Monolith Intelligence
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#4a4949'
  on-secondary-container: '#bab8b7'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1440px
---

## Brand & Style
The design system is engineered for deep focus and high-performance cognitive workflows. It adopts a **Minimalist-Glassmorphic** hybrid style, utilizing high-contrast monochrome values to eliminate visual noise and center the user's data. 

The aesthetic is "Obsidian Sleek"—heavy on whitespace, with razor-sharp precision in alignment and subtle depth transitions. It evokes an intellectual and organized emotional response, positioning the product as a sophisticated extension of the user's mind. Professionalism is maintained through strict structural discipline, while glassmorphism adds a layer of modern, digital materiality.

## Colors
This design system operates on a strict monochromatic scale to ensure maximum content legibility and focus. 

- **Primary (#FFFFFF):** Reserved for high-priority typography, active icons, and critical call-to-action fills.
- **Secondary (#111111):** Used for elevated surface containers and sidebar backgrounds to create subtle separation from the abyss of the canvas.
- **Tertiary (#F5F5F5):** Applied sparingly for hover states or low-priority labels when used against dark backgrounds.
- **Neutral (#000000):** The base canvas color, providing a true-black environment that minimizes eye strain and maximizes OLED efficiency.

Functional states (Success, Error, Warning) should be communicated through iconography and stroke weight rather than hue, maintaining the "Second Brain" purity.

## Typography
The typography system balances the technical precision of **Geist** for structural elements with the universal readability of **Inter** for long-form thought capture. 

Hierarchies are established primarily through weight and size rather than color. Headlines use tight letter-spacing to appear "compact" and authoritative. Labels and small utility text use slightly increased letter-spacing and uppercase styling where appropriate to maintain legibility against deep black backgrounds.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to prevent information sprawl, transitioning to a fluid model for mobile. 

- **Desktop:** 12-column grid with a 1440px max-width. Large 40px margins provide "breathing room" for the brain to process information.
- **Gaps:** Use a 4px base-unit. Standard spacing between related cards is 24px (6 units).
- **Reflow:** On tablet, the sidebar collapses into a thin iconic strip. On mobile, the interface moves to a single-column stack with 16px horizontal margins.

Whitespace is treated as a functional element, not a void. Use generous vertical padding (64px+) between major content sections.

## Elevation & Depth
Depth is communicated through **Glassmorphism** and **Tonal Layering**. Since the background is #000000, elevation is achieved by lightening the surface color or adding a blur effect.

1.  **Level 0 (Base):** #000000 (Pure Black).
2.  **Level 1 (Cards/Sidebar):** #111111 with a subtle 1px border of #FFFFFF at 10% opacity.
3.  **Level 2 (Modals/Popovers):** Semi-transparent #111111 (80% opacity) with a 20px Backdrop Blur and a soft, diffused shadow (0px 8px 24px rgba(0,0,0,0.5)).
4.  **Interactive:** Hovering over an element should increase the border opacity to 30% rather than changing the background color significantly.

## Shapes
The shape language is **Soft** but disciplined. A 0.25rem (4px) base radius ensures the UI feels modern and professional without becoming overly casual or "bubbly."

- **Standard Elements:** 4px radius (inputs, buttons, small cards).
- **Large Containers:** 8px radius (main content areas, large modals).
- **Icons:** Use a 2px stroke weight with squared ends to match the "Geist" font aesthetic.

## Components

- **Buttons:** 
    - *Primary:* Solid #FFFFFF background with #000000 text. No shadow.
    - *Secondary:* Transparent background with a 1px #FFFFFF (20% opacity) border.
- **Inputs:** Ghost-style inputs with #111111 background and a 1px border that glows slightly (increased opacity) on focus. Use monospaced fonts for data-heavy inputs.
- **Chips/Tags:** Small, rectangular with a #111111 fill and #FFFFFF (60% opacity) text. No rounded pills; keep them subtly rounded (2px).
- **Cards:** Use Level 1 elevation. No heavy shadows. Separation is achieved through the 1px #FFFFFF (10% opacity) border.
- **Lists:** Clean rows separated by 1px #FFFFFF (5% opacity) dividers. High horizontal padding (16px) for list items.
- **Navigation:** Sidebar should use "Glass" treatment when overlaid on content, otherwise solid #111111. Active states marked by a 2px vertical white line on the left edge.
- **Additional Components:**
    - *Graph Nodes:* For visual brain mapping, use thin 1px white lines and solid white circular nodes.
    - *Code Blocks:* Pure black background with a slightly lighter gray border (#333) and monospaced Geist font.