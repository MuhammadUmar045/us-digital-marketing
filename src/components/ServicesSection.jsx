function ServicesSection({ categories, iconMap, fallbackIcon, onSelectCategory }) {
  return (
    <section id="services" className="site-section">
      <div className="section-shell">
        <div className="reveal-left" data-reveal>
          <span className="section-label">Services</span>
          <h2 className="section-heading section-heading--xl" style={{ marginTop: '0.5rem', maxWidth: '14ch' }}>
            Industries We <span style={{ color: 'var(--accent)' }}>Serve</span>
          </h2>
          <p className="section-lead" style={{ maxWidth: '42rem', marginTop: '1rem' }}>
            Specialized marketing strategies for 50+ business categories.
          </p>
        </div>

        <div className="services-grid" style={{ marginTop: '2rem' }}>
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || fallbackIcon
            const revealDelay = Math.min(index * 45, 180)
            return (
              <button
                key={category.name}
                onClick={() => onSelectCategory(category)}
                className="glass-card service-card reveal-scale"
                data-reveal
                style={{ transitionDelay: `${revealDelay}ms`, textAlign: 'left' }}
              >
                <div className="service-icon">
                  <IconComponent style={{ fontSize: '1.55rem' }} />
                </div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  {category.name}
                </h3>
                <p className="small-muted" style={{ margin: '0.65rem 0 0', lineHeight: 1.7 }}>
                  {category.desc}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
