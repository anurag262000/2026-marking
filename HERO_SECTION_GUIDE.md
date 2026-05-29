# Hero Section - Cinematic Aurora Background

## ✨ What's Built

A stunning, award-winning hero section inspired by Luke Baffait's portfolio with:

### **Visual Features:**
- ✅ **Cinematic Aurora Background** - Deep red, crimson, orange-red light blooms
- ✅ **6 Layered Gradients** - Soft, smoke-like, liquid aurora effect
- ✅ **Interactive Motion** - Background drifts toward cursor like fluid magnetism
- ✅ **Grain Overlay** - Subtle film grain for texture
- ✅ **Dark Vignette** - Preserves text readability
- ✅ **No Hard Shapes** - Organic, soft, cinematic light leaks

### **Typography:**
- ✅ **First Name** - Large, bold, modern sans-serif (ANURAG)
- ✅ **Last Name** - Elegant italic serif (Mishra)
- ✅ **Intro Text** - Compact sans with italic serif phrases
- ✅ **Soft White Text** - Warm, never pure white (#fafafa)

### **Motion:**
- ✅ **Continuous Drift** - Background moves even when idle
- ✅ **Mouse Tracking** - Cursor influence with lag/easing
- ✅ **GSAP Entrance** - Smooth reveal of all elements
- ✅ **Organic Movement** - Slow, fluid, no snappy parallax
- ✅ **requestAnimationFrame** - Smooth 60fps animation loop

### **Layout:**
- ✅ **100svh** - Full viewport height
- ✅ **Top-left Intro** - "Quiet creator..." text
- ✅ **Lower Name Lockup** - Large two-part name
- ✅ **Bottom Footer** - Divider + navigation
- ✅ **Responsive** - Mobile stacked, desktop wide composition

### **Accessibility:**
- ✅ **Semantic HTML** - Proper header/section/nav
- ✅ **Reduced Motion** - Respects prefers-reduced-motion
- ✅ **Readable Contrast** - Text stays visible over red glow
- ✅ **Keyboard Navigation** - All links accessible

## 🎨 Color Palette

```css
Background: #0a0a0a (near-black)
Text: #fafafa (soft white)
Aurora Red 1: rgba(220, 38, 38, 0.4)
Aurora Red 2: rgba(239, 68, 68, 0.3)
Aurora Red 3: rgba(185, 28, 28, 0.35)
Aurora Pink: rgba(254, 202, 202, 0.15)
Aurora Magenta: rgba(190, 18, 60, 0.25)
Aurora Dark Red: rgba(127, 29, 29, 0.2)
```

## 🔧 How It Works

### **Aurora Background System:**

1. **6 Gradient Layers** - Each with different:
   - Size (600px - 1100px)
   - Color (red spectrum)
   - Opacity (0.15 - 0.4)
   - Blur (80px)
   - Mix blend mode (screen)

2. **Animation Loop:**
   ```javascript
   - Idle oscillation (sine/cosine waves)
   - Mouse position tracking
   - Smooth easing toward target
   - Each layer has different speed & influence
   - requestAnimationFrame for smooth 60fps
   ```

3. **Overlays:**
   - Vignette (radial gradient, dark edges)
   - Grain (SVG noise, 3% opacity)

### **GSAP Timeline:**

```javascript
1. Intro text (y: 40, opacity: 0 → visible)
2. First name (y: 100, stagger reveal)
3. Last name (y: 100, overlapping)
4. Footer divider (scaleX: 0 → 1)
5. Footer content (y: 20, stagger)
```

## 📱 Responsive Behavior

### **Mobile (< 768px):**
- Stacked name (vertical)
- Centered composition
- Smaller nav
- Intro stays top-left

### **Tablet (768px - 1024px):**
- Balanced centered layout
- Name starts to spread

### **Desktop (> 1024px):**
- First name left
- Last name right
- Wide composition
- V1.0 on left, links on right

## 🎯 Key Features

### **1. Fluid Mouse Interaction**
```javascript
// Mouse position normalized (0-1)
mousePos = { x: clientX / width, y: clientY / height }

// Smooth easing (2% per frame)
targetPos.x += (mousePos.x - targetPos.x) * 0.02

// Each layer has different influence factor
mouseInfluence: 0.1 to 0.25
```

### **2. Idle Animation**
```javascript
// Continuous drift using sine/cosine
idleX = sin(time * speed) * oscillationX
idleY = cos(time * speed * 0.8) * oscillationY

// Different speeds per layer
speed: 0.00015 to 0.0004
```

### **3. Layer Blending**
```css
mix-blend-mode: screen;
filter: blur(80px);
```

## 🚀 Performance

- **requestAnimationFrame** - Synced with display refresh
- **will-change: transform** - GPU acceleration
- **CSS transforms only** - No layout recalculation
- **Reduced motion support** - Disables animation if needed

## 🎨 Customization

### **Change Aurora Colors:**
Edit `Hero.module.css`:
```css
.layer1 {
  background: radial-gradient(
    circle, 
    rgba(YOUR_COLOR, 0.4) 0%, 
    rgba(YOUR_COLOR, 0) 70%
  );
}
```

### **Adjust Motion Speed:**
Edit `Hero.jsx`:
```javascript
const layerConfigs = [
  { 
    speed: 0.0003,           // Idle drift speed
    mouseInfluence: 0.15,    // Cursor influence
    oscillationX: 30,        // Horizontal range
    oscillationY: 20         // Vertical range
  },
  // ... more layers
];
```

### **Change Text:**
Edit `Hero.jsx`:
```jsx
<p className={styles.introText}>
  <em>Your intro</em>, your description here.
</p>

<h1 className={styles.firstName}>YourName</h1>
<h1 className={styles.lastName}>YourSurname</h1>
```

## 🐛 Troubleshooting

### **Aurora not moving?**
- Check browser console for errors
- Verify `prefersReducedMotion` is false
- Check if `requestAnimationFrame` is running

### **Text not visible?**
- Increase vignette opacity
- Adjust aurora layer opacity
- Check text color contrast

### **Performance issues?**
- Reduce number of layers (6 → 4)
- Increase blur amount (less detail)
- Lower animation frame rate

### **Animations not playing?**
- Check GSAP is installed: `pnpm list gsap`
- Verify GSAP context is set up
- Check browser console for errors

## 📚 Files Structure

```
src/components/home/
├── Hero.jsx           # Main component with logic
└── Hero.module.css    # Scoped styles
```

## 🎬 Animation Timeline

```
0.0s  - Page loads
0.3s  - Intro text fades in
0.5s  - First name slides up
0.7s  - Last name slides up
1.2s  - Footer divider draws
1.4s  - Footer content appears
```

## ✅ Checklist

- [x] 100svh full viewport
- [x] Aurora background with 6 layers
- [x] Mouse tracking with smooth easing
- [x] Idle animation loop
- [x] GSAP entrance animations
- [x] Grain overlay
- [x] Vignette for readability
- [x] Responsive layout
- [x] Reduced motion support
- [x] Semantic HTML
- [x] Accessible navigation

## 🎨 Design Principles

1. **Organic Motion** - No mechanical parallax
2. **Soft Edges** - No hard circles or shapes
3. **Cinematic Feel** - Film grain, vignette, blur
4. **Readable Text** - Always visible over background
5. **Fluid Interaction** - Magnetic, liquid-like response

---

**The hero section is now complete with a cinematic aurora background!** 🎬✨

Open http://localhost:3000 to see it in action.
