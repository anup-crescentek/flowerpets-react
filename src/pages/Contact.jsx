import { Phone, MapPin } from 'lucide-react'
import { PHONE, PHONE_INTL } from '../data/breeds.js'
import Reveal from '../components/Reveal.jsx'
import WhatsAppIcon from '../components/WhatsAppIcon.jsx'
import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Questions about a breed, price or delivery? Call, WhatsApp or send a message.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact details */}
          <Reveal className="space-y-4">
            <a
              href={`tel:+${PHONE_INTL}`}
              className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 text-white shadow-md shadow-gold-500/30">
                <Phone className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold text-slate-900">Call us</span>
                <span className="text-gold-600">{PHONE}</span>
              </span>
            </a>
            <a
              href={`https://wa.me/${PHONE_INTL}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-md shadow-green-500/30">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold text-slate-900">WhatsApp</span>
                <span className="text-green-600">Chat with us</span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <MapPin className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-bold text-slate-900">Location</span>
                <span className="text-slate-600">Kolkata, West Bengal, India</span>
              </span>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
