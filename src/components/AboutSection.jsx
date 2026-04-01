import { FaCheckCircle } from 'react-icons/fa'

function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-brand-blue font-bold tracking-widest uppercase text-sm mb-3">Who We Are</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Transforming Local Businesses into <span className="text-brand-red">Market Leaders</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-red-100 rounded-full blur-2xl opacity-70"></div>
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80"
              alt="Team"
              className="relative rounded-2xl shadow-2xl z-10 w-full"
            />
          </div>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p>
              Founded in 2020 by <strong className="text-slate-900">Utkarsh Singh</strong>, US Digital Marketing Services
              (UDM) has rapidly become a trusted partner for local businesses seeking explosive growth.
            </p>
            <p>
              We specialize in high-performance digital strategies tailored for Clinics, Gyms, Salons, Real Estate, and
              Retail. Unlike generic agencies, we understand the local pulse.
            </p>
            <p>
              Our expertise spans across <strong>Google Ads</strong>, <strong>Meta (Facebook/Instagram) Ads</strong>,
              <strong> YouTube Promotion</strong>, and comprehensive SEO strategies designed to maximize your ROI.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-brand-green" />
                <span className="font-semibold text-slate-800">Certified Experts</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-brand-green" />
                <span className="font-semibold text-slate-800">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
