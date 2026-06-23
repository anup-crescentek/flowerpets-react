import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { PHONE, PHONE_INTL } from '../data/breeds.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-4 inline-block rounded-2xl bg-white p-3 shadow-sm">
            <img src="/logo.png" alt="Premium Puppy" className="h-9 w-auto" />
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            Bringing healthy puppies to loving homes across Kolkata.
          </p>
        </div>

        <div>
          <p className="mb-4 font-semibold text-white">Quick Links</p>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="transition hover:text-gold-400">About</Link></li>
            <li><Link to="/services" className="transition hover:text-gold-400">Services</Link></li>
            <li><Link to="/breeds" className="transition hover:text-gold-400">Breeds &amp; Prices</Link></li>
            <li><Link to="/blog" className="transition hover:text-gold-400">Blog</Link></li>
            <li><Link to="/locations" className="transition hover:text-gold-400">Areas We Serve</Link></li>
            <li><Link to="/faq" className="transition hover:text-gold-400">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-semibold text-white">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={`tel:+${PHONE_INTL}`} className="inline-flex items-center gap-2 transition hover:text-gold-400">
                <Phone className="h-4 w-4" /> {PHONE}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${PHONE_INTL}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition hover:text-gold-400"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2 text-stone-400">
              <MapPin className="h-4 w-4" /> Kolkata, West Bengal, India
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-semibold text-white">Follow Us</p>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="transition hover:text-gold-400">Facebook</a></li>
            <li><a href="#" className="transition hover:text-gold-400">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800 py-5 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} Premium Puppy · Kolkata, India
      </div>
    </footer>
  )
}
