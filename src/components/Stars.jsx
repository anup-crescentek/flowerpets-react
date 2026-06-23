import { Star } from 'lucide-react'

export default function Stars({ className = 'h-4 w-4', count = 5 }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-gold-400">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className={className} fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  )
}
