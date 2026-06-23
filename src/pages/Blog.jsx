import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Clock } from 'lucide-react'
import { blogPosts } from '../data/blog.js'
import Reveal from '../components/Reveal.jsx'
import { useSeo } from '../lib/useSeo.js'

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

function Meta({ post }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" /> {fmtDate(post.date)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" /> {post.readTime}
      </span>
    </div>
  )
}

export default function Blog() {
  useSeo({
    title: 'Dog & Puppy Care Blog — Tips, Breeds & Buying Guides | Premium Puppy Kolkata',
    description:
      'Expert dog care tips, breed guides and puppy buying advice for Kolkata pet parents. Read the Premium Puppy blog for everything about raising a healthy, happy dog.',
  })

  const [featured, ...rest] = blogPosts

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Premium Puppy Blog</span>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Dog Care Tips, Breed Guides & Puppy Advice
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Everything you need to choose, raise and care for a healthy, happy dog in Kolkata.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* Featured post */}
        <Reveal>
          <Link
            to={`/blog/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-100/60 hover:ring-gold-200 md:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden bg-gold-50 md:h-auto">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-gold-600 px-3 py-1 text-xs font-semibold text-white shadow">
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8">
              <Meta post={featured} />
              <h2 className="mt-3 text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-gold-700 md:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-slate-600">{featured.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold text-gold-700">
                Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Grid */}
        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 90}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-100/60 hover:ring-gold-200"
              >
                <div className="relative h-48 overflow-hidden bg-gold-50">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gold-700 shadow">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <Meta post={post} />
                  <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-gold-700">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
