import { FaEnvelope, FaWhatsapp } from 'react-icons/fa'

function FloatingContacts() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a
        href="mailto:businessgrowthservicess@gmail.com"
        className="w-14 h-14 bg-white text-red-500 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform border border-slate-100"
        title="Send Email"
      >
        <FaEnvelope />
      </a>
      <a
        href="https://wa.me/919630715686?text=Hello, I am interested in your digital marketing services."
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform animate-bounce"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  )
}

export default FloatingContacts
