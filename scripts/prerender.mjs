// Post-build pre-rendering: snapshots each route's fully-rendered HTML
// (including JS-injected <title>, meta, canonical and JSON-LD) into static
// files under dist/, so search engines and AI crawlers that don't run JS
// still get complete pages. Uses the system Edge/Chrome via puppeteer-core.
import { createServer } from 'node:http'
import { readFile, existsSync } from 'node:fs'
import { promises as fs } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve, extname, join } from 'node:path'
import { tmpdir } from 'node:os'
import puppeteer from 'puppeteer-core'

import { breeds } from '../src/data/breeds.js'
import { blogPosts } from '../src/data/blog.js'
import { locations } from '../src/data/locations.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dist = resolve(__dirname, '../dist')
const PORT = 4178

const routes = [
  '/', '/breeds', '/locations', '/blog', '/services', '/about', '/faq', '/contact',
  ...breeds.map((b) => `/breeds/${b.slug}`),
  ...locations.map((l) => `/locations/${l.slug}`),
  ...blogPosts.map((p) => `/blog/${p.slug}`),
]

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain',
  '.xml': 'application/xml', '.ico': 'image/x-icon',
}

function findBrowser() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    // Chrome first — most reliable headless launch with puppeteer.
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  ].filter(Boolean)
  return candidates.find((p) => existsSync(p))
}

// Tiny static server with SPA fallback to index.html
function serve() {
  return new Promise((res) => {
    const server = createServer((req, resp) => {
      let urlPath = decodeURIComponent(req.url.split('?')[0])
      let filePath = join(dist, urlPath)
      const tryFile = (fp, fallback) => {
        readFile(fp, (err, data) => {
          if (err) return fallback ? fallback() : (resp.statusCode = 404, resp.end('Not found'))
          resp.setHeader('Content-Type', MIME[extname(fp)] || 'application/octet-stream')
          resp.end(data)
        })
      }
      if (extname(urlPath)) tryFile(filePath)
      else tryFile(join(dist, 'index.html')) // SPA fallback for routes
    })
    server.listen(PORT, () => res(server))
  })
}

async function run() {
  const exe = findBrowser()
  if (!exe) {
    console.error('✗ No Edge/Chrome found. Skipping prerender (SPA build still works).')
    process.exit(0)
  }
  // Unique profile dir per run, removed afterward, so a crashed run never
  // leaves a stale lock and we never hand off to an already-open browser.
  const profileDir = join(tmpdir(), `pp-prerender-${Date.now()}`)
  const server = await serve()
  const browser = await puppeteer.launch({
    executablePath: exe,
    headless: 'new',
    userDataDir: profileDir,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let ok = 0
  try {
    const page = await browser.newPage()

    // Block analytics during prerender so we don't fire phantom hits to GA
    // (and don't bake injected GA scripts into the static snapshots).
    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const u = req.url()
      if (u.includes('googletagmanager.com') || u.includes('google-analytics.com') || u.includes('analytics.google.com')) {
        req.abort()
      } else {
        req.continue()
      }
    })

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 })
        // Scroll through so IntersectionObserver content (reveal animations +
        // count-up stats) renders into the snapshot, then let it settle.
        await page.evaluate(async () => {
          await new Promise((done) => {
            let y = 0
            const t = setInterval(() => {
              window.scrollBy(0, 600)
              y += 600
              if (y >= document.body.scrollHeight + 600) {
                clearInterval(t)
                done()
              }
            }, 50)
          })
          window.scrollTo(0, 0)
        })
        await new Promise((r) => setTimeout(r, 1800))
        const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
        const outDir = route === '/' ? dist : join(dist, route)
        await fs.mkdir(outDir, { recursive: true })
        await fs.writeFile(join(outDir, 'index.html'), html)
        ok++
      } catch (e) {
        console.error(`  ✗ ${route}: ${e.message}`)
      }
    }
  } finally {
    await browser.close()
    server.close()
    await fs.rm(profileDir, { recursive: true, force: true }).catch(() => {})
  }
  console.log(`✓ Prerendered ${ok}/${routes.length} routes to static HTML`)
}

run()
