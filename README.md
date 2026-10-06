# Eagle Media Creations – Website

Vite + React 19 (JavaScript) + Tailwind CSS v4 + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run images   # convert photos in client-assets/images/ → optimized WebP
npm run build    # production build → dist/
```

## Folder structure

```
├── client-assets/               source files (not deployed)
│   ├── images/                  ← ORIGINAL PHOTOS (JPG masters) – add new photos here
│   └── reference/               homepage-reference.jpg (design reference)
├── docs/
│   └── IMAGE_GENERATION.md      art direction + prompts for the generated photo set
├── scripts/
│   └── optimize-images.mjs      photo → WebP converter (npm run images)
├── public/                      favicon.svg, robots.txt, _redirects, .htaccess (served as-is)
├── index.html                   HTML shell (fonts, default meta)
├── vite.config.js               Vite + React + Tailwind plugins
├── vercel.json                  SPA rewrites for Vercel
├── .env.example                 VITE_CONTACT_ENDPOINT
└── src/
    ├── assets/
    │   ├── logo/                eagle-logo.png
    │   └── images/
    │       ├── web/             generated WebP files (800w + 1600w, + ~2048w for large banners) – don't edit by hand
    │       └── gangamma/        gangamma-title.png (transparent title art)
    ├── data/                    ← ALL TEXT + IMAGE LINKS LIVE HERE
    │   ├── site.js              company name, phone, email, address, map, socials, reel
    │   ├── navigation.js        menu items
    │   ├── hero.js              hero slides (01 Cinema, 02 Entertainment…)
    │   ├── services.js          About Us feature columns
    │   ├── films.js             films + featured project (Gangamma banner)
    │   ├── gallery.js           gallery categories + images
    │   └── news.js              news & updates
    ├── components/
    │   ├── layout/              Header, Footer, Logo, SocialLinks, Layout
    │   ├── sections/            Hero, AboutSection, FeaturedProject, FilmsSection,
    │   │                        GallerySection, NewsSection, ContactSection, CTABanner
    │   ├── cards/               FilmCard, NewsCard
    │   ├── ui/                  Button, Img, Lightbox, SectionTitle, CircleArrow, Reveal,
    │   │                        ReelModal, PageHero
    │   ├── icons/               SocialIcons, FeatureIcons
    │   └── seo/                 Seo (page <title> / meta)
    ├── pages/                   Home, About, Films, FilmDetail, Gallery, News, Contact, NotFound
    ├── hooks/                   useScrolled
    ├── utils/                   formatDate, images (img() registry + responsive sizes)
    ├── styles/
    │   ├── tokens.css           brand colours + fonts (edit here only)
    │   └── globals.css          base styles, typography + spacing helpers
    │                            (.section-y, .section-y-sm, .container-x)
    ├── App.jsx                  routes
    └── main.jsx                 entry point
```

## Design system

| Token | Value | Use |
|---|---|---|
| `font-display` | Cinzel | headings, section titles |
| `font-sans` | Montserrat | body, nav, labels |
| `ink` / `coal` / `ash` | #0a0a0b / #111113 / #18181b | backgrounds |
| `bone` / `mist` | #ece7df / #a29d95 | text |
| `crimson` | #c8202f | buttons, accents |
| `gold` | #c9a24a | logo, feature icons |

## Adding or replacing photos

1. Put the photo in `client-assets/images/` (JPG or PNG, at least 1600px wide).
   Every WebP in `src/assets/images/web/` is bundled into the build, so delete the
   `-800/-1600.webp` files (and any larger `-<width>.webp`) of a photo you stop using.
   To replace an existing photo, keep the same file name.
2. Run `npm run images` – this creates `<name>-800.webp` and `<name>-1600.webp`, plus
   `<name>-<width>.webp` (up to 2400px) when the source is clearly wider than 1600px, so
   full-screen banners stay sharp on laptops.
3. Use the file name (without extension) in `src/data/*.js`, e.g. `image: 'hero-cinema'`,
   or in a component: `<Img name="hero-cinema" size="full" />`.

Recommended source sizes:

| Image | Size |
|---|---|
| Hero slides / page banners | 2400 × 1350 (16:9) or wider |
| Film key art / news | 1600 × 900 (16:9) |
| Gallery | any ratio, 1600px wide |
| Gangamma title logo | transparent PNG, ~1200px wide |
| Logo | transparent PNG (≥ 600px wide) or SVG |

## Contact form

Set `VITE_CONTACT_ENDPOINT` in `.env` (e.g. a Formspree / Web3Forms URL).
Until then the form opens the visitor's email app.

## Deploying

The site uses client-side routing. Config for the common hosts is already included:
`public/_redirects` (Netlify), `vercel.json` (Vercel) and `public/.htaccess` (Apache / cPanel).

Before going live, set `url` in `src/data/site.js` to the real domain so link previews
(WhatsApp, Facebook, X) show the correct image.
