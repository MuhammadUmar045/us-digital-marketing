import { FaFlag, FaGlobe, FaRegCopy } from 'react-icons/fa'

function PaymentSection({ onCopyToClipboard }) {
  return (
    <section className="site-section site-section--alt" id="contact">
      <div className="section-shell">
        <div className="reveal-left" data-reveal>
          <span className="section-label">Payment Details</span>
          <h2 className="section-heading section-heading--xl" style={{ marginTop: '0.5rem' }}>
            Secure <span style={{ color: 'var(--highlight)' }}>Payments</span>
          </h2>
        </div>

        <div className="payment-grid" style={{ marginTop: '2rem' }}>
          <div className="glass-card reveal-scale" data-reveal style={{ padding: '1.5rem' }}>
            <h3 style={{ marginTop: 0, fontFamily: 'Syne, sans-serif' }}>
              <FaFlag style={{ color: 'var(--accent-2)', marginRight: '0.55rem' }} /> Indian Payments
            </h3>
            <div className="section-lead" style={{ marginTop: '1rem', display: 'grid', gap: '0.8rem', fontSize: '0.98rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                <span className="small-muted">Account Name</span> <span>Utkarsh Singh</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                <span className="small-muted">Bank</span> <span>Kotak Mahindra</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                <span className="small-muted">A/C No</span> <span>6049669529</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.6rem' }}>
                <span className="small-muted">IFSC</span> <span>KKBK0005336</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                <span className="small-muted">UPI ID</span>
                <button className="btn-secondary" onClick={() => onCopyToClipboard('utkarshsinghhh340@oksbi')}>
                  Copy UPI <FaRegCopy />
                </button>
              </div>
            </div>
          </div>

          <div className="glass-card reveal-scale" data-reveal style={{ padding: '1.5rem' }}>
            <h3 style={{ marginTop: 0, fontFamily: 'Syne, sans-serif' }}>
              <FaGlobe style={{ color: 'var(--accent)', marginRight: '0.55rem' }} /> International
            </h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div className="glass-card" style={{ padding: '1rem 1.1rem', boxShadow: 'none' }}>
                <div className="small-muted" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em' }}>Payoneer</div>
                <div style={{ marginTop: '0.35rem' }}>utkarshsinghhh340@gmail.com</div>
                <button className="btn-ghost" style={{ marginTop: '0.8rem' }} onClick={() => onCopyToClipboard('utkarshsinghhh340@gmail.com')}>
                  Copy <FaRegCopy />
                </button>
              </div>
              <div className="glass-card" style={{ padding: '1rem 1.1rem', boxShadow: 'none' }}>
                <div className="small-muted" style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.14em' }}>PayPal</div>
                <div style={{ marginTop: '0.35rem' }}>@UtkarshSingh521</div>
                <button className="btn-ghost" style={{ marginTop: '0.8rem' }} onClick={() => onCopyToClipboard('@UtkarshSingh521')}>
                  Copy <FaRegCopy />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentSection
