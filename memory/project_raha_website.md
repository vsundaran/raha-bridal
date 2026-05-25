---
name: project-raha-website
description: Raha Bridal Studio & Beauty Lounge — full luxury website built with Vite + React + Tailwind v4 + Framer Motion
metadata:
  type: project
---

Full website built and running at http://localhost:5174. Stack: Vite 8 + React 19 + Tailwind CSS v4 (@tailwindcss/vite) + Framer Motion + Lucide React 1.16.

**Why:** Luxury bridal beauty brand in Trichy, Tamil Nadu. Primary goal: WhatsApp inquiry generation + portfolio showcase.

**How to apply:** When adding features, keep the champagne gold (#C9A96E) / ivory (#FDFAF6) / warm dark (#2C1810) color system. All WhatsApp links use https://wa.me/917598052653.

Key decisions made:
- React Compiler babel plugin DISABLED — it crashed silently with Framer Motion components. vite.config.ts uses plain `react()` plugin.
- `lucide-react` v1.16 has NO brand icons (no Instagram). Custom `InstagramIcon` SVG component at `src/components/InstagramIcon.tsx`.
- Saree prepleating images are `.HEIC` format — don't render cross-browser. Services + Portfolio sections use `modelPhotos` fallback for saree cards instead. The HEIC files still exist but aren't used in the UI.
- Haircare and skin care images were renamed from emoji/special-char filenames to `haircare-01..06.jpg` and `skincare-01..11.jpg` using Python rename script.
- All image imports use `import.meta.glob` with `{ eager: true, query: '?url', import: 'default' }` in `src/constants/images.ts`.

Sections built:
- Navbar (transparent → glass on scroll, active section tracking, mobile drawer)
- HeroSection (auto-sliding cinematic slideshow from model photos + ranjani)
- AboutSection (3-image collage, brand story, stats)
- ServicesSection (8 service cards with hover effects)
- PortfolioSection (category filter + masonry gallery + fullscreen modal)
- TestimonialsSection (dark warm bg, 5 testimonials, carousel)
- InstagramSection (10-image grid, link to @raha_bridalstudio_beautylounge)
- ContactSection (contact info + embedded Trichy Google Map + WhatsApp inquiry form)
- FooterSection (brand, tagline, nav links, contact details)
- WhatsAppButton (floating sticky CTA)

**HEIC conversion recommended:** Convert saree prepleating HEIC files to JPEG for full cross-browser support. Use `sips -s format jpeg *.HEIC --out .` on macOS.
