# Styling Guide - Troubleshooting

## ✅ Current Setup

### Tailwind CSS v4
- Using `@import "tailwindcss"` in globals.css
- CSS-based configuration (no tailwind.config.js needed)
- PostCSS configured with `@tailwindcss/postcss`

### Color Palette
All colors are defined as CSS variables in `:root`:

```css
--background: #fafafa     /* Off-white background */
--foreground: #0a0a0a     /* Near black text */
--accent: #ff6b6b         /* Soft red accent */
--secondary: #4a4a4a      /* Medium gray */
--border: #e0e0e0         /* Light gray borders */
--hover: #f5f5f5          /* Subtle hover */
--pure-white: #ffffff     /* Pure white */
```

## 🎨 How to Use Colors

### Method 1: Inline Styles (Recommended for CSS Variables)
```jsx
<div style={{ backgroundColor: 'var(--background)' }}>
  <h1 style={{ color: 'var(--foreground)' }}>Title</h1>
  <span style={{ color: 'var(--accent)' }}>Accent</span>
</div>
```

### Method 2: Tailwind Arbitrary Values
```jsx
<div className="bg-[var(--background)]">
  <h1 className="text-[var(--foreground)]">Title</h1>
  <span className="text-[var(--accent)]">Accent</span>
</div>
```

### Method 3: Custom CSS Classes
Use the predefined classes in globals.css:
```jsx
<button className="btn">Default Button</button>
<button className="btn btn-accent">Accent Button</button>
<a href="#" className="link-underline">Link with underline</a>
```

## 📦 Available Custom Classes

### Layout
- `.container` - Max-width container with padding
- `.section` - Section with vertical padding

### Components
- `.btn` - Base button style
- `.btn-accent` - Accent button (red)
- `.card` - Card with border and hover effect
- `.link-underline` - Link with animated underline

### Animations
- `.fade-in` - Fade in animation
- `.slide-in` - Slide in animation
- `.reveal` - GSAP reveal target
- `.skeleton` - Loading skeleton

## 🔧 Troubleshooting

### Colors Not Showing?

1. **Check if CSS variables are defined:**
   Open browser DevTools → Elements → Computed → Search for `--background`

2. **Verify Tailwind is loading:**
   Check if Tailwind utility classes work: `<div className="p-4 bg-red-500">Test</div>`

3. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   pnpm dev
   ```

4. **Check browser console for errors**

### Tailwind Classes Not Working?

1. **Verify postcss.config.mjs:**
   ```js
   const config = {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   };
   export default config;
   ```

2. **Check globals.css import:**
   First line should be: `@import "tailwindcss";`

3. **Restart dev server:**
   Stop and run `pnpm dev` again

### Fonts Not Loading?

1. **Check layout.js:**
   ```js
   import { Space_Grotesk, Space_Mono } from 'next/font/google';
   ```

2. **Verify font variables in HTML:**
   ```js
   <html className={`${spaceGrotesk.variable} ${spaceMono.variable}`}>
   ```

3. **Check CSS variables:**
   ```css
   --font-primary: var(--font-space-grotesk), ...
   ```

## 🎯 Quick Test

Add this to any page to test all colors:

```jsx
<div className="p-8 space-y-4">
  <div style={{ backgroundColor: 'var(--background)', padding: '20px' }}>
    Background Color
  </div>
  <div style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '20px' }}>
    Accent Color
  </div>
  <div style={{ backgroundColor: 'var(--pure-white)', border: '1px solid var(--border)', padding: '20px' }}>
    White with Border
  </div>
  <button className="btn">Default Button</button>
  <button className="btn btn-accent">Accent Button</button>
</div>
```

## 📝 Common Patterns

### Hero Section
```jsx
<section 
  className="min-h-screen flex items-center justify-center"
  style={{ backgroundColor: 'var(--background)' }}
>
  <h1 style={{ color: 'var(--foreground)' }}>
    Title <span style={{ color: 'var(--accent)' }}>Accent</span>
  </h1>
</section>
```

### Card Component
```jsx
<div className="card">
  <h3 style={{ color: 'var(--foreground)' }}>Card Title</h3>
  <p style={{ color: 'var(--secondary)' }}>Card description</p>
</div>
```

### Button with Hover
```jsx
<button className="btn btn-accent">
  Click Me
</button>
```

## 🚀 Performance Tips

1. **Use CSS variables for colors** - Easier to maintain and theme
2. **Use Tailwind for layout** - Faster development
3. **Use custom classes for components** - Consistent styling
4. **Minimize inline styles** - Better performance

## 📚 Resources

- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [CSS Variables MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
