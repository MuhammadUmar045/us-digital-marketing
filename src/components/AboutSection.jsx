import { useMemo, useState } from 'react'
import { FaCheck } from 'react-icons/fa'

function AboutSection() {
  const graphPoints = useMemo(
    () => [
      { x: 12, y: 76, quarter: 'Q1', title: 'Lead Volume Lift', value: '+32%' },
      { x: 30, y: 64, quarter: 'Q2', title: 'Conversion Efficiency', value: '+48%' },
      { x: 50, y: 54, quarter: 'Q3', title: 'CPL Optimization', value: '-37%' },
      { x: 70, y: 38, quarter: 'Q4', title: 'Revenue Expansion', value: '+86%' },
      { x: 88, y: 24, quarter: 'Q5', title: 'Pipeline Velocity', value: '+112%' },
    ],
    [],
  )
  const [activePoint, setActivePoint] = useState(graphPoints.length - 1)
  const pathD = useMemo(
    () =>
      graphPoints
        .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x * 8} ${point.y * 6}`)
        .join(' '),
    [graphPoints],
  )

  return (
    <section id="about" className="site-section site-section--alt">
      <div className="section-shell about-grid">
        <div className="reveal-left" data-reveal>
          <div className="about-label">
            <span className="section-label">WHO WE ARE</span>
          </div>

          <h2 className="section-heading section-heading--xl" style={{ maxWidth: '12ch' }}>
            Turning Local Businesses into <span style={{ color: 'var(--accent-2)' }}>Market Leaders</span>
          </h2>

          <p className="section-lead" style={{ marginTop: '1.2rem' }}>
            Founded in 2020 by <strong style={{ color: '#fff' }}>Utkarsh Singh</strong>, UDM is a performance-first
            marketing agency built for businesses that are serious about growth — not vanity metrics.
          </p>
          <p className="section-lead" style={{ marginTop: '0.9rem' }}>
            We run precision campaigns across <strong style={{ color: '#fff' }}>Google</strong>,{' '}
            <strong style={{ color: '#fff' }}>Meta</strong>, and <strong style={{ color: '#fff' }}>YouTube</strong> —
            engineered to bring in real leads, real bookings, and real revenue for local businesses across 50+ industries.
          </p>

          <div className="about-list">
            <div className="about-item reveal" data-reveal style={{ transitionDelay: '100ms' }}>
              <span className="about-check"><FaCheck /></span>
              <span>Full-funnel strategy built for measurable ROI, not impressions.</span>
            </div>
            <div className="about-item reveal" data-reveal style={{ transitionDelay: '220ms' }}>
              <span className="about-check"><FaCheck /></span>
              <span>Relentless optimization — we cut what doesn't work and scale what does.</span>
            </div>
            <div className="about-item reveal" data-reveal style={{ transitionDelay: '340ms' }}>
              <span className="about-check"><FaCheck /></span>
              <span>Dedicated support with fast turnarounds and zero hand-holding needed.</span>
            </div>
          </div>
        </div>

        <div className="glass-card about-visual reveal-scale" data-reveal>
          <svg className="about-wave" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="aboutGraphGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(0, 85, 255, 0.95)" />
                <stop offset="100%" stopColor="rgba(0, 229, 255, 0.95)" />
              </linearGradient>
            </defs>
            <path className="about-grid-line" d="M70 470 H740" />
            <path className="about-grid-line" d="M70 390 H740" />
            <path className="about-grid-line" d="M70 310 H740" />
            <path className="about-grid-line" d="M70 230 H740" />
            <path className="about-grid-line" d="M70 150 H740" />
            <path className="about-growth-area" d={`${pathD} L 704 470 L 96 470 Z`} />
            <path className="about-growth-line" d={pathD} />

            {graphPoints.map((point, index) => (
              <g key={point.quarter}>
                <circle
                  className={`about-point ${index === activePoint ? 'is-active' : ''}`}
                  cx={point.x * 8}
                  cy={point.y * 6}
                  r={index === activePoint ? 9 : 7}
                  onMouseEnter={() => setActivePoint(index)}
                />
                <text className="about-point-label" x={point.x * 8 - 12} y={point.y * 6 - 16}>
                  {point.quarter}
                </text>
              </g>
            ))}
          </svg>

          <div className="about-chart-insight">
            <span className="section-label">Live Performance Signal</span>
            <strong>{graphPoints[activePoint].title}</strong>
            <p className="section-lead" style={{ marginTop: '0.45rem', fontSize: '0.96rem' }}>
              Consistent quarter-over-quarter gains driven by tighter targeting, stronger offers, and funnel-level optimization.
            </p>
            <div className="about-insight-value">{graphPoints[activePoint].value}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
