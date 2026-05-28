# 🎛️ Hero Section Customization Guide

## Quick Color Changes

### Change Primary Accent (Neon Yellow)
```jsx
// Find and replace all instances:
bg-[#ccff00]  →  bg-[#YOUR_COLOR]
text-[#ccff00] →  text-[#YOUR_COLOR]
border-[#ccff00] → border-[#YOUR_COLOR]

// In FloatingOrb component:
color="#ccff00" → color="#YOUR_COLOR"
```

### Change Secondary Accent (Purple)
```jsx
bg-[#9B30E0]  →  bg-[#YOUR_COLOR]
color="#9B30E0" → color="#YOUR_COLOR"
```

### Change Action Color (Pink)
```jsx
bg-[#ff3366]  →  bg-[#YOUR_COLOR]
color="#ff3366" → color="#YOUR_COLOR"
```

## Animation Speed Adjustments

### Make Everything Faster
```jsx
// Entrance animations
duration: 0.8  →  duration: 0.4

// Hover effects
duration: 0.2  →  duration: 0.1

// Continuous animations
duration: 25  →  duration: 15
```

### Make Everything Slower (More Dramatic)
```jsx
// Entrance animations
duration: 0.8  →  duration: 1.5

// Delays
delay: 0.2  →  delay: 0.5

// Continuous animations
duration: 25  →  duration: 40
```

### Disable Specific Animations
```jsx
// Remove kinetic letter hover effect
whileHover={{
  y: -20,
  scale: 1.2,
  // ... other properties
}}
// Change to:
whileHover={{}}  // Empty object = no animation

// Remove floating orbs
// Comment out or delete the FloatingOrb components
```

## Content Customization

### Change Main Headline
```jsx
const title = "CRAFTING THE FUTURE";
// Change to:
const title = "YOUR HEADLINE HERE";
```

### Modify Typewriter Strings
```jsx
strings: [
  "turning chaos into shipped apps",
  "breaking prod then fixing it cleaner",
  "building loud, unapologetic systems",
  "making the web less boring",
]
// Add/remove/modify as needed
```

### Update Stat Cards
```jsx
<BentoCard delay={2.1}>
  <motion.div className="text-4xl md:text-5xl mb-2">
    🚀  {/* Change emoji */}
  </motion.div>
  <h3 className="text-2xl md:text-3xl font-bebas text-[#111] mb-1">
    50+  {/* Change number */}
  </h3>
  <p className="text-xs md:text-sm font-space font-semibold text-[#111] uppercase tracking-wider">
    Projects Shipped  {/* Change label */}
  </p>
</BentoCard>
```


## Shadow Customization

### Increase Shadow Depth
```jsx
shadow-[4px_4px_0px_#111]
// Change to:
shadow-[8px_8px_0px_#111]  // Deeper shadow
shadow-[12px_12px_0px_#111]  // Even deeper
```

### Change Shadow Color
```jsx
shadow-[6px_6px_0px_#111]
// Change to:
shadow-[6px_6px_0px_#ccff00]  // Yellow shadow
shadow-[6px_6px_0px_#9B30E0]  // Purple shadow
```

### Softer Shadows (Less Brutalist)
```jsx
// Replace brutalist shadows with soft shadows:
shadow-[6px_6px_0px_#111]
// Change to:
shadow-lg  // Tailwind's soft shadow
shadow-2xl  // Larger soft shadow
```

## Border Customization

### Thicker Borders
```jsx
border-[2px]  →  border-[4px]
border-[3px]  →  border-[5px]
```

### Rounded Corners
```jsx
rounded-[10px]  →  rounded-[20px]  // More rounded
rounded-[16px]  →  rounded-[30px]  // Very rounded
rounded-[12px]  →  rounded-full    // Pill shape
```

### Remove Borders (Cleaner Look)
```jsx
border-[3px] border-[#111]
// Change to:
border-0  // No border
```

## Layout Adjustments

### Change Bento Grid Layout
```jsx
// Current: 2 cols mobile, 4 cols desktop
className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"

// Option 1: 3 columns
className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"

// Option 2: Always 2 columns
className="grid grid-cols-2 gap-4 md:gap-6"

// Option 3: Single column mobile, 2 cols desktop
className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
```

### Adjust Spacing
```jsx
// Reduce overall spacing
className="px-4 py-20"  →  className="px-2 py-10"

// Increase spacing
className="px-4 py-20"  →  className="px-8 py-32"

// Change gaps between elements
gap-4  →  gap-8  // Larger gaps
gap-6  →  gap-3  // Smaller gaps
```

### Change Max Width
```jsx
max-w-7xl  →  max-w-6xl   // Narrower
max-w-7xl  →  max-w-full  // Full width
```

## Typography Customization

### Change Font Sizes
```jsx
// Main headline
fontSize: "clamp(3rem, 15vw, 12rem)"
// Change to:
fontSize: "clamp(2rem, 10vw, 8rem)"   // Smaller
fontSize: "clamp(4rem, 20vw, 16rem)"  // Larger
```

### Change Fonts
```jsx
// Replace Bebas Neue with another font
font-bebas  →  font-space  // Use Space Grotesk
font-bebas  →  font-mono   // Monospace

// Or add a new font in globals.css:
@import url("https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap");
```

### Adjust Letter Spacing
```jsx
tracking-wider   // Current
tracking-widest  // More spacing
tracking-normal  // Less spacing
tracking-tight   // Tight spacing
```


## Advanced Customizations

### Add More Floating Orbs
```jsx
// In the background section, add:
<FloatingOrb 
  delay={6} 
  duration={35} 
  size={200} 
  color="#00ff00"  // Green orb
  blur={50} 
/>
```

### Change Parallax Intensity
```jsx
// Current parallax settings
const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
// Change to:
const y = useTransform(scrollYProgress, [0, 1], [0, 500]);  // More intense
const y = useTransform(scrollYProgress, [0, 1], [0, 100]);  // Less intense
const y = useTransform(scrollYProgress, [0, 1], [0, 0]);    // Disable
```

### Modify Spring Physics
```jsx
// Current settings
const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

// Bouncier
const springConfig = { stiffness: 200, damping: 20, restDelta: 0.001 };

// Smoother
const springConfig = { stiffness: 50, damping: 40, restDelta: 0.001 };

// Very smooth
const springConfig = { stiffness: 30, damping: 50, restDelta: 0.001 };
```

### Add New Bento Card
```jsx
<BentoCard delay={2.5} className="bg-[#00ff00]">
  <motion.div
    animate={{ rotate: [0, 180, 360] }}
    transition={{ duration: 3, repeat: Infinity }}
    className="text-4xl md:text-5xl mb-2"
  >
    🌟
  </motion.div>
  <h3 className="text-2xl md:text-3xl font-bebas text-[#111] mb-1">
    NEW
  </h3>
  <p className="text-xs md:text-sm font-space font-semibold text-[#111] uppercase tracking-wider">
    Your Stat
  </p>
</BentoCard>
```

### Change Grid Pattern
```jsx
// Current: 50px grid
backgroundSize: "50px 50px"

// Smaller grid
backgroundSize: "25px 25px"

// Larger grid
backgroundSize: "100px 100px"

// Different pattern (dots instead of lines)
style={{
  backgroundImage: `radial-gradient(circle, #111 1px, transparent 1px)`,
  backgroundSize: "20px 20px",
}}
```

### Modify Corner Accents
```jsx
// Change size
className="absolute w-6 h-6"  →  className="absolute w-10 h-10"

// Change color
border-[#ccff00]  →  border-[#ff3366]

// Change animation
animate={{
  scale: [1, 1.2, 1],
  opacity: [0.5, 1, 0.5],
}}
// Change to:
animate={{
  scale: [1, 1.5, 1],
  opacity: [0.3, 1, 0.3],
  rotate: [0, 90, 0],
}}
```


## Performance Optimizations

### Reduce Animations on Mobile
```jsx
// Add at the top of component
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  setIsMobile(window.innerWidth < 768);
}, []);

// Then conditionally render orbs
{!isMobile && (
  <>
    <FloatingOrb delay={0} duration={25} size={400} color="#ccff00" blur={80} />
    <FloatingOrb delay={2} duration={30} size={300} color="#9B30E0" blur={70} />
    <FloatingOrb delay={4} duration={20} size={250} color="#ff3366" blur={60} />
  </>
)}
```

### Add Reduced Motion Support
```jsx
// Add at the top of component
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Use in animations
<motion.div
  animate={prefersReducedMotion ? {} : {
    y: [0, -20, 0],
    scale: [1, 1.2, 1],
  }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 2 }}
>
```

### Lazy Load Below-Fold Content
```jsx
// Add to bento grid section
const bentoRef = useRef(null);
const isInView = useInView(bentoRef, { once: true });

<motion.div
  ref={bentoRef}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  // ... rest of props
>
```

## Theme Variations

### Dark Mode Version
```jsx
// Add dark mode classes
className="bg-gradient-to-br from-[#111] via-[#1a1a1a] to-[#222]"

// Invert colors
text-[#111]  →  text-[#fdfdfd]
bg-white     →  bg-[#1a1a1a]
border-[#111] →  border-[#ccff00]
```

### Minimal Version (Less Brutalist)
```jsx
// Remove shadows
shadow-[6px_6px_0px_#111]  →  shadow-lg

// Thinner borders
border-[3px]  →  border-[1px]

// Softer colors
bg-[#ccff00]  →  bg-[#f0f0f0]
bg-[#9B30E0]  →  bg-[#e0e0e0]

// Remove rotations
rotate-2  →  rotate-0
-rotate-3  →  rotate-0
```

### Maximalist Version (More Chaos)
```jsx
// Thicker borders
border-[3px]  →  border-[5px]

// Deeper shadows
shadow-[6px_6px_0px_#111]  →  shadow-[12px_12px_0px_#111]

// More rotation
rotate-2  →  rotate-6
-rotate-3  →  -rotate-12

// Add more orbs (5-7 total)
// Add more stickers
// Add more animations
```


## Button Customization

### Change Button Styles
```jsx
// Current: Brutalist with shadow
className="border-[3px] border-[#111] bg-[#ccff00] shadow-[6px_6px_0px_#111] rounded-[12px]"

// Option 1: Pill buttons
className="border-[2px] border-[#111] bg-[#ccff00] shadow-[4px_4px_0px_#111] rounded-full"

// Option 2: Sharp corners
className="border-[3px] border-[#111] bg-[#ccff00] shadow-[6px_6px_0px_#111] rounded-none"

// Option 3: Gradient buttons
className="border-[3px] border-[#111] bg-gradient-to-r from-[#ccff00] to-[#9B30E0] shadow-[6px_6px_0px_#111] rounded-[12px]"
```

### Add More Buttons
```jsx
<motion.a
  href="/projects"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="group border-[3px] border-[#111] bg-[#ff3366] text-white shadow-[6px_6px_0px_#111] rounded-[12px] px-6 py-3 flex items-center gap-2 text-sm md:text-base font-bold uppercase tracking-wider transition-all hover:bg-[#111] hover:text-[#ccff00] font-space"
>
  <FiCode className="text-lg md:text-xl" />
  <span>View Projects</span>
  <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
</motion.a>
```

### Change Hover Effects
```jsx
// Current: Invert colors + compress shadow
hover:bg-[#111] hover:text-[#ccff00] hover:translate-x-[3px] hover:translate-y-[3px]

// Option 1: Scale only
hover:scale-110

// Option 2: Lift up
hover:-translate-y-2 hover:shadow-[6px_8px_0px_#111]

// Option 3: Glow effect
hover:shadow-[0_0_20px_#ccff00]
```

## Sticker Customization

### Add More Stickers
```jsx
<motion.div
  whileHover={{ rotate: -6, scale: 1.05 }}
  className="bg-[#00ff00] border-[2px] border-[#111] shadow-[3px_3px_0px_#111] rounded-[10px] px-3 py-1.5 rotate-1"
>
  <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-[#111] font-space">
    🎨 Creative Coder
  </span>
</motion.div>
```

### Change Sticker Positions
```jsx
// Current: Top of page
// Move to bottom:
<motion.div className="flex items-center justify-between gap-3 mt-8">
  {/* Stickers here */}
</motion.div>

// Or scatter around the page:
<motion.div 
  className="absolute top-20 left-10"
  style={{ rotate: -12 }}
>
  {/* Sticker */}
</motion.div>
```

## Quick Presets

### Preset 1: Minimal & Clean
```jsx
// Remove: Floating orbs, grid pattern, corner accents
// Keep: Kinetic typography, bento grid, buttons
// Colors: Grayscale with one accent color
// Shadows: 2px instead of 6px
// Borders: 1px instead of 3px
```

### Preset 2: Maximum Chaos
```jsx
// Add: 5+ floating orbs, more stickers, more animations
// Increase: Shadow depth (12px), border thickness (5px)
// Colors: All bright colors, gradients everywhere
// Rotations: Increase all rotation angles
// Speed: Faster animations (0.5x duration)
```

### Preset 3: Corporate Professional
```jsx
// Remove: Stickers, emojis, chaotic elements
// Colors: Navy blue, white, light gray
// Shadows: Soft shadows instead of brutalist
// Borders: Thin (1px) or none
// Animations: Subtle, slow (2x duration)
// Typography: Sans-serif, normal weight
```

### Preset 4: Retro Gaming
```jsx
// Colors: Neon green, hot pink, cyan, purple
// Add: Pixel borders, 8-bit style fonts
// Animations: Glitch effects, scanlines
// Shadows: Colored shadows (cyan/magenta offset)
// Grid: Larger, more visible
```

---

## Testing Checklist

After customization, test:

- ✅ Mobile responsiveness (< 768px)
- ✅ Tablet view (768px - 1024px)
- ✅ Desktop view (> 1024px)
- ✅ Hover states on all interactive elements
- ✅ Scroll behavior and parallax
- ✅ Animation performance (60fps)
- ✅ Keyboard navigation
- ✅ Color contrast (WCAG AA minimum)
- ✅ Load time (< 3s)
- ✅ Cross-browser compatibility

## Common Issues & Fixes

**Issue:** Animations are janky
**Fix:** Reduce number of floating orbs, simplify animations

**Issue:** Text is hard to read
**Fix:** Increase contrast, reduce background animation opacity

**Issue:** Layout breaks on mobile
**Fix:** Test all breakpoints, adjust font sizes with clamp()

**Issue:** Buttons don't work
**Fix:** Check z-index, ensure pointer-events are enabled

**Issue:** Too much motion
**Fix:** Add reduced motion support, slow down animations

---

**Pro Tip:** Make one change at a time and test immediately. This makes it easier to identify what works and what doesn't!
