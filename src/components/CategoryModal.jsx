import { useMemo, useState } from 'react'
import { FaCheckCircle, FaRegClock, FaTimes } from 'react-icons/fa'

function CategoryModal({ selectedCategory, onClose }) {
  const [activeTab, setActiveTab] = useState('overview')

  const modalImage = useMemo(() => {
    if (!selectedCategory) return ''
    return `https://source.unsplash.com/800x400/?${selectedCategory.name},business`
  }, [selectedCategory])

  const growthPlan = useMemo(
    () => [
      `Audience segmentation for ${selectedCategory?.name || 'your industry'} by buying intent`,
      'Conversion-focused ad creatives and offer framing',
      'Landing page alignment with lead qualification filters',
      'Weekly optimization with CPL, CTR, and booked-call tracking',
    ],
    [selectedCategory],
  )

  const timelinePlan = useMemo(
    () => [
      'Week 1: Market audit, messaging blueprint, and campaign architecture',
      'Week 2: Launch + tracking validation + first optimization sprint',
      'Week 3-4: Scale winning ad sets and tighten conversion flow',
    ],
    [],
  )

  if (!selectedCategory) return null

  return (
    <div className="category-modal-backdrop" onClick={onClose}>
      <div className="category-modal glass-card" onClick={(event) => event.stopPropagation()}>
        <div style={{ position: 'relative', minHeight: '220px' }}>
          <img src={modalImage} alt={selectedCategory.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.42 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,12,20,0.1), rgba(8,12,20,0.9))' }} />
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem' }}
            className="social-icon"
          >
            <FaTimes />
          </button>
          <h3 style={{ position: 'absolute', left: '1.4rem', bottom: '1.2rem', margin: 0, fontFamily: 'Syne, sans-serif', fontSize: '2.2rem' }}>
            {selectedCategory.name}
          </h3>
        </div>
        <div style={{ padding: '1.4rem' }}>
          <div className="category-modal-tabs">
            <button
              className={`category-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`category-tab ${activeTab === 'growth' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('growth')}
            >
              Growth Blueprint
            </button>
            <button
              className={`category-tab ${activeTab === 'timeline' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
          </div>

          {activeTab === 'overview' && (
            <div className="category-modal-panel">
              <p className="section-lead" style={{ marginTop: 0 }}>
                {selectedCategory.desc} We create tailored ad campaigns specifically for {selectedCategory.name} businesses to
                ensure maximum ROI and customer acquisition.
              </p>
              <div className="category-modal-chips">
                <span>Lead Generation</span>
                <span>Paid Ads</span>
                <span>Performance SEO</span>
                <span>Conversion Tracking</span>
              </div>
            </div>
          )}

          {activeTab === 'growth' && (
            <div className="category-modal-panel">
              <ul className="category-modal-list">
                {growthPlan.map((line) => (
                  <li key={line}>
                    <FaCheckCircle />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="category-modal-panel">
              <ul className="category-modal-list">
                {timelinePlan.map((line) => (
                  <li key={line}>
                    <FaRegClock />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <a
            href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ marginTop: '0.9rem' }}
          >
            Get Quote for This Category
          </a>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal
