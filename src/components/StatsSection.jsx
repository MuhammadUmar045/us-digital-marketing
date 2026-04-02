import { useEffect, useRef, useState } from 'react'

function StatsSection({ stats, counterRefs }) {
  const sectionRef = useRef(null)
  const [values, setValues] = useState(stats.map(() => 0))

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const animateCounter = (target, index) => {
      const duration = 1600
      const start = performance.now()

      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const nextValue = Math.round(target * eased)

        setValues((currentValues) => {
          const nextValues = [...currentValues]
          nextValues[index] = nextValue
          return nextValues
        })

        if (progress < 1) {
          window.requestAnimationFrame(frame)
        }
      }

      window.requestAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          stats.forEach((item, index) => animateCounter(item.target, index))
          observer.disconnect()
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [stats])

  return (
    <section ref={sectionRef} className="site-section site-section--soft stats-band">
      <div className="section-shell">
        <div className="stats-grid">
          {stats.map((item, index) => (
            <article
              key={item.value}
              ref={(el) => {
                counterRefs.current[index] = el
              }}
              data-reveal
              className="stat-card glass-card reveal-scale"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="stat-number">{values[index]}</div>
              <div className="stat-label">{item.value}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection
