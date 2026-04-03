import { useEffect, useRef, useState } from 'react'
import './CategoryModal.css'

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

function CategoryModal({ selectedCategory, onClose }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const [phase, setPhase] = useState('idle') // 'idle' | 'name' | 'desc'

  useEffect(() => {
    if (selectedCategory) {
      setActiveCategory(selectedCategory)
      setPhase('idle')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsOpen(true)
          setTimeout(() => setPhase('name'), 80)
        })
      })
      document.body.style.overflow = 'hidden'
    }
  }, [selectedCategory])

  const handleClose = () => {
    setIsOpen(false)
    setPhase('idle')
    document.body.style.overflow = ''
    setTimeout(onClose, 420)
  }

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen])

  const nameText = activeCategory?.name?.toUpperCase() ?? ''
  const descText = activeCategory?.desc ?? ''

  const typedName = useTypewriter(nameText, 75, phase === 'name' || phase === 'desc')
  const nameFinished = typedName.length >= nameText.length

  const typedDesc = useTypewriter(descText, 20, phase === 'desc' && nameFinished)
  const descFinished = typedDesc.length >= descText.length

  useEffect(() => {
    if (phase === 'name' && nameFinished) setPhase('desc')
  }, [nameFinished, phase])

  if (!activeCategory && !isOpen) return null

  const tags = activeCategory?.chips ?? activeCategory?.tags ?? []

  return (
    <div className={`cat-detail${isOpen ? ' open' : ''}`}>
      <button className="cat-back-btn" onClick={handleClose}>
        ← BACK TO EMPIRE
      </button>

      {activeCategory?.emoji && (
        <div className="cat-d-icon">{activeCategory.emoji}</div>
      )}

      <div className="cat-d-name">
        {typedName || '\u00A0'}
        {(!nameFinished || (phase === 'desc' && !descFinished)) && (
          <span className="cat-cursor" />
        )}
      </div>

      <div className="cat-d-desc">
        {typedDesc || '\u00A0'}
        {phase === 'desc' && !descFinished && <span className="cat-cursor" />}
      </div>

      <div className={`cat-tags${descFinished ? ' show' : ''}`}>
        {tags.map((tag) => (
          <span key={tag} className="cat-tag">{tag}</span>
        ))}
      </div>

      <button className={`cat-cta${descFinished ? ' show' : ''}`}>
        ▶ Activate This Engine
      </button>
    </div>
  )
}

export default CategoryModal
