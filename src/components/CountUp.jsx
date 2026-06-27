import { useEffect, useRef, useState } from 'react'

// Counts up to `end` once it scrolls into view (eased, runs once).
export default function CountUp({ end, suffix = '', duration = 1600, className = '' }) {
  const ref = useRef(null)
  const started = useRef(false)
  // Default to the final value so prerendered/no-JS HTML shows real numbers,
  // not 0. The animation (0 → end) still runs when scrolled into view live.
  const [val, setVal] = useState(end)

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
