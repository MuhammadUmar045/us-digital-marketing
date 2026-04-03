import { useEffect, useRef, useState } from 'react'
import './StatsSection.css'

/* ── Typewriter hook ─────────────────────────────────────── */
function useTypewriter(text, speed, enabled) {
  const [displayed, setDisplayed] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    clearTimeout(timerRef.current)
    if (!enabled || !text) { setDisplayed(''); return }
    setDisplayed('')
    let i = 0
    const tick = () => {
      setDisplayed(text.substring(0, i))
      if (i++ <= text.length) timerRef.current = setTimeout(tick, speed)
    }
    timerRef.current = setTimeout(tick, speed)
    return () => clearTimeout(timerRef.current)
  }, [text, speed, enabled])

  return displayed
}

/* ── Stat detail overlay ─────────────────────────────────── */
function StatOverlay({ stat, onClose }) {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (!stat) return
    setPhase('idle')
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setVisible(true)
      setTimeout(() => setPhase('number'), 80)
    }))
    document.body.style.overflow = 'hidden'
  }, [stat])

  const handleClose = () => {
    setVisible(false)
    setPhase('idle')
    document.body.style.overflow = ''
    setTimeout(onClose, 420)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible])

  // number text = e.g. "100X" or "854%" 
  const numberText = stat?.value ?? ''
  // label text = e.g. "Revenue Growth"
  const labelText = stat?.label ?? ''
  // detail text
  const detailText = stat?.detail ?? ''

  const typedNumber = useTypewriter(numberText, 70, phase !== 'idle')
  const numberFinished = typedNumber.length >= numberText.length

  const typedLabel = useTypewriter(labelText, 55, phase === 'label' || phase === 'detail')
  const labelFinished = typedLabel.length >= labelText.length

  const typedDetail = useTypewriter(detailText, 20, phase === 'detail' && labelFinished)
  const detailFinished = typedDetail.length >= detailText.length

  useEffect(() => {
    if (phase === 'number' && numberFinished) setPhase('label')
  }, [numberFinished, phase])

  useEffect(() => {
    if (phase === 'label' && labelFinished) setPhase('detail')
  }, [labelFinished, phase])

  if (!stat) return null

  return (
    <div className={`stat-overlay${visible ? ' stat-overlay--open' : ''}`}>
      <div className="stat-ov-topbar">
        <button className="stat-ov-back-btn" onClick={handleClose}>
          ← BACK TO EMPIRE
        </button>
      </div>

      <div className="stat-ov-content">
        {/* Big typed number */}
        <div className="stat-ov-number">
          {typedNumber || '\u00A0'}
          {!numberFinished && <span className="stat-ov-cursor" />}
        </div>

        {/* Typed label */}
        <div className="stat-ov-label">
          {typedLabel || '\u00A0'}
          {(phase === 'label' && !labelFinished) && <span className="stat-ov-cursor" />}
        </div>

        {/* Typed detail */}
        <p className="stat-ov-detail">
          {typedDetail || '\u00A0'}
          {phase === 'detail' && !detailFinished && <span className="stat-ov-cursor" />}
        </p>
      </div>
    </div>
  )
}

/* ── StatsSection ────────────────────────────────────────── */
function StatsSection({ stats, counterRefs }) {
  const sectionRef = useRef(null)
  const [values, setValues] = useState(stats.map(() => 0))
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const animateCounter = (target, index) => {
      const duration = 1600
      const start = performance.now()
      const frame = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValues((prev) => {
          const next = [...prev]
          next[index] = Math.round(target * eased)
          return next
        })
        if (progress < 1) window.requestAnimationFrame(frame)
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
    <>
      <section ref={sectionRef} className="site-section site-section--soft stats-band">
        <div className="section-shell">
          <div className="stats-grid">
            {stats.map((item, index) => (
              <article
                key={item.value}
                ref={(el) => { counterRefs.current[index] = el }}
                data-reveal
                className="stat-card glass-card reveal-scale"
                style={{ transitionDelay: `${index * 100}ms`, cursor: 'pointer' }}
                onClick={() => setSelected(item)}
              >
                <div className="stat-number">{values[index]}</div>
                <div className="stat-sublabel">{item.label}</div>

                {/* Subtle "tap to explore" hint */}
                <div className="stat-hint">tap to explore →</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <StatOverlay stat={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default StatsSection
