import { Link } from 'react-router-dom'
import { breeds, PHONE, PHONE_INTL } from '../data/breeds.js'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import { useSeo } from '../lib/useSeo.js'

function PageHeader({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
      <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600">{subtitle}</p>
      </div>
    </section>
  )
}

export default function Breeds() {
  useSeo({
    title: 'Dog Breeds & Prices in Kolkata — Buy Healthy Puppies | Premium Puppy',
    description:
      'Browse 24 dog breeds for sale in Kolkata with prices — Labrador, Golden Retriever, German Shepherd, Husky and more. Vaccinated puppies, verified breeders, cash on delivery.',
  })

  return (
    <>
      <PageHeader
        title="Dog Breeds & Prices in Kolkata"
        subtitle="24 breeds available — all vaccinated and health-screened. Prices marked “Enquire” are confirmed over a call or WhatsApp."
      />

      <section className="mx-auto max-w-3xl px-4 pt-12">
        <Reveal>
          <div className="space-y-4 text-[17px] leading-relaxed text-slate-600">
            <p>
              Looking to buy a puppy in Kolkata? At Premium Puppy we offer a wide
              range of popular dog breeds — from family favourites like the{' '}
              <Link to="/breeds/labrador-retriever" className="font-medium text-gold-600 hover:underline">Labrador Retriever</Link>{' '}
              and{' '}
              <Link to="/breeds/golden-retriever" className="font-medium text-gold-600 hover:underline">Golden Retriever</Link>{' '}
              to guardians like the{' '}
              <Link to="/breeds/german-shepherd" className="font-medium text-gold-600 hover:underline">German Shepherd</Link>{' '}
              and small companions like the{' '}
              <Link to="/breeds/pomeranian" className="font-medium text-gold-600 hover:underline">Pomeranian</Link>{' '}
              and{' '}
              <Link to="/breeds/shih-tzu" className="font-medium text-gold-600 hover:underline">Shih Tzu</Link>.
            </p>
            <p>
              Every puppy is vaccinated and health-screened, sourced from trusted,
              verified breeders, and comes with cash on delivery and doorstep
              delivery across Kolkata. Tap any breed below to see detailed info,
              temperament, care tips and current price.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {breeds.map((b, i) => (
            <Reveal key={b.name} delay={(i % 3) * 90}>
              <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-gold-100/60">
                <Link to={`/breeds/${b.slug}`} className="relative block h-52 overflow-hidden bg-gold-50">
                  <img
                    src={b.image}
                    alt={`${b.name} puppy for sale in Kolkata`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {b.featured && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold-600 px-3 py-1 text-xs font-semibold text-white shadow">
                      Popular
                    </span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <Link to={`/breeds/${b.slug}`}>
                    <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-gold-600">
                      {b.name}
                    </h3>
                  </Link>
                  <p className="mt-1.5 inline-block w-fit rounded-full bg-gold-50 px-3 py-1 text-sm font-bold text-gold-600">
                    {b.price}
                  </p>
                  <div className="mt-5 flex gap-2">
                    <Link
                      to={`/breeds/${b.slug}`}
                      className="flex-1 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 py-2.5 text-center font-semibold text-white shadow-md shadow-gold-500/30 transition hover:shadow-lg"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(
                        `Hi, I'm interested in a ${b.name} puppy.`,
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Enquire about ${b.name} on WhatsApp`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md shadow-green-500/30 transition hover:bg-[#1ebe5d]"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing SEO content */}
      <section className="bg-gradient-to-b from-white to-gold-50/60">
        <article className="mx-auto max-w-3xl px-4 py-16">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Buying a Healthy Puppy in Kolkata
            </h2>
            <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-slate-600">
              <p>
                Choosing the right breed is the first step to a happy life together.
                Larger, active breeds such as the Labrador, Golden Retriever and
                Siberian Husky thrive with space and daily exercise, while smaller
                companions like the Pug, Maltese and Yorkshire Terrier are
                well-suited to apartment living in Kolkata.
              </p>
              <p>
                Whichever breed you choose, every Premium Puppy comes vaccinated and
                health-screened from a verified breeder, with transparent pricing
                and doorstep delivery. Not sure which breed fits your home? Call us
                at{' '}
                <a href={`tel:+${PHONE_INTL}`} className="font-medium text-gold-600 hover:underline">
                  {PHONE}
                </a>{' '}
                or message us on WhatsApp and we'll help you find your perfect match.
              </p>
            </div>
          </Reveal>
        </article>
      </section>
    </>
  )
}
