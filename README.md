# Mattz Barbers — Website

Premium barbershop website for **Mattz Barbers**, Walmley, Sutton Coldfield.

**Stack:** Astro 4 · React Islands · TypeScript · Tailwind CSS v4 · GSAP · Lenis

---

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:4321`

### Build for production

```bash
npm run build
npm run preview
```

Output goes to `dist/` — deploy this folder to any static host (Netlify, Vercel, Cloudflare Pages, etc).

---

## Project Structure

```
src/
├── components/
│   ├── Nav.astro              # Fixed navigation + mobile overlay
│   ├── Footer.astro           # Minimal editorial footer
│   ├── ThemeToggle.tsx        # React island: dark ↔ light toggle
│   └── sections/
│       ├── Opening.astro      # Editorial opening (no traditional hero)
│       ├── Services.astro     # Price list with grouped services
│       ├── Gallery.astro      # Polaroid/darkroom photo cards
│       ├── Testimonials.astro # Editorial review cards
│       └── Location.astro     # Google Maps + opening hours
├── layouts/
│   └── Layout.astro           # Base HTML shell, Lenis + GSAP boot
├── pages/
│   └── index.astro            # Assembles all sections
└── styles/
    └── global.css             # Design tokens, dual theme, animations
```

---

## ⚠️ Replace Placeholder Photos

The gallery currently uses Unsplash placeholder images. Replace them with 
real photos from **@mattzbarbers_** on Instagram:

1. Download photos from the Instagram profile
2. Place them in `public/images/gallery/`
3. Open `src/components/sections/Gallery.astro`
4. Update the `src` values in the `photos` array:

```js
// Before:
src: 'https://images.unsplash.com/photo-...',

// After:
src: '/images/gallery/photo-name.jpg',
```

Recommended format: **WebP**, ~600–900px wide, portrait orientation (3:4).

---

## Update Service Prices

Open `src/components/sections/Services.astro` and update the prices/durations 
in the `serviceGroups` array to match the live Fresha booking page.

---

## Update Opening Hours

Open `src/components/sections/Location.astro` and update the `hours` array.

---

## Dual Theme

The site ships with **dark mode** as default, with a **light mode** toggle.

- Dark: near-black `#0B0B09` + warm gold `#C9A96E`  
- Light: warm cream `#F4EFE6` + deep gold `#8B6D3C`

To change the default theme, update the `data-theme` attribute in `Layout.astro`:
```html
<html lang="en-GB" data-theme="light">
```

---

## Performance Notes

- **Static output** (no server runtime) — fastest possible TTFB
- **React islands** only for `ThemeToggle` (the only interactive component above the fold)
- **Fonts** are preconnected and loaded non-blocking
- **Google Maps** uses `loading="lazy"` — doesn't affect LCP
- **Images** use `loading="lazy"` except the LCP hero (which uses `fetchpriority="high"`)
- **GSAP + Lenis** are loaded after page paint, as a module script
- **Film grain** is a cheap CSS animation (no canvas, no JS)
- **No WordPress** — eliminates the 3–12 second load time

---

## Booking Link

All booking buttons point to:

```
https://www.fresha.com/a/mattz-barbers-birmingham-the-royal-town-of-sutton-coldfield-30a-walmley-road-q138b6q6/booking?allOffer=true&pId=1394571
```

To update, search for `fresha.com` across the `src/` directory.

---

## Fonts

| Role    | Typeface           | Source                         |
|---------|--------------------|--------------------------------|
| Display | Cormorant Garamond | Google Fonts (free)            |
| Body    | Satoshi            | Fontshare CDN (free)           |

Both are loaded via `<link>` in `Layout.astro`. No self-hosting required,
but for maximum performance you can self-host them in `public/fonts/`.

---

## Design System

All colour tokens live in `src/styles/global.css`:

```css
[data-theme="dark"] {
  --bg:         #0B0B09;
  --gold:       #C9A96E;
  --text:       #EDE8DF;
  /* ... */
}

[data-theme="light"] {
  --bg:         #F4EFE6;
  --gold:       #8B6D3C;
  --text:       #0B0B09;
  /* ... */
}
```

The `--gold` accent is the only colour besides neutrals — no gradients, 
no AI-aesthetic blue/purple. Keeps the site timeless and on-brand.

---

## Deployment

### Netlify (recommended)
1. Push to GitHub
2. Connect repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Cloudflare Pages
Same as above — zero config needed for static Astro output.

---

Built for Mattz Barbers, Walmley. All rights reserved.
