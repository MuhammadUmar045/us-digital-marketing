import { FaUserAstronaut } from 'react-icons/fa'

function IntroOverlay({ isVisible, typewriterText, skipVisible, onSkip, overlayRef }) {
  if (!isVisible) return null

  return (
    <div id="intro-overlay" ref={overlayRef} className="loader-overlay">
      <div className="max-w-4xl w-full px-6 text-center relative">
        <div className="mb-8 relative inline-block animate-float">
          <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
            <FaUserAstronaut className="text-6xl md:text-8xl text-white" />
          </div>
          <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 rounded-full"></div>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">
          Welcome to <span className="text-brand-blue">UDM</span>
        </h1>
        <div className="h-24 md:h-16 flex items-center justify-center">
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto typewriter">{typewriterText}</p>
        </div>

        <button
          onClick={onSkip}
          className={`mt-12 px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300 text-sm tracking-widest uppercase ${
            skipVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Skip Intro
        </button>
      </div>
    </div>
  )
}

export default IntroOverlay
