import { useEffect, useRef, useState } from 'react'
import IntroOverlay from './components/IntroOverlay'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import CategoryModal from './components/CategoryModal'
import PricingSection from './components/PricingSection'
import PaymentSection from './components/PaymentSection'
import OwnerSection from './components/OwnerSection'
import FooterSection from './components/FooterSection'
import FloatingContacts from './components/FloatingContacts'
import { heroSlides, introTexts, pricingPlans, stats, categories } from './data/siteData'
import { fallbackIcon, iconMap } from './utils/iconMap'

function App() {
  const [introVisible, setIntroVisible] = useState(true)
  const [skipVisible, setSkipVisible] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const currentSlide = 0
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [typewriterText, setTypewriterText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const introOverlayRef = useRef(null)
  const hasEndedIntroRef = useRef(false)
  const homeRef = useRef(null)
  const pricingRef = useRef(null)
  const counterRefs = useRef([])

  const endIntro = () => {
    if (hasEndedIntroRef.current) return
    hasEndedIntroRef.current = true
    setIntroVisible(false)
  }

  const openPayment = (planName) => {
    alert(`You selected: ${planName}\n\nPlease use the payment details below to complete the transfer. Send the screenshot to WhatsApp for confirmation.`)
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied to clipboard: ${text}`)
    })
  }

  useEffect(() => {
    if (!introVisible) return undefined
    const timer = window.setTimeout(() => {
      setSkipVisible(true)
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [introVisible])

  useEffect(() => {
    if (!introVisible) return undefined
    const timer = window.setTimeout(() => {
      setStartTyping(true)
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [introVisible])

  useEffect(() => {
    if (!introVisible || !startTyping) return undefined

    const currentText = introTexts[textIndex]

    let nextDelay = isDeleting ? 50 : 100

    if (!isDeleting && charIndex === currentText.length) {
      nextDelay = 1500
    } else if (isDeleting && charIndex === 0) {
      nextDelay = 500
    }

    const timer = window.setTimeout(() => {
      if (isDeleting) {
        const nextChar = Math.max(charIndex - 1, 0)
        setTypewriterText(currentText.substring(0, nextChar))
        setCharIndex(nextChar)

        if (nextChar === 0) {
          const lastText = textIndex === introTexts.length - 1
          if (lastText) {
            window.setTimeout(endIntro, 1000)
            return
          }

          setIsDeleting(false)
          setTextIndex((prev) => prev + 1)
        }
        return
      }

      const nextChar = Math.min(charIndex + 1, currentText.length)
      setTypewriterText(currentText.substring(0, nextChar))
      setCharIndex(nextChar)

      if (nextChar === currentText.length) {
        setIsDeleting(true)
      }
    }, nextDelay)

    return () => window.clearTimeout(timer)
  }, [introVisible, startTyping, textIndex, charIndex, isDeleting])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -4% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--page-accent', '#0055FF')
    root.style.setProperty('--page-accent-2', '#FF4D4D')
    root.style.setProperty('--page-highlight', '#00E5FF')
    return () => {}
  }, [])

  return (
    <div className="app-shell">
      <div className="page-grain" aria-hidden="true" />
      <IntroOverlay
        isVisible={introVisible}
        typewriterText={typewriterText}
        skipVisible={skipVisible}
        onSkip={endIntro}
        overlayRef={introOverlayRef}
      />

      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      <HeroSection
        homeRef={homeRef}
        currentSlide={currentSlide}
        heroSlides={heroSlides}
      />

      <StatsSection stats={stats} counterRefs={counterRefs} />
      <AboutSection />

      <ServicesSection
        categories={categories}
        iconMap={iconMap}
        fallbackIcon={fallbackIcon}
        onSelectCategory={setSelectedCategory}
      />

      <CategoryModal selectedCategory={selectedCategory} onClose={() => setSelectedCategory(null)} />

      <PricingSection pricingRef={pricingRef} pricingPlans={pricingPlans} onOpenPayment={openPayment} />
      <PaymentSection onCopyToClipboard={copyToClipboard} />
      <OwnerSection />
      <FooterSection />
      <FloatingContacts />
    </div>
  )
}

export default App
