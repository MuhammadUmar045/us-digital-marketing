import { useEffect, useRef, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'

const heroWords = ['Clinics', 'Gyms', 'Salons', 'Businesses']

function HeroSection({ homeRef, heroSlides }) {
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 })
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [phase, setPhase] = useState('typing')
  const [isFocusedByUser, setIsFocusedByUser] = useState(false)

  // ── Auto-cycling slide index ──────────────────────────────
  const [currentSlide, setCurrentSlide] = useState(0)
  const slideTimer = useRef(null)

  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return
    slideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 2000)
    return () => clearInterval(slideTimer.current)
  }, [heroSlides])

  // ── Typewriter ────────────────────────────────────────────
  useEffect(() => {
    const currentWord = heroWords[wordIndex]
    let delay = 95
    if (phase === 'pause') delay = 1200
    if (phase === 'deleting') delay = 50
    if (phase === 'switching') delay = 380

    const timer = window.setTimeout(() => {
      if (phase === 'typing') {
        const next = Math.min(charIndex + 1, currentWord.length)
        setCharIndex(next)
        if (next === currentWord.length) setPhase('pause')
        return
      }
      if (phase === 'pause') {
        if (isFocusedByUser) { setPhase('typing'); return }
        setPhase('deleting')
        return
      }
      if (phase === 'deleting') {
        const next = Math.max(charIndex - 1, 0)
        setCharIndex(next)
        if (next === 0) setPhase('switching')
        return
      }
      if (phase === 'switching') {
        setWordIndex((prev) => (prev + 1) % heroWords.length)
        setPhase('typing')
      }
    }, delay)

    return () => window.clearTimeout(timer)
  }, [wordIndex, charIndex, phase, isFocusedByUser])

  const handleMagneticMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = Math.max(-8, Math.min(8, (event.clientX - bounds.left - bounds.width / 2) * 0.08))
    const y = Math.max(-8, Math.min(8, (event.clientY - bounds.top - bounds.height / 2) * 0.08))
    setButtonOffset({ x, y })
  }
  const handleMagneticLeave = () => setButtonOffset({ x: 0, y: 0 })

  const typedWord = heroWords[wordIndex].slice(0, charIndex)

  const jumpToWord = (index) => {
    setWordIndex(index)
    setCharIndex(heroWords[index].length)
    setPhase('pause')
  }

  // Manual slide control — restart auto-timer on manual click
  const goToSlide = (index) => {
    setCurrentSlide(index)
    clearInterval(slideTimer.current)
    slideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 2000)
  }

  return (
    <section id="home" ref={homeRef} className="hero-shell site-section">
      <div className="section-shell hero-content">
        <div className="hero-copy">
          <div className="hero-badge reveal" data-reveal>
            <span style={{ color: 'var(--highlight)' }}>●</span>
            Established 2020
          </div>

          <h1 className="hero-heading reveal" data-reveal>
            Grow Your <span className="hero-gradient">Brand</span>
          </h1>

          <div className="hero-morph reveal" data-reveal>
            <span className="hero-morph-label">Built for</span>
            <span
              className="hero-typewriter"
              onMouseEnter={() => setIsFocusedByUser(true)}
              onMouseLeave={() => setIsFocusedByUser(false)}
            >
              {typedWord}
            </span>
          </div>

          <div className="hero-typewriter-nav reveal" data-reveal>
            {heroWords.map((word, index) => (
              <button
                key={word}
                className={`hero-typewriter-chip ${index === wordIndex ? 'is-active' : ''}`}
                onClick={() => jumpToWord(index)}
              >
                {word}
              </button>
            ))}
          </div>

          <p className="hero-subtext reveal" data-reveal>
            We help local businesses like Clinics, Gyms, and Salons explode their growth using Google Ads, Meta Ads,
            and YouTube Marketing.
          </p>

          <div className="hero-actions reveal" data-reveal>
            <a
              href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              style={{ transform: `translate3d(${buttonOffset.x}px, ${buttonOffset.y}px, 0)` }}
            >
              Start Project <FaArrowRight />
            </a>
            <a href="#services" className="btn-ghost">
              View Services
            </a>
          </div>
        </div>

        {/* ── Hero visual with auto-sliding banner ── */}
        <div className="hero-visual reveal-scale" data-reveal>
          <div className="hero-dashboard">
            <div className="hero-dashboard-media">
              {heroSlides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className={currentSlide === index ? 'is-active' : ''}
                  style={{
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                  }}
                />
              ))}
              <div className="hero-dashboard-overlay" />

              {/* Slide dots */}
              {heroSlides.length > 1 && (
                <div style={{
                  position: 'absolute',
                  bottom: '3.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '6px',
                  zIndex: 4,
                }}>
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToSlide(i)}
                      style={{
                        width: i === currentSlide ? '20px' : '6px',
                        height: '6px',
                        borderRadius: i === currentSlide ? '3px' : '50%',
                        background: i === currentSlide ? '#00e5ff' : 'rgba(255,255,255,0.3)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}

              <div className="hero-dashboard-caption">
                <div>
                  <strong style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.6rem', fontWeight: 600 }}>
                    Strategic Growth
                  </strong>
                  <span style={{ color: 'var(--muted)' }}>Data Driven Results</span>
                </div>
                <div style={{
                  textAlign: 'right',
                  color: 'var(--muted)',
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontSize: '0.72rem',
                }}>
                  <span>{heroWords[wordIndex]}</span>
                  <span>Live Campaign View</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <span className="chevron" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
