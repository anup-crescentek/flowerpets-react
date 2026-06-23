import { useEffect, useRef, useState } from 'react'

// Counts up to `end` once it scrolls into view (eased, runs once).
export default function CountUp({ end, suffix = '', duration = 1600, className = '' }) {
  const ref = useRef(null)
  const started = useRef(false)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setVal(Math.round(end * eased))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {val.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
