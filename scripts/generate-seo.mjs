// Generates public/sitemap.xml and public/llms.txt from the site data.
// Runs automatically before each build (see package.json "prebuild").
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { breeds } from '../src/data/breeds.js'
import { blogPosts } from '../src/data/blog.js'
import { locations } from '../src/data/locations.js'

const SITE = 'https://kolkatadogstore.in'
const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = resolve(__dirname, '../public')

const staticPages = [
  { path: '/', priority: '1.0' },
  { path: '/breeds', priority: '0.9' },
  { path: '/locations', priority: '0.8' },
  { path: '/blog', priority: '0.8' },
  { path: '/services', priority: '0.6' },
  { path: '/about', priority: '0.6' },
  { path: '/faq', priority: '0.6' },
  { path: '/contact', priority: '0.6' },
]

const urls = [
  ...staticPages,
  ...breeds.map((b) => ({ path: `/breeds/${b.slug}`, priority: '0.7' })),
  ...locations.map((l) => ({ path: `/locations/${l.slug}`, priority: '0.7' })),
  ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, priority: '0.6', lastmod: p.date })),
]

// ---- sitemap.xml ----
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE}${u.path}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
        `    <changefreq>weekly</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join('\n') +
  '\n</urlset>\n'

writeFileSync(resolve(pub, 'sitemap.xml'), sitemap)

// ---- llms.txt (AI-crawler content map) ----
const llms =
  `# Premium Puppy\n\n` +
  `> Premium Puppy (kolkatadogstore.in) sells healthy, vaccinated puppies in Kolkata and across West Bengal at the best price. Verified breeders, cash on delivery and doorstep delivery. Phone: 8013988082.\n\n` +
  `## Key Pages\n` +
  `- [Home](${SITE}/): Dog sale in Kolkata — buy healthy, vaccinated puppies.\n` +
  `- [Breeds & Prices](${SITE}/breeds): 24 dog breeds with prices.\n` +
  `- [Areas We Serve](${SITE}/locations): Delivery across Kolkata & West Bengal.\n` +
  `- [Blog](${SITE}/blog): Dog care tips, breed guides and buying advice.\n` +
  `- [About](${SITE}/about), [Services](${SITE}/services), [FAQ](${SITE}/faq), [Contact](${SITE}/contact)\n\n` +
  `## Breeds\n` +
  breeds.map((b) => `- [${b.name}](${SITE}/breeds/${b.slug}): ${b.price}`).join('\n') +
  `\n\n## Locations\n` +
  locations.map((l) => `- [${l.name}](${SITE}/locations/${l.slug}): ${l.blurb}`).join('\n') +
  `\n\n## Articles\n` +
  blogPosts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}): ${p.excerpt}`).join('\n') +
  `\n`

writeFileSync(resolve(pub, 'llms.txt'), llms)

console.log(`✓ Generated sitemap.xml (${urls.length} URLs) and llms.txt`)
