import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Syringe, Handshake, Truck, Banknote, Check, Phone, PawPrint } from 'lucide-react'
import { breeds, getBreed, PHONE, PHONE_INTL } from '../data/breeds.js'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { useSeo } from '../lib/useSeo.js'

const trust = [
  { icon: Syringe, label: 'Vaccinated & health-screened' },
  { icon: Handshake, label: 'Verified breeders' },
  { icon: Truck, label: 'Doorstep delivery in Kolkata' },
  { icon: Banknote, label: 'Cash on delivery available' },
]

// Builds long-form, keyword-rich content from a breed's data.
function buildContent(b) {
  const n = b.name
  const tl = b.temperament.toLowerCase()
  const el = b.energy.toLowerCase()
  const highEnergy = el.includes('high') || el.includes('very')
  const lowEnergy = el.includes('low')

  const overview = [
    `The ${n} is a ${b.size.toLowerCase()} breed cherished for being ${tl}. ${b.description}`,
    `At Premium Puppy, every ${n} puppy we offer in Kolkata is raised with care, vaccinated and health-screened, and ready to become a loving part of your family.`,
  ]

  const temperament = `${n}s are ${tl} by nature, with a ${el} energy level. They typically bond closely with their families and respond well to early socialisation and positive, reward-based training. ${
    highEnergy
      ? 'Daily exercise, walks and play keep them happy, healthy and well-behaved.'
      : lowEnergy
        ? 'A short daily walk and some indoor play are usually enough to keep them content, which makes them well suited to apartment living in Kolkata.'
        : 'A moderate daily walk and regular play keep them balanced and content.'
  }`

  const care = `Caring for a ${n} is straightforward once you know what to expect. As a ${b.size.toLowerCase()} breed they need ${
    highEnergy ? 'plenty of activity and space to burn off energy' : 'a sensible amount of daily exercise'
  }, a balanced diet suited to their age and size, and regular grooming to keep their coat clean and healthy. Routine vet check-ups and up-to-date vaccinations help your ${n} enjoy a long, healthy life of around ${b.lifespan}.`

  const suitability = `Wondering whether a ${n} is the right dog for you? With their ${tl} temperament, ${n}s make wonderful companions for the right home. ${
    lowEnergy
      ? 'Their calm nature suits first-time owners, seniors and apartment families alike.'
      : highEnergy
        ? 'They are happiest with active owners or families who can give them daily exercise and attention.'
        : 'They adapt well to most households, from families with children to couples and individuals.'
  } With proper care, training and affection, the ${n} rewards you with years of loyal companionship.`

  const priceInfo =
    b.price === 'Enquire'
      ? `${n} puppy prices in Kolkata vary depending on the puppy's age, lineage, coat and availability. Contact us on WhatsApp or call ${PHONE} for the latest ${n} price and current availability.`
      : `${n} puppy prices in Kolkata typically range around ${b.price} at Premium Puppy. The exact price can vary depending on the puppy's age, lineage, coat quality and availability.`

  const highlights = [
    `Size: ${b.size}`,
    `Temperament: ${b.temperament}`,
    `Lifespan: ${b.lifespan}`,
    `Energy level: ${b.energy}`,
    'Vaccinated & health-screened before delivery',
    'Available across Kolkata with cash on delivery',
  ]

  const faqs = [
    {
      q: `What is the price of a ${n} puppy in Kolkata?`,
      a:
        b.price === 'Enquire'
          ? `${n} puppy prices in Kolkata depend on age, lineage and availability. Call us at ${PHONE} or message us on WhatsApp for today's price.`
          : `At Premium Puppy, ${n} puppies in Kolkata are priced at ${b.price}. The final price depends on the puppy's age, lineage and coat. Contact us to confirm current availability.`,
    },
    {
      q: `Are your ${n} puppies vaccinated and healthy?`,
      a: `Yes. Every ${n} puppy is vaccinated and health-screened before it goes to its new home, and comes from a trusted, verified breeder.`,
    },
    {
      q: `Is the ${n} a good family dog?`,
      a: `${n}s are ${tl}, which makes them ${lowEnergy ? 'gentle, easygoing companions ideal for families and apartments' : highEnergy ? 'energetic, affectionate companions that thrive in active families' : 'friendly, adaptable companions for most families'}. Early training and socialisation help them settle in beautifully.`,
    },
    {
      q: `How big does a ${n} get and how long does it live?`,
      a: `The ${n} is a ${b.size.toLowerCase()} breed with a typical lifespan of around ${b.lifespan}. With good nutrition, exercise and regular vet care they stay healthy for years.`,
    },
    {
      q: `Do you deliver ${n} puppies across Kolkata?`,
      a: `Yes — we offer doorstep delivery across Kolkata and surrounding regions, with cash on delivery available for your peace of mind.`,
    },
  ]

  return { overview, temperament, care, suitability, priceInfo, highlights, faqs }
}

function Section({ title, children }) {
  return (
    <Reveal className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
      <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-slate-600">{children}</div>
    </Reveal>
  )
}

export default function BreedDetail() {
  const { slug } = useParams()
  const breed = getBreed(slug)

  const content = useMemo(() => (breed ? buildContent(breed) : null), [breed])

  const jsonLd = useMemo(() => {
    if (!breed) return null
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const minPrice = (breed.price.match(/[\d,]+/) || [])[0]?.replace(/,/g, '')
    const product = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${breed.name} Puppy`,
      image: origin + breed.image,
      description: breed.description,
      brand: { '@type': 'Brand', name: 'Premium Puppy' },
      ...(minPrice
        ? {
            offers: {
              '@type': 'Offer',
              priceCurrency: 'INR',
              price: minPrice,
              availability: 'https://schema.org/InStock',
              areaServed: 'Kolkata',
            },
          }
        : {}),
    }
    const faqPage = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (content?.faqs || []).map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    }
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Breeds', item: origin + '/breeds' },
        { '@type': 'ListItem', position: 3, name: breed.name, item: origin + '/breeds/' + breed.slug },
      ],
    }
    return [product, faqPage, breadcrumb]
  }, [breed, content])

  useSeo({
    title: breed
      ? `${breed.name} Puppies for Sale in Kolkata | Price & Info — Premium Puppy`
      : 'Breed Not Found — Premium Puppy',
    description: breed
      ? `Buy a healthy, vaccinated ${breed.name} puppy in Kolkata${
          breed.price === 'Enquire' ? '' : ` at ${breed.price}`
        }. Verified breeders, cash on delivery and doorstep delivery across Kolkata. Call ${PHONE}.`
      : undefined,
    jsonLd,
  })

  if (!breed) {
    return (
      <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-24 text-center">
        <PawPrint className="h-16 w-16 text-gold-400" />
        <h1 className="text-3xl font-extrabold text-slate-900">Breed not found</h1>
        <p className="text-slate-600">We couldn't find that breed. Browse all available breeds instead.</p>
        <Link
          to="/breeds"
          className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5"
        >
          View All Breeds
        </Link>
      </section>
    )
  }

  const facts = [
    { label: 'Size', value: breed.size },
    { label: 'Temperament', value: breed.temperament },
    { label: 'Lifespan', value: breed.lifespan },
    { label: 'Energy', value: breed.energy },
  ]

  const related = breeds.filter((b) => b.slug !== breed.slug).slice(0, 4)
  const waLink = `https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
    `Hi, I'm interested in a ${breed.name} puppy.`,
  )}`

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gold-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-gold-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/breeds" className="hover:text-gold-600">Breeds</Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-slate-700">{breed.name}</span>
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-2 shadow-xl shadow-gold-100/60">
                <img
                  src={breed.image}
                  alt={`${breed.name} puppy for sale in Kolkata`}
                  className="h-[22rem] w-full rounded-[1.6rem] object-cover md:h-[28rem]"
                />
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                {breed.featured && (
                  <span className="inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
                    Popular Breed
                  </span>
                )}
                <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
                  {breed.name} Puppies for Sale in Kolkata
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">{breed.description}</p>

                <div className="mt-6 flex items-center gap-3">
                  <span className="text-sm text-slate-500">Price in Kolkata</span>
                  <span className="rounded-full bg-gold-50 px-4 py-1.5 text-lg font-bold text-gold-600">
                    {breed.price}
                  </span>
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-3">
                  {facts.map((f) => (
                    <div key={f.label} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                      <dt className="text-xs uppercase tracking-wide text-slate-400">{f.label}</dt>
                      <dd className="mt-1 font-semibold text-slate-900">{f.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 font-semibold text-white shadow-lg shadow-green-500/30 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={`tel:+${PHONE_INTL}`}
                    className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-8 py-3.5 font-semibold text-gold-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-gold-50"
                  >
                    <Phone className="h-5 w-5" /> Call {PHONE}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Long-form content */}
      <article className="mx-auto max-w-3xl px-4 py-12">
        <Section title={`About the ${breed.name}`}>
          {content.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Section>

        <Reveal className="mt-8">
          <ul className="grid gap-2.5 rounded-3xl border border-gold-100 bg-gold-50/50 p-6 sm:grid-cols-2">
            {content.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-slate-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[15px]">{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Section title={`${breed.name} Temperament & Personality`}>
          <p>{content.temperament}</p>
        </Section>

        <Section title="Care, Grooming & Exercise">
          <p>{content.care}</p>
        </Section>

        <Section title={`Is a ${breed.name} Right for Your Home?`}>
          <p>{content.suitability}</p>
        </Section>

        <Section title={`${breed.name} Price in Kolkata`}>
          <p>{content.priceInfo}</p>
          <p>
            All prices include vaccinated, health-screened puppies, and we offer cash on delivery
            with doorstep delivery across Kolkata and surrounding areas.
          </p>
        </Section>

        {/* Why buy */}
        <Reveal className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Why Buy Your {breed.name} from Premium Puppy
          </h2>
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
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            {breed.name} Puppies — Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-4">
            {content.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Inline CTA */}
        <Reveal className="mt-12">
          <div className="rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 p-8 text-center shadow-xl shadow-gold-500/30">
            <h2 className="text-2xl font-bold text-white">Interested in a {breed.name} puppy?</h2>
            <p className="mx-auto mt-2 max-w-md text-gold-50">
              Message us on WhatsApp or call to check availability, price and delivery in Kolkata.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-green-600 shadow-lg transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp Us
              </a>
              <a
                href={`tel:+${PHONE_INTL}`}
                className="inline-flex items-center gap-2 rounded-full bg-gold-700/30 px-8 py-3.5 font-semibold text-white ring-1 ring-white/40 transition hover:-translate-y-0.5"
              >
                <Phone className="h-5 w-5" /> Call {PHONE}
              </a>
            </div>
          </div>
        </Reveal>
      </article>

      {/* Related breeds */}
      <section className="bg-gradient-to-b from-white to-gold-50/60">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">You May Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b, i) => (
              <Reveal key={b.slug} delay={i * 90}>
                <Link
                  to={`/breeds/${b.slug}`}
                  className="group block overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-100/60"
                >
                  <div className="h-40 overflow-hidden bg-gold-50">
                    <img
                      src={b.image}
                      alt={`${b.name} puppy`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-slate-900">{b.name}</h3>
                    <p className="mt-1.5 inline-block rounded-full bg-gold-50 px-3 py-1 text-sm font-bold text-gold-600">
                      {b.price}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
