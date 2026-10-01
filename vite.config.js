import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { profile } from './src/content.js'
import { metaForRoute, prerenderRoutes } from './src/routes.js'

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function withMeta(template, meta) {
  const url = profile.siteUrl + meta.path
  const image = profile.siteUrl + meta.image
  const tags = [
    [/(<title>)[^<]*(<\/title>)/, meta.title],
    [/(<meta\s+name="title"\s+content=")[^"]*(")/, meta.title],
    [/(<meta\s+name="description"\s+content=")[^"]*(")/, meta.description],
    [/(<meta\s+property="og:url"\s+content=")[^"]*(")/, url],
    [/(<meta\s+property="og:title"\s+content=")[^"]*(")/, meta.title],
    [/(<meta\s+property="og:description"\s+content=")[^"]*(")/, meta.description],
    [/(<meta\s+property="og:image"\s+content=")[^"]*(")/, image],
    [/(<meta\s+property="twitter:url"\s+content=")[^"]*(")/, url],
    [/(<meta\s+property="twitter:title"\s+content=")[^"]*(")/, meta.title],
    [/(<meta\s+property="twitter:description"\s+content=")[^"]*(")/, meta.description],
    [/(<meta\s+property="twitter:image"\s+content=")[^"]*(")/, image],
  ]
  let html = template
  for (const [pattern, value] of tags) {
    if (!pattern.test(html)) throw new Error(`prerender-meta: ${pattern} not found in index.html`)
    html = html.replace(pattern, (_, before, after) => before + escapeHtml(value) + after)
  }
  if (meta.noindex) {
    html = html.replace('</head>', '  <meta name="robots" content="noindex">\n</head>')
  }
  return html
}

// Writes a copy of index.html for each page with that page's title and
// link-preview tags, plus sitemap.xml and robots.txt. Netlify serves these
// files directly, and 404.html (with a real 404 status) for any address
// that has no file.
function prerenderMeta() {
  let outDir
  return {
    name: 'prerender-meta',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const template = await readFile(path.join(outDir, 'index.html'), 'utf8')
      for (const route of prerenderRoutes) {
        const file = path.join(outDir, route.file)
        await mkdir(path.dirname(file), { recursive: true })
        await writeFile(file, withMeta(template, metaForRoute(route)))
      }

      const paths = [
        '/',
        ...prerenderRoutes.filter((route) => route.page !== 'not-found').map((route) => metaForRoute(route).path),
      ]
      const urls = paths.map((p) => `  <url><loc>${profile.siteUrl}${p}</loc></url>`).join('\n')
      await writeFile(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      await writeFile(path.join(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${profile.siteUrl}/sitemap.xml\n`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderMeta()],
})
