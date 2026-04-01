import { FaArrowRight } from 'react-icons/fa'

function HeroSection({ homeRef, currentSlide, captionVisible, activeCaption, heroSlides }) {
  return (
    <section id="home" ref={homeRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 -skew-x-12 transform origin-top-right -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl -z-10 opacity-50"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100 animate-fade-in-up">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-slate-600">Established 2020</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
            Grow Your <br />
            <span className={`text-gradient transition-opacity duration-500 ${captionVisible ? 'opacity-100' : 'opacity-0'}`}>
              {activeCaption}
            </span>
          </h1>

          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            We help local businesses like Clinics, Gyms, and Salons explode their growth using Google Ads, Meta Ads,
            and YouTube Marketing.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://form.svhrt.com/698ace75247da1e2ca3c9de9"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-brand-blue text-white rounded-full font-bold shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 transition-all flex items-center gap-2"
            >
              Start Project <FaArrowRight />
            </a>
            <a
              href="#services"
              className="px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
            >
              View Services
            </a>
          </div>
        </div>

        <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 w-full h-full">
            {heroSlides.map((slide, index) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <p className="font-display font-bold text-2xl">Strategic Growth</p>
            <p className="text-white/80">Data Driven Results</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
