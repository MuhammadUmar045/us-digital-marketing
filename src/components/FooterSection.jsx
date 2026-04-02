import { FaFacebookF, FaHeart, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

function FooterSection() {
  return (
    <footer className="footer-shell site-section" id="contact">
      <div className="section-shell">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div className="nav-mark">U</div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.15rem' }}>US Digital Marketing Services</span>
            </div>
            <p className="section-lead" style={{ maxWidth: '30rem' }}>
              Your partner in digital transformation. Helping businesses grow since 2020.
            </p>
            <p className="small-muted" style={{ marginTop: '1rem' }}>Fortune 500 craft for local growth engines.</p>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1.2rem' }}>
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaLinkedinIn /></a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', marginTop: 0 }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              <li><a href="#about" className="small-muted">About Us</a></li>
              <li><a href="#services" className="small-muted">Services</a></li>
              <li><a href="#pricing" className="small-muted">Pricing</a></li>
              <li>
                <a href="https://form.svhrt.com/698ace75247da1e2ca3c9de9" target="_blank" rel="noreferrer" className="small-muted">
                  Client Form
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', marginTop: 0 }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              <li>
                <button
                  onClick={() =>
                    alert(
                      'Terms: Payment is 100% advance. Results may vary based on market conditions. No refunds once service is initiated.',
                    )
                  }
                  className="small-muted"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Privacy: We do not share your data with third parties. All client information is strictly confidential.')}
                  className="small-muted"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Support: Available Mon-Sat 10AM to 7PM IST. Call or WhatsApp us.')}
                  className="small-muted"
                >
                  Help & Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily: 'Syne, sans-serif', marginTop: 0 }}>Contact</h4>
            <p className="section-lead">Ready to start a project? Reach out through the client form or the floating contact buttons.</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
          <p className="small-muted" style={{ margin: 0 }}>&copy; 2020-2026 US Digital Marketing Services. All Rights Reserved.</p>
          <p className="small-muted" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            Made with <FaHeart style={{ color: 'var(--accent-2)' }} /> by Utkarsh Singh
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
