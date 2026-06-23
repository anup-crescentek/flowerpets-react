import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Handshake,
  Syringe,
  Truck,
  ShieldCheck,
  Phone,
  Search,
  MessageCircle,
  Heart,
  Check,
  ChevronDown,
  ArrowRight,
  Quote,
} from 'lucide-react'
import { breeds, PHONE, PHONE_INTL } from '../data/breeds.js'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import Stars from '../components/Stars.jsx'
import CountUp from '../components/CountUp.jsx'
import { useSeo } from '../lib/useSeo.js'

const reasons = [
  {
    icon: Handshake,
    title: 'Verified Breeders',
    text: 'Every puppy comes from a trusted, verified breeder we work with directly.',
  },
  {
    icon: Syringe,
    title: 'Healthy & Vaccinated',
    text: 'Puppies are vaccinated and health-screened before they go to their new homes.',
  },
  {
    icon: Truck,
    title: 'Home Delivery',
    text: 'Doorstep delivery across Kolkata and surrounding regions, with cash on delivery.',
  },
]

const steps = [
  { icon: Search, title: 'Browse Breeds', text: 'Explore 24 vaccinated breeds with clear prices and details.' },
  { icon: MessageCircle, title: 'Talk to Us', text: 'Call or WhatsApp to confirm price, availability and delivery.' },
  { icon: Truck, title: 'Home Delivery', text: 'We deliver to your door across Kolkata with cash on delivery.' },
  { icon: Heart, title: 'Welcome Home', text: 'Bring home a healthy, happy puppy and a lifetime of love.' },
]

const stats = [
  { end: 500, suffix: '+', label: 'Happy Families' },
  { end: 228, suffix: '+', label: 'Google Reviews' },
  { end: 24, suffix: '', label: 'Breeds Available' },
  { end: 100, suffix: '%', label: 'Vaccinated' },
]

const testimonials = [
  { name: 'Riya S.', text: 'Our Labrador arrived healthy, vaccinated and so playful. The whole process was smooth and trustworthy.' },
  { name: 'Arjun M.', text: 'Genuine breeders and fair prices. They guided us on care and delivered right to our door in Kolkata.' },
  { name: 'Priya D.', text: 'Loved the experience — quick replies on WhatsApp and a happy, healthy Golden Retriever puppy.' },
]

const areas = [
  { name: 'Salt Lake', slug: 'salt-lake' },
  { name: 'New Town', slug: 'new-town' },
  { name: 'Howrah', slug: 'howrah' },
  { name: 'Behala', slug: 'behala' },
  { name: 'Garia', slug: 'garia' },
  { name: 'Dum Dum', slug: 'dum-dum' },
  { name: 'Ballygunge', slug: 'ballygunge' },
  { name: 'Tollygunge', slug: 'tollygunge' },
]

const faqs = [
  {
    q: 'How do I buy a puppy in Kolkata from Premium Puppy?',
    a: 'Browse our breeds, then call or message us on WhatsApp to confirm the price and availability. We arrange doorstep delivery across Kolkata with cash on delivery.',
  },
  {
    q: 'Are your puppies vaccinated and healthy?',
    a: 'Yes — every puppy is vaccinated and health-screened before delivery, and comes from a trusted, verified breeder.',
  },
  {
    q: 'What is the price range of puppies in Kolkata?',
    a: 'Prices vary by breed — popular breeds like the Labrador start around ₹12,000, while breeds like the Siberian Husky range higher. See the Breeds & Prices page for details.',
  },
  {
    q: 'Do you offer cash on delivery and home delivery?',
    a: 'Yes. We offer doorstep delivery across Kolkata and surrounding regions, with cash on delivery for your peace of mind.',
  },
  {
    q: 'How many dog breeds do you have available?',
    a: 'We currently offer 24 breeds, from family favourites to small companions and guardian breeds. Browse the full list on the Breeds page.',
  },
]

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        open ? 'border-gold-200 shadow-lg shadow-gold-100/60' : 'border-slate-100'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900"
      >
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 text-gold-600 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <p className="overflow-hidden px-6 pb-5 text-slate-600">{a}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const featured = breeds.filter((b) => b.featured)
  const [openFaq, setOpenFaq] = useState(0)

  const jsonLd = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'PetStore',
        name: 'Premium Puppy',
        image: origin + '/logo.png',
        url: origin,
        telephone: '+' + PHONE_INTL,
        priceRange: '₹₹',
        areaServed: 'Kolkata, West Bengal, India',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          addressCountry: 'IN',
        },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '228' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]
  }, [])

  useSeo({
    title: 'Dog Sale in Kolkata | Buy Healthy Vaccinated Puppies at Best Price — Premium Puppy',
    description:
      'Buy healthy, vaccinated puppies in Kolkata at the best price. 24 breeds, verified breeders, cash on delivery and doorstep delivery. 500+ happy families, 228+ reviews. Call ' +
      PHONE +
      '.',
    jsonLd,
  })

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 via-gold-50/40 to-white">
        <div className="absolute inset-0 bg-dots opacity-70" />
        <div className="animate-float-slow pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gold-300/40 blur-3xl" />
        <div className="animate-float pointer-events-none absolute -right-20 top-32 h-80 w-80 rounded-full bg-gold-300/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-gold-800 shadow-sm backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> Vaccinated Puppies · Cash on Delivery
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Dog Sale in Kolkata —{' '}
              <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                Buy Healthy Puppies
              </span>{' '}
              at the Best Price
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Affordable dog prices, verified breeders and seamless home delivery.
              Bringing healthy, vaccinated puppies to loving homes across Kolkata.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/breeds"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/40"
              >
                View Breeds & Prices <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`https://wa.me/${PHONE_INTL}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-500/30 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a
                href={`tel:+${PHONE_INTL}`}
                className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-7 py-3.5 font-semibold text-gold-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
              <Stars className="h-5 w-5" />
              <span>
                Trusted by <strong className="text-slate-900">500+ families</strong> · 228+ reviews
              </span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-gold-300/40 to-gold-500/20 blur-2xl" />
            <div className="animate-float overflow-hidden rounded-[2.5rem] bg-white p-2 shadow-2xl shadow-gold-500/30 ring-1 ring-gold-100">
              <img
                src="/breeds/Samoyed.webp"
                alt="Healthy, vaccinated puppy for sale in Kolkata"
                className="h-80 w-full rounded-[2rem] object-cover"
              />
            </div>
            <div className="animate-float-slow absolute -left-6 top-8 rounded-2xl bg-white px-4 py-3 shadow-xl ring-1 ring-slate-100">
              <p className="text-xs text-slate-500">Starting at</p>
              <p className="font-extrabold text-gold-600">₹12,000</p>
            </div>
            <div className="animate-float absolute -right-4 bottom-10 flex items-center gap-1.5 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl ring-1 ring-slate-100">
              <Syringe className="h-4 w-4 text-gold-600" /> Vaccinated
            </div>
          </div>
        </div>

      </section>

      {/* ===== Breeds scroller ===== */}
      <section className="relative overflow-hidden border-y border-gold-100 bg-white py-14">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative">
          <div className="mx-auto mb-9 flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Our Breeds</span>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">Browse 24 Available Breeds</h2>
            </div>
            <Link
              to="/breeds"
              className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-5 py-2.5 text-sm font-semibold text-gold-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50"
            >
              View all & prices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="flex w-max animate-marquee gap-5 px-1 py-8 group-hover:[animation-play-state:paused]">
              {[...breeds, ...breeds].map((b, i) => (
                <Link
                  key={i}
                  to={`/breeds/${b.slug}`}
                  aria-label={`${b.name} — ${b.price}`}
                  className="group/card relative w-48 shrink-0 overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-200/50 hover:ring-gold-200"
                >
                  <div className="relative h-36 overflow-hidden bg-gold-50">
                    <img
                      src={b.image}
                      alt={`${b.name} puppy for sale in Kolkata`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover/card:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/35 to-transparent" />
                    <span className="absolute bottom-2 left-2 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-gold-700 shadow">
                      {b.price}
                    </span>
                    {b.featured && (
                      <span className="absolute right-2 top-2 rounded-full bg-gold-600 px-2 py-0.5 text-[10px] font-semibold text-white shadow">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 px-4 py-3">
                    <h3 className="truncate text-sm font-bold text-slate-900 transition group-hover/card:text-gold-700">
                      {b.name}
                    </h3>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover/card:translate-x-0.5 group-hover/card:text-gold-600" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats — dark immersive band ===== */}
      <section className="relative overflow-hidden bg-stone-900">
        <div className="absolute inset-0 bg-dots-light" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[44rem] -translate-x-1/2 rounded-full bg-gold-500/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-4 py-16 md:grid-cols-4 md:divide-x md:divide-white/10">
          {stats.map((s) => (
            <Reveal key={s.label} className="px-4 text-center">
              <p className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-4xl font-extrabold text-transparent md:text-5xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-stone-300">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Featured breeds ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gold-50/60">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Our Puppies</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Featured Dog Breeds in Kolkata</h2>
            <p className="mt-3 text-slate-600">Our most-loved, vaccinated puppies — ready for their new homes.</p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((b, i) => (
              <Reveal key={b.name} delay={i * 100}>
                <Link
                  to={`/breeds/${b.slug}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-200/50 hover:ring-gold-200"
                >
                  <div className="relative h-48 overflow-hidden bg-gold-50">
                    <img
                      src={b.image}
                      alt={`${b.name} puppy for sale in Kolkata`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-gold-700 shadow">
                      {b.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <h3 className="font-bold text-slate-900 transition group-hover:text-gold-700">{b.name}</h3>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-gold-600" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/breeds"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              View All 24 Breeds & Prices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <Reveal className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Simple Process</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">How It Works</h2>
            <p className="mt-3 text-slate-600">Bringing home your new best friend is simple.</p>
          </Reveal>
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-8 hidden border-t-2 border-dashed border-gold-200 lg:block" />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 110}>
                <div className="relative rounded-3xl bg-white p-6 text-center shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-100/60">
                  <div className="relative mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 text-white shadow-lg shadow-gold-500/30">
                    <s.icon className="h-7 w-7" strokeWidth={1.75} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white ring-2 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why choose ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50/70 to-white">
        <div className="pointer-events-none absolute -left-16 top-1/3 h-72 w-72 rounded-full bg-gold-300/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Why Us</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Why Choose Premium Puppy</h2>
            <p className="mt-3 text-slate-600">A simple, trustworthy way to welcome a healthy puppy into your home.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 120}>
                <div className="accent-top group relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-100/60 hover:ring-gold-200">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 text-white shadow-md shadow-gold-500/30 transition group-hover:scale-110">
                    <r.icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEO content (two-column) ===== */}
      <section className="relative mx-auto max-w-6xl px-4 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-28 w-28 rounded-3xl bg-gold-200/60" />
              <div className="absolute -bottom-4 -right-4 h-28 w-28 rounded-3xl border-2 border-gold-200" />
              <div className="relative overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl shadow-gold-100/70 ring-1 ring-gold-100">
                <img
                  src="/breeds/golden-retriever-puppy.webp"
                  alt="Buy a healthy Golden Retriever puppy in Kolkata"
                  loading="lazy"
                  className="h-80 w-full rounded-[1.6rem] object-cover"
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">About Us</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Looking for a Trusted Dog Sale in Kolkata?
            </h2>
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-600">
              <p>
                Premium Puppy is your trusted destination to buy healthy puppies in
                Kolkata at the best price. From Labradors and Golden Retrievers to
                Pomeranians, Shih Tzus and German Shepherds, every puppy is
                vaccinated, health-screened and sourced from verified breeders.
              </p>
              <p>
                Compare dog prices, get expert guidance on the right breed for your
                home, and enjoy cash on delivery with doorstep delivery across
                Kolkata and nearby areas.
              </p>
            </div>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {['Best puppy prices in Kolkata', 'Vaccinated & health-screened', 'Verified, ethical breeders', 'Doorstep delivery + COD'].map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-[15px]">{h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
              <span className="font-medium text-slate-700">Delivering across Kolkata:</span>
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  to={`/locations/${a.slug}`}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 transition hover:bg-gold-100 hover:text-gold-700"
                >
                  {a.name}
                </Link>
              ))}
            </div>
            <Link
              to="/breeds"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Explore Breeds & Prices <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50/60 to-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Testimonials</span>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Loved by Families Across Kolkata</h2>
            <p className="mt-3 text-slate-600">228+ Google reviews from happy pet parents.</p>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl">
                  <Quote className="absolute -right-2 -top-2 h-20 w-20 text-gold-100" fill="currentColor" strokeWidth={0} />
                  <div className="relative">
                    <Stars className="h-4 w-4" />
                    <blockquote className="mt-3 text-sm leading-relaxed text-slate-600">“{t.text}”</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-500 font-bold text-white">
                        {t.name.charAt(0)}
                      </span>
                      <span className="font-semibold text-slate-900">{t.name}</span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-3xl px-4 py-20">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-600">FAQ</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-3 text-slate-600">Everything you need to know about buying a puppy in Kolkata.</p>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} {...f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
          ))}
        </div>
      </section>

      {/* ===== Final CTA band ===== */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-400 to-gold-600 px-6 py-14 text-center shadow-2xl shadow-gold-500/30">
          <div className="absolute inset-0 bg-dots-light opacity-60" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
          <h2 className="relative text-3xl font-bold text-white md:text-4xl">Ready to meet your new puppy?</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-gold-50">
            Message us on WhatsApp or call now to check availability, pricing and delivery in Kolkata.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${PHONE_INTL}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
            >
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
            </a>
            <a
              href={`tel:+${PHONE_INTL}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-gold-600 shadow-lg transition hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
