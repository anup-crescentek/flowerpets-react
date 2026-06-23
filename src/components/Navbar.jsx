import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Phone, MapPin, ShieldCheck, ChevronDown, Menu, X } from 'lucide-react'
import { breeds, PHONE, PHONE_INTL } from '../data/breeds.js'
import { locations } from '../data/locations.js'
import WhatsAppIcon from './WhatsAppIcon.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/breeds', label: 'Breeds', mega: 'breeds' },
  { to: '/services', label: 'Services' },
  { to: '/blog', label: 'Blog' },
  { to: '/locations', label: 'Areas We Serve', mega: 'locations' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const areaLocations = locations.filter((l) => l.type === 'Area')
const cityLocations = locations.filter((l) => l.type === 'City')

// Animated sliding-underline link style.
const linkClass = (active) =>
  `relative py-1 text-[15px] font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[2.5px] after:rounded-full after:bg-gradient-to-r after:from-gold-400 after:to-gold-600 after:transition-all after:duration-300 ${
    active
      ? 'text-gold-700 after:w-full'
      : 'text-slate-700 after:w-0 hover:text-gold-700 hover:after:w-full'
  }`

const panelClass = (open) =>
  `absolute inset-x-0 top-full hidden origin-top border-t border-gold-100 bg-white/97 shadow-xl backdrop-blur-lg transition-all duration-300 lg:block ${
    open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [mobileMega, setMobileMega] = useState(null)
  const [openMega, setOpenMega] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const timer = useRef()
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpenMega(null)
    setOpen(false)
    setMobileMega(null)
  }, [pathname])

  const showMega = (key) => {
    clearTimeout(timer.current)
    setOpenMega(key)
  }
  const hideMega = () => {
    timer.current = setTimeout(() => setOpenMega(null), 150)
  }

  return (
    <header
      onMouseLeave={hideMega}
      className={`sticky top-0 z-40 bg-white/95 backdrop-blur-lg transition-shadow duration-300 ${
        scrolled || openMega ? 'shadow-lg shadow-slate-200/60' : 'shadow-sm'
      }`}
    >
      {/* ===== Top utility bar (hides on scroll) ===== */}
      <div
        className={`overflow-hidden bg-gradient-to-r from-gold-400 to-gold-600 text-white transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs sm:text-sm">
          <div className="flex items-center gap-5">
            <a href={`tel:+${PHONE_INTL}`} className="flex items-center gap-1.5 font-medium hover:text-gold-100">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPin className="h-4 w-4" /> Kolkata, West Bengal
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-1.5 font-medium md:flex">
              <ShieldCheck className="h-4 w-4" /> Vaccinated Puppies · Cash on Delivery
            </span>
            <a
              href={`https://wa.me/${PHONE_INTL}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-medium hover:text-gold-100"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ===== Main bar ===== */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex shrink-0 items-center transition hover:opacity-90">
          <img src="/logo.png" alt="Premium Puppy — Dog Sale in Kolkata" className="h-14 w-auto sm:h-16" />
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {links.map((link) =>
            link.mega ? (
              <li key={link.to} onMouseEnter={() => showMega(link.mega)}>
                <NavLink
                  to={link.to}
                  onFocus={() => showMega(link.mega)}
                  aria-expanded={openMega === link.mega}
                  className={({ isActive }) => `flex items-center gap-1 ${linkClass(isActive || openMega === link.mega)}`}
                >
                  {link.label}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openMega === link.mega ? 'rotate-180' : ''}`} />
                </NavLink>
              </li>
            ) : (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === '/'} className={({ isActive }) => linkClass(isActive)}>
                  {link.label}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`tel:+${PHONE_INTL}`}
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/40 sm:inline-flex"
          >
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <button className="rounded-lg p-1 text-slate-700 lg:hidden" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </nav>

      {/* ===== Breeds mega menu ===== */}
      <div onMouseEnter={() => showMega('breeds')} onMouseLeave={hideMega} className={panelClass(openMega === 'breeds')}>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-extrabold text-slate-900">Browse by Breed</p>
              <p className="text-sm text-slate-500">24 breeds · all vaccinated &amp; health-screened</p>
            </div>
            <Link to="/breeds" className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-gold-500/30 transition hover:shadow-lg">
              View all & prices →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-4">
            {breeds.map((b, i) => (
              <Link
                key={b.slug}
                to={`/breeds/${b.slug}`}
                style={{ transitionDelay: openMega === 'breeds' ? `${i * 16}ms` : '0ms' }}
                className={`group/item flex items-center gap-3 rounded-xl p-2 transition-all duration-300 hover:bg-gold-50 ${openMega === 'breeds' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              >
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gold-100">
                  <img src={b.image} alt={b.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover/item:scale-110" />
                  {b.featured && <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-gold-500 ring-2 ring-white" />}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-slate-800 transition group-hover/item:text-gold-700">{b.name}</span>
                  <span className="block text-xs text-slate-500">{b.price}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Locations mega menu ===== */}
      <div onMouseEnter={() => showMega('locations')} onMouseLeave={hideMega} className={panelClass(openMega === 'locations')}>
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-extrabold text-slate-900">Areas We Serve</p>
              <p className="text-sm text-slate-500">Doorstep delivery across Kolkata &amp; West Bengal</p>
            </div>
            <Link to="/locations" className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-gold-500/30 transition hover:shadow-lg">
              View all areas →
            </Link>
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gold-600">Areas in &amp; around Kolkata</p>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-4">
            {areaLocations.map((l, i) => (
              <Link
                key={l.slug}
                to={`/locations/${l.slug}`}
                style={{ transitionDelay: openMega === 'locations' ? `${i * 14}ms` : '0ms' }}
                className={`group/item flex items-center gap-2.5 rounded-xl p-2 transition-all duration-300 hover:bg-gold-50 ${openMega === 'locations' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              >
                <MapPin className="h-4 w-4 shrink-0 text-gold-500" />
                <span className="truncate text-sm font-medium text-slate-700 transition group-hover/item:text-gold-700">{l.name}</span>
              </Link>
            ))}
          </div>

          <p className="mb-2 mt-4 text-xs font-bold uppercase tracking-wider text-gold-600">Cities across West Bengal</p>
          <div className="grid grid-cols-2 gap-1 md:grid-cols-3 xl:grid-cols-4">
            {cityLocations.map((l, i) => (
              <Link
                key={l.slug}
                to={`/locations/${l.slug}`}
                style={{ transitionDelay: openMega === 'locations' ? `${i * 14}ms` : '0ms' }}
                className={`group/item flex items-center gap-2.5 rounded-xl p-2 transition-all duration-300 hover:bg-gold-50 ${openMega === 'locations' ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              >
                <MapPin className="h-4 w-4 shrink-0 text-gold-500" />
                <span className="truncate text-sm font-medium text-slate-700 transition group-hover/item:text-gold-700">{l.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Mobile menu ===== */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-gold-100 bg-white px-4 py-3 lg:hidden">
          {links.map((link) =>
            link.mega ? (
              <li key={link.to}>
                <div className="flex items-center">
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex-1 rounded-lg px-3 py-2.5 font-semibold transition hover:bg-gold-50 ${isActive ? 'bg-gold-50 text-gold-700' : 'text-slate-700'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                  <button
                    aria-label={`Toggle ${link.label} list`}
                    onClick={() => setMobileMega((v) => (v === link.mega ? null : link.mega))}
                    className="ml-1 rounded-lg px-3 py-2.5 text-slate-500"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobileMega === link.mega ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {mobileMega === 'breeds' && link.mega === 'breeds' && (
                  <ul className="mb-1 ml-2 grid max-h-72 grid-cols-2 gap-1 overflow-y-auto border-l border-gold-100 pl-2">
                    {breeds.map((b) => (
                      <li key={b.slug}>
                        <Link to={`/breeds/${b.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gold-50">
                          <img src={b.image} alt={b.name} loading="lazy" className="h-8 w-8 shrink-0 rounded-md object-cover" />
                          <span className="truncate text-xs font-medium text-slate-700">{b.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {mobileMega === 'locations' && link.mega === 'locations' && (
                  <ul className="mb-1 ml-2 grid max-h-72 grid-cols-2 gap-1 overflow-y-auto border-l border-gold-100 pl-2">
                    {locations.map((l) => (
                      <li key={l.slug}>
                        <Link to={`/locations/${l.slug}`} onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg p-2 transition hover:bg-gold-50">
                          <MapPin className="h-4 w-4 shrink-0 text-gold-500" />
                          <span className="truncate text-xs font-medium text-slate-700">{l.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2.5 font-semibold transition hover:bg-gold-50 ${isActive ? 'bg-gold-50 text-gold-700' : 'text-slate-700'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ),
          )}
          <li>
            <a
              href={`tel:+${PHONE_INTL}`}
              className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-gold-400 to-gold-600 px-3 py-2.5 text-center font-bold text-white"
            >
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
