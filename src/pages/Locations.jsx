import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'
import { locations } from '../data/locations.js'
import Reveal from '../components/Reveal.jsx'
import { useSeo } from '../lib/useSeo.js'

function LocationCard({ loc }) {
  return (
    <Link
      to={`/locations/${loc.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold-100/60 hover:ring-gold-200"
    >
      <div className="relative flex h-24 items-center gap-3 bg-gradient-to-br from-gold-400 to-gold-600 px-5">
        <span className="absolute inset-0 bg-dots-light opacity-60" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20 text-white ring-1 ring-white/30">
          <MapPin className="h-6 w-6" />
        </span>
        <span className="relative">
          <span className="block text-lg font-bold text-white">{loc.name}</span>
          <span className="text-xs text-gold-50">{loc.type === 'City' ? 'West Bengal' : 'Kolkata'}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm leading-relaxed text-slate-600">{loc.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-700">
          View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}

export default function Locations() {
  useSeo({
    title: 'Dog Sale Locations — Puppies in Kolkata & Across West Bengal | Premium Puppy',
    description:
      'Premium Puppy delivers healthy, vaccinated puppies across Kolkata and West Bengal — Salt Lake, New Town, Howrah, Durgapur, Siliguri and more. Find your area and buy a puppy today.',
  })

  const areas = locations.filter((l) => l.type === 'Area')
  const cities = locations.filter((l) => l.type === 'City')

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="absolute inset-0 bg-dots opacity-60" />
        <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-gold-600">Areas We Serve</span>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Buy Puppies Across Kolkata & West Bengal
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Healthy, vaccinated puppies with doorstep delivery and cash on delivery.
            Choose your area below to learn more.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Areas in & around Kolkata</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((loc, i) => (
            <Reveal key={loc.slug} delay={(i % 3) * 80}>
              <LocationCard loc={loc} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mb-6 mt-16">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Cities across West Bengal</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((loc, i) => (
            <Reveal key={loc.slug} delay={(i % 3) * 80}>
              <LocationCard loc={loc} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
