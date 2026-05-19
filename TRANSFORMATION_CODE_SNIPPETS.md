# Neo-Brutalist Transformation Code Snippets

Quick reference code snippets for transforming remaining components.

## Contact Page Transformation

### Key Changes for `/src/app/contact/Contact.jsx`:

1. **Replace background section**:
```jsx
// OLD: Dark background with particles
<div className="relative min-h-screen bg-black text-white overflow-hidden">

// NEW: Neo-brutalist off-white
<div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--off-white)' }}>
  <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-30" />
```

2. **Transform form inputs**:
```jsx
// Replace all input className with:
className={`w-full px-4 py-3 rounded-lg font-space font-medium transition-all ${
  focusedField === "name" ? "" : ""
}`}
style={{ 
  border: '2px solid var(--pitch-black)',
  backgroundColor: 'var(--pure-white)',
  color: 'var(--pitch-black)'
}}
onFocus={(e) => {
  setFocusedField("name");
  e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
  e.currentTarget.style.transform = 'translate(-2px, -2px)';
}}
onBlur={(e) => {
  setFocusedField(null);
  e.currentTarget.style.boxShadow = 'none';
  e.currentTarget.style.transform = 'translate(0, 0)';
}}
```

3. **Transform submit button**:
```jsx
<motion.button
  type="submit"
  disabled={formStatus.submitting}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="w-full font-space font-bold uppercase tracking-wider py-4 rounded-lg flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
  style={{
    backgroundColor: 'var(--neon-yellow)',
    color: 'var(--pitch-black)',
    border: '2px solid var(--pitch-black)',
    boxShadow: '4px 4px 0px var(--pitch-black)'
  }}
  onMouseEnter={(e) => {
    if (!formStatus.submitting) {
      e.currentTarget.style.transform = 'translate(2px, 2px)';
      e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
      e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
      e.currentTarget.style.color = 'var(--neon-yellow)';
    }
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
    e.currentTarget.style.color = 'var(--pitch-black)';
  }}
>
  {/* button content */}
</motion.button>
```

4. **Transform contact info cards**:
```jsx
<div 
  className="p-4 rounded-xl transition-all"
  style={{
    border: '2px solid var(--pitch-black)',
    backgroundColor: 'var(--pure-white)',
    boxShadow: '4px 4px 0px var(--pitch-black)'
  }}
>
  {/* content */}
</div>
```

5. **Transform availability badge**:
```jsx
<div
  className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
  style={{
    backgroundColor: 'var(--neon-yellow)',
    border: '2px solid var(--pitch-black)',
    boxShadow: '3px 3px 0px var(--pitch-black)',
    transform: 'rotate(-2deg)'
  }}
>
  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--action-pink)' }} />
  <span className="text-sm font-space font-bold uppercase" style={{ color: 'var(--pitch-black)' }}>
    Available for work
  </span>
</div>
```

---

## Testimonials Transformation

### Key Changes for `/src/components/Sections/HomeTestimonials.jsx`:

1. **Update section background**:
```jsx
<section 
  className={`${className || 'py-12 md:py-24'} relative overflow-hidden transition-colors duration-700`}
  style={{ backgroundColor: 'var(--off-white)' }}
>
  <div className="absolute inset-0 bg-dot-brutalist pointer-events-none opacity-20" />
```

2. **Transform heading**:
```jsx
<h2 
  className="text-[12vw] md:text-[12vw] font-black uppercase tracking-tight leading-none font-bebas"
  style={{ 
    color: 'var(--pitch-black)',
    WebkitTextStroke: '2px var(--pitch-black)',
    WebkitTextFillColor: 'transparent'
  }}
>
  Testimonials
</h2>
```

3. **Transform TestimonialCard component**:
```jsx
const TestimonialCard = ({ t, theme = 'light', isMobile = false }) => {
  const wordCount = t.content.split(/\s+/).filter(word => word.length > 0).length;
  const isLongMobile = isMobile && wordCount > 100;
  
  return (
    <div 
      className={`w-full ${isLongMobile ? 'h-[400px]' : 'h-auto'} rounded-2xl p-6 transition-all duration-300 flex flex-col`}
      style={{
        backgroundColor: 'var(--pure-white)',
        border: '3px solid var(--pitch-black)',
        boxShadow: '6px 6px 0px var(--pitch-black)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(2px, 2px)';
        e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-0 mb-4 flex-shrink-0">
        {t.image_url ? (
          <img 
            src={t.image_url} 
            alt={t.name} 
            className="w-12 h-12 rounded-full object-cover shadow-md"
            style={{ border: '2px solid var(--pitch-black)' }}
          />
        ) : (
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
            style={{
              backgroundColor: 'var(--electric-purple)',
              border: '2px solid var(--pitch-black)'
            }}
          >
            {t.name.charAt(0)}
          </div>
        )}
        <div className='ml-4'>
          <h4 
            className="font-bold text-base leading-tight font-space"
            style={{ color: 'var(--pitch-black)' }}
          >
            {t.name}
          </h4>
          <p 
            className="text-xs font-bold uppercase tracking-wider font-space"
            style={{ color: 'var(--electric-purple)' }}
          >
            {t.role} {t.company ? `@ ${t.company}` : ''}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className={`relative mt-4 ${isLongMobile ? 'flex-1 min-h-0 overflow-hidden' : ''}`}>
        <span 
          className="absolute -top-2 -left-3 text-5xl font-serif leading-none pointer-events-none select-none"
          style={{ color: 'var(--neon-yellow)', opacity: 0.3 }}
        >
          "
        </span>
        <div className={`relative z-10 pt-2 ${isLongMobile ? 'h-full overflow-y-auto pr-2' : 'h-auto'}`}>
          <p 
            className="leading-relaxed text-sm italic font-space"
            style={{ color: 'var(--pitch-black)', opacity: 0.8 }}
          >
            {t.content}
          </p>
        </div>
      </div>
    </div>
  );
};
```

4. **Transform interaction hint**:
```jsx
<div 
  className="mb-4 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest animate-pulse font-space"
  style={{
    backgroundColor: 'var(--electric-purple)',
    color: 'var(--pure-white)',
    border: '2px solid var(--pitch-black)',
    boxShadow: '3px 3px 0px var(--pitch-black)'
  }}
>
  {isPaused ? 'Scroll to read • Tap to Resume' : 'Tap to Pause & Scroll'}
</div>
```

---

## Blog Components Transformation

### For `/src/components/Sections/Blog.jsx`:

1. **Blog card wrapper**:
```jsx
<div 
  className="rounded-xl overflow-hidden transition-all duration-300"
  style={{
    backgroundColor: 'var(--pure-white)',
    border: '3px solid var(--pitch-black)',
    boxShadow: '6px 6px 0px var(--pitch-black)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
  }}
>
```

2. **Blog tags as stickers**:
```jsx
<span 
  className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase tracking-wider"
  style={{
    backgroundColor: 'var(--electric-purple)',
    color: 'var(--pure-white)',
    border: '2px solid var(--pitch-black)',
    boxShadow: '3px 3px 0px var(--pitch-black)',
    transform: `rotate(${Math.random() * 6 - 3}deg)` // Random rotation -3 to 3 degrees
  }}
>
  {tag}
</span>
```

3. **Read more button**:
```jsx
<button 
  className="px-6 py-3 rounded-lg font-space font-bold uppercase tracking-wider transition-all"
  style={{
    backgroundColor: 'var(--neon-yellow)',
    color: 'var(--pitch-black)',
    border: '2px solid var(--pitch-black)',
    boxShadow: '4px 4px 0px var(--pitch-black)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
    e.currentTarget.style.color = 'var(--neon-yellow)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
    e.currentTarget.style.color = 'var(--pitch-black)';
  }}
>
  Read More
</button>
```

---

## Project Gallery Transformation

### For `/src/components/projects/ProjectGalleryCSS.jsx`:

1. **Project card**:
```jsx
<div 
  className="rounded-2xl overflow-hidden transition-all"
  style={{
    backgroundColor: 'var(--pure-white)',
    border: '3px solid var(--pitch-black)',
    boxShadow: '8px 8px 0px var(--pitch-black)'
  }}
>
```

2. **Tech stack badges**:
```jsx
{project.tech.map((tech, i) => (
  <span 
    key={i}
    className="px-3 py-1 rounded-md font-space font-bold text-xs uppercase"
    style={{
      backgroundColor: i % 3 === 0 ? 'var(--neon-yellow)' : i % 3 === 1 ? 'var(--electric-purple)' : 'var(--action-pink)',
      color: i % 3 === 0 ? 'var(--pitch-black)' : 'var(--pure-white)',
      border: '2px solid var(--pitch-black)',
      boxShadow: '2px 2px 0px var(--pitch-black)'
    }}
  >
    {tech}
  </span>
))}
```

3. **Launch button**:
```jsx
<a 
  href={project.url}
  target="_blank"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-space font-bold uppercase tracking-wider transition-all"
  style={{
    backgroundColor: 'var(--neon-yellow)',
    color: 'var(--pitch-black)',
    border: '2px solid var(--pitch-black)',
    boxShadow: '4px 4px 0px var(--pitch-black)'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = 'var(--pitch-black)';
    e.currentTarget.style.color = 'var(--neon-yellow)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = 'var(--neon-yellow)';
    e.currentTarget.style.color = 'var(--pitch-black)';
  }}
>
  Launch Site
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
</a>
```

---

## Preloader Transformation

### For `/src/components/layout/Preloader/Preloader.jsx`:

1. **Container**:
```jsx
<div 
  className="fixed inset-0 z-50 flex items-center justify-center"
  style={{ backgroundColor: 'var(--off-white)' }}
>
```

2. **Loading counter**:
```jsx
<div 
  className="text-8xl md:text-9xl font-black font-bebas"
  style={{ 
    color: 'var(--pitch-black)',
    WebkitTextStroke: '3px var(--pitch-black)',
    WebkitTextFillColor: 'transparent'
  }}
>
  {count}%
</div>
```

3. **Loading bar**:
```jsx
<div 
  className="w-64 h-4 rounded-full overflow-hidden"
  style={{
    border: '3px solid var(--pitch-black)',
    backgroundColor: 'var(--pure-white)'
  }}
>
  <div 
    className="h-full transition-all duration-300"
    style={{
      width: `${count}%`,
      backgroundColor: 'var(--neon-yellow)',
      boxShadow: 'inset 0 0 0 2px var(--pitch-black)'
    }}
  />
</div>
```

---

## Quick Utility Functions

Add these to a utilities file for reusable hover effects:

```jsx
// /src/utils/brutalistHover.js

export const brutalistCardHover = {
  onMouseEnter: (e) => {
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '6px 6px 0px var(--pitch-black)';
  }
};

export const brutalistButtonHover = (bgColor = 'var(--neon-yellow)', textColor = 'var(--pitch-black)') => ({
  onMouseEnter: (e) => {
    e.currentTarget.style.transform = 'translate(2px, 2px)';
    e.currentTarget.style.boxShadow = '2px 2px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = textColor;
    e.currentTarget.style.color = bgColor;
  },
  onMouseLeave: (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
    e.currentTarget.style.backgroundColor = bgColor;
    e.currentTarget.style.color = textColor;
  }
});

export const brutalistInputFocus = {
  onFocus: (e) => {
    e.currentTarget.style.boxShadow = '4px 4px 0px var(--pitch-black)';
    e.currentTarget.style.transform = 'translate(-2px, -2px)';
  },
  onBlur: (e) => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'translate(0, 0)';
  }
};
```

Usage:
```jsx
import { brutalistCardHover, brutalistButtonHover } from '@/utils/brutalistHover';

<div {...brutalistCardHover}>Card content</div>
<button {...brutalistButtonHover()}>Click me</button>
<button {...brutalistButtonHover('var(--electric-purple)', 'var(--pure-white)')}>Purple button</button>
```

---

## Color Rotation for Stickers

For variety in stickers/badges:

```jsx
const stickerColors = [
  { bg: 'var(--neon-yellow)', text: 'var(--pitch-black)' },
  { bg: 'var(--electric-purple)', text: 'var(--pure-white)' },
  { bg: 'var(--action-pink)', text: 'var(--pure-white)' },
  { bg: 'var(--pitch-black)', text: 'var(--neon-yellow)' },
];

const getRandomRotation = () => Math.random() * 6 - 3; // -3 to 3 degrees

// Usage:
{items.map((item, i) => {
  const color = stickerColors[i % stickerColors.length];
  return (
    <span
      key={i}
      className="inline-block px-3 py-1 rounded-md font-space font-bold text-xs uppercase"
      style={{
        backgroundColor: color.bg,
        color: color.text,
        border: '2px solid var(--pitch-black)',
        boxShadow: '3px 3px 0px var(--pitch-black)',
        transform: `rotate(${getRandomRotation()}deg)`
      }}
    >
      {item}
    </span>
  );
})}
```

---

## Typography Patterns

### Headlines:
```jsx
<h1 
  className="text-6xl md:text-8xl font-black font-bebas uppercase leading-none"
  style={{ color: 'var(--pitch-black)' }}
>
  Headline
</h1>
```

### Subheadings:
```jsx
<h2 
  className="text-3xl md:text-5xl font-black font-bebas uppercase leading-tight"
  style={{ 
    color: 'var(--pitch-black)',
    WebkitTextStroke: '2px var(--pitch-black)',
    WebkitTextFillColor: 'transparent'
  }}
>
  Subheading
</h2>
```

### Body text:
```jsx
<p 
  className="text-base md:text-lg font-space font-medium leading-relaxed"
  style={{ color: 'var(--pitch-black)', opacity: 0.8 }}
>
  Body text content
</p>
```

### Labels:
```jsx
<span 
  className="text-xs font-space font-bold uppercase tracking-wider"
  style={{ color: 'var(--electric-purple)' }}
>
  Label
</span>
```

---

## Final Checklist

- [ ] Replace all `font-orbitron` with `font-bebas` or `font-space`
- [ ] Replace all `font-bitcount` with `font-bebas`
- [ ] Replace all soft shadows with solid shadows (4px 4px 0px, 6px 6px 0px, 8px 8px 0px)
- [ ] Replace all glassmorphic backgrounds with solid white/off-white
- [ ] Add 2-3px solid black borders to all cards/buttons
- [ ] Convert all gradients to solid colors (neon yellow, electric purple, action pink)
- [ ] Add hover states that "press down" (translate + shadow reduction)
- [ ] Replace all rounded-full with rounded-lg/rounded-xl (except pills)
- [ ] Add rotation to decorative stickers (-3 to 6 degrees)
- [ ] Update all text colors to use CSS variables
- [ ] Replace dot patterns with `.bg-dot-brutalist`
- [ ] Test all animations still work (GSAP, Framer Motion, Lenis)
- [ ] Verify responsive design on mobile
- [ ] Check accessibility (contrast ratios, focus states)
