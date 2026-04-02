import { FaBars, FaTimes } from 'react-icons/fa'

function Navbar({ isScrolled, mobileMenuOpen, onToggleMobileMenu, onCloseMobileMenu }) {
  return (
    <header className={`navbar-shell ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="nav-logo">
          <span className="nav-mark">UDM</span>
          <span>US Digital Marketing Services</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact" className="nav-cta">Contact Us</a>
        </nav>

        <button className="nav-hamburger" onClick={onToggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile" onClick={onCloseMobileMenu} role="dialog" aria-modal="true">
          <a href="#home" onClick={onCloseMobileMenu}>Home</a>
          <a href="#about" onClick={onCloseMobileMenu}>About</a>
          <a href="#services" onClick={onCloseMobileMenu}>Services</a>
          <a href="#pricing" onClick={onCloseMobileMenu}>Pricing</a>
          <a href="#contact" onClick={onCloseMobileMenu}>Contact Us</a>
        </div>
      )}
    </header>
  )
}

export default Navbar
