# Portfolio Project

## Project Information

**Framework:** Next.js 16.1.4  
**Package Manager:** pnpm  
**Node Version:** React 19.2.3

## Tech Stack

### Core
- **Next.js** 16.1.4 - React framework with App Router
- **React** 19.2.3 - UI library
- **Tailwind CSS** 4.0 - Utility-first CSS framework

### Authentication & Backend
- **Clerk** (@clerk/nextjs ^6.37.4) - Authentication and user management
- **Supabase** (@supabase/supabase-js ^2.95.3) - Backend as a Service (Database, Storage, Auth)

### Animations & 3D
- **GSAP** ^3.14.2 - Professional-grade animation library
- **Framer Motion** ^12.29.2 - React animation library
- **Three.js** ^0.182.0 - 3D graphics library
- **@react-three/fiber** ^9.5.0 - React renderer for Three.js
- **@react-three/drei** ^10.7.7 - Useful helpers for react-three-fiber
- **Lenis** (@studio-freight/lenis ^1.0.42) - Smooth scroll library

### UI Components & Effects
- **tsparticles** (@tsparticles/react ^3.0.0) - Particle effects
- **typewriter-effect** ^2.22.0 - Typewriter animation
- **react-icons** ^5.5.0 - Icon library

### Email & Communication
- **EmailJS** (@emailjs/browser ^4.4.1) - Email service for contact forms

### Utilities
- **clsx** ^2.1.1 - Conditional className utility
- **tailwind-merge** ^3.4.0 - Merge Tailwind CSS classes
- **sharp** ^0.34.5 - Image optimization
- **tweakpane** ^4.0.5 - Compact GUI for tweaking parameters

### Dev Dependencies
- **ESLint** ^9 - Linting
- **@tailwindcss/typography** ^0.5.19 - Typography plugin
- **react-markdown** ^10.1.0 - Markdown renderer
- **babel-plugin-react-compiler** 1.0.0 - React compiler plugin

## Scripts

```bash
# Development
pnpm dev          # Start development server at http://localhost:3000

# Production
pnpm build        # Build for production
pnpm start        # Start production server

# Linting
pnpm lint         # Run ESLint
```

## Database Schema (Supabase)

### Tables

#### `testimonials`
Stores client testimonials and reviews.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (auto-generated) |
| `name` | text | Client name |
| `role` | text | Client's job title |
| `company` | text | Client's company name |
| `content` | text | Testimonial content |
| `approved` | boolean | Approval status for display |
| `social_link` | text | Optional social media link |
| `image_url` | text | Profile image URL |
| `created_at` | timestamp | Record creation timestamp |

#### `blogs`
Stores blog posts and articles.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (auto-generated) |
| `title` | text | Blog post title |
| `slug` | text | URL-friendly slug (unique) |
| `excerpt` | text | Short description |
| `content` | text | Full blog content (Markdown) |
| `cover_image` | text | Cover image URL |
| `tags` | text[] | Array of tags |
| `published` | boolean | Publication status |
| `author_email` | text | Author's email |
| `created_at` | timestamp | Record creation timestamp |
| `updated_at` | timestamp | Last update timestamp |

#### `blog_likes`
Tracks blog post likes by users.

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key (auto-generated) |
| `blog_id` | uuid | Foreign key to blogs table |
| `user_id` | text | Clerk user ID |
| `created_at` | timestamp | Like timestamp |

**Unique Constraint:** `(blog_id, user_id)` - One like per user per blog

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Admin
ADMIN_EMAIL=your-admin-email@example.com

# EmailJS
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── about/        # About page
│   │   ├── admin/        # Admin dashboard (protected)
│   │   ├── blogs/        # Blog listing and detail pages
│   │   ├── contact/      # Contact page
│   │   ├── projects/     # Projects showcase
│   │   └── review/       # Testimonials page
│   ├── components/       # React components
│   │   ├── Sections/     # Page sections (Hero, About, etc.)
│   │   ├── about/        # About page components
│   │   ├── blog/         # Blog components
│   │   ├── projects/     # Project components
│   │   └── ui/           # Reusable UI components
│   ├── actions/          # Server actions
│   │   ├── blogs.js      # Blog CRUD operations
│   │   └── testimonials.js # Testimonial operations
│   └── data/             # Static data files
├── public/               # Static assets
└── .env.local           # Environment variables (not in git)
```

## Features

- ✅ Modern portfolio with hero section
- ✅ About page with animated sections
- ✅ Projects showcase with detailed case studies
- ✅ Blog system with Markdown support
- ✅ Like functionality for blog posts (requires authentication)
- ✅ Testimonials/reviews section
- ✅ Contact form with EmailJS integration
- ✅ Admin dashboard for content management
- ✅ Authentication with Clerk
- ✅ Smooth animations with GSAP and Framer Motion
- ✅ 3D elements with Three.js
- ✅ Responsive design
- ✅ Neo-brutalist design aesthetic

## Getting Started

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Fill in all required API keys and credentials

3. **Set up Supabase:**
   - Create a new Supabase project
   - Run the database migrations (see `dummy_data.sql` for schema reference)
   - Enable Row Level Security (RLS) policies as needed

4. **Set up Clerk:**
   - Create a Clerk application
   - Configure sign-in/sign-up pages
   - Add your admin email to environment variables

5. **Run development server:**
   ```bash
   pnpm dev
   ```

6. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

This project is optimized for deployment on **Vercel**:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add all environment variables
4. Deploy

## License

Private project - All rights reserved
