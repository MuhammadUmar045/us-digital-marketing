import { useRef, useState } from 'react'
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa'
import logo from '../assets/logo.png'
import './Navbar.css'

function Navbar({ isScrolled, mobileMenuOpen, onToggleMobileMenu, onCloseMobileMenu }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef(null)

  const openSearch = () => {
    setSearchOpen(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const closeSearch = () => {
    setSearchOpen(false)
    setSearchQuery('')
  }

  const handleSearchKey = (e) => {
    if (e.key === 'Escape') closeSearch()
    if (e.key === 'Enter' && searchQuery.trim()) {
      // scroll to matching section if name matches a nav link
      const q = searchQuery.toLowerCase()
      const sections = ['home', 'about', 'services', 'pricing', 'contact']
      const match = sections.find((s) => s.includes(q))
      if (match) {
        document.getElementById(match)?.scrollIntoView({ behavior: 'smooth' })
      }
      closeSearch()
    }
  }

  return (
    <header className={`navbar-shell ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* Logo — circular crop */}
        <a href="#" className="nav-logo">
          <div className="nav-logo-circle">
            <img src={logo} alt="UDM" className="nav-logo-img" />
          </div>
          <span className="nav-logo-text">US Digital Marketing Services</span>
        </a>

        {/* Desktop nav links */}
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>

          {/* Search bar — expands inline */}
          <div className={`nav-search-wrap${searchOpen ? ' nav-search-wrap--open' : ''}`}>
            <input
              ref={inputRef}
              className="nav-search-input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKey}
              aria-label="Search"
            />
            {searchOpen
              ? <button className="nav-search-btn" onClick={closeSearch} aria-label="Close search"><FaTimes /></button>
              : <button className="nav-search-btn" onClick={openSearch} aria-label="Open search"><FaSearch /></button>
            }
          </div>

          <a href="#contact" className="nav-cta">Contact Us</a>
        </nav>

        <button className="nav-hamburger" onClick={onToggleMobileMenu} aria-label="Toggle menu">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="nav-mobile" onClick={onCloseMobileMenu} role="dialog" aria-modal="true">
          <a href="#home" onClick={onCloseMobileMenu}>Home</a>
          <a href="#about" onClick={onCloseMobileMenu}>About</a>
          <a href="#services" onClick={onCloseMobileMenu}>Services</a>
          <a href="#pricing" onClick={onCloseMobileMenu}>Pricing</a>

          {/* Mobile search */}
          <div className="nav-mobile-search">
            <FaSearch className="nav-mobile-search-icon" />
            <input
              type="text"
              placeholder="Search..."
              className="nav-mobile-search-input"
              onKeyDown={handleSearchKey}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <a href="#contact" onClick={onCloseMobileMenu}>Contact Us</a>
        </div>
      )}
    </header>
  )
}

export default Navbar
