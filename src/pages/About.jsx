import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const points = [
  { value: '500+', label: 'Happy Families' },
  { value: '228+', label: 'Google Reviews' },
  { value: '24', label: 'Breeds Available' },
]

const highlights = [
  'Trusted, verified breeders',
  'Vaccinated & health-screened puppies',
  'Cash on delivery available',
  'Doorstep delivery across Kolkata',
]

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">About Premium Puppy</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Bringing healthy puppies to loving homes across Kolkata.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <div className="space-y-4 text-lg leading-relaxed text-slate-600">
            <p>
              Premium Puppy makes it simple to buy a healthy, vaccinated puppy at
              the best price — with affordable pricing, verified breeders and
              seamless home delivery.
            </p>
            <p>
              We work directly with trusted, verified breeders, and every puppy is
              vaccinated and health-screened before it goes to its new home. With
              cash on delivery and doorstep delivery across Kolkata and surrounding
              regions, getting your new family member home has never been easier.
            </p>
            <p>
              Over 500 happy families and 228+ Google reviews trust Premium Puppy
              to help them find the right companion.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <li
                key={h}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-slate-700 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-10 grid grid-cols-3 gap-4 rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 p-8 text-center shadow-xl shadow-gold-500/30">
            {points.map((p) => (
              <div key={p.label}>
                <p className="text-2xl font-extrabold text-white md:text-3xl">{p.value}</p>
                <p className="mt-1 text-sm text-gold-50">{p.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <Link
            to="/breeds"
            className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore Breeds & Prices
          </Link>
        </div>
      </section>
    </>
  )
}
