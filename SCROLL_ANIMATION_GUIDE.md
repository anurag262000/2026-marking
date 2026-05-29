# Hero Section Scroll Animation Guide

## Overview
This document explains the scroll-triggered animation implementation for the hero section, inspired by [lukebaffait.fr](https://lukebaffait.fr/).

## Animation Sequence

### Phase 1: Initial Load (0-1.5s)
- Intro text fades in with blur effect
- "Anurag" (first name) animates up from bottom
- "Mishra." (last name) animates up from bottom
- Footer divider scales in from left
- Footer items fade in with stagger

### Phase 2: Scroll Start (0-25% scroll)
- Names move toward center of screen
  - "Anurag" moves right and up
  - "Mishra." moves left and up
- Intro text fades out and moves up
- Footer fades out and moves down

### Phase 3: Name Transition (25-40% scroll)
- Both names fade out with slight scale down
- Video container appears at center with small scale (0.3)

### Phase 4: Video Growth (40-100% scroll)
- Video scales from 30% to 100% (80vh)
- Video playback syncs with scroll progress
- Video starts playing at 30% scroll progress
- Video duration (8 seconds) is distributed across 70% of scroll

### Phase 5: About Section Reveal
- About section fades in as user continues scrolling
- Content animates in with stagger effect

## Technical Implementation

### Key Technologies
- **GSAP (GreenSock Animation Platform)**: Core animation library
- **ScrollTrigger**: GSAP plugin for scroll-based animations
- **Next.js 16**: React framework
- **TypeScript**: Type safety
- **CSS Modules**: Scoped styling

### Animation Configuration

#### Scroll Timeline
```javascript
scrollTrigger: {
  trigger: heroRef.current,
  start: 'top top',
  end: '+=300vh',      // 3x viewport height for smooth progression
  scrub: 1,            // Smooth scrubbing with 1 second lag
  pin: true,           // Pin the section during scroll
  anticipatePin: 1,    // Prevent jump when pinning starts
}
```

#### Video Sync Logic
```javascript
const videoStartProgress = 0.3;  // Start at 30% scroll
const adjustedProgress = Math.max(0, (self.progress - videoStartProgress) / (1 - videoStartProgress));
video.currentTime = adjustedProgress * video.duration;
```

This ensures:
- Video doesn't start immediately
- 8-second video plays across 70% of scroll (from 30% to 100%)
- Smooth seeking with 0.1s threshold to prevent jitter

### File Structure
```
src/
├── components/
│   ├── home/
│   │   ├── Hero.tsx              # Main hero component with scroll animations
│   │   ├── Hero.module.css       # Hero styles including video container
│   │   ├── About.tsx             # About section that appears after hero
│   │   └── About.module.css      # About section styles
│   └── ui/
│       └── SilkAurora.tsx        # Background gradient effect
├── app/
│   ├── page.tsx                  # Main page combining Hero + About
│   └── globals.css               # Global styles with smooth scroll
└── public/
    └── hero/
        └── animate.mp4           # 8-second hero video
```

## Customization Guide

### Adjusting Scroll Duration
Change the `end` value in ScrollTrigger config:
```javascript
end: '+=300vh',  // Default: 3x viewport height
end: '+=400vh',  // Slower: 4x viewport height
end: '+=200vh',  // Faster: 2x viewport height
```

### Adjusting Video Start Point
Modify `videoStartProgress`:
```javascript
const videoStartProgress = 0.3;  // Default: starts at 30%
const videoStartProgress = 0.4;  // Later: starts at 40%
const videoStartProgress = 0.2;  // Earlier: starts at 20%
```

### Adjusting Name Movement
Modify the translation values in Phase 1:
```javascript
.to(firstNameRef.current, {
  x: '15vw',      // Horizontal movement (increase for more distance)
  y: '-35vh',     // Vertical movement (increase for higher position)
  duration: 1,
  ease: 'power2.inOut',
}, 0)
```

### Adjusting Video Size
Modify the video container styles:
```css
.videoContainer {
  width: 80vw;   /* Default: 80% of viewport width */
  height: 80vh;  /* Default: 80% of viewport height */
}
```

Or adjust the final scale in the animation:
```javascript
.to(videoContainerRef.current, {
  scale: 1,      // Default: 100% (80vh)
  scale: 0.9,    // Smaller: 90% (72vh)
  scale: 1.1,    // Larger: 110% (88vh)
  duration: 2,
}, 1.6)
```

## Performance Considerations

### Optimizations Applied
1. **will-change**: Applied to animated elements
2. **transform**: Used instead of position properties
3. **scrub**: Smooth scrubbing with 1s lag prevents jank
4. **Video seeking threshold**: 0.1s threshold prevents excessive seeking
5. **preload="auto"**: Video loads immediately
6. **playsInline**: Prevents fullscreen on mobile

### Best Practices
- Keep video file size under 5MB for fast loading
- Use H.264 codec for broad compatibility
- Test on mobile devices for performance
- Consider adding loading state for video

## Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS requires `playsInline`)
- Mobile: Tested on iOS Safari and Chrome Android

## Troubleshooting

### Video not playing smoothly
- Reduce scroll duration (`end: '+=200vh'`)
- Increase seeking threshold (from 0.1 to 0.2)
- Compress video file

### Names not centering properly
- Adjust `x` and `y` values based on viewport size
- Test on different screen sizes
- Consider using media queries for responsive adjustments

### Animation feels too fast/slow
- Adjust `scrub` value (higher = more lag/smoothness)
- Modify `duration` values in timeline
- Change `end` value for longer/shorter scroll distance

## Future Enhancements
- [ ] Add loading progress indicator for video
- [ ] Implement reduced motion preferences
- [ ] Add mobile-specific animations
- [ ] Create alternative animation for slow connections
- [ ] Add sound toggle for video (currently muted)

## Credits
Inspired by the scroll animation on [lukebaffait.fr](https://lukebaffait.fr/)
