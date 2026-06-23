import { useState } from 'react'

// Note: the live site's exact FAQ text isn't in its static HTML, so these
// answers are written from the business's stated policies (vaccinated puppies,
// verified breeders, COD, home delivery). Update with the real copy when handy.
const faqs = [
  {
    q: 'Are the puppies vaccinated?',
    a: 'Yes. Every puppy is vaccinated and health-screened before it goes to its new home.',
  },
  {
    q: 'Do you offer home delivery?',
    a: 'Yes — we provide doorstep delivery across Kolkata and surrounding regions.',
  },
  {
    q: 'Is cash on delivery available?',
    a: 'Yes, cash on delivery is available so you can pay when your puppy arrives.',
  },
  {
    q: 'How do I know the breeders are trustworthy?',
    a: 'We work directly with trusted, verified breeders, so you always know where your puppy comes from.',
  },
  {
    q: 'How many breeds are available?',
    a: 'We currently have 24 breeds available. See the Breeds & Prices page for the full list.',
  },
  {
    q: 'How can I check the price of a specific breed?',
    a: 'Featured breeds show their price range on the Breeds page. For others, message us on WhatsApp or call and we’ll confirm the current price.',
  },
]

function Item({ q, a, open, onToggle }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
        open ? 'border-gold-200 shadow-gold-100/60' : 'border-slate-100'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900"
      >
        {q}
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600 transition-transform ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <p className="overflow-hidden px-6 pb-5 text-slate-600">{a}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-gold-50 to-white">
        <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">
            Everything you need to know before bringing a puppy home.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 py-16">
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <Item
              key={f.q}
              {...f}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </section>
    </>
  )
}
