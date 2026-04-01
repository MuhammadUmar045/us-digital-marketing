import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
import { categories, heroCaptions, heroSlides, introTexts, pricingPlans, stats } from './data/siteData'
import { fallbackIcon, iconMap } from './utils/iconMap'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [introVisible, setIntroVisible] = useState(true)
  const [skipVisible, setSkipVisible] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [captionVisible, setCaptionVisible] = useState(true)
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

  const activeCaption = heroCaptions[currentSlide]

  const endIntro = () => {
    if (hasEndedIntroRef.current) return
    hasEndedIntroRef.current = true

    if (!introOverlayRef.current) {
      setIntroVisible(false)
      return
    }

    gsap.to(introOverlayRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setIntroVisible(false)
        if (homeRef.current) {
          gsap.from(homeRef.current.querySelectorAll('h1, p'), {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
          })
        }
      },
    })
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
    const interval = window.setInterval(() => {
      setCaptionVisible(false)
      window.setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        setCaptionVisible(true)
      }, 500)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    const animations = []

    counterRefs.current.forEach((counterEl, index) => {
      if (!counterEl) return
      animations.push(
        gsap.to(counterEl, {
          innerHTML: stats[index].target,
          duration: 2,
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: counterEl,
            start: 'top 85%',
          },
        }),
      )
    })

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill()
        animation.kill()
      })
    }
  }, [])

  return (
    <div className="bg-slate-50 text-slate-800 antialiased">
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
        captionVisible={captionVisible}
        activeCaption={activeCaption}
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
