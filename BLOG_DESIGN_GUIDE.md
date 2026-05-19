new designe for portfolio

# Rabbit Autocare: Neo-Brutalist / Streetwear Design Guide

This document serves as the source of truth for the **Neo-Brutalist / Streetwear** design system currently implemented across the Rabbit Autocare Blog pages. It provides a foundation for extending this design language to other components and pages within the application.

## 1. Core Aesthetic & Philosophy

The design moves away from traditional, soft, "clean" corporate web design into a highly structured, bold, and unapologetic aesthetic. It draws inspiration from:
- **Neo-Brutalism**: Hard borders, stark contrasts, distinct boundaries, and solid block shadows.
- **Streetwear / Editorial**: Massive typography, "sticker" overlays, and high-impact visual hierarchy.
- **Gen-Z / Modern Web**: Playful but functional micro-interactions, neon color hits against stark black/white canvases.

**The Golden Rule:** Every container must have clearly defined boundaries (thick borders) and occupy physical "weight" on the page (hard drop shadows).

---

## 2. Color Palette

The color system relies on extreme contrast. Soft grays are avoided in favor of stark blacks, pure whites, and highly saturated accent colors.

| Color Name | Hex Code | Usage & Reasoning |
| :--- | :--- | :--- |
| **Pitch Black** | `#111111` | Used for all borders, shadows, and primary text. It provides the heavy, structural anchor for the design. |
| **Pure White** | `#ffffff` | Primary background color for elevated cards and inputs. |
| **Off-White** | `#fdfdfd` | Main page background. Prevents eye strain against the stark black borders. |
| **Warm Gray** | `#f4f4f0` | Used for secondary backgrounds (like the featured post text container) to create subtle depth without using soft drop-shadows. |
| **Neon Yellow/Green** | `#ccff00` | Primary action color (Buttons, active states, highlights). Chosen for its "streetwear" energy and aggressive contrast against `#111`. |
| **Electric Purple** | `#9B30E0` | Secondary accent (Badges, stickers, marquees). Pairs perfectly with the neon yellow. |
| **Action Pink/Red** | `#ff3366` | Used specifically for "Liked" states or destructive actions. |

---

## 3. Typography

The design relies on a dual-font system contrasting extreme structural weight with geometric legibility.

### Primary Display Font: **Bebas Neue**
- **Usage:** Main hero headlines (`h1`), massive section titles (`h2`), featured article titles.
- **Styling:** Always `UPPERCASE`. Tight line-height (`leading-[0.85]` to `leading-[1.1]`). 
- **Why:** It mimics the bold, condensed typography found in physical streetwear magazines and posters.

### Secondary / Body Font: **Space Grotesk**
- **Usage:** Body copy (`p`), metadata, buttons, labels, tags.
- **Styling:** Often used in `uppercase` with heavy tracking (`tracking-wider` or `tracking-widest`) for small labels, and normal case with `font-medium` (weight 500) for body text.
- **Why:** Its geometric, slightly tech-forward structure pairs perfectly with the brutalist aesthetic while remaining highly readable at smaller sizes.

---

## 4. Core Structural Patterns (The "Bento Box")

Instead of floating elements in negative space, content is grouped into hard-edged containers.

### Borders & Shadows
- **Borders:** Almost all structural elements must have a `2px` or `3px solid #111` border.
- **Drop Shadows:** No blurred drop-shadows are allowed. All shadows must be solid blocks.
  - Standard Card: `box-shadow: 4px 4px 0px #111`
  - Elevated/Large Container: `box-shadow: 6px 6px 0px #111`
  - Hero/Featured Blocks: `box-shadow: 8px 8px 0px #111`
- **Border Radius:** Kept relatively tight to maintain structural rigidity. Usually `6px`, `8px`, `12px`, or `16px`. Never fully rounded (except for circular icon buttons).

### Hover States (Physical Interaction)
Hover states simulate physical buttons being pressed down. 
- **Translation:** On hover, the element translates down and right (`hover:translate-x-0.5 hover:translate-y-0.5`).
- **Shadow Reduction:** (Optional) To make it feel pressed, the shadow can be reduced when translated.
- **Color Inversion:** Buttons typically invert colors on hover (e.g., from Neon Yellow background / Black text to Black background / Neon Yellow text).

---

## 5. Signature UI Elements

### 1. The "Sticker"
Small badges used to denote categories, status, or counts.
- **Implementation:** Solid background (Purple or Neon), thick black border, small shadow. 
- **Variation (Rotated):** To make the design feel less rigid and more "scrapbook/streetwear", some stickers are explicitly rotated (e.g., `transform: rotate(6deg)`).

### 2. Offset Typography Stroke
Used in the Hero header ("THE DRIP GUIDE").
- **Implementation:** The text is rendered transparent with a `-webkit-text-stroke: 3px #111`. A pseudo-element (`::after`) or duplicate text is placed underneath, offset by a few pixels, and filled with a neon color.

### 3. Marquee Tickers
Used to create dynamic movement. 
- **Implementation:** A simple CSS animation translating from `0` to `-100%`. Housed inside a thick-bordered pill container.

### 4. High-Contrast Text Links
In body copy, links aren't just underlined text.
- **Implementation:** Links are styled as small badges with black backgrounds and neon yellow text (`bg-[#111] text-[#ccff00] px-1 py-0.5 rounded`). They invert on hover.

### 5. Brutalist Blockquotes
- **Implementation:** Not just a left-border. The entire blockquote is a structured box (`border: 3px solid #111`, `box-shadow: 6px 6px 0px #111`, `background: #fdfdfd`), visually separating the quoted text aggressively from the normal flow.

---

## 6. Tailwind Cheat Sheet

If you are building a new component, here is a standard blueprint for a Neo-Brutalist card/button:

**Button / Tag:**
```jsx
<button 
  className="border-[2px] border-[#111] bg-[#ccff00] text-[#111] shadow-[3px_3px_0px_#111] font-bold uppercase tracking-wider px-4 py-2 rounded-[8px] transition-all hover:bg-[#111] hover:text-[#ccff00] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#111]"
  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
>
  Click Me
</button>
```

**Card / Container:**
```jsx
<div 
  className="bg-white border-[3px] border-[#111] shadow-[6px_6px_0px_#111] rounded-[12px] p-6 overflow-hidden"
>
  <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px' }} className="text-[#111] uppercase leading-none">
    Card Title
  </h3>
  <p style={{ fontFamily: "'Space Grotesk', sans-serif" }} className="text-[#333] font-medium mt-4">
    Card content goes here.
  </p>
</div>
```
