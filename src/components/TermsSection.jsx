const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)

const HelpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
)

const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
)

const blocks = [
  {
    Icon: ShieldIcon,
    kicker: 'Terms & Conditions',
    heading: 'Our Agreement',
    items: [
      'Services are digital — no refunds once activated unless delivery fails on our end.',
      'Clients must provide accurate credentials. We are not liable for delays from incorrect info.',
      'Deliverables become client IP upon full payment. We may showcase anonymised samples.',
      'We may terminate accounts involved in unlawful activity or platform policy violations.',
      'By purchasing, you confirm you have read and agreed to these terms in full.',
    ],
  },
  {
    Icon: HelpIcon,
    kicker: 'Help & Support',
    heading: 'We are Here for You',
    items: [
      'Support is available via WhatsApp and email, Mon–Sat, 9 AM – 8 PM.',
      'For urgent issues, mark messages as Priority and include your order reference.',
      'We respond within 4–6 hours and resolve most issues within 24 hours.',
      'Dedicated consultation sessions can be booked through our contact channels.',
      'FAQs and tutorial guides are available on request.',
    ],
  },
  {
    Icon: LockIcon,
    kicker: 'Privacy Policy',
    heading: 'Your Data, Protected',
    items: [
      'We collect only the minimum data needed to deliver your service.',
      'Your data is never sold or shared with third parties for marketing.',
      'All client data is stored securely, accessible only to authorised team members.',
      'You may request access, correction, or deletion of your data at any time.',
      'Cookies are used only for site functionality and anonymous analytics.',
    ],
  },
]

export default function TermsSection() {
  return (
    <section className="site-section site-section--alt" id="legal">
      <div className="section-shell">
        <div className="terms-grid">
          {blocks.map(({ Icon, kicker, heading, items }) => (
            <div key={kicker} className="reveal" data-reveal>
              <span className="section-kicker terms-kicker">
                <Icon /> {kicker}
              </span>
              <h2 className="section-heading terms-heading">{heading}</h2>
              <div className="glass-card terms-card">
                <ul className="legal-list">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .terms-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          align-items: start;
        }

        @media (max-width: 860px) {
          .terms-grid {
            grid-template-columns: 1fr;
          }
        }

        .terms-kicker {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.7rem;
        }

        .terms-heading {
          font-size: clamp(1.2rem, 2vw, 1.55rem) !important;
          margin-bottom: 1rem !important;
        }

        .terms-card {
          padding: 1.4rem !important;
        }

        .legal-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.75rem;
        }

        .legal-list li {
          position: relative;
          padding-left: 1.2rem;
          color: var(--muted);
          line-height: 1.7;
          font-size: 0.84rem;
        }

        .legal-list li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.6rem;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: var(--accent);
        }
      `}</style>
    </section>
  )
}
