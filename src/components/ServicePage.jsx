import { useEffect, useRef, useState } from 'react'
import { defaultCategoryBackground, getCategoryBackgroundImage, getAlternateBackgroundImage } from '../utils/categoryBackground'
import './ServicePage.css'

function useTypewriter(text, speed, enabled) {
  const [displayed, setDisplayed] = useState('')
  const timerRef = useRef(null)

  useEffect(() => {
    if (!enabled || !text) {
      setDisplayed('')
      return
    }
    setDisplayed('')
    let i = 0
    const tick = () => {
      setDisplayed(text.substring(0, i))
      if (i++ <= text.length) {
        timerRef.current = setTimeout(tick, speed)
      }
    }
    timerRef.current = setTimeout(tick, speed)
    return () => clearTimeout(timerRef.current)
  }, [text, speed, enabled])

  return displayed
}

function ServicePage({ selectedCategory, onBack }) {

  const [phase, setPhase] = useState('idle')
  const [imageError, setImageError] = useState(false)
  const [imageTryCount, setImageTryCount] = useState(0)
  const backgroundImage = getCategoryBackgroundImage(selectedCategory?.name)
  const alternateImage = getAlternateBackgroundImage(selectedCategory?.name)

  // Start typing after mount
  useEffect(() => {
    if (!selectedCategory) return
    setPhase('idle')
    const t = setTimeout(() => setPhase('name'), 200)
    return () => clearTimeout(t)
  }, [selectedCategory])

  const nameText = selectedCategory?.name?.toUpperCase() ?? ''
  const descText = selectedCategory
    ? `${selectedCategory.desc} We create tailored ad campaigns specifically for ${selectedCategory.name} businesses to ensure maximum ROI and customer acquisition.`
    : ''

  const typedName = useTypewriter(nameText, 80, phase === 'name' || phase === 'desc')
  const nameFinished = typedName.length >= nameText.length

  const typedDesc = useTypewriter(descText, 22, phase === 'desc' && nameFinished)
  const descFinished = typedDesc.length >= descText.length

  useEffect(() => {
    if (phase === 'name' && nameFinished) setPhase('desc')
  }, [nameFinished, phase])

  useEffect(() => {
    setImageError(false)
    setImageTryCount(0)
  }, [selectedCategory])

  const handleImageError = () => {
    setImageTryCount((prev) => prev + 1)
    if (imageTryCount === 0) {
      setImageError(false)
    } else {
      setImageError(true)
    }
  }

  if (!selectedCategory) {
    return (
      <div className="sp-page">
        <button className="sp-back-btn" onClick={onBack}>
          ← BACK TO EMPIRE
        </button>
        <div className="sp-name" style={{ color: '#ff4d4d' }}>NOT FOUND</div>
      </div>
    )
  }

  return (
    <div className="sp-page">
      {imageTryCount < 2 && !imageError && (
        <img
          key={`img-${imageTryCount}`}
          src={imageTryCount === 0 ? backgroundImage : alternateImage}
          alt={selectedCategory.name}
          className="sp-bg-image"
          onError={handleImageError}
          loading="eager"
        />
      )}
      {imageError && (
        <div
          className="sp-bg-image"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 85, 255, 0.15), rgba(255, 100, 100, 0.1))',
            backdropFilter: 'blur(8px)',
          }}
        />
      )}
      <div className="sp-bg-overlay" />

      {/* Back button — top right */}
      <div className="sp-topbar">
        <button className="sp-back-btn" onClick={onBack}>
          ← BACK TO EMPIRE
        </button>
      </div>

      {/* Content — centered */}
      <div className="sp-content">
        {/* Typed name */}
        <div className="sp-name">
          {typedName || '\u00A0'}
          {!nameFinished && <span className="sp-cursor" />}
        </div>

        {/* Typed description */}
        <p className="sp-desc">
          {typedDesc || '\u00A0'}
          {phase === 'desc' && !descFinished && <span className="sp-cursor" />}
        </p>
      </div>
    </div>
  )
}

export default ServicePage
