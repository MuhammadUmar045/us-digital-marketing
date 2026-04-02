import { useEffect, useRef } from 'react'
import { FaArrowRight, FaBolt, FaMousePointer, FaPlay } from 'react-icons/fa'
import { gsap } from 'gsap'

function IntroOverlay({ isVisible, typewriterText, skipVisible, onSkip, overlayRef }) {
  const stageRef = useRef(null)

  useEffect(() => {
    if (!isVisible) return undefined

    const root = overlayRef?.current
    if (!root) return undefined

    const context = gsap.context(() => {
      gsap.fromTo(
        '.intro-animate-in',
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, delay: 0.12 },
      )

      gsap.fromTo(
        '.intro-headline-line',
        { opacity: 0, y: 52, rotateX: -32 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1.05, ease: 'power4.out', stagger: 0.12, delay: 0.25 },
      )

      gsap.fromTo(
        '.intro-orb',
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out', stagger: 0.18, delay: 0.05 },
      )

      gsap.fromTo(
        '.intro-progress-fill',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: 'power2.out', delay: 0.8 },
      )
    }, root)

    return () => context.revert()
  }, [isVisible, overlayRef])

  useEffect(() => {
    if (!isVisible) return undefined

    const root = overlayRef?.current
    const stage = stageRef.current
    if (!root || !stage) return undefined

    const resetMotion = () => {
      root.style.setProperty('--pointer-x', '50%')
      root.style.setProperty('--pointer-y', '38%')
      root.style.setProperty('--tilt-x', '0deg')
      root.style.setProperty('--tilt-y', '0deg')
      root.style.setProperty('--glow-opacity', '0.35')
      stage.style.setProperty('--tilt-x', '0deg')
      stage.style.setProperty('--tilt-y', '0deg')
    }

    const handleMove = (event) => {
      const bounds = root.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const percentX = (x / bounds.width) * 100
      const percentY = (y / bounds.height) * 100
      const tiltX = ((0.5 - y / bounds.height) * 12).toFixed(2)
      const tiltY = (((x / bounds.width) - 0.5) * 12).toFixed(2)

      root.style.setProperty('--pointer-x', `${percentX}%`)
      root.style.setProperty('--pointer-y', `${percentY}%`)
      root.style.setProperty('--tilt-x', `${tiltX}deg`)
      root.style.setProperty('--tilt-y', `${tiltY}deg`)
      root.style.setProperty('--glow-opacity', '0.8')
      stage.style.setProperty('--tilt-x', `${tiltX}deg`)
      stage.style.setProperty('--tilt-y', `${tiltY}deg`)
    }

    const handleLeave = () => {
      resetMotion()
    }

    resetMotion()
    root.addEventListener('pointermove', handleMove)
    root.addEventListener('pointerleave', handleLeave)

    return () => {
      root.removeEventListener('pointermove', handleMove)
      root.removeEventListener('pointerleave', handleLeave)
    }
  }, [isVisible, overlayRef])

  useEffect(() => {
    if (!isVisible) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSkip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, onSkip])

  if (!isVisible) return null

  const heroSignals = ['Lead Gen', 'Paid Ads', 'Conversion']

  return (
    <div id="intro-overlay" ref={overlayRef} className="intro-overlay" aria-label="Intro sequence">
      <div className="intro-orb intro-orb-a" />
      <div className="intro-orb intro-orb-b" />
      <div className="intro-orb intro-orb-c" />
      <div className="intro-grid" />
      <div className="intro-vignette" />

      <div className="intro-shell">
        <div className="intro-topbar intro-animate-in">
          <div className="intro-brand">
            <span className="intro-brand-mark">UDM.</span>
            <span className="intro-brand-copy">Growth systems in motion</span>
          </div>

          <button
            onClick={onSkip}
            className={`intro-skip-button ${skipVisible ? 'is-visible' : ''}`}
            aria-label="Skip intro"
          >
            Skip Intro
          </button>
        </div>

        <div className="intro-stage" ref={stageRef}>
          <div className="intro-copy-panel">
            <p className="intro-kicker intro-animate-in">
              <FaBolt /> Performance marketing launch
            </p>

            <h1 className="intro-headline" aria-label="We build growth empires">
              <span className="intro-headline-line">WE BUILD</span>
              <span className="intro-headline-line intro-headline-accent">GROWTH</span>
              <span className="intro-headline-line">EMPIRES</span>
            </h1>

            <p className="intro-subcopy intro-animate-in">
              High-energy entry screen for a brand that wants attention, motion, and momentum before the first scroll.
            </p>

            <div className="intro-live-line intro-animate-in">
              <FaMousePointer />
              <span>{typewriterText || 'Move your cursor. The interface reacts instantly.'}</span>
            </div>

            <div className="intro-signal-row intro-animate-in">
              {heroSignals.map((signal) => (
                <span key={signal} className="intro-signal-chip">
                  {signal}
                </span>
              ))}
            </div>

            <div className="intro-progress intro-animate-in">
              <div className="intro-progress-copy">
                <span>Loading the experience</span>
                <span>Fast, focused, interactive</span>
              </div>
              <div className="intro-progress-track" aria-hidden="true">
                <span className="intro-progress-fill" />
              </div>
            </div>

            <div className="intro-actions intro-animate-in">
              <button onClick={onSkip} className="intro-enter-button">
                <span>Enter Experience</span>
                <FaArrowRight />
              </button>
              <p className="intro-hint">Press Enter or Escape to continue.</p>
            </div>
          </div>

          <aside className="intro-side-panel intro-animate-in">
            <div className="intro-side-card intro-side-card-main">
              <div className="intro-side-card-top">
                <span className="intro-side-label">Live signal</span>
                <FaPlay />
              </div>
              <strong>We turn clicks into booked calls.</strong>
              <p>
                The intro stays visually loud, responsive to pointer movement, and aligned with the site&apos;s growth-first tone.
              </p>
            </div>

            <div className="intro-side-grid">
              <div className="intro-side-card intro-side-mini">
                <span className="intro-side-label">Reach</span>
                <strong>Scaled</strong>
              </div>
              <div className="intro-side-card intro-side-mini">
                <span className="intro-side-label">Leads</span>
                <strong>Qualified</strong>
              </div>
              <div className="intro-side-card intro-side-mini">
                <span className="intro-side-label">ROI</span>
                <strong>Tracked</strong>
              </div>
              <div className="intro-side-card intro-side-mini">
                <span className="intro-side-label">Flow</span>
                <strong>Adaptive</strong>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default IntroOverlay
