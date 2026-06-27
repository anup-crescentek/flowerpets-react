import { Link } from 'react-router-dom'
import { Phone, MapPin, Clock, ShieldCheck, Truck, Banknote, ArrowRight } from 'lucide-react'
import { breeds, PHONE, PHONE_INTL } from '../data/breeds.js'
import { locations } from '../data/locations.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'
import { Facebook, Instagram, Youtube } from './SocialIcons.jsx'

const footerBreeds = breeds.slice(0, 6)
const footerAreas = locations.filter((l) => l.type === 'Area').slice(0, 6)

const trust = [
  { icon: ShieldCheck, title: '100% Vaccinated', sub: 'Health-screened puppies' },
  { icon: Truck, title: 'Doorstep Delivery', sub: 'Across Kolkata & WB' },
  { icon: Banknote, title: 'Cash on Delivery', sub: 'Pay when it arrives' },
  { icon: Phone, title: 'Call 8013988082', sub: '500+ happy families' },
]

function ColTitle({ children }) {
  return (
    <h3 className="relative mb-5 inline-block font-semibold text-white">
      {children}
      <span className="absolute -bottom-1.5 left-0 h-0.5 w-8 rounded-full bg-gold-500" />
    </h3>
  )
}

const linkCls =
  'group inline-flex items-center gap-1.5 text-sm text-stone-300 transition hover:text-gold-400'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* gold top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />

      {/* trust bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-7 md:grid-cols-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gold-400 ring-1 ring-white/10">
                <t.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">{t.title}</span>
                <span className="block text-xs text-stone-400">{t.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* main columns */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-6">
        {/* Brand */}
        <div className="lg:col-span-2">
          <div className="mb-4 inline-block rounded-2xl bg-white p-3 shadow-sm">
            <img src="/logo.png" alt="Premium Puppy — Dog Sale in Kolkata" className="h-9 w-auto" />
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-stone-400">
            Premium Puppy is Kolkata’s trusted destination to buy healthy, vaccinated
            puppies at the best price — from verified breeders, with doorstep delivery
            across Kolkata and West Bengal.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-stone-300">
            <span className="text-gold-400">★★★★★</span>
            <span>Rated 4.9 by 228+ families</span>
          </div>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-stone-300 ring-1 ring-white/10 transition hover:bg-gold-500 hover:text-white">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-stone-300 ring-1 ring-white/10 transition hover:bg-gold-500 hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-stone-300 ring-1 ring-white/10 transition hover:bg-gold-500 hover:text-white">
              <Youtube className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/${PHONE_INTL}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-stone-300 ring-1 ring-white/10 transition hover:bg-[#25D366] hover:text-white">
              <WhatsAppIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Popular Breeds */}
        <div>
          <ColTitle>Popular Breeds</ColTitle>
          <ul className="space-y-2.5">
            {footerBreeds.map((b) => (
              <li key={b.slug}>
                <Link to={`/breeds/${b.slug}`} className={linkCls}>
                  {b.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/breeds" className="inline-flex items-center gap-1 text-sm font-medium text-gold-400 hover:underline">
                All breeds <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Areas We Serve */}
        <div>
          <ColTitle>Areas We Serve</ColTitle>
          <ul className="space-y-2.5">
            {footerAreas.map((l) => (
              <li key={l.slug}>
                <Link to={`/locations/${l.slug}`} className={linkCls}>
                  Puppies in {l.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/locations" className="inline-flex items-center gap-1 text-sm font-medium text-gold-400 hover:underline">
                All areas <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <ColTitle>Company</ColTitle>
          <ul className="space-y-2.5">
            <li><Link to="/about" className={linkCls}>About Us</Link></li>
            <li><Link to="/services" className={linkCls}>Services</Link></li>
            <li><Link to="/blog" className={linkCls}>Blog</Link></li>
            <li><Link to="/faq" className={linkCls}>FAQ</Link></li>
            <li><Link to="/contact" className={linkCls}>Contact</Link></li>
          </ul>
        </div>

        {/* Get in touch */}
        <div>
          <ColTitle>Get in Touch</ColTitle>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:+${PHONE_INTL}`} className="flex items-start gap-2.5 text-stone-300 transition hover:text-gold-400">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> {PHONE}
              </a>
            </li>
            <li>
              <a href={`https://wa.me/${PHONE_INTL}`} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 text-stone-300 transition hover:text-gold-400">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" /> WhatsApp Us
              </a>
            </li>
            <li className="flex items-start gap-2.5 text-stone-400">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> Kolkata, West Bengal, India
            </li>
            <li className="flex items-start gap-2.5 text-stone-400">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" /> Open all 7 days · 9 AM – 9 PM
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-stone-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Premium Puppy · Kolkata, India. All rights reserved.</p>
          <p>Dog Sale in Kolkata — Healthy, Vaccinated Puppies 🐾</p>
        </div>
      </div>
    </footer>
  )
}
