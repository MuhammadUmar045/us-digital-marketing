import { FaCheck } from 'react-icons/fa'

function PricingSection({ pricingRef, pricingPlans, onOpenPayment }) {
  return (
    <section id="pricing" ref={pricingRef} className="site-section site-section--soft">
      <div className="section-shell">
        <div className="reveal-left" data-reveal>
          <span className="section-label">Pricing</span>
          <h2 className="section-heading section-heading--xl" style={{ marginTop: '0.5rem' }}>
            Investment <span style={{ color: 'var(--accent-2)' }}>Plans</span>
          </h2>
          <p className="section-lead" style={{ maxWidth: '40rem', marginTop: '1rem' }}>
            Transparent pricing for maximum growth.
          </p>
        </div>

        <div className="pricing-grid" style={{ marginTop: '2rem' }}>
          {pricingPlans.map((plan, index) => (
            <article
              key={plan.name}
              className={`glass-card pricing-card reveal-scale ${plan.featured ? 'featured' : ''}`}
              data-reveal
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.35rem 0.65rem',
                    borderRadius: '999px',
                    background: 'rgba(255,77,77,0.14)',
                    color: '#fff',
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                  }}
                >
                  POPULAR
                </div>
              )}
              <h3 style={{ fontFamily: 'Syne, sans-serif', margin: 0, fontSize: '1.4rem' }}>{plan.name}</h3>
              <div style={{ marginTop: '0.85rem', fontFamily: 'Syne, sans-serif', fontSize: '2.4rem', color: 'var(--accent)' }}>
                {plan.price}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 1.4rem', display: 'grid', gap: '0.85rem' }}>
                {plan.lines.map((line) => (
                  <li key={line} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: 'rgba(255,255,255,0.82)' }}>
                    <FaCheck style={{ color: 'var(--highlight)' }} /> {line}
                  </li>
                ))}
              </ul>
              <button className="btn-outline" style={{ width: '100%' }} onClick={() => onOpenPayment(plan.selected)}>
                Choose
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
