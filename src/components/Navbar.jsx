import { FaBars } from 'react-icons/fa'

function Navbar({ isScrolled, mobileMenuOpen, onToggleMobileMenu, onCloseMobileMenu }) {
  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-2' : 'py-4'}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">
              U
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-800">
              UDM <span className="text-brand-red">Services</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-semibold hover:text-brand-blue transition-colors">Home</a>
            <a href="#about" className="text-sm font-semibold hover:text-brand-blue transition-colors">About</a>
            <a href="#services" className="text-sm font-semibold hover:text-brand-blue transition-colors">Services</a>
            <a href="#pricing" className="text-sm font-semibold hover:text-brand-blue transition-colors">Pricing</a>
            <a
              href="#contact"
              className="px-6 py-2 bg-brand-dark text-white rounded-full text-sm font-semibold hover:bg-brand-blue transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>

          <button className="md:hidden text-2xl text-slate-800" onClick={onToggleMobileMenu}>
            <FaBars />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t">
          <div className="flex flex-col p-6 gap-4">
            <a href="#home" className="text-lg font-medium border-b pb-2" onClick={onCloseMobileMenu}>Home</a>
            <a href="#about" className="text-lg font-medium border-b pb-2" onClick={onCloseMobileMenu}>About</a>
            <a href="#services" className="text-lg font-medium border-b pb-2" onClick={onCloseMobileMenu}>Services</a>
            <a href="#pricing" className="text-lg font-medium border-b pb-2" onClick={onCloseMobileMenu}>Pricing</a>
            <a
              href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
              target="_blank"
              rel="noreferrer"
              className="text-lg font-medium text-brand-blue"
              onClick={onCloseMobileMenu}
            >
              Client Form
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
