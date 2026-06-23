import { Dog, Handshake, Truck, Syringe, ClipboardList, MessageCircle } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'

const services = [
  {
    icon: Dog,
    title: 'Healthy Puppy Sales',
    text: 'A wide selection of popular breeds, each vaccinated and health-screened before going home.',
  },
  {
    icon: Handshake,
    title: 'Verified Breeders',
    text: 'We work directly with trusted, verified breeders so you know exactly where your puppy comes from.',
  },
  {
    icon: Truck,
    title: 'Doorstep Delivery',
    text: 'Safe home delivery across Kolkata and surrounding regions, with cash on delivery available.',
  },
  {
    icon: Syringe,
    title: 'Vaccination & Health',
    text: 'Every puppy is vaccinated and screened, so it joins your family healthy and happy.',
  },
  {
    icon: ClipboardList,
    title: 'Guidance & Support',
    text: 'Advice on the right breed, feeding and care to help first-time and experienced pet parents alike.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Enquiries',
    text: 'Quick answers about availability, pricing and delivery — message us anytime.',
  },
]

export default function Services() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Everything you need to welcome a healthy puppy into your home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 100}>
              <div className="group h-full rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-gold-200 hover:shadow-xl hover:shadow-gold-100/60">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-500 text-white shadow-md shadow-gold-500/30 transition group-hover:scale-110">
                  <s.icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
