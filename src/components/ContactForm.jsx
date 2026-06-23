import { useState } from 'react'
import { PawPrint, Send } from 'lucide-react'
import { PHONE_INTL } from '../data/breeds.js'

// Reusable enquiry form. With no backend, submitting opens a pre-filled
// WhatsApp chat with the entered details so the lead actually reaches you.
// Pass `location` to pre-fill the message for a specific area.
export default function ContactForm({ location, className = '' }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    message: location ? `I'm interested in buying a puppy in ${location}.` : '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  function handleSubmit(e) {
    e.preventDefault()
    const text =
      `Hi Premium Puppy,\n` +
      `Name: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      (form.message ? `Message: ${form.message}` : '')
    window.open(`https://wa.me/${PHONE_INTL}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className={`flex h-full flex-col items-center justify-center gap-3 rounded-3xl border border-green-200 bg-green-50 p-8 text-center text-green-800 ${className}`}
      >
        <PawPrint className="h-8 w-8" />
        <p className="font-semibold">Thanks, {form.name || 'there'}! Your enquiry is on its way.</p>
        <p className="text-sm">
          We've opened WhatsApp so you can send it — or we'll reach out to you shortly.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 rounded-3xl border border-slate-100 bg-white p-7 shadow-sm ${className}`}
    >
      <input
        required
        type="text"
        value={form.name}
        onChange={update('name')}
        placeholder="Your name"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
      />
      <input
        required
        type="tel"
        value={form.phone}
        onChange={update('phone')}
        placeholder="Your phone number"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
      />
      <textarea
        required
        rows="4"
        value={form.message}
        onChange={update('message')}
        placeholder="Which breed are you interested in?"
        className="w-full rounded-xl border border-slate-200 px-4 py-3 transition focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        <Send className="h-4 w-4" /> Send Enquiry
      </button>
      <p className="text-center text-xs text-slate-400">Sends your details to us via WhatsApp.</p>
    </form>
  )
}
