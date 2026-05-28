# 🎨 Hero Section Visual Guide

## Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  ┌───────────────────────────────────────────────────────┐  │
│  │  [⚡ Not your corporate dev] [💻 Indie·Systems·Chaos] │  │
│  │  [🔥 Available for work]     Ludhiana / Full Stack    │  │
│  │                                                         │  │
│  │                                                         │  │
│  │              C R A F T I N G                           │  │
│  │              T H E                                     │  │
│  │              F U T U R E                               │  │
│  │         (Each letter is interactive!)                  │  │
│  │                                                         │  │
│  │    ┌─────────────────────────────────────────┐        │  │
│  │    │ Full Stack Engineer | [Typewriter...]   │        │  │
│  │    └─────────────────────────────────────────┘        │  │
│  │                                                         │  │
│  │    Shipping loud, opinionated systems for the          │  │
│  │    real world — from messy monoliths that print        │  │
│  │    money to lean services that refuse to crash.        │  │
│  │    No fake hustle. No boring SaaS. Just shipping.      │  │
│  │                                                         │  │
│  │    [GitHub →] [LinkedIn →] [Drop a chaotic brief →]   │  │
│  │                                                         │  │
│  │    Open to rogue builds · No boring SaaS              │  │
│  │                                                         │  │
│  │    ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │  │
│  │    │ 🚀   │ │ ⚡   │ │ 💻   │ │ 🎯   │              │  │
│  │    │ 50+  │ │ 3+   │ │ 10+  │ │ 100% │              │  │
│  │    │Ships │ │Years │ │Stacks│ │Chaos │              │  │
│  │    └──────┘ └──────┘ └──────┘ └──────┘              │  │
│  │                                                         │  │
│  │                    ⌄                                   │  │
│  │              Scroll to explore                         │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Color Coding

```
🟡 Neon Yellow (#ccff00)
   - Primary accent
   - Hover states
   - First stat card background
   - Corner accents

🟣 Electric Purple (#9B30E0)
   - Secondary accent
   - Third stat card background
   - Email button background
   - Floating orb

🔴 Action Pink (#ff3366)
   - Availability badge
   - Fourth stat card background
   - Floating orb

⚫ Pitch Black (#111)
   - All borders (3px thick)
   - All text
   - Shadow color

⚪ White/Off-White
   - Card backgrounds
   - Main background
   - Second stat card
```


## Animation Sequence (First 3 seconds)

```
Timeline:
0.0s  ████░░░░░░░░░░░░░░░░░░░░░░  Background orbs start floating
0.2s  ████████░░░░░░░░░░░░░░░░░░  Frame + corners fade in
0.2s  ████████░░░░░░░░░░░░░░░░░░  Status stickers pop in
0.0s  ████░░░░░░░░░░░░░░░░░░░░░░  Letters start appearing (C)
0.05s ████░░░░░░░░░░░░░░░░░░░░░░  (R)
0.10s ████░░░░░░░░░░░░░░░░░░░░░░  (A)
0.15s ████░░░░░░░░░░░░░░░░░░░░░░  (F)
...   (continues for each letter)
1.2s  ████████████████████░░░░░░  Glassmorphism badge appears
1.4s  ████████████████████████░░  Description fades in
1.6s  ████████████████████████░░  CTA buttons appear
1.8s  ████████████████████████░░  Bottom tagline
2.0s  ████████████████████████░░  Bento grid starts
2.1s  ████████████████████████░░  🚀 Card
2.2s  ████████████████████████░░  ⚡ Card
2.3s  ████████████████████████░░  💻 Card
2.4s  ████████████████████████░░  🎯 Card
2.5s  ██████████████████████████  Scroll indicator
```

## Interactive Elements

### 1. Kinetic Letters (Main Headline)
```
Hover Effect:
- Jumps up 20px
- Scales to 120%
- Changes color to neon yellow
- Adds glow shadow
- Duration: 0.2s
```

### 2. Status Stickers
```
Hover Effect:
- Rotates ±6 degrees
- Scales to 105%
- Maintains brutalist shadow
```

### 3. CTA Buttons
```
Hover Effect:
- Scales to 105%
- Rotates ±2 degrees
- Shadow compresses (6px → 3px)
- Translates 3px down-right
- Arrow slides right 4px
- Background inverts (yellow ↔ black)
```

### 4. Bento Cards
```
Hover Effect:
- Scales to 102%
- Lifts up 4px
- Shadow remains
- Emoji animates independently
```

## Continuous Animations

### Background Orbs (Infinite)
```
Yellow Orb:
  Path: [0,0] → [100,0] → [-50,0] → [0,0]
  Y-axis: [0,-100] → [50] → [0]
  Scale: [1] → [1.2] → [0.8] → [1]
  Duration: 25s

Purple Orb:
  Similar path, different timing
  Duration: 30s

Pink Orb:
  Similar path, different timing
  Duration: 20s
```

### Grid Background (Infinite)
```
Movement: 0px → 50px (diagonal)
Duration: 20s linear
Creates endless scrolling effect
```

### Corner Accents (Infinite)
```
Each corner (staggered 0.2s):
  Scale: [1] → [1.2] → [1]
  Opacity: [0.5] → [1] → [0.5]
  Duration: 2s
```

### Stat Card Emojis (Infinite)
```
🚀 Rocket:  Rotate [0°, 10°, -10°, 0°] - 3s
⚡ Lightning: Scale [1, 1.2, 1] - 2s
💻 Laptop:   Y-axis [0, -10px, 0] - 2.5s
🎯 Target:   Rotate [0°, 360°] - 4s linear
```

### Scroll Indicator (Infinite)
```
Container: Y-axis [0, 10px, 0] - 1.5s
Dot inside: Y-axis [0, 12px, 0] - 1.5s
Creates mouse scroll effect
```


## Scroll Behavior

### Parallax Effect
```
Scroll Progress: 0% → 50%

Y Position:      0px → 300px (moves down)
Opacity:         100% → 0% (fades out)
Scale:           100% → 80% (shrinks)

Uses spring physics for smooth motion
```

## Responsive Breakpoints

### Mobile (< 768px)
```
- Font size: 3rem minimum
- Bento grid: 2 columns
- Stickers: wrap to multiple rows
- Frame inset: 1rem
- Buttons: smaller text, some hidden
- Reduced padding everywhere
```

### Tablet (768px - 1024px)
```
- Font size: scales with viewport
- Bento grid: 2x2 or 4x1
- Frame inset: 2rem
- All elements visible
```

### Desktop (> 1024px)
```
- Font size: 12rem maximum
- Bento grid: 4x1 horizontal
- Frame inset: 2rem
- Location text visible
- Full button text
- Maximum spacing
```

## Shadow System

```
Small Shadow:   3px 3px 0px #111
Medium Shadow:  4px 4px 0px #111
Large Shadow:   6px 6px 0px #111

Hover State:    Compresses by 50%
                (6px → 3px)
                (4px → 2px)
```

## Typography Scale

```
Main Headline:  clamp(3rem, 15vw, 12rem)  - Bebas Neue
Stat Numbers:   2xl-3xl (1.5rem-1.875rem) - Bebas Neue
Stat Labels:    xs-sm (0.75rem-0.875rem)  - Space Grotesk
Body Text:      sm-lg (0.875rem-1.125rem) - Space Grotesk
Stickers:       10px-12px                 - Space Grotesk
Micro Text:     10px                      - Space Grotesk
```

## Z-Index Layers

```
Layer 5: Interactive elements (buttons, cards)
Layer 4: Text content
Layer 3: Frame and borders
Layer 2: Background patterns
Layer 1: Floating orbs
Layer 0: Base background
```

## Performance Notes

✅ **GPU Accelerated:**
- All animations use `transform` and `opacity`
- No layout thrashing
- 60fps target

✅ **Optimized:**
- Orbs use `pointer-events: none`
- Spring physics for smooth scroll
- Staggered animations prevent jank
- Reduced motion support recommended

⚠️ **Consider:**
- Add `will-change` for heavy animations
- Lazy load below-fold content
- Reduce orb count on mobile
- Disable parallax on low-end devices

## Accessibility Considerations

🔧 **To Add:**
```javascript
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Disable animations if user prefers
const animationDuration = prefersReducedMotion ? 0 : 0.8;
```

🔧 **Keyboard Navigation:**
- All buttons are focusable
- Add focus-visible styles
- Ensure tab order is logical

🔧 **Screen Readers:**
- Add aria-labels to icon buttons
- Ensure heading hierarchy
- Hide decorative elements with aria-hidden

---

**Total Animation Count:** 50+ individual animations
**Total Interactive Elements:** 20+ hover/tap targets
**Performance Target:** 60fps on modern devices
**Load Time:** < 2s for first meaningful paint
