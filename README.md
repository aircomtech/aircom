# Aircom Technologies — Corporate Website

Official multi-page corporate web application for **Aircom Technologies** (*Serving beyond boundaries...*), built with Angular 19, Angular Material, SCSS, GSAP ScrollTrigger, and Reactive Forms.

## Tech Stack
- **Angular 19** (Standalone Components, Lazy-Loaded Routes, Reactive Forms, Angular Animations)
- **Angular Material** (Dialogs, Menus, Progress Spinners)
- **GSAP + ScrollTrigger** (Scroll reveals, staggered card entrances, hero parallax, animated stats)
- **TypeScript + SCSS** (Modular responsive design system)

## Key Features
- Responsive two-level header with transparent-to-white scroll glass transition, mega-style dropdowns, and mobile slide-in drawer
- Animated desktop & mobile hero sections (`hero-desktop.png` & `hero-mobile.png`) with parallax, glowing orbital rings, and verified company highlights (established 2009)
- Dedicated multi-page routes for Home, About Us, all 10 Services (`/services/:slug`), all 5 Product solution categories (`/products/:slug`), all 8 Industries (`/industries/:slug`), Blog (`/blog/:slug`), Contact Us, Privacy Policy, Terms & Conditions, and Sitemap
- Interactive Angular Material popups: Get a Quote, Contact Us, Service Inquiry, Product Inquiry, WhatsApp Inquiry, Newsletter Subscription, and once-per-session Welcome Consultation dialog
- Technical SEO (`SeoService` with dynamic titles, meta tags, canonical links, Open Graph, JSON-LD Organization/Service/FAQ schema, `robots.txt`, and `sitemap.xml`)

## Development
```bash
npm install
npm start
```

## Production Build
```bash
npm run build
```
