import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  MapPin,
  Phone,
  Syringe,
  Handshake,
  Truck,
  Banknote,
  Check,
  ChevronDown,
  ArrowRight,
} from 'lucide-react'
import { locations, getLocation } from '../data/locations.js'
import { breeds, PHONE, PHONE_INTL } from '../data/breeds.js'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import ContactForm from '../components/ContactForm.jsx'
import { useSeo } from '../lib/useSeo.js'

const trust = [
  { icon: Syringe, label: 'Vaccinated & health-screened puppies' },
  { icon: Handshake, label: 'Trusted, verified breeders' },
  { icon: Truck, label: 'Doorstep delivery to your area' },
  { icon: Banknote, label: 'Cash on delivery available' },
]

function buildContent(loc) {
  const n = loc.name
  const wide = loc.type === 'City' ? 'West Bengal' : 'Kolkata'

  const intro = `Looking to buy a healthy puppy in ${n}? Premium Puppy brings vaccinated, ethically-bred puppies to ${n} and across ${wide} — with the best prices, verified breeders and convenient doorstep delivery.`

  const sections = [
    {
      heading: `Buy a Healthy Puppy in ${n}`,
      body: [
        `Whether you live in ${n} or a nearby neighbourhood, Premium Puppy makes it simple to find your perfect companion. We offer 24 popular breeds — each vaccinated and health-screened — with transparent pricing and friendly guidance to help you choose the right dog for your home.`,
      ],
    },
    {
      heading: `Popular Dog Breeds in ${n}`,
      body: [
        `Families in ${n} love friendly breeds like the Labrador Retriever and Golden Retriever, compact companions such as the Pomeranian and Shih Tzu, and loyal guardians like the German Shepherd. Browse all 24 breeds with prices to find the one that fits your lifestyle.`,
      ],
    },
    {
      heading: `Puppy Prices in ${n}`,
      body: [
        `Puppy prices in ${n} are the same transparent rates we offer across the region — for example, Labrador puppies start around ₹12,000, with other breeds priced according to age and lineage. Contact us on WhatsApp or call ${PHONE} for the latest prices and availability in ${n}.`,
      ],
    },
    {
      heading: `Puppy Delivery in ${n}`,
      body: [
        `We provide safe doorstep delivery to ${n} and surrounding areas, with cash on delivery available for your peace of mind. Your vaccinated puppy arrives healthy, happy and ready to become part of your family.`,
      ],
    },
  ]

  const faqs = [
    {
      q: `Do you deliver puppies to ${n}?`,
      a: `Yes — we offer doorstep delivery to ${n} and nearby areas, with cash on delivery available.`,
    },
    {
      q: `What is the price of a puppy in ${n}?`,
      a: `Prices vary by breed. Labradors start around ₹12,000, while other breeds are priced by age and lineage. Call ${PHONE} or message us on WhatsApp for current prices in ${n}.`,
    },
    {
      q: `Are the puppies in ${n} vaccinated?`,
      a: `Absolutely. Every puppy is vaccinated and health-screened before delivery, and comes from a trusted, verified breeder.`,
    },
    {
      q: `Which dog breeds are available in ${n}?`,
      a: `We offer 24 breeds in ${n}, from Labradors and Golden Retrievers to Pomeranians, Shih Tzus, German Shepherds and more. See the Breeds & Prices page for the full list.`,
    },
  ]

  return { intro, sections, faqs }
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${open ? 'border-gold-200 shadow-lg shadow-gold-100/60' : 'border-slate-100'}`}>
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900">
        {q}
        <ChevronDown className={`h-5 w-5 shrink-0 text-gold-600 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <p className="overflow-hidden px-6 pb-5 text-slate-600">{a}</p>
      </div>
    </div>
  )
}

export default function LocationDetail() {
  const { slug } = useParams()
  const loc = getLocation(slug)
  const [openFaq, setOpenFaq] = useState(0)

  const content = useMemo(() => (loc ? buildContent(loc) : null), [loc])

  const jsonLd = useMemo(() => {
    if (!loc) return null
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'PetStore',
        name: `Premium Puppy — Dog Sale in ${loc.name}`,
        image: origin + '/logo.png',
        url: origin + '/locations/' + loc.slug,
        telephone: '+' + PHONE_INTL,
        priceRange: '₹₹',
        areaServed: `${loc.name}, West Bengal, India`,
        address: { '@type': 'PostalAddress', addressLocality: loc.name, addressRegion: 'West Bengal', addressCountry: 'IN' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '228' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (content?.faqs || []).map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Locations', item: origin + '/locations' },
          { '@type': 'ListItem', position: 3, name: loc.name, item: origin + '/locations/' + loc.slug },
        ],
      },
    ]
  }, [loc, content])

  useSeo({
    title: loc
      ? `Dog Sale in ${loc.name} | Buy Healthy Vaccinated Puppies — Premium Puppy`
      : 'Location Not Found — Premium Puppy',
    description: loc
      ? `Buy healthy, vaccinated puppies in ${loc.name} at the best price. 24 breeds, verified breeders, cash on delivery and doorstep delivery in ${loc.name}. Call ${PHONE}.`
      : undefined,
    jsonLd,
  })

  if (!loc) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
        <MapPin className="h-16 w-16 text-gold-400" />
        <h1 className="text-3xl font-extrabold text-slate-900">Location not found</h1>
        <p className="text-slate-600">We couldn't find that location. See all the areas we serve.</p>
        <Link to="/locations" className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5">
          View All Locations
        </Link>
      </section>
    )
  }

  const featured = breeds.filter((b) => b.featured)
  const nearby = locations.filter((l) => l.slug !== loc.slug && l.type === loc.type).slice(0, 6)
  const waLink = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(`Hi, I'm interested in buying a puppy in ${loc.name}.`)}`

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/locations" className="hover:text-gold-700">Locations</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-700">{loc.name}</span>
          </nav>

          <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-white px-4 py-1.5 text-sm font-medium text-gold-800 shadow-sm">
                <MapPin className="h-4 w-4" /> Serving {loc.name}, {loc.type === 'City' ? 'West Bengal' : 'Kolkata'}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                Dog Sale in {loc.name} —{' '}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Buy Healthy Puppies
                </span>
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{content.intro}</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white shadow-lg shadow-green-500/30 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Enquire on WhatsApp
                </a>
                <a
                  href={`tel:+${PHONE_INTL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-7 py-3.5 font-semibold text-gold-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50"
                >
                  <Phone className="h-4 w-4" /> Call {PHONE}
                </a>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-gold-300/40 to-gold-500/20 blur-2xl" />
                <div className="overflow-hidden rounded-[2rem] bg-white p-2 shadow-2xl shadow-gold-500/30 ring-1 ring-gold-100">
                  <img
                    src="/breeds/golden-retriever-puppy.webp"
                    alt={`Buy a healthy puppy in ${loc.name}`}
                    className="h-72 w-full rounded-[1.6rem] object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-4 py-12">
        {content.sections.map((s) => (
          <Reveal key={s.heading} className="mt-10 first:mt-0">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{s.heading}</h2>
            <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-slate-600">
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}

        {/* Why choose */}
        <Reveal className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Why Buy from Premium Puppy in {loc.name}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                  <t.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium text-slate-700">{t.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* FAQ */}
        <Reveal className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Buying a Puppy in {loc.name} — FAQs</h2>
          <div className="mt-5 space-y-4">
            {content.faqs.map((f, i) => (
              <FaqItem key={f.q} {...f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </article>

      {/* Featured breeds */}
      <section className="bg-gradient-to-b from-white to-gold-50/60">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Reveal className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Popular Breeds Available in {loc.name}</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((b) => (
              <Link
                key={b.slug}
                to={`/breeds/${b.slug}`}
                className="group block overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold-200"
              >
                <div className="h-36 overflow-hidden bg-gold-50">
                  <img src={b.image} alt={`${b.name} puppy in ${loc.name}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold text-slate-900 transition group-hover:text-gold-700">{b.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-gold-600">{b.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/breeds" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl">
              View All 24 Breeds & Prices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dots opacity-50" />
        <div className="relative mx-auto max-w-5xl px-4 py-16">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Enquire Now</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                Request a Puppy in {loc.name}
              </h2>
              <p className="mt-3 text-slate-600">
                Send us your details and the breed you're after. We'll confirm
                availability, price and delivery to {loc.name} — usually within a few hours.
              </p>
              <ul className="mt-5 space-y-2.5">
                {['Vaccinated & health-screened puppies', `Doorstep delivery to ${loc.name}`, 'Cash on delivery available'].map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-[15px]">{h}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <ContactForm location={loc.name} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Nearby locations */}
      {nearby.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">We Also Serve</h2>
          <div className="flex flex-wrap gap-3">
            {nearby.map((l) => (
              <Link
                key={l.slug}
                to={`/locations/${l.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:border-gold-300 hover:text-gold-700"
              >
                <MapPin className="h-4 w-4 text-gold-500" /> {l.name}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-400 to-gold-600 px-6 py-14 text-center shadow-2xl shadow-gold-500/30">
          <div className="absolute inset-0 bg-dots-light opacity-60" />
          <h2 className="relative text-3xl font-bold text-white md:text-4xl">Buy Your Puppy in {loc.name} Today</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-gold-50">
            Message us on WhatsApp or call to check availability, price and delivery to {loc.name}.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]">
              <WhatsAppIcon className="h-5 w-5" /> WhatsApp Us
            </a>
            <a href={`tel:+${PHONE_INTL}`} className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-gold-600 shadow-lg transition hover:-translate-y-0.5">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
