import { useEffect, useRef, useState } from 'react'
import './ServicesSection.css'

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

/* ── Service overlay ─────────────────────────────────────── */
function ServiceOverlay({ category, onClose }) {
  const [visible, setVisible] = useState(false)
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    if (!category) return
    setPhase('idle')
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setVisible(true)
      setTimeout(() => setPhase('name'), 80)
    }))
    document.body.style.overflow = 'hidden'
  }, [category])

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

  const nameText = category?.name?.toUpperCase() ?? ''
  const descText = category
    ? `${category.desc} We create tailored ad campaigns specifically for ${category.name} businesses to ensure maximum ROI and customer acquisition.`
    : ''

  const typedName = useTypewriter(nameText, 80, phase !== 'idle')
  const nameFinished = typedName.length >= nameText.length

  const typedDesc = useTypewriter(descText, 22, phase === 'desc' && nameFinished)
  const descFinished = typedDesc.length >= descText.length

  useEffect(() => {
    if (phase === 'name' && nameFinished) setPhase('desc')
  }, [nameFinished, phase])

  if (!category) return null

  return (
    <div className={`sp-overlay${visible ? ' sp-overlay--open' : ''}`}>
      <div className="sp-topbar">
        <button className="sp-back-btn" onClick={handleClose}>
          ← BACK TO EMPIRE
        </button>
      </div>

      <div className="sp-content">
        <div className="sp-name">
          {typedName || '\u00A0'}
          {!nameFinished && <span className="sp-cursor" />}
        </div>

        <p className="sp-desc">
          {typedDesc || '\u00A0'}
          {phase === 'desc' && !descFinished && <span className="sp-cursor" />}
        </p>
      </div>
    </div>
  )
}

/* ── ServicesSection ─────────────────────────────────────── */
function ServicesSection({ categories, iconMap, fallbackIcon }) {
  const [selected, setSelected] = useState(null)
  const doubled = [...categories, ...categories]

  return (
    <>
      <section id="services" className="site-section services-section">
        <div className="section-shell">
          <div className="reveal-left" data-reveal>
            <span className="section-label">Services</span>
            <h2
              className="section-heading section-heading--xl"
              style={{ marginTop: '0.25rem', maxWidth: '14ch' }}
            >
              Industries We <span style={{ color: 'var(--accent)' }}>Serve</span>
            </h2>
            <p className="section-lead" style={{ maxWidth: '42rem', marginTop: '0.4rem' }}>
              Specialized marketing strategies for 50+ business categories.
            </p>
          </div>
        </div>

        <div className="marquee-outer">
          <div className="marquee-track">
            {doubled.map((category, index) => {
              const IconComponent = iconMap[category.icon] || fallbackIcon
              return (
                <button
                  key={`${category.name}-${index}`}
                  onClick={() => setSelected(categories[index % categories.length])}
                  className="s-card"
                >
                  <div className="s-icon">
                    <IconComponent style={{ fontSize: '1.3rem' }} />
                  </div>
                  <h3 className="s-name">{category.name}</h3>
                  <p className="s-desc">
                    {category.desc.length > 72
                      ? category.desc.substring(0, 72) + '…'
                      : category.desc}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <ServiceOverlay category={selected} onClose={() => setSelected(null)} />
    </>
  )
}

export default ServicesSection
