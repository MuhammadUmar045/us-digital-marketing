import { FaEnvelope, FaWhatsapp } from 'react-icons/fa'

function FloatingContacts() {
  const email = 'businessgrowthservices@gmail.com'
  const subject = encodeURIComponent('Digital Marketing Service Inquiry')
  const body = encodeURIComponent('Hi, I am interested in your digital marketing services. Please share details.')
  const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`

  return (
    <div className="floating-contacts" aria-label="Contact shortcuts">
      <a
        href={mailtoUrl}
        title="Send Email"
        aria-label="Send Email"
        style={{ background: 'rgba(255,255,255,0.04)', color: '#fff' }}
      >
        <FaEnvelope />
      </a>
      <a
        href="https://wa.me/919630715686?text=Hello, I am interested in your digital marketing services."
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        style={{ background: 'rgba(0, 85, 255, 0.16)', color: '#fff' }}
      >
        <FaWhatsapp />
      </a>
    </div>
  )
}

export default FloatingContacts
