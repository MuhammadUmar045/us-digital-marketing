import { FaFacebookF, FaHeart, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

function FooterSection() {
  return (
    <footer id="contact" className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-blue rounded flex items-center justify-center font-bold">U</div>
              <span className="font-display font-bold text-xl">UDM Services</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">Your partner in digital transformation. Helping businesses grow since 2020.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors"><FaFacebookF /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors"><FaInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-blue transition-colors"><FaLinkedinIn /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li>
                <a
                  href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Client Form
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <button
                  onClick={() =>
                    alert(
                      'Terms: Payment is 100% advance. Results may vary based on market conditions. No refunds once service is initiated.',
                    )
                  }
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Privacy: We do not share your data with third parties. All client information is strictly confidential.')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert('Support: Available Mon-Sat 10AM to 7PM IST. Call or WhatsApp us.')}
                  className="hover:text-white transition-colors"
                >
                  Help & Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">&copy; 2020-2026 US Digital Marketing Services. All Rights Reserved.</p>
          <p className="text-slate-500 text-sm flex items-center gap-2">Made with <FaHeart className="text-red-500" /> by Utkarsh Singh</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
