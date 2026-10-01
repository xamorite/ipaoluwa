# Emmanuel Ogunneye: portfolio

Personal portfolio built with React and Vite, deployed on Netlify at
[xamorite.netlify.app](https://xamorite.netlify.app).

## Run it

```bash
npm install
npm run dev      # local dev server
npm run lint
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where things live

- `src/content.js`: all copy. Profile, featured projects and their case
  studies, other projects, experience, education and tools.
- `src/routes.js`: the page list, plus each page's title and link-preview
  details.
- `src/App.jsx`: components and a small history-based router
  (`/`, `/about`, `/work/:slug`).
- `src/index.css`: design tokens for color, spacing and type. `src/App.css`
  holds component styles.
- `public/images/`: project screenshots as WebP, at 1600px and 800px
  (`-800.webp`).
- `public/og/`: 1200×630 link-preview images, one per case study.

## Adding a project

Add an entry to `projects` in `src/content.js` with a `slug`, its screenshots
(`image`, a matching `-800.webp`, and `shareImage`) and a `story`. The build
then creates `/work/<slug>` with its own title and preview tags.

## How deep links work

During `vite build`, a small plugin in `vite.config.js` writes a copy of
`index.html` for every page in `src/routes.js`, with that page's title,
description and Open Graph tags. Netlify serves those files directly, so
shared links preview correctly. Addresses with no file get `404.html` with a
real 404 status.
