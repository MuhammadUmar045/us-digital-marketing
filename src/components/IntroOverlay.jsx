import { useEffect, useRef, useState } from 'react'
import { FaArrowRight, FaBolt, FaPlay } from 'react-icons/fa'

function IntroOverlay({ isVisible, typewriterText, skipVisible, onSkip, overlayRef }) {
  const stageRef = useRef(null)
  const primaryBtnRef = useRef(null)
  const cursorRef = useRef(null)
  const dotGridRef = useRef(null)
  const rafCursorRef = useRef(0)
  const rafMagneticRef = useRef(0)
  const cursorPosRef = useRef({ x: 0, y: 0 })
  const cursorTargetRef = useRef({ x: 0, y: 0 })
  const magneticPosRef = useRef({ x: 0, y: 0 })
  const magneticTargetRef = useRef({ x: 0, y: 0 })

  const [supportsCustomCursor, setSupportsCustomCursor] = useState(false)
  const [cursorActive, setCursorActive] = useState(false)
  const [cursorHoveringCta, setCursorHoveringCta] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(true)
  const [stats, setStats] = useState({ revenue: 0, campaigns: 0, retention: 0, brands: 0 })

  const morphPhrases = ['We Grow Brands', 'We Drive Revenue', 'We Dominate Search', 'We Scale Businesses']

  const dots = Array.from({ length: 126 })

  useEffect(() => {
    if (!isVisible) return undefined

    const interval = window.setInterval(() => {
      setPhraseVisible(false)
      window.setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % morphPhrases.length)
        setPhraseVisible(true)
      }, 260)
    }, 2500)

    return () => window.clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const applyPointerSupport = () => {
      const hasSupport = mediaQuery.matches
      setSupportsCustomCursor(hasSupport)
      if (!hasSupport) {
        setCursorActive(false)
        setCursorHoveringCta(false)
      }
    }

    applyPointerSupport()
    mediaQuery.addEventListener('change', applyPointerSupport)
    return () => mediaQuery.removeEventListener('change', applyPointerSupport)
  }, [])

  useEffect(() => {
    if (!isVisible) return undefined

    const magneticButton = primaryBtnRef.current
    if (!magneticButton) return undefined

    const animateMagnetic = () => {
      const dx = magneticTargetRef.current.x - magneticPosRef.current.x
      const dy = magneticTargetRef.current.y - magneticPosRef.current.y

      magneticPosRef.current.x += dx * 0.12
      magneticPosRef.current.y += dy * 0.12
      magneticButton.style.transform = `translate3d(${magneticPosRef.current.x}px, ${magneticPosRef.current.y}px, 0)`

      rafMagneticRef.current = window.requestAnimationFrame(animateMagnetic)
    }

    rafMagneticRef.current = window.requestAnimationFrame(animateMagnetic)

    return () => {
      window.cancelAnimationFrame(rafMagneticRef.current)
      magneticButton.style.transform = 'translate3d(0px, 0px, 0)'
    }
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return undefined

    const root = overlayRef?.current
    const stage = stageRef.current
    const cursor = cursorRef.current
    const grid = dotGridRef.current
    if (!root || !stage || !cursor || !grid) return undefined

    const resetMotion = () => {
      root.style.setProperty('--pointer-x', '50%')
      root.style.setProperty('--pointer-y', '38%')
      root.style.setProperty('--tilt-x', '0deg')
      root.style.setProperty('--tilt-y', '0deg')
      root.style.setProperty('--grid-shift-x', '0px')
      root.style.setProperty('--grid-shift-y', '0px')
      stage.style.setProperty('--tilt-x', '0deg')
      stage.style.setProperty('--tilt-y', '0deg')
    }

    const animateCursor = () => {
      if (!supportsCustomCursor) return
      const dx = cursorTargetRef.current.x - cursorPosRef.current.x
      const dy = cursorTargetRef.current.y - cursorPosRef.current.y
      cursorPosRef.current.x += dx * 0.16
      cursorPosRef.current.y += dy * 0.16

      cursor.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0) translate(-50%, -50%)`
      rafCursorRef.current = window.requestAnimationFrame(animateCursor)
    }

    const handleMove = (event) => {
      const bounds = root.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const percentX = (x / bounds.width) * 100
      const percentY = (y / bounds.height) * 100
      const tiltX = ((0.5 - y / bounds.height) * 12).toFixed(2)
      const tiltY = (((x / bounds.width) - 0.5) * 12).toFixed(2)

      const gridShiftX = ((percentX - 50) * 0.18).toFixed(2)
      const gridShiftY = ((percentY - 50) * 0.18).toFixed(2)

      root.style.setProperty('--pointer-x', `${percentX}%`)
      root.style.setProperty('--pointer-y', `${percentY}%`)
      root.style.setProperty('--tilt-x', `${tiltX}deg`)
      root.style.setProperty('--tilt-y', `${tiltY}deg`)
      root.style.setProperty('--grid-shift-x', `${gridShiftX}px`)
      root.style.setProperty('--grid-shift-y', `${gridShiftY}px`)
      stage.style.setProperty('--tilt-x', `${tiltX}deg`)
      stage.style.setProperty('--tilt-y', `${tiltY}deg`)

      if (supportsCustomCursor) {
        cursorTargetRef.current.x = event.clientX
        cursorTargetRef.current.y = event.clientY
      }

      grid.style.transform = `translate3d(${gridShiftX}px, ${gridShiftY}px, 0)`
    }

    const handleLeave = () => {
      resetMotion()
      setCursorActive(false)
      setCursorHoveringCta(false)
      magneticTargetRef.current = { x: 0, y: 0 }
    }

    const handleEnter = () => {
      if (supportsCustomCursor) setCursorActive(true)
    }

    if (supportsCustomCursor) {
      cursorTargetRef.current.x = window.innerWidth / 2
      cursorTargetRef.current.y = window.innerHeight / 2
      cursorPosRef.current.x = cursorTargetRef.current.x
      cursorPosRef.current.y = cursorTargetRef.current.y
      rafCursorRef.current = window.requestAnimationFrame(animateCursor)
    }

    resetMotion()
    window.addEventListener('pointermove', handleMove, { passive: true })
    root.addEventListener('pointerleave', handleLeave)
    root.addEventListener('pointerenter', handleEnter)

    return () => {
      window.cancelAnimationFrame(rafCursorRef.current)
      window.removeEventListener('pointermove', handleMove)
      root.removeEventListener('pointerleave', handleLeave)
      root.removeEventListener('pointerenter', handleEnter)
    }
  }, [isVisible, overlayRef, supportsCustomCursor])

  useEffect(() => {
    if (!isVisible) return undefined

    const duration = 1700
    const start = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setStats({
        revenue: 2.4 * eased,
        campaigns: Math.round(847 * eased),
        retention: Math.round(99 * eased),
        brands: Math.round(200 * eased),
      })

      if (progress < 1) {
        window.requestAnimationFrame(animate)
      }
    }

    const raf = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(raf)
  }, [isVisible])

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

  const handleMagneticMove = (event) => {
    if (!supportsCustomCursor) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const rawX = (event.clientX - bounds.left - bounds.width / 2) * 0.1
    const rawY = (event.clientY - bounds.top - bounds.height / 2) * 0.1
    const x = Math.max(-6, Math.min(6, rawX))
    const y = Math.max(-6, Math.min(6, rawY))
    magneticTargetRef.current = { x, y }
    setCursorActive(true)
    setCursorHoveringCta(true)
  }

  const handleMagneticLeave = () => {
    magneticTargetRef.current = { x: 0, y: 0 }
    setCursorHoveringCta(false)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

        .udm-intro {
          --pointer-x: 50%;
          --pointer-y: 38%;
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          --grid-shift-x: 0px;
          --grid-shift-y: 0px;
          position: fixed;
          inset: 0;
          z-index: 9999;
          min-height: 100dvh;
          background:
            radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(0, 85, 255, 0.3), transparent 28%),
            linear-gradient(120deg, rgba(0, 85, 255, 0.08), transparent 35%),
            #080c14;
          color: #ffffff;
          overflow: hidden auto;
          font-family: 'DM Sans', sans-serif;
          cursor: auto;
        }

        .udm-intro * {
          box-sizing: border-box;
        }

        .udm-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          pointer-events: none;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(0, 85, 255, 0.9));
          box-shadow: 0 0 24px rgba(0, 85, 255, 0.8);
          transition: width 220ms ease, height 220ms ease, box-shadow 220ms ease, opacity 220ms ease;
          opacity: 0;
          z-index: 12;
          display: none;
        }

        .udm-cursor.is-active {
          opacity: 1;
        }

        .udm-cursor.is-hovering {
          width: 20px;
          height: 20px;
          box-shadow: 0 0 30px rgba(0, 85, 255, 0.9);
        }

        .udm-intro.is-cta-hover .udm-cursor {
          opacity: 0 !important;
        }

        .udm-grid {
          position: absolute;
          inset: -8%;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(18, minmax(0, 1fr));
          gap: 2.1vmin;
          transform: translate3d(var(--grid-shift-x), var(--grid-shift-y), 0);
          opacity: 0.42;
          pointer-events: none;
          transition: transform 240ms ease-out;
        }

        .udm-dot {
          width: 3px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.24);
          animation: udmDotPulse 5.5s ease-in-out infinite;
          animation-delay: calc(var(--i) * 26ms);
        }

        .udm-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            radial-gradient(circle at center, transparent 28%, rgba(8, 12, 20, 0.65) 72%, rgba(8, 12, 20, 0.95) 100%),
            linear-gradient(160deg, rgba(245, 166, 35, 0.06), transparent 22%);
          pointer-events: none;
        }

        .udm-shell {
          position: relative;
          z-index: 4;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          padding: clamp(1rem, 2.5vw, 1.9rem) clamp(1rem, 3vw, 2.6rem) 0;
        }

        .udm-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.2rem;
          animation: udmReveal 620ms ease both;
        }

        .udm-brand {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
        }

        .udm-brand-mark {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 0.12em;
          color: #ffffff;
        }

        .udm-brand-copy {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.58);
        }

        .udm-skip {
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 999px;
          padding: 0.66rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-size: 0.69rem;
          transition: transform 220ms ease, border-color 220ms ease;
          opacity: 0;
          pointer-events: none;
        }

        .udm-skip.is-visible {
          opacity: 1;
          pointer-events: auto;
        }

        .udm-skip:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 85, 255, 0.9);
        }

        .udm-stage {
          display: grid;
          grid-template-columns: 55% 45%;
          align-items: center;
          gap: clamp(1.3rem, 2vw, 2.4rem);
          flex: 1;
          transform: none;
          transition: none;
        }

        .udm-copy {
          max-width: 48rem;
        }

        .udm-kicker,
        .udm-headline,
        .udm-morph,
        .udm-sub,
        .udm-signals,
        .udm-actions,
        .udm-side,
        .udm-ticker {
          opacity: 0;
          transform: translateY(20px);
          animation: udmReveal 700ms cubic-bezier(0.2, 0.75, 0.2, 1) forwards;
        }

        .udm-kicker {
          animation-delay: 100ms;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          padding: 0.52rem 0.8rem;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.86);
          background: rgba(255, 255, 255, 0.04);
        }

        .udm-headline {
          animation-delay: 210ms;
          margin: 0.6rem 0 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(5rem, 13vw, 9rem);
          line-height: 0.88;
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: #fff;
        }

        .udm-shimmer {
          display: inline-block;
          position: relative;
          color: #f5a623;
          text-shadow: 0 0 14px rgba(245, 166, 35, 0.38);
        }

        .udm-shimmer::after {
          content: '';
          position: absolute;
          top: -5%;
          left: -28%;
          width: 38%;
          height: 110%;
          background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.76), transparent);
          transform: skewX(-18deg);
          animation: udmShimmer 2.6s ease-in-out infinite;
        }

        .udm-morph {
          animation-delay: 300ms;
          margin-top: 0.56rem;
          min-height: 2.3rem;
          font-size: clamp(1.2rem, 2.4vw, 1.85rem);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.92);
          letter-spacing: 0.02em;
          transition: opacity 260ms ease, transform 260ms ease;
        }

        .udm-morph.is-hidden {
          opacity: 0;
          transform: translateY(10px);
        }

        .udm-sub {
          animation-delay: 380ms;
          margin: 0.85rem 0 0;
          max-width: 40rem;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          color: rgba(255, 255, 255, 0.72);
          line-height: 1.7;
        }

        .udm-signals {
          animation-delay: 450ms;
          margin-top: 1rem;
          display: flex;
          gap: 0.55rem;
          flex-wrap: wrap;
        }

        .udm-chip {
          padding: 0.48rem 0.72rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.04);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-size: 0.66rem;
          color: rgba(255, 255, 255, 0.82);
        }

        .udm-actions {
          animation-delay: 540ms;
          margin-top: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.7rem;
          flex-wrap: wrap;
        }

        .udm-btn {
          position: relative;
          border-radius: 999px;
          border: 1px solid transparent;
          padding: 0.95rem 1.2rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 0.75rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 150ms ease, border-color 220ms ease, background 220ms ease;
          will-change: transform;
          overflow: hidden;
        }

        .udm-btn-primary {
          background: #0055ff;
          color: #fff;
          box-shadow: 0 22px 40px rgba(0, 85, 255, 0.35);
        }

        .udm-btn-primary::after {
          content: '';
          position: absolute;
          top: -16%;
          left: -35%;
          width: 30%;
          height: 130%;
          transform: skewX(-16deg);
          background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.8), transparent);
          transition: left 340ms ease;
        }

        .udm-btn-primary:hover::after {
          left: 122%;
        }

        .udm-btn-secondary {
          border-color: rgba(255, 255, 255, 0.3);
          background: transparent;
          color: #fff;
        }

        .udm-cta-hint {
          margin: 0;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.62);
        }

        .udm-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          animation-delay: 620ms;
        }

        .udm-orbit {
          position: relative;
          width: min(34vw, 430px);
          aspect-ratio: 1/1;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: radial-gradient(circle at 40% 34%, rgba(0, 85, 255, 0.2), rgba(8, 12, 20, 0.2));
          box-shadow: inset 0 0 70px rgba(0, 85, 255, 0.14), 0 0 70px rgba(0, 85, 255, 0.16);
          animation: udmOrbitSpin 14s linear infinite;
        }

        .udm-orbit::before,
        .udm-orbit::after {
          content: '';
          position: absolute;
          inset: 12%;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          animation: udmOrbitSpinReverse 10s linear infinite;
        }

        .udm-orbit::after {
          inset: 28%;
          border-color: rgba(245, 166, 35, 0.5);
          animation-duration: 8.5s;
        }

        .udm-trust {
          position: absolute;
          left: 6%;
          bottom: 10%;
          border: 1px solid rgba(255, 255, 255, 0.17);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.65rem 0.75rem;
          border-radius: 0.95rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 24px 48px rgba(0, 0, 0, 0.35);
        }

        .udm-trust-copy {
          display: block;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.76);
        }

        .udm-avatars {
          margin-top: 0.4rem;
          display: flex;
        }

        .udm-avatar {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 999px;
          border: 2px solid #080c14;
          margin-left: -0.3rem;
          background: linear-gradient(135deg, #ffffff, #0055ff);
        }

        .udm-avatar:first-child {
          margin-left: 0;
        }

        .udm-side {
          animation-delay: 700ms;
          position: absolute;
          right: 0.4rem;
          top: 8%;
          width: min(100%, 17.8rem);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 1rem;
          background: rgba(255, 255, 255, 0.04);
          padding: 0.9rem;
          backdrop-filter: blur(10px);
        }

        .udm-side-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.45rem;
          color: #f5a623;
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .udm-side strong {
          display: block;
          font-size: 1.05rem;
          margin-top: 0.3rem;
          color: #fff;
        }

        .udm-side p {
          margin: 0.45rem 0 0;
          font-size: 0.85rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.68);
        }

        .udm-ticker {
          animation-delay: 760ms;
          margin-top: auto;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }

        .udm-ticker-track {
          display: inline-flex;
          min-width: 100%;
          white-space: nowrap;
          padding: 0.72rem 0;
          animation: udmTicker 18s linear infinite;
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
        }

        .udm-sep {
          margin: 0 1.2rem;
          color: #f5a623;
        }

        @keyframes udmReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes udmShimmer {
          0% { left: -35%; }
          100% { left: 125%; }
        }

        @keyframes udmDotPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.35); }
        }

        @keyframes udmOrbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes udmOrbitSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes udmTicker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .udm-intro {
            cursor: auto;
          }

          .udm-cursor {
            display: none;
          }

          .udm-stage {
            grid-template-columns: 1fr;
            align-items: start;
            padding-bottom: 1.5rem;
          }

          .udm-headline {
            font-size: clamp(4rem, 20vw, 6.4rem);
          }

          .udm-side {
            position: static;
            width: 100%;
            margin-top: 0.8rem;
          }

          .udm-orbit {
            width: min(76vw, 320px);
          }

          .udm-trust {
            left: 2%;
            bottom: 4%;
          }

          .udm-actions {
            width: 100%;
          }

          .udm-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (hover: none), (pointer: coarse) {
          .udm-intro {
            cursor: auto;
          }

          .udm-cursor {
            display: none;
          }

          .udm-btn {
            cursor: pointer;
            transform: translate3d(0px, 0px, 0) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .udm-grid,
          .udm-dot,
          .udm-orbit,
          .udm-orbit::before,
          .udm-orbit::after,
          .udm-ticker-track,
          .udm-shimmer::after {
            animation: none !important;
          }

          .udm-stage,
          .udm-btn,
          .udm-morph {
            transition: none !important;
          }
        }
      `}</style>

      <div
        id="intro-overlay"
        ref={overlayRef}
        className={`udm-intro ${cursorHoveringCta ? 'is-cta-hover' : ''}`}
        aria-label="Intro sequence"
        style={{ cursor: 'auto' }}
      >
        <div
          ref={cursorRef}
          className={`udm-cursor ${cursorActive ? 'is-active' : ''} ${cursorHoveringCta ? 'is-hovering' : ''}`}
        />

        <div ref={dotGridRef} className="udm-grid" aria-hidden="true">
          {dots.map((_, index) => (
            <span key={`dot-${index}`} className="udm-dot" style={{ '--i': index }} />
          ))}
        </div>

        <div className="udm-vignette" aria-hidden="true" />

        <div className="udm-shell">
          <div className="udm-topbar">
            <div className="udm-brand">
              <span className="udm-brand-mark">UDM.</span>
              <span className="udm-brand-copy">Growth systems in motion</span>
            </div>

            <button onClick={onSkip} className={`udm-skip ${skipVisible ? 'is-visible' : ''}`} aria-label="Skip intro">
              Skip Intro
            </button>
          </div>

          <div className="udm-stage" ref={stageRef}>
            <div className="udm-copy">
              <p className="udm-kicker">
                <FaBolt /> Performance marketing launch
              </p>

              <h1 className="udm-headline" aria-label="We build growth empires">
                WE BUILD <span className="udm-shimmer">GROWTH</span> EMPIRES
              </h1>

              <p className={`udm-morph ${phraseVisible ? '' : 'is-hidden'}`}>{morphPhrases[phraseIndex]}</p>

              <p className="udm-sub">{typewriterText || 'Move your cursor. The interface reacts instantly.'}</p>

              <div className="udm-signals" aria-label="Service focus signals">
                {heroSignals.map((signal) => (
                  <span key={signal} className="udm-chip">
                    {signal}
                  </span>
                ))}
              </div>

              <div className="udm-actions">
                <button
                  ref={primaryBtnRef}
                  onClick={onSkip}
                  className="udm-btn udm-btn-primary"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  onMouseEnter={() => {
                    if (supportsCustomCursor) {
                      setCursorActive(true)
                      setCursorHoveringCta(true)
                    }
                  }}
                >
                  <span>Enter Experience</span>
                  <FaArrowRight />
                </button>

                <button
                  onClick={onSkip}
                  className="udm-btn udm-btn-secondary"
                  onMouseMove={handleMagneticMove}
                  onMouseEnter={() => {
                    if (supportsCustomCursor) {
                      setCursorActive(true)
                      setCursorHoveringCta(true)
                    }
                  }}
                  onMouseLeave={() => {
                    setCursorHoveringCta(false)
                  }}
                >
                  Skip Intro
                </button>

                <p className="udm-cta-hint">Press Enter or Escape to continue.</p>
              </div>
            </div>

            <div className="udm-visual">
              <div className="udm-orbit" aria-hidden="true" />

              <div className="udm-trust">
                <span className="udm-trust-copy">Trusted by {stats.brands}+ brands</span>
                <div className="udm-avatars" aria-hidden="true">
                  <span className="udm-avatar" />
                  <span className="udm-avatar" />
                  <span className="udm-avatar" />
                  <span className="udm-avatar" />
                </div>
              </div>

              <aside className="udm-side">
                <div className="udm-side-top">
                  <span>Live signal</span>
                  <FaPlay />
                </div>
                <strong>We turn clicks into booked calls.</strong>
                <p>
                  The intro stays visually loud, responsive to pointer movement, and aligned with the site&apos;s growth-first tone.
                </p>
              </aside>
            </div>
          </div>

          <div className="udm-ticker" aria-label="Performance stats ticker">
            <div className="udm-ticker-track">
              <span>${stats.revenue.toFixed(1)}B Revenue Generated</span>
              <span className="udm-sep">•</span>
              <span>{stats.campaigns} Campaigns Launched</span>
              <span className="udm-sep">•</span>
              <span>{stats.retention}% Client Retention</span>
              <span className="udm-sep">•</span>
              <span>{stats.brands}+ Brands Scaled</span>
              <span className="udm-sep">•</span>
              <span>${stats.revenue.toFixed(1)}B Revenue Generated</span>
              <span className="udm-sep">•</span>
              <span>{stats.campaigns} Campaigns Launched</span>
              <span className="udm-sep">•</span>
              <span>{stats.retention}% Client Retention</span>
              <span className="udm-sep">•</span>
              <span>{stats.brands}+ Brands Scaled</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IntroOverlay
