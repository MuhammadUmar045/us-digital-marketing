import { FaFacebookF, FaHeart, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import logo from '../assets/logo.png'

function FooterSection() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer-shell site-section" id="contact">
      <div className="section-shell">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              {/* Circular logo — same crop as navbar */}
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
                border: '2px solid rgba(0,85,255,0.35)',
                boxShadow: '0 0 0 1px rgba(0,229,255,0.15)',
              }}>
                <img
                  src={logo}
                  alt="UDM"
                  style={{
                    width: '160%',
                    height: '160%',
                    objectFit: 'cover',
                    objectPosition: 'center 30%',
                    marginLeft: '-30%',
                    marginTop: '-15%',
                    display: 'block',
                  }}
                />
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.05rem', color: '#fff', lineHeight: 1.25 }}>
                US Digital Marketing Services
              </span>
            </div>
            <p className="section-lead" style={{ maxWidth: '26rem' }}>
              Your partner in digital transformation. Helping businesses grow since 2020.
            </p>
            <p className="small-muted" style={{ marginTop: '0.6rem' }}>Fortune 500 craft for local growth engines.</p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon"><FaFacebookF /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', marginTop: 0 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              {[
                { label: 'Home',     id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Pricing',  id: 'pricing' },
              ].map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="small-muted"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
                  target="_blank"
                  rel="noreferrer"
                  className="small-muted"
                >
                  Client Form
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', marginTop: 0 }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              {[
                { label: 'Terms & Conditions', id: 'legal' },
                { label: 'Privacy Policy',     id: 'legal' },
                { label: 'Help & Support',     id: 'legal' },
              ].map(({ label, id }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="small-muted"
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', marginTop: 0 }}>Contact</h4>
            <p className="section-lead" style={{ marginBottom: '0.75rem' }}>
              Ready to start a project? Reach out through the client form or the floating contact buttons.
            </p>
            <button
              onClick={() => window.open('https://form.svhrt.com/698ace75247da1e2ca3c9de9', '_blank')}
              style={{
                marginTop: '0.5rem',
                background: 'rgba(0,85,255,0.15)',
                border: '1px solid rgba(0,85,255,0.35)',
                color: '#fff',
                borderRadius: '8px',
                padding: '0.55rem 1.1rem',
                fontSize: '0.75rem',
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '0.08em',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,85,255,0.28)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,85,255,0.15)'}
            >
              → Open Client Form
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <p className="small-muted" style={{ margin: 0 }}>
            &copy; 2020–2026 US Digital Marketing Services. All Rights Reserved.
          </p>
          <p className="small-muted" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            Made with <FaHeart style={{ color: 'var(--accent-2)' }} /> by Utkarsh Singh
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
