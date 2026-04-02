function OwnerSection() {
  return (
    <section className="site-section site-section--soft">
      <div className="section-shell">
        <div className="owner-card glass-card reveal-scale" data-reveal>
          <div style={{ display: 'grid', placeItems: 'center', gap: '1rem', textAlign: 'center' }}>
            <div style={{ width: '7rem', height: '7rem', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(0,85,255,0.24)', boxShadow: '0 0 40px rgba(0,85,255,0.16)' }}>
              <img
                src="https://ui-avatars.com/api/?name=Utkarsh+Singh&background=0055FF&color=fff&size=256"
                alt="Utkarsh Singh"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <h3 style={{ margin: 0, fontFamily: 'Syne, sans-serif', fontSize: '2rem' }}>Utkarsh Singh</h3>
            <p className="section-label" style={{ color: 'var(--accent)' }}>Founder & CEO</p>
            <p className="section-lead" style={{ maxWidth: '60ch' }}>
              "With over 4 years of dedicated experience in digital marketing, my mission is to bridge the gap between local
              businesses and the digital world. We don't just run ads; we build growth engines."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OwnerSection
