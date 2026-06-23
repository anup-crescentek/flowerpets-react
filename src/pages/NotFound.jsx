import { Link } from 'react-router-dom'
import { Dog } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-b from-gold-50 to-white px-4">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-gold-300/30 blur-3xl" />
      <div className="relative flex flex-col items-center gap-5 text-center">
        <Dog className="animate-float h-20 w-20 text-gold-400" strokeWidth={1.5} />
        <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">404 — Page Not Found</h1>
        <p className="max-w-md text-slate-600">
          Looks like this page wandered off. Let's get you back home.
        </p>
        <Link
          to="/"
          className="rounded-full bg-gradient-to-r from-gold-400 to-gold-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-gold-500/30 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
