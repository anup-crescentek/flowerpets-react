import { useEffect } from 'react'
import { SITE_URL } from './site.js'

function setMeta(attr, key, content, store) {
  if (content == null) return
  const sel = `meta[${attr}="${key}"]`
  let el = document.head.querySelector(sel)
  let created = false
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
    created = true
  }
  store.push({ el, created, prev: el.getAttribute('content') })
  el.setAttribute('content', content)
}

// Lightweight client-side SEO: sets <title>, description, Open Graph / Twitter
// social tags and an optional JSON-LD block — restoring everything on unmount.
export function useSeo({ title, description, image, type = 'website', jsonLd }) {
  useEffect(() => {
    const prevTitle = document.title
    if (title) document.title = title
    const store = []

    if (description) setMeta('name', 'description', description, store)
    if (title) setMeta('property', 'og:title', title, store)
    if (description) setMeta('property', 'og:description', description, store)
    setMeta('property', 'og:type', type, store)
    if (image) setMeta('property', 'og:image', image, store)
    setMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary', store)
    if (title) setMeta('name', 'twitter:title', title, store)
    if (description) setMeta('name', 'twitter:description', description, store)
    if (image) setMeta('name', 'twitter:image', image, store)

    // Canonical + og:url for this page
    const canonical = SITE_URL + window.location.pathname
    let linkEl = document.head.querySelector('link[rel="canonical"]')
    let linkCreated = false
    const prevHref = linkEl ? linkEl.getAttribute('href') : null
    if (!linkEl) {
      linkEl = document.createElement('link')
      linkEl.setAttribute('rel', 'canonical')
      document.head.appendChild(linkEl)
      linkCreated = true
    }
    linkEl.setAttribute('href', canonical)
    setMeta('property', 'og:url', canonical, store)

    let script
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.text = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    return () => {
      document.title = prevTitle
      store.forEach(({ el, created, prev }) => {
        if (created) el.remove()
        else if (prev != null) el.setAttribute('content', prev)
      })
      if (linkCreated) linkEl.remove()
      else if (prevHref != null) linkEl.setAttribute('href', prevHref)
      if (script) script.remove()
    }
  }, [title, description, image, type, jsonLd])
}
