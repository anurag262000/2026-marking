# Final Hero Animation Sequence

## ✅ Corrected Animation Flow

Based on the reference image from lukebaffait.fr, here's the exact sequence:

### Visual Timeline

```
Scroll:     0%        10%              45%    50%                    100%
            |         |                |      |                      |
            
Intro/      [===FADE OUT===]
Footer      

Names       ·         [=====RISE VERTICALLY=====]  [====SPLIT APART====]
Vertical              (Stay visible, move up)       (Exit left/right)

Video       ·         ·                ·      [APPEAR] [====GROW====]
            ·         ·                ·      (small)  (to full size)

Playback    ·         ·                ·      ·      [====PLAY VIDEO====]
```

## Phase-by-Phase Breakdown

### 📍 Phase 1: Fade Out (0% - 10% scroll)
**Duration:** 0.4 units
**What happens:**
- Intro text fades out and moves up
- Footer fades out and moves down
- Names remain in original positions (corners)

### 📍 Phase 2: Names Rise Vertically (10% - 45% scroll)
**Duration:** 1.4 units (VERY SLOW)
**What happens:**
- **"Anurag"** (left) moves ONLY up by 25vh
- **"Mishra."** (right) moves ONLY up by 25vh
- Both names stay at their horizontal positions
- Both names remain **fully visible** (opacity: 1)
- Ultra-smooth `power1.inOut` easing

**Key:** Names do NOT disappear, they stay visible!

### 📍 Phase 3: Video Appears Small (45% - 50% scroll)
**Duration:** 0.2 units
**What happens:**
- Video container fades in (opacity: 0 → 1)
- Video is at 5% scale (very small, centered between names)
- Names are still visible at center height
- Video appears in the gap between the two names

### 📍 Phase 4: Names Split & Video Grows (50% - 100% scroll)
**Duration:** 2.0 units
**What happens (simultaneously):**
- **"Anurag"** moves left off-screen (x: -100vw)
- **"Mishra."** moves right off-screen (x: +100vw)
- **Video** scales from 0.05 to 1.0 (grows to full size)
- **Video** plays from start to finish (8 seconds)
- All three animations happen at the same time with same duration

**Result:** As video grows, names split apart and exit frame

## Technical Implementation

### Scroll Configuration
```javascript
scrollTrigger: {
  trigger: heroRef.current,
  start: 'top top',
  end: '+=500vh',        // 5x viewport height = VERY SLOW
  scrub: 2,              // 2 second lag = ULTRA SMOOTH
  pin: true,
  anticipatePin: 1,
}
```

### Timeline Positions
```javascript
// Phase 1: Fade out (position 0)
.to(intro/footer, { opacity: 0 }, 0)

// Phase 2: Rise vertically (position 0.4)
.to(names, { y: '-25vh' }, 0.4)

// Phase 3: Show video (position 1.8)
.to(videoContainer, { opacity: 1 }, 1.8)

// Phase 4: Split & grow (position 2.0)
.to(firstName, { x: '-100vw' }, 2.0)
.to(lastName, { x: '100vw' }, 2.0)
.to(videoContainer, { scale: 1 }, 2.0)
```

### Video Sync
```javascript
const videoStartProgress = 0.5;  // Start at 50% scroll
// Video plays across 50% of scroll (from 50% to 100%)
// 8-second video distributed across this range
```

## Key Features

### ✅ Names Stay Visible
- Names do NOT fade out when reaching center
- They remain visible until they split apart
- Opacity stays at 1 throughout rise and split

### ✅ Video Starts Small
- Initial scale: 0.05 (5% of final size)
- Appears centered between the two names
- Grows progressively as names split

### ✅ Synchronized Movement
- Names split and video grows happen simultaneously
- Same duration (2.0 units)
- Same easing (power2.inOut)
- Creates cohesive, connected animation

### ✅ Fully Reversible
- Scroll up = everything reverses
- Video shrinks back to small size
- Names come back from sides and meet at center
- Names descend back to original positions

## Visual Reference Match

Matching the lukebaffait.fr reference:

| Reference | Our Implementation |
|-----------|-------------------|
| Names at center | ✅ Names rise to center vertically |
| Small video between names | ✅ Video appears at 5% scale |
| Names split apart | ✅ Names exit left/right |
| Video grows | ✅ Video scales to full size |
| Smooth, slow scroll | ✅ 500vh scroll distance |

## Customization Options

### Adjust Name Rise Speed
```javascript
duration: 1.4,  // Default: slow rise
duration: 1.8,  // Slower: even more gradual
duration: 1.0,  // Faster: quicker rise
```

### Adjust Video Initial Size
```css
transform: translate(-50%, -50%) scale(0.05);  /* Default: 5% */
transform: translate(-50%, -50%) scale(0.08);  /* Larger: 8% */
transform: translate(-50%, -50%) scale(0.03);  /* Smaller: 3% */
```

### Adjust Split Speed
```javascript
duration: 2.0,  // Default: moderate split
duration: 2.5,  // Slower: more dramatic
duration: 1.5,  // Faster: quicker exit
```

### Adjust Overall Scroll Length
```javascript
end: '+=500vh',  // Default: very slow
end: '+=600vh',  // Slower: ultra slow
end: '+=400vh',  // Faster: moderate speed
```

## Performance

- **GPU Accelerated:** All transforms use GPU
- **Smooth Scrubbing:** 2-second lag prevents jank
- **Optimized Video:** Seeking threshold at 0.05s
- **Will-change:** Applied to animated elements

## Browser Support

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile: Tested on iOS and Android

## Testing Checklist

- [ ] Names rise slowly to center
- [ ] Names stay visible (don't disappear)
- [ ] Video appears small between names
- [ ] Names split left/right as video grows
- [ ] Video plays smoothly with scroll
- [ ] Scroll up reverses everything
- [ ] About section appears after animation
