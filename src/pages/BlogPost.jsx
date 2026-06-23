import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Clock, User, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { blogPosts, getPost } from '../data/blog.js'
import { getBreed, PHONE, PHONE_INTL } from '../data/breeds.js'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { useSeo } from '../lib/useSeo.js'

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  const jsonLd = useMemo(() => {
    if (!post) return null
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        image: origin + post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'Premium Puppy' },
        publisher: {
          '@type': 'Organization',
          name: 'Premium Puppy',
          logo: { '@type': 'ImageObject', url: origin + '/logo.png' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': origin + '/blog/' + post.slug },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: origin + '/blog' },
          { '@type': 'ListItem', position: 3, name: post.title, item: origin + '/blog/' + post.slug },
        ],
      },
    ]
  }, [post])

  useSeo({
    title: post ? `${post.title} | Premium Puppy Blog` : 'Article Not Found — Premium Puppy',
    description: post?.excerpt,
    image: post && typeof window !== 'undefined' ? window.location.origin + post.image : undefined,
    type: 'article',
    jsonLd,
  })

  if (!post) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900">Article not found</h1>
        <p className="text-slate-600">We couldn't find that article. Browse all our posts instead.</p>
        <Link
          to="/blog"
          className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5"
        >
          Back to Blog
        </Link>
      </section>
    )
  }

  const related = (post.relatedBreeds || []).map(getBreed).filter(Boolean)
  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-3xl px-4 pt-10 pb-6">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:text-gold-700">Blog</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-700">{post.category}</span>
          </nav>
          <span className="mt-5 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
            {post.category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5"><User className="h-4 w-4" /> Premium Puppy Team</span>
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> {fmtDate(post.date)}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {post.readTime}</span>
          </div>
        </div>
      </header>

      {/* Cover image */}
      <div className="mx-auto max-w-4xl px-4">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-2 shadow-xl shadow-gold-100/60">
            <img
              src={post.image}
              alt={post.title}
              className="h-64 w-full rounded-[1.6rem] object-cover md:h-[26rem]"
            />
          </div>
        </Reveal>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Reveal>
          <p className="text-xl font-medium leading-relaxed text-slate-700">{post.intro}</p>
        </Reveal>

        {post.sections.map((s) => (
          <Reveal key={s.heading} className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{s.heading}</h2>
            <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-slate-600">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {s.list && (
              <ul className="mt-4 space-y-2.5">
                {s.list.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-slate-700">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-700">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[16px]">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        {/* Inline CTA */}
        <Reveal className="mt-12">
          <div className="rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 p-8 text-center shadow-xl shadow-gold-500/30">
            <h2 className="text-2xl font-bold text-white">Ready to find your perfect puppy?</h2>
            <p className="mx-auto mt-2 max-w-md text-gold-50">
              Browse 24 vaccinated breeds in Kolkata, or message us to check availability and price.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/breeds"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-gold-700 shadow-lg transition hover:-translate-y-0.5"
              >
                View Breeds <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${PHONE_INTL}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Related breeds */}
      {related.length > 0 && (
        <section className="bg-gradient-to-b from-white to-gold-50/60">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">Breeds Mentioned</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((b) => (
                <Link
                  key={b.slug}
                  to={`/breeds/${b.slug}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold-200"
                >
                  <div className="h-36 overflow-hidden bg-gold-50">
                    <img
                      src={b.image}
                      alt={`${b.name} puppy`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-slate-900 transition group-hover:text-gold-700">{b.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold-600">{b.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More articles */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">More Articles</h2>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700 hover:underline">
            <ArrowLeft className="h-4 w-4" /> All posts
          </Link>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {morePosts.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold-200"
            >
              <div className="h-40 overflow-hidden bg-gold-50">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-xs font-semibold text-gold-600">{p.category}</span>
                <h3 className="mt-1 font-bold leading-snug text-slate-900 transition group-hover:text-gold-700">
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}
