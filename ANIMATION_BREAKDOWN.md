# Hero Scroll Animation - Fixed Breakdown

## Animation Timeline (400vh scroll distance)

### 📍 Phase 1: Fade Out (0% - 15% scroll)
**Duration:** 0.5 units
**What happens:**
- Intro text fades out and moves up (-40px)
- Footer fades out and moves down (+40px)
- Names remain in their original positions

### 📍 Phase 2: Names Rise to Center (15% - 50% scroll)
**Duration:** 1.2 units
**What happens:**
- **"Anurag"** moves ONLY vertically up by 25vh
- **"Mishra."** moves ONLY vertically up by 25vh (same amount)
- Both names stay in their horizontal positions (left and right)
- Both names move at the same speed and distance
- Smooth `power1.inOut` easing for natural movement

**Key Fix:** Removed horizontal movement (`x` property) - names only move up (`y` property)

### 📍 Phase 3: Names Fade Out (50% - 60% scroll)
**Duration:** 0.4 units
**What happens:**
- Both names fade to opacity 0
- Quick transition to prepare for video reveal

### 📍 Phase 4: Video Circular Reveal (60% - 100% scroll)
**Duration:** 1.4 units
**What happens:**
- Video appears from absolute center of screen
- Starts with 30px diameter circle (15px radius)
- Expands pixel by pixel using `clip-path: circle()`
- Grows to full size (90vw × 90vh)
- Video playback syncs with scroll (starts at 52% scroll progress)

**Key Fix:** Using `clip-path` for true circular reveal from center point

## Technical Details

### Scroll Configuration
```javascript
scrollTrigger: {
  trigger: heroRef.current,
  start: 'top top',
  end: '+=400vh',        // 4x viewport height for smooth control
  scrub: 1.5,            // 1.5 second lag for buttery smoothness
  pin: true,             // Pin section during scroll
  anticipatePin: 1,      // Prevent jump on pin start
}
```

### Video Sync Logic
```javascript
const videoStartProgress = 0.52;  // Start at 52% (when video visible)
const adjustedProgress = Math.max(0, 
  (self.progress - videoStartProgress) / (1 - videoStartProgress)
);
video.currentTime = adjustedProgress * video.duration;
```

**Result:** 8-second video plays across 48% of scroll (from 52% to 100%)

### Circular Reveal Implementation
```javascript
.fromTo(videoRevealRef.current, {
  clipPath: 'circle(15px at center)',      // 30px diameter start
}, {
  clipPath: 'circle(100% at center)',      // Full size
  duration: 1.4,
  ease: 'power2.out',
}, 2.1)
```

## Reversibility

✅ **All animations are fully reversible** because:
1. Using `scrub` mode - animations are tied directly to scroll position
2. No `onComplete` callbacks that would prevent reverse
3. All transforms are relative, not absolute
4. Video `currentTime` is set based on scroll progress (works both directions)

**Test:** Scroll down, then scroll back up - everything reverses smoothly!

## Visual Representation

```
Scroll Progress:  0%    15%         50%    60%              100%
                  |      |           |      |                |
Intro/Footer:     [====FADE OUT====]
                  
Names Position:          [=====RISE UP=====]
                  
Names Opacity:                      [FADE]
                  
Video Reveal:                              [====GROW====]
                  
Video Playback:                            [====PLAY====]
```

## Key Improvements Made

### 1. ✅ Names Move Only Vertically
- **Before:** Names moved both horizontally (x) and vertically (y)
- **After:** Names only move up (y: '-25vh'), no horizontal movement
- **Result:** Clean vertical rise to center

### 2. ✅ Slower, More Controlled Timing
- **Before:** 300vh scroll distance, fast transitions
- **After:** 400vh scroll distance, longer durations
- **Result:** Smooth, cinematic feel

### 3. ✅ True Circular Reveal
- **Before:** Video scaled from small to large
- **After:** Video reveals pixel-by-pixel from center using clip-path
- **Result:** Dramatic circular expansion effect

### 4. ✅ Better Video Sync
- **Before:** Video started at 30% scroll
- **After:** Video starts at 52% scroll (when it becomes visible)
- **Result:** Video playback matches visual appearance

### 5. ✅ Fully Reversible
- **Before:** Some animations might not reverse smoothly
- **After:** All animations tied to scroll position with scrub
- **Result:** Perfect reverse scrolling

## Browser Compatibility

- **Chrome/Edge:** Full support for clip-path
- **Firefox:** Full support
- **Safari:** Full support (iOS 13.4+)
- **Mobile:** Tested and working

## Performance Notes

- `will-change: clip-path` on video reveal element
- `will-change: opacity` on video container
- Transform-based animations for names (GPU accelerated)
- Video seeking threshold: 0.05s (prevents jitter)

## Customization

### Adjust Name Rise Distance
```javascript
y: '-25vh',  // Default: 25% of viewport height
y: '-30vh',  // Higher: 30% of viewport height
y: '-20vh',  // Lower: 20% of viewport height
```

### Adjust Video Start Size
```javascript
clipPath: 'circle(15px at center)',  // Default: 30px diameter
clipPath: 'circle(20px at center)',  // Larger: 40px diameter
clipPath: 'circle(10px at center)',  // Smaller: 20px diameter
```

### Adjust Scroll Speed
```javascript
end: '+=400vh',  // Default: 4x viewport height
end: '+=500vh',  // Slower: 5x viewport height
end: '+=300vh',  // Faster: 3x viewport height
```

### Adjust Scrub Smoothness
```javascript
scrub: 1.5,  // Default: 1.5 second lag
scrub: 2,    // Smoother: 2 second lag
scrub: 1,    // Snappier: 1 second lag
```
