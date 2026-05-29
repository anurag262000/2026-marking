# Award-Winning Portfolio - Project Summary

## 🎨 Design Inspiration
Inspired by Luke Baffait's award-winning portfolio (lukebaffait.fr), this is a modern, minimalist portfolio with smooth animations and elegant interactions.

## 🎯 Color Palette
**Minimalist Monochrome with Red Accent**

```css
--background: #FAFAFA        /* Off-white background */
--foreground: #0A0A0A        /* Near black text */
--accent: #FF6B6B            /* Soft red accent */
--secondary: #4A4A4A         /* Medium gray */
--border: #E0E0E0            /* Light gray borders */
--hover: #F5F5F5             /* Subtle hover state */
--pure-white: #FFFFFF        /* Pure white for cards */
```

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js           # Root layout with fonts
│   ├── page.js             # Homepage
│   ├── globals.css         # Global styles & color palette
│   ├── works/
│   │   └── page.js         # Works/Portfolio page
│   ├── info/
│   │   └── page.js         # About/Info page
│   └── contact/
│       └── page.js         # Contact page
├── components/
│   ├── layout/
│   │   ├── Navigation.jsx  # Sticky navigation with mobile menu
│   │   ├── Footer.jsx      # Footer with links
│   │   └── SmoothScroll.jsx # Lenis smooth scroll
│   ├── home/
│   │   ├── Hero.jsx        # Hero section with GSAP animations
│   │   ├── About.jsx       # About section
│   │   ├── Projects.jsx    # Featured projects
│   │   ├── Skills.jsx      # Skills grid
│   │   └── Contact.jsx     # Contact CTA
│   ├── works/
│   │   └── WorksContent.jsx # Portfolio grid with filters
│   ├── info/
│   │   └── InfoContent.jsx  # Extended bio/about
│   └── contact/
│       └── ContactForm.jsx  # Contact form
├── assets/
│   └── icon.png
└── data/
    ├── projects.json
    └── projectsExtended.json
```

## ✨ Key Features

### 1. **Homepage**
- ✅ Animated hero section with GSAP
- ✅ Smooth scroll with Lenis
- ✅ About section with scroll-triggered animations
- ✅ Featured projects showcase
- ✅ Skills grid organized by category
- ✅ Contact CTA section

### 2. **Works Page**
- ✅ Project grid with category filters
- ✅ Hover effects on project cards
- ✅ Responsive layout
- ✅ Smooth animations

### 3. **Info Page**
- ✅ Extended biography
- ✅ Profile image
- ✅ Detailed sections (Who I Am, My Stack, Experience, Vision)
- ✅ Download resume button

### 4. **Contact Page**
- ✅ Contact form with validation
- ✅ Success/error states
- ✅ Contact information cards
- ✅ Social links

### 5. **Navigation**
- ✅ Sticky header with scroll detection
- ✅ Mobile hamburger menu
- ✅ Smooth page transitions
- ✅ Active state indicators

### 6. **Animations**
- ✅ GSAP scroll-triggered animations
- ✅ Framer Motion page transitions
- ✅ Smooth scroll with Lenis
- ✅ Hover effects and micro-interactions
- ✅ Staggered element reveals

## 🛠️ Tech Stack

### Core
- **Next.js 16.1.4** - React framework
- **React 19.2.3** - UI library
- **Tailwind CSS 4.0** - Styling

### Animations
- **GSAP 3.14.2** - Professional animations
- **Framer Motion 12.29.2** - React animations
- **Lenis 1.0.42** - Smooth scrolling

### Fonts
- **Space Grotesk** - Primary font
- **Space Mono** - Monospace font

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Server
```bash
pnpm dev
```

### 3. Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Customization Guide

### Update Personal Information
Edit `/PERSONAL_INFO.md` with your details, then update components:

1. **Hero Section** (`src/components/home/Hero.jsx`)
   - Update name and title
   - Modify subtitle text

2. **About Section** (`src/components/home/About.jsx`)
   - Update bio text
   - Modify description

3. **Contact Info** (Multiple files)
   - Update email, phone, location
   - Update social links

### Add Projects
1. Edit `src/data/projects.json` or `src/data/projectsExtended.json`
2. Add project images to `/public/`
3. Projects will automatically appear on homepage and works page

### Customize Colors
Edit `src/app/globals.css` `:root` section:
```css
:root {
  --accent: #YOUR_COLOR;  /* Change accent color */
  /* ... other colors */
}
```

### Add New Pages
1. Create folder in `src/app/your-page/`
2. Add `page.js` file
3. Import Navigation, Footer, and SmoothScroll
4. Create component in `src/components/your-page/`

## 🎯 Design Principles

### 1. **Minimalism**
- Generous whitespace
- Clean typography
- Subtle colors
- Focus on content

### 2. **Smooth Animations**
- GSAP for scroll-triggered reveals
- Framer Motion for page transitions
- Lenis for buttery smooth scrolling
- Micro-interactions on hover

### 3. **Typography-First**
- Large, bold headings
- Readable body text
- Proper hierarchy
- Consistent spacing

### 4. **Responsive Design**
- Mobile-first approach
- Fluid typography
- Adaptive layouts
- Touch-friendly interactions

## 📱 Responsive Breakpoints

```css
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */
```

## 🎨 Typography Scale

```css
h1: clamp(2.5rem, 8vw, 6rem)      /* 40px - 96px */
h2: clamp(2rem, 5vw, 4rem)        /* 32px - 64px */
h3: clamp(1.5rem, 3vw, 2.5rem)    /* 24px - 40px */
p:  clamp(1rem, 2vw, 1.125rem)    /* 16px - 18px */
```

## 🔧 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ Lazy loading for images
- ✅ Optimized fonts with next/font
- ✅ Minimal JavaScript bundle
- ✅ CSS optimization with Tailwind

## 📦 Build for Production

```bash
pnpm build
pnpm start
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Other Platforms
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

## 🎯 Next Steps

### Phase 1: Content
- [ ] Add real project images
- [ ] Write detailed project case studies
- [ ] Update bio and about content
- [ ] Add professional headshot

### Phase 2: Features
- [ ] Add project detail pages
- [ ] Implement blog section
- [ ] Add testimonials
- [ ] Create custom cursor (optional)

### Phase 3: Enhancements
- [ ] Add page transitions
- [ ] Implement dark mode toggle
- [ ] Add loading animations
- [ ] Optimize SEO

### Phase 4: Integration
- [ ] Connect contact form to EmailJS
- [ ] Add analytics (Google Analytics/Plausible)
- [ ] Implement CMS (optional)
- [ ] Add sitemap and robots.txt

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs/v3/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)

## 🎨 Design Inspiration

- Luke Baffait Portfolio
- Awwwards Winners
- Minimal Portfolio Designs
- Swiss Design Principles

## 📄 License

Private project - All rights reserved

---

**Built with ❤️ by Anurag Mishra**
